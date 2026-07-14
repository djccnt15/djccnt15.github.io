---
slug: cmd-troubleshooting
title: CMD 트러블슈팅 모음
date:
    created: 2026-07-14
description: >
    CMD 사용 중 겪은 트러블슈팅 모음
categories:
    - SW Engineering
tags:
    - cmd
    - troubleshooting
---

CMD 사용 중 겪은 트러블슈팅 모음

<!-- more -->

---

## 선택 모드 금지

Windows 명령 프롬프트, PowerShell에서 마우스를 클릭했을 때 서비스가 일시 정지되는 현상은 윈도우 콘솔의 `빠른 편집 모드(QuickEdit Mode)` 기능 때문에 발생한다.  

콘솔 창 설정에서 `빠른 편집 모드`를 비활성화하면 이 기능을 끌 수 있다.  

1. 터미널 창의 제목 표시줄 우클릭
1. 메뉴에서 속성(Properties) / 기본값(Defaults) > 옵션(Options)[^1]
1. `편집 옵션` 항목의 `빠른 편집 모드(QuickEdit Mode)` 체크 해제
1. 저장 후 종료

[^1]: `속성`은 현재 창에만 적용되고, `기본값`은 앞으로 열릴 모든 터미널 창에 적용

!!! note
    최신 Windows 터미널은 단순 클릭만으로는 서비스가 멈추지 않도록 기본 설계되어 있긴한데, 문제가 생기면 JSON 설정 파일을 열고 아래 내용을 추가해주면 된다.  

    ```json
    "defaults": {
        "intenseTextAttributeFormattingMode": "all",
        "selectionWithAlt": false, // Alt 키를 누를 때만 드래그 선택 되도록 설정
        "copyOnSelect": false
    }
    ```
