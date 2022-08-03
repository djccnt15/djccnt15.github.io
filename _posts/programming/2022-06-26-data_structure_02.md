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
    - _posts/programming/2022-07-02-data_structure_03.md

categories:
    - Programming
tags:
    - programming
    - data structure
    - python
---
* toc
{:toc}

<h4>Data Structure Series</h4>
<div class="taxonomy__index">
    <ol class="description">
        <li><a href="/programming/data_structure_01/">자료구조의 기초</a></li>
        <li><a href="/programming/data_structure_02/">배열</a></li>
        <li><a href="/programming/data_structure_03/">스택</a></li>
        <li><a href="/programming/data_structure_04/">큐, 덱</a></li>
        <li><a href="/programming/data_structure_05/">연결 리스트</a></li>
    </ol>
</div>

## 배열의 개념

**배열(array)**은 동일한 형태의 원소들이 연속적으로 배치되어 있으며, index를 이용해서 각 원소들에 임의 접근이 가능한 형태의 자료구조를 말한다.  

## 배열의 구현

`python`으로 배열을 구현하면 아래와 같다. 이론적으로는 같은 타입으로만 이루어져야 한다는 제약 조건이 있지만, `__doc__`으로 처리하고 조금 간단히 구현해보았다.  

```python
class MyArray:
    'all elements must be same type'

    def __init__(self, capacity:int=256) -> None:
        self.array = [None] * capacity
        self._capacity = capacity
        # self._index = 0

    def __contains__(self, val) -> bool:  # make obj possible to use 'in' operator
        return bool(self.index(val))

    def __iter__(self) -> iter:  # make obj iterable
        return iter(self.array)  # return obj iterator

    # def __next__(self):  # alternative way to return obj iterator
    #     if self._index < self._capacity:
    #         idx = self._index
    #         self._index += 1
    #         return self.array[idx]
    #     else:
    #         raise StopIteration

    def __len__(self) -> int:  # make obj countable by len()
        res = 0
        for i in self.array:
            if i != None:
                res += 1
        return res

    def size(self) -> int:
        return self._capacity

    def replace(self, idx:int, val) -> list:
        self.array = [v if i < idx else val if i == idx else v for i, v in enumerate(self.array)]
        return self.array

    def remove(self, idx:int) -> list:
        self.array = [v if i < idx else None if i == idx else v for i, v in enumerate(self.array)]
        return self.array

    def reverse(self) -> list:
        n = len(self.array)
        for i in range(n // 2):
            self.array[i], self.array[n - i - 1] = self.array[n - i - 1], self.array[i]
        return self.array

    def count(self, val) -> int:
        res = 0
        for i in self.array:
            if val == i:
                res += 1
        return res

    def index(self, val) -> int:  # linear search
        res = [i for i, v in enumerate(self.array) if v == val]
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

💡 사실 `python`에는 그 자체로 잘 구현된 자료구조인 `list`, `tuple`, `set`, `dictionary` 등이 있어서 대부분의 경우 굳이 `array`를 직접 구현해서 사용하기 보다는 있는걸 잘 쓰는게 더 좋다.  
{:.note}