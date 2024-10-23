---
slug: intellij-error
title: IntelliJ 에러 해결법
date:
    created: 2024-09-24
description: >
    IntelliJ의 에러 해결법 모음
categories:
    - SW Engineering
tags:
    - intellij
    - troubleshooting
---

IntelliJ의 에러 해결법 모음  

<!-- more -->

---

## CDS 경고

IntelliJ에서 자바 테스트 코드 실행 시 아래와 같은 경고가 발생했다.  

```
OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
```

이 경고는 클래스 로딩 시 Class Data Sharing(CDS) 기능을 사용할 경우 발생한다고 하며, 실제 어플리케이션의 실행에는 문제가 없다.  

아래와 같이 `build.gradle` 설정에서 `-Xshare:off`로 설정해 CDS 기능을 비활성화 하면 해결된다.  

```js
tasks.named('test') {
    useJUnitPlatform()
    jvmArgs '-Xshare:off'
}
```

## 콘솔 한글 깨짐

1. IntelliJ 설정
    - File -> Settings -> Editor -> File Encodings
    - Global Encodings, Project Encoding, Properties Files를 `UTF-8`로 설정
2. VM Options 설정
    - Help -> Edit Custom VM Options
    - 아래 내용 추가

        ```ini
        -Dfile.encoding=UTF-8
        -Dconsole.encoding=UTF-8
        ```