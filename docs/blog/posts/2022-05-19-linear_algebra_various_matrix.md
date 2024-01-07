---
slug: linear-algebra-various-matrix
title: '[선형대수] 02. 다양한 행렬'
date:
    created: 2022-05-19
description: >
    전치/대칭/대각/이중대각/단위/영/삼각/토플리츠/하우스홀더 행렬
categories:
    - Mathematics
tags:
    - linear algebra
---

다양한 종류의 행렬. 전치/대칭/대각/이중대각/단위/영/삼각/토플리츠/하우스홀더 행렬  

<!-- more -->

---

## 1. 전치 행렬

**전치 행렬(transposed matrix)**은 기존 행렬의 행과 열을 바꾼 행렬을 말하며 $A^{T}$와 같이 표기한다. 수식으로 표현하면 아래와 같다.  

$$
A = \begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
a_{31} & a_{32} \\
\end{bmatrix}
\to A^{T} = \begin{bmatrix}
a_{11} & a_{21} & a_{31} \\
a_{12} & a_{22} & a_{32} \\
\end{bmatrix}
$$

전치 행렬의 성질 중 행렬 곱의 전치 행렬은 아래와 같아 조금 주의해야 한다.  

$$
(AB)^{T} = B^{T}A^{T}
$$

Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_trans(a: matrix) -> matrix:
        """returns transposed matrix"""

        return [list(r) for r in zip(*a)]
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

    # use function
    mat_transpose = np.transpose(a=a)

    # use method
    mat_transpose = a.T
    ```

!!! info
    Python으로 구현할 때 `list(zip(*a))` 만으로도 전치 행렬의 결과를 만들 수 있지만, 이러면 각 행이 `list`가 아닌 `tuple`이 된다.  

## 2. 대칭 행렬

**대칭 행렬(symmetric matrix)**이란 아래와 같이 기존 행렬과 전치 행렬이 동일한 행렬을 말한다.  

$$
A = \begin{bmatrix}
a & b & c \\
b & d & e \\
c & e & f \\
\end{bmatrix}, \quad
a_{ij} = a_{ji}
$$

$$
\therefore A = A^{T}
$$

선형대수에서는 $AA^{T}$나 $A^{T}A$와 같은 형태를 종종 볼 수 있는데, 둘 모두 **대칭 행렬**이 된다.  

Python으로 대칭 행렬 여부를 확인하려면 아래와 같이 앞서 만든 전치 행렬을 반환하는 함수를 활용하면 된다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def symmetric_check(a: matrix) -> bool:
        """checks whether symmetric matrix or not"""

        return a == mat_trans(a)
    ```

### 반대칭 행렬

아래와 같이 [전치 행렬](#1)이 원래 행렬에 $-1$을 곱한 행렬일 경우 행렬 $A$를 **반대칭 행렬(skew-symmetric matrix)**이라고 한다.  

$$
A^{T} = -A
$$

## 3. 대각 행렬

**대각 행렬(diagonal matrix)**은 아래와 같이 행렬의 주 대각 원소가 아닌 원소가 0인 **정사각** 행렬을 말하며, $D$로 표기한다.  

$$
D = \begin{bmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{bmatrix}
$$

대각 행렬은 다음과 같이 행렬에 대각 행렬을 곱하면 열 벡터가 배수가 되고, 대각 행렬에 행렬을 곱하면 행 백터가 배수가 되는 성질 때문에 선형대수에서 중요한 역할을 한다.  

$$
AD = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{bmatrix}\begin{bmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{bmatrix}
= \begin{bmatrix}
a_{11} \times d_{11} & a_{12} \times d_{22} & a_{13} \times d_{33} \\
a_{21} \times d_{11} & a_{22} \times d_{22} & a_{23} \times d_{33} \\
a_{31} \times d_{11} & a_{32} \times d_{22} & a_{33} \times d_{33} \\
\end{bmatrix}
$$

$$
DA = \begin{bmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{bmatrix}\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{bmatrix}
= \begin{bmatrix}
a_{11} \times d_{11} & a_{12} \times d_{11} & a_{13} \times d_{11} \\
a_{21} \times d_{22} & a_{22} \times d_{22} & a_{23} \times d_{22} \\
a_{31} \times d_{33} & a_{32} \times d_{33} & a_{33} \times d_{33} \\
\end{bmatrix}
$$

어떤 행렬의 대각 행렬을 구한다는 것은 대각 원소를 제외한 나머지 원소를 0으로 바꾸는 것을 의미하는데, 대각 원소 구하는 것과 대각 행렬 구하는 것을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def diag_ele(a: matrix) -> vector:
        """returns diagonal elements of matrix"""

        return [v[i] for i, v in enumerate([*a])]


    def mat_diag(a: matrix) -> matrix:
        """returns diagonal matrix from matrix"""

        return [[v if i == j else 0 for j, v in enumerate(r)] for i, r in enumerate(a)]
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([[1, 2, 3], [2, 4, 5], [3, 5, 6]])

    diagonal_ele = np.diag(a)
    diagonal_matrix = np.diag(diagonal_ele)
    ```

### 이중 대각 행렬

**이중 대각 행렬(bidiagonal matrix)**은 아래와 같이 대각 원소에 더해 대각 원소의 바로 위나 아래의 원소가 0이 아닌 행렬을 말한다. 삼각 행렬과 마찬가지로 upper bidiagonal matrix와 lower bidiagonal matrix가 있다.  

$$
A = \begin{bmatrix}
a_{11} & a_{12} & 0 & 0 \\
0 & a_{22} & a_{23} & 0 \\
0 & 0 & a_{33} & a_{34} \\
0 & 0 & 0 & a_{44} \\
\end{bmatrix}, \quad
A = \begin{bmatrix}
a_{11} & 0 & 0 & 0 \\
a_{21} & a_{22} & 0 & 0 \\
0 & a_{32} & a_{33} & 0 \\
0 & 0 & a_{43} & a_{44} \\
\end{bmatrix}
$$

어떤 행렬을 받아서 이중 대각 행렬을 반환하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_bidiag_u(a: matrix) -> matrix:
        """transform matrix into upper bidiagonal matrix"""

        return [[0 if i > j or j - i > 1 else v for j, v in enumerate(r)] for i, r in enumerate(a)]


    def mat_bidiag_l(a: matrix) -> matrix:
        """transform matrix into lower bidiagonal matrix"""

        return [[0 if i < j or i - j > 1 else v for j, v in enumerate(r)] for i, r in enumerate(a)]
    ```

=== "NumPy"

    ```python
    import numpy as np

    f = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])

    # upper bidiagonal matrix
    diag = np.diag(np.diag(f))
    diag_u = np.diag(v=np.diag(v=f, k=1), k=1)

    mat_bidiag_u = diag + diag_u

    # lower bidiagonal matrix
    diag = np.diag(np.diag(f))
    diag_l = np.diag(v=np.diag(v=f, k=-1), k=-1)

    mat_bidiag_l = diag + diag_l
    ```

## 4. 단위 행렬

**단위 행렬(identity matrix)**은 아래와 같이 주 대각 원소가 1이고 그 외 나머지 원소는 모두 0인 [대각 행렬](#3)을 의미한다. $I$로 표기하며, **항등 행렬**이라고도 부른다.  

$$
I = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}
$$

단위 행렬은 **단위**라는 말에서 알 수 있듯이, 다른 행렬과 곱했을 때 곱해진 행렬을 그대로 유지하는 성질이 있다.  

$$
AI = IA = A
$$

단위 행렬을 생성하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_identity(n: int) -> matrix:
        """returns n by n sized identity matrix"""

        return [[1 if i == j else 0 for j in range(n)] for i in range(n)]
    ```

=== "NumPy"

    ```python
    import numpy as np

    i = np.identity(3)
    ```

## 5. 영 행렬

**영 행렬(zero matrix)**은 아래와 같이 행렬의 구성 원소가 모두 0인 행렬, **영 벡터(zero vector)**는 구성 원소가 모두 0인 벡터를 말한다.  

$$
0 = \begin{bmatrix}
0 & 0 \\
0 & 0 \\
\end{bmatrix}
$$

Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_zeros(r: int, c: int) -> matrix:
        """returns r by c sized zero matrix"""

        return [v_zeros(c) for _ in range(r)]


    def v_zeros(n: int) -> vector:
        """returns n sized zero vector"""

        return [0 for _ in range(n)]
    ```

=== "NumPy"

    ```python
    import numpy as np

    z = np.zeros((3, 2))
    ```

## 6. 삼각 행렬

**삼각 행렬(triangular matrix)**은 0이 아닌 구성 원소가 삼각형 형태인 행렬로, 주 대각 원소 아래쪽의 모든 원소가 0인 **상 삼각 행렬(upper triangular matrix)**과 주 대각 원소 위쪽의 모든 원소가 0인 **하 삼각 행렬(lower triangular matrix)**이 있다.  

$$
U = \begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33} \\
\end{bmatrix}, \quad
L = \begin{bmatrix}
l_{11} & 0 & 0 \\
l_{21} & l_{22} & 0 \\
l_{31} & l_{32} & l_{33} \\
\end{bmatrix}
$$

입력된 행렬을 삼각 행렬로 만들어주는 것을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_tri_u(a: matrix) -> matrix:
        """transform matrix into upper triangular matrix"""

        return [[0 if i > j else v for j, v in enumerate(r)] for i, r in enumerate(a)]


    def mat_tri_l(a: matrix) -> matrix:
        """transform matrix into lower triangular matrix"""

        return [[0 if i < j else v for j, v in enumerate(r)] for i, r in enumerate(a)]
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

    mat_tri_u = np.triu(a)
    mat_tri_l = np.trul(a)
    ```

## 7. 토플리츠 행렬

**토플리츠 행렬(toeplitz matrix)**은 아래와 같이 1행의 원소가 2행으로 가면서 한 열씩 오른쪽으로 이동하는 행렬을 말하며, $T$로 표시한다. **시계열 데이터를 행렬 형태로 변환할 때 사용**한다.  

$$
T = \begin{bmatrix}
t_{0} & t_{-1} & t_{-2} & \cdots & t_{-(n - 1)} \\
t_{1} & t_{0} & t_{-1} & \ddots & \vdots \\
t_{2} & t_{1} & \ddots & \ddots & \vdots \\
\vdots & \ddots & \ddots & t_{-1} & t_{-2} \\
\vdots & \ddots & t_{1} & t_{0} & t_{-1} \\
t_{n - 1} & t_{n - 2} & \cdots & t_{1} & t_{0} \\
\end{bmatrix}
$$

토플리츠 행렬 $T$의 $i$행 $j$열 원소는 다음과 같이 표현할 수 있다.  

$$
T_{i, j} = T_{i + 1, j + 1} = t_{i - j}
$$

두 개의 벡터를 받아 하나의 토플리츠 행렬을 반환하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_toeplitz(a: vector, b: vector) -> matrix:
        """unite 2 lists into toeplitz matrix"""

        return [[a[i - j] if i >= j else b[j - i] for j, _ in enumerate(b)] for i, _ in enumerate(a)]
    ```

=== "SciPy"

    ```python
    from scipy.linalg import toeplitz

    g = [1, 2, 3, 4]
    h = [5, 6, 7, 8]

    mat_toeplitz = toeplitz(g, h)
    ```

## 8. 하우스홀더 행렬

**하우스홀더 행렬(householder matrix)**은 모든 열이 [정규 직교(orthonormal)](2022-06-06-linear_algebra_orthogonal_qr_decomposition.md/#1)하는 정사각 행렬로, 아래와 같은 수식을 따르는 행렬 $H$를 말한다.  

$$
\textbf{v} = \begin{bmatrix}
v_{1} \\
v_{2} \\
\vdots \\
v_{n}
\end{bmatrix}
\to H = I - 2\frac{\textbf{vv}^{T}}{\textbf{v}^{T}\textbf{v}}
$$

${\textbf{vv}^{T}}$은 [벡터의 외적](2022-06-09-linear_algebra_various_products.md/#1), ${\textbf{v}^{T}\textbf{v}}$은 [벡터의 내적](2022-06-05-linear_algebra_inner_product_norm.md/#1)을 뜻하기 때문에 하우스홀더 행렬 공식을 Python으로 구현하기 위해서는 벡터의 내적과 외적의 함수를 먼저 구현해야 한다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def v_outer(a: vector, b: vector) -> matrix:
        """returns outer/tensor product of 2 vectors"""

        return [[v * u for u in b] for v in a]


    def v_inner(a: vector, b: vector) -> scalar:
        """returns inner product of 2 vectors"""

        return sum(v * u for v, u in zip(a, b))
    ```

앞서 구현한 함수들을 기반으로 입력된 벡터를 받아 하우스홀더 행렬을 반환하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def householder(v: vector) -> matrix:
        """transform vector into householder matrix"""

        return mat_sub(mat_identity(len(v)), mat_smul(2, mat_smul(1 / v_inner(v, v), v_outer(v, v))))
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([1, 2, 3, 4])
    n = len(a)

    outer = np.outer(a, a)
    inner = np.inner(a, a)

    i = np.identity(n)

    H = i - 2 * (outer / inner)
    ```

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))