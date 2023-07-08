---
published: true
layout: post
title: '[SQL] 10. 그룹 함수, 윈도우 함수'
description: >
    SQL 활용: 그룹 함수, 윈도우 함수
categories: [DataEngineering]
tags: [database, RDB, SQL]
image:
    path: /assets/img/posts/thumbnail_sql_10.png
related_posts:
    - _posts/dataengineering/2022-08-17-sql_subquery_view.md
    - _posts/dataengineering/2022-08-19-sql_procedure.md
---
{% include series_sql.html %}
* toc
{:toc}

## 1. 데이터베이스 관점의 데이터 분석

ANSI/ISO SQL 표준은 데이터 분석을 위한 세 가지 종류의 함수를 정의하고 있다.  

- [집계 함수(Aggregate Function)](/dataengineering/sql_where_groupby/#3-1-집계-함수)
- [그룹 함수(Group Function)](#2-그룹-함수)
- [윈도우 함수(Window Function)](#3-윈도우-함수)

## 2. 그룹 함수

**그룹 함수(Group Function)**는 `GROUP BY`절에 사용하여 하나의 SQL문으로 테이블을 한 번만 읽어서 여러 레벨의 보고서를 출력하기 위해 사용한다. 정렬이 필요한 경우엔 `ORDER BY`절에 정렬 칼럼을 명시해야 한다. 그룹 함수의 종류는 다음과 같다.  

- `ROLLUP()`
    - Grouping Columns의 Subtotal을 생성하기 위해 사용됨
    - Grouping Columns의 수를 N이라고 했을 때 N + 1 Level의 Subtotal 생성
    - `ROLLUP()`의 인수는 계층 구조이므로 인수 순서가 바뀌면 수행 결과도 변형됨
- `CUBE()`
    - 결합 가능한 모든 값에 대하여 다차원 집계를 생성함
    - `ROLLUP()`에 비해 시스템에 많은 부담을 줌
- `GROUPING SETS()`
    - 입력된 인수들에 대한 개별 집계를 구할 수 있어 다양한 소계 집합 생성 가능
- `GROUPING()`
    - `ROLLUP()`이나 `CUBE()`에 의한 소계가 계산된 결과에 `GROUPING(expression) = 1` 표시, 그 외에는 `GROUPING(expression) = 0` 표시

## 3. 윈도우 함수

**윈도우 함수(Window Function)**는 **분석 함수(Analytic Function)**나 **순위 함수(Rank Function)**이라고도 하며, 행과 행간의 관계를 쉽게 정의하기 위해 만들어졌다. `WINDOW`함수는 중첩해서 사용할 수 없지만, 서브쿼리에서는 사용할 수 있다.  

### 3-1. 그룹 내 순위 함수

순위 함수는 특정 항목(칼럼)에 대한 순위를 구하는 함수로, **특정 범위(Partition)** 내에서의 순위 또는 전체 데이터에서의 순위를 구할 수 있다. 순위 함수는 다음의 세 종류가 있다.  

- `RANK()`
    - 동일한 값에 대해서는 동일한 순위를 부여
    - 동일 순위 개수만큼 다음 순위 값을 증가 시킴 (e.g. 1, 1, 3, 3, 5)
- `DENSE_RANK()`
    - 동일한 값에 대해서는 하나의 건수로 취급
    - 동일 순위가 있어도 순차적인 값을 반환 (e.g. 1, 1, 2, 2, 3)
- `ROW_NUMBER()`
    - 동일한 값이라도 고유한 순위를 부여
    - 각 PARTITION 내에서 `ORDER BY`절에 의해 정렬된 순서를 반환

순위 함수의 실제 사용은 아래와 같으며, `PARTITION BY`절에 소규모 범위를 설정할 수 있다.  

```sql
SELECT window_function(arguments)
OVER (PARTITION BY col_name ORDER BY col_name WINDOWING expression)
FROM table_name;
```

### 3-2. 일반 집계 함수

`GROUP BY`절의 [집계 함수](/dataengineering/sql_where_groupby/#3-1-집계-함수)와 동일하게 집계 연산을 수행하며, 종류는 다음과 같다.  

- `SUM()`/`AVG()`
- `MIN()`/`MAX()`
- `COUNT()`

### 3-3. 그룹 내 행 순서 함수

MSSQL에서는 지원하지 않고, Oracle에서만 지원한다.  

- `FIRST_VALUE()`/`LAST_VALUE()`
    - 파티션별 윈도우에서 가장 먼저/나중에 나온 값 반환
- `LAG()`/`LEAD()`
    - 파티션별 윈도우에서 이전/이후 몇 번째 행의 값 반환

### 3-4. 그룹 내 비율 함수

MSSQL에서는 지원하지 않고, Oracle에서만 지원한다.  

- `RATIO_TO_REPORT()`
    - 파티션 내 전체 `SUM(col)`값에 대한 행별 칼럼 값의 백분율을 소수점으로 반환
- `PERCENT_RANK()`
    - 파티션별 윈도우에서 첫 행을 0, 마지막 행을 1로 하여 행의 순서를 백분율로 반환
- `CUME_DIST()`
    - 파티션별 윈도우의 전체 건수에서 현재 행보다 작거나 같은 건수에 대한 누적백분율 반환
- `NTILE()`
    - 파티션별 전체 건수를 인수 값으로 N등분한 결과 반환

---
## Reference
- [그룹 함수](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=3&mod=document&uid=350)
- [윈도우 함수](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=3&mod=document&uid=351)