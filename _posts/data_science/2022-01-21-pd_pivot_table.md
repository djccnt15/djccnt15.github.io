---
published: true
layout: post

title: '[데이터 분석] python으로 pivot table 분석하기'
description: >
  pandas pivot_table, groupby
hide_description: false
image: 
  path: /assets/img/posts/pd_pivot_table.png
related_posts:
  - _posts/data_science/2022-01-21-pd_pivot_table.md

categories:
  - data_science
tags:
  - data science
  - pivot table
  - python
  - pandas
  - numpy
---
* toc
{:toc}

## 0. 데이터 준비

샘플데이터는 `pydataset` 패키지가 제공하는 `Housing`을 사용한다.  

```python
import pydataset as pds

df = pds.data('Housing')

print(df)
```
```markdown
        price  lotsize  bedrooms  bathrms  stories driveway recroom fullbase gashw airco  garagepl prefarea
1     42000.0     5850         3        1        2      yes      no      yes    no    no         1       no
2     38500.0     4000         2        1        1      yes      no       no    no    no         0       no
3     49500.0     3060         3        1        1      yes      no       no    no    no         0       no
4     60500.0     6650         3        1        2      yes     yes       no    no    no         0       no
5     61000.0     6360         2        1        1      yes      no       no    no    no         0       no
..        ...      ...       ...      ...      ...      ...     ...      ...   ...   ...       ...      ...
542   91500.0     4800         3        2        4      yes     yes       no    no   yes         0       no
543   94000.0     6000         3        2        4      yes      no       no    no   yes         0       no
544  103000.0     6000         3        2        4      yes     yes       no    no   yes         1       no
545  105000.0     6000         3        2        2      yes     yes       no    no   yes         1       no
546  105000.0     6000         3        1        2      yes      no       no    no   yes         1       no

[546 rows x 12 columns]
```

## 1. pandas.pivot_table

엑셀에는 데이터 재구조화 및 요약 기능을 제공하는 `pivot table`이라는 아주 강력한 데이터 분석 툴이 있다.  
거의 똑같은 기능을 `pandas`에서도 `pivot_table`이라는 함수를 통해 제공하는데 심지어 공식문서에서 대놓고 `An Excel style pivot table.`을 리턴한다고 명시하고 있다.  

`pivot_table`은 요약할 데이터를 인자로 받는 함수다. `pandas.pivot_table`의 주요 인자들은 아래와 같다.  

- data: 분석할 데이터  
- values: 요약될 값  
- index: 피벗 테이블에서 값을 행으로 그룹화할 기준값  
- columns: 피벗 테이블에서 값을 열로 그룹화할 기준값  
- aggfunc: 값을 요약할 계산식, 기본값은 `numpy.mean`  
- fill_valu: 요약 후 결과 피벗 테이블에서 빈 값을 채울 값  
- sort: 정렬 여부 결정  
- margins: 그룹별 부분합계와 총합계의 표시 여부  
- margins_name: 그룹별 부분합계와 총합계의 이름으로 표시될 문자열 데이터  

`recroom`과 `bedrooms`에 따른 `lotsize`의 평균을 구하려면 아래와 같다.  

```python
import pandas as pd

pt = pd.pivot_table(
    data=df,
    values='lotsize',
    index='recroom',
    columns='bedrooms',
    aggfunc='mean',
)

print(pt)
```
```markdown
bedrooms       1         2            3            4         5       6
recroom
no        3710.0  4687.050  5048.238683  5322.554054  6334.375  3950.0
yes          NaN  4255.125  5970.068966  6496.523810  6120.000     NaN
```

`bedrooms`과 `airco`의 그룹에 속하는 `개수`를 구하려면 아래와 같이 `aggfunc='size'`를 사용해야 한다.  

```python
import pandas as pd

pt = pd.pivot_table(
    data=df,
    index='airco',
    columns='bedrooms',
    aggfunc='size',
    fill_value=0
)

print(pt)
```
```markdown
bedrooms  1    2    3   4  5  6
airco
no        2  114  193  55  7  2
yes       0   22  108  40  3  0
```

아래와 같이 `index`와 `columns`에 둘 이상의 기준을 사용해서 그룹화 하고, `fill_value`를 사용해 데이터가 없는 그룹에 표기할 기본값을 지정할 수 있다.  
또한 `margins`와 `margins_name`를 사용해 부분합계와 총합계를 표기할 수 있다.  

```python
import pandas as pd

pt = pd.pivot_table(
    data=df,
    values='recroom',
    index=['airco', 'driveway'],
    columns=['bedrooms', 'fullbase'],
    aggfunc='count',
    fill_value=0,
    margins=True,
    margins_name='total'
)

print(pt)
```
```markdown
bedrooms        1    2        3        4      5      6 total
fullbase       no   no yes   no  yes  no yes no yes no
airco driveway
no    no        1   13   5   23    6   8   3  1   2  0    62
      yes       1   73  23   96   68  27  17  3   1  2   311
yes   no        0    2   0    5    5   1   1  0   1  0    15
      yes       0   14   6   60   38  25  13  0   2  0   158
total           2  102  34  184  117  61  34  4   6  2   546
```

아래와 같이 각각의 `values`에 다양한 `aggfunc`을 지정할 수도 있다.  

```python
import pandas as pd
import numpy as np

pt = pd.pivot_table(
    data=df,
    values=['recroom', 'lotsize'],
    index=['airco', 'driveway'],
    aggfunc={
        'recroom': 'size',
        'lotsize': [min, max, np.mean]
    },
    fill_value=0,
)

print(pt)
```
```markdown
               lotsize                    recroom
                   max         mean   min    size
airco driveway
no    no          7424  3518.967742  1650      62
      yes        16200  5083.099678  1700     311
yes   no          6540  3968.000000  2175      15
      yes        15600  6034.841772  2275     158
```

## 2. pandas.DataFrame.groupby

`groupby`는 `pivot_table`과 비슷한 기능을 하는 DataFrame의 메서드로 그룹화에 강점이 있다. `pandas.DataFrame.groupby`의 주요 인자는 아래와 같다.  

- by: 요약될 칼럼  
- axis: 0 or ‘index’, 1 or ‘columns’  

`recroom`과 `bedrooms` 값의 요약을 아래와 같이 구할 수 있다.  

```python
import pandas as pd

res = df.groupby(by=['recroom', 'bedrooms'], axis=0).size()

print(res)
```
```markdown
recroom  bedrooms
no       1             2
         2           120
         3           243
         4            74
         5             8
         6             2
yes      2            16
         3            58
         4            21
         5             2
dtype: int64
```

---
## Reference
- [pandas.pivot_table](https://pandas.pydata.org/docs/reference/api/pandas.pivot_table.html)
- [pandas.DataFrame.groupby](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.groupby.html)