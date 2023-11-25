---
published: true
layout: post
title: '[Python] calculate runtime'
description: >
    Python 코드의 런타임을 계산하는 방법
categories: [Python]
tags: [python, datetime]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. time 사용

Python 내장 모듈 `time`을 활용해서 코드의 전체 또는 일부의 런타임을 잴 수 있다.  

```python
import time
time_start = time.time()

# your code hear

runtime = time.time() - time_start
print(f"run time: {runtime:.3f}")
```

## 2. 💡datetime 사용

Python 내장 모듈 `datetime`을 사용하면 날짜 변경으로 인한 계산 오류 등을 예방할 수 있다. 나는 로그를 남기는 코드에서는 import를 하나 줄일 수 있다는 점 때문에 이 방식을 더 선호한다.  

```python
from datetime import datetime

time_start = datetime.now().replace(microsecond=0)

# your code hear

time_end = datetime.now().replace(microsecond=0)

print(time_end - time_start)
```

## 3. with 사용

아래와 같이 `with` 문법을 통해 특정 구간의 실행 시간을 간편하게 측정할 수 있다. 자세한 내용은 [with 문법 심화 활용 포스팅](/python/python_with/) 참고  

```python
import contextlib
import time
from datetime import datetime


@contextlib.contextmanager
def cal_time(msg):
    t0 = datetime.now()
    yield
    t1 = datetime.now()
    print(f"{msg}: {t1 - t0}")


with cal_time("test"):
    time.sleep(1)
```
```
test: 0:00:01.013775
```

---
## Reference
- [Python Documentation: time — 시간 액세스와 변환](https://docs.python.org/ko/3/library/time.html)([영문](https://docs.python.org/3/library/time.html))
- [Python Documentation: datetime — 기본 날짜와 시간 형](https://docs.python.org/ko/3/library/datetime.html)([영문](https://docs.python.org/3/library/datetime.html))