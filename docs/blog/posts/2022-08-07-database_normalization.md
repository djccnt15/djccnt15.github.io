---
slug: database-normalization
title: '[SQL] 03. 정규화, 반정규화'
date:
    created: 2022-08-07
description: >
    데이터 모델과 성능: 성능 데이터 모델링의 개요, 정규화, 반정규화
categories:
    - Data Engineering
tags:
    - database
    - rdb
    - sqld
---

데이터 모델과 성능: 성능 데이터 모델링의 개요, 정규화, 반정규화  

<!-- more -->

---

## 1. 성능 데이터 모델링

### 1-1. 성능 데이터 모델링의 정의

성능 데이터 모델링이란 데이터베이스 성능 향상을 목적으로 데이터 모델링의 설계 단계 부터 성능과 관련된 사항이 데이터 모델링에 반영될 수 있도록 하는 것을 의미한다.  

어떤 작업 유형과 어떤 성능 향상을 목표로 하는지에 따라 데이터 모델링에 반영해야하는 사항이 달라진다.  

### 1-2. 성능 데이터 모델링 수행 시점

성능 데이터 모델링 시점이 늦어질수록 재업무 비용이 증가한다. 데이터의 증가가 빠를수록 성능 저하에 따른 성능 개선 비용은 기하급수적으로 증가한다.  

### 1-3. 성능 데이터 모델링의 고려사항

1. 정규화 수행
1. 데이터베이스 용량 산정 수행
1. 데이터베이스에 발생되는 트랜잭션의 유형 파악
1. 용량과 트랜잭션의 유형에 따라 반정규화 수행
1. 이력 모델의 조정, PK/FK 조정, 슈퍼타입/서브타입 조정 등의 수행
1. 성능 관점에서 데이터 모델 검증

## 2. 정규화

### 2-1. 정규화의 개념

**데이터베이스 정규화(Database Normalization)**를 수행한다는 것은 데이터를 결정하는 결정자에 의해 함수적 종속을 가지고 있는 일반속성을 의존자로 하여 입력/수정/삭제 시 발생할 수 있는 이상현상을 제거하는 것을 말한다.  

!!! note "DB 이상현상의 종류"
    - 갱신이상(Update Anomaly)
        - 릴레이션 관계에서 특정 속성값 갱신 시 중복 저장 되어 있는 속성값 중 하나만 갱신하고 나머지는 갱신하지 않아 발생하는 데이터 불일치 현상(Data Inconsistency)
    - 삭제이상(Deletion Anomaly)
        - 릴레이션 관계에서 특정 튜플을 삭제할 경우 삭제를 원하지 않는 정보까지 삭제되는 현상
    - 삽입이상(Insertion Anomaly)
        - 릴레이션 관계에서 특정 튜플을 삭제할 경우 삽입을 원하지 않는 정보까지 불필요하게 삽입해야 하는 현상

정규화의 목적은 다음과 같다.  

- 데이터 중복 최소화를 통한 데이터 저장공간 최소화
- 이상현상 발생 방지를 통한 정보의 불일치 및 손실 위험 최소화
- 데이터 구조의 안정성 유지를 통한 시스템 확장성 및 유연성 확보
- 종속성 제거를 통한 데이터의 일관성과 무결성 보장

!!! note
    정규화된 테이블은 상황에 따라 데이터 처리 속도가 빨라질 수도 있고 느려질 수도 있다.  

### 2-2. 함수적 종속성

**함수의 종속성(Functional Dependency)**은 데이터들이 어떤 기준값에 의해 종속되는 현상을 지칭하는 것이다. 이 때 기준값을 결정자(Determinant)라 하고 종속되는 값을 종속자(Dependent)라고 한다.  

### 2-3. 정규화 이론

데이터베이스 정규화는 다음의 6단계로 이루어지며, 각 단계의 정규화를 달성하였을 때 **제n 정규형(n NF, n Normal Form)**이라고 부른다.  

1. 1차 정규화
    - 다중값 속성의 분리를 통한 속성의 원자성 확보
1. 2차 정규화
    - 일부 기본키에만 종속된 속성을 분리하여 부분 함수 종속성 제거
1. 3차 정규화
    - 서로 종속관계가 있는 일반속성을 분리하여 이행 함수 종속성 제거
1. 보이스코드 정규화
    - 후보키가 기본키 속성 중 일부에 함수적 종속일 때 다수의 주식별자 분리
1. 4차 정규화
    - 다치 종속(Multivalued Dependency, MVD, 여러 칼럼이 동일한 결정자의 종속자) 제거
1. 5차 정규화
    - 결합 종속(Join Dependency, JD) 분리

### 2-4. 정규화와 성능

- 정규화로 인한 성능 향상
    - 입력/수정/삭제 시 성능 향상
    - 유연성 증가, 재활용 가능성 증가, 데이터 중복 최소화
- 정규화로 인한 성능 저하
    - 조회 시 처리 조건에 따라 성능 저하가 발생할 수 있음

## 3. 반정규화

### 3-1. 반정규화의 개념

역정규화로 번역되기도 하는 **반정규화(Denormalization)**는 정규화된 엔티티, 속성, 관계에 대해 시스템의 성능 향상, 개발, 운영의 단순화를 위해 중복, 통합, 분리 등을 수행하는 데이터 모델링의 기법을 의미한다.  

!!! tip
    반정규화는 데이터의 무결성을 희생하는 대신 조회 성능을 향상시킨다. 정규화를 수행하면 엔티티의 갯수가 증가하고 관계가 많아져 [조인](./2022-08-14-sql_join.md)을 통해 데이터를 가져오게 되는데, 조회의 처리 성능이 더 중요할 때 반정규화를 수행한다.  

### 3-2. 반정규화 적용 방법

1. 반정규화의 대상 조사
    - 범위 처리 빈도 조사: 자주 사용되는 테이블에 접근하는 프로세스의 수가 많고 항상 일정한 범위만을 조회하는 경우
    - 대량의 범위 처리 조사: 테이블에 대량의 데이터가 있고 대량의 데이터 범위를 자주 처리하는 경우에 처리 범위를 일정하게 줄이지 않으면 성능을 보장할 수 없을 경우
    - 통계성 프로세스 조사: 통계성 프로세스에 의해 통계 정보를 필요로 할 때 별도의 통계 테이블(반정규화 테이블) 생성
    - 테이블 조인 개수: 테이블에 지나치게 많은 조인이 걸려 데이터를 조회하는 작업이 기술적으로 어려울 경우
1. 대상에 대해 다른 방법으로 처리할 수 있는지 검토
    - VIEW 테이블 검토: 지나치게 많은 조인이 걸려 데이터를 조회하는 작업이 기술적으로 어려울 경우 뷰(VIEW)를 사용
    - 클러스터링 검토: 대량의 데이터 처리나 부분 처리에 의해 성능이 저하되는 경우에 클러스터링을 적용하거나 인덱스를 조정
    - 용도에 따른 테이블 분리: 대량의 데이터는 Primary Key의 성격에 따라 부분적인 테이블로 분리
    - 애플리케이션 고도화: 응용 애플리케이션에서 로직을 구사하는 방법을 변경
1. 반정규화 적용

### 3-3. 반정규화 기법

**테이블 반정규화**는 아래와 같다.  

- 테이블 병합
    - 1:1 관계 테이블 병합, 1:M 관계 테이블 병합, [슈퍼타입/서브타입](./2022-08-08-database_structure.md/#2-1-슈퍼서브타입-모델) 테이블 병합
- 테이블 분할
    - 수직 분할: 칼럼 단위 분할, [트랜잭션](./2022-08-11-relational_database.md/#4-tcl) 처리 유형 파악 선행 필수
    - 수평 분할: 로우 단위 분할
- 테이블 추가
    - 중복 테이블 추가: 다른 업무이거나 서버가 다른 경우 동일한 테이블 구조를 중복하여 원격 조인 제거
    - 통계 테이블 추가: [집계 함수](./2022-08-13-sql_where_groupby.md/#3-1-집계-함수)를 미리 계산하여 저장
    - 이력 테이블 추가
    - 부분 테이블 추가: 전체 칼럼 중 이용도가 높은 칼럼을 모은 별도의 테이블 추가

**칼럼(속성) 반정규화**는 아래와 같다.  

- 중복 칼럼 추가
    - 조인 감소를 위해 중복 칼럼 추가
- 파생 칼럼 추가
    - 미리 값을 계산하여 칼럼에 보관
- 이력 테이블 칼럼 추가
    - 이력 테이블에 기능성 칼럼 추가
- PK에 의한 칼럼 추가
    - 복합 의미를 갖는 PK를 단일 속성으로 구성하였을 경우 일반 속성으로 포함
- 응용시스템 오작동을 위한 칼럼 추가
    - 사용자가 데이터 처리 중에 잘못 처리하여 원래 값으로 복구하기를 원하는 경우를 대비하는 임시 보관

**관계 반정규화**는 아래와 같다.  

- 중복 관계 추가
    - 데이터를 처리하기 위한 여러 경로를 거쳐 조인이 가능할 때 발생하는 성능 저하를 막기 위해 추가적인 관계 추가

---
## Reference
- [DATA ON-AIR - 성능 데이터 모델링의 개요](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=5&mod=document&uid=331)
- [DATA ON-AIR - 정규화와 성능](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=5&mod=document&uid=332)
- [DATA ON-AIR - 반정규화와 성능](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=5&mod=document&uid=333)
