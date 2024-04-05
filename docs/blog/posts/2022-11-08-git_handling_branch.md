---
slug: git-handling-branch
title: Git branch 다루기
date:
    created: 2022-11-08
description: >
    브랜치 관리를 위한 명령어들: branch, switch, merge
categories:
    - SW Engineering
tags:
    - git
---

Git 브랜치 관리를 위한 명령어들: branch, switch, merge  

<!-- more -->

---

> The information manager from Hell. - Linus Benedict Torvalds

## branch

브랜치를 관리하는 명령어로, 주요 옵션은 아래와 같다.  

- 브랜치 생성

```bash
git branch <newbranch>
```

- 브랜치 이름 변경

```bash
git branch -m [<oldbranch>] <newbranch>
```

- 브랜치 copy 생성

```bash
git branch -c [<oldbranch>] <newbranch>
```

- 브랜치 삭제

```bash
git branch -d <branch>
```

!!! tip
    참고로 원격 저장소의 브랜치를 삭제하려면 [`push`](2022-01-15-git_save_upload.md/#push) 명령어를 사용해야 한다.  

- 원격 저장소의 브랜치를 가져오기

```bash
git branch -t <branch>
```

!!! note
    원격 저장소에 여러 브랜치가 있는 경우 `pull`이나 `clone`을 하면 `main` 브랜치가 다운로드 되고 다른 브랜치들을 받아오지는 않는다. 따라서 [`git remote update`](2022-01-14-git_initiate.md/#remote) 명령어를 사용해서 원격 저장소의 브랜치에 접근할 수 있도록 해줘야 한다.  

## switch

위의 `branch` 명령어로 생성한 브랜치 간에 이동할 때, 즉 작업할 브랜치를 변경할 때 사용하는 명령어  

- 브랜치 이동

```bash
git switch <branch>
```

- 브랜치 생성 및 이동. `<start-point>`를 입력할 경우 해당 커밋을 브랜치의 시작점으로 지정

```bash
git switch -c <branch> [<start-point>]
```

- 저장 상태를 변경하지 않고 단순히 과거 특정 커밋 상태인 코드를 보기 위한 이동

```bash
git switch --detach <commit>
```

!!! note
    `--detach` 옵션은 detached HEAD[^1][^2] 상태를 만들어준다.  

[^1]: Git에서 HEAD란 저장소에서 현재 위치, 즉 **사용자에게 실제로 보이는 저장소**의 상태를 뜻한다.  
[^2]: HEAD가 현재 작업중인 브랜치의 최신 커밋을 가리킬 때 attached HEAD, 그렇지 않을 때 detached HEAD라고 부른다.  

## merge

현재 HEAD가 위치한 브랜치로 대상 브랜치를 합칠 때 사용하는 명령어  

```bash
git merge <branch>
```

```bash
git merge --no-ff <branch>
```

!!! tip
    `git merge`의 기본값인 fast-forward 방식 머지는 머지 commit을 생성하지 않는다. 따라서 `--no-ff` 옵션을 사용해서 머지 commit이 생성되도록 해줘야 이력 관리가 용이하다.  

```bash
git merge --no-commit --no-ff <branch>
```

!!! tip
    `--no-commit` 옵션을 사용할 경우 머지 commit이 자동 생성되지 않기 때문에 사용자가 머지 결과를 미리 확인할 수 있다.  

## rebase

공통 base를 가진 브랜치에서 한 브랜치의 base를 다른 브랜치의 최신 커밋으로 브랜치의 base를 옮기는 명령어  

```bash
git rebase <branch>
```

!!! note
    `merge`에 비해서 사용법이 복잡하고 중간에 걸친 모든 commit의 conflict를 검토해줘야 한다는 단점이 있지만, commit 이력이 더 깔끔해지고 히스토리 추적이 쉬워진다는 장점이 있다.  