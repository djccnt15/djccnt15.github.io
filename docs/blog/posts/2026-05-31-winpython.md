---
slug: winpython
title: WinPython으로 Portable Python 사용하기
date:
    created: 2026-05-31
description: >
    Python 배포를 쉽게 하기 위해 WinPython으로 Portable Python을 구성하는 방법
categories:
    - Python
tags:
    - python
    - winpython
---

업무 특성상 폐쇄망의 Windows 환경에 소규모 Python 프로그램들을 배포할 경우가 많은데, 매번 Python 환경을 구성하고 패키지들을 설치하기 어려운 상황이라 Portable Python을 사용해서 배포하고 있다.  

<!-- more -->

---

## WinPython

### 배포 타입

WinPython은 기본적으로 `dot` / `slim` / `whl` 세 가지 버전으로 제공된다.  

- `dot`: 기본 Python 및 표준 라이브러리만 제공되는 최소 버전
- `slim`: 데이터 분석이나 GUI 개발을 할 때 많이 쓰이는 사실상 필수 패키지들이 같이 제공되는 버전
- `whl`: `slim` 버전에 패키지 설치를 위한 `wheels` 까지 추가로 제공되는 버전

!!! note
    별도로 개발한 Python 프로젝트의 배포용으로만 사용할 경우 `dot` 버전이 불필요한 내용이 적어 가장 유리하고, 폐쇄망에서의 분석 및 개발 공부 등의 용도로 사용할 경우 `slim`, `whl` 버전이 유리하다.  

### 프로젝트 배포하기

1. 아래와 같이 프로젝트 폴더를 구성한다.

```
project-root/       # [Root] 이 폴더 전체를 `.zip`으로 압축해 배포
├── winpython/      # 다운로드한 WinPython Dot 버전 폴더
│   └── python/     # 실제 파이썬 인터프리터 코어와 site-packages가 위치한 곳
├── app/            # 애플리케이션 소스코드 폴더
│   └── main.py     # 애플리케이션 진입점 스크립트
├── main.bat        # [핵심] 사용자가 더블클릭하여 앱을 가동하는 배치 파일
└── README.txt      # 사용자를 위한 간단한 안내문 (압축 해제 방법 등)
```

2. 다운받은 WinPython 폴더에 포함된 `WinPython Command Prompt.exe`를 실행하여 python 환경 관리 cmd를 실행하고, `pip install`을 통해 필요한 패키지들을 설치한다.
3. `main.bat` 파일에 WinPython의 `python.exe`를 사용해서 `main.py`를 실행하도록 코드를 작성한다.

??? note "main.bat 예시"

    ```bat
    @echo off

    title FastAPI Portable Server Runner

    echo ===================================================
    echo  WinPython 기반 FastAPI 독립형 서버를 시작합니다.
    echo ===================================================
    echo.

    :: 1. 현재 배치 파일이 가동된 절대 경로를 기준점으로 잡습니다.
    set BASE_DIR=%~dp0

    :: 2. 임베디드 파이썬 및 유비콘 실행 파일 경로 정의
    :: [주의] 본인이 다운로드한 실제 파이썬 버전 폴더명(예: python-3.10.11.amd64)으로 수정하세요.
    set PYTHON_EXE=%BASE_DIR%winpython\path\to\winpython\python\python.exe

    echo [시스템 정보] 기준 경로: %BASE_DIR%
    echo [서버 정보] 포트: 8000번 가동 준비 중...
    echo.
    echo 브라우저를 열고 http://127.0.0.1:8000/docs 에 접속하세요.
    echo 서버를 종료하려면 이 창을 닫거나 Ctrl + C를 누르십시오.
    echo ---------------------------------------------------
    echo.

    :: 3. 독립 파이썬 모듈로서 uvicorn을 호출해 app 폴더 안의 FastAPI 실행
    "%PYTHON_EXE%" app\main.py
    ```

!!! warning
    기존에 작성한 Python 프로젝트를 WinPython과 묶어서 배포하는 과정에서 static 파일 등에 대한 각종 경로가 꼬일 수 있다. 경로들을 WinPython 통합 프로젝트에 맞춰서 다시 작성하거나 상대경로를 사용해서 앱이 필요한 파일 및 경로를 유동적으로 찾을 수 있도록 해야한다.  

---
## Reference
- [WinPython](https://winpython.github.io/)
- [winpython](https://github.com/winpython/winpython)
