---
published: true
layout: post

title: '[자료구조] 05. 연결 리스트'
description: >
    python으로 연결 리스트(Linked List) 구현하기
hide_description: false
image:
    path: /assets/img/posts/data_structure_05.png
related_posts:
    - _posts/programming/2022-07-03-data_structure_04.md

categories:
    - programming
tags:
    - programming
    - data structure
    - python
---
* toc
{:toc}

## 연결 리스트의 개념

**연결 리스트(Linked List)**는 노드(node, 데이터 묶음)를 저장할 때 그 다음 순서의 자료가 있는 위치를 데이터에 포함시키는 방식으로 자료를 저장하는 자료 구조로, 최대 크기가 정해진 [배열](/programming/2022-06-26-data_structure_02/)의 단점을 해결하기 위해 고안된 자료구조다. 연결 리스트의 개념과 관련된 용어들은 다음과 같다.  

- **node**: 데이터와 다음 데이터를 가리키는 주소(포인터) 묶음
- **pointer**: 각 노드에서 다음 데이터를 가리키는 주소값
- **head node**: 연결 리스트의 시작 노드
- **tail node**: 연결 리스트의 마지막 노드

## 연결 리스트의 구현

`python`으로 연결 리스트를 구현하면 아래와 같다.  
