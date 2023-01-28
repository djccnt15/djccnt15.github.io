---
published: true
layout: post
title: '[선형대수] 11. 직교 행렬'
description: >
    직교와 직교 행렬
categories: [Mathematics]
tags: [linear algebra]
image:
    path: /assets/img/posts/thumbnail_linear_algebra_11.png
related_posts:
    - _posts/mathematics/2022-06-11-linear_algebra_10.md
    - _posts/mathematics/2022-06-13-linear_algebra_12.md
---
{% include series_linalg.html %}
* toc
{:toc}

## 1. 직교 행렬

**직교 행렬(orthogonal matrix)**이란 어떤 행렬의 행 벡터와 열 벡터가 [정규 직교(orthonomal) 기저](/mathematics/linear_algebra_08/#1-직교-공간)를 이루는 행렬을 의미한다. 직교 행렬은 자기 자신의 [전치 행렬](/mathematics/linear_algebra_02/#1-전치-행렬)과 곱했을 때 [단위 행렬](/mathematics/linear_algebra_02/#4-단위-행렬)이 되는 성질이 있기 때문에 이를 통해 주어진 행렬이 직교 행렬인지 확인할 수 있다.  

- 행렬 $$A$$가 직교 행렬일 때,

$$\begin{align*}
AA^{T} & = A^{T}A = I \\
\\
\therefore A^{T} & = A^{-1}
\end{align*}$$

행렬의 직교 여부 확인을 Python으로 구현하면 아래와 같다. 부동소수점으로 인한 문제를 피하기 위한 추가 연산이 필요하다.  

```python
scalar = int | float
vector = list[scalar]
matrix = list[vector]


def orthogonal_check(a: matrix) -> bool:
    """checks whether orthogonal matrix or not"""

    tmp: matrix = mat_mul(a, mat_trans(a))
    tmp: matrix = mat_smul(1 / tmp[0][0], tmp)  # line for evading floating point error
    I: matrix = mat_identity(len(a))

    return tmp == I
```

## 2. 닮음

아래 조건을 만족하는 행렬 $$A$$와 $$B$$에 대해 **닮음** 이라고 하고, 특히 $$P$$가 **직교 행렬(orthogonal matrix)**일 때 행렬 $$A$$와 $$B$$는 **직교 닮음(orthogonally similar)**이라고 한다.  

$$B = P^{-1}AP$$

### 닮은 행렬의 성질

닮은 행렬의 성질은 다음과 같다.  

- 서로 닮은 행렬의 행렬식은 동일하다.

$$\det(A) = \det(B)$$

<details><summary>증명</summary><div markdown="1">

$$\begin{align*}
\det(B) & = \det(P^{-1}) \det(A) \det(P) \\
\\
& = \frac{1}{\det(P)} \det(A) \det(P) \\
\\
& =  \det(A) \frac{1}{\det(P)} \det(P) \\
\\
& =  \det(A)
\end{align*}$$

</div></details><br>

- 행렬 $$A$$가 가역 행렬이라는 말은 $$P^{-1}AP$$가 가역 행렬이라는 말과 같다.
- 행렬 $$A$$와 $$P^{-1}AP$$의 [랭크(rank)와 널리티(nullity)](/mathematics/linear_algebra_06/#7-랭크와-널리티)는 동일하다.

$$\begin{align*}
rank(A) & = rank(P^{-1}AP) \\
\\
nullity(A) & = nullity(P^{-1}AP)
\end{align*}$$

- 행렬 $$A$$와 $$P^{-1}AP$$의 대각합은 동일하다.

$$tr(A) = tr(P^{-1}AP)$$

- 행렬 $$A$$와 $$P^{-1}AP$$의 고유값은 동일하다.

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))