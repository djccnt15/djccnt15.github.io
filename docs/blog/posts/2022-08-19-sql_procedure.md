---
slug: sql-procedure
title: '[SQL] 11. 절차형 SQL'
date:
    created: 2022-08-19
description: >
    SQL 활용: 절차형 SQL
categories:
    - Data Engineering
tags:
    - database
    - rdb
    - sqld
---

SQL 활용: 절차형 SQL  

<!-- more -->

---

## 1. 절차형 SQL 개요

절차형 SQL이란 일반적인 프로그래밍 언어 형식과 같이 절차적으로 명령을 수행하는 SQL문으로, 데이터에 대한 접근방식을 명시하는 SQL이다.  

절차적 SQL을 이용하면 SQL문의 연속적인 실행이나 조건에 따른 분기처리를 이용하여 특정 기능을 수행하는 **저장 모듈(Stored Module)**을 생성할 수 있다.  

!!! note
    **저장 모듈(Stored Module)**은 SQL문을 데이터베이스 서버에 저장하여 사용자와 애플리케이션 사이에서 공유할 수 있도록 만든 일종의 SQL 컴포넌트 프로그램으로, 독립적으로 실행되거나 다른 프로그램으로부터 실행될 수 있는 완전한 실행 프로그램이다. 저장 모듈의 종류에는 [프로시저](#2-프로시저), [사용자 정의 함수](#3-사용자-정의-함수), [트리거](#4-트리거)가 있다.  

## 2. 프로시저

자주 실행하는 로직을 절차적인 언어를 이용하여 작성한 프로그램 모듈을 **프로시저(Procedure)**라 하며, 생성된 프로시저는 개발자가 필요할 때 호출하여 실행할 수 있다. 프로시저 생성 시 주의할 문법적 요소는 다음과 같다.  

- PL/SQL 및 T-SQL에서는 다양한 변수가 있음
- `SELECT`절 사용의 차이
    - PL/SQL에서 사용하는 `SELECT`절은 결과값이 반드시 있어야 하며, 결과는 반드시 하나여야 함. 조회 결과가 없거나 하나 이상인 경우에는 에러 발생
    - T-SQL에서는 결과 값이 없어도 에러가 발생하지 않음
- 대입 연산자의 차이
    - PL/SQL의 대입연산자: `:=`
    - T-SQL의 대입연산자: `=`
- `EXCEPTION`절에서의 에러 처리
    - `WHEN ~ THEN`절을 사용하여 에러의 종류별로 처리
    - `OTHERS`를 이용하여 모든 에러를 처리할 수 있으나 개별 에러에 대한 명시적 처리가 더 좋음

## 3. 사용자 정의 함수

**사용자 정의 함수(User Defined Function)**는 프로시저처럼 절차형 SQL을 로직과 함께 데이터베이스 내에 저장해 놓은 명령문의 집합을 의미한다. `RETURN`을 사용해서 반드시 결과값을 반환해야 한다는 차이가 있다.  

## 4. 트리거

**트리거(Trigger)**란 특정 테이블에 [DML](./2022-08-11-relational_database.md/#3-dml)이 수행되었을 때 데이터베이스에서 자동으로 동작하도록 작성된 프로그램으로, 데이터베이스에서 자동적으로 수행한다.  

트리거는 테이블, 뷰, 데이터베이스 작업을 대상으로 정의할 수 있으며, 전체 트랜잭션 작업에 대한 트리거와 각 행에 대한 트리거가 있다.  

```sql
-- Oracle
CREATE OR REPLACE TRIGGER trigger_name;

-- MSSQL
CREATE TRIGGER schema_name.trigger_name;
```

프로시저와 트리거의 차이점은 아래와 같다.  

|       |            프로시저            |          트리거           |
| :---: | :----------------------------: | :-----------------------: |
| 생성  |       `CREATE PROCEDURE`       |     `CREATE TRIGGER`      |
| 실행  |           `EXECUTE`            |         자동 실행         |
|  TCL  | `COMMIT`, `ROLLBACK` 실행 가능 | `COMMIT`, `ROLLBACK` 불가 |

## 5. 절차형 SQL의 실제 사용

대표적인 절차형 SQL은 **PL/SQL**(Oracle), **T-SQL**(MSSQL) 등이 있다.  

### 5-1. PL/SQL

Oracle의 절차적 SQL인 **PL(Procedural Language)/SQL**은 Block 구조 안에 DML 문장과 QUERY 문장, 그리고 절차형 언어 등을 사용할 수 있는 트랜잭션 언어로, PL/SQL을 이용하여 저장 모듈(Stored Module)을 개발할 수 있다.  

**PL/SQL의 특징**은 다음과 같다.  

- Block 구조로 되어있어 각 기능별 모듈화 가능
- 변수, 상수 등을 선언하여 SQL 문장 간 값 교환 가능
- IF, LOOP 등의 절차형 언어를 사용하는 절차적 프로그래밍 가능
- DBMS 정의 에러나 사용자 정의 에러를 정의하여 사용 가능
- Oracle에 내장되어 있어 호환성 높음
- PL/SQL은 응용 프로그램의 성능 향상
- 여러 SQL문을 Block으로 묶어 한 번에 서버로 전송하기 때문에 통신량 절감

**PL/SQL의 구조**는 다음의 세 가지 절로 이루어지며, `EXCEPTION`절은 `BEGIN ~ END`절 안에 위치한다.  

- `DECLARE`절
    - `BEGIN ~ END`절에서 사용될 변수와 인수에 대한 정의 및 데이터 타입을 선언하는 선언부
- `BEGIN ~ END`절
    - 처리하고자 하는 SQL문과 비교문, 제어문을 이용하여 필요한 로직을 처리하는 실행부
- `EXCEPTION`절
    - `BEGIN ~ END`절에서 실행되는 SQL문에서 에러가 발생 시 처리 방법을 정의하는 예외처리부

```sql
-- create procedure
CREATE PROCEDURE procedure_name parameter AS declaration_section
BEGIN executable_section
EXCEPTION exception_section
END procedure_name;

-- replace procedure
CREATE OR REPLACE PROCEDURE ...;

-- delete procedure
DROP PROCEDURE procedure_name;
```

### 5-2. T-SQL

**T-SQL(Transact-SQL)**은 MSSQL에서 제공하는 절차적 SQL로, ANSI/ISO 표준의 SQL에 기능을 추가해 만든 것이다. PL/SQL과 마찬가지로 T-SQL을 이용하여 다양한 저장 모듈(Stored Module)을 개발할 수 있다.  

**T-SQL의 프로그래밍** 기능은 아래와 같다.  

- 변수 선언 기능
    - 전역 변수(@@)와 지역 변수(@) 선언
    - 전역 변수는 SQL서버에 내장된 값, 지역 변수는 사용자의 연결 시간 동안만 사용하는 변수
- 데이터 유형(Data Type) 제공
    - `int`, `float`, `varchar` 등의 자료형
- 연산자(Operator) 사용 가능
    - 산술연산자(`+`, `-`, `*`, `/`)
    - 비교연산자(`=`, `<`, `>`, `<>`)
    - 논리연산자(`and`, `or`, `not`)
- 흐름 제어 기능
    - `IF-ELSE`와 `WHILE`, `CASE-THEN`
- 주석 기능
    - 한줄 주석: `--`
    - 범위 주석: `/* code */`

**T-SQL 구조**는 다음의 세 가지 절로 이루어지며, `ERROR`절은 `BEGIN ~ END`절 안에 위치한다.  

- `DECLARE`절
    - `BEGIN ~ END`절에서 사용될 변수와 인수에 대한 정의 및 데이터 타입을 선언하는 선언부
- `BEGIN ~ END`절
    - 처리하고자 하는 SQL문과 비교문, 제어문을 이용하여 필요한 로직을 처리하는 실행부
    - `BEGIN ~ END`절을 반드시 사용할 필요는 없지만 블록 단위로 처리하고자 할 때는 필수 작성
- `ERROR`절
    - `BEGIN ~ END`절에서 실행되는 SQL문에서 에러가 발생 시 처리 방법을 정의하는 예외처리부

```sql
-- create procedure
CREATE PROCEDURE schema_name.procedure_name @parameter
WITH options
AS declaration_section
BEGIN executable_section
ERROR exception_section
END procedure_name;

-- replace procedure
ALTER PROCEDURE ...;

-- delete procedure
DROP PROCEDURE schema_name.procedure_name;
```

---
## Reference
- [DATA ON-AIR - 절차형 SQL](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=3&mod=document&uid=353)
