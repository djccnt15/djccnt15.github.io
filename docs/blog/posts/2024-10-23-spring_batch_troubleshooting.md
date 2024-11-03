---
slug: spring-batch-troubleshooting
title: Spring Batch 에러 해결
date:
    created: 2024-10-23
description: >
    Spring Batch 에러 해결 모음
categories:
    - Spring
tags:
    - spring
    - spring batch
    - troubleshooting
---

Spring Batch 에러 해결 모음  

<!-- more -->

---

## Batch 미종료 현상

Spring Batch가 작업이 끝난 후에도 종료되지 않고 마치 Spring Web 처럼 계속 켜져 있는 현상이 발생했는데, Spring Initializr 사용중 부주의로 인해 WAS 개발을 위한 Spring Web 관련 Dependency가 섞여 들어온 것이 원인이었다.  

아래 두 가지 조치 후 정상 작동을 확인할 수 있었다.  

- `ServletInitializer.java` 파일 삭제
- Spring Web 관련 Dependency 삭제

!!! note "Spring Web 관련 Dependency 목록"

    - `implementation 'org.springframework.boot:spring-boot-starter-web'`
    - `providedRuntime 'org.springframework.boot:spring-boot-starter-tomcat'`

??? note "이슈 발생 `build.gradle` 전체 목록"

    ```hl_lines="30 34"
    plugins {
        id 'java'
        id 'war'
        id 'org.springframework.boot' version '3.3.4'
        id 'io.spring.dependency-management' version '1.1.6'
    }

    group = 'com.project'
    version = '0.0.1-SNAPSHOT'

    java {
        toolchain {
            languageVersion = JavaLanguageVersion.of(17)
        }
    }

    configurations {
        compileOnly {
            extendsFrom annotationProcessor
        }
    }

    repositories {
        mavenCentral()
    }

    dependencies {
        implementation 'org.springframework.boot:spring-boot-starter-batch'
        implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
        implementation 'org.springframework.boot:spring-boot-starter-web'
        compileOnly 'org.projectlombok:lombok'
        runtimeOnly 'com.microsoft.sqlserver:mssql-jdbc'
        annotationProcessor 'org.projectlombok:lombok'
        providedRuntime 'org.springframework.boot:spring-boot-starter-tomcat'
        testImplementation 'org.springframework.boot:spring-boot-starter-test'
        testImplementation 'org.springframework.batch:spring-batch-test'
        testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
    }

    tasks.named('test') {
        useJUnitPlatform()
    }
    ```

## 메타 데이터 DDL 확인 방법

간혹 여러 가지 이유로 메타 데이터 테이블이 생성되지 않는 경우가 있는데, 이 때는 사용하는 DB에 해당하는 DDL을 직접 실행시켜주면 된다.  

IntelliJ를 사용할 경우 Spring Batch가 설치된 프로젝트에서 아래 단계를 통해 확인할 수 있다.  

1. ++shift+shift++로 전체 검색
1. `Files` 메뉴 선택
1. `schema` 검색

??? note "Spring Batch 메타 데이터 DDL 예시"

    ```sql title="schema-mariadb.sql"
    CREATE TABLE BATCH_JOB_INSTANCE  (
        JOB_INSTANCE_ID BIGINT  NOT NULL PRIMARY KEY ,
        VERSION BIGINT ,
        JOB_NAME VARCHAR(100) NOT NULL,
        JOB_KEY VARCHAR(32) NOT NULL,
        constraint JOB_INST_UN unique (JOB_NAME, JOB_KEY)
    ) ENGINE=InnoDB;

    CREATE TABLE BATCH_JOB_EXECUTION  (
        JOB_EXECUTION_ID BIGINT  NOT NULL PRIMARY KEY ,
        VERSION BIGINT  ,
        JOB_INSTANCE_ID BIGINT NOT NULL,
        CREATE_TIME DATETIME(6) NOT NULL,
        START_TIME DATETIME(6) DEFAULT NULL ,
        END_TIME DATETIME(6) DEFAULT NULL ,
        STATUS VARCHAR(10) ,
        EXIT_CODE VARCHAR(2500) ,
        EXIT_MESSAGE VARCHAR(2500) ,
        LAST_UPDATED DATETIME(6),
        constraint JOB_INST_EXEC_FK foreign key (JOB_INSTANCE_ID)
        references BATCH_JOB_INSTANCE(JOB_INSTANCE_ID)
    ) ENGINE=InnoDB;

    CREATE TABLE BATCH_JOB_EXECUTION_PARAMS  (
        JOB_EXECUTION_ID BIGINT NOT NULL ,
        PARAMETER_NAME VARCHAR(100) NOT NULL ,
        PARAMETER_TYPE VARCHAR(100) NOT NULL ,
        PARAMETER_VALUE VARCHAR(2500) ,
        IDENTIFYING CHAR(1) NOT NULL ,
        constraint JOB_EXEC_PARAMS_FK foreign key (JOB_EXECUTION_ID)
        references BATCH_JOB_EXECUTION(JOB_EXECUTION_ID)
    ) ENGINE=InnoDB;

    CREATE TABLE BATCH_STEP_EXECUTION  (
        STEP_EXECUTION_ID BIGINT  NOT NULL PRIMARY KEY ,
        VERSION BIGINT NOT NULL,
        STEP_NAME VARCHAR(100) NOT NULL,
        JOB_EXECUTION_ID BIGINT NOT NULL,
        CREATE_TIME DATETIME(6) NOT NULL,
        START_TIME DATETIME(6) DEFAULT NULL ,
        END_TIME DATETIME(6) DEFAULT NULL ,
        STATUS VARCHAR(10) ,
        COMMIT_COUNT BIGINT ,
        READ_COUNT BIGINT ,
        FILTER_COUNT BIGINT ,
        WRITE_COUNT BIGINT ,
        READ_SKIP_COUNT BIGINT ,
        WRITE_SKIP_COUNT BIGINT ,
        PROCESS_SKIP_COUNT BIGINT ,
        ROLLBACK_COUNT BIGINT ,
        EXIT_CODE VARCHAR(2500) ,
        EXIT_MESSAGE VARCHAR(2500) ,
        LAST_UPDATED DATETIME(6),
        constraint JOB_EXEC_STEP_FK foreign key (JOB_EXECUTION_ID)
        references BATCH_JOB_EXECUTION(JOB_EXECUTION_ID)
    ) ENGINE=InnoDB;

    CREATE TABLE BATCH_STEP_EXECUTION_CONTEXT  (
        STEP_EXECUTION_ID BIGINT NOT NULL PRIMARY KEY,
        SHORT_CONTEXT VARCHAR(2500) NOT NULL,
        SERIALIZED_CONTEXT TEXT ,
        constraint STEP_EXEC_CTX_FK foreign key (STEP_EXECUTION_ID)
        references BATCH_STEP_EXECUTION(STEP_EXECUTION_ID)
    ) ENGINE=InnoDB;

    CREATE TABLE BATCH_JOB_EXECUTION_CONTEXT  (
        JOB_EXECUTION_ID BIGINT NOT NULL PRIMARY KEY,
        SHORT_CONTEXT VARCHAR(2500) NOT NULL,
        SERIALIZED_CONTEXT TEXT ,
        constraint JOB_EXEC_CTX_FK foreign key (JOB_EXECUTION_ID)
        references BATCH_JOB_EXECUTION(JOB_EXECUTION_ID)
    ) ENGINE=InnoDB;

    CREATE SEQUENCE BATCH_STEP_EXECUTION_SEQ START WITH 1 MINVALUE 1 MAXVALUE 9223372036854775806 INCREMENT BY 1 NOCACHE NOCYCLE ENGINE=InnoDB;
    CREATE SEQUENCE BATCH_JOB_EXECUTION_SEQ START WITH 1 MINVALUE 1 MAXVALUE 9223372036854775806 INCREMENT BY 1 NOCACHE NOCYCLE ENGINE=InnoDB;
    CREATE SEQUENCE BATCH_JOB_SEQ START WITH 1 MINVALUE 1 MAXVALUE 9223372036854775806 INCREMENT BY 1 NOCACHE NOCYCLE ENGINE=InnoDB;
    ```