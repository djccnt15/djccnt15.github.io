---
slug: random-variable-probability-distribution
title: '[기초통계학] 07. 확률변수와 확률분포'
date:
    created: 2022-12-29
description: >
    확률변수와 확률분포
categories:
    - Statistics
tags:
    - statistics 101
    - probability
    - python
---

확률변수와 확률분포

<!-- more -->

---

## 1. 확률변수

**확률변수(random variable)**는 표본공간에서 정의된 실함수(real-valued function)를 의미하는데, 좀 더 쉽게 설명하자면 정의역(domain)이 표본공간 $\Omega$이고 공역(codomain)이 실수인 함수를 확률변수라고 하며, 아래와 같이 $f(x)$ 대신에 알파벳 대문자로 표시한다.  

$$
X(w) = X
$$

불확실성을 가지는 사회적, 자연적 현상을 일종의 확률실험으로 이해한다면, 표본공간을 숫자로 표시하고 불확실한 현상을 수학적으로 모형화(modeling) 할 수 있어 **구체적으로 계량화된 분석**을 할 수 있다. 정리하자면 확률변수라는 근거를 통해 불확실한 현상을 수학적인 모형으로 만들 수 있다.  

!!! warning
    불확실성을 제거하는 것이 아니다. 불확실성은 제거할 수 없고 수학적으로 모형화할 수 있을 뿐이며, 통계학은 불확실성을 제거하는 것이 아니라 불확실성을 수학적으로 모델링 하는 학문이다.  

### 1-1. 확률분포

확률변수는 표본공간의 값을 숫자로 바꾼 함수로, 확률변수가 어떤 값을 가진다는 것은 표본공간 내에 대응하는 원소들이 존재한다는 뜻이다. 이를 수학적으로 표현하면 아래와 같은 의미가 된다.  

- $X = x$ 인 표본공간 상에 $\{ w \vert X(w) = x, \ w \in \Omega \}$를 만족하는 사건이 존재한다.
- 임의의 상수 $a, b$에 대해 $a \leq X \leq b$ 이면 표본공간 상에 $\{ w \vert a \leq X(w) \leq b, \ w \in \Omega \}$를 만족하는 사건이 존재한다.

따라서 확률변수에 대해 $X = x$ 또는 $a \leq X \leq b$ 에 대응하는 확률을 계산할 수 있다. 이 때 확률변수는 숫자로 표시되고 해당 숫자에 대한 확률을 구할 수 있기 때문에 확률변수의 값에 따라 확률이 어떤 형태로 분포되어 있는지를 말할 수 있는데, 이를 **확률분포(probability distribution)**라 하고, 확률분포를 표로 정리한 것을 확률분포표(probability distribution table)라 한다.  

[상대도수의 극한의 개념](2022-12-24-statistical_probability.md/#3)에 따라 확률은 모집단의 구성 형태를 보여주기 때문에, 확률분포는 모집단을 숫자로 표현했을 때의 형태, 즉 모집단의 확률구조를 보여준다고 볼 수 있다.  

## 2. 이산확률변수와 확률질량함수

확률변수가 가질 수 있는 값들이 가산(countable), 즉 셀 수 있는 경우에 **이산확률변수(discrete random variable)**라고 하며, 이산확률변수의 확률구조를 **확률질량함수(probability mass function, PMF)**를 통해 나타낼 수 있다. 이산확률변수 $X$가 임의의 값 $x$일 확률의 확률질량함수 $f(x)$는 아래와 같이 표현할 수 있다.  

$$
f(x) = P(X = x) = f_{X}(x) = p(x) = P_{X}(x)
$$

### 2-1. 확률질량함수의 성질

확률질량함수의 성질은 아래와 같다.  

- 모든 경우에서 확률은 0 이상 1 이하이다.

$$
0 \leq f(x_{i}) \leq 1
$$

- 모든 경우의 확률의 합은 1이다.

$$
\sum_{i=1}^{n}f(x_{i}) = 1
$$

- 특정 구간의 확률을 구하려면 해당 구간에 존재하는 확률을 모두 더하면 된다.

$$
P(a \leq X \leq b) = \sum_{x_{i} \in [a, b]} f(x_{i})
$$

세 번째 성질의 특수한 형태로 **누적분포함수(cumulative distribution function, CDF)**가 있으며, 의미는 아래와 같다.  

$$
P(X \leq x) = \sum_{x_{i} \leq x} f(x_{i}) \equiv F(x), \quad -\infty < x < \infty
$$

### 2-2. 확률변수의 변환

확률변수의 함수도 확률변수로 확률변수의 변환을 통해 변환된 확률변수의 확률분포를 유도하는 것이 가능하다. 변환된 확률변수의 확률질량함수를 $W = g(x)$라 할 때, 다음의 식이 성립한다.  

$$
f_{W}(w) = P(W = w) \ \to \ \sum_{w=g(w)}P(X = x) = \sum_{w=g(w)}f_{X}(x)
$$

## 3. 연속확률변수와 확률밀도함수

확률변수가 가질 수 있는 값이 셀 수 없을 정도로 많은 경우에 **연속확률변수(continuous random variable)**라고 하며, 연속확률변수의 확률구조를 **확률밀도함수(probability density function, PDF)**를 통해 나타낼 수 있다.  

[히스토그램](2022-12-17-variable_types.md/#4)에서 면적이 해당 구간에서의 비율을 의미하듯이, 확률밀도함수에서의 면적은 해당 구간에서의 확률을 의미하며, $f(x)$는 $x$에서의 확률이 아니라 그 위치에서 상대적으로 얼마나 밀집되어 있는지를 나타낸 것이다.  

### 3-1. 확률밀도함수의 성질

확률밀도함수의 성질은 다음과 같다.  

- 모든 $x$에서 확률밀도는 0보다 크거나 같다.

$$
f(x) \geq 0
$$

- 전체 확률밀도함수를 적분한 값은 1이다.

$$
\int_{-\infty}^{\infty}f(x)dx = 1
$$

- 연속확률변수 $X$가 구간 $[a, b]$에 속할 확률은 확률밀도함수 $f(x)$의 적분을 통해 구할 수 있다.

$$
P(a \leq X \leq b) = \int_{a}^{b}f(x)dx
$$

세 번째 성질의 특수한 형태로 **누적분포함수(cumulative distribution function, CDF)**가 있으며, 의미는 아래와 같다.  

$$
P(X \leq x) = \int_{-\infty}^{x}f(u)du = F(x)
$$

- (주의❗) 연속확률변수에서 $X$가 **구간이 아닌 특정 값**일 확률은 0이다.  

$$
\begin{gathered}
P(X = x) = 0 \\
\\
P(a < X < b) = P(a \leq X < b) = P(a < X \leq b) = P(a \leq X \leq b)
\end{gathered}
$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)