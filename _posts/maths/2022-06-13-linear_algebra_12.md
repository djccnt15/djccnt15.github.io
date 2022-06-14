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
  - _posts/maths/2022-06-12-linear_algebra_11.md

categories:
  - maths
tags:
  - data science
  - linear algebra
  - python
  - numpy
  - incomplete
---
* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.  

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 행렬의 대각화

### 대각화

행렬을 [대각 행렬(diagonal matrix)](/maths/2022-05-19-linear_algebra_02/#3-대각-행렬)로 만드는 것을 **대각화(diagonalization)**라고 하며, $$n \times n$$ 행렬 $$A$$가 대각화 가능하려면 $$n$$개의 서로 다른 고유값을 가져야 한다.  

### 직교 대각화

[직교 닮음](/maths/2022-06-12-linear_algebra_11/#2-닮음)인 행렬이 대각 행렬일 때, 즉 아래 식 처럼 행렬 $$A$$가 행렬 $$P$$에 의해 대각화 될 때 직교 행렬 $$P$$가 행렬 $$A$$를 **직교 대각화(orthogonal diagonalization)**한다고 말한다.  

$$D = P^{-1}AP = P^{T}AP$$

$$n \times n$$ 행렬 $$A$$가 직교 대각화가 가능하려면 다음 조건을 만족시켜야 한다.  

- 행렬 $$A$$의 고유 벡터는 $$n$$개의 정규 직교 벡터를 만족해야 한다.
- 행렬 $$A$$가 직교 대각화 가능하려면 $$A$$는 반드시 대칭 행렬이어야 한다.

## 고유값 분해

**고유값 분해(eigenvalue decomposition)**는 직교 대각화의 한 종류로, 아래와 같이 정사각 행렬을 [고유값과 고유 벡터](/maths/2022-06-11-linear_algebra_10/)의 곱으로 분해하는 것을 의미한다.  

$$\begin{align*}
\begin{pmatrix}
\sigma_{11} & \sigma_{12} & \sigma_{13} \\
\sigma_{21} & \sigma_{22} & \sigma_{23} \\
\sigma_{31} & \sigma_{32} & \sigma_{33} \\
\end{pmatrix} &
= (\mathbf{u}_{1} \quad \mathbf{u}_{2} \quad \mathbf{u}_{3})\begin{pmatrix}
\lambda_{1} & 0 & 0 \\
0 & \lambda_{2} & 0 \\
0 & 0 & \lambda_{3} \\
\end{pmatrix}\begin{pmatrix}
\mathbf{u}_{1}^{T} \\
\mathbf{u}_{2}^{T} \\
\mathbf{u}_{3}^{T}\end{pmatrix} \\
\\
A & = PDP^{T} = P \Lambda P^{-1}
\end{align*}$$

위 식에서 $$\lambda_{1}, \lambda_{2}, \lambda_{3}$$는 행렬 $$A$$의 고유값이고, $$\mathbf{u}_{1}, \mathbf{u}_{2}, \mathbf{u}_{3}$$는 각 고유값에 해당하는 고유 벡터다.  

`numpy`를 사용한 고유값 분해는 아래와 같다. 앞서 [고유값과 고유벡터 계산](/maths/2022-06-11-linear_algebra_10/#2-고유값과-고유벡터-계산)에서 이미 확인한 바 있다.  

```python
import numpy as np

a = np.array([[4, 0, 1], [-2, 1, 0], [-2, 0, 1]])

e, v = np.linalg.eig(a)
```

## 특이값 분해

**특이값 분해(singular value decomposition)**는 $$m \times n$$ 행렬 $$A$$를 아래와 같이 특정한 형태로 분해하는 것을 의미한다.  

$$\begin{align*}
A & = U \Sigma V^{T}\\
\\
AV & = U \Sigma
\end{align*}$$

- 행렬 $$U$$는 $$m \times m$$ 직교 행렬 ($$AA^{T} = U(\Sigma\Sigma^{T})U^{T}$$)
- 행렬 $$V^{T}$$는 $$n \times n$$ 직교 행렬 ($$A^{T}A = V(\Sigma^{T}\Sigma)V^{T}$$)
- 행렬 $$\Sigma$$는 $$m \times n$$ 직사각 대각행렬

위 식에서 행렬 $$U, V$$에 속한 벡터들을 **특이 벡터(singula vector)**, 행렬 $$\Sigma$$의 0이 아닌 대각 원소값들을 **특이값(singular value)**이라고 하며, **특이값(singular value)**은 행렬의 고유값에 루트를 씌운 값과 같다.  

`numpy`를 활용한 특이값 분해는 아래와 같다.  

```python
import numpy as np

a = np.array([[4, 0, 1], [-2, 1, 0], [-2, 0, 1]])

u, s, vt = np.linalg.svd(a)
```

---
## Reference
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)