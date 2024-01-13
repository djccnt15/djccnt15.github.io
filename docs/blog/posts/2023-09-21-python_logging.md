---
slug: how-to-log-python
title: logging 모듈을 사용하여 로깅하기
date:
    created: 2023-09-21
description: >
    TimedRotatingFileHandler를 사용한 Python 로깅
categories:
    - Python
tags:
    - python
    - logging
---

TimedRotatingFileHandler를 사용한 Python 로깅  

<!-- more -->

---

## Python logging

Python에서 기본 제공하는 로깅 모듈을 사용하면 시스템 로그를 아주 간편하게 남길 수 있는데, Handler를 사용하여 로그의 상세 내용을 설정할 수 있다.  

`TimedRotatingFileHandler`와 `StreamHandler`를 동시에 사용하는 `logger` 모듈의 예시는 아래와 같다.  

```python
import logging
from logging import StreamHandler
from logging.handlers import TimedRotatingFileHandler
from pathlib import Path

# set log directory
log_dir = Path("logs")
try:
    log_dir.mkdir()
except FileExistsError:
    ...

# create Logger instance
logger = logging.getLogger("logger")
logger.setLevel(logging.DEBUG)

# set log format
formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - [%(filename)s:%(module)s:%(name)s:%(lineno)d] %(message)s"
)

# TimedRotatingFileHandler
file_handler = TimedRotatingFileHandler(
    filename=log_dir / "log.log",
    when="midnight",  # rotate every midnight
    backupCount=3,  # define number of log files, 0 to save all log files
    encoding="utf-8",
)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# StreamHandler
stream_handler = StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)
```

위와 같은 내용으로 생성한 `logger`를 사용하는 `main`의 예시는 아래와 같다.  

```python
from logger import logger

# actual 'application' code
logger.debug("debug message")
logger.info("info message")
logger.warning("warn message")
logger.error("error message")
logger.critical("critical message")

try:
    raise Exception
except Exception as e:
    logger.exception(e)  # log for error catch
```

위 `main.py` 파일을 실행 시키면 `logs/log.log` 파일과 터미널에 아래와 같이 출력된다.  

```log
2023-12-08 00:13:52,970 - DEBUG - [main.py:main:logger:4] debug message
2023-12-08 00:13:52,970 - INFO - [main.py:main:logger:5] info message
2023-12-08 00:13:52,970 - WARNING - [main.py:main:logger:6] warn message
2023-12-08 00:13:52,970 - ERROR - [main.py:main:logger:7] error message
2023-12-08 00:13:52,970 - CRITICAL - [main.py:main:logger:8] critical message
2023-12-08 00:13:52,970 - ERROR - [main.py:main:logger:13] 
Traceback (most recent call last):
  File "C:\projects\python310\main.py", line 11, in <module>
    raise Exception
Exception
```

## TimedRotatingFileHandler

Python이 기본 제공하는 다양한 Log Handler 중에 [TimedRotatingFileHandler](https://docs.python.org/3/library/logging.handlers.html#timedrotatingfilehandler)를 사용하면 일정한 시간 간격으로 로그가 새로운 파일로 나뉘어서 생성되도록 관리할 수 있다.  

`TimedRotatingFileHandler` Handler의 경우 아래 두 설정이 중요하다.  

- `when`: time rotate의 기준 시점
- `backupCount`: 로그를 남길 파일 개수, 로그 파일이 해당 설정의 수보다 많을 경우 자동 삭제

!!! tip
    `file_handler.suffix = "%Y%m%d.log"`와 같이 `suffix` 속성을 설정할 경우 롤오버 시 생성되는 파일의 파일명 규칙을 수정할 수 있지만, 이 경우 `backupCount` 속성이 제대로 작동하지 않게 된다.  

|`when` 값|interval 유형|`atTime` 사용 시|
|:-:|:-:|:-:|
|S|초|영향 없음|
|M|분|영향 없음|
|H|시간|영향 없음|
|D|일|영향 없음|
|W0 - W6|요일 (0=월요일)|최초 롤오버 시간 계산에 사용|
|midnight|`atTime` 미지정 시 자정, 지정 시 `atTime`에 롤오버|최초 롤오버 시간 계산에 사용|

## LogRecord

로그가 출력될 때 실제로는 `LogRecord` 클래스의 인스턴스가 생성되고, 해당 인스턴스에 각종 정보들이 담긴 후 사용자가 설정한 내용들만 추려서 출력된다.  

`LogRecord` 클래스의 요소들은 [공식 문서](https://docs.python.org/3/library/logging.html#logrecord-attributes)에서 확인할 수 있는데, 주로 사용할만한 속성들은 아래와 같다.  

|Attribute name|Format|Description|
|:-:|:-:|:-:|
|asctime|%(asctime)s|로그가 생성된 시간|
|filename|%(filename)s|로그를 발생시킨 파일의 이름|
|levelname|%(levelname)s|로그 레벨 이름|
|lineno|%(lineno)d|소스코드에서 로그를 발생시킨 라인 넘버|
|message|%(message)s|로그 메세지|
|module|%(module)s|로그를 발생시킨 모듈 이름|
|name|%(name)s|로거의 이름|

---
## Reference
- [logging — Logging facility for Python](https://docs.python.org/3/library/logging.html)
- [logging.handlers — Logging handlers](https://docs.python.org/3/library/logging.handlers.html)
- [LogRecord Objects](https://docs.python.org/3/library/logging.html#logrecord-objects)
- [LogRecord attributes](https://docs.python.org/3/library/logging.html#logrecord-attributes)