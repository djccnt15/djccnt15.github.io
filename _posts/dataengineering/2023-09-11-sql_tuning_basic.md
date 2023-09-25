---
published: true
layout: post
title: '[SQL] SQL 조회 튜닝 팁'
description: >
    SQL 조회 쿼리 튜닝 기초 팁
categories: [DataEngineering]
tags: [database, RDB, SQL]
image:
    path: /assets/img/posts/thumbnail_sql.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## SQL 조회 쿼리 튜닝 기초 팁

1. Index 설정
    - 기초 중에 기초로, 조건절에 사용될 칼럼에 index를 설정할 것
2. WHERE 절 칼럼 변형 금지
    - 칼럼을 SUBSTR 등으로 변형하여 조회할 경우 해당 칼럼의 index를 사용할 수 없게 됨
3. 칼럼과 변수의 데이터 타입은 동일하게 사용할 것
    - VARCHAR로 지정된 숫자 칼럼의 경우 변수를 숫자로 사용하게 되면 내부적으로 칼럼에 TO_NUMBER 함수로 형변환을 하기 때문에 마찬가지로 index를 사용할 수 없게 됨
4. 한 테이블은 한번만 조회
    - 테이블에 여러 번 조회할수록 조회 성능이 저하됨
    - [SQL문의 수행 순서](/dataengineering/sql_where_groupby/#5-sql문-실행-순서)는 `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY`이기 때문에 한 테이블의 데이터는 한번에 가져오는 것이 IO 비용이 절감됨

---
## Reference
- [SQL 이렇게 작성하면 안돼요!](https://youtu.be/NZE-FmpV__M)

<iframe src="https://www.youtube.com/embed/NZE-FmpV__M" title="SQL 이렇게 작성하면 안돼요! 😵" frameborder="0" allowfullscreen></iframe>