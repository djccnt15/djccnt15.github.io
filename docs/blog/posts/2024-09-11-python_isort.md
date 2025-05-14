---
slug: isort
title: isort 사용법
date:
    created: 2024-09-11
description: >
    isort를 사용해 import를 정렬하는 방법
categories:
    - Python
tags:
    - isort
---

isort를 사용해 import를 정렬하는 방법  

<!-- more -->

---

## VS Code 플러그인 활용

[설치](https://marketplace.visualstudio.com/items?itemName=ms-python.isort) 후 단축키 ++alt+shift+o++ 사용  

## 독립된 프로그램으로 활용

pip를 통해서 설치 후 [공식 문서](https://pycqa.github.io/isort/#using-isort) 가이드 참고  

## Black과 같이 사용

Black과 같이 사용하면 저장 시 `import` 정렬이 자동으로 실행되도록 할 수 있다. VS code 설정 방법은 아래와 같다.  

```json
{
    "[python]": {
        "editor.defaultFormatter": "ms-python.black-formatter",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.organizeImports": "explicit"
        },
    },
    "isort.check": true,
    "isort.args":["--profile", "black"],
}
```
