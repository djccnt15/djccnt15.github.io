---
published: false
layout: post

title: 선형대수 05. 역행렬
description: >
  선형대수: 역행렬, 역행렬 계산, 역행렬과 거듭제곱
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_05.png
related_posts:
  - _posts/blog/2022-05-23-linear_algebra_04.md

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

## 역행렬

행렬 $$A$$의 **역행렬(inverse matrix)**이란 아래와 같이 $$AB = I$$를 만족하는 행렬 $$B$$를 의미한다.  

$$AA^{-1} = A^{-1}A = I$$

$$(AB)^{-1} = B^{-1}A^{-1}$$

역행렬이 존재하는 행렬을 **가역 행렬(invertible matrix)**이라 부르며, 행렬식이 $$0$$이어서 역행렬이 존재하지 않는 행렬을 **특이 행렬(singular matrix)**이라고 부른다.  

## 역행렬 계산

역행렬을 구하는 방법은 다양하지만, 앞서 다뤘던 **가우스-조던 소거법(Gauss Jordan elimination)**을 사용하는 것이 가장 간편하다. 절차는 아래와 같다.  

0. 행렬 $$A$$의 오른쪽에 같은 크기를 갖는 단위 행렬 $$I$$를 첨가한 첨가 행렬 $$[A \left | I]$$를 만든다.
0. 이 행렬에 기본 행 연산을 가하여 $$[I|B]$$을 만든다.
0. 만약 이 과정에 성공하여 위와 같은 형태의 첨가 행렬이 나왔을 때, $$A^{-1}=B$$이고, 나오지 않는다면 행렬 $$A$$의 역행렬은 존재하지 않는다.

## 역행렬과 거듭제곱

---
## Reference
- 교재: [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([교재 코드](https://github.com/bjpublic/linearalgebra))
- 저자 블로그: [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)