---
slug: troubleshooting
title: Java 트러블슈팅 모음
date:
    created: 2024-12-13
description: >
    Java 트러블슈팅 모음
categories:
    - Java
tags:
    - java
    - troubleshooting
---

Java 트러블슈팅 모음  

<!-- more -->

---

## JVM 선택 실행

Java로 `jar` 파일을 실행하는 기본적인 명령어는 아래와 같다.  

```bat
java -jar [app_path.jar]
```

!!! info
    이 때 `java` 커맨드는 시스템 환경 변수에 등록되어 있는 `JAVA_HOME` 경로의 JVM을 사용해서 Java를 구동한다.  

다양한 버전의 JAVA가 설치된 환경에서 특정 JVM을 사용해 `jar` 파일을 실행하는 방법은 아래와 같다.  

```bat
"C:\path\to\your\java\bin\java" -jar [app_path.jar]

"C:\path\to\your\java\bin\java.exe" -jar [app_path.jar]
```

!!! tip
    아래와 같이 `set`, `export` 명령어를 이용해서 현재 실행중인 콘솔에서 임시로 환경 변수 경로를 변경해줘도 된다.  

    ```bat
    set JAVA_HOME=C:\path\to\your\java
    set PATH=%JAVA_HOME%\bin;%PATH%
    java -jar your-app.jar
    ```
    ```sh
    $env:JAVA_HOME="C:\path\to\your\java"
    $env:Path="$env:JAVA_HOME\bin;$env:Path"
    java -jar your-app.jar
    ```

## TLS10 이슈 해결 방법

레거시 시스템을 다루다 보면 아래와 같은 문제로 Java 프로그램이 실행되지 않는 경우가 있다.  

```
The server selected protocol version TLS10 is not accepted by client preferences [TLS13, TLS12]
```

문제를 일으키는 서버의 버전을 업데이트하거나 하는 등의 여러 해결 방법이 있지만, 제일 쉬운 해결 방법은 아래와 같이 JVM의 옵션을 수정하는 것이다.  

!!! danger
    보안 관련 옵션을 일부 비활성화하는 것이기 때문에 위험성을 인지해야 한다.  

1. `<JAVA_HOME>\conf\security\java.security` 파일 열기
1. 옵션 수정
    - before

        ```
        jdk.tls.disabledAlgorithms=SSLv3, TLSv1, TLSv1.1, RC4, DES, MD5withRSA, \
        DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC, anon, NULL
        ```

    - after

        ```
        jdk.tls.disabledAlgorithms=SSLv3, RC4, DES, MD5withRSA, \
        DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC, anon, NULL
        ```

## Java 한글 깨짐 현상

자바 프로그램의 stdout에서 한글이 깨져서 나오는 경우가 있는데, 인코딩 설정이 제대로 잡히지 않아 그런 경우가 있다.  

아래와 같이 빌드 인코딩과 실행 인코딩 설정을 한글을 지원하는 형식으로 통일[^1]해주면 된다.  

1. (IntelliJ 사용시) Settings - Editor - File Encodings
1. `jar` 파일 실행 시 실행 옵션에 `-Dfile.encoding=UTF-8` 지정

    ```bat
    java -jar -Dfile.encoding=UTF-8 [jar_file.jar]
    ```

[^1]: [IntelliJ의 콘솔창에서 한글이 깨질 때 해결 방법](./2024-09-24-intellij_error.md/#콘솔-한글-깨짐)과 동일하다.  
