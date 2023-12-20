---
published: true
layout: post
title: '[Django] shell에서 로그인하기'
description: >
    Django Shell 로그인
categories: [Django]
tags: [python, Django]
image:
    path: /assets/img/posts/thumbnail_django.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

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