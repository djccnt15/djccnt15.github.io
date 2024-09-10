---
slug: git-unstage
title: Git add 취소
date:
    created: 2024-04-15
description: >
    Git staging area의 add 된 파일 취소하는 방법
categories:
    - SW Engineering
tags:
    - git
---

Git staging area의 add 된 파일 취소하는 방법  

<!-- more -->

---

> The information manager from Hell. - Linus Benedict Torvalds

## restore

[`restore`](./2022-01-17-git_tips.md/#restore) 명령어로 add 취소하는 방법  

```bash
git restore --staged <file>
```

## reset

[`reset`](./2022-01-17-git_tips.md/#reset) 명령어로 add 취소하는 방법  

```bash
git reset <file>
```

```bash
git reset --mixed <file>
```
