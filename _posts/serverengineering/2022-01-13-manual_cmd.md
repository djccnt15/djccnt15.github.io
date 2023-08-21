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

### 1-1. help/--help

명령어 설명 보기  

- Windows

```powershell
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

```powershell
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

```powershell
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

```powershell
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

```powershell
dir
```

주요 옵션들은 아래와 같다.  

- /p 출력이 너무 많아 화면이 꽉 차면 멈추면서 보여줌
- /o: 정렬 옵션 추가
    - N  이름순(알파벳순)
    - S  크기순(가장 작은 항목부터)
    - E  확장명순(알파벳순)
    - D  날짜/시간순(가장 오래된 항복부터)
    - G  그룹 디렉터리 먼저
    - -- 순서를 반대로 하는 접두사

```powershell
dir /p/o:-ge
```

- Linux

```bash
ls
```

### 2-4. cls/clear

화면 정리

- Windows

```powershell
cls
```

- Linux

```bash
clear
```

### 2-5. mkdir

디렉토리 만들기

```powershell
mkdir <dir_name>
```

### 2-6. rmdir

디렉토리 지우기. Windows에서만 사용 가능  

```powershell
rmdir <dir_name>
```

- /s: 지정된 디렉토리와 하위 디렉토리 및 파일을 모두 삭제
- /q: /s 옵션으로 하위 디렉토리 및 파일을 지울 때 확인 없이 모두 삭제

```powershell
rmdir /s/q <dir_name>
```

### 2-7. del/rm

파일 삭제  

- Windows

```powershell
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

```powershell
copy <source> <destination>
```

- Linux

```bash
cp <file_name> <destination>
```

```bash
cp -r <dir_name> <destination>
```

### 2-9. 프로세스 리스트 확인

- Windows

```powershell
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

## 3. 네트워크 관련 명령어들

### 3-1. ipconfig/ifconfig

네트워크 연결 상태 확인

- Windows

```powershell
ipconfig
```

- Linux

```bash
ifconfig
```

### 3-2. ping

특정 호스트와 통신이 가능한지 확인. 명령어는 같지만 옵션은 조금 다르다.  

```powershell
ping <host_name>
```

- Windows
    - -t 중지시킬 때까지 에코를 계속 요청. 이 옵션을 주지 않으면 일정 횟수 요청 후 자동 종료
    - -n count 에코를 요청할 횟수 count 숫자로 지정

- Linux
    - -c count 에코를 요청할 횟수 count 숫자로 지정. 이 옵션을 주지 않으면 무한대로 에코 요청

## 4. 환경 관련 명령어들

### 4-1. set

cmd에서 환경 변수를 보여주는 명령어

```powershell
set
```

특정 문자로 시작하는 환경 변수 호출

```powershell
set <x>
```

환경 변수 중 컴퓨터 이름 호출

```powershell
set COMPUTERNAME
```

### 4-2. tree

현재 경로의 폴더 구조를 tree 형식으로 보여준다. Windows에서만 사용 가능  

```powershell
tree
```

파일까지 출력  

```powershell
tree /f
```

출력 결과를 파일로 저장  

```powershell
tree > <file_name>
```