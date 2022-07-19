---
published: true
layout: post

title: '[Python] No module named pip'
description: >
    How to reinstall pip
hide_description: false
image:
    path: /assets/img/posts/python_ensurepip.png
related_posts:
    - _posts/python/2022-01-06-about_PEP.md

categories:
    - python
tags:
    - python
    - programming
---
* toc
{:toc}

## ensurepip

`pip`설치 상태에 오류가 생기면 아래와 같이 `pip`가 없는 에러가 발생한다. 주로 `pip`를 업데이트 하는 과정에서 오류가 생겼을 때 발생한다.  

```
ModuleNotFoundError: No module named 'pip'
```

이 때는 아래 명령어들로 해결할 수 있다.

```powershell
# install pip into the current environment
> python -m ensurepip

# install pip and upgrade to latest one
> python -m ensurepip --upgrade
```

---
## Reference
- [ensurepip](https://docs.python.org/3/library/ensurepip.html)([한글](https://docs.python.org/ko/3/library/ensurepip.html))