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

```sh
git help <command>
```

## init

현재 폴더를 git 저장소로 구성  

```sh
git init
```

## remote

원격 저장소를 관리하는 명령어로, 주요 옵션 및 부가명령어는 아래와 같다.  

```sh
git remote -v
```
```
origin  https://github.com/djccnt15/djccnt15.github.io.git (fetch)
origin  https://github.com/djccnt15/djccnt15.github.io.git (push)
```

- 원격 저장소 추가

```sh
git remote add <name> <url>
```

- 원격 저장소 업데이트

```sh
git remote update
```

- 원격 저장소 이름 수정

```sh
git remote rename <old> <new>
```

- 원격 저장소 삭제

```sh
git remote remove <name>
```

- 브랜치의 head 변경

```sh
git remote set-head <name> <branch>
```

- 원격 저장소 주소 변경

```sh
git remote set-url <name> <newurl> [<oldurl>]
```

- 원격 저장소 주소 추가

```sh
git remote set-url --add <name> <newurl>
```

- 원격 저장소 주소 삭제

```sh
git remote set-url --delete <name> <url>
```

- 원격 저장소의 존재하지 않는 브랜치 정리

```sh
git remote prune <name>
```

!!! tip
    원격 저장소에서 브랜치가 삭제되는 것은 `git remote update`로 로컬에 반영되지 않는다. 원격에서 삭제된 브랜치를 로컬에 반영하려면 `git remote prune` 명령어를 사용해야 한다.  

### 💡여러 저장소에 동시 push

`git remote set-url --add <name> <newurl>`을 사용하면 하나의 단축 이름으로 여러 저장소에 동시에 push 할 수 있다.  

!!! warning
    `origin`을 동시 push하는 단축 이름으로 사용하는 것은 권장하지 않는다고 한다. `all` 같은 단축 이름을 새로 등록하자.  

## status

working tree의 상태 출력  

```sh
git status
```
