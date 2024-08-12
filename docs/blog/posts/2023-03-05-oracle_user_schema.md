---
slug: oracle-user-schema
title: Oracle 유저와 스키마
date:
    created: 2023-03-05
description: >
    오라클 유저 생성 및 ORA-01950 에러 해결 방법
categories:
    - Data Engineering
tags:
    - database
    - oracle
---

오라클 유저 생성 및 ORA-01950 에러 해결 방법  

<!-- more -->

---

## 1. 유저와 스키마

Oracle에서 schema란 데이터베이스 객체들의 집합이며, 사용자(user)에게 소속된다. schema는 user과 같은 이름을 갖는데, 실무적으로는 user를 생성하면 schema도 같이 생성된다.  

user와 schema를 생성하는 명령어는 아래와 같다.  

```sql
CREATE USER ID IDENTIFIED BY password;
```

## 2. 유저 권한 부여

오라클 디비를 만들고 나면 본격적으로 테이블을 만들고 각종 작업들을 해야하는데, `INSERT`문을 입력하면 아래와 같은 에러가 뜨면서 실행되지 않는다.  

```
[ORACLE] 오라클 ORA-01950: 테이블스페이스 'USERS'에 대한 권한이 없습니다.
```

오라클에서는 테이블을 저장하는 논리적 공간을 Tablespace라 하는데, 새로운 사용자는 기본적으로 `USERS`라는 Tablespace를 할당받는다.  

이 때 생성된 유저는 기본적으로 `USERS` Tablespace에 얼마만큼의 영역을 할당한 것인지 정해지지 않은 상태이기 때문에 데이터를 입력할 수 없어 `INSERT`에 대한 에러가 발생하는 것이다.  

따라서 아래와 같이 [GRANT](./2022-08-11-relational_database.md/#5-dcl)를 통해 관련 권한을 부여해주면 에러가 해결된다.  

```sql
-- 무제한 용량 권한 부여
GRANT UNLIMITED TABLESPACE TO user_name;
```

이렇게 부여된 시스템 권한 및 롤을 확인하는 쿼리는 아래와 같다.  

```sql
-- 시스템 권한 확인
SELECT * FROM DBA_SYS_PRIVS
WHERE GRANTEE = 'user_name';

-- 롤 확인
SELECT * FROM DBA_ROLE_PRIVS
WHERE GRANTEE = 'user_name';
```

Role에 부여된 권한은 ROLE_SYS_PRIVS 테이블에 정리되어 있기 때문에, 어느 롤이 어떤 권한을 갖고 있는지를 확인하려면 아래와 같이 쿼리를 입력하면 된다.  

```sql
SELECT * FROM ROLE_SYS_PRIVS
WHERE ROLE = 'RESOURCE';
```

---
## Reference
- [Overview of Schema Objects](https://docs.oracle.com/cd/B19306_01/server.102/b14196/schema.htm#CFHHBEGH)
- [Create Database Schemas](https://docs.oracle.com/en/cloud/paas/exadata-express-cloud/csdbp/create-database-schemas.html#GUID-955764C0-599E-4488-96EA-6E13A6FEBE9A)