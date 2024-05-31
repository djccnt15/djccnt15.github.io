---
slug: sqlalchemy-alembic
title: SQLAlchemy, Alembic 기초 활용법
date:
    created: 2024-05-05
description: >
    SQLAlchemy와 Alembic을 활용해 Python code로 Entity ORM 객체를 만들고 관리하는 방법
categories:
    - Python
tags:
    - python
    - ORM
    - sqlalchemy
    - alembic
---

SQLAlchemy와 Alembic을 활용해 Python code로 Entity ORM 객체를 만들고 관리하는 방법  

<!-- more -->

---

## 1. SQLAlchemy를 활용한 DAO 구현

SQLAlchemy는 Python에서 가장 많이 사용되는 ORM 패키지인데, 아래와 같이 선언적 매핑(Declarative Mapping)과 상속을 통해 매핑을 구현하도록 하고 있다.  

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.types import String


# declarative base class
class Base(DeclarativeBase):
    pass


# an example mapping using the base
class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    fullname: Mapped[str] = mapped_column(String(30))
```

!!! info
    과거 버전의 SQLAlchemy는 `declarative_base()`라는 함수를 통해 기초 Entity 객체를 생성하도록 했지만, 현재 버전에서는 `DeclarativeBase` 객체를 사용하도록 대체되었다.  

매핑 Entity에 속성을 부여하는 방법은 여러 가지가 있는데, 아래와 같이 추상 테이블 객체에 칼럼을 만들어두면, 해당 추상 테이블을 상속 받는 테이블들에는 해당 칼럼이 기본적으로 생성되게 된다.  

```python title="src/db/entity.py"
from datetime import datetime
from enum import IntEnum

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.types import BigInteger, DateTime, String


class UserEntityEnum(IntEnum):
    NAME = 50


class BaseEntity(DeclarativeBase): ...


class BigintIdEntity(BaseEntity):
    __abstract__ = True  # (1)!

    id: Mapped[int] = mapped_column(
        type_=BigInteger,
        primary_key=True,
        autoincrement=True,
        sort_order=-1,  # (2)!
    )


class UserEntity(BigintIdEntity):
    __tablename__ = "user"

    name: Mapped[str] = mapped_column(String(length=UserEntityEnum.NAME.value))  # (3)!
    created_at: Mapped[datetime] = mapped_column(DateTime)
```

1. 추상 테이블 표시를 통해 Alembic으로 테이블을 관리할 때 테이블 생성에서 제외
1. 테이블 생성 시 ID 칼럼의 순서를 첫번째로 만들어 주도록 설정
1. 칼럼 길이를 Enum으로 별도 관리하면 DTO를 만들 때 속성의 최대 길이와 동시에 관리할 수 있다.  

`BaseEntity`에 속성을 부여하면 모든 테이블이 해당 속성을 사용하게 된다. 특정 테이블들만 속성을 공유하도록 하려면 중간에 추상 테이블을 별도로 생성해야 한다.  

!!! warning
    위 예시처럼 칼럼 길이를 Enum으로 별도 관리할 때는 SQLAlchemy Entity에 입력할 때는 반드시 `.value` 까지 입력해서 값만 불러오도록 해야한다. Alembic이 Enum 객체를 제대로 인식하지 못해 revision 생성 시 칼럼 길이에 값 대신 Enum 객체를 입력해버리는 문제가 있다.  

??? tip "Pydantic DTO에 Enum 활용 방법"
    DTO를 위해 Pydantic을 활용할 경우 아래와 같이 DTO `max_length` 속성에 엔티티의 Enum을 재사용하면 데이터베이스 Entity의 최대 길이와 DTO의 속성값의 길이 제한을 동시에 관리할 수 있어 편리하다.  

    ```python
    from datetime import datetime

    from pydantic import BaseModel, Field

    from src.db.entity import UserEntityEnum


    class User(BaseModel):
        name: str = Field(max_length=UserEntityEnum.NAME)
        created_at: datetime
    ```

    ❗Entity에 정의된 칼럼 길이는 DB 프로그램 및 DB 설정에 따라 한글 및 특수문자의 길이를 다르게 산출하니 주의

## 2. Alembic을 활용한 테이블 생성 및 관리

SQLAlchemy로 구현한 테이블은 Alembic을 이용해서 DB에 해당 테이블을 생성해줄 수 있는데, 절차는 아래와 같다.  

1. Alembic 초기화

    ```bat
    alembic init <dir>
    ```

    ```bat
    alembic init migrations
    ```

    - 설정한 폴더에 Alembic 버전 및 환경 관리를 위한 파일이 생성되고, root에 Alembic 환경 설정을 위한 `alembic.ini` 파일이 생성된다.  

1. Alembic 설정
    - `alembic.ini`에 DB 정보 입력

    ```ini
    sqlalchemy.url = dialect+driver://username:password@host:port/database
    ```

    ```ini
    sqlalchemy.url = mysql+pymysql://qwer:asdf@localhost:3306/test
    ```

    !!! note
        driver로는 비동기 처리 드라이버 보다는 동기 처리 드라이버를 사용하는게 안정적이다.  

    !!! tip
        `sqlalchemy.url` 정보를 입력할 때 사용자 정보에 `@`, `:`, `/` 등이 들어간다면 Alembic이 URL을 제대로 인식하지 못하는 문제가 있는데, 이 때는 해당 정보를 url encoding을 해서 입력하면 된다.  

        ```python
        from urllib import parse

        PASSWORD = "!Q@W#E$R"

        print(parse.quote(PASSWORD))
        ```
        ```
        %21Q%40W%23E%24R
        ```

1. `migrations/env.py`에 테이블 메타 정보 입력

    ```python
    from src.db.entity import *

    target_metadata = BaseEntity.metadata
    ```

    !!! warning
        이 때 `import` 관계를 잘 설정해서 **구현한 테이블을 모두 `import`** 해야 한다. `import` 되지 않은 테이블은 Alembic에서 관리해주지 않는다.  

1. Alembic revision 생성

    ```
    alembic revision --autogenerate
    ```
    ```
    INFO  [alembic.runtime.migration] Context impl MySQLImpl.
    INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
    INFO  [alembic.autogenerate.compare] Detected added table 'user'
    Generating C:\projects\python311\migrations\versions\99c928306efc_.py ...  done
    ```

    `migrations/versions/` 아래에 테이블을 생성하기 위한 DDL 코드가 자동 생성된다.  

    ??? note "UserEntity revision 생성 결과"

        ```python title="99c928306efc_.py"
        """empty message

        Revision ID: 99c928306efc
        Revises: 
        Create Date: 2024-05-04 09:28:13.815519

        """
        from typing import Sequence, Union

        from alembic import op
        import sqlalchemy as sa


        # revision identifiers, used by Alembic.
        revision: str = '99c928306efc'
        down_revision: Union[str, None] = None
        branch_labels: Union[str, Sequence[str], None] = None
        depends_on: Union[str, Sequence[str], None] = None


        def upgrade() -> None:
            # ### commands auto generated by Alembic - please adjust! ###
            op.create_table('user',
            sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
            sa.Column('name', sa.String(length=50), nullable=False),
            sa.Column('created_at', sa.DateTime(), nullable=False),
            sa.PrimaryKeyConstraint('id')
            )
            # ### end Alembic commands ###


        def downgrade() -> None:
            # ### commands auto generated by Alembic - please adjust! ###
            op.drop_table('user')
            # ### end Alembic commands ###
        ```


    ??? warning "Enum 잘못 활용 시 오류 발생 예시"
        Enum 활용 시 `.value`를 빼고 사용하면 Alembic 문서가 아래와 같이 잘못 생성된다.  

        ```python title="174b19845309_.py" hl_lines="25"
        """empty message

        Revision ID: 174b19845309
        Revises: 
        Create Date: 2024-05-12 09:25:17.261025

        """
        from typing import Sequence, Union

        from alembic import op
        import sqlalchemy as sa


        # revision identifiers, used by Alembic.
        revision: str = '174b19845309'
        down_revision: Union[str, None] = None
        branch_labels: Union[str, Sequence[str], None] = None
        depends_on: Union[str, Sequence[str], None] = None


        def upgrade() -> None:
            # ### commands auto generated by Alembic - please adjust! ###
            op.create_table('user',
            sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
            sa.Column('name', sa.String(length=<UserEntityEnum.NAME: 50>), nullable=False),
            sa.Column('created_at', sa.DateTime(), nullable=False),
            sa.PrimaryKeyConstraint('id')
            )
            # ### end Alembic commands ###


        def downgrade() -> None:
            # ### commands auto generated by Alembic - please adjust! ###
            op.drop_table('user')
            # ### end Alembic commands ###
        ```


1. Alembic revision을 head로 업그레이드 실행

    ```
    alembic upgrade head
    ```
    ```
    INFO  [alembic.runtime.migration] Context impl MySQLImpl.
    INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
    INFO  [alembic.runtime.migration] Running upgrade  -> 99c928306efc_, empty message
    ```

---
## Reference
- [SQLAlchemy - Declarative Mapping Styles](https://docs.sqlalchemy.org/en/20/orm/declarative_styles.html)
- [SQLAlchemy - Engine Configuration](https://docs.sqlalchemy.org/en/20/core/engines.html)