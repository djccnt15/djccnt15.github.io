---
published: true
layout: post
title: '[Python] 날짜/시간 데이터 다루기'
description: >
    strftime, strptime으로 날짜와 시간 데이터 다루기
categories: [Python]
tags: [datetime]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

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

## strftime, strptime

개발을 하다보면 날짜/시간 데이터를 처리할 일이 많다. 이 때 자주 사용하는 함수로 `strptime`와 `strftime`가 있다.  

날짜 및 시간 데이터 관련 포멧은 [공식 문서](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes)에 정리되어 있는데, 주로 사용하는 포멧은 아래와 같다.  

- `%Y`, `%y`: 연도 4자리/2자리
- `%m`: 앞 자리가 빌 경우 0으로 채우는 월
- `%d`: 앞 자리가 빌 경우 0으로 채우는 일
- `%H`, `%I`: 24시간/12시간 형식의 시간
- `%M`: 앞 자리가 빌 경우 0으로 채우는 분
- `%S`: 앞 자리가 빌 경우 0으로 채우는 초
- `%B`, `%b`: 월 전체/축약 이름
- `%A`, `%a`: 일 전체/축약 이름

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

`strptime`은 parse time의 약자로, 문자열 형식의 날짜와 시간을 datetime 자료형으로 변환한다.  

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

💡`date`, `datetime`, `time` 객체가 모두 갖고 있는 `strftime` 메소드와 달리 `strptime` 메소드는 `datetime` 객체만 갖고 있다.  
{:.note}

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