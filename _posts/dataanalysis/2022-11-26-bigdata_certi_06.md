---
published: true
layout: post
title: '[빅분기] 실기 대비 06'
description: >
    빅데이터 분석기사 실기 기출 작업형 문제 4회차 풀이
categories: [DataAnalysis]
tags: [data analysis, Bigdata Certificate]
image:
    path: /assets/img/posts/bigdata_certi.png
related_posts:
    - _posts/dataanalysis/2022-09-12-bigdata_certi_03.md
    - _posts/dataanalysis/2022-11-10-bigdata_certi_05.md
---
* toc
{:toc}

{% include series_bigdatacerti.html %}

## 개요

빅데이터 분석기사 실기 준비를 위한 4회차 시험 작업형 기출 문제 답 정리. [퇴근후딴짓](https://www.youtube.com/@ai-study)님의 복원을 참고함([출처](https://www.kaggle.com/datasets/agileteam/bigdatacertificationkr))  

## 작업형 1유형

### 문제 1-1

age 컬럼의 3사분위수와 1사분위수의 차를 절대값으로 구하고, 소수점 버려서, 정수로 출력  

```python
import pandas as pd

df = pd.read_csv('data/4th/basic1.csv')
res = int(abs(df['age'].quantile(0.75) - df['age'].quantile(0.25)))

print(res)
```
```
50
```

### 문제 1-2

(loves 반응 + wows 반응) / (reactions 반응) 비율이 0.4보다 크고 0.5보다 작으면서, status_type이 'video'인 데이터의 개수  

```python
import pandas as pd

df = pd.read_csv('data/4th/fb.csv')
ratio = (df['loves'] + df['wows']) / df['reactions']
cond_1 = ratio > 0.4
cond_2 = ratio < 0.5
cond_3 = df['type'] == 'video'
res = len(df.loc[cond_1 & cond_2 & cond_3])

print(res)
```
```
90
```

### 문제 1-3

date_added가 2018년 1월 이면서 country가 United Kingdom 단독 제작인 데이터의 개수  

```python
import pandas as pd

df = pd.read_csv('data/4th/nf.csv')
df['date_added'] = pd.to_datetime(df['date_added'])
cond_1 = df['country'] == "United Kingdom"
cond_2 = df['date_added'].dt.year == 2018
cond_3 = df['date_added'].dt.month == 1
res = len(df.loc[cond_1 & cond_2 & cond_3])

print(res)
```
```
6
```

## 작업형 2유형

기존 고객 분류 자료를 바탕으로 신규 고객이 어떤 분류에 속할지 예측  

- 예측할 값(y): "Segmentation" (1,2,3,4)

**제출 형식**

```
ID,Segmentation
458989,1
458994,2
459000,3
459003,4
```

### 풀이

**데이터 읽기**

```python
import pandas as pd

train = pd.read_csv('data/4th/train.csv')
test = pd.read_csv('data/4th/test.csv')
```

**EDA**

```python
print(train.info())
```

<details><summary>terminal</summary><div markdown="1">
```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 6665 entries, 0 to 6664
Data columns (total 11 columns):
 #   Column           Non-Null Count  Dtype  
---  ------           --------------  -----  
 0   ID               6665 non-null   int64  
 1   Gender           6665 non-null   object 
 2   Ever_Married     6665 non-null   object 
 3   Age              6665 non-null   int64  
 4   Graduated        6665 non-null   object 
 5   Profession       6665 non-null   object 
 6   Work_Experience  6665 non-null   float64
 7   Spending_Score   6665 non-null   object 
 8   Family_Size      6665 non-null   float64
 9   Var_1            6665 non-null   object 
 10  Segmentation     6665 non-null   int64  
dtypes: float64(2), int64(3), object(6)
memory usage: 572.9+ KB
None
```
</div></details><br>

```python
print(test.info())
```

<details><summary>terminal</summary><div markdown="1">
```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 2154 entries, 0 to 2153
Data columns (total 10 columns):
 #   Column           Non-Null Count  Dtype  
---  ------           --------------  -----  
 0   ID               2154 non-null   int64  
 1   Gender           2154 non-null   object 
 2   Ever_Married     2154 non-null   object 
 3   Age              2154 non-null   int64  
 4   Graduated        2154 non-null   object 
 5   Profession       2154 non-null   object 
 6   Work_Experience  2154 non-null   float64
 7   Spending_Score   2154 non-null   object 
 8   Family_Size      2154 non-null   float64
 9   Var_1            2154 non-null   object 
dtypes: float64(2), int64(2), object(6)
memory usage: 168.4+ KB
None
```
</div></details><br>

문제의 종류를 확인하기 위해 target 칼럼인 Segmentation 칼럼에 존재하는 unique한 데이터를 확인하고 multiple classfication인 것을 확인한다.  

```python
print(train['Segmentation'].unique())
```
```
[4 2 3 1]
```

**테이블 병합**

학습용 데이터와 검증용 데이터를 합쳐버리면 여러 가지 전처리를 한번에 처리하는 꼼수를 사용할 수 있다.  

```python
df = pd.concat([train, test])
```

전처리를 위해 명목변수와 수치형변수를 분리해준다.  

```python
cols_obj = df.select_dtypes(include='object').columns
cols_num = [col for col in df.columns if col not in cols_obj and col not in ['ID', 'Segmentation']]
```
```python
print(cols_obj)
```
```
Index(['Gender', 'Ever_Married', 'Graduated', 'Profession', 'Spending_Score', 'Var_1'], dtype='object')
```

수치형 변수를 확인해보면, 명목변수가 One-Hot Encoding이 되어 있는 형태이거나, 정규화가 크게 필요하지는 않은 데이터인 것을 확인할 수 있다.  

```python
print(cols_num)
```
```
['Age', 'Work_Experience', 'Family_Size']
```

test 데이터 셋의 `id` 항목은 결과 제출 시에 재활용해야하니 따로 저장해둔다.  

```python
id = test.iloc[:, 0]
```

**One-Hot Encoding**

명목 변수들에 대한 One-Hot Encoding을 진행해준다.  

```python
df = pd.get_dummies(df)
```

**테이블 분리**

전처리를 쉽게 처리하기 위해 합쳐두었던 train set 데이터와 test set 데이터를 다시 분리하고, 모델로 test set 데이터를 inference하는데 불필요한 칼럼을 제거해준다.  

```python
train = df.iloc[:train.shape[0]]
test = df.iloc[train.shape[0]:]

test.drop(columns=['Segmentation', 'ID'], inplace=True)
```

**독립변수/종속변수 분리**

모델의 학습을 위해 독립변수와 종속변수를 분리해준다.  

```python
import numpy as np

endog = np.array(train['Segmentation']).reshape(-1, 1)
exog = train.drop(columns=['Segmentation', 'ID'])
```

**모델 생성 및 학습**

다중 분류를 예측하는 문제이므로, KNN 알고리즘을 사용하기로 한다. 종속변수는 사실 그대로 넣어도 되는데, scikit-learn에서 

```python
from sklearn.neighbors import KNeighborsClassifier as KNN

model = KNN(n_neighbors=4)
model.fit(X=exog, y=np.array(endog).ravel())

print(model.classes_)
```
```
[1. 2. 3. 4.]
```

**학습된 모델을 활용한 확률 예측**

문제에서 어떤 분류에 속할지를 예측하라고 했으므로 `predict` 메서드를 이용해서 test set 데이터에 적용해준다.  

```python
predict = model.predict(test)

print(predict)
```
```
[2. 3. 3. ... 2. 3. 4.]
```

참고로 각 분류에 속할 확률을 예측하고 싶다면 아래와 같이 `predict_proba` 메서드를 적용하면 된다.  

```python
predict_proba = model.predict_proba(test)

print(predict_proba)
```
```
[[0.   0.75 0.25 0.  ]
 [0.   0.25 0.5  0.25]
 [0.   0.25 0.75 0.  ]
 ...
 [0.25 0.5  0.   0.25]
 [0.   0.25 0.75 0.  ]
 [0.   0.25 0.25 0.5 ]]
```

저장해둔 `id`와 출력된 `predict`의 개수가 처음 데이터를 가져온 test set 데이터의 개수와 동일한 것을 확인해준다.  

```python
print(len(id), len(predict))
```
```
2154 2154
```

**결과 데이터 생성**

`id`와 예측 결과를 이용해서 제출용 결과를 만들고, 정상적으로 만들었는지 확인해준다. 제출 예시에 예측 결과를 정수형 자료로 제출하도록 제시되었기 때문에 실수형 데이터로 저장된 결과를 정수형으로 바꿔주어야 한다.  

```python
result = pd.DataFrame({'ID': id, 'Segmentation': predict})
result['Segmentation'] = result['Segmentation'].astype(int)

print(result.head())
```
```
       ID  Segmentation
0  458989             2
1  458994             3
2  459000             3
3  459003             3
4  459005             3
```

**제출용 파일 저장**

답안 제출용 파일을 저장해준다. 제시된 제출 결과와 동일한 양식으로 만들어주어야 한다.  

```python
result.to_csv('result.csv', index=False)
```

### 통합 코드 및 주석

```python
import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier as KNN

# data load
train = pd.read_csv('data/4th/train.csv')
test = pd.read_csv('data/4th/test.csv')

# EDA
print(train.info())
print(test.info())
print(train['Segmentation'].unique())

# table concat for preprocessing
df = pd.concat([train, test])

cols_obj = df.select_dtypes(include='object').columns
cols_num = [col for col in df.columns if col not in cols_obj and col not in ['ID', 'Segmentation']]

print(cols_obj)
print(cols_num)

# save id of test set data
id = test.iloc[:, 0]

# one-hot encoding
df = pd.get_dummies(df)

# train/test split
train = df.iloc[:train.shape[0]]
test = df.iloc[train.shape[0]:]

test.drop(columns=['Segmentation', 'ID'], inplace=True)

# separate dependent/independent variable from train set
endog = np.array(train['Segmentation']).reshape(-1, 1)
exog = train.drop(columns=['Segmentation', 'ID'])


# load model and fit model
model = KNN(n_neighbors=4)
model.fit(X=exog, y=np.array(endog).ravel())

print(model.classes_)

# inference test set with fitted model
predict = model.predict(test)

print(predict)

# make result table to make csv file
result = pd.DataFrame({'ID': id, 'Segmentation': predict})
result['Segmentation'] = result['Segmentation'].astype(int)

print(result.head())

# save csv file
result.to_csv('result.csv', index=False)
```

---
## Reference
- [4th-type1-python](https://www.kaggle.com/code/agileteam/4th-type1-python/notebook)
- [4th-t2-python](https://www.kaggle.com/code/agileteam/4th-t2-python/notebook)
- [Big Data Analytics Certification KR 2022](https://www.kaggle.com/competitions/big-data-analytics-certification-kr-2022/data)