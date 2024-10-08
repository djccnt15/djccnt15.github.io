---
slug: linear-algebra-vector-scalar
title: '[선형대수] 01. 선형대수의 기초'
date:
    created: 2022-05-01
description: >
    스칼라, 벡터, 행렬, 텐서의 기본 개념
categories:
    - Mathematics
tags:
    - linear algebra
---

선형대수의 기초. 스칼라, 벡터, 행렬, 텐서의 기본 개념  

<!-- more -->

---

## 0. 선형이란

**선형(linear)**이란 일차식이나 일차함수와 같이 그래프가 **직선(line)**으로 나타나는 관계를 다룬다는 뜻이다.

## 1. 스칼라와 벡터

- 스칼라(scalar)

**크기(magnitude)**만으로 나타낼 수 있는 물리량. 데이터 셋을 구성하는 하나의 구성 원소 또는 숫자. 데이터의 feature에 해당하며, 아래와 같이 영문 소문자로 표기한다.  

$$
s = 3
$$

스칼라의 계산은 기초 수학의 사칙연산과 같다.  

- 벡터(vector)

**스칼라의 집합**으로 **크기(magnitude)와 방향(direction)**을 모두 나타내는 개념으로, 아래와 같이 영문 소문자 볼드체로 표기한다.  

$$
\textbf{v} = \begin{pmatrix}
1 \\
2 \\
3\end{pmatrix}
= \begin{bmatrix}
1 \\
2 \\
3\end{bmatrix}
$$

벡터를 구성하는 각 숫자는 공간상의 좌표를 나타내며, **시점(initial point)**에서 해당 좌표인 **종점(terminal point)**으로 이어지는 화살표로 나타낼 수 있다. 벡터는 스칼라를 행 방향으로 나열한 **행 벡터(row vector)**와 열 방향으로 나열한 **열 벡터(column vector)**로 나누어지는데, 특별한 언급이 없으면 **기본적으로 열 벡터를 의미**한다. 두 벡터가 놓인 위치에 상관 없이 크기와 방향이 같으면 같은 벡터, 또는 **동등 벡터(equivalent vector)**라고 한다.  

## 2. 벡터의 연산

### 덧셈과 뺄셈

두 벡터의 합 $\textbf{u} + \textbf{v}$는 $\textbf{u}$의 종점에 $\textbf{v}$의 시점을 일치시켰을 때, $\textbf{u}$의 시점을 시점으로, $\textbf{v}$의 종점을 종점으로 하는 벡터를 뜻하고, 두 백터의 차 $\textbf{u} - \textbf{v}$는 $\textbf{u}$의 시점에 $\textbf{v}$의 시점을 일치시켰을 때, $\textbf{v}$의 종점을 시점으로, $\textbf{u}$의 종점을 종점으로 하는 벡터를 뜻한다.  

![Vector_Addition](./img/Vector_Addition.png){ loading=lazy width="50%" }  
^[출처: wikimedia - Vector_Addition.png](https://commons.wikimedia.org/wiki/File:Vector_Addition.png)^

벡터의 덧셈과 뺄셈은 동일 위치의 각 원소를 더하고 빼는 것으로, 교환 법칙이 성립하며 두 벡터의 크기가 동일할 때(벡터를 구성하는 스칼라의 개수가 동일할 때)만 연산이 가능하다. Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]


    def v_add(*a: vector) -> vector:
        """returns addition of 2 vectors"""

        return [sum(v) for v in zip(*a)]


    def v_sub(a: vector, b: vector) -> vector:
        """returns subtraction of 2 vectors"""

        return [v - u for v, u in zip(a, b)]
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([1, 2, 3])
    b = np.array([2, 4, 8])

    v_add = a + b
    v_sub = a - b
    ```

### 스칼라 곱

벡터의 **스칼라 곱(scalar multiplication)**은 곱해진 스칼라의 부호로 벡터의 방향을 결정하고, 절대값의 만큼 벡터의 길이를 곱해주는 것이다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]


    def v_smul(s: scalar, a: vector) -> vector:
        """returns scalar multiplication of vector"""

        return [s * v for v in a]
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([1, 2, 3])
    b = np.array([2, 4, 8])

    v_smul = 3 * a
    ```

### 원소 곱

두 벡터의 각 성분을 곱하는 연산은 **원소 곱** 또는 **아다마르 곱(hadamard product)**이라고 부르고 아래와 같이 표기한다.  

$$
\textbf{u} \odot \textbf{v}
$$

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]


    def production(data: vector) -> float:
        """product all elements in data with for loop"""

        res = 1
        for i in data:
            res *= i
        return res


    def v_hmul(*a: vector) -> vector:
        """returns hadamard product of vectors"""

        return [production(v) for v in zip(*a)]  # type: ignore


    def v_hdiv(a: vector, b: vector) -> vector:
        """returns hadamard division of 2 vectors"""

        return [v / u for v, u in zip(a, b)]
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([1, 2, 3])
    b = np.array([2, 4, 8])

    v_hmul = a * b
    v_hdiv = a / b
    ```

## 2. 행렬

행렬은 행(row)과 열(column)로 구성되어 있으며, [행 벡터와 열 백터](https://ko.wikipedia.org/wiki/%EB%B2%A1%ED%84%B0_%ED%96%89%EB%A0%AC)([Row and Column Vectors](https://en.wikipedia.org/wiki/Row_and_column_vectors))라고도 부른다. $m \times n$ 행렬을 아래와 같이 표기한다. 이때 $m \times n$를 **행렬의 모양(shape of a matrix)** 또는 **행렬의 크기(size of a matrix)**라고 부른다.

$$
\begin{align*}
A & = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \vdots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix} \\
\\
& = [a_{ij}]_{m \times n}
\end{align*}
$$

행렬의 표기에 있어서 $[]$와 $()$를 모두 사용할 수 있으나, 선형대수학에서는 **치환(permutation)**과의 혼동을 막기 위해 $[]$ 표기를 더 많이 사용한다고 한다.  
또한 아래와 같이 벡터 형태의 변수를 나타낼 때에는 일반 괄호를 쓰고 함수를 의미하는 행렬을 나타낼 때에는 대괄호를 씀으로써 항의 의미를 명확히 하는 경우도 있다고 한다.  

$$
\begin{pmatrix}
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
\end{pmatrix}
$$

행렬의 차원은 행렬의 크기를 말하는 것으로, 행의 개수가 $n$이고 열의 개수가 $m$이면 $n \times m$차원 행렬이라고 한다.  

### 기본 행 연산

행렬의 **기본 행 연산(elementary row operations, ERO)**은 아래의 연산들을 말하며, **기본 행렬(elementary matrix)**은 단위 행렬에 기본 행 연산을 한 번 실행하여 얻어진 행렬을 말한다.  

- 한 행에 0이 아닌 상수를 곱한다.
- 두 행을 교환한다.
- 한 행의 상수배를 다른 행에 더한다.

## 3. 행렬의 연산

### 덧셈과 뺄셈

행렬의 덧셈과 뺄셈은 벡터의 연산과 마찬가지로, 동일 위치의 각 원소를 더하고 빼면 된다. Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_add(*a: matrix) -> matrix:
        """returns addition of matrices"""

        return [[sum(v) for v in zip(*i)] for i in zip(*a)]


    def mat_sub(a: matrix, b: matrix) -> matrix:
        """returns subtraction of matrix"""

        return [[v - u for v, u in zip(*i)] for i in zip(a, b)]
    ```
    
=== "NumPy"

    ```python
    import numpy as np

    c = np.array([[1, 2], [3, 4]])
    d = np.array([[5, 6], [7, 8]])

    mat_add = c + d
    mat_sub = c - d
    ```

### 스칼라 곱

행렬의 **스칼라 곱(scalar multiplication)**은 벡터의 스칼라 곱과 마찬가지로 각 원소에 스칼라를 곱하는 것으로, 행렬을 구성하는 벡터의 길이를 스칼라 곱으로 늘리는 것을 의미한다. Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_smul(s: scalar, a: matrix) -> matrix:
        """returns scalar multiplication of matrix"""

        return [[s * v for v in r] for r in a]
    ```
    
=== "NumPy"

    ```python
    import numpy as np

    c = np.array([[1, 2], [3, 4]])
    d = np.array([[5, 6], [7, 8]])

    mat_smul = 3 * c
    ```

### 원소 곱

두 행렬의 각 성분을 곱하는 연산은 벡터와 마찬가지로 **원소 곱** 또는 **아다마르 곱(hadamard product)**이라고 부르고 아래와 같이 표기한다.  

$$
A \odot B
$$

Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def production(data: vector) -> float:
        """product all elements in data with for loop"""

        res = 1
        for i in data:
            res *= i
        return res


    def mat_hmul(*a: matrix) -> matrix:
        """returns hadamard product of matrix"""

        return [[production(v) for v in zip(*i)] for i in zip(*a)]  # type: ignore


    def mat_hdiv(a: matrix, b: matrix) -> matrix:
        """returns hadamard division of matrix"""

        return [[v / u for v, u in zip(*i)] for i in zip(a, b)]
    ```
    
=== "NumPy"

    ```python
    import numpy as np

    c = np.array([[1, 2], [3, 4]])
    d = np.array([[5, 6], [7, 8]])

    mat_hmul = c * d == np.multiply(c, d)
    mat_hdiv = c / d
    ```

### 행렬 곱

**행렬 곱(matrix multiplication)**의 결과 행렬은 앞 행렬의 행 벡터와 뒤 행렬의 열 벡터의 곱셈합(SUMPRODUCT of excel)을 원소로 갖기 때문에 교환 법칙이 성립하지 않는다. Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    from functools import reduce

    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_mul(a: matrix, b: matrix) -> matrix:
        """returns multiplication of 2 matrices"""

        return [[sum(v * u for v, u in zip(r, c)) for c in zip(*b)] for r in a]


    def mat_mul_all(*a: matrix) -> matrix:
        """returns multiplication of 2 matrices"""

        return reduce(mat_mul, [*a])
    ```
    
=== "NumPy"

    ```python
    import numpy as np

    c = np.array([[1, 2], [3, 4]])
    d = np.array([[5, 6], [7, 8]])
    e = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

    mat_mul = c @ d == np.matmul(c, d)
    ```

### 대각합

**행렬의 대각합(trace)**은 아래와 같이 **정사각행렬(square matrix)**의 **주대각선(main diagonal)**에 놓인 주 대각 원소를 모두 더한 값을 의미하며 $tr(A)$로 표기한다.  

$$
A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{bmatrix}
$$

$$
tr(A) = a_{11} + a_{22} + a_{33}
$$

Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_tr(a: matrix) -> scalar:
        """returns trace of matrix"""

        return sum(v[i] for i, v in enumerate([*a]))
    ```

=== "NumPy"

    ```python
    import numpy as np

    e = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

    mat_tr = np.trace(e)
    ```

## 4. 텐서

위와 같은 벡터와 행렬의 표기의 일반화하여 성분을 $n$차원으로 배열한 것을 $n$차원 **텐서(tensor)**라고 부르며, 아래와 같이 표기한다.  

$$
T = [a_{i_{1} i_{2} \cdots i_{n}}]_{m_{1} \times m_{2} \times \cdots \times m_{n}}
$$

이에 따라 스칼라는 0차원 텐서, 벡터는 1차원 텐서, 행렬은 2차원 텐서로 말할 수 있다.  

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
