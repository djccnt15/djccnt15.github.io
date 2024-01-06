---
slug: hyperparameter
title: 파라미터와 하이퍼파라미터
date:
    created: 2022-07-23
description: >
    Parameter와 Hyperparameter
categories:
    - AI
tags:
    - AI
    - parameter
    - hyperparameter
---

파라미터와 하이퍼파라미터는 명백히 다른 개념인데, 혼용되고 있는 일이 많아 정리해둔다.  

<!-- more -->

## 프로그래밍에서

아래와 같은 Python 함수를 예시로 들어보자.  

```python
def add(a, b):
    return a + b

print(add(1, 10))
```
```
11
```

위와 같이 함수에 값을 넣을 수 있게 작성된 `a`, `b`를 **parameter**라고 하며, 함수를 호출하여 결과값을 출력하기 위해 입력된 `1`과 `10`을 **argument**라고 한다.  

## 머신러닝에서

아래와 같은 선형회귀 알고리즘을 예시로 들면, 

$$
y = \beta_{0} + \beta_{1}x_{1} + \beta_{2}x_{2} + \cdots + \beta_{n}x_{n}
$$

위 식의 $\beta_{0}, \beta_{1}, \beta_{2}, \cdots, \beta_{n}$, 즉 모델 내부에서 정해지는 변수를 **parameter**라고 하며, 문제를 해결하는 최적의 parameter를 도출하기 위해 연구자가 직접 세팅하는 값을 **hyperparameter**라고 한다.  

hyperparameter의 예시는 KNN 알고리즘의 K, k-means 알고리즘의 K, SVM 알고리즘의 C, ANN 알고리즘의 batch/epoch/learning rate 등등이 있다. 머신러닝 모델을 개발할 때 이런 값들을 함수의 parameter로 입력하다보니 혼용이 생기는 것 같다.  