---
slug: mysql-max-connections
title: MySQL, MariaDB 최대 접속 설정
date:
    created: 2024-02-22
description: >
    MySQL, MariaDB 최대 동시 접속 제한 설정 확인 및 수정 방법
categories:
    - Data Engineering
tags:
    - database
    - mysql
    - mariadb
---

MySQL, MariaDB 최대 동시 접속 제한 설정 확인 및 수정 방법  

<!-- more -->

---

## 트러블슈팅

업무 중에 MariaDB에서 아래와 같은 이슈가 발생했다.  

```
Could not connect to HostAddress{host='0.0.0.0', port=3306, type='master'}. Too many connections
```

찾아보니 최대 접속을 모두 사용해서 발생한 일이라고 하는데, `max_connections` 옵션에 대한 설정을 변경해서 해결할 수 있었다.  

## 확인 방법

- 현재 설정 확인

```sql
SHOW GLOBAL VARIABLES LIKE 'max_connect%';
```
```
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| max_connect_errors | 100   |
| max_connections    | 151   |
+--------------------+-------+
```

!!! note
    MariaDB [공식 문서](https://mariadb.com/kb/en/server-system-variables/#max_connections)에 따르면, MariaDB는 superuser를 위한 connection 하나를 반드시 남겨놓는다고 한다.  

- 현재 접속 커넥션 통계 확인

```sql
SHOW STATUS LIKE 'threads_connected';
```
```
+-------------------+-------+
| Variable_name     | Value |
+-------------------+-------+
| Threads_connected | 4     |
+-------------------+-------+
```

- 최대 접속(peak) 통계 확인

```sql
SHOW STATUS LIKE 'max_used_connections';
```
```
+----------------------+-------+
| Variable_name        | Value |
+----------------------+-------+
| Max_used_connections | 4     |
+----------------------+-------+
```

!!! tip
    MariaDB [공식 문서](https://mariadb.com/kb/en/handling-too-many-connections/)에 따르면, `threads_connected`는 현재 접속 통계만을 보여주기 때문에 `max_used_connections`을 사용하는 것이 더 유용하다.  

## 설정 방법

### 쿼리

```sql
SET GLOBAL max_connections = 300;
```

!!! note
    이 방법은 `SUPER` 권한이 있는 유저로만 사용 가능하다.  

### 설정 파일

`my.cnf`, `my.ini` 등 설정 파일에 `max_connections` 설정이 정의되어 있는 경우 서비스 재시작 시 해당 설정으로 변경되기 때문에 설정 파일 자체를 변경해줘야 한다. 자세한 내용은 [공식 문서](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/) 참고

!!! tip
    해당 파일들의 일반적인 위치는 아래와 같다.  

    - `/etc/my.cnf`, `/etc/mysql/my.cnf`
    - `$MARIADB_HOME/my.cnf`, `$MYSQL_HOME/my.cnf`

---
## Reference
- [max_connections](https://mariadb.com/docs/server/ref/mdb/system-variables/max_connections/)
