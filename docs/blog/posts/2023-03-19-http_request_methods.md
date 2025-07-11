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
    `PATCH`는 반드시 멱등적이어야 하는 `PUT`과는 달리, 멱등적일 수는 있지만 멱등적일 필요는 없다. 따라서 잘못된 `PATCH`의 사용은 `POST`와 마찬가지로 다른 리소스에 의도치 않은 부작용을 발생시킬 수 있다.  

### DELETE

`DELETE`는 Delete를 수행하기 위해 사용되는 method이다.  

## 2. 주요 Method 비교

|  Method  |       의미        |      CRUD      | Request Body | 안정성 | 멱등성 | HTML form 전송 |
| :------: | :---------------: | :------------: | :----------: | :----: | :----: | :------------: |
|  `GET`   |    리소스 요청    |      Read      |    X[^2]     |   O    |   O    |       O        |
|  `POST`  |    리소스 생성    |     Create     |      O       |   X    |   X    |       O        |
|  `PUT`   | 리소스 갱신, 생성 | Update, Create |      O       |   X    |   O    |       X        |
| `PATCH`  | 리소스 일부 갱신  |     Update     |      O       |   X    |   X    |       X        |
| `DELETE` |    리소스 삭제    |     Delete     |      △       |   X    |   O    |       X        |

[^2]: 엄밀히 말하면 `GET` method가 Request Body를 받을 수 없도록 강제되는 것은 아니다. 다만 Request Body를 받는 `GET` method는 REST 하지도 않고 프레임워크 차원에서 Request Body를 받지 못하도록 막기도 한다.  

## 3. 그 외 Method

|  Method   | 의미                                                                 |
| :-------: | -------------------------------------------------------------------- |
|  `HEAD`   | `GET`과 동일하나 메세지를 제외한 상태 줄과 헤더만 반환               |
| `OPTIONS` | 대상 리소스에 대한 통신 가능 옵션(method)을 설명(CORS에서 주로 사용) |
| `CONNECT` | 대상 자원으로 식별되는 서버에 대한 터널 설정                         |
|  `TRACE`  | 대상 리소스에 대한 경로를 따라 메세지 루프백 테스트 수행             |

---
## Reference
- [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
