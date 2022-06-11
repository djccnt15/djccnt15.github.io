---
published: true
layout: post

title: '[상관 분석] 상관 계수'
description: >
  python으로 상관 계수 구현하기
hide_description: false
image: 
  path: /assets/img/posts/correlation_coef.png
related_posts:
  - _posts/maths/2022-01-19-regression_linear_scratch.md

categories:
  - maths
tags:
  - data science
  - data analysis
  - preprocessing
  - correlation
  - python
  - numpy
  - scipy
---
* toc
{:toc}

## 개요

**상관 분석(correlation analysis)**은 한 변수의 변화에 따른 다른 변수의 변화 정도와 방향(상관 관계)을 확인하는 분석기법으로, 두 변수 사이의 통계적 관계를 표현하기 위해 특정한 상관 관계의 정도를 수치적으로 나타낸 수치인 **상관 계수(correlation coefficient)**를 통해 상관의 정도를 파악한다.  

상관 계수는 **-1에서 1 사이의 값**을 지니며, 부호는 상관 관계의 방향, 수치는 상관의 정도를 나타낸다. 데이터 분석에 있어서 요구되는 상관 계수의 수치는 분석 대상에 따라 달라지지만, 대체로 사회과학에서는 수치가 조금 낮아도 강력한 상관관계로 해석하며 오히려 너무 높은 상관 관계는 데이터 조작을 의심하게 되지만, 공학계통에서는 높은 상관관계를 요구한다.  

## 피어슨 상관 계수

### 공분산

**공분산(covariance)**은 두 개의 확률 변수의 선형관계를 나타내는 값으로, 기본 정의는 아래와 같다.  

$$Cov(X,Y) = \mathrm{E}\{(X - \mathrm{E}[X])\,(Y - \mathrm{E}[Y])\}$$

피어슨 상관 계수는 **표본 공분산(sample covariance)**을 기반으로 구할 수 있는데, 표본 공분산의 수식은 아래와 같다.  

$$Cov(X,Y) = \frac{\sum_{i}^{n}(X_i - \overline{X})(Y_i - \overline{Y})}{n - 1}$$

표본 공분산을 `python`으로 구현하면 아래와 같다.  

```python
# expected value of x
def x_bar(x):
    res = sum(x) / len(x)

    return res

# covariance
def cov(a, b):
    n = len(a)
    a_bar = x_bar(a)
    b_bar = x_bar(b)

    res = sum((a[i] - a_bar) * (b[i] - b_bar) for i in range(n)) / (n - 1)

    return res
```

**공분산 행렬(covariance matrix)**은 위의 공분산을 각 변수들마다 계산하는 것으로, 공분산 행렬 $$\Sigma$$는 아래와 같다.  

$$\Sigma = \begin{pmatrix}
\mathrm{cov}_{x, x} & \mathrm{cov}_{x, y} \\
\mathrm{cov}_{y, x} & \mathrm{cov}_{y, y} \\
\end{pmatrix}$$

`numpy`가 제공하는 공분산 행렬을 계산하는 함수를 사용하면 두 변수 간의 공분산을 구할 수 있다.  

```python
import numpy as np

a = np.array([2.23, 4.78, 7.21, 9.37, 11.64, 14.23, 16.55, 18.70, 21.05, 23.21])
b = np.array([139, 123, 115, 96, 62, 54, 10, -3, -138, -550])

res = np.cov(a, b)[0][1]

print(res)
```

```markdown
-1139.755111111111
```

### 피어슨 상관 계수

**피어슨 상관 계수(Pearson correlation coefficient, Pearson's r)**는 데이터 분석에서 가장 널리 쓰이는 상관 계수로, 측정하려는 두 변수의 상관 관계가 서로 선형일 때(1차 함수로 표현 가능)할 때 유용하다. 피어슨 상관 계수는 두 변수의 표본 공분산을 각각 표준 편차의 곱으로 나눈 값으로, 수식을 정리하면 아래와 같다.  

$$\begin{align*}
r_{xy} & = \frac{\frac{\sum_{i=1}^{n}(x_{i} - \overline{x})(y_{i} - \overline{y})}{n - 1}}{\sqrt{\frac{\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}}{n - 1}} \sqrt{\frac{\sum_{i}^{n}(y_{i} - \overline{y})^{2}}{n - 1}}} \\
\\
& = \frac{\sum_{i=1}^{n}(x_{i} - \overline{x})(y_{i} - \overline{y})}{\sqrt{\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}}  \sqrt{\sum_{i=1}^{n}(y_{i} - \overline{y})^{2}}}
\end{align*}$$

`python`으로 구현하면 아래와 같다.  

```python
# correlation pearson
def pearson(a, b):

    res = cov(a, b) / ((cov(a, a) * cov(b, b)) ** 0.5)

    return res
```

`numpy`가 제공하는 상관 계수 행렬을 계산하는 함수를 사용하면 두 변수 간의 피어슨 상관 계수을 구할 수 있다.  

```python
import numpy as np

a = np.array([2.23, 4.78, 7.21, 9.37, 11.64, 14.23, 16.55, 18.70, 21.05, 23.21])
b = np.array([139, 123, 115, 96, 62, 54, 10, -3, -138, -550])

res = np.corrcoef(a, b)[0][1]

print(res)
```

```markdown
-0.7819099681203538
```

`scipy`를 통해서도 피어슨 상관 계수를 구할 수 있다.  

```python
from scipy import stats

a = [2.23, 4.78, 7.21, 9.37, 11.64, 14.23, 16.55, 18.70, 21.05, 23.21]
b = [139, 123, 115, 96, 62, 54, 10, -3, -138, -550]

pearsonr = stats.pearsonr(a, b)

print(pearsonr)
```

```python
(-0.7819099681203537, 0.00753521730744328)
```

💡 피어슨 상관계수 $$r$$의 제곱과 다중 선형 회귀 모델의 결정 계수(Coefficient of determination) $$r^{2}$$는 같지 않다. 자세한 내용은 [여기](https://rython.tistory.com/17)를 참고하자.  
{:.note}

## 스피어만 상관 계수

두 변수 간의 **스피어만 상관 계수(Spearman's rank correlation coefficient)**는 두 변수의 순위 값 사이의 피어슨 상관 계수와 같다. 따라서 피어슨 상관 계수가 두 변수 사이의 선형 관계를 평가하는 반면 스피어만의 상관 계수는 단조적 관계(선형인지 여부는 아님)를 평가한다.  

`numpy`에서는 관련 API를 제공하지 않고, `scipy`를 사용해 구할 수 있다.  

```python
from scipy import stats

a = [1,2,3,4,5]
b = [5,6,7,8,7]

spearmanr = stats.spearmanr(a, b)

print(spearmanr)
```

```markdown
SpearmanrResult(correlation=0.8207826816681233, pvalue=0.08858700531354381)
```

## 켄달 상관 계수

**켄달 상관 계수(Kendall rank correlation coefficient, Kendall tau)**는 스피어만 상관 계수와 마찬가지로 두 변수들 간의 순위를 비교하여 연관성을 계산한다.  

스피어만 상관 계수와 마찬가지로 `numpy`에서는 관련 API를 제공하지 않고, `scipy`를 사용해 구할 수 있다.  

```python
from scipy import stats

a = [1,2,3,4,5]
b = [5,6,7,8,7]

tau = stats.kendalltau(a, b)

print(tau)
```

```markdown
KendalltauResult(correlation=0.7378647873726218, pvalue=0.07697417298126674)
```

---
## Reference
- [위키피디아: 피어슨 상관 계수](https://ko.wikipedia.org/wiki/%ED%94%BC%EC%96%B4%EC%8A%A8_%EC%83%81%EA%B4%80_%EA%B3%84%EC%88%98)([영문](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient))
- [위키피디아: 스피어만 상관 계수](https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%94%BC%EC%96%B4%EB%A8%BC_%EC%83%81%EA%B4%80_%EA%B3%84%EC%88%98)([영문](https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient))
- [Wikipedia: Kendall rank correlation coefficient](https://en.wikipedia.org/wiki/Kendall_rank_correlation_coefficient)