---
published: true
layout: post
title: '[Docker] 도커 기반 데이터베이스 설치'
description: >
    도커를 활용해서 데이터베이스 간단 설치하는 방법
categories: [ServerEngineering]
tags: [database, RDB, docker, oracle, SQL Server, MySQL, MariaDB, PostgreSQL]
image:
    path: /assets/img/posts/thumbnail_docker.png
related_posts:
    - _posts/swengineering/2023-06-11-docker_commands.md
---
* toc
{:toc}

## 도커로 데이터베이스를 사용하는 이유

데이터베이스는 항상 켜져있는게 기본 스펙이다 보니 키고 끄는 기능이 제대로 지원되지도 않고, 컴퓨터의 시작 프로그램 목록으로 관리가 되지 않는 경우가 있어 설치해두면 개발용 컴퓨터의 성능을 잡아먹는다.  

도커로 데이터베이스를 사용하면 도커 컨테이너를 키고 끄는 것을 통해서 개발용 데이터베이스 관리를 용이하게 하고 리소스를 절약할 수 있다.  

## Oracle-XE

### 이미지 다운로드

`gvenzl/oracle-xe` 이미지는 공식 이미지는 아니지만 다운로드 횟수가 `1M+`을 찍을 정도로 많이 사용중이다.  

```powershell
docker pull gvenzl/oracle-xe
```

만약 공식 이미지를 사용하고 싶다면 [링크](https://hub.docker.com/_/oraclelinux) 참고

### 컨테이너 생성

```powershell
docker run -d -p 1521:1521 -e ORACLE_PASSWORD=<password> --name oracle-xe gvenzl/oracle-xe
```

## Microsoft SQL Server

### 이미지 다운로드

```powershell
docker pull mcr.microsoft.com/mssql/server
```

### 컨테이너 생성

```powershell
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<YourNewStrong@Passw0rd>" -p 1433:1433 --name mssql --hostname mssql -d mcr.microsoft.com/mssql/server
```

MSSQL은 비밀번호 조건이 강력하고, 해당 조건을 맞추지 못하면 컨테이너가 구동되지 않기 때문에 주의해야 한다. 암호의 조건은 아래와 같다.  

- 8자 이상
- 대문자, 소문자, 0~9까지의 숫자 및 기호 네 가지 집합 중 세 집합의 문자를 포함

### 기본 DB 확인 및 데이터베이스 접속

**SSMS 사용**

SQL Server는 SSMS(SQL Server Management Studio)를 사용해서 접속해보면 기본 생성되는 시스템 데이터베이스를 확인할 수 있다.  

SSMS에서 사용할 데이터베이스를 생성한 후 신규 생성한 데이터베이스로 바로 접속해도 되고, master, msdb, tempdb 등 시스템 데이터베이스로 접속한 후 사용할 데이터베이스를 생성해 사용해도 된다.  

**sqlcmd** 사용

SSMS를 사용하고 싶지 않다면 sqlcmd를 통해 확인할 수 있다.  

- 컨테이너 접속

```powershell
docker exec -it mssql "bash"
```

- sqlcmd 실행

```powershell
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "<YourNewStrong@Passw0rd>"
```

- 쿼리 입력

```sql
SELECT Name from sys.databases;
```

- 쿼리 실행

```sql
GO
```
```
Name
-----------------------------------
master
tempdb
model
msdb
```

## MySQL

### 이미지 다운로드

```powershell
docker pull mysql
```

### 컨테이너 생성

```powershell
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<password> -d mysql:latest
```

### 기본 DB 확인 및 데이터베이스 접속

- 컨테이너 접속

```powershell
docker exec -it mysql bash
```
```powershell
bash-4.4#
```

- MySQL 접속 및 `MYSQL_ROOT_PASSWORD` 입력

```powershell
mysql -u root -p
```
```
Enter password:
```
```
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.33 MySQL Community Server - GPL

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

- 데이터베이스 목록 출력

```sql
SHOW DATABASES;
```
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)
```

`mysql` 데이터베이스 등 system DB로 초기 접속 후 사용할 데이터베이스를 생성하면 된다.  

### 트러블슈팅

- Public key retrieval is not allowed 에러

최신 버전의 MySQL은 접속하려고 하면 `Public key retrieval is not allowed` 에러가 뜬다. 아래와 같이 주소에 `allowPublicKeyRetrieval=true` 옵션을 주거나 DB툴에서 `Allow public key retrieval` 옵션을 설정해주면 된다.

```
jdbc:mysql://localhost:3306/mysql?allowPublicKeyRetrieval=true
```

## MariaDB

### 이미지 다운로드

```powershell
docker pull mariadb
```

### 컨테이너 생성

```powershell
docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<password> mariadb:latest
```

`MYSQL_ROOT_PASSWORD` 옵션은 `MARIADB_ROOT_PASSWORD`으로 바꿔서 입력해도 된다.  

### 기본 DB 확인 및 데이터베이스 접속

- 컨테이너 접속

```powershell
docker exec -it mariadb /bin/bash
```

- MariaDB 접속 및 `MYSQL_ROOT_PASSWORD` 입력

```powershell
mariadb -u root -p
```
```
Enter password:
```
```
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 3
Server version: 11.0.2-MariaDB-1:11.0.2+maria~ubu2204 mariadb.org binary distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]>
```

- 데이터베이스 목록 출력

```sql
SHOW DATABASES;
```
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

`mysql` 데이터베이스 등 system DB로 초기 접속 후 사용할 데이터베이스를 생성하면 된다.  

## PostgreSQL

### 이미지 다운로드

```powershell
docker pull postgres
```

### 컨테이너 생성

```powershell
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

### 기본 DB 확인 및 데이터베이스 접속

- 컨테이너 접속

```powershell
docker exec -it postgres /bin/bash
```

- PostgreSQL 접속

```powershell
psql -U postgres
```
```
psql (15.2 (Debian 15.2-1.pgdg110+1))
Type "help" for help.

postgres=#
```

- 데이터베이스 목록 출력

```powershell
\l
```
```
                                                List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |   Access privileges
-----------+----------+----------+------------+------------+------------+-----------------+-----------------------
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
           |          |          |            |            |            |                 | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
           |          |          |            |            |            |                 | postgres=CTc/postgres
(3 rows)
```

`postgres` 데이터베이스로 접속 후 사용할 데이터베이스를 생성하면 된다.  