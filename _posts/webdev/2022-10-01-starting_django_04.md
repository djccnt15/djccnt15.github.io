---
published: true
layout: post
title: '[Django] 04. MTV 패턴과 Form'
description: >
    form 활용 및 화면 개선
categories: [WebDev]
tags: [Django]
image:
    path: /assets/img/posts/thumbnail_django.png
related_posts:
    - _posts/webdev/2022-09-30-starting_django_03.md
    - _posts/webdev/2022-10-02-starting_django_05.md
---
{% include series_django.html %}
* toc
{:toc}

## 1. 질문 등록 기능

### 1-1. form 생성

💡[form](https://docs.djangoproject.com/en/4.1/topics/forms/)은 말 그대로 일종의 양식으로, 사용자가 입력한 데이터를 서버로 전달할 때 사용자가 데이터를 입력할 양식을 정하는 기능을 한다. Django의 form의 사용에 대한 자세한 설명은 [여기](https://docs.djangoproject.com/en/4.1/ref/forms/api/)를 참고하자.  
{:.note}

`board_qna/forms.py` 파일에 아래와 같은 내용을 추가해준다.  

```python
from django import forms
from .models import Question


class QuestionForm(forms.ModelForm):
    """form for create question"""

    class Meta:
        """class for set metadata to question model"""

        model = Question  # model to use
        fields = ['subject', 'content']  # field for QuestionForm from Question model
        labels = {
            'subject': '제목',
            'content': '내용'
        }
```

`QuestionForm`은 `ModelForm`을 상속해서 만들었는데, `ModelForm`은 모델(Model)과 연결된 폼으로 폼을 저장하면 연결된 모델의 데이터를 저장할 수 있는 폼이다. `ModelForm`에 대한 자세한 설명은 [공식 문서](https://docs.djangoproject.com/en/4.1/topics/forms/modelforms/)에서 볼 수 있다.  

폼 모델은 이너 클래스인 `Meta` class가 필수인데, `Meta` class를 통해 폼의 메타데이터, 즉 사용할 모델과 모델의 속성을 지정해야 하기 때문이다. `Meta` class에 대한 설명은 [공식 문서](https://docs.djangoproject.com/en/4.1/topics/db/models/#meta-options)를 참고하자.  

### 1-2. view 생성

매핑한 URL을 통해 보여줄 view를 아래와 같이 작성해준다.  

```python
from django.shortcuts import render, redirect
from django.utils import timezone
from .forms import QuestionForm

# Create your views here.


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
```

html에서 `<a>`를 사용하면 무조건 GET 방식으로 요청이 요청되기 때문에 `질문 등록` 버튼을 누를 경우 `else`문이 수행되어 `QuestionForm()`을 렌더링하고, `저장 하기` 버튼을 누르면 `<button>` 태그가 POST 방식으로 수행되어 해당 조건의 코드를 수행한다.  

### 1-3. URL 매핑

`board_qna/urls.py` 파일에 아래와 같이 질문 생성을 위한 URL을 매핑해준다.  

```python
urlpatterns = [
    path('question/create/', views.question_create, name='question_create'),
]
```

### 1-4. 템플릿 생성

`board_qna/question_form.html` 파일을 아래 내용으로 생성하여 질문 등록을 위한 form 템플릿을 생성해준다.  

{% raw %}
```html
{% extends 'base.html' %}
{% block content %}
  <div class="container">
    <h5 class="my-3 border-bottom pb-2">질문 등록</h5>
    <form method="POST">
      {% csrf_token %}
      {% include "form_errors.html" %}
      <div class="mb-3">
        <label for="subject" class="form-label">제목</label>
        <input
          type="text"
          class="form-control"
          name="subject"
          id="subject"
          value="{{ form.subject.value|default_if_none:'' }}">
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea
          class="form-control"
          name="content"
          id="content"
          rows="10">{{ form.content.value|default_if_none:'' }}
        </textarea>
      </div>
      <button type="submit" class="btn btn-primary">저장 하기</button>
    </form>
  </div>
{% endblock %}
```
{% endraw %}

💡{% raw %}`{% csrf_token %}`{% endraw %}은 보안 관련 항목으로 form으로 전송한 데이터가 실제 웹 페이지에서 작성한 데이터인지를 판단하는 역할을 한다. `<form>` 태그를 사용할 때는 반드시 같이 사용해줘야 한다.  
{:.note}

Django에서 프로젝트를 시작하면 아래와 같이 `MIDDLEWARE`의 기본 요소로 추가되어 있다.  

```python
MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
]
```

#### 템플릿 상속/확장

{% raw %}`{% extends [source] %}`{% endraw %}는 템플릿의 [상속](https://docs.djangoproject.com/en/4.1/ref/templates/language/#template-inheritance)으로 지정된 부분을 확장하여 해당 파일에 넣으라는 뜻이다. 자세한 설명은 [여기](https://docs.djangoproject.com/en/4.1/ref/templates/builtins/#extends)를 참고하자.  

{% raw %}
```liquid
{% extends 'base.html' %}
{% block content %}
{% endblock %}
```
{% endraw %}

아래와 같은 화면으로 생성된다.  

![django_bootstrap_02](/assets/img/posts/django_bootstrap_02.png)
{:.border-image}

#### 템플릿 포함

form의 에러를 확인하는 `form_errors.html` 파일은 아래와 같다.  

{% raw %}
```html
<!-- alert field/non-field error -->
{% if form.errors %}
<div class="alert alert-danger">
  {% for field in form %}
    <!-- field error -->
    {% if field.errors %}
      <div>
        <strong>{{ field.label }}</strong>
        {{ field.errors }}
      </div>
    {% endif %}
  {% endfor %}
  <!-- non-field error -->
  {% for error in form.non_field_errors %}
    <div>
      <strong>{{ error }}</strong>
    </div>
  {% endfor %}
</div>
{% endif %}
```
{% endraw %}

## 2. 질문 목록 화면 수정

`question_list.html` 파일을 아래와 같이 수정하여 질문 목록 화면을 만들어준다. 중간에 `question.answer_set`은 데이터 모델에서 작성하지 않았는데, 데이터 모델에서 관계된 모델이 있을 경우 모델에 사용자가 직접 지정하지 않더라도 Django가 연결된 객체에 자동으로 `{model}_set`라는 이름을 부여해준다. 자세한 내용은 [공식 문서](https://docs.djangoproject.com/en/4.1/topics/db/queries/#related-objects) 참고  

{% raw %}
```html
{% extends 'base.html' %}
{% block content %}
  <div class="container my-3 text-nowrap">
    <table class="table">
      <thead>
      <tr class="table-dark text-center" >
        <th>번호</th>
        <th>작성자</th>
        <th>제목</th>
        <th>작성일시</th>
      </tr>
      </thead>
      <tbody>
      {% if question_list %}
        {% for question in question_list %}
          <tr>
            <td class="text-center">{{ question.id }}</td>
            <td class="text-center">{{ question.user }}</td>
            <td width="70%">
              <a href="{% url 'board_qna:detail' question.id %}">{{ question.subject }}</a>
              {% if question.answer_set.count > 0 %}
                <span class="text-danger small mx-2">{{ question.answer_set.count }}</span>
              {% endif %}
            </td>
            <td class="text-center" width="5%">{{ question.date_create|date:'Y-m-d H:i:s' }}</td>
          </tr>
        {% endfor %}
      {% else %}
        <tr>
          <td colspan="3">질문이 없습니다.</td>
        </tr>
      {% endif %}
      </tbody>
    </table>
    <a href="{% url 'board_qna:question_create' %}" class="btn btn-primary">질문 등록</a>
  </div>
{% endblock %}
```
{% endraw %}

공통 부분은 {% raw %}`{% extends 'base.html' %}`{% endraw %} 태그를 통해 앞서 만든 `base.html`을 상속 받아와서 처리하고, {% raw %}`{% block content %}`{% endraw %} 태그와 {% raw %}`{% endblock %}`{% endraw %} 태그 사이에 본 페이지에 들어갈 내용을 넣어준다.  

{% raw %}`{{ question.date_create|date:'Y-m-d H:i:s' }}`{% endraw %}에서 `|date:'Y-m-d H:i:s'`부분은 [템플릿 필터](https://docs.djangoproject.com/en/4.1/ref/templates/builtins/#filter)로 날짜 데이터의 형식을 바꿔주기 위해 사용했다. `date` 필터에 대한 내용은 [공식 문서](https://docs.djangoproject.com/en/4.1/ref/templates/builtins/#std-templatefilter-date)를 참고하자.  

아래와 같은 화면으로 생성된다.  

![django_bootstrap_01](/assets/img/posts/django_bootstrap_01.png)
{:.border-image}

## 3. 답변 등록 화면

### 3-1. form 생성

`board_qna` 디렉토리에 `forms.py` 파일을 아래와 같은 내용으로 생성해준다.  

```python
from django import forms
from .models import Answer


class AnswerForm(forms.ModelForm):
    """form for create answer"""

    class Meta:
        """class for set metadata to answer model"""

        model = Answer
        fields = ['content']
        labels = {
            'content': '답변 내용',
        }
```

### 3-2. view 생성

답변을 등록하는 `answer_create` view를 만들기 위해 `board_qna/views.py` 폴더에 아래 내용과 같이 추가해준다.  

```python
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from .forms import AnswerForm

# Create your views here.


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
            return redirect('board_qna:detail', question_id=question.id)
    else:
        form = AnswerForm()
    context = {'question': question, 'form': form}
    return render(request, 'board_qna/question_detail.html', context)
```

`request.POST.get('content')`는 POST로 전송된 form의 데이터 항목 중 content 값을 읽는다는 뜻이며, `redirect()` 함수를 사용했기 때문에 답변을 생성한 후 질문 상세 화면으로 다시 돌아간다.  

### 3-3. URL 매핑

답변 등록 시 데이터를 전송하기 위해 `board_qna/urls.py` 파일의 `urlpatterns`에 아래 내용과 같이 추가해주자.  

```python
from django.urls import path
from . import views

app_name = 'board_qna'

urlpatterns = [
    path('answer/create/<int:question_id>/', views.answer_create, name='answer_create'),
]
```

### 3-4. 템플릿 생성

`templates/board_qna` 폴더의 `question_detail.html`을 아래 코드와 같이 생성하여 답변을 조회하는 동시에 새로운 답변을 입력할 수 있는 답변 조회 및 입력 템플릿을 만들어주자.  

{% raw %}
```html
{% extends 'base.html' %}
{% block content %}
  <div class="container my-3">
    <!-- question -->
    <h2 class="border-bottom py-2">{{ question.subject }}</h2>
    <div class="card my-3">
      <div class="card-body">
        <div class="card-text" style="white-space: pre-line;">{{ question.content }}</div>
        <div class="d-flex justify-content-end">
          <div class="badge bg-light text-dark p-2 text-start">
            <div class="mb-2">작성자: {{ question.user.username }}</div>
            <div class="mb-2">작성일: {{ question.date_create|date:'Y-m-d H:i:s' }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- answer -->
    <h5 class="border-bottom my-3 py-2">{{ question.answer_set.count }}개의 답변이 있습니다.</h5>
    {% for answer in question.answer_set.all %}
      <div class="card my-3">
        <div class="card-body">
          <div class="card-text" style="white-space: pre-line;">{{ answer.content }}</div>
          <div class="d-flex justify-content-end">
            <div class="badge bg-light text-dark p-2 text-start">
              <div class="mb-2">작성자: {{ answer.user.username }}</div>
              <div class="mb-2">작성일: {{ answer.date_create|date:'Y-m-d H:i:s' }}</div>
            </div>
          </div>
        </div>
      </div>
    {% endfor %}
    <!-- answer create -->
    <form action="{% url 'board_qna:answer_create' question.id %}" method="post" class="my-3">
      {% csrf_token %}
      {% include "form_errors.html" %}
      <div class="mb-3">
        <label for="content" class="form-label">답변 내용</label>
        <textarea name="content" id="content" class="form-control" rows="10"></textarea>
      </div>
      <input type="submit" value="답변 등록" class="btn btn-primary">
    </form>
  </div>
{% endblock %}
```
{% endraw %}

아래와 같은 화면으로 생성된다.  

![django_bootstrap_03](/assets/img/posts/django_bootstrap_03.png)
{:.border-image}

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/starting_django)
- [점프 투 장고: 2-06 데이터 저장](https://wikidocs.net/73236)
- [점프 투 장고: 2-10 폼](https://wikidocs.net/70855)
- [점프 투 장고: 3-01 내비게이션바](https://wikidocs.net/71108)
- [점프 투 장고: 3-04 답변 개수 표시](https://wikidocs.net/71241)
- [점프 투 장고: 3-07 모델 변경](https://wikidocs.net/71306)
- [점프 투 장고: 3-08 글쓴이 표시](https://wikidocs.net/71307)