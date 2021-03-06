---
published: true
layout: post

title: '[선형대수] 04. 행렬식'
description: >
    행렬식, 행렬식 계산, 행렬식의 성질
hide_description: false
image:
    path: /assets/img/posts/linear_algebra_04.png
related_posts:
    - _posts/maths/2022-05-22-linear_algebra_03.md
    - _posts/maths/2022-05-28-linear_algebra_05.md

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

<h4>Linear Algebra Series</h4>
<div class="taxonomy__index">
    <ol class="description">
        <li><a href="/maths/linear_algebra_01/">선형대수의 기초</a></li>
        <li><a href="/maths/linear_algebra_02/">다양한 행렬</a></li>
        <li><a href="/maths/linear_algebra_03/">선형 시스템</a></li>
        <li><a href="/maths/linear_algebra_04/">행렬식</a></li>
        <li><a href="/maths/linear_algebra_05/">역행렬</a></li>
        <li><a href="/maths/linear_algebra_06/">기저와 차원</a></li>
        <li><a href="/maths/linear_algebra_07/">내적</a></li>
        <li><a href="/maths/linear_algebra_08/">직교공간과 QR 분해</a></li>
        <li><a href="/maths/linear_algebra_09/">다양한 곱 연산</a></li>
        <li><a href="/maths/linear_algebra_10/">고유값과 고유벡터</a></li>
        <li><a href="/maths/linear_algebra_11/">직교 행렬</a></li>
        <li><a href="/maths/linear_algebra_12/">행렬의 대각화</a></li>
        <li><a href="/maths/linear_algebra_13/">LU 분해</a></li>
    </ol>
</div>

## 1. 행렬식

**행렬식(determinant)**은 정사각 행렬의 특성을 하나의 숫자로 표현하는 방법 중 하나로, **정사각 행렬(square matrix)**을 스칼라로 변환하는 함수라고 할 수 있으며, 행렬식의 절대값은 해당 행렬이 단위 공간의 몇 배의 부피인지를 의미한다.  

## 2. 행렬식 계산

행렬 $$A$$의 행렬식은 $$\det A$$ 또는 $$\begin{vmatrix}A\end{vmatrix}$$라고 표기하며, $$2 \times 2$$ 행렬의 경우 아래와 같이 간단하게 구할 수 있다.  

$$\det A = |A| = \begin{vmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
\end{vmatrix}
= a_{11}a_{22} - a_{12}a_{21}$$

`python`으로 구현하면 아래와 같다.  

```python
# determinant of 2 by 2 matrix
def determinant(a):
    det = (a[0][0] * a[1][1]) - (a[0][1] * a[1][0])

    return det
```

아래와 같이 행렬식의 절대값 기호가 두 겹인 경우 행렬식의 절대값을 구하라는 뜻이다.  

$$\Vert A \Vert = \begin{Vmatrix}
a & b \\
c & d \\
\end{Vmatrix}
= |ad-cd|$$

`numpy`를 사용해서 행렬식을 구하는 방법은 아래와 같다.

```python
import numpy as np

a = np.array([[5, 2, -3, 4], [5, 9, 7, 8], [11, 10, 6, 12], [13, 14, 15, 16]])

det_A = np.linalg.det(a)
```

### 여인수 전개

$$3 \times 3$$이상의 행렬일 경우, 행렬식의 계산이 조금 복잡해지는데, **소행렬식(minor of entry $$a_{ij}, M_{ij}$$)**과 여인수**(cofactor of entry $$a_{ij}$$)**의 개념을 알아야 한다.  

- 소행렬식 $$M_{ij}$$ : 행렬의 $$i$$행과 $$j$$열을 제외하고 구성된 부분 행렬의 행렬식을 의미
- 여인수 $$C_{ij}$$ : $$C_{ij} = (-1)^{i+j}M_{ij}$$

아래와 같이 행렬의 행렬식을 정의하여 계산하는 방법을 **여인수 전개(cofactor expansion)**라고 한다. 라플라스가 고안하였기 때문에 **라플라스 전개(Laplace Expansion)**라고도 한다.  

$$\det A = \sum_{i=1}^n a_{ij}C_{ij} = \sum_{i=1}^n(-1)^{i+j}a_{ij}M_{ij}$$

$$n \times n$$행렬의 여인수 전개는 아래와 같이 재귀적이기 때문에, 구현을 위해선 **재귀함수**를 사용해야 한다.  

$$\begin{align*}
\det A & = \sum_{i=1}^n(-1)^{i+j}a_{ij}M_{ij} \\
& = \sum_{i=1}^n(-1)^{i+j}a_{ij} \det B \\
& = \sum_{i=1}^n(-1)^{i+j}a_{ij} (\sum_{i=1}^n(-1)^{i+j}b_{ij}M_{ij}) \\
\end{align*}$$

여인수 전개를 통한 행렬식의 계산은 재귀함수의 특성상 **시간 복잡도**에 문제가 발생하기 때문에 실제 계산에 사용하지는 않는 것을 권장한다고 한다.  

### 수반 행렬

행렬 $$A$$가 있을 때, 행렬 $$A$$의 여인수 행렬 $$C_{ij}$$의 전치 행렬을 행렬 $$A$$의 **수반 행렬(adjoint of A)**이라고 부르고 아래와 같이 표기한다.  

$$\mathrm{adj} A = C_{ij} = (-1)^{i+j}M_{ij}$$

## 3. 행렬식의 성질

### 특이한 행렬의 행렬식

[삼각 행렬](/maths/linear_algebra_02/#6-삼각-행렬), [대각 행렬](/maths/linear_algebra_02/#3-대각-행렬)의 행렬식은 주 대각 원소의 곱과 같다.  

$$\det A = a_{11} a_{22} \cdots a_{nn}$$

[전치 행렬](/maths/linear_algebra_02/#1-전치-행렬)의 행렬식: 행렬 $$A$$가 정사각 행렬일 경우 행렬 $$A$$와 그 전치 행렬 $$A^{T}$$의 행렬식은 동일하다.  

$$\det A = \det A^{T}$$

특정 행 또는 열의 원소가 모두 0일 때 행렬식은 0이다. 모든 원소가 0인 행 또는 열을 기준으로 여인수를 구하면 모두 0이기 때문이다.  

### 행렬의 기본 행 연산과 행렬식

[기본 행 연산](/maths/linear_algebra_01/#기본-행-연산)에 의한 행렬식의 변경은 아래와 같다.  

- 한 행에 영이 아닌 상수를 모두 곱한다.

$$k \det A \to k \begin{vmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{vmatrix}
= \begin{vmatrix}
ka_{11} & ka_{12} & ka_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{vmatrix}$$

행렬 $$A$$가 $$n \times n$$ 행렬일 때, 

$$\det kA = k^{n}\det A \to \begin{vmatrix}
ka_{11} & ka_{12} & ka_{13} \\
ka_{21} & ka_{22} & ka_{23} \\
ka_{31} & ka_{32} & ka_{33} \\
\end{vmatrix}
= k^{3}\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{vmatrix}$$

- 두 행을 교환한다.

$$-\det A \to -\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{vmatrix}
= \begin{vmatrix}
a_{21} & a_{22} & a_{23} \\
a_{11} & a_{12} & a_{13} \\
a_{31} & a_{32} & a_{33} \\
\end{vmatrix}$$

행렬 $$A$$의 1행과 2행의 위치를 바꾸면 기존 행렬의 행렬식에서 부호를 바꾼 값과 동일하다.  

- 한 행의 배수를 다른 행에 더한다.

$$\det A \to \begin{vmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{vmatrix}
= \begin{vmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} + ka_{11} & a_{32} + ka_{12} & a_{33} + ka_{13} \\
\end{vmatrix}$$

행렬 $$A$$의 1행에 $$k$$배를 한 후 3행에 더해서 만든 행렬 $$B$$의 행렬식 값은 기존 행렬 $$A$$의 행렬식 값과 동일하다.  

### 비례하는 행과 열에 대한 행렬식

특정 행, 열이 비례하는 관계가 존재하는 행렬의 행렬식은 0이다.  

### 행렬 곱과 행렬식

정사각 행렬 $$A$$와 $$B$$의 행렬 곱의 행렬식은 각각의 행렬의 행렬식을 곱한 값과 같다.

$$\det AB = \det A \det B$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/maths)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))