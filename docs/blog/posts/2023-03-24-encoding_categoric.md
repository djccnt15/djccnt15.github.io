---
slug: handling-categorical-data
title: 범주형 데이터의 전처리
date:
    created: 2023-03-24
description: >
    범주형 데이터를 수학으로 분석 가능하게 만드는 방법
categories:
    - Data Analysis
tags:
    - preprocessing
    - scikit-learn
    - pandas
---

범주형 데이터를 수학으로 분석 가능하게 만드는 방법  

<!-- more -->

---

데이터에 대한 수학적 분석을 통해 모델을 만드려면 반드시 모든 데이터가 숫자로 이루어져 있어야 한다.  

[pandas를 직접 전처리하거나 NumPy가 제공하는 함수를 사용](2022-01-20-conditional_replace.md)해서 [범주형 자료](2022-12-17-variable_types.md/#1-1-자료의-분류)를 수치화하는 전처리 작업을 직접 진행할 수도 있지만, scikit-learn이나 pandas에서 인코딩을 쉽게 할 수 있는 API를 제공하고 있어 정리해둔다.  

## Label 인코딩

인코딩 대상 데이터를 0부터 n - 1까지의 숫자로 단순 인코딩하는 방법으로, 어떤 데이터가 어떤 숫자로 인코딩 될지 정할 수 없기 때문에 종속변수를 인코딩 할 때만 사용해야 한다.  

```python
from sklearn.preprocessing import LabelEncoder

enc = LabelEncoder()

enc.fit(["paris", "paris", "tokyo", "amsterdam"])
print(enc.transform(["tokyo", "tokyo", "paris"]))
```
```
[2 2 1]
```

## Ordinal 인코딩

순서형 데이터를 인코딩 할 때는 scikit-learn의 `OrdinalEncoder`를 활용하면 쉽게 처리할 수 있다.  

위의 `LabelEncoder`와 작동 원리는 동일하나 어떤 데이터를 어떤 숫자로 인코딩 할지 개발자가 커스텀할 수 있고, 커스텀을 위해 입력된 범주들에 없는 데이터가 있거나(unknown_value), 결측치가 있을 때 어떻게 처리할지(encoded_missing_value) 등을 지정할 수 있어 독립변수의 인코딩에 사용할 수 있다.  

파라미터를 지정하여 사용하는 방법은 아래와 같다.  

```python
import numpy as np
from sklearn.preprocessing import OrdinalEncoder

enc = OrdinalEncoder(
    categories=[['first', 'second', 'third', np.nan]],  # custom categories order
    handle_unknown='use_encoded_value',                 # in case unknown categorical feature input when transform
    unknown_value=99,                                   # value for unknown data when handle_unknown parameter is 'use_encoded_value'
    encoded_missing_value=-1                            # value for missing data
)

enc.fit([['third'], ['second'], ['first'], ['forth']])
print(enc.transform([[np.nan], ['fifth'], ['forth'], ['third'], ['second'], ['first']]))
```
```
[[-1.]
 [99.]
 [99.]
 [ 2.]
 [ 1.]
 [ 0.]]
```

## OneHot 인코딩

순서형이 아닌 단순 명목형의 범주형 데이터를 인코딩 할 때는 OneHot 인코딩을 사용해야 한다.  

### scikie-learn

일정 카테고리를 drop 하면서 인코딩 되도록 설정할 수도 있고, `sparse_output` 파라미터를 통해 결과값이 SciPy의 `csr_matrix`로 반환될지, 아니면 NumPy 배열로 반환될지 설정할 수 있다.  

!!! info
    구버전의 `sparse` 파라미터가 `sparse_output` 파라미터로 변경되었다.  

```python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

data = [['setosa'], ['versicolor'], ['virginica']]

enc = OneHotEncoder()

enc.fit(data)
encoded = enc.transform([['setosa'], ['versicolor'], ['virginica'], ['setosa'], ['setosa'], ['virginica']])
print(pd.DataFrame.sparse.from_spmatrix(data=encoded, columns=[v for x in data for v in x]))
```

```python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

data = [['setosa'], ['versicolor'], ['virginica']]

enc = OneHotEncoder(sparse_output=False)

enc.fit(data)
encoded = enc.transform([['setosa'], ['versicolor'], ['virginica'], ['setosa'], ['setosa'], ['virginica']])
print(pd.DataFrame(data=encoded, columns=[v for x in data for v in x]))
```
```
   setosa  versicolor  virginica
0     1.0         0.0        0.0
1     0.0         1.0        0.0
2     0.0         0.0        1.0
3     1.0         0.0        0.0
4     1.0         0.0        0.0
5     0.0         0.0        1.0
```

### pandas

pandas에도 `get_dummies`라는 API가 있는데, train 데이터의 특성을 저장하지 않기 때문에 train 데이터에만 있고 test 데이터에는 없는 카테고리를 test 데이터에서 처리할 수 없다는 점을 고려하여 전처리를 진행해야 한다.  

```python
import pandas as pd

data = {
    'Species': ['setosa', 'versicolor', 'virginica'],
    'tmp': ['a', 'b', 'c']
}
df = pd.DataFrame(data)

df = pd.get_dummies(
    data=df,
    columns=['Species'],
    prefix='dummy'
)
print(df)
```
```
  tmp  dummy_setosa  dummy_versicolor  dummy_virginica
0   a             1                 0                0
1   b             0                 1                0
2   c             0                 0                1
```

---
## Reference
- [LabelEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html)
- [OrdinalEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OrdinalEncoder.html)
- [OneHotEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html)
- [get_dummies](https://pandas.pydata.org/docs/reference/api/pandas.get_dummies.html)