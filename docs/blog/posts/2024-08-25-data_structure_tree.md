---
slug: data-structure-tree
title: '[자료구조] 07. 트리'
date:
    created: 2024-08-25
description: >
    Python으로 트리 구현하기
categories:
    - Computer Science
tags:
    - data structure
    - incomplete
---

트리(Tree)의 개념과 Python으로 구현하기  

<!-- more -->

---

## 트리의 개념

트리는 노드(Node)와 브랜치(Branch)를 이용해서, 사이클을 이루지 않도록 구성한 데이터 구조로, 다양한 트리 형태의 데이터 구조 중에 이진 트리(Binary Tree, B-tree)는 탐색(검색) 알고리즘 구현을 위해 많이 사용된다.  

!!! note
    실제로 대부분의 상용 RDB는 B-tree로 구현된 인덱스를 제공하고 있다.  

트리의 개념에서 사용되는 용어들은 다음과 같다.  

- **Node**: 트리에서 데이터를 저장하는 기본 요소
    - 데이터와 다른 연결된 노드에 대한 브랜치 정보 포함함
    - root Node: 트리 최상위에 존재하는 노드
    - parent/child Node: 어떤 노드의 상/하위 노드
    - leaf/terminal Node: Child 노드가 없는 노드
    - sibling/brother Node: 동일한 Parent 노드를 가진 노드
- **level**: 브랜치로 연결된 노드의 깊이를 나타냄. 최상위 노드가 0
    - depth: 트리에서 노드가 가질 수 있는 최대 깊이

주요 트리의 종류는 아래와 같다.  

- 이진 트리(Binary Tree, B-tree)
    - 노드의 최대 브랜치가 2인 트리
- 이진 탐색 트리(Binary Search Tree, BST)
    - 왼쪽 노드는 상위 노드보다 작은 값, 오른쪽 노드는 상위 노드보다 큰 값이라는 조건이 추가된 이진 트리

!!! note
    이진 탐색 트리는 탐색 속도가 매우 빠르기 때문에 데이터 검색(탐색) 기능을 구현하는데 많이 사용된다.  

### 트리의 시간 복잡도

이진 탐색 트리는 실행 시 한 level을 내려갈 때마다 실행이 필요할 수도 있는 연산의 50%를 배제하여 실행 시간을 50%씩 단축시킬 수 있다.  

$n$개의 노드를 가질 때 $depth = log_{2}n$에 근사하므로 평균적인 시간 복잡도는 $O(log_{2}n)$이 된다.  
  
!!! warning
    이진 탐색 트리의 평균적인 시간 복잡도는 $O(log_{2}n)$이지만 링크드 리스트와 동일한 모양으로 형성된 최악의 경우 $O(n)$의 시간 복잡도를 갖는다.  

## 트리의 구현

이진 탐색 트리를 Python으로 구현하면 아래와 같다.  

!!! failure "Incomplete"
    `delete` 메서드 버그 수정 필요

```python
class ReprMixin:
    def __repr__(self) -> str:
        attrs = ", ".join(f"{k}={v!r}" for k, v in vars(self).items())
        return f"{self.__class__.__name__}({attrs})"


class Node(ReprMixin):
    def __init__(self, value) -> None:
        self.value = value
        self._left: Node = None
        self._right: Node = None


class Tree(ReprMixin):
    def __init__(self, value) -> None:
        self.head = Node(value=value)

    def insert(self, value) -> None:
        ptr = self.head
        while True:
            if value < ptr.value:
                if ptr._left is not None:
                    ptr = ptr._left
                    continue
                else:
                    ptr._left = Node(value=value)
                    break
            elif value > ptr.value:
                if ptr._right is not None:
                    ptr = ptr._right
                    continue
                else:
                    ptr._right = Node(value=value)
                    break
            break

    def search(self, value) -> bool:
        ptr = self.head
        while ptr:
            if ptr.value == value:
                return True
            elif value < ptr.value:
                ptr = ptr._left
            else:
                ptr = ptr._right
        return False

    def delete(self, value) -> bool:
        is_exist = self.search(value=value)
        if not is_exist:
            return False

        ptr = self.head
        parent = self.head
        while ptr:
            if ptr.value == value:
                break
            elif value < ptr.value:
                parent = ptr
                ptr = ptr._left
            else:
                parent = ptr
                ptr = ptr._right

        # case 1. 리프 노드 삭제
        # 삭제할 노드의 부모 노드가 삭제할 노드를 가리키지 않도록 함
        if not ptr._left and not ptr._right:
            if value == parent.value:
                parent._left = None
            else:
                parent._right = None

        # case 2. 자식 노드가 하나인 노드 삭제
        # 삭제할 노드의 부모 노드가 삭제할 노드의 자식 노드를 가리키도록 함
        elif ptr._left and not ptr._right:
            if value < parent.value:
                parent._left = ptr._left
            else:
                parent._right = ptr._left
        elif not ptr._left and ptr._right:
            if value < parent.value:
                parent._left = ptr._right
            else:
                parent._right = ptr._right

        # case 3. 자식 노드가 두 개인 노드 삭제
        # 삭제할 노드의 오른쪽 자식 중 가장 작은 값이 삭제할 노드를 대체(구현된 방식)
        # 삭제할 노드의 왼쪽 자식 중 가장 큰 값이 삭제할 노드를 대체

        # 삭제할 노드의 부모 노드의 왼쪽 노드로 대체할 노드 할당
        # 대체할 노드의 왼쪽 노드에 삭제할 노드의 왼쪽 노드 할당
        # 대체할 노드의 오른쪽 노드가 존재할 경우 대체할 노드의 부모 노드의 왼쪽 노드로 할당

        elif ptr._left and ptr._right:
            # case 3-1. 삭제할 노드의 자식 노드가 두 개이고, 삭제할 노드가 부모 노드의 왼쪽 노드일 때
            if value < parent.value:
                target_node = ptr._right
                target_parent = ptr._right
                # 3-1-1. 삭제할 노드의 오른쪽 자식 중 가장 작은 값을 가진 노드의 자식 노드가 없을 때
                while ptr._left:
                    target_parent = target_node
                    target_node = target_node._left
                # 3-1-2. 삭제할 노드의 오른쪽 자식 중 가장 작은 값을 가진 노드가 오른쪽 노드를 갖고 있을 때
                if target_node._right:
                    target_parent._left = target_node._right
                else:
                    target_parent._left = None
                parent._left = target_node
                target_node._right = ptr._right
                target_node._left = ptr._left

            # case 3-2. 삭제할 노드의 자식 노드가 두 개이고, 삭제할 노드가 부모 노드의 오른쪽 노드일 때
            else:
                target_node = ptr._right
                target_parent = ptr._right
                # 3-2-1. 삭제할 노드의 오른쪽 자식 중 가장 작은 값을 가진 노드의 자식 노드가 없을 때
                while ptr._left:
                    target_parent = target_node
                    target_node = target_node._left
                # 3-2-2. 삭제할 노드의 오른쪽 자식 중 가장 작은 값을 가진 노드가 오른쪽 노드를 갖고 있을 때
                if target_node._right:
                    target_parent._left = target_node._right
                else:
                    target_parent._left = None
                parent._right = target_node
                target_node._right = ptr._right
                target_node._left = ptr._left
        return True
```