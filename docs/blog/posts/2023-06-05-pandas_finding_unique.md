---
slug: pandas-finding-unique-values
title: DataFrame의 객체형 데이터에서 유니크 값의 종류 및 개수 확인하는 방법
date:
    created: 2023-06-05
description: >
    객체형 칼럼의 유니크 값의 종류 및 개수를 반환하는 함수
categories:
    - Data Analysis
tags:
    - pandas
---

객체형 칼럼의 유니크 값의 종류 및 개수를 반환하는 함수  

<!-- more -->

---

## 함수 만들기

데이터 분석을 하면서 가장 많이 처리하는 전처리 중에 하나가 객체형 칼럼의 변환이다. 데이터프레임에서 객체형 칼럼의 유니크 값의 종류를 찾고, 각 유니크 값의 개수를 반환해주는 함수들을 아래와 같이 만들어보았다.  

```python
import pandas as pd


def unique_obj(df: pd.DataFrame) -> dict | None:
    """returns unique values of object type columns"""

    res = {col: list(df[col].unique()) for col in df.select_dtypes(include='object').columns}
    return res if len(res) > 0 else None


def unique_obj_count(df: pd.DataFrame) -> list:
    """returns value counts of object type columns"""

    res = [df[key].value_counts() for key in unique_obj(df).keys()]
    return res
```

## 사용해보기

실제 데이터프레임에 적용해보면 아래와 같이 결과가 출력되는 것을 확인할 수 있다.  

```python
import pydataset as pds

df = pds.data('iris')
df['tmp'] = df['Species']

print(unique_obj(df))
```
```
{'Species': ['setosa', 'versicolor', 'virginica'], 'tmp': ['setosa', 'versicolor', 'virginica']}
```
```python
for v in unique_obj_count(df):
    print(v)
```
```
setosa        50
versicolor    50
virginica     50
Name: Species, dtype: int64
setosa        50
versicolor    50
virginica     50
Name: tmp, dtype: int64
```