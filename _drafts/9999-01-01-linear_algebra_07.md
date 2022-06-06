---
published: true
layout: post

title: '[선형대수] 07. 내적'
description: >
  내적, 직교 공간, 그람-슈미트 과정, QR 분해
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_07.png
related_posts:
  - _posts/maths/2022-05-29-linear_algebra_06.md

categories:
  - maths
tags:
  - data science
  - linear algebra
  - python
  - numpy
  - scipy
---

* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.  

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 1. 내적

### 내적의 개념

[벡터 공간](/maths/2022-05-29-linear_algebra_06/#1-벡터-공간)의 설명에서 언급했듯이, **내적(inner product)**이 주어진 벡터 공간을 **내적 공간(inner product space)**이라고 부르고 **내적(inner product)**을 아래와 같이 표기한다.  

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v}$$

벡터의 내적일 경우, 아래와 같다.

$$\mathbf{u}
= \begin{pmatrix}
u_{1} \\
\vdots \\
u_{n} \\
\end{pmatrix},
\mathbf{v}
= \begin{pmatrix}
v_{1} \\
\vdots \\
v_{n} \\
\end{pmatrix}$$

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = \mathbf{u}^{T} \mathbf{v} = \sum_{i=1}^{n}u_{i}v_{i}$$

벡터의 내적 공식을 `python`으로 구현하면 아래와 같다. [하우스홀더 행렬](/maths/2022-05-19-linear_algebra_02/#8-하우스홀더-행렬) 공식에서 이미 구현한 바 있다.  

```python
# inner product of vector
def v_inner(a, b):
    n = len(a)

    res = sum(a[i] * b[i] for i in range(n))

    return res
```

`numpy`를 사용하면 아래와 같다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

inner_product = np.inner(a, b)
```

### 내적의 성질

벡터를 사용하면 벡터 사이의 각도를 추정할 수 있고, 벡터의 크기 또는 길이를 말하는 **노름(norm)**을 구할 수 있다.  
우선 벡터의 내적과 벡터 사이의 각도의 관계는 아래와 같다.  

- 내적 > 0 이면, 두 벡터 사이의 각도는 90°보다 작다.
- 내적 < 0 이면, 두 벡터 사이의 각도는 90°보다 크다.
- 내적 = 0 이면, 두 벡터 사이의 각도는 90°와 같다.

**노름(norm)**은 $$\Vert \mathbf{v} \Vert$$로 표기하고, 구하는 방법은 아래와 같다. 보다시피 벡터의 **노름(norm)**은 **자기 자신의 내적(inner product)의 제곱근**과 같다.  

$$\mathbf{v} = (v_{1}, v_{2}, \cdots, v_{n}) \to \Vert \mathbf{v} \Vert = \sqrt{\sum_{i=1}^{n}{v_{i}}^{2}}$$

**노름(norm)**을 구하는 공식을 `python`으로 구현하면 아래와 같다.  

```python
# norm of vector
def norm(a):
    n = len(a)
    res = sum(a[i] ** 2 for i in range(n)) ** 0.5

    return res
```

`numpy`를 사용하면 아래와 같다.  

```python
import numpy as np

a = np.array([4, 5, 3])

res = np.linalg.norm(a)
```

**노름(norm)**과 두 벡터 사이의 각도 $$\theta$$를 사용해 내적을 다음과 같이 표현할 수 있다.  

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = \Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert \cos \theta$$

### 코사인 유사도

노름(norm)을 다시 정리하면 **[코사인 유사도(cosine similarity)](https://ko.wikipedia.org/wiki/%EC%BD%94%EC%82%AC%EC%9D%B8_%EC%9C%A0%EC%82%AC%EB%8F%84)**를 다음과 같이 유도할 수 있다.  

$$\mathrm{cosine \ similarity} = S_{c}(\mathbf{u}, \mathbf{v}) = \cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert}$$

**코사인 유사도(cosine similarity)**는 내적 공간의 두 벡터 간의 유사한 정도를 벡터 간 각도의 코사인 값을 이용하여 측정한 것을 의미한다. 각도가 0°일 때의 코사인값은 1이며, 다른 모든 각도의 코사인값은 1보다 작다. 따라서 이 값은 벡터의 크기가 아닌 방향의 유사도를 판단하는 목적으로 사용되며, 두 벡터의 방향이 완전히 같을 경우 1, 90°의 각을 이룰 경우 0, 180°로 완전히 반대 방향인 경우 -1의 값을 갖는다. `python`으로 구현하면 아래와 같다.  

```python
# cosine similarity
def cos_similarity(a, b):
    inner = v_inner(a, b)
    norm_a = norm(a)
    norm_b = norm(b)

    res = inner / (norm_a * norm_b)

    return res
```

`scipy`를 활용해서 구하면 아래와 같다.  

```python
from scipy import spatial

a = [1, 2, 3]
b = [4, 5, 6]

res = 1 - spatial.distance.cosine(a, b)
```

## 2. 직교 공간

### 직교 공간, 정규 직교 벡터, 정규 직교 공간

**직교(orthogonal)**란 두 직선 또는 두 평면이 직각을 이루며 만나는 것을 의미한다. 직교하는 두 벡터의 길이가 각 1이면 **정규 직교(orthonomal)**한다고 말하고, 정규 직교 하는 벡터들을 **정규 직교 벡터(orthonormal vector)**, 정규 직교 벡터가 만드는 공간을 **정규 직교 공간(orthonormal space)**이라고 한다. 직교 벡터를 정규 직교 벡터로 **정규화(normalization)** 하는 방법은 아래와 같다.  

$$\mathbf{v}_{n} = \frac{1}{\Vert \mathbf{u}_{n} \Vert}\mathbf{u}_{n}$$

벡터의 정규화를 `python`으로 구현하면 아래와 같다.  

```python
# normalize vector
def normalize(a):
    n = len(a)
    v = [a[i] / norm(a) for i in range(n)]

    return v
```

`numpy`를 사용하면 아래와 같다.  

```python
import numpy as np

v = np.array([4, 5, 3])

normalized_v = v / np.linalg.norm(v)
```

### 정규 직교 벡터를 활용한 좌표 표현

벡터 공간 $$\mathbf{v}$$의 **정규 직교 기저(orthonormal basis)**를 $$S = \{ \mathbf{v}_{1}, \mathbf{v}_{2}, \cdots, \mathbf{v}_{n} \}$$이라 할 때, 벡터 공간 $$\mathbf{v}$$에 포함되는 임의의 벡터 $$\mathbf{a}$$는 아래와 같이 좌표축 $$\mathbf{v}_{n}$$과 벡터 $$\mathbf{a}$$의 $$n$$번째 축의 좌표 $$\langle \mathbf{a}, \mathbf{v}_{n} \rangle$$으로 표현할 수 있다.  

$$\mathbf{a} = \langle \mathbf{a}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} + \cdots + \langle \mathbf{a}, \mathbf{v}_{n} \rangle \mathbf{v}_{n}$$

### 직교 벡터를 활용한 좌표 표현

벡터 공간 내 $$U = \{ \mathbf{u}_{1}, \mathbf{u}_{2}, \cdots, \mathbf{u}_{n} \}$$가 **직교 기저(orthogonal basis)**라면 임의의 벡터 $$\mathbf{a}$$는 다음과 같이 표현할 수 있다.  

$$\mathbf{a} = \frac{\langle \mathbf{a}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}\mathbf{u}_{1} + \frac{\langle \mathbf{a}, \mathbf{u}_{2} \rangle}{\Vert \mathbf{u}_{2} \Vert^{2}}\mathbf{u}_{2} + \cdots + \frac{\langle \mathbf{a}, \mathbf{u}_{n} \rangle}{\Vert \mathbf{u}_{n} \Vert^{2}}\mathbf{u}_{n}$$

따라서 $$U = \{ \mathbf{u}_{1}, \mathbf{u}_{2}, \cdots, \mathbf{u}_{n} \}$$가 **직교 기저(orthogonal basis)**일 때, $$\mathbf{a}$$의 좌표를 다음과 같이 나타낼 수 있다.  

$$\mathbf{a} = \left\{ \frac{\langle \mathbf{a}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}, \frac{\langle \mathbf{a}, \mathbf{u}_{2} \rangle}{\Vert \mathbf{u}_{2} \Vert^{2}}, \cdots, \frac{\langle \mathbf{a}, \mathbf{u}_{n} \rangle}{\Vert \mathbf{u}_{n} \Vert^{2}} \right\}$$

## 3. 그람-슈미트 과정

### 정사영

**정사영(projection)**이란 한 벡터 공간에 속한 벡터를 부분 공간으로 수직으로 투영하는 것을 말하며, 벡터 $$\mathbf{u}$$를 벡터 $$\mathbf{v}$$에 정사영시키는 것을 아래와 같이 표기한다.  

$$\begin{align*}
proj_{\mathbf{v}} \mathbf{u} & = \Vert \mathbf{u} \Vert \vert \cos \theta \vert \frac{\mathbf{v}}{\Vert \mathbf{v} \Vert} = \Vert \mathbf{u} \Vert \frac{\mathbf{u} \cdot \mathbf{v}}{\Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert} \frac{\mathbf{v}}{\Vert \mathbf{v} \Vert} \\
\\
& = \frac{\mathbf{u} \cdot \mathbf{v}}{\Vert \mathbf{v} \Vert^{2}}\mathbf{v} = \frac{\langle \mathbf{u}, \mathbf{v} \rangle}{\Vert \mathbf{v} \Vert^{2}}\mathbf{v} = \frac{\langle \mathbf{u}, \mathbf{v} \rangle}{\langle \mathbf{v}, \mathbf{v} \rangle}\mathbf{v} \\
\end{align*}$$

`python`으로 구현하면 아래와 같다.  

```python
# projection
def proj(a, b):
    tmp = v_inner(a, b) / v_inner(b, b)
    res = v_smul(tmp, b)

    return res
```

`numpy`를 사용해서 구현하면 아래와 같다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([2, 4, 8])

res = (np.inner(a, b) / np.inner(b, b)) * b
```

벡터 $$\mathbf{u}$$를 벡터$$\mathbf{v}$$에 정사영 시킨 길이 $$\Vert proj_{\mathbf{v}} \mathbf{u} \Vert$$는 다음과 같다.  

$$\Vert proj_{\mathbf{v}} \mathbf{u} \Vert = \Vert \mathbf{u} \Vert \vert \cos \theta \vert$$

정사영을 이용해 내적을 정리하면, 벡터 $$\mathbf{u}$$와 벡터 $$\mathbf{v}$$의 내적이란 벡터 $$\mathbf{u}$$를 벡터 $$\mathbf{v}$$에 정사영시킨 벡터의 길이, 즉 $$\Vert \mathbf{u} \Vert \vert \cos \theta \vert$$와 기존 벡터 $$\mathbf{v}$$의 길이인 $$\Vert \mathbf{v} \Vert$$의 곱과 같다.  

$$\begin{align*}
\langle \mathbf{u}, \mathbf{v} \rangle & = \Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert \cos \theta \\
\\
& = (\Vert \mathbf{v} \Vert) \times (\Vert \mathbf{u} \Vert \cos \theta) \\
\\
& = (length \ of \ vector \ \mathbf{v}) \times (length \ of \ vector \ proj_{\mathbf{v}}\mathbf{u}) \\
\end{align*}$$

### 정사영 정리

**부분 공간에 대한 정사영 정리(projection theorem for subspaces)**의 내용은 아래와 같다.  

- 벡터 공간 $$S$$의 부분 공간 $$W$$가 존재할 때 벡터 공간 $$S$$에 속하는 임의의 벡터 $$\mathbf{a}$$는 다음과 같이 표현 가능하다.  

$$\mathbf{a} = \mathbf{w}_{1} + \mathbf{w}_{2}$$

- 이 때, $$\mathbf{w}_{1}$$은 부분 공간 $$W$$에 속하는 벡터이며 $$\mathbf{w}_{2}$$는 부분 공간의 직교 공간인 $$W^{\bot}$$에 속하는 벡터다.  

### 직교 정사영

벡터 공간 $$S$$의 부분 공간 $$W$$에서, 부분 공간 $$W$$의  **직교 기저(orthogonal basis)**가 $$U = \{ \mathbf{u}_{1}, \mathbf{u}_{2}, \cdots, \mathbf{u}_{n} \}$$일 때, $$\mathbf{a}$$가 전체 벡터 공간 $$S$$의 임의의 벡터이면 $$\mathbf{a}$$를 $$W$$로 정사영 시킨 벡터는 다음과 같다.  


$$proj_{\mathbf{w}} \mathbf{a} = \frac{\langle \mathbf{a}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}\mathbf{u}_{1} + \frac{\langle \mathbf{a}, \mathbf{u}_{2} \rangle}{\Vert \mathbf{u}_{2} \Vert^{2}}\mathbf{u}_{2} + \cdots + \frac{\langle \mathbf{a}, \mathbf{u}_{n} \rangle}{\Vert \mathbf{u}_{n} \Vert^{2}}\mathbf{u}_{n}$$

따라서 $$proj_{\mathbf{w}} \mathbf{a}$$의 좌표는 다음과 같다.  

$$proj_{\mathbf{w}} \mathbf{a} = \left\{ \frac{\langle \mathbf{a}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}, \frac{\langle \mathbf{a}, \mathbf{u}_{2} \rangle}{\Vert \mathbf{u}_{2} \Vert^{2}}, \cdots, \frac{\langle \mathbf{a}, \mathbf{u}_{n} \rangle}{\Vert \mathbf{u}_{n} \Vert^{2}} \right\}$$

벡터 공간 $$S$$의 부분 공간 $$W$$에서, 부분 공간 $$W$$의 **정규 직교 기저(orthonormal basis)**가 $$\{ \mathbf{v}_{1}, \mathbf{v}_{2}, \cdots, \mathbf{v}_{n} \}$$일 때, $$\mathbf{a}$$가 전체 벡터 공간 $$S$$의 임의의 벡터이면 $$\mathbf{a}$$를 $$W$$로 정사영시킨 벡터는 다음과 같다.  

$$proj_{\mathbf{w}} \mathbf{a} = \langle \mathbf{a}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} + \cdots + \langle \mathbf{a}, \mathbf{v}_{n} \rangle \mathbf{v}_{n}$$

### 그람-슈미트 과정

**그람-슈미트 과정(Gram-Schmidt Process)**은 기저(basis) 벡터 $$\{ \mathbf{s}_{1}, \mathbf{s}_{2}, \cdots, \mathbf{s}_{n} \}$$를 직교 기저(orthogonal basis) 벡터 $$\{ \mathbf{u}_{1}, \mathbf{u}_{2}, \cdots, \mathbf{u}_{n} \}$$로 변환하는 과정을 의미한다. 그람-슈미트 과정은 다음과 같은 단계로 진행 된다.  

- 1) 기존 기저 벡터 $$\mathbf{s}_{1}$$을 통해 새로운 직교 기저 벡터 $$\mathbf{u}_{1}$$을 정의한다.

$$\mathbf{u}_{1} = \mathbf{s}_{1}$$

- 2) 첫 번째 단계에서 만든 직교 기저 벡터 $$\mathbf{u}_{1}$$를 통해 두 번째 직교 기저 벡터 $$\mathbf{u}_{2}$$를 생성한다.

$$\mathbf{u}_{2} = \mathbf{s}_{2} - \frac{\langle \mathbf{s}_{2}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}\mathbf{u}_{1}$$

- n) 같은 방식으로 n 번째 직교 기저 벡터까지 구한다.

$$\mathbf{u}_{n} = \mathbf{s}_{n} - \frac{\langle \mathbf{s}_{n}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}\mathbf{u}_{1} - \frac{\langle \mathbf{s}_{n}, \mathbf{u}_{2} \rangle}{\Vert \mathbf{u}_{2} \Vert^{2}}\mathbf{u}_{2} - \cdots  - \frac{\langle \mathbf{s}_{n}, \mathbf{u}_{n-1} \rangle}{\Vert \mathbf{u}_{n-1} \Vert^{2}}\mathbf{u}_{n-1}$$

앞서 구현한 함수들을 바탕으로 `python`으로 구현하면 아래와 같다.  

```python
# Gram-Schmidt Process
def gram_schmidt(s):
    n = len(s)
    m = len(s[0])
    res = []

    for i in range(n):
        if i == 0:
            res.append(s[i])

        else:
            tmp_list = [proj(s[i], res[j]) for j in range(i)]

            tmp = v_zeros(m)
            for k in range(len(tmp_list)):
                tmp = v_add(tmp, tmp_list[k])
            tmp = v_sub(s[i], tmp)
            res.append(tmp)

    return res
```

## 4. QR분해

### QR분해의 기초

행렬 $$A$$의 **열 벡터** $$\mathbf{a}_i$$끼리 모두 선형 독립일 때, 행렬 $$A$$는 아래와 같이 정규 직교 벡터(orthonormal vector) $$n \times p$$ 행렬 $$Q$$와 가역 상 삼각행렬(invertible upper triangular matrix) $$R$$로 분해할 수 있다.  

$$A = QR$$

이러한 **QR분해(QR decomposition, QR factorization)**는 크기가 큰 행렬의 고유값을 구할 때 유용하게 사용된다.  
위의 [정규 직교 벡터를 활용한 좌표 표현](#정규-직교-벡터를-활용한-좌표-표현)을 참고하면, 행렬 $$A$$의 각 열 벡터는 아래와 같이 나타낼 수 있다.  

$$\begin{align*}
\mathbf{a}_{1} = \langle \mathbf{a}_{1}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}_{1}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} + & \cdots + \langle \mathbf{a}_{1}, \mathbf{v}_{n} \rangle \mathbf{v}_{n} \\
\mathbf{a}_{2} = \langle \mathbf{a}_{2}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}_{2}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} + & \cdots + \langle \mathbf{a}_{2}, \mathbf{v}_{n} \rangle \mathbf{v}_{n} \\
& \vdots \\
\mathbf{a}_{n} = \langle \mathbf{a}_{n}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}_{n}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} + & \cdots + \langle \mathbf{a}_{n}, \mathbf{v}_{n} \rangle \mathbf{v}_{n} \\
\end{align*}$$

따라서 행렬 $$A$$는 다음과 같이 정리할 수 있다.  

$$(\mathbf{a}_{1} \quad \mathbf{a}_{2} \quad \cdots \quad \mathbf{a}_{n}) = (\mathbf{v}_{1} \quad \mathbf{v}_{2} \quad \cdots \quad \mathbf{v}_{n})\begin{pmatrix}
\langle \mathbf{a}_{1}, \mathbf{v}_{1} \rangle & \langle \mathbf{a}_{2}, \mathbf{v}_{1} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{1} \rangle \\
\langle \mathbf{a}_{1}, \mathbf{v}_{2} \rangle & \langle \mathbf{a}_{2}, \mathbf{v}_{2} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{2} \rangle \\
\vdots & \vdots & \ddots & \vdots \\
\langle \mathbf{a}_{1}, \mathbf{v}_{n} \rangle & \langle \mathbf{a}_{2}, \mathbf{v}_{n} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{n} \rangle \\
\end{pmatrix}$$

그람-슈미트 과정에 의해 정규 직교 벡터 $$\mathbf{v}_{j}$$는 벡터 $$\mathbf{a}_{1}, \mathbf{a}_{2}, \cdots, \mathbf{a}_{j-1}$$과 직교하기 때문에, 정규 직교 벡터 $$\mathbf{v}_{j}$$와 각 벡터 $$\mathbf{a}_{1}, \mathbf{a}_{2}, \cdots, \mathbf{a}_{j-1}$$의 내적값은 $$0$$이다. 이를 바탕으로 $$A = QR$$을 다시 정리하여 $$Q$$와 $$R$$을 분해하면 다음과 같다.  

$$\begin{align*} \\
& A = QR \\
\\
& Q = (\mathbf{v}_{1} \quad \mathbf{v}_{2} \quad \cdots \quad \mathbf{v}_{n}) \\
\\
& R = \begin{pmatrix}\langle \mathbf{a}_{1}, \mathbf{v}_{1} \rangle & \langle \mathbf{a}_{2}, \mathbf{v}_{1} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{1} \rangle \\
0 & \langle \mathbf{a}_{2}, \mathbf{v}_{2} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{2} \rangle \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{n} \rangle \\
\end{pmatrix}
\end{align*}$$

### 그람-슈미트 과정을 이용한 QR분해

그람-슈미트 과정을 이용한 QR분해를 `python`으로 구현하면 아래와 같다.  

```python
# QR decomposition, QR factorization with Gram-Schmidt Process
def qr_gramschmidt(a):
    mat = mat_transpose(a)
    n = len(mat)
    tmp = gram_schmidt(mat)

    q_tmp = [normalize(i) for i in tmp]
    q = mat_transpose(q_tmp)

    r = [[0 if i > j else v_inner(mat[j], q_tmp[i]) for j in range(n)] for i in range(n)]

    return q, r
```

### 하우스홀더 방법을 이용한 QR분해

[하우스홀더 행렬](/maths/2022-05-19-linear_algebra_02/#8-하우스홀더-행렬)을 사용해서 구하는 방법도 있다. 그람-슈미트 방법과는 달리 부동소수점 연산에서도 오차가 누적되지 않기 때문에, 실제로 더 많이 활용된다.  



### numpy, scipy 활용

`numpy`를 활용한 QR분해는 아래와 같다.  

```python
import numpy as np

s = np.array([[1, 0, 1], [0, 1, 1], [1, 2, 0]])

q, r = np.linalg.qr(s)
```

`scipy`를 활용한 QR분해는 아래와 같다.  

```python
from scipy import linalg

s = np.array([[1, 0, 1], [0, 1, 1], [1, 2, 0]])

q, r = linalg.qr(s)
```

직접 구현한 함수와 부호가 반대로 나오는데, 바뀐 부호는 $$Q$$와 $$R$$에 공통적으로 적용되기 때문에 최종 결과는 동일하다.  

---
## Reference
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)
- [위키피디아: 코사인 유사도](https://ko.wikipedia.org/wiki/%EC%BD%94%EC%82%AC%EC%9D%B8_%EC%9C%A0%EC%82%AC%EB%8F%84)([영문](https://en.wikipedia.org/wiki/Cosine_similarity))
- [위키피디아: QR 분해](https://ko.wikipedia.org/wiki/QR_%EB%B6%84%ED%95%B4)([영문](https://en.wikipedia.org/wiki/QR_decomposition))