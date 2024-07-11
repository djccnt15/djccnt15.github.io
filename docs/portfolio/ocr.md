---
title: 문서 OCR 서비스 Backend
tags:
    - portfolio
---

## 개요

[Github 저장소 링크](https://github.com/djccnt15/ocr_backend)

사용자가 이미지를 업로드 하고 업로드한 이미지에서 영역을 정해 OCR을 수행할 수 있는 서비스  

## 기술 스택

- 백엔드 서버 구성: 
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white){ loading=lazy }
![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=flat-square&logo=gunicorn&logoColor=white){ loading=lazy }
![Uvicorn](https://img.shields.io/badge/uvicorn-4051b5?style=flat-square){ loading=lazy }
- 데이터베이스: 
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb&logoColor=white){ loading=lazy }
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white){ loading=lazy }
- OCR 인식 엔진: ![Tesseract](https://img.shields.io/badge/Tesseract-000000?style=flat-square&logo=tesseract&logoColor=white){ loading=lazy }
- 배포: 
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white){ loading=lazy }

### 서비스 설명

- 서버 가용성 확보를 위한 비동기 처리 적용
- 유지보수 용이성 및 기능 확장성 확보를 위한 설계 적용
    - 도메인 주도의 레이어드 아키텍처
    - 헥사고날 아키텍처(port - adapter 패턴)
- JWT 기반 로그인 기능
- 배포를 위한 docker 컨테이너화
- 이미지 Blob 데이터베이스 및 인식 결과 문서 저장을 위한 No-SQL DB 활용
- 테서렉트 프로세스 관리를 위해 싱글턴 패턴 활용

## 아키텍처

### 시스템 아키텍처

![ocr_backend_architecture](./assets/ocr_backend_architecture.png)

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
    USER ||..O{ IMAGE : owner
    USER ||..O{ OCR : creator
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

    IMAGE ||..o{ OCR : image
    IMAGE {
        bigint      id                  PK
        string      name
        string      media_type              "image MIME type"
        bigint      image_id                "original image id at MongoDB"
        bigint      thumbnail_id            "thumbnail image id at MongoDB"
        datetime    created_datetime
        bigint      user_id             FK
    }

    OCR {
        bigint      id                  PK
        int         version                 "default=1"
        datetime    created_datetime
        bigint      image_id            FK
        bigint      user_id             FK
        string      content_id
    }
```

- IMAGE 엔티티의 `image_id`, `thumbnail_id` 칼럼은 Blob 데이터베이스에 저장된 이미지 데이터의 식별자
- OCR 엔티티의 `content_id` 칼럼은 배열로 도출되는 인식 결과를 문서 형태로 저장한 NO-SQL DB에서의 식별자

## 주요 비즈니스 프로세스

### 이미지 업로드 프로세스

```mermaid
sequenceDiagram
    Client ->> FastAPI: API request
    FastAPI -->> Blob Database: upload thumbnail
    activate FastAPI
    Blob Database --) FastAPI: thumbnail id
    FastAPI -->> Blob Database: upload image
    Blob Database --) FastAPI: image id
    FastAPI -->> Database: insert image meta data
    deactivate FastAPI
    FastAPI ->> Client: response
```

### OCR 인식 프로세스

```mermaid
sequenceDiagram
    Client ->> FastAPI: API request
    FastAPI -->> Database: query
    activate FastAPI
    Database --) FastAPI: image meta data
    FastAPI -->> Blob Database: query
    Blob Database --) FastAPI: image data
    FastAPI ->> Tesseract: ocr request
    Tesseract ->> FastAPI: result
    FastAPI --) Client: response
    FastAPI --) Database: Insert result meta data
    FastAPI --) Document DB: Insert OCR result data
    deactivate FastAPI
```