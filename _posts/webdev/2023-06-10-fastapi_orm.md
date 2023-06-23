---
published: true
layout: post
title: '[FastAPI] 03. SQLAlchemy 기반 ORM'
description: >
    SQLAlchemy와 Alembic을 활용한 데이터베이스 ORM
categories: [WebDev]
tags: [FastAPI, SQLAlchemy]
image:
    path: /assets/img/posts/thumbnail_fastapi.png
related_posts:
    - _posts/webdev/2023-05-13-fastapi_structure.md
---
{% include series_fastapi.html %}
* toc
{:toc}

## 1. FastAPI ORM 구조

FastAPI에서는 SQLAlchemy와 Pydantic 두 가지 패키지를 이용해 ORM을 처리한다.  

SQLAlchemy와 Pydantic에서 사용하는 model의 의미가 달라 주의해야 하는데, FastAPI [공식 문서](https://fastapi.tiangolo.com/tutorial/sql-databases/#create-sqlalchemy-models-from-the-base-class)에 따르면, SQLAlchemy와 Pydantic의 model의 의미는 각각 아래와 같다.  

> SQLAlchemy uses the term **model** to refer to these classes and instances that interact with the database.<br><br>
> But Pydantic also uses the term **model** to refer to something different, the data validation, conversion, and documentation classes and instances

위 설명에 따라 FastAPI에서 사용하는 데이터 모델의 종류를 비교하면 아래와 같다.  

|구분|SQLAlchemy|Pydantic|
|:-:|:-:|:-:|
|역할|Data Access Object|Data Transfer Object|
|용도|데이터베이스 접속 및 CRUD|데이터 검증, 변환 및 전달|
|지칭[^1]|models|schemas|

[^1]: 해당 지칭 방식은 일반적으로 사용하는 용어가 아니고 FastAPI [공식 문서](https://fastapi.tiangolo.com/tutorial/sql-databases/)에서 두 가지 용도의 데이터 모델을 구분하기 위해 사용하는 지칭이다.  

## 2. SQLAlchemy 기반 ORM의 기초

FastAPI는 Django와 같은 자체적인 ORM 엔진은 없지만 SQLAlchemy라는 패키지를 이용할 수 있다. [공식 문서](https://docs.sqlalchemy.org/en/20/dialects/index.html)에 따르면 SQLAlchemy는 아래와 같은 DB들을 지원하는데, 각 데이터베이스가 지원하는 드라이버와 조합하여 사용할 수 있다.  

- [PostgreSQL](https://docs.sqlalchemy.org/en/20/dialects/postgresql.html)
- [MySQL and MariaDB](https://docs.sqlalchemy.org/en/20/dialects/mysql.html)
- [SQLite](https://docs.sqlalchemy.org/en/20/dialects/sqlite.html)
- [Oracle](https://docs.sqlalchemy.org/en/20/dialects/oracle.html)
- [Microsoft SQL Server](https://docs.sqlalchemy.org/en/20/dialects/mssql.html)

각 데이터베이스의 드라이버의 목록을 보면 여러가지가 있는데, FastAPI의 장점인 비동기처리를 DB IO에까지 적용하려면 Async를 지원하는 드라이버를 사용해야한다.  

❗대표적으로 Microsoft SQL Server의 경우 SQLAlchemy가 지원하는 드라이버는 [pymssql](https://pymssql.readthedocs.io/en/latest/)와 [PyODBC](https://github.com/mkleehammer/pyodbc)가 있는데, 둘 다 비동기처리를 지원하지 않는다.  
{:.note title='attention'}

## 3. 데이터베이스 환경 설정

`settings/database.py` 파일을 아래와 같이 만들어주자.  

```python
import json

from sqlalchemy.engine import URL
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base
from addict import Dict

from settings.config import get_config, mode, dir_config

db_key = dir_config / get_config()['DATABASE'].get('db')

with open(file=db_key, mode='r') as f:
    db_key = Dict(json.load(fp=f)).db[mode]

SQLALCHEMY_DATABASE_URL = URL.create(
    drivername=db_key.drivername,
    username=db_key.username if db_key.username else None,
    password=db_key.password if db_key.password else None,
    host=db_key.host if db_key.host else None,
    port=db_key.port if db_key.port else None,
    database=db_key.database,
)

if str(SQLALCHEMY_DATABASE_URL).startswith("sqlite"):  # check_same_thread arg is only for SQLite
    engine = create_async_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_async_engine(SQLALCHEMY_DATABASE_URL)


async def get_db():
    db = AsyncSession(bind=engine)
    try:
        yield db
    finally:
        await db.close()


Base = declarative_base()

if __name__ == '__main__':
    print(SQLALCHEMY_DATABASE_URL)
```

### 데이터베이스 주소 설정

우선 `get_config()` 함수가 `config.ini`에서 `db_key`의 내용을 불러올 수 있도록 `config.ini`에 아래 내용을 추가하자.  

```ini
[DATABASE]
db = keys.json
```

데이터베이스의 주소를 코드에 작성해두면 보안상 좋지 않을 뿐 아니라, DB 관련 정보를 바꿀 때 코드를 업데이트 해야하는 단점이 있다.  

`keys.json` 파일은 데이터베이스 주소에 대한 하드코딩을 막고, 저장소에 올라가면 안 되는 정보를 별도로 보관하기 위해 사용하는 JSON 파일로, 해당 파일의 양식은 아래와 같다.  

```json
{
    "db": {
        "dev": {
            "drivername": "sqlite+aiosqlite",
            "database": "./sql_app.db"
        },
        "test": {
            "drivername": "driver_name+driver",
            "username": "username",
            "password": "password",
            "host": "host",
            "port": "port",
            "database": "database_name"
        }
    }
}
```

`SQLALCHEMY_DATABASE_URL`는 데이터베이스의 주소로, 아래와 같은 규칙을 따른다.  

```
dialect+driver://username:password@host:port/database
```

위 양식에서 볼 수 있듯이 데이터베이스 주소는 `:`, `/`, `@`등을 구분자로 사용하기 때문에 비밀번호 등에 해당 특수문자가 있을 경우 주소를 제대로 인식하지 못하는 문제가 있다. 이런 문제를 방지하기 위해서는 `URL.create()` 함수를 사용해야 한다.  

DB URL에 대한 자세한 내용은 SQLAlchemy [공식 문서](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls)를 참고하자.  

### 데이터베이스 엔진 생성

[엔진](https://docs.sqlalchemy.org/en/20/core/engines.html)은 모든 SQLAlchemy 어플리케이션의 시작점으로, 아래 그림과 같이 [Connection Pool](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.Pool)과 [Dialect](https://docs.sqlalchemy.org/en/20/core/internals.html#sqlalchemy.engine.Dialect)를 연결하여 데이터베이스 연결 및 동작을 위한 소스를 생성해준다.  

💡컨넥션 풀이란 데이터베이스에 접속하는 객체를 일정 갯수만큼 만들어 놓고 재활용하며 사용하는 것을 말한다.  
{:.note}

![](https://docs.sqlalchemy.org/en/20/_images/sqla_engine_arch.png)
{:.text-center}

`create_async_engine`은 [공식 문서](https://docs.sqlalchemy.org/en/20/core/engines.html#sqlalchemy.create_engine)에 따르면 `create_engine`과 마찬가지로 엔진 인스턴스를 생성한다.  

SQLAlchemy는 데이터베이스를 엔진 방식으로 사용함으로서 데이터베이스에 접속하는 세션 수를 제어하고, 세션 접속에 소요되는 시간을 줄일 수 있다고 한다.  


### 데이터베이스 의존성 주입

SQLAlchemy를 사용하면서 db 세션 객체를 생성한 후에 `db.close()`를 수행하지 않으면 SQLAlchemy가 사용하는 컨넥션 풀에 db 세션이 반환되지 않아 문제가 생긴다.  

`get_db()` 함수는 CRUD 함수를 호출할 때, 간단한 코드를 추가하여 CRUD 함수가 끝나면 자동으로 `db.close()`가 실행되도록 보조해주는 의존성 주입을 위한 함수이다. `endpoints` 함수에 DB에 대한 의존성 주입을 추가하려면 아래와 같이 `Depends()` 함수를 사용하면 된다.  

```python
async def post_detail(id: UUID, db: AsyncSession = Depends(get_db)):
    ...
```

### Base 객체

`declarative_base()` 함수를 통해 생성되는 Base 객체는 ORM을 위한 데이터 모델 및 테이블 정의를 선언형으로 사용하기 위해 사용된다.  

## 4. 데이터 모델(DAO)

`src/models` 경로에 아래와 같이 DAO를 위한 데이터 모델을 담고 있는 모듈들을 만들어준다. 가장 기초적이고 공용으로 사용될 데이터 모델을 저장해둔 `models.py` 파일은 아래와 같다.  

```python
from sqlalchemy.schema import Column
from sqlalchemy.types import Boolean, Integer, String, Text, DateTime, Uuid
from sqlalchemy.orm import relationship

from settings.database import Base


class Log(Base):
    __tablename__ = 'log'

    id = Column(Uuid, primary_key=True)
    date_create = Column(DateTime, nullable=False)
    log = Column(Text, nullable=False)


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    username = Column(String(length=100), unique=True, nullable=False)
    password = Column(String(length=255), nullable=False)
    email = Column(String(length=255), unique=True, nullable=False)
    date_create = Column(DateTime, nullable=False)
    is_superuser = Column(Boolean, default=None)
    is_staff = Column(Boolean, default=None)
    is_blocked = Column(Boolean, default=None)
    is_active = Column(Boolean, nullable=False, default=True)

    post = relationship('Post', back_populates='user')
    comment = relationship('Comment', back_populates='user')
```

다른 모듈들도 동일한 구조로 작성되며 모두 아래와 같이 `settings/database.py` 파일에서 생성한 Base 객체를 공유해서 사용한다는 특징이 있다.  

```python
from settings.database import Base

class ClassName(Base):
    fk = Column(Integer, ForeignKey(parent.id))
```

**테이블 속성 관련**

물리 모델의 테이블 명은 `__tablename__` 을 통해서 설정하고, 참조키를 설정할 때는 `ForeignKey` 클래스를 사용하면 된다.  

칼럼 타입은 SQLAlchemy [공식 문서](https://docs.sqlalchemy.org/en/20/core/type_basics.html)에서 확인할 수 있는데, 주의할 점이 있는 데이터 타입들은 아래와 같다.  

- `String`
    - SQL의 `VARCHAR` 타입으로 변환
    - `length` 파라미터의 값이 bytes, characters 중 어느 쪽으로 계산될지는 데이터베이스에 정의된 내용을 따름
- `Uuid`
    - `UUID` 타입은 SQL의 `UUID` 타입으로, `UUID`를 자체적으로 지원하는 데이터베이스에서만 사용 가능
    - `Uuid` 타입은 데이터베이스가 `UUID` 타입을 지원하지 않는 경우 `CHAR(32)` 형태로 변경되어 저장
- `Integer`
    - `primary_key=True` 파라미터를 지정할 경우 auto-increment 속성이 자동으로 부여

**relationship 설정**

`back_populates` 파라미터를 활용하여 관계를 설정하는 방식은 아래 그림이 가장 잘 설명해주고 있다.  

![back_populates](https://sqlmodel.tiangolo.com/img/tutorial/relationships/attributes/back-populates.svg)
{:.text-center}

[출처: Relationship with back_populates](https://sqlmodel.tiangolo.com/tutorial/relationship-attributes/back-populates/#relationship-with-back_populates)
{:.figcaption}

💡`bqckref`와 `back_populates`는 동일하게 Foreign 객체가 연관된 객체를 참조하기 위한 역참조를 제공하는 기능을 하지만, 코딩 방식이 조금 다른데, 차이점은 스택 오버플로우 [질문글](https://stackoverflow.com/questions/51335298/concepts-of-backref-and-back-populate-in-sqlalchemy)을 참고하자. 다만, SQLAlchemy [공식 문서](https://docs.sqlalchemy.org/en/20/orm/backref.html)에서는 `bqckref` 방식이 레거시라고 한다.  
{:.note}

개발하는 데이터 모델에 대한 요구사항은 아래와 같았는데, 데이터 모델을 모듈별로 분리하면서 `relationship()` 함수를 통한 참조 관계를 사용할 수 있도록 하는 부분이 생각보다 어려웠다.  

- 코드 관리가 용이하도록 SQLAlchemy 모델을 분리할 것
- Alembic 기반 자동화 마이그레이션 사용이 가능할 것
- 마이그레이션을 위한 코드와 서버 구동을 위한 코드가 동일할 것

위 요구 사항을 달성하기 위해서는 Mapper 클래스를 활용한 타입 힌트 방식이 아닌 `relationship()` 함수의 인자로 참조 대상 객체의 이름을 str 타입으로 입력하고, 각 모듈들이 Base를 모두 동일한 인스턴스를 사용해야 한다.

<details><summary>트러블슈팅 과정의 에러들</summary><div markdown="1">

아래 예시는 SQLAlchemy의 [공식 문서](https://docs.sqlalchemy.org/en/20/orm/basic_relationships.html)에 나오는 가장 권장되는 형태의 참조 관계 모델 형식이다.  

```python
class Parent(Base):
    __tablename__ = "parent_table"

    id: Mapped[int] = mapped_column(primary_key=True)
    children: Mapped[List["Child"]] = relationship(back_populates="parent")


class Child(Base):
    __tablename__ = "child_table"

    id: Mapped[int] = mapped_column(primary_key=True)
    parent_id: Mapped[int] = mapped_column(ForeignKey("parent_table.id"))
    parent: Mapped["Parent"] = relationship(back_populates="children")
```

각 모델이 작성 된 모듈을 분리한 상태에서 위와 같은 방식으로 DAO 모델을 만들고 각 모듈이 서로를 임포트 해서 사용하면, Alembic을 통한 마이그레이션 단계에서 Python의 근본적인 한계로 인해 아래와 같은 순환 참조 에러가 발생한다.  

```
ImportError: cannot import name 'Post' from partially initialized module 'src.models.models' (most likely due to a circular import) 
```

Base를 각 모듈별로 새로 선언해서 독립된 인스턴스를 사용하면, Alembic을 통한 자동화 마이그레이션은 가능했지만, 서버 구동 단계에서 중복 선언 오류가 발생한다.  

```
ValueError: Duplicate table keys across multiple MetaData objects: "table1", "table2"
```

</div></details>

## 5. Alembic 기반 자동화 마이그레이션

- 자동화 마이그레이션을 위한 Alembic 시작

```powershell
alembic init migrations
```
```
Creating directory C:\projects\study_fastapi\migrations ...  done
Creating directory C:\projects\study_fastapi\migrations\versions ...  done
Generating C:\projects\study_fastapi\alembic.ini ...  done
Generating C:\projects\study_fastapi\migrations\env.py ...  done
Generating C:\projects\study_fastapi\migrations\README ...  done
Generating C:\projects\study_fastapi\migrations\script.py.mako ...  done
Please edit configuration/connection/logging settings in 'C:\\projects\\study_fastapi\\alembic.ini' before proceeding.
```

Alembic을 사용할 때 생성되는 리비전 파일 및 각종 보조 파일들을 저장하는 `migrations` 디렉터리와 Alembic의 환경 설정 파일인 `alembic.ini` 파일이 생성된다.  

- `alembic.ini` 파일 수정

아래와 같이 Alembic에 사용할 데이터베이스 주소를 설정해준다.  

```ini
sqlalchemy.url = driver://user:pass@localhost/dbname
```

데이터베이스 주소를 확인하려면 `settings/database.py` 파일에서 설정한 `SQLALCHEMY_DATABASE_URL` 변수를 출력해보고, 출력 결과에서 드라이버 부분을 제외하고 입력하면 된다.  

- `migrations/env.py` 파일 수정

Alembic에 테이블의 메타데이터를 설정해준다.  

```python
from settings.database import Base
from src.models import *

target_metadata = Base.metadata
```

Alembic에 설정한 테이블 메타데이터에 실제로 현재 선언된 테이블의 데이터를 생성해주려면 선언된 테이블 객체들을 불러와줘야 한다.  

위와 같이 `from src.models import *`로 간단하게 테이블 객체들을 불러오려면, `src/models/__init__.py` 파일에 아래와 같이 하위 모듈들을 모두 임포트 시켜주면 된다.  

```python
from .models import *
from .post import *
```

- 리비전 파일 생성

```powershell
alembic revision --autogenerate
```
```
INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.autogenerate.compare] Detected added table 'category'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_category_id' on '['id']'
INFO  [alembic.autogenerate.compare] Detected added table 'user'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_user_id' on '['id']'
INFO  [alembic.autogenerate.compare] Detected added table 'post'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_post_id' on '['id']'
INFO  [alembic.autogenerate.compare] Detected added table 'comment'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_comment_id' on '['id']'
INFO  [alembic.autogenerate.compare] Detected added table 'post_content'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_post_content_id' on '['id']'
INFO  [alembic.autogenerate.compare] Detected added table 'comment_content'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_comment_content_id' on '['id']'
Generating C:\projects\study_fastapi\migrations\versions\9c88cc40e702.py ...  done
```

`migrations/versions` 디렉토리에 랜덤한 이름으로 리비전 파일이 생성된다. 리비전 파일 내용을 확인해보면 테이블 생성에 관한 [DDL](/dataengineering/relational_database/#2-ddl) ORM 코드들이 생성된 것을 확인할 수 있다.  

<details><summary>리비전 파일 내용 보기</summary><div markdown="1">

```python
"""empty message

Revision ID: 9c88cc40e702
Revises: 
Create Date: 2023-06-10 09:53:15.597527

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9c88cc40e702'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tier', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(length=255), nullable=False),
    sa.Column('id_parent', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_parent'], ['category.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_category_id'), 'category', ['id'], unique=False)
    op.create_table('log',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('date_create', sa.DateTime(), nullable=False),
    sa.Column('log', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_log_id'), 'log', ['id'], unique=False)
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('date_create', sa.DateTime(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=True),
    sa.Column('is_staff', sa.Boolean(), nullable=True),
    sa.Column('is_blocked', sa.Boolean(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)
    op.create_table('post',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=False),
    sa.Column('id_category', sa.Integer(), nullable=False),
    sa.Column('date_create', sa.DateTime(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['id_category'], ['category.id'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_post_id'), 'post', ['id'], unique=False)
    op.create_table('comment',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=False),
    sa.Column('id_post', sa.Uuid(), nullable=False),
    sa.Column('date_create', sa.DateTime(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['id_post'], ['post.id'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_comment_id'), 'comment', ['id'], unique=False)
    op.create_table('post_content',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('version', sa.Integer(), nullable=False),
    sa.Column('date_upd', sa.DateTime(), nullable=False),
    sa.Column('subject', sa.String(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('id_post', sa.Uuid(), nullable=False),
    sa.ForeignKeyConstraint(['id_post'], ['post.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_post_content_id'), 'post_content', ['id'], unique=False)
    op.create_table('comment_content',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('version', sa.Integer(), nullable=False),
    sa.Column('date_upd', sa.DateTime(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('id_comment', sa.Uuid(), nullable=False),
    sa.ForeignKeyConstraint(['id_comment'], ['comment.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_comment_content_id'), 'comment_content', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_comment_content_id'), table_name='comment_content')
    op.drop_table('comment_content')
    op.drop_index(op.f('ix_post_content_id'), table_name='post_content')
    op.drop_table('post_content')
    op.drop_index(op.f('ix_comment_id'), table_name='comment')
    op.drop_table('comment')
    op.drop_index(op.f('ix_post_id'), table_name='post')
    op.drop_table('post')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_table('user')
    op.drop_index(op.f('ix_log_id'), table_name='log')
    op.drop_table('log')
    op.drop_index(op.f('ix_category_id'), table_name='category')
    op.drop_table('category')
    # ### end Alembic commands ###
```

</div></details><br>

- 리비전 파일 실행

```
alembic upgrade head
```
```
INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade  -> 9c88cc40e702, empty message
```

DBeaver등 DB 툴을 이용해서 해당 DB를 확인해보면 `alembic.ini`에서 설정한 데이터베이스의 주소에 `src/models`에 작성한 내용대로 테이블과 칼럼이 생성된 것을 확인할 수 있다.  

💡SQLite를 사용할 경우 해당 위치에 SQLite 데이터베이스를 새로 생성해주기까지 한다.  
{:.note}

## 6. 데이터 모델(DTO)

SQLAlchemy를 통해 가져온 데이터의 레코드는 `_asdict()` 함수를 통해 구조체를 거쳐, Pydantic 객체로 변환될 수 있다.  

이 때 아래와 같이 `orm_mode = True` 속성을 갖고 있어야 변환이 가능하니 데이터베이스의 데이터를 처리할 데이터 모델은 반드시 해당 속성을 추가하자.  

```python
from pydantic import BaseModel


class CategoryRec(BaseModel):
    category: str = Field(alias='name')

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
```

Pydantic을 이용한 DTO 모델을 커스터마이징 하려면 위와 같이 `Field()` 함수를 사용하면 된다. `Field()` 함수에 대한 자세한 내용은 [공식 문서](https://docs.pydantic.dev/latest/usage/schema/#field-customization)를 참고하자.  

또한 위와 같이 매핑될 필드에 alias를 부여할 경우 `allow_population_by_field_name = True` 속성이 있어야 alias로 변환한 필드의 원래 필드명을 사용해서 ORM 객체를 매핑할 수 있다.  

Pydantic의 `class Config:`에 대한 자세한 내용은 [공식 문서](https://docs.pydantic.dev/latest/usage/model_config/)를 참고하자.  

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/study_fastapi)
- [점프 투 FastAPI: 2-02 모델로 데이터베이스 관리하기](https://wikidocs.net/175967)
- [점프 투 FastAPI: 2-04-2 의존성 주입](https://wikidocs.net/176223)