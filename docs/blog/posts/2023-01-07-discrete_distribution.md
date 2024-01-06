---
slug: discrete-distribution
title: '[기초통계학] 10. 다양한 이산확률분포'
date:
    created: 2023-01-07
description: >
    베르누이 분포, 이항분포, 초기하분포, 포아송 분포, 기하분포, 음이항분포, 다항분포
categories:
    - Statistics
tags:
    - statistics 101
    - probability
    - python
---

베르누이 분포, 이항분포, 초기하분포, 포아송 분포, 기하분포, 음이항분포, 다항분포

<!-- more -->

---

## 1. 베르누이 분포

다음의 조건을 만족하는 실험을 **베르누이 시행(Bernoulli trial)**이라 한다.  

- 각 실험에서 발생 가능한 결과가 단 두 가지
- 각 실험은 독립적으로 수행
- 모든 실험에서 결과의 확률은 항상 동일

!!! note
    모집단이 충분히 크고 표본크기가 상대적으로 크지 않은 경우 비복원추출도 베르누이 실험을 근사모형으로 사용 가능하다.  

모수(parameter)인 성공 확률이 $p$인 베르누이 시행의 확률변수의 분포를 **베르누이 분포(Bernoulli distribution)**라 하고, 아래와 같이 표기한다.  

$$
X \sim B(p)
$$

베르누이 분포의 확률질량함수의 일반식은 아래와 같다.  

$$
f(x) = P(X = x) = p^{x}(1 - p)^{1 - x}, \quad x = 0, 1
$$

베르누이 분포의 확률질량함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    def bernoulli_d(p: float, x: int = 0 | 1, n: int = 1) -> float:
        """
        returns probability of bernoulli distribution
        x: case
        p: probability
        """

        return (p ** x) * ((1 - p) ** (n - x))
    ```

=== "SciPy"

    ```python
    from scipy.stats import bernoulli

    print(bernoulli.pmf(k=1, p=0.2))
    ```

베르누이 분포의 기대값과 분산은 아래와 같다.  

$$
\begin{align*}
& E(X) = 0 \times (1 - p) + 1 \times p = p \\
\\
& E(X^{2}) = 0^{2} \times (1 - p) + 1^{2} \times p = p \\
\\
& Var(X) = p - p^{2} = p(1 - p) \\
\\
& SD(X) = \sqrt{p(1 - p)}
\end{align*}
$$

## 2. 이항분포

성공 확률이 $p$인 베르누이 실험을 $n$번 반복했을 때, 성공 횟수 $X$의 분포를 **이항분포(binomial distribution)**라 한다.  

$X_{i} \sim B(p)$라고 할 때, 성공 횟수 $X$는 $n$개의 베르누이 확률변수의 합으로 표시한다.  

$$
X = X_{1} + X_{2} + \cdots + X_{n}
$$

따라서 [독립인 결합분포의 성질](2023-01-01-probability_vector_covariance.md/#2)을 바탕으로 이항분포의 기대값과 분산을 유도하면 아래와 같다.  

$$
\begin{align*}
E(X_{i}) = p \ & \to \ E(X) = np \\
\\
Var(X_{i}) = p(1 - p) \ & \to \ Var(X) = np(1 - p) \\
\\
SD(X_{i}) = \sqrt{p(1 - p)} \ & \to \ SD(X) = \sqrt{np(1 - p)}
\end{align*}
$$

시행 횟수를 $n$, 성공 확률 $p$인 이항분포를 아래와 같이 표기한다.  

$$
X \sim B(n, p)
$$

이항분포의 확률질량함수의 일반식은 아래와 같다.  

$$
f(x) = \binom{n}{x}p^{x}(1 - p)^{n - x}, \quad x = 0, 1, \cdots, n
$$

이항분포의 확률질량함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    def binom_d(x: int, n: int, p: float) -> float:
        """
        returns probability of binom distribution
        x: case
        n: number of trial
        p: probability
        """

        return combination(n, x) * bernoulli_d(x=x, n=n, p=p)


    def binom_c(x: int, n: int, p: float, start: int = 0) -> float:
        """
        returns cumulative probability of binom distribution
        x: case
        n: number of trial
        p: probability
        """

        return sum(binom_d(i, n, p) for i in range(start, x + 1))
    ```

=== "SciPy"

    ```python
    from scipy.stats import binom

    print(binom.pmf(k=8, n=15, p=0.5))
    print(binom.cdf(k=8, n=15, p=0.5))
    ```

$X \sim B(m, p), Y \sim B(n, p)$이고 $X, Y$가 독립인 경우 이항분포의 결합은 아래와 같다.  

$$
X + Y \sim B(m + n, p)
$$

NumPy를 사용하면 이항분포하는 표본을 쉽게 만들 수 있다.  

=== "NumPy"

    ```python
    import numpy as np

    data = np.random.default_rng(seed=0).binomial(n=10, p=0.5, size=1000)
    ```

## 3. 초기하분포

각 실험에서 발생 가능한 결과가 단 두 가지이고, 크기가 $N$인 모집단(유한모집단)이 각각 $M$과 $N - M$ 크기의 부모집단 $A, B$로 나뉘어진 경우에서 $n$개의 표본을 무작위로 비복원추출할 때, 부모집단 $A$에서 추출된 표본 수의 분포를 **초기하분포(hypergeometric distribution)**라 한다.  

초기하분포의 확률질량함수의 일반식은 아래와 같다.  

$$
f(x) = \frac{\binom{M}{x}\binom{N - M}{n - x}}{\binom{N}{n}}, \quad x = max(0, n - N + M), \cdots, min(n, M)
$$

=== "Python"

    ```python
    def hyper_d(x: int, M: int, n: int, N: int) -> float:
        """
        returns probability of hypergeometric distribution
        x: case
        M: size of subpopulation
        n: size of sample
        N: size of population
        """

        return combination(M, x) * combination(N - M, n - x) / combination(N, n)


    def hyper_c(x: int, M: int, n: int, N: int, start: int = 0) -> float:
        """
        returns cumulative probability of hypergeometric distribution
        x: case
        M: size of subpopulation
        n: size of sample
        N: size of population
        """

        return sum(hyper_d(x=x, n=n, N=N, M=M) for x in range(start, x + 1))
    ```

=== "SciPy"

    ```python
    from scipy.stats import hypergeom

    k = 1  # case
    n = 4  # size of subpopulation
    N = 3  # size of sample
    M = 10  # size of population

    print(hypergeom.pmf(k=k, n=n, N=N, M=M))
    print(hypergeom.cdf(k=k, n=n, N=N, M=M))
    ```

!!! warning
    SciPy는 수식 표기가 조금 달라 변수 입력 시에 주의해야 한다. SciPy에서 사용하는 초기하분포의 확률질량함수는 아래와 같다.  

$$
p(k, M, n, N) = \frac{\binom{n}{k}\binom{M - n}{N - k}}{\binom{M}{N}}
$$

$N$이 크고 $N$에 비해 $n$이 상대적으로 매우 작은 경우($n \ll N$) 비복원의 효과가 적기 때문에 베르누이 실험으로 근사하며, 따라서 초기하분포 역시 $p = M/N$인 이항분포로 근사한다.  

초기하분포의 기대값과 분산은 아래와 같다.  

$$
\begin{align*}
E(X) & = n \frac{M}{N} = np \\
\\
Var(X) & = np(1 - p) - n(n - 1)\frac{p(1 - p)}{N - 1} \\
\\
& = np(1 - p)\frac{N - n}{N - 1} = n\frac{M}{N} \left( 1 - \frac{M}{N} \right) \leq np(1 - p)
\end{align*}
$$

??? note "초기하분포 기대값과 분산의 유도"

    초기하분포 기대값의 유도

    $$
    E(X_{i}) = \frac{M}{N} = p \ \to \ E(X) = n \frac{M}{N} = np
    $$

    초기하분포 분산의 유도

    $$
    \begin{align*}
    E(X_{i}) & = \frac{M}{N} = p, \quad E(X_{i}^{2}) = \frac{M}{N} = p \\
    \\
    \therefore Var(X_{i}) & = p - p^{2} = p(1 - p) = \frac{M}{N}\frac{N - M}{N} \\
    \\
    \therefore Var(X) & = \sum_{i}Var(X_{i}) + 2\sum_{i < j}Cov(X_{i}, X_{j}) \\
    \\
    Cov(X_{i}, X_{j}) & = E(X_{i}X_{j}) - E(X_{i})E(X_{j}) \\
    \\
    E(X_{i}X_{j}) & = P(X_{i} = 1, X_{j} = 1) \quad \because X_{i} = 0 \ \to \ E(X_{i}X_{j}) = 0 \\
    & = P(X_{i} = 1)P({X_{j} = 1 \vert X_{i} = 1}) = \frac{M}{N}\frac{M - 1}{N - 1} \\
    \\
    \therefore Cov(X_{i}, X_{j}) & = \frac{M}{N}\frac{M - 1}{N - 1} - \left( \frac{M}{N} \right)^{2} \\
    & = -\frac{M}{N}\frac{N - M}{N(N - 1)} = -\frac{p(1 - p)}{N - 1} \leq 0 \\
    \\
    \therefore Var(X) & = np(1 - p) - n(n - 1)\frac{p(1 - p)}{N - 1} \\
    & = np(1 - p)\frac{N - n}{N - 1}
    \end{align*}
    $$

이 때 위 식에서 $\frac{N - n}{N - 1}$을 유한모집단 수정계수라 하는데, 유한모집단으로부터 비복원추출을 하면서 분산이 작아진다는 것은 퍼져있는 정도가 작아져 데이터의 변동성이 적어진다는 것을 의미하고, 이를 바탕으로 모수를 추정했을 때 더 안정적인 형태를 갖는다는 것을 의미한다.  

NumPy를 사용하면 초기하분포하는 표본을 쉽게 만들 수 있다.  

=== "NumPy"

    ```python
    import numpy as np

    data = np.random.default_rng(seed=0).hypergeometric(ngood=20, nbad=20, nsample=10, size=100)
    ```

## 4. 포아송 분포

[이항분포](#2)에서 $n$이 매우 커지면 계산에 어려움이 생기는데, 이를 해결하기 위해 포아송 분포를 사용한다.  

확률변수 $X$가 이항분포 $B(n, p)$를 따를 때 $p$가 매우 작으면 큰 $x$에 대한 확률은 무시할 정도로 작아지는데, 이 경우의 확률분포를 **포아송 분포(Poisson distribution)**라 하며 아래와 같이 표기한다.  

$$
X \sim \text{Pois}(\lambda)
$$

즉, 발생 가능성이 희박한 사건이 임의의 구간에서 평균적으로 $\lambda$번 발생하는 상황에서, 구간을 나누었을 때 각 구간의 발생 빈도가 서로 독립(independent increment)이고 구간의 위치와 관계없이 동일 길이의 구간에서의 평균발생 빈도가 동일(stationary increment)하면 해당 분포는 포아송 분포를 따른다고 할 수 있다.  

포아송 분포의 확률질량함수는 아래와 같다.  

$$
f(x) = \binom{n}{x}p^{x}(1 - p)^{n - x} \simeq \frac{e^{-\lambda}\lambda^{x}}{x!}, \quad \lambda = np = E(X)
$$

??? note "포아송 분포의 확률질량함수 유도"
    이항분포하는 확률변수 $X$의 확률질량함수를 $\lambda$를 이용해서 정리하면 아래와 같다.  

    $$
    \begin{gathered}
    E(X) = \lambda = np \ \to \ p = \frac{\lambda}{n} \\
    \\
    \Rightarrow f(x) = \binom{n}{x}p^{x}(1 - p)^{n - x} = \frac{n!}{x!(n - x)!} \left( \frac{\lambda}{n} \right)^{x} \left( 1 - \frac{\lambda}{n} \right)^{n - x}
    \end{gathered}
    $$

    위 식에서 $n$이 무한대로 발산하면 아래와 같이 정리된다.  

    $$
    \begin{gathered}
    \frac{n!}{(n - x)!n^{x}} = \frac{n(n - 1) \cdots (n - x + 1)}{n^{x}} \ \to \ 1 \\
    \\
    \lim_{n \to \infty} \left( 1 - \frac{\lambda}{n} \right)^{n} = e^{-\lambda}, \quad \because \lim_{n \to \infty} \left( 1 + \frac{x}{n} \right)^{n} = e^{x} \\
    \\
    \lim_{n \to \infty} \left( 1 - \frac{\lambda}{n} \right)^{-x} = 1 \\
    \\
    \Rightarrow f(x) = \binom{n}{x}p^{x}(1 - p)^{n - x} \simeq \frac{e^{-\lambda}\lambda^{x}}{x!}
    \end{gathered}
    $$

!!! note
    $p$가 커질수록 포아송 근사와 이항분포의 오차가 커지는데, 일반적으로 $\lambda$ 값이 5보다 작으면 포아송 근사를 사용해도 큰 문제가 없다고 한다.  

포아송 분포의 확률질량함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    import math


    def pois_d(x: int, l: float) -> float:
        """
        returns probability of poisson distribution
        x: case
        l: lambda, expectation of random variable
        """

        return (math.e ** -l) * (l ** x) / factorial(x)


    def pois_c(x: int, l: float, start: int = 0) -> float:
        """
        returns cumulative probability of poisson distribution
        x: case
        l: lambda, expectation of random variable
        """

        return sum(pois_d(i, l) for i in range(start, x + 1))
    ```

=== "SciPy"

    ```python
    from scipy.stats import poisson

    print(poisson.pmf(k=2, mu=2))
    print(poisson.cdf(k=2, mu=2))
    ```

$X \sim \text{Pois}(\lambda_{1}), Y \sim \text{Pois}(\lambda_{2})$이고, $X, Y$가 독립인 경우 포아송 분포의 결합은 아래와 같다.  

$$
X + Y \sim \text{Pois}(\lambda_{1} + \lambda_{2})
$$

포아송 분포의 기대값과 분산은 아래와 같다.  

$$
\begin{align*}
E(X) & = \lambda \\
\\
Var(X) & = \lambda
\end{align*}
$$

??? note "포아송 분포 기대값과 분산의 유도"

    포아송 분포 기대값의 유도

    $$
    \begin{align*}
    E(X) & = \sum_{x=0}^{\infty}x\frac{e^{-\lambda}\lambda^{x}}{x!} = \sum_{x=1}^{\infty}x\frac{e^{-\lambda}\lambda^{x}}{x!} \\
    \\
    & = \lambda\sum_{x=1}^{\infty}\frac{e^{-\lambda}\lambda^{x - 1}}{(x - 1)!} \\
    \\
    y = x - 1 & \ \to \ \lambda\sum_{x=1}^{\infty}\frac{e^{-\lambda}\lambda^{x - 1}}{(x - 1)!} = \lambda\sum_{y=0}^{\infty}\frac{e^{-\lambda}\lambda^{y}}{y!} = \lambda
    \end{align*}
    $$

    포아송 분포 분산의 유도

    $$
    \begin{align*}
    Var(X) & = E(X^{2}) - E(X)^{2} \\
    \\
    & = E(X(X - 1)) + E(X) - E(X)^{2} \\
    \\
    & = \lambda^{2} + \lambda - \lambda^{2} = \lambda \\
    \\
    \because E(X(X - 1)) & = E(X^{2}) - E(X) \\
    \\
    & = \sum_{x=0}^{\infty}x(x - 1)\frac{e^{-\lambda}\lambda^{x}}{x!} = \lambda^{2}\sum_{x=2}^{\infty}\frac{e^{-\lambda}\lambda^{x - 2}}{(x - 2)!} \\
    \\
    y = x - 2 & \ \to \ \lambda^{2}\sum_{y=0}^{\infty}\frac{e^{-\lambda}\lambda^{y}}{y!} = \lambda^{2}
    \end{align*}
    $$

!!! info
    따라서 모집단이 포아송 분포를 따른다면, 기대값과 분산이 비슷한 값을 가진다고 예상할 수 있으며, 평균에 비해 표본분산이 매우 크다면($\overline{x} \ll s^{2}$) 데이터가 포아송 분포를 따르지 않을 것이라고 예상할 수 있다.  

NumPy를 사용하면 포아송 분포하는 표본을 쉽게 만들 수 있다.  

=== "NumPy"

    ```python
    import numpy as np

    data = np.random.default_rng().poisson(lam=5, size=1000)
    ```

## 5. 기하분포

성공 확률이 $p$인 [베르누이 시행](#1)을 성공할 때까지 시행하는 경우 실패(시행) 횟수의 분포를 **기하분포(geometric distribution)**라 하고, 아래와 같이 표기한다.  

$$
X \sim \text{Geo}(p)
$$

기하분포의 확률질량함수는 아래와 같다.  

$$
f(x) = (1 - p)^{x}p, \quad x = 0, 1, 2, \cdots
$$

위와 같이 1항이 $p$이고 공비가 $1 - p$인 등비급수 형태를 갖고 있기 때문에 $x$ 번째 실험 이전에 성공할 확률을 의미하는 기하분포의 누적분포함수는 등비급수의 합을 기반으로 아래와 같이 유도할 수 있다.  

$$
\begin{align*}
P(X \leq x) & = \sum_{k=0}^{x}p(1 - p)^{k} = \frac{p - p(1 - p)^{x + 1}}{1 - (1 - p)} = 1 - (1 - p)^{x + 1} \\
\\
P(X \geq x) & = 1 - P(X \leq x - 1) = (1 - p)^{x}
\end{align*}
$$

기하분포의 확률질량함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    def geom_d(x: int, p: float) -> float:
        """
        returns probability of geometric distribution
        x: number of failures
        p: probability
        """

        return ((1 - p) ** x) * p


    def geom_c(x: int, p: float) -> float:
        """
        returns cumulative probability of geometric distribution
        x: number of failures
        p: probability
        """

        return 1 - ((1 - p) ** (x + 1))
    ```

기하분포의 확률질량함수를 시행 횟수에 대한 식으로 변환하면, 시행 횟수 $Y$는 실패 횟수 $X + 1$과 동일하기 때문에 아래와 같이 변형할 수 있다.  

$$
Y = X + 1 \ \to \ f_{Y}(y) = (1 - p)^{y - 1}p, \quad y = 1, 2, \cdots
$$

SciPy를 사용하면 시행 횟수 $Y$의 확률질량함수 $f_{Y}(y)$의 결과값을 쉽게 구할 수 있다.  

=== "SciPy"

    ```python
    from scipy.stats import geom

    print(geom.pmf(k=4, p=0.3))
    print(geom.cdf(k=6, p=0.3))
    ```

$x$ 번째 실험 이전에 성공할 확률은 아래와 같이 표현할 수 있다.  

$$
P(Y \leq x) = P(X \leq x - 1)
$$

이를 바탕으로 시행 횟수에 대한 누적분포함수는 아래와 같이 표현할 수 있다.  

$$
\begin{align*}
P(Y \leq y) & = P(X + 1 \leq y) = P(X \leq y - 1) = 1 - (1 - p)^{y} \\
\\
P(Y > y) & = 1 - P(Y \leq y) = (1 - p)^{y}
\end{align*}
$$

기하분포의 기대값은 무한등비급수의 합을 기반으로 아래와 같이 유도할 수 있다.  

$$
\begin{align*}
E(X) & = \sum_{x=0}^{\infty}xp(1 - p)^{x} = \frac{p(1 - p)}{p^{2}} = \frac{1 - p}{p} \\
\\
E(Y) & = E(X + 1) = \frac{1}{p}
\end{align*}
$$

NumPy를 사용하면 기하분포하는 표본을 쉽게 만들 수 있다.  

=== "NumPy"

    ```python
    import numpy as np

    data = np.random.default_rng().geometric(p=0.35, size=1000)
    ```

## 6. 음이항분포

성공할 확률이 $p$인 베르누이 시행을 $r$번 성공할 때까지 시행하는 경우의 실패(시행) 횟수의 분포를 **음이항분포(negative binomial distribution)**라 하고 아래와 같이 표기한다.

$$
Y \sim NB(r, p)
$$

음이항분포에서 시행 횟수 $Y$와 실패 횟수 $X$의 관계는 아래와 같다.  

$$
Y = X + r
$$

따라서 음이항분포를 시행 횟수 $Y$에 대한 분포로 생각하면 $y - 1$ 번째 까지의 결과는 $r - 1$번 성공하는 [이항분포](#2)와 같고 마지막으로 1번 성공하는 분포이며, 실패 횟수 $X$에 대한 분포로 생각하면 $x + r - 1$ 번째 까지의 결과는 $r - 1$번 성공하고 $x$ 번 실패한 [이항분포](#2)와 같고 마지막으로 1번 성공하는 분포이다.  

이를 바탕으로 음이항분포의 확률질량함수를 정리하면 각각 아래와 같이 정리할 수 있다.  

$$
\begin{align*}
f_{Y}(y) & = \binom{y - 1}{r - 1}p^{r - 1}(1 - p)^{y - r}p, \quad y = r, r + 1, \cdots \\
\\
& = \binom{y - 1}{r - 1}p^{r}(1 - p)^{y - r} \\
\\
f(x) & = \binom{x + r - 1}{r - 1}p^{r - 1}(1 - p)^{x}p, \quad x = 0, 1, 2, \cdots \\
\\
& = \binom{x + r - 1}{r - 1}p^{r}(1 - p)^{x}
\end{align*}
$$

음이항분포의 확률질량함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    def nbinom_d(x: int, r: int, p: float) -> float:
        """
        returns probability of negative binomial distribution
        x: number of failures
        r: number of success
        p: probability
        """

        return combination(x + r - 1, r - 1) * (p ** r) * ((1 - p) ** x)


    def nbinom_c(x: int, r: int, p: float, start: int = 0) -> float:
        """
        returns probability of negative binomial distribution
        x: number of failures
        r: number of success
        p: probability
        """

        return sum(nbinom_d(i, r, p) for i in range(start, x + 1))
    ```

=== "SciPy"

    ```python
    from scipy.stats import nbinom

    print(nbinom.pmf(k=4, n=3, p=0.3))
    print(nbinom.cdf(k=4, n=3, p=0.3))
    ```

음이항분포에서 각 시행은 기하분포를 따르기 때문에 음이항분포의 기대값은 아래와 같이 기하분포 확률변수의 결합을 통해 유도할 수 있다.  

$$
\begin{align*}
E(X) & = E(X_{1} + \cdots + X_{r}) = r\frac{1 - p}{p} \\
\\
E(Y) & = E(Y_{1} + \cdots + Y_{r}) = \frac{r}{p}
\end{align*}
$$

NumPy를 사용하면 음이항분포하는 표본을 쉽게 만들 수 있다.  

=== "NumPy"

    ```python
    import numpy as np

    data = np.random.default_rng().negative_binomial(n=1, p=0.1, size=100000)
    ```

## 7. 다항분포

각 시행에서 발생 가능한 결과가 $k$ 개 일 때, 각 시행에서 $i$ 번째 결과의 확률은 $p_{i}$로 고정이고 각 시행이 독립인 경우의 분포를 **다항분포(multinomial distribution)**라 한다. 즉 [이항분포](#2)에서 발생 가능한 사건의 종류가 $k$개로 늘어난 경우를 말한다.  

따라서 다항분포는 이항분포가 결합된 확률변수이기 때문에 이항분포의 확률질량함수를 기반으로 다항분포의 확률질량함수를 아래와 같이 정리할 수 있다.  

$$
\begin{gathered}
f(x_{1}, x_{2}, \cdots, x_{k}) = \frac{n!}{x_{1}!x_{2}! \cdots x_{k}!}P_{1}^{x_{1}}P_{2}^{x_{2}} \cdots P_{k}^{x_{k}} \\
\\ \sum_{i=1}^{k}x_{i} = n, \ \sum_{i=1}^{k}p_{i} = 1
\end{gathered}
$$

다항분포의 확률질량함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    def multi_d(x: list[int], p: list[float]) -> float:
        """
        returns probability of multinomial distribution
        x: cases
        p: probability of each case
        """

        return factorial(sum(x)) / production(factorial(v) for v in x) * production(p ** x for p, x in zip(p, x))  # type: ignore
    ```

=== "SciPy"

    ```python
    from scipy.stats import multinomial

    print(multinomial.pmf(x=[5, 6, 9], n=20, p=[0.3, 0.4, 0.3]))
    ```

다항분포에서 $i$ 번째 시행의 특정 결과($R_{i}$)에만 관심이 있는 경우에 대한 기대값은 아래와 같이 정리할 수 있다.  

$$
\begin{align*}
X_{i} \sim B(n, p_{i}) \ \to \ E(X_{i}) & = np_{i} \\
\\
Var(X_{i}) & = np_{i}(1 - p_{i})
\end{align*}
$$

또한 특정 결과들($R_{i} \cup R_{j}$)에 관심이 있는 경우 아래와 같이 이항분포의 [결합분포](2023-01-01-probability_vector_covariance.md/#2)로 다룰 수 있다.  

$$
\begin{align*}
Y_{X_{i} + X_{j}} \sim B(n, p_{i} + p_{j}) \ \to \ E(Y) & = E(X_{i} + X_{j}) = n(p_{i} + p_{j}) \\
\\
Var(Y) & = Var(X_{i} + X_{j}) = Var(X) + Var(Y) \pm 2Cov(X, Y) \\
\\
& = np_{i}(1 - p_{i}) + np_{j}(1 - p_{j}) - 2np_{i}p_{j} = n(p_{i} + p_{j} - (p_{i} + p_{j})^{2}) \\
\\
& = n(p_{i} + p_{j})(1 - (p_{i} + p_{j}))
\end{align*}
$$

다항분포의 공분산과 상관계수는 아래와 같다.  

$$
\begin{align*}
Cov(X_{i}, X_{j}) & = -np_{i}p_{j} \\
\\
Cor(X_{i}, X_{j}) & = \frac{-np_{i}p_{j}}{\sqrt{np_{i}(1 - p_{i})}\sqrt{np_{j}(1 - p_{j})}} \\
\\
& = -\sqrt{\frac{p_{i}p_{j}}{(1 - p_{i})(1 - p_{j})}}
\end{align*}
$$

??? note "다항분포의 공분산 유도"

    통계학에서 결합분포의 상관계수를 구할 때는 각각의 결합에 대한 모든 경우의 상관계수를 구한 후에 전부 더하면 된다.  

    따라서 다항분포에서 $i$ 번째 범주의 발생 빈도와 $j$ 번째 범주의 발생 빈도, 즉 $X_{i}$와 $X_{j}$의 관계를 상관계수를 통해 확인하는 방법을 2회 실험한 경우를 통해 유도하면 공분산은 아래와 같이 구할 수 있다.  

    $$
    Cov(X_{11} + X_{21}, X_{12} + X_{22}) = Cov(X_{11}, X_{12}) + Cov(X_{11}, X_{22}) + Cov(X_{21}, X_{12}) + Cov(X_{21}, X_{22})
    $$

    이 때 별개의 실행인 경우는 독립인 사건이기 때문에 공분산은 0이며 따라서 [이항분포](#2)의 분산과 표준편차를 기반으로 아래와 같이 정리할 수 있다.  

    $$
    \begin{align*}
    Cov(X_{1}, X_{2}) & = \sum_{i=1}^{n}Cov(X_{i1}, X_{i2}) \Rightarrow -np_{i}p_{j} \\
    \\
    Cov(X_{i1}, X_{i2}) & = E(X_{i1}X_{i2}) - E(X_{i1})E(X_{i2}) \\
    \\
    & = -p_{1}p_{2} \quad \because E(X_{ij}) = p_{j}, \ E(X_{i1}X_{i2}) = 0
    \end{align*}
    $$

!!! note
    위 식에서 성공 확률과 실패 확률의 비율인 $p_{i}/(1 - p_{i})$를 **오즈(odds)**라 한다.  

NumPy를 사용하면 다항분포하는 표본을 쉽게 만들 수 있다.  

=== "NumPy"

    ```python
    import numpy as np

    data = np.random.default_rng().multinomial(n=1, p=0.1, size=100000)
    ```

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)