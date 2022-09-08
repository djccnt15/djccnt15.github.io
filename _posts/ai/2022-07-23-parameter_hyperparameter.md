---
published: true
layout: post
title: '[AI] 파라미터와 하이퍼파라미터'
description: >
    Parameter와 Hyperparameter
categories: [AI]
tags: [AI]
image:
    path: /assets/img/posts/parameter_hyperparameter.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 파라미터와 하이퍼파라미터

파라미터와 하이퍼파라미터는 명백히 다른 개념인데, 혼용되고 있는 일이 많아 정리해둔다. 아마 소프트웨어 개발 분야에서 말하는 파라미터와 머신러닝 분야에서 말하는 하이퍼파라미터가 실무에서 사실상 동일하기 때문에 혼용되는 것 같다.  

## 개발 분야에서

아래와 같은 `python` 함수를 예시로 들어보자.  

```python
def add(a, b):
    return a + b

print(add(1, 10))
```
```
11
```

위와 같이 함수에 값을 넣을 수 있게 작성된 `a`, `b`를 `parameter`라고 하며, 결과값 출력을 위해 입력된 `1`과 `10`을 `argument`라고 한다.  

## 머신러닝 분야에서

아래와 같은 선형회귀 알고리즘을 예시로 들면, 

$$y = \beta_{0} + \beta_{1}x_{1} + \beta_{2}x_{2} + \cdots + \beta_{n}x_{n}$$

위 식의 $$\beta_{0}, \beta_{1}, \beta_{2}, \cdots, \beta_{n}$$, 즉 모델 내부에서 정해지는 변수를 `parameter`라고 하며, 문제를 해결하는 최적의 `parameter`를 도출하기 위해 연구자가 직접 세팅하는 값을 `hyperparameter`라고 한다.  

`hyperparameter`의 예시는 KNN 알고리즘의 K, k-means 알고리즘의 K, SVM 알고리즘의 C, ANN 알고리즘의 batch/epoch/learning rate 등등이 있다. 머신러닝 모델을 개발할 때 이런 값들을 함수의 `parameter`로 입력하다보니 혼용이 생기는 것 같다.  

아래 `scikit-learn`의 선형회귀 class에 대한 공식문서를 보면 머신러닝 관점에서는 분명히 `hyperparameter`인 머신러닝 알고리즘의 세팅값이 `parameter`라고 적혀있는 것을 볼 수 있다.  

![sklearn_example](/assets/img/posts/sklearn_example.png)
{:.text-center}