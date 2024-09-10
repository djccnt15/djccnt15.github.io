---
slug: how-to-get-every-attributes-of-object
title: Python에서 객체의 모든 속성 확인 방법
date:
    created: 2024-02-02
description: >
    Python에서 `vars` 함수와 `dir` 함수를 사용해서 객체의 모든 속성 확인하는 방법
categories:
    - Python
tags:
    - python
---

Python에서 `vars` 함수와 `dir` 함수를 사용해서 객체의 모든 속성 확인하는 방법  

<!-- more -->

---

## vars 함수

객체의 `__dict__` 속성을 반환한다.  

```python
class MyClass:
    def __init__(self, a, b) -> None:
        self.a = a
        self.b = b


mc = MyClass(1, 2)

print(vars(mc))
print(mc.__dict__)
```
```
{'a': 1, 'b': 2}
{'a': 1, 'b': 2}
```

??? note
    `__dict__` 속성은 Python에서 클래스의 싱글턴 객체인 `object` 클래스에서 정의되어 상속된다.  

## dir 함수

인자가 없을 경우 현재 scope가 갖고 있는 속성의 전체 리스트를 반환하고, 인자가 있을 경우 해당 객체의 유효한 속성을 반환한다.  

```python
class MyClass:
    def __init__(self, a, b) -> None:
        self.a = a
        self.b = b


mc = MyClass(1, 2)

print(dir(MyClass))
print(dir(mc))
```
```
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__']
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'a', 'b']
```

생성된 `mc` 객체의 경우 `'a', 'b'` 요소가 포함되어 출력되는 것을 확인할 수 있다.  

객체에 매직 메서드 `__dir__`이 정의되어 있을 경우 해당 메서드를 호출한다.  

```python
class MyClass:
    def __init__(self, a, b) -> None:
        self.a = a
        self.b = b

    def __dir__(self):  # (1)!
        return [self.a, self.b]


mc = MyClass(1, 2)

print(dir(mc))
```

1. `__dir__` 메서드는 `object` 클래스에서 반드시 `Iterable`을 반환하도록 되어 있으며, 공식 문서에서 모든 속성을 반환하도록 규정되어 있다.  

```
[1, 2]
```

---
## Reference
- [Built-in Functions](https://docs.python.org/3/library/functions.html)
