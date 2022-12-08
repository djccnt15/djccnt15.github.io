---
published: true
layout: post
title: '[VS Code] Python 디버그 고치기'
description: >
    VS Code에서 Python 브레이크포인트 인식 버그 해결하기
categories: [SWEngineering]
tags: [VS Code]
image:
    path: /assets/img/posts/vscode_python_breakpoint.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 디버그를 디버그?

VS Code의 디버그 기능을 사용하면 브레이크포인트를 사용해서 특정 위치에서 코드 실행을 정지시키고 변수가 어떻게 변화하는지 확인할 수 있다.  

문제는 Python 버그인지 VS Code 버그인지는 모르겠는데, 나의 현재 개발 환경에서는 VS Code가 브레이크포인트를 인식하지 못하는 버그가 있어서 디버그가 제대로 작동하지 않는다.  

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

원래는 Step Into 기능을 사용할 때 현재 보고 있는 코드 파일 외부에서 가져온 API까지 들어가서 내용을 확인하기 위해 사용하는 옵션인데, 해당 옵션을 키면 어쩐지 가상환경에서 브레이크포인트를 인식하지 못하는 버그가 같이 해결된다.  

---
## Reference
- [Debugger Not Stopping at Breakpoints in VS Code for Python](https://stackoverflow.com/questions/56794940/debugger-not-stopping-at-breakpoints-in-vs-code-for-python)