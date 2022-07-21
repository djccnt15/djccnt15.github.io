---
published: true
layout: post

title: '[AI] 알고리즘과 모델'
description: >
    AI 알고리즘과 AI 모델의 차이
hide_description: false
image:
    path: /assets/img/posts/algorithm_model.png
related_posts:
    - _posts/ai/2022-07-09-about_ai.md

categories:
    - AI
tags:
    - AI
---
* toc
{:toc}

## 알고리즘과 모델의 차이

**알고리즘(Algorithm)**이란 본래 특정 문제를 해결하기 위해 정해진 일련의 절차를 말한다. 또한 컴퓨터 공학에서 **모델(model)**은 실제 사건, 시스템, 행동 또는 자연 현상에 대한 추상적인 수학적 표현을 의미한다.  

따라서 알고리즘이란 선형 회귀 알고리즘, k-means 알고리즘 등과 같이 문제를 해결하기 위해 적용되는 AI 방법론을 말하며, 모델이란 데이터로 학습이 완료된 알고리즘을 말한다.  

## 예시

선형 회귀를 예로 들면, 아래와 같은 선형 회귀 일반식은 선형 회귀 알고리즘을 말한다.  

$$y = \beta_{0} + \beta_{1}x_{1} + \beta_{2}x_{2} + \cdots + \beta_{n}x_{n}$$

그리고 아래와 같이 학습을 통해 알고리즘의 가중치가 결정되었을 때 비로소 AI 모델이라고 부를 수 있다.  

$$y = 3 + 5x_{1} + 8x_{2} + \cdots + 4x_{n}$$