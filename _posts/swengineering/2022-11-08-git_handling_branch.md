---
published: true
layout: post
title: '[Git] 05. branch 다루기'
description: >
    branch 관리를 위한 명령어들: branch, switch, merge
categories: [SWEngineering]
tags: [git]
image:
    path: /assets/img/posts/thumbnail_git.png
related_posts:
    - _posts/swengineering/2022-01-17-git_tips.md
    - _posts/swengineering/2022-12-04-gitignore.md
---
{% include series_git.html %}
* toc
{:toc}

> The information manager from Hell. - Linus Benedict Torvalds

## branch

브랜치를 관리하는 명령어로, 주요 옵션은 아래와 같다.  

```bash
# branch 생성
$ git branch <newbranch>

# branch 이름 변경
$ git branch -m [<oldbranch>] <newbranch>

# branch copy 생성
$ git branch -c [<oldbranch>] <newbranch>

# branch 삭제
$ git branch -d [-r] <branchname>

# 원격 저장소의 branch를 가져오기
$ git branch -t <branchname>
```

`git branch -d`로 브랜치를 삭제할 때 `-r` 옵션을 같이 사용하면 원격 저장소의 해당 브랜치를 삭제한다.  

원격 저장소에 여러 브랜치가 있는 경우 pull이나 clone을 하면 `main` 브랜치가 다운로드 되고 다른 브랜치들을 받아오지는 않는다. 따라서 [`git remote update`](/swengineering/manual_git_01/#remote) 명령어를 사용해서 원격 저장소의 브랜치에 접근할 수 있도록 해줘야 한다.  

## switch

위의 `branch` 명령어로 생성한 브랜치 간에 이동할 때, 즉 작업할 브랜치를 변경할 때 사용하는 명령어다.  

```bash
# branch 이동
$ git switch <branchname>

# branch 생성 및 이동
$ git switch -c <branchname> [<start-point>]
```

## merge

현재 HEAD가 위치한 브랜치로 대상 브랜치를 합칠 때 사용하는 명령어다.  

```bash
$ git merge <branchname>

$ git merge --no-commit --no-ff <branchname>
```

`--no-commit` 옵션을 사용할 경우 머지 commit이 자동 생성되지 않기 때문에 사용자가 머지 결과를 미리 확인할 수 있다.  

다만 fast-forward 머지는 머지 commit을 생성하지 않기 때문에 `--no-ff` 옵션을 사용해서 fast-forward의 경우에도 머지 commit이 생성되도록 해줘야 쉽게 비교할 수 있다.  

## rebase

공통 base를 가진 브랜치에서 한 브랜치의 base를 다른 브랜치의 최신 커밋으로 브랜치의 base를 옮기는 명령어다.  

```bash
$ git rebase <branchname>
```

`merge`에 비해서 사용법이 복잡하고 중간에 걸친 모든 commit의 conflict를 검토해줘야 한다는 단점이 있지만, commit 이력이 더 깔끔해지고 히스토리 추적이 쉬워진다는 장점이 있다.  

또한 conflict 해결을 여러 차례 반복하는 것이 결과적으로는 코드 에러를 더 줄일 수 있다.  