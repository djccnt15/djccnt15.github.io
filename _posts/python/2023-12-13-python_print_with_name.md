---
published: true
layout: post
title: '[Python] 변수를 이름과 함께 출력하기'
description: >
    Python에서 변수의 이름과 값을 한번에 출력하기
categories: [Python]
tags: [python]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 변수의 이름과 값을 한번에 출력하기

개발을 하다보면 변수의 이름과 값을 동시에 출력할 때가 종종 있다.  

Python에서는 아래와 같은 방법으로 쉽게 변수의 이름과 값을 동시에 출력할 수 있다.  

```python
a = 1

print(f'{a=}')
```
```
a=1
```