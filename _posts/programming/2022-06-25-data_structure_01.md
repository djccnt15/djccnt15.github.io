---
published: true
layout: post

title: '[자료구조] 01. 자료구조의 기초'
description: >
    자료구조의 기본 개념
hide_description: false
image:
    path: /assets/img/posts/data_structure_01.png
related_posts:
    - _posts/programming/2022-06-25-data_structure_01.md

categories:
    - programming
tags:
    - programming
    - data structure
---
* toc
{:toc}

## 자료구조의 기초

[**자료구조(Data Structure)**](https://www.britannica.com/technology/data-structure)란 효율적인 검색(search) 및 검색(retrieve)을 위해 데이터가 저장되는 방식을 말한다.  

컴퓨터공학에서 자료 자체의 형태와 그 자료들에 대한 연산을 정의한 것을 [**추상적 자료형(Abstract Data Type)**](https://en.wikipedia.org/wiki/Abstract_data_type)이라고 하는데, 이 추상적 자료형을 실질적으로 구현한 것을 자료구조라고 한다.  

## 기본적인 자료구조

다양한 자료구조가 있지만, 그 중에서도 다음의 자료구조들이 가장 기본적이라고 한다.

- [배열(Array)](/programming/2022-06-26-data_structure_02/)
    - 가장 기본적인 자료형으로, 자료를 원소로 취급해 나열한 자료구조를 말한다.
    - 생성 시 원소들에게 부여되는 index를 통해 원소들에게 접근 가능하다.
- 스택(Stack)
    - 순서가 보존되는 선형 데이터 구조 유형으로, LIFO(Last In First Out) 메커니즘에 따라 데이터를 처리한다.
- 큐(Queue)
    - 순서가 보존되는 선형 데이터 구조 유형으로, FIFO(First In First Out) 메커니즘에 따라 데이터를 처리한다.
- 연결 리스트(Linked List)
    - 노드(node, 데이터 묶음)를 저장할 때 그 다음 순서의 자료가 있는 위치를 데이터에 포함시키는 방식으로 자료를 저장하는 자료 구조를 말한다.
- 그래프(Graph)
    - 정점(vertex) 사이에 변(edge)이 있는 자료구조로, 일방통행을 나타내는 Directed graph와 양방향 통행을 나타내는 Undirected graph가 있다.
- 트리(Tree)
    - 그래프가 계층적 구조를 가진 형태의 자료구조로, 부모 노드와 자식 노드의 연결 구조로 구현된다.

---
## Reference
- [Encyclopedia Britannica](https://www.britannica.com/technology/data-structure)
- [[Data structure] 개발자라면 꼭 알아야 할 7가지 자료구조](https://velog.io/@jha0402/Data-structure-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-7%EA%B0%80%EC%A7%80-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0#%EB%B0%B0%EC%97%B4-array)
- [[자료구조]1.1 Introductions to Data Structure](https://lizable.github.io/datastructure/Introductions-to-data-structure/)