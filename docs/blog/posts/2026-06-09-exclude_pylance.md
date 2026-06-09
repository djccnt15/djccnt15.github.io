---
slug: exclude-pylance
title: Pylance 검사 제외 방법
date:
    created: 2026-06-09
description: >
    VS code Pylance 검사에서 제외하는 방법
categories:
    - Python
tags:
    - python
    - pylance
    - vscode
    - winpython
---

윈도우 서버에 Python 프로그램을 배포하는 용도로 [WinPython](./2026-05-31-winpython.md)을 사용중인데, WinPython이 포함된 프로젝트를 구성하면 VS Code에 설치된 Pylance 검사기가 WinPython의 코드 수만줄을 전부 검사하려고 하는 사소한 문제가 있다.  

<!-- more -->

---

## VS Code

VS Code 설정에서 아래와 같이 exclude 설정을 해주면 Pylance 검사기의 검사에서 해당 폴더들을 제외해줄 수 있다. 내 경우에는 사용중인 WinPython이 `WPy64-****` 경로에 저장되기 때문에 아래와 같이 제외 설정을 해줬다.  


```json title=".vscode/settings.json"
{
  "python.analysis.exclude": [
    "**/.*",            // 모든 숨김 폴더 및 파일 제외
    "**/.venv",         // 프로젝트 루트 및 하위의 모든 .venv 폴더 제외 (**/ 추가)
    "**/node_modules",  // 노드 모듈 폴더 제외
    "**/__pycache__",   // 파이썬 캐시 폴더 제외
    "**/WPy64*"         // WPy64로 시작하는 모든 폴더 제외
  ]
}
```
