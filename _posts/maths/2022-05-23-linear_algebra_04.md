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

**행렬식(determinant)**은 행렬의 특성을 하나의 숫자로 표현하는 방법 중 하나로, **정사각 행렬(square matrix)**을 스칼라로 변환하는 함수라고 할 수 있다.  
행렬식의 절대값은 해당 행렬이 단위 공간의 몇배의 부피인지를 의미한다.  

## 2. 행렬식 계산

행렬 $$A$$의 행렬식은 $$det(A)$$ 또는 $$\begin{vmatrix}A\end{vmatrix}$$라고 표기하며, $$2 \times 2$$ 행렬의 경우 아래와 같이 간단하게 구할 수 있다.  

$$det(A)
= |A|
= \begin{vmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
\end{vmatrix}
= a_{11}a_{22} - a_{12}a_{21}$$

아래와 같이 행렬식의 절대값 기호가 두 겹인 경우 행렬식의 절대값을 구하라는 뜻이다.  

$$\begin{Vmatrix}
A\end{Vmatrix}
= \begin{Vmatrix}
a & b \\
c & d \\
\end{Vmatrix}
= |ad-cd| $$

$$3 \times 3$$이상의 행렬일 경우, 행렬식의 계산이 조금 복잡해지는데, **소행렬식(minor of entry $$a_{ij}, M_{ij}$$)**과 여인수**(cofactor of entry $$a_{ij}$$)**의 개념을 알아야 한다.  

- 소행렬식 $$M_{ij}$$ : 행렬의 $$i$$행과 $$j$$열을 제외하고 구성된 부분 행렬의 행렬식을 의미
- 여인수 $$C_{ij}$$ : $$C_{ij} = (-1)^{i+j}M_{ij}$$

### 여인수 전개

아래와 같이 행렬의 행렬식을 정의하여 계산하는 방법을 **여인수 전개(cofactor expansion)**이라고 한다.  

$$\begin{align*}
det(A) & = a_{11}M_{11} + a_{12}(-M_{12}) + a_{13}M_{13} + \cdots + a_{1n}M_{1n} \\
& = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13} + \cdots + a_{1n}C_{1n} \\
\end{align*}$$

## 3. 행렬식의 성질

### 특이한 행렬의 행렬식

삼각 행렬, 대각 행렬의 행렬식은 주 대각 원소의 곱과 같다.  

$$det(A) = a_{11} a_{22} \cdots a_{nn}$$

전치 행렬의 행렬식: 행렬 $$A$$가 정사각 행렬일 경우 행렬 $$A$$와 그 전치 행렬 $$A^{T}$$의 행렬식은 동일하다.  

$$det(A) = det(A^{T})$$

특정 행과 열의 원소가 모두 $$0$$일 때 행렬식은 $$0$$이다. 모든 원소가 $$0$$인 행 또는 열을 기준으로 여인수를 구하면 모두 $$0$$이기 때문이다.  

### 행렬의 기본 행 연산과 행렬식

기본 행 연산에 의한 행렬식의 변경은 아래와 같다.  

- 한 행에 영이 아닌 상수를 모두 곱한다.

$$k det(A)
\to k \begin{vmatrix}
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

$$det(kA)
= k^{n}det(A)
\to \begin{vmatrix}
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

$$-det(A)
\to -\begin{vmatrix}
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

$$det(A)
\to \begin{vmatrix}
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

특정 행, 열이 비례하는 관계가 존재하는 행렬의 행렬식은 $$0$$이다.  

### 행렬 곱과 행렬식

정사각 행렬 $$A$$와 $$B$$의 행렬 곱의 행렬식은 각각의 행렬의 행렬식을 곱한 값과 같다.

$$det(AB) = det(A)det(B)$$

---
## Reference
- 교재: [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)
- 저자 블로그: [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)