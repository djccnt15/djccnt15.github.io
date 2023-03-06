---
published: true
layout: post
title: '[Django] 07. 페이지네이션'
description: >
    페이지네이션과 템플릿 필터
categories: [WebDev]
tags: [Django]
image:
    path: /assets/img/posts/thumbnail_django.png
related_posts:
    - _posts/webdev/2022-10-03-starting_django_06.md
    - _posts/webdev/2022-10-15-starting_django_08.md
---
{% include series_django.html %}
* toc
{:toc}

## 1. 커스텀 템플릿 필터

페이지네이션 관련 기능 중에 현재 페이지가 전체 페이지 중간에 위치해 생략되는 경우를 계산해서 '…' 생략 기호를 넣으려면 변수를 통한 계산이 필요한데, Django의 기본 템플릿 필터는 변수를 통한 연산을 지원하지 않는다. 따라서 커스텀 템플릿 필터를 먼저 생성해야 한다.  

[공식 문서](https://docs.djangoproject.com/en/4.1/howto/custom-template-tags/)를 읽어보면 커스텀 템플릿 필터는 해당 필터를 사용하려는 앱의 `templatetags` 디렉토리에 위치해야 하며, 해당 디렉토리를 Python 모듈로 인식시키기 위해 `__init__.py` 파일을 생성해야 한다. 

`board_qna/templatetags` 디렉토리를 생성하고, 빈 내용의 `__init__.py`와 아래 내용의 `board_qna_filter.py` 파일을 생성하자.  

```python
from django import template

register = template.Library()


@register.filter(name='sub')
def sub(value, arg):
    return value - arg
```

참고로 `(name='sub')` 부분은 생략 가능하며, 이 경우 Django는 함수 이름을 필터 이름으로 인식한다.  

이렇게 생성한 템플릿 필터는 사용할 템플릿에서 아래와 같이 {% raw %}`{% load [source] %}`{% endraw %} 태그를 통해 호출할 수 있다.  

{% raw %}
```liquid
{% load [source] %}
```
{% endraw %}

## 2. 페이지네이션

### 2-1. view 수정

Django [공식 문서](https://docs.djangoproject.com/en/4.1/topics/pagination/)를 보면 페이지네이션을 처리하는 방법은 제네릭 뷰를 사용하는 방법과 페이지네이터를 사용하는 방법이 있는데, [페이지네이터](https://docs.djangoproject.com/en/4.1/ref/paginator/)를 사용해서 처리해보기로 한다.  

우선 view를 제공하는 함수를 수정해 view에서 페이지네이션을 제공하도록 해야한다.  

```python
from django.shortcuts import render
from django.core.paginator import Paginator
from .models import Question

# Create your views here.


def index(request):
    """index view for question_list"""

    page = request.GET.get(key='page', default='1')  # get value of 'page' from HTTP Request
    question_list = Question.objects.order_by('-id')  # order by id desc
    paginator = Paginator(object_list=question_list, per_page=10)  # number of object per page
    page_obj = paginator.get_page(number=page)  # page to return
    total_pages = paginator.num_pages  # get number of total pages
    context = {'question_list': page_obj, 'total_pages': total_pages}  # total_page is for template filter
    return render(request=request, template_name='board_qna/question_list.html', context=context)
```

주석에 달았듯이, `GET` 요청 중에 `page` 항목을 받아서 보여줄 페이지를 구성한다. `total_pages`는 템플릿에서 사용할 생략 표시의 계산 기준을 주기 위해 만들어주었다.  

요청이 들어올 때마다 전체 페이지를 조회하고 그 중에 필요한 내용만 추출해 구성하는 방식이라 성능이 안 좋을까 걱정되서 찾아봤는데, `Paginator` 객체의 [소스 코드](https://github.com/django/django/blob/main/django/core/paginator.py)를 보면 캐싱을 위한 `cached_property` 데코레이터가 적용되어 있다.  
{:.note}

### 2-2. 템플릿 수정

페이지네이션을 적용할 `template/board_qna/question_list.html` 파일의 적당한 위치에 아래 내용들을 추가해 적용하면 된다.  

{% raw %}
```html
{% load board_qna_filter %}
```
{% endraw %}

우선 앞서 설명한 바와 같이 {% raw %}`{% load [source] %}`{% endraw %} 태그를 통해 템플릿 필터를 호출해준다. 참고로 {% raw %}`{% load [source] %}`{% endraw %} 태그와 {% raw %}`{% extends [source] %}`{% endraw %} 태그가 같이 쓰일 경우, 아래와 같이 {% raw %}`{% extends [source] %}`{% endraw %} 태그가 먼저 나와야 한다.  

{% raw %}
```liquid
{% extends [source] %}
{% load [source] %}
```
{% endraw %}

다음으로는 사용자 화면에서 실제로 페이지네이션을 보여줄 위치에 아래와 같이 페이지네이션 코드를 넣어주면 된다.  

{% raw %}
```html
<!-- paging start -->
<ul class="pagination justify-content-center">
  <!-- to first page -->
  {% if question_list.has_previous %}
    <li class="page-item">
      <a class="page-link" href="?page={{ question_list. }}">처음</a>
    </li>
  {% else %}
    <li class="page-item disabled">
      <a class="page-link" tabindex="-1" aria-disabled="true" href="#">처음</a>
    </li>
  {% endif %}
  <!-- to prev page -->
  {% if question_list.has_previous %}
    <li class="page-item">
      <a class="page-link" href="?page={{ question_list.previous_page_number }}">이전</a>
    </li>
  {% else %}
    <li class="page-item disabled">
      <a class="page-link" tabindex="-1" aria-disabled="true" href="#">이전</a>
    </li>
  {% endif %}
  <!-- ellipsis -->
  {% if question_list.number > 6 %}
    <li class="page-item page-link disabled">...</li>
  {% endif %}
  <!-- paging list -->
  {% for page_number in question_list.paginator.page_range %}
    {% if page_number >= question_list.number|add:-5 and page_number <= question_list.number|add:5 %}
      {% if page_number == question_list.number %}
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="?page={{ page_number }}">{{ page_number }}</a>
        </li>
      {% else %}
        <li class="page-item">
          <a class="page-link" href="?page={{ page_number }}">{{ page_number }}</a>
        </li>
      {% endif %}
    {% endif %}
  {% endfor %}
  <!-- ellipsis -->
  {% if total_pages|sub:question_list.number > 5 %}
    <li class="page-item page-link disabled">...</li>
  {% endif %}
  <!-- to next page -->
  {% if question_list.has_next %}
    <li class="page-item">
      <a class="page-link" href="?page={{ question_list.next_page_number }}">다음</a>
    </li>
  {% else %}
    <li class="page-item disabled">
      <a class="page-link" tabindex="-1" aria-disabled="true" href="#">다음</a>
    </li>
  {% endif %}
  <!-- to last page -->
  {% if question_list.has_next %}
    <li class="page-item">
      <a class="page-link" href="?page={{ total_pages }}">마지막</a>
    </li>
  {% else %}
    <li class="page-item disabled">
      <a class="page-link" tabindex="-1" aria-disabled="true" href="#">마지막</a>
    </li>
  {% endif %}
</ul>
<!-- paging end -->
```
{% endraw %}

### 2-3. 테스트 데이터 생성

Django shell을 사용해서 테스트 데이터를 생성하자.  

```powershell
> manage.py shell
```
```
Python 3.10.7 (tags/v3.10.7:6cc6b13, Sep  5 2022, 14:08:36) [MSC v.1933 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
```
```python
>>> from board_qna.models import Question
>>> from django.utils import timezone
>>> from django.contrib.auth import authenticate
>>> user = authenticate(username='admin', password='admin')
>>> for i in range(100):
...     q = Question(subject=f'test data - [{i}]', content='test content', date_create=timezone.now(), user=user)
...     q.save()
```

페이지네이션이 적용된 결과는 아래와 같다.  

![django_paging](/assets/img/posts/django_paging.png)
{:.border-image}

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/study_django)
- [점프 투 장고: 3-03 템플릿 필터](https://wikidocs.net/71313)
- [점프 투 장고: 3-02 페이징](https://wikidocs.net/71240)