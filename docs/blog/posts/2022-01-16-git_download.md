---
slug: git-download
title: Git 원격 저장소에서 다운받기
date:
    created: 2022-01-16
description: >
    원격 저장소에서 파일을 가져오기 위한 명령어들 정리: fetch, pull, clone
categories:
    - SW Engineering
tags:
    - git
---

Git 원격 저장소에서 파일을 가져오기 위한 명령어들 정리: fetch, pull, clone  

<!-- more -->

---

> The information manager from Hell. - Linus Benedict Torvalds

## fetch

원격 저장소의 내용을 다운로드  

```bash
git fetch <repository>
```

!!! tip
    `fetch` + `rebase`의 조합이 `pull` + `merge` 조합보다 좋다. 자세한 이유는 [링크](https://ryanking13.github.io/2021/10/17/why-git-pull-is-broken.html) 참고  

## pull

원격 저장소의 내용을 가져와서 현재 브랜치와 병합(merge)  

```bash
git pull <repository> <branchname>
```

## clone

원격 저장소를 로컬 저장소로 복제  

```bash
git clone <url>
```

```bash
git clone <url> <directory>
```

!!! warning
    폴더의 작업 내용이 사라지기 때문에 원격 저장소를 처음 다운받을 때만 사용해야한다.  

특정 브랜치만 클론  

```bash
git clone -b <branchname> --single-branch <repository>
```