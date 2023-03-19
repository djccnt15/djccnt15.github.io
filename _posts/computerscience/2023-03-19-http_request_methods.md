---
published: true
layout: post
title: '[HTTP] GET과 POST'
description: >
    HTTP 요청 방식 중 GET과 POST에 대한 정리
categories: [ComputerScience]
tags: [http]
image:
    path: /assets/img/posts/thumbnail_http.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. GET

### 1-1. 개요

`GET`은 특정 정보를 요청하는데 쓰는 방식이기 때문에 [멱등성(Idempotent)](https://en.wikipedia.org/wiki/Idempotence)[^1]을 충족하는 통신 방식이다.  

[^1]: 멱등성이란 수학의 함수와 같이 input이 일정하면 output도 일정한 성질을 말한다.  

`GET`은 요청을 전송할 때 필요한 데이터를 **쿼리스트링(Query string)**을 통해 전송하는데, 아래와 같이 URL의 뒤에 `?`으로 요청 파라미터를 덧붙인 요청 양식을 쿼리스트링이라고 부른다. 쿼리스트링에서 요청 파라미터가 여러 개면 `&`로 연결한다.  

```
https://github.com/djccnt15?tab=repositories&q=&language=python&sort=name
```

### 1-2. 특징

`GET` 방식의 특징은 아래와 같다.  

- 멱등성 충족
- 캐시 가능
- 웹 브라우저 히스토리 기록 저장
- 북마크 가능
- 길이 제한[^2]

[^2]: `GET` 요청의 길이 제한은 표준이 없고 웹 브라우저마다 다르다.  

❗ `GET` 방식으로 통신을 할 때는 URL을 통해 정보가 전송되기 때문에 중요한 데이터를 담아서 전송을 하게되면 일반 사용자에게 해당 데이터가 노출되는 문제가 있다. 따라서 `GET`을 통해 중요한 정보를 전송하는 것을 지양해야 한다.
{:.note title='attention'}

## 2. POST

### 2-1. 개요

`POST`는 서버로 데이터를 전송하고, 전송된 데이터에 따라 서버가 다른 작업을 하도록 할 때 사용한다. 따라서 `POST`는 일반적으로 클라이언트가 전송한 정보에 따라 서버에 변경이 일어날 필요가 있는 경우에 사용된다.  

데이터는 HTTP 메시지의 body 부분에 담겨서 전송되며, 일반적으로 HTML의 `<form>` 태그 통해 전송된다.  

### 2-2. 특징

`POST` 방식의 특징은 아래와 같다.  

- 멱등성 불충족
- 캐시되지 않음
- 웹 브라우저 히스토리 기록 남지 않음
- 북마크 불가능
- 데이터 길이 제한 없음

❗ `POST` 방식은 URL에 데이터가 노출되지는 않지만, 정보를 얻어내는게 조금 귀찮아질 뿐이지 근본적인 보안 통신인 것은 아니다. 제대로 된 보안을 위해서는 암호화 및 HTTPS를 사용해야 한다.  
{:.note title='attention'}

---
## Reference
- [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)