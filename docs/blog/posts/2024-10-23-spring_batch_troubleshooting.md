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
