---
slug: git-history
title: Git 변경 이력 확인하기
date:
    created: 2025-02-19
description: >
    Git으로 특정 파일의 변경 이력 확인하는 방법
categories:
    - SW Engineering
tags:
    - git
---

Git으로 특정 파일의 변경 이력 확인하는 방법  

<!-- more -->

---

## Git 변경 이력 확인 방법

- 특정 파일의 Git 로그 확인 방법

```sh
git log -- <file>
```

- 특정 커밋의 변경 내용 확인 방법

```sh
git show <commit-hash>
```

- 특정 파일의 Git 로그 및 변경 내용 확인 방법

```sh
git log -p -- <file>
```
