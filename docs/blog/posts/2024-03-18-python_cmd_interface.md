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

프로그램의 품질 향상을 위해 `assert` 구문과 [docstring](2022-01-07-python_function.md/#documentation-strings)을 사용하는데, 해당 코드도 결국 메모리와 CPU 성능을 소모하게 된다.  

아래 옵션을 통해 프로그램 실행 시에 해당 구문을 삭제하고 실행하도록 할 수 있다.  

- `-O`: `assert` 구문 무시
- `-OO`: `assert` 구문 무시 + 코드 인터프리트 시 docstring 삭제

!!! note
    대부분의 경우 docstring이 차지하는 리소스는 극히 미미하기 때문에 `-OO` 옵션은 임베디드 정도의 환경에서나 사용한다고 한다.  

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

---
## Reference
- [Command line and environment](https://docs.python.org/3/using/cmdline.html)