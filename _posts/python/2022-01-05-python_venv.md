---
published: true
layout: post

title: Python 가상환경
description: >
  windows와 linux에서 python 가상환경 만들고 사용하기
hide_description: false
image: 
  path: /assets/img/posts/python_venv.png
related_posts:
  - _posts/python/2022-01-06-about_PEP.md

categories:
  - python
tags:
  - ⭐starred
  - python
  - virtual environments
  - venv
---

* toc
{:toc}

Python은 패키지 버전관리가 까다롭기 때문에 프로젝트 별로 별도의 가상환경을 구축해서 사용하는 것이 좋다.  
`venv`, `pipenv`, `pyenv`, `conda` 등 여러가지 패키지를 통해서 가상환경을 구축할 수 있는데, 나는 Python 3.5 버전 이후부터 기본 모듈에 포함된 `venv`를 사용한다.  

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
몇몇 패키지들은 업데이트 속도가 느려서 최신 버전의 python과 호환되지 않는 경우가 종종 있다.  
머신러닝 계열의 거대 패키지들이 주로 그런데, 이런 패키지들을 사용할 때는 특정 버전의 python 가상환경을 만들 필요가 있다.  

아래 명령어에서 `*` 자리에 사용하고 싶은 파이썬 버전을 입력하자  
나의 경우에는 `C:\python\Python*\python.exe`경로로 python을 설치하기 때문에, python 3.9를 사용하고 싶을 때는 `C:\python\Python39\python.exe -m venv [venv_name]`를 입력한다.

```powershell
> C:\python\Python*\python.exe -m venv [venv_name]
```

### 3. package 목록 관리
#### 3-1. 패키지 목록 생성
설치된 패키지 버전을 저장해서 파일로 생성 및 관리하는 방법으로, 위의 python 버전 관리와 함께 가상환경을 사용하는 이유다.  
<sub>~~나는 이 방법을 모르는 두 사람이 패키지들의 이름과 버전을 복창하면서 지적확인하는 것을 본 적이 있다..~~</sub>  
아래와 같이 입력하면 패키지 파일을 생성한다. 일반적으로 `requirements.txt`파일로 생성하지만 다른 이름으로도 만들 수 있으며, `./requirements/` 디렉토리에 용도별(개발용/배포용/서버용 등)으로 나누어서 패키지를 관리하기도 한다.  

```powershell
> pip freeze > requirements.txt
```

#### 3-2. 패키지 목록 전체 설치/삭제
위에서 만든 `requirements.txt`의 목록대로 패키지를 설치하는 명령어는 아래와 같다.

```powershell
> pip install -r requirements.txt
```

`requirements.txt`의 목록대로 패키지를 삭제하는 명령어는 아래와 같다.

```powershell
> pip uninstall -r requirements.txt
```

이때 모든 패키지 하나하나 삭제 확인 명령을 내려줘야 하기 때문에 매우 귀찮은데 `-y` 옵션을 사용하면 추가 확인없이 삭제한다.

```powershell
> pip uninstall -r requirements.txt -y
```

### 4. package 버전 관리
#### 4-1. 패키지의 특정 버전 설치
패키지의 특정 버전을 설치하고 싶을 때는 아래와 같이 명령어를 입력하면 된다.  
패키지 간의 호환성이 중요한 경우나 신버전의 패키지에서 삭제된 구버전 기능을 사용하고 싶을 경우 사용한다.

```powershell
pip install [package_name]==[version]
```

#### 4-2. 패키지 업그레이드
패키지를 업그레이드하고 싶을 때는 아래와 같이 명령어를 입력하며 된다.

```powershell
pip install --upgrade [package_name]
```

#### 4-3. 패키지 다운그레이드
패키지 간의 호환성 문제로 다운그레이드 할 때는 패키지를 삭제하고 재설치 하면 된다.  
또는 아래와 같이 `--force-reinstall`을 통해 강제로 삭제하고 재설치하는 방법도 있다.  

```powershell
pip install [package_name]==[version] --force-reinstall
```

### 5. 그 외 알아두면 좋은 팁들
#### 5-1. 특정 python 버전 실행
`.py`파일을 특정 python 버전으로 실행시키고 싶을 경우, 아래 명령어처럼 하면 된다고 한다.

```powershell
py -version .py
```

pip를 사용할 경우 아래 명령어처럼 하면 된다고 한다.

```powershell
py -version -m pip install virtualenv
```

**명백하게도, 가상환경을 사용하는 편이 훨씬 쉽고 안정적이다.** 특히 여러 프로젝트를 한 컴퓨터에서 동시에 작업하고 있다면 더더욱 그렇다.  

#### 5-2. 가상환경 삭제
python 가상환경을 삭제하는 별도의 명령어는 없다.  
필요한 내용만 백업하고 폴더째로 지우면 된다.  

#### 5-3. 파이썬 가상환경을 옮기기
우선, **절대 추천하지 않는다.**  
차라리 저장소에 필요한 파일들만 백업한 후 가상환경을 원하는 위치에 처음부터 다시 만드는게 속편하다.  
그래도 반드시 옮겨야겠다면 이동 후 아래 세 파일들의 내용을 수정하면 된다고 한다.

0. activate
0. activate.bat
0. Activate.ps1

```markdown
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

python3 업데이트

```powershell
$ sudo apt upgrade python3
```

python3-pip 설치

```powershell
$ sudo apt install python3-pip
```

python3-venv 설치

```powershell
$ sudo apt-get install python3-venv
```

### 2. ⚡ 특정 Python version 사용
사용하고 싶은 파이썬 버전 `*` 자리에 입력 (e.g. python3.7)

```powershell
$ python* -m venv [venv_name]
```

### 3. 가상환경 실행
리눅스에서 python 가상환경을 실행하는 명령어는 아래와 같다.

```powershell
$ source bin/activate
```

---
## Reference
- [Python Documentation](https://docs.python.org/3/tutorial/venv.html)([한글](https://docs.python.org/ko/3/tutorial/venv.html))