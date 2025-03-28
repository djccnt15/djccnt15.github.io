---
slug: troubleshooting-gradle-build-error
title: Gradle 빌드 에러 해결
date:
    created: 2023-11-13
description: >
    Gradle 빌드 에러 해결 기록들
categories:
    - Java
tags:
    - java
    - gradle
    - intellij
    - troubleshooting
---

Gradle 빌드 에러 해결 기록들  

<!-- more -->

---

## Could not resolve all files

Java 개발 프로젝트 세팅 중에 아래와 같은 에러가 발생했다.  

```
A problem occurred configuring root project 'my_project'.
> Could not resolve all files for configuration ':classpath'.
   > Could not resolve org.springframework.boot:spring-boot-gradle-plugin:3.1.5.
     Required by:
         project : > org.springframework.boot:org.springframework.boot.gradle.plugin:3.1.5
      > No matching variant of org.springframework.boot:spring-boot-gradle-plugin:3.1.5 was found. The consumer was configured to find a library for use during runtime, compatible with Java 11, packaged as a jar, and its dependencies declared externally, as well as attribute 'org.gradle.plugin.api-version' with value '8.4' but:
          - Variant 'apiElements' capability org.springframework.boot:spring-boot-gradle-plugin:3.1.5 declares a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component for use during compile-time, compatible with Java 17 and the consumer needed a component for use during runtime, compatible with Java 11
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.4')
          - Variant 'javadocElements' capability org.springframework.boot:spring-boot-gradle-plugin:3.1.5 declares a component for use during runtime, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 11)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.4')
          - Variant 'mavenOptionalApiElements' capability org.springframework.boot:spring-boot-gradle-plugin-maven-optional:3.1.5 declares a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component for use during compile-time, compatible with Java 17 and the consumer needed a component for use during runtime, compatible with Java 11
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.4')
          - Variant 'mavenOptionalRuntimeElements' capability org.springframework.boot:spring-boot-gradle-plugin-maven-optional:3.1.5 declares a library for use during runtime, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component, compatible with Java 17 and the consumer needed a component, compatible with Java 11
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.4')
          - Variant 'runtimeElements' capability org.springframework.boot:spring-boot-gradle-plugin:3.1.5 declares a library for use during runtime, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component, compatible with Java 17 and the consumer needed a component, compatible with Java 11
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.4')
          - Variant 'sourcesElements' capability org.springframework.boot:spring-boot-gradle-plugin:3.1.5 declares a component for use during runtime, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 11)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.4')
```

프로젝트에 사용된 Java 버전과 Gradle의 자바 버전이 달라서 발생한 에러로, IntelliJ의 경우 아래 경로에서 Gradle 버전을 프로젝트에 맞게 변경해주면 해결된다.  

- File -> Settings -> Build -> Build Tool -> Gradle -> Gradle JVM

## package does not exist

MSA 아키텍처 구성을 위해 Gradle로 멀티 모듈 프로젝트를 구성해서 스프링부트 애플리케이션끼리 compile 의존 관계를 만들어 사용할 때, 물리적으로 존재하고 IntelliJ의 Gradle dependency에 인식은 되는데 IDE에서 Gradle task를 수행하면 다음과 같은 에러가 발생하는 경우가 있다.  

```
error: package [dependency] does not exist
import [dependency];
```

참조 당하는 쪽의 `build.gradle` 설정에 오류가 있어 발생하는 문제로, 아래와 같이 jar 파일이 생성되도록 해주면 된다.  

```
jar {
    enabled = true
}
```
