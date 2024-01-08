---
slug: scheduling-python-script
title: 작동 시간 예약하기
date:
    created: 2022-01-08
description: >
    Python 코드 작동 시간 예약하기
categories:
    - Python
tags:
    - python
    - scheduling
---

Python 코드 작동 시간 예약하기  

<!-- more -->

---

## schedule module

Python 프로그램이 특정 시간에 자동으로 작동하게 하고 싶을 경우 schedule 패키지를 활용해서 아래와 같이 코딩하면 된다.  

```python
import time
import schedule

def job(): return print('hi')             # define job which you want to shcedule

schedule.every().day.at("18:00").do(job)  # assign schedule of the job

while True:                               # put the schedule into the infinite loop
    schedule.run_pending()                # Run all jobs that are scheduled to run
    time.sleep(1)                         # sleep process for a while
```

schedule 패키지의 `run_pending` 함수에 대한 설명은 아래와 같다.  

```
Run all jobs that are scheduled to run.

Please note that it is *intended behavior that run_pending()
does not run missed jobs*. For example, if you've registered a job
that should run every minute and you only call run_pending()
in one hour increments then your job won't be run 60 times in
between but only once.
```

경고문이 하나 있는데, `run_pending` 함수가 실행되지 않아 놓친 작업들을 실행하지 않는 것은 의도된 것으로, 예약된 시간에 예약한 `job`이 실행되도록 하려면 해당 시간에 `run_pending`이 실행되도록 설정해야 한다.  

참고로 schedule 패키지의 공식 문서는 해당 패키지는 간단한 스케쥴링 문제해결을 위해 디자인 된 간단한 라이브러리이기 때문에 다음의 경우에는 사용할 수 없다고 명시하고 있다.  

- Job persistence (remember schedule between restarts)
- Exact timing (sub-second precision execution)
- Concurrent execution (multiple threads)
- Localization (time zones, workdays or holidays)

---
## Reference
- [schedule](https://schedule.readthedocs.io/)