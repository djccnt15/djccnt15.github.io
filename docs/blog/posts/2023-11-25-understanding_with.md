---
slug: understanding-with
title: Python `with` 문법 심화 활용
date:
    created: 2023-11-25
description: >
    `contextmanager`, `yield`를 사용한 `with` 심화 활용
categories:
    - Python
tags:
    - python
    - with
    - contextmanager
    - yield
---

`with` 문법의 기초 이해, `contextmanager`, `yield`를 사용한 `with` 심화 활용  

<!-- more -->

---

## 1. with

Python에서 `with` 문법은 블록이 시작 할 때와 끝날 때 일정한 작업을 해주는 문법으로, 대표적으로 `open` 함수와 조합한 파일 읽고 쓰기에 많이 사용된다.  

`with` 문법의 작동 방식은 호출된 함수가 생성한 객체의 `__enter__`, `__exit__` 메서드를 호출하는 것으로, 파일 IO에 많이 사용하는 `open` 함수가 반환하는 `TextIOWrapper` 객체나 `FileIO` 객체를 보면 아래와 같이 `__enter__` 메서드가 구현되어 있는 것을 확인할 수 있다.  


```python
class TextIOWrapper(TextIOBase, TextIO):  # type: ignore[misc]  # incompatible definitions of write in the base classes
    ...
    def __enter__(self) -> Self: ...
    ...
```

```python
class FileIO(RawIOBase, BinaryIO):  # type: ignore[misc]  # incompatible definitions of writelines in the base classes
    ...
    def __enter__(self) -> Self: ...
    ...
```

## 2. contextmanager

contextlib의 `contextmanager`를 활용하면 `with` 문법을 객체를 생성하지 않고 함수나 코드에 직접 적용할 수 있다.  

`contextmanager`는 데코레이터로, 제너레이터에 사용하면 코드를 클래스화 하고 `__enter__`, `__exit__` 메서드를 구현하는 귀찮은 작업 없이 `with` 문법으로 사용할 수 있게 해준다.  

아래 예시와 같이 `contextmanager` 데코레이터가 적용된 제너레이터를 `with` 문법으로 실행하면,`with` 블럭을 시작할 때 `yield` 위의 코드를 실행하고, `with` 블럭을 종료 할 때 `yield` 아래의 코드를 실행한다.  

```python
import contextlib
import time
from datetime import datetime


@contextlib.contextmanager
def cal_time(msg):
    t0 = datetime.now()
    yield
    t1 = datetime.now()
    print(f"{msg}: {t1 - t0}")


with cal_time("test"):
    time.sleep(1)
```
```
test: 0:00:01.013775
```

```python
import contextlib


@contextlib.contextmanager
def handle_exception(*exceptions):
    try:
        yield
    except exceptions as e:
        print(e)


a = [1, 2]
with handle_exception(IndexError):
    a[3]

print("end")
```
```
list index out of range
end
```

---
## Reference
- [Compound statements](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement)
- [contextlib](https://docs.python.org/3/library/contextlib.html)
