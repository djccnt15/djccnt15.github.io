---
title: 게시판 서비스
tags:
    - portfolio
---

## FastAPI

[Github 저장소 링크](https://github.com/djccnt15/fastapi_board)

### 기술 스택

- 백엔드 서버 구성: 
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white){ loading=lazy }
![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=flat-square&logo=gunicorn&logoColor=white){ loading=lazy }
![Uvicorn](https://img.shields.io/badge/uvicorn-4051b5?style=flat-square){ loading=lazy }
- 데이터베이스: 
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb&logoColor=white){ loading=lazy }
- 캐시 서버: 
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white){ loading=lazy }
- 모니터링: 
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white){ loading=lazy }
![Logstash](https://img.shields.io/badge/Logstash-005571?style=flat-square&logo=logstash&logoColor=white){ loading=lazy }
- 배포: 
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white){ loading=lazy }

### 서비스 설명

- 서버 가용성 확보를 위한 비동기 처리 적용
- 유지보수 용이성 및 기능 확장성 확보를 위한 설계 적용
    - 도메인 주도의 레이어드 아키텍처
    - 헥사고날 아키텍처(port - adapter 패턴)
- JWT 기반 로그인 기능
- 데이터베이스 부하를 줄이기 위한 캐시 서버(cache aside 패턴) 활용
- 서버 상태 측정을 위한 Prometheus, API 호출과 처리 결과 로깅을 위한 ELK 스택 적용
- 배포를 위한 docker 컨테이너화

## 아키텍처

### 시스템 아키텍처

![fastapi_board_architecture](./assets/fastapi_board_architecture.png)

### DB 설계

```mermaid
erDiagram
    ROLE ||..o{ USER : role
    ROLE {
        bigint id   PK
        string name UK
    }

    USER ||..o{ USER_STATE : state
    USER ||..o{ LOGGED_IN : history
    USER ||..o{ POST : author
    USER ||..o{ VOTER_POST : vote
    USER ||..o{ COMMENT : author
    USER ||..o{ VOTER_COMMENT : vote
    USER {
        bigint      id                  PK
        string      name                UK  "null"
        string      password                "null"
        string      email               UK  "null"
        datetime    created_datetime
        bigint      role_id             FK  "null"
    }

    STATE ||..o{ USER_STATE : state
    STATE {
        bigint id PK
        string name UK
    }

    USER_STATE {
        bigint      user_id             PK, FK
        bigint      state_id            PK, FK
        string      detail                      "null"
        datetime    created_datetime
    }

    LOGGED_IN {
        bigint      id                  PK
        bigint      user_id             FK
        datetime    created_datetime
    }

    CATEGORY ||..o{ CATEGORY : child
    CATEGORY ||..o{ POST : post-category
    CATEGORY {
        bigint      id          PK
        int         tier
        string      name
        bigint      parent_id   FK  "null"
    }

    POST ||..|{ POST_CONTENT : meta-data
    POST ||..o{ VOTER_POST : voted
    POST {
        bigint      id                  PK
        bigint      user_id             FK
        bigint      category_id         FK
        datetime    created_datetime
        bool        is_active               "default=True"
    }

    POST_CONTENT {
        bigint      id                  PK
        int         version                 "default=0"
        datetime    created_datetime
        string      title
        text        content
        bigint      post_id             FK
    }

    VOTER_POST {
        bigint user_id PK, FK
        bigint post_id PK, FK
    }

    COMMENT ||..|{ COMMENT_CONTENT : meta-data
    COMMENT ||..o{ VOTER_COMMENT : voted
    COMMENT {
        bigint      id                  PK
        bigint      user_id             FK
        bigint      post_id             FK
        datetime    created_datetime
        bool        is_active               "default=True"
    }

    COMMENT_CONTENT {
        bigint id PK
        int version "default=0"
        datetime created_datetime
        text content
        bigint comment_id FK
    }

    VOTER_COMMENT {
        bigint user_id      PK, FK
        bigint comment_id   PK, FK
    }
```

### 캐시 패턴

DB 호출 빈도가 가장 높은 API에 [Cache Aside 패턴](../blog/posts/2023-12-23-cache_pattern.md/#cache-aside-pattern)을 활용한 캐싱 적용

- 유저 정보 API
- 게시글 내용 API

```mermaid
sequenceDiagram
    Client ->> FastAPI: API request
    alt if cached data
    FastAPI -->> Cache Server: check data
    activate FastAPI
    Cache Server --) FastAPI: response data
    deactivate FastAPI
    else if not cached data
    FastAPI -->> Database: query
    activate FastAPI
    Database --) FastAPI: result
    deactivate FastAPI
    end
    FastAPI --) Client: response
```