---
slug: install-python-cli
title: Python CLI 설치 방법
date:
    created: 2025-10-30
description: >
    Python을 CLI를 통해 설치하는 방법
categories:
    - Python
tags:
    - python
---

다운로드 받은 Python은 UI를 사용하지 않고도 설치가 가능하다.  

<!-- more -->

---

## 옵션 설정 방법

UI로 설치할 때 입력 가능한 각종 옵션들은 모두 설정 가능한데, 주요 옵션은 아래와 같다.  

- `InstallAllUsers`: 전체 유저 대상 설치
- `TargetDir`: 설치 위치
- `PrependPath`: Path 목록의 가장 앞에 Python 경로 추가
- `AppendPath`: Path 목록의 가장 뒤에 Python 경로 추가

## 명령어 예시

```bat
python-3.13.2-amd64.exe /quiet PrependPath=1 InstallAllUsers=1 TargetDir={TARGET_DIR}
```

---
## Reference
- [Python Documentation: Installing Without UI](https://docs.python.org/3/using/windows.html?utm_source=chatgpt.com#installing-without-ui)
