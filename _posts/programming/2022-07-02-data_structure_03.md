---
published: true
layout: post

title: '[자료구조] 03. 스택'
description: >
    python으로 스택(Stack) 구현하기
hide_description: false
image:
    path: /assets/img/posts/data_structure_03.png
related_posts:
    - _posts/programming/2022-06-26-data_structure_02.md

categories:
    - programming
tags:
    - programming
    - data structure
    - python
---
* toc
{:toc}

## 스택

**스택(stack)**은 **LIFO(Last In First Out)** 메커니즘에 따라 데이터를 처리하는 자료 구조로, 개념과 관련된 용어들은 다음과 같다.  

- **bottom**: 자료가 쌓이기 시작하는 가장 아래쪽
- **top**: 연산이 일어나는 가장 윗부분
- **capacity**: 스택의 최대 크기, 크기를 벗어난 자료가 스택에 저장되어 문제가 발생하는 것을 **stack overflow**라고 함
- **stack pointer**: 스택에 저장되어 있는 자료의 개수를 나타내는 정수값으로, 스택에서 각종 연산의 기준점이 됨

스택이 기본적으로 갖는 연산들은 아래와 같다.  

- `push`: 입력연산, 스택에 데이터를 추가한다.
- `pop`: 출력연산, 스택에서 데이터를 꺼낸다.
- `peek`: 조회연산, 스택의 `top`에 있는 데이터를 확인한다.

스택을 `python`으로 구현하면 아래와 같다.  

```python
class MyStack:
    'all elements must be same type'

    def __init__(self, capacity:int=256) -> None:
        self.stack = [None] * capacity
        self._capacity = capacity
        self._ptr = 0

    def __len__(self) -> int:  # make obj countable by len()
        return self._ptr

    def size(self) -> int:
        return self._capacity

    def push(self, val) -> list:
        if self._ptr >= self._capacity:
            raise Exception('stack is full')
        self.stack[self._ptr] = val
        self._ptr += 1
        return self.stack

    def is_empty(self) -> bool:
        return self._ptr <= 0

    def pop(self):
        if self.is_empty():
            raise Exception('stack is empty')
        self._ptr -= 1
        return self.stack[self._ptr]

    def peak(self):
        if self.is_empty():
            raise Exception('stack is empty')
        return self.stack[self._ptr - 1]

    def clear(self) -> None:
        self._ptr = 0
```

`python` 내장 모듈 `queue`는 `LifoQueue`라는 이름으로 스택을 지원하고 있다.  

```python
from queue import LifoQueue

stack = LifoQueue()
```

참고로 `python` [튜토리얼](https://docs.python.org/3/tutorial/datastructures.html#using-lists-as-stacks)에서는 `list`를 스택으로 사용하는 법을 알려준다.  