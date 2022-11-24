---
published: true
layout: post
title: '[선형대수] 07. 내적과 norm'
description: >
    내적, norm, 코사인 유사도
categories: [Mathematics]
tags: [linear algebra]
image:
    path: /assets/img/posts/linear_algebra_07.png
related_posts:
    - _posts/mathematics/2022-05-29-linear_algebra_06.md
    - _posts/mathematics/2022-06-06-linear_algebra_08.md
---
* toc
{:toc}

{% include series_linalg.html %}

## 1. 내적

### 내적의 개념

[벡터 공간](/mathematics/linear_algebra_06/#1-벡터-공간)의 설명에서 언급했듯이 **내적(inner product)**이 주어진 벡터 공간을 **내적 공간(inner product space)**이라고 부르는데, 벡터의 **내적(inner product)**은 벡터를 방향이 일치하는 만큼만 곱한다는 뜻으로 아래와 같이 표기한다.  

$$\mathbf{u}
= \begin{bmatrix}
u_{1} \\
\vdots \\
u_{n} \\
\end{bmatrix}, \quad
\mathbf{v}
= \begin{bmatrix}
v_{1} \\
\vdots \\
v_{n} \\
\end{bmatrix}$$

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = \mathbf{u}^{T} \mathbf{v} = \sum_{i=1}^{n}u_{i}v_{i} = \vert \mathbf{u} \vert \vert \mathbf{v} \vert \cos \theta$$

벡터의 내적을 Python으로 구현하면 아래와 같다. [하우스홀더 행렬](/mathematics/linear_algebra_02/#8-하우스홀더-행렬) 공식에서 이미 구현한 바 있다.  

```python
scalar = int | float
vector = list[scalar]


def v_inner(a: vector, b: vector) -> scalar:
    """
    returns inner product of 2 vectors
    """

    res: scalar = sum(v * u for v, u in zip(a, b))
    return res
```

NumPy를 사용하면 아래와 같다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

inner_product = np.inner(a, b)
```

### 내적의 성질

내적을 사용하면 벡터 사이의 각도를 추정할 수 있다. 벡터의 내적과 벡터 사이의 각도의 관계는 아래와 같다.  

- 내적 > 0 이면, 두 벡터 사이의 각도는 90°보다 작다.
- 내적 < 0 이면, 두 벡터 사이의 각도는 90°보다 크다.
- 내적 = 0 이면, 두 벡터 사이의 각도는 90°와 같다.

## 2. 노름(norm)

**노름(norm)**은 벡터의 크기 또는 길이를 말하며 $$\Vert \mathbf{v} \Vert$$로 표기한다. 내적이 정의되면 노름(norm)은 자기 자신의 [내적(inner product)](/mathematics/linear_algebra_07/#1-내적)의 제곱근으로 정의할 수 있다. (그러나 노름(norm)이 있다고 해서 그에 자연스럽게 대응되는 내적이 항상 존재하는 것은 아니다.)  

벡터 $$\mathbf{v}$$의 $$p$$차 노름(norm)은 아래와 같이 정의된다.  

$$\Vert \mathbf{v} \Vert_{p} = \left( \sum_{i=1}^{n} \vert v_{i} \vert^{p} \right)^{1 \over p}, \quad p \geqq 1$$

### Euclidean norm

노름(norm)의 정의에서 $$p = 2$$이면 $$l_{2}$$ **노름(norm)**, 또는 **유클리드 노름(Euclidean norm)**이라고 부른다. 유클리드 노름(Euclidean norm)은 거리 개념에서 일반적으로 많이 사용하는 점과 점 사이의 직선거리를 말하며 구하는 방법은 아래와 같다.  

$$\mathbf{v} = (v_{1}, v_{2}, \cdots, v_{n}) \to \Vert \mathbf{v} \Vert_{2} = \sqrt{\sum_{i=1}^{n}{v_{i}}^{2}}$$

유클리드 노름(Euclidean norm)은 머신러닝/통계학에서는 $$l_{2}$$ 정규화(L2 Regularization)에 사용되며, 유클리드 노름(Euclidean norm)을 구하는 함수를 Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]


def norm(a: vector) -> scalar:
    """
    returns euclidean norm of vector
    """

    res: scalar = sum(i ** 2 for i in a) ** 0.5
    return res
```

NumPy를 사용하면 아래와 같다.  

```python
import numpy as np

a = np.array([4, 5, 3])

res = np.linalg.norm(a)
```

$$l_{2}$$ 노름(norm)과 두 벡터 사이의 각도 $$\theta$$를 사용해 내적을 다음과 같이 표현할 수 있다.  

$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = \Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert \cos \theta$$

### Manhattan norm

노름(norm)의 정의에서 $$p = 1$$이면 $$l_{1}$$ **노름(norm)**, 또는 **맨해튼 노름(Manhattan norm)**이라고 부른다. **택시 노름(Taxicab norm)**이라고 부르기도 한다. 맨해튼 노름(Manhattan norm)을 구하는 방법은 아래와 같다.  

$$\mathbf{v} = (v_{1}, v_{2}, \cdots, v_{n}) \to \Vert \mathbf{v} \Vert_{1} = \sum_{i=1}^{n} \vert v_{i} \vert$$

맨해튼 노름(Manhattan norm)은 머신러닝/통계학에서는 $$l_{1}$$ 정규화(L1 Regularization)에 사용되며, 맨해튼 노름(Manhattan norm)을 구하는 함수를 Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]


def norm_manhattan(a: vector) -> scalar:
    """
    returns manhattan norm of vector
    """

    res = sum(abs(i) for i in a)
    return res
```

NumPy를 사용하면 아래와 같다.  

```python
import numpy as np

a = np.array([4, 5, 3])

res = np.linalg.norm(x=a, ord=1)
```

### Maximum norm

$$p$$차 노름(norm)의 정의에서 p가 무한대로 가면, 그 값이 해당 벡터의 원소 중 가장 큰 값에 수렴하며 이를 최대값 노름(Maximum norm), 또는 상한 노름이라고 부른다.  

$$\mathbf{v} = (v_{1}, v_{2}, \cdots, v_{n}) \to \Vert \mathbf{v} \Vert_{\infty} = max(v_{1}, v_{2}, \cdots, v_{n})$$

## 3. 코사인 유사도

**[코사인 유사도(cosine similarity)](https://ko.wikipedia.org/wiki/%EC%BD%94%EC%82%AC%EC%9D%B8_%EC%9C%A0%EC%82%AC%EB%8F%84)**는 내적 공간의 두 벡터 간의 유사한 정도를 벡터 간 각도의 코사인 값을 이용하여 측정한 것을 의미하는데, [노름(norm)](#2-노름norm)을 통해 정리하면 **코사인 유사도(cosine similarity)**를 다음과 같이 유도할 수 있다.  

$$\mathrm{cosine \ similarity} = S_{c}(\mathbf{u}, \mathbf{v}) = \cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert}$$

코사인 유사도는 벡터의 크기를 제외한 방향의 유사도를 판단하는 목적으로 사용된다. 코사인 유사도와 각도의 관계는 아래와 같다.  

- $$S_{c}(\mathbf{u}, \mathbf{v}) = 1$$ 일 때, 두 벡터의 방향이 같다.
- $$S_{c}(\mathbf{u}, \mathbf{v}) = 0$$ 일 때, 두 벡터의 각은 90°
- $$S_{c}(\mathbf{u}, \mathbf{v}) = -1$$ 일 때, 두 벡터의 각은 180°

코사인 유사도를 구하는 함수를 Python으로 구현하면 아래와 같다.  

```python
scalar = int | float
vector = list[scalar]


def cos_similarity(a: vector, b: vector) -> scalar:
    """
    returns cosine similarity of 2 vectors
    """

    res: scalar = v_inner(a, b) / (norm(a) * norm(b))
    return res
```

SciPy를 활용해서 구하면 아래와 같다.  

```python
from scipy import spatial

a = [1, 2, 3]
b = [4, 5, 6]

res = 1 - spatial.distance.cosine(a, b)
```

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [위키피디아: 코사인 유사도](https://ko.wikipedia.org/wiki/%EC%BD%94%EC%82%AC%EC%9D%B8_%EC%9C%A0%EC%82%AC%EB%8F%84)([영문](https://en.wikipedia.org/wiki/Cosine_similarity))