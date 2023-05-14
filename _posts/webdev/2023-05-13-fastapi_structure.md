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
---
{% include series_fastapi.html %}
* toc
{:toc}

## 1. 프로젝트 설계

게시판 서비스 개발 프로젝트의 모듈들을 효율적을 관리하기 위해 아래와 같이 프로젝트를 구성하였다.  

```
.
└── project_dir
    ├── settings
    │   ├── config.ini
    │   ├── config.py
    │   ├── database.py
    │   ├── keys.json
    │   └── routes.py
    ├── src
    │   ├── apps
    │   ├── crud
    │   │   ├── board
    │   │   │   ├── comment.py
    │   │   │   └── post.py
    │   │   └── common
    │   │       └── user.py
    │   ├── endpoints
    │   │   ├── board
    │   │   │   ├── comment.py
    │   │   │   └── post.py
    │   │   └── common
    │   │       └── user.py
    │   ├── models
    │   │   ├── meta.py
    │   │   └── models.py
    │   └── schemas
    │       ├── board
    │       │   ├── comment.py
    │       │   └── post.py
    │       └── common
    │           ├── id.py
    │           └── user.py
    └── main.py
```

실제로는 각 디렉토리마다 `__init__.py` 파일이 있는데, `__init__.py` 파일은 단순히 해당 디렉토리가 Python 모듈이고 디렉토리의 모든 파일이 패키지의 일부임을 알려주는 역할을 하는 파일이기 때문에 내용이 비어 있어도 되는데다가 Python 3.3 부터는 해당 파일이 없어도 정상 작동하기 때문에 구성도에서는 빼두었다.  

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


def get_config():
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
dev = http://localhost:5173 http://127.0.0.1:5173
```

이렇게 config 관련 로직과 데이터를 분리하여 프로그램 세팅을 나중에 쉽게 변경할 수 있도록 하고 하드코딩을 막을 수 있다.  

---
## Reference
- [FastAPI Bigger Applications with Multiple Separate Files in Python](https://www.tutorialsbuddy.com/python-fastapi-bigger-applications-multiple-separate-files)
- [전체 실습 코드](https://github.com/djccnt15/study_fastapi)