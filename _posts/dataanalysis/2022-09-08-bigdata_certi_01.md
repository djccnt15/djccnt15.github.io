---
published: true
layout: post
title: '[빅분기] 실기 대비 01'
description: >
    빅데이터분석기사 실기 예제 문제 풀이
categories: [DataAnalysis]
tags: [data analysis, 빅데이터분석기사]
image:
    path: /assets/img/posts/bigdata_certi.png
related_posts:
    - _posts/dataanalysis/2022-09-09-bigdata_certi_02.md
---
* toc
{:toc}

## 개요

한국데이터산업진흥원에서 공개한 빅데이터분석기사 실기 예제가 있어 풀이해둔다. `파이썬패키지.txt` 파일을 보면 이런저런 패키지들이 잔뜩 들어있는데, 핵심적인 패키지들은 아래와 같다.  

```
numpy
pandas
scikit-learn
scipy
xgboost
```

`pip install` 명령어를 사용해서 각각의 패키지들을 설치해주자. `python` 환경을 분리해야할 경우 [가상환경](/programming/python_venv/)을 만들어서 작업하면 된다.  

## 작업형 제1유형 : 데이터 처리 영역

mtcars 데이터셋(mtcars.csv)의 qsec 컬럼을 최소최대 척도(Min-Max Scale)로 변환한 후 0.5보다 큰 값을 가지는 레코드 수를 구하시오.  

```python
import pandas as pd

df = pd.read_csv('mtcars.csv')
```

해법은 여러 가지가 있는데, 수식을 다 외우고 있는게 아니라면 그냥 `scikit-learn`의 `Scaler`를 사용하는게 나을 것 같다.  

### 풀이 1. scikit-learn 사용

```python
from sklearn.preprocessing import MinMaxScaler

data = df[['qsec']]

scaler = MinMaxScaler()
scaler.fit(data)
scaled = scaler.transform(data)

print(len(scaled[scaled > 0.5]))
```
```
9
```

### 풀이 2. 직접 계산

```python
data = df['qsec']

min = min(data)
max = max(data)

scaled = (data - min) / (max - min)
print(scaled)

print(len(scaled[scaled > 0.5]))
```
```
9
```

## 작업형 제2유형 : 모형 구축 및 평가 영역

고객 3,500명에 대한 학습용 데이터(`y_train.csv`, `X_train.csv`)를 이용하여 성별예측 모형을 만든 후, 이를 평가용 데이터(`X_test.csv`)에 적용하여 얻은 2,482명 고객의 성별 예측값(남자일 확률)을 다음과 같은 형식의 `CSV` 파일로 생성하시오.(제출한 모델의 성능은 ROC-AUC 평가지표에 따라 채점)  

\* gender: 고객의 성별 (0: 여자, 1: 남자)  

**제출형식**

```
custid,gender
3500,0.267
3501,0.578
3502,0.885
```

❗ 1회차 시험 때 제출 형식의 칼럼명을 다르게 썼다고 **0점 처리**된 사람이 많다는 얘기가 있다. 제출 형식에 주의해야 한다.  
{:.note title='attention'}

**유의사항**

성능이 우수한 예측모형을 구축하기 위해서는 적절한 데이터 전처리, Feature Engineering, 분류 알고리즘 사용, 초매개변수 최적화, 모형 앙상블 등이 수반되어야 한다.  

### 풀이

**데이터 읽기**

우선 데이터를 읽어온 후 형태를 확인해야 한다.  

```python
import pandas as pd

exog = pd.read_csv('data/X_train.csv', encoding='euc-kr')
endog = pd.read_csv('data/y_train.csv', encoding='euc-kr')
test = pd.read_csv('data/X_test.csv', encoding='euc-kr')
```

[인코딩 문제](/dataanalysis/csv_encoding_02/)가 있어서 `encoding='euc-kr'` `parameter`를 입력했는데, 한국데이터산업진흥원에서 제공하는 체험 환경에서는 없어도 작동한다. 아마 시험 환경에서도 입력하지 않아도 될 듯하다.  
{:.note}

**EDA 진행**

데이터에 대한 기본 정보를 확인해본다.  

```python
print(exog.info())
```

<details>
<summary>print</summary>
<div markdown="1">

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 3500 entries, 0 to 3499
Data columns (total 10 columns):
 #   Column   Non-Null Count  Dtype
---  ------   --------------  -----
 0   cust_id  3500 non-null   int64
 1   총구매액     3500 non-null   int64
 2   최대구매액    3500 non-null   int64
 3   환불금액     1205 non-null   float64
 4   주구매상품    3500 non-null   object
 5   주구매지점    3500 non-null   object
 6   내점일수     3500 non-null   int64
 7   내점당구매건수  3500 non-null   float64
 8   주말방문비율   3500 non-null   float64
 9   구매주기     3500 non-null   int64
dtypes: float64(3), int64(5), object(2)
memory usage: 273.6+ KB
None
```

</div>
</details><br>

```python
print(endog.info())
```

<details>
<summary>print</summary>
<div markdown="1">

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 3500 entries, 0 to 3499
Data columns (total 2 columns):
 #   Column   Non-Null Count  Dtype
---  ------   --------------  -----
 0   cust_id  3500 non-null   int64
 1   gender   3500 non-null   int64
dtypes: int64(2)
memory usage: 54.8 KB
None
```

</div>
</details><br>

```python
print(test.info())
```

<details>
<summary>print</summary>
<div markdown="1">

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 2482 entries, 0 to 2481
Data columns (total 10 columns):
 #   Column   Non-Null Count  Dtype
---  ------   --------------  -----
 0   cust_id  2482 non-null   int64
 1   총구매액     2482 non-null   int64
 2   최대구매액    2482 non-null   int64
 3   환불금액     871 non-null    float64
 4   주구매상품    2482 non-null   object
 5   주구매지점    2482 non-null   object
 6   내점일수     2482 non-null   int64
 7   내점당구매건수  2482 non-null   float64
 8   주말방문비율   2482 non-null   float64
 9   구매주기     2482 non-null   int64
dtypes: float64(3), int64(5), object(2)
memory usage: 194.0+ KB
None
```

</div>
</details><br>

EDA를 통해 `주구매상품`, `주구매지점` 두 칼럼이 `object` type인 것을 확인할 수 있다. 해당 칼럼들이 어떤 내용들로 이루어져 있는지 확인할 필요가 있다.  

```python
print(pd.unique(exog['주구매상품']))
print(pd.unique(test['주구매상품']))
print(len(pd.unique(exog['주구매상품'])), len(pd.unique(test['주구매상품'])))
```

<details>
<summary>print</summary>
<div markdown="1">

```
['기타' '스포츠' '남성 캐주얼' '보석' '디자이너' '시티웨어' '명품' '농산물' '화장품' '골프' '구두' '가공식품'
 '수산품' '아동' '차/커피' '캐주얼' '섬유잡화' '육류' '축산가공' '젓갈/반찬' '액세서리' '피혁잡화' '일용잡화'
 '주방가전' '주방용품' '건강식품' '가구' '주류' '모피/피혁' '남성 트랜디' '셔츠' '남성정장' '생활잡화'
 '트래디셔널' '란제리/내의' '커리어' '침구/수예' '대형가전' '통신/컴퓨터' '식기' '소형가전' '악기']
['골프' '농산물' '가공식품' '주방용품' '수산품' '화장품' '기타' '스포츠' '디자이너' '시티웨어' '구두' '캐주얼'
 '명품' '건강식품' '남성정장' '커리어' '남성 캐주얼' '축산가공' '식기' '피혁잡화' '모피/피혁' '섬유잡화'
 '트래디셔널' '차/커피' '육류' '가구' '아동' '셔츠' '액세서리' '젓갈/반찬' '대형가전' '일용잡화' '통신/컴퓨터'
 '생활잡화' '주방가전' '란제리/내의' '남성 트랜디' '보석' '주류' '침구/수예' '악기']
42 41
```

</div>
</details><br>

```python
print(pd.unique(exog['주구매지점']))
print(pd.unique(test['주구매지점']))
print(len(pd.unique(exog['주구매지점'])), len(pd.unique(test['주구매지점'])))
```

<details>
<summary>print</summary>
<div markdown="1">

```
['강남점' '잠실점' '관악점' '광주점' '본  점' '일산점' '대전점' '부산본점' '분당점' '영등포점' '미아점'
 '청량리점' '안양점' '부평점' '동래점' '포항점' '노원점' '창원점' '센텀시티점' '인천점' '대구점' '전주점'
 '울산점' '상인점']
['부산본점' '잠실점' '본  점' '청량리점' '분당점' '일산점' '대전점' '강남점' '동래점' '영등포점' '부평점'
 '대구점' '노원점' '광주점' '관악점' '미아점' '창원점' '인천점' '안양점' '상인점' '포항점' '울산점' '전주점'
 '센텀시티점']
24 24
```

</div>
</details><br>

**명목 변수와 수치형 변수 분리**

```python
obj_cols = exog.select_dtypes(include='object').columns

print(obj_cols)
```
```
Index(['주구매상품', '주구매지점'], dtype='object')
```

```python
num_cols = [i for i in exog.columns if i not in obj_cols]
cust_id = test.loc[:,'cust_id']
num_cols.remove('cust_id')

print(num_cols)
```
```
['총구매액', '최대구매액', '환불금액', '내점일수', '내점당구매건수', '주말방문비율', '구매주기']
```

**테이블 병합**

실무에서는 쓸모 없지만 시험이나 연습에서는 통하는 꼼수(?)가 있는데, 학습용 데이터와 검증용 데이터를 합쳐버리면 여러 가지 전처리를 한번에 처리할 수 있다.  

```python
df = pd.concat([exog, test])

print(df.info())
```

<details>
<summary>print</summary>
<div markdown="1">

```
<class 'pandas.core.frame.DataFrame'>
Int64Index: 5982 entries, 0 to 2481
Data columns (total 10 columns):
 #   Column   Non-Null Count  Dtype  
---  ------   --------------  -----  
 0   cust_id  5982 non-null   int64  
 1   총구매액     5982 non-null   int64  
 2   최대구매액    5982 non-null   int64  
 3   환불금액     2076 non-null   float64
 4   주구매상품    5982 non-null   object 
 5   주구매지점    5982 non-null   object 
 6   내점일수     5982 non-null   int64  
 7   내점당구매건수  5982 non-null   float64
 8   주말방문비율   5982 non-null   float64
 9   구매주기     5982 non-null   int64  
dtypes: float64(3), int64(5), object(2)
memory usage: 514.1+ KB
None
```

</div>
</details><br>

**필요 없는 칼럼 제거**

연습용으로 주어진 데이터의 `cust_id` 칼럼은 `index`와 완전히 똑같아서 쓸모 없다.  

```python
df.drop(columns=['cust_id'], inplace=True)
endog.drop(columns=['cust_id'], inplace=True)
```

**결측치 제거**

`환불금액` 칼럼은 결측치가 많이 포함된 것으로 나오는데, 0원이라 집계되지 않았을 가능성이 높다. 따라서 이 경우에는 `0`으로 대체한다.  

```python
df['환불금액'].fillna(value=0, inplace=True)
```

**정규화**

정규화는 이상치의 영향을 적게 받는 `Robust Scaling`을 적용해주는게 무난하다. 자세한 설명은 [이 글](/dataanalysis/scalers/) 참고  

```python
import numpy as np
from sklearn.preprocessing import RobustScaler

scaler = RobustScaler()
for col in num_cols:
    df[col] = scaler.fit_transform(np.array(df[col]).reshape(-1, 1))
```

**One-hot Encoding**

EDA를 통해서 확인한 명목 변수 `'주구매상품', '주구매지점'` 두 개 칼럼에 대해 One-hot Encoding을 진행해준다.  

```python
encoded = pd.get_dummies(df[['주구매상품', '주구매지점']])
df = pd.concat([df, encoded], axis=1)
df.drop(columns=['주구매상품', '주구매지점'], inplace=True)

print(df.info())
```

<details>
<summary>print</summary>
<div markdown="1">

```
Output exceeds the size limit. Open the full output data in a text editor
<class 'pandas.core.frame.DataFrame'>
Int64Index: 5982 entries, 0 to 2481
Data columns (total 73 columns):
 #   Column        Non-Null Count  Dtype  
---  ------        --------------  -----  
 0   총구매액          5982 non-null   float64
 1   최대구매액         5982 non-null   float64
 2   환불금액          5982 non-null   float64
 3   내점일수          5982 non-null   float64
 4   내점당구매건수       5982 non-null   float64
 5   주말방문비율        5982 non-null   float64
 6   구매주기          5982 non-null   float64
 7   주구매상품_가공식품    5982 non-null   uint8  
 8   주구매상품_가구      5982 non-null   uint8  
 9   주구매상품_건강식품    5982 non-null   uint8  
 10  주구매상품_골프      5982 non-null   uint8  
 11  주구매상품_구두      5982 non-null   uint8  
 12  주구매상품_기타      5982 non-null   uint8  
 13  주구매상품_남성 캐주얼  5982 non-null   uint8  
 14  주구매상품_남성 트랜디  5982 non-null   uint8  
 15  주구매상품_남성정장    5982 non-null   uint8  
 16  주구매상품_농산물     5982 non-null   uint8  
 17  주구매상품_대형가전    5982 non-null   uint8  
 18  주구매상품_디자이너    5982 non-null   uint8  
 19  주구매상품_란제리/내의  5982 non-null   uint8  
...
 72  주구매지점_포항점     5982 non-null   uint8  
dtypes: float64(7), uint8(66)
memory usage: 759.4 KB
None
```

</div>
</details><br>

**테이블 분리**

위에서 꼼수를 위해 합쳐준 학습용 데이터셋과 검증용 데이터셋을 다시 분리해준다.  

```python
exog = df.iloc[:3500, :]
test = df.iloc[3500:, :]
```

**Model 생성 및 학습**

간단하게 로지스틱 회귀를 불러와서 학습을 진행해준다. 후기들을 보니 정상적으로 제출만 해도 대부분 합격이 되는 것 같아 문제에서 요구하는 수준의 하이퍼파라미터 튜닝이나 모델 앙상블을 특별히 적용하지는 않았다.  

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(exog, endog)

predict = model.predict_proba(test)
```

문제에서 결과값으로 **남자일 확률**, 즉 **예측값이 1일 확률**을 요구하는데, scikit-learn의 인퍼런스를 통해 확률을 도출하면, 0일 확률과 1일 확률이 순서대로 도출되기 때문에 그에 맞춰서 결과값을 정리해준다.  

```python
predict_man = predict[:, 1]
result = pd.DataFrame({'custid':cust_id, 'gender':predict_man})

print(result.head())
```
```
   custid    gender
0    3500  0.552876
1    3501  0.137384
2    3502  0.181973
3    3503  0.353272
4    3504  0.436386
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
from sklearn.linear_model import LogisticRegression

# data load
# might not need to use encoding parameter in examination environment
exog = pd.read_csv('data/X_train.csv', encoding='euc-kr')
endog = pd.read_csv('data/y_train.csv', encoding='euc-kr')
test = pd.read_csv('data/X_test.csv', encoding='euc-kr')

# EDA stage
print(exog.info())
print(endog.info())
print(test.info())

# check the unique values of columns with object type
print(pd.unique(exog['주구매상품']))
print(pd.unique(test['주구매상품']))
print(len(pd.unique(exog['주구매상품'])), len(pd.unique(test['주구매상품'])))

print(pd.unique(exog['주구매지점']))
print(pd.unique(test['주구매지점']))
print(len(pd.unique(exog['주구매지점'])), len(pd.unique(test['주구매지점'])))

# get list of columns with categorical data types
obj_cols = exog.select_dtypes(include='object').columns

print(obj_cols)

# get list of columns with numerical data types
num_cols = [i for i in exog.columns if i not in obj_cols]
cust_id = test.loc[:,'cust_id']  # get 'cust_id' of test data for making result data set
num_cols.remove('cust_id')  # remove 'cust_id' from num col list, because 'cust_id' column will be dropped later

print(num_cols)

# concatenation for little trick
df = pd.concat([exog, test])

print(df.info())

# drop meaningless columns
df.drop(columns=['cust_id'], inplace=True)
endog.drop(columns=['cust_id'], inplace=True)

# deal with missing value 
df['환불금액'].fillna(value=0, inplace=True)

print(df.info())

# apply data scaling
# robust scaling is the best, just in case the data has outlier
scaler = RobustScaler()
for col in num_cols:
    df[col] = scaler.fit_transform(np.array(df[col]).reshape(-1, 1))

# apply one-hot encoding
encoded = pd.get_dummies(df[['주구매상품', '주구매지점']])
df = pd.concat([df, encoded], axis=1)
df.drop(columns=['주구매상품', '주구매지점'], inplace=True)

print(df.info())

# split table as original form
exog = df.iloc[:3500, :]
test = df.iloc[3500:, :]

print(exog.info())
print(test.info())
print(endog.info())

# model tuning and training
# load model for classification, not really did any hyperparameter tuning
model = LogisticRegression()

# model fitting
model.fit(exog, endog)

# inference with trained model
predict = model.predict_proba(test)
predict_man = predict[:, 1]  # select the probability which the inferenced value is 1

# make DataFrame to make csv
result = pd.DataFrame({'custid':cust_id, 'gender':predict_man})

print(result.head())

# save result file
result.to_csv('result.csv', index=False)
```

---
## Reference
- [제2회 빅데이터분석기사 실기 안내(수정: 체험링크 추가)](https://www.dataq.or.kr/www/board/view.do?bbsKey=eyJiYnNhdHRyU2VxIjoxLCJiYnNTZXEiOjUwOTM0M30=&boardKind=notice)