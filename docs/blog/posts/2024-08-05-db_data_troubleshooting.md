---
slug: db-data-troubleshooting
title: DB 데이터 트러블슈팅 모음
date:
    created: 2024-08-05
description: >
    데이터베이스 데이터 관련 트러블슈팅 모음
categories:
    - Data Engineering
tags:
    - database
    - troubleshooting
---

데이터베이스 데이터 관련 트러블슈팅 모음  

<!-- more -->

---

## DB 한글 입력 깨짐 현상

DB의 COLLATE가 유니코드를 지원하지 않을 때 테이블에 한글 값 `INSERT`시 `??`로 입력된다. 이 경우 아래와 같이 N을 붙여서 입력하면 정상 작동한다.  

```sql
UPDATE <tb_name>
SET 
    col_name_1 = N'value_1',
    col_name_2 = N'value_2'
WHERE 
    ...
;
```

```sql
INSERT INTO <tb_name> (col_name_1, col_name_2, col_name_3)
values (N'value_1', N'value_2', N'value_3')
;
```
