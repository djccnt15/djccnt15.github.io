---
slug: netstat-taskkill
title: 프로세스 강제 종료 방법
date:
    created: 2024-01-03
description: >
    port 사용중인 프로세스 강제 종료 방법
categories:
    - Server Engineering
tags:
    - cmd
    - terminal
    - taskkill
---

port를 사용중인 프로세스가 제대로 종료되지 않아 문제가 될 때는 해당 프로세스를 강제로 종료해주면 된다.  

<!-- more -->

---

## PID 확인 방법

```bat
netstat -ano
```
```
활성 연결

  프로토콜  로컬 주소              외부 주소              상태            PID
  ...
  TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       13248
  ...
```

## 프로세스 강제 종료 방법

- Windows

```bat
taskkill /pid <PID> /f
```

- Linux

```bash
kill -15 <PID>
```

```bash
kill -9 <PID>
```