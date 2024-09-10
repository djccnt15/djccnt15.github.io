---
slug: multivariate-data
title: '[기초통계학] 04. 다변량 자료'
date:
    created: 2022-12-23
description: >
    다변량 자료의 공분산과 상관계수
categories:
    - Statistics
tags:
    - statistics 101
    - covariance
    - correlation
---

다변량 자료의 공분산과 상관계수  

<!-- more -->

---

## 1. 분할표

두 변수가 모두 범주형 자료일 때, 도수 분포표를 2차원으로 확장한 형태로 정리한 것을 **분할표(contingency table)**라 한다.  

분할표에서 비율(상대도수)를 표시할 때 기준(분모)을 어떻게 정하는지에 따라 결과가 달라지기 때문에, 분석 목적 및 자료의 수집 방법을 고려하여 기준을 정해야 한다.  

엑셀을 활용하면 피봇 테이블 기능을 활용해서 분할표를 쉽게 만들 수 있고, csv 데이터를 Python을 활용해서 피봇 테이블을 만들고 싶다면 [pandas 라이브러리를 활용](./2022-01-21-pd_pivot_table.md)하면 쉽게 만들 수 있다.  

## 2. 공분산과 상관계수

두 수치자료 간의 **선형관계**가 어느 정도인지를 나타내는 통계값으로 공분산과 상관계수가 있다. 다만 [비선형 상관관계](https://datascienceschool.net/02%20mathematics/07.05%20%EA%B3%B5%EB%B6%84%EC%82%B0%EA%B3%BC%20%EC%83%81%EA%B4%80%EA%B3%84%EC%88%98.html#id8)의 경우 실제로는 상관성이 있음에도 불구하고 공분산과 상관계수로는 상관성을 확인할 수 없다.  

### 2-1. 표본공분산

**표본공분산(sample covariance)**은 아래 수식에서 볼 수 있듯이 [분산](./2022-12-18-univariate_data.md/#표본분산) 형태의 구조를 파악하지만 하나의 변수가 아닌 두 변수를 동시에 고려하기 때문에 공분산이라고 부르며, 양수/음수일 경우 양/음의 기울기인 선분에 자료가 모여있는 것을 뜻한다.  

$$
c_{x, y} = \frac{1}{n - 1}\sum_{i=1}^{n}(x_{i} - \overline{x})(y_{i} - \overline{y})
$$

??? note "표본공분산의 간편식과 그 유도"
    $$
    \begin{align*}
    c_{x, y} & = \frac{1}{n - 1}\sum_{i=1}^{n}(x_{i} - \overline{x})(y_{i} - \overline{y}) \\
    \\
    & = \frac{1}{n - 1} \sum_{i=1}^{n}(x_{i}y_{i} - x_{i}\overline{y} - y_{i}\overline{x} + \overline{x}\overline{y}) \\
    \\
    & = \frac{1}{n - 1} \left( \sum_{i=1}^{n}x_{i}y_{i} - \overline{y}\sum_{i=1}^{n}x_{i} - \overline{x}\sum_{i=1}^{n}y_{i} + n\overline{x}\overline{y} \right) \\
    \\
    & = \frac{1}{n - 1} \left( \sum_{i=1}^{n}x_{i}y_{i} - n\overline{y}\overline{x} - n\overline{x}\overline{y} + n\overline{x}\overline{y} \right) \quad \because \sum_{i=1}^{n}x_{i} = n\overline{x} \\
    \\
    & = \frac{1}{n - 1} \left( \sum_{i=1}^{n}x_{i}y_{i} - n\overline{x}\overline{y} \right) \\
    \\
    & = \frac{1}{n - 1} \left( \sum_{i=1}^{n}x_{i}y_{i} - \frac{1}{n}\sum_{i=1}^{n}x_{i}\sum_{i=1}^{n}y_{i} \right) \quad \because \overline{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}
    \end{align*}
    $$

표본공분산 구하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def cov(data_a: numeric, data_b: numeric, dof: int = 1) -> float:
        """returns covariance of two random variables"""

        b_a, b_b = bar(data_a), bar(data_b)
        return sum((a - b_a) * (b - b_b) for a, b in zip(data_a, data_b)) / (len(data_a) - dof)
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = [2.23, 4.78, 7.21, 9.37, 11.64, 14.23, 16.55, 18.70, 21.05, 23.21]
    b = [139, 123, 115, 96, 62, 54, 10, -3, -13, -55]

    covariance = np.cov(a, b)
    ```

### 2-2. 표본상관계수

표본공분산은 측정 단위의 영향을 받아 그 값 자체로는 선형 관계의 정도를 알 수 없기 때문에, 이를 보정하기 위해 자료들을 [표준화](./2022-12-18-univariate_data.md/#표준화)하여 계산하는 **표본상관계수(coefficient of correlation)**를 사용한다. [칼 피어슨](https://en.wikipedia.org/wiki/Karl_Pearson)이 제시하였기 때문에 **피어슨 상관계수(Pearson's r)** 등으로 부르기도 한다.  

표본상관계수는 아래와 같이 [분산](./2022-12-18-univariate_data.md/#표본분산)을 이용해서 구할 수 있다.  

$$
\begin{align*}
r_{x, y} & = \frac{1}{n - 1}\sum_{i=1}^{n} \left( \frac{x_{i} - \overline{x}}{s_{x}} \right) \left( \frac{y_{i} - \overline{y}}{s_{y}} \right), \quad -1 \leq r \leq 1\\
\\
& = \frac{S_{xy}}{\sqrt{S_{xx}}\sqrt{S_{yy}}}
\end{align*}
$$

??? note "표본상관계수의 간편식과 그 유도"
    $$
    \begin{align*}
    r_{x, y} & = \frac{1}{n - 1}\sum_{i=1}^{n} \left( \frac{x_{i} - \overline{x}}{s_{x}} \right) \left( \frac{y_{i} - \overline{y}}{s_{y}} \right) \\
    \\
    & = \frac{1}{n - 1}\sum_{i=1}^{n} \left\{ \frac{x_{i} - \overline{x}}{\sqrt{\frac{1}{n - 1}\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}}} \right\} \left\{ \frac{y_{i} - \overline{y}}{\sqrt{\frac{1}{n - 1}\sum_{i=1}^{n}(y_{i} - \overline{y})^{2}}} \right\} \\
    \\
    & = \sum_{i=1}^{n} \left\{ \frac{x_{i} - \overline{x}}{\sqrt{\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}}} \right\} \left\{ \frac{y_{i} - \overline{y}}{\sqrt{\sum_{i=1}^{n}(y_{i} - \overline{y})^{2}}} \right\} \\
    \\
    & = \frac{\sum_{i=1}^{n}(x_{i} - \overline{x})(y_{i} - \overline{y})}{\sqrt{\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}}\sqrt{\sum_{i=1}^{n}(y_{i} - \overline{y})^{2}}} \\
    \\
    & = \frac{S_{xy}}{\sqrt{S_{xx}}\sqrt{S_{yy}}}
    \end{align*}
    $$

Cauchy-Schwartz 부등식에 의해 표본상관계수 $r$은 반드시 -1에서 1 사이의 값을 가진다.  

$$
\begin{gathered}
\left( \sum a_{i}b_{i} \right)^{2} \leq \sum a_{i}^{2}\sum b_{i}^{2} \\
\\
\Rightarrow -1 \leq r \leq 1
\end{gathered}
$$

표본상관계수 구하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def pearson(data_a: numeric, data_b: numeric, dof: int = 0) -> float:
        """returns Pearson correlation coefficient of two data"""

        b_a, s_a = bar(data_a), std(data_a, dof)
        b_b, s_b = bar(data_b), std(data_b, dof)
        return sum(standardize(a, b_a, s_a) * standardize(b, b_b, s_b) for a, b in zip(data_a, data_b)) / len(data_a) - dof


    def corrcoef(a: numeric, b: numeric) -> float:
        """returns Pearson's r of two data"""

        return cov(a, b) / ((cov(a, a) * cov(b, b)) ** 0.5)
    ```

=== "NumPy"

    ```python
    import numpy as np

    a = [2.23, 4.78, 7.21, 9.37, 11.64, 14.23, 16.55, 18.70, 21.05, 23.21]
    b = [139, 123, 115, 96, 62, 54, 10, -3, -13, -55]

    corrcoef = np.corrcoef(a, b)
    ```

=== "SciPy"

    ```python
    from scipy import stats

    a = [2.23, 4.78, 7.21, 9.37, 11.64, 14.23, 16.55, 18.70, 21.05, 23.21]
    b = [139, 123, 115, 96, 62, 54, 10, -3, -13, -55]

    pearsonr = stats.pearsonr(a, b)
    ```

#### 표본상관계수의 성질

표본상관계수의 성질은 아래와 같다.  

- 기울기를 가지는 직선에 조밀하게 모일수록 $r$의 절대값은 1에 근접한다.
- $r$이 양수/음수이면 양/음의 상관관계가 존재한다.
- $r \simeq 0$이면 상관관계가 없다. 그러나 직선이 아닌 다른 관계가 존재할 수 있다.

상관계수 사용 시 주의점은 아래와 같다.  

- 상관계수는 두 변수 간의 직선관계가 있는지를 나타낼 뿐 인과관계를 나타내는 것이 아니다.
    - 잠복변수(lurking variable)로 인한 허위상관(spurious correlation)을 제거하려면, 각 변수에서 잠복변수의 영향력을 제거한 후 상관관계를 분석해야 한다.
- 별개의 그룹을 통합하여 상관관계를 분석해서는 안 된다.

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
