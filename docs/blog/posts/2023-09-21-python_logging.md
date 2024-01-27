---
slug: how-to-log-python
title: logging 모듈을 사용하여 로깅하기
date:
    created: 2023-09-21
    updated: 2024-01-25
description: >
    Python 로깅에 대한 정리
categories:
    - Python
tags:
    - python
    - logging
---

Python 로깅에 대한 정리  

<!-- more -->

---

## Python logging

### Handler

Python에서 기본 제공하는 로깅 모듈을 사용하면 시스템 로그를 아주 간편하게 남길 수 있는데, Handler를 사용하여 로깅을 위한 여러가지 설정을 쉽게 관리할 수 있다.  

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
    fmt="%(asctime)s - %(levelname)s - [%(module)s:%(lineno)d] %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S%z",
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

위 `main.py` 파일을 실행 시키면 아래와 같이 로그가 출력된다.  

```log
2024-01-25T01:02:58+0900 - DEBUG - [main:46] debug message
2024-01-25T01:02:58+0900 - INFO - [main:47] info message
2024-01-25T01:02:58+0900 - WARNING - [main:48] warn message
2024-01-25T01:02:58+0900 - ERROR - [main:49] error message
2024-01-25T01:02:58+0900 - CRITICAL - [main:50] critical message
2024-01-25T01:02:58+0900 - ERROR - [main:55] 
Traceback (most recent call last):
  File "C:\projects\python311\main.py", line 53, in <module>
    raise Exception
Exception
```

#### TimedRotatingFileHandler

Python이 기본 제공하는 다양한 Log Handler 중에 [TimedRotatingFileHandler](https://docs.python.org/3/library/logging.handlers.html#timedrotatingfilehandler)를 사용하면 일정한 시간 간격으로 로그가 새로운 파일로 나뉘어서 생성되도록 관리할 수 있다.  

`TimedRotatingFileHandler` Handler의 경우 아래 두 설정이 중요하다.  

- `when`: time rotate의 기준 시점
- `backupCount`: 로그를 남길 파일 개수, 로그 파일이 해당 설정의 수보다 많을 경우 자동 삭제

| `when` 값 |            interval 유형             |       `atTime` 입력 시       |
| :-------: | :----------------------------------: | :--------------------------: |
|     S     |                  초                  |          영향 없음           |
|     M     |                  분                  |          영향 없음           |
|     H     |                 시간                 |          영향 없음           |
|     D     |                  일                  |          영향 없음           |
|  W0 - W6  |           요일 (0=월요일)            | 최초 롤오버 시간 계산에 사용 |
| midnight  | `atTime` 미입력 시 자정에 롤오버[^1] | 최초 롤오버 시간 계산에 사용 |

[^1]: `atTime` 입력 시 해당 시간에 롤오버

!!! tip
    `file_handler.suffix = "%Y%m%d.log"`와 같이 `suffix` 속성을 설정할 경우 롤오버 시 생성되는 파일의 파일명 규칙을 수정할 수 있지만, 이 경우 `backupCount` 속성이 제대로 작동하지 않게 된다.  

### LogRecord

로그가 출력될 때 실제로는 `LogRecord` 클래스의 인스턴스가 생성되고, 해당 인스턴스에 각종 정보들이 담긴 후 사용자가 설정한 내용들만 추려서 출력된다.  

`LogRecord` 클래스의 요소들은 [공식 문서](https://docs.python.org/3/library/logging.html#logrecord-attributes)에서 확인할 수 있는데, 주로 사용할만한 속성들은 아래와 같다.  

| Attribute name |    Format     |              Description               |
| :------------: | :-----------: | :------------------------------------: |
|    asctime     |  %(asctime)s  |           로그가 생성된 시간           |
|    filename    | %(filename)s  |      로그를 발생시킨 파일의 이름       |
|   levelname    | %(levelname)s |             로그 레벨 이름             |
|     lineno     |  %(lineno)d   | 소스코드에서 로그를 발생시킨 라인 넘버 |
|    message     |  %(message)s  |              로그 메세지               |
|     module     |  %(module)s   |       로그를 발생시킨 모듈 이름        |
|      name      |   %(name)s    |              로거의 이름               |
|    process     |  %(process)d  |      프로세스 ID(가능할 경우에만)      |
|     thread     |  %(thread)d   |       쓰레드 ID(가능할 경우에만)       |

### Filter

필터는 로그 레벨에 따라 로그의 출력을 걸러주기 위해 사용하는 객체로, `LogRecord` 인스턴스를 필터링하는 규칙을 직접 만들 수 있다.  

??? note
    참고로 Python 공식문서 [Logging facility for Python](https://docs.python.org/3/library/logging.html#filter-objects)에서는 필터는 굳이 표준 라이브러리의 클래스를 상속해서 만들 필요 없이, 단순히 `filter` 메서드를 가진 객체는 아무 것이나 사용해도 된다고 한다.  

    > You don’t actually need to subclass `Filter`: you can pass any instance which has a `filter` method with the same semantics.

    실제로 `logging.Handler` 클래스가 상속하고 있는 `logging.Filterer` 클래스를 살펴보면 아래와 같이 `addFilter` 메서드는 `filters` 리스트에 필터 객체를 추가해주기만 하며, `filter` 메서드는 `filters` 리스트에 속한 필터들의 `filter` 메서드를 호출하는 역할만 한다.  


    === "Python 3.11"
    
        ```python hl_lines="35-36"
        class Filterer(object):
            """
            A base class for loggers and handlers which allows them to share
            common code.
            """
            def __init__(self):
                """
                Initialize the list of filters to be an empty list.
                """
                self.filters = []

            def addFilter(self, filter):
                """
                Add the specified filter to this handler.
                """
                if not (filter in self.filters):
                    self.filters.append(filter)

            ...

            def filter(self, record):
                """
                Determine if a record is loggable by consulting all the filters.

                The default is to allow the record to be logged; any filter can veto
                this and the record is then dropped. Returns a zero value if a record
                is to be dropped, else non-zero.

                .. versionchanged:: 3.2

                Allow filters to be just callables.
                """
                rv = True
                for f in self.filters:
                    if hasattr(f, 'filter'):
                        result = f.filter(record)
                    else:
                        result = f(record) # assume callable - will raise if not
                    if not result:
                        rv = False
                        break
                return rv
        ```

`logging` 모듈의 기본 필터는 로그 레벨로 필터링하고, 그 중에서도 **지정된 레벨보다 상위 레벨 전체의 로그**를 필터링한다.  

로그 필터를 직접 만들어 주입해주면 아래와 같이 **특정 레벨의 로그**만 필터링 해줄 수 있다.  

```python
import logging
from logging import StreamHandler


class MyFilter(logging.Filter):  # (1)!
    def __init__(self, level):
        self.__level = level

    def filter(self, logRecord):
        return logRecord.levelno == self.__level  # (2)!


# create Logger instance
logger = logging.getLogger("logger")
logger.setLevel(logging.DEBUG)

# set log format
formatter = logging.Formatter(
    fmt="%(asctime)s - %(levelname)s - [%(module)s:%(lineno)d] %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S%z",
)

# StreamHandler
stream_handler = StreamHandler()
stream_handler.setFormatter(formatter)
stream_handler.addFilter(MyFilter(logging.DEBUG))
logger.addHandler(stream_handler)

if __name__ == "__main__":
    logger.debug("debug message")
    logger.info("info message")
    logger.warning("warn message")
    logger.error("error message")
    logger.critical("critical message")
```
{ .annotation }

1. note에 작성했듯이 `class MyFilter(object)`로 만들어도 전혀 문제 없다.
1. 특정 레벨보다 하위의 레벨을 출력하는 방식의 필터를 만들고 싶다면, `logRecord.levelno <= self.__level`으로 만들어주면 된다.

```
2024-01-25T01:06:19+0900 - DEBUG - [note:30] debug message
```

---
## Reference
- [logging — Logging facility for Python](https://docs.python.org/3/library/logging.html)
- [logging.handlers — Logging handlers](https://docs.python.org/3/library/logging.handlers.html)
- [LogRecord Objects](https://docs.python.org/3/library/logging.html#logrecord-objects)
- [LogRecord attributes](https://docs.python.org/3/library/logging.html#logrecord-attributes)