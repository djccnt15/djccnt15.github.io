---
published: true
layout: post
title: '[Docker] 도커 기초 명령어'
description: >
    도커 활용을 위한 기초 명령어들
categories: [SWEngineering]
tags: [docker]
image:
    path: /assets/img/posts/thumbnail_docker.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 명령어 도움말 보기

```bash
docker [CMD] --help
```

## 이미지 관련

### 이미지 다운로드

```bash
docker pull [URL]
```

### 이미지 삭제

```bash
docker rmi [ID]
```

### 이미지 목록 보기

```bash
docker image ls
```

## 컨테이너 관련

### 컨테이너 목록 보기

```bash
docker ps
```

```bash
docker ps -a
```

### 컨테이너 생성

- 생성 및 접속

```bash
docker run [ID]
```

- `^P^Q`를 통해 접속 해지가 가능한 TTY 접속

```bash
docker run -itd [ID]
```

- 단순 컨테이너 생성

```bash
docker create [ID]
```

### 컨테이너 삭제

```bash
docker rm [ID]
```

### 컨테이너 접속

- 해당 컨테이너의 root 프로세스에 콘솔 접근

```bash
docker attach [ID]
```

❗`docker attach` 명령어로 접속할 경우 docker 커맨드가 전달되는 외부 환경의 표준 입출력이 컨테이너의 root 프로세스의 표준입출력과 연결되는 상태이기 때문에 `exit` 명령을 하는 경우 컨테이너 자체가 종료 된다.  
{:.note title='attention'}

- 컨테이너의 bash 프로세스 실행 및 접속

```bash
docker exec -it [CONTAINER_ID] bin/bash
```

`docker exec` 명령어는 docker 컨테이너 내에 새로운 프로세스를 실행시키고 그 프로세스를 `/bin/bash`로 정한 것이기 때문에 컨테이너 내에 `/bin/bash`가 존재할 경우에만 사용할 수 있다는 단점이 있다.  

그러나 root 프로세스에 콘솔 접근을 한 것이 아니라 별도로 실행한 `bash` 터미널 프로세스를 통해 접속한 것이기 때문에 `exit` 명령어로 접속을 종료해도 컨테이너가 종료되지 않는다.  

**💡컨테이너 나오기**

- `^P^Q`: 컨테이너를 끄지 않고 접속 종료
    - `-itd` 옵션으로 실행 했을 때만 사용 가능
- `^C`: 컨테이너 접속 종료 및 컨테이너 종료
- `exit`: 현재 프로세스 종료

### 컨테이너 정지

```bash
docker stop [ID]
```