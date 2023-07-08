---
published: true
layout: post
title: "[pip] No module named 'pip'"
description: >
    How to reinstall pip
categories: [Python]
tags: [python, pip]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## ensurepip

pip 설치 상태에 오류가 생기면 아래와 같이 pip이 없는 에러가 발생한다. 주로 pip을 업데이트 하는 과정에서 오류가 생겼을 때 발생한다.  

```
ModuleNotFoundError: No module named 'pip'
```

이 때는 아래 명령어로 해결할 수 있다.  

```powershell
python -m ensurepip --upgrade
```

---
## Reference
- [ensurepip](https://docs.python.org/3/library/ensurepip.html)([한글](https://docs.python.org/ko/3/library/ensurepip.html))