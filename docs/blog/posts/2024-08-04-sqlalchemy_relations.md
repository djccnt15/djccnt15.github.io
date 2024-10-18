---
slug: sqlalchemy-relations
title: SQLAlchemy의 relations
date:
    created: 2024-08-04
description: >
    SQLAlchemy로 테이블의 관계를 사용하는 방법
categories:
    - Python
tags:
    - python
    - orm
    - sqlalchemy
---

SQLAlchemy로 테이블의 관계를 사용하는 방법  

<!-- more -->

---

## 1:N 관계

기본적인 1:N 관계는 아래와 같이 설정한다.  

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import BigInteger, String


class BaseEntity(DeclarativeBase): ...


class RoleEntity(BaseEntity):
    __tablename__ = "role"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(length=30), unique=True)

    user = relationship(argument="UserEntity", back_populates="role")


class UserEntity(BaseEntity):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(length=30), unique=True)
    role_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(column=RoleEntity.id))

    role = relationship(argument="RoleEntity", back_populates="user")
```

??? note "type hint를 사용해서 더 간결하고 직관적으로 작성하는 방법"
    아래와 같이 코드를 작성하면 더 간결하고 직관적으로 작성할 수 있으며, IDE와 사용자에게 연관관계에 대한 정보를 더 쉽게 줄 수 있는 장점이 있지만,  
    엔티티 관리 모듈이 길어져 모듈을 분리할 때 **순환 참조 오류가 발생**한다는 문제점이 있다.  

    ```python
    from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
    from sqlalchemy.schema import ForeignKey
    from sqlalchemy.types import BigInteger, String


    class BaseEntity(DeclarativeBase): ...


    class RoleEntity(BaseEntity):
        __tablename__ = "role"

        id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
        name: Mapped[str] = mapped_column(String(length=30), unique=True)

        user: Mapped[list["UserEntity"]] = relationship(back_populates="role")


    class UserEntity(BaseEntity):
        __tablename__ = "user"

        id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
        name: Mapped[str] = mapped_column(String(length=30), unique=True)
        role_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(column=RoleEntity.id))

        role: Mapped["RoleEntity"] = relationship(back_populates="user")
    ```

## N:M 관계

N:M 관계는 아래와 같이 중계(junction) 테이블을 이용해서 설정할 수 있다.  

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import BigInteger, String


class BaseEntity(DeclarativeBase): ...


class UserEntity(BaseEntity):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(length=30), unique=True)

    post = relationship(
        argument="PostEntity",
        secondary="PostVoteEntity",
        back_populates="user",
    )


class PostEntity(BaseEntity):
    __tablename__ = "post"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(length=30), unique=True)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(column=UserEntity.id))

    user = relationship(
        argument="UserEntity",
        secondary="PostVoteEntity",
        back_populates="post",
    )


class PostVoteEntity(BaseEntity):
    __tablename__ = "post_vote"

    user_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey(UserEntity.id),
        primary_key=True,
    )
    post_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey(PostEntity.id),
        primary_key=True,
    )
```

## 자기참조 관계

계층형 테이블의 자기참조 관계는 아래와 같이 설정할 수 있다.  

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.schema import ForeignKey
from sqlalchemy.types import BigInteger, Integer, String


class BaseEntity(DeclarativeBase): ...


class PostCategoryEntity(BaseEntity):
    __tablename__ = "category"

    id: Mapped[int] = mapped_column(
        type_=BigInteger,
        primary_key=True,
        autoincrement=True,
        sort_order=-1,
    )  # need to override for self relations
    tier: Mapped[int] = mapped_column(Integer)
    name: Mapped[str] = mapped_column(String(length=30))
    parent_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("category.id"))

    parent = relationship(argument="PostCategoryEntity", remote_side=[id])
```
