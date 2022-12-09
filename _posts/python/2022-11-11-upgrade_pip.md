---
published: true
layout: post
title: '[pip] pip 업그레이드'
description: >
    Python pip 업그레이드 하기
categories: [Python]
tags: [pip]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## pip 업그레이드

Python으로 개발을 하다보면 아래와 같이 pip 버전이 오래되었다는 경고가 뜰 때가 있다.  

![pip_version_warning](/assets/img/posts/pip_version_warning.png)

경고가 알려주는대로 복붙해서 업그레이드하면 된다.  

```powershell
# windows
> python.exe -m pip install --upgrade pip

# linux
$ pip install --upgrade pip
```

간혹 아래와 같이 pip 버전이 제대로 체크되지 않아 에러만 띄우고 업그레이드 명령어를 알려주지 않는 경우가 있다. 경험상 정말 오랫동안 중지했던 프로젝트를 오랜만에 다룰 때 주로 발생했던 것 같다. 이 때도 동일하게 pip를 업그레이드 해주면 된다.  

```powershell
WARNING: There was an error checking the latest version of pip
```