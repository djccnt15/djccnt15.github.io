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

---
## Reference
- [printf-style String Formatting](https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting)