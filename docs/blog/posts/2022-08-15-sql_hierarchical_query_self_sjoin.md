---
slug: sql-hierarchical-query-self-join
title: '[SQL] 08. 계층형 질의, 셀프 조인'
date:
    created: 2022-08-15
description: >
    SQL 활용: 계층형 질의, 셀프 조인
categories:
    - Data Engineering
tags:
    - database
    - RDB
    - SQLD
---

SQL 활용: 계층형 질의, 셀프 조인  

<!-- more -->

---

## 1. 계층형 질의

계층형 데이터란 동일 테이블에 계층적으로 상위와 하위 데이터가 포함된 데이터를 말하며, 계층형 데이터를 조회하기 위해서 **계층형 질의(Hierarchical Query)**를 사용한다.  

### 1-1. Oracle의 계층형 질의

Oracle의 계층형 질의 구문은 다음과 같다.  

```sql
SELECT col_name
FROM table_name
WHERE expression AND expression
START WITH expression
CONNECT BY NOCYCLE expression AND expression
ORDER SIBLINGS BY col_name_1, col_name_2
```

- `START WITH`
    - 계층 구조 전개의 시작 위치 지정(루트 데이터 지정, 액세스)
- `CONNECT BY`
    - 다음에 전개될 자식 데이터를 지정(조인)
- `PRIOR`
    - `CONNECT BY`절, `SELECT`절, `WHERE`절에 사용되어 계층 지정
    - `PRIOR child = parent` 형태이면 계층구조의 자식 데이터에서 부모 데이터(자식 → 부모) 방향으로 전개하는 순방향 전개
    - `PRIOR parent = child` 형태이면 부모 데이터에서 자식 데이터(부모 → 자식) 방향으로 전개하는 역방향 전개
- `NOCYCLE`
    - 사이클(Cycle)은 데이터를 전개하면서 이미 나타났던 동일한 데이터가 전개 중에 다시 나타나는 것을 말하며, 사이클이 발생한 데이터는 런타임 오류가 발생
    - `NOCYCLE`을 추가하면 사이클이 발생한 이후의 데이터는 전개하지 않음
- `ORDER SIBLINGS BY`
    - 형제 노드(동일 LEVEL) 사이에서 정렬 수행
- `WHERE`
    - 모든 전개를 수행한 후에 지정된 조건을 만족하는 데이터만 추출(필터링)

Oracle은 계층형 질의를 사용할 때 다음과 같은 가상 칼럼(Pseudo Column)을 제공한다.  

- `LEVEL`
    - 루트 데이터가 1, 리프 데이터까지 1씩 증가
- `CONNECT_BY_ISLEAF`
    - 전개 과정에서 해당 데이터가 리프 데이터이면 1, 아니면 0
- `CONNECT_BY_ISCYCLE`
    - 전개 과정에서 자식을 갖는데 해당 데이터가 조상으로서 존재하면 1, 그렇지 않으면 0

Orcle은 계층형 질의 사용 시 사용자 편의성을 위해 아래와 같은 함수를 제공한다.  

- `SYS_CONNECT_BY_PATH(col, delimiter)`
    - 루트 데이터부터 현재 전개할 데이터까지의 경로 표시
- `CONNECT_BY_ROOT`
    - 현재 전개할 데이터의 루트 데이터 표시

### 1-2. MSSQL의 계층형 질의

SQL Server 2000 버전까지는 계층형 질의를 사용하기 위해서는 계층적 구조를 가진 데이터는 저장 프로시저를 재귀 호출(CTE, Common Table Expression)하거나 While 루프 문에서 임시 테이블을 사용하는 등 (순수한 쿼리가 아닌) 프로그래밍 방식으로 전개해야한다.  

CTE 쿼리에서 UNION ALL 연산자로 쿼리 두 개를 결합하여 처리하는데, 둘 중 위에 있는 쿼리를 앵커 멤버(Anchor Member)라고 하고 아래에 있는 쿼리를 재귀 멤버(Recursive Member)라고 한다. 재귀적 쿼리의 처리 과정은 아래와 같다.  

1. CTE 식을 앵커 멤버와 재귀 멤버로 분할
1. 앵커 멤버를 실행하여 첫 번째 호출 또는 기본 결과 집합(T0) 생성
1. Ti는 입력으로 사용하고 Ti+1은 출력으로 사용하여 재귀 멤버를 실행
1. 빈 집합이 반환될 때까지 3단계를 반복
1. 결과 집합 반환. 이것은 T0에서 Tn까지의 UNION ALL과 같음

## 2. 셀프 조인

**셀프 조인(Self Join)**이란 동일 테이블 사이의 조인을 말하며, `FROM` 절에 동일 테이블이 두 번 이상 나타난다. 기본적인 SQL문은 아래와 같다.  

```sql
SELECT alias_1.col_name, alias_2.col_name, ...
FROM table_1 AS alias_1, table_2 AS alias_2
WHERE alias_1.col_name = alias_2.col_name;
```

!!! info
    셀프 조인의 경우 조인 연산의 테이블과 칼럼 이름이 모두 동일하기 때문에 식별을 위해 반드시 테이블 별칭(`Alias`)을 사용해야 하며, 칼럼에도 모두 테이블 별칭을 사용해서 어느 테이블의 칼럼인지 식별해줘야 한다.  

---
## Reference
- [계층형 질의와 셀프 조인](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=3&mod=document&uid=348)
