---
slug: http-header
title: HTTP 헤더
date:
    created: 2025-09-21
description: >
    HTTP 패킷의 헤더 정리
categories:
    - Web
tags:
    - web protocol
    - http
---

HTTP 표준에서는 HTTP 패킷을 표현(Representation)이라고 규정하며, 표현은 표현 메타데이터와 표현 데이터로 구성되어 있다. 이 중 표현 데이터가 일반적으로 HTTP Body 또는 Payload 라고 부르는 HTTP 메세지의 본문을 뜻하며, 표현 헤더는 표현 데이터를 해석할 수 있는 정보를 제공한다.  

<!-- more -->

---

## 표현 헤더

표현 헤더는 전송과 응답에 모두 사용되며 들어가는 정보는 아래와 같다.  

- `Content-Type`
    - 미디어 타입 및 문자 인코딩 등 표현 데이터의 양식
    - `text/html; charset=utf-8`, `application/json`, `image/png` 등
- `Content-Encoding`
    - 표현 데이터를 압축하기 위해 사용되는 압축 방식
    - 데이터를 전송하는 곳에서 압축 후 인코딩 헤더 추가, 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
    - `gzip`, `deflate`, `identity`[^1] 등
- `Content-Language`
    - 표현 데이터의 자연 언어
- `Content-Length`
    - 표현 데이터의 길이(바이트 단위)

[^1]: 압축하지 않음  

## 협상 헤더

협상(Content Negotiation) 헤더는 클라이언트가 선호하는 표현 요청을 말하며, 요청 시에만 사용된다.  

- `Accept`
    - 클라이언트가 선호하는 미디어 타입 전달
- `Accept-Charset`
    - 클라이언트가 선호하는 문자 인코딩
- `Accept-Encoding`
    - 클라이언트가 선호하는 압축 인코딩
- `Accept-Language`
    - 클라이언트가 선호하는 자연 언어
    - 원활한 다중언어 지원을 위해 우선순위를 활용함

!!! note "협상 헤더의 우선순위"
    협상 헤더의 경우 다양한 우선순위를 가질 수 있기 때문에 선호하는 순위에 대한 우선순위를 표시할 수 있다. 이 경우 **0 ~ 1 사이의 값을 사용하며 값이 클수록 높은 우선순위를 의미**하며, **생략 시 1을 의미**한다.  

    ```
    Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
    ```

    우선순위 표시 시 구체적일수록 매핑 우선순위가 높게 인식되며, 아래와 같은 예시의 경우 `text/plain;format=flowed` > `text/plain` > `text/*` > `*/*`의 순으로 우선순위가 산정된다.  

    ```
    Accept: text/*, text/plain, text/plain;format=flowed, */*
    ```

    우선순위 표시 시 구체적인 것을 기준으로 미디어 타입을 매핑해서 우선순위를 산정한다.  

    ```
    Accept: text/*;q=0.3, text/html;q=0.7, text/html;level=1, text/html;level=2;q=0.4, */*;q=0.5
    ```

    위 예시의 협상 헤더의 경우 아래와 같이 우선순위가 산정된다.  

    | Media Type        | Media Type |
    | ----------------- | :--------: |
    | text/html;level=1 |     1      |
    | text/html         |    0.7     |
    | text/plain        |    0.3     |
    | image/jpeg        |    0.5     |
    | text/html;level=2 |    0.4     |
    | text/html;level=3 |    0.7     |

## 전송 방식

- 단순 전송
    - `Content-Length`를 단독으로 사용함
- 압축 전송
    - `Content-Encoding`으로 압축 방식 표시, `Content-Length`로 압축된 데이터 길이 표시
- 분할 전송
    - `Transfer-Encoding`으로 표시 후 chunk 사이즈와 실제 데이터를 번갈아 전송

    ??? note "`Transfer-Encoding` 전송 예시"
        ```
        HTTP/1.1 200 OK
        Content-Type: text/plain
        Transfer-Encoding: chunked

        5
        Hello
        5
        World
        0
        \r\n
        ```

    !!! warning
        전체 데이터 길이를 미리 확인할 수 없기 때문에 `Transfer-Encoding` 사용 시 `Content-Length`를 사용하지 않는다.  

- 범위 전송
    - 요청 시 `Range`, 응답 시 `Content-Range`로 표시함
    - 이어받기 기능을 구현하기 위해 사용됨

    ??? note "범위 전송 예시"
        ```
        GET /event
        Range: bytes=1001-2000
        ```
        ```
        HTTP/1.1 200 OK
        Content-Type: text/plain
        Content-Range: bytes 1001-2000 / 2000

        ...
        ```

## 일반 정보

- `From`
    - 유저 에이전트의 이메일 정보
    - 일반적으로 잘 사용되지 않으며, 검색 엔진에서 에이전트 관리용 이메일 주소 표시 용도 등으로 사용
    - 요청에서 사용
- `Referer`
    - 현재 요청된 페이지의 이전 웹 페이지 주소로 유입 경로 분석용으로 사용됨
    - 요청에서 사용
- `User-Agent`
    - 웹 브라우저 등 유저 에이전트 애플리케이션 정보
    - 통계 정보 및 어떤 종류의 브라우저에서 장애가 발생하는지 파악 등 데이터 분석 용도로 사용
    - 요청에서 사용
- `Server`
    - 실제로 요청을 처리하는 오리진 서버의 소프트웨어 정보
    - 응답에서 사용
- `Date`
    - 메시지가 생성된 날짜 및 시간
    - 응답에서 사용

## 특수 정보

- `Host`
    - 요청한 호스트 정보(도메인)
    - 가상 호스트를 통해 하나의 IP 주소에 여러 도메인이 적용되어 있는 경우와 같이 하나의 서버가 여러 도메인을 처리하는 경우가 있어 필수적임
    - 요청에서 사용
- `Location`
    - 201 (Created) 응답 시 `Location` 값은 요청에 의해 생성된 리소스 URI를 의미
    - 3xx (Redirection) 응답 시 `Location` 값은 요청을 자동으로 리디렉션하기 위한 대상 리소스를 가리킴[^2]
    - 응답에서 사용
- `Allow`
    - 405 (Method Not Allowed) 응답 시 허용 가능한 HTTP 메서드 표시
    - 응답에서 사용
- `Retry-After`
    - 503 (Service Unavailable) 응답 시 서비스가 언제까지 불능인지 알려줄 수 있음
    - 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간을 날짜 또는 초 단위로 응답
    - 응답에서 사용하나 잘 사용하지 않음

[^2]: 웹 브라우저는 3xx 응답의 결과에 `Location` 헤더가 있으면, `Location` 위치로 자동 이동(리다이렉트) 한다.  

## 인증

- `Authorization`
    - 클라이언트 인증 정보를 서버에 전달
- `WWW-Authenticate`
    - 401 (Unauthorized) 응답 시 리소스 접근 시 필요한 인증 방법 정의

## 쿠키

HTTP 통신 중 클라이언트가 서버로 요청 시 사용자의 정보를 재활용하기 위해 쿠키를 활용한다.  

!!! note "쿠키의 주요 용도"
    - 사용자 로그인 세션 관리
    - 광고 정보 트래킹

- `Set-Cookie`
    - 서버에서 클라이언트로 쿠키 전달(응답 시 사용)
    - `expires`, `max-age` 옵션으로 쿠키의 생명 주기 관리
        - `expires`: 만료일 설정, `Set-Cookie: expires=Sat, 26-Dec-2020 04:39:21 GMT`
        - `max-age`: 초 단위로 쿠키의 지속 시간 설정, `Set-Cookie: max-age=3600`, 0이나 음수 지정 시 쿠키 즉시 삭제
    - `domain` 옵션으로 쿠키가 사용될 도메인 지정
        - 명시 시 명시한 문서 기준 도메인 + 서브 도메인 포함해 사용 대상을 지정  
        `domain=example.org`를 지정해서 쿠키 생성 시 `example.org`, `dev.example.org` 모두 쿠키 접근
        - 생략 시 현재 문서 기준 도메인만 적용  
        `example.org`에서 쿠키를 생성하고 domain 지정을 생략 시 `example.org`에서만 쿠키 접근 가능하며 `dev.example.org`는 쿠키 접근 불가
    - `path` 옵션으로 쿠키 접근이 가능한 페이지 경로 지정
        - 해당 경로를 포함한 해당 경로의 하위 경로에서만 쿠키 접근이 가능하도록 지정
        - 일반적으로 `path=/`와 같이 루트로 지정
    - `Secure`, `HttpOnly`, `SameSite` 옵션으로 보안 옵션 설정
        - `Secure`
            - 기본적으로 쿠키는 HTTP, HTTPS를 구분하지 않고 전송
            - `Secure`를 적용하면 HTTPS인 경우에만 전송
        - `HttpOnly`
            - XSS 공격 방지 용도
            - 자바스크립트에서 접근 불가(document.cookie)
            - HTTP 전송에만 사용
        - `SameSite`
            -  XSRF 공격 방지 용도
            -  요청 도메인과 쿠키에 설정된 도메인이 같은 경우만 쿠키 전송

!!! note "쿠키의 생명 주기"
    만료 시점을 생략해 브라우저 종료 시 까지만 유지하는 쿠키를 세션 쿠키라고 하고, 만료 시점을 입력해 해당 날짜까지 유지하는 쿠키를 영속 쿠키라고 한다.  

- `Cookie`
    - 클라이언트가 서버로 HTTP 요청 시 서버에서 받아 저장한 쿠키를 표시하기 위해 사용

!!! warning
    쿠키 정보는 항상 서버에 전송되기 때문에 네트워크 트래픽을 추가 유발하는 단점이 있다. 따라서 세션 ID, 인증 토큰 등 최소한의 정보만 사용해야 한다. 또한 보안에 민감한 데이터는 저장해서는 안 된다.  

!!! tip
    서버에 전송하지 않는 용도의 웹 브라우저 내부에 데이터를 저장하고 싶은 경우 웹 스토리지(localStorage, sessionStorage)를 사용해야한다.  

## 캐시

브라우저 캐시를 사용해서 네트워크 사용량을 줄여 비용 절감 및 성능 향상을 달성하고 사용자 경험을 개선할 수 있다.  

- 캐시 제어 헤더
    - `Cache-Control`, 
        - `max-age`: 초 단위의 캐시 유효 시간을 설정
        - `no-cache`, `no-store`, `must-revalidate`: 캐시 무효화 설정을 위해 사용
    - `Pragma`
        - `no-cache` 옵션만 있음
        - HTTP 1.0 하위 호환을 위해 사용
    - `Expires`
        - 캐시 만료일을 정확한 날짜로 지정하기 위해 사용
        - 더 유연하고 활용성이 높은 `Cache-Control: max-age` 사용 권장
        - `Cache-Control: max-age`와 함께 사용 시 `Expires` 무시
- 캐시 검증 및 조건부 요청 헤더
    - `Last-Modified`, `If-Modified-Since`, `If-Unmodified-Since`: 일시 기반으로 캐시 검증 제어
    - `ETag`, `If-None-Match`, `If-Match`: 캐시의 해시값으로 캐시 검증 제어

### 캐시 검증 및 조건부 요청 헤더

서버는 HTTP 응답 시 `Last-Modified: 2020년 11월 10일 10:00:00`과 같이 최종 변경 일시를 표시해 기존 캐시를 재사용할 수 있다.  

클라이언트는 HTTP 요청 시 `If-Unmodified-Since`, `If-Modified-Since: 2020년 11월 10일 10:00:00`과 같이 최종 변경 시점을 전송해 캐시 stale 여부를 확인 할 수 있다.  

!!! info
    `If-Modified-Since` 헤더 전송 시 서버는 데이터의 변경이 없을 경우 304 (Not Modified) 코드로 응답하고 HTTP body를 미전송하면 클라이언트는 기존 캐시를 재사용한다.  

`Last-Modified`, `If-Modified-Since` 태그는 아래와 같은 단점들이 있다.  

- 1초 미만(0.x초) 단위로 캐시 조정 불가능
- 날짜 기반의 로직 사용
- 데이터를 수정해서 날짜가 다르지만, 수정 결과로 데이터를 원복해서 데이터 결과가 똑같은 경우
- 서버에서 별도의 캐시 로직을 관리하고 싶은 경우
    - 스페이스나 주석처럼 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우

`Last-Modified`의 단점을 해결하기 위해 `ETag`(Entity Tag) 헤더를 사용해서 캐시용 데이터에 고유한 버전 이름을 부여하고, 데이터 변경 시 `ETag` 이름을 바꾸어서 변경하는 것으로 데이터의 변경 여부를 체크할 수 있다.  

클라이언트는 `ETag` 헤더 활용 시 `If-Match`, `If-None-Match` 헤더를 사용해 데이터의 변경 여부를 확인 할 수 있다.  

!!! success
    `ETag`, `If-Match`, `If-None-Match` 태그를 활용해 캐시 제어 로직을 서버에서 완전히 관리할 수 있다.  

### 프록시 캐시

프록시 캐시 서버를 사용하는 경우 아래 헤더들을 사용해서 프록시 캐시를 제어할 수 있다.  

- `Cache-Control: public`
    - 응답이 public 캐시(프록시 캐시 서버)에 저장되어도 됨
- `Cache-Control: private`
    - 응답이 해당 사용자만을 위한 것임
    - private 캐시(사용자 로컬 캐시 저장소)에 저장해야 함(기본값)
- `Cache-Control: s-maxage`
    - 프록시 캐시에만 적용되는 `max-age`
- `Age: 60` (HTTP 헤더)
    - 오리진 서버에서 응답 후 프록시 캐시 내에 머문 시간(초)

### 캐시 무효화

웹 브라우저들이 임의로 캐시를 하는 경우도 있는데, 웹 브라우저가 캐시를 하지 않도록 강제하는 캐시 헤더들이 있다.  

- `Cache-Control`, 
    - `Cache-Control: no-cache`: 데이터는 캐시해도 되지만 항상 원 서버에 검증 후 사용
    - `Cache-Control: no-store`: 데이터에 민감한 정보가 있으므로 저장하면 안 됨(메모리에서 사용 후 즉시 삭제)
    - `Cache-Control: must-revalidate`
        - 캐시 만료 후 최초 조회 시 원 서버에 검증해야함
        - 원 서버 접근 실패 시 반드시 오류가 발생해야함 - 504(Gateway Timeout)
        - `must-revalidate`는 캐시 유효 시간이라면 캐시를 사용함
- `Pragma: no-cache`: HTTP 1.0 하위 호환용

!!! note "`no-cache` vs `must-revalidate`"
    - `no-cache`는 원 서버 접근이 실패하는 경우 200 (OK)로 응답
    - `must-revalidate`는 원 서버 접근 실패 시 504 (Gateway Timeout)로 응답

---
## Reference
- [김영한 - 모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)
