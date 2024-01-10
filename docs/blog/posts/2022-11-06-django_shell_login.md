---
slug: how-to-login-django-shell
title: shell에서 로그인하기
date:
    created: 2022-11-06
description: >
    Django Shell 로그인 방법 정리
categories:
    - Django
tags:
    - Django
---

Django Shell 로그인 방법 정리

<!-- more -->

---

## Django Shell 로그인

Django에서 테스트 데이터를 생성한다든가 할 때 shell에서 Django의 API를 개발자가 직접 컨트롤하게 되는데, 유저 정보가 필수인 경우가 있어 로그인을 해야할 때가 있다.  

이 때는 아래와 같이 사용자 인증 API를 직접 호출하여 유저 정보를 입력해주면 된다. 자세한 내용은 [공식 문서](https://docs.djangoproject.com/en/4.1/topics/auth/default/#authenticating-users) 참고  

```bat
manage.py shell
```

```python
>>> from django.contrib.auth import authenticate

>>> user = authenticate(username='username', password='password')
>>> user
```
```
<User: admin>
```

---
## Reference
- [Authenticating users](https://docs.djangoproject.com/en/4.1/topics/auth/default/#authenticating-users)