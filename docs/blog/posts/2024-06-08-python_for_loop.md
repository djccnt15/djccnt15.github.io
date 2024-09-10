---
slug: for-loop
title: Python 반복문 팁 모음
date:
    created: 2024-06-08
description: >
    Python 반복문 관련 팁 모음
categories:
    - Python
tags:
    - python
---

Python 반복문 관련 팁 모음  

<!-- more -->

---

## 다중 반복문 조기 종료

Python의 반복문은 전체 반복이 정상적으로 종료될 경우 `else` 구문을 실행한다. 이를 이용하면 아래와 같이 다중 반복문을 특정 조건에 따라 조기 종료할 수 있다.  

```python
for i in range(10):
    for j in range(2):
        user_input = input("user input: ")
        if user_input == "1":
            break
    else:
        continue
    break
```
