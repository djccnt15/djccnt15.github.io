---
slug: spring-batch-basic
title: Spring Batch 기초
date:
    created: 2024-01-27
description: >
    Spring Batch를 활용한 Java 배치 프로그램 만들기
categories:
    - Spring
tags:
    - java
    - spring
    - spring batch
---

Spring Batch를 활용한 Java 배치 프로그램 만들기  

<!-- more -->

---

## 1. Spring Batch 기본 구조

Spring Batch는 아래 구조로 구성되어 있다.  

![Batch Stereotypes](./img/spring-batch-reference-model.png){ loading=lazy }  
^[출처: The Domain Language of Batch](https://docs.spring.io/spring-batch/reference/domain.html)^

## 2. Spring Batch 주요 도메인

### 2-1. Job

전체 배치 프로세스를 캡슐화한 도메인으로 `Step` 인스턴스를 위한 컨테이너. `Job` 객체의 구성 요소는 아래와 같다.  

- `Job` 이름
- `Step` 정의 및 순서
- 작업을 다시 시작할 수 있는지 여부

![Job Hierarchy With Steps](./img/spring-batch-jobHeirarchyWithSteps.png){ loading=lazy }  
^[출처: The Domain Language of Batch](https://docs.spring.io/spring-batch/reference/domain.html#step)^

#### 2-1-1. JobInstance

`JobInstance`는 `Job`의 논리적 실행 단위를 가리키며, 하나의 `Job`이 여러 `JobInstance`를 가진다. `JobInstance` 객체의 구성 요소는 아래와 같다.  

- `Job` 이름
- `JobParameters`

`JobInstance` 정보는 *`BATCH_JOB_INSTANCE`* 테이블에 아래와 같이 저장된다.  

- `JOB_INSTANCE_ID`: Job 인스턴스의 고유 식별자
- `JOB_NAME`: Job 이름. JobInstance 식별에 반드시 필요
- `JOB_KEY`: JobParameters의 해시값
- `VERSION`: 낙관적 락(Optimistic Lock) 버전. JobInstance의 경우 항상 0으로 유지됨

#### 2-1-2. JobParameters

`JobParameters`는 `Job`을 실행할 때 사용되는 파라미터 도메인으로, 하나의 `Job`에 존재하는 여러 `JobInstance`를 구분하는 키 역할을 한다.  

`JobParameters` 정보는 *`BATCH_JOB_EXECUTION_PARAMS`* 테이블에 아래와 같이 저장된다.  

- `JOB_EXECUTION_ID`(FK): 작업 실행의 ID
- `PARAMETER_NAME`: 파라미터 이름
- `PARAMETER_TYPE`: 파라미터 타입
- `PARAMETER_VALUE`: 파라미터 값
- `IDENTIFYING`: JobInstance 식별에 사용 여부

#### 2-1-3. JobExecution

`JobExecution`은 `Job`의 단일 실행 시도를 뜻하며, 아래와 같은 배치 작업에 대한 다양한 정보로 구성 된다.  

- 배치 작업 상태, 배치 종료 상태
- 시작 시간, 종료 시간, 생성 시간

`JobExecution` 정보는 *`BATCH_JOB_EXECUTION`* 테이블에 아래와 같이 저장된다.  

- `JOB_EXECUTION_ID`: 작업 실행의 고유 식별자
- `VERSION`: 낙관적 락 버전
- `JOB_INSTANCE_ID`(FK): 연관된 JobInstance의 ID
- `CREATE_TIME`: JobExecution 생성 시간
- `START_TIME`: JobExecution 시작 시간
- `END_TIME`: JobExecution 종료 시간
- `STATUS`: JobExecution 현재 상태(BatchStatus)
- `EXIT_CODE`: JobExecution 종료 코드
- `EXIT_MESSAGE`: JobExecution 종료 메시지(오류 포함)
- `LAST_UPDATED`: 마지막 업데이트 시간

### 2-2. Step

`Step`은 배치 작업의 독립적이고 순차적인 단계를 캡슐화한 도메인으로, 하나의 `Job`은 한 개 이상의 `Step`으로 구성 된다.  

입력 자원의 설정 및 실질적인 배치 작업 로직에 대한 모든 정보를 갖고 있는 도메인으로, `Step`의 동작 구조는 아래와 같다.  

![Chunk-oriented Processing](./img/spring-batch-chunk-oriented-processing-with-item-processor.png){ loading=lazy }  
^[출처: Chunk-oriented Processing](https://docs.spring.io/spring-batch/reference/step/chunk-oriented-processing.html)^

#### 2-2-1. StepExecution

`StepExecution`은 `Step`의 단일 실행 시도를 뜻하며, 아래와 같은 배치 작업에 대한 다양한 정보로 구성 된다.  

- 배치 작업 상태, 배치 종료 상태
- 시작 시간, 종료 시간, 생성 시간
- 읽은 수, 쓰기 수, 저장 수

`StepExecution` 정보는 *`BATCH_STEP_EXECUTION`* 테이블에 아래와 같이 저장된다.  

- `STEP_EXECUTION_ID`: StepExecution 고유 식별자
- `VERSION`: 낙관적 락 버전
- `STEP_NAME`: Step 이름
- `JOB_EXECUTION_ID`(FK): 연관된 JobExecution의 ID
- `CREATE_TIME`: 실행 레코드 생성 시간
- `START_TIME`: StepExecution 시작 시간
- `END_TIME`: StepExecution 종료 시간
- `STATUS`: StepExecution의 현재 상태(BatchStatus)
- `COMMIT_COUNT`: 커밋 횟수
- `READ_COUNT`: 읽은 아이템 수
- `FILTER_COUNT`: 필터링된 아이템 수
- `WRITE_COUNT`: 쓴 아이템 수
- `READ_SKIP_COUNT`: 읽기 건너뛴 수
- `WRITE_SKIP_COUNT`: 쓰기 건너뛴 수
- `PROCESS_SKIP_COUNT`: 처리 건너뛴 수
- `ROLLBACK_COUNT`: 롤백 횟수
- `EXIT_CODE`: StepExecution 종료 코드
- `EXIT_MESSAGE`: StepExecution 종료 메시지
- `LAST_UPDATED`: 마지막 업데이트 시간

### 2-3. ExecutionContext

key-value 구조로 이루어져 `Job`와 `Step`의 상태에 대한 DB 저장 정보를 저장하는 객체로, Batch의 세션 역할로 활용 된다.  

`Job`의 `ExecutionContext` 정보는 *`BATCH_JOB_EXECUTION_CONTEXT`* 테이블에 아래와 같이 저장된다.  

- `JOB_EXECUTION_ID`(FK): `JobExecution`의 ID
- `SHORT_CONTEXT`: 직렬화된 `ExecutionContext`의 문자열 버전
- `SERIALIZED_CONTEXT`: 전체 컨텍스트, 직렬화된 형태

`Step`의 `ExecutionContext` 정보는 *`BATCH_STEP_EXECUTION_CONTEXT`* 테이블에 아래와 같이 저장된다.  

- `STEP_EXECUTION_ID`(FK): StepExecution의 ID
- `SHORT_CONTEXT`: 직렬화된 ExecutionContext의 문자열 버전
- `SERIALIZED_CONTEXT`: 전체 컨텍스트, 직렬화된 형태

### 2-4. JobRepository

`JobRepository`는 Spring Batch가 활용하는 객체들의 정보를 저장하는 DB 관련 매커니즘으로, `JobLauncher`, `Job`, `Step`의 구현체들에 대한 CRUD 기능을 제공한다.  

### 2-5. JobLauncher

주어진 `JobParameters`로 `Job`을 실행시키는 인터페이스 객체로 사용자는 `JobLauncher` 인터페이스를 통해 `Job`의 실행과 관련된 설정을 주입할 수 있다.  

### 2-6. ItemReader

배치의 입력 도메인으로, 사용자는 `ItemReader` 인터페이스를 사용해 배치에 사용될 데이터의 input에 대한 설정을 주입할 수 있다.  

### 2-7. ItemWriter

배치의 결과 저장 도메인으로, 사용자는 `ItemWriter` 인터페이스를 사용해 배치에 사용될 데이터의 output에 대한 설정을 주입할 수 있다.  

### 2-8. ItemProcessor

배치의 비즈니스 로직을 처리하는 도메인으로, 사용자는 `ItemProcessor` 인터페이스를 사용해 배치를 처리하는 로직을 주입할 수 있다.  

## 3. Spring Batch App 실행방법

`java -jar` 명령어를 통해 실행하면 되고, `JobParameter`는 `{paramName}={value}` 형식으로 입력하면 된다.  

!!! note
    윈도우 서버에서의 `bat` 파일을 통한 실행 방법은 아래와 같다.  

    ```bat
    @echo off

    :: Set the path to your Java installation
    set JAVA_PATH=C:\programming\java\jdk-17.0.0.1\bin\java.exe
    set XMS=128M
    set XMX=256M

    :: Set the classpath
    set CLASSPATH=C:\projects\springbatch_multidb\build\libs\multidb.jar
    set CONFIG_PATH=C:\projects\springbatch_multidb\src\main\resources\application.yaml

    :: Run the Spring Batch application
    %JAVA_PATH% -jar "%CLASSPATH%" -Xms%XMS% -Xmx%XMX% --spring.config.location=%CONFIG_PATH%
    ```

---
## Reference
- [전체 실습 코드 저장소](https://github.com/djccnt15/study_springbatch)
- [Spring Batch](https://spring.io/projects/spring-batch)
- [The Domain Language of Batch](https://docs.spring.io/spring-batch/reference/)
