---
slug: terminal-manual
title: cmd/terminal 기초 매뉴얼
date:
    created: 2022-01-13
description: >
    Windows/Linux terminal의 유용한 명령어 모음
categories:
    - Server Engineering
tags:
    - cmd
    - terminal
---

Windows/Linux terminal의 유용한 명령어 모음  

<!-- more -->

---

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

- ++ctrl+u++ : 커서의 왼쪽 내용 삭제
- ++ctrl+k++ : 커서의 오른쪽 내용 삭제

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

파일/애플리케이션의 위치 확인  

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

이 때 `which`는 `PATH`에서 해당 이름을 가진 첫 번째 애플리케이션만을 검색하기 때문에 모두 검색하고 싶다면 `-a` 옵션 필요  

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
    - `N`  이름순(알파벳순)
    - `S`  크기순(가장 작은 항목부터)
    - `E`  확장명순(알파벳순)
    - `D`  날짜/시간순(가장 오래된 항복부터)
    - `G`  그룹 디렉토리 먼저
    - `-` 순서를 반대로 하는 접두사

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

# 하위 디렉토리 및 파일 모두 삭제  
rm -rf <dir_name>
```

### 2-8. copy/cp

파일 및 디렉토리 복사 명령어

- Windows

```powershell
# 파일 복사
copy <source> <destination>

# 디렉토리 복사
xcopy <source> <destination>

# 디렉토리 복사
robocopy <source> <destination>
```

- Linux

```bash
# 파일 복사
cp <file_name> <destination>

# 디렉토리 복사
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
# 기본 설정, 애플리케이션에게 종료 요청
kill -15 <PID>  # (1)!

# 애플리케이션 직접 종료
kill -9 <PID>
```

1. 애플리케이션이 해당 요청을 종료로 처리하지 않을 경우 효력 없음

### 2-11. 파일 생성

- Windows

```bat
copy con <file_name>
```

!!! note "사용법"
    cmd에서 `copy con` 명령어 입력 -> 파일 내용 입력 -> ++ctrl+z++ 입력 -> ++enter++

- Linux

```bash
> <file_name>

touch <file_name>  # (1)!
```

1. `touch`는 원래 파일의 생성 및 수정 시간을 변경하는 명령어지만, 새로운 파일을 만들기 위해서 사용할 수 있다.  

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
