---
slug: recursion
title: '[재귀함수] 재귀함수'
date:
    created: 2023-04-09
description: >
    부분곱과 팩토리얼 구현으로 알아보는 재귀함수
categories:
    - Computer Science
tags:
    - data structure
---

부분곱과 팩토리얼 구현으로 알아보는 재귀함수

<!-- more -->

---

## 부분곱이란?

$\prod$의 의미는 $\sum$과 유사한데, 아래 수식에서 볼 수 있듯이 주어진 숫자를 모두 곱하라는 뜻이다.  

$$
\prod_{i=1}^{n}x_{i} = (x_{1} \times x_{2} \times \cdots \times x_{i}), \quad x_{i} > 0
$$

Python에서 $\prod$을 구현하는 방법들은 아래와 같다.  

=== "with for loop"

    ```python
    def prod_for(data: list) -> float:
        """product all elements in data with for loop"""

        res = 1
        for i in data:
            res *= i
        return res

    print(prod_for(data))  # 120
    ```

=== "with Recursion"

    ```python
    def prod_rec(data: list) -> float:
        """product all elements in data with recursion"""

        return data[0] if len(data) == 1 else data[0] * prod_rec(data[1:])

    print(prod_rec(data))  # 120
    ```
    
=== "Python Standard Library"

    ```python
    from math import prod

    data = [1, 2, 3, 4, 5]

    print(prod(data))  # 120
    ```

## 재귀함수

**[재귀함수(recursive function)](2023-04-09-recursion.md)**는 아래 함수처럼 함수 내에서 자기 자신을 다시 호출하는 함수를 말한다.  

=== "Production"

    ```python
    def prod_rec(data: list) -> float:
        """product all elements in data with recursion"""

        return data[0] if len(data) == 1 else data[0] * prod_rec(data[1:])
    ```

=== "Factorial"

    ```python
    def factorial_rec(n: int):
        """returns factorial of number"""

        return 1 if n <= 1 else n * factorial_rec(n - 1)
    ```

Python의 최대 재귀 깊이(maximum recursion depth)는 기본적으로 1,000으로 설정되어 있는데, 아래와 같이 확인할 수 있다.  

```python
import sys

print(sys.getrecursionlimit())
```
```
1000
```

Python에서 최대 재귀 깊이를 수정하려면 아래와 같이 설정하면 된다.  

```python
import sys

sys.setrecursionlimit(2000)

print(sys.getrecursionlimit())
```
```
2000
```

위와 같이 최대 재귀 스택 오버플로우로 인한 오류를 해결하기 위해서 [꼬리재귀(tail recursion)](https://en.wikipedia.org/wiki/Tail_call)이라는 것을 사용한다.  

함수의 결과로 호출하는 함수가 자기 자신이고 재귀 호출이 끝난 뒤 추가적인 연산이 필요하지 않다면 꼬리재귀라고 볼 수 있다. 위에서 구현한 팩토리얼 함수를 꼬리재귀 형태로 변형하면 아래와 같다.  

=== "Tail Recursion"

    ```python
    def factorial_rec(n: int, res: int = 1) -> int:
        """returns factorial of number with recursion"""

        return res if n <= 1 else factorial_rec(n - 1, n * res)
    ```

꼬리재귀를 사용하려면 프로그래머가 꼬리재귀 형식으로 프로그래밍을 했는지와 별개로, 해당 언어가 꼬리재귀를 지원해야한다. Python은 꼬리재귀 최적화를 지원하지 않아서 위 함수를 사용해도 스택 오버플로우가 발생한다.  

!!! warning
    Python 실무에서는 recursion을 사용는 것을 지양하자.  

!!! info
    Python에서 꼬리재귀를 지원하는 것에 대해 더 알아보고 싶다면 [여기](https://chrispenner.ca/posts/python-tail-recursion)와 [여기](http://philosophical.one/posts/tail-recursion-in-python/)를 참고하자.  