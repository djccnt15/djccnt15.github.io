---
slug: mysql-table-info
title: MySQL 테이블 정보
date:
    created: 2024-09-14
description: >
    MySQL 테이블 정보 보는 법
categories:
    - Data Engineering
tags:
    - mysql
---

MySQL 테이블 정보 보는 법  

<!-- more -->

---

## INFORMATION_SCHEMA

MySQL에서 테이블들의 정보를 한 번에 보고 싶을 때 아래와 같이 `INFORMATION_SCHEMA.TABLES` 명령어를 사용하면 된다.  

```sql
SELECT *
FROM INFORMATION_SCHEMA.TABLES;
```
```
TABLE_CATALOG|TABLE_SCHEMA      |TABLE_NAME                                          |TABLE_TYPE |ENGINE            |VERSION|ROW_FORMAT|TABLE_ROWS|AVG_ROW_LENGTH|DATA_LENGTH|MAX_DATA_LENGTH|INDEX_LENGTH|DATA_FREE|AUTO_INCREMENT|CREATE_TIME        |UPDATE_TIME|CHECK_TIME|TABLE_COLLATION   |CHECKSUM|CREATE_OPTIONS                       |TABLE_COMMENT                           |
-------------+------------------+----------------------------------------------------+-----------+------------------+-------+----------+----------+--------------+-----------+---------------+------------+---------+--------------+-------------------+-----------+----------+------------------+--------+-------------------------------------+----------------------------------------+
def          |shorturl          |django_migrations                                   |BASE TABLE |InnoDB            |     10|Dynamic   |        19|           862|      16384|              0|           0|        0|            19|2024-09-01 08:05:29|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |django_content_type                                 |BASE TABLE |InnoDB            |     10|Dynamic   |        16|          1024|      16384|              0|       16384|        0|            16|2024-09-01 08:05:29|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |auth_group_permissions                              |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       32768|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |auth_permission                                     |BASE TABLE |InnoDB            |     10|Dynamic   |        64|           256|      16384|              0|       16384|        0|            64|2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |auth_group                                          |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       16384|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_backofficelogs                             |BASE TABLE |InnoDB            |     10|Dynamic   |        19|           862|      16384|              0|           0|        0|            21|2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_dailyvisitors                              |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|           0|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_payplan                                    |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|           0|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_schedules                                  |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|           0|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_organization                               |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       16384|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_user                                       |BASE TABLE |InnoDB            |     10|Dynamic   |         2|          8192|      16384|              0|       32768|        0|             3|2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_user_groups                                |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       32768|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_user_user_permissions                      |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       32768|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_emailverification                          |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       16384|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_category                                   |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       32768|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_shortenedurl                               |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       49152|        0|             2|2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_statistic                                  |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       16384|        0|             2|2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |shorturl_trackingparams                             |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       16384|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |django_admin_log                                    |BASE TABLE |InnoDB            |     10|Dynamic   |         0|             0|      16384|              0|       32768|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
def          |shorturl          |django_session                                      |BASE TABLE |InnoDB            |     10|Dynamic   |         3|          5461|      16384|              0|       16384|        0|              |2024-09-01 08:05:30|           |          |utf8mb4_unicode_ci|        |                                     |                                        |
```

!!! warning
    MySQL 사용 시 일반적으로 사용하는 InnoDB의 경우, `TABLE_ROWS`, `DATA_LENGTH` 등 몇몇 항목에 대해 정확한 값을 제공해주지 않기 때문에 전적으로 신뢰해서는 안 된다.  

    > For other storage engines, **such as InnoDB, this value is an approximation**, and may vary from the actual value by as much as 40% to 50%. In such cases, use `SELECT COUNT(*)` to obtain an accurate count.  

    > **For InnoDB, DATA_LENGTH is the approximate amount** of space allocated for the clustered index, in bytes.  

---
## Reference
- [The INFORMATION_SCHEMA TABLES Table](https://dev.mysql.com/doc/refman/8.4/en/information-schema-tables-table.html)
