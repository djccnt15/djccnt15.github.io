---
slug: tips-for-standard-out
title: 표준 출력 관련 팁
date:
    created: 2023-09-24
description: >
    표준 출력 관련 팁 정리
categories:
    - SW Engineering
tags:
    - stdout
---

표준 출력 관련 팁 정리  

<!-- more -->

---

## 표준 출력을 파일로 저장하는 방법

프로그램의 표준 출력을 터미널로 보는 것이 아니라 파일로 저장하고 싶을 경우가 있다. 이 때는 아래와 같은 커맨드로 프로그램을 실행하면 된다.  

```python title="main.py"
from datetime import datetime

print(datetime.now())
```

- 단순 출력

```
main.py
```

- 표준 출력을 파일에 저장(덮어쓰기)

```
main.py > log.log
```

- 표준 출력을 파일에 저장(추가하기)

```
main.py >> log.log
```
