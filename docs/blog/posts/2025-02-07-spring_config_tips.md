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

!!! warning
    아래와 같은 구조로 파일을 만든 후 테스트 서버를 구동하면 IntelliJ가 프로젝트의 root 경로에 있는 `application.yaml`을 우선 인식한다.  

    ```
    /project-root/
    ├─ app.jar
    ├─ application.yaml
    └─ src/
        └─ main/
            └─ resources/
                └─ application.yaml
    ```

    이를 피하려면 프로젝트 외부 경로에 저장하거나 아니면 `configuration.yaml` 등으로 이름을 바꿔주면 된다.  


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

    ```
    jar {
        exclude 'application.yaml'
    }
    ```
