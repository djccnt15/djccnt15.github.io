---
slug: data-structure-array
title: '[자료구조] 02. 배열'
date:
    created: 2022-06-26
description: >
    Python으로 배열(Array) 구현하기
categories:
    - Computer Science
tags:
    - data structure
---

배열(Array)의 개념과 Python으로 구현하기  

<!-- more -->

---

## 배열의 개념

**배열(array)**은 동일한 형태의 원소들이 연속적으로 배치되어 있으며, index를 이용해서 각 원소들에 임의 접근이 가능한 형태의 자료구조를 말한다.  

- 장점
    - 배열을 통해 처리할 데이터의 크기가 일정하고, 그 크기를 미리 알 수 있다면 미리 할당된 영역에서 index를 통해 데이터를 처리하기 때문에 처리 속도가 빠르다
- 단점
    - 연속된 메모리 주소에 할당된 데이터가 저장되고 처리되기 때문에 크기가 변하는 연산이 불가능하다
    - 사용하지 않는 공간이 생겨도 메모리는 예약된 상태로 남아있기 때문에 해당 공간이 낭비된 상태로 남아있게 된다

## 배열의 구현

Python으로 배열을 구현하면 아래와 같다.  

```python
from typing import TypeVar, Generic, get_args
from collections.abc import Iterable

X = TypeVar('X')


class Array(Generic[X]):
    """all elements must be same type"""

    def __init__(self, capacity: int = 256) -> None:
        self.array: list = [X] * capacity
        self._capacity: int = capacity
        # self._index = 0

    def __getitem__(self, idx: int) -> X:  # make able to get obj item by indexing
        return self.array[idx]

    def __setitem__(self, idx: int, val: X) -> list:  # make able to set obj item by indexing
        t = get_args(self.__orig_class__)[0]  # type: ignore
        if type(val) != t:
            raise ValueError(f'input type must be {t.__name__}')
        self.array[idx] = val
        return self.array

    def __str__(self) -> str:  # make obj printable by print(), str()
        return str(self.array)

    def __delitem__(self, idx:int) -> list:  # make obj possible to use 'del' statement
        self.array[idx] = X
        return self.array

    def __contains__(self, val) -> bool:  # make obj possible to use 'in' operator
        return bool(self.index(val))

    def __iter__(self) -> Iterable:  # make obj iterable
        return iter(self.array)

    # def __next__(self):  # alternative way to return obj iterator
    #     if self._index < self._capacity:
    #         idx = self._index
    #         self._index += 1
    #         return self.array[idx]
    #     else:
    #         raise StopIteration

    def __len__(self) -> int:  # make obj countable by len()
        res: int = 0
        for i in self.array:
            if i != None:
                res += 1
        return res

    def size(self) -> int:
        return self._capacity

    def replace(self, idx: int, val: X) -> list:
        return self.__setitem__(idx, val)

    def remove(self, idx:int) -> list:
        return self.__delitem__(idx)

    def reverse(self) -> list:
        n: int = len(self.array)
        for i in range(n // 2):
            self.array[i], self.array[n - i - 1] = self.array[n - i - 1], self.array[i]
        return self.array

    def count(self, val) -> int:
        res: int = 0
        for i in self.array:
            if val == i:
                res += 1
        return res

    def index(self, val) -> list | None:  # linear search
        res: list = [i for i, v in enumerate(self.array) if v == val]
        return res if len(res) > 0 else None

    def min(self):
        res = self.array[0]
        for i in self.array:
            if i < res:
                res = i
        return res

    def max(self):
        res = self.array[0]
        for i in self.array:
            if i > res:
                res = i
        return res
```

!!! tip
    사실 Python에는 그 자체로 잘 구현된 자료구조인 `list`, `tuple`, `set`, `dictionary` 등이 있어서 대부분의 경우 굳이 `array`를 직접 구현해서 사용하기 보다는 있는걸 잘 쓰는게 더 좋다.  