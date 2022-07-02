---
published: true
layout: post

title: '[자료구조] 02. 배열'
description: >
    python으로 배열(Array) 구현하기
hide_description: false
image:
    path: /assets/img/posts/data_structure_02.png
related_posts:
    - _posts/programming/2022-06-25-data_structure_01.md

categories:
    - programming
tags:
    - programming
    - data structure
    - python
---
* toc
{:toc}

## 배열의 기초

**배열(array)**은 동일한 형태의 원소들이 연속적으로 배치되어 있으며, index를 이용해서 각 원소들에 임의 접근이 가능한 형태의 자료구조를 말한다.  

## 배열의 구현

`python`으로 배열을 구현하면 아래와 같다. 이론적으로는 같은 타입으로만 이루어져야 한다는 제약 조건이 있지만, `__doc__`으로 처리하고 조금 간단히 구현해보았다.  

```python
class DataStructure:
    'all elements must be same type'

    def __init__(self, n:int):
        self.array = [None] * n
        self._num = n
        # self._index = 0 # alternative way to make obj iterator

    def __len__(self): # make obj countable by len()
        return self._num

    def __contains__(self, a): # make obj possible to use 'in' operator
        return self.count(a)

    def __iter__(self): # make obj iterable
        return iter(self.array) # return obj iterator

    # def __next__(self): # alternative way to make obj iterator
    #     if self._index < self._num:
    #         idx = self._index
    #         self._index += 1
    #         return self.array[idx]
    #     else:
    #         raise StopIteration

    def count(self, a):
        res = 0
        for i in self.array:
            if a == i:
                res += 1
        return res

    def index(self, a): # linear search
        res = [i for i, v in enumerate(self.array) if v == a]
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

class MyArray(DataStructure):
    'all elements must be same type'

    def __init__(self, n:int):
        self.array = [None] * n
        self._num = n

    def replace(self, idx:int, a):
        self.array = [v if i < idx else a if i == idx else v for i, v in enumerate(self.array)]
        return self.array

    def append(self, *a):
        self._num += len(a)
        self.array.extend(a)
        return self.array

    def insert(self, idx:int, *a):
        self._num += len(a)
        until, after = [], []
        for i, v in enumerate(self.array):
            if i < idx:
                until.append(v)
            else:
                after.append(v)
        self.array = until + [*a] + after
        return self.array

    def remove(self, idx:int):
        self._num -= 1
        del self.array[idx]
        return self.array

    def reverse(self):
        n = len(self.array)
        for i in range(n // 2):
            self.array[i], self.array[n - i - 1] = self.array[n - i - 1], self.array[i]
        return self.array
```

💡 사실 `python`에는 그 자체로 잘 구현된 자료구조인 `list`, `tuple`, `set`, `dictionary` 등이 있어서 대부분의 경우 굳이 `array`를 직접 구현해서 사용하기 보다는 있는걸 잘 쓰는게 더 좋다.  
{:.note}