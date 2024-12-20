---
slug: vscode-python-breakpoint-bug
title: VS Code Python 디버그 고치기
date:
    created: 2022-12-09
description: >
    VS Code에서 Python 브레이크포인트 인식 버그 해결하기
categories:
    - SW Engineering
tags:
    - vs code
    - debug
    - python
    - troubleshooting
---

VS Code에서 Python 브레이크포인트 인식 버그 해결하기  

<!-- more -->

---

## 디버그를 디버그?

VS Code의 디버그 기능을 사용하면 브레이크포인트를 사용해서 특정 위치에서 코드 실행을 정지시키고 변수가 어떻게 변화하는지 확인할 수 있다.  

문제는 Python 버그인지 VS Code 버그인지는 모르겠는데, 나의 현재 개발 환경에서는 VS Code가 Python 가상환경에서의 브레이크포인트를 인식하지 못하는 버그가 있어서 디버그가 제대로 작동하지 않는다.  

이때는 디버그 설정을 켜서 아래와 같이 `"justMyCode": false` 옵션을 지정해주면 된다.  

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: 현재 파일",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "justMyCode": false
        }
    ]
}
```

원래는 Step Into 기능을 사용할 때 현재 보고 있는 코드의 외부에서 가져온 패키지까지 들어가서 내용을 확인하기 위해 사용하는 옵션인데, 해당 옵션을 키면 어쩐지 가상환경에서 브레이크포인트를 인식하지 못하는 버그가 같이 해결된다.  

## 원인 발견

문제를 발견한지 1년만에 원인을 찾았는데, 가상환경을 잘못 설정해서 VS Code가 Python 파일을 Python 소스로 인식하여 발생한 문제였다.  

Formatter인 Black도 동일한 문제로 formatting을 해주지 못했는데, 가상환경과 관련된 파일을 `.venv` 등 별도의 폴더로 모아주면 해결된다.  

---
## Reference
- [Debugger Not Stopping at Breakpoints in VS Code for Python](https://stackoverflow.com/questions/56794940/debugger-not-stopping-at-breakpoints-in-vs-code-for-python)
