---
published: true
layout: post

title: '[선형대수] 10. 고유값과 고유벡터'
description: >
  고유값과 고유벡터
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_10.png
related_posts:
  - _posts/maths/2022-06-09-linear_algebra_09.md

categories:
  - maths
tags:
  - data science
  - linear algebra
  - python
  - numpy
---
* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.  

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 1. 고유값과 고유벡터

행렬의 특성값과 특성 벡터를 **고유값(eigenvalue)**과 **고유벡터(eigenvector)**라고 말한다. **고유벡터(eigenvector)**는 벡터를 선형 변환했을 때 방향은 변하지 않고 크기만 변하는 벡터를 의미하고, 선형 변환 이후 변한 크기를 **고유값(eigenvalue)**이라고 말하며 아래와 같이 표기한다.  

- 행렬 $$A$$의 고유값을 상수 $$\lambda$$, 0이 아닌 $$\mathbf{x}$$를 고유값에 따른 고유벡터라 할 때,  

$$A \mathbf{x} = \lambda \mathbf{x}$$

## 2. 고유값과 고유벡터 계산

### 특성 방정식을 통한 고유값과 고유벡터 계산

아래와 같은 정리에 의해, 고유값 $$\lambda$$가 존재하기 위한 필요충분조건은 $$A - \lambda I$$의 행렬식이 $$0$$인 것이다.  

$$\begin{align*}
& A \mathbf{x} = \lambda \mathbf{x} \\
& \Leftrightarrow A \mathbf{x} - \lambda \mathbf{x} = 0 \\
& \Leftrightarrow (A - \lambda I) \mathbf{x} = 0
\end{align*}$$

$$\det (A - \lambda I) = 0$$

위 식을 **특성 방정식(characteristic equation)**이라고 하는데, 특성 방정식을 만족하는 모든 $$\lambda$$를 찾는 것이 **고유값(eigenvalue)**을 구하는 것이며, $$\lambda$$에 구해진 **고유값(eigenvalue)**들 대입하여 구한 $$\mathbf{x}$$를 정규화한 것이 **고유벡터(eigenvector)**이다. 이를 바탕으로 행렬 $$A$$의 고유값과 고유벡터를 구해보면 다음과 같다.  

$$A = \begin{pmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
\end{pmatrix}$$

$$\begin{align*}
\det (A - \lambda I) & = \begin{vmatrix}
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

이렇게 구해진 고유값 $$\lambda$$를 식 $$(A - \lambda I) \mathbf{x} = 0$$에 대입하여 정리하면 아래와 같은 꼴의 $$\mathbf{x}$$를 구할 수 있고, $$\mathbf{x}$$를 정규화하여 고유벡터를 구할 수 있다.  

$$\begin{align*}
\mathbf{x} = & \begin{pmatrix}
x_{1} \\
x_{2} \\
\end{pmatrix}
= \begin{pmatrix}
x_{1} \\
nx_{1} \\
\end{pmatrix}
= \begin{pmatrix}
1 \\
n \\
\end{pmatrix}x_{1} \\
\\
& \therefore \mathbf{x} = \begin{pmatrix}
1 \\
n \\
\end{pmatrix}
\end{align*}$$

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

### numpy를 사용한 고유값과 고유벡터 계산

`numpy`를 사용해 **고유값(eigenvalue)**과 **고유벡터(eigenvector)**를 구하는 방법은 아래와 같다.  

```python
import numpy as np

a = [[4, 0, 1], [-2, 1, 0], [-2, 0, 1]]

e, v = np.linalg.eig(a)
```

---
## Reference
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)