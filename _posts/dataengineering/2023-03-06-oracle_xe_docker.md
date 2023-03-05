---
published: true
layout: post
title: '[Oracle] 도커로 Oracle XE 설치하기'
description: >
    도커를 활용해서 Oracle XE 간단 설치하는 방법
categories: [DataEngineering]
tags: [oracle]
image:
    path: /assets/img/posts/thumbnail_oracle.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 도커로 Oracle XE 설치하기

SQL Server를 설치했을 때도 겪었던 동일한 문제인데, DB는 항상 켜져있는게 기본 스펙이다 보니 키고 끄는 기능이 제대로 지원되지도 않고, 컴퓨터의 시작 프로그램 목록으로 관리가 되지도 않아 설치해두면 개발용 컴퓨터의 성능을 잡아먹는다.  

이 부분을 해결하기 위해 Oracle XE를 docker 환경에 설치해서 사용하기로 했다.  

## 도커 이미지 가져오기

도커로 무언가를 설치하려면 docker 이미지를 먼저 가져와야 한다. 찾아보니 Oracle XE 이미지 중에는 [gvenzl/oracle-xe](https://hub.docker.com/r/gvenzl/oracle-xe)가 가장 많이 쓰이는 것 같다.  

도커 이미지를 다운 받는 커맨드는 아래와 같다.  

```
> docker pull gvenzl/oracle-xe
```

## 도커 컨테이너 실행하기

다운 받은 도커 이미지로 Oracle XE 컨테이너를 만들고 실행하는 명령어는 아래와 같다.  

```
> docker run -d -p 11521:1521 -e ORACLE_PASSWORD=<password> --name <name> gvenzl/oracle-xe
```

💡가이드에서는 `-p 1521:1521`로 되어 있지만 `-p 11521:1521`로 설정해야 `11521` 포트를 통해서 해당 컨테이너에 접속할 수 있다.  
{:.note}

포트만 제대로 설정하면 그 이후는 Dbeaver 및 SQL Developer로 접속해서 로컬 환경에 설치한 것과 동일하게 작업할 수 있다.  

---
## Reference
- [gvenzl/oracle-xe](https://hub.docker.com/r/gvenzl/oracle-xe)