---
slug: enum-tips
title: Python의 Enum
date:
    created: 2024-03-05
description: >
    Python Enum 관련 팁 모음
categories:
    - Python
tags:
    - python
    - enum
---

Python Enum 관련 팁 모음  

<!-- more -->

---

## 자료구조화

개발을 하다보면 종종 `Enum`으로 다루는 데이터들을 자료구조로 바꿀 일이 있는데 아래와 같은 방법들을 사용해서 쉽게 처리할 수 있다.  

```python
from enum import Enum, StrEnum


class EnumMixin(Enum):

    @classmethod
    def to_list(cls):
        return [v.value for v in cls]

    @classmethod
    def to_dict(cls):
        return {i.name: i.value for i in cls}


class TimeTypeEnum(EnumMixin, StrEnum):
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

## Field가 여러 개인 Enum

실무에서는 각각의 Enum 객체가 둘 이상의 속성을 가지고 있는 경우가 많다. 아래와 같이 `__init__`을 통해 각 속성의 이름을 정해줄 수 있다.  

```python
from enum import Enum


class Planet(Enum):
    MERCURY = (3.303e23, 2.4397e6)
    VENUS = (4.869e24, 6.0518e6)
    EARTH = (5.976e24, 6.37814e6)
    MARS = (6.421e23, 3.3972e6)
    JUPITER = (1.9e27, 7.1492e7)
    SATURN = (5.688e26, 6.0268e7)
    URANUS = (8.686e25, 2.5559e7)
    NEPTUNE = (1.024e26, 2.4746e7)

    def __init__(self, mass, radius):
        self.mass = mass  # in kilograms
        self.radius = radius  # in meters

    @property
    def surface_gravity(self):
        # universal gravitational constant  (m3 kg-1 s-2)
        G = 6.67300e-11
        return G * self.mass / (self.radius * self.radius)


print(f"{Planet.EARTH.mass=}")
print(f"{Planet.EARTH.surface_gravity=}")
```
```
Planet.EARTH.mass=5.976e+24
Planet.EARTH.surface_gravity=9.802652743337129
```

---
## Reference
- [Python - Enum HOWTO](https://docs.python.org/3.13/howto/enum.html)
