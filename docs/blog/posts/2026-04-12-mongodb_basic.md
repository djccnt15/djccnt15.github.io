---
slug: mongodb-basic
title: MongoDB 기초
date:
    created: 2026-04-12
description: >
    MongoDB 기초 지식 정리
categories:
    - Data Engineering
tags:
    - mongodb
---

MongoDB는 Document 단위로 데이터를 저장하는 NoSQL 데이터베이스로, 하나의 Document가 자신의 데이터에 대해서 완결성을 가지기 때문에 같은 Collection에 속한 Document라고해도 모두 같은 형식을 따를 필요는 없다.  

<!-- more -->

---

## _id

모든 Document는 고유값을 뜻하는 `_id` 필드를 반드시 가진다. `_id`는 직접 지정할 수도 있고, 지정하지 않으면 데이터 생성 시점에 `ObjectId` 형식의 데이터가 자동 생성되어 할당된다.  

`ObjectId`는 12bytes로 다음의 데이터의 조합이다.  

- 4-byte timestamp: 데이터 생성 시점의 unix epoch timestamp 값
- 5-byte random value: 프로세스당 unique함을 보장하는 random 값
- 3-byte incrementing counter: 1씩 증가해서 할당되는 counter. 앞의 random value에 의해 초기화

!!! tip "`ObjectId` 사용 시 장점"
    - `ObjectId.getTimestamp()` 를 통해서 별도의 필드 없이 생성 시점을 가져올 수 있음
    - `ObjectID` 의 시작이 timestamp로 되어있기 때문에 `ObjectId`로 정렬 시 (대략적인) 시간순 정렬 가능

## Collection

Document를 저장하기 위한 논리적인 묶음을 `Collection`이라고 한다. MongoDB는 Document Store로서 Document의 형식에 제약이 없지만 `Collection` 단위에서 같은 형식(필드 이름, 값의 데이터 타입 등)를 가지도록 제약을 걸 수 있다.  

!!! info
    시스템의 요구 사항으로 형식이 다른 데이터가 들어가면 안되는 경우에는 `Schema Validation` 기능을 사용한다.  

## Database

하나의 MongoDB 서버 혹은 클러스터에서 논리적으로 Database를 구분할 수 있다. 주로 사용하는 서비스, client user 등을 구분하고, 접속에 제한을 두기 위해서 사용한다.  

## BSON

`BSON`은 JSON style의 binary 포맷으로, `Document`가 가지는 필드나 값의 자료형은 `BSON` Type을 따른다.   

!!! info
    `BSON`의 상세 타입들은 [공식 문서](https://www.mongodb.com/docs/manual/reference/bson-types/) 참고

## Schema와 성능

MongoDB는 `BSON`의 형식에 따라서 하나의 필드가 `BSON` 객체를 가질 수 있어 중첩 필드가 가능하며, 중첩된 필드의 객체에 대해서 검색도 가능하다.  

!!! warning
    중첩 필드로 데이터를 저장하면 검색, 집계 연산에서 그만큼 속도가 저하된다. 따라서 데이터 모델링 시 저장 편의성뿐만 아니라, 검색 효율성도 고려해서 `Document`의 형식을 정하는 것이 좋다.  

## References

RDB의 `Foreign Key`와 같이 MongoDB는 다른 DB나 Collection의 특정 Document를 참조하기 위해 `References`를 사용한다.  

!!! warning
    RDB의 Cascading을 제공하지 않기 때문에 Atomicity를 완벽하게 제공할 수 없다.  

- Manual References
    - 참조하고 싶은 `Document`의 `_id` 필드에 해당하는 값을 다른 `Document`의 특정 필드의 값에 저장
- DB Refs
    - `Document`를 참조할 수 있는 convention 제공
    - 참조하고 싶은 `Document`의 `Collection`, `_id`, `database` 등을 객체로 저장

!!! warning
    DB Refs 사용 시 각 언어의 클라이언트마다 지원 여부와 기능의 정도가 다르니 확인하고 사용해야한다.  

## Transaction

MongoDB에서 기본적으로 하나의 `Document`에 대해서 하나의 operation만 Atomic operation을 제공하나, `Transaction`을 이용하면 하나 이상의 `Document`에 대해서 두 번 이상의 operation에 대해서 Atomicity를 제공할 수 있다.

!!! warning
    모든 `Collection`, `Document`에서 `Transaction`을 제공하지는 못하고 일부 제약사항이 있기 때문에, production level로 Transaction을 사용하려면 문서에서 한정하는 범위나 기능을 정확하게 파악하고 사용해야한다.  
