---
published: true
layout: post

title: '[선형대수] 12. 행렬의 대각화'
description: >
    대각화, 고유값 분해, 특이값 분해
hide_description: false
image:
    path: /assets/img/posts/linear_algebra_12.png
related_posts:
    - _posts/Mathematics/2022-06-12-linear_algebra_11.md
    - _posts/Mathematics/2022-06-19-linear_algebra_13.md

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

## 1. 행렬의 대각화

### 대각화

행렬을 [대각 행렬(diagonal matrix)](/mathematics/linear_algebra_02/#3-대각-행렬)로 만드는 것을 **대각화(diagonalization)**라고 하며, $$n \times n$$ 행렬 $$A$$가 대각화 가능하려면 $$n$$개의 서로 다른 고유값을 가져야 한다.  

### 직교 대각화

[직교 닮음](/mathematics/linear_algebra_11/#2-닮음)인 행렬이 대각 행렬일 때, 즉 아래 식 처럼 행렬 $$A$$가 행렬 $$P$$에 의해 대각화 될 때 직교 행렬 $$P$$가 행렬 $$A$$를 **직교 대각화(orthogonal diagonalization)**한다고 말한다.  

$$D = P^{-1}AP = P^{T}AP$$

$$n \times n$$ 행렬 $$A$$가 직교 대각화가 가능하려면 다음 조건을 만족시켜야 한다.  

- 행렬 $$A$$의 고유 벡터는 $$n$$개의 정규 직교 벡터를 만족해야 한다.
- 행렬 $$A$$가 직교 대각화 가능하려면 $$A$$는 반드시 대칭 행렬이어야 한다.

## 2. 고유값 분해

**고유값 분해(eigenvalue decomposition)**는 직교 대각화의 한 종류로, 아래와 같이 정사각 행렬을 [고유값과 고유 벡터](/mathematics/linear_algebra_10/)의 곱으로 분해하는 것을 의미한다.  

$$\begin{align*}
\begin{bmatrix}
\sigma_{11} & \sigma_{12} & \sigma_{13} \\
\sigma_{21} & \sigma_{22} & \sigma_{23} \\
\sigma_{31} & \sigma_{32} & \sigma_{33} \\
\end{bmatrix} &
= [\mathbf{u}_{1} \quad \mathbf{u}_{2} \quad \mathbf{u}_{3}]\begin{bmatrix}
\lambda_{1} & 0 & 0 \\
0 & \lambda_{2} & 0 \\
0 & 0 & \lambda_{3} \\
\end{bmatrix}\begin{bmatrix}
\mathbf{u}_{1}^{T} \\
\mathbf{u}_{2}^{T} \\
\mathbf{u}_{3}^{T}\end{bmatrix} \\
\\
A & = PDP^{T} = P \Lambda P^{-1}
\end{align*}$$

위 식에서 $$\lambda_{1}, \lambda_{2}, \lambda_{3}$$는 행렬 $$A$$의 고유값이고, $$\mathbf{u}_{1}, \mathbf{u}_{2}, \mathbf{u}_{3}$$는 각 고유값에 해당하는 고유 벡터다.  

고유벡터 구하는 함수를 `python`으로 구현하면 아래와 같다. 앞서 [고유값과 고유벡터 계산](/mathematics/linear_algebra_10/#qr분해를-통한-고유값과-고유벡터-계산)에서 이미 구현한 바 있다.  

```python
# eigenvalue and eigenvector by qr decomposition
def eig_qr(a):
    n = len(a)
    v = mat_identity(n)

    for i in range(100):
        q, r = qr_gramschmidt(a)
        a = mat_mul(r, q)
        v = mat_mul(v, q)

    e = diag_ele(a)

    return e, v
```

`numpy`를 사용한 고유값 분해는 아래와 같다. 앞서 [고유값과 고유벡터 계산](/mathematics/linear_algebra_10/#2-고유값과-고유벡터-계산)에서 이미 확인한 바 있다.  

```python
import numpy as np

a = np.array([[3, 2, 1], [2, 1, 4], [1, 4, 2]])

e, v = np.linalg.eig(a)
```

## 3. 특이값 분해

**특이값 분해(singular value decomposition)**는 $$m \times n$$ 행렬 $$A$$를 아래와 같이 특정한 형태로 분해하는 것을 의미한다.  

$$\begin{align*}
A & = U \Sigma V^{T}\\
\\
AV & = U \Sigma
\end{align*}$$

- 행렬 $$U$$는 $$m \times m$$ 직교 행렬이며, 행렬 $$U$$의 열벡터는 $$AA^{T}$$의 고유 벡터로 구성된다.

$$\begin{align*}
AA^{T} & = (U \Sigma V^{T})(U \Sigma V^{T})^{T} \\
\\
& = U \Sigma V^{T} V \Sigma^{T} U^{T} \\
\\
& = U \Sigma \Sigma^{T} U^{T} \\
\end{align*}$$

- 행렬 $$V^{T}$$는 $$n \times n$$ 직교 행렬이며, 행렬 $$V$$의 열벡터는 $$A^{T}A$$의 고유 벡터로 구성된다.

$$\begin{align*}
A^{T}A & = (U \Sigma V^{T})^{T}(U \Sigma V^{T}) \\
\\
& = V \Sigma^{T} U^{T} U \Sigma V^{T} \\
\\
& = V \Sigma^{T} \Sigma V^{T} \\
\end{align*}$$

- 행렬 $$\Sigma$$는 $$m \times n$$ 직사각 대각행렬

위 식에서 행렬 $$U, V$$에 속한 벡터들을 **특이 벡터(singula vector)**, 행렬 $$\Sigma$$의 0이 아닌 대각 원소값들을 **특이값(singular value)**이라고 하며, **특이값(singular value)**은 행렬의 고유값에 루트를 씌운 값과 같다.  

특이값 분해를 `python`으로 구현하면 아래와 같다.  

```python
# singular value decomposition
def svd(a):
    at = mat_trans(a)
    ata = mat_mul(at, a)
    e, v = eig_qr(ata)

    s = [i ** 0.5 for i in e]

    vt = mat_trans(v)

    av = mat_mul(a, v)
    avt = mat_trans(av)
    ut = [normalize(v) for v in avt]

    u = mat_trans(ut)

    return u, s, vt
```

`numpy`를 활용한 특이값 분해는 아래와 같다.  

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