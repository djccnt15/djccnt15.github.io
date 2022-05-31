---
published: false
layout: post

title: 선형대수 07. 내적
description: >
  선형대수: 내적, 직교 공간, 그램 슈미트 과정, QR 분해
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_07.png
related_posts:
  - _posts/maths/2022-05-29-linear_algebra_06.md

categories:
  - maths
tags:
  - linear algebra
  - python
  - unpublished
---

* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.  

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 1. 내적

[벡터 공간](/maths/2022-05-29-linear_algebra_06/#1-벡터-공간)의 설명에서 언급했듯이, **내적(inner product)**이 주어진 벡터 공간을 **내적 공간(inner product space)**이라고 부르고 **내적(inner product)**을 아래와 같이 표기한다.  

$$\langle u, v \rangle = u \cdot v$$

벡터의 내적일 경우, 아래와 같다.

$$u
= \begin{pmatrix}
u_{1} \\
\vdots \\
u_{n} \\
\end{pmatrix},
v
= \begin{pmatrix}
v_{1} \\
\vdots \\
v_{n} \\
\end{pmatrix}$$

$$\langle u, v \rangle = u \cdot v = \sum_{i=1}^{n}u_{n}v_{n} = u^{T}v$$




## 2. 직교 공간



## 3. 그램 슈미트 과정



## 4. QR 분해



---
## Reference
- 교재: [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([교재 코드](https://github.com/bjpublic/linearalgebra))
- 저자 블로그: [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)