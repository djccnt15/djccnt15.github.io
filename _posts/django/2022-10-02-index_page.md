---
published: true
layout: post
title: '[Django] 05. 인덱스 페이지'
description: >
    인덱스 페이지 만들기
categories: [Django]
tags: [python, Django]
image:
    path: /assets/img/posts/thumbnail_django.png
related_posts:
    - _posts/django/2022-10-01-mtv_form.md
    - _posts/django/2022-10-03-signin_signup.md
---
{% include series_django.html %}
* toc
{:toc}

## 0. 목표

[인덱스](https://en.wikipedia.org/wiki/Home_page) 페이지가 아래 사진처럼 아무 내용도 없고 404 에러만 보여줘서 개발 중인 페이지를 보고 싶을 경우 매번 주소를 입력해서 접속해야하는게 불편하다.  

![django_homepage_01](/assets/img/posts/django_homepage_01.png)
{:.border-image}

어차피 나중에 제대로 된 홈페이지를 만들때 써먹어야하니 이참에 복습 겸 임시로 쓸 인덱스 페이지를 만들어보기로 한다.  

## 1. App 생성

홈페이지도 웹사이트의 각 페이지들을 모아서 보여주는 **기능**을 하니 앱으로 관리하기로 한다. `config` 폴더에 바로 만들어도 되지만, 나중에 기능이 많아졌을 때 분리하는 것도 일이라 처음부터 분리해서 개발하는게 좋다.  

```bat
django-admin startapp homepage
```

생성한 앱은 아래와 같이 `config/settings.py` 파일의 `INSTALLED_APPS` 리스트에 등록하여 관리한다.  

```python
INSTALLED_APPS = [
    'homepage.apps.HomepageConfig',
]
```

## 2. view 생성

Django에서 각 페이지가 보여줄 내용은 `views.py` 파일의 함수를 통해 정의한다.  

```python
from django.shortcuts import render
from config import urls

# Create your views here.


def index(request):
    """index view for main page"""

    context = {'url_list': urls.urlpatterns}  # get url list from config
    return render(request, 'homepage/index.html', context)
```

`homepage/views.py` 파일을 위와 같이 작성하였는데, 위 코드는 `config/urls.py`에서 관리하는 URL 목록을 가져와 `homepage/index.html` 템플릿을 통해 보여준다.  

## 3. URL 매핑

인덱스 페이지에 주소를 매핑하기 위해 `homepage/urls.py` 파일을 아래와 같이 생성해준다.  

```python
from django.urls import path
from . import views

app_name = 'homepage'

urlpatterns = [
    path('', views.index, name='index'),  # name parameter is to set name of url variable for template
]
```

인덱스 페이지를 `homepage` 앱을 통해 관리하기 위해 `config/urls.py` 파일의 `urlpatterns`에 아래와 같이 추가해준다.  

```python
urlpatterns = [  # include() is a function for including url file in each app
    path('', include('homepage.urls')),
]
```

## 4. 템플릿 생성

`templates/homepage/index.html` 파일을 아래와 같이 생성한다.  

{% raw %}
```html
{% extends 'base.html' %}
{% block content %}
  <ul>
    {% for url in url_list%}
      <li><a href="{{ url.pattern }}">{{ url.namespace }}</a></li>
    {% endfor %}
  </ul>
{% endblock %}
```
{% endraw %}

아래와 같이 각 앱의 목록과 해당 앱의 메인 주소 링크를 보여준다.  

![django_homepage_02](/assets/img/posts/django_homepage_02.png)
{:.border-image}

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/study_django)