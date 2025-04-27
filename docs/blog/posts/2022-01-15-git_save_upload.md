---
slug: git-save-upload
title: Git 저장소에 업로드 하기
date:
    created: 2022-01-15
description: >
    저장소에 파일을 업로드하기 위한 명령어들 정리: add, commit, push
categories:
    - SW Engineering
tags:
    - git
---

Git 저장소에 파일을 업로드하기 위한 명령어들 정리: add, commit, push  

<!-- more -->

---

> The information manager from Hell. - Linus Benedict Torvalds

## add

파일을 staging 영역에 추가한다.  

- 특정 파일 추가

```sh
git add <file>
```

- .gitignore를 제외한 모든 파일 추가

```sh
git add -a
```

```sh
git add .
```

- 수정되거나 삭제된 파일만 추가

```sh
git add -u
```

- txt 파일 추가

```sh
git add *.txt
```

- 특정 블럭만 추가

```sh
git add -p
```

```sh
git add --patch
```

상세 옵션은 아래와 같다.  

```
y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
g - select a hunk to go to
/ - search for a hunk matching the given regex
e - manually edit the current hunk
? - print help
```

## commit

add된 파일들을 local 저장소에 추가  

- Tracked 상태의 파일을 자동으로 Staging Area에 추가하여 commit

```sh
git commit -a
```

- commit 메세지 수정

```sh
git commit --amend
```

- 최근 커밋 날짜를 현재 날짜로 변경

```sh
git commit --amend --no-edit --date=now
```

- 최근 커밋 날짜를 원하는 날짜로 변경

```sh
git commit --amend --no-edit --date="May 23 11:08:49 2022 +0900"
```

## push

- commit된 내용을 원격 저장소로 업로드  

```sh
git push <repository> <branch>
```

- `tag`를 원격 저장소로 업로드

```sh
git push <repository> <tagname>
```

- 모든 `tag`를 원격 저장소로 업로드

```sh
git push --tags
```

- dry-run을 통해 명령을 수행할 시 어떤 일이 일어날지 출력

```sh
git push -n <repository> <branch>
```

- 원격 저장소의 브랜치 삭제

```sh
git push <repository> -d <branch>
```
