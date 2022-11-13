---
published: true
layout: post
title: '[pip] pip 업그레이드'
description: >
  Python pip 업그레이드 하기
categories: [Python]
tags: [pip]
image:
  path: /assets/img/posts/pip_version_warning.png
related_posts:
  - _posts/category/0000-01-01-format_post.md
---

## pip 업그레이드

`python`으로 개발을 하다보면 아래와 같이 `pip` 버전이 오래되었다는 경고가 뜰 때가 있다.  

![pip_version_warning](/assets/img/posts/pip_version_warning.png)

이럴 때는 그냥 경고가 알려주는대로 복붙해서 업그레이드하면 된다.  

## 직접 업그레이드

아래와 같이 pip 버전이 제대로 체크되지 않아 업그레이드 명령어를 알려주지 않는 경우가 있다. 경험상 정말 오랫동안 중지했던 프로젝트를 오랜만에 다룰 때 주로 발생했던 것 같다.  

```powershell
WARNING: There was an error checking the latest version of pip
```

이럴 땐 아래와 같이 pip를 수동으로 업그레이드 해주면 된다.  

```powershell
# windows
> python -m pip install --upgrade pip

# linux
$ pip install --upgrade pip
```