---
slug: calculate-time
title: calculate time
date:
    created: 2022-01-08
description: >
    Python 코드의 실행시간을 측정하는 방법
categories:
    - Python
tags:
    - python
    - datetime
---

Python 코드의 실행시간을 측정하는 방법  

<!-- more -->

---

## 1. time 사용

Python 내장 모듈 `time`을 활용해서 코드의 전체 또는 일부의 런타임을 잴 수 있다.  

```python
import time
time_start = time.time()

# your code hear

runtime = time.time() - time_start
print(f"run time: {runtime:.3f}")
```

## 2. datetime 사용

Python 내장 모듈 `datetime`을 사용하면 날짜 변경으로 인한 계산 오류 등을 예방할 수 있다. 나는 로그를 남기는 코드에서는 import를 하나 줄일 수 있다는 점 때문에 이 방식을 더 선호한다.  

```python
from datetime import datetime

time_start = datetime.now().replace(microsecond=0)

# your code hear

time_end = datetime.now().replace(microsecond=0)

print(time_end - time_start)
```

## 3. 💡with 사용

아래와 같이 `with` 문법을 통해 특정 구간의 실행 시간을 간편하게 측정할 수 있다. 자세한 내용은 [with 문법 심화 활용 포스팅](2023-11-25-understanding_with.md) 참고  

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

## 4. timeit 사용

Python의 표준 라이브러리 중 `timeit` 패키지를 사용하면 코드의 실행 시간을 측정할 수 있다.  

```python
import timeit

SETUP_CODE = """
import statistics

import numpy as np

DATA_LIST = [i for i in range(int(1e3))]
DATA_ARRAY = np.array(DATA_LIST)
"""

STD_MEAN_WITH_LIST = """statistics.mean(DATA_LIST)"""
STD_MEAN_WITH_ARRAY = """statistics.mean(DATA_ARRAY)"""
NP_MEAN_WITH_LIST = """np.mean(DATA_LIST)"""
NP_MEAN_WITH_ARRAY = """np.mean(DATA_ARRAY)"""


def main():
    print(timeit.timeit(stmt=STD_MEAN_WITH_LIST, setup=SETUP_CODE))
    print(timeit.timeit(stmt=STD_MEAN_WITH_ARRAY, setup=SETUP_CODE))
    print(timeit.timeit(stmt=NP_MEAN_WITH_LIST, setup=SETUP_CODE))
    print(timeit.timeit(stmt=NP_MEAN_WITH_ARRAY, setup=SETUP_CODE))


if __name__ == "__main__":
    main()
```
```
142.78164129995275
586.6689014999429
35.12082770001143
3.3709149999776855
```

---
## Reference
- [time — Time access and conversions](https://docs.python.org/3/library/time.html)
- [datetime — Basic date and time types](https://docs.python.org/3/library/datetime.html)
- [timeit — Measure execution time of small code snippets](https://docs.python.org/3/library/timeit.html)