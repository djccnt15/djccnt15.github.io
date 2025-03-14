---
slug: python-opencv-packages
title: Python OpenCV 패키지 종류
date:
    created: 2023-09-13
description: >
    Python OpenCV 패키지 종류별 차이
categories:
    - Vision
tags:
    - opencv
    - python
---

Python OpenCV 패키지 종류별 차이  

<!-- more -->

---

## OpenCV 종류별 차이

Python으로 포팅된 OpenCV를 설치하는건 당연히 pip를 사용하면 되는데, 종류가 여러 가지 있어 정리해둔다.  

- [opencv-python](https://pypi.org/project/opencv-python/)
    - 메인 모듈만 설치, 일반 데스크탑 환경용
- [opencv-python-headless](https://pypi.org/project/opencv-python-headless/)
    - 메인 모듈만 설치, 화면이 없는 서버 환경용
- [opencv-contrib-python](https://pypi.org/project/opencv-contrib-python/)
    - 전체 패키지 설치, 일반 데스크탑 환경용
- [opencv-contrib-python-headless](https://pypi.org/project/opencv-contrib-python-headless/)
    - 전체 패키지 설치, 화면이 없는 서버 환경용

!!! note
    headless 버전과 일반 버전이 동시에 설치되어 있을 경우 headless 버전이 우선된다.  

contrib 환경에서 추가되는 모듈은 [공식 문서](https://docs.opencv.org/4.x/)를 참고하자  

!!! info
    pip를 통해 설치하는 모든 패키지는 CPU만 사용가능한 버전이기 때문에, CUDA를 사용하기 위해선 가이드에 따라 수동으로 빌드해야 한다.  
