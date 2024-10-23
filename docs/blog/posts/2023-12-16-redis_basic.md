---
slug: redis-basic
title: Redis 기초
date:
    created: 2023-12-16
description: >
    Redis의 입문을 위한 간단 정리
categories:
    - Data Engineering
tags:
    - in-memory database
    - nosql
    - redis
---

Redis의 입문을 위한 간단 정리  

<!-- more -->

---

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
    - Redis 공식 문서에서는 *Big O notation*을 통해 명령어들의 시간 복잡도(처리 속도)에 대한 정보를 제공함
    - Redis 6.0 이상 버전부터는 성능 향상을 위해 일부 I/O에 Multi Thread가 도입됨

## Redis의 주요 활용

1. Cache 서버
1. Session Store 분산 저장소
    - 데이터 저장 기한에 대한 설정 및 자동 삭제를 지원함
1. Message Broker
    - Pub(Publish)/Sub(Subscribe) 패턴 아키텍처에서 Message Broker로 활용 가능
1. Message Queue

## 설치 및 접속

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

## 모니터링

!!! tip
    실제 프로덕션 수준의 운영 환경에서는 Redis-cli의 실행으로 인한 성능 저하의 가능성이 있을 뿐만 아니라 로그도 남지 않기 때문에 Prometheus/Grafana 등의 외부 서비스를 이용해 모니터링해야 한다.  

### Redis-cli

Redis-cli를 기반으로 Redis의 성능 및 상태를 모니터링할 수 있다.  

- `monitor`
    - Redis에 전달된 명령어들을 출력
    - 주로 개발 단계에서 애플리케이션이 의도한대로 작동했는지를 확인하기 위해 사용함

```bat
docker exec -it redis redis-cli monitor
```

- `--stat`
    - Redis 서버의 주요 통계 정보를 출력
    - 메모리 정보, 연결 및 클라이언트 수 등

```bat
docker exec -it redis redis-cli --stat
```

- `--bigkeys`
    - 스캔 명령을 기반으로 element 개수가 많은 key들을 출력

```bat
docker exec -it redis redis-cli --bigkeys
```

- `--memkeys`
    - 메모리를 많이 사용하는 key들을 출력

```bat
docker exec -it redis redis-cli --memkeys
```

- `--latency`
    - 전달받은 명령들의 처리 속도 관련 정보를 출력

```bat
docker exec -it redis redis-cli --latency
```

## 메모리 관련 정책

Redis는 메모리 정리(Memory Eviction)에 대한 정책을 제공하는데, 주요 내용은 아래와 같다.  

- `maxmemory`
    - 최대 메모리 설정
- `maxmemory-policy`
    - 최대 메모리 도달 시 가용 메모리 확보 방법
    - 저장중인 키 삭제 정책

|    대상    |             방식              | 상세                                |
| :--------: | :---------------------------: | ----------------------------------- |
| noeviction |            무삭제             | 기본 설정, 정책 x                   |
| `allkeys`  |    `lru`, `lfu`, `random`     | 전체 키에 대한 eviction 진행        |
| `volatile` | `lru`, `lfu`, `random`, `ttl` | expire 설정 키에 대한 eviction 진행 |

- `lru`: least recently used, 최신 키 저장
- `lfu`: least frequently used, 빈번 키 저장
- `random`: 임의 키 삭제
- `ttl`: 만료 시간이 얼마 남지 않은 키 삭제

## Data Types

Redis는 아래와 같이 다양한 자료구조를 지원함

- Strings
- Lists
- Sets
- Hashes
- Sorted Sets
- Streams
- Geospatial Indexes
- Bitmaps
- Bitfields
- HyperLogLog

## 고가용성

Redis는 Replication, Sentinel, Cluster 등의 기능들을 제공하는데, 이 기능들을 사용해 고가용성 및 확장성을 동시에 확보할 수 있다.  

1. [Replication](https://redis.io/docs/management/replication/)
    - master-replica(slave)의 관계로 두 DB를 연결
    - master DB에 입력되는 명령어 stream을 replica에도 전송하여 동일하게 작동하도록 함
    - resync를 지원해 두 DB 간의 네트워크가 끊어지더라도 재연결됨
    - ID, offset 기반으로 작동하기 때문에 resync 발생 시 연결이 끊어진 부분부터 이어서 동기화 가능

    !!! warning
        master DB에 장에가 발생했을 때의 failover를 지원하지는 않음

1. [Sentinel](https://redis.io/docs/management/sentinel/)
    - Redis Cluster를 사용하지 않고 Replication을 사용할 때 Replication의 고가용성을 보장하기 위해 같이 사용함
    - master와 replica에 대한 모니터링, 관리자 알람, failover 등의 기능을 지원함
    - master DB에 장에가 발생했을 때 replica 중 하나를 자동으로 master로 승격시킴으로서 failover를 지원함
1. [Cluster](https://redis.io/docs/management/scaling/)
    - 다수의 master DB를 운영하여 쓰기 작업에 대한 수평 확장성을 확보함
    - 저장할 데이터를 샤딩하여 해시 알고리즘을 통해 저장할 master를 결정함

## 주요 명령어

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
-- create string
SET [key] [value]

-- multiple create string
MSET [key] [value] [key] [value] ...
```

```sql
-- get keys
keys [pattern]
```

```sql
-- read
GET [key]

-- multiple read
MGET [key] [key] ...
```

```sql
-- sync delete
DEL [key] [key] ...

-- async delete
UNLINK [key] [key] ...
```

```sql
-- set expire seconds to key
EXPIRE [key] [seconds]

-- get remaining seconds of the key
TTL [key]
```

- Memory Usage

```sql
MEMORY USAGE [key]
```

## 공식 문서 주요 참고 자료

- [Commands](https://redis.io/commands/): 명령어 목록 및 상세 설명
- [Understand Redis data types](https://redis.io/docs/data-types/): 자료구조
- [Connect with Redis clients](https://redis.io/docs/connect/clients/): 언어별 client 가이드
