---
published: true
layout: post

title: 선형대수 01. 행렬
description: >
  선형대수: 스칼라, 벡터 그리고 행렬의 기본 개념
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_01.png
related_posts:
  - _posts/linear_algebra/2022-05-01-linear_algebra_01.md

categories:
  - linear_algebra
tags:
  - linear algebra
  - python
---

* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.

## 1. 스칼라와 벡터

- 스칼라(scalar)

**크기**만으로 나타낼 수 있는 물리량. 데이터 셋을 구성하는 하나의 구성 원소 또는 숫자. 데이터의 feature에 해당하며, 아래와 같이 영문 소문자로 표기한다.  

$$a = 3$$

스칼라의 계산은 기초 수학의 사칙연산과 같다.  

- 벡터(vector)

**스칼라의 집합**으로 **크기와 방향**을 모두 나타내는 개념으로, 수학적으로 아래와 같이 표기한다.  

$$b = \begin{pmatrix}1\\2\\3\\\end{pmatrix}$$

벡터를 구성하는 각 숫자는 공간상의 좌표를 나타내며, 원점에서 해당 좌표로 이어지는 화살표로 나타낼 수 있다.  
벡터는 스칼라를 행 방향으로 나열한 행 벡터(row vector)와 열 방향으로 나열한 열 벡터(column vector)로 나누어지는데, 특별한 언급이 없으면 **벡터는 기본적으로 열 벡터를 의미**한다.  

### 1-1. 벡터의 연산

벡터의 덧셈과 뺄셈은 동일 위치의 각 원소를 더하고 빼는 것으로, 교환 법칙이 성립하며 두 벡터의 크기가 동일할 때(벡터를 구성하는 스칼라의 개수가 동일할 때)만 연산이 가능하다.  
벡터의 스칼라 곱(scalar multiplication)은 스칼라의 부호가 벡터의 방향을 결정하고, 절대값의 크기가 벡터의 길이에 영향을 미친다.  
참고로 두 벡터의 각 성분을 곱하는 연산은 원소 곱 또는 아다마르 곱(Hadamard product)이라고 부른다.  

### 1-2. 파이썬으로 구현

벡터의 연산을 python 코드로 구현하면 아래와 같다.

```python
# addition of vector
def v_add(a, b):
    n = len(a)

    res = []
    for i in range(n):
        val = a[i] + b[i]
        res.append(val)
    return res

# subtraction of vector
def v_sub(a, b):
    n = len(a)

    res = []
    for i in range(n):
        val = a[i] - b[i]
        res.append(val)
    return res

# scalar multiplication of vector
def v_mul_scaler(n, a):
    n = len(a)

    res = []
    for i in range(n):
        val = n * a[i]
        res.append(val)
    return res

# hadamard product of vector
def v_hmul(a, b):
    n = len(a)

    res = []
    for i in range(n):
        val = a[i] * b[i]
        res.append(val)
    return res

# hadamard division of vector
def v_hdiv(a, b):
    n = len(a)

    res = []
    for i in range(n):
        val = a[i] / b[i]
        res.append(val)
    return res
```

### 1-3. numpy 사용

`numpy`를 사용하면 아래와 같이 간단하게 사용할 수 있다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([2, 4, 8])

v_add = a + b
v_sub = a - b
v_mul_scaler = 3 * a
v_hmul = a * b
v_hdiv = a / b
```

## 2. 행렬

행렬은 행(row)와 열(column)로 구성되어 있으며, [행 벡터와 열 백터](https://ko.wikipedia.org/wiki/%EB%B2%A1%ED%84%B0_%ED%96%89%EB%A0%AC)([Row and Column Vectors](https://en.wikipedia.org/wiki/Row_and_column_vectors))라고도 부른다.  
수학적으로는 아래와 같이 표기한다.  

$$A = \begin{pmatrix}1&2\\2&4\\3&8\\\end{pmatrix} = \begin{pmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\\a_{31}&a_{32}\\\end{pmatrix}$$

### 2-1. 행렬의 연산

행렬의 덧셈과 뺄셈은 벡터의 연산과 마찬가지로, 동일 위치의 각 원소를 더하고 빼면 된다.  
행렬의 스칼라 곱은 벡터의 스칼라 곱과 마찬가지로 각 원소에 스칼라를 곱하는 것으로, 행렬을 구성하는 벡터의 길이를 스칼라 곱으로 늘리는 것을 의미한다.  
두 행렬의 각 성분을 곱하는 연산은 벡터와 마찬가지로 원소 곱 또는 아다마르 곱(Hadamard product)이라고 부른다.  

행렬 곱(matrix multiplication)은 앞 행렬의 행 벡터와 뒤 행렬의 열 벡터의 곱셈합(SUMPRODUCT of excel)이며, 따라서 교환 법칙이 성립하지 않는다.  

행렬의 대각합(trace)은 주 대각 원소를 모두 더한 값을 의미하며 $$tr(A)$$로 표기한다.  

$$A = \begin{pmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\\\end{pmatrix}$$  

$$tr(A) = a_{11} + a_{22} + a_{33}$$

### 2-2. 파이썬으로 구현

행렬의 연산을 python으로 구현하면 아래와 같다.  

```python
# addition of matrix
def m_add(a, b):
    n = len(a)
    p = len(a[0])

    res = []
    for i in range(n):
        row = []
        for j in range(p):
            val = a[i][j] + b[i][j]
            row.append(val)
        res.append(row)

    return res

# subtraction of matrix
def m_sub(a, b):
    n = len(a)
    p = len(a[0])

    res = []
    for i in range(n):
        row = []
        for j in range(p):
            val = a[i][j] - b[i][j]
            row.append(val)
        res.append(row)

    return res

# scalar multiplication of matrix
def mat_mul_scaler(b, a):
    n = len(a)
    p = len(a[0])

    res = []
    for i in range(n):
        row = []
        for j in range(p):
            val = b * a[i][j]
            row.append(val)
        res.append(row)

    return res

# hadamard product of matrix
def m_hmul(a, b):
    n = len(a)
    p = len(a[0])

    res = []
    for i in range(n):
        row = []
        for j in range(p):
            val = a[i][j] * b[i][j]
            row.append(val)
        res.append(row)

    return res

# hadamard division of matrix
def m_hdiv(a, b):
    n = len(a)
    p = len(a[0])

    res = []
    for i in range(n):
        row = []
        for j in range(p):
            val = a[i][j] / b[i][j]
            row.append(val)
        res.append(row)

    return res

# multiplication of matrix
def matmul(a, b):
    n = len(a)
    p1 = len(a[0])
    p2 = len(b[0])

    res = []
    for i in range(n):
        row = []
        for j in range(p2):
            val = 0
            for k in range(p1):
                val += a[i][k] * b[k][j]
            row.append(val)
        res.append(row)

    return res

# trace of matrix
def tr(a):
    n = len(a)

    val = 0
    for i in range(n):
        val += a[i][i]

    return val
```

### 2-3. numpy 사용

`numpy`를 사용하면 아래와 같이 간단하게 사용할 수 있다.  

```python
import numpy as np

c = np.array([[1, 2], [3, 4]])
d = np.array([[5, 6], [7, 8]])
e = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

m_add = c + d
m_sub = c - d
mat_mul_scaler = 3 * c
m_hmul = np.multiply(c, d)
m_hdiv = c / d
matmul = np.matmul(c, d)
trace = np.trace(e)
```

---
## Reference
- 교재: [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)
- 저자 블로그: [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)