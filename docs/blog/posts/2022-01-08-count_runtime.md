---
slug: calculate-time
title: 수행 시간 측정 방법
date:
    created: 2022-01-08
description: >
    Python 코드의 수행 시간을 측정하는 방법
categories:
    - Python
tags:
    - python
    - datetime
---

Python 코드의 수행 시간을 측정하는 방법  

<!-- more -->

---

## 1. 기초

아래와 같이 Python 내장 모듈 `time`, `datetime`을 활용해서 코드의 전체 또는 일부의 수행 시간을 잴 수 있다.  

```python
import time
time_start = time.time()

# your code hear

runtime = time.time() - time_start
print(f"run time: {runtime:.3f}")
```

```python
from datetime import datetime

time_start = datetime.now().replace(microsecond=0)

# your code hear

time_end = datetime.now().replace(microsecond=0)

print(time_end - time_start)
```

!!! tip
    `datetime`을 사용하면 날짜 변경으로 인한 계산 오류를 예방할 수 있다.  

## 2. 활용

### 2-1. with 사용

아래와 같이 `with` 문법을 통해 특정 구간의 수행 시간을 간편하게 측정할 수 있다. 자세한 내용은 [with 문법 심화 활용 포스팅](./2023-11-25-understanding_with.md) 참고  

```python title="utils.py"
import contextlib
from datetime import datetime


@contextlib.contextmanager
def cal_time(msg):
    t0 = datetime.now()
    yield
    t1 = datetime.now()
    print(f"{msg}: {t1 - t0}")

```
```python title="utils.py"
import time

from utils import cal_time

with cal_time("test"):
    time.sleep(1)
```
```
test: 0:00:01.013775
```

### 2-2. 💡데코레이터 사용

아래와 같이 데코레이터를 만들어 사용하면 특정 함수의 수행 시간을 간편하게 측정할 수 있다.  

```python title="utils.py"
from collections.abc import Callable
from datetime import datetime
from functools import wraps


def elapse(msg: str = "LOG"):
    def decorator(func: Callable):
        @wraps(func)
        def wrapper(*args, **kwargs):
            t0 = datetime.now()
            result = func(*args, **kwargs)
            t1 = datetime.now()
            print(f"{msg} - elapsed time: {t1 - t0}")
            return result

        return wrapper

    return decorator
```
```python title="main.py"
import time

from utils import elapse


@elapse(msg="main")
def main():
    "main function"
    time.sleep(1)


if __name__ == "__main__":
    main()
    print(main.__doc__)
    print(main.__name__)
```
```
main - elapsed time: 0:00:01.013221
main function
main
```

## 3. timeit 사용

Python의 표준 라이브러리 중 `timeit` 패키지를 사용하면 코드의 수행 시간을 측정할 수 있다. Python에서 자체적인 표준으로 제공한는 기능인 만큼 가장 정확하게 측정할 수 있는 기능을 제공한다.  

`timeit` 라이브러리의 기능 중에는 `timeit.timeit`, `timeit.repeat` 함수를 가장 자주 사용하는데, `timeit.timeit`의 주요 파라미터와 활용 예시는 아래와 같다.  

- `stmt`: 실제로 수행 시간을 측정할 코드
- `setup`: `stmt`를 실행하기 위해 필요한 코드, `setup` 구문의 코드 실행 시간은 측정에서 제외됨
- `number`: `stmt` 수행 횟수, 기본값은 `1,000,000`으로 지정되어 있음

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
