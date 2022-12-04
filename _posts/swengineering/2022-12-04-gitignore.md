---
published: true
layout: post
title: '[Git] 06. 제외하기'
description: >
    Git의 관리 대상에서 파일 제외하기
categories: [SWEngineering]
tags: [git]
image:
    path: /assets/img/posts/git.png
related_posts:
    - _posts/swengineering/2022-11-08-manual_git_05.md
---
* toc
{:toc}

> The information manager from Hell. - Linus Benedict Torvalds

{% include series_git.html %}

## gitignore 파일 생성

Git이 특정 파일이나 폴더를 관리하지 않도록 설정하려면 `.gitignore` 파일을 만들어서 목록을 추가해두면 된다.  

```powershell
# 특정 파일 제외
example.txt

# 특정 폴더 제외
example/

# 특정 형식 제외
*.example
```

GitHub과 같은 Git 서비스를 이용한다면 저장소를 생성할 때 프로젝트에서 사용하는 언어에 적절한 프리셋을 선택해서 생성할 수 있다.  

## 기존 관리 대상 파일 제거

기존에 관리 대상인 파일은 `.gitignore`에 추가하더라도 변경 내용이 추가로 업로드 되지 않는 것일 뿐 기존 내용은 그대로 저장소에 남아 있게 된다. 따라서 해당 파일을 [Git 저장소에서 삭제](/swengineering/manual_git_04/#rm)해줘야 한다.  

```powershell
# 파일을 워킹 트리와 인덱스에서 삭제
$ git rm <pathspec>

# 파일을 원격 저장소에서만 삭제
$ git rm --cached <pathspec>

# 폴더를 원격 저장소에서만 삭제
$ git rm -r --cached <dir_name>
```