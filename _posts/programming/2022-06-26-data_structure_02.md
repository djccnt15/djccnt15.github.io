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

## 배열의 구현

`python`으로 배열을 구현해보았다. 이론적으로는 같은 타입으로만 이루어져야 한다는 제약 조건이라든가, 배열의 크기를 미리 선언해줘야 한다는 점 등이 있지만, 조금 간단히 구현해보았다.  

```python
class my_array:
    'all elements must be same type'

    def __init__(self, *a):
        self.array = [*a]

    def size(self):
        res = 0
        for _ in self.array:
            res += 1

        return res

    def count(self, a):
        res = 0
        for i in self.array:
            if a == i:
                res += 1

        return res

    def index(self, a):
        res = []
        for i, v in enumerate(self.array):
            if v == a:
                res.append(i)

        return res

    def append(self, *a):
        self.array.extend(a)

    def insert(self, idx, a):
        until, after = [], []
        for i, v in enumerate(self.array):
            if i < idx:
                until.append(v)
            else:
                after.append(v)
        self.array = until + [a] + after

        return self.array

    def remove(self, idx):
        del self.array[idx]

        return self.array

    def reverse(self):
        n = len(self.array)
        for i in range(n // 2):
            self.array[i], self.array[n - i - 1] = self.array[n - i - 1], self.array[i]

        return self.array

    def max(self):
        res = self.array[0]
        for i in self.array:
            if i > res:
                res = i

        return res

    def min(self):
        res = self.array[0]
        for i in self.array:
            if i < res:
                res = i

        return res
```

사실 `python`에는 그 자체로 잘 구현된 자료구조인 `list`, `tuple`, `set`, `dictionary` 등이 있어서 굳이 `array`를 구현해서 사용할 필요는 없다.  