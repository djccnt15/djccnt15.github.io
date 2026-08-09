---
slug: rdp-troubleshooting
title: RDP 트러블슈팅 모음
date:
    created: 2026-08-09
description: >
    RDP 사용 중 겪은 트러블슈팅 모음
categories:
    - SW Engineering
tags:
    - rdp
    - troubleshooting
---

RDP 사용 중 겪은 트러블슈팅 모음

<!-- more -->

---

## RDP 복사 안 될 때

클립보드 동기화를 담당하는 백그라운드 프로세스(`rdpclip.exe`)를 재시작하면 해결될 수도 있다.  

1. 원격 서버 화면에서 작업 관리자 실행 ++ctrl+shift+esc++
1. 상단 탭 > 세부 정보(또는 프로세스) 탭
1. `rdpclip.exe` (RDP 클립보드 모니터) 프로세스 종료
1. 작업 관리자 상단 파일 > 새 작업 실행
1. `rdpclip.exe` 입력해 프로세스를 다시 실행
