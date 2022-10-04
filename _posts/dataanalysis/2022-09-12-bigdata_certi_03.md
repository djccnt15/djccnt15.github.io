---
published: true
layout: post
title: '[빅분기] 실기 대비 03'
description: >
  빅데이터분석기사 실기 2회차 시험 기출 문제 풀이
categories: [DataAnalysis]
tags: [data analysis, 빅데이터분석기사]
image:
  path: /assets/img/posts/bigdata_certi.png
related_posts:
  - _posts/dataanalysis/2022-09-09-bigdata_certi_02.md
  - _posts/dataanalysis/2022-09-17-bigdata_certi_04.md
---
* toc
{:toc}

## 개요

빅데이터분석기사 실기 준비를 위한 2회차 시험 작업형 기출 문제 답 정리. 1회차는 COVID-19로 취소되어 2회차부터 존재. 응시자들의 기억에 의존한 복원이기 때문에 틀린 복원 있을 수 있음  

## 작업형 1유형

### 문제 1

주어진 Dataset에서 'CRIM' 값이 가장 큰 10개의 지역을 구하고 10개의 지역의 'CRIM' 값을 그 중 가장 작은 값으로 대체한 후, 'AGE' 컬럼 값이 80 이상인 Row의 'CRIM' 평균값을 구하라  

- [데이터 출처](https://www.kaggle.com/code/prasadperera/the-boston-housing-dataset/data)

```python
import pandas as pd

df = pd.read_csv('data/Boston.csv', index_col=0)

df.sort_values(by='crim', ascending=False, inplace=True)
tmp = df[:10]['crim'].min()
df.iloc[:10, 0] = tmp
result = df.loc[df['age']>=80, 'crim'].mean()

print(result)
```
```
5.759386625
```

### 문제 2

주어진 Dataset에서 첫 번째 행 부터 순서대로 80% 까지의 데이터를 추출 후 'total_bedrooms' 컬럼의 중앙값으로 해당 컬럼의 결측치를 대체한 후, 'total_bedrooms' 컬럼의 대치 전후의 표준편차 차이를 구하라  

- [데이터 출처](https://www.kaggle.com/datasets/camnugent/california-housing-prices)

```python
import pandas as pd

df = pd.read_csv('data/housing.csv')
data = df['total_bedrooms']

data = data.iloc[: round(len(df) * 0.8)]
std_before = data.std()
data.fillna(value=data.median(), inplace=True)
std_after = data.std()
result = abs(std_after - std_before)

print(result)
```
```
1.9751472916456692
```

### 문제 3

주어진 Dataset의 특정 컬럼의 평균으로부터 1.5 * 표준편차를 벗어나는 영역을 이상치라고 판단하고, 이상치들의 합을 구하라  
(Data가 복원되지 않아 2번 문제와 동일한 데이터 사용)  

```python
import pandas as pd

df = pd.read_csv('data/housing.csv')

data = df['total_rooms']
min = data.mean() - (data.std() * 1.5)
max = data.mean() + (data.std() * 1.5)
result = data.loc[(data > max) | (data < min)].sum()

print(result)
```
```
10707239.0
```

## 작업형 2유형

E-Commerce_Shipping 데이터를 사용해서 고객이 주문한 물품이 제 시간 도착여부(Reached.on.Time_Y.N) 예측  

### 풀이

**데이터 읽기**

```python
import pandas as pd

df = pd.read_csv('data/E-Commerce_Shipping.csv')
```

**EDA 진행**

데이터에 대한 기본 정보를 확인해본다.  

```python
print(df.info())
```

<details><summary>terminal</summary><div markdown="1">

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 10999 entries, 0 to 10998
Data columns (total 12 columns):
 #   Column               Non-Null Count  Dtype 
---  ------               --------------  ----- 
 0   ID                   10999 non-null  int64 
 1   Warehouse_block      10999 non-null  object
 2   Mode_of_Shipment     10999 non-null  object
 3   Customer_care_calls  10999 non-null  int64 
 4   Customer_rating      10999 non-null  int64 
 5   Cost_of_the_Product  10999 non-null  int64 
 6   Prior_purchases      10999 non-null  int64 
 7   Product_importance   10999 non-null  object
 8   Gender               10999 non-null  object
 9   Discount_offered     10999 non-null  int64 
 10  Weight_in_gms        10999 non-null  int64 
 11  Reached.on.Time_Y.N  10999 non-null  int64 
dtypes: int64(8), object(4)
memory usage: 1.0+ MB
None
```

</div></details><br>

One-hot encoding을 위해 명목형 변수와 숫자형 변수를 분리해준다.  

```python
obj_cols = df.select_dtypes(include='object').columns
num_cols = [i for i in df.columns if i not in obj_cols]
num_cols.remove('ID')

print(obj_cols)
print(num_cols)
```
```
Index(['Warehouse_block', 'Mode_of_Shipment', 'Product_importance', 'Gender'], dtype='object')
['Customer_care_calls', 'Customer_rating', 'Cost_of_the_Product', 'Prior_purchases', 'Discount_offered', 'Weight_in_gms', 'Reached.on.Time_Y.N']
```

**정규화**

이상치의 영향을 적게 받는 `Robust Scaling`으로 정규화를 해주자. 자세한 설명은 [이 글](/dataanalysis/scalers/) 참고  

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
df = pd.concat([df, encoded], axis=1)
df.drop(columns=obj_cols, inplace=True)

print(df.info())
```

<details><summary>terminal</summary><div markdown="1">

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 10999 entries, 0 to 10998
Data columns (total 21 columns):
 #   Column                     Non-Null Count  Dtype  
---  ------                     --------------  -----  
 0   ID                         10999 non-null  int64  
 1   Customer_care_calls        10999 non-null  float64
 2   Customer_rating            10999 non-null  float64
 3   Cost_of_the_Product        10999 non-null  float64
 4   Prior_purchases            10999 non-null  float64
 5   Discount_offered           10999 non-null  float64
 6   Weight_in_gms              10999 non-null  float64
 7   Reached.on.Time_Y.N        10999 non-null  float64
 8   Warehouse_block_A          10999 non-null  uint8  
 9   Warehouse_block_B          10999 non-null  uint8  
 10  Warehouse_block_C          10999 non-null  uint8  
 11  Warehouse_block_D          10999 non-null  uint8  
 12  Warehouse_block_F          10999 non-null  uint8  
 13  Mode_of_Shipment_Flight    10999 non-null  uint8  
 14  Mode_of_Shipment_Road      10999 non-null  uint8  
 15  Mode_of_Shipment_Ship      10999 non-null  uint8  
 16  Product_importance_high    10999 non-null  uint8  
 17  Product_importance_low     10999 non-null  uint8  
 18  Product_importance_medium  10999 non-null  uint8  
 19  Gender_F                   10999 non-null  uint8  
 20  Gender_M                   10999 non-null  uint8  
dtypes: float64(7), int64(1), uint8(13)
memory usage: 827.2 KB
None
```

</div></details><br>


**train test set 분리**

데이터 구조를 시험환경처럼 만들기 위해 train set과 test set을 분리해준다.  

```python
exog = df.drop(columns=['Reached.on.Time_Y.N'])
endog = df.loc[:, 'Reached.on.Time_Y.N']

from sklearn.model_selection import train_test_split

exog_train, exog_test, endog_train, endog_test = train_test_split(exog, endog, test_size=0.2, random_state=0)
```

**필요 없는 칼럼 제거**

```python
cust_id = exog_test['ID']
endog_train.drop(columns='ID', inplace=True)
endog_test.drop(columns='ID', inplace=True)
```

**모델 생성 및 학습**

간단하게 로지스틱 회귀를 불러와서 모델 학습을 진행해준다. 하이퍼파라미터 튜닝이나 모델 앙상블을 특별히 적용하지는 않았다.  

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X=exog_train, y=endog_train)
```

**학습된 모델을 활용한 확률 예측**

scikit-learn의 인퍼런스를 통해 확률을 도출하면, 0일 확률과 1일 확률이 순서대로 도출되기 때문에 그에 맞춰서 결과값을 정리해준다.  

```python
predict = model.predict_proba(exog_test)

print(predict)
```
```
[[0.63081206 0.36918794]
 [0.61810725 0.38189275]
 [0.32283906 0.67716094]
 ...
 [0.50090767 0.49909233]
 [0.35946357 0.64053643]
 [0.57658523 0.42341477]]
```

**결과 데이터 생성**

```python
Reached_on_Time = predict[:, 1]
result = pd.DataFrame({'ID': cust_id, 'probability': Reached_on_Time})

print(result.head())
```
```
        ID  probability
7262  7263     0.369188
4795  4796     0.381893
1121  1122     0.677161
1328  1329     0.999587
8098  8099     0.517905
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
df = pd.read_csv('data/E-Commerce_Shipping.csv')

# EDA stage
print(df.info())

# separate columns by data type
obj_cols = df.select_dtypes(include='object').columns
num_cols = [i for i in df.columns if i not in obj_cols]
num_cols.remove('ID')

print(obj_cols)
print(num_cols)

# apply data scaling
# robust scaling is the best, just in case the data has outlier
scaler = RobustScaler()
for col in num_cols:
    df[col] = scaler.fit_transform(np.array(df[col]).reshape(-1, 1))

# one-hot encoding
encoded = pd.get_dummies(df[obj_cols])
df = pd.concat([df, encoded], axis=1)
df.drop(columns=obj_cols, inplace=True)

print(df.info())

# train/test split
exog = df.drop(columns=['Reached.on.Time_Y.N'])
endog = df.loc[:, 'Reached.on.Time_Y.N']

exog_train, exog_test, endog_train, endog_test = train_test_split(exog, endog, test_size=0.2, random_state=0)

# drop meaningless columns
cust_id = exog_test['ID']
endog_train.drop(columns='ID', inplace=True)
endog_test.drop(columns='ID', inplace=True)

# model tuning and training
# load model for classification, not really did any hyperparameter tuning
model = LogisticRegression()

# model fitting
model.fit(X=exog_train, y=endog_train)

# inference with trained model
predict = model.predict_proba(exog_test)

print(predict)

# make result DataFrame for making answer file
Reached_on_Time = predict[:, 1]  # select the probability which the inferenced value is 1
result = pd.DataFrame({'ID': cust_id, 'probability': Reached_on_Time})

print(result.head())

# save result file
result.to_csv('result.csv', index=False)
```

---
## Reference
- [빅데이터분석기사 2회 실기 만점 : 문제 복원 및 파이썬 코드 리뷰](https://eatchu.tistory.com/19)
- [빅데이터분석기사 실기 2회 문제 복원 및 후기](https://ha2juo.tistory.com/5)