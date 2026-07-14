---
slug: python-black-formatter
title: Black Formatter 사용법
date:
    created: 2025-03-07
description: >
    Black Formatter로 Python 코딩 스타일 통일하기
categories:
    - Python
tags:
    - python
    - formatter
    - black formatter
---

Black Formatter를 사용하면 Python 코딩 스타일을 쉽게 관리할 수 있다.  

<!-- more -->

---

## CLI로 사용하기

!!! note
    CLI로 Black Formatter를 사용하려면 먼저 `pip install black` 명령어로 설치해줘야 한다.  

- Black Formatter로 검사하기

```bat
black -check {source_file_or_directory}
```

```bat
python -m black -check {source_file_or_directory}
```

- Black Formatter로 Python 파일 포매팅하기

```bat
black {source_file_or_directory}
```

```bat
python -m black {source_file_or_directory}
```

??? note "Black 실제 활용 예시"
    아래와 같이 코딩 컨벤션이 엉망인 파일이 있다고 하자.

    ```python title="main.py"
    from itertools import repeat
    from itertools import cycle
    class Class:# comment
        def __init__        (self)->None:...
        def foo  (self)   ->  str:    return "foo"
        def bar         (self,x     =   1)->int: return x
    def func(a:int):return  a   **  a
    for _ in repeat(True):print(_)
    my_cycle = [1,2,3,]
    for _ in cycle(my_cycle):print(_)
    ```

    아래와 같이 Black Formatter로 검사를 하면 포메팅이 필요하다고 알려준다.  

    ```bat
    black --check main.py
    ```
    ```
    would reformat main.py

    Oh no! 💥 💔 💥
    1 file would be reformatted.
    ```

    Black Formatter로 포매팅을 실행한 후에 파일을 확인해보면 코딩 컨벤션에 맞게 정돈된 것을 볼 수 있다.  

    ```bat
    black main.py
    ```
    ```
    reformatted main.py

    All done! ✨ 🍰 ✨
    1 file reformatted.
    ```

    ```python title="main.py"
    from itertools import repeat
    from itertools import cycle


    class Class:  # comment
        def __init__(self) -> None: ...
        def foo(self) -> str:
            return "foo"

        def bar(self, x=1) -> int:
            return x


    def func(a: int):
        return a**a


    for _ in repeat(True):
        print(_)
    my_cycle = [
        1,
        2,
        3,
    ]
    for _ in cycle(my_cycle):
        print(_)
    ```

## VS Code 설정

아래와 같이 설정하면 VS Code에 Black Formatter를 설정해서 쉽게 적용해줄 수 있다.  

1. [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter) extension 설치
1. `settings.json`에 아래 내용 추가

```json
"[python]": {  // (1)!
    "editor.defaultFormatter": "ms-python.black-formatter",  // (2)!
    "editor.formatOnSave": true,  // (3)!
    "editor.codeActionsOnSave": {
        "source.organizeImports": "explicit"  // (4)!
    },
},
```

1. Python에만 설정 적용
1. 기본 포매터를 Black Formatter로 설정
1. 저장 시 포매팅 자동 적용
1. 저장 시에 `import` 구문 정리, Black Formatter 기능은 아님

??? info "레거시 Python 환경에서 사용하는 방법"
    Black Formatter는 기본적으로 구동을 위해 VS Code가 사용 중인 Python interpreter를 사용하고, VS Code는 프로젝트에서 사용 중인 가상 환경[^1]을 자동으로 인식해서 해당 interpreter를 사용한다.

    [^1]: `.venv` 등

    문제는 Black Formatter extension은 일정 버전 이상의 Python interpreter를 사용하기 때문에 레거시 코드를 다룰 일이 많은 업무 특성 상 자동 세팅으로는 Black Formatter가 정상 작동하지 않는 경우가 종종 발생한다.  

    이 때는 `settings.json`에 아래와 같이 Black Formatter가 어떤 Python interpreter를 사용할지 직접 설정해주면 정상 작동한다.  

    ```json
    "black-formatter.interpreter": [
        "C:\\programming\\Python\\Python312\\python.exe"
    ],
    ```
