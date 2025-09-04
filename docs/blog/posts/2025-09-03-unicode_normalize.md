---
slug: unicode-normalize
title: 유니코드 문자열 정규화 방법
date:
    created: 2025-09-03
description: >
    Python으로 유니코드 문자열을 정규화하는 방법
categories:
    - Python
tags:
    - python
    - unicode
---

macOS에서 생성한 파일을 윈도우에서 확인하면 파일명이 깨져있는 경우가 있는데, Python으로 간단히 인코딩 할 수 있다.  

<!-- more -->

---

## 현상

아래 문자열을 복사해서 윈도우에서 파일명으로 넣어보면 `ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇㅛ`처럼 초/중/종성이 분해되서 출력된다.  

```
안녕하세요
```

macOS에서는 한글 문자의 정규화 방식으로 NFD를 사용하는데, 윈도우에서는 NFC 방식을 사용하기 때문인데, Python의 `unicodedata` 모듈을 사용해서 문자열을 NFD, NFC 정규화로 쉽게 바꿔줄 수 있다.  

## unicodedata

```python
import unicodedata

text = "안녕하세요"

nfd_text = unicodedata.normalize("NFD", text)
print(f"{nfd_text=}")

nfc_text = unicodedata.normalize("NFC", nfd_text)
print(f"{nfc_text=}")
```
```
nfd_text='안녕하세요'
nfc_text='안녕하세요'
```
