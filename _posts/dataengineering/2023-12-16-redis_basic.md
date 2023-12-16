---
published: true
layout: post
title: '[Redis] Redis 기초'
description: >
    Redis의 기초 및 설치
categories: [DataEngineering]
tags: [in-memory database, redis]
image:
    path: /assets/img/posts/thumbnail_redis.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
{% include series_redis.html %}
* toc
{:toc}

## Redis의 특징

1. in-memory Database
    - 메모리를 저장 위치로 사용하여 처리 속도가 빠름
1. Persistent on Disk
    - 디스크로의 저장 기능을 지원하여 가용성과 백업에 운용이 가능함
    - RDB(Redis Database)
        - Snapshot과 같이 특정 시점에 전체 DB를 디스크로 저장함
        - 실행 시 시스템 리소스 사용량이 치솟기 때문에 이에 대한 모니터링이 필요
        - **default** 설정으로 켜져 있음
    - AOF(Append Only File)
        - 데이터 create 명령어 히스토리를 저장함
        - RDB 방식에 비해 데이터 사용량이 높고 디스크 I/O가 빈번함
1. Key-Value 저장 방식
    - Key-Value를 기반으로 다양한 데이터 타입을 지원함
1. Single Thread
    - 싱글 쓰레드로 처리되어 작업의 복잡성을 낮추고 트랜잭션의 원자성을 보장함
    - 과도한 요청이 발생할 경우 지연이 발생하여 서비스 성능에 영향을 줄 수 있음
    - Redis 공식문서에서는 *Big O notation*을 통해 명령어들의 처리 속도에 대한 정보를 제공함
    - Redis 6.0 이상부터는 일부 I/O에 Multi Thread가 도입됨

## Redis의 주요 활용

1. Cache 서버
1. Session Store 분산 저장소
    - 데이터 저장 기한에 대한 설정 및 자동 삭제를 지원함
1. Message Broker
    - Pub(Publish)/Sub(Subscribe) 패턴 아키텍처에서 Message Broker로 활용 가능
1. Message Queue

## Redis 설치 및 접속

도커를 통한 Redis 설치 및 접속 방법  

- Redis Image 다운로드

```bat
docker pull redis
```

- Redis 설치

```bat
docker run -it -d --name redis -p 6379:6379 redis
```

- Redis-cli 접속

```bat
docker exec -it redis redis-cli
```

- Redis Monitoring 실행

```bat
docker exec -it redis redis-cli monitor
```

## 성능 테스트

Redis 서버의 terminal에서 Redis 성능 분석이 가능함  

- Redis Container 접속

```bat
docker exec -it redis /bin/bash
```

- 성능 테스트 실행

```bat
redis-benchmark
```

## Redis 주요 명령어

- Ping

```bat
ping
```

- 정보 확인

```bat
info
```

- CRUD

```sql
-- create
SET [key] [value]

-- create many
MSET [key] [value] [key] [value] ...
```

```sql
-- get keys
keys [pattern]
```

```sql
-- read
GET [key]

-- read many
MGET [key] [key] ...
```