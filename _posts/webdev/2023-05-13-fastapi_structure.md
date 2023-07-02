---
published: true
layout: post
title: '[FastAPI] 02. FastAPI 프로젝트 설계'
description: >
    FastAPI 기초 세팅 및 프로젝트 설계
categories: [WebDev]
tags: [python, FastAPI]
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
    ├── env
    │   ├── config.ini
    │   ├── config.py
    │   ├── database.py
    │   ├── keys.json
    │   └── routes.py
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
    │   └── schemas
    │       ├── dto_board.py
    │       ├── dto_common.py
    │       └── dto_user.py
    └── main.py
```

실제로는 각 디렉토리마다 `__init__.py` 파일이 추가로 있는데, `__init__.py` 파일에는 단순히 하위 모듈의 import 기능 만 넣어두었기 때문에 구성도에서는 빼두었다.  

💡import 과정에서 버그가 생길 가능성이 생기기 때문에 모듈이나 객체의 이름은 되도록 겹치지 않도록 하는 것이 좋다.  
{:.note}

## 2. main 모듈

`main` 모듈에 아래와 같이 FastAPI 객체를 선언하고, CORS 리스트를 추가해준다.  

```python
from settings.config import get_config, mode, dir_config
from settings.routes import router

metadata = get_config()['DEFAULT']

with open(file=dir_config / metadata.get('description'), mode='r') as f:
    description = f.read()

tags_metadata = [
    {
        'name': 'default',
        'externalDocs': {
            'description': 'External docs',
            'url': f'{metadata.get("url")}',
        },
    }
]

app = FastAPI(
    title=metadata.get('title'),
    version=metadata.get('version'),
    contact={
        'name': metadata.get('name'),
        'url': metadata.get('url'),
    },
    license_info={
        'name': metadata.get('license_name'),
        'url': metadata.get('license_url')
    },
    description=description,
    openapi_tags=tags_metadata
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
app.include_router(router)


@app.get('/')
def index():
    return {'message': 'This is temporal index page'}
```

💡Swagger의 디스크립션에 대한 [공식 문서](https://fastapi.tiangolo.com/tutorial/metadata/)와 API의 디스크립션에 대한 [공식 문서](https://fastapi.tiangolo.com/tutorial/path-operation-configuration/) 참고
{:.note}

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
title = Study FastAPI Project
version = 0.0.1
description = api_description.md
name = djccnt15
url = https://djccnt15.github.io/tags#FastAPI
license_name = MIT
license_url = https://en.wikipedia.org/wiki/MIT_License

[DIRS]
dir_config = settings

[CORSLIST]
dev = http://localhost:5173 http://127.0.0.1:5173
```

이렇게 config 관련 로직과 데이터를 분리해 하드코딩을 예방하면 프로그램 설정을 쉽게 변경할 수 있고 유지보수 편의성을 제고할 수 있다.  

❗FastAPI [공식 문서](https://fastapi.tiangolo.com/tutorial/cors/)에 따르면 아래 세 origin이 모두 다른 것으로 취급된다. CORS를 설정할 때 주의하자.  
{:.note title='attention'}

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

라우터를 통합 관리하는 `routes.py` 모듈은 아래와 같다.  

```python
from fastapi import APIRouter

from src.endpoints import *
from src.schemas import Tags

router = APIRouter()

router.include_router(
    user.router,
    prefix='/api/user',
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

```python
from fastapi import FastAPI

from settings.routes import router

app = FastAPI()

...

# Routers
app.include_router(router)
```

---
## Reference
- [FastAPI Bigger Applications with Multiple Separate Files in Python](https://www.tutorialsbuddy.com/python-fastapi-bigger-applications-multiple-separate-files)
- [전체 실습 코드](https://github.com/djccnt15/study_fastapi)