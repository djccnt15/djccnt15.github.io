---
slug: environment-variable
title: 환경 변수
date:
    created: 2025-06-23
description: >
    환경 변수에 대한 이해를 위한 정리
categories:
    - SW Engineering
tags:
    - environment variable
    - os
---

환경 변수는 프로그램을 실행할 때 프로세스 수준에서 활용하는 실행 환경에 설정된 변수를 말한다.  

<!-- more -->

---

## 주요 활용

- 변수에 자주 사용하는 경로 저장
- 기존에 있는 변수를 이용한 새로운 변수 저장
- 프로세스가 구동중에 활용할 값을 미리 환경 변수에 할당한 후 프로세스 실행
- 여러 개의 프로세스가 활용해야 하는 공통된 값을 환경 변수에 할당

## 환경 변수 설정

### 임시 선언

임시 환경 변수는 `set`, `export` 등의 [명령어를 사용해서 설정](./2022-01-13-manual_cmd.md/#setexport)할 수 있다.  

!!! warning
    임시 환경 변수는 시스템 재부팅 또는 로그아웃 시 삭제 된다.  

### 유저 레벨 선언

#### Windows

Windows의 경우 제어판의 *시스템 속성 - 환경 변수* 메뉴를 통해 설정할 수 있다.  

#### Linux

Linux의 경우 특정 사용자에게 환경 변수를 영구적으로 설정하고 싶은 경우 `~/.bash_profile` 파일에 설정해주면 된다.  

!!! tip
    `~/.bash_profile` 파일은 사용자가 처음 로그인 할 때 적용되며, 재로그인하지 않고 바로 적용하고 싶을 경우 `source` 명령어로 `.bash_profile` 파일에 설정한 명령어들을 실행시켜 주면 된다.  

    ```sh
    source .bash_profile
    ```

!!! warning
    `~/.bash_profile` 파일을 사용하는 경우 **bash shell**로 접속할 경우에만 동작하고, **sh**, **zsh** 등 다른 터미널로 접속할 경우 동작하지 않는다.  

Linux에서 모든 사용자에게 환경 변수를 영구적으로 설정하고 싶은 경우 `/etc/profile` 파일에 설정해주면 된다.  

## $PATH

명령어의 실행 파일이 운영체제의 `$PATH`에 등록된 디렉토리 중에 포함되어 있을 경우 터미널에서 경로에 대한 입력 없이 명령어로 프로그램을 실행할 수 있다.  

!!! tip
    [`where`, `which` 명령어](./2022-01-13-manual_cmd.md/#wherewhichfind)는 `$PATH`에 등록된 프로그램 경로를 찾아서 출력해준다.  
