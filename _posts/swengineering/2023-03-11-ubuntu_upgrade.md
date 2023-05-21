---
published: true
layout: post
title: '[WSL] Ubuntu 버전 확인 및 업그레이드'
description: >
    WSL Ubuntu 버전 확인 및 업그레이드하는 방법
categories: [SWEngineering]
tags: [WSL]
image:
    path: /assets/img/posts/thumbnail_linux.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## WSL 버전 확인

Windows에서 linux용 프로그램을 사용하거나 linux 서버에서 구동할 프로그램을 개발할 때는 wsl을 사용한다. wsl의 버전을 확인하는 명령어는 아래와 같다.  

```powershell
wsl -l -v
```
```
  NAME            STATE           VERSION
* Ubuntu-22.04    Stopped         2
```

VERSION 항목이 해당 os가 설치된 WSL 버전이다.  

## Ubuntu 버전 확인

WSL Ubuntu를 기본 os로 제공하는데 이 Ubuntu의 버전을 확인하는 명령어는 두 가지가 있다.  

```bash
cat /etc/os-release
```
```
PRETTY_NAME="Ubuntu 22.04.1 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.1 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy
```

```bash
lsb_release -a
```
```
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.1 LTS
Release:        22.04
Codename:       jammy
```

## Ubuntu 업그레이드

Ubuntu를 업그레이드 하려면 아래와 같이 업그레이드 하려는 wsl로 진입한 후 평범하게 업그레이드 하면 된다.  

```powershell
wsl -d <Distro>
```

```bash
sudo apt update && sudo apt upgrade
```

```bash
sudo do-release-upgrade
```

아래와 같이 WSL 자체에서 Ubuntu 자체를 삭제해버린 후 Microsoft Store에서 원하는 버전을 다운 받아 설치하는 방법도 있다.  

```powershell
wsl --unregister <Distro>
```

---
## Reference
- [Upgrade Ubuntu in WSL2 from 20.04 to 22.04](https://askubuntu.com/questions/1428423/upgrade-ubuntu-in-wsl2-from-20-04-to-22-04)