---
title: "IQR 방식의 이상치 탐지 방법"
excerpt: "데이터의 이상치를 탐지하는 방법과 IQR 방식을 사용하는 이유"
published: true
mathjax: false

toc: true
toc_sticky: true

categories:
  - data mining
tags:
  - data mining
  - statistics
  - python
---
# {{ page.excerpt }}
글을 시작하기에 앞서, 이상치를 탐지한다는 용어는 여러가지의 의미를 담고 있어 용어에 대한 정의를 먼저 하고 넘어가자.  
이상치 탐지는 `outlier/noise detection`, `abnormal/novelty detection`의 두 가지 의미에 대해서 횬용되고 있는데 이 글에서는 **outlier/noise detection**에 대해서 다룬다.  
D. M. Hawkins의 Identification of Outliers(1980)에 따르면 `outlier`란 어떤 데이터 안에서 다른 관측값들과 다른 방법에 의해 생성되었다고 의심되는 관측값을 말한다.  
이와 반대로 `abnormal/novelty detection`이란 비정상이나 특이점에 위치한 데이터를 말한다.  

쉽게 설명하자면, 일반적으로 생각하는 DataFrame을 사용해서 처리되는 종속변수와 독립변수가 1:N 또는 N:N으로 매칭되는 데이터가 있다고 할 때,  
`outlier/noise value`는 하나의 칼럼 안에서 존재하는 이상치를 말하고, 그 예시로는 나이 데이터에 나타난 `10000`과 같은 데이터가 있다.  
`abnormal/novelty value`는 독립변수들의 영향을 받아 이상점, 특이점으로 나타난 종속변수의 이상치를 말하고, 그 예시로는 제조 데이터의 `불량품` 발생과 같은 데이터가 있다.  

scikit learn 패키지의 경우 `outlier detection`와 `novelty detection`에 대해서 [아래와 같이 정리](https://scikit-learn.org/stable/modules/outlier_detection.html)하고 있다.  

|outlier detection|novelty detection|
|-|-|
|The training data contains outliers which are defined as observations that are far from the others. Outlier detection estimators thus try to fit the regions where the training data is the most concentrated, ignoring the deviant observations.|The training data is not polluted by outliers and we are interested in detecting whether a new observation is an outlier. In this context an outlier is also called a novelty.|

---
## 1. IQR 방식이란?

## 2.

---
# Reference
- text