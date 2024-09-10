---
slug: how-to-start-program
title: 서버에서 프로그램 실행하는 방법
date:
    created: 2024-01-15
description: >
    터미널을 통해 프로그램을 실행하는 방법
categories:
    - Server Engineering
tags:
    - cmd
    - terminal
    - shell
    - batch
---

터미널 또는 shell/batch 프로그램으로 다른 프로그램을 실행할 때 쓰는 명령어 정리  

<!-- more -->

---

## Linux

리눅스에서는 `&`을 붙이면 백그라운드로 실행하라는 뜻인데, 단순히 `&`을 붙여서만 실행하면 터미널을 종료할 경우 같이 실행이 같이 종료된다.  

데몬 형태로 프로그램을 실행시켜 유저의 로그아웃으로인해 세션이 종료 되어도 프로그램이 계속 실행중이도록하는 `nohub` 명령어를 같이 사용해야 한다.  

```bash
nohub <app_name> &
```

!!! tip
    최신 버전의 OS들은 `&`만 사용해도 `nohub` 명령어를 사용한 것과 동일하게 작동하기도 한다.  

## Windows

윈도우에는 `start`와 `call` 두 명령어가 있는데, 다른 batch 프로그램을 실행할 때 작동 방식이 조금 다르다.  

### start

- 새로운 터미널을 실행
- 기존 터미널에서 사용중이던 변수를 사용할 수 없음
- 하나의 batch 프로그램이 다른 여러 개의 프로그램을 실행시킬 수 있음

```bat
start /min <app_name>
```

- `/MIN`: 최소화 실행

!!! note "Python 가상환경 및 프로그램 실행 예시"

    ```bat
    start .venv\Scripts\python.exe main.py

    start /MIN .venv\Scripts\python.exe main.py
    ```

### call

- 현재 터미널에서 실행
- 기존에 사용중인 변수를 그대로 사용할 수 있고, 호출된 batch 프로그램이 호출한 batch 프로그램의 변수를 변경할 수 있음
- 둘 이상의 batch 프로그램을 실행할 경우 순차적으로 실행 됨

```bat
call <app_name>
```

!!! note "Python 가상환경 및 프로그램 실행 예시"

    ```bat
    call .venv\Scripts\python.exe main.py
    ```

    ```bat
    call .venv\Scripts\activate.bat
    labelImg
    ```
