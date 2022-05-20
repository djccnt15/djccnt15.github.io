---
published: false
layout: post

title: 선형대수 02. 다양한 행렬
description: >
  선형대수: 전치/대칭/대각/단위/영/삼각/토플리츠/이중대각/하우스홀더 행렬
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_02.png
related_posts:
  - _posts/linear_algebra/2022-05-01-linear_algebra_01.md

categories:
  - maths
tags:
  - linear algebra
  - python
---

* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.

## 전치 행렬

전치 행렬(transposed matrix)은 기존 행렬의 행과 열을 바꾼 행렬을 말하며 $$A^{T}$$와 같이 표기한다. 수식으로 표현하면 아래와 같다.  

$$A = \begin{pmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\\a_{31}&a_{32}\\\end{pmatrix}\to A^{T} = \begin{pmatrix}a_{11}&a_{21}&a_{31}\\a_{12}&a_{22}&a_{32}\\\end{pmatrix}$$

전치 행렬의 성질 중 행렬 곱의 전치 행렬은 아래와 같아 조금 주의해야 한다.  

$$(AB^{T}) = B^{T}A^{T}$$

파이썬으로 구현하면 아래와 같다.  

```python
# transposed matrix
def transpose(a):
    n = len(a)
    p = len(a[0])

    at = []
    for i in range(p):
        row = []
        for j in range(n):
            val = a[j][i]
            row.append(val)
        at.append(row)

    return at
```

numpy를 사용하면 아래와 같다.  

```python
import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# use function
transpose = np.transpose(a=a)

# use method
transpose = a.T
```

## 대칭 행렬


## 대각 행렬


## 단위 행렬


## 영 행렬


## 삼각 행렬


## 토플리츠 행렬


## 이중대각 행렬


## 하우스홀더 행렬



---
## Reference
- 교재: [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)
- 저자 블로그: [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)