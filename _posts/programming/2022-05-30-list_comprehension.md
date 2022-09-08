---
published: true
layout: post
title: '[Python] list comprehension'
description: >
    List Comprehensions of Python
categories: [Programming]
tags: [python]
image:
    path: /assets/img/posts/python_list_comprehension.png
related_posts:
    - _posts/mathematics/2022-05-19-linear_algebra_02.md
    - _posts/mathematics/2022-05-22-linear_algebra_03.md
---
* toc
{:toc}

## 개요 및 기본 구조

`list comprehension`은 리스트를 만드는 간결한 방법을 제공한다. 특히 반복문 작업에 최적화 되어 있어 속도가 매우 빠르다. `list comprehension`의 속도에 대한 내용은 [정욱재님의 블로그](https://jeongukjae.github.io/posts/inspecting-list-comprehension/)를 참고하자.  

`list comprehension`의 기본 구조는 아래와 같고, 추가 연산을 부여해줄 수도 있다.  

```python
a = [i for i in range(10)]
b = [i * 10 for i in range(10)]

print(a)
print(b)
```
```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
```

[선형대수](/tags#linear%20algebra)를 공부하면서 `list comprehension`을 많이 사용했는데, 자세한 내용은 [여기](/mathematics/linear_algebra_02/), [여기](/mathematics/linear_algebra_03/), [여기](/mathematics/linear_algebra_08/)를 참고하자.  

## for + if

`list comprehension`에 `if` 조건문을 부여하는 방법은 아래와 같다.  

```python
a = [i for i in range(10) if i % 2 == 0]

print(a)
```
```
[0, 2, 4, 6, 8]
```

## if + else + for

`list comprehension`에 `if else` 조건문을 부여하는 방법은 아래와 같다.  

```python
a = [i if i % 2 == 0 else 1 for i in range(10) ]

print(a)
```
```
[0, 1, 2, 1, 4, 1, 6, 1, 8, 1]
```

## if + elif + else + for

`list comprehension`에서는 `elif`를 사용할 수 없고, 아래와 같이 `else`와 `if`를 조합해서 사용해야 한다.  

```python
a = [1, 2, 3, 4, 5]
l = ['yes' if v == 1 else 'no' if v == 2 else 'idle' for v in a]

print(l)
```
```
['yes', 'no', 'idle', 'idle', 'idle']
```

## for + for

`list comprehension`안에 이중 `for`문을 넣는 방법은 아래와 같다. 하위의 `for`문이 뒤로 가는 것을 확인할 수 있다.  

```python
a = [i * j for i in [4, 5, 6] for j in [1, 2, 3]]

print(a)
```
```
[4, 8, 12, 5, 10, 15, 6, 12, 18]
```

## Nested List Comprehensions

`list comprehension`안에 `list comprehension`을 넣는 방법은 아래와 같다. 상위의 `list comprehension`이 뒤로 가는 것을 확인할 수 있다. 다차원 배열을 만들 때 많이 사용된다.  

```python
a = [[i * j for i in [4, 5, 6]] for j in [1, 2, 3]]

print(a)
```
```
[[4, 5, 6], [8, 10, 12], [12, 15, 18]]
```

---
## Reference
- [Python Documentation: List Comprehensions](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)([한글](https://docs.python.org/ko/3/tutorial/datastructures.html#list-comprehensions))
- [List/Dict Comprehension](https://numa2717.tistory.com/287)
- [List Comprehension 문법 정리](https://velog.io/@mttw2820/List-Comprehension-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC)
- [`elif` in list comprehension conditionals](https://stackoverflow.com/questions/9987483/elif-in-list-comprehension-conditionals)
- [List Comprehension이 빠른 이유를 찾아보자](https://jeongukjae.github.io/posts/inspecting-list-comprehension/)