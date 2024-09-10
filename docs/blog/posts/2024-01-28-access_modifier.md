---
slug: access-modifier
title: 접근제한자
date:
    created: 2024-01-28
description: >
    자바와 파이썬의 접근제한자 정리
categories:
    - SW Engineering
tags:
    - access modifier
    - java
    - python
---

클래스 내부의 요소를 다른 클래스나 메서드가 접근하지 못하도록 제한해주는 문법을 **접근제한자**라고 한다.  

<!-- more -->

---

## Java의 접근제한자

자바의 접근제한자는 아래와 같이 4 종류가 있다.  

- **`public`**
    - 모든 패키지에서 접근가능
- **`private`**
    - 모든 패키지에서 접근불가(자기 자신만 접근 가능)
- `protected`
    - 상속관계일 때 하위클래스에서 상위클래스 접근가능
- `default`[^1]
    - 동일한 패키지에서만 접근가능

[^1]: 미선언 시  

## Python의 접근제한자

파이썬의 경우 별도의 접근제한자가 없지만, 아래와 같이 `_`, `__`를 속성의 앞에 표기해서 클래스 내부의 요소에 대한 접근을 제한할 수 있다.  

- `_`: protected에 해당하나 규약일 뿐이지 강제는 아님
- `__`: private에 해당하며 [name mangling](https://www.geeksforgeeks.org/name-mangling-in-python/)을 통해 해당 요소를 호출하기 어렵게 함

```python
class MyClass:
    def __init__(self, a, b) -> None:
        self._a = a
        self.__b = b

    def _protected(self):
        return self._a

    def __private(self):
        return self.__b


mc = MyClass("a", "b")
print(dir(mc))
```
```
['_MyClass__b', '_MyClass__private', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_a', '_protected']
```

```python
print(f"{mc._protected()=}")
```
```
mc._protected()='a'
```

```python
print(f"{mc.__private()=}")
```
```
Traceback (most recent call last):
  File "C:\projects\python311\main.py", line 40, in <module>
    print(f"{mc.__private()=}")
             ^^^^^^^^^^^^
AttributeError: 'MyClass' object has no attribute '__private'
```
