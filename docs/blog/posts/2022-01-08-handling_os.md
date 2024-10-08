---
slug: handling-os
title: 내장 모듈 os
date:
    created: 2022-01-08
description: >
    Python 내장 모듈 os의 주요 기능들
categories:
    - Python
tags:
    - python
    - os
---

Python 내장 모듈 os의 주요 기능들  

<!-- more -->

---

## 1. getcwd()

스크립트가 작동하는 디렉토리를 반환한다.  

```python
import os

print(os.getcwd())
```
```
C:\projects\test
```

## 2. chdir()

스크립트가 작동하는 디렉토리를 변경한다.  

```python
os.chdir('C:\\projects')

print(os.getcwd())
```
```
C:\projects
```

## 3. system()

각종 system 명령어를 실행한다. 자주 쓰는 system 명령어는 [여기](./2022-01-13-manual_cmd.md)서 확인할 수 있다.  
예시로 코드를 중간에 잠시 일시 정지 시키고 싶을 때는 아래와 같이 하면 된다.  

```python
os.system('pause')
```
```
계속하려면 아무 키나 누르십시오 . . .
```

사실 그냥 `input`을 사용하는게 더 쉽고 편하다.  

```python
input('Press Enter to Continue')
```
```
Press Enter to Continue
```

## 4. mkdir()

폴더를 만든다.  

```python
os.mkdir('./test')
```

## 5. rmdir()

폴더를 지운다.  

```python
os.rmdir('./test')
```

## 6. remove()

파일을 지운다.

```python
os.remove('test.txt')
```

## 7. rename()

대상 파일 또는 디렉토리의 이름을 `src`에서 `dst`로 변경한다.  

```python
os.rename(src, dst)
```

## 8. listdir()

대상 디렉토리에 있는 항목들의 이름을 리스트로 반환한다.  

```python
print(os.listdir())
```
```
['test.txt', 'scratch.py']
```

---
## Reference
- [Python Documentation: os — Miscellaneous operating system interfaces](https://docs.python.org/3/library/os.html)([한글](https://docs.python.org/ko/3/library/os.html))
