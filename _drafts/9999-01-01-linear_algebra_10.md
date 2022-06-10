---
published: true
layout: post

title: '[선형대수] 10. 고유값과 고유 벡터'
description: >
  고유값과 고유 벡터
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_10.png
related_posts:
  - _posts/math/2022-06-09-linear_algebra_09.md

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

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.  

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 1. 고유값과 고유 벡터

행렬의 특성값과 특성 벡터를 **고유값(eigenvalue)**과 **고유벡터(eigenvector)**라고 말한다. **고유벡터(eigenvector)**는 벡터를 선형 변환했을 때 방향은 변하지 않고 크기만 변하는 벡터를 의미하고, 선형 변환 이후 변한 크기를 고유값이라고 말하며 아래와 같이 표기한다.  

$$A \mathbf{v} = \lambda \mathbf{v}$$

## 2. 고유값과 고유 벡터 계산

아래와 같은 정리에 의해, 고유값 $$\lambda$$가 존재하기 위한 필요충분조건은 $$A - \lambda I$$의 행렬식이 $$0$$인 것이다.  

$$\begin{align*}
& A \mathbf{v} = \lambda \mathbf{v} \\
& \Leftrightarrow A \mathbf{v} - \lambda \mathbf{v} = 0 \\
& \Leftrightarrow (A - \lambda I) \mathbf{v} = 0
\end{align*}$$

$$\det (A - \lambda I) = 0$$

위 식을 **특성 방정식(characteristic equation)**이라고 하며, 특성 방정식을 만족하는 $$\lambda$$를 찾는 것이 고유값을 구하는 것이다.  

## 3. 고유값과 고유 벡터의 성질



---
## Reference
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)