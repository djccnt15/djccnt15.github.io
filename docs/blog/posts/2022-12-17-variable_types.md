---
slug: variable-types
title: '[기초통계학] 02. 자료의 종류와 특성'
date:
    created: 2022-12-17
description: >
    자료의 분류, 범주형 자료와 수치형 자료
categories:
    - Statistics
tags:
    - statistics 101
    - variable types
    - relative frequency
---

자료의 분류, 범주형 자료와 수치형 자료  

<!-- more -->

---

## 1. 자료의 종류와 특성

통계분석 방법은 자료의 속성과 분석 목적에 달라지며, 분석하고자 하는 자료가 분석방법에서 가정한 조건을 얼마나 만족하는지에 따라 분석방법의 적절성이 결정된다.  

정보가 수집되는 특정한 대상을 **변수(variable)**라고 하며, 변수의 종류로는 하나의 변수만 있는 일변량 자료(univariate data)와 여러 개의 변수로 이루어진 다변량 자료(multivariate data) 자료가 있다.  

변수에 포함된 각각의 데이터들을 **관측값(observation)**이라고 하며, 시계열 분석 등 특수한 경우를 제외하면 관측값 간에 독립적이라고 가정하고 분석을 진행하게 된다.  

### 1-1. 자료의 분류

자료의 분류를 정확하게 파악해야 적절한 분석 모델을 선택할 수 있다. 특성에 따른 **자료(data)**의 분류는 다음과 같다.  

- 범주형 자료(categorical data)
    - 명목형 자료(nominal data)
        - 순서 없이 단순히 범주를 표시하는 데이터
    - 순서형 자료(ordinal data)
        - 순서를 갖기 때문에 상대 비교가 가능한 범주형 데이터
- 수치형 자료(numeric data)
    - 이산형 자료(discrete data)
        - 셀 수 있는(countable) 형태의 자료
        - 범주형 자료를 숫자로 치환하여 이산형 자료로 표현할 수 있음
    - 연속형 자료(continuous data)
        - 연속적인 속성을 가지는 자료(이산화를 통해 절사된 형태로 표시됨)

척도에 따른 **자료(data)**의 형태는 다음과 같다.  

- 명목 척도(nominal scale)
    - 명목형 자료를 범주에 따라 분류할 수 있도록 수치나 부호가 부여된 데이터
- 서열 척도(ordinal scale)
    - 순서형 자료에 개체 간의 서열 관계를 나타내는 데이터
- 등간 척도(interval scale)
    - 숫자 간의 간격이 동일하며, 절대적인 원점이 존재하지 않는 데이터
    - 0이 없음을 의미하지 않음(e.g. 온도, 선호도 등)
- 비율 척도(ratio scale)
    - 연속적인 수로 수량화할 수 있으며 절대적인 원점이 존재하는 데이터
    - 0이 없음을 의미함(e.g. 금액, 거리, 무게 등)

수치형 자료를 묶어서(data binning) 순서형 자료를 만들기도 하고, 범주형 자료를 분류하여 이산형 자료로 만들 수도 있다. 연속형 자료에서 명목형 자료로 갈수록 정보의 손실이 일어나기 때문에 적절한 분석 방법을 선택해야한다.  

## 2. 범주형 자료와 상대도수

범주형 자료를 정리할 때는 각 범주에 몇 개의 관측개체가 있는지를 정리한 표인 도수분포표(frequency table)를 많이 사용한다.  

이 때 도수(frequency)는 범주에 속한 관측개체의 수, 즉 관측값의 빈도를 의미하며, 전체 자료 중 해당 범주에 속한 자료의 비율인 **상대도수(relative frequency)**를 통해 데이터를 파악한다.  

순서형 자료의 경우 기준값 보다 작은 모든 데이터의 도수를 합해서 표현하는 **누적도수(cumulative frequency)**를 사용해서 데이터를 파악할 수도 있으며, 전체 자료 중 해당 범주의 이상/이하에 속한 자료의 비율을 파악하기 위해 **누적상대도수(cumulative relative frequency)**를 사용하기도 한다.  

도수, 상대도수, 누적도수 구하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def freq(data: numeric) -> dict:
        """returns frequency of each value"""

        return {val: data.count(val) for val in set(data)}


    def freq_rel(data: numeric) -> dict:
        """returns relative frequency of each value"""

        return {val: data.count(val) / len(data) for val in set(data)}


    def freq_cum(data: numeric) -> dict:
        """returns cumulative frequency of sorted value"""

        data_sort = sorted(list(set(data)))
        return {val: sum(data.count(j) for j in data_sort[:i + 1]) for i, val in enumerate(data_sort)}
    ```

=== "SciPy"

    ```python
    from scipy.stats import *

    data = [1, 2, 1, 3, 1, 2, 3, 1, 1, 2, 1, 1]

    relative_freq = relfreq(a=data, numbins=len(set(data)))
    cumulative_freq = cumfreq(a=data, numbins=len(set(data)))
    ```

이 외에도 히스토그램, 바 차트(막대 그래프), 파이 차트 등 다양한 시각화를 통해 범주형 자료를 파악할 수 있다.  

## 3. 수치형 자료와 범주화

수치형 자료의 경우 범주화(이산화)로 전처리하는 경우가 많다. 이 때 각각의 범주를 계급(class)라 한다. 범주화를 하려면 계급의 수와 경계값(계급의 크기)를 결정해야한다.  

계급의 수를 결정하는 주요 방법은 아래와 같다.  

- 제곱근 방법, Sturges 공식, Rice 공식
- **자료의 특성에 따른 분석가의 결정**

경계값을 결정하는 주요 방법은 아래와 같다.  

- 동일 간격(기본적 방법)
- **자료의 특성에 따른 분석가의 결정**

실무에서 만나는 데이터들은 왜도가 높거나 정규분포가 아닐 경우가 많기 때문에 범주화를 많이 사용하게 되는데, 아래와 같은 기준에 의해 판단하기도 한다.  

- 왜도가 작은 경우(왜도의 절대값 < 1), **동일 너비 분할(Equal Width Binning)** 사용
- 왜도가 큰 경우 (왜도의 절대값 > 1의 경우), **동일 빈도 분할(Equal Frequency Binning)** 사용

!!! warning
    범주화를 적용하려면 변수에 결측치가 존재해서는 안 되기 때문에 결측 데이터에 대한 처리가 선행되어야 한다.  

이 외에도 점도표, 산점도(scatter plot), 히스토그램, 줄기-잎 그래프, 상자수염 그래프(box plot) 등의 시각화를 통해 수치형 자료를 파악할 수 있다.  

## 4. 히스토그램과 막대 그래프의 차이

히스토그램과 막대 그래프는 종종 혼용되는데, 구간이 같다면 차이가 없기 때문이다. 그러나 구간이 다르다면 히스토그램과 막대 그래프가 달라진다.  

히스토그램은 수지자료를 시각화 하며 연속형 자료의 분포 형태를 표시한다. 따라서 계급의 상대도수를 사각형의 면적으로 표시하며 따라서 그래프의 높이, 즉 밀도(density)는 아래 공식에 따라 정해진다.  

$$
\text{density} = \frac{\text{relative frequency}}{\text{width of bins}}
$$

따라서 히스토그램의 경우 밀도 추정(density estimation)을 통한 확률 밀도 그래프의 기반이 된다.  

반면에 바 차트(막대 그래프)는 이러한 접근 없이 상대도수, 또는 단순한 도수를 그래프의 높이로 사용한다.  

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
