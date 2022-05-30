---
published: true
layout: post

title: 선형대수 05. 역행렬
description: >
  선형대수: 역행렬, 역행렬 계산, 역행렬과 거듭제곱
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_05.png
related_posts:
  - _posts/maths/2022-05-23-linear_algebra_04.md
  - _posts/maths/2022-05-29-linear_algebra_06.md

categories:
  - maths
tags:
  - linear algebra
  - python
---

* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.  

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 1. 역행렬

행렬 $$A$$의 **역행렬(inverse matrix)**이란 아래와 같이 $$AB = I$$를 만족하는 행렬 $$B$$를 의미한다.  

$$AA^{-1} = A^{-1}A = I$$

$$(AB)^{-1} = B^{-1}A^{-1}$$

역행렬이 존재하는 행렬을 **가역 행렬(invertible matrix)**이라 부르며, 행렬식이 $$0$$이어서 역행렬이 존재하지 않는 행렬을 **특이 행렬(singular matrix)**이라고 부른다.  

## 2. 역행렬 계산

역행렬을 구하는 방법은 다양하지만, 앞서 다뤘던 **가우스-조던 소거법(Gauss Jordan elimination)**을 사용하는 것이 가장 간편하다. 절차는 아래와 같다.  

- 행렬 $$A$$의 오른쪽에 같은 크기를 갖는 단위 행렬 $$I$$를 첨가해 아래와 같이 첨가 행렬 $$[A \vert I]$$를 만든다.  

$$[A|I]
= \left(\begin{array}{ccc|ccc}
2 & 2 & 0 & 1 & 0 & 0 \\
-2 & 1 & 1 & 0 & 1 & 0 \\
3 & 0 & 1 & 0 & 0 & 1 \\
\end{array} \right)$$

- 이 행렬에 기본 행 연산을 가하여 아래와 같이 $$[I \vert B]$$를 만든다.  

$$[I|B]
= \left(\begin{array}{ccc|ccc}
1 & 0 & 0 & 1/12 & -1/6 & 1/6 \\
0 & 1 & 0 & 5/12 & 1/6 & -1/6 \\
0 & 0 & 1 & -1/4 & 1/2 & 1/2 \\
\end{array} \right)$$

- 만약 이 과정에 성공하여 위와 같은 형태의 첨가 행렬이 나왔을 때, $$A^{-1}=B$$이고, 나오지 않는다면 행렬 $$A$$의 역행렬은 존재하지 않는다.

$$A^{-1}
= B
= \frac{1}{12} \left(\begin{array}{ccc}
1 & -2 & 2 \\
5 & 2 & -2 \\
-3 & 6 & 6 \\
\end{array} \right)$$

`python`으로 구현하면 아래와 같다. [선형 시스템](/maths/2022-05-22-linear_algebra_03/#2-선형-시스템)에서 구현했던 함수들을 응용하여 만들었다.  

```python
# creating matrix augmented matrix
def mat_aug_inv(a, b):
    x = copy.deepcopy(a)

    x = [x + b[i] for i, x in enumerate(x)]

    return x

# separating coefficient matrix
def mat_coef_inv(a, b):
    n = len(a)

    x = [a[i][:b] for i in range(n)]
    y = [[y for y in a[i][b:]] for i in range(n)]

    return x, y

# Gauss-Jordan elimination
def gauss_jordan_eli(a):
    mat = copy.deepcopy(a)
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
    mat = mat_aug_inv(a, i)
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

$$(A^{-1})^{-1} = A$$

$$(A^{n})^{-1} = (A^{-1})^{n}$$

$$(aA)^{-1} = \frac{1}{a}A^{-1}$$

- 역행렬과 전치 행렬

$$(A^{-1})^{T} = (A^{T})^{-1}$$

- 역행렬과 행렬식

$$\det(A^{-1}) = \frac{1}{\det(A)}$$

---
## Reference
- 교재: [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([교재 코드](https://github.com/bjpublic/linearalgebra))
- 저자 블로그: [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)
- [Wolfram MathWorld : Gauss-Jordan Elimination](https://mathworld.wolfram.com/Gauss-JordanElimination.html)