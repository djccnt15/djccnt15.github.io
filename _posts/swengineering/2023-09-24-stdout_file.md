---
published: true
layout: post
title: '[stdout] 표준 출력 관련 팁'
description: >
    표준 출력 관련 팁
categories: [SWEngineering]
tags: [stdout]
image:
    path: /assets/img/posts/thumbnail_swengineering.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 표준 출력을 파일로 저장하는 방법

프로그램의 표준 출력을 터미널로 보는 것이 아니라 파일로 저장하고 싶을 경우가 있다. 이 때는 아래와 같은 커맨드로 프로그램을 실행하면 된다.  

우선 `note.py`라는 이름의 샘플용 Python 프로그램을 아래와 같이 만들자.  

```python
from datetime import datetime

print(datetime.now())
```

이 파일을 단순히 아래 커맨드로 실행하면 현재 시간이 터미널에 출력된다.  

```
note.py
```

해당 프로그램의 표준 출력을 파일에 저장하고 싶을 경우 아래와 같이 실행하면 된다.  

```
note.py > log.log
```

위 명령어로 실행할 경우 표준 출력이 해당 파일에 덮어쓰기로 저장된다. 만약 덮어쓰기가 아니라 추가하는 방식으로 실행하고 싶다면 아래와 같이 실행하면 된다.  

```
note.py >> log.log
```