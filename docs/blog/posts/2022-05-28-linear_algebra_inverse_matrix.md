---
slug: linear-algebra-inverse-matrix
title: '[선형대수] 05. 역행렬'
date:
    created: 2022-05-28
description: >
    역행렬, 역행렬 계산, 역행렬과 거듭제곱
categories:
    - Mathematics
tags:
    - linear algebra
---

역행렬, 역행렬 계산, 역행렬과 거듭제곱  

<!-- more -->

---

## 1. 역행렬

행렬 $A$의 **역행렬(inverse matrix)**이란 아래와 같이 $AB = I$를 만족하는 행렬 $B$를 의미한다. 이 때, $A$를 $B$의 왼쪽 역행렬(left inverse matrix), $B$를 $A$의 오른쪽 역행렬(right inverse matrix)라고 부른다.  

$$
AA^{-1} = A^{-1}A = I
$$

$$
(AB)^{-1} = B^{-1}A^{-1}
$$

역행렬이 존재하는 행렬을 **가역 행렬(invertible matrix)**이라 부르며, 행렬식의 값이 0이어서 역행렬이 존재하지 않는 행렬을 **특이 행렬(singular matrix)**이라고 부른다.  

### 2 * 2 행렬의 역행렬

2 * 2 행렬의 역행렬을 구하는 방법은 아래와 같다.  

$$
\begin{align*}
A^{-1} & = \frac{1}{\det(A)} \begin{bmatrix}
a_{22} & -a_{12} \\
-a_{21} & a_{11} \\
\end{bmatrix}, \quad (\det(A) \neq 0) \\
\\
& = \frac{1}{a_{11}a_{22} - a_{12}a_{21}} \begin{bmatrix}
a_{22} & -a_{12} \\
-a_{21} & a_{11} \\
\end{bmatrix}, \quad (a_{11}a_{22} - a_{12}a_{21} \neq 0) \\
\end{align*}
$$

### n * n 행렬의 역행렬

n * n 행렬의 역행렬을 구하는 방법은 행렬식에서 다룬 [수반 행렬](2022-05-23-linear_algebra_determinant.md/#_2)을 사용해야 한다. 구하는 방법은 아래와 같다.  

$$
A^{-1} = \frac{\text{adj}(A)}{\det(A)}
$$

## 2. 역행렬 계산

역행렬을 구하는 방법은 다양하지만, 앞서 다뤘던 [가우스-조르단 소거법(Gauss Jordan elimination)](2022-05-22-linear_algebra_linear_system.md/#-)을 사용하는 것이 가장 간편하다. 절차는 아래와 같다.  

- 행렬 $A$의 오른쪽에 같은 크기를 갖는 단위 행렬 $I$를 첨가해 아래와 같이 첨가 행렬 $[A \vert I]$를 만든다.  

$$
[A|I] = \left[ \begin{array}{ccc|ccc}
2 & 2 & 0 & 1 & 0 & 0 \\
-2 & 1 & 1 & 0 & 1 & 0 \\
3 & 0 & 1 & 0 & 0 & 1 \\
\end{array} \right]
$$

- 이 행렬을 [기본 행 연산](2022-05-01-linear_algebra_vector_scalar.md/#_4)을 통해 아래와 같이 $[I \vert B]$를 만든다.  

$$
[I|B] = \left[ \begin{array}{ccc|ccc}
1 & 0 & 0 & 1/12 & -1/6 & 1/6 \\
0 & 1 & 0 & 5/12 & 1/6 & -1/6 \\
0 & 0 & 1 & -1/4 & 1/2 & 1/2 \\
\end{array} \right]
$$

- 만약 이 과정에 성공하여 위와 같은 형태의 첨가 행렬이 나왔을 때, $A^{-1}=B$이고, 나오지 않는다면 행렬 $A$의 역행렬은 존재하지 않는다.

$$
A^{-1} = B = \frac{1}{12} \left[ \begin{array}{ccc}
1 & -2 & 2 \\
5 & 2 & -2 \\
-3 & 6 & 6 \\
\end{array} \right]
$$

Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    scalar = int | float
    vector = list[scalar]
    matrix = list[vector]


    def mat_aug_mat(a: matrix, b: matrix) -> matrix:
        """transform matrix into matrix augmented matrix"""

        return [v + u for v, u in zip(a, b)]


    def mat_coef_inv(a: matrix, b: int) -> tuple:
        """separates coefficient matrix"""

        x: matrix = [r[:b] for r in a]
        y: matrix = [r[b:] for r in a]
        return x, y


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


    def mat_inv(a: matrix) -> matrix:
        """returns inverted matrix"""

        n: int = len(a)
        _, res = mat_coef_inv(gauss_jordan_eli(mat_pivot(mat_aug_mat(a, mat_identity(n)))), n)

        return res
    ```

=== "NumPy"

    ```python
    import numpy as np

    x = np.array([[1, 0, -2], [0, 5, 6], [7, 8, 0]])

    res = np.linalg.inv(x)
    ```

## 3. 역행렬의 성질

- 역행렬과 거듭 제곱

$$
\begin{align*}
(A^{-1})^{-1} & = A \\
\\
(A^{n})^{-1} & = (A^{-1})^{n} \\
\\
(aA)^{-1} & = \frac{1}{a}A^{-1} \\
\end{align*}
$$

- 역행렬과 전치 행렬

$$
(A^{-1})^{T} = (A^{T})^{-1}
$$

- 역행렬과 행렬식

$$
\det(A)^{-1} = \frac{1}{\det(A)}
$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [Wolfram MathWorld : Gauss-Jordan Elimination](https://mathworld.wolfram.com/Gauss-JordanElimination.html)