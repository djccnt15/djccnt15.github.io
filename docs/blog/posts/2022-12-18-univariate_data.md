---
slug: univariate-data
title: '[기초통계학] 03. 일변량 자료'
date:
    created: 2022-12-18
description: >
    수치형 일변량 자료의 중심경향치와 산포
categories:
    - Statistics
tags:
    - statistics 101
    - central tendency
    - dispersion
    - variance
---

수치형 일변량 자료의 중심경향치와 산포  

<!-- more -->

---

## 0. 기술통계

수집된 자료를 정리하여 요약된 값 및 시각화를 통해 표현하는 것을 **기술통계(descriptive statistics)**라 한다. 이 때 중심경향치(대표값), 산포, 분포의 형태 등을 사용하여 데이터를 요약하게 된다.  

## 1. 중심경향치

**중심경향치(central tendency)**는 자료 분포의 중심을 보여주는 측도로, 대표값이라고도 한다. 데이터 분석을 통해 유추하고자 하는 모수, 즉 관심 모수에 따라 사용할 대표값을 선택하게 된다.  

자료에서 대부분의 관측값으로부터 멀리 떨어진 일부 관측값을 **이상점(outlier)**이라고 하는데, 이상점의 포함 여부에 따라 중심경향치의 변동이 심한 경우 이상점에 강건(robust)하지 않다고 표현한다.  

### 1-1. 평균

#### 표본평균

수치형 자료에서 가장 많이 사용되는 중심경향치에 대한 통계값은 **평균(mean)**으로, 통계학에서는 자료의 무게중심을 의미하는 표본평균을 의미한다. **표본평균(sample mean, $\overline{x}$)**을 구하는 공식은 아래와 같다.  

$$
\begin{gathered}
\sum_{i=1}^{m}(\overline{x} - x_{i}) = \sum_{i=m + 1}^{n}(x_{i} - \overline{x}) \\
\\
\Rightarrow \sum_{i=1}^{n}(x_{i} - \overline{x}) = 0 \\
\\
\therefore \overline{x} = \frac{1}{n} \sum_{i=1}^{n}x_{i}
\end{gathered}
$$

위 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def bar(data: numeric) -> float:
        """returns expectation/sample mean"""

        return sum(data) / len(data)
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    data = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15]

    mean = stats.mean(data)
    ```

=== "NumPy"

    ```python
    import numpy as np

    data = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15]

    mean = np.mean(data)
    ```

표본평균을 구하는 과정에서 $i$ 번째 표본의 **편차(deviation)**를 아래와 같이 구할 수 있다.  

$$
\text{deviation} = x_{i} - \overline{x}
$$

주어진 데이터의 각 요소들의 표본평균에 대한 편차를 구하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def devi(data: numeric) -> dict:
        """returns deviation of each value"""

        return {val: val - bar(data) for val in sorted(list(set(data)))}
    ```

#### 가중평균

표본평균은 이상점(outlier)에 robust하지 않다는 단점이 있기 때문에, 이 부분을 고려해야할 경우 각 자료의 중요도나 영향 정도에 해당하는 가중치를 반영하여 구한 평균값인 **가중평균(weighted mean)**을 사용한다. 각 요소의 가중치를 $w_{i}$라 할 때 가중평균을 구하는 공식은 아래와 같다.  

$$
\overline{x}_{W} = \frac{1}{W} \sum_{i=1}^{n}w_{i}x_{i}
$$

=== "Python"

    ```python
    numeric = list[int | float]


    def mean_weight(data: numeric, weights: numeric) -> float:
        """returns weighted mean"""

        return sum(v * w for v, w in zip(data, weights)) / sum(weights)
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    data = [1, 2, 3, 4, 5]
    weights = [5, 4, 3, 2, 1]

    weighted_mean = stats.fmean(data=data, weights=weights)
    ```

=== "NumPy"

    ```python
    import numpy as np

    data = [1, 2, 3, 4, 5]
    weights = [5, 4, 3, 2, 1]

    weighted_mean = np.average(a=data, weights=weights)
    ```

#### 기하평균

연속적인 변화율에 대한 자료에서 특정 구간에서의 평균 변화율을 구할 때는 관측치를 모두 곱한 결과의 $n$ 제곱근인 **기하평균(geometric mean)**을 사용해야 하며, 기하평균을 구하는 공식은 아래와 같다.  

$$
\begin{align*}
\overline{x}_{G} & = \left( \prod_{i=1}^{n}x_{i} \right)^{1 / n} \\
\\
& = (x_{1} \times x_{2} \times \cdots \times x_{n})^{1 / n}, \quad x_{i} > 0
\end{align*}
$$

기하평균 구하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def production(data: numeric) -> float:
        """product all elements in data with for loop"""

        res = 1
        for i in data:
            res *= i
        return res


    def mean_geom(data: numeric) -> float:
        """returns geometric mean of data"""

        return production(data) ** (1 / len(data))
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    data = [1, 2, 3, 4, 5]

    geometric_mean = stats.geometric_mean(data)
    ```

=== "SciPy"

    ```python
    from scipy.stats.mstats import gmean

    data = [1, 2, 3, 4, 5]

    geometric_mean = gmean(data)
    ```

#### 조화평균

두 자료의 평균적인 비율을 구하고 싶을 때는 각 자료의 역수의 산술평균의 역수인 **조화평균(harmonic mean)**을 사용해야한다.  

$$
\begin{align*}
\overline{x}_{H} & = \left( \frac{\sum_{i=1}^{n} x_{i}^{-1}}{n} \right)^{-1}\\
\\
& = \frac{n}{\frac{1}{x_{1}} + \frac{1}{x_{2}} + \cdots + \frac{1}{x_{n}}} = \frac{n}{\sum_{i=1}^{n} \frac{1}{x_{i}}}
\end{align*}
$$

실무적으로는 구간별 평균속력 자료로부터 전체 구간에 대한 평균속력을 구할 때나, 분류 문제를 해결하는 모델의 F1-score를 계산할 때 사용한다.  

조화평균 구하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def mean_harm(data: numeric) -> float:
        """returns harmonic mean of data"""

        return len(data) / (sum(1 / v for v in data))
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    data = [1, 2, 3, 4, 5]

    harmonic_mean = stats.harmonic_mean(data)
    ```

=== "SciPy"

    ```python
    from scipy.stats import hmean

    data = [1, 2, 3, 4, 5]

    harmonic_mean = hmean(data)
    ```

#### 표본절사평균

**표본절사평균은(sample trimmed mean)**은 표본평균과 표본중앙값의 장/단점을 적절히 취합한 대표값으로, $\alpha$%의 표본절사평균은 순서통계량에서 하위 $\alpha$%에서부터 상위 $\alpha$%까지의 자료를 이용하여 표본평균을 계산한 중심경향치다. 따라서 $\alpha$를 적절히 조절하여 이상점을 제외하면서 최대한 많은 표본정보를 이용할 수 있다.  

실무적으로는 아래와 같이 전체 $n$개의 자료 중 가장 작은 $k$개와 가장 큰 $k$개를 제외한 나머지 $n - 2k$개에 대한 표본평균을 구하여 사용한다.  

$$
\text{trimmed mean} = \frac{x_{(k + 1)} + \cdots + x_{(n - k)}}{n - 2k}
$$

표본절사평균을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def mean_trimmed(data: numeric, k: int) -> float:
        """return trimmed mean from data, k defines number of data to trim"""

        return bar(sorted(data)[k:-k])
    ```

=== "SciPy"

    ```python
    from scipy.stats import trim_mean

    data = [1, 2, 3, 4, 5]

    trim_mean = trim_mean(a=data, proportiontocut=0.1)
    ```

SciPy의 경우, 이론대로 일정 비율에 따라 데이터를 잘라낸다. [공식 문서](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.trim_mean.html)에 따르면 절사할 숫자가 정수가 아닐 경우 소수점을 버린다고 한다.  

!!! info
    참고로 하위 $\alpha$%에 해당하는 값을 $\alpha$ 백분위수(percentile)라고 하며, $p = \alpha / 100$일 때, $p$ [분위수(quantile)](#2-2-사분위(간)-범위)이라고 말한다.  

### 1-2. 표본중앙값

자료를 크기 순서대로 나열했을 때 중간에 있는 값을 **표본중앙값(sample median, $\widetilde{x}$)**이라 한다. 표본중앙값은 표본을 오름차순으로 정렬한 순서통계량(order statistics)를 통해서 구할 수 있으며, 일반식은 아래와 같다.  

$$
\widetilde{x} = \begin{cases}
x_{(\frac{n + 1}{2})}, & x= \text{odd} \\
\\
(x_{(\frac{n}{2})} + x_{(\frac{n}{2} + 1)}) / 2, & x= \text{even}
\end{cases}
$$

중앙값은 극단적인 값에 영향을 받지 않아 안정적인 중심경향치를 제공하기 때문에 이상점에 대해 강건하다는 장점이 있지만, 자료의 대부분의 값들을 순서통계량을 구할 때만 이용하기 때문에 자료의 정보를 다 활용하지 못하다는 단점이 있다.  

중앙값 구하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def median(data: numeric) -> float:
        """returns median number of data"""

        data = sorted(data)
        n = len(data)
        if n % 2 == 0:
            i = int(n / 2)
            return sum([data[i], data[i - 1]]) / 2
        else:
            return data[int((n + 1) / 2) - 1]
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    data_odd = [1, 2, 3, 4, 5]
    data_even = [1, 2, 3, 4, 5, 6]

    median_odd, median_even = stats.median(data_odd), stats.median(data_even)
    ```

=== "NumPy"

    ```python
    import numpy as np

    data_odd = [1, 2, 3, 4, 5]
    data_even = [1, 2, 3, 4, 5, 6]

    median_odd, median_even = np.median(data_odd), np.median(data_even)
    ```

### 1-3. 표본최빈값

**표본최빈값(sample mode)**은 자료 중 빈도가 가장 많은 값으로, 자료의 특성에 따라 여러 개가 있거나 전혀 없을 수도 있다. 최빈값은 히스토그램에서 가장 높은 밀도의 지점을 나타낸다. 최빈값 구하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def mode(data: numeric) -> list | None:
        """returns mode value from data"""

        cnt = {v: data.count(v) for v in set(data)}
        cntmax = max(cnt.values())
        if cntmax == 1:
            return None
        else:
            return [v for v in cnt if cnt[v] == cntmax]
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    mode_even = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4]
    mode_odd = [1, 2, 3, 4, 5]

    mode_even, mode_odd = stats.mode(mode_even), stats.mode(mode_odd)
    ```

=== "SciPy"

    ```python
    from scipy.stats import mode

    mode_even = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4]
    mode_odd = [1, 2, 3, 4, 5]

    mode_even, mode_odd = mode(mode_even), mode(mode_odd)
    ```

## 2. 산포

**산포(dispersion)**는 자료들이 얼마나 퍼져 있는지를 나타내는 측도로, 산포를 통해 중심경향치가 얼마나 안정적인지에 대한 정보를 확인할 수 있다.  

- 산포가 낮음 = 중심경향치의 변동성 낮음
- 산포가 높음 = 중심경향치의 변동성 높음

### 2-1. 범위

**범위(range)**는 아래와 같이 자료 중 가장 큰 값과 작은 값의 차이를 말한다. 자료의 구조에 영향을 받지 않기 때문에 정확한 정보 파악이 힘들고, 이상치에 강건하지 못하다는 단점이 있다.  

$$
\text{range} = x_{max} - x_{min}
$$

=== "Python"

    ```python
    numeric = list[int | float]


    def data_range(data: numeric) -> float:
        """returns range of data"""

        return max(data) - min(data)
    ```

### 2-2. 사분위(간) 범위

자료를 아래와 같이 동일한 비율로 4등분 할 때의 세 위치를 **사분위수(quartile)**라하고, 사분위수를 활용한 산포 범위 계산을 **사분위(간) 범위(interquartile range, IQR)**라 한다.  

- 25% 지점: 제1사분위수($Q_{1}$)
- 50% 지점: 제2사분위수($Q_{2}$), [표본중앙값](#1-2-표본중앙값)과 동일
- 75% 지점: 제3사분위수($Q_{3}$)

사분위(간) 범위는 아래와 같다.  

$$
IQR = Q_{3} - Q_{1}
$$

**분위수(quantile)**는 아래 산식에서 $k$가 정수일 경우 $x_{k}$, 정수가 아닐 경우 $x_{\lceil k \rceil}, x_{\lfloor k \rfloor}$ 사이의 비례에 의한 내삽법을 적용하여 계산하는데, 사분위수의 경우 $p$에 $0.25, 0.5, 0.75$를 대입하면 된다.  

$$
k = (n - 1)p + 1
$$

분위수 구하는 함수와 사분위 범위 구하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def quantile(data: numeric, q: float) -> float:
        """returns quantile value from data"""

        data = sorted(data)
        k = (len(data) - 1) * q
        i = int(k)
        r = k - i
        return data[i] * (1 - r) + data[i + 1] * r


    def iqr_range(data: numeric) -> float:
        """returns IQR range from data"""

        return quantile(data, 0.75) - quantile(data, 0.25)
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    data = [1, 2, 3, 4, 5, 6, 7, 8]
    q = [0.25, 0.5, 0.75]

    quantiles = stats.quantiles(data, method='inclusive')  # (1)!
    ```

    1. statistics 모듈의 경우 `method` 파라미터를 `inclusive`로 지정하지 않으면 데이터를 표본집단으로 인식하기 때문에 계산 결과가 달라진다.  

=== "NumPy"

    ```python
    import numpy as np

    data = [1, 2, 3, 4, 5, 6, 7, 8]
    q = [0.25, 0.5, 0.75]

    quantiles = [np.quantile(a=data, q=q) for q in q]
    ```

### 2-3. 거리와 산포

#### 거리

표본분산과 표본표준편차를 이해하기 위해서는 **거리(distance, $D$)**라는 개념을 먼저 이해할 필요가 있는데, 수학적으로는 임의의 세 점 $a, b, c$에 대해 아래 세 조건을 만족할 때 거리라고 한다.  

- $a = b$ 이면 $D(a, b) = 0$ 이고, 그 역도 성립할 것
- $D(a, b) = D(b, a)$ 일 것
- $D(a, b) \le D(a, c) + D(c, b)$ 일 것

통계학에서 많이 사용하는 거리는 아래 종류들이 있다.  

$$
D(a, b) =  \vert a - b \vert, \quad D(a, b) = (a - b)^{2}
$$

!!! info
    $D(a, b) = (a - b)^{2}$ 이 성립하는 이유는, 여기서 말하는 **거리**가 벡터의 크기([norm](./2022-06-05-linear_algebra_inner_product_norm.md/#2-노름norm))를 의미하는 것이 아니기 때문이다. 데이터의 산포를 수학적으로 계산하기 위해서 **거리**를 사용할 때, 큰 것은 크게 작은 것은 작게 계산되는 부분에 변동이 없다면 제곱근을 하나 줄여 계산을 간결하게 하는 것이 더 좋다.  

따라서 위 정리를 바탕으로 모든 관측값들 간 거리의 합을 표현하면 아래와 같다.  

$$
\sum_{i=1}^{n}\sum_{j=1}^{n} \vert x_{i} - x_{j} \vert, \quad \sum_{i=1}^{n}\sum_{j=1}^{n}(x_{i} - x_{j})^{2}
$$

위 정리를 바탕으로 중심경향치 $$a$$와 모든 관측값들 간 거리의 합은 아래와 같이 표현할 수 있다.  

$$
L_{1}(a) = \sum_{i=1}^{n} \vert x_{i} - a \vert, \quad L_{2}(a) = \sum_{i=1}^{n}(x_{i} - a)^{2}
$$

이 때, $a$의 적절한 위치, 즉 자료를 가장 잘 대표할 수 있는 중심경향치는 **거리의 합을 최소화** 하는(편차의 합이 0인) 지점으로, 아래와 같이 정리할 수 있다.  

- $L_{1}(a)$의 경우 [표본중앙값](#1-2-표본중앙값)($a = \widetilde{x}$)에서 최소화된다.
- $L_{2}(a)$의 경우 [표본평균](#1-1-평균)($a = \overline{x}$)에서 최소화되며, $L_{2}(a)$를 $a$에 대해 미분한 미분계수가 0이 되는$$a$ 값이 거리의 합이 최소화 되는 지점이기 때문에 아래와 같이 유도할 수 있다.

$$
\begin{gathered}
\frac{\text{d}L_{2}(a)}{\text{d} a} = -2\sum_{i=1}^{n}(x_{i} - a) = 0 \\
\\
\Rightarrow a = \frac{1}{n}\sum_{i=1}^{n}x_{i} = \overline{x}
\end{gathered}
$$

위 정리들을 바탕으로, 거리를 기반으로 자료의 산포도를 계산하면 아래와 같고, 특히 $L_{2}$의 경우 편차의 제곱합으로 정리할 수 있다.  

$$
L_{1}(\widetilde{x}) = \sum_{i=1}^{n} \vert x_{i} - \widetilde{x} \vert, \quad L_{2}(\overline{x}) = \sum_{i=1}^{n}(x_{i} - \overline{x})^{2}
$$

#### 표본분산

$L_{1}(\widetilde{x})$와 $L_{2}(\overline{x})$의 경우에는 자료의 개수가 많아질수록 커질 수밖에 없기 때문에, 이를 보정하기 위해 표본의 크기로 보정을 하게 되는데, 이를 **표본분산(sample variance)**이라고 하고 아래와 같이 계산한다.  

$$
s^{2} = \frac{1}{n - 1}\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}
$$

??? note "표본분산의 간편식과 그 유도"
    $$
    \begin{align*}
    s^{2} & = \frac{1}{n - 1}\sum_{i=1}^{n}(x_{i} - \overline{x})^{2} \\
    \\
    & = \frac{1}{n - 1}\sum_{i=1}^{n}(x_{i}^{2} - 2x_{i}\overline{x} + \overline{x}^{2}) \\
    \\
    & = \frac{1}{n - 1} \left( \sum_{i=1}^{n}x_{i}^{2} - 2\overline{x}\sum_{i=1}^{n}x_{i} + n\overline{x}^{2} \right) \\
    \\
    & = \frac{1}{n - 1} \left( \sum_{i=1}^{n}x_{i}^{2} -2n\overline{x}^{2} + n\overline{x}^{2} \right) \quad \because \sum_{i=1}^{n}x_{i} = n\overline{x} \\
    \\
    & = \frac{1}{n - 1} \left( \sum_{i=1}^{n}x_{i}^{2} - n\overline{x}^{2} \right) \\
    \\
    & = \frac{1}{n - 1} \left\{ \sum_{i=1}^{n}x_{i}^{2} - \frac{1}{n} \left( \sum_{i=1}^{n}x_{i} \right)^{2} \right\} \quad \because \overline{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}
    \end{align*}
    $$

이 때, $n$이 아닌 $n - 1$으로 나누어 주는 이유는 **자유도(degree of freedom)** 때문으로, 표본분산의 경우 $\sum(x_{i} - \overline{x}) = 0$이라는 제약조건이 있기 때문에 $n - 1$개의 편차 정보를 사용한다.  

!!! info
    자유도(degree of freedom)는 **비편향추정량/불편추정량(Unbiased Estimator)**을 만들어주기 위해 사용된다.  

분산을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def var(data: numeric, dof: int = 1) -> float:
        """returns variance of data"""

        return sum((d - bar(data)) ** 2 for d in data) / (len(data) - dof)
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    data = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15]

    variance = stats.variance(data)
    ```

=== "NumPy"

    ```python
    import numpy as np

    data = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15]

    variance = np.var(data, ddof=1)
    ```

#### 표본표준편차

표본분산은 편차의 제곱합을 이용하기 때문에 분산의 단위는 관측값 단위의 제곱이 된다. 이로 인해 발생하는 데이터의 왜곡을 막기 위해 일반적으로는 표본분산의 제곱근인 **표본표준편차(sample standard deviation)**를 사용하게 된다.  

$$
s = \sqrt{s^{2}} = \sqrt{\frac{1}{n - 1}\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}}
$$

위 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def std(data: numeric, dof: int = 1) -> float:
        """return standard deviation of data"""

        return var(data, dof) ** (1 / 2)
    ```

=== "Python Standard Library"

    ```python
    import statistics as stats

    data = [-5, -2, 1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 17, 19, 25, 87, 99, 100]

    standard_deviation = stats.stdev(data)
    ```

=== "NumPy"

    ```python
    import numpy as np

    data = [-5, -2, 1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 17, 19, 25, 87, 99, 100]

    standard_deviation = np.std(data, ddof=1)
    ```

#### 표준화

자료들 간의 척도(scale)나 위치가 달라 데이터에 왜곡이 생기는 경우를 막기 위해 데이터를 변경해주는 절차를 **표준화(standardization)**이라고 하며 아래와 같이 계산한다.  

$$
z_{i} = \frac{x_{i} - \overline{x}}{s_{x}} \quad \Rightarrow \quad x_{i} = s_{x}z_{i} + \overline{x}
$$

표준화를 하게 되면 평균은 0, 분산은 1이 되어 측정 단위(scale)에 영향을 받지 않게 중심위치와 척도를 조정하기 때문에 다양한 데이터의 절대비교가 가능해진다.  

$$
\overline{z} = 0, \quad s_{z}^{2} = 1
$$

데이터를 표준화 하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def standardize(num: float, bar: float, std: float) -> float:
        """standardize value"""

        return (num - bar) / std


    def scaler_standard(data: numeric, dof: int = 0) -> list:
        """returns standardized values of data"""

        b, s = bar(data), std(data, dof)
        return [standardize(d, b, s) for d in data]
    ```

=== "scikit-learn"

    ```python
    import numpy as np
    from sklearn.preprocessing import StandardScaler

    data = [-5, -2, 1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 17, 19, 25, 87, 99, 100]

    scaler = StandardScaler()
    scaled = scaler.fit_transform(np.array(data).reshape(-1, 1)).reshape(1, -1)
    ```

!!! tip
    표준화 외에도 다양한 scaling 방식이 있다. [관련 링크](./2022-07-11-data_scalers.md) 참고

### 2-4. 변동계수

표준편차가 평균에 영향을 받는 경우 표준편차만 이용하여 산포를 비교하는 것은 적절하지 않을 수 있기 때문에 평균으로 표준편차를 보정하는 **변동계수(coefficient of variation)**를 사용하며, 변동계수($CV$)는 아래와 같이 계산한다.  

$$
CV = \frac{s}{\overline{x}}
$$

아래와 같이 % 개념을 사용하여 표본평균에 비해 표본표준편차가 얼마나 큰지 표시하기도 한다.  

$$
CV = \frac{s}{\overline{x}} \times 100
$$

변동계수 구하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def variation(data: numeric, dof: int = 0) -> float:
        """returns coefficient of variation"""

        return std(data, dof) / bar(data)
    ```

=== "SciPy"

    ```python
    from scipy import stats
    from scipy.stats import mstats

    data = [-5, -2, 1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 17, 19, 25, 87, 99, 100]

    variation = stats.variation(data)
    variation = mstats.variation(data)
    ```

## 3. 분포의 형태

많은 통계분석 방법은 모집단의 중심경향치를 기준으로 대칭(symmetric), 즉 정규분포하는 데이터라고 가정하며, 분석 방법의 적절성은 가정한 조건을 자료가 얼마나 만족하고 있는지에 따라 영향을 받는다.  

따라서 자료의 분포 형태를 확인하여 자료가 모집단의 형태와 유사항 형태를 가지고 있는지, 즉 모집단의 가정을 만족하는지 확인할 필요가 있으며, 이 때 사용하는 측도로 왜도와 첨도가 있다.  

### 3-1. 왜도

**왜도(skewness)**는 자료가 대칭적으로 분포되어 있는지, 또는 한쪽으로 치우쳐 있는지에 대한 측도를 말하며, 아래 공식과 같이 계산한다.  

$$
\sqrt{b_{1}} = \frac{1}{n - 1}\sum_{i=1}^{n} \left( \frac{x_{i} - \overline{x}}{s} \right)^{3}
$$

자료의 분포를 확인했을 때 꼬리가 길게 분포할 경우 두터운 꼬리(heavy tail)를 갖는다고 표현한다. 오른쪽 꼬리가 길 때(왜도가 큰 양수일 때) 오른쪽으로 skewed 되었다(skewed to the right)고 표현하며, 반대로 왼쪽 꼬리가 길 때(왜도가 큰 음수일 때) 외쪽으로 skewed 되었다(skewed to the left)고 표현한다.  

왜도 구하는 함수를 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def skew(data: numeric, dof: int = 0) -> float:
        """returns skewness of data"""

        b, s = bar(data), std(data, dof)
        return sum(standardize(d, b, s) ** 3 for d in data) / (len(data) - dof)
    ```

=== "SciPy"

    ```python
    from scipy.stats import skew

    data = [-5, -2, 1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 17, 19, 25, 87, 99, 100]

    skewness = skew(data)
    ```

SciPy의 경우 빅데이터를 다룰 때 사용할 것으로 생각했는지 자유도를 0으로 계산한다.  

경우에 따라 아래와 같이 수정된 왜도를 사용하기도 한다.  

$$
\sqrt{b_{1}} = \frac{n}{(n - 1)(n - 2)}\sum_{i=1}^{n} \left( \frac{x_{i} - \overline{x}}{s} \right)^{3}
$$

위 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def skew_adv(data: numeric) -> float:
        """returns fixed skewness of data"""

        n = len(data)
        return skew(data, 1) * (n / n - 2)
    ```

### 3-2. 첨도

**첨도(kurtosis)**는 중심경향치가 얼마나 뾰족한지를 양쪽 꼬리의 두터운 정도를 통해 나타내는 값으로, 아래 공식과 같이 계산한다.  

$$
b_{2} = \frac{1}{n - 1}\sum_{i=1}^{n} \left( \frac{x_{i} - \overline{x}}{s} \right)^{4}
$$

첨도는 꼬리부분이 얼마나 두터운지에 따라 영향을 많이 받는데, 꼬리가 길수록 이상점의 존재 가능성이 높기 때문이다.  

정규분포의 경우 이론적으로 첨도가 3이기 때문에 데이터가 정규분포를 따른다면 첨도 역시 3에 가까운 값을 갖게 된다. 따라서 실무에서는 많은 경우에 아래와 같이 기준을 3으로 사용하여 3을 뺀 값을 활용한다.  

$$
b_{2} = \frac{1}{n - 1}\sum_{i=1}^{n} \left( \frac{x_{i} - \overline{x}}{s} \right)^{4} - 3
$$

첨도 구하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def kurtosis(data: numeric, dof: int = 0) -> float:
        """returns kurtosis of data"""

        b, s = bar(data), std(data, dof)
        return (sum(standardize(d, b, s) ** 4 for d in data) / (len(data) - dof))


    def kurtosis_norm(data: numeric, dof: int = 0) -> float:
        """returns kurtosis of normal distributed data"""

        return kurtosis(data, dof) - 3
    ```

=== "SciPy"

    ```python
    from scipy.stats import kurtosis

    data = [-5, -2, 1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 17, 19, 25, 87, 99, 100]

    kurtosis = kurtosis(data)
    ```

SciPy의 경우 빅데이터를 다룰 때 사용할 것으로 생각했는지 자유도를 0으로 계산할 뿐만 아니라 정규분포를 전제하여 -3이 반영된 값을 반환한다.  

경우에 따라 아래와 같이 수정된 첨도를 사용하기도 한다.  

$$
b_{2} = \frac{n(n + 1)}{(n - 1)(n - 2)(n - 3)}\sum_{i=1}^{n} \left( \frac{x_{i} - \overline{x}}{s} \right)^{4} - \frac{3(n - 1)^{2}}{(n - 2)(n - 3)}
$$

위 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def kurtosis_adv(data: numeric) -> float:
        """returns fixed kurtosis of data"""

        k, n = kurtosis(data, 1), len(data)
        return (k * n * (n + 1) / ((n - 2) * (n - 3))) - ((3 * ((n - 1) ** 2)) / ((n - 2) * (n - 3)))
    ```

### 3-3. 왜도와 첨도의 활용

왜도 및 첨도는 앞서 말했든 자료 분포의 형태를 나타내는 측도로, 심한 왜도를 가지거나 큰 첨도를 가지는 경우 자료에 이상점이 있을 가능성이 높다.  

자료의 분포가 정규분포를 따르는지 확인하는 것을 **정규성 검정(Normality Test)**이라고 하는데, 왜도 및 첨도를 통해 검정하는 대표적인 방법이 Jarque-Bera 검정으로 아래와 같이 계산한다.  

$$
JB = \frac{n}{6} \left\{ b_{1} + \frac{(b_{2} - 3)^{2}}{4} \right\}
$$

위 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    numeric = list[int | float]


    def jarque_bera(data: numeric, dof: int = 0) -> float:
        """returns Jarque-Bera normality test value"""

        return (len(data) / 6) * (skew(data, dof) ** 2 + ((kurtosis_norm(data, dof) ** 2) / 4))
    ```

=== "SciPy"

    ```python
    import numpy as np
    from scipy.stats import jarque_bera

    data = np.random.default_rng(seed=0).normal(0, 1, 3000)

    print(jarque_bera(data))
    ```

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)