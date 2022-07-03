---
published: true
layout: post

title: '[선형대수] 07. 내적'
description: >
    내적, norm, 코사인 유사도
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

<h4>Linear Algebra Series</h4>
<div class="taxonomy__index">
    <ul class="description">
        <li><a href="/maths/2022-05-01-linear_algebra_01/">01. 선형대수의 기초</a></li>
        <li><a href="/maths/2022-05-19-linear_algebra_02/">02. 다양한 행렬</a></li>
        <li><a href="/maths/2022-05-22-linear_algebra_03/">03. 선형 시스템</a></li>
        <li><a href="/maths/2022-05-23-linear_algebra_04/">04. 행렬식</a></li>
        <li><a href="/maths/2022-05-28-linear_algebra_05/">05. 역행렬</a></li>
        <li><a href="/maths/2022-05-29-linear_algebra_06/">06. 기저와 차원</a></li>
        <li><a href="/maths/2022-06-05-linear_algebra_07/">07. 내적</a></li>
        <li><a href="/maths/2022-06-06-linear_algebra_08/">08. 직교공간과 QR 분해</a></li>
        <li><a href="/maths/2022-06-09-linear_algebra_09/">09. 다양한 곱 연산</a></li>
        <li><a href="/maths/2022-06-11-linear_algebra_10/">10. 고유값과 고유벡터</a></li>
        <li><a href="/maths/2022-06-12-linear_algebra_11/">11. 직교 행렬</a></li>
        <li><a href="/maths/2022-06-13-linear_algebra_12/">12. 행렬의 대각화</a></li>
        <li><a href="/maths/2022-06-19-linear_algebra_13/">13. LU 분해</a></li>
    </ul>
</div>

## 1. 내적

### 내적의 개념

[벡터 공간](/maths/2022-05-29-linear_algebra_06/#1-벡터-공간)의 설명에서 언급했듯이 **내적(inner product)**이 주어진 벡터 공간을 **내적 공간(inner product space)**이라고 부르는데, 벡터의 **내적(inner product)**은 벡터를 방향이 일치하는 만큼만 곱한다는 뜻으로 아래와 같이 표기한다.  

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

내적을 사용하면 벡터 사이의 각도를 추정할 수 있다. 벡터의 내적과 벡터 사이의 각도의 관계는 아래와 같다.  

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

**[코사인 유사도(cosine similarity)](https://ko.wikipedia.org/wiki/%EC%BD%94%EC%82%AC%EC%9D%B8_%EC%9C%A0%EC%82%AC%EB%8F%84)**는 내적 공간의 두 벡터 간의 유사한 정도를 벡터 간 각도의 코사인 값을 이용하여 측정한 것을 의미하는데, [노름(norm)](#노름norm)을 통해 정리하면 **코사인 유사도(cosine similarity)**를 다음과 같이 유도할 수 있다.  

$$\mathrm{cosine \ similarity} = S_{c}(\mathbf{u}, \mathbf{v}) = \cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert}$$

코사인 유사도는 벡터의 크기를 제외한 방향의 유사도를 판단하는 목적으로 사용된다. 코사인 유사도와 각도의 관계는 아래와 같다.  

- $$S_{c}(\mathbf{u}, \mathbf{v}) = 1$$ 일 때, 두 벡터의 방향이 같다.
- $$S_{c}(\mathbf{u}, \mathbf{v}) = 0$$ 일 때, 두 벡터의 각은 90°
- $$S_{c}(\mathbf{u}, \mathbf{v}) = -1$$ 일 때, 두 벡터의 각은 180°

코사인 유사도를 구하는 함수를 `python`으로 구현하면 아래와 같다.  

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

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/maths)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [위키피디아: 코사인 유사도](https://ko.wikipedia.org/wiki/%EC%BD%94%EC%82%AC%EC%9D%B8_%EC%9C%A0%EC%82%AC%EB%8F%84)([영문](https://en.wikipedia.org/wiki/Cosine_similarity))