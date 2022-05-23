---
published: false
layout: post

title: 선형대수 04. 행렬식
description: >
  선형대수: 행렬식, 행렬식 계산, 행렬식의 성질
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_04.png
related_posts:
  - _posts/maths/2022-05-22-linear_algebra_03.md

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

## 1. 행렬식

**행렬식(determinant)**은 행렬의 특성을 하나의 숫자로 표현하는 방법 중 하나로, 정사각 행렬(square matrix)을 스칼라로 변환하는 함수라고 할 수 있다.  
행렬식의 절대값은 해당 행렬이 단위 공간의 몇배의 부피인지를 의미한다.  

## 2. 행렬식 계산

행렬 $$A$$의 행렬식은 $$det(A)$$ 또는 $$\begin{vmatrix}
A\end{vmatrix}$$라고 표기하며, $$2 \times 2$$ 행렬의 경우 아래와 같이 간단하게 구할 수 있다.  

$$det(A) = |A| = \begin{vmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$

$$3 \times 3$$이상의 행렬일 경우, 행렬식의 계산이 조금 복잡해지는데, **소행렬식(minor of entry $$a_{ij}, M_{ij}$$)**과 여인수**(cofactor of entry $$a_{ij}$$)**의 개념을 알아야 한다.  

- 소행렬식 $$M_{ij}$$: 행렬의 $$i$$행과 $$j$$열을 제외하고 구성된 부분 행렬의 행렬식을 의미
- 여인수: $$C_{ij} = (-1)^{i+j}M_{ij}$$

### 여인수 전개

아래와 같이 행렬의 행렬식을 정의하여 계산하는 방법을 **여인수 전개(cofactor expansion)**이라고 한다.  

$$\begin{align*}
det(A) & = a_{11}M_{11} + a_{12}(-M_{12}) + a_{13}M_{13} + \cdots + a_{1n}M_{1n} \\
& = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13} + \cdots + a_{1n}C_{1n}
\end{align*}$$

## 3. 행렬식의 성질


---
## Reference
- 교재: [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)
- 저자 블로그: [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)