---
published: true
layout: post

title: '[Python] counting runtime'
description: >
  python 코드의 런타임을 확인하는 방법
hide_description: false
image: 
  path: /assets/img/posts/python_datetime.png
related_posts:
  - _posts/python/2022-01-06-about_PEP.md

categories:
  - python
tags:
  - python
  - programming
---
* toc
{:toc}

## 1. time 사용

python 내장 모듈 `time`을 활용해서 코드의 전체 또는 일부의 런타임을 잴 수 있다.  

```python
import time
time_start = time.time()

# your code hear

runtime = time.time() - time_start
print(f"run time: {runtime:.3f}")
```

## 2. 💡 datetime 사용

python 내장 모듈 `datetime`을 사용하면 날짜 변경으로 인한 계산 오류 등을 예방할 수 있다. 나는 로그를 남기는 코드에서는 `import`를 하나 줄일 수 있다는 점 때문에 이 방식을 더 선호한다.  

```python
from datetime import datetime

time_start = datetime.now().replace(microsecond=0)
print(time_start)

# your code hear

time_end = datetime.now().replace(microsecond=0)
print(time_end)

runtime = time_end - time_start
print(runtime)
```

---
## Reference
- [Python Documentation: time — 시간 액세스와 변환](https://docs.python.org/ko/3/library/time.html)([영문](https://docs.python.org/3/library/time.html))
- [Python Documentation: datetime — 기본 날짜와 시간 형](https://docs.python.org/ko/3/library/datetime.html)([영문](https://docs.python.org/3/library/datetime.html))