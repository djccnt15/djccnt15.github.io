---
published: true
layout: post
title: '[Python] 경로 다루기'
description: >
    경로를 객체로 다루는 방법들
categories: [Python]
tags: [python, path]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/programming/2022-01-08-python_os.md
---
* toc
{:toc}

## 경로를 객체로 다뤄야 하는 이유

운영체제는 크게 윈도우 계열과 유닉스 계열로 나뉘는데, 둘이 경로를 지정하는 방식이 조금 다르다.  

- 윈도우: `\`
- 유닉스: `/`

이 차이 때문에 개발 환경과 운영 환경의 운영체제가 달라 경로 문제가 발생할 수 있는데, 경로를 객체로 다루게 되면 이런 문제를 방지할 수 있을 뿐만 아니라 Python이 제공하는 유용한 기능들도 사용할 수 있다.  

## os.path.join

Python의 내장 모듈 중에 운영체제의 기능을 사용하기 위한 `os` 모듈이 있는데 하위 모듈 중에 경로를 다룰 때 유용한 `os.path` 모듈이 있다.  

```python
import os

path = os.path.join('a', 'b', 'c', 'd.txt')

print(path)
```
```
a\b\c\d.txt
```

## pathlib

Python 3.4 버전부터 추가된 `pathlib` 모듈을 사용하면 경로를 더 쉽게 다룰 수 있다.  

```python
from pathlib import Path

path = Path('a', 'b', 'c', 'd.txt')

print(path)
```
```
a\b\c\d.txt
```

```python
from pathlib import Path

a = 'a'
b = 'b'
c = 'c'
fn = 'd.txt'

path = Path(a) / b / c / fn

print(path)
```
```
a\b\c\d.txt
```

아래와 같이 이런 저런 추가 기능들도 유용하게 사용할 수 있다.  

```python
from pathlib import Path

path = Path('scratch.py')

print(path.is_file())
```
```
True
```

---
## Reference
- [os.path — Common pathname manipulations](https://docs.python.org/3/library/os.path.html)
- [pathlib — Object-oriented filesystem paths](https://docs.python.org/3/library/pathlib.html)