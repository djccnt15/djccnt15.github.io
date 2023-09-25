---
published: true
layout: post
title: '[Python] logging 모듈을 사용하여 로깅하기'
description: >
    TimedRotatingFileHandler를 사용한 Python 로깅
categories: [Python]
tags: [python, logging]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## TimedRotatingFileHandler

Python에서 기본 제공하는 로깅 모듈에는 여러가지 Handler가 있는데, 그 중 [TimedRotatingFileHandler](https://docs.python.org/3/library/logging.handlers.html#timedrotatingfilehandler)를 사용하면 일정한 시간 간격으로 로그가 새로운 파일로 나뉘어서 생성되도록 관리할 수 있다.  

```python
import logging
from logging.handlers import TimedRotatingFileHandler
from pathlib import Path

# set directory
log_dir = Path("logs")
try:
    log_dir.mkdir()
except FileExistsError:
    ...

current_file_name = __file__.split("\\")[-1].split(".")[0]
LOG_FILENAME = log_dir / f"{current_file_name}.log"

# create Logger instance
my_logger = logging.getLogger("test_logger")
my_logger.setLevel(logging.DEBUG)

# set log format
formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - [%(filename)s:%(module)s:%(name)s:%(lineno)d] %(message)s"
)

# create TimedRotatingFileHandler and setting it
file_handler = TimedRotatingFileHandler(
    filename=LOG_FILENAME, when="midnight", interval=1, encoding="utf-8"
)  # rotate every midnight
file_handler.suffix = "%Y%m%d.log"
file_handler.setFormatter(formatter)

# add file handler
my_logger.addHandler(file_handler)

# actual 'application' code
my_logger.debug("debug message")
my_logger.info("info message")
my_logger.warning("warn message")
my_logger.error("error message")
my_logger.critical("critical message")

try:
    raise Exception
except Exception as e:
    my_logger.exception(e)  # log for error catch
```

`logger.py` 모듈을 위와 같은 내용으로 생성하고 실행 시키면 `logs/logger.log` 파일에 아래와 같이 출력된다.  

```
2023-09-20 22:00:14,007 - DEBUG - [logger.py:logger:test_logger:35] debug message
2023-09-20 22:00:14,007 - INFO - [logger.py:logger:test_logger:36] info message
2023-09-20 22:00:14,007 - WARNING - [logger.py:logger:test_logger:37] warn message
2023-09-20 22:00:14,007 - ERROR - [logger.py:logger:test_logger:38] error message
2023-09-20 22:00:14,007 - CRITICAL - [logger.py:logger:test_logger:39] critical message
2023-09-20 22:00:14,007 - ERROR - [logger.py:logger:test_logger:44]
Traceback (most recent call last):
  File "C:\projects\python310\logger.py", line 42, in <module>
    raise Exception
Exception
```

## LogRecord attributes

로그가 출력될 때 실제로는 `LogRecord Objects` 인스턴스가 생성되고, 해당 인스턴스에 각종 정보들이 담긴 후 사용자가 설정한 내용들만 추려서 출력된다.  

`LogRecord Objects` 인스턴스의 요소들은 [공식 문서](https://docs.python.org/3/library/logging.html#logrecord-attributes)에서 확인할 수 있는데, 주로 사용할만한 속성들은 아래와 같다.  

|Attribute name|Format|Description|
|-|-|-|
|asctime|%(asctime)s|로그가 생성된 시간|
|filename|%(filename)s|로그를 발생시킨 파일의 이름|
|levelname|%(levelname)s|로그 레벨 이름|
|lineno|%(lineno)d|소스코드에서 로그를 발생시킨 라인 넘버|
|message|%(message)s|로그 메세지|
|module|%(module)s|로그를 발생시킨 모듈 이름|
|name|%(name)s|로거의 이름|
{:.scroll-table}

---
## Reference
- [logging — Logging facility for Python](https://docs.python.org/3/library/logging.html)
- [logging.handlers — Logging handlers](https://docs.python.org/3/library/logging.handlers.html)
- [LogRecord attributes](https://docs.python.org/3/library/logging.html#logrecord-attributes)