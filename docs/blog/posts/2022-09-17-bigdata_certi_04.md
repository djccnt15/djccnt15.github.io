---
slug: bigdata-certificate-04
title: 빅데이터 분석기사 실기 3회차 작업형 기출 문제 풀이
date:
    created: 2022-09-17
description: >
    빅데이터 분석기사 실기 기출 작업형 문제 3회차 풀이
categories:
    - Data Analysis
tags:
    - Bigdata Certificate
---

빅데이터 분석기사 실기 기출 작업형 문제 3회차 풀이  

<!-- more -->

---

## 개요

빅데이터 분석기사 실기 준비를 위한 3회차 시험 작업형 기출 문제 답 정리. 응시자들의 기억에 의존한 복원이기 때문에 틀린 복원 있을 수 있음  

## 작업형 1유형

### 문제 1-1

데이터 중 컬럼들의 결측값을 전부 제거 후 데이터를 처음부터 순서대로 70%를 추출하여 특정변수 1분위수를 산출  

- [데이터 출처](https://www.kaggle.com/datasets/camnugent/california-housing-prices)

```python
import pandas as pd

df = pd.read_csv('data/housing.csv')
df.dropna(axis='index', how='any', inplace=True)
data = df['housing_median_age']
data = data.loc[: round(len(data) * 0.7)]
result = data.quantile(0.25)

print(result)
```
```
19.0
```

### 문제 1-2

데이터가 복원되지 않는데, 문제는 다음과 같다. 연도별(1990 ~ 2007:18개년도, 행) 대략 200개 정도의 국가(컬럼)의 데이터 중 2000년도 전체 국가 유병률의 평균보다 큰 국가 수를 산출  

### 문제 1-3

컬럼별로 빈값 또는 결측값들의 비율을 확인하여 가장 결측율이 높은 변수명을 출력  

- [데이터 출처](https://www.kaggle.com/c/titanic)

```python
import pandas as pd

df = pd.read_csv('data/titanic.csv')

nan = {col: df[col].isna().sum() / df.shape[0] * 100 for col in df.columns}

print(max(nan, key=nan.get))
```
```
Cabin
```

현재 데이터로는 `Cabin`이 답으로 나오는데, 실제 시험 환경에서는 `Age`가 정답이었다고 한다. 아마 시험 환경에서는 데이터의 변형이 있었던 것 같다.  

## 작업형 2유형

여행객의 정보들을 기반으로 여행보험 상품 가입 여부 예측  

- [데이터 출처](https://www.kaggle.com/datasets/tejashvi14/travel-insurance-prediction-data)

### 풀이

**데이터 읽기**

```python
import pandas as pd

df = pd.read_csv('data/TravelInsurancePrediction.csv', index_col=0)
```

**EDA**

```python
df.info()
```

??? quote "Standard Out"
    ```
    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 1987 entries, 0 to 1986
    Data columns (total 9 columns):
    #   Column               Non-Null Count  Dtype 
    ---  ------               --------------  ----- 
    0   Age                  1987 non-null   int64 
    1   Employment Type      1987 non-null   object
    2   GraduateOrNot        1987 non-null   object
    3   AnnualIncome         1987 non-null   int64 
    4   FamilyMembers        1987 non-null   int64 
    5   ChronicDiseases      1987 non-null   int64 
    6   FrequentFlyer        1987 non-null   object
    7   EverTravelledAbroad  1987 non-null   object
    8   TravelInsurance      1987 non-null   int64 
    dtypes: int64(5), object(4)
    memory usage: 155.2+ KB
    ```

One-hot encoding을 위해 명목형 변수와 숫자형 변수를 분리해준다.  

```python
obj_cols = list(df.select_dtypes('object').columns)
num_cols = [i for i in df.columns if i not in obj_cols]

print(obj_cols)
print(num_cols)
```
```
['Employment Type', 'GraduateOrNot', 'FrequentFlyer', 'EverTravelledAbroad']
['Age', 'AnnualIncome', 'FamilyMembers', 'ChronicDiseases', 'TravelInsurance']
```

**정규화**

이상점의 영향을 적게 받는 Robust Scaling으로 정규화 진행. 자세한 설명은 [이 글](./2022-07-11-data_scalers.md) 참고  

```python
import numpy as np
from sklearn.preprocessing import RobustScaler

scaler = RobustScaler()
for col in num_cols:
    df[col] = scaler.fit_transform(np.array(df[col]).reshape(-1, 1))
```

**One-hot encoding**

```python
encoded = pd.get_dummies(df[obj_cols])
df = pd.concat([df, encoded], axis='columns')
df.drop(columns=obj_cols, inplace=True)

df.info()
```

??? quote "Standard Out"
    ```
    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 1987 entries, 0 to 1986
    Data columns (total 13 columns):
    #   Column                                        Non-Null Count  Dtype  
    ---  ------                                        --------------  -----  
    0   Age                                           1987 non-null   float64
    1   AnnualIncome                                  1987 non-null   float64
    2   FamilyMembers                                 1987 non-null   float64
    3   ChronicDiseases                               1987 non-null   float64
    4   TravelInsurance                               1987 non-null   float64
    5   Employment Type_Government Sector             1987 non-null   uint8  
    6   Employment Type_Private Sector/Self Employed  1987 non-null   uint8  
    7   GraduateOrNot_No                              1987 non-null   uint8  
    8   GraduateOrNot_Yes                             1987 non-null   uint8  
    9   FrequentFlyer_No                              1987 non-null   uint8  
    10  FrequentFlyer_Yes                             1987 non-null   uint8  
    11  EverTravelledAbroad_No                        1987 non-null   uint8  
    12  EverTravelledAbroad_Yes                       1987 non-null   uint8  
    dtypes: float64(5), uint8(8)
    memory usage: 108.7 KB
    ```

**train-test split**

시험환경과 유사하게 학습용 데이터와 예측용 데이터를 분리하기 위한 train-test split 진행  

```python
exog = df.drop(columns='TravelInsurance')
endog = df.loc[:, 'TravelInsurance']

from sklearn.model_selection import train_test_split

exog_train, exog_test, endog_train, endog_test = train_test_split(exog, endog, test_size=0.3, random_state=0)
```

**모델 생성 및 학습**

간단하게 로지스틱 회귀를 불러와서 모델 학습을 진행. 하이퍼파라미터 튜닝이나 모델 앙상블을 특별히 적용하지는 않았음  

```python
from sklearn.linear_model import LogisticRegression

clf = LogisticRegression()
clf.fit(X=exog_train, y=endog_train)
```

**학습된 모델을 활용한 확률 예측**

scikit-learn의 인퍼런스를 통해 확률을 도출하고, `.classes_`를 통해 반환되는 배열의 순서를 확인하여 그에 맞춰서 결과값을 정리  

```python
predict = clf.predict_proba(exog_test)

print(clf.classes_)
print(predict)
```
```
[0. 1.]
[[0.08122608 0.91877392]
 [0.60132194 0.39867806]
 [0.81471099 0.18528901]
 ...
 [0.7936794  0.2063206 ]
 [0.7483517  0.2516483 ]
 [0.6670646  0.3329354 ]]
```

**결과 데이터 생성**

```python
TravelInsurance = predict[:, 1]
result = pd.DataFrame({'id': endog_test.index, 'probability': TravelInsurance})

print(result.head())
```
```
     id  probability
0  1291     0.918774
1  1199     0.398678
2  1756     0.185289
3   107     0.680983
4   655     0.164837
```

**제출용 파일 저장**

```python
result.to_csv('result.csv', index=False)
```

### 통합 코드 및 주석

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import RobustScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# data load
df = pd.read_csv('data/TravelInsurancePrediction.csv', index_col=0)

# EDA
df.info()

# separate columns by data type
obj_cols = list(df.select_dtypes('object').columns)
num_cols = [i for i in df.columns if i not in obj_cols]

print(obj_cols)
print(num_cols)

# apply data scaling
# robust scaling is the best, just in case the data has outlier
scaler = RobustScaler()
for col in num_cols:
    df[col] = scaler.fit_transform(np.array(df[col]).reshape(-1, 1))

# one-hot encoding
encoded = pd.get_dummies(df[obj_cols])
df = pd.concat([df, encoded], axis='columns')
df.drop(columns=obj_cols, inplace=True)

df.info()

# train/test split
exog = df.drop(columns='TravelInsurance')
endog = df.loc[:, 'TravelInsurance']

exog_train, exog_test, endog_train, endog_test = train_test_split(exog, endog, test_size=0.3, random_state=0)

# model tuning and training
# load model for classification, not really did any hyperparameter tuning
clf = LogisticRegression()

# model fitting
clf.fit(X=exog_train, y=endog_train)

# inference with trained model
predict = clf.predict_proba(exog_test)

print(clf.classes_)
print(predict)

# make result DataFrame for making answer file
TravelInsurance = predict[:, 1]  # select the probability which the inferenced value is 1
result = pd.DataFrame({'id': endog_test.index, 'probability': TravelInsurance})

print(result.head())

# save result file
result.to_csv('result.csv', index=False)
```

---
## Reference
- [주피터 노트북](https://github.com/djccnt15/bigdata_certi/blob/main/example_03.ipynb)
- [빅데이터분석기사 실기 3회 문제 복원 및 후기](https://ha2juo.tistory.com/10)