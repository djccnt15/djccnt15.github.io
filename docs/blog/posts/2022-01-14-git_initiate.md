---
slug: git-initiate
title: Git 시작하기
date:
    created: 2022-01-14
description: >
    시작하기 위한 명령어들 정리: help, init, remote, status
categories:
    - SW Engineering
tags:
    - git
---

Git을 시작하기 위한 명령어들 정리: help, init, remote, status  

<!-- more -->

---

> The information manager from Hell. - Linus Benedict Torvalds

## help

해당 명령어의 Manual Page를 열어준다.  

```bash
git help <command>
```

## init

현재 폴더를 git 저장소로 구성  

```bash
git init
```

## remote

원격 저장소를 관리하는 명령어로, 주요 옵션 및 부가명령어는 아래와 같다.  

```bash
git remote -v
```
```
origin  https://github.com/djccnt15/djccnt15.github.io.git (fetch)
origin  https://github.com/djccnt15/djccnt15.github.io.git (push)
```

- 원격 저장소 추가

```bash
git remote add <name> <url>
```

- 원격 저장소 업데이트

```bash
git remote update
```

- 원격 저장소 이름 수정

```bash
git remote rename <old> <new>
```

- 원격 저장소 삭제

```bash
git remote remove <name>
```

- 브랜치의 head 변경

```bash
git remote set-head <name> <branch>
```

- 원격 저장소 주소 변경

```bash
git remote set-url <name> <newurl> [<oldurl>]
```

- 원격 저장소 주소 추가

```bash
git remote set-url --add <name> <newurl>
```

- 원격 저장소 주소 삭제

```bash
git remote set-url --delete <name> <url>
```

### 💡여러 저장소에 동시 push

`git remote set-url --add <name> <newurl>`을 사용하면 하나의 단축 이름으로 여러 저장소에 동시에 push 할 수 있다.  

!!! warning
    `origin`을 동시 push하는 단축 이름으로 사용하는 것은 권장하지 않는다고 한다. `all` 같은 단축 이름을 새로 등록하자.  

## status

working tree의 상태 출력  

```bash
git status
```