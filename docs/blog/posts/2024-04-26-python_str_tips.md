---
slug: str-tips
title: Python 문자열 관련 팁 모음
date:
    created: 2024-04-26
description: >
    Python 문자열 관련 팁 모음
categories:
    - Python
tags:
    - python
---

Python 문자열 관련 팁 모음  

<!-- more -->

---

## 일정한 크기로 채우기

- `rjust`, `ljust`: 입력된 문자열을 오른쪽/왼쪽에 추가해 입력된 숫자로 문자열을 늘림

```python
a = "a"
b = "b"

print(a.rjust(3, "0"))
print(b.ljust(3, "0"))
```
```
00a
b00
```

- `zjill`: 숫자 0을 왼쪽부터 채워 전체 길이가 입력된 숫자로 문자열을 늘림

```python
c = "c"

print(c.zfill(3))
```
```
00c
```

!!! info
    세 함수 모두 기존의 문자열이 입력된 숫자보다 클 경우 데이터의 변환이 없다.  
