---
slug: handling-datetime
title: 날짜/시간 데이터 다루기
date:
    created: 2022-12-03
description: >
    strftime, strptime으로 날짜와 시간 데이터 다루기
categories:
    - Python
tags:
    - python
    - datetime
---

strftime, strptime으로 날짜와 시간 데이터 다루기  

<!-- more -->

---

## datetime 모듈

Python의 기본 모듈 중에 [datetime 모듈](https://docs.python.org/3/library/datetime.html)은 시간과 날짜 관련 데이터를 쉽게 다룰 수 있도록 해준다.  

```python
from datetime import datetime

now = datetime.now().replace(microsecond=0)
print(now)
```
```
2022-11-13 16:19:35
```

위에서 볼 수 있듯이 `datetime` 객체는 날짜와 시간을 모두 다루는 객체로, 날짜만 다루는 `date` 객체와 시간만 취급하는 `time` 객체도 있다.  

### date, datetime, time 관련 팁

- `date` -> `datetime`

`date` 객체를 `datetime` 객체로 변환하려면, 아래와 같이 `combine` 메서드를 통해 시간 정보를 추가해주면 된다.  

```python
from datetime import datetime, date

d = date(2023, 1, 1)
dt = datetime.combine(d, datetime.min.time())

print(f'{d=}')
print(f'{dt=}')
```
```
d=datetime.date(2023, 1, 1)
dt=datetime.datetime(2023, 1, 1, 0, 0)
```

- `datetime` -> `date`

`datetime` 객체를 `date` 객체로 변환할 때는 `date` 메서드를 사용하면 된다.  

```python
from datetime import datetime

print(datetime.now().date())
```
```
2023-07-11
```

- ISO 형식으로 입출력하기

ISO 형식으로 `datetime` 데이터를 입출력하려면, 아래와 같이 `isoformat`, `fromisoformat` 메서드를 사용하면 된다.  

```python
from datetime import date, datetime

iso_d = date.today().isoformat()
iso_dt = datetime.now().isoformat()

dt = datetime.fromisoformat(iso_dt)

print(f"{iso_d=}")
print(f"{iso_dt=}")
print(f"{dt=}")
```
```
iso_d='2024-01-15'
iso_dt='2024-01-15T01:39:21.732844'
dt=datetime.datetime(2024, 1, 15, 1, 39, 21, 732844)
```

## strftime, strptime

개발을 하다보면 날짜/시간 데이터를 처리할 일이 많다. 이 때 자주 사용하는 메서드로 `strptime`와 `strftime`가 있다.  

날짜 및 시간 데이터 관련 포멧은 [공식 문서](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes)에 정리되어 있는데, 주로 사용하는 포멧은 아래와 같다.  

- `%Y`, `%y`: 연도 4자리/2자리
- `%m`: 앞 자리가 빌 경우 0으로 채우는 월
- `%d`: 앞 자리가 빌 경우 0으로 채우는 일
- `%H`, `%I`: 24시간/12시간 형식의 시간
- `%M`: 앞 자리가 빌 경우 0으로 채우는 분
- `%S`: 앞 자리가 빌 경우 0으로 채우는 초
- `%f`: 앞 자리가 빌 경우 0으로 채우는 microsecond
- `%B`, `%b`: 월 전체/축약 이름
- `%A`, `%a`: 일 전체/축약 이름
- `%z`: UTC와의 시차

### strftime

`strftime`은 formatting time의 약자로, `datetime`, `date`, `time` 객체의 날짜와 시간을 문자열로 변환한다.  

```python
from datetime import datetime

now = datetime.now().replace(microsecond=0)

print(now.strftime('%Y/%m/%d'))
print(now.strftime('%H:%M'))
```
```
2022/11/13
16:19
```

### strptime

`strptime`은 parse time의 약자로, 문자열 형식의 날짜와 시간을 `datetime` 객체로 변환한다.  

```python
from datetime import datetime

date = '2022/11/13 16-19-35'
res = datetime.strptime(date, '%Y/%m/%d %H-%M-%S')

print(res)
print(type(res))
```
```
2022-11-13 16:19:35
<class 'datetime.datetime'>
```

!!! info
    `date`, `datetime`, `time` 객체가 모두 갖고 있는 `strftime` 메서드와 달리 `strptime` 메서드는 `datetime` 객체만 갖고 있다.  

## KST 표시

클라우드 서버를 사용하면 서버 시스템의 위치로 인해 시간이 다르게 나올 수 있는데, 서버 시스템의 시간과 상관없이 한국 시간을 표시하고 싶다면 아래와 같이 `timezone`, `timedelta` 모듈과 조합하여 사용하면 된다.  

```python
from datetime import datetime, timezone, timedelta

kst = datetime.now(timezone(timedelta(hours=9)))

print(f'{kst=}')
print(kst.strftime('%Y-%m-%d %H:%M:%S'))
```
```
kst=datetime.datetime(2022, 12, 4, 23, 46, 57, 684064, tzinfo=datetime.timezone(datetime.timedelta(seconds=32400)))
2022-12-04 23:46:57
```

```python
utc = datetime.utcnow()

print(f'{utc=}')
print(utc.strftime('%Y-%m-%d %H:%M:%S'))
```
```
utc=datetime.datetime(2022, 12, 4, 14, 48, 41, 650933)
2022-12-04 14:48:41
```

---
## Reference
- [datetime — Basic date and time types](https://docs.python.org/3/library/datetime.html)
- [strftime() and strptime() Behavior](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior)
- [strftime() and strptime() Format Codes](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes)
