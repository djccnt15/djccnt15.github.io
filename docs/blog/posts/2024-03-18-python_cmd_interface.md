---
slug: command-line-interface
title: Python 실행 옵션
date:
    created: 2024-03-18
description: >
    Python 실행 옵션 관련 정리
categories:
    - Python
tags:
    - python
---

Python을 실행할 때, command line 입력을 통해 추가적인 옵션을 입력할 수 있다.  

<!-- more -->

---

## 최적화 실행

프로그램의 품질 향상을 위해 `assert` 구문과 [Docstring](./2022-01-07-python_function.md/#documentation-strings)을 사용하는데, 해당 코드도 결국 메모리와 CPU 성능을 소모하게 된다.  

아래 옵션을 통해 프로그램 실행 시에 해당 구문을 삭제하고 실행하도록 할 수 있다.  

- `-O`: `assert` 구문 무시
- `-OO`: `assert` 구문 무시 + 코드 인터프리트 시 Docstring 삭제

!!! note
    대부분의 경우 Docstring이 차지하는 리소스는 극히 미미하기 때문에 `-OO` 옵션은 임베디드 정도의 환경에서나 사용한다고 한다.  

```python title='main.py'
def main():
    assert isinstance(1, str)  # (1)!
    print(True)


if __name__ == "__main__":
    main()
```

1. `AssertionError`가 반드시 발생한다.

위와 같이 `AssertionError`가 반드시 발생하는 코드를 만들고 `-O` 옵션이 있을 때와 없을 때의 차이를 확인해보면 아래와 같다.  

- `-O` 옵션이 입력되지 않았을 때

```bat
main.py
```
```
Traceback (most recent call last):
  File "C:\projects\python311\main.py", line 6, in <module>
    main()
  File "C:\projects\python311\main.py", line 2, in main
    assert isinstance(1, str)
AssertionError
```

- `-O` 옵션이 입력되었을 때

```bat
python -O main.py
```
```
True
```

## 프로그램 설명 출력

`ArgumentParser`를 통해 시스템 args를 입력 받는 프로그램의 설명을 출력하려면 `-h`, `--help` 옵션을 사용하면 된다.  

```python title='main.py'
from argparse import ArgumentParser, RawTextHelpFormatter


def main(*, arg: str):
    print(arg)


if __name__ == "__main__":
    parser = ArgumentParser(
        formatter_class=RawTextHelpFormatter,
        description="this is description\ninput your description",
        epilog="""
examples:
  this is epilog
  input your epilog
""",
    )
    parser.add_argument(
        "--arg",
        type=str,
        default="test",
        help="argument sample",
    )
    kwargs = vars(parser.parse_args())

    main(**kwargs)
```
```bat
main.py -h
```
```
usage: main.py [-h] [--arg ARG]

this is description
input your description

options:
  -h, --help  show this help message and exit
  --arg ARG   argument sample

examples:
  this is epilog
  input your epilog
```

## 모듈 Docstring 출력

[함수나 클래스의 Docstring](./2022-01-07-python_function.md/#documentation-strings)은 해당 객체의 `__doc__`을 호출하면 된다.  

모듈의 Docstring을 출력하고 싶다면 아래와 같이 [pydoc](https://docs.python.org/3/library/pydoc.html)을 사용하면 된다.  

```python title='main.py'
r"""
this is main module

this is description 1
this is description 2
this is description 3
"""


def main(): ...


if __name__ == "__main__":
    main()
```
```bat
python -m pydoc main
```
```
Help on module main:

NAME
    main - this is main module

DESCRIPTION
    this is description 1
    this is description 2
    this is description 3

FUNCTIONS
    main()

FILE
    c:\projects\python311\main.py
```

!!! note
    아래와 같이 `-n`, `-b` 옵션을 사용하면 서버를 시작하고 웹브라우저를 통해 내용을 확인할 수 있다.  

    ```bat
    python -m pydoc -n <hostname>
    ```

    ```bat
    python -m pydoc -b
    ```

!!! tip
    사실 위 방법은 실행 시간이 조금 오래 걸리기 때문에 아래와 같이 `if __name__ == "__main__":`으로 모듈 직접 실행 시에 설명만 출력되도록 하는 방법도 좋다.  

    ```python
    def func(): ...


    if __name__ == "__main__":
        print("this is module description")
    ```
    ```
    this is module description
    ```

---
## Reference
- [Command line and environment](https://docs.python.org/3/using/cmdline.html)
