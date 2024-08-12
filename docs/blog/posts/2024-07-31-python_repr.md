---
slug: class-representation
title: Python repr 활용법
date:
    created: 2024-07-31
description: >
    class의 representation을 쉽게 만드는 방법
categories:
    - Python
tags:
    - python
---

class의 representation을 쉽게 만드는 방법  

<!-- more -->

---

## str, repr 함수의 차이

두 함수 모두 객체를 `str` 형태로 변환하여 반환한다는 점은 동일하지만, 세부적인 부분에서 차이가 있다.  

`str` 함수는 프로그램 사용자를 위한 문자열을 반환하기 때문에 일반 사용자가 보기 쉬운 형식으로 반환하지만, `repr` 함수는 개발자를 위한 문자열을 반환하기 때문에 `eval` 함수에 넣어졌을 때 동일한 객체를 생성할 수 있는 문자열을 반환한다.  

이 차이는 `datetime` 객체를 `str` 함수와 `repr` 함수에 넣어보면 확실하게 확인할 수 있다.  

```python
from datetime import datetime

now = datetime.now().replace(microsecond=0)

print(now)
print(repr(now))
```
```
2024-07-31 00:06:59
datetime.datetime(2024, 7, 31, 0, 6, 59)
```

## repr 메서드 쉽게 만들기

개발을 하다보면 class 직접 만들 일이 종종 있는데, 아래와 같이 `ReprMixin` class를 만들고 상속을 통해 사용하면 쉽게 repr 메서드를 만들 수 있다.  

```python
class ReprMixin:
    def __repr__(self) -> str:
        attrs = ", ".join(f"{k}={v!r}" for k, v in vars(self).items())
        return f"{self.__class__.__name__}({attrs})"
```

```python
class Test(ReprMixin):
    def __init__(self, a) -> None:
        self.a = a


t = Test(3)

print(t)
```
```
Test(a=3)
```