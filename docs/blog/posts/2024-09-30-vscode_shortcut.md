---
slug: vscode-shortcut
title: VS Code 주요 단축키
date:
    created: 2024-09-30
description: >
    각종 유용한 Visual Studio Code 단축키 모음
categories:
    - SW Engineering
tags:
    - vs code
---

각종 유용한 Visual Studio Code 단축키 모음  

<!-- more -->

---

## 영역 이동

- ++ctrl+q++ : 이동 영역 선택, 단축키로 영역 목록 호출 후 호출 상태에서 대상 영역 선택
- ++ctrl+shift+e++ : 탐색창으로 이동
- ++ctrl+shift+f++ : 검색창으로 이동
- ++ctrl+shift+g++ : VCS 창으로 이동
- ++ctrl+shift+d++ : 디버깅 창으로 이동
- ++ctrl+shift+x++ : 확장프로그램 창으로 이동
- ++ctrl+n++ : n 번째 편집 목록으로 이동
- ++ctrl+grave++ : 터미널로 이동
- ++ctrl+shift+grave++ : 새로운 터미널 실행

## 에디터 이동

- ++ctrl+alt+left++ / ++right++ : 편집창을 다른 편집 목록으로 이동
- ++ctrl+shift+page-up++ / ++page-down++ : 편집창을 앞/뒤 순서로 이동

## 편집 파일 이동

- ++ctrl+w++ : 현재 편집창 종료
- ++ctrl+shift+t++ : 최근 종료한 편집창 다시 열기
- ++ctrl+page-up++ / ++page-down++ : 전/후 편집창으로 이동
- ++ctrl+r++ : 최근 작업 폴더 열기
- ++ctrl+e++ : 최근 파일 열기

## 찾기/바꾸기

- ++ctrl+f++ : 현재 편집창에서 찾기
- ++ctrl+h++ : 현재 편집창에서 찾아 바꾸기
- ++ctrl+shift+f++ : 전체 워크스페이스에서 찾기
- ++ctrl+shift+h++ : 전체 워크스페이스에서 찾아 바꾸기

## 편집

- ++ctrl+s++ : 저장
- ++ctrl+k++ ++ ++s++ : 전체 저장[^1]
- ++ctrl+z++ / ++y++ : 되돌리기 / 다시하기
- ++ctrl+enter++ : 아래에 줄 추가
- ++ctrl+shift+enter++ : 위에 줄 추가
- ++ctrl+shift+k++ : 줄 삭제[^2]
- ++ctrl+slash++ : 주석 처리
- ++ctrl+shift+slash++ : 선택 영역 주석 처리
- ++alt+shift+up++ / ++down++ : 선택 영역 위/아래로 복사

[^1]: ++ctrl+k++ 후 ++s++ 별도 입력  
[^2]: ++shift+back++ : 줄 삭제 개인 커스텀 단축키  

## 멀티 커서

- ++alt+lbutton++ : 멀티 커서 추가
- ++alt+shift+lbutton++ : 멀티 커서 범위 추가
- ++alt+up++ / ++down++ : 위/아래줄에 멀티 커서 추가
- 영역 선택 후 ++alt+shift+i++ : 각 줄의 마지막에 멀티 커서 선택

## 명령줄(Command Palette)

- ++ctrl+p++ : Command Palette 호출
- ++ctrl+shift+p++ : Command Palette 명령어 검색
- ++ctrl+t++ : 워크스페이스에서 심볼 이동
- ++ctrl+shift+o++ : 현재 편집창에서 심볼 이동
- ++ctrl+g++ : 현재 편집창에서 줄 이동

## 리팩토링

- ++ctrl+period++ : 빠른 수정(메서드 추출 및 이동, 오타 수정[^3] 등)
- ++f2++ : 심볼 이름 변경
- ++ctrl+d++ : 다음으로 일치하는 텍스트 선택
- ++ctrl+shift+l++ : 일치하는 텍스트 전체 선택

[^3]: [스펠 체커](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) 설치 시  

## 디버깅

- ++f5++ : 디버깅 실행 / 디버깅 진행
- ++f9++ : breakpoint 추가
- ++shift+f9++ : inline breakpoint 추가
- ++ctrl+f5++ : 디버깅 없이 실행
- ++ctrl+shift+f5++ : 디버깅 다시 시작
- ++f6++ : 디버깅 일시중지
- ++shift+f5++ : 디버깅 중지
- ++f10++ : 건너뛰기

## 콘솔창 이동 단축키

- ++ctrl+alt+page-up++ / ++page-down++ : 위/아래 줄로 이동
- ++shift+page-up++ / ++page-down++ : 위/아래 페이지로 이동
- ++ctrl+home++ / ++end++ : 처음/끝으로 이동
- ++ctrl+up++ / ++down++ : 이전/이후 명령어로 이동
