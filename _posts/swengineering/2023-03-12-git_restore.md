---
published: true
layout: post
title: '[Git] 09. restore의 활용'
description: >
    git restore 명령어의 활용
categories: [SWEngineering]
tags: [git]
image:
    path: /assets/img/posts/thumbnail_git.png
related_posts:
    - _posts/swengineering/2022-12-08-git_cowork.md
---
{% include series_git.html %}
* toc
{:toc}

> The information manager from Hell. - Linus Benedict Torvalds

## restore

[restore](/swengineering/manual_git_04/#restore) 명령어는 원래 수정 사항을 되돌리기 위해 사용하는 명령어로, 아래와 같이 사용한다.  

```bash
# 수정 사항 되돌리기
$ git restore <file>

# 스테이징 취소하기(git add 취소하기)
$ git restore --staged <file>

# 특정 commit으로 되돌리기
$ git restore --source=<commit> <file>
```

### 특정 소스 지정하기

restore 명령어의 상세 옵션은 아래와 같은데, `--source` 옵션을 사용하면 어느 소스의 내용으로 현재 파일의 내용을 바꿀 것인지 지정해줄 수 있다.  

```bash
$ git restore (-p|--patch) [--source=<tree>] [--worktree] [<pathspec>…​]
```

`--source` 옵션을 사용하면 아래와 같이 특정 파일의 다른 브랜치의 변경 내용을 가져올수도 있다.  

```bash
# 1. 내용을 가져올 브랜치의 commit 된 코드 업데이트
$ git remote update

# 2. 내용을 가져올 소스 브랜치의 파일 선택하기
$ git restore --source=<branch> <file>

# 2-1. 해당 파일의 현재 브랜치와 소스 브랜치의 차이를 확인하면서 옵션을 제어하기
$ git restore -p --source=<branch> <file>
```

`restore` 명령어를 사용할 때 `-p|--patch` 옵션을 주면 현재 파일과 소스의 차이를 확인하면서 여러가지 옵션 중에 선택하여 가져오게 되는데, 각 옵션의 세부 내용은 아래와 같다.  

```
y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
k - leave this hunk undecided, see previous undecided hunk
K - leave this hunk undecided, see previous hunk
s - split the current hunk into smaller hunks
e - manually edit the current hunk
? - print help
```

### checkout 사용

바이너리 파일의 경우 아래와 같이 안내문만 출력되고 내용을 가져오질 않는다.  

```
Only binary files changed.
```

이 때는 `checkout` 명령어로 특정 커밋에서 파일을 가져올 수 있다.  

```bash
$ git checkout <commit> <file>
```