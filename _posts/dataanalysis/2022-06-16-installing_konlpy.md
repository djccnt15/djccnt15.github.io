---
published: true
layout: post
title: '[TextMining] KoNLPy 설치법(윈도우)'
description: >
    python 텍스트마이닝 프레임워크 KoNLPy 윈도우 설치법
categories: [DataAnalysis]
tags: [text mining, konlpy]
image:
    path: /assets/img/posts/installing_konlpy.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. Java 설치

- [여기](https://www.oracle.com/java/technologies/downloads/)에서 OS와 비트 수가 일치하고, 버전이 1.7 이상인 자바(`JDK`) 다운로드 후 설치
- `JDK` 환경 변수 설정
  - 제어판 → 시스템 및 보안 → 시스템 → 고급 시스템 설정 → 고급 → 환경 변수
  - 새로 만들기 클릭 후 변수 이름에 `JAVA_HOME`, 변수 값에 `JDK` 설치 경로 입력 후 확인을 눌러 추가

## 2. Jpype 설치

- [여기](https://www.lfd.uci.edu/~gohlke/pythonlibs/#_jpype)에서 `python` 버전과 윈도우 비트에 맞춰 `Jpype1` 파일을 다운로드
  - 나의 경우 `python 3.9`에 윈도우 `64bit`이기 때문에 `JPype1-1.4.0-cp39-cp39-win_amd64.whl`파일을 다운 받음
  - `python`버전 확인하는 커맨드는 아래와 같음

```powershell
> python -V

> python --version
```

- 명령 프롬프트(cmd)에서 `Jpype1`파일 위치로 이동 후 `Jpype1` 설치

```powershell
> pip install --upgrade pip

> pip install JPype1-1.4.0-cp39-cp39-win_amd64.whl
```

## 3. KoNLPy 설치

준비 단계가 완료되면 아래와 같이 `KoNLPy` 설치 후 cmd 재실행

```powershell
> pip install konlpy
```

---
## Reference
- [KoNLPy: 파이썬 한국어 NLP - 설치하기](https://konlpy.org/ko/latest/install/)
- [딥 러닝을 이용한 자연어 처리 입문 - 3) 자연어 처리를 위한 NLTK와 KoNLPy 설치하기](https://wikidocs.net/22488)