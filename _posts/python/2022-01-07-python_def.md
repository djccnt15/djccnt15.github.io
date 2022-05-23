---
published: true
layout: post

title: Python의 함수
description: >
  python의 함수에 대한 노트
hide_description: false
image: 
  path: /assets/img/posts/def_func.png
related_posts:
  - _posts/python/2022-01-06-about_PEP.md

categories:
  - python
tags:
  - python
  - function
  - incomplete
---
* toc
{:toc}

❗ 이 글은 미완성입니다.
{:.note title='attention'}

## 1. 입력이 없어도 되는 argument

함수에 입력값이 없어도 되는 argument를 주고 싶을 때는 초기값을 `False`로 지정하면 된다.  

```python
def func(a, b=False):
    return a + b

print(func(1))
```

```powershell
1
```

## 2. *args, **kwargs

`asterisk`를 사용해서 하나의 인자가 여러개의 입력값을 받거나 여러개의 인자가 하나의 집합객체를 각각 입력받는 함수를 만들 수 있다.  
각각 `packing`, `unpacking`이라고 한다.  

## 3. @ 데코레이터

함수를 수식해서 추가기능을 덧붙여주는 함수를 만들고 쉽게 재활용할 수 있다.  

---
## Reference
- [Python Documentation](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)([한글](https://docs.python.org/ko/3/tutorial/controlflow.html#defining-functions))