---
slug: fastapi-structure
title: FastAPI 프로젝트 설계
date:
    created: 2023-05-13
description: >
    FastAPI 기초 세팅 및 프로젝트 설계
categories:
    - FastAPI
tags:
    - FastAPI
---

FastAPI 기초 세팅 및 프로젝트 설계  

<!-- more -->

---

## 1. 프로젝트 설계

게시판 서비스 개발 프로젝트의 모듈들을 효율적을 관리하기 위해 아래와 같이 프로젝트를 구성하였다.  

```
.
├── conf
│   ├── config.ini
│   ├── config.py
│   ├── database.py
│   ├── key.bin
│   └── security.py
├── src
│   ├── apps
│   │   └── auth.py
│   ├── crud
│   │   ├── crud_comment.py
│   │   ├── crud_common.py
│   │   └── crud_post.py
│   ├── endpoints
│   │   ├── board
│   │   │   ├── con_comment.py
│   │   │   └── con_post.py
│   │   └── common
│   │       └── con_user.py
│   ├── models
│   │   ├── dao_board.py
│   │   └── dao_models.py
│   ├── routes
│   │   └── router.py
│   └── schemas
│       ├── dto_board.py
│       ├── dto_common.py
│       └── dto_user.py
└── main.py
```

실제로는 각 디렉토리마다 `__init__.py` 파일이 추가로 있는데, `__init__.py` 파일에는 단순히 하위 모듈의 import 기능 만 넣어두었기 때문에 구성도에서는 빼두었다.  

!!! tip
    import 과정에서 버그가 생길 가능성이 생기기 때문에 모듈이나 객체의 이름은 되도록 겹치지 않도록 하는 것이 좋다.  

## 2. main 모듈

`main` 모듈은 FastAPI 기반으로 구현된 서버와 로직을 담고있는 모듈로, Web Application 서버로 구동되는 모듈이다.  

`main` 모듈에 아래와 같이 FastAPI 객체를 선언하고, CORS 리스트를 추가해준다.  

```python title="main.py"
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from conf.config import get_config, mode, dir_config
from src.routes import router

metadata = get_config()['DEFAULT']

app = FastAPI(
    title=metadata.get('title'),
    version=metadata.get('version'),
    contact={
        'name': metadata.get('name'),
        'url': metadata.get('url'),
        'email': metadata.get('email')
    },
    license_info={
        'name': metadata.get('license_name'),
        'url': metadata.get('license_url')
    }
)

origins = get_config()['CORSLIST'].get(mode).split()  # get CORS allow list

app.add_middleware(  # allow CORS credential
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Routers
app.include_router(router, prefix='/api')


@app.get('/')
def index():
    return {'message': 'This is temporal index page'}
```

!!! note
    Swagger의 디스크립션에 대한 [공식 문서](https://fastapi.tiangolo.com/tutorial/metadata/)와 API의 디스크립션에 대한 [공식 문서](https://fastapi.tiangolo.com/tutorial/path-operation-configuration/) 참고

## 3. config 설정

config 관련 로직은 `config.py`에 만들어준다.  

```python title="config.py"
from pathlib import Path
from configparser import ConfigParser

from starlette.config import Config

dir_config = Path('conf')


def get_config() -> ConfigParser:
    config = ConfigParser()
    config.read(dir_config / 'config.ini')
    return config


config = Config('.env')
mode = config('mode')
```

위에서 `get_config` 함수를 통해 불러오는 `config.ini` 파일은 아래와 같다.  

```ini title="config.ini"
[DEFAULT]
mode = dev
title = Study FastAPI Project
version = 0.0.1
description = api_description.md
name = djccnt15
url = https://djccnt15.github.io/tags#FastAPI
license_name = MIT
license_url = https://en.wikipedia.org/wiki/MIT_License

[CORSLIST]
dev = http://localhost:5173 http://127.0.0.1:5173
```

`.env` 파일도 ini 파일과 같은 양식을 갖고 있는데, starlette의 `Config` 모듈을 통해서 쉽게 관리할 수 있다는 장점이 있다.  

```ini
[DEFAULT]
mode = dev
```

내 경우에는 바뀔 일이 거의 없고 노출 되어도 되는 항목은 `config.ini`, 바뀔 일이 많거나 노출되면 안 되는 항목은 `.env`로 관리하기로 했다.  

이렇게 config 관련 로직과 데이터를 분리해 하드코딩을 예방하면 프로그램 설정을 쉽게 변경할 수 있고 유지보수 편의성을 제고할 수 있다.  

!!! info
    참고로 FastAPI [공식 문서](https://fastapi.tiangolo.com/tutorial/cors/)에 따르면 아래 세 origin이 모두 다른 것으로 취급된다. CORS를 설정할 때 주의하자.  

    - http://localhost
    - https://localhost
    - http://localhost:8080

## 4. Router 설정

프로젝트 규모가 커지면 API를 분리해서 관리할 필요가 생기는데, API Router를 설정하려면 `APIRouter` 객체를 사용하면 된다.  

`APIRouter` 객체를 사용하면 데코레이터를 이용해 API들을 쉽게 관리할 수 있는데, 데코레이터를 통해 `APIRouter`를 적용한 API 예시는 아래와 같다.  

```python
from fastapi import APIRouter

router = APIRouter()


@router.post('/{category}')
def post_list(category: str):
    ...
```

라우터를 통합 관리하는 `router.py` 모듈은 아래와 같다.  

```python title="router.py"
from fastapi import APIRouter

from src.endpoints import *
from src.schemas import Tags

router = APIRouter()

router.include_router(
    con_user.router,
    prefix='/user',
    tags=[Tags.auth]
)
```

Enum 객체인 `Tags`는 아래와 같다.  

```python
class Tags(Enum):
    board = 'Board'
    auth = 'Auth'
```

작성한 라우터를 아래와 같이 `main` 모듈의 FastAPI main APP에 등록하면 된다.  

```python title="main.py"
from fastapi import FastAPI

from src.routes import router

app = FastAPI()

...

# Routers
app.include_router(router, prefix='/api')
```

---
## Reference
- [FastAPI Bigger Applications with Multiple Separate Files in Python](https://www.tutorialsbuddy.com/python-fastapi-bigger-applications-multiple-separate-files)
- [전체 실습 코드](https://github.com/djccnt15/study_fastapi)