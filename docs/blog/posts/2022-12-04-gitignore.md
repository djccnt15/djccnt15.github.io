---
slug: git-gitignore
title: Git 파일/폴더 제외 방법
date:
    created: 2022-12-04
description: >
    Git의 관리 대상에서 파일/폴더 제외하기
categories:
    - SW Engineering
tags:
    - git
---

Git의 관리 대상에서 파일/폴더 제외하기  

<!-- more -->

---

> The information manager from Hell. - Linus Benedict Torvalds

## .gitignore 파일 생성

Git이 특정 파일이나 폴더를 관리하지 않도록 설정하려면 `.gitignore` 파일을 만들어서 목록을 추가해두면 된다.  

```bat
# 특정 파일 제외
example.txt

# 특정 폴더 제외
example/

# 특정 형식 제외
*.example
```

GitHub과 같은 Git 서비스를 이용한다면 저장소를 생성할 때 프로젝트에서 사용하는 언어에 적절한 프리셋을 선택해서 생성할 수 있다.  

## 기존 관리 대상 파일 제거

기존에 관리 대상인 파일은 `.gitignore`에 추가하더라도 변경 내용이 추가로 업로드 되지 않는 것일 뿐 기존 내용은 그대로 저장소에 남아 있게 된다. 따라서 해당 파일을 [Git 저장소에서 삭제](./2022-01-17-git_tips.md/#rm)해줘야 한다.  

- 파일을 워킹 트리와 인덱스에서 삭제

```bash
git rm <pathspec>
```

- 파일/폴더를 원격 저장소에서만 삭제

```bash
git rm --cached <pathspec>
```

```bash
git rm -r --cached <directory>
```
