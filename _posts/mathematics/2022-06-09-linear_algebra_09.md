---
published: true
layout: post
title: '[선형대수] 09. 다양한 곱 연산'
description: >
  외적, 벡터 곱, 삼중 곱
categories: [Mathematics]
tags: [linear algebra]
image:
  path: /assets/img/posts/linear_algebra_09.png
related_posts:
  - _posts/mathematics/2022-06-06-linear_algebra_08.md
  - _posts/mathematics/2022-06-11-linear_algebra_10.md
---
* toc
{:toc}

{% include series_linalg.html %}

## 1. 외적

벡터의 **외적(outer product)** 또는 **텐서 곱(tensor product)**은 다음과 같은 연산을 의미한다.  

$$\mathbf{u} \otimes \mathbf{v} = \mathbf{u} \mathbf{v}^{T}$$

Python으로 구현하면 아래와 같다. [하우스홀더 행렬](/mathematics/linear_algebra_02/#8-하우스홀더-행렬) 공식에서 이미 구현한 바 있다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def v_outer(a: vector, b: vector) -> matrix:
    """
    returns outer/tensor product of 2 vectors
    """

    res: matrix = [[v * u for u in b] for v in a]
    return res
```

NumPy를 사용하면 아래와 같다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

res = np.outer(a, b)
```

참고로 두 벡터의 내적은 두 벡터의 외적의 대각합과 같다.  

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = tr(\mathbf{u} \otimes \mathbf{v})$$

## 2. 벡터 곱

**벡터 곱(vector product)**은 **크로스 곱(cross product)** 또는 **가위 곱**이라고 부르기도 하는데, **3차원 공간의 벡터들 간에서만 적용할 수 있는 연산**으로, 다음과 같이 [기저 벡터](/mathematics/linear_algebra_06/#기저-벡터)를 사용해 구할 수 있다.  

$$\mathbf{i} = \begin{bmatrix}
1 \\
0 \\
0 \\
\end{bmatrix}, \quad
\mathbf{j} = \begin{bmatrix}
0 \\
1 \\
0 \\
\end{bmatrix}, \quad
\mathbf{k} = \begin{bmatrix}
0 \\
0 \\
1 \\
\end{bmatrix}$$

$$\begin{align*}
\mathbf{u} \times \mathbf{v} & = \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
u_{1} & u_{2} & u_{3} \\
v_{1} & v_{2} & v_{3} \\
\end{vmatrix} \\
\\
& = \begin{vmatrix}
u_{2} & u_{3} \\
v_{2} & v_{3} \\
\end{vmatrix}\mathbf{i}
- \begin{vmatrix}
u_{1} & u_{3} \\
v_{1} & v_{3} \\
\end{vmatrix}\mathbf{j}
+ \begin{vmatrix}
u_{1} & u_{2} \\
v_{1} & v_{2} \\
\end{vmatrix}\mathbf{k} \\
\\
& = (u_{2}v_{3} - u_{3}v_{2})\mathbf{i} - (u_{1}v_{3} - u_{3}v_{1})\mathbf{j} + (u_{1}v_{2} - u_{2}v_{1})\mathbf{k}
\end{align*}$$

벡터 곱 $$\mathbf{u} \times \mathbf{v}$$의 방향은 벡터 $$\mathbf{u}$$와 $$\mathbf{v}$$에 수직이고, 크기는 $$\mathbf{u}$$와 $$\mathbf{v}$$ 두 벡터가 이루는 정사각형의 넓이, 즉 벡터 $$\mathbf{u}$$와 벡터 $$\mathbf{v}$$의 벡터 곱의 [노름(norm)](/mathematics/linear_algebra_07/#2-노름norm)과 같다. 이를 수식으로 나타내면 다음과 같다.  

$$\Vert \mathbf{u} \times \mathbf{v} \Vert = \Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert \vert \sin \theta \vert$$

NumPy를 사용해 크로스곱의 결과를 구하면 아래와 같다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

res = np.cross(a, b)
```

## 3. 삼중 곱

**삼중 곱(triple product)**은 벡터 3개를 특수하게 곱하는 방법으로 스칼라 삼중 곱과 벡터 삼중 곱 두 가지가 있다.  

### 스칼라 삼중 곱

스칼라 삼중 곱은 아래와 같이 [행렬식](/mathematics/linear_algebra_04/)을 통해 계산한다.  

$$\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w})
= \begin{vmatrix}
u_{1} & u_{2} & u_{3} \\
v_{1} & v_{2} & v_{3} \\
w_{1} & w_{2} & w_{3} \\
\end{vmatrix}$$

### 벡터 삼중 곱

벡터 삼중 곱은 아래와 같이 벡터 곱을 세번 하는 것을 의미한다.  

$$\mathbf{u} \times (\mathbf{v} \times \mathbf{w})$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))