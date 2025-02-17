---
slug: how-to-manage-views
title: Django view 관리
date:
    created: 2022-10-16
description: >
    views.py 정리를 통한 view 관리
categories:
    - Django
tags:
    - django
---

views.py 정리를 통한 view 관리  

<!-- more -->

---

## 1. view 모듈 분리

기능을 추가하다보면 `views.py`가 점점 거대해지면서 관리가 어려워지는데, 이를 개선하려면 Python의 패키지 기능을 사용해서 `views.py` 모듈을 패키지로 분리해 관리하면 된다.  

우선 `board_qna/views` 디렉토리를 만들고, 아래 내용으로 `__init__.py` 파일을 만들어준다.  

```python title="__init__.py"
__all__ = ['base', 'answer', 'question']
```

`__init__.py` 파일은 해당 폴더를 Python 패키지로 인식하도록 해서 Python이 디렉토리와 디렉토리 안의 모듈을 혼동하는 일을 방지해주는 파일이고, `__all__`를 통해 아래와 같이 `*`을 통해 패키지 내의 모든 모듈을 import하려고 할 때 import 되는 모듈을 정의해준다.  

```python title="__init__.py"
from .views import *
```

## 2. view 정리

`board_qna/views` 디렉토리에 `base.py` 파일을 만들고, 아래와 같이 `board_qna` 앱의 기본 기능과 관련된 view들을 모아준다.  

```python title="base.py"
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator

from board_qna.models import Question


def index(request):
    """index view for question_list"""

    page = request.GET.get(key='page', default='1')  # get value of 'page' from HTTP Request
    question_list = Question.objects.order_by('-id')  # order by id desc
    paginator = Paginator(object_list=question_list, per_page=10)  # number of object per page
    page_obj = paginator.get_page(number=page)  # page to return
    total_pages = paginator.num_pages  # get number of total pages
    context = {'question_list': page_obj, 'total_pages': total_pages}  # total_page is for template filter
    return render(request=request, template_name='board_qna/question_list.html', context=context)


def detail(request, question_id):
    """view for details of each question"""

    question = get_object_or_404(Question, pk=question_id)  # returns 404 instead of 500 when requested not existing question_id
    context = {'question': question}
    return render(request, 'board_qna/question_detail.html', context)
```

`board_qna/views` 디렉토리에 `question.py` 파일을 만들고, 아래와 같이 `board_qna` 앱의 질문과 관련된 view들을 모아준다.  

```python title="question.py"
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from board_qna.models import Question
from board_qna.forms import QuestionForm


@login_required()
def question_create(request):
    """view for create question"""

    if request.method == 'POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            question = form.save(commit=False)  # temporal saving with commit=False option
            question.user = request.user  # 'request.user' returns current login user
            question.date_create = timezone.now()  # add time data to form
            question.save()
            return redirect('board_qna:index')
    else:
        form = QuestionForm()
    context = {'form': form}
    return render(request, 'board_qna/question_form.html', context)


@login_required()
def question_modify(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    if request.user != question.user:  # blocking invalid approach
        messages.error(request, '수정 권한이 없습니다')
        return redirect('board_qna:detail', question_id=question.id)  # type: ignore
    if request.method == "POST":
        form = QuestionForm(data=request.POST, instance=question)  # override instance with requested POST
        if form.is_valid():
            question = form.save(commit=False)
            question.date_modify = timezone.now()  # add current time to form
            question.save()
            return redirect('board_qna:detail', question_id=question.id)
    else:
        form = QuestionForm(instance=question)  # fill form with current context
    context = {'form': form}
    return render(request, 'board_qna/question_form.html', context)


@login_required()
def question_delete(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    if request.user != question.user:
        messages.error(request, '삭제 권한이 없습니다')
        return redirect('board_qna:detail', question_id=question.id)  # type: ignore
    question.delete()
    return redirect('board_qna:index')
```

`board_qna/views` 디렉토리에 `answer.py` 파일을 만들고, 아래와 같이 `board_qna` 앱의 답변과 관련된 view들을 모아준다.  

```python title="answer.py"
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from board_qna.models import Question, Answer
from board_qna.forms import AnswerForm


@login_required()
def answer_create(request, question_id):
    """view for create answer"""

    question = get_object_or_404(Question, pk=question_id)
    if request.method == "POST":
        form = AnswerForm(request.POST)
        if form.is_valid():
            answer = form.save(commit=False)  # temporal saving with commit=False option
            answer.user = request.user  # 'request.user' returns current login user
            answer.date_create = timezone.now()  # add time data to form
            answer.question = question
            answer.save()
            return redirect('board_qna:detail', question_id=question.id)  # type: ignore
    else:
        form = AnswerForm()
    context = {'question': question, 'form': form}
    return render(request, 'board_qna/question_detail.html', context)


@login_required()
def answer_modify(request, answer_id):
    answer = get_object_or_404(Answer, pk=answer_id)
    if request.user != answer.user:
        messages.error(request, '수정 권한이 없습니다')
        return redirect('board_qna:detail', question_id=answer.question.id)  # type: ignore
    if request.method == "POST":
        form = AnswerForm(request.POST, instance=answer)
        if form.is_valid():
            answer = form.save(commit=False)
            answer.date_modify = timezone.now()
            answer.save()
            return redirect('board_qna:detail', question_id=answer.question.id)
    else:
        form = AnswerForm(instance=answer)
    context = {'answer': answer, 'form': form}
    return render(request, 'board_qna/answer_form.html', context)


@login_required()
def answer_delete(request, answer_id):
    answer = get_object_or_404(Answer, pk=answer_id)
    if request.user != answer.user:
        messages.error(request, '삭제 권한이 없습니다')
    else:
        answer.delete()
    return redirect('board_qna:detail', question_id=answer.question.id)  # type: ignore
```

각 모듈을 정리한 후에 기존의 `views.py`를 삭제해준다.  

## 3. URL 매핑

`board_qna/urls.py`를 아래와 같이 수정하여 변경된 모듈로 view를 매핑해준다.  

```python title="urls.py"
from django.urls import path

from .views import *

app_name = 'board_qna'

urlpatterns = [
    path('', base.index, name='index'),  # name parameter is to set name of url variable for template
    path('<int:question_id>/', base.detail, name='detail'),  # url for listing board_qna
    path('question/create/', question.question_create, name='question_create'),
    path('question/modify/<int:question_id>/', question.question_modify, name='question_modify'),
    path('question/delete/<int:question_id>/', question.question_delete, name='question_delete'),
    path('answer/create/<int:question_id>/', answer.answer_create, name='answer_create'),
    path('answer/modify/<int:answer_id>/', answer.answer_modify, name='answer_modify'),
    path('answer/delete/<int:answer_id>/', answer.answer_delete, name='answer_delete'),
]
```

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/study_django)
- [점프 투 장고: 3-10 views.py 파일 분리](https://wikidocs.net/71657)
- [The Python Tutorial: 6. Modules](https://docs.python.org/3/tutorial/modules.html)
