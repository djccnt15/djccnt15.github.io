---
slug: not-a-number
title: Python의 NaN
date:
    created: 2024-10-14
description: >
    Python의 NaN 다루기
categories:
    - Python
tags:
    - python
    - pandas
---

Python의 NaN 다루기  

<!-- more -->

---

## NaN

`NaN`은 **Not-A-Number**의 약자로, 숫자가 아닌 값들을 나타낸다.  

pandas로 데이터를 처리하다보면 은근히 `NaN`을 다룰 일이 많은데, 몇몇 라이브러리들이 제공하는 `NaN` 여부 검사용 함수들은 입력값이 `str`일 경우 에러를 발생시키기 때문에 Boolean 값을 반환하는 함수를 만들어보았다.  

```python
def is_nan(x):
    return (x != x)
```

!!! note
    pandas는 테이블 데이터를 읽을 때 빈 셀을 `np.nan`으로 처리하는데, 칼럼 타입은 문자열일 경우[^1]에 정상적으로 데이터를 처리하기 위해 `math.isnan()`, `np.isnan()`으로 `NaN` 여부를 검사하면 정상 데이터가 있을 때 에러가 발생한다.  

    [^1]: 해당 셀에 입력되어야 하는 데이터 타입은 문자열일 경우  

    ```python
    import math

    print(math.isnan("a"))
    ```
    ```
    Traceback (most recent call last):
    File "C:\projects\python311\main.py", line 3, in <module>
        print(math.isnan("a"))
            ^^^^^^^^^^^^^^^
    TypeError: must be real number, not str
    ```

```python
import math


def is_nan(x):
    return x != x


data = ["a", 1, 1.0, math.inf, math.nan, float("nan")]
for d in data:
    print(repr(d), is_nan(d))
```
```
'a' False
1 False
1.0 False
inf False
nan True
nan True
```

!!! tip
    아래와 같이 `pandas.isna()` 함수를 통해 동일한 작업을 처리할 수도 있다.  

    ```python
    import math

    import pandas as pd

    data = ["a", 1, 1.0, math.inf, math.nan, float("nan")]
    for d in data:
        print(repr(d), pd.isna(d))
    ```
    ```
    'a' False
    1 False
    1.0 False
    inf False
    nan True
    nan True
    ```

---
## Reference
- [how-to-check-for-nan-values](https://stackoverflow.com/questions/944700/how-to-check-for-nan-values)
