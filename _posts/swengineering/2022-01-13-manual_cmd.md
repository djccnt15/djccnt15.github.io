---
published: true
layout: post
title: '[cmd/terminal] 사용법'
description: >
  windows cmd/linux terminal의 유용한 명령어 모음  
categories: [SWEngineering]
tags: [cmd/terminal, ⭐starred]
image:
  path: /assets/img/posts/cmd.png
related_posts:
  - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. 기본 사용 팁

### 1-1. help/--help

명령어 설명 보기. 사용법은 조금 달라서, 윈도우는 `help`를 먼저 치지만, linux에서는 `--help`가 뒤에 들어간다.  

```powershell
# windows
> help cls

# linux
$ clear --help
```

### 1-2. esc/ctrl + u

작성중이던 명령어 라인 전체 지우기  

terminal은 windows cmd의 `esc`에 대응하는 기능의 단축키가 없으며, `ctrl + u`는 엄밀히 말하면 커서의 왼쪽을 지우는 하는 단축키고, 커서 오른쪽을 지우는 단축키는 `ctrl + k`이다.  

## 2. 작업용 명령어들

### 2-1. where/which

파일 검색 명령어로 둘 다 추가 옵션은 없다.  

```powershell
# windows
> where python

# linux
$ which python
```

### 2-2. cd

change directory의 약자로, 작업중인 폴더를 이동하는 명령어이다. 주요 사용팁은 아래와 같다.  

```powershell
# 상위 디렉토리로 이동
> cd ..

# 최상위 디렉토리로 이동
> cd /

# 드라이브를 바꿀 때는 사용하지 않음
> d:
```

아래는 terminal에서만 사용가능한 사용팁들이다.  

```powershell
# home 디렉토리로 이동
$ cd ~

# 이전 디렉토리로 이동
$ cd -
```

### 2-3. dir/ls

현재 디렉토리의 하위 폴더 및 파일을 보여주는 명령어로 와일드카드(*, ?)를 사용해서 출력 범위를 줄일 수 있다.  

```powershell
# windows
# 기본 사용
> dir

# 옵션 사용
> dir /p/o:-ge
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
# linux
$ ls
```

### 2-4. cls/clear

화면 정리

```powershell
# windows
> cls

# linux
$ clear
```

### 2-5. mkdir

디렉토리 만들기

```powershell
> mkdir <directory_name>
```

### 2-6. rmdir

디렉토리 지우기. 윈도우의 경우에는 추가 옵션이 있다.  

```powershell
# 기본 사용
> rmdir <directory_name>

# 옵션 사용
> rmdir /s/q <directory_name>
```

- /s 지정된 디렉토리와 하위 디렉토리 및 파일을 모두 삭제
- /q /s 옵션으로 하위 디렉토리 및 파일을 지울 때 일일이 y를 해줘야 하는데, 이 옵션을 추가하면 다시 묻지 않음

### 2-7. del/rm

파일 지우기. 둘이 비슷하지만 리눅스는 하위 파일을 포함해서 디렉토리를 삭제할 때 이 명령어를 사용해야 하기 때문에 활용도가 더 높다.  

```powershell
# windows
> del <file_name>

# linux
$ rm <file_name>

# linux 하위 디렉토리 및 파일 지우기
$ rm -rf <dir_name>
```

### 2-8. copy/cp

파일 복사

```powershell
# windows
> copy <source> <destination>

# linux for file
$ cp <source> <destination>

# linux for directory
$ cp -r <source> <destination>
```

## 3. 네트워크 관련 명령어들

### 3-1. ipconfig/ifconfig

네트워크 연결 상태 확인

```powershell
# windows
> ipconfig

# linux
$ ifconfig
```

### 3-2. ping

특정 호스트와 통신이 가능한지 확인. 명령어는 같지만 옵션은 조금 다르다.  

```powershell
> ping <host_name>
```

윈도우 옵션  

- --t 중지시킬 때까지 에코를 계속 요청. 이 옵션을 주지 않으면 일정 횟수 요청 후 자동 종료
- --n count 에코를 요청할 횟수 count 숫자로 지정

리눅스 옵션  

- --c count 에코를 요청할 횟수 count 숫자로 지정. 이 옵션을 주지 않으면 무한대로 에코 요청