---
slug: formatting-tips
title: Python 포메팅 활용 팁
date:
    created: 2024-02-04
description: >
    Python 포메팅 관련 활용 팁 정리  
categories:
    - Python
tags:
    - python
    - formatting
---

Python 포메팅 관련 활용 팁 정리  

<!-- more -->

---

## f-string, c-style

Python에서 문자열 데이터를 유동적으로 변환하는 방법은 크게 `f-string`, `format()`, `c-style` 세 가지 방법이 있다.  

이를 조합하면 아래와 같이 문자열에 formatting될 데이터의 위치를 상황에 따라 자유롭게 지정할 수 있다.  

```python
name_tb = "table_name"

query = f"""\
INSERT INTO {name_tb}
VALUES (%s, %s, %d, %d);\
"""

print(query % (1, 2, 3, 4))
```
```
INSERT INTO table_name
VALUES (1, 2, 3, 4);
```

## 변수의 이름과 값을 한번에 출력하기

개발을 하다보면 변수의 이름과 값을 동시에 출력할 때가 종종 있다.  

Python에서는 아래와 같은 방법으로 쉽게 변수의 이름과 값을 동시에 출력할 수 있다.  

```python
a = 1

print(f'{a=}')
```
```
a=1
```

## 자릿수 및 소수점 표시

아래와 같이 자릿수와 소수점을 표시하여 출력할 수 있다.  

```python
a = 1000.123

print(f"{a:,.2f}")
print(f"{a:_.2f}")
```
```
1,000.12
1_000.12
```

아래와 같이 float을 %로 간편하게 변경해 출력할 수 있다.  

```python
a = 0.12345

print(f"{a:.2%}")
```
```
12.35%
```

## Datetime 포메팅

아래와 같이 datetime 정보를 포메팅하여 출력할 수 있다.  

```python
from datetime import datetime, timedelta, timezone

KST = timezone(offset=timedelta(hours=9), name="KST")
now = datetime.now(KST)

print(f"{now:%Y-%m-%dT%H:%M:%S%z}")
```
```
2024-02-28T00:26:36+0900
```

## 공백/특수문자 삽입

아래와 같이 왼쪽/오른쪽/가운데 정렬을 하고 빈 공간을 특수문자로 채울 수 있다.  

```python
var = "return"

print(f"{var:<10}: std out")
print(f"{var:_<10}: std out")
print(f"{var:#^10}: std out")
print(f"{var:*>10}: std out")
```
```
return    : std out
return____: std out
##return##: std out
****return: std out
```

---
## Reference
- [printf-style String Formatting](https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting)
