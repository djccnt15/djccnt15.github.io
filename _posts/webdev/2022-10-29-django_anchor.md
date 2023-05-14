---
published: true
layout: post
title: '[Django] 11. 앵커'
description: >
    HTML 앵커 추가하기
categories: [WebDev]
tags: [Django]
image:
    path: /assets/img/posts/thumbnail_django.png
related_posts:
    - _posts/webdev/2022-10-22-django_vote.md
---
{% include series_django.html %}
* toc
{:toc}

## 1. 템플릿 수정

HTML에서 [내부 링크](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#linking_to_an_element_on_the_same_page)를 만들려면, 내부 링크를 만들고 싶은 위치에 `id` 옵션이 있는 `<a>` 태그를 이용하면 된다.  

여기서는 각 답변 별 내부 링크를 만들려고 하니 답변 목록을 만들어주는 템플릿 반복문의 시작 위치에 아래 코드를 넣어주자.  

{% raw %}
```html
<a id="answer_{{ answer.id }}"></a>
```
{% endraw %}

## 2. view 수정

답변과 관련된 view들을 수정하여 view를 호출하면 내부 링크를 반환하도록 아래와 같이 수정해야한다.  

```python
from django.shortcuts import render, get_object_or_404, redirect, resolve_url
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
            question_url = resolve_url('board_qna:detail', question_id=question.id)  # type: ignore
            return redirect(f'{question_url}#answer_{answer.id}')
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
            question_url = resolve_url('board_qna:detail', question_id=answer.question.id)
            return redirect(f'{question_url}#answer_{answer.id}')
    else:
        form = AnswerForm(instance=answer)
    context = {'answer': answer, 'form': form}
    return render(request, 'board_qna/answer_form.html', context)


@login_required()
def answer_vote(request, answer_id):
    answer = get_object_or_404(Answer, pk=answer_id)
    if request.user == answer.user:
        messages.error(request, '본인이 작성한 글은 추천할 수 없습니다')
    else:
        answer.voter.add(request.user)
    question_url = resolve_url('board_qna:detail', question_id=answer.question.id)  # type: ignore
    return redirect(f'{question_url}#answer_{answer.id}')  # type: ignore
```

수정된 코드의 핵심은 아래 라인으로, `resolve_url` 함수는 `reverse` 함수를 래핑하는 함수다.  

`question_url = resolve_url('board_qna:detail', question_id=answer.question.id)`

[공식 문서](https://docs.djangoproject.com/en/4.1/ref/urlresolvers/#reverse)를 보면 `reverse` 함수는 전달 받은 인수에 해당하는 URL을 반환하는 함수로, 이런 API를 통해서 URL을 부여하면 URL이 변경되더라도 자동으로 추적하기 때문에 버그가 적고 유지보수가 용이하다.  

---
## Reference
- [전체 실습 코드](https://github.com/djccnt15/study_django)
- [점프 투 장고: 3-12 앵커](https://wikidocs.net/71792)