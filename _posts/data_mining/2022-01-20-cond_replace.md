---
title: "data의 조건부 변환"
excerpt: "조건에 맞는 데이터를 찾고 수정하기"
published: true

toc: true
toc_sticky: true

categories:
  - data mining
tags:
  - python
  - data mining
  - dataframe
  - pandas
  - numpy
---
# {{ page.excerpt }}
---
데이터를 다루다보면 조건에 따라 특정하게 수정하고 싶을 경우가 있다.  
그럴 때 사용할 수 있는 방법들이 있다.  

## 0. 예제 데이터 생성
```python
import pandas as pd

a = [2, 3, 4, 5]
b = [1, 2, 3, 4]

df = pd.DataFrame()
df['a'], df['b'] = a, b

print(df)
```

```markdown
   a  b
0  2  1
1  3  2
2  4  3
3  5  4
```

## 1. pandas.DataFrame.loc 사용
임시 칼럼을 만들어서 조건에 따라 값을 넣어준 다음에 임시 칼럼을 원본 칼럼으로 바꿔준다.  
임시 칼럼을 만들지 않고 바로 작업할 수도 있지만 그러면 연산 순서에 신경을 더 많이 써줘야 한다.  

```python
# single condition
df.loc[df['b'] == 3, 't'] = 42

# multiple conditions
df.loc[(df['b'] > 3) & (df['a'] >= 5), 't'] = df['b'] ** 2

# fill no condition
df['t'] = df['t'].fillna(df['b'])

print(df)
```

```markdown
   a  b     t
0  2  1   1.0
1  3  2   2.0
2  4  3  42.0
3  5  4  16.0
```

데이터 타입을 원본 데이터와 같도록 수정하고 원본 칼럼을 지운 후, 임시칼럼의 이름을 원본 칼럼의 이름으로 바꾸어준다.  

```python
# change type
df['t'] = df['t'].astype(dtype='int64')

# drop temp col
df.drop(['b'], axis=1, inplace=True)
df.rename(columns={'t': 'b'}, inplace=True)

print(df)
```

```markdown
   a   b
0  2   1
1  3   2
2  4  42
3  5  16
```

## 2. numpy.where 사용
데이터에서 조건에 맞는 인덱스를 반환하거나 값을 수정할 수 있는 함수로, 조금 더 간단하게 사용할 수 있지만, `pandas.DataFrame.loc`기능을 임시 칼럼 없이 사용하는 것과 같이 **연산 순서에 신경을 써줘야 한다.**  

공식 문서에는 `numpy.where(condition, [x, y, ]/)`이라고 적혀있는데, `condition`연산의 결과가 `True`일 때 `x`, `False`일 때 `y`가 적용 된다는 뜻이다.  

```python
import numpy as np

# single condition
df['b'] = np.where(df['b'] == 3, 42, df['b'])

# multiple conditions
df['b'] = np.where((df['b'] > 3) & (df['a'] >= 5), df['b'] ** 2, df['b'])

print(df)
```

```markdown
   a   b
0  2   1
1  3   2
2  4  42
3  5  16
```

## 3. ❗numpy.select 사용
내가 가장 선호하는 방식으로, 앞선 두 방법들은 하나의 조건에 따른 `True/False` 결과만을 연산하기 때문에 조건의 목록을 늘리고 싶을 경우 연산을 여러차례 진행해야 하며 연산 순서를 신경 써야 하는 반면 `numpy.select`는 조건의 리스트를 무한정 늘릴 수 있고, 연산 순서는 고려하지 않아도 된다.  

함수의 주요 인자는 아래와 같다.  

- condlist: choicelist가 적용될 조건으로, **여러 조건을 동시에 만족하면 가장 처음 조건이 적용 된다.**  
- choicelist: condlist에 따라 반환된 요소에 적용될 계산으로, **반드시 condlist와 길이가 동일해야 한다.**  
- default: 어떤 조건도 해당하지 않는 경우에 적용된다.  
{: .notice}

당연한 얘기지만 **조건 개수와 변환식의 개수는 반드시 동일해야 한다.**  

```python
import numpy as np

# declare condition list
cond = [
    df['b'] == 3,                   # single condition
    (df['b'] > 3) & (df['a'] >= 5)  # multiple conditions
]

# declare choice list
choice = [
    42,                             # output elements for first condition
    df['b'] ** 2                    # output elements for second condition
]

# conditional replace
df['b'] = np.select(
    condlist=cond,
    choicelist=choice,
    default=df['b']                 # all conditions evaluate to False
)

print(df)
```

```markdown
   a   b
0  2   1
1  3   2
2  4  42
3  5  16
```

---
# Reference
- [pandas.DataFrame.loc](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.loc.html)
- [numpy.where](https://numpy.org/doc/stable/reference/generated/numpy.where.html)
- [numpy.select](https://numpy.org/doc/stable/reference/generated/numpy.select.html)