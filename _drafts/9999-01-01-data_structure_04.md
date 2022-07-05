---
published: true
layout: post

title: '[자료구조] 04. 큐, 덱'
description: >
    python으로 큐(Queue), 덱(Deque) 구현하기
hide_description: false
image:
    path: /assets/img/posts/data_structure_04.png
related_posts:
    - _posts/programming/2022-07-02-data_structure_03.md

categories:
    - programming
tags:
    - programming
    - data structure
    - python
---
* toc
{:toc}

## 큐

**큐(Queue)**는 FIFO(First In First Out) 메커니즘에 따라 데이터를 처리하는 자료 구조로, 개념과 관련된 용어들은 다음과 같다.  

- **front**: 데이터를 꺼내는 쪽
- **rear**: 데이터를 넣는 쪽

큐가 기본적으로 갖는 연산들은 아래와 같다.  

- `enqueue`: 큐에 데이터를 넣는다.
- `dequeue`: 큐에서 데이터를 꺼낸다.

`python`으로 큐를 구현할 때, `list.pop(0)`을 사용하면 FIFO 방식의 `dequeue`처럼 작동하기는 하는데, 이러면 매 연산마다 모든 객체에 index를 새로 부여하느라 O(n)의 시간 복잡도가 생긴다.  

**원형 버퍼(Ring Buffer)**는 고정 크기의 큐를 마치 양 끝이 연결된 것처럼 사용할 수 있는 자료 구조를 말하는데, index로 인한 시간 복잡도를 해결하기 위해서는 원형 버퍼를 사용하면 된다.  

위 내용들을 고려하면서 `python`으로 큐를 구현하면 아래와 같다.  

```python
class MyQeueu:
    'all elements must be same type'

    def __init__(self, capacity:int=256) -> None:
        self.queue = [None] * capacity
        self._capacity = capacity
        self._front = 0
        self._rear = 0
        self._no = 0

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
            self._front = 0
        return val

    def peak(self):
        if self.is_empty():
            raise Exception('queue is empty')
        return self.queue[self._front]

    def index(self, val) -> list:
        res = []
        for i in range(self._no):
            idx = (i + self._front) % self._capacity
            if self.queue[idx] == val:
                res.append(idx)
        return res if len(res) > 0 else None

    def count(self, val) -> int:
        res = self.index(val)
        return 0 if res == None else len(res)

    def clear(self) -> None:
        self._front = self._rear = self._no = 0
```

`python` 내장 모듈 `queue`는 아래와 같이 큐를 지원하고 있다.

```python
from queue import Queue

queue = Queue()
```

## 덱

**덱(Deque, Double-ended queue)**이란 양 끝에서 `enqueue`와 `dequeue`가 모두 가능한 형태의 자료 구조를 말한다.  

`python`으로 구현하면 아래와 같다.

`python` 내장 모듈 `queue`는 아래와 같이 덱을 지원하고 있다.

```python
from collections import deque

deque = deque()
```