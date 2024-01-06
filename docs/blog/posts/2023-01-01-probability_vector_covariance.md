---
slug: probability-vector-covariance
title: '[기초통계학] 09. 확률 벡터와 공분산'
date:
    created: 2023-01-01
description: >
    확률 벡터와 공분산
categories:
    - Statistics
tags:
    - statistics 101
    - probability
    - covariance
    - python
---

확률 벡터와 공분산

<!-- more -->

---

## 1. 확률 벡터

여러 개의 확률변수를 순서열 $X_{1}, X_{2}, \cdots, X_{n}$로 표시한 것을 **확률 벡터(probability vector)**라 한다.  

### 1-1. 결합분포

둘 이상의 확률변수들을 동시에 고려하는 확률분포를 **결합분포(joint distribution)**라 하며, $n$개의 확률변수 $X_{1}, \cdots, X_{n}$의 **결합확률함수(joint probability function)**는 아래와 같이 표현할 수 있다.  

$$
f(x_{1}, \cdots, x_{n}) = P(X_{1} = x_{1}, \cdots, X_{n} = x_{n})
$$

이산확률변수의 결합분포에 대한 **결합확률질량함수(joint probability mass function)**의 성질은 다음과 같다.  

- 각각의 경우의 수에 대한 확률은 모두 0이상 1이하이다.

$$
0 \leq f(x, y) \leq 1, \quad \forall x, y
$$

- 모든 경우의 수의 확률을 모두 더하면 1이다.

$$\sum_{x}\sum_{y}f(x, y) = 1$$

연속확률변수의 결합분포에 대한 **결합확률밀도함수(joint probability density function)** $f(x, y)$는 $x, y$에서의 밀도를 나타내며, 그 성질은 다음과 같다.  

- 특정 지점의 확률밀도는 0 이상이며, 전체면적은 1로 고정인데 구간의 넓이는 0으로 수렴 가능하기 때문에 상한이 없다.

$$
0 \leq f(x, y), \quad \forall x, y
$$

- 전체 위치의 확률밀도를 모두 누적한 부피는 1이다.

$$
\int_{x}\int_{y}f(x, y)dydx = 1
$$

### 1-2. 주변분포

표본공간이 사건 $B_{1}, B_{2}, \cdots, B_{n}$로 [분할](2022-12-25-conditional_probability.md/#2-2)될 때 사건 $A$의 확률은 아래와 같다.  

$$
P(X = x) = P(A) = \sum_{i=1}^{n}P(A \cap B_{i}) = \sum_{i=1}^{n}P(X = x, Y = y_{i})
$$

따라서 $X$의 주변확률함수 $f_{X}(x)$와 $Y$의 주변확률함수 $f_{Y}(y)$는 각각 아래와 같이 나타낼 수 있다.  

$$
\begin{align*}
P(X = x) & = P(A) = \sum_{i=1}^{n}P(A \cap B_{i}) = \sum_{i=1}^{n}P(X = x, Y = y_{i}) \\
\\
\Rightarrow & \quad f_{X}(x) = \sum_{y}f(x, y), \quad f_{Y}(y) = \sum_{x}f(x, y) \\
\\
\Rightarrow & \quad f_{X}(x) = \int f(x, y)dy, \quad f_{Y}(y) = \int f(x, y)dx
\end{align*}
$$

따라서 특정 확률변수의 확률분포를 구하고 싶을 때 다른 확률변수와의 결합분포만을 알고 있다면, 위와 같이 결합분포하는 확률변수를 모두 더해서 원래 목적인 확률변수의 확률분포를 구할 수 있다.  

이 때, 위 식에서 $f_{X}(x)$를 $X$의 주변확률함수, $f_{Y}(y)$를 $Y$의 주변확률함수라 하고 그 분포를 **주변분포(marginal distribution)**라 한다.  

#### 주변분포와 독립 확률변수

두 확률변수 $X, Y$가 독립이면, 모든 $x, y$에 대해 아래 식이 성립한다.  

$$
f(x, y) = f_{X}(x)f_{Y}(y)
$$

따라서 확률 벡터 $X_{1}, X_{2}, \cdots, X_{n}$이 상호독립이면, 모든 $x_{1}, x_{2}, \cdots, x_{n}$에 대해 아래 식이 성립한다.  

$$
f(x_{1}, \cdots, x_{n}) = f_{X_{1}}(x_{1}) \times \cdots \times f_{X_{n}}(x_{n}) = \prod_{i=1}^{n}f_{X_{i}}(x_{i})
$$

## 2. 공분산과 상관계수

### 2-1. 결합분포의 기대값

이산확률변수의 결합분포의 기대값은 아래와 같이 구할 수 있다.  

$$
\begin{align*}
E(X + Y) & = E(X) + E(Y) \\
\\
E(XY) & = \sum_{x}\sum_{y}xyf(x, y)
\end{align*}
$$

??? note "결합분포의 기대값의 간편식 유도"
    $$
    \begin{align*}
    E(X + Y) & = \sum_{x}\sum_{y}(x + y)f(x, y) \\
    \\
    & = \sum_{x}\sum_{y}xf(x, y) = \sum_{x}\sum_{y}yf(x, y) \\
    \\
    & = \sum_{x}f_{X}(x) + \sum_{y}yf_{Y}(y) \\
    \\
    & = E(X) + E(Y)
    \end{align*}
    $$

$E(XY)$의 경우에는 간편식이 없지만, $X$와 $Y$가 독립인 특수한 경우에는 아래와 같이 구할 수 있다.  

$$
E(XY) = E(X)E(Y)
$$

### 2-2. 결합분포의 공분산

[표본공분산](2022-12-23-multivariate_data.md/#2-1)을 상대도수를 이용한 식으로 표현하면 아래와 같다.  

$$
\begin{align*}
c_{x, y} & = \frac{1}{n - 1}\sum_{i=1}^{k1}\sum_{j=1}^{k2}n_{ij}(x_{i} - \overline{x})(y_{j} - \overline{y}) \\
\\
& = \frac{n}{n - 1}\sum_{i=1}^{k1}\sum_{j=1}^{k2}p_{ij}(x_{i} - \overline{x})(y_{j} - \overline{y}), \quad p_{ij} = \frac{n_{ij}}{n}
\end{align*}
$$

따라서 위 식에 [상대도수의 극한의 개념](2022-12-24-statistical_probability.md/#3)을 적용하면 모집단의 공분산은 아래와 같이 표현할 수 있다.  

$$
\begin{align*}
Cov(X, Y) & = E((X - \mu_{X})(Y - \mu_{Y})) = E(XY) - E(X)E(Y) \\
\\
& = \sum_{x}\sum_{y}(x - \mu_{X})(y - \mu_{Y})f(x, y) \\
\\
Cov(X, Y) & = \int \int (x - \mu_{X})(y - \mu_{Y})f(x, y)dydx
\end{align*}
$$

??? note "공분산의 간편식 유도"
    $$
    \begin{align*}
    Cov(X, Y) & = \sum_{x}\sum_{y}(x - \mu_{X})(y - \mu_{Y})f(x, y) = E((X - \mu_{X})(Y - \mu_{Y})) \\
    \\
    & = \sum_{x}\sum_{y}(xy - x\mu_{Y} - y\mu_{X} + \mu_{X}\mu_{Y})f(x, y) \\
    \\
    & = \sum_{x}\sum_{y}xyf(x, y) - \mu_{X}\mu_{Y}, \quad \because \sum_{x}\sum_{y}x\mu_{Y}f(x, y) = \mu_{X}\mu_{Y} \\
    \\
    & = E(XY) - E(X)E(Y)
    \end{align*}
    $$

이 때 $X$와 $Y$가 독립인 경우에는 $E(XY) = E(X)E(Y)$ 이므로, 공분산은 0이 된다.  

!!! warning
    그러나 공분산이 0이라고 해서 $X$와 $Y$가 항상 독립인 것은 아니다. $X$와 $Y$가 정규분포인 경우에만 공분산이 0일 때 $X$와 $Y$가 독립이다.  

#### 변환된 확률변수의 공분산

변환된 확률변수의 공분산은 아래와 같이 구할 수 있다.  

$$
Cov(aX + b, cY + d) = acCov(X, Y)
$$

??? note "변환된 확률변수의 공분산 간편식 유도"
    $$
    \begin{align*}
    Cov(X, Y) & = E((X - \mu_{X})(Y - \mu_{Y})) \\
    \\
    \Rightarrow \ Cov(aX + b, cY + d) & = E((aX + b - (a\mu_{X} + b))(cY + d - (c\mu_{X} + d))) \\
    \\
    & = E(ac(X - \mu_{X})(Y - \mu_{Y})) \\
    \\
    & = acE((X - \mu_{X})(Y - \mu_{Y})) \\
    \\
    & = abCov(X, Y)
    \end{align*}
    $$

### 2-3. 결합분포의 분산

결합분포의 분산은 아래와 같이 구할 수 있다.  

$$
Var(X \pm Y) = Var(X) + Var(Y) \pm 2Cov(X, Y)
$$

??? note "결합분포의 분산의 간편식 유도"
    $$
    \begin{align*}
    Var(X) & = E((X - \mu)^{2}) \\
    \\
    \Rightarrow Var(X \pm Y) & = E(((X \pm Y) - (\mu_{X} \pm \mu_{Y}))^{2}) \\
    \\
    & = E(((X - \mu_{X}) \pm (Y - \mu_{Y}))^{2}) \\
    \\
    & = E((X - \mu_{X})^{2} + (Y - \mu_{Y})^{2} \pm 2(X - \mu_{X})(Y - \mu_{Y})) \\
    \\
    & = E((X - \mu_{X})^{2}) + E((Y - \mu_{Y})^{2}) \pm 2E((X - \mu_{X})(Y - \mu_{Y})) \\
    \\
    & = Var(X) + Var(Y) \pm 2Cov(X, Y)
    \end{align*}
    $$

확률변수 $X, Y$가 독립이면, 두 확률변수의 결합분포의 분산은 아래와 같다.  

$$
Var(X \pm Y) = Var(X) \pm Var(Y), \quad \because Cov(X, Y) = 0
$$

### 2-4. 결합분포의 상관계수

[표본상관계수](2022-12-23-multivariate_data.md/#2-2)와 마찬가지로, 모집단에 대한 확률변수의 상관계수도 [표준화](2022-12-18-univariate_data.md/#_9)한 확률변수를 통해 계산한다.  

$$
\begin{gathered}
U = \frac{X - \mu_{X}}{\sigma_{X}}, \quad V = \frac{Y - \mu_{Y}}{\sigma_{Y}} \ \Rightarrow \ E(U) = E(V) = 0 \\
\\
Cov(U, V) = E(UV) = \frac{Cov(X, Y)}{\sigma_{X}\sigma_{Y}} \\
\\
\therefore \rho_{XY} = Cor(X, Y) = \frac{Cov(X, Y)}{\sqrt{Var(X)}\sqrt{Var(Y)}}
\end{gathered}
$$

??? note "결합분포의 상관계수의 간편식 유도"
    $$
    \begin{align*}
    Cov(U, V) & = E(UV) \\
    \\
    & = E \left(\frac{X - \mu_{X}}{\sigma_{X}}, \frac{Y - \mu_{Y}}{\sigma_{Y}} \right) \\
    \\
    & = \frac{E((X - \mu_{X})(Y - \mu_{Y}))}{\sigma_{X}\sigma_{Y}} \\
    \\
    & = \frac{Cov(X, Y)}{\sigma_{X}\sigma_{Y}}
    \end{align*}
    $$

#### 상관계수의 성질

상관계수의 성질은 아래와 같다.  

- 상관계수는 -1에서 1 사이의 값을 갖는다.

$$
-1 \leq \rho \leq 1
$$

- 자료의 분포가 선형에 가까울수록(확률이 모여있을수록) $\vert \rho \vert$는 1에 근접한다.

- 0이 아닌 상수 $a$에 대해, $Y = aX + b$이면 두 확률변수의 상관계수는 1이다.

$$
Y = aX + b \Rightarrow \vert \rho_{XY} \vert = 1
$$

- 변환된 확률변수의 상관계수는 계수의 부호만 영향을 준다.

$$
Cor(aX + b, cY + d) = sign(a)sign(b)Cor(X, Y)
$$

??? note "증명"
    $$
    \begin{align*}
    Cov(aX + b, cY + d) & = acCov(X, Y), \quad SD(aX + b) = \vert a \vert SD(X) \\
    \\
    \Rightarrow Cor(aX + b, cY + d) & = \frac{Cov(aX + b, cY + d)}{\sqrt{Var(aX + b)}\sqrt{Var(cY + d)}} \\
    \\
    & = \frac{acCov(X, Y)}{\vert a \vert \vert c \vert SD(X) SD(Y)} \\
    \\
    & = sign(a)sign(b)Cor(X, Y)
    \end{align*}
    $$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)