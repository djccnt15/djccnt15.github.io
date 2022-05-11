---
published: true
layout: post

title: python 회귀분석
description: >
  statsmodels을 이용해서 회귀분석을 해보자
hide_description: false
# image: 
#   path: /path/to/thumbnail/of/the/post
  # srcset:
  #   1060w: /assets/img/blog/example-content-iii.jpg
  #   530w:  /assets/img/blog/example-content-iii@0,5x.jpg
  #   265w:  /assets/img/blog/example-content-iii@0,25x.jpg
related_posts:
  - _posts/data_science/2022-01-24-regression_assumption.md

categories:
  - data_science
tags:
  - python
  - data mining
  - statsmodels
  - regression
  - incomplete
---

* toc
{:toc}

`statsmodels`패키지는 매우 강력한 회귀분석 기능을 제공하는 python 패키지로, 특히 요약 결과 기능을 제공한다는 점에서 매우 유용하다.  
`statsmodels`패키지로 회귀분석을 하는 방법은 두 가지가 있는데, 각각 소개해보기로 한다.  
패키지 자체를 소개하는게 목적이기 때문에 data scaling, correlation, VIF, stepwise selection 등은 생략한다.  

## 0. 예제 데이터 준비
먼저 예제 데이터를 준비한다.

```python
import pydataset as pds
import pandas as pd

df = pds.data('Boston')

print(df)
```
```markdown
        crim    zn  indus  chas    nox     rm   age     dis  rad  tax  ptratio   black  lstat  medv
1    0.00632  18.0   2.31     0  0.538  6.575  65.2  4.0900    1  296     15.3  396.90   4.98  24.0
2    0.02731   0.0   7.07     0  0.469  6.421  78.9  4.9671    2  242     17.8  396.90   9.14  21.6
3    0.02729   0.0   7.07     0  0.469  7.185  61.1  4.9671    2  242     17.8  392.83   4.03  34.7
4    0.03237   0.0   2.18     0  0.458  6.998  45.8  6.0622    3  222     18.7  394.63   2.94  33.4
5    0.06905   0.0   2.18     0  0.458  7.147  54.2  6.0622    3  222     18.7  396.90   5.33  36.2
..       ...   ...    ...   ...    ...    ...   ...     ...  ...  ...      ...     ...    ...   ...
502  0.06263   0.0  11.93     0  0.573  6.593  69.1  2.4786    1  273     21.0  391.99   9.67  22.4
503  0.04527   0.0  11.93     0  0.573  6.120  76.7  2.2875    1  273     21.0  396.90   9.08  20.6
504  0.06076   0.0  11.93     0  0.573  6.976  91.0  2.1675    1  273     21.0  396.90   5.64  23.9
505  0.10959   0.0  11.93     0  0.573  6.794  89.3  2.3889    1  273     21.0  393.45   6.48  22.0
506  0.04741   0.0  11.93     0  0.573  6.030  80.8  2.5050    1  273     21.0  396.90   7.88  11.9

[506 rows x 14 columns]
```

## 1. statsmodels.api
❗ `statsmodels.api`을 통해서 회귀분석을 시행할 경우 **별도로 독립변수에 상수항을 추가**해줘야 한다.  
{:.note title="Attention"}

상수항을 추가하기 위해서는 `statsmodels`이 제공하는 `add_constant()`를 사용해주면 간단하다.  

```python
import statsmodels.api as sm

exog = df.iloc[:, :-1]                  # set independent variable
exog = sm.add_constant(exog)            # add constant to independent variable

endog = df['medv']                      # set dependent variable

model = sm.OLS(endog=endog, exog=exog)  # modeling
results = model.fit()                   # model fitting

print(results.summary())                # print summary
```
```
                            OLS Regression Results
==============================================================================
Dep. Variable:                   medv   R-squared:                       0.741
Model:                            OLS   Adj. R-squared:                  0.734
Method:                 Least Squares   F-statistic:                     108.1
Date:                Sun, 23 Jan 2022   Prob (F-statistic):          6.72e-135
Time:                        15:04:10   Log-Likelihood:                -1498.8
No. Observations:                 506   AIC:                             3026.
Df Residuals:                     492   BIC:                             3085.
Df Model:                          13
Covariance Type:            nonrobust
==============================================================================
                 coef    std err          t      P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
const         36.4595      5.103      7.144      0.000      26.432      46.487
crim          -0.1080      0.033     -3.287      0.001      -0.173      -0.043
zn             0.0464      0.014      3.382      0.001       0.019       0.073
indus          0.0206      0.061      0.334      0.738      -0.100       0.141
chas           2.6867      0.862      3.118      0.002       0.994       4.380
nox          -17.7666      3.820     -4.651      0.000     -25.272     -10.262
rm             3.8099      0.418      9.116      0.000       2.989       4.631
age            0.0007      0.013      0.052      0.958      -0.025       0.027
dis           -1.4756      0.199     -7.398      0.000      -1.867      -1.084
rad            0.3060      0.066      4.613      0.000       0.176       0.436
tax           -0.0123      0.004     -3.280      0.001      -0.020      -0.005
ptratio       -0.9527      0.131     -7.283      0.000      -1.210      -0.696
black          0.0093      0.003      3.467      0.001       0.004       0.015
lstat         -0.5248      0.051    -10.347      0.000      -0.624      -0.425
==============================================================================
Omnibus:                      178.041   Durbin-Watson:                   1.078
Prob(Omnibus):                  0.000   Jarque-Bera (JB):              783.126
Skew:                           1.521   Prob(JB):                    8.84e-171
Kurtosis:                       8.281   Cond. No.                     1.51e+04
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
[2] The condition number is large, 1.51e+04. This might indicate that there are
strong multicollinearity or other numerical problems.
```


## 2. statsmodels.formula.api
`statsmodels.formula.api`을 사용하면 회귀모델 공식을 먼저 작성한 후 공식에 따라 회귀분석을 시행한다.  
상수항 추가나 범주형 변수의 더미변수화를 자동으로 해결해주는 장점이 있다.  

```python
import statsmodels.formula.api as smf

endog_name = 'medv'                                 # set dependent variable

exog_names = df.drop(endog_name, axis=1).columns    # get independent variable names
exog_names = ' + '.join(exog_names)                 # concat independent variables name

formula = endog_name + ' ~ ' + exog_names           # make formula for modelling

print(formula)
```
```markdown
medv ~ crim + zn + indus + chas + nox + rm + age + dis + rad + tax + ptratio + black + lstat
```

```python
model = smf.ols(formula=formula, data=df)           # modelling
result = model.fit()                                # model fitting

print(result.summary())                             # print summary
```
```
                            OLS Regression Results
==============================================================================
Dep. Variable:                   medv   R-squared:                       0.741
Model:                            OLS   Adj. R-squared:                  0.734
Method:                 Least Squares   F-statistic:                     108.1
Date:                Sun, 23 Jan 2022   Prob (F-statistic):          6.72e-135
Time:                        15:35:14   Log-Likelihood:                -1498.8
No. Observations:                 506   AIC:                             3026.
Df Residuals:                     492   BIC:                             3085.
Df Model:                          13
Covariance Type:            nonrobust
==============================================================================
                 coef    std err          t      P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     36.4595      5.103      7.144      0.000      26.432      46.487
crim          -0.1080      0.033     -3.287      0.001      -0.173      -0.043
zn             0.0464      0.014      3.382      0.001       0.019       0.073
indus          0.0206      0.061      0.334      0.738      -0.100       0.141
chas           2.6867      0.862      3.118      0.002       0.994       4.380
nox          -17.7666      3.820     -4.651      0.000     -25.272     -10.262
rm             3.8099      0.418      9.116      0.000       2.989       4.631
age            0.0007      0.013      0.052      0.958      -0.025       0.027
dis           -1.4756      0.199     -7.398      0.000      -1.867      -1.084
rad            0.3060      0.066      4.613      0.000       0.176       0.436
tax           -0.0123      0.004     -3.280      0.001      -0.020      -0.005
ptratio       -0.9527      0.131     -7.283      0.000      -1.210      -0.696
black          0.0093      0.003      3.467      0.001       0.004       0.015
lstat         -0.5248      0.051    -10.347      0.000      -0.624      -0.425
==============================================================================
Omnibus:                      178.041   Durbin-Watson:                   1.078
Prob(Omnibus):                  0.000   Jarque-Bera (JB):              783.126
Skew:                           1.521   Prob(JB):                    8.84e-171
Kurtosis:                       8.281   Cond. No.                     1.51e+04
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
[2] The condition number is large, 1.51e+04. This might indicate that there are
strong multicollinearity or other numerical problems.
```
요약 결과에 `const(상수)` 대신에 `Intercept(절편)`로 나오는데 회귀분석에서는 같은 뜻이니 상관 없다.  

범주형 변수의 경우 아래처럼 `C()`를 표시해주면 알아서 더미변수로 변환한다.  

```python
res = smf.ols(formula='Lottery ~ Literacy + Wealth + C(Region)', data=df).fit()
```

아래와 같이 변수에 `scale()`을 표시하면 해당 변수에 표준정규화를 적용해서 회귀분석을 시행한다.

```python
formula = 'medv ~ scale(crim) + scale(zn)'
```

또한 아래와 같이 공식에 연산을 집어 넣거나, 함수를 적용시킨 값을 계산에 사용하도록 작성할 수도 있다.  

```
res = smf.ols(formula='Lottery ~ Literacy * Wealth', data=df).fit()

res = smf.ols(formula='Lottery ~ np.log(Literacy)', data=df).fit()
```

## 3. 결과 해석
❗ 이 글은 미완성입니다.
{:.note title="Attention"}
`summary()` 화면에 나오는 용어들의 뜻은 다음과 같다.  

- Dep. Variable: 종속변수
- Model: 회귀 모델의 종류
- Method: 회귀 모델 최적화 방법론
- No. Observations: 표본의 개수
- Df Residuals: 모델 자유도. n-k-1(표본수-독립변수 개수-종속변수 개수)으로 계산
- Df Model: 독립변수의 개수
- Covariance Type: 공분산 형태
- **R-squared: 모델의 설명력**
- **Adj. R-squared: Adjusted R-squared(조정된 R-squared)**, 회귀분석은 변수가 추가될 때 항상 설명력이 올라가기만 하기 때문에, 설명력에 영향이 거의 없는 변수라 할지라도 결과적으로 설명력을 높혀 모델의 설명력이 실제보다 높게 나올 수 있다. 따라서 독립변수의 개수에 따라 R-squared를 조정해줘야 한다.
- F-statistic: F-통계량, 도출된 회귀식이 통계적으로 유의한지 확인. 0에 가까울수록 좋음
- Prob (F-statistic): Prob(F-통계량), 회귀식이 유의미한지 확인. 0.05 이하일 경우 유의한 것으로 판단
- Log-Likelihood: 로그우도, 생성된 모델이 주어진 데이터를 생성할 가능성의 수치적 기표. 모델을 생성하는 과정에서 각 변수에 대한 계수값을 비교할 때 사용
- AIC, BIC: Log-Likelihood를 독립변수의 수로 보정한 값, 값이 작을 수록 좋음
    - AIC: 표본의 개수와 모델의 복잡성을 기반으로 모델을 평가하며, 수치가 낮을 수록 좋음
    - BIC: AIC와 유사하나 패널티를 부여하여 AIC보다 모델 평가 성능이 더 좋으며, 수치가 낮을 수록 좋음

- **coef: 변수의 coefficient(계수)**, 각 독립변수가 종속변수의 변화에 미치는 영향의 정도
- std err: 계수의 표준오차(표본 통계량의 표준 편차), 값이 작을 수록 좋음
- t: 독립변수와 종속변수간에 선형관계(관련성)가 존재하는 정도, 값이 클수록 상관도가 큼
    - t 값이 크다 = 표준 편차가 작다 = 독립-종속 변수간 상관도 높음
    - t 값이 작다 = 표준 편차가 크다 = 독립-종속 변수간 상관도 낮음
- P>\|t\|: p-value(유의확률), 귀무가설이 맞다고 가정할 때 얻은 결과보다 극단적인 결과가 실제로 관측될 확률, 일반적으로 유의수준 5%보다 p값이 작으면(`p < 0.05`), "통계적으로 유의미하다"고 판단
- \[0.025 0.975\]: 95% 회귀계수의 신뢰구간에서의 추정치 분포로, 표본에서 도출된 coefficient의 해당 신뢰구간에서의 값(?)

- Omnibus: 디아고스티노 검정(귀무가설 검정), 비대칭도와 첨도를 결합한 정규성 테스트, 값이 클수록 정규 분포를 따른다는 의미
- Prob(Omnibus): 디아고스티노 검정이 유의한지 판단, 0.05 이하일 경우 유의하다고 판단
- Skew: 왜도, 평균 주위의 잔차들의 대칭하는지를 보는 것이며, 0에 가까울수록 대칭
- Kurtosis: 첨도, 잔차들의 분포 모양이며, 3에 가까울 수록 정규분포이다. (음수이면 평평한 형태, 양수는 뾰족한 형태)
- Durbin-Watson: 더빈왓슨 정규성 검정이며, 잔차의 독립성 여부를 판단 (1.5 ~ 2.5 사이일때 잔차는 독립적이라고 판단하며 0이나 4에 가까울 수록 잔차들은 자기상관을 가지고 있다고 판단)
- Jarque-Bera (JB): 자크베라 정규성 검정, 값이 클 수록 정규분포의 데이터를 사용했다는 것
- Cond. No.: 다중공선성 검정, 독립변수간 상관관계가 있는지 보는 것이며, 10이상이면 다중공선성이 있다고 판단

- [2] The condition number is large, 1.51e+04. This might indicate that there are strong multicollinearity or other numerical problems. : 다중공선성이 있음을 경고함

---
## Reference
- [statsmodels - Linear Regression](https://www.statsmodels.org/stable/regression.html)
- [statsmodels - Ordinary Least Squares](https://www.statsmodels.org/stable/examples/notebooks/generated/ols.html)
- [statsmodels - Fitting models using R-style formulas](https://www.statsmodels.org/stable/example_formulas.html)
- [Interpreting Linear Regression Through statsmodels .summary()](https://medium.com/swlh/interpreting-linear-regression-through-statsmodels-summary-4796d359035a)
- [[회귀분석] 회귀분석 실습(1) - OLS 회귀분석 결과 해석 및 범주형 변수 처리 (Statsmodel)](https://ysyblog.tistory.com/119)
- [5.1 확률론적 선형 회귀모형](https://datascienceschool.net/03%20machine%20learning/05.01%20%ED%99%95%EB%A5%A0%EB%A1%A0%EC%A0%81%20%EC%84%A0%ED%98%95%20%ED%9A%8C%EA%B7%80%EB%AA%A8%ED%98%95.html)
- [[깊게 배우는 머신러닝] 4.1 회귀분석, 군더더기 변수 쳐내기 (Cp, AIC, BIC)](https://youtu.be/igorPLtUzFU)
- [t-value의 의미와 스튜던트의 T 테스트](https://angeloyeo.github.io/2020/02/13/Students_t_test.html)