---
slug: sampling-distribution
title: '[기초통계학] 12. 확률표본과 중심극한정리'
date:
    created: 2023-02-15
description: >
    확률표본, 표본분포, 중심극한정리
categories:
    - Statistics
tags:
    - statistics 101
    - probability
    - python
---

확률표본, 표본분포, 중심극한정리

<!-- more -->

---

## 1. 확률표본

### 1-1. 확률표본

모집단에서 무작위로 선택된 관측값을 **확률표본(random sample)**이라 한다. 확률표본은 서로 독립이고 동일한 분포를 따른다고 가정하며 이를 **iid(independent and identically distributed)**라 한다.  

확률표본을 정규분포에서 추출한 경우 아래와 같이 표현한다.  

$$
X_{1}, \cdots, X_{n} \overset{\text{iid}}{\sim} N(\mu, \sigma^{2})
$$

확률표본은 독립이기 때문에 결합분포는 각각의 주변분포의 곱으로 표시한다.  

$$
f_{X_{1}, \cdots, X_{n}}(x_{1}, \cdots, x_{n}) = f_{X_{1}}(x_{1}), \cdots, f_{X_{n}}(x_{n}) = \prod_{i=1}^{n}f_{X_{i}}(x_{i})
$$

이 때, 각각의 확률표본은 동일한 분포를 따르기 때문에 동일한 확률질량(밀도)함수를 가지며, 따라서 아래와 같이 표현할 수 있다.  

$$
f_{X_{1}, \cdots, X_{n}}(x_{1}, \cdots, x_{n}) = \prod_{i=1}^{n}f(x_{i})
$$

### 1-2. 모수적 추론

**모수(population parameter)**란 모평균, 모표준편차, 모분산 등 모집단에 대한 데이터를 말한다. 확률표본을 뽑는 이유는 모수에 대한 추론을 통해 모집단을 추정하기 위해서인데, 이를 **모수적 추론**이라 한다. 모집단에 대한 추론을 수행하기 위해 관측 가능한 표본의 함수값, 즉 **통계량(statistic)**을 도출하는데, 이 때 관측 가능하다는 것은 통계량이 미지의 모수를 포함하고 있지 않다는 것을 의미한다.  

또한 모수의 추정에서 사용되는 통계량을 **추정량(estimator)**이라 하며, 추정량의 관측값을 **추정치/추정값(estimate)**이라 한다. 해당 용어들을 표현하기 위해 일반적으로 사용하는 기호들은 아래와 같다.  

- 모수: $\theta$
- 추정량: $\widehat{\theta}$
- 추정량의 기대값: $E(\widehat{\theta}) = \overline{\widehat{\theta}}$

### 1-3. 표본분포

통계량의 확률분포를 **표본분포(sampling distribution)**라 하며, 통계량의 [표준편차](2022-12-18-univariate_data.md/#_8)($SD$)를 **표준 오차(standard error)**라고 한다.  

표본평균/표본비율, 표본분산/표본표준편차, 극한값 등 다양한 통계량이 있는데, 표본평균을 예로 들면 평균이 $\mu$, 분산이 $\sigma^{2}$인 [정규분포](2023-02-11-normal_distribution.md)에서 $n$개의 확률표본을 추출했을 때 표본평균 $\overline{X}$의 분포는 아래와 같다.  

$$
\begin{align*}
E(\overline{X}) & = \mu \\
\\
Var(\overline{X}) & = \frac{\sigma^{2}}{n} \\
\\
SD(\overline{X}) & = \frac{\sigma}{\sqrt{n}}
\end{align*}
$$

??? note "표본평균의 표본분포 유도"
    $$
    \begin{align*}
    E(\overline{X}) & = E \left( \frac{\overline{X}_{1} + \cdots + \overline{X}_{n}}{n} \right) \\
    \\
    & = \frac{n}{n}E(\overline{X}) = \mu \\
    \\
    Var(\overline{X}) & = Var \left( \frac{\overline{X}_{1} + \cdots + \overline{X}_{n}}{n} \right) \\
    \\
    & = \frac{Var(\overline{X})}{n^{2}} = \frac{\sigma^{2}}{n} \\
    \\
    SD(\overline{X}) & = \frac{\sigma}{\sqrt{n}}
    \end{align*}
    $$

모집단이 정규분포일 때 통계량 $\overline{X}$을 [표준화](2022-12-18-univariate_data.md/#_9) 하면 아래와 같다.  

$$
\begin{gathered}
\frac{\overline{X} - \mu}{\sigma / \sqrt{n}} \sim N(0, 1) \\
\\
\Rightarrow \frac{\sqrt{n}(\overline{X} - \mu)}{\sigma} \sim N(0, 1)
\end{gathered}
$$

## 2. 큰 수의 법칙과 중심극한정리

### 2-1. 큰 수의 법칙

위에서 확인했듯이 평균이 $\mu$, 분산이 $\sigma^{2}$인 [정규분포](2023-02-11-normal_distribution.md)에서 $n$개의 확률표본을 추출했을 때 [표본평균](2022-12-18-univariate_data.md/#1-1) $\overline{X}$의 평균과 분산은 각각 $\mu$와 $\sigma^{2}/n$이 된다. 이 때, $n$이 무한대로 발산하면 $\overline{X}$는 $\mu$로 수렴한다.  

이처럼 표본집단의 크기가 커지면 그 표본평균이 모평균에 가까워지며 결과적으로 [확률분포](2022-12-29-random_variable_probability_distribution.md/#1-1)가 [통계적 확률](2022-12-24-statistical_probability.md/#3)로 수렴하는 것을 큰 수의 법칙이라고 한다.  

이러한 정리가 **큰 수의 법칙(law of large numbers)** 중 하나인 약한 큰 수의 법칙이며 아래와 같이 표현한다.  

$$
\lim_{n \to \infty}P(\vert \overline{X} - \mu \vert < \varepsilon) = \lim_{n \to \infty}P \left(\left| \frac{1}{n}\sum^{n}_{k=1}X_{k} - \mu \right| < \varepsilon \right) = 1, \quad \forall \ \varepsilon > 0
$$

여기서 $n$은 일반적으로 30을 기준으로 얘기하나 절대적인 값이 아니며, 상황에 따라 $n$이 30보다 작아도 정규분포에 잘 근사하는 경우와 100을 넘어도 정규분포에 잘 근사하지 못하는 경우도 있다. 따라서 별도의 실험 등을 통해서 확인해야 한다.  

### 2-2. 중심극한정리

평균이 $\mu$, 분산이 $\sigma^{2}$인 모집단에서 추출된 확률표본 $X_{1}, \cdots, X_{n}$이 있을 때, $n$이 커질수록 모집단의 형태와 관계없이 $\overline{X}$의 분포는 정규분포에 근사하는데, 이를 **중심극한정리(central limit theorem)**라 한다.  

$$
\begin{gathered}
\overline{X} \simeq N(\mu, \frac{\sigma^{2}}{n}) \\
\\
\Rightarrow Z = \frac{\overline{X} - \mu}{\sigma / \sqrt{n}} \simeq N(0, 1)
\end{gathered}
$$

$Y = X_{1} + \cdots + X_{n}$일 때 $Y$의 분포는 아래와 같다.  

$$
\begin{gathered}
Z = \frac{Y - n\mu}{\sqrt{n}\sigma} \simeq N(0, 1) \\
\\
\Rightarrow Y \simeq N(n\mu, n\sigma^{2})
\end{gathered}
$$

이처럼 확률표본이 정규분포를 따른다는 점을 이용하면 통계량 $\overline{X}$가 특정 구간에 속할 확률을 쉽게 구할 수 있다.  

## 3. 다양한 통계량의 표본분포

### 3-1. 표본평균의 표본분포

[이항분포](2023-01-07-discrete_distribution.md/#2)의 [표본평균](2022-12-18-univariate_data.md/#1-1)은 각각의 조건에 따라 아래와 같이 근사한다.  

- $n$이 크고 $p$가 작은 경우: 포아송 근사
- $n$이 크고 $p$가 큰 경우: 포아송 근사
- $n$이 크고 $p$가 0.5에서 많이 벗어나지 않은 경우: 정규 근사

$X \sim B(n, p)$이고, $X_{i}$는 $i$번째 베르누이 확률변수를 의미할 때 아래와 같이 정리할 수 있다.  

$$
\begin{gathered}
X \sim B(n, p), \ X = X_{1} + \cdots + X_{n} \\
\\
\Rightarrow E(X_{i}) = p, \quad Var(X_{i}) = p(1 - p) \\
\\
\Rightarrow E(X) = np, \quad Var(X) = np(1 - p)
\end{gathered}
$$

!!! note
    $np$ 또는 $n(1 - p)$의 값이 5 이상일 때 정규 근사를 적용할 수 있으며, 그 이하일 경우 포아송 근사를 활용하는 편이 좋다.  

이 때, $X$의 평균 $\overline{X}$는 표본 비율(성공한 비율) $\widehat{p}$을 의미하며 아래와 같이 정리할 수 있다.  

$$
\begin{gathered}
\widehat{p} = \frac{X}{n} = \overline{X} \\
\\
\Rightarrow E(\widehat{p}) = p, \quad Var(\widehat{p}) = \frac{Var(X)}{n^{2}} = \frac{p(1 - p)}{n}
\end{gathered}
$$

이 때 $n$이 충분히 클 경우 중심극한정리에 따라 아래와 같이 정리할 수 있다.  

$$
\widehat{p} \simeq N \left( p, \frac{p(1 - p)}{n} \right)
$$

위 분포를 표준정규화하면 아래와 같다.  

$$
\begin{gathered}
\frac{\widehat{p} - p}{\sqrt{p(1 - p) / n}} \simeq N(0, 1) \\
\\
\Rightarrow \frac{n(\widehat{p} - p)}{n(\sqrt{p(1 - p) / n})} = \frac{X - np}{\sqrt{np(1 - p)}} \simeq N(0, 1) \\
\\
\Rightarrow X \simeq N(np, np(1 - p))
\end{gathered}
$$

이와 같이 이항분포를 정규 근사할 때, 이항분포는 이산형이고 정규분포는 연속형이기 때문에 범위의 경계 지점을 포함하는지 여부에 대한 모순이 발생한다. 따라서 이를 해결하기 위해 여분의 0.5를 더하거나 빼는 것으로 보정해주는데, 이를 **연속성 수정(continuity correction)**이라 한다.  

$$
\begin{gathered}
P(X > x) = P(X \geq x + 1), \ P(X \geq x) = P(X > x - 1) \\
\\
\Rightarrow P(X < x) \simeq P \left( Z < \frac{x - 1/2 - np}{\sqrt{np(1 - p)}} \right) \simeq P(X \leq x - 1) \\
\\
\Rightarrow P(X > x) \simeq P \left( Z > \frac{x + 1/2 - np}{\sqrt{np(1 - p)}} \right) \simeq P(X \geq x - 1)
\end{gathered}
$$

### 3-2. 표본분산의 표본분포

모집단이 정규분포를 따를 때, [표본분산](2022-12-18-univariate_data.md/#_7)의 표본분포는 자유도가 $n - 1$인 카이제곱분포로 근사한다.  

$$
P(X) \simeq \chi_{n - 1}^{2}
$$

### 3-3. 최대값의 표본분포

최대값이 $x$보다 작거나 같다는 것은 모든 관측값이 $x$보다 작거나 같다는 것을 의미한다. 따라서 확률표본 $X_{1}, \cdots, X_{n}$의 최대값의 표본분포의 누적분포함수는 아래와 같이 정리할 수 있다.  

$$
\begin{align*}
F_{X_{(n)}}(x) & = P(X_{(n)} \leq x) = P(X_{1} \leq x, \cdots, X_{n} \leq x) \\
\\
& = \prod_{i=1}^{n}P(X_{i} \leq x) = P(X_{1} \leq x)^{n} = F(x)^{n}
\end{align*}
$$

$X_{i}$가 연속확률변수이면 확률밀도함수 $f(x)$는 아래와 같다.  

$$
\begin{gathered}
f(x) = \frac{d}{dx}F(x) \\
\\
\Rightarrow f_{X_{(n)}}(x) = \frac{d}{dx}\{ F(x)^{n} \} = nF(x)^{n - 1}f(x)
\end{gathered}
$$

### 3-4. 최소값의 표본분포

최소값이 $x$보다 크다는 것은 모든 관측값이 $x$보다 크다는 것을 의미한다.  

$$
P(X_{(1)} > x) = 1 - P(X_{(1)} \leq x)
$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)