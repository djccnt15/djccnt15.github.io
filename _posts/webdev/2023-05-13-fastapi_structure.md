---
published: true
layout: post
title: '[FastAPI] 02. FastAPI 프로젝트 설계'
description: >
    FastAPI 기초 세팅 및 프로젝트 설계
categories: [WebDev]
tags: [FastAPI]
image:
    path: /assets/img/posts/thumbnail_fastapi.png
related_posts:
    - _posts/webdev/2023-04-22-fastapi_architecture.md
    - _posts/webdev/2023-06-10-fastapi_orm.md
---
{% include series_fastapi.html %}
* toc
{:toc}

## 1. 프로젝트 설계

게시판 서비스 개발 프로젝트의 모듈들을 효율적을 관리하기 위해 아래와 같이 프로젝트를 구성하였다.  

```
.
└── project_root
    ├── settings
    │   ├── config.ini
    │   ├── config.py
    │   ├── database.py
    │   ├── keys.json
    │   └── routes.py
    ├── src
    │   ├── apps
    │   │   └── auth.py
    │   ├── crud
    │   │   ├── board
    │   │   │   ├── comment.py
    │   │   │   └── post.py
    │   │   └── common
    │   │       ├── log.py
    │   │       └── user.py
    │   ├── endpoints
    │   │   ├── board
    │   │   │   ├── comment.py
    │   │   │   └── post.py
    │   │   └── common
    │   │       └── user.py
    │   ├── models
    │   │   ├── models.py
    │   │   └── post.py
    │   └── schemas
    │       ├── board.py
    │       ├── common.py
    │       └── user.py
    └── main.py
```

실제로는 각 디렉토리마다 `__init__.py` 파일이 추가로 있는데, `__init__.py` 파일에는 단순히 하위 모듈 import 기능 정도만 넣어두었기 때문에 구성도에서는 빼두었다.  

## 2. main 모듈

`main` 모듈에 아래와 같이 FastAPI 객체를 선언하고, CORS 리스트를 추가해준다.  

```python
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from settings.config import get_config, mode
from settings.routes import router

app = FastAPI()

origins = get_config()['CORSLIST'].get(mode).split()  # get CORS allow list

app.add_middleware(  # allow CORS credential
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(router)


@app.get("/")
def index():
    return {"message": "This is temporal index page"}
```

## 3. config 설정

config 관련 로직은 `config.py`에 만들어준다.  

```python
from pathlib import Path
from configparser import ConfigParser

dir_config = Path('settings')


def get_config() -> ConfigParser:
    config = ConfigParser()
    config.read(dir_config / 'config.ini')
    return config


mode = get_config()['DEFAULT'].get('mode')
```

위에서 `get_config()` 함수를 통해 불러오는 `config.ini` 파일은 아래와 같다.  

```ini
[DEFAULT]
mode = dev

[DIRS]
dir_config = settings

[CORSLIST]
dev = http://localhost http://127.0.0.1
```

이렇게 config 관련 로직과 데이터를 분리해 하드코딩을 예방하면 프로그램 설정을 쉽게 변경할 수 있고 유지보수 편의성을 제고할 수 있다.  

❗FastAPI [공식 문서](https://fastapi.tiangolo.com/tutorial/cors/)에 따르면 아래 세 origin이 모두 다른 것으로 취급된다.  
{:.note title='attention'}

- http://localhost
- https://localhost
- http://localhost:8080

---
## Reference
- [FastAPI Bigger Applications with Multiple Separate Files in Python](https://www.tutorialsbuddy.com/python-fastapi-bigger-applications-multiple-separate-files)
- [전체 실습 코드](https://github.com/djccnt15/study_fastapi)