---
published: true
layout: post

title: '[선형대수] 01. 행렬'
description: >
  스칼라, 벡터 그리고 행렬의 기본 개념
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_01.png
related_posts:
  - _posts/maths/2022-05-19-linear_algebra_02.md

categories:
  - maths
tags:
  - data science
  - linear algebra
  - python
  - numpy
---
* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.  

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 1. 스칼라와 벡터

- 스칼라(scalar)

**크기**만으로 나타낼 수 있는 물리량. 데이터 셋을 구성하는 하나의 구성 원소 또는 숫자. 데이터의 feature에 해당하며, 아래와 같이 영문 소문자로 표기한다.  

$$s = 3$$

스칼라의 계산은 기초 수학의 사칙연산과 같다.  

- 벡터(vector)

**스칼라의 집합**으로 **크기와 방향**을 모두 나타내는 개념으로, 아래와 같이 영문 소문자 볼드체로 표기한다.  

$$\mathbf{v} = \begin{pmatrix}
1 \\
2 \\
3\end{pmatrix}
= \begin{bmatrix}
1 \\
2 \\
3\end{bmatrix}$$

벡터를 구성하는 각 숫자는 공간상의 좌표를 나타내며, 원점에서 해당 좌표로 이어지는 화살표로 나타낼 수 있다.  
벡터는 스칼라를 행 방향으로 나열한 **행 벡터(row vector)**와 열 방향으로 나열한 **열 벡터(column vector)**로 나누어지는데, 벡터는 특별한 언급이 없으면 **기본적으로 열 벡터를 의미**한다.  

## 2. 벡터의 연산

### 덧셈과 뺄셈

벡터의 덧셈과 뺄셈은 동일 위치의 각 원소를 더하고 빼는 것으로, 교환 법칙이 성립하며 두 벡터의 크기가 동일할 때(벡터를 구성하는 스칼라의 개수가 동일할 때)만 연산이 가능하다. `python`으로 구현하면 아래와 같다.  

```python
# addition of vector
def v_add(*a):
    res = [sum(i) for i in zip(*a)]

    return res

# subtraction of vector
def v_sub(a, b):
    res = [i - j for i, j in zip(a, b)]

    return res
```

### 스칼라 곱

벡터의 **스칼라 곱(scalar multiplication)**은 스칼라의 부호가 벡터의 방향을 결정하고, 절대값의 크기가 벡터의 길이에 영향을 미친다. `python`으로 구현하면 아래와 같다.  

```python
# scalar multiplication of vector
def v_smul(s, a):
    res = [s * i for i in a]

    return res
```

### 원소 곱

두 벡터의 각 성분을 곱하는 연산은 **원소 곱** 또는 **아다마르 곱(hadamard product)**이라고 부른다. `python`으로 구현하면 아래와 같다.  

```python
# hadamard product of vector
from functools import reduce

def v_hmul(*a):
    res = [reduce(lambda x, y: x * y, i) for i in zip(*a)]

    return res

# hadamard division of vector
def v_hdiv(a, b):
    res = [i / j for i, j in zip(a, b)]

    return res
```

### numpy 사용

`numpy`를 사용하면 아래와 같이 간단하게 사용할 수 있다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([2, 4, 8])

v_add = a + b
v_sub = a - b
v_smul = 3 * a
v_hmul = a * b
v_hdiv = a / b
```

## 2. 행렬

행렬은 행(row)과 열(column)로 구성되어 있으며, [행 벡터와 열 백터](https://ko.wikipedia.org/wiki/%EB%B2%A1%ED%84%B0_%ED%96%89%EB%A0%AC)([Row and Column Vectors](https://en.wikipedia.org/wiki/Row_and_column_vectors))라고도 부른다. 아래와 같이 표기한다.  

$$A = \begin{pmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
a_{31} & a_{33} \\
\end{pmatrix}
= \begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
a_{31} & a_{33} \\
\end{bmatrix}$$

행렬의 표기에 있어서 $$[]$$와 $$()$$를 모두 사용할 수 있으나, 선형대수학에서는 **치환(permutation)**과의 혼동을 막기 위해 $$[]$$ 표기를 더 많이 사용한다고 한다.  
또한 아래와 같이 벡터 형태의 변수를 나타낼 때에는 일반 괄호를 쓰고 함수를 의미하는 행렬을 나타낼 때에는 대괄호를 씀으로써 항의 의미를 명확히 하는 경우도 있다고 한다.  

$$\begin{pmatrix}
\dot{x}_{1} \\
\dot{x}_{2} \\
\end{pmatrix}
= \begin{bmatrix}
A_{11} & A_{12} \\
A_{21} & A_{22}
\end{bmatrix}
\begin{pmatrix}
x_1 \\
x_2
\end{pmatrix}$$

행렬의 차원은 행렬의 크기를 말하는 것으로, 행의 개수가 $$n$$이고 열의 개수가 $$m$$이면 $$n \times m$$차원 행렬이라고 한다.  

### 기본 행 연산

**기본 행 연산(elementary row operations, ERO)**은 아래와 같다.  

- 한 행에 영이 아닌 상수를 모두 곱한다.
- 두 행을 교환한다.
- 한 행의 배수를 다른 행에 더한다.

## 3. 행렬의 연산

### 덧셈과 뺄셈

행렬의 덧셈과 뺄셈은 벡터의 연산과 마찬가지로, 동일 위치의 각 원소를 더하고 빼면 된다. `python`으로 구현하면 아래와 같다.  

```python
# addition of matrix
def mat_add(*a):
    res = [[sum(j) for j in zip(*i)] for i in zip(*a)]

    return res

# subtraction of matrix
def mat_sub(a, b):
    res = [[j - k for j, k in zip(*i)] for i in zip(a, b)]

    return res
```

### 스칼라 곱

행렬의 **스칼라 곱(scalar multiplication)**은 벡터의 스칼라 곱과 마찬가지로 각 원소에 스칼라를 곱하는 것으로, 행렬을 구성하는 벡터의 길이를 스칼라 곱으로 늘리는 것을 의미한다. `python`으로 구현하면 아래와 같다.  

```python
# scalar multiplication of matrix
def mat_smul(s, a):
    res = [[s * j for j in i] for i in a]

    return res
```

### 원소 곱

두 행렬의 각 성분을 곱하는 연산은 벡터와 마찬가지로 **원소 곱** 또는 **아다마르 곱(hadamard product)**이라고 부른다. `python`으로 구현하면 아래와 같다.  

```python
from functools import reduce

# hadamard product of matrix
def mat_hmul(*a):
    res = [[reduce(lambda x, y: x * y, j) for j in zip(*i)] for i in zip(*a)]

    return res

# hadamard division of matrix
def mat_hdiv(a, b):
    res = [[j / k for j, k in zip(*i)] for i in zip(a, b)]

    return res
```

### 행렬 곱

**행렬 곱(matrix multiplication)**의 결과 행렬은 앞 행렬의 행 벡터와 뒤 행렬의 열 벡터의 곱셈합(SUMPRODUCT of excel)을 원소로 갖기 때문에 교환 법칙이 성립하지 않는다. `python`으로 구현하면 아래와 같다.  

```python
from functools import reduce

# multiplication of matrix
def mat_mul(a, b):
    res = [[sum(a * b for a, b in zip(row_a, col_b)) for col_b in zip(*b)] for row_a in a]

    return res

def mat_mul_all(*a):
    res = reduce(mat_mul, [*a])

    return res
```

### 대각합

**행렬의 대각합(trace)**은 주 대각 원소를 모두 더한 값을 의미하며 $$tr(A)$$로 표기한다.  

$$A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{pmatrix}$$

$$tr(A) = a_{11} + a_{22} + a_{33}$$

`python`으로 구현하면 아래와 같다.  

```python
# trace of matrix
def mat_tr(a):
    res = sum(i[n] for n, i in enumerate([*a]))

    return res
```

### numpy 사용

`numpy`를 사용하면 아래와 같이 간단하게 사용할 수 있다.  

```python
import numpy as np

c = np.array([[1, 2], [3, 4]])
d = np.array([[5, 6], [7, 8]])
e = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

mat_add = c + d
mat_sub = c - d
mat_smul = 3 * c
mat_hmul = c * d == np.multiply(c, d)
mat_hdiv = c / d
mat_mul = c @ d == np.matmul(c, d)
mat_tr = np.trace(e)
```

---
## Reference
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)