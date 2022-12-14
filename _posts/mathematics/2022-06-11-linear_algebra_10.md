---
published: true
layout: post
title: '[선형대수] 10. 고유값과 고유벡터'
description: >
    고유값과 고유벡터
categories: [Mathematics]
tags: [linear algebra]
image:
    path: /assets/img/posts/thumbnail_linear_algebra_10.png
related_posts:
    - _posts/mathematics/2022-06-09-linear_algebra_09.md
    - _posts/mathematics/2022-06-12-linear_algebra_11.md
---
{% include series_linalg.html %}
* toc
{:toc}

## 1. 고유값과 고유벡터

행렬의 특성값과 특성 벡터를 **고유값(eigenvalue)**과 **고유벡터(eigenvector)**라고 말한다. **고유벡터(eigenvector)**는 벡터를 선형 변환했을 때 방향은 변하지 않고 크기만 변하는 벡터를 의미하고, 선형 변환 이후 변한 크기를 **고유값(eigenvalue)**이라고 말하며 아래와 같이 표기한다.  

- 행렬 $$A$$의 고유값을 상수 $$\lambda$$, 0이 아닌 $$\textbf{x}$$를 고유값에 따른 고유벡터라 할 때,  

$$A \textbf{x} = \lambda \textbf{x}$$

### 우세한 고유값, 우세한 고유벡터

주어진 $$n \times n$$ 정사각행렬 $$A$$의 고유값이 $$\lambda_{1}, \lambda_{2}, \cdots, \lambda_{n}$$일 때, 절대값이 가장 큰 고유값이 유일하면 해당 고유값을 행렬 $$A$$의 **우세한 고유값(dominant eigenvalue)**이라하고, 우세한 고유값에 대응하는 고유벡터를 **우세한 고유벡터(dominant eigenvector)**라고 한다.  

## 2. 고유값과 고유벡터 계산

### 특성 방정식을 통한 고유값과 고유벡터 계산

아래와 같은 정리에 의해, 고유값 $$\lambda$$가 존재하기 위한 필요충분조건은 $$A - \lambda I$$의 행렬식이 0인 것이다.  

$$\begin{align*}
& A \textbf{x} = \lambda \textbf{x} \\
& \Leftrightarrow A \textbf{x} - \lambda \textbf{x} = 0 \\
& \Leftrightarrow (A - \lambda I) \textbf{x} = 0
\end{align*}$$

$$\det(A - \lambda I) = 0$$

위 식을 **특성 방정식(characteristic equation)**이라고 하는데, 특성 방정식을 만족하는 모든 $$\lambda$$를 찾는 것이 **고유값(eigenvalue)**을 구하는 것이며, $$\lambda$$에 구해진 **고유값(eigenvalue)**들 대입하여 구한 $$\textbf{x}$$를 정규화한 것이 **고유벡터(eigenvector)**이다. 이를 바탕으로 행렬 $$A$$의 고유값과 고유벡터를 구해보면 다음과 같다.  

$$A = \begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
\end{bmatrix}$$

$$\begin{align*}
\det(A - \lambda I) & = \begin{vmatrix}
a_{11} - \lambda & a_{12} \\
a_{21} & a_{22} - \lambda \\
\end{vmatrix} = 0 \\
\\
& \Leftrightarrow (a_{11} - \lambda)(a_{22} - \lambda) - a_{12}a_{21} = 0 \\
\\
& \Leftrightarrow \lambda^{2} - (a_{11} + a_{22})\lambda + a_{11}a_{22} - a_{12}a_{21} = 0
\end{align*}$$

$$\begin{align*}
\therefore \lambda & = \frac{(a_{11} + a_{22}) \pm \sqrt{(a_{11} + a_{22})^{2} - 4(a_{11}a_{22} - a_{12}a_{21})}}{2} \\
\\
& = \frac{(a_{11} + a_{22}) \pm \sqrt{(a_{11} - a_{22})^2 + 4a_{12}a_{21}}}{2}
\end{align*}$$

이렇게 구해진 고유값 $$\lambda$$를 식 $$(A - \lambda I) \textbf{x} = 0$$에 대입하여 정리하면 아래와 같은 꼴의 $$\textbf{x}$$를 구할 수 있고, $$\textbf{x}$$를 정규화하여 고유벡터를 구할 수 있다.  

$$\begin{align*}
\textbf{x} = & \begin{bmatrix}
x_{1} \\
x_{2} \\
\end{bmatrix}
= \begin{bmatrix}
x_{1} \\
nx_{1} \\
\end{bmatrix}
= \begin{bmatrix}
1 \\
n \\
\end{bmatrix}x_{1} \\
\\
& \therefore \textbf{x} = \begin{bmatrix}
1 \\
n \\
\end{bmatrix}
\end{align*}$$

이 때, 고유값 $$\lambda$$가 몇 중근인지를 나타내는 개념을 **대수적 중복도**라고 하고, 같은 고유값 $$\lambda$$를 가지면서 서로 일차독립인 고유벡터의 최대 개수를 고유값 $$\lambda$$의 **기하적 중복도**라고 한다.

### QR분해를 통한 고유값과 고유벡터 계산

- 1) 행렬 $$A$$를 초기 행렬 $$A_{0}$$으로 설정하고 QR분해를 수행한다.  

$$A_{0} = A = Q_{0}R_{0}$$

- 2) $$Q_{0}$$과 $$R_{0}$$을 바탕으로 다음과 같이 $$A_{1}$$을 구한다.  

$$A_{1} = R_{0}Q_{0}$$

- 3) 1 ~ 2번 과정을 반복한다.  

$$\begin{align*}
A_{k} & = Q_{k}R_{k} \\
\\
A_{k+1} & = R_{k}Q_{k}
\end{align*}$$

- 4) 정규 직교 행렬인 $$Q_{k}$$는 $$Q_{k}^{-1} = Q_{k}^{T}$$를 만족하므로, 아래와 같이 정리할 수 있다.  

$$\begin{align*}
A_{k+1} & = R_{k}Q_{k} \\
\\
& = Q_{k}^{-1}Q_{k}R_{k}Q_{k} \\
\\
& = Q_{k}^{-1}A_{k}Q_{k} \\
\\
& = Q_{k}^{T}A_{k}Q_{k} \\
\\
& = Q_{k}^{T}(Q_{k-1}^{T}A_{k-1}Q_{k-1})Q_{k} \\
\\
& = \cdots \\
\\
& = (Q_{k}^{T}Q_{k-1}^{T} \cdots Q_{1}^{T}Q_{0}^{T})A_{0}(Q_{0}Q_{1} \cdots Q_{k-1}Q_{k}) \\
\\
& = (Q_{0}Q_{1} \cdots Q_{k-1}Q_{k})^{T}A_{0}(Q_{0}Q_{1} \cdots Q_{k-1}Q_{k})
\end{align*}$$

$$\therefore A_{0}(Q_{0}Q_{1} \cdots Q_{k-1}Q_{k}) = (Q_{0}Q_{1} \cdots Q_{k-1}Q_{k})A_{k+1}$$

- 5) QR분해를 마무리하면 $$A_{k}$$는 삼각 행렬의 형태로 수렴하게 되는데, 삼각 행렬의 고유값은 해당 행렬의 대각 원소이므로, 구해진 삼각 행렬 $$A_{k}$$의 대각 원소가 $$A$$의 **고유값(eigenvalue)**이며, $$(Q_{0}Q_{1} \cdots Q_{k-1}Q_{k})$$는 **고유벡터(eigenvector)**가 된다.  

고유값과 고유벡터 계산을 Python으로 구현하면 아래와 같다. $$A_{k}$$가 삼각 행렬의 형태로 수렴했는지 확인하는 것을 매 계산 마다 반복하는 것 보다는 그냥 무조건 100회 반복 시키는게 연산이 빠를 것 같아서 조금 단순하게 구현했다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def eig_qr(a: matrix) -> tuple:
    """
    returns eigenvalue and eigenvector by qr decomposition
    """

    n: int = len(a)
    v: matrix = mat_identity(n)

    for _ in range(100):
        q, r = qr_gramschmidt(a)
        a = mat_mul(r, q)
        v: matrix = mat_mul(v, q)

    e: vector = diag_ele(a)

    return e, v
```

NumPy를 사용해 **고유값(eigenvalue)**과 **고유벡터(eigenvector)**를 구하는 방법은 아래와 같다.  

```python
import numpy as np

a = np.array([[3, 2, 1], [2, 1, 4], [1, 4, 2]])

e, v = np.linalg.eig(a)
```

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))