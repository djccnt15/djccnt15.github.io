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
