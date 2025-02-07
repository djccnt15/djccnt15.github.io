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
---

Spring 설정 관련 팁 정리  

<!-- more -->

---

## Spring 설정 외부 주입 방법

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
