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

## 스택의 기초

**스택(stack)**은 **LIFO(Last In First Out)** 메커니즘에 따라 데이터를 처리하는 자료 구조로, 개념과 관련된 용어들은 다음과 같다.  

- **bottom**: 자료가 쌓이기 시작하는 가장 아래쪽
- **top**: 연산이 일어나는 가장 윗부분
- **capacity**: 스택의 최대 크기, 크기를 벗어난 자료가 스택에 저장되어 문제가 발생하는 것을 **stack overflow**라고 함
- **stack pointer**: 스택에 저장되어 있는 자료의 개수를 나타내는 정수값

스택이 기본적으로 같는 연산들은 아래와 같다.  

- **push**: 입력연산
- **pop**: 출력연산
- **peek**: 조회연산

## 스택의 구현

스택을 `python`으로 구현하면 아래와 같다.  