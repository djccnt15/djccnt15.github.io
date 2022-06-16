---
published: true
layout: post

title: '[선형대수] 07. 내적'
description: >
    내적, norm, 코사인 유사도, 직교 공간
hide_description: false
image:
    path: /assets/img/posts/linear_algebra_07.png
related_posts:
    - _posts/maths/2022-05-29-linear_algebra_06.md
    - _posts/maths/2022-06-06-linear_algebra_08.md

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

[벡터 공간](/maths/2022-05-29-linear_algebra_06/#1-벡터-공간)의 설명에서 언급했듯이 **내적(inner product)**이 주어진 벡터 공간을 **내적 공간(inner product space)**이라고 부르는데, 벡터의 **내적(inner product)**은 벡터를 방향이 일치하는 만큼만 곱한다는 뜻으로 아래와 같이 표기한다.  

$$\mathbf{u}
= \begin{pmatrix}
u_{1} \\
\vdots \\
u_{n} \\
\end{pmatrix}, \quad
\mathbf{v}
= \begin{pmatrix}
v_{1} \\
\vdots \\
v_{n} \\
\end{pmatrix}$$

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = \mathbf{u}^{T} \mathbf{v} = \sum_{i=1}^{n}u_{i}v_{i} = \vert \mathbf{u} \vert \vert \mathbf{v} \vert \cos \theta$$

벡터의 내적을 `python`으로 구현하면 아래와 같다. [하우스홀더 행렬](/maths/2022-05-19-linear_algebra_02/#8-하우스홀더-행렬) 공식에서 이미 구현한 바 있다.  

```python
# inner product of vector
def v_inner(a, b):
    res = sum(i * j for i, j in zip(a, b))

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

내적을 사용하면 벡터 사이의 각도를 추정할 수 있다.  
우선 벡터의 내적과 벡터 사이의 각도의 관계는 아래와 같다.  

- 내적 > 0 이면, 두 벡터 사이의 각도는 90°보다 작다.
- 내적 < 0 이면, 두 벡터 사이의 각도는 90°보다 크다.
- 내적 = 0 이면, 두 벡터 사이의 각도는 90°와 같다.

### 노름(norm)

**노름(norm)**은 벡터의 크기 또는 길이를 말하는데, $$\Vert \mathbf{v} \Vert$$로 표기하고, 구하는 방법은 아래와 같다. 보다시피 벡터의 **노름(norm)**은 **자기 자신의 내적(inner product)의 제곱근**과 같다.  

$$\mathbf{v} = (v_{1}, v_{2}, \cdots, v_{n}) \to \Vert \mathbf{v} \Vert = \sqrt{\sum_{i=1}^{n}{v_{i}}^{2}}$$

**노름(norm)**을 구하는 공식을 `python`으로 구현하면 아래와 같다.  

```python
# norm of vector
def norm(a):
    res = sum(i ** 2 for i in a) ** 0.5

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

## 2. 코사인 유사도

**[코사인 유사도(cosine similarity)](https://ko.wikipedia.org/wiki/%EC%BD%94%EC%82%AC%EC%9D%B8_%EC%9C%A0%EC%82%AC%EB%8F%84)**는 내적 공간의 두 벡터 간의 유사한 정도를 벡터 간 각도의 코사인 값을 이용하여 측정한 것을 의미하는데, 노름(norm)을 정리하면 **코사인 유사도(cosine similarity)**를 다음과 같이 유도할 수 있다.  

$$\mathrm{cosine \ similarity} = S_{c}(\mathbf{u}, \mathbf{v}) = \cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert}$$

각도가 0°일 때의 코사인 값은 1이며, 다른 모든 각도의 코사인 값은 1보다 작다. 따라서 이 값은 벡터의 크기가 아닌 방향의 유사도를 판단하는 목적으로 사용되며, 두 벡터의 방향이 완전히 같을 경우 1, 90°의 각을 이룰 경우 0, 180°로 완전히 반대 방향인 경우 -1의 값을 갖는다. `python`으로 구현하면 아래와 같다.  

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

## 3. 직교 공간

### 직교, 정규 직교 벡터, 정규 직교 공간, 정규화

**직교(orthogonal)**란 두 직선 또는 두 평면이 직각을 이루며 만나는 것을 의미한다. 직교하는 두 벡터의 길이가 각 1([단위 벡터](/maths/2022-05-29-linear_algebra_06/#단위-벡터))이면 **정규 직교(orthonomal)**한다고 말하고, 정규 직교 하는 벡터들을 **정규 직교 벡터(orthonormal vector)**, 정규 직교 벡터가 만드는 공간을 **정규 직교 공간(orthonormal space)**이라고 한다. 직교 벡터를 정규 직교 벡터로 **정규화(normalization)** 하는 방법은 아래와 같다.  

$$\mathbf{v}_{n} = \frac{\mathbf{u}_{n}}{\Vert \mathbf{u}_{n} \Vert}$$

벡터의 정규화를 `python`으로 구현하면 아래와 같다.  

```python
# normalize vector
def normalize(a):
    n = [v / norm(a) for v in a]

    return n
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

---
## Reference
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)
- [위키피디아: 코사인 유사도](https://ko.wikipedia.org/wiki/%EC%BD%94%EC%82%AC%EC%9D%B8_%EC%9C%A0%EC%82%AC%EB%8F%84)([영문](https://en.wikipedia.org/wiki/Cosine_similarity))