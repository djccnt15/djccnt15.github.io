---
slug: database-structure
title: '[SQL] 04. 데이터베이스 구조와 성능'
date:
    created: 2022-08-08
description: >
    데이터 모델과 성능: 대량 데이터, 데이터베이스 구조, 분산 데이터베이스와 성능
categories:
    - Data Engineering
tags:
    - database
    - rdb
    - sqld
---

데이터 모델과 성능: 대량 데이터, 데이터베이스 구조, 분산 데이터베이스와 성능  

<!-- more -->

---

## 1. 대량 데이터에 따른 성능

### 1-1. 대량 데이터 발생에 따른 테이블 분할

중요한 업무에 해당되는 데이터가 특정 테이블에 있는 경우에 병목 현상이 발생하는데 이런 경우 트랜잭션이 분산 처리될 수 있도록 테이블 단위에서 분할의 방법을 적용할 필요가 있다.  

#### 로우 체이닝과 로우 마이그레이션

테이블의 데이터 저장 단위를 블록(Block)이라고 하는데, 행(Row)의 길이가 너무 길어서 데이터(하나의 행이)가 하나의 데이터 블록에 모두 저장되지 않고 두 개 이상의 블록에 걸쳐 저장되어 있는 것을 **로우 체이닝(Row Chaining)** 현상이라고 한다.  

데이터 블록에서 수정된 데이터를 해당 데이터 블록에서 저장하지 못하고 다른 블록의 빈 공간을 찾아 저장하는 것을 **로우 마이그레이션(Row Migration)**이라고 한다.  

!!! warning
    로우 체이닝과 로우 마이그레이션이 발생하여 많은 블록에 데이터가 저장되면 데이터베이스 메모리에서 디스크와 I/O(입력/출력)가 발생할 때 불필요하게 I/O가 많이 발생하여 성능이 저하된다.  

### 1-2. 파티셔닝

**파티셔닝(Partitioning)**은 논리적으로는 하나의 테이블로 보이는 데이터베이스를 물리적으로는 여러 개의 테이블에 쪼개어 저장하는 것을 말한다.  

**파티셔닝의 종류**는 아래와 같다.  

- Range Partitioning
    - 범위에 따라 테이블을 분할하는 것으로, 가장 많이 사용됨
- List Partitioning
    - 핵심적인 코드값 등으로 PK가 구성되어 있을 때 특정값을 지정하여 테이블 분할
- Hash Partitioning
    - 지정된 해시 조건에 따라 해싱 알고리즘이 적용되어 테이블이 분리되며, 테이블에 데이터가 정확하게 어떻게 들어갔는지 알 수 없음

### 1-3. 수평 분할/수직 분할

테이블에 대한 수평 분할/수직 분할은 다음의 네 가지 원칙에 따라 결정된다.  

- 데이터 모델링 완성
- 데이터베이스 용량 산정
- 대량 데이터가 처리되는 테이블에 대한 트랜잭션 처리 패턴 분석
- 칼럼/로우 단위로 집중화된 처리가 발생하는지 분석하여 집중화된 단위로 테이블 분리 검토

## 2. 데이터베이스 구조와 성능

### 2-1. 슈퍼/서브타입 모델

슈퍼타입/서브타입 데이터 모델(Extended E-R Model)은 업무를 구성하는 데이터의 특징을 공통과 차이점의 특징을 고려하여 효과적으로 표현할 수 있다.  

**슈퍼/서브 타입 데이터 모델의 장점**은 아래와 같다.  

슈퍼타입/서브타입 데이터 모델은 공통의 부분을 슈퍼타입으로 모델링하고 공통으로부터 상속받아 다른 엔티티와 차이가 있는 속성에 대해서는 별도의 서브 엔티티로 구분하기 때문에 다음과 같은 장점이 있다.  

- 업무의 모습을 정확하게 표현 가능
- 물리적인 데이터 모델로 변환 시 선택의 폭 증가

그러나 트랜잭션 특성을 고려하지 않고 테이블을 설계할 경우 오히려 슈퍼타입/서브타입 모델이 성능 저하의 원인이 될 수 있다.  

**슈퍼/서브타입 데이터 모델 변환기술**은 아래와 같다.  

- OneToOne Type(1:1 Type)
    - 개별로 발생되는 트랜잭션에 대해서는 개별 테이블로 구성
    - 슈퍼타입과 서브타입 각각 필요한 속성 및 유형에 맞는 데이터만 가지게 하기 위해서 모두 분리하여 1:1 관계를 갖도록 함
- Plus Type
    - 슈퍼타입과 서브타입을 공통으로 처리하는 트랜잭션에 대해 슈퍼타입과 각 서브타입을 하나로 묶어 별도의 테이블 구성
- Single Type(All in One Type)
    - 일괄 처리하는 트랜잭션에 대해 단일 테이블 구성
- 위 세 가지가 혼합된 트랜잭션 유형이 있는 경우는 많이 발생하는 트랜잭션 유형에 따라 구성

|               |         OneToOne Type          |            Plus Type            |       Single Type       |
| :-----------: | :----------------------------: | :-----------------------------: | :---------------------: |
|     특징      |          개별 테이블           |     슈퍼 + 서브 타입 데이블     |       단일 테이블       |
|    확장성     |            1 우수함            |             3 보통              |         3 나쁨          |
|   조인 성능   |             4 나쁨             |             4 나쁨              |        1 우수함         |
|   I/O 성능    |             2 좋음             |             1 좋음              |         3 나쁨          |
|  관리 용이성  |          3 좋지 않음           |           2 좋지 않음           |         2 좋음          |
| 트랜잭션 유형 | 개별 테이블로 접근이 많은 경우 | 슈퍼/서브 공통 처리가 많은 경우 | 전체 일괄 처리하는 경우 |

### 2-2. 인덱스 특성을 고려한 PK/FK

PK/FK 설계는 데이터를 접근할 때 경로를 제공하는 측면에서 성능에 영향이 크기 때문에 데이터베이스 설계 단계에서 성능을 고려하여 칼럼의 순서를 조정할 필요가 있다.  

등호 조건(`=`)이나 BETWEEN 조건(`<>`)의 칼럼이 앞으로 와야 인덱스를 효율적으로 이용할 수 있다.  

### 2-3. 물리적인 테이블에 FK 인덱스 생성

물리적인 테이블에 FK를 사용하지 않아도 데이터 모델 관계에 의해 상속받은 FK 속성들은 SQL `WHERE`절에서 조인을 위해 이용되는 경우가 많다. 이 경우 FK 인덱스를 생성하면 성능이 향상 된다.  

## 3. 분산 데이터베이스와 성능

### 3-1. 분산 데이터베이스의 개념 및 가치

분산 데이터베이스의 정의는 다음과 같다.  

- 여러 곳으로 분산되어있는 데이터베이스를 하나의 가상 시스템으로 사용할 수 있도록 한 데이터베이스
- 논리적으로 동일한 시스템에 속하지만, 컴퓨터 네트워크를 통해 물리적으로 분산되어 있는 데이터들의 모임

!!! tip
    데이터를 분산 환경으로 구성하면, 원거리 또는 다른 서버에 접속하여 처리할 때 발생하는 네트워크 부하, 트랜잭션 집중에 따른 성능 저하를 분산된 데이터베이스 환경을 통해 해결하여 빠른 성능을 제공하는 것이 가능해진다.  

### 3-2. 분산 데이터베이스의 투명성

분산 데이터베이스가 되기 위해서는 여섯 가지 투명성(Transparency)을 만족해야 한다.  

- 분할 투명성(단편화)
    - 하나의 논리적 관계가 분할되어 각 단편의 사본이 여러 site에 저장
- 위치 투명성
    - 위치 정보가 System Catalog에 유지되어 사용하려는 데이터의 저장 장소 명시 불필요
- 지역사상 투명성
    - 지역 DBMS와 물리적 DB 사이의 사상 보장
- 중복 투명성
    - 사용자는 DB 객체의 중복 여부를 알 필요가 없어야 함
- 장애 투명성
    - 구성요소(DBMS, Computer, 네트워크 등)의 장애에도 트랜잭션의 원자성 유지
- 병행 투명성
    - 다수 트랜잭션이 동시 수행 되더라도 결과의 일관성 유지

### 3-3. 분산 데이터베이스의 장단점

|                 장점                 |              단점              |
| :----------------------------------: | :----------------------------: |
| 지역 자치성, 점증적 시스템 용량 확장 |   소프트웨어 개발 비용 증가    |
|         데이터의 가용성 증가         | 데이터 무결성에 대한 위협 증가 |
|         데이터의 신뢰성 증가         |       오류의 잠재성 증가       |
|         효용성, 융통성 증가          |        설계 복잡성 증가        |
|            응답 속도 상승            |       불규칙한 응답 속도       |
|            통신 비용 절감            |         처리 비용 증가         |
|   각 지역 사용자의 요구 수용 증대    |     관리 및 통제의 어려움      |

### 3-4. 분산 데이터베이스의 적용 기법

**분산 데이터베이스 설계 방식**은 아래와 같다.  

- 상향식
    - 각 지역 스키마 작성 후 전역 스키마를 작성하여 분산 데이터베이스 구축
- 하향식
    - 전역 스키마 작성 후 각 지역 스키마를 작성하여 분산 데이터베이스 구축

**테이블 위치 분산**은 아래와 같다.  

테이블 위치 분산은 테이블의 구조의 변화 없이 설계된 테이블의 위치를 각각 다르게 위치시키는 방법이다. 테이블 위치 분산은 정보를 이용하는 형태가 각 위치별로 차이가 있을 경우에 이용한다.  

**테이블 분할 분산**은 아래와 같다.  

테이블 분할(Fragmentation) 분산은 각각의 테이블을 쪼개어 분산시키는 방법이다.  

- 수평 분할(Horizontal Fragmentation)
    - 테이블을 로우(Row) 단위로 분리
- 수직 분할(Vertical Fragmentation)
    - 테이블을 칼럼(Column) 단위로 분리

**테이블 복제 분산**은 아래와 같다.  

테이블 복제(Replication) 분산은 동일한 테이블을 다른 지역이나 서버에서 동시에 생성하여 관리한다.  

- 부분 복제(Segment Replication)
    - 마스터 데이터베이스에서 테이블의 일부의 내용만 다른 지역이나 서버에 위치시킴
- 광역 복제(Broadcast Replication)
    - 마스터 데이터베이스의 테이블의 내용을 각 지역이나 서버에 존재시킴

**테이블 요약 분산**은 아래와 같다.  

테이블 요약(Summarization) 분산은 지역 간 또는 서버 간에 데이터가 비슷하지만 서로 다른 유형으로 존재하는 방식이다.  

- 분석 요약(Rollup Summarization)
    - 동일한 구조의 분산되어 있는 데이터를 이용하여 통합된 데이터를 산출
    - 각 사이트별 요약정보를 본사에서 통합하여 전체에 대한 요약 정보 산출
- 통합 요약(Consolidation Summarization)
    - 분산되어 있는 다른 내용의 데이터를 이용하여 통합된 데이터를 산출
    - 각 사이트별 정보를 본사에서 통합하여 전체에 대한 요약 정보 산출

---
## Reference
- [DATA ON-AIR - 대량 데이터에 따른 성능](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=5&mod=document&uid=334)
- [DATA ON-AIR - 데이터베이스 구조와 성능](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=335)
- [DATA ON-AIR - 분산 데이터베이스와 성능](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=336)
