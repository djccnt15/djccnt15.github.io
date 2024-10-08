---
slug: how-to-install-konlpy
title: KoNLPy 설치법(Windows)
date:
    created: 2022-06-16
description: >
    Python 텍스트마이닝 라이브러리 KoNLPy Windows 설치법
categories:
    - Data Analysis
tags:
    - text mining
    - konlpy
---

Python 텍스트마이닝 라이브러리 KoNLPy Windows 설치법  

<!-- more -->

---

## 1. Java 설치

- [여기](https://jdk.java.net/21/)에서 OS와 비트 수가 일치하고, 버전이 1.7 이상인 자바(`JDK`) 다운로드 후 설치
- `JDK` 환경 변수 설정
    - 제어판 → 시스템 및 보안 → 시스템 → 고급 시스템 설정 → 고급 → 환경 변수
    - 새로 만들기 클릭 후 변수 이름에 `JAVA_HOME`, 변수 값에 `JDK` 설치 경로 입력 후 확인을 눌러 추가
    - 새로 만들기 클릭 후 변수 이름에 `CLASSPATH`, 변수 값에 `%JAVA_HOME%\lib` 설치 경로 입력 후 확인을 눌러 추가

## 2. Jpype 설치

- [여기](https://www.lfd.uci.edu/~gohlke/pythonlibs/#jpype)에서 Python 버전과 Windows 비트에 맞춰 `Jpype1` 파일을 다운로드
    - `Python 3.9`에 Windows `64bit`인 경우 `JPype1-1.4.0-cp39-cp39-win_amd64.whl` 파일을 다운 받음

- 터미널에서 `Jpype1` 설치

```bat
pip install JPype1-1.4.0-cp39-cp39-win_amd64.whl
```

## 3. KoNLPy 설치

준비 단계가 완료되면 아래와 같이 `KoNLPy` 설치 후 cmd 재실행

```bat
pip install konlpy
```

---
## Reference
- [KoNLPy: 파이썬 한국어 NLP - 설치하기](https://konlpy.org/ko/latest/install/)
- [딥 러닝을 이용한 자연어 처리 입문 - 3) 자연어 처리를 위한 NLTK와 KoNLPy 설치하기](https://wikidocs.net/22488)
