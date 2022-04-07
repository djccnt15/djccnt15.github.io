---
title: "전처리 단계에서의 이상치 탐지"
excerpt: "데이터의 이상치를 탐지하는 방법"
published: true
mathjax: true

toc: true
toc_sticky: true

categories:
  - data mining
tags:
  - data mining
  - statistics
  - python
  - preprocessing
  - outlier detection
---
# {{ page.excerpt }}
글을 시작하기에 앞서, 이상치를 탐지한다는 말은 여러가지의 의미로 사용되고 있어 용어 정의가 먼저 필요하다.  

`D. M. Hawkins`의 `Identification of Outliers(1980)`에 따르면 `outlier`란 어떤 데이터 안에서 다른 관측값들과 다른 방법에 의해 생성되었다고 의심되는 관측값을 말한다.  
{: .notice}

이상치 탐지(outlier detection)라는 용어는 기본적으로 `noise detection`, `abnormal/novelty detection`의 두 가지 의미를 모두 포함하는데, 
`noise`는 관측값이 비정상으로 나타나서 전체 데이터에 왜곡을 주는 데이터를 말하며, `abnormal/novelty`란 데이터가 비정상적인 관측값에 의해 왜곡/오염되지 않은 상태에서, 독립변수들에 의해 결정된 종속변수가 비정상이나 특이점에 위치한 데이터를 말한다.  

쉽게 설명하자면, 종속변수와 독립변수의 형식으로 정리된 데이터가 있다고 할 때,  
`outlier/noise value`는 하나의 칼럼 안에서 존재하는 이상치를 말하고, 그 예시로는 나이 칼럼에 나타난 `10,000살`과 같은 데이터가 있다.  
`abnormal/novelty value`는 독립변수들의 영향을 받아 이상점, 특이점으로 나타난 종속변수의 이상치를 말하고, 그 예시로는 제조 데이터의 `불량품 발생` 또는 `설비 고장`과 같은 데이터가 있다.  
{: .notice}

따라서 전처리 단계에서의 이상치 탐지에 대해 다루는 이 글에서는 **noise detection**에 대해서 다룬다.  

scikit learn 패키지의 경우 `outlier detection`와 `novelty detection`에 대해서 [아래와 같이 정리](https://scikit-learn.org/stable/modules/outlier_detection.html)하고 있다.  

|outlier detection|novelty detection|
|-|-|
|The training data contains outliers which are defined as observations that are far from the others. Outlier detection estimators thus try to fit the regions where the training data is the most concentrated, ignoring the deviant observations.|The training data is not polluted by outliers and we are interested in detecting whether a new observation is an outlier. In this context an outlier is also called a novelty.|

---
## 1. 이상치 탐지 방법
우선 나는 지도교수님의 영향을 받아서인지, 이상치를 무작정 처리하기 전에 범주형 데이터를 기반으로 데이터셋을 분리해서 각각의 범주별로 specialize 된 모델을 만드는 것이 통합된 데이터로 generalize 된 모델을 만드는 것보다 더 좋다고 생각하는 편이다.  

위 단계를 넘어간 후에 모델링 하는 과정에서의 전처리 단계에서 데이터의 noise를 처리하는 방법은 일반적으로 다음의 네 가지 방식을 사용한다.  

1) $\pm1.5*IQR$ 이상/이하 제거  
2) 표준정규분포로 변환 후 $\pm3\sigma$ 이상/이하 제거  
3) 도메인 지식을 이용한 제거 및 대체  
4) Binning 처리  
{: .notice}

## 2. IQR 방식을 사용한 이상치 제거
앞서 소개한 네 가지 이상치 처리 방법 중에 가장 편하게 많이 사용되는 방식은 IQR 방식의 이상치 탐지 및 제거로, 기본 원리는 다음과 같다.  

![IQR](/assets/images/posts/iqr.jpg)  
[출처](https://www.statisticshowto.com/probability-and-statistics/interquartile-range/)

IQR이란 사분위수 범위(InterQuartile Range)의 약자로, 데이터를 순서대로 나열했을 때 25% 지점(1분위수)에 있는 데이터와 75% 지점(3분위수)에 있는 데이터의 차이를 말한다.  
위 그림에서 볼 수 있듯이, IQR 방식에서 정상 데이터로 분류될 범위를 계산하는 방식은 아래와 같다.

최저: $$Q1-1.5*IQR$$  
최대: $$Q3+1.5*IQR$$  
{: .notice}

계산식에서 계수로 1.5를 곱하는 이유는 짧게 얘기하자면 적당해서.. 인데 자세히 설명하자면 다음과 같다.  

## 3. python으로 구현하기

---
# Reference
- [Why “1.5” in IQR Method of Outlier Detection?](https://towardsdatascience.com/why-1-5-in-iqr-method-of-outlier-detection-5d07fdc82097)