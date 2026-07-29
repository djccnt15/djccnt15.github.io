---
slug: spring-configuration-tips
title: Spring 설정 관련 팁 모음
date:
    created: 2025-02-07
description: >
    Spring 설정 관련 팁 정리
categories:
    - Spring
tags:
    - java
    - spring
    - application.yaml
    - application.properties
---

Spring 설정 관련 팁 정리  

<!-- more -->

---

## Spring 설정 외부 주입 방법

### Spring 인자 전달

아래와 같이 `-Dspring` 방식으로 Spring 인자를 전달할 수 있다.  

```bat
java -jar my-app.jar -Dspring.profiles.active=prod
```

!!! tip "Spring 인자 동적 주입 방법"
    아래와 같이 `${}`로 플레이스홀더를 사용하면 동적으로 주입할 수 있다.  

    ```yaml
    spring:
    profiles:
        active: "${target.group:dev-group}"  # (1)!
        group:
        dev-group: "dev,dev-db,common"
        prod-group: "prod,prod-db,common"
    ```

    1. 실행할 때 target.group 값이 입력되지 않으면 기본값으로 dev-group 사용

    이 경우 인자를 입력할 때 아래와 같이 지정한 변수명을 사용해서 입력해야 한다.  

    ```bat
    java -jar my-app.jar -Dtarget.group=prod-group
    ```

### 💡application.yaml

아래와 같은 구조로 배포한 후 서버를 구동하면 IntelliJ가 프로젝트의 root 경로에 있는 `application.yaml`을 우선 인식한다.  

```
/project-root/
├─ app.jar
├─ application.yaml
└─ src/
    └─ main/
        └─ resources/
            └─ application.yaml
```

### spring.config.additional-location

`--spring.config.additional-location` 명령어를 사용하면 해당 경로의 설정 파일을 **우선 로딩**하기 때문에 잘못된 경로로 지정해 설정이 인식되지 않더라도 `jar` 내부의 설정파일을 정상적으로 인식한다.  

```bat
java -jar [app_path.jar] --spring.config.additional-location=[path/to/external/application.yaml]
```

### spring.config.location

`--spring.config.location` 명령어를 사용할 경우 기본 설정을 **오버라이드**하기 때문에 잘못된 경로를 지정할 경우 실행이 실패한다.  

```bat
java -jar [app_path.jar] --spring.config.location=[path/to/external/application.yaml]
```

!!! note
    만약 `jar` 파일에서 설정 파일을 제외하고 싶다면 `build.gradle`에 아래와 같이 작성하면 된다.  

    ```gradle
    jar {
        exclude 'application.yaml'
    }
    ```
