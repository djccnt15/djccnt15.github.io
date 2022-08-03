---
published: true
layout: post

title: '[선형대수] 05. 역행렬'
description: >
    역행렬, 역행렬 계산, 역행렬과 거듭제곱
hide_description: false
image:
    path: /assets/img/posts/linear_algebra_05.png
related_posts:
    - _posts/Mathematics/2022-05-23-linear_algebra_04.md
    - _posts/Mathematics/2022-05-29-linear_algebra_06.md

categories:
    - Mathematics
tags:
    - Mathematics
    - linear algebra
    - python
    - numpy
---
* toc
{:toc}

<h4>Linear Algebra Series</h4>
<div class="taxonomy__index">
    <ol class="description">
        <li><a href="/mathematics/linear_algebra_01/">선형대수의 기초</a></li>
        <li><a href="/mathematics/linear_algebra_02/">다양한 행렬</a></li>
        <li><a href="/mathematics/linear_algebra_03/">선형 시스템</a></li>
        <li><a href="/mathematics/linear_algebra_04/">행렬식</a></li>
        <li><a href="/mathematics/linear_algebra_05/">역행렬</a></li>
        <li><a href="/mathematics/linear_algebra_06/">기저와 차원</a></li>
        <li><a href="/mathematics/linear_algebra_07/">내적과 norm</a></li>
        <li><a href="/mathematics/linear_algebra_08/">직교공간과 QR 분해</a></li>
        <li><a href="/mathematics/linear_algebra_09/">다양한 곱 연산</a></li>
        <li><a href="/mathematics/linear_algebra_10/">고유값과 고유벡터</a></li>
        <li><a href="/mathematics/linear_algebra_11/">직교 행렬</a></li>
        <li><a href="/mathematics/linear_algebra_12/">행렬의 대각화</a></li>
        <li><a href="/mathematics/linear_algebra_13/">LU 분해</a></li>
    </ol>
</div>

## 1. 역행렬

행렬 $$A$$의 **역행렬(inverse matrix)**이란 아래와 같이 $$AB = I$$를 만족하는 행렬 $$B$$를 의미한다. 이 때, $$A$$를 $$B$$의 왼쪽 역행렬(left inverse matrix), $$B$$를 $$A$$의 오른쪽 역행렬(right inverse matrix)라고 부른다.  

$$AA^{-1} = A^{-1}A = I$$

$$(AB)^{-1} = B^{-1}A^{-1}$$

역행렬이 존재하는 행렬을 **가역 행렬(invertible matrix)**이라 부르며, 행렬식의 값이 0이어서 역행렬이 존재하지 않는 행렬을 **특이 행렬(singular matrix)**이라고 부른다.  

### 2 * 2 행렬의 역행렬

2 * 2 행렬의 역행렬을 구하는 방법은 아래와 같다.  

$$\begin{align*}
A^{-1} & = \frac{1}{\det A} \begin{bmatrix}
a_{22} & -a_{12} \\
-a_{21} & a_{11} \\
\end{bmatrix}, \quad (\det A \neq 0) \\
\\
& = \frac{1}{a_{11}a_{22} - a_{12}a_{21}} \begin{bmatrix}
a_{22} & -a_{12} \\
-a_{21} & a_{11} \\
\end{bmatrix}, \quad (a_{11}a_{22} - a_{12}a_{21} \neq 0) \\
\end{align*}$$

### n * n 행렬의 역행렬

n * n 행렬의 역행렬을 구하는 방법은 행렬식에서 다룬 [수반 행렬](/mathematics/linear_algebra_04/#수반-행렬)을 사용해야 한다. 구하는 방법은 아래와 같다.  

$$A^{-1} = \frac{\mathrm{adj} A}{\det A}$$

## 2. 역행렬 계산

역행렬을 구하는 방법은 다양하지만, 앞서 다뤘던 [가우스-조르단 소거법(Gauss Jordan elimination)](/mathematics/linear_algebra_03/#가우스-조르단-소거법)을 사용하는 것이 가장 간편하다. 절차는 아래와 같다.  

- 행렬 $$A$$의 오른쪽에 같은 크기를 갖는 단위 행렬 $$I$$를 첨가해 아래와 같이 첨가 행렬 $$[A \vert I]$$를 만든다.  

$$[A|I] = \left[\begin{array}{ccc|ccc}
2 & 2 & 0 & 1 & 0 & 0 \\
-2 & 1 & 1 & 0 & 1 & 0 \\
3 & 0 & 1 & 0 & 0 & 1 \\
\end{array} \right]$$

- 이 행렬을 [기본 행 연산](/mathematics/linear_algebra_01/#기본-행-연산)을 통해 아래와 같이 $$[I \vert B]$$를 만든다.  

$$[I|B] = \left[\begin{array}{ccc|ccc}
1 & 0 & 0 & 1/12 & -1/6 & 1/6 \\
0 & 1 & 0 & 5/12 & 1/6 & -1/6 \\
0 & 0 & 1 & -1/4 & 1/2 & 1/2 \\
\end{array} \right]$$

- 만약 이 과정에 성공하여 위와 같은 형태의 첨가 행렬이 나왔을 때, $$A^{-1}=B$$이고, 나오지 않는다면 행렬 $$A$$의 역행렬은 존재하지 않는다.

$$A^{-1} = B = \frac{1}{12} \left[\begin{array}{ccc}
1 & -2 & 2 \\
5 & 2 & -2 \\
-3 & 6 & 6 \\
\end{array} \right]$$

`python`으로 구현하면 아래와 같다. [선형 시스템](/mathematics/linear_algebra_03/#2-선형-시스템)에서 구현했던 함수들을 응용하여 만들었다.  

```python
# creating matrix augmented matrix
def mat_aug_mat(a, b):
    res = [v + u for v, u in zip(a, b)]

    return res

# separating coefficient matrix
def mat_coef_inv(a, b):
    x = [r[:b] for r in a]
    y = [r[b:] for r in a]

    return x, y

# Gauss-Jordan elimination
def gauss_jordan_eli(mat):
    n = len(mat)

    for i in range(n):
        mat[i] = [ele / mat[i][i] for ele in mat[i]]

        for j in range(n):
            if i == j:
                continue

            mat_tmp = [ele * -mat[j][i] for ele in mat[i]]

            for k in range(len(mat[i])):
                mat[j][k] += mat_tmp[k]

    return mat

# inverse matrix
def mat_inv(a):
    n = len(a)
    i = mat_identity(n)
    mat = mat_aug_mat(a, i)
    mat = mat_pivot(mat)
    mat = gauss_jordan_eli(mat)
    x, res = mat_coef_inv(mat, n)

    return res
```

`numpy`를 사용하면 아래와 같다.  

```python
import numpy as np

x = np.array([[1, 0, -2], [0, 5, 6], [7, 8, 0]])

res = np.linalg.inv(x)
```

## 3. 역행렬의 성질

- 역행렬과 거듭 제곱

$$\begin{align*}
(A^{-1})^{-1} & = A \\
\\
(A^{n})^{-1} & = (A^{-1})^{n} \\
\\
(aA)^{-1} & = \frac{1}{a}A^{-1} \\
\end{align*}$$

- 역행렬과 전치 행렬

$$(A^{-1})^{T} = (A^{T})^{-1}$$

- 역행렬과 행렬식

$$\det A^{-1} = \frac{1}{\det A}$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [Wolfram MathWorld : Gauss-Jordan Elimination](https://mathworld.wolfram.com/Gauss-JordanElimination.html)