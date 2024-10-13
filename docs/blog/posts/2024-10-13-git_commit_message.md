---
slug: git-commit-message
title: Git 커밋 메세지 수정
date:
    created: 2024-10-13
description: >
    Git 커밋 메세지를 수정하는 방법 정리
categories:
    - SW Engineering
tags:
    - git
---

Git 커밋 메세지를 수정하는 방법 정리  

<!-- more -->

---

## commit 사용

아래와 같이 `commit` 명령어를 통해 가장 최근의 커밋 메세지를 변경할 수 있다.  

- commit 메세지 수정

```shell
git commit --amend
```

- 최근 커밋 날짜를 현재 날짜로 변경

```shell
git commit --amend --no-edit --date=now
```

- 최근 커밋 날짜를 원하는 날짜로 변경

```shell
git commit --amend --no-edit --date="May 23 11:08:49 2022 +0900"
```

## rebase 사용

여러 커밋 메세지를 수정하고 싶을 때는 아래와 같이 `rebase` 명령어를 활용해서 처리 가능하다.  

```shell
git rebase -i HEAD~n
```

실제 활용 방법은 아래와 같다.  

1. 명령어 입력
    ```shell
    git rebase -i HEAD~3
    ```
    ```
    pick 643d4a9 update exception module mv add_handlers func to exception module from handlers module
    pick 3759b06 minor bugfix update tokenUrl in auth for swagger doc
    pick f90c6c6 update README

    # Rebase 229793a..f90c6c6 onto 229793a (3 commands)
    #
    # Commands:
    # p, pick <commit> = use commit
    # r, reword <commit> = use commit, but edit the commit message
    # e, edit <commit> = use commit, but stop for amending
    # s, squash <commit> = use commit, but meld into previous commit
    # f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
    #                    commit's log message, unless -C is used, in which case
    #                    keep only this commit's message; -c is same as -C but
    #                    opens the editor
    # x, exec <command> = run command (the rest of the line) using shell
    # b, break = stop here (continue rebase later with 'git rebase --continue')
    # d, drop <commit> = remove commit
    # l, label <label> = label current HEAD with a name
    # t, reset <label> = reset HEAD to a label
    # m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
    #         create a merge commit using the original merge commit's
    #         message (or the oneline, if no original merge commit was
    #         specified); use -c <commit> to reword the commit message
    # u, update-ref <ref> = track a placeholder for the <ref> to be updated
    #                       to this position in the new commits. The <ref> is
    #                       updated at the end of the rebase
    #
    # These lines can be re-ordered; they are executed from top to bottom.
    #
    # If you remove a line here THAT COMMIT WILL BE LOST.
    #
    # However, if you remove everything, the rebase will be aborted.
    #
    ```
1. 변경하려는 각 커밋 메시지 앞의 `pick`을 `reword`로 변경 및 저장
    ```
    pick 643d4a9 update exception module mv add_handlers func to exception module from handlers module
    pick 3759b06 minor bugfix update tokenUrl in auth for swagger doc
    reword f90c6c6 update README
    ```
1. 결과 커밋 파일마다 새 커밋 메시지 입력하고 파일을 저장

---
## Reference
- [GitHub Docs - 커밋 메시지 변경](https://docs.github.com/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message)
