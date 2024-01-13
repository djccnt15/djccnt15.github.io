---
slug: pandas-finding-single-value-column
title: DataFrame에서 단일값으로 이루어진 칼럼 찾는 방법
date:
    created: 2023-04-02
description: >
    pandas 테이블에서 단일값으로 이루어진 칼럼을 반환하는 함수
categories:
    - Data Analysis
tags:
    - pandas
---

pandas 테이블에서 단일값으로 이루어진 칼럼만 찾아내는 함수  

<!-- more -->

---

## 단일값 칼럼 찾는 함수

데이터 분석 실무를 하다보면, 단일값으로 이루어져 의미 없는 칼럼이 꽤나 자주 있다. 매번 따로 확인하기 귀찮아서 아래와 같이 재활용하기 좋은 함수를 만들어보았다.  

Function Annotation에서 볼 수 있듯이 데이터프레임을 받으면 값이 한 종류인 칼럼의 목록을 반환하고, `dropna` 파라미터를 통해서 값이 `NaN`인 경우를 포함할지 말지 정할 수 있다.  

```python
import pandas as pd


def is_single(series: pd.Series, dropna: bool = True) -> bool:
    """check whether the series has single value or not"""

    return series.nunique(dropna=dropna) == 1


def find_single(df: pd.DataFrame, dropna: bool = True) -> list | None:
    """find columns which has only one value except NaN"""

    res = [col for col in df.columns if is_single(series=df[col], dropna=dropna)]
    return res if len(res) else None
```

## 사용해보기

우선 아래와 같이 데이터를 준비한다.  

```python
import numpy as np
import pandas as pd

data = {
    "a": [1, 1, np.nan, 1],
    "b": [2, 2, 2, 2],
    "c": [1, 2, 3, 4]
}

df = pd.DataFrame(data)
print(df.head())
```
```
     a  b  c
0  1.0  2  1
1  1.0  2  2
2  NaN  2  3
3  1.0  2  4
```

`dropna` 파라미터를 조정하면 Null 값의 유무에 따라 결과가 달리 나오는 것을 확인할 수 있다.  

```python
print([is_single(series=df[col], dropna=True) for col in df.columns])
print(find_single(df=df, dropna=True))
```
```
[True, True, False]
['a', 'b']
```
```python
print([is_single(series=df[col], dropna=False) for col in df.columns])
print(find_single(df=df, dropna=False))
```
```
[False, True, False]
['b']
```