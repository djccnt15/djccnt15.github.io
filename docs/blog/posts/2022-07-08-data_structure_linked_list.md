---
slug: data-structure-linked-list
title: '[자료구조] 05. 연결 리스트'
date:
    created: 2022-08-08
description: >
    Python으로 연결 리스트(Linked List) 구현하기
categories:
    - Computer Science
tags:
    - data structure
---

연결 리스트(Linked List)의 개념과 Python으로 구현하기  

<!-- more -->

---

## 연결 리스트의 개념

**연결 리스트(Linked List)**는 노드(node, 데이터 묶음)를 저장할 때 그 다음 순서의 자료가 있는 위치를 데이터에 포함시키는 방식으로 자료를 저장하는 자료구조로, 연결 리스트의 개념과 관련된 용어들은 다음과 같다.  

- **node**: 데이터와 다음 데이터를 가리키는 주소(포인터) 묶음
- **pointer**: 각 노드에서 다음 데이터를 가리키는 주소값
- **head node**: 연결 리스트의 시작 노드
- **tail node**: 연결 리스트의 마지막 노드

- 장점
    - 최대 크기가 정해진 [배열](./2022-06-26-data_structure_array.md)에 비해 최대 크기를 변화시키기 쉽다
    - 데이터가 삭제되면 해당 데이터에 대한 메모리 예약도 없어지기 때문에 메모리 낭비가 적다
- 단점
    - index가 없이 반드시 순차 접근을 해야하기 때문에 처리속도가 비교적 느리다

## 연결 리스트의 구현

Python으로 연결 리스트를 구현하면 아래와 같다.  

```python
class ReprMixin:
    def __repr__(self) -> str:
        attrs = ", ".join(f"{k}={v!r}" for k, v in vars(self).items())
        return f"{self.__class__.__name__}({attrs})"


class Node(ReprMixin):
    def __init__(self, data=None, next=None) -> None:
        self.data = data
        self._next = next


class LinkedList(ReprMixin):

    def __init__(self, data) -> None:
        self._head: Node = Node(data)
        self._no: int = 1 if data else 0
        self.ptr = None

    def __len__(self) -> int:
        return self._no

    def __contains__(self, data) -> bool:  # make obj possible to use 'in' operator
        return bool(self.index(data))

    def __iter__(self):  # make obj iterable
        self.ptr = self._head
        return self

    def __next__(self):  # return obj iterator
        if self.ptr is None:
            raise StopIteration
        else:
            data = self.ptr.data
            self.ptr = self.ptr._next
            return data

    def all(self):
        ptr: Node | None = self._head
        res: list = []
        while ptr is not None:
            res.append(ptr.data)
            ptr: Node | None = ptr._next
        return res

    def append(self, data) -> None:
        ptr: Node = self._head
        if ptr.data is None:
            self._head: Node = Node(data)
            self._no += 1
        else:
            while ptr._next is not None:
                ptr: Node = ptr._next
            ptr._next = Node(data)
            self._no += 1

    def get(self, index: int):
        ptr: int = 0
        node: Node = self._head
        while ptr < index:
            ptr += 1
            node = node._next
        return node.data

    def get_node(self, index: int) -> Node:
        ptr: int = 0
        node: Node = self._head
        while ptr < index:
            ptr += 1
            node = node._next
        return node

    def index(self, data):
        ptr: int = 0
        res: list = []
        node: Node = self._head
        for _ in range(self._no):
            if node.data == data:
                res.append(ptr)
            node = node._next
            ptr += 1
        return res if bool(res) is True else None

    def insert(self, index: int, data) -> list:
        new_node: Node = Node(data)
        if index == 0:
            new_node._next = self._head
            self._head = new_node
        node: Node = self.get_node(index - 1)
        next_node = node._next
        node._next = new_node
        new_node._next = next_node
        self._no += 1
        return self.all()

    def remove(self, index: int) -> list:
        if index == 0:
            self._head = self._head._next
        node: Node = self.get_node(index - 1)
        node._next = node._next._next
        self._no -= 1
        return self.all()

    def replace(self, index: int, data) -> list:
        ptr: int = 0
        node: Node = self._head
        while ptr <= index:
            if ptr == index:
                node.data = data
            node = node._next
            ptr += 1
        return self.all()
```
