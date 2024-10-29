---
slug: custom-exception
title: Python 에러 커스텀 방법
date:
    created: 2023-05-28
description: >
    Python Exception 커스텀 방법
categories:
    - Python
tags:
    - python
    - exception
---

Python Exception 커스텀 방법  

<!-- more -->

---

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
class MyException(Exception):
    ...


raise MyException
```
```
Traceback (most recent call last):
  File "C:\projects\python311\note.py", line 5, in <module>
    raise MyException
MyException
```

## 에러의 기본 메세지 커스텀하기

```python
class MyException(Exception):
    def __init__(self, message="custom error") -> None:
        super().__init__(message)


try:
    raise MyException
except MyException as e:
    print(e)
```
```
custom error
```


```python
class MyException(Exception):
    def __init__(
        self,
        api_interface: str | None = None,
        message="%s is not valid API interface",
    ) -> None:
        self.message = message % api_interface
        super().__init__(self.message)


raise MyException("ASDF")
```
```
Traceback (most recent call last):
  File "C:\projects\python311\main.py", line 12, in <module>
    raise MyException("ASDF")
MyException: ASDF is not valid API interface
```
