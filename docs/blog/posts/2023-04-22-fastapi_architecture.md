---
slug: fastapi-architecture
title: FastAPI 서버 아키텍처
date:
    created: 2023-04-22
description: >
    FastAPI 기초 입문과 Python 서버 아키텍처
categories:
    - FastAPI
tags:
    - python
    - wsgi
    - asgi
    - fastapi
    - gunicorn
    - uvicorn
---

FastAPI 기초 입문과 Python 서버 아키텍처  

<!-- more -->

---

## 1. FastAPI 입문

### 1-1. 설치

FastAPI로 백엔드 서버를 개발하려면 다음과 같이 `fastapi`와 `uvicorn[standard]` 패키지를 설치해야 한다.  

```bat
pip install fastapi uvicorn[standard]
```

### 1-2. 기초 서버 생성 및 구동

아래와 같이 `main.py`를 생성하고 FastAPI 객체를 선언해서 간단히 서버를 만들 수 있다.  

```python title="main.py"
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
```

Uvicorn을 이용해서 서버를 구동하는 명령어는 아래와 같다.  

```bat
uvicorn main:app --reload
```

명령어의 의미는 아래와 같고, 상세 내용 및 기타 파라미터들은 Uvicorn [공식 문서](https://www.uvicorn.org/settings/)에서 확인할 수 있다.  

- `main`
    - `main.py`, 서버로 구동할 Python 모듈 지정
- `app`
    - 서버 모듈에서 FastAPI로 선언된 객체를 호출
- `--reload`
    - 코드에 변경이 생길 경우 서버 재구동
- `--port`
    - 포트 설정. 기본값은 8000
- `--host`
    - 호스트 설정. 애플리케이션을 로컬 네트워크에 바인드 하려면 `0.0.0.0`으로 설정

구동한 서버로 접속해보면 단 몇 줄의 짧은 코드로 아래와 같이 API가 생성된 것을 확인할 수 있다.  

![fastapi_firstlook](./img/fastapi_firstlook.png){ loading=lazy }

### 1-3. OpenAPI

FastAPI는 OpenAPI(Swagger)를 기본으로 제공하는데, 아래와 같이 `/docs` 주소로 접속해서 확인할 수 있다.  

![fastapi_docs](./img/fastapi_docs.png){ loading=lazy }

## 2. 아키텍처

FastAPI 기반 백엔드 서버의 전체적인 아키텍처는 아래와 같다.  

![fastapi_server_architecture](./img/fastapi_server_architecture.png){ loading=lazy }

### 2-1. Web Server

웹 서버(Web server)는 HTTP를 통해 웹 브라우저가 요청하는 HTML, CSS, JavaScript 문서 및 오브젝트(이미지 파일 등)를 전송해주는 서비스 프로그램이다.  

[Apache](https://httpd.apache.org/), [NGINX](https://www.nginx.com/), [IIS](https://www.iis.net/) 세 가지 웹 서버가 대표적인데, Python 기반의 서버들이 WSGI로 많이 사용하는 Gunicorn의 경우 [공식 문서](https://docs.gunicorn.org/en/latest/deploy.html#nginx-configuration)에서 **NGINX**를 사용하는 것을 강력하게 추천하고 있다.  

### 2-2. WSGI, ASGI

#### CGI

WSGI, ASGI에 대해 설명하려면 [CGI(Common Gateway Interface)](https://en.wikipedia.org/wiki/Common_Gateway_Interface)에 대해 먼저 설명해야 한다. 웹 서버는 클라이언트의 요청을 처리하기 위해 서버의 애플리케이션 프로그램을 호출하는데, 호출되는 애플리케이션들의 표준 인터페이스를 CGI라고 한다.  

- HTTP 요청 예시

```
GET /home.html HTTP/1.1
```

CGI는 요청이 들어올 때마다 애플리케이션 프로세스 전체를 다시 처음부터 실행하기 때문에, Python과 같은 인터프리터 언어에서는 이 과정에서 프로세스의 실행이 느려진다는 단점이 있어 이를 보완하기 위해 WSGI라는 미들웨어를 도입하게 되었다.  

Python으로 CGI 웹애플리케이션을 개발하려면 [cgi 모듈](https://docs.python.org/3/library/cgi.html)을 사용하고 개발한 애플리케이션을 웹서버에 직접 등록하면 되는데, 자세한 방법은 생활코딩님의 [WEB2 Python](https://youtube.com/playlist?list=PLuHgQVnccGMDMxfZEpLbzHPZUEwObEaZq) 수업에 잘 정리되어 있다.  

!!! info
    참고로 Python의 [cgi 라이브러리](https://docs.python.org/3/library/cgi.html)는 Python 3.11 부터 deprecate 되었고, 3.13에서 완전히 제거될 예정이기 때문에 더이상 사용할 수 없다. 앞으로는 최소한 [wsgiref 라이브러리](https://docs.python.org/3/library/wsgiref.html)를 사용해야 한다.  

#### WSGI

[WSGI(Web Server Gateway Interface)](https://wsgi.readthedocs.io/)는 Python으로 개발된 애플리케이션 서버와 웹 서버가 통신하고 애플리케이션 서버가 웹 서버의 요청을 처리하기 위한 인터페이스로, WSGI 표준은 [PEP 3333](https://peps.python.org/pep-3333/)에 정의되어 있다.  

WSGI의 핵심은 웹 서버와 Python 스크립트를 분리하여 Python 스크립트를 프로세스로 미리 실행시켜두고, 웹 서버가 클라이언트의 요청을 받아서 스크립트에 전달했을 때, 스크립트는 필요한 로직 하나만 실행한 후 결과를 응답함으로써 동적인 콘텐츠에 대한 요청에 빠르게 응답할 수 있게 한 것이다.  

대표적인 WSGI로는 [Gunicorn](https://gunicorn.org/), [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/), [Waitress](https://docs.pylonsproject.org/projects/waitress/en/latest/) 등이 있는데, 상용화 수준에 사용할 수 있는 WSGI 패키지는 Linux 전용의 **Gunicorn**과 Windows와 UNIX에서 모두 사용할 수 있는 **Waitress**가 있다.  

#### ASGI

WSGI는 기본적으로 request와 response로 이루어지는 동기 처리 방식으로 작동하는 single-callable interface이기 때문에 WebSocket을 통한 장기적 통신 등을 지원하는데 한계점이 있고, 이를 보완하기 위해 나온 것이 비동기 처리를 지원하는 [ASGI(Asynchronous Server Gateway Interface)](https://asgi.readthedocs.io/)이다.  

대표적인 ASGI 구현체는 [Uvicorn](https://www.uvicorn.org/), [Hypercorn](https://pgjones.gitlab.io/hypercorn/), [Daphne](https://github.com/django/daphne) 등이 있는데, **Uvicorn**을 주로 많이 사용하는 것 같다.  

### 2-3. Gunicorn, Uvicorn

FastAPI 기반 백엔드 서버는 [그림에 표현된 것](#2-아키텍처)과 같이 Gunicorn과 Uvicorn을 동시에 사용한다.  

이 때 Gunicorn은 프로세스 매니저로서 서버에서 Master 프로세스의 역할을 하고 Worker 프로세스인 Uvicorn 프로세스를 여러 개 실행해서 관리하며, 웹 서버를 통해 브라우저의 요청이 들어오면 Uvicorn 프로세스를 통해 해당 요청을 처리한다.  

Uvicorn의 [공식 문서](https://www.uvicorn.org/settings/#implementation)에 따르면 Uvicorn은 Python의 자체 비동기 처리 이벤트 루프를 대체하기 위해 개발된 [uvloop](https://uvloop.readthedocs.io/)을 지원하기 때문에 uvloop을 사용 가능한 환경이라면 uvloop을 사용해서 프로세스를 더 빠르게 처리할 수 있다고 한다.  

### 2-4. Starlette, FastAPI

[Starlette](https://www.starlette.io/)는 경량 ASGI 프레임워크로, Python 기반의 비동기 웹 애플리케이션을 개발하기에 최적화된 웹 프레임워크이고, [FastAPI](https://fastapi.tiangolo.com/) [공식 문서](https://fastapi.tiangolo.com/features/#starlette-features)는 FastAPI가 Starlette의 sub-class라고 밝히고 있다.  

FastAPI는 Django, Flask, Sanic과 같은 웹 프레임워크로, 브라우저의 요청이 웹 서버와 WSGI, ASGI를 통해 전달되면 해당 요청을 서버 애플리케이션에 코딩된 로직에 따라 작업하고 결과를 반환한다.  

---
## Reference
- [FastAPI: Tutorial - User Guide](https://fastapi.tiangolo.com/tutorial/)
- [게시판 서비스 백엔드 실습 코드](https://github.com/djccnt15/fastapi_board)
