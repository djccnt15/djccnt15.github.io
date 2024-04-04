---
slug: git-rollback
title: Git 과거 코드로 되돌리기
date:
    created: 2024-04-04
description: >
    Git을 사용해서 과거 코드 이력으로 되돌리는 방법
categories:
    - SW Engineering
tags:
    - git
---

Git을 사용해서 과거 코드 이력으로 되돌리는 방법  

<!-- more -->

---

> The information manager from Hell. - Linus Benedict Torvalds

## 💡switch

`switch` 명령어는 원래 [특정 브랜치로 HEAD를 옮기기 위한 명령어](2022-11-08-git_handling_branch.md/#switch)인데, HEAD를 옮길 수 있다는 점 때문인지 과거 커밋으로 HEAD를 옮기는 용도로도 사용 가능하다.  

아래와 같이 `--detach` 옵션을 사용하면 **과거 특정 커밋 상태인 코드를 보기 위한 이동 개념**으로 detached HEAD 상태를 만들어 저장 상태를 변경하지 않고 코드를 일시적으로 되돌릴 수 있다.  

```bash
git switch --detach <commit>
```

!!! warning
    detached HEAD 상태에서는 제대로 된 커밋이 이루어지지 않는다. 정상적으로 커밋을 생성하기 위해서는 새로운 브랜치를 만들어야 한다.  

!!! info
    이 명령어는 **EXPERIMENTAL** 상태이기 때문에 작동 방식이 변경될 수 있다.  

## restore

`restore` 명령어는 [삭제한 파일을 되살리는 명령어](2022-01-17-git_tips.md/#restore)인데, 아래와 같이 `-s`, `--sorce` 옵션과 함께 사용하면 특정 커밋에서 해당 파일의 내용을 되살릴 수 있다.  

```bash
git restore --s <commit> <file>
```

```bash
git restore --source=<commit> <file>
```

!!! info
    이 명령어는 **EXPERIMENTAL** 상태이기 때문에 작동 방식이 변경될 수 있다.  

## reset

`reset` 명령어는 [현재의 HEAD를 특정 상태로 되돌리는 명령어](2022-01-17-git_tips.md/#reset)인데, 아래와 같이 특정 커밋의 특정 파일에 대해서도 지정할 수 있다.  

```bash
git reset <commit> <file>
```

!!! danger
    파일명을 제대로 입력하지 않을 경우 전체 저장소가 되돌려진다.  

!!! warning
    `reset` 명령어를 사용해서 되돌릴 경우 **커밋 이력이 삭제**된다.  

## 💡revert

`revert` 명령어를 사용하면 특정 커밋의 내용을 되돌리는 새로운 커밋을 생성한다. 새로운 커밋을 생성하기 때문에 커밋 이력을 삭제하지 않는다는 장점이 있다.  

```bash
git revert <commit>
```

아래와 같이 `--no-commit` 옵션을 사용하면 커밋을 자동 실행하지 않는다.  

```bash
git revert --no-commit <commit>
```

여러 커밋을 한 번에 되돌리려면 아래와 같이 `..`으로 범위를 지정해주면 된다.  

```bash
git revert -n <start-commit>..<finish-commit>
```

아래와 같이 마지막 범위를 지정하지 않을 경우 HEAD가 마지막 범위로 자동 지정된다.  

```bash
git revert -n <start-commit>..
```