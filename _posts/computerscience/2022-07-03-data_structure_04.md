---
published: true
layout: post
title: '[자료구조] 04. 큐, 덱'
description: >
    python으로 큐(Queue), 덱(Deque) 구현하기
categories: [ComputerScience]
tags: [data structure]
image:
    path: /assets/img/posts/thumbnail_data_structure_04.png
related_posts:
    - _posts/computerscience/2022-07-02-data_structure_03.md
    - _posts/computerscience/2022-07-08-data_structure_05.md
---
* toc
{:toc}

{% include series_datastructure.html %}

## 큐의 개념

**큐(Queue)**는 FIFO(First In First Out) 메커니즘에 따라 데이터를 처리하는 자료구조로, 개념과 관련된 용어들은 다음과 같다.  

- **front**: 데이터를 꺼내는 쪽
- **rear**: 데이터를 넣는 쪽

큐가 기본적으로 갖는 연산들은 아래와 같다.  

- `enqueue`: 큐에 데이터를 넣는다.
- `dequeue`: 큐에서 데이터를 꺼낸다.

Python으로 큐를 구현할 때, `list.pop(0)`을 사용하면 FIFO 방식의 `dequeue`처럼 작동하기는 하는데, 이러면 매 연산마다 모든 객체에 index를 새로 부여하느라 O(n)의 시간 복잡도가 생긴다.  

**원형 버퍼(Ring Buffer)**는 고정 크기의 큐를 마치 양 끝이 연결된 것처럼 사용할 수 있는 자료구조를 말하는데, index로 인한 시간 복잡도를 해결하기 위해서는 원형 버퍼를 사용하면 된다.  

## 큐의 구현

위 내용들을 고려하면서 Python으로 큐를 구현하면 아래와 같다.  

```python
class MyQeueu:
    """all elements must be same type"""

    def __init__(self, capacity: int = 256) -> None:
        self.queue: list = [None] * capacity
        self._capacity: int = capacity
        self._front: int = 0
        self._rear: int = 0
        self._no: int = 0

    def __contains__(self, val) -> bool:  # make obj possible to use 'in' operator
        return bool(self.index(val))

    def __len__(self) -> int:  # make obj countable by len()
        return self._no

    def is_empty(self) -> bool:
        return self._no <= 0

    def is_full(self) -> bool:
        return self._no >= self._capacity

    def size(self) -> int:
        return self._capacity

    def enque(self, val) -> list:
        if self.is_full():
            raise Exception('queue is full')
        self.queue[self._rear] = val
        self._rear += 1
        self._no += 1
        if self._rear == self._capacity:
            self._rear = 0
        return self.queue

    def deque(self):
        if self.is_empty():
            raise Exception('queue is empty')
        val = self.queue[self._front]
        self._front += 1
        self._no -= 1
        if self._front == self._capacity:
            self._front: int = 0
        return val

    def peak(self):
        if self.is_empty():
            raise Exception('queue is empty')
        return self.queue[self._front]

    def index(self, val) -> list | None:
        res: list = []
        for i in range(self._no):
            idx: int = (i + self._front) % self._capacity
            if self.queue[idx] == val:
                res.append(idx)
        return res if len(res) > 0 else None

    def count(self, val) -> int:
        res: list | None = self.index(val)
        return 0 if res == None else len(res)

    def clear(self) -> None:
        self._front = self._rear = self._no = 0
```

Python 내장 모듈 `queue`는 아래와 같이 큐를 지원하고 있다.

```python
from queue import Queue

queue = Queue()
```

## 덱의 개념

**덱(Deque, Double-ended queue)**이란 양 끝에서 `enqueue`와 `dequeue`가 모두 가능한 형태의 자료구조를 말한다.  

Python 내장 모듈 `queue`는 아래와 같이 덱을 지원하고 있다.

```python
from collections import deque

deque = deque()
```