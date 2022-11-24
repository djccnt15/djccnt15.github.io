---
published: true
layout: post
title: '[Django] 10. 추천 기능'
description: >
    추천 기능 만들기
categories: [WebDev]
tags: [Django]
image:
    path: /assets/img/posts/django_starting.png
related_posts:
    - _posts/webdev/2022-10-16-starting_django_09.md
---
* toc
{:toc}

{% include series_django.html %}

## 1. 데이터 모델 수정

추천 기능을 만드는 방법은 여러 가지가 있겠지만 `models.py` 파일을 아래와 같이 수정하여 질문 및 답변과 추천한 사용자를 `ManyToMany`로 연결하면 중복 추천을 방지할 수 있다.  

```python
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Question(models.Model):
    """
    model for question
    """

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='question_user')
    subject = models.CharField(max_length=200)
    content = models.TextField()
    date_create = models.DateTimeField()
    date_modify = models.DateTimeField(null=True, blank=True)  # null is for DB, blank is for validation
    voter = models.ManyToManyField(User, related_name='question_voter')

    def __str__(self):
        return self.subject


class Answer(models.Model):
    """
    model for answer
    """

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='answer_user')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_answers')
    content = models.TextField()
    date_create = models.DateTimeField()
    date_modify = models.DateTimeField(null=True, blank=True)
    voter = models.ManyToManyField(User, related_name='answer_voter')

    def __str__(self):
        return self.content
```

이 때 `user`와 `voter` 필드에 대해 `related_name` 파라미터를 지정하지 않으면, User 모델의 중복 참조 오류가 발생한다.  

모델을 변경한 후에는 마이그레이션을 진행해야한다.  

```powershell
> manage.py makemigrations

> manage.py migrate
```

## 2. view 생성

질문을 추천하기 위한 기능을 만들기 위해 `views/question.py` 파일에 아래 내용을 추가하자.  

```python
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from board_qna.models import Question


@login_required()
def question_vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    if request.user == question.user:
        messages.error(request, '본인이 작성한 글은 추천할 수 없습니다')
    else:
        question.voter.add(request.user)
    return redirect('board_qna:detail', question_id=question.id)  # type: ignore
```

답변을 추천하기 위한 기능을 만들기 위해 `views/answer.py` 파일에 아래 내용을 추가하자.  

```python
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from board_qna.models import Answer


@login_required()
def answer_vote(request, answer_id):
    answer = get_object_or_404(Answer, pk=answer_id)
    if request.user == answer.user:
        messages.error(request, '본인이 작성한 글은 추천할 수 없습니다')
    else:
        answer.voter.add(request.user)
    return redirect('board_qna:detail', question_id=answer.question.id)  # type: ignore
```

## 3. URL 매핑

`urls.py`에 아래 내용을 추가하여 각 view를 호출하기 위한 URL을 만들어준다.  

```python
from django.urls import path

from .views import *

app_name = 'board_qna'

urlpatterns = [
    path('question/vote/<int:question_id>/', question.question_vote, name='question_vote'),
    path('answer/vote/<int:answer_id>/', answer.answer_vote, name='answer_vote'),
]
```

## 4. 템플릿 수정

아래와 같이 `question_detail.html` 템플릿의 적당한 위치에 추천 버튼을 만들어주고, 추천 시 확인창을 띄우는 JavaScript를 연결해준다.  

{% raw %}
```html
{% block content %}
<button
  class="recommend btn btn-sm btn-outline-secondary"
  data-uri="{% url 'board_qna:question_vote' question.id %}">추천
<span class="badge rounded-pill bg-success">{{ question.voter.count }}</span>
</button>
<button
  class="recommend btn btn-sm btn-outline-secondary"
  data-uri="{% url 'board_qna:answer_vote' answer.id %}">추천
  <span class="badge rounded-pill bg-success">{{ answer.voter.count }}</span>
</button>
{% endblock %}
{% block script %}
  {% load static %}
  <script type="text/javascript" src="{% static 'recommend.js' %}"></script>
{% endblock %}
```
{% endraw %}

확인창을 띄우는 JavaScript의 내용은 아래와 같다.  

```javascript
const recommend_elements = document.getElementsByClassName("recommend");
Array.from(recommend_elements).forEach(function (element) {
  element.addEventListener(type='click', listener=function () {
    if (confirm(message="정말로 추천하시겠습니까?")) {
      location.href = this.dataset.uri;
    };
  });
});
```

아래와 같이 추천 기능이 정상적으로 작동하는 것을 확인할 수 있다.  

![django_recommend](/assets/img/posts/django_recommend.png)
{:.border-image}

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/starting_django)
- [점프 투 장고: 3-11 추천](https://wikidocs.net/71791)