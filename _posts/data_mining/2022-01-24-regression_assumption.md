---
title: "회귀분석의 전제조건"
excerpt: "선형성, 독립성, 등분산성, 정규성"
published: true
mathjax: true

toc: true
toc_sticky: true

categories:
  - data mining
tags:
  - data mining
  - regression
  - python
---
# {{ page.excerpt }}
---
선형회귀는 분석 데이터가 선형성, 독립성, 등분산성, 정규성의 성질을 갖는다고 가정하기 때문에 좋은 선형 회귀분석 모델을 만들기 위해서는 네개의 기본가정을 모두 만족하는지 확인해야 한다.  
`iris` 데이터를 통해 네 가지 기본가정이 선형회귀 모델에 미치는 영향을 확인해보자.  

## 0. 예제 데이터

```python
import pydataset as pds
import pandas as pd

df = pds.data('iris')
df.reset_index(drop=True, inplace=True)
df.columns = map(lambda x: x.replace('.', '_'), df.columns)

print(df.info())
```
```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 150 entries, 0 to 149
Data columns (total 5 columns):
 #   Column        Non-Null Count  Dtype
---  ------        --------------  -----
 0   Sepal_Length  150 non-null    float64
 1   Sepal_Width   150 non-null    float64
 2   Petal_Length  150 non-null    float64
 3   Petal_Width   150 non-null    float64
 4   Species       150 non-null    object
dtypes: float64(4), object(1)
memory usage: 6.0+ KB
None
```

## 1. 선형성
`iris`데이터의 분포는 다음과 같다.

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.pairplot(
    data=df,
    hue='Species',
)

plt.show()
```

![iris_pairplot](/assets/images/posts/iris_pairplot.png)

만약 Sepal_Length를 예측하려고 하는 종속변수라고 한다면, 위 그래프를 보았을 때 Sepal_Length와 대략적인 선형관계를 이루고 있는 변수는 Petal_Length와 Petal_Width이고, 선형성을 만족하지 않는 것은 Sepal_Width인 것으로 보인다.

이 상황에서 선형 회귀모델을 만들어 보자.

```python
import statsmodels.formula.api as smf

formula = 'Sepal_Length ~ Sepal_Width + Petal_Length + Petal_Width'

model = smf.ols(formula=formula, data=df)
result = model.fit()

print(result.summary())
```
```
                            OLS Regression Results
==============================================================================
Dep. Variable:           Sepal_Length   R-squared:                       0.859
Model:                            OLS   Adj. R-squared:                  0.856
Method:                 Least Squares   F-statistic:                     295.5
Date:                Mon, 31 Jan 2022   Prob (F-statistic):           8.59e-62
Time:                        18:26:28   Log-Likelihood:                -37.321
No. Observations:                 150   AIC:                             82.64
Df Residuals:                     146   BIC:                             94.69
Df Model:                           3
Covariance Type:            nonrobust
================================================================================
                   coef    std err          t      P>|t|      [0.025      0.975]
--------------------------------------------------------------------------------
Intercept        1.8560      0.251      7.401      0.000       1.360       2.352
Sepal_Width      0.6508      0.067      9.765      0.000       0.519       0.783
Petal_Length     0.7091      0.057     12.502      0.000       0.597       0.821
Petal_Width     -0.5565      0.128     -4.363      0.000      -0.809      -0.304
==============================================================================
Omnibus:                        0.345   Durbin-Watson:                   2.060
Prob(Omnibus):                  0.842   Jarque-Bera (JB):                0.504
Skew:                           0.007   Prob(JB):                        0.777
Kurtosis:                       2.716   Cond. No.                         54.7
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
```

모든 변수의 유의확률(p-value)이 0.05 미만으로 나와 유의하다고 나온다. 그 이유는 가장 선형성을 강하게 만족하는 Petal_Length와 Petal_Width의 영향도를 뺀 나머지 값들이 종속변수인 Sepal_Width와 선형성을 이루기 때문인데, 시각화로 확인하면 다음과 같다.  

```python
df['Rest_Sepal_Width'] = (
    df['Sepal_Length']
    - result.params.Petal_Length * df['Petal_Length']
    - result.params.Petal_Width * df['Petal_Width']
)

sns.pairplot(
    data=df,
    hue='Species',
)

plt.show()
```

![iris_pairplot](/assets/images/posts/iris_pairplot_2.png)

Petal_Length와 Petal_Width의 영향도를 제거한 Rest_Sepal_Width를 Sepal_Width와 비교해보면 선형성이 아주 약간 생긴 것을 확인할 수 있다.  

Petal_Length와 Petal_Width의 영향도를 뺀 나머지 값을 위와 같이 계산하는 이유는 Sepal_Length를 $y$, Sepal_Width를 $x_{0}$, Petal_Length를 $x_{1}$, Petal_Width를 $x_{2}$라고 할 때 회귀식은 아래와 같이 정리되고,<br><br>
$y = \beta_{0}x_{0} + \beta_{1}x_{1} + \beta_{2}x_{2} + \varepsilon$<br><br>
따라서 $\beta_{0}x_{0}$인 Rest_Sepal_Width는 아래와 같이 정리되기 때문이다.<br><br>
$\beta_{0}x_{0} = y - \beta_{1}x_{1} - \beta_{2}x_{2} + \varepsilon$ ($\varepsilon$은 잔차이기 때문에 무시)
{: .notice--info}

Sepal_Width의 영향력(결정계수)을 확인하기 위해 Sepal_Width와 Sepal_Length를 단변량 회귀 분석을 통해 확인해보자.  

```python
import statsmodels.formula.api as smf

formula = 'Sepal_Length ~ Sepal_Width'

model = smf.ols(formula=formula, data=df)
result = model.fit()

print(result.summary())
```
```
                            OLS Regression Results
==============================================================================
Dep. Variable:           Sepal_Length   R-squared:                       0.014
Model:                            OLS   Adj. R-squared:                  0.007
Method:                 Least Squares   F-statistic:                     2.074
Date:                Mon, 31 Jan 2022   Prob (F-statistic):              0.152
Time:                        19:05:50   Log-Likelihood:                -183.00
No. Observations:                 150   AIC:                             370.0
Df Residuals:                     148   BIC:                             376.0
Df Model:                           1
Covariance Type:            nonrobust
===============================================================================
                  coef    std err          t      P>|t|      [0.025      0.975]
-------------------------------------------------------------------------------
Intercept       6.5262      0.479     13.628      0.000       5.580       7.473
Sepal_Width    -0.2234      0.155     -1.440      0.152      -0.530       0.083
==============================================================================
Omnibus:                        4.389   Durbin-Watson:                   0.952
Prob(Omnibus):                  0.111   Jarque-Bera (JB):                4.237
Skew:                           0.360   Prob(JB):                        0.120
Kurtosis:                       2.600   Cond. No.                         24.2
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
```

Sepal_Width의 유의확률(p-value)이 0.152로 0.05보다 크기 때문에 Sepal_Width 단독으로는 Sepal_Length에 영향력이 없다는 귀무가설을 기각할 수 없다. 즉, Sepal_Width가 Sepal_Length에 영향력이 없다고 해석된다.

## 2. 독립성(다중공선성)
독립성이란 독립변수 간에 상관관계가 없이 독립성을 만족하는 특성을 의미하며, 다중회귀분석에서 중요하게 다뤄지는 가정이다.  

`iris` 데이터에서 변수 간 상관성을 확인해보자.  

```python
corr_result = df.corr(method="pearson")
print(corr_result)
```
```
              Sepal_Length  Sepal_Width  Petal_Length  Petal_Width
Sepal_Length      1.000000    -0.117570      0.871754     0.817941
Sepal_Width      -0.117570     1.000000     -0.428440    -0.366126
Petal_Length      0.871754    -0.428440      1.000000     0.962865
Petal_Width       0.817941    -0.366126      0.962865     1.000000
```

시각화해서 보기 좋게 표현하면 아래와 같다.  

```python
colormap = plt.cm.PuBu

fig, ax = plt.subplots()

sns.set(font_scale=1)
ax = sns.heatmap(
    data=corr_result,
    cmap=colormap,
    annot=True,
    fmt='.2f',
)

fig = ax.figure

plt.show()
```

![iris_corr](/assets/images/posts/iris_corr.png)

Petal_Length와 Petal_Width의 상관성이 0.96으로 매우 높게 나오는데, 독립변수 간의 상관성이 있을 경우 다중공선성(Multicollinearity)이 있다고 표현되며, 분산팽창요인(VIF, Variance Inflation Factors)을 통해 다중공선성을 계산할 수 있다.  
다중공선성을 계산하는 공식은 아래와 같고, `python`에서는 `statsmodels` 패키지에서 관련 함수를 제공하고 있다.

$$VIF_{i} = \tfrac{1}{1-{R_{i}}^{2}}$$

❗ **VIF가 10이 넘으면 다중공선성이 있으며 5가 넘으면 주의할 필요가 있다**고 보는데, 독립 변수 a와 b가 서로 상관 관계가 있다고 했을 때 두 변수 모두 VIF가 높고, 어느 하나만 VIF가 높은 경우는 없다. 서로 연관 있는 변수끼리 VIF가 높다.
{: .notice--warning}

```python
import statsmodels.formula.api as smf
from statsmodels.stats.outliers_influence import variance_inflation_factor

formula = 'Sepal_Length ~ Sepal_Width + Petal_Length + Petal_Width'

model = smf.ols(formula=formula, data=df)

vif = pd.DataFrame(
    {'columns': column, 'VIF': variance_inflation_factor(model.exog, i)}
    for i, column in enumerate(model.exog_names)
    if column != 'Intercept'
)

print(vif)
```
```
        columns        VIF
0   Sepal_Width   1.270815
1  Petal_Length  15.097572
2   Petal_Width  14.234335
```

Petal_Length와 Petal_Width가 모두 10 이상이 나와 다중공선성이 있는 것으로 나타났다. 이러면 회귀분석 결과에 왜곡을 줘서 변수들의 결정계수가 틀리게 나오게 된다. 좀 더 정확한 회귀분석 결과를 위해 둘 중 하나를 제외하고 회귀분석을 시행해보자.  

우선 Petal_Width를 제외하고 회귀 분석을 시행한 결과와 VIF는 아래와 같다.  

```python
import statsmodels.formula.api as smf
from statsmodels.stats.outliers_influence import variance_inflation_factor

formula = 'Sepal_Length ~ Sepal_Width + Petal_Length'

model = smf.ols(formula=formula, data=df)
result = model.fit()

print(result.summary(), end="\n\n")

vif = pd.DataFrame(
    {'columns': column, 'VIF': variance_inflation_factor(model.exog, i)}
    for i, column in enumerate(model.exog_names)
    if column != 'Intercept'
)

print(vif)
```
```
                            OLS Regression Results
==============================================================================
Dep. Variable:           Sepal_Length   R-squared:                       0.840
Model:                            OLS   Adj. R-squared:                  0.838
Method:                 Least Squares   F-statistic:                     386.4
Date:                Mon, 31 Jan 2022   Prob (F-statistic):           2.93e-59
Time:                        21:38:03   Log-Likelihood:                -46.513
No. Observations:                 150   AIC:                             99.03
Df Residuals:                     147   BIC:                             108.1
Df Model:                           2
Covariance Type:            nonrobust
================================================================================
                   coef    std err          t      P>|t|      [0.025      0.975]
--------------------------------------------------------------------------------
Intercept        2.2491      0.248      9.070      0.000       1.759       2.739
Sepal_Width      0.5955      0.069      8.590      0.000       0.459       0.733
Petal_Length     0.4719      0.017     27.569      0.000       0.438       0.506
==============================================================================
Omnibus:                        0.164   Durbin-Watson:                   2.021
Prob(Omnibus):                  0.921   Jarque-Bera (JB):                0.319
Skew:                          -0.044   Prob(JB):                        0.853
Kurtosis:                       2.792   Cond. No.                         48.3
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.

        columns       VIF
0   Sepal_Width  1.224831
1  Petal_Length  1.224831
```

다음으로 Petal_Length를 제외하고 회귀분석을 시행한 결과는 아래와 같다.  

```python
import statsmodels.formula.api as smf
from statsmodels.stats.outliers_influence import variance_inflation_factor

formula = 'Sepal_Length ~ Sepal_Width + Petal_Width'

model = smf.ols(formula=formula, data=df)
result = model.fit()

print(result.summary(), end="\n\n")

vif = pd.DataFrame(
    {'columns': column, 'VIF': variance_inflation_factor(model.exog, i)}
    for i, column in enumerate(model.exog_names)
    if column != 'Intercept'
)

print(vif)
```
```
                            OLS Regression Results
==============================================================================
Dep. Variable:           Sepal_Length   R-squared:                       0.707
Model:                            OLS   Adj. R-squared:                  0.703
Method:                 Least Squares   F-statistic:                     177.6
Date:                Mon, 31 Jan 2022   Prob (F-statistic):           6.15e-40
Time:                        21:38:36   Log-Likelihood:                -91.910
No. Observations:                 150   AIC:                             189.8
Df Residuals:                     147   BIC:                             198.9
Df Model:                           2
Covariance Type:            nonrobust
===============================================================================
                  coef    std err          t      P>|t|      [0.025      0.975]
-------------------------------------------------------------------------------
Intercept       3.4573      0.309     11.182      0.000       2.846       4.068
Sepal_Width     0.3991      0.091      4.380      0.000       0.219       0.579
Petal_Width     0.9721      0.052     18.659      0.000       0.869       1.075
==============================================================================
Omnibus:                        2.095   Durbin-Watson:                   1.877
Prob(Omnibus):                  0.351   Jarque-Bera (JB):                1.677
Skew:                           0.239   Prob(JB):                        0.432
Kurtosis:                       3.198   Cond. No.                         30.3
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.

       columns       VIF
0  Sepal_Width  1.154799
1  Petal_Width  1.154799
```

아래와 같이 R-squared는 크게 변하지 않으면서 VIF가 크게 개선된 것을 확인할 수 있다.  

|지표|모든 변수|Petal_Width 제외|Petal_Length 제외|
|-:|-:|-:|-:|
|R-squared|0.859|0.840|0.707|
|Adj. R-squared|0.856|0.838|0.703|
|coef Sepal_Width|0.6508|0.5955|0.3991|
|coef Petal_Length|0.7091|0.4719||
|coef Petal_Width|-0.5565||0.9721|
|VIF Sepal_Width|1.270815|1.224831|1.154799|
|VIF Petal_Length|15.097572|1.224831||
|VIF Petal_Width|14.234335||1.154799|

위와 같이 제외해도 되고, 다중공선성이 높은 변수를 합쳐서 하나로 치환해줘도 된다.  

## 3. 등분산성
등분산검정(Equal-variance test)은 두 정규분포로부터 생성된 두 개의 데이터 집합으로부터 두 정규분포의 분산 모수가 같은지 확인하기 위한 검정이다. `scipy` 패키지를 통해서 검정할 수 있다.

- scipy
  - sp.stats.bartlett: 바틀렛 검정
  - sp.stats.fligner: 플리그너 검정
  - sp.stats.levene: 레빈 검정

## 4. 정규성
마지막 정규성은 확률분포가 가우시안 정규분포를 따르는지의 여부를 의미한다. 모델 요약의 Omnibus, Prob(Omnibus), Durbin-Watson, Jarque-Bera (JB), Prob(JB) 등이 정규성을 확인하는 지표이며, `scipy`, `statsmodels` 패키지를 통해서 별도로 확인할 수 있다.

- scipy
  - scipy.stats.ks_2samp: 콜모고로프-스미르노프 검정(Kolmogorov-Smirnov test)
  - scipy.stats.shapiro: 샤피로-윌크 검정(Shapiro–Wilk test)
  - scipy.stats.anderson: 앤더스-달링 검정(Anderson–Darling test)
  - scipy.stats.mstats.normaltest: 다고스티노 K-제곱 검정(D’Agostino’s K-squared test)

- StatsModels
  - statsmodels.stats.diagnostic.kstest_normal: 콜모고로프-스미르노프 검정(Kolmogorov-Smirnov test)
  - statsmodels.stats.stattools.omni_normtest: 옴니버스 검정(Omnibus Normality test)
  - statsmodels.stats.stattools.jarque_bera: 자크-베라 검정(Jarque–Bera test)
  - statsmodels.stats.diagnostic.lillifors: 릴리포스 검정(Lilliefors test)

---
# Alternatives
만약 통계분석이 아닌 머신러닝이나 딥러닝 기법을 사용해서 예측 모델을 만드는 것만이 목표라면 위의 네 가지 전제조건들을 굳이 고려할 필요는 없다고 한다.  
회귀분석의 설명력이나 각 변수들의 유의확률과는 관계없이 반복 학습을 통해서 정확도가 높은 모델을 만들 수 있기 때문이 아닐까 생각한다.  
그래도 모델 성능을 최대한으로 끌어올리기 위해서는 회귀분석의 전제조건을 한번쯤 고려해보는 것이 좋지 않을까 한다.

---
# Reference
- [선형 회귀분석의 4가지 기본가정](https://kkokkilkon.tistory.com/175)
- [데이터 사이언스 스쿨 - 9.5 사이파이를 사용한 검정](https://datascienceschool.net/02%20mathematics/09.05%20%EC%82%AC%EC%9D%B4%ED%8C%8C%EC%9D%B4%EB%A5%BC%20%EC%82%AC%EC%9A%A9%ED%95%9C%20%EA%B2%80%EC%A0%95.html)