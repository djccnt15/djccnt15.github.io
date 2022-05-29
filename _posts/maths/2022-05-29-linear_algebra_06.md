---
published: true
layout: post

title: 선형대수 06. 기저와 차원
description: >
  선형대수: 벡터 공간, 선형 변환, 선형 독립, 기저, 차원, 행/열/영 공간, 랭크와 널리티
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_06.png
related_posts:
  - _posts/maths/2022-05-28-linear_algebra_05.md
  - _posts/maths/2022-05-30-linear_algebra_07.md

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

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 1. 벡터 공간

**벡터 공간(vector space)**은 벡터의 덧셈과 스칼라 곱이 정의된 공간으로, 벡터 집합이 존재할 때 해당 벡터들로 구성할 수 있는 공간을 의미하며, **선형 공간(linear space)**이라고도 부른다. '길이'나 '각도'가 정의되지는 않으며, '길이'나 '각도'가 정의되는 공간은 **내적 공간(inner product space)**이라고 부른다.  

1차원 실수 공간은 $$\mathbb{R}$$로 표현되며, 2차원은 $$\mathbb{R}^{2}$$, 3차원은 $$\mathbb{R}^{3}$$으로 표현된다.  

어떤 공간의 좌표 축의 기본 벡터를 **유닛 벡터(unit vector)**라고 하는데, 따라서 벡터는 아래의 예시와 같이 유닛 벡터의 선형 조합으로 나타낼 수 있다.  

$$\begin{align*}
a & = (2, 1, 3) \\
& = (2, 0, 0) + (0, 1, 0) + (0, 0, 3) \\
& = 2(1, 0, 0) + 1(0, 1, 0) + 3(0, 0, 1) \\
& = 2i + j + 3k \\
\end{align*}$$

### 부분 공간

벡터 공간의 일부분을 **부분 공간(subspace)**이라고 한다. 그리고 **스팬(span)**이라는 개념이 있는데, 전체 벡터 공간 $$V$$가 3차원이고 $$S$$가 2개의 기저 벡터 집합일 때, $$S$$에 속하는 기저 벡터들로 구성되는 2차원 부분 공간을 $$W$$라고 하면, $$S$$는 부분 공간 $$W$$를 $$span$$한다고 말하고, 아래와 같이 표기한다.  

$$W = span(S)$$

## 2. 선형 변환

**선형 변황(linear transformation)**은 두 벡터 공간 사이의 함수를 말하며, 예를 들어 행렬과 벡터의 곱 $$Ax$$는 벡터 $$x$$에 선형 변환 $$A$$를 취한 것을 의미한다. 따라서 '행렬'은 선형 변환의 의미를 포함하고 있다고 할 수 있다.  

$$Ax
= \begin{pmatrix}
2 & 3 \\
4 & 2 \\
5 & 1 \\
\end{pmatrix}\begin{pmatrix}
1 \\
2 \\
\end{pmatrix}
= \begin{pmatrix}
8 \\
8 \\
7
\end{pmatrix}$$

## 3. 선형 조합과 선형 독립

아래와 같이 벡터 $$w$$를 벡터 $$u_{n}$$과 스칼라 $$a_{n}$$의 조합으로 나타낼 수 있을 때 벡터 $$w$$를 벡터 $$u_{n}$$의 **선형 조합(linear combination)**으로 나타낼 수 있다고 말한다.  

$$w = a_{1}u_{1} + a_{2}u_{2} + \cdots + a_{n}u_{n}$$

$$A = \{a_{1}, a_{2}, \cdots a_{n}\}$$이 벡터공간 $$S$$내의 벡터들의 집합일 때, $$A$$에 속하는 벡터를 $$A$$에 속하는 다른 벡터들의 선형 조합(linear combination)으로 표현할 수 없을 때 $$A$$를 **선형 독립(linear independent)**이라고 하며, 반대로 특정 벡터를 다른 벡터의 선형 조합으로 표현할 수 있다면 **선형 종속(linear dependent)**이라고 한다.  

## 4. 기저

앞서 **벡터 공간(vector space)**의 정의에서 벡터 집합이 존재할 때 해당 벡터들로 구성할 수 있는 공간을 의미한다고 했을 때, **기저(basis)**는 벡터 공간을 생성하는 **선형 독립인 벡터들**을 말한다.  

## 5. 차원

**차원(dimension)**이란 해당 공간을 구성하는 기저 벡터의 개수로, 1차원 공간 $$\mathbb{R}$$을 나타내는 데에는 기저 벡터 1개가 필요하고, 2차원 공간 $$\mathbb{R}^{2}$$은 기저 벡터 2개, n차원 공간 $$\mathbb{R}^{n}$$은 기저 벡터 $$n$$개가 필요하다.  

## 6. 행/열/영 공간

아래와 같이 행 벡터로 $$span$$할 수 있는 공간을 **행 공간(row spaces)**으로 부르고, 열 백터로 $$span$$할 수 있는 공간을 **열 공간(column spaces)**이라고 부른다.

$$\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1m} \\
a_{21} & a_{22} & \cdots & a_{2m} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nm} \\
\end{pmatrix} \to
\begin{align*}
(a_{11}, a_{12}, & \cdots, a_{1m}) \\
(a_{21}, a_{22}, & \cdots, a_{2m}) \\
& \vdots \\
(a_{n1}, a_{n2}, & \cdots, a_{nm}) \\
\end{align*}$$

$$\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1m} \\
a_{21} & a_{22} & \cdots & a_{2m} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nm} \\
\end{pmatrix} \to
\begin{pmatrix}
a_{11} \\
a_{21} \\
\vdots \\
a_{n1} \\
\end{pmatrix},
\begin{pmatrix}
a_{12} \\
a_{22} \\
\vdots \\
a_{n2} \\
\end{pmatrix},
\cdots ,
\begin{pmatrix}
a_{1m} \\
a_{2m} \\
\vdots \\
a_{nm} \\
\end{pmatrix}$$

또한 $$Ax = 0$$을 만족하는 해(solution) 공간을 **영 공간(null space)**이라고 한다. 다른 말로 하자면, 행렬 $$A$$의 **영 공간(null space)**이란 행렬 $$A$$가 주어질 때 $$Ax = 0$$을 만족하는 모든 벡터 $$x$$의 집합이라고 할 수 있다.  

## 7. 랭크와 널리티

행렬 $$A$$의 행 공간과 열 공간의 공통 차원을 행렬 $$A$$의 **랭크(rank)**라고 하고, 아래와 같이 표기한다.  

$$rank(A)$$

만약 행렬의 랭크가 해당 행렬이 가질 수 있는 랭크 중 최대치일 때 해당 행렬을 풀 랭크(full rank) 행렬이라고 부른다.

행렬 $$A$$의 경 공간의 차원을 행렬 $$A$$의 **널리티(nullity)**라고 부르며 아래와 같이 표기한다.  

$$nullity(A)$$

랭크(rank)와 널리티(nullity)의 성질은 아래와 같다.  

- 행렬 $$A$$가 임의의 행렬이면 $$rank(A) = rank(A^{T})$$이다.
- 행렬 $$A$$가 $$n$$개의 열을 가진 행렬일 때, $$rank(A) + nullity(A) = n$$을 만족한다.

---
## Reference
- 교재: [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([교재 코드](https://github.com/bjpublic/linearalgebra))
- 저자 블로그: [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)