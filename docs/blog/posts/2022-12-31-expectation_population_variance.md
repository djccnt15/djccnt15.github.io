---
slug: expectation-population-variance
title: '[기초통계학] 08. 기대값과 모분산'
date:
    created: 2022-12-31
description: >
    모집단의 기대값과 분포
categories:
    - Statistics
tags:
    - statistics 101
    - expectation
    - variance
---

모집단의 기대값과 분포  

<!-- more -->

---

## 1. 모평균(기대값)

[표본평균](./2022-12-18-univariate_data.md/#표본평균)을 [상대도수](./2022-12-17-variable_types.md/#2-범주형-자료와-상대도수)를 이용한 식으로 표현하면 아래와 같이 관측된 자료의 값에 각 자료가 전체 자료에서 차지하는 비율을 곱하여 더한 것으로 표현할 수 있다.  

$$
\overline{x} = \sum_{i=1}^{n}x_{i} \frac{n_{i}}{n} = \sum_{i=1}^{n}x_{i}p_{i}, \quad p_{i} = \frac{n_{i}}{n}
$$

이 때 $n_{i}$는 도수분포에서 $i$ 번째 값의 개수이고 $p_{i}$는 $i$ 번째 값의 표본비율이므로, [상대도수의 극한의 개념](./2022-12-24-statistical_probability.md/#3-통계적-확률)에 따라 위 식에서 $n$이 무한대로 발산하면 모집단에서 각 사건이 발생할 확률이 되어 이를 통해 모평균을 구할 수 있다. 이를 **[큰 수의 법칙(Law of large numbers, LLN)](https://en.wikipedia.org/wiki/Law_of_large_numbers)**이라 한다.  

$$
\overline{x} = \sum_{i}x_{i}p_{i} \ \to \ \overline{X} = \sum_{i}x_{i}f(x_{i}) = \mu = E(X)
$$

위와 같이 확률변수에 대해 평균적으로 기대하는 값, 즉 **모평균(population mean)**을 확률변수의 **기대값(expected value)**이라 하며, 확률분포 또는 모집단의 중심경향치가 된다.  

이산확률변수와 연속확률변수에서 $X$의 기대값은 각각 아래와 같이 계산할 수 있다.  

$$
\begin{align*}
E(X) & = \sum_{x}xf(x) = \mu \\
\\
E(X) & = \int xf(x)dx = \mu
\end{align*}
$$

### 1-1. 변환된 확률변수의 기대값

확률변수 $X$의 변환된 확률변수를 $Y = g(X)$라 할 때, 이산확률변수와 연속확률변수에서 $Y$의 기대값은 각각 아래와 같이 구할 수 있다.  

$$
\begin{align*}
E(Y) & = E(g(X)) = \sum_{x}g(x)f_{X}(x) \\
\\
E(Y) & = E(g(X)) = \int g(x)f_{X}(x)dx
\end{align*}
$$

### 1-2. 기대값의 성질

기대값의 성질은 아래와 같다.  

- 임의의 상수 $a$의 기대값은 $a$와 같다.

$$
E(a) = \sum_{x}af(x) = a\sum_{x}f(x) = a
$$

- 변환된 확률변수 $aX + b$의 기대값은 아래와 같다.

$$
\begin{align*}
E(aX + b) & = \sum_{x}(ax + b)f(x) \\
\\
& = a\sum_{x}xf(x) + b \\
\\
& = aE(X) + b
\end{align*}
$$

- 임의의 함수 $g_{1}, g_{2}$의 기대값은 아래와 같다.  

$$
\begin{align*}
E(g_{1}(X) + g_{2}(X)) & = \sum_{x} \{ g_{1}(x) + g_{2}(x) \} f(x) \\
\\
& = \sum_{x}g_{1}(x)f(x) + \sum_{x}g_{2}(x)f(x) \\
\\
& = E(g_{1}(X)) + E(g_{2}(X))
\end{align*}
$$

## 2. 모분산

[표본분산](./2022-12-18-univariate_data.md/#표본분산)을 [상대도수](./2022-12-17-variable_types.md/#2-범주형-자료와-상대도수)를 이용한 식으로 표현하면 아래와 같이 표현할 수 있다.  

$$
s^{2} = \frac{1}{n - 1}\sum_{i=1}^{k}n_{i}(x_{i} - \overline{x})^{2} = \frac{n}{n - 1}\sum_{i=1}^{k}(x_{i} - \overline{x})^{2}p_{i}, \quad p_{i} = \frac{n_{i}}{n}
$$

모평균과 마찬가지로 [상대도수의 극한의 개념](./2022-12-24-statistical_probability.md/#3-통계적-확률)에 따라 위 식에서 $n$이 무한대로 발산하면 모집단에서의 자료의 분포에 대한 정보가 되어 아래와 같이 **모분산(population variance)**에 대한 식을 도출할 수 있다.  

$$
s^{2} = \frac{n}{n - 1}\sum_{i=1}^{k}(x_{i} - \overline{x})^{2}p_{i} \ \to \ \sigma^{2} = \sum_{i=1}^{k}(x_{i} - \mu)^{2}f(x_{i}) = Var(x)
$$

모분산은 $X$가 변환된 함수이기 때문에 [변환된 확률변수](#1-1-변환된-확률변수의-기대값)로 표현할 수 있으며, 따라서 이산확률변수와 연속확률변수의 모분산을 아래와 같이 구할 수 있다.  

$$
\begin{align*}
Var(X) & = \sum_{i=1}^{k}(x_{i} - \mu)^{2}f(x_{i}) = E((X - \mu)^{2}) \\
\\
& = E(X^{2}) - \mu^{2} = E(X^{2}) - E(X)^{2}\\
\\
Var(X) & = \int(x - \mu)^{2}f(x)dx = \int x^{2}f(x)dx - \left( \int xf(x)dx \right)^{2}
\end{align*}
$$

??? note "모분산 간편식의 유도"
    $$
    \begin{align*}
    Var(X) & = \sum_{i=1}^{k}(x_{i} - \mu)^{2}f(x_{i}) = E((X - \mu)^{2}) \\
    \\
    & = \sum_{i=1}^{k}(x_{i}^{2} - 2x_{i}\mu + \mu^{2})f(x_{i}) \\
    \\
    & = \sum_{i=1}^{k}x_{i}^{2}f(x_{i}) - 2\mu\sum_{i=1}^{k}x_{i}f(x_{i}) + \mu^{2} \\
    \\
    & = \sum_{i=1}^{k}x_{i}^{2}f(x_{i}) - 2\mu^{2} + \mu^{2} = \sum_{i=1}^{k}x_{i}^{2}f(x_{i}) - \mu^{2} \quad \because \sum_{i=1}^{k}x_{i}f(x_{i}) = \mu \\
    \\
    & = E(X^{2}) - \mu^{2} = E(X^{2}) - E(X)^{2}
    \end{align*}
    $$

**모표준편차(population standard deviation)**는 아래와 같이 구할 수 있다.  

$$
\sigma = \sqrt{\sigma^{2}} = SD(X)
$$

### 2-1. 모분산의 성질

모분산의 성질은 아래와 같다.  

- 자료의 분포에 변화를 주는 계수는 제곱이 되고, 전체 자료의 위치를 일괄적으로 변화시키는 상수항은 0이 된다.

$$
Var(aX + b) = a^{2}Var(X)
$$

??? note "증명"
    $$
    \begin{align*}
    E(aX + b) & = aE(X) + b = a\mu + b \\
    \\
    \Rightarrow Var(X) & = E((aX + b - a\mu - b)^{2}) \\
    \\
    & = E((a(X - \mu))^{2}) = E(a^{2}(X - \mu)^{2}) \\
    \\
    & = a^{2}E((X - \mu)^{2}) = a^{2}Var(X)
    \end{align*}
    $$

- 변환된 확률변수의 표준편차를 구할 때는 계수가 절대값으로 변환된다.

$$
SD(aX + b) = \sqrt{Var(aX + b)} = \sqrt{a^{2}Var(X)} = \vert a \vert SD(X)
$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
