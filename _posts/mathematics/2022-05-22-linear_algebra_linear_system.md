---
published: true
layout: post
title: '[선형대수] 03. 선형 시스템'
description: >
    선형 방정식, 선형 시스템, 동차 선형 시스템
categories: [Mathematics]
tags: [linear algebra]
image:
    path: /assets/img/posts/thumbnail_linear_algebra_03.png
related_posts:
    - _posts/mathematics/2022-05-19-linear_algebra_various_matrix.md
    - _posts/mathematics/2022-05-23-linear_algebra_determinant.md
---
{% include series_linalg.html %}
* toc
{:toc}

## 1. 선형 방정식

**선형 방정식(linear equation)**이란 아래와 같이 변수인 $$x_{n}$$과 상수인 $$\beta_{n}$$이 [선형 결합](/mathematics/linear_algebra_basis_dimension/#3-선형-결합과-선형-독립)되어 **선형(linear)**으로 표현 되는 1차 방정식을 말한다.  

$$\beta_{0} + \beta_{1}x_{1} + \beta_{2}x_{2} + \cdots + \beta_{n}x_{n} = y$$

따라서 거듭제곱과 삼각함수 등 선형이 아닌 요소가 포함된 방정식은 선형 방정식이 아니다.  

## 2. 선형 시스템

아래와 같이 선형 방정식이 다수 존재하는 경우, 아래와 같은 선형 방정식의 집합을 **연립 1차 방정식(system of linear equation)**, 또는 **선형 시스템(linear system)**이라고 부른다.  

$$\begin{align*}
\beta_{11}x_{1} + \beta_{12}x_{2} + \cdots & + \beta_{1n}x_{n} = y_{1} \\
\beta_{21}x_{1} + \beta_{22}x_{2} + \cdots & + \beta_{2n}x_{n} = y_{2} \\
& \vdots \\
\beta_{m1}x_{1} + \beta_{m2}x_{2} + \cdots & + \beta_{mn}x_{n} = y_{m}
\end{align*}$$

### 첨가 행렬, 계수 행렬

위와 같은 선형 시스템에서 상수 부분만 모아서 행렬 형태로 나타낸 것을 **첨가 행렬(확대행렬, augmented matrix)**라 부르고, 위의 선형 시스템을 첨가 행렬의 형태로 나타내면 다음과 같다.  

$$\left[ \begin{array}{cccc|c}
\beta_{11} & \beta_{12} & \cdots & \beta_{1n} & y_{1} \\
\beta_{21} & \beta_{22} & \cdots & \beta_{2n} & y_{2} \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
\beta_{m1} & \beta_{m2} & \cdots & \beta_{mn} & y_{m} \\
\end{array} \right]$$

그리고 아래와 같이 첨가 행렬에서 변수의 계수들만 분리한 행렬을 **계수 행렬(coefficient matrix)**이라고 부른다.  

$$\begin{bmatrix}
\beta_{11} & \beta_{12} & \cdots & \beta_{1n} \\
\beta_{21} & \beta_{22} & \cdots & \beta_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
\beta_{m1} & \beta_{m2} & \cdots & \beta_{mn} \\
\end{bmatrix}$$

선형 시스템의 계수들을 받아 첨가 행렬을 만드는 것과 첨가 행렬을 계수 행렬로 분리하는 것을 Python으로 구현하면 다음과 같다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def mat_aug_v(a: matrix, b: vector) -> matrix:
    """transform matrix into vector augmented matrix"""

    return [v + [u] for v, u in zip(a, b)]


def mat_coef(a: matrix) -> tuple:
    """separates coefficient matrix from augmented matrix"""

    x: matrix = [r[:-1] for r in a]
    y: vector = [v for r in a for v in r[-1:]]
    return x, y
```

### 피벗

선형대수학에서, **피벗(pivot)** 또는 **피벗 성분(pivot entry, pivot element)**은 가우스 소거법과 같이 특정 계산을 수행하기 위한 임의의 알고리즘에 의해 먼저 선택된 행렬의 성분(항, 원소)을 말하며, 이러한 **피벗 성분을 찾는 것을 피벗팅(pivoting)**이라고 한다.  

피벗팅을 Python으로 구현하면 아래와 같다. 피벗은 0이 아니어야 하며 계산의 편의성을 위해 일반적으로 1인 행을 선택 하는데, 간단한 구현을 위해 각 행의 첫 번째 수에 따라 내림차순 정렬하는 것으로 구현했다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def mat_pivot(mat: matrix) -> matrix:
    """
    returns pivoted matrix
    this is not actual "mathematical" pivoting as this function not selecting rows which first element is 1
    this function just sorts rows as order by descending with first elements of each row
    """

    return sorted(mat, key=lambda x: abs(x[0]), reverse=True)
```

### 행사다리꼴 행렬, 기약 행사다리꼴 행렬

아래와 같이 각 행의 0이 아닌 가장 첫 원소 아래에 위치하는 원소는 모두 0인 행렬을 **행사다리꼴 행렬(row echelon form matrix, REF)**이라 한다.  

$$\begin{bmatrix}
a_{11} & a_{12} & a_{13} & a_{14} & \cdots & a_{1n} \\
0 & a_{22} & a_{23} & a_{24} & \cdots & a_{2n} \\
0 & 0 & 0 & a_{34} & \cdots & a_{3n} \\
0 & 0 & 0 & 0 & \cdots & 0 \\
\vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & 0 & \cdots & 0 \\
\end{bmatrix}$$

그리고 아래와 같이 첫 원소가 1인 열에 대해 1을 제외한 나머지 열 원소가 0인 행렬을 **기약 행사다리꼴 행렬(reduced row echelon form matrix, RREF)**이라 한다.  

$$\begin{bmatrix}
1 & 0 & a_{13} & 0 & \cdots & a_{1n} \\
0 & 1 & a_{23} & 0 & \cdots & a_{2n} \\
0 & 0 & 0 & 1 & \cdots & a_{3n} \\
0 & 0 & 0 & 0 & \cdots & 0 \\
\vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & 0 & \cdots & 0 \\
\end{bmatrix}$$

### 가우스 소거법

첨가 행렬을 행사다리꼴 행렬로 변환한 후(전방 소거법, forward elimination) 역대입(후방 대입법, backward substitution)을 통해 해를 구하는 방법을 **가우스 소거법(Gauss elimination)**이라고 부르는데, Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def gauss_eli(a: matrix, b: vector) -> vector:
    """solving equation with Gauss elimination"""

    mat: matrix = mat_pivot(mat_aug_v(a, b))
    n: int = len(mat)

    # gauss elimination
    for i in range(n):
        for j in range(i + 1, n):
            tmp = mat[j][i] / mat[i][i]
            for k in range(n + 1):
                mat[j][k] -= tmp * mat[i][k]

    # solve equation
    for i in range(n - 1, -1, -1):
        for k in range(i + 1, n):
            mat[i][n] = mat[i][n] - mat[i][k] * mat[k][n]
        mat[i][n] /= mat[i][i]

    _, y = mat_coef(mat)

    return y
```

출처: [[수치해석] [c++,python] 가우스 소거법(Gaussian Elimination) 구현하기](https://dkswnkk.tistory.com/67)
{:.figcaption}

### 가우스-조르단 소거법

주어진 선형 시스템을 [기본 행 연산](/mathematics/linear_algebra_tensor/#기본-행-연산)을 통해 기약 행사다리꼴 행렬의 형태로 만들어 방정식의 해를 구하는 방법을 **가우스-조르단 소거법(Gauss Jordan elimination)**이라고 한다.  

[Wolfram](https://mathworld.wolfram.com/Gauss-JordanElimination.html)에 따르면 가우스-조르단 소거법은 [역행렬](/mathematics/linear_algebra_inverse_matrix/)을 구하기 위한 방법이지만 응용해서 선형 시스템을 해를 구할 때도 사용할 수 있다. 아무튼 Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def gauss_jordan_eli(mat: matrix) -> matrix:
    """Gauss-Jordan elimination, transform matrix into Gauss-Jordan eliminated form"""

    n: int = len(mat)

    for i in range(n):
        mat[i] = [ele / mat[i][i] for ele in mat[i]]

        for j in range(n):
            if i == j:
                continue

            mat_tmp = [ele * -mat[j][i] for ele in mat[i]]

            for k in range(len(mat[i])):
                mat[j][k] += mat_tmp[k]

    return mat


def solve_gauss(a: matrix, b: vector) -> vector:
    """solving equation with Gauss-Jordan elimination"""

    _, y = mat_coef(gauss_jordan_eli(mat_pivot(mat_aug_v(a, b))))
    return y
```

### NumPy 활용

NumPy를 사용해서 선형 시스템의 해를 구하는 방법은 아래와 같다.  

```python
import numpy as np

x = np.array([[1, 0, -2], [0, 5, 6], [7, 8, 0]])
y = np.array([4, 5, 3])

solve = np.linalg.solve(x, y)
```

## 3. 동차 선형 시스템

선형 시스템이 아래와 같이 우변이 모두 0이면 **동차 선형 시스템(homogeneous linear system)**이라고 부르는데, 반드시 (한 개 또는 무한개의)해가 존재한다는 특징이 있다.  

$$\begin{align*}
\beta_{11}x_{1} + \beta_{12}x_{2} + \cdots & + \beta_{1n}x_{n} = 0 \\
\beta_{21}x_{1} + \beta_{22}x_{2} + \cdots & + \beta_{2n}x_{n} = 0 \\
& \vdots \\
\beta_{m1}x_{1} + \beta_{m2}x_{2} + \cdots & + \beta_{mn}x_{n} = 0
\end{align*}$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [Gaussian Elimination](https://mathworld.wolfram.com/GaussianElimination.html)
- [Gauss-Jordan Elimination](https://mathworld.wolfram.com/Gauss-JordanElimination.html)
- [[수치해석] [c++,python] 가우스 소거법(Gaussian Elimination) 구현하기](https://dkswnkk.tistory.com/67)