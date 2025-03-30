---
slug: how-to-use-custom-jar
title: 외부 jar 파일 사용법
date:
    created: 2025-03-30
description: >
    외부 `jar` 파일 사용 및 빌드 방법
categories:
    - Java
tags:
    - java
    - jar
    - gradle
    - maven
---

개발을 하다보면 Maven Repository에서 다운로드 받을 수 없는 외부 `jar` 파일을 사용해야하는 경우가 있는데, 이 경우 의존성 주입 방법은 아래와 같다.  

<!-- more -->

---

## 빌드 목록에 등록

### Gradle 사용 시

1. Project의 `root`에 `libs` 폴더 생성[^1] 후 외부 `jar` 파일 복사
1. `build.gradle` 파일에 dependency 설정

    ```
    dependencies {
        implementation files('libs/jar-file.jar')
    }
    ```

[^1]: JSP 사용 시 `WEB-INF/lib` 폴더를 사용해도 좋다.  

### Maven 사용 시

1. `mvn install` 명령어를 통해 Maven 로컬 저장소 등록

    ```bat
    mvn install:install-file -Dfile=<path-to-file> -DgroupId=<group-id> -DartifactId=<artifact-id> -Dversion=<version> -Dpackaging=<packaging> -DgeneratePom=true
    ```

1. `pom.xml` 파일에 의존성 설정

    ```xml
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>your-artifact</artifactId>
        <version>1.0</version>
    </dependency>
    ```

## 프로젝트에 등록

### IntelliJ 사용 시

- Project Structure -> Modules -> Dependencies -> `+` -> JARs or Directories
