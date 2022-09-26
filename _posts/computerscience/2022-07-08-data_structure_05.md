---
published: true
layout: post
title: '[자료구조] 05. 연결 리스트'
description: >
  python으로 연결 리스트(Linked List) 구현하기
categories: [ComputerScience]
tags: [data structure]
image:
  path: /assets/img/posts/data_structure_05.png
related_posts:
  - _posts/computerscience/2022-07-03-data_structure_04.md
---
* toc
{:toc}

<h4>Data Structure Series</h4>
<div class="taxonomy__index">
  <ol class="description">
    <li><a href="/computerscience/data_structure_01/">자료구조의 기초</a></li>
    <li><a href="/computerscience/data_structure_02/">배열</a></li>
    <li><a href="/computerscience/data_structure_03/">스택</a></li>
    <li><a href="/computerscience/data_structure_04/">큐, 덱</a></li>
    <li><a href="/computerscience/data_structure_05/">연결 리스트</a></li>
  </ol>
</div>

## 연결 리스트의 개념

**연결 리스트(Linked List)**는 노드(node, 데이터 묶음)를 저장할 때 그 다음 순서의 자료가 있는 위치를 데이터에 포함시키는 방식으로 자료를 저장하는 자료 구조로, 최대 크기가 정해진 [배열](/computerscience/data_structure_02/)의 단점을 해결하기 위해 고안된 자료구조다. 연결 리스트의 개념과 관련된 용어들은 다음과 같다.  

- **node**: 데이터와 다음 데이터를 가리키는 주소(포인터) 묶음
- **pointer**: 각 노드에서 다음 데이터를 가리키는 주소값
- **head node**: 연결 리스트의 시작 노드
- **tail node**: 연결 리스트의 마지막 노드

## 연결 리스트의 구현

`python`으로 연결 리스트를 구현하면 아래와 같다.  

```python
class MyNode:
    def __init__(self, data=None, next=None) -> None:
        self.data = data
        self._next = next


class MyLinkedList:

    def __init__(self, data) -> None:
        self._head = MyNode(data)
        self._no = 0
        self.ptr = None
        if data:
            self._no = 1

    def __len__(self) -> int:
        return self._no

    def __contains__(self, data) -> bool:  # make obj possible to use 'in' operator
        return bool(self.index(data))

    def __iter__(self) -> None:  # make obj iterable
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
        ptr = self._head
        res = []
        while ptr is not None:
            res.append(ptr.data)
            ptr = ptr._next
        return res

    def append(self, data) -> None:
        ptr = self._head
        if ptr.data is None:
            self._head = MyNode(data)
            self._no += 1
        else:
            while ptr._next is not None:
                ptr = ptr._next
            ptr._next = MyNode(data)
            self._no += 1

    def get(self, index:int) -> MyNode:
        ptr = 0
        node = self._head
        while ptr < index:
            ptr += 1
            node = node._next
        return node.data

    def get_node(self, index:int) -> MyNode:
        ptr = 0
        node = self._head
        while ptr < index:
            ptr += 1
            node = node._next
        return node

    def index(self, data):
        ptr = 0
        res = []
        node = self._head
        for _ in range(self._no):
            if node.data == data:
                res.append(ptr)
            node = node._next
            ptr += 1
        return res if bool(res) is True else None

    def insert(self, index:int, data) -> list:
        new_node = MyNode(data)
        if index == 0:
            new_node._next = self._head
            self._head = new_node
        node = self.get_node(index - 1)
        next_node = node._next
        node._next = new_node
        new_node._next = next_node
        self._no += 1
        return self.all()

    def remove(self, index:int) -> list:
        if index == 0:
            self._head = self._head._next
        node = self.get_node(index - 1)
        node._next = node._next._next
        self._no -= 1
        return self.all()

    def replace(self, index:int, data) -> list:
        ptr = 0
        node = self._head
        while ptr <= index:
            if ptr == index:
                node.data = data
            node = node._next
            ptr += 1
        return self.all()
```