---
slug: linear-algebra-basis-dimension
title: '[선형대수] 06. 기저와 차원'
date:
    created: 2022-05-29
description: >
    벡터 공간, 선형 변환, 선형 독립, 기저, 차원, 행/열/영 공간, 랭크와 널리티
categories:
    - Mathematics
tags:
    - linear algebra
---

기저와 차원. 벡터 공간, 선형 변환, 선형 독립, 기저, 차원, 행/열/영 공간, 랭크와 널리티  

<!-- more -->

---

## 1. 벡터 공간

**벡터 공간(vector space)**은 벡터의 덧셈과 스칼라 곱이 정의된 공간으로, 벡터 집합이 존재할 때 해당 벡터들로 구성할 수 있는 공간을 의미하며, **선형 공간(linear space)**이라고도 부른다. '길이'나 '각도'가 정의되지는 않으며, '길이'나 '각도'가 정의되는 공간은 **내적 공간(inner product space)**이라고 부른다.  

1차원 실수 공간은 $\mathbb{R}$로 표현되며, 2차원은 $\mathbb{R}^{2}$, 3차원은 $\mathbb{R}^{3}$으로 표현된다.  

### 부분 공간

벡터 공간의 일부분을 **부분 공간(subspace)**이라고 한다. 그리고 **생성 공간(span)**이라는 개념이 있는데, 전체 벡터 공간 $V$가 3차원이고 $S$가 2개의 기저 벡터 집합일 때, $S$에 속하는 기저 벡터들로 구성되는 2차원 부분 공간을 $W$라고 하면, $S$는 부분 공간 $W$를 $span$한다고 말하고, 아래와 같이 표기한다.  

$$
W = span(S)
$$

## 2. 선형 변환

**선형 변환(linear transformation)**은 두 벡터 공간 사이의 함수를 말하며, 예를 들어 행렬과 벡터의 곱 $Ax$는 벡터 $\text{x}$에 선형 변환 $A$를 취한 것을 의미한다. 따라서 **행렬**은 선형 변환의 의미를 포함하고 있다고 할 수 있다. 선형 변환은 달리 **선형 사상(linear map)**이라고도 부른다.  

$$
A\text{x} = \begin{bmatrix}
2 & 3 \\
4 & 2 \\
5 & 1 \\
\end{bmatrix}\begin{bmatrix}
1 \\
2 \\
\end{bmatrix}
= \begin{bmatrix}
8 \\
8 \\
7
\end{bmatrix}
$$

## 3. 선형 결합과 선형 독립

아래와 같이 벡터 $\text{w}$를 벡터 $\text{u}_{n}$과 스칼라 $a_{n}$의 조합으로 나타낼 수 있을 때 벡터 $\text{w}$를 벡터 $\text{u}_{n}$의 **선형 결합(linear combination)**으로 나타낼 수 있다고 말한다.  

$$
\text{w} = a_{1}\text{u}_{1} + a_{2}\text{u}_{2} + \cdots + a_{n}\text{u}_{n}
$$

$A = \{a_{1}, a_{2}, \cdots, a_{n}\}$이 벡터공간 $S$내의 벡터들의 집합이고, $A$에 속하는 벡터를 $A$에 속하는 다른 벡터들의 선형 결합(linear combination)으로 표현할 수 없을 때 $A$를 **선형 독립(linear independent)**이라고 하며, 반대로 특정 벡터를 다른 벡터의 선형 결합으로 표현할 수 있다면 **선형 종속(linear dependent)**이라고 한다.  

## 4. 기저

### 단위 벡터

길이가 1인 벡터를 **단위 벡터(unit vector)**라고 하며 방향에 관한 정보만을 담고 있기 때문에 **방향 벡터(direction vector)**라고 부르기도 한다. 단위 벡터(unit vector)는 $\widehat{\textbf{u}}$와 같이 $hat$ 기호를 사용해 나타내며, 특정 벡터 $\textbf{u}$를 단위 벡터 $\widehat{\textbf{u}}$로 **정규화(normalization)**하는 방법은 아래와 같다.  

$$
\begin{gathered}
\widehat{\textbf{u}} = \text{sgn} (\textbf{u}) = \frac{\textbf{u}}{\Vert \textbf{u} \Vert} \\
\\
\because \textbf{u} = \widehat{\textbf{u}} \times \Vert \textbf{u} \Vert
\end{gathered}
$$

위 표기에서 $\text{sgn}$은 부호 함수를 뜻하며, $\Vert \textbf{u} \Vert$는 [노름(norm)](./2022-06-05-linear_algebra_inner_product_norm.md/#2-노름norm)을 뜻한다.  

!!! info
    참고로 **^** 기호를 수학에서 **Hat(모자)** 기호라고 부르는데, 상황에 따라 단위 벡터, 추정량 등 의미가 달라진다. 자세한 내용은 [위키피디아](https://en.wikipedia.org/wiki/Hat_operator)를 참고하자.  

### 기저 벡터

앞서 **벡터 공간(vector space)**의 정의에서 벡터 집합이 존재할 때 해당 벡터들로 구성할 수 있는 공간을 의미한다고 했을 때, **기저 벡터(basis vector)**는 벡터 공간을 생성하는 **선형 독립인 벡터들**을 말한다. 쉽게 말해서 아래와 같이 특정 벡터를 단위 벡터의 선형 결합으로 표현하였을 때, 각 축의 단위 벡터인 $\text{i, j, k}$를 **기저 벡터(basis vector)**라고 한다.  

$$
\begin{align*}
\textbf{a} & = (2, 1, 3) \\
\\
& = (2, 0, 0) + (0, 1, 0) + (0, 0, 3) \\
\\
& = 2(1, 0, 0) + 1(0, 1, 0) + 3(0, 0, 1) \\
\\
& = 2\text{i} + \text{j} + 3\text{k} \\
\end{align*}
$$

## 5. 차원

**차원(dimension)**이란 해당 공간을 구성하는 기저 벡터의 개수로, 1차원 공간 $\mathbb{R}$을 나타내는 데에는 기저 벡터 1개가 필요하고, 2차원 공간 $\mathbb{R}^{2}$은 기저 벡터 2개, n차원 공간 $\mathbb{R}^{n}$은 기저 벡터 $n$개가 필요하다.  

## 6. 행/열/영 공간

아래와 같이 행 벡터로 $span$할 수 있는 공간을 **행 공간(row spaces)**으로 부르고, 열 백터로 $span$할 수 있는 공간을 **열 공간(column spaces)**이라고 부른다.

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix}
\to \begin{align*}
[a_{11}, a_{12}, & \cdots, a_{1n}] \\
[a_{21}, a_{22}, & \cdots, a_{2n}] \\
& \vdots \\
[a_{m1}, a_{m2}, & \cdots, a_{mn}] \\
\end{align*}
$$

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{bmatrix}
\to \begin{bmatrix}
a_{11} \\
a_{21} \\
\vdots \\
a_{m1} \\
\end{bmatrix},
\begin{bmatrix}
a_{12} \\
a_{22} \\
\vdots \\
a_{m2} \\
\end{bmatrix},
\cdots ,
\begin{bmatrix}
a_{1n} \\
a_{2n} \\
\vdots \\
a_{mn} \\
\end{bmatrix}
$$

또한 $A\text{x} = 0$을 만족하는 해(solution) 공간을 **영 공간(null space)**이라고 한다. 다른 말로 하자면, 행렬 $A$의 **영 공간(null space)**이란 행렬 $A$가 주어질 때 $A\text{x} = 0$을 만족하는 모든 벡터 $\text{x}$의 집합이라고 할 수 있다.  

## 7. 랭크와 널리티

행렬 $A$의 행 공간과 열 공간의 공통 차원을 행렬 $A$의 **랭크(rank)**라고 하고, 아래와 같이 표기한다.  

$$
rank(A)
$$

만약 행렬의 랭크가 해당 행렬이 가질 수 있는 랭크 중 최대치일 때 해당 행렬을 풀 랭크(full rank) 행렬이라고 부른다.

행렬 $A$의 영공간의 차원을 행렬 $A$의 **널리티(nullity)**라고 부르며 아래와 같이 표기한다.  

$$
nullity(A)
$$

랭크(rank)와 널리티(nullity)의 성질은 아래와 같다.  

- 행렬 $A$가 임의의 행렬이면 $rank(A) = rank(A^{T})$이다.
- 행렬 $A$가 $n$개의 열을 가진 행렬일 때, $rank(A) + nullity(A) = n$을 만족한다.

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
