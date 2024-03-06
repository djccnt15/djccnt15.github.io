---
slug: http-request-methods
title: HTTP 주요 Method 정리
date:
    created: 2023-03-19
description: >
    CRUD와 GET, POST, PUT, DELETE, PATCH
categories:
    - Web
tags:
    - web protocol
    - http
---

CRUD와 GET, POST, PUT, DELETE, PATCH  

<!-- more -->

---

## 1. CRUD와 HTTP Method

### GET

`GET`은 특정 정보를 요청하기 위한 method로 Read를 수행하기 위해 사용한다.  

### POST

`POST`는 Create를 수행하기 위해 사용한다. Create를 위한 데이터는 HTTP 메시지의 body 부분에 담겨서 전송되며, 일반적으로 HTML의 `<form>` 태그를 통해 전송된다.  

### PUT

`PUT`은 Create와 Update를 수행하기 위해 사용되는 method로 request payload를 통해 데이터를 전송한다.  

!!! note
    `POST`와 `PUT`의 가장 큰 차이점은 [멱등성(Idempotent)](https://en.wikipedia.org/wiki/Idempotence)[^1]의 충족 여부이다. `PUT`은 멱등성을 충족하나 `POST`는 멱등성을 충족하지 않는다.  

[^1]: 멱등성이란 수학의 함수와 같이 input이 일정하면 output도 일정한 성질을 말한다.  

### PATCH

`PATCH`는 Update를 수행하기 위해 사용하는 method로 데이터의 일부만 수정할 때 사용하며, 대부분의 경우에 `PUT`으로 대체 가능하기 때문에 굳이 사용하지는 않는 경우가 많다.  

!!! note
    `PATCH`는 반드시 멱등적이어야 하는 `PUT`과는 달리, 멱등적일수는 있지만 멱등적일 필요는 없다. 따라서 잘못된 `PATCH`의 사용은 `POST`와 마찬가지로 다른 리소스에 의도치 않은 부작용을 발생시킬 수 있다.  

### DELETE

`DELETE`는 Delete를 수행하기 위해 사용되는 method이다.  

## 2. 주요 Method 비교

| Method |       의미        |      CRUD      | Request Body | 안정성 | 멱등성 | HTML form 전송 |
| :----: | :---------------: | :------------: | :----------: | :----: | :----: | :------------: |
|  GET   |    리소스 요청    |      Read      |      X       |   O    |   O    |       O        |
|  POST  |    리소스 생성    |     Create     |      O       |   X    |   X    |       O        |
|  PUT   | 리소스 갱신, 생성 | Update, Create |      O       |   X    |   O    |       X        |
| PATCH  | 리소스 일부 갱신  |     Update     |      O       |   X    |   X    |       X        |
| DELETE |    리소스 삭제    |     Delete     |      △       |   X    |   O    |       X        |

Query Parameter는 URL의 일부인 **쿼리스트링(Query string)**을 통해 전송하는데, 아래와 같이 URL의 뒤에 `?`으로 요청 파라미터를 덧붙인 요청 양식을 쿼리스트링이라고 부른다. 쿼리스트링에서 요청 파라미터가 여러 개면 `&`로 연결한다.  

```
https://github.com/djccnt15?tab=repositories&q=&language=python&sort=name
```

!!! warning
    쿼리스트링으로 통신을 할 때는 URL을 통해 정보가 전송되기 때문에 중요한 데이터를 담아서 전송을 하게되면 일반 사용자에게 해당 데이터가 노출되는 문제가 있다. 따라서 쿼리스트링을 통해 중요한 정보를 전송하는 것을 지양해야 한다.  

---
## Reference
- [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
