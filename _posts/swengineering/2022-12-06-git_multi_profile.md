---
published: true
layout: post
title: '[Git] 07. 멀티 프로필 사용법'
description: >
    한 컴퓨터에서 여러 git 계정 사용하기
categories: [SWEngineering]
tags: [git]
image:
    path: /assets/img/posts/git.png
related_posts:
    - _posts/swengineering/2022-12-04-gitignore.md
---
* toc
{:toc}

> The information manager from Hell. - Linus Benedict Torvalds

{% include series_git.html %}

## 개요

한 컴퓨터에서 저장소 별로 다른 Git 계정으로 관리하고 싶을 때 사용할 수 있는 방법은 아래 두 가지가 있다.  

- 저장소 별 사용자 설정
- ssh 인증키 사용

## 1. workspace configuration

특정 폴더에서 해당 워크스페이스의 사용자를 설정하는 방법은 아래와 같다.  

```powershell
$ git config user.name "{YOUR_NAME}"
$ git config user.email {your@email.com}
```

## 2. ssh 사용하기

ssh를 사용하여 계정별로 ssh key를 만들고 자동 로그인하도록 설정한다.  

### 2-1. ssh key 생성

ssh key를 관리하는 `.ssh` 폴더는 `C:\Users\{user_name}` 디렉토리 아래에 있는데, Bash를 사용하면 `cd ~/.ssh` 명령어로 한번에 갈 수 있다.  

ssh key를 만드는 명령어는 아래와 같다.  

```powershell
# basic command
$ ssh-keygen -t rsa -C "{YOUR_EMAIL}" -f "{YOUR_NAME}"

# example
$ ssh-keygen -t rsa -C "djccnt15@gmail.com" -f "djccnt15"
```
```
Generating public/private rsa key pair.
```

비밀번호를 만드는게 권장사항인데, 새로운 터미널을 킬 때마다 매번 비밀번호를 입력해야하는게 귀찮긴 하다. 선택은 자유  

```powershell
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```
```
Your identification has been saved in djccnt15
Your public key has been saved in djccnt15.pub
The key fingerprint is:
SHA256:********************** djccnt15@gmail.com
The key's randomart image is:
...
```

ssh key는 파일로 생성되니 `ls` 명령어를 통해 생성을 확인할 수 있다.  

```powershell
$ ls -l
```
```
-rw-r--r-- 1 username 197121 2602 10월 24 10:41 djccnt15
-rw-r--r-- 1 username 197121  572 10월 24 10:41 djccnt15.pub
```

`pub`가 붙은 파일과 안 붙은 파일이 생성된 것을 볼 수 있는데, 안 붙은 파일이 로컬에서 제출할 개인키고, 붙은 파일이 서버에서 대조할 공개키이다.  

### 2-2. ssh-agent 등록

ssh-agent를 등록해야 ssh key를 통해서 접근할 수 있다. `ssh-agent`를 실행해야한다.  

```powershell
$ eval $(ssh-agent -s)
```
```
Agent pid 731
```

표시되는 `pid` 값은 매번 달라진다. `ssh-agent`를 실행한 후에는 `ssh-add` 명령어를 통해 생성한 ssh key를 등록해준다.  

```powershell
# basic command
$ ssh-add {YOUR_NAME}

# example
$ ssh-add djccnt15
```
```
Identity added: djccnt15 (djccnt15@gmail.com)
```

`ssh-agent` 등록을 확인하는 명령어는 아래와 같다.  

```powershell
$ ssh-add -l
```
```
3072 SHA256:********************** djccnt15@gmail.com (RSA)
```

### 2-3. ssh config 설정

`.ssh` 폴더의 `config` 파일에서 아래와 같이 ssh key 설정 정보를 확인할 수 있다.  

```
Host github.com
  HostName github.com
  User djccnt15@email.com
  IdentityFile ~/.ssh/djccnt15
```

`Host`를 통해 등록을 구분하며, `HostName`으로 접속할 경우, `User` 계정과 `IdentifyFile`에 지정된 인증키로 사용자 인증을 진행한다.  

### 2-4. git 호스트에 ssh 키 등록

`{YOUR_NAME}.pub` 파일의 내용을 설정의 ssh키 등록하는 곳에 등록해야한다. 편집기 프로그램을 사용해서 확인해도 되고, 아래와 같이 `cat` 명령어를 사용해도 된다.  

```powershell
$ cat djccnt15.pub
```

Github의 경우 ssh 키를 아래와 같이 설정에 있는 SSH and GPG keys 메뉴에서 등록하면 된다.  

![github_sshkey_01](/assets/img/posts/github_sshkey_01.png)
{:.border-image}

### 2-5. 연결 확인

ssh 연결을 테스트하는 명령어는 아래와 같다.  

```powershell
$ ssh -T git@github.com
```

최초로 연결하면 아래와 같이 연결 확인이 뜬다.  

```
The authenticity of host 'github.com (20.200.245.247)' can't be established.
ED25519 key fingerprint is **************************************************.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi djccnt15! You've successfully authenticated, but GitHub does not provide shell access.
```

### 2-6. ssh로 clone 받기

위와 같이 모든 준비가 끝나면 git 저장소에서 ssh를 통해 `clone`, `pull`, `push`를 할 수 있다.  

![github_sshkey_02](/assets/img/posts/github_sshkey_02.png)
{:.border-image}

## 3. ⚡ 작업용 명령어

[ssh-agent를 자동 실행하는 프로그램](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/working-with-ssh-key-passphrases#auto-launching-ssh-agent-on-git-for-windows)을 만들어두는게 아닌 이상 매번 터미널을 킬 때마다 ssh-agent를 새로 시작해줘야 한다.  

ssh-agent 시작과 ssh key 등록을 한번에 하는 명령어는 아래와 같다. 참고로 위에서 ssh key를 생성할 때 비밀번호를 등록했다면 매번 비밀번호를 입력해줘야 해서 불편하지만, 대신 보안성을 조금 확보할 수 있다.  

```powershell
# basic command
$ eval $(ssh-agent -s) ssh-add ~/.ssh/{YOUR_KEY}

# example
$ eval $(ssh-agent -s) ssh-add ~/.ssh/djccnt15
```

---
## Reference
- [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Can I specify multiple users for myself in .gitconfig?](https://stackoverflow.com/questions/4220416/can-i-specify-multiple-users-for-myself-in-gitconfig)
- [Is it possible to have different Git configuration for different projects?](https://stackoverflow.com/questions/8801729/is-it-possible-to-have-different-git-configuration-for-different-projects)
- [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/enterprise/2.16/user/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Adding a new SSH key to your GitHub account](https://docs.github.com/en/enterprise/2.16/user/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
- [컴퓨터 한대로 github 여러 계정 사용하기](https://www.irgroup.org/posts/github-%EC%BB%B4%ED%93%A8%ED%84%B0-%ED%95%9C%EB%8C%80%EB%A1%9C-%EC%97%AC%EB%9F%AC-%EA%B3%84%EC%A0%95-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)
- [한 컴퓨터에서 github 계정 여러개 사용하기](https://usingu.co.kr/frontend/git/%ED%95%9C-%EC%BB%B4%ED%93%A8%ED%84%B0%EC%97%90%EC%84%9C-github-%EA%B3%84%EC%A0%95-%EC%97%AC%EB%9F%AC%EA%B0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)