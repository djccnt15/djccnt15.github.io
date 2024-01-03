---
published: true
layout: post
title: '[Python] 커스텀 에러 사용법'
description: >
    Python Exception 커스텀 방법
categories: [Python]
tags: [python, Exception]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 에러 메세지 커멘트 추가하는 방법

에러에 특정 코멘트가 같이 나오도록 하고 싶을 경우 아래와 같이 원하는 문구를 넣어주면 된다.  

```python
raise Exception('Your own custom error comment')
```
```
Traceback (most recent call last):
  File "C:\projects\python310\note.py", line 9, in <module>
    raise Exception('Your own custom error comment')
Exception: Your own custom error comment
```

참고로 아래와 같이 에러를 문자열로 변환하면 에러 커멘트만 꺼내올 수 있다.  

```python
print(str(Exception('Your own custom error comment')))
```
```
Your own custom error comment
```

## 커스텀 에러 만들기

개발을 하다보면 특정 상황에 대해 에러를 일으켜야 할 경우가 있다. 이 때 아래와 같이 커스텀 에러를 만들어 사용한다면 다양한 상황에 대해 유연하게 대처할 수 있다.  

```python
class CustomError(Exception):
    ...


raise CustomError
```
```
Traceback (most recent call last):
  File "C:\projects\python311\note.py", line 5, in <module>
    raise CustomError
CustomError
```

## 에러의 기본 메세지 커스텀하기

```python
class CustomError(Exception):
    def __init__(
        self,
        api_interface,
        message="%s is not valid API interface",
    ) -> None:
        self.api_interface = api_interface
        self.message = message % api_interface
        super().__init__(self.message)


raise CustomError("ASDF")
```
```
Traceback (most recent call last):
  File "C:\projects\python311\main.py", line 12, in <module>
    raise CustomError("ASDF")
CustomError: ASDF is not valid API interface
```