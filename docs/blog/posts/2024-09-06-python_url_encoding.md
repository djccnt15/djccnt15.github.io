---
slug: url-encoding
title: 특수문자 인코딩하기
date:
    created: 2024-09-06
description: >
    Python으로 특수문자 인코딩하는 방법
categories:
    - Python
tags:
    - python
---

Python으로 특수문자 인코딩하는 방법  

<!-- more -->

---

## URL 인코딩

간혹 문자열에 포함된 특수문자를 인코딩하거나, 인코딩 된 특수문자를 디코딩해야하는 경우가 있다. 이 때는 아래와 같이 Python의 표준 라이브러리 중 `urllib`을 사용하면 쉽게 처리할 수 있다.  

```python
from urllib import parse

text = "https://www.google.com/"

encoding = parse.quote(text)
print(encoding)

decoding = parse.unquote(enc)
print(decoding)
```
```
https%3A//www.google.com/
https://www.google.com/
```
