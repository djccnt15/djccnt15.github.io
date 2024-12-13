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
