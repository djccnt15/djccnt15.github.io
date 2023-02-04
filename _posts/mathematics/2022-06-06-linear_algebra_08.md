---
published: true
layout: post
title: '[선형대수] 08. 직교공간과 QR 분해'
description: >
    직교 공간, 정사영, 그람-슈미트 과정, QR 분해
categories: [Mathematics]
tags: [linear algebra]
image:
    path: /assets/img/posts/thumbnail_linear_algebra_08.png
related_posts:
    - _posts/mathematics/2022-06-05-linear_algebra_07.md
    - _posts/mathematics/2022-06-09-linear_algebra_09.md
---
{% include series_linalg.html %}
* toc
{:toc}

## 1. 직교 공간

### 직교, 정규 직교 벡터, 정규 직교 공간, 정규화

**직교(orthogonal)**란 두 직선 또는 두 평면이 직각을 이루며 만나는 것을 의미한다. 직교하는 두 벡터의 길이가 각 1([단위 벡터](/Mathematics/linear_algebra_06/#단위-벡터))이면 **정규 직교(orthonomal)**한다고 말하고, 정규 직교 하는 벡터들을 **정규 직교 벡터(orthonormal vector)**, 정규 직교 벡터가 만드는 공간을 **정규 직교 공간(orthonormal space)**이라고 한다. 직교 벡터를 정규 직교 벡터로 **정규화(normalization)** 하는 방법은 아래와 같다.  

$$\textbf{v}_{n} = \frac{\textbf{u}_{n}}{\Vert \textbf{u}_{n} \Vert}$$

벡터의 정규화를 Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]


def normalize(a: vector) -> vector:
    """normalize vector"""

    return [v / norm(a) for v in a]
```

NumPy를 사용하면 아래와 같다.  

```python
import numpy as np

v = np.array([4, 5, 3])

normalized_v = v / np.linalg.norm(v)
```

### 정규 직교 벡터를 활용한 좌표 표현

벡터 공간 $$\textbf{v}$$의 **정규 직교 기저(orthonormal basis)**를 $$S = \{ \textbf{v}_{1}, \textbf{v}_{2}, \cdots, \textbf{v}_{n} \}$$이라 할 때, 벡터 공간 $$\textbf{v}$$에 포함되는 임의의 벡터 $$\textbf{a}$$는 아래와 같이 좌표축 $$\textbf{v}_{n}$$과 벡터 $$\textbf{a}$$의 $$n$$ 번째 축의 좌표 $$\langle \textbf{a}, \textbf{v}_{n} \rangle$$으로 표현할 수 있다.  

$$\textbf{a} = \langle \textbf{a}, \textbf{v}_{1} \rangle \textbf{v}_{1} + \langle \textbf{a}, \textbf{v}_{2} \rangle \textbf{v}_{2} + \cdots + \langle \textbf{a}, \textbf{v}_{n} \rangle \textbf{v}_{n}$$

### 직교 벡터를 활용한 좌표 표현

벡터 공간 내 $$U = \{ \textbf{u}_{1}, \textbf{u}_{2}, \cdots, \textbf{u}_{n} \}$$가 **직교 기저(orthogonal basis)**라면 임의의 벡터 $$\textbf{a}$$는 다음과 같이 표현할 수 있다.  

$$\textbf{a} = \frac{\langle \textbf{a}, \textbf{u}_{1} \rangle}{\Vert \textbf{u}_{1} \Vert^{2}}\textbf{u}_{1} + \frac{\langle \textbf{a}, \textbf{u}_{2} \rangle}{\Vert \textbf{u}_{2} \Vert^{2}}\textbf{u}_{2} + \cdots + \frac{\langle \textbf{a}, \textbf{u}_{n} \rangle}{\Vert \textbf{u}_{n} \Vert^{2}}\textbf{u}_{n}$$

따라서 $$U = \{ \textbf{u}_{1}, \textbf{u}_{2}, \cdots, \textbf{u}_{n} \}$$가 **직교 기저(orthogonal basis)**일 때, $$\textbf{a}$$의 좌표를 다음과 같이 나타낼 수 있다.  

$$\textbf{a} = \left\{ \frac{\langle \textbf{a}, \textbf{u}_{1} \rangle}{\Vert \textbf{u}_{1} \Vert^{2}}, \frac{\langle \textbf{a}, \textbf{u}_{2} \rangle}{\Vert \textbf{u}_{2} \Vert^{2}}, \cdots, \frac{\langle \textbf{a}, \textbf{u}_{n} \rangle}{\Vert \textbf{u}_{n} \Vert^{2}} \right\}$$

## 2. 정사영

**정사영(projection)**이란 한 벡터 공간에 속한 벡터를 부분 공간으로 수직으로 투영하는 것을 말하며, 벡터 $$\textbf{u}$$를 벡터 $$\textbf{v}$$에 정사영시키는 것을 아래와 같이 표기한다.  

$$\begin{align*}
proj_{\textbf{v}} \textbf{u} & = \Vert \textbf{u} \Vert \vert \cos \theta \vert \frac{\textbf{v}}{\Vert \textbf{v} \Vert} = \Vert \textbf{u} \Vert \frac{\textbf{u} \cdot \textbf{v}}{\Vert \textbf{u} \Vert \Vert \textbf{v} \Vert} \frac{\textbf{v}}{\Vert \textbf{v} \Vert} \\
\\
& = \frac{\textbf{u} \cdot \textbf{v}}{\Vert \textbf{v} \Vert^{2}}\textbf{v} = \frac{\langle \textbf{u}, \textbf{v} \rangle}{\Vert \textbf{v} \Vert^{2}}\textbf{v} = \frac{\langle \textbf{u}, \textbf{v} \rangle}{\langle \textbf{v}, \textbf{v} \rangle}\textbf{v} \\
\end{align*}$$

정사영 $$proj_{\textbf{v}} \textbf{u}$$는 $$\textbf{u}$$가 갖고 있는 $$\textbf{v}$$의 성분을 의미한다. 따라서 벡터 $$\textbf{u}$$는 벡터 $$\textbf{v}$$를 기준으로 아래와 같이 분해할 수 있다.  

$$\textbf{u} = proj_{\textbf{v}} \textbf{u} + (\textbf{u} - proj_{\textbf{v}} \textbf{u})$$

정사영 $$proj_{\textbf{v}} \textbf{u}$$를 Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]


def proj(u: vector, v: vector) -> vector:
    """project 'u' vector to 'v' vector"""

    return v_smul(v_inner(u, v) / v_inner(v, v), v)
```

NumPy를 사용해서 구현하면 아래와 같다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([2, 4, 8])

res = (np.inner(a, b) / np.inner(b, b)) * b
```

벡터 $$\textbf{u}$$를 벡터$$\textbf{v}$$에 정사영한 길이 $$\Vert proj_{\textbf{v}} \textbf{u} \Vert$$는 다음과 같다.  

$$\Vert proj_{\textbf{v}} \textbf{u} \Vert = \Vert \textbf{u} \Vert \vert \cos \theta \vert$$

정사영을 이용해 내적을 정리하면, 벡터 $$\textbf{v}$$와 벡터 $$\textbf{u}$$의 내적이란 벡터 $$\textbf{u}$$를 벡터 $$\textbf{v}$$에 정사영시킨 벡터의 길이, 즉 $$\Vert \textbf{u} \Vert \vert \cos \theta \vert$$와 기존 벡터 $$\textbf{v}$$의 길이인 $$\Vert \textbf{v} \Vert$$의 곱과 같다.  

$$\begin{align*}
\langle \textbf{v}, \textbf{u} \rangle & = \Vert \textbf{v} \Vert \Vert \textbf{u} \Vert \cos \theta \\
\\
& = \Vert \textbf{v} \Vert \times \Vert \textbf{u} \Vert \cos \theta \\
\\
& = length \ of \ vector \ \textbf{v} \times length \ of \ vector \ proj_{\textbf{v}}\textbf{u} \\
\end{align*}$$

### 정사영 정리

**부분 공간에 대한 정사영 정리(projection theorem for subspaces)**의 내용은 아래와 같다.  

- 벡터 공간 $$S$$의 부분 공간 $$W$$가 존재할 때 벡터 공간 $$S$$에 속하는 임의의 벡터 $$\textbf{a}$$는 다음과 같이 표현 가능하다.  

$$\textbf{a} = \textbf{w}_{1} + \textbf{w}_{2}$$

- 이 때, $$\textbf{w}_{1}$$은 부분 공간 $$W$$에 속하는 벡터이며 $$\textbf{w}_{2}$$는 부분 공간의 직교 공간인 $$W^{\bot}$$에 속하는 벡터다.  

### 직교 정사영

벡터 공간 $$S$$의 부분 공간 $$W$$에서 부분 공간 $$W$$의  **직교 기저(orthogonal basis)**가 $$U = \{ \textbf{u}_{1}, \textbf{u}_{2}, \cdots, \textbf{u}_{n} \}$$일 때, $$\textbf{a}$$가 전체 벡터 공간 $$S$$의 임의의 벡터이면 $$\textbf{a}$$를 $$W$$로 정사영 시킨 벡터는 다음과 같다. [직교 벡터를 활용한 좌표 표현](/mathematics/linear_algebra_08/#직교-벡터를-활용한-좌표-표현)을 참고하자.  

$$proj_{\textbf{w}} \textbf{a} = \frac{\langle \textbf{a}, \textbf{u}_{1} \rangle}{\Vert \textbf{u}_{1} \Vert^{2}}\textbf{u}_{1} + \frac{\langle \textbf{a}, \textbf{u}_{2} \rangle}{\Vert \textbf{u}_{2} \Vert^{2}}\textbf{u}_{2} + \cdots + \frac{\langle \textbf{a}, \textbf{u}_{n} \rangle}{\Vert \textbf{u}_{n} \Vert^{2}}\textbf{u}_{n}$$

따라서 $$proj_{\textbf{w}} \textbf{a}$$의 좌표는 다음과 같다.  

$$proj_{\textbf{w}} \textbf{a} = \left\{ \frac{\langle \textbf{a}, \textbf{u}_{1} \rangle}{\Vert \textbf{u}_{1} \Vert^{2}}, \frac{\langle \textbf{a}, \textbf{u}_{2} \rangle}{\Vert \textbf{u}_{2} \Vert^{2}}, \cdots, \frac{\langle \textbf{a}, \textbf{u}_{n} \rangle}{\Vert \textbf{u}_{n} \Vert^{2}} \right\}$$

벡터 공간 $$S$$의 부분 공간 $$W$$에서, 부분 공간 $$W$$의 **정규 직교 기저(orthonormal basis)**가 $$\{ \textbf{v}_{1}, \textbf{v}_{2}, \cdots, \textbf{v}_{n} \}$$일 때, $$\textbf{a}$$가 전체 벡터 공간 $$S$$의 임의의 벡터이면 $$\textbf{a}$$를 $$W$$로 정사영시킨 벡터는 다음과 같다. [정규 직교 벡터를 활용한 좌표 표현](/mathematics/linear_algebra_08/#정규-직교-벡터를-활용한-좌표-표현)을 참고하자.  

$$proj_{\textbf{w}} \textbf{a} = \langle \textbf{a}, \textbf{v}_{1} \rangle \textbf{v}_{1} + \langle \textbf{a}, \textbf{v}_{2} \rangle \textbf{v}_{2} + \cdots + \langle \textbf{a}, \textbf{v}_{n} \rangle \textbf{v}_{n}$$

## 3. 그람-슈미트 과정

**그람-슈미트 과정(Gram-Schmidt Process)**은 [기저(basis) 벡터](/mathematics/linear_algebra_06/#기저-벡터) $$\{ \textbf{s}_{1}, \textbf{s}_{2}, \cdots, \textbf{s}_{n} \}$$를 [직교 기저(orthogonal basis) 벡터](/mathematics/linear_algebra_08/#직교-정규-직교-벡터-정규-직교-공간-정규화) $$\{ \textbf{u}_{1}, \textbf{u}_{2}, \cdots, \textbf{u}_{n} \}$$로 변환하는 과정을 의미한다. 그람-슈미트 과정은 다음과 같은 단계로 진행 된다.  

- 1) 기존 기저 벡터 $$\textbf{s}_{1}$$을 통해 새로운 직교 기저 벡터 $$\textbf{u}_{1}$$을 정의한다.

$$\textbf{u}_{1} = \textbf{s}_{1}$$

- 2) 첫 번째 단계에서 만든 직교 기저 벡터 $$\textbf{u}_{1}$$를 통해 두 번째 직교 기저 벡터 $$\textbf{u}_{2}$$를 생성한다.

$$\textbf{u}_{2} = \textbf{s}_{2} - \frac{\langle \textbf{s}_{2}, \textbf{u}_{1} \rangle}{\Vert \textbf{u}_{1} \Vert^{2}}\textbf{u}_{1} = \textbf{s}_{2} - proj_{\textbf{u}_{1}} \textbf{s}_{2}$$

- n) 같은 방식으로 n 번째 직교 기저 벡터까지 구한다.

$$\begin{align*}
\textbf{u}_{n} & = \textbf{s}_{n} - \frac{\langle \textbf{s}_{n}, \textbf{u}_{1} \rangle}{\Vert \textbf{u}_{1} \Vert^{2}}\textbf{u}_{1} - \frac{\langle \textbf{s}_{n}, \textbf{u}_{2} \rangle}{\Vert \textbf{u}_{2} \Vert^{2}}\textbf{u}_{2} - \cdots - \frac{\langle \textbf{s}_{n}, \textbf{u}_{n-1} \rangle}{\Vert \textbf{u}_{n-1} \Vert^{2}}\textbf{u}_{n - 1} \\
\\
& = \textbf{s}_{n} - \sum_{i=1}^{n - 1}proj_{\textbf{u}_{i}} \textbf{s}_{n}
\end{align*}$$

이 과정을 그림으로 표현하면 아래와 같다.  

![Gram-Schmidt_orthonormalization_process](/assets/img/posts/Gram-Schmidt_orthonormalization_process.gif)
{:.text-center}

출처: [위키피디아 그람-슈미트 과정](https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%9E%8C-%EC%8A%88%EB%AF%B8%ED%8A%B8_%EA%B3%BC%EC%A0%95)([영문](https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process))
{:.figcaption}

앞서 구현한 함수들을 바탕으로 Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def gram_schmidt(s: matrix) -> matrix:
    """perform Gram-Schmidt Process to matrix"""

    res = []
    for i, _ in enumerate(s):
        if i == 0:
            res.append(s[i])
        else:
            res.append(v_sub(s[i], v_add(*[proj(s[i], res[j]) for j in range(i)])))
    return res
```

## 4. QR분해

### QR분해의 기초

행렬 $$A$$의 **열 벡터** $$\textbf{a}_i$$끼리 모두 선형 독립일 때, 행렬 $$A$$는 아래와 같이 정규 직교 벡터(orthonormal vector) $$n \times p$$ 행렬 $$Q$$와 가역 상 삼각행렬(invertible upper triangular matrix) $$R$$로 분해할 수 있다.  

$$A = QR$$

이러한 **QR분해(QR decomposition, QR factorization)**는 주어진 행렬을 직교하는 행렬로 나타내어 행렬을 다루기 편하게 만들어주며, 크기가 큰 행렬의 고유값을 구할 때 유용하게 사용된다.  
[정규 직교 벡터를 활용한 좌표 표현](/mathematics/linear_algebra_08/#정규-직교-벡터를-활용한-좌표-표현)을 참고하면, 행렬 $$A$$의 각 열 벡터는 아래와 같이 나타낼 수 있다.  

$$\begin{align*}
\textbf{a}_{1} = \langle \textbf{a}_{1}, \textbf{v}_{1} \rangle \textbf{v}_{1} + \langle \textbf{a}_{1}, \textbf{v}_{2} \rangle \textbf{v}_{2} & + \cdots + \langle \textbf{a}_{1}, \textbf{v}_{n} \rangle \textbf{v}_{n} \\
\textbf{a}_{2} = \langle \textbf{a}_{2}, \textbf{v}_{1} \rangle \textbf{v}_{1} + \langle \textbf{a}_{2}, \textbf{v}_{2} \rangle \textbf{v}_{2} & + \cdots + \langle \textbf{a}_{2}, \textbf{v}_{n} \rangle \textbf{v}_{n} \\
& \vdots \\
\textbf{a}_{n} = \langle \textbf{a}_{n}, \textbf{v}_{1} \rangle \textbf{v}_{1} + \langle \textbf{a}_{n}, \textbf{v}_{2} \rangle \textbf{v}_{2} & + \cdots + \langle \textbf{a}_{n}, \textbf{v}_{n} \rangle \textbf{v}_{n} \\
\end{align*}$$

따라서 행렬 $$A$$는 다음과 같이 정리할 수 있다.  

$$[\textbf{a}_{1} \quad \textbf{a}_{2} \quad \cdots \quad \textbf{a}_{n}] = [\textbf{v}_{1} \quad \textbf{v}_{2} \quad \cdots \quad \textbf{v}_{n}]\begin{bmatrix}
\langle \textbf{a}_{1}, \textbf{v}_{1} \rangle & \langle \textbf{a}_{2}, \textbf{v}_{1} \rangle & \cdots & \langle \textbf{a}_{n}, \textbf{v}_{1} \rangle \\
\langle \textbf{a}_{1}, \textbf{v}_{2} \rangle & \langle \textbf{a}_{2}, \textbf{v}_{2} \rangle & \cdots & \langle \textbf{a}_{n}, \textbf{v}_{2} \rangle \\
\vdots & \vdots & \ddots & \vdots \\
\langle \textbf{a}_{1}, \textbf{v}_{n} \rangle & \langle \textbf{a}_{2}, \textbf{v}_{n} \rangle & \cdots & \langle \textbf{a}_{n}, \textbf{v}_{n} \rangle \\
\end{bmatrix}$$

그람-슈미트 과정에 의해 정규 직교 벡터 $$\textbf{v}_{j}$$는 벡터 $$\textbf{a}_{1}, \textbf{a}_{2}, \cdots, \textbf{a}_{j-1}$$과 직교하기 때문에, 정규 직교 벡터 $$\textbf{v}_{j}$$와 각 벡터 $$\textbf{a}_{1}, \textbf{a}_{2}, \cdots, \textbf{a}_{j-1}$$의 내적값은 0이다. 이를 바탕으로 $$A = QR$$을 다시 정리하여 $$Q$$와 $$R$$을 분해하면 다음과 같다.  

$$\begin{align*}
& A = QR \\
\\
& Q = [\textbf{v}_{1} \quad \textbf{v}_{2} \quad \cdots \quad \textbf{v}_{n}] \\
\\
& R = \begin{bmatrix}\langle \textbf{a}_{1}, \textbf{v}_{1} \rangle & \langle \textbf{a}_{2}, \textbf{v}_{1} \rangle & \cdots & \langle \textbf{a}_{n}, \textbf{v}_{1} \rangle \\
0 & \langle \textbf{a}_{2}, \textbf{v}_{2} \rangle & \cdots & \langle \textbf{a}_{n}, \textbf{v}_{2} \rangle \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & \langle \textbf{a}_{n}, \textbf{v}_{n} \rangle \\
\end{bmatrix}
\end{align*}$$

### 그람-슈미트 과정을 이용한 QR분해

그람-슈미트 과정을 이용한 QR분해를 Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def qr_gramschmidt(a: matrix) -> tuple:
    """QR decomposition/factorization with Gram-Schmidt Process"""

    mat: matrix = mat_trans(a)
    n: int = len(mat)
    gs: matrix = gram_schmidt(mat)

    q_tmp: matrix = [normalize(i) for i in gs]
    q: matrix = mat_trans(q_tmp)
    r: matrix = [[0 if i > j else v_inner(mat[j], q_tmp[i]) for j in range(n)] for i in range(n)]

    return q, r
```

NumPy, SciPy로 구한 값과는 부호가 조금 다르게 나오는데, 바뀐 부호가 $$Q$$와 $$R$$에 공통적으로 적용되기 때문에 $$A = QR$$이라는 최종 검산 결과를 만족하면 상관 없다고 한다. 참고로 [WolframAlpha](https://www.wolframalpha.com/input?i=QR+decomposition+%7B%7B10%2C+-10%2C+4%2C+10%7D%2C+%7B20%2C+4%2C+-20%2C+8%7D%2C+%7B30%2C+40%2C+2%2C+6%7D%2C+%7B10%2C+-10%2C+0%2C+3%7D%7D)로 검산을 해보면 내가 구현한 함수와 동일한 부호로 값이 도출된다.  

### 하우스홀더 행렬을 이용한 QR분해

[하우스홀더 행렬](/mathematics/linear_algebra_02/#8-하우스홀더-행렬)을 사용해서 구하는 방법도 있다. 그람-슈미트 방법과는 달리 부동소수점 연산에서도 오차가 누적되지 않기 때문에 더 많이 활용된다고 한다. 하우스홀더 행렬을 사용한 QR분해 방법은 다음과 같다.  

- 1) 주어진 행렬 $$A$$를 통해 $$\textbf{v}_{1}$$를 구한다. 아래 식에서 $$sign$$은 벡터의 첫 스칼라의 부호로, 0 이상이면 $$+$$, 0 미만이면 $$-$$가 된다. $$\textbf{e}_{1}$$은 [기저 벡터](/mathematics/linear_algebra_06/#기저-벡터)를 말한다.  

$$A_{1} = A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} & a_{14} \\
a_{21} & a_{22} & a_{23} & a_{24} \\
a_{31} & a_{32} & a_{33} & a_{34} \\
a_{41} & a_{42} & a_{43} & a_{44} \\
\end{bmatrix}
= [\textbf{a}_{1} \quad \textbf{a}_{2} \quad \cdots \quad \textbf{a}_{n}]$$

$$\begin{align*}
\textbf{v}_{1} = \textbf{a}_{1} + sign(a_{1}) \Vert \textbf{a}_{1} \Vert \textbf{e}_{1} \\
\\
\textbf{a}_{1} = \begin{bmatrix}
a_{11} \\
a_{21} \\
a_{31} \\
a_{41}\end{bmatrix}, \quad
\textbf{e}_{1} = \begin{bmatrix}
1 \\
0 \\
0 \\
0
\end{bmatrix}
\end{align*}$$

- 2) 위에서 구한 $$\textbf{v}_{1}$$를 통해서 [하우스홀더 행렬](/mathematics/linear_algebra_02/#8-하우스홀더-행렬)을 구한다.  

$$\begin{align*}
H_{1} & = I - 2\frac{\textbf{v}_{1}^{}\textbf{v}_{1}^{T}}{\textbf{v}_{1}^{T}\textbf{v}_{1}^{}} \\
\\
& = \begin{bmatrix}
h_{11} & h_{12} & h_{13} & h_{14} \\
h_{21} & h_{22} & h_{23} & h_{24} \\
h_{31} & h_{32} & h_{33} & h_{34} \\
h_{41} & h_{42} & h_{43} & h_{44} \\
\end{bmatrix}
\end{align*}$$

- 3) $$H_{1}$$와 $$A_{1}$$를 곱한 행렬에서 1행 1열을 제외한 나머지 행렬로 $$A_{2}$$를 만들고, 1 ~ 2번 과정을 되풀이 한다.  

$$H_{1}A_{1} = \left[ \begin{array}{c|ccc}
a_{11} & a_{12} & a_{13} & a_{14} \\
\hline
a_{21} & a_{22} & a_{23} & a_{24} \\
a_{31} & a_{32} & a_{33} & a_{34} \\
a_{41} & a_{42} & a_{43} & a_{44} \\
\end{array} \right]
\to A_{2} = \begin{bmatrix}
a_{22} & a_{23} & a_{24} \\
a_{32} & a_{33} & a_{34} \\
a_{42} & a_{43} & a_{44} \\
\end{bmatrix}$$

- 4) 1 ~ 3번 과정을 되풀이하여 각각의 하우스홀더 행렬이 모두 구해지면, 아래와 같이 단위 행렬과 조합하여 크기를 맞춘다.  

$$\begin{align*}
H_{1} & = \begin{bmatrix}h_{11} & h_{12} & h_{13} & h_{14} \\
h_{21} & h_{22} & h_{23} & h_{24} \\
h_{31} & h_{32} & h_{33} & h_{34} \\
h_{41} & h_{42} & h_{43} & h_{44} \\
\end{bmatrix} \\
\\
H_{2} & = \begin{bmatrix}1 & 0 & 0 & 0 \\
0 & h_{11} & h_{12} & h_{13} \\
0 & h_{21} & h_{22} & h_{23} \\
0 & h_{31} & h_{32} & h_{33} \\
\end{bmatrix} \\
\\
H_{3} & = \begin{bmatrix}1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & h_{11} & h_{12} \\
0 & 0 & h_{21} & h_{22} \\
\end{bmatrix}
\end{align*}$$

- 5) 아래와 같이 구해진 $$H_{i}$$을 모두 곱해 $$Q$$와 $$R$$을 구한다.  

$$\begin{align*}
Q & = H_{1}H_{2}H_{3} \cdots H_{n}\\
\\
R & = H_{n} \cdots H_{3}H_{2}H_{1}A
\end{align*}$$

Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


# QR decomposition/factorization with householder matrix
def v_sign(a: vector) -> int:
    """get sign of vector(returns sign of first element of vector)"""

    return -1 if a[0] < 0 else 1


def ele_h(a: matrix) -> matrix:
    """get element of householder matrix except last one"""

    at: matrix = mat_trans(a)
    return householder(v_add(at[0], v_smul(v_sign(at[0]) * norm(at[0]), [1 if j == 0 else 0 for j in range(len(at[0]))])))


def qr_householder(a: matrix) -> tuple:
    """QR decomposition/factorization with householder matrix"""

    n: int = len(mat_trans(a))
    h_list_tmp = []
    tmp_res = []  # this line is only for evading unbound error, not essential

    # get househelder matrixes
    for i in range(n):
        if i == 0:
            res: matrix = ele_h(a)
            h_list_tmp.append(res)
            tmp_res: matrix = mat_mul(res, a)

        elif i < n - 1:
            an = [[tmp_res[j][k] for k in range(1, len(tmp_res[0]))] for j in range(1, len(tmp_res))]
            res: matrix = ele_h(an)
            h_list_tmp.append(res)
            tmp_res: matrix = mat_mul(res, an)

        else:
            an = [tmp_res[j][k] for k in range(1, len(tmp_res[0])) for j in range(1, len(tmp_res))]
            nm: scalar = norm(an)
            e: vector = [1 if j == 0 else 0 for j in range(len(an))]
            sign: int = v_sign(an)
            tmp = v_smul(sign * nm, e)
            v: vector = v_add(an, tmp)
            h: matrix = householder(v)
            h_list_tmp.append(h)

    # convert househelder matrixes to H_{i} form
    m: int = len(a)
    I: matrix = mat_identity(m)
    h_list = [h_tmp if len(h_tmp) == m \
        else [[I[i][j] if i < m - len(h_tmp) or j < m - len(h_tmp) \
            else h_tmp[i - (m - len(h_tmp))][j - (m - len(h_tmp))] \
                for i in range(m)] for j in range(m)] for h_tmp in h_list_tmp]

    # calculate Q
    q: matrix = mat_identity(len(h_list[0]))
    for i in h_list:
        q: matrix = mat_mul(q, i)

    # calculate R
    tmp = list(reversed(h_list))
    tmp_i: matrix = mat_identity(len(h_list[0]))
    for i in tmp:
        tmp_i: matrix = mat_mul(tmp_i, i)
    r: matrix = mat_mul(tmp_i, a)

    return q, r
```

중간에 [list comprehension](/python/list_comprehension/)을 3중첩해서 작성한 부분을 풀어쓰면 아래와 같다.  

```python
h_list = []
for h_tmp in h_list_tmp:
    p = len(h_tmp)

    if p == m:
        tmp = h_tmp
    else:
        tmp = []
        for i in range(m):
            row = []
            for j in range(m):
                if i < m - p or j < m - p:
                    row.append(I[i][j])
                else:
                    row.append(h_tmp[i - (m - p)][j - (m - p)])
            tmp.append(row)
    h_list.append(tmp)
```

NumPy, SciPy로 구한 값 및 위의 [그람-슈미트 과정](#그람-슈미트-과정을-이용한-qr분해)을 이용해서 도출한 값과는 부호가 조금 다르게 나오는데, 마찬가지로 바뀐 부호가 $$Q$$와 $$R$$에 공통적으로 적용되어 $$A = QR$$이라는 최종 검산 결과를 만족하면 상관 없다고 한다.  

### Numpy, SciPy 활용

NumPy를 활용한 QR분해는 아래와 같다.  

```python
import numpy as np

s = np.array([[10, -10, 4, 10], [20, 4, -20, 8], [30, 40, 2, 6], [10, -10, 0, 3]])

q, r = np.linalg.qr(s)
```

SciPy를 활용한 QR분해는 아래와 같다.  

```python
from scipy import linalg

s = np.array([[10, -10, 4, 10], [20, 4, -20, 8], [30, 40, 2, 6], [10, -10, 0, 3]])

q, r = linalg.qr(s)
```

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [위키피디아: 그람-슈미트 과정](https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%9E%8C-%EC%8A%88%EB%AF%B8%ED%8A%B8_%EA%B3%BC%EC%A0%95)([영문](https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process))
- [위키피디아: QR 분해](https://ko.wikipedia.org/wiki/QR_%EB%B6%84%ED%95%B4)([영문](https://en.wikipedia.org/wiki/QR_decomposition))
- [QR 분해 - 공돌이의 수학정리노트](https://angeloyeo.github.io/2020/11/23/gram_schmidt.html)