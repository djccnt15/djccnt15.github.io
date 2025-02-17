---
slug: sql-subquery-view
title: '[SQL] 09. 서브쿼리, 뷰'
date:
    created: 2022-08-17
description: >
    SQL 활용: 서브쿼리, 뷰
categories:
    - Data Engineering
tags:
    - database
    - rdb
    - sqld
---

SQL 활용: 서브쿼리, 뷰  

<!-- more -->

---

## 1. 서브쿼리의 개념 및 기초

**서브쿼리(Subquery)**란 하나의 SQL문 안에 포함되어 있는 또 다른 SQL문을 말하며, 알려지지 않은 기준을 이용한 검색을 위해 사용된다.  

서브쿼리 사용 시 주의점은 다음과 같다.  

- 서브쿼리를 괄호로 감싸서 사용
- 서브쿼리는 단일 행(Single Row) 또는 복수 행(Multiple Row) 비교 연산자와 함께 사용 가능
    - 단일 행 비교 연산자는 서브쿼리의 결과가 반드시 1건 이하이어야 함
    - 복수 행 비교 연산자는 서브쿼리의 결과 건수와 상관 없음
- 서브쿼리에서는 `ORDER BY` 사용 불가
    - `ORDER BY`절은 `SELECT`절에서 오직 한 개만 올 수 있기 때문에 `ORDER BY`절은 메인쿼리의 마지막 문장에 위치해야 함

### 1-1. 데이터의 형태에 따른 분류

반환되는 데이터의 형태에 따른 서브쿼리의 분류는 다음과 같다.  

- 단일 행 서브쿼리(Single Row Subquery)
    - 단일 행 비교 연산자(`=`, `<`, `<=`, `>`, `>=`, `<>`) 사용
    - 서브쿼리의 실행 결과가 항상 1건 이하이며, 2건 이상 반환하면 런타임 오류 발생
- 다중 행 서브쿼리(Multi Row Subquery)
    - 다중 행 비교 연산자(`IN`, `ALL`, `ANY`, `SOME`, `EXISTS`) 사용
    - `IN`: 서브쿼리 결과에 존재하는 임의의 값과 동일한 조건
    - `ALL`: 서브쿼리 결과에 존재하는 모든 값을 만족하는 조건
    - `ANY`, `SOME`: 서브쿼리 결과에 존재하는 어느 하나의 값이라도 만족하는 조건
    - `EXISTS`/`NOT EXISTS`: 서브쿼리의 결과를 만족하는 값이 존재하는지 여부를 확인하는 조건(조건에 따라 TRUE/FALSE 반환), 연관 서브쿼리로만 사용
- 다중 칼럼 서브쿼리(Multi Column Subquery)
    - 서브쿼리의 실행 결과로 여러 칼럼 반환
    - 메인쿼리의 조건절에 여러 칼럼을 동시에 비교 가능
    - 서브쿼리와 메인쿼리에서 비교하고자 하는 칼럼 개수와 위치가 동일해야 함

!!! info
    다중 칼럼 서브쿼리는 Oracle에서만 지원하며, MSSQL에서는 지원하지 않는다.  

### 1-2. 동작 방식에 따른 분류

동작 방식에 따른 서브쿼리의 분류는 다음과 같다.  

- Un-Correlated(비연관) 서브쿼리
    - 서브쿼리가 메인쿼리 칼럼을 가지고 있지 않는 형태의 서브쿼리
    - 주로 메인쿼리에 서브쿼리가 실행된 결과값을 제공하기 위한 목적으로 사용
- Correlated(연관) 서브쿼리
    - 서브쿼리가 메인쿼리 칼럼을 가지고 있는 형태의 서브쿼리
    - 주로 메인쿼리의 결과 데이터를 서브쿼리에서 조건이 맞는지 확인하고자 사용

### 1-3. 위치에 따른 분류

SQL문에서 서브쿼리가 사용 가능한 위치는 다음과 같다.  

- `SELECT`절
    - **스칼라 서브쿼리(Scalar Subquery)**, 한 행, 한 칼럼(1 Row 1 Column)만을 반환
- `FROM`절
    - **인라인 뷰(Inline View)**, 서브쿼리의 결과가 마치 실행 시에 동적으로 생성된 테이블인 것처럼 사용 가능하기 때문에 **동적 뷰(Dynamic View)**라고도 함
    - `ORDER BY`절 사용 가능
- `WHERE`절
- `HAVING`절
    - 그룹 함수와 함께 사용될 때 그룹핑된 결과에 대해 부가적인 조건을 주기 위해 사용
- `ORDER BY`절
- `INSERT`문의 `VALUES`절
- `UPDATE`문의 `SET`절


## 2. 뷰

**뷰(View)**는 실제 데이터를 가지고 있지 않으며, 뷰 정의(View Definition)만을 가지고 있다. 뷰는 실제 데이터를 가지고 있지 않지만 테이블이 수행하는 역할을 수행하기 때문에 가상 테이블(Virtual Table)이라고도 한다.  

뷰 사용의 장점은 아래와 같다.  

- 독립성
    - 테이블 구조가 변경되어도 뷰를 사용하는 응용 프로그램은 변경하지 않아도 됨
- 편리성
    - 복잡한 질의를 뷰로 생성함으로써 관련 질의를 단순하게 작성 가능
- 보안성
    - 사용자에게 숨기고 싶은 정보가 존재할 때, 뷰 생성 시 해당 칼럼을 제외하고 생성 가능

뷰를 만들고 삭제하는 명령어는 아래와 같다.  

```sql
-- create view
CREATE VIEW alias AS expression;

-- delete view
DROP VIEW alias;
```

!!! info
    실제로 데이터를 저장하는 뷰인 [Materialized view](https://en.wikipedia.org/wiki/Materialized_view)라는 개념도 있다.  

---
## Reference
- [DATA ON-AIR - 서브쿼리](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=3&mod=document&uid=349)
