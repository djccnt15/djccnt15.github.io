---
slug: docker-commands
title: 도커 기초 명령어
date:
    created: 2023-06-11
description: >
    도커 활용을 위한 기초 명령어들
categories:
    - Server Engineering
tags:
    - docker
---

도커 활용을 위한 기초 명령어들  

<!-- more -->

---

## 기초 팁

- 명령어 도움말 보기

```bat
docker [CMD] --help
```

## 이미지 관련

### Dockerfile 빌드

`Dockerfile` 파일을 작성한 후 `Dockerfile`로 이미지를 빌드하는 방법은 아래와 같다.  

```bat
docker build -t [IMAGE_NAME:TAG_NAME] [DOCKERFILE_PATH]
```

```bat
docker build -t my_image .
```

!!! info
    `-t` 옵션에서 태그 이름 미입력 시 이미지 `tag`가 자동으로 `latest`로 지정된다.  

### docker-compose 활용 관련

- `docker-compose.yaml` 빌드

```bat
docker-compose up --build -d
```

- `docker-compose.yaml`로 빌드한 이미지 삭제

```bat
docker-compose down
```

- `docker-compose.yaml`의 configuration 확인

```bat
docker compose config
```

### 이미지 다운로드

```bat
docker pull [URL]
```

### 이미지 삭제

```bat
docker rmi [IMAGE]
```

```bat
docker image rm [IMAGE]
```

### 이미지 목록 보기

```bat
docker image ls
```

### 이미지 저장 및 로드

- 이미지를 tar 파일로 저장

```bat
docker save -o [FILENAME] [IMAGE]
```

- tar 파일을 이미지로 변환

```bat
docker load -i [FILENAME]
```

## 컨테이너 관련

### 컨테이너 목록 보기

- 실행중인 컨테이너 목록 보기

```bat
docker ps
```

- 생성된 컨테이너 전체 목록 보기

```bat
docker ps -a
```

### 컨테이너 생성

- 생성 및 접속

```bat
docker run [IMAGE]
```

- ++ctrl+p+q++를 통해 접속 해지가 가능한 TTY 접속

```bat
docker run -itd [IMAGE]
```

- 단순 컨테이너 생성

```bat
docker create [IMAGE]
```

### 컨테이너 삭제

```bat
docker rm [CONTAINER]
```

### 컨테이너 환경설정 확인

- 해당 컨테이너의 전체 환경 변수 확인

```bat
docker exec [CONTAINER] env
```

### 컨테이너 접속

- 해당 컨테이너의 root 프로세스에 콘솔 접근

```bat
docker attach [CONTAINER]
```

!!! tip
    `docker attach` 명령어로 접속할 경우 docker 커맨드가 전달되는 외부 환경의 표준 입출력이 컨테이너의 root 프로세스의 표준입출력과 연결되는 상태이기 때문에 `exit` 명령을 하는 경우 컨테이너 자체가 종료 된다.  

- 컨테이너의 bash 프로세스 실행 및 접속

```bat
docker exec -it [CONTAINER] /bin/bash
```

!!! note
    `exec` 명령어는 실행중인 컨테이너에서 입력된 명령어를 실행하는 명령어이다.  

    따라서 위와 같이 입력하게 되면 docker 컨테이너 내에 새로운 프로세스를 실행시키고 그 프로세스를 `/bin/bash`로 정한 것이기 때문에 컨테이너 내에 `/bin/bash`가 존재할 경우에만 사용할 수 있다는 단점이 있다.  

    그러나 root 프로세스에 콘솔 접근을 한 것이 아니라 별도로 실행한 `bash` 터미널 프로세스를 통해 접속한 것이기 때문에 `exit` 명령어로 접속을 종료해도 컨테이너가 종료되지 않는다.  

### 컨테이너 접속 종료

- ++ctrl+p+q++ : 컨테이너를 끄지 않고 접속 종료
    - `-itd` 옵션으로 실행 했을 때만 사용 가능
- ++ctrl+c++ : 컨테이너 접속 종료 및 컨테이너 종료
- `exit`: 현재 프로세스 종료

### 컨테이너 실행/정지

```bat
docker start [CONTAINER]
```

```bat
docker stop [CONTAINER]
```

### 파일 복사

- 로컬 환경 → 컨테이너

```bat
docker cp [SRC_PATH] [CONTAINER]:[DEST_PATH]
```

- 컨테이너 → 로컬 환경

```bat
docker cp [CONTAINER]:[SRC_PATH] [DEST_PATH]
```

### 컨테이너 저장

- 컨테이너를 tar 파일로 저장

```bat
docker export -o [FILENAME] [CONTAINER]
```

- tar 파일을 컨테이너로 변환

```bat
docker import [FILENAME] [REPOSITORY[:TAG]]
```

### 컨테이너 수정본 생성

컨테이너 내부에서 작업을 한 뒤, 해당 수정 사항을 반영한 이미지를 새로 생성

```bat
docker commit [OPTIONS] [CONTAINER] [REPOSITORY[:TAG]]
```
