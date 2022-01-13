---
title: "런타임 확인"
excerpt: "코드의 런타임을 확인하는 방법"
published: true

toc: true
toc_sticky: true

categories:
  - python
tags:
  - python
  - time
---
# {{ page.excerpt }}
---
python 내장 모듈 `time`을 활용해서 코드의 전체 또는 일부의 런타임을 잴 수 있다.  

```python
import time
time_start = time.time()

# your code hear

print("run time: %s" %(time.time() - time_start)) # % 연산자 사용 시
# or
print(f"run time: {(time.time() - time_start):.3f}")  # python 3.6 부터 추가된 f-string 사용 시
```