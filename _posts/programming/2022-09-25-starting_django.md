---
published: true
layout: post
title: '[Django] Django로 웹 개발 입문하기 01'
description: >
  웹 개발 입문을 위한 점프 투 장고 무작정 따라하기
categories: [Programming]
tags: [Back-end, Django로]
image:
  path: /assets/img/posts/django_starting.png
related_posts:
  - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. Django 설치

`Django`도 기본적으로 `python` 라이브러리이기 때문에 `pip`를 통해서 설치하면 된다.  

```powershell
> pip install Django
```

아래와 같이 `Django`와 `python` [호환성 제약](https://docs.djangoproject.com/en/4.1/faq/install/#what-python-version-can-i-use-with-django)이 있으니 `python` [가상환경](/programming/python_venv/)을 사용해서 버전을 맞춰주어야 한다.  

|Django version|Python versions|
|-|-|
|2.2|3.5, 3.6, 3.7, 3.8 (added in 2.2.8), 3.9 (added in 2.2.17)|
|3.1|3.6, 3.7, 3.8, 3.9 (added in 3.1.3)|
|3.2|3.6, 3.7, 3.8, 3.9, 3.10 (added in 3.2.9)|
|4.0, 4.1|3.8, 3.9, 3.10|
{:.scroll-table}

## 2. Project 시작

`Django` 공식 홈페이지에서는 아래와 같은 명령어로 프로젝트를 시작하면 된다고 한다.  

```powershell
> django-admin startproject [project_name]
```

다만 위와 같이 시작하면 현재 위치의 `project_name` 디렉토리가 생성되어 해당 디렉토리에서 프로젝트를 관리하게 된다. 아래와 같이 `config .` 옵션을 사용해 `config` 디렉토리를 사용하는게 명확성에 더 좋다.  

```powershell
> django-admin startproject config .
```

프로젝트를 시작하면 `config` 디렉토리 아래와 같은 파일들이 생성된다.  

- `manage.py`
  - 개발자가 `Django` 프로젝트와 상호작용할 수 있도록 해주는 파일이다. 상세한 설명은 [여기](https://docs.djangoproject.com/en/4.1/ref/django-admin/)에서 확인할 수 있다.
- `config` directory
  - 해당 디렉토리는 프로젝트를 위한 실제 `python` 패키지로, 해당 디렉토리의 이름을 사용해서 import를 진행한다.
- `config/__init__.py`
  - 이 디렉토리를 Python 패키지임을 알려주는 역할을 하는 파일이다. 해당 파일에 대한 자세한 설명은 [여기](https://wikidocs.net/1418#9595init9595py)에서 배울 수 있다.
- `config/settings.py`
  - `Django` 프로젝트에 대한 본격적인 configuration 파일로 프로젝트의 각종 설정을 세팅할 수 있다.
- `config/urls.py`
  - 각종 URL을 설정할 수 있는 파일로, `Django` 프로젝트의 table of contents에 대한 파일이라고 보면 된다. 자세한 설명은 [여기](https://docs.djangoproject.com/en/4.1/topics/http/urls/)에서 확인할 수 있다.
- `config/asgi.py`
  - ASGI 호환성을 위한 entry-point 파일이다. 자세한 설명은 [여기](https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/)에서 확인할 수 있다.
- `config/wsgi.py`
  - WSGI 호환성을 위한 entry-point 파일이다. 자세한 설명은 [여기](https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/)에서 확인할 수 있다.

추가로, 대부분의 `python` 프로젝트와 마찬가지로 프로젝트가 저장된 root 디렉토리의 이름은 아무 영향이 없어서 마음대로 바꿔도 된다고 한다. 다만 가상환경을 사용하는 경우 가상환경 구성에 문제가 생기니 root 디렉토리 이름을 바꾸면 안 된다.  

## 3. 개발 서버 구동

아래 명령어로 개발 서버를 구동하고, 특정 포트를 할당할 수도 있다.  

```powershell
# basic command
> manage.py runserver

# port setting
> manage.py runserver [port_num]
```
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
September 25, 2022 - 21:54:52
Django version 4.1.1, using settings 'config.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

위와 같이 개발 서버가 작동하면 `http://127.0.0.1:8000/`로 접속할 수 있고, `ctrl-c`로 서버를 중지할 수 있다. 개발 서버에 접속하면 아래와 같이 정상 작동 중인 것을 확인할 수 있다.  

![django_localhost](/assets/img/posts/django_localhost.png)

## 4. 감상..?

공식문서를 조금 들여다보고 튜토리얼을 조금 진행했을 뿐인데 확실히 `Django`는 웹 서비스 개발을 종합적으로 지원하는 프레임워크라는 점을 느낄 수 있었다.  
나처럼 특정 기능을 위한 소규모 API를 구현할 일이 더 많은 사람은 API 구현 툴에 가까운 `FastAPI`를 사용하는게 더 나은 것 같다.  

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/clone-jump_to_django)
- [Writing your first Django app, part 1](https://docs.djangoproject.com/en/4.1/intro/tutorial01/)
- [1-04 장고 프로젝트 생성하기](https://wikidocs.net/72377)