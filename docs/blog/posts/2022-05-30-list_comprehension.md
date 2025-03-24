---
slug: list-comprehension
title: List Comprehensions
date:
    created: 2022-05-30
description: >
    Python의 List Comprehensions 이해하기
categories:
    - Python
tags:
    - python
    - list comprehension
---

Python의 List Comprehensions 이해하기  

<!-- more -->

---

## 개요 및 기본 구조

list comprehension을 사용하면 리스트를 간단하게 만들 수 있으며, 리스트를 만드는 속도가 for loop에 비해 빠르다.[^1] 다만 list를 만드는 것이 아니라 연산을 해야할 때는 당연히 for loop이 더 빠르다.  

[^1]: list comprehension의 속도에 대한 자세한 내용은 [정욱재님의 블로그](https://blog.ukjae.io/posts/inspecting-list-comprehension/)를 참고하자.  

list comprehension의 기본 구조는 아래와 같고, 추가 연산을 부여해줄 수도 있다.  

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

[선형대수](../../pages/tags.md/#tag:linear-algebra)를 공부하면서 list comprehension을 많이 사용했는데, 자세한 내용은 [여기](./2022-05-19-linear_algebra_various_matrix.md), [여기](./2022-05-22-linear_algebra_linear_system.md), [여기](./2022-06-06-linear_algebra_orthogonal_qr_decomposition.md)를 참고하자.  

## for + if

list comprehension에 `if` 조건문을 부여하는 방법은 아래와 같다.  

```python
a = [i for i in range(10) if i % 2 == 0]

print(a)
```
```
[0, 2, 4, 6, 8]
```

## if + else + for

list comprehension에 `if else` 조건문을 부여하는 방법은 아래와 같다.  

```python
a = [i if i % 2 == 0 else 1 for i in range(10) ]

print(a)
```
```
[0, 1, 2, 1, 4, 1, 6, 1, 8, 1]
```

## if + elif + else + for

list comprehension에서는 `elif`를 사용할 수 없고, 아래와 같이 `else`와 `if`를 조합해서 사용해야 한다.  

```python
a = [1, 2, 3, 4, 5]
l = ['yes' if v == 1 else 'no' if v == 2 else 'idle' for v in a]

print(l)
```
```
['yes', 'no', 'idle', 'idle', 'idle']
```

## for + for

list comprehension안에 이중 `for`문을 넣는 방법은 아래와 같다. 하위의 `for`문이 뒤로 가는 것을 확인할 수 있다.  

```python
a = [i * j for i in [4, 5, 6] for j in [1, 2, 3]]

print(a)
```
```
[4, 8, 12, 5, 10, 15, 6, 12, 18]
```

## Nested List Comprehensions

list comprehension안에 list comprehension을 넣는 방법은 아래와 같다. 상위의 list comprehension이 뒤로 가는 것을 확인할 수 있다. 다차원 배열을 만들 때 많이 사용된다.  

```python
a = [[i * j for i in [4, 5, 6]] for j in [1, 2, 3]]

print(a)
```
```
[[4, 5, 6], [8, 10, 12], [12, 15, 18]]
```

## 다른 자료형의 Comprehension

`list` 뿐만 아니라 다른 자료형에도 사용 가능하다.  

```python
tuple(i for i in [1, 2, 3])

print(a)
```
```
(1, 2, 3)
```

```python
a = {i * i for i in [1, 1, 2, 3, 3, 4]}

print(a)
```
```
{16, 1, 4, 9}
```

```python
tmp = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}
res = {k: v * 2 for (k, v) in tmp.items()}

print(res)
```
```
{'a': 2, 'b': 4, 'c': 6, 'd': 8, 'e': 10}
```

---
## Reference
- [Python Documentation: List Comprehensions](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)([한글](https://docs.python.org/ko/3/tutorial/datastructures.html#list-comprehensions))
- [List/Dict Comprehension](https://numa2717.tistory.com/287)
- [List Comprehension 문법 정리](https://velog.io/@mttw2820/List-Comprehension-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC)
- [`elif` in list comprehension conditionals](https://stackoverflow.com/questions/9987483/elif-in-list-comprehension-conditionals)
- [List Comprehension이 빠른 이유를 찾아보자](https://jeongukjae.github.io/posts/inspecting-list-comprehension/)
