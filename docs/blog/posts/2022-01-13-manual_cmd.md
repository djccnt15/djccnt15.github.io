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

### help/\-\-help

명령어 설명 보기  

- Windows

```bat
help cls
```

- Linux

```sh
clear --help
```

### esc/ctrl + u/k

작성중이던 명령어 라인 전체 삭제  

Linux는 Windows의 `esc`에 대응하는 기능의 단축키가 없음  

- ++ctrl+u++ : 커서의 왼쪽 내용 삭제
- ++ctrl+k++ : 커서의 오른쪽 내용 삭제

### 파일 내용 출력

파일의 내용 전체 출력  

- Windows

```bat
type <file_name>
```

- Linux

```sh
cat <file_name>
```

파일 내용을 한 페이지씩 출력  

- Windows

```bat
more <file_name>
```

- Linux

```sh
less <file_name>
```

## 2. 작업용 명령어들

### alias

command 라인 단축 명령어 설정 및 관리

```sh
# 전체 alias 목록
alias

# 새로운 alias 등록 - 터미널 종료 시 삭제
alias <alias_name>='<command>'
```

새로운 alias 영구 등록 방법

1. `.bashrc` 파일 생성 및 편집
    ```sh
    vim ~/.bashrc
    ```
1. `.bashrc` 파일에 명령어 등록
    ```sh
    alias <alias_name>='<command>'
    ```
1. `.bashrc` 파일 실행
    ```sh
    source ~/.bashrc
    ```

### where/which/find

파일/애플리케이션의 위치 확인  

- Windows

```bat
where <app_name>
```

- Linux

```sh
# search application with first match in PATH option
which <app_name>

# search application with all matches in PATH option
which -a <app_name>

# search file in current directory
find <file_name>

# search file with case-sensitive name in whole system
find / -name <filename>

# search file with case-insensitive name in whole system
find / -iname <filename>
```

이 때 `which`는 `PATH`에서 해당 이름을 가진 첫 번째 애플리케이션만을 검색하기 때문에 모두 검색하고 싶다면 `-a` 옵션 필요  

### cd

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

```sh
# home 디렉토리로 이동
cd ~

# 이전 디렉토리로 이동
cd -
```

### dir/ls

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

```sh
ls

# 권한 등 상세 정보 표시
ls -l
```

### cls/clear

화면 정리

- Windows

```bat
cls
```

- Linux

```sh
clear
```

### mkdir

디렉토리 만들기

```bat
mkdir <dir_name>
```

### rmdir

디렉토리 지우기. Windows에서만 사용 가능  

```bat
rmdir <dir_name>
```

- `/s`: 지정된 디렉토리와 하위 디렉토리 및 파일을 모두 삭제
- `/q`: `/s` 옵션으로 하위 디렉토리 및 파일을 지울 때 확인 없이 모두 삭제

```bat
rmdir /s/q <dir_name>
```

### del/rm

파일 삭제  

- Windows

```bat
del <file_name>
```

- Linux

```sh
rm <file_name>

# 하위 디렉토리 및 파일 모두 삭제  
rm -rf <dir_name>
```

### copy/cp

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

```sh
# 파일 복사
cp <file_name> <destination>

# 디렉토리 복사
cp -r <dir_name> <destination>
```

### move/mv

파일 및 디렉토리 이동 명령어

- Windows

```powershell
move <source> <destination>

# 여러 파일 복사
move C:\source\*.* C:\dest\
```

- Linux

```sh
mv <file_name> <destination>

# 덮어쓰기 금지
mv -n <file_name> <destination>

# 여러 파일 복사
mv file1.txt file2.txt file3.txt /dest/
```

### tasklist/ps

프로세스 리스트를 확인하는 명령어  

- Windows

```bat
tasklist
```

- Linux

```sh
ps
```

다른 사용자가 실행한 모든 작업 목록 모두 확인

```sh
ps -ef
```

### taskkill/kill

프로세스 종료 명령어  

- Windows

```bat
taskkill /pid <PID> /f
```

- Linux

```sh
# 기본 설정, 애플리케이션에게 종료 요청
kill -15 <PID>  # (1)!

# 애플리케이션 직접 종료
kill -9 <PID>
```

1. 애플리케이션이 해당 요청을 종료로 처리하지 않을 경우 효력 없음

### 파일 생성

- Windows

```bat
copy con <file_name>
```

!!! note "사용법"
    cmd에서 `copy con` 명령어 입력 -> 파일 내용 입력 -> ++ctrl+z++ 입력 -> ++enter++

- Linux

```sh
> <file_name>

touch <file_name>  # (1)!
```

1. `touch`는 원래 파일의 생성 및 수정 시간을 변경하는 명령어지만, 새로운 파일을 만들기 위해서 사용할 수 있다.  

### 현재 날짜/시간

- Windows

```bat
date /t

time /t
```

- Linux

```sh
date -I[FMT]

date -Iminutes

date -Iseconds
```

### findstr/grep

문자열의 패턴을 검사하는 명령어. [`set`](#setexport)이나 [`where`](#wherewhichfind)와 같은 목록 출력 명령어와 조합하여 활용한다.  

```bat
set | findstr "FLASK."
```

```sh
env | grep ^FLASK
```

!!! tip
    `|`는 앞 명령어에서 확인된 리스트를 뒤 명령어로 전달한다.  

!!! info
    `findstr`에 대한 자세한 내용은 [MS 공식문서 - findstr](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/findstr)를 참고하자.  

## 3. 네트워크 관련 명령어들

### ipconfig/ifconfig

네트워크 연결 상태 확인

- Windows

```bat
ipconfig
```

- Linux

```sh
ifconfig
```

### ping

특정 호스트와 통신이 가능한지 확인. 명령어는 같지만 옵션은 조금 다르다.  

```bat
ping <host_name>
```

- Windows
    - `-t`: 중지시킬 때까지 에코를 계속 요청. 이 옵션을 주지 않으면 일정 횟수 요청 후 자동 종료
    - `-n`: count 에코를 요청할 횟수 count 숫자로 지정

- Linux
    - `-c`: count 에코를 요청할 횟수 count 숫자로 지정. 이 옵션을 주지 않으면 무한대로 에코 요청

### ssh

터미널을 통해 원격 서버에 ssh 연결하는 명령어

```bat
ssh [id]@[ip] -p [port]
```

## 4. 환경 관련 명령어들

### set/export

환경 변수를 설정하고 확인하는 명령어

- Windows

환경 변수 출력

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

환경 변수 설정

```bat
set <variable>=<string>
```

- Linux

환경 변수 출력

```sh
env
```

```sh
printenv
```

```sh
export -p
```

환경 변수 설정

```sh
export <variable>=<string>
```

### tree

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
