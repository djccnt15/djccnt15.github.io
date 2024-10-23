---
slug: auth-user-customize
title: Django User 테이블 커스터마이징
date:
    created: 2024-09-01
description: >
    Django의 User 테이블 커스터마이징 방법
categories:
    - Django
tags:
    - django
---

Django의 User 테이블 커스터마이징 방법  

<!-- more -->

---

## Custom User 테이블 사용하기

!!! note
    이 방식은 프로젝트를 처음 시작할 때만 사용 가능하고, 한 번이라도 마이그레이션을 진행하면 사용할 수 없다.  

django를 사용하면 사용자 관리용 테이블을 기본적으로 제공해주는데, 해당 테이블을 커스터마이징 하고 싶을 경우 아래와 같이 `AbstractUser` 클래스를 상속받아 사용하면 된다.  

```python title="models.py"
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ...
```

이 경우 아래와 같이 `admin.py` 파일에 해당 모델을 등록해서 관리자가 해당 모델을 관리할 수 있도록 해줘야 한다.  

```python title="admin.py"
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
```

또한 아래와 같이 `settings.py`에 `AUTH_USER_MODEL`을 등록해야한다.  

```python title="settings.py"
...

AUTH_USER_MODEL = "<app_name>.<model_name>"

...
```

!!! note
    설정이 잘못될 경우 아래와 같은 에러가 발생한다.  

    ```
    ...
    django.db.utils.ProgrammingError: (1146, "Table '{app_name}.auth_user' doesn't exist")
    ```

!!! warning
    이 방법을 사용할 경우 프로젝트 내부에서 django의 기본 사용자 테이블의 ORM 클래스인 `User`를 사용하지 않도록 주의해야 한다.  

    ```python
    from django.contrib.auth.models import User  # don't use this django User class
    ```

## 1:1 추가 테이블 사용하기

프로젝트를 진행하던 중 `User` 테이블을 커스텀하고 싶은 내용을 기본 제공되는 `auth_user` 테이블에 1:1 관계의 addon 형태로 구성한 테이블을 사용하면 된다.  

```python title="models.py"
from django.contrib.auth.models import User


class UserDetail(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    ...
```
