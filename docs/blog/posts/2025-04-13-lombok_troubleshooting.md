---
slug: troubleshooting-lombok
title: Lombok 트러블슈팅 모음
date:
    created: 2025-04-13
description: >
    Lombok 트러블슈팅 모음
categories:
    - Java
tags:
    - java
    - troubleshooting
    - lombok
---

Lombok 트러블슈팅 모음  

<!-- more -->

---

## Dependency 주입 시 주의점

프로젝트에 Lombok을 주입할 때는 아래와 같이 `annotationProcessor`를 같이 주입해줘야 한다.  

```title="build.gradle" hl_lines="7 10"
...

dependencies {
    ...

    compileOnly 'org.projectlombok:lombok:1.18.36'
    annotationProcessor 'org.projectlombok:lombok:1.18.36'

    testCompileOnly 'org.projectlombok:lombok:1.18.36'
    testAnnotationProcessor 'org.projectlombok:lombok:1.18.36'
}

...
```

!!! warning
    `annotationProcessor`를 누락할 경우 아래와 같이 `cannot find symbol` 에러가 발생한다.  

    ```
    D:\projects\java17\src\main\java\org\example\Main.java:9: error: cannot find symbol
            var model = MyModel.builder().build();
                               ^
      symbol:   method builder()
      location: class MyModel
    ```

## Spring 테스트 코드에서 사용방법

Spring Initializr를 사용해서 Spring 프로젝트를 구성할 경우 아래와 같이 Lombok을 `compileOnly`, `annotationProcessor`에만 주입해준다.  

```title="build.gradle" hl_lines="5-6"
...

dependencies {
  implementation 'org.springframework.boot:spring-boot-starter'
  compileOnly 'org.projectlombok:lombok'
  annotationProcessor 'org.projectlombok:lombok'
  testImplementation 'org.springframework.boot:spring-boot-starter-test'
  testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

...
```

Lombok을 테스트 코드에서도 사용하고 싶은 경우 아래와 같이 `testCompileOnly`, `testAnnotationProcessor`에도 주입해줘야 한다.  


```title="build.gradle" hl_lines="5-8"
...

dependencies {
  implementation 'org.springframework.boot:spring-boot-starter'
  compileOnly 'org.projectlombok:lombok'
  annotationProcessor 'org.projectlombok:lombok'
  testCompileOnly 'org.projectlombok:lombok'
  testAnnotationProcessor 'org.projectlombok:lombok'
  testImplementation 'org.springframework.boot:spring-boot-starter-test'
  testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

...
```
