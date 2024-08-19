---
slug: relational-database-ddl-dml-tcl-dcl
title: '[SQL] 05. 관계형 데이터베이스'
date:
    created: 2022-08-11
description: >
    SQL 기본: 관계형 데이터베이스, DDL, DML, TCL, DCL
categories:
    - Data Engineering
tags:
    - database
    - RDB
    - SQL
---

SQL 기본: 관계형 데이터베이스, DDL, DML, TCL, DCL  

<!-- more -->

---

## 1. 관계형 데이터베이스

### 1-1. 데이터베이스

**데이터베이스(Database, DB)**는 데이터가 저장된 저장소와 저장된 데이터를 말한다.  

!!! note
    데이터베이스는 Key-Value store, Document, Graph, Network 등 다양한 종류가 있는데, 데이터를 테이블에 직관적으로 간단하게 나타내는 관계형 모델을 기반으로 하는 **관계형 데이터베이스(Relational Database)**가 실무적으로 가장 많이 사용된다.  

데이터베이스를 관리하기 위한 소프트웨어를 **DBMS(Database Management System)**라 하는데, 효율적인 데이터 관리, 데이터 손상 방지, 필요 시 데이터 복구 등의 기능을 제공한다.  

### 1-2. SQL

**SQL(Structured Query Language)**은 관계형 데이터베이스에서 데이터 정의/조작/제어를 하기 위해 사용하는 언어이다. SQL의 종류는 다음과 같다.  

- [DDL](#2-ddl): `CREATE`, `ALTER`, `DROP`, `RENAME`
- [DML](#3-dml): `SELECT`, `INSERT`, `UPDATE`, `DELETE`
- [TCL](#4-tcl): `COMMIT`, `ROLLBACK`
- [DCL](#5-dcl): `GRANT`, `REVOKE`

### 1-3. 테이블

**테이블(Table)**은 데이터를 저장하는 객체(Object)로, 관계형 데이터베이스의 기본 단위이다. 테이블의 열을 칼럼(Column), 가로 방향을 행(Row)이라고 하고, 열과 행이 겹치는 하나의 공간을 필드(Field)라고 한다.  

!!! note
    테이블을 분할하여 데이터의 불필요한 중복을 줄이는 것을 [정규화(Normalization)](./2022-08-07-database_normalization.md/#2-정규화)라고 한다. 정규화(Normalization)를 통해 데이터의 정합성을 확보하고, 데이터 입력/수정/삭제 시 발생할 수 있는 이상 현상(Anomaly)을 방지할 수 있다.  

테이블의 각 행을 한 가지 의미로 특정할 수 있는 한 개 이상의 칼럼을 **기본키(Primary Key, PK)**라고 하며, 다른 테이블의 기본 키로 사용되면서 테이블과의 관계를 연결하는 역할을 하는 칼럼을 **외부키(Foreign Key, FK)**라고 한다.  

### 1-4. ERD

**ERD(Entity Relationship Diagram)**는 테이블 간의 관계를 표현하는 도식으로, 관계의 의미를 직관적으로 표현해준다는 장점이 있다.  

## 2. DDL

**DDL(Data Definition Language)**은 데이터 정의어로 테이블을 생성하고 생성된 테이블의 구조를 변경하는 명령어들이다. 명령어에 따른 작업이 **즉시 완료(Auto Commit)**된다.  

### 2-1. CREATE TABLE

테이블 생성 시에는 테이블에 입력될 데이터를 정의하고, 정의한 데이터의 유형을 선언한다.  

```sql
CREATE TABLE table_name (col_name_1 datatype dafault_val, col_name_2 datatype dafault_val);
```

생성된 테이블의 구조를 확인하는 방법은 아래와 같다.  

```sql
-- Oracle
DESCRIBE table_name;
DESC table_name;

-- MSSQL
sp_help 'dbo.table_name';
```

테이블 생성 시의 유의점은 다음과 같다.  

- 테이블명으로 객체를 의미할 수 있는 이름 사용. 가능한 단수형
- 테이블명의 중복 금지, 테이블 내의 칼럼명 중복 금지
- 테이블의 각 칼럼들은 괄호`()`로 묶어 지정
- 각 칼럼들은 콤마`,`로 구분. 테이블 생성문의 끝은 반드시 세미콜론`;`
- 칼럼의 데이터 유형 반드시 지정
- 테이블명과 칼럼명은 반드시 문자로 시작. `A-Z, a-z, 0-9, _, $, #` 문자만 허용

기존 테이블을 이용해 테이블을 생성하면 CTAS(Create Table As Select) 방법을 이용하면 칼럼별 데이터 유형에 대한 정의도 복사해올 수 있다. 다만 제약조건은 Oracle의 경우 `NOT NULL`, MSSQL의 경우 `Identity` 속성만 복제 된다.  

```sql
-- Oracle
CREATE TABLE table_name AS SELECT expression FROM table_name;

-- MSSQL
SELECT expression INTO table_name FROM table_name; 
```

특정 칼럼을 정의할 때 선언한 **데이터 유형(Data Type)**은 그 칼럼이 받아들일 수 있는 자료의 유형을 규정한다. 기본적인 데이터 유형들은 다음과 같다.  

- `CHARACTER(s)`
    - 고정 길이 문자열 정보. 크기(s)가 고정되어 있어 입력값이 s 보다 작으면 빈 공간으로 채워서 저장함.
    - 'AA' = 'AA '
- `VARCHAR(s)`
    - 가변 길이 문자열 정보. 할당된 변수값의 바이트만 적용.
    - 'AA' != 'AA '
- `NUMERIC`
    - 정수, 실수 등 숫자 정보
- `DATETIME`
    - 날짜 및 시각 정보

특정 칼럼에 적용하는 **제약조건(constraint)**의 종류들은 다음과 같다.  

- `PRIMARY KEY`(기본키)
    - 하나의 테이블에 하나의 기본키 제약만 정의할 수 있음
    - 기본키 제약 = 고유키 제약 & NOT NULL
- `UNIQUE KEY`(고유키)
    - 기본키와 비슷하나 NULL은 제약 대상이 아님
- `NOT NULL`
    - NULL 값 입력 금지
- `CHECK`
    - TRUE/FALSE를 반환하는 논리식을 통해 입력값 제한
- `FOREIGN KEY`(외래키)
    - 테이블 간의 관계 정의를 위한 외래키 지정

!!! tip
    여러 칼럼에 PK를 설정할 수 있지만 그 경우 복합키인 하나의 PK로 작동한다.  

!!! info
    `NULL`과 공백은 다르다. `NULL`은 '아직 정의되지 않은 미지의 값' 또는 '현재 데이터를 입력하지 못하는 경우'를 의미한다.  

### 2-2. ALTER TABLE

테이블 구조 변경을 위한 명령어들로, 세부 명령어들은 다음과 같다.  

**ADD**

기존 테이블에 칼럼을 추가하는 명령어로, 추가된 칼럼은 테이블의 마지막 칼럼이 된다.  

```sql
ALTER TABLE table_name ADD col_name datatype;
```

**DROP COLUMN**

테이블에서 칼럼을 삭제하는 명령어로, 한 번에 하나의 칼럼만 삭제 가능하며 칼럼 삭제 후 최소 하나 이상의 칼럼이 테이블에 존재해야 한다. 삭제된 칼럼은 복구가 불가능하다.  

```sql
ALTER TABLE table_name DROP COLUMN col_name;
```

**MODIFY COLUMN**

테이블의 칼럼에 대한 정의를 변경하는 명령어로, 데이터 유형, 디폴트 값, 제약조건 등을 변경할 수 있다. Oracle과 MSSQL이 조금 다르다.  

```sql
-- Oracle
ALTER TABLE table_name MODIFY (col_name_1 datatype dafault_value NOT NULL, col_name_2 datatype …);

-- MSSQL
ALTER TABLE table_name ALTER col_name datatype dafault_value NOT NULL;
```

!!! info
    MSSQL은 여러 칼럼을 동시에 수정하는 문법을 지원하지 않는다.  

칼럼 변경 시에는 다음과 같은 점들을 고려햐야 한다.  

- 칼럼의 크기를 늘릴 수 있지만 줄이지는 못함. 기존 데이터가 훼손될 수 있음
    - 칼럼의 모든 값이 `NULL`이거나 테이블에 아무 행도 없으면 칼럼의 폭을 줄일 수 있음
- 칼럼의 모든 값이 `NULL`이면 데이터 유형 변경 가능
- 칼럼의 `DEFAULT`값을 바꾸면 변경 작업 이후 발생하는 행 삽입에만 적용
- 칼럼에 `NULL`값이 없을 경우에만 `NOT NULL` 제약조건 추가 가능

**RENAME COLUMN**

칼럼명을 변경하기 위해 사용하는 명령어로, 일부 DBMS에서는 칼럼명 변경 시 관계된 제약조건도 자동으로 변경된다.  

```sql
-- Oracle
ALTER TABLE table_name RENAME COLUMN old_name TO new_name;

-- MSSQL
sp_rename old_name, new_name, 'COLUMN';
```

!!! info
    MSSQL의 `sp_rename`은 칼럼 뿐만 아니라 여러 가지 객체의 이름을 바꾸는데도 [사용](#2-3-rename-table)된다. 상세 내용은 [공식 문서](https://learn.microsoft.com/ko-kr/sql/relational-databases/system-stored-procedures/sp-rename-transact-sql?view=sql-server-ver16#----object_type) 참고  

**DROP CONSTRAINT**

제약조건을 삭제한다.  

```sql
ALTER TABLE table_name DROP CONSTRAINT con_name;
```

**ADD CONSTRAINT**

제약조건을 추가한다.  

```sql
ALTER TABLE table_name ADD CONSTRAINT con_name con_type (col_list);
```

### 2-3. RENAME TABLE

테이블의 이름을 변경한다.  

```sql
-- Oracle
RENAME old_name TO new_name;

-- MSSQL
sp_rename 'old_name', 'new_name';
```

### 2-4. DROP TABLE

테이블을 삭제한다.  

```sql
DROP TABLE table_name;

-- Oracle
DROP TABLE table_name CASCADE CONSTRAINT;
```

!!! warning
    `DROP TABLE`은 로그를 남기지 않는다.  

Oracle의 `CASCADE CONSTRAINT`옵션은 해당 테이블과 관계되 참조되는 제약조건에 대해서도 삭제한다는 것을 의미한다. MSSQL의 경우에는 `CASCADE CONSTRAINT`옵션이 없으며, 테이블을 삭제하기 전에 참조하는 Foreign Key 제약조건 또는 참조하는 테이블을 먼저 삭제해야 한다.  

### 2-5. TRUNCATE TABLE

해당 테이블에 들어있는 모든 행을 제거하고 저장공간을 재사용 가능하도록 한다. 로그를 남기지 않아 정상적인 복구가 불가능하므로 주의해야 한다.  

```sql
TRUNCATE TABLE table_name;
```

!!! warning
    `TRUNCATE TABLE`은 로그를 남기지 않는다.  

## 3. DML

**DML(Data Manipulation Language)**은 데이터 조작어로 테이블을 조작(자료 입력, 수정, 삭제, 조회)을 위한 명령어들이다.  

DDL 명령어들과는 달리 명령어가 테이블에 반영되려면 `COMMIT` 명령어를 통해 트랜잭션을 종료해야 한다. 다만 DML 명령어 이후에 DDL 명령어가 입력되면 DDL의 Auto Commit으로 인해 같이 Commit 된다.  

### 3-1. INSERT

테이블에 데이터를 입력하는 명령어로, 문자열을 입력해야할 경우 입력값에 `''`으로 표시한다.  

```sql
-- insert value into called column
INSERT INTO table_name (col_list) VALUES (val_list);

-- insert value into all column
INSERT INTO table_name VALUES (val_list);
```

### 3-2. UPDATE

입력된 정보를 수정한다.  

```sql
UPDATE table_name SET col = new_value WHERE expression;
```

### 3-3. DELETE

데이터를 삭제한다. `WHERE`절이 없으면 테이블의 전체 데이터를 삭제한다.  

```sql
DELETE FROM table_name WHERE expression;
```

### 3-4. SELECT

데이터를 조회한다. 해당 테이블의 모든 칼럼을 조회하고 싶을 경우에는 와일드카드로 `*`를 사용하여 조회하면 된다. 데이터의 변형 없이 조회만 하기 때문에 `ROLLBACK`의 대상이 되지 않는다.  

```sql
-- return all column
SELECT * FROM table_name;

-- return all row
SELECT (col_list) FROM table_name;

-- use ALIAS
SELECT col_name AS alias FROM table_name;

-- return unique values
SELECT DISTINCT col AS alias FROM table_name;
```

`ALIAS`에 공백 및 특수문자를 사용하거나 대소문자 구분이 필요할 경우 `""`으로 묶어줘야 한다.  

### 3-5. 연산자

- 산술 연산자

`()`, `*`, `/`, `+`, `-`를 이용해서 산술 연산 된 결과를 조회할 수 있다.  

- 합성 연산자

문자와 문자를 연결하는 **합성(Concatenation)** 연산을 통해 유용한 결과를 출력할 수 있다.  

```sql
-- Oracle
SELECT col || 'CHAR' FROM table_name;

-- MSSQL
SELECT col + 'CHAR' FROM table_name;
```

## 4. TCL

**트랜잭션(Transaction)**은 데이터베이스의 논리적 연산단위로, 분리될 수 없는 한 개 이상의 데이터베이스 조작을 말한다. **TCL(Transaction Control Language)**은 트랜잭션 제어어로 트랜잭션을 제어하기 위한 명령어들이다.  

트랜잭션의 특성은 다음과 같다.  

- 원자성(Atomicity)
    - 트랜잭션에서 정의된 연산들은 모두 성공하거나 전혀 실행되지 않아야 함
    - 원자성의 확보를 위해 잠금(Locking)이 적용됨
- 일관성(Consistency)
    - 트랜잭션이 실행되기 전의 데이터베이스 내용이 잘못 되어 있지 않다면 트랜잭션이 실행된 이후에도 데이터베이스의 내용에 잘못이 없어야 함
- 고립성(Isolation)
    - 트랜잭션이 실행되는 도중에 다른 트랜잭션의 영향을 받아 잘못된 결과를 반환하면 안 됨
- 지속성(Durability)
    - 트랜잭션이 성공적으로 수행되면 그 트랜잭션이 갱신한 데이터베이스의 내용은 영구적으로 저장됨

### 4-1. TCL의 사용 효과

`COMMIT`과 `ROLLBACK`을 사용함으로써 다음과 같은 효과를 볼 수 있다.  

- 데이터 무결성 보장
- 영구적인 변경을 하기 전에 데이터의 변경 사항 확인 가능
- 논리적으로 연관된 작업을 그룹핑하여 처리 가능

### 4-2. TCL과 데이터 상태

트랜잭션이 시작된 이후 `COMMIT`, `ROLLBACK` 이전의 데이터 상태는 다음과 같다.  

- 메모리 Buffer에만 영향을 받았기 때문에 데이터의 변경 이전 상태로 복구 가능
- 현재 사용자는 `SELECT` 명령어로 결과 확인 가능
- 다른 사용자는 현재 사용자가 수행한 명령의 결과를 볼 수 없음
- 변경된 행은 잠금(Locking)이 설정되어 다른 사용자가 변경할 수 없음

반대로 `COMMIT`, `ROLLBACK`이 실행되면 데이터의 상태는 다음과 같다.  

- 데이터에 대한 변경 사항이 데이터베이스에 반영되어 이전 데이터는 영원히 삭제됨
- 모든 사용자가 결과를 볼 수 있음
- 관련된 행에 대한 잠금(Locking)이 풀리고, 다른 사용자들이 행을 조작할 수 있음

### 4-3. COMMIT

트랜잭션을 완료한다. SQL문에 문제가 없다고 판단될 경우에 사용한다.  

```sql
COMMIT;
```

Oracle의 경우 DBMS가 트랜잭션을 내부적으로 실행하며 사용자가 `COMMIT` 혹은 `ROLLBACK`을 수행해 주어야 트랜잭션이 종료되지만, MSSQL의 경우 기본적으로 Auto Commit 모드이기 때문에 `COMMIT`과 `ROLLBACK`을 사용하려면 암시적/명시적 트랜잭션을 설정해야 한다. MSSQL의 트랜잭션은 다음의 세 가지 방식으로 이루어진다.

- Auto Commit
    - SQL Server의 기본 방식. `DML`, `DDL`을 수행할 때마다 DBMS가 트랜잭션을 컨트롤하는 방식. 명령어가 성공적으로 수행되면 자동으로 `COMMIT`을 수행하고 오류가 발생하면 자동으로 `ROLLBACK`을 수행
- 암시적 트랜잭션
    - Oracle과 같은 방식. 트랜잭션의 시작은 DBMS가 처리하고 트랜잭션의 끝은 사용자가 명시적으로 `COMMIT` 또는 `ROLLBACK`으로 처리
    - 인스턴스 단위 또는 세션 단위로 설정할 수 있음
- 명시적 트랜잭션(Oracle/MSSQL)
    - 트랜잭션의 시작과 끝을 모두 사용자가 명시적으로 지정하는 방식. `BEGIN TRANSACTION`/`BEGIN TRAN`으로 트랜잭션을 시작하고 `COMMIT TRANSACTION`/`COMMIT` 또는 `ROLLBACK TRANSACTION`/`ROLLBACK`으로 트랜잭션을 종료
    - `ROLLBACK` 구문을 만나면 전체 구문의 역순으로 최초의 `BEGIN TRANSACTION` 시점까지 `ROLLBACK` 수행

### 4-4. ROLLBACK

DML 명령어로 인한 테이블의 변경을 취소한다.  

```sql
ROLLBACK;
```

### 4-5. SAVEPOINT

저장점(`SAVEPOINT`)을 정의하면 롤백(`ROLLBACK`)할 때 트랜잭션을 `SAVEPOINT`까지의 일부만 롤백할 수 있다. 앞선 시점의 저장점으로 한번 롤백하면, 그 저장점 이후에 설정한 저장점은 무효가 된다.  

```sql
-- Oracle
SAVEPOINT save_name;

ROLLBACK TO save_name;

-- MSSQL
SAVE TRANSACTION save_name;

ROLLBACK TRANSACTION save_name;
```

## 5. DCL

**DCL(Data Control Language)**은 유저의 생성과 권한 제어를 위한 명령어들이다.  

### 5-1. 유저와 권한

Oracle과 MSSQL의 사용자에 대한 아키텍처의 차이점은 아래와 같다.  

- Oracle
    - 유저를 통해 데이터베이스에 접속을 하는 형태
    - 아이디/비밀번호 방식으로 인스턴스에 접속하여, 해당 스키마에서의 권한을 부여받음
- MSSQL
    - 인스턴스에 접속하기 위해 로그인 생성
    - 인스턴스 내에 존재하는 데이터베이스에 연결하여 작업하기 위해 유저를 생성한 후 로그인과 유저 매핑
    - Windows 인증 방식과 혼합 모드(Windows 인증 또는 SQL 인증) 방식이 존재

유저의 권한에 대한 세부 명령어들은 아래와 같다.  

#### GRANT/REVOKE

유저에게 명령어에 대한 권한을 부여하고 회수한다. DBA(Database Administration) 권한을 갖고 있는 유저만 사용 가능하다.  

```sql
GRANT privilege ON table_name TO ID;

REVOKE privilege FROM ID;
```

#### CREATE USER

유저를 생성한다. MSSQL에서의 유저는 데이터베이스마다 존재하기 때문에, 유저를 생성하기 위해서는 유저가 속할 데이터베이스로 이동을 한 후 처리해야 한다.  

```sql
-- Oracle
CREATE USER ID IDENTIFIED BY password;

-- MSSQL
USE database_name;
GO CREATE USER ID FOR LOGIN ID WITH DEFAULT_SCHEMA=default_schema;
```

#### CREATE LOGIN/CREATE SESSION

MSSQL에서는 유저 생성 이전에 로그인을 먼저 생성해야 한다.

```sql
CREATE LOGIN ID WITH PASSWORD='password', DEFAULT_DATABASE='database_name';
```

Oracle에서는 로그인을 위해 `CREATE SESSION` 사용 권한이 필요하다.  

```sql
GRANT CREATE SESSION TO ID;
```

#### DROP USER

유저를 삭제한다.  

```sql
-- delete user
DROP USER ID;

-- delete user's object first and delete user
DROP USER ID CASCADE;
```

### 5-2. Object에 대한 권한 부여

**오브젝트 권한(Object Privilege)**은 특정 오브젝트인 테이블, 뷰 등에 대한 `SELECT`, `INSERT`, `DELETE`, `UPDATE` 작업 명령어를 의미한다.  

!!! note
    유저는 자신이 생성한 테이블 외에 다른 유저의 테이블에 접근하려면 해당 테이블에 대한 오브젝트 권한을 소유자로부터 부여받아야 한다. 오브젝트를 소유하는 것은 유저가 아니고 스키마이며 유저는 스키마에 대해 특정한 권한을 가진다는 점을 주의할 것  

### 5-3. 사용자 권한 관리

사용자는 [DDL](#2-ddl) 문장은 그에 해당하는 **시스템 권한(System Privilege)**, 객체에 대한 명령어는 **오브젝트 권한(Object Privilege)**을 [`GRANT`](#5-1-유저와-권한)를 통해 부여받아야만 SQL문을 실행할 수 있다. Oracle과 MSSQL에서 사용자의 권한을 편하게 관리하는 방법은 다음과 같다.  

#### Role을 이용한 권한 부여

Oracle은 데이터베이스 관리자가 유저별 권한 부여를 편하게 관리할 수 있도록 `ROLE` 기능을 제공한다. 데이터베이스 관리자는 생성한 `ROLE`에 시스템 권한과 오브젝트 권한을 모두 부여할 수 있으며, 생성된 `ROLE`은 유저에게 직접 부여되거나, 다른 `ROLE`에 포함하여 유저에게 부여된다.  

```sql
-- create role
CREATE ROLE role_name;

-- grant privilege to role
GRANT privilege TO role_name;

-- revoke role_name from role
REVOKE privilege FROM role_name;

-- grant role to user
GRANT role_name TO ID;
```

Oracle에서는 기본적으로 몇 가지 `ROLE`을 제공하며, 그 중 `CONNECT`와 `RESOURCE`를 가장 많이 사용한다. `CONNECT`와 `RESOURCE` `ROLE`에 부여된 권한 목록은 다음과 같다.  

- `CONNECT`
    - `ALTER SESSION`, `CREATE CLUSTER`, `CREATE DATABASE LINK`, `CREATE MENU_SEQUENCE`, `CREATE SESSION`, `CREATE SYNONYM`, `CREATE TABLE`, `CREATE VIEW`
- `RESOURCE`
    - `CREATE CLUSTER`, `CREATE INDEXTYPE`, `CREATE OPERATOR`, `CREATE PROCEDURE`, `CREATE MENU_SEQUENCE`, `CREATE TABLE`, `CREATE TRIGGER`, `CREATE`

#### 서버 수준/데이터베이스 Role

MSSQL에서는 `ROLE`을 직접 생성하는 방법 보다는 기본 제공하는 `ROLE`에 멤버로 참여하는 방식을 주로 사용하며, 필요한 권한에 따라 서버 수준과 데이터베이스 수준의 `ROLE`을 부여한다.  

---
## Reference
- [관계형 데이터베이스 개요](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=337)
- [DDL](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=338)
- [DML](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=339)
- [TCL](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=4&mod=document&uid=340)
- [DCL](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=3&mod=document&uid=352)