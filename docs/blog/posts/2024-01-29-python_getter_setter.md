---
slug: getter-setter
title: Python의 Getter, Setter
date:
    created: 2024-01-29
description: >
    Python에서 캡슐화를 위해 Getter, Setter를 사용하는 방법
categories:
    - Python
tags:
    - OOP
    - object oriented programming
    - encapsulation
    - python
---

Python에서 캡슐화를 위해 Getter, Setter를 사용하는 방법  

<!-- more -->

---

## Getter, Setter?

객체 지향 프로그래밍에서 객체를 **캡슐화(encapsulation)**해서 내부의 요소에 대한 외부의 직접적인 접근을 차단하고자 하는데, 이 때 사용자가 객체의 요소를 다룰 수 있도록 하는 메서드를 Getter와 Setter라고 한다.  

## Python의 Getter, Setter

여러가지 의견이 많긴 한데, 내가 동의하는 Pythonic하게 Getter, Setter를 사용하는 방법은 Getter, Setter를 사용하지 않는 것이다.  

그러나 나는 Getter를 적절히 사용하면 computed attributes를 Getter로 처리하여 객체가 차지하는 메모리를 줄이고 코드를 간결하게 만들 수 있는 장점을 좋아해서 종종 사용한다.  

!!! warning
    `@property` 데코레이터를 사용한 Getter에 과도한 연산을 사용하면 프로그램의 속도 저하의 원인이 된다.  

```python
class MyClass:
    def __init__(self) -> None:
        self.__a = 0

    @property
    def a(self):  # getter
        return self.__a

    @a.setter
    def a(self, v):  # setter
        self.__a = v

    @property
    def b(self):  # computed attribute
        return self.a * 2


mc = MyClass()
mc.a = 1
```

아래와 같이 [name mangling](./2024-01-28-access_modifier.md/#python의-접근제한자)을 통해 private화 된 요소를 호출할 수 있다.  

```python
print(f"{mc.a=}")
```
```
mc.a=1
```

아래와 같이 클래스에서 저장하지 않고 있는 요소를 연산을 통해 반환할 수 있다.  

```python
print(f"{mc.b=}")
```
```
mc.b=2
```

```python
print(f"{vars(mc)=}")
```
```
vars(mc)={'_MyClass__a': 1}
```