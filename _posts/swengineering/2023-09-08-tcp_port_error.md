---
published: true
layout: post
title: '[Network] TCP 포트 사용 범위 제외 문제'
description: >
    Windows에서 TCP 포트 사용 범위 제외 문제 해결하는 방법
categories: [SWEngineering]
tags: [network, ⭐starred]
image:
    path: /assets/img/posts/thumbnail_network.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 문제 발생

MSSQL을 도커로 사용하고 있는데 어느날 갑자기 평범하게 도커를 실행시켰는데 아래와 같은 문제가 발생했다.  

```
Error invoking remote method 'docker-start-container': Error: (HTTP code 500) server error - Ports are not available: exposing port TCP 0.0.0.0:1433 -> 0.0.0.0:0: listen tcp 0.0.0.0:1433: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
```

찾아보니 도커 컨테이너에서 사용하려는 TCP 포트가 사용 범위에서 제외되었기 때문에 발생하는 오류라고 한다.  

## 문제 확인

- 현재 사용 범위에서 제외된 포트의 범위 확인

```bat
netsh interface ipv4 show excludedportrange protocol=tcp
```
```
프로토콜 tcp 포트 제외 범위

시작 포트    끝 포트
----------    --------
      1074        1173
      1174        1273
      1374        1473
      1474        1573
      1574        1673
      1942        2041
      2869        2869
      5357        5357
     11324       11423
     11424       11523
     12424       12523
     12524       12623
     12708       12807
     12808       12907
     14777       14876
     14877       14976
     50000       50059     *

* - 관리 포트 제외입니다.
```

## 해결법

사용하려는 포트가 사용 범위에서 제외되었기 때문에 발생하는 문제인데, 아래와 같이 Windows NAT을 재시작하면 해결된다.  

- 관리자 권한으로 cmd 실행

- Windows NAT 사용 중지

```bat
net stop winnat
```

- Windows NAT 시작

```bat
net start winnat
```

- 현재 사용 범위에서 제외된 포트의 범위 확인

```bat
netsh interface ipv4 show excludedportrange protocol=tcp
```
```
프로토콜 tcp 포트 제외 범위

시작 포트    끝 포트
----------    --------
      2869        2869
      5357        5357
     50000       50059     *

* - 관리 포트 제외입니다.
```

## 예방법

- 특정 포트 범위에 대해 동적 예약 금지

```bat
netsh int ipv4 add excludedportrange protocol=tcp startport=[port] numberofports=[int]
```