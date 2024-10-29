---
slug: enum-to-data-structure
title: Python Enum 객체의 자료구조화
date:
    created: 2024-03-05
description: >
    Python Enum 객체를 자료구조로 변형하는 방법
categories:
    - Python
tags:
    - enum
    - python
---

개발을 하다보면 종종 Enum으로 다루는 데이터들을 자료구조로 바꿀 일이 있는데 아래와 같은 방법들을 사용해서 쉽게 처리할 수 있다.  

<!-- more -->

---

## 자료구조화 하기

아래와 같이 반복문을 사용해서 Enum 객체를 자료구조로 변환할 수 있다.  

```python
from enum import StrEnum


class BaseStrEnum(StrEnum):

    @classmethod
    def to_list(cls):
        return [v.value for v in cls]

    @classmethod
    def to_dict(cls):
        return {i.name: i.value for i in cls}


class TimeTypeEnum(BaseStrEnum):
    M10 = "10min"
    M30 = "30min"
    H1 = "1hour"


print(TimeTypeEnum.to_list())
print(TimeTypeEnum.to_dict())
```
```
['10min', '30min', '1hour']
{'M10': '10min', 'M30': '30min', 'H1': '1hour'}
```
