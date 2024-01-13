---
slug: pandas-csv-encoding-error
title: pandas UnicodeDecodeError 해결 방법
date:
    created: 2022-09-07
description: >
    read_csv encoding으로 UnicodeDecodeError 해결하기
categories:
    - Data Analysis
tags:
    - pandas
---

pandas read_csv 함수의 UnicodeDecodeError 해결하기  

<!-- more -->

---

## UnicodeDecodeError

pandas로 csv 파일을 읽으려다보면 아래와 같이 인코딩으로 인한 문제가 발생하는 경우가 있다.  

```
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc3 in position 8: invalid continuation byte
```

## 해결법

해결하려면 인코딩을 `cp949`나 `euc-kr`로 설정하면 된다.  

```python
import pandas as pd

# euc-kr
data = pd.read_csv('data.csv', encoding='euc-kr')

# cp949
data = pd.read_csv('data.csv', encoding='cp949')
```

---
## Reference
- [[Python] pd.read_csv 오류 :: UnicodeDecodeError](https://mizykk.tistory.com/125)