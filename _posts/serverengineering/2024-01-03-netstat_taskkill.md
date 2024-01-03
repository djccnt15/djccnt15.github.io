---
published: true
layout: post
title: '[Network] 프로세스 강제 종료 방법'
description: >
    port 사용중인 프로세스 죽이기
categories: [ServerEngineering]
tags: [cmd, terminal, ⭐starred]
image:
    path: /assets/img/posts/thumbnail_terminal.png
related_posts:
    - _posts/serverengineering/2022-01-13-manual_cmd.md
---
* toc
{:toc}

## Port를 사용중인 프로세스 강제 종료하기

port를 사용중인 프로세스가 제대로 종료되지 않아 문제가 될 때, 해당 프로세스를 강제로 종료해주면 된다.  

- PID 확인 방법

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

- 프로세스 강제 종료(Windows)

```bat
taskkill /pid <PID> /f
```

- 프로세스 강제 종료(Linux)

```bash
kill -15 <PID>
```

```bash
kill -9 <PID>
```