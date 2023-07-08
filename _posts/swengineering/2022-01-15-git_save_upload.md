---
published: true
layout: post
title: '[Git] 02. 저장소에 업로드 하기'
description: >
    git 저장소에 파일을 업로드하기 위한 명령어들: add, commit, push
categories: [SWEngineering]
tags: [git]
image:
    path: /assets/img/posts/thumbnail_git.png
related_posts:
    - _posts/swengineering/2022-01-14-git_initiate.md
    - _posts/swengineering/2022-01-16-git_download.md
---
{% include series_git.html %}
* toc
{:toc}

> The information manager from Hell. - Linus Benedict Torvalds

## add

파일을 staging 영역에 추가한다.  

- 특정 파일 추가

```bash
git add <file>
```

- .gitignore를 제외한 모든 파일 추가

```bash
git add -a
```

```bash
git add .
```

- 수정되거나 삭제된 파일만 추가

```bash
git add -u
```

- txt 파일 추가

```bash
git add *.txt
```

## commit

add된 파일들을 local 저장소에 추가  

- Tracked 상태의 파일을 자동으로 Staging Area에 추가하여 commit

```bash
git commit -a
```

- commit 메세지 수정

```bash
git commit --amend
```

- 최근 커밋 날짜를 현재 날짜로 변경

```bash
git commit --amend --no-edit --date=now
```

- 최근 커밋 날짜를 원하는 날짜로 변경

```bash
git commit --amend --no-edit --date="May 23 11:08:49 2022 +0900"
```

## push

- commit된 내용을 원격 저장소로 업로드  

```bash
git push <repository> <branchname>
```

- dry-run을 통해 명령을 수행할 시 어떤 일이 일어날지 출력

```bash
git push -n <repository> <branchname>
```

- 원격 저장소의 브랜치 삭제

```bash
git push <repository> -d <branchname>
```