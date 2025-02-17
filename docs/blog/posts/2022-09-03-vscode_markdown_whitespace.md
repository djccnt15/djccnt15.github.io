---
slug: vscode-markdown-whitespace
title: 특정 형식에만 VS Code 옵션 적용하기
date:
    created: 2022-09-03
description: >
    markdown 형식에만 Trim Trailing Whitespace 옵션 끄기
categories:
    - SW Engineering
tags:
    - vs code
---

markdown 형식에만 Trim Trailing Whitespace 옵션 끄기  

<!-- more -->

---

## 왜 필요하지?

난 문장 끝에 남발된 스페이스가 싫어서 VS Code의 `Trim Trailing Whitespace` 옵션을 항상 켜둔다. 문제는 Markdown에서는 문장 끝의 더블 스페이스로 줄 바꿈을 표시하고, VS Code의 `Trim Trailing Whitespace` 옵션은 Markdown의 줄 바꿈 표시를 지워서 문서를 망가뜨린다.  

## 해결책은?

의외로 해결책은 간단했는데, 세부 설정에 들어가서 아래와 같이 설정해주면 된다.  

1. VS Code `Settings` 열기
1. 우상단의 `Open Setting(JSON)` 열기
1. 아래와 같이 수정하기

```json
{
    "files.trimTrailingWhitespace": true,
    "[markdown]": {
        "files.trimTrailingWhitespace": false
    }
}
```

이러면 기본적으로 `Trim Trailing Whitespace` 옵션이 켜지지만, Markdown 파일에는 적용되지 않는다.  

---
## Reference
- [Language specific editor settings](https://code.visualstudio.com/docs/getstarted/settings#_language-specific-editor-settings)
- [Trim Trailing Whitespace Breaks Markdown #1679](https://github.com/microsoft/vscode/issues/1679)
