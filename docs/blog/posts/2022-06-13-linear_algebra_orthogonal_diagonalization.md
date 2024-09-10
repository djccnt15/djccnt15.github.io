---
slug: linear-algebra-orthogonal-diagonalization
title: '[선형대수] 12. 행렬의 대각화'
date:
    created: 2022-06-13
description: >
    대각화, 고유값 분해, 특이값 분해
categories:
    - Mathematics
tags:
    - linear algebra
---

행렬의 대각화. 대각화, 고유값 분해, 특이값 분해  

<!-- more -->

---

## 1. 행렬의 대각화

### 대각화

행렬을 [대각 행렬(diagonal matrix)](./2022-05-19-linear_algebra_various_matrix.md/#3-대각-행렬)로 만드는 것을 **대각화(diagonalization)**라고 하며, $n \times n$ 행렬 $A$가 대각화 가능하려면 $n$개의 서로 다른 고유값을 가져야 한다.  

### 직교 대각화

[직교 닮음](./2022-06-12-linear_algebra_orthogonal_matrix.md/#2-닮음)인 행렬이 대각 행렬일 때, 즉 아래 식 처럼 행렬 $A$가 행렬 $P$에 의해 대각화 될 때 직교 행렬 $P$가 행렬 $A$를 **직교 대각화(orthogonal diagonalization)**한다고 말한다.  

$$
D = P^{-1}AP = P^{T}AP
$$

$n \times n$ 행렬 $A$가 직교 대각화가 가능하려면 다음 조건을 만족시켜야 한다.  

- 행렬 $A$의 고유 벡터는 $n$개의 정규 직교 벡터를 만족해야 한다.
- 행렬 $A$가 직교 대각화 가능하려면 $A$는 반드시 대칭 행렬이어야 한다.

## 2. 고유값 분해

**고유값 분해(eigenvalue decomposition)**는 직교 대각화의 한 종류로, 아래와 같이 정사각 행렬을 [고유값과 고유 벡터](./2022-06-11-linear_algebra_eigenvalue_eigenvector.md)의 곱으로 분해하는 것을 의미한다.  

$$
\begin{align*}
\begin{bmatrix}
\sigma_{11} & \sigma_{12} & \sigma_{13} \\
\sigma_{21} & \sigma_{22} & \sigma_{23} \\
\sigma_{31} & \sigma_{32} & \sigma_{33} \\
\end{bmatrix} &
= [\textbf{u}_{1} \quad \textbf{u}_{2} \quad \textbf{u}_{3}]\begin{bmatrix}
\lambda_{1} & 0 & 0 \\
0 & \lambda_{2} & 0 \\
0 & 0 & \lambda_{3} \\
\end{bmatrix}\begin{bmatrix}
\textbf{u}_{1}^{T} \\
\textbf{u}_{2}^{T} \\
\textbf{u}_{3}^{T}\end{bmatrix} \\
\\
A & = PDP^{T} = P \Lambda P^{-1}
\end{align*}
$$

위 식에서 $\lambda_{1}, \lambda_{2}, \lambda_{3}$는 행렬 $A$의 고유값이고, $\textbf{u}_{1}, \textbf{u}_{2}, \textbf{u}_{3}$는 각 고유값에 해당하는 고유 벡터다.  

고유벡터 구하는 함수를 Python으로 구현하면 아래와 같다. 앞서 [고유값과 고유벡터 계산](./2022-06-11-linear_algebra_eigenvalue_eigenvector.md/#qr분해를-통한-고유값과-고유벡터-계산)에서 이미 구현한 바 있다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def orthogonal_check(a: matrix) -> bool:
        """checks whether orthogonal matrix or not"""

        tmp: matrix = mat_mul(a, mat_trans(a))
        tmp: matrix = mat_smul(1 / tmp[0][0], tmp)  # line for evading floating point error
        I: matrix = mat_identity(len(a))

        return tmp == I
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([[3, 2, 1], [2, 1, 4], [1, 4, 2]])

    e, v = np.linalg.eig(a)
    ```

## 3. 특이값 분해

**특이값 분해(singular value decomposition)**는 $m \times n$ 행렬 $A$를 아래와 같이 특정한 형태로 분해하는 것을 의미한다.  

$$
\begin{align*}
A & = U \Sigma V^{T}\\
\\
AV & = U \Sigma
\end{align*}
$$

- 행렬 $U$는 $m \times m$ 직교 행렬이며, 행렬 $U$의 열벡터는 $AA^{T}$의 고유 벡터로 구성된다.

$$
\begin{align*}
AA^{T} & = (U \Sigma V^{T})(U \Sigma V^{T})^{T} \\
\\
& = U \Sigma V^{T} V \Sigma^{T} U^{T} \\
\\
& = U \Sigma \Sigma^{T} U^{T} \\
\end{align*}
$$

- 행렬 $V^{T}$는 $n \times n$ 직교 행렬이며, 행렬 $V$의 열벡터는 $A^{T}A$의 고유 벡터로 구성된다.

$$
\begin{align*}
A^{T}A & = (U \Sigma V^{T})^{T}(U \Sigma V^{T}) \\
\\
& = V \Sigma^{T} U^{T} U \Sigma V^{T} \\
\\
& = V \Sigma^{T} \Sigma V^{T} \\
\end{align*}
$$

- 행렬 $\Sigma$는 $m \times n$ 직사각 대각행렬

위 식에서 행렬 $U, V$에 속한 벡터들을 **특이 벡터(singula vector)**, 행렬 $\Sigma$의 0이 아닌 대각 원소값들을 **특이값(singular value)**이라고 하며, **특이값(singular value)**은 행렬의 고유값에 루트를 씌운 값과 같다.  

특이값 분해를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def svd(a: matrix) -> tuple:
        """singular value decomposition"""

        e, v = eig_qr(mat_mul(mat_trans(a), a))

        s: vector = [i ** 0.5 for i in e]

        vt: matrix = mat_trans(v)

        ut: matrix = [normalize(v) for v in mat_trans(mat_mul(a, v))]
        u: matrix = mat_trans(ut)

        return u, s, vt
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = np.array([[3, 6], [2, 3], [1, 2], [5, 5]])

    u, s, vt = np.linalg.svd(a)
    ```

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
