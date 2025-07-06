---
slug: sql-where-group-by-order-by
title: '[SQL] 06. WHERE, GROUP BY, ORDER BY'
date:
    created: 2022-08-13
description: >
    SQL 기본: WHERE, 함수, GROUP BY, HAVING, ORDER BY
categories:
    - Data Engineering
tags:
    - database
    - rdb
    - sqld
---

SQL 기본: WHERE, 함수, GROUP BY, HAVING, ORDER BY  

<!-- more -->

---

## 1. WHERE

### 1-1. WHERE 개요

`WHERE`를 사용해서 조인 조건이나 조회 결과를 제한하기 위한 조건을 작성할 수 있다.  

```sql
SELECT col_name AS alias FROM table_name WHERE expression;
```

조건식의 구성은 아래와 같다.  

- 칼럼(Column)명 (보통 조건식의 좌측에 위치)
- 비교 연산자
- 문자, 숫자, 표현식 (보통 조건식의 우측에 위치)
- 비교 칼럼명 (JOIN 사용시)

### 1-2. 연산자

**연산자의 종류**는 아래와 같다.  

`WHERE`절의 조건식에 사용되는 연산자들은 아래와 같다.  

- 비교/부정 비교 연산자
    - `=`, `>`, `>=`, `<`, `<=`
    - `!=`, `^=`, `<>`, `NOT col_name =`, `NOT col_name >`, `NOT col_name <`
- SQL/부정 SQL 연산자
    - `BETWEEN a AND b`, `IN (list)`, `LIKE 'regex'`, `IS NULL`
    - `NOT BETWEEN a AND b`, `NOT IN (list)`, `IS NOT NULL`
- 논리 연산자
    - `AND`, `OR`, `NOT`

!!! info
    참고로 `BETWEEN a AND b`는 `a <= n <= b`를 뜻한다.  

`LIKE` 연산의 경우 `%`, `_` 등의 와일드 카드를 사용할 수 있다.  

- `%`: 0개 이상의 아무 문자
- `_`: 1개인 단일 문자

!!! info
    `NULL`값과의 수치 연산은 `NULL`, 비교 연산은 `FALSE`를 리턴한다.  

!!! tip
    `''`값을 조회하려면, Oracle에서는 `IS NULL` 조건, MSSQL에서는 `= ''` 조건을 사용해야 한다.  

**연산자의 우선순위**는 아래와 같다.  

1. 괄호 `()`
1. NOT 연산자
1. 비교 연산자, SQL 연산자
1. AND
1. OR

### 1-3. ROWNUM, TOP

Oracle의 `ROWNUM`은 SQL 처리 결과의 각 행에 대해 임시로 부여되는 일련번호를 말한다. `WHERE`절에서 행의 개수를 제한하는 목적으로 사용한다.  

```sql
-- Oracle
SELECT col_name FROM table_name WHERE ROWNUM <= num;
```

상위/하위 n개의 데이터를 추출하기 위해 `ORDER BY`절과 함께 사용할 경우 아래 예시와 같이 `ORDER BY`가 먼저 적용되도록 작성해야 한다.  

```sql
-- wrong example
SELECT ENAME, SAL FROM EMP WHERE ROWNUM < 4 ORDER BY SAL DESC;

-- correct example
SELECT ENAME, SAL FROM (SELECT ENAME, SAL FROM EMP ORDER BY SAL DESC) WHERE ROWNUM < 4;
```

MSSQL의 `TOP`은 [`ORDER BY`](#4-order-by)를 적용한 후 계산되기 때문에 각 행의 임시 순번을 부여하려면 `ROW_NUMBER()` 함수를 적용해야 한다.  

```sql
-- MSSQL
SELECT TOP(num) PERCENT WITH TIES col_name FROM table_name ORDER BY col_name;

-- example
SELECT TOP(4) WITH TIES job, deptno FROM emp ORDER BY job, deptno;
```

- num: 반환할 행의 수를 지정
- PERCENT: 입력 시 쿼리 결과에서 num%의 행만 반환
- WITH TIES: `ORDER BY`절이 지정된 경우에만 사용할 수 있음. 동일한 데이터가 있을 경우 함께 출력됨

## 2. 함수

함수는 크게 **내장 함수(Builtin Function)**와 **사용자 정의 함수(User Defined Function)**로 나뉘며, 내장 함수의 종류는 다음과 같다.  

- 단일행 함수(Single-Row Function)
    - [문자형 함수](#2-1-문자형-함수)
    - [숫자형 함수](#2-2-숫자형-함수)
    - [날짜형 함수](#2-3-날짜형-함수)
    - [변환형 함수](#2-4-변환형-함수)
    - [NULL 관련 함수](#2-6-null-관련-함수)
- 다중행 함수(Multi-Row Function)
    - [집계 함수(Aggregate Function)](#3-1-집계-함수)
    - [그룹 함수(Group Function)](./2022-08-18-sql_group_window_function.md/#2-그룹-함수)
    - [윈도우 함수(Window Function)](./2022-08-18-sql_group_window_function.md/#3-윈도우-함수)

단일행 함수(Single-Row Function)의 주요 특징은 다음과 같다.  

- `SELECT`, `WHERE`, `ORDER BY` 절에 사용 가능
- 각 행들에 대해 개별적으로 작용하여 데이터 값을 조작한 후 각 행에 대한 조작 결과를 리턴
- 여러 인수를 입력해도 단 하나의 결과만 리턴
- 함수의 인수로 상수, 변수, 표현식 사용 가능
- 하나 또는 여러 개의 인수를 가짐
- 함수의 인수로 함수를 사용하는 함수 중첩 가능

### 2-1. 문자형 함수

문자형 함수의 종류는 아래와 같다. `/` 표시가 있으면 앞이 Oracle, 뒤가 MSSQL이다.  

- `LOWER('str')`, `UPPER('str')`
    - 대/소문자 변경
- `ASCII('str')`
    - 문자를 ASCII 코드로 변경
- `CHR/CHAR(ASCII)`
    - ASCII 코드를 문자로 변경
- `CONCAT('str1', 'str2')`
    - 'str1'과 'str2'을 연결. [합성연산자](./2022-08-11-relational_database.md/#3-5-연산자)와 동일
- `SUBSTR/SUBSTRING('str', m, n)`
    - 문자열의 m 위치에서 n개의 문자 길이에 해당하는 문자를 반환. n이 생략되면 마지막 문자까지 반환
- `LENGTH/LEN('str')`
    - 문자열의 개수 반환
- `LTRIM`, `RTRIM('str', 'target_str')`
    - 첫 문자/마지막 문자부터 확인해서 지정 문자가 나타나는 동안 해당 문자 제거
    - MSSQL에서는 지정 문자를 사용할 수 없고 공백만 제거 가능함
- `TRIM(LEADING/TRAILING/BOTH 'target_str' FROM 'str')`
    - 문자열에서 머리말, 꼬리말 또는 양쪽의 지정 문자 제거
    - MSSQL에서는 지정 문자를 사용할 수 없고 공백만 제거 가능함

### 2-2. 숫자형 함수

숫자형 함수의 종류는 아래와 같다. `/` 표시가 있으면 앞이 Oracle, 뒤가 MSSQL이다.  

- `ABS(num)`
    - 절대값 반환
- `SIGN(num)`
    - 부호 반환
- `MOD(num1, num2)`, `%`
    - num1을 num2로 나눈 나머지 연산
- `CEIL/CEILING(num)`
    - num 보다 크거나 같은 최소 정수 반환
- `FLOOR(num)`
    - num 보다 작거나 같은 최대 정수 반환
- `ROUND(num, m)`
    - 숫자를 소수점 m 자리에서 반올림. m의 default는 0
- `TRUNC(num, m)`
    - 숫자를 소수점 m 자리에서 버림. m의 defalut는 0
    - MSSQL에서는 미제공
- `SIN(num)`, `COS(num)`, `TAN(num)`
    - 삼각함수 값 반환
- `EXP(num)`, `POWER(num)`, `SQRT(num)`, `LOG(num)`, `LN(num)`
    - 숫자의 지수, 제곱, 제곱근, 자연로그 값 반환

### 2-3. 날짜형 함수

DATE 타입의 값을 연산하는 날짜형 함수의 종류는 아래와 같다. `/` 표시가 있으면 앞이 Oracle, 뒤가 MSSQL이다.  

- `SYSDATE/GETDATA()`
    - 현재 날짜와 시간 출력
- `EXTRACT(YEAR/MONTH/DAY from d)/DATEPART(YEAR/MONTH/DAY, d)`
    - 날짜 데이터에서 년/월/일/시간/분/초 데이터를 추출
- `TO_NUMBERS(TO_CHAR(d, 'YYYY'))/YEAR(d)`, `TO_NUMBERS(TO_CHAR(d, 'MM'))/MONTH(d)`, `TO_NUMBERS(TO_CHAR(d, 'DD'))/DAY(d)`
    - 날짜 데이터에서 년/월/일/시간/분/초 데이터를 추출

데이터베이스는 날짜를 숫자로 저장하기 때문에 아래와 같은 산술 연산이 적용 가능하다.  

- 날짜 +/- 숫자
- 날짜1 - 날짜2: 두 날짜의 차이에 해당하는 일수
- 날짜 + 숫자/24: 날짜에 시간을 더함

### 2-4. 변환형 함수

특정 데이터 타입을 다양한 형식으로 출력하고 싶을 경우에 데이터의 유형을 변환하는 방법에는 변환형 함수로 데이터 유형의 변환을 명시하는 **명시적(Explicit) 유형 변환**과 DBMS가 자동으로 데이터 유형을 변환하도록 하는 **암시적(Implicit) 유형 변환**이 있다.  

!!! tip
    암시적 유형 변환은 성능 저하가 발생할 수 있을 뿐만 아니라, DBMS 관련 버그를 일으킬 가능성이 있어 명시적 유형 변환을 사용하는 것이 좋다.  

Oracle의 대표적인 변환형 함수는 아래와 같다.  

- `TO_NUMBERS('str')`
    - 문자열을 숫자로 변환
- `TO_CHAR(num/date 'FORMAT')`
    - 숫자나 날짜를 FORMAT 형태의 문자열로 변환
- `TO_DATE('str', 'FORMAT')`
    - 문자열을 주어진 FORMAT 형태의 날짜로 변환

MSSQL의 대표적인 변환형 함수는 아래와 같다.  

- `CAST(expression AS datatype(length))`
    - expression을 목표 데이터 타입으로 변환
- `CONVERT(datatype(length), expression, style)`
    - expression을 목표 데이터 타입으로 변환

### 2-5. CASE 표현

CASE 표현은 일반 범용 프로그래밍 언어의 조건문과 비슷하게, 조건에 따라 결과를 반환한다.  

```sql
-- SIMPLE_CASE_EXPRESSION
CASE col_name WHEN expression THEN result
ELSE result
END

-- SEARCHED_CASE_EXPRESSION
CASE WHEN col_name = expression THEN result
ELSE result
END
```

```sql
DECODE(col_name, expression_1, res_1, expression_2, res_2, ..., default_value);
```

DECODE 함수의 경우 Oracle에서만 사용 가능하다.  

### 2-6. NULL 관련 함수

`NULL`값과의 수치 연산은 `NULL`, 비교 연산은 `FALSE`를 리턴하는데, 결과값을 `NULL`이 아닌 다른 값을 얻고자 할 때 `NVL`/`ISNULL` 함수를 사용한다. `/` 표시가 있으면 앞이 Oracle, 뒤가 MSSQL이다.  

- `NVL/ISNULL(expression_1, expression_2)`
    - expression_1의 결과값이 `NULL`이면 expression_2를 출력
    - expression_1과 expression_2의 결과 데이터 타입이 같아야 함
- `NULLIF(expression_1, expression_2)`
    - expression_1과 expression_2가 같으면 `NULL`, 다르면 expression_1을 반환
- `COALESCE(expression_1, expression_2)`
    - 주어진 expression 중 `NULL`이 아닌 최초의 expression을 반환
    - 모든 expression이 `NULL`이면 `NULL` 반환

## 3. GROUP BY

### 3-1. 집계 함수

집계 함수(Aggregate Function)는 여러 행을 그룹화하여 그룹당 단 하나의 결과를 반환하는 함수를 말한다. 일반적으로는 `GROUP BY`절을 통해 테이블의 일부 행들을 그룹화하여 적용한다. 주요 집계 함수는 아래와 같다.  

- `COUNT(*)`
    - `NULL`값을 포함한 행의 수 출력
- `COUNT(expression)`
    - expression의 값이 `NULL`값인 경우를 제외한 행의 수 출력
- `SUM/AVG(DISTINCT/ALL expression)`
    - expression의 값이 `NULL`값인 경우를 제외한 합계/평균 출력
- `MIN/MAX(DISTINCT/ALL expression)`
    - expression의 최소값/최대값 출력
- `STDDEV/VARIAN(DISTINCT/ALL expression)`
    - 표현식의 표준편차/분산 출력
- 기타 통계 함수

`ALL`은 Default 옵션이므로 생략 가능하며, `DISTINCT`는 같은 값을 하나의 데이터로 간주할 때 사용한다.  

### 3-2. GROUP BY, HAVING

`GROUP BY`와 `HAVING`은 `WHERE`절을 통해 조건에 맞는 데이터를 조회한 후 2차 가공을 위해 사용한다.  

```sql
SELECT col_name AS alias
FROM table_name
WHERE expression
GROUP BY expression
HAVING expression;
```

`GROUP BY`절과 `HAVING`절은 주요 특징은 다음과 같다.  

- `GROUP BY`절을 통해 소그룹별 기준을 정한 후, `SELECT`절에 집계 함수 사용
- 집계 함수의 통계 정보는 `NULL`값을 가진 행을 제외하고 수행
- `GROUP BY`절에서는 `ALIAS`를 사용 불가
- `WHERE`절에는 집계 함수 사용 불가(집계 함수를 사용할 수 있는 `GROUP BY`절보다 `WHERE`절이 먼저 수행)
- `WHERE`절은 전체 데이터를 GROUP으로 나누기 전에 행들을 미리 제거
- `HAVING`절에는 `GROUP BY`절의 기준 항목이나 소그룹의 집계 함수를 이용한 조건 표시 가능
- `HAVING`절은 일반적으로 `GROUP BY`절 뒤에 위치

## 4. ORDER BY

`ORDER BY`절은 SQL문의 제일 마지막에 위치하여 선택된 데이터를 특정 칼럼을 기준으로 정렬하여 출력하는데 사용한다. 정렬 기준은 칼럼명, `ALIAS`명, 칼럼 순서를 나타내는 정수를 혼용하여 표시 가능하며, 순서대로 적용할 여러 개의 정렬 기준을 지정하는 것도 가능하다.  

`ORDER BY`절의 옵션은 아래와 같다.  

- ASC: Ascending 오름차순 정렬(기본 값이므로 생략 가능)
- DESC: Descending 내림차순 정렬

```sql
SELECT col_name AS alias
FROM table_name
WHERE expression
GROUP BY expression
HAVING expression
ORDER BY expression1 ASC/DESC expression2;
```

!!! tip
    Oracle은 `NULL`값을 가장 큰 값으로 취급하는 반면, MSSQL은 가장 작은 값으로 취급한다.  

Oracle의 경우 데이터에 접근할 때 행 전체 칼럼을 메모리에 로드하기 때문에 `SELECT`절에 지정되지 않은 칼럼으로도 정렬이 가능하나, `FROM`절이 [서브쿼리](./2022-08-17-sql_subquery_view.md/#1-3-위치에-따른-분류) 형태로 되어있을 경우(인라인 뷰)에는 불가능하다는 특징이 있다.  

## 5. SQL문 실행 순서

SQL에서 `SELECT`문장의 실행 순서는 다음과 같으며, 옵티마이저가 SQL문의 `SYNTAX`, `SEMANTIC` 에러를 점검하는 순서 역시 동일하다.  

1. `FROM`: 작업 대상 테이블 참조
1. `WHERE`: 작업 대상 데이터 발췌
1. `GROUP BY`: 행들을 소그룹화
1. `HAVING`: 그룹핑된 행 중 값의 조건에 맞는 것만을 출력
1. `SELECT`: 데이터 값을 출력/계산
1. `ORDER BY`: 데이터 정렬

```sql
SELECT col_name AS alias -- 5
FROM table_name -- 1
WHERE expression -- 2
GROUP BY expression -- 3
HAVING expression -- 4
ORDER BY expression ASC/DESC expression2; -- 6
```

---
## Reference
- [DATA ON-AIR - WHERE 절](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=341)
- [DATA ON-AIR - 함수(FUNCTION)](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=342)
- [DATA ON-AIR - GROUP BY, HAVING 절](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=343)
- [DATA ON-AIR - ORDER BY 절](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=344)
