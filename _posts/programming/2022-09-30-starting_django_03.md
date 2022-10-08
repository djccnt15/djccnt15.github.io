---
published: true
layout: post
title: '[Django] 03. 템플릿과 css'
description: >
  기초 화면 구성, css와 Bootstrap을 활용한 스타일 적용
categories: [Programming]
tags: [Django]
image:
  path: /assets/img/posts/django_starting.png
related_posts:
  - _posts/programming/2022-09-27-starting_django_02.md
  - _posts/programming/2022-10-01-starting_django_04.md
---
* toc
{:toc}

{% include series_django.html %}

## 0. 개요

바로 로그인/로그아웃, 회원가입 등 주요 기능으로 넘어가고 싶지만, 화면이 없어 만들어도 확인을 할 수가 없으니 일단 화면부터 만들기로 한다.  

## 1. 템플릿 폴더 설정

[템플릿](https://docs.djangoproject.com/en/4.1/topics/templates/)은 HTML을 동적으로 생성해주는 기능을 해서 Front-end 화면을 쉽게 만들 수 있게 해준다.  

Django 프로젝트에서 사용할 템플릿을 생성하기 전에, 우선 `config/settings.py`에서 `TEMPLATES` 항목을 아래와 같이 수정해준다.  

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # use common templates folder
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

위와 같이 설정하면 root 디렉토리의 `templates` 폴더에서 모든 템플릿을 통합하여 편리하게 관리할 수 있다.  

## 2. 질문 목록 화면

### 2-1. view 생성

질문 목록을 보여주는 `index` view를 만들기 위해 `board_qnd/views.py` 파일을 아래와 같이 수정해준다.  

```python
from django.shortcuts import render
from .models import Question

# Create your views here.


def index(request):
    """
    index view for question_list
    """

    question_list = Question.objects.order_by('-date_create')  # order by date_create desc
    context = {'question_list': question_list}
    return render(request, 'board_qna/question_list.html', context)
```

`date_create`에 `-`를 붙였기 때문에 내림차순으로 정렬된다. `render()`는 템플릿과 데이터를 조합하여 [`HttpResponse` 객체](https://docs.djangoproject.com/en/4.1/ref/request-response/#django.http.HttpResponse)로 반환하는 함수로, 자세한 설명은 [공식 문서](https://docs.djangoproject.com/en/4.1/topics/http/shortcuts/#render)에서 볼 수 있다.  

### 2-2. 템플릿 생성

앞에서 `index` view에서 지정한 `question_list.html` 템플릿을 `templates/board_qna` 폴더에 아래와 같이 생성해준다.  

{% raw %}
```html
<h1>Hello World! Welcome to Q&A board.</h1>

{% if question_list %}
  <ul>
  {% for question in question_list %}
    <li><a href="{% url 'board_qna:detail' question.id %}">{{ question.id }} {{ question.subject }}</a></li>
  {% endfor %}
  </ul>
{% else %}
  <p>질문이 없습니다.</p>
{% endif %}
```
{% endraw %}

아래 화면과 같은 결과로 생성된다.  

![django_template_01](/assets/img/posts/django_template_01.png)

Django에서는 [Django 템플릿 언어](https://docs.djangoproject.com/en/4.1/ref/templates/language/)를 사용해서 템플릿을 작성한다. Jekyll에서 사용하는 [liquid](https://shopify.github.io/liquid/)와 별 차이는 없는 것 같다.  

## 3. 질문 세부 내용 화면

### 3-1. view 생성

질문의 세부 내용을 보여주는 `detail` view를 만들기 위해 `board_qnd/views.py` 파일에 아래 내용을 추가해준다.  

```python
from django.shortcuts import render, get_object_or_404
from .models import Question


def detail(request, question_id):
    """
    view for details of each question
    """

    question = get_object_or_404(Question, pk=question_id)  # returns 404 instead of 500 when requested not existing question_id
    context = {'question': question}
    return render(request, 'board_qna/question_detail.html', context)
```

### 3-2. URL 매핑

위에서 만들어준 `index` view에 링크들을 매핑해주기 위해 `board_qna/urls.py` 파일을 아래와 같이 수정해준다.  

```python
from django.urls import path
from . import views

app_name = 'board_qna'

urlpatterns = [
    path('', views.index, name='index'),  # name parameter is to set name of url variable for template
    path('<int:question_id>/', views.detail, name='detail'),  # url for board_qna
]
```

### 3-3. 템플릿 생성

`templates/board_qna` 폴더에 `question_detail.html` 파일을 아래와 같이 생성해준다.  

{% raw %}
```html
<h1>{{ question.subject }}</h1>
<div>
  {{ question.content }}
</div>
```
{% endraw %}

아래 화면과 같은 결과로 생성된다.  

![django_template_02](/assets/img/posts/django_template_02.png)

## 4. 스타일 적용

### 4-1. static 기초 설정

[static](https://en.wikipedia.org/wiki/Static_web_page)은 웹 페이지에 정적 디자인을 부여해준다. Django 프로젝트에 사용할 디자인을 통합하여 관리하기 위해 `config/settings.py`에서 `Static` 항목을 아래와 같이 수정해준다.  

```python
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
```

위와 같이 설정하면 root 디렉토리의 `static` 폴더에서 모든 스타일을 통합하여 편리하게 관리할 수 있다.  

### 4-2. 스타일시트 작성

원래라면 `static/style.css` 파일을 생성해 css로 스타일을 만들어줘야 하나 빠르게 구현해보기 위해 Bootstrap을 사용하기로 한다. 본 프로젝트에서는 v5.2를 사용했다.  

[Bootstrap](https://getbootstrap.com/) 홈페이지에서 [Compiled CSS and JS](https://getbootstrap.com/docs/5.2/getting-started/download/#compiled-css-and-js)를 다운받고, `css/bootstrap.min.css` 파일을 `static` 디렉토리에 저장하자.  

### 4-3. 기본 템플릿 생성 및 포함

`template` 디렉토리에 `<html>`, `<head>`, `<body>` 태그를 포함하여 표준 HTML 문서의 구조를 가지고, 템플릿 상속을 통해 다른 템플릿의 기초가 되는 `base.html`을 먼저 생성한다.  

{% raw %}
```html
{% load static %}
<!doctype html>
<html lang="ko">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" type="text/css" href="{% static 'bootstrap.min.css' %}">
  <!-- board_qna CSS -->
  <link rel="stylesheet" type="text/css" href="{% static 'style.css' %}">
  <title>Hello, World!</title>
</head>
<body>
<!-- nav bar -->
{% include "navbar.html" %}
<!-- content start -->
{% block content %}
{% endblock %}
<!-- content end -->
<!-- Bootstrap JS -->
<script src="{% static 'bootstrap.min.js' %}"></script>
</body>
</html>
```
{% endraw %}

#### 💡 템플릿 포함

{% raw %}`{% include [resource] %}`{% endraw %} 태그는 다른 템플릿을 포함시킨다는 뜻으로, 아래 코드는 해당 위치에 `navbar.html`을 포함시켜서 같이 렌더링 한다는 뜻이다.  

{% raw %}
```html
{% include "navbar.html" %}
```
{% endraw %}

#### 💡 스타일 적용

템플릿에 스타일을 적용하려면 아래와 같이 {% raw %}`{% load static %}`{% endraw %} 태그와 `<link>` 태그를 사용해서 연결해주면 된다.  

{% raw %}
```html
{% load static %}
<link rel="stylesheet" type="text/css" href="{% static 'style.css' %}">
```
{% endraw %}

### 4-4. 내비게이션 바 추가

`template` 디렉토리에 아래와 같이 `navbar.html` 템플릿을 생성해준다.  

{% raw %}
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Hello World!</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="{% url 'board_qna:index' %}">Q&A</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">로그인</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```
{% endraw %}

내비게이션 바는 모든 화면 상단에서 공통적으로 보여줘야 하므로 아래와 같이 `base.html` 파일에서 `<body>`의 가장 위에 {% raw %}`{% include [resource] %}`{% endraw %} 태그를 이용하여 공용 템플릿에 포함시켜준다.  

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/starting_django)
- [점프 투 장고: 2-04 조회와 템플릿](https://wikidocs.net/70736)
- [점프 투 장고: 2-05 URL 별칭](https://wikidocs.net/70741)
- [점프 투 장고: 2-07 스태틱](https://wikidocs.net/70804)
- [점프 투 장고: 2-08 부트스트랩](https://wikidocs.net/70838)
- [점프 투 장고: 2-09 템플릿 상속](https://wikidocs.net/70851)
- [점프 투 장고: 3-05 로그인과 로그아웃](https://wikidocs.net/71259)