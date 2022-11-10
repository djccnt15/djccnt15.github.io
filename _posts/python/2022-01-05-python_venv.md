---
published: true
layout: post
title: '[Python] 가상환경'
description: >
  windows와 linux에서 python 가상환경 만들고 사용하기
categories: [Python]
tags: [python, ⭐starred]
image:
  path: /assets/img/posts/python_venv.png
related_posts:
  - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

Python은 라이브러리 버전 관리가 중요하기 때문에 프로젝트 별로 별도의 가상환경을 구축해서 사용하는 것이 좋다. `venv`, `pipenv`, `pyenv`, `conda` 등 여러 가지 라이브러리를 통해서 가상환경을 구축할 수 있는데, 나는 `Python3.5` 버전 이후부터 기본 모듈로 제공되는 `venv`를 사용한다.  

## windows에서

### 1. venv로 가상환경 만들고 실행

`python -m venv` 명령어로 파이썬 가상환경을 만든다.  

```powershell
> python -m venv [venv_name]
```

가상환경을 구동하려면 `\Scripts\activate.bat`을 실행시킨다.  

```powershell
> cd [venv_name]
> Scripts\activate.bat
```

가상환경을 중지하려면 `deactivate`를 입력하거나 `Scripts\deactivate.bat`를 실행하면 된다.  

```powershell
(venv_name) > deactivate
# or
(venv_name) > Scripts\deactivate.bat
```

### 2. ⚡ 특정 Python version 사용

프로젝트를 하다보면 여러 가지 이유로 특정 Python 버전을 사용해서 작업을 해야한다. 이런 경우에는 아래 명령어와 같이 사용할 파이썬 버전의 실행파일 위치를 지정해서 특정 버전의 Python을 사용하도록 하면 된다.  

```powershell
# basic command
> [your_python_location] -m venv [venv_name]

# my case
> C:\programming\Python\Python310\python.exe -m venv [venv_name]
> C:\programming\Python\Python311\python.exe -m venv [venv_name]
```

💡 참고로 이렇게 여러 버전의 Python을 설치하게 되면 시스템 환경 변수를 기준으로 가장 위에 있는 Python을 기본 사용하게 된다.  
{:.note}

### 3. package 목록 관리

#### 3-1. 라이브러리 목록 생성

설치된 라이브러리 버전을 저장해서 파일로 생성 및 관리하는 방법으로, 위의 Python 버전 관리와 함께 가상환경을 사용하는 이유다.  

<sub>~~나는 이 방법을 모르는 두 사람이 라이브러리들의 이름과 버전을 복창하면서 지적확인하는 것을 본 적이 있다..~~</sub>  

아래와 같이 입력하면 라이브러리 리스트 파일을 생성한다. 일반적으로 `requirements.txt`파일로 생성하지만 다른 이름으로도 만들 수 있으며, `./requirements/` 디렉토리에 용도별(개발용/배포용/서버용 등)로 나누어서 라이브러리를 관리하기도 한다.  

```powershell
> pip freeze > requirements.txt
```

#### 3-2. 라이브러리 목록 전체 설치/삭제

위에서 만든 `requirements.txt`의 목록대로 라이브러리를 설치하는 명령어는 아래와 같다.  

```powershell
> pip install -r requirements.txt
```

`requirements.txt`의 목록대로 라이브러리를 삭제하는 명령어는 아래와 같다.  

```powershell
> pip uninstall -r requirements.txt
```

이때 모든 라이브러리에 대해 하나하나 삭제 확인 명령을 내려줘야 하기 때문에 매우 귀찮은데, 아래와 같이 `-y` 옵션을 사용하면 추가 확인 없이 삭제한다.  

```powershell
> pip uninstall -r requirements.txt -y
```

### 4. 라이브러리 버전 관리

#### 4-1. 특정 버전의 라이브러리 설치

특정 버전의 라이브러리를 설치하고 싶을 때는 아래와 같이 명령어를 입력하면 된다. 라이브러리 간의 호환성이 중요한 경우나 신버전의 라이브러리에서 삭제된 구버전 기능을 사용하고 싶을 경우 사용한다.  

```powershell
> pip install [library_name]==[version]
```

#### 4-2. 라이브러리 업그레이드

라이브러리를 업그레이드하고 싶을 때는 아래와 같이 명령어를 입력하며 된다.  

```powershell
# 최신 버전으로 업그레이드
> pip install --upgrade [library_name]

# 특정 버전으로 업그레이드
> pip install --upgrade [library_name]==[version]
```

#### 4-3. 라이브러리 다운그레이드

라이브러리 간의 호환성 문제로 다운그레이드 할 때는 라이브러리를 삭제하고 재설치 하면 된다. 또는 아래와 같이 `--force-reinstall`을 통해 강제로 삭제하고 재설치하는 방법도 있다.  

```powershell
> pip install [library_name]==[version] --force-reinstall
```

### 5. 그 외 알아두면 좋은 팁들

#### 5-1. 특정 python 버전 실행

`.py`파일을 특정 Python 버전으로 실행시키고 싶을 경우, 아래 명령어처럼 하면 된다고 한다.  

```powershell
> py -version .py
```

pip를 사용할 경우 아래 명령어처럼 하면 된다고 한다.  

```powershell
> py -version -m pip install virtualenv
```

**명백하게도, 가상환경을 사용하는 편이 훨씬 쉽고 안정적이다.** 특히 여러 프로젝트를 한 컴퓨터에서 동시에 작업하고 있다면 더더욱 그렇다.  

#### 5-2. 가상환경 삭제

Python 가상환경을 삭제하는 별도의 명령어는 없다. 필요한 내용만 백업하고 폴더째로 지우면 된다.  

#### 5-3. 파이썬 가상환경을 옮기기

우선, **절대 추천하지 않는다.** 차라리 저장소에 필요한 파일들만 백업한 후 가상환경을 원하는 위치에 처음부터 다시 만드는게 속편하다. 그래도 반드시 옮겨야겠다면 이동 후 아래 세 파일들의 내용을 수정하면 된다고 한다.  

- activate
- activate.bat
- Activate.ps1

```
VIRTUAL_ENV=venv_location_b4 -> VIRTUAL_ENV=venv_location_now
```

나는 해보지 않아서 잘 되는지 모르겠다. 사실 시도해보고 싶지도 않다.  

---

## linux에서

대부분 윈도우와 다를바 없으니 차이점만 작성하기로 한다.  

### 1. 준비물

Ubuntu 업데이트

```powershell
$ sudo apt update && sudo apt upgrade
```

`python3` 업데이트

```powershell
$ sudo apt upgrade python3
```

`python3-pip` 설치

```powershell
$ sudo apt install python3-pip
```

`python3-venv` 설치

```powershell
$ sudo apt-get install python3-venv
```

### 2. ⚡ 특정 Python version 사용

사용하고 싶은 파이썬 버전 `*` 자리에 입력 (e.g. `python3.7`)  

```powershell
$ python* -m venv [venv_name]
```

### 3. 가상환경 실행

리눅스에서 Python 가상환경을 실행하는 명령어는 아래와 같다.  

```powershell
$ source bin/activate
```

---
## Reference
- [Python Documentation: Virtual Environments and Packages](https://docs.python.org/3/tutorial/venv.html)([한글](https://docs.python.org/ko/3/tutorial/venv.html))