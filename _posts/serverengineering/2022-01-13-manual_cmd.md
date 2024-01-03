---
published: true
layout: post
title: '[cmd/terminal] 사용법'
description: >
    Windows/Linux terminal의 유용한 명령어 모음  
categories: [ServerEngineering]
tags: [cmd, terminal, ⭐starred]
image:
    path: /assets/img/posts/thumbnail_terminal.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. 기본 사용 팁

### 1-1. help/\-\-help

명령어 설명 보기  

- Windows

```bat
help cls
```

- Linux

```bash
clear --help
```

### 1-2. esc/ctrl + u/k

작성중이던 명령어 라인 전체 삭제  

Linux는 Windows의 `esc`에 대응하는 기능의 단축키가 없음  

- `ctrl + u`: 커서의 왼쪽 내용 삭제
- `ctrl + k`: 커서의 오른쪽 내용 삭제

### 1-3. type/cat

파일의 내용 출력  

- Windows

```bat
type <file_name>
```

- Linux

```bash
cat <file_name>
```

### 1-4. more

파일 내용을 한 페이지씩 출력  

```bash
more <file_name>
```

## 2. 작업용 명령어들

### 2-1. where/which/find

파일/어플리케이션의 위치 확인  

- Windows

```bat
where <app_name>
```

- Linux

```bash
# search application with first match in PATH option
which <app_name>

# search application with all matches in PATH option
which -a <app_name>

# search file
find <file_name>
```

이 때 `which`는 `PATH`에서 해당 이름을 가진 첫 번째 어플리케이션만을 검색하기 때문에 모두 검색하고 싶다면 `-a` 옵션 필요  

### 2-2. cd

change directory의 약자로, 작업중인 폴더 이동  

```bat
# 상위 디렉토리로 이동
cd ..

# 최상위 디렉토리로 이동
cd /

# 드라이브를 바꿀 때는 사용하지 않음
d:
```

아래는 Linux에서만 사용 가능한 사용팁들이다.  

```bash
# home 디렉토리로 이동
cd ~

# 이전 디렉토리로 이동
cd -
```

### 2-3. dir/ls

현재 디렉토리의 하위 폴더 및 파일을 보여주는 명령어, 와일드카드(*, ?) 사용 가능  

- Windows

```bat
dir
```

주요 옵션들은 아래와 같다.  

- `/p`: 출력이 너무 많아 화면이 꽉 차면 멈추면서 보여줌
- `/o:`: 정렬 옵션 추가
    - N  이름순(알파벳순)
    - S  크기순(가장 작은 항목부터)
    - E  확장명순(알파벳순)
    - D  날짜/시간순(가장 오래된 항복부터)
    - G  그룹 디렉터리 먼저
    - -- 순서를 반대로 하는 접두사

```bat
dir /p/o:-ge
```

- Linux

```bash
ls
```

### 2-4. cls/clear

화면 정리

- Windows

```bat
cls
```

- Linux

```bash
clear
```

### 2-5. mkdir

디렉토리 만들기

```bat
mkdir <dir_name>
```

### 2-6. rmdir

디렉토리 지우기. Windows에서만 사용 가능  

```bat
rmdir <dir_name>
```

- `/s`: 지정된 디렉토리와 하위 디렉토리 및 파일을 모두 삭제
- `/q`: `/s` 옵션으로 하위 디렉토리 및 파일을 지울 때 확인 없이 모두 삭제

```bat
rmdir /s/q <dir_name>
```

### 2-7. del/rm

파일 삭제  

- Windows

```bat
del <file_name>
```

- Linux

```bash
rm <file_name>
```

하위 디렉토리 및 파일 모두 삭제  

```bash
rm -rf <dir_name>
```

### 2-8. copy/cp

파일 복사

- Windows

```bat
copy <source> <destination>
```

- Linux

```bash
cp <file_name> <destination>
```

```bash
cp -r <dir_name> <destination>
```

### 2-9. tasklist/ps

프로세스 리스트를 확인하는 명령어  

- Windows

```bat
tasklist
```

- Linux

```bash
ps
```

다른 사용자가 실행한 모든 작업 목록 모두 확인

```bash
ps -ef
```

### 2-10. taskkill/kill

프로세스 종료 명령어  

- Windows

```bat
taskkill /pid <PID> /f
```

- Linux

```bash
kill -15 <PID>
```

```bash
kill -9 <PID>
```

## 3. 네트워크 관련 명령어들

### 3-1. ipconfig/ifconfig

네트워크 연결 상태 확인

- Windows

```bat
ipconfig
```

- Linux

```bash
ifconfig
```

### 3-2. ping

특정 호스트와 통신이 가능한지 확인. 명령어는 같지만 옵션은 조금 다르다.  

```bat
ping <host_name>
```

- Windows
    - `-t`: 중지시킬 때까지 에코를 계속 요청. 이 옵션을 주지 않으면 일정 횟수 요청 후 자동 종료
    - `-n`: count 에코를 요청할 횟수 count 숫자로 지정

- Linux
    - `-c`: count 에코를 요청할 횟수 count 숫자로 지정. 이 옵션을 주지 않으면 무한대로 에코 요청

### 3-3. ssh

터미널을 통해 원격 서버에 ssh 연결하는 명령어

```bat
ssh [id]@[ip] -p [port]
```

## 4. 환경 관련 명령어들

### 4-1. set

cmd에서 환경 변수를 보여주는 명령어

```bat
set
```

특정 문자로 시작하는 환경 변수 호출

```bat
set <x>
```

환경 변수 중 컴퓨터 이름 호출

```bat
set COMPUTERNAME
```

### 4-2. tree

현재 경로의 폴더 구조를 tree 형식으로 보여준다. Windows에서만 사용 가능  

```bat
tree
```

파일까지 출력  

```bat
tree /f
```

출력 결과를 파일로 저장  

```bat
tree > <file_name>
```

## 5. 💡프로그램 실행용 명령어

### 5-1. nohub

Linux 계열에서 프로그램을 백그라운드로 실행하여 터미널이 종료되도 프로그램이 종료되지 않도록 하는 명령어  

```bash
nohub <app_name> &
```

리눅스에서는 `&`을 붙이면 백그라운드로 실행하라는 뜻인데, 단순히 `&`을 붙여서만 실행하면 터미널을 종료할 경우 같이 실행이 같이 종료됨  

데몬 형태로 프로그램을 실행시켜 로그아웃으로 세션이 종료 되어도 프로그램이 계속 실행중이도록하는 `nohub` 명령어를 같이 사용해야 함  

💡최신 버전의 OS들은 `&`만 사용해도 `nohub` 명령어를 사용한 것과 동일하게 작동하기도 한다.  
{:.note}

### 5-2. start

윈도우에서 프로그램을 실행하기 위한 명령어. 새로운 터미널을 실행시키기 때문에 기존 터미널에서 사용중이던 변수를 사용할 수 없지만, 하나의 batch 파일이 여러 개의 프로그램을 실행시킬 수 있음  

```bat
start /min <app_name>
```

- `/MIN`: 최소화 실행

`start` 명령어를 활용한 Python 가상환경 및 프로그램 실행 예시  

```bat
start .venv\Scripts\python.exe main.py

start /MIN .venv\Scripts\python.exe main.py
```

### 5-3. call

윈도우 터미널에서 새로운 터미널을 호출하는 명령어. `start` 명령어와 비슷하지만 현재 터미널에서 실행하기 때문에 기존에 사용중인 변수를 그대로 사용할 수 있음  

```bat
call <app_name>
```

`call` 명령어를 활용한 Python 가상환경 및 프로그램 실행 예시  

```bat
call .venv\Scripts\python.exe main.py
```
