---
slug: spring-batch
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
    - spring Batch
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

전체 배치 프로세스를 캡슐화한 도메인으로 Step 인스턴스를 위한 컨테이너. Job 객체의 구성 요소는 아래와 같다.  

- Job 이름
- Step 정의 및 순서
- 작업을 다시 시작할 수 있는지 여부

![Job Hierarchy With Steps](./img/spring-batch-jobHeirarchyWithSteps.png){ loading=lazy }  
^[출처: The Domain Language of Batch](https://docs.spring.io/spring-batch/reference/domain.html#step)^

#### 2-1-1. JobInstance

JobInstance는 Job의 논리적 실행 단위를 가리키며, 하나의 Job이 여러 JobInstance를 가진다. JobInstance 객체의 구성 요소는 아래와 같다.  

- Job 이름
- JobParameters

JobInstance 정보는 *BATCH_JOB_INSTANCE* 테이블에 저장된다.  

#### 2-1-2. JobParameters

JobParameters는 Job을 실행할 때 사용되는 파라미터 도메인으로, 하나의 Job에 존재하는 여러 JobInstance를 구분하는 키 역할을 한다.  

JobParameters 정보는 *BATCH_JOB_EXECUTION_PARAMS* 테이블에 저장된다.  

#### 2-1-3. JobExecution

JobExecution은 Job의 단일 실행 시도를 뜻하며, 아래와 같은 배치 작업에 대한 다양한 정보로 구성 된다.  

- 배치 작업 상태, 배치 종료 상태
- 시작 시간, 종료 시간, 생성 시간

JobExecution 정보는 *BATCH_JOB_EXECUTION* 테이블에 저장된다.  

### 2-2. Step

Step은 배치 작업의 독립적이고 순차적인 단계를 캡슐화한 도메인으로, 하나의 Job은 한 개 이상의 Step으로 구성 된다.  

입력 자원의 설정 및 실질적인 배치 작업 로직에 대한 모든 정보를 갖고 있는 도메인으로, Step의 동작 구조는 아래와 같다.  

![Chunk-oriented Processing](./img/spring-batch-chunk-oriented-processing-with-item-processor.png){ loading=lazy }  
^[출처: Chunk-oriented Processing](https://docs.spring.io/spring-batch/reference/step/chunk-oriented-processing.html)^

#### 2-2-1. StepExecution

StepExecution은 Step의 단일 실행 시도를 뜻하며, 아래와 같은 배치 작업에 대한 다양한 정보로 구성 된다.  

- 배치 작업 상태, 배치 종료 상태
- 시작 시간, 종료 시간, 생성 시간
- 읽은 수, 쓰기 수, 저장 수

StepExecution 정보는 *BATCH_STEP_EXECUTION* 테이블에 저장된다.  

### 2-3. ExecutionContext

key-value 구조로 이루어져 Job와 Step의 상태에 대한 DB 저장 정보를 저장하는 객체로, Batch의 세션 역할로 활용 된다.  

ExecutionContext 정보는 각각 *BATCH_JOB_EXECUTION_CONTEXT*, *STEP_JOB_EXECUTION_CONTEXT* 테이블에 저장된다.  

### 2-4. JobRepository

JobRepository는 Spring Batch가 활용하는 객체들의 정보를 저장하는 DB 관련 매커니즘으로, JobLauncher, Job, Step의 구현체들에 대한 CRUD 기능을 제공한다.  

### 2-5. JobLauncher

주어진 JobParameters로 Job을 실행시키는 인터페이스 객체로 사용자는 JobLauncher 인터페이스를 통해 Job의 실행과 관련된 설정을 주입할 수 있다.  

### 2-6. ItemReader

배치의 입력 도메인으로, 사용자는 ItemReader 인터페이스를 사용해 배치에 사용될 데이터의 input에 대한 설정을 주입할 수 있다.  

### 2-7. ItemWriter

배치의 결과 저장 도메인으로, 사용자는 ItemWriter 인터페이스를 사용해 배치에 사용될 데이터의 output에 대한 설정을 주입할 수 있다.  

### 2-8. ItemProcessor

배치의 비즈니스 로직을 처리하는 도메인으로, 사용자는 ItemProcessor 인터페이스를 사용해 배치를 처리하는 로직을 주입할 수 있다.  

---
## Reference
- [전체 실습 코드 저장소](https://github.com/djccnt15/study_spring_batch)
- [Spring Batch](https://spring.io/projects/spring-batch)
- [The Domain Language of Batch](https://docs.spring.io/spring-batch/reference/)
