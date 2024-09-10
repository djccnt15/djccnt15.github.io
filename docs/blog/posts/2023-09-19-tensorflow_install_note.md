---
slug: tensorflow-install-note
title: TensorFlow 설치 시 주의점
date:
    created: 2023-09-19
description: >
    TensorFlow 설치 시 주의할 점
categories:
    - AI
tags:
    - AI
    - TensorFlow
    - troubleshooting
---

TensorFlow 설치 관련 주의할 점들에 대한 기록들  

<!-- more -->

## Python 버전 관련

- TensorFlow는 **64-bit** Python에서만 사용 가능(32-bit 버전에서 사용 불가)
- 특정 버전의 TensorFlow는 특정 버전의 Python에서만 사용 가능

!!! warning
    만약 32-bit Python에 TensorFlow을 설치하려하면 아래와 같은 에러가 발생한다.  

    ```
    ERROR: Could not find a version that satisfies the requirement tensorflow==2.4.0 (from versions: none)
    ERROR: No matching distribution found for tensorflow==2.4.0
    ```

!!! tip
    TensorFlow 각 버전별 호환되는 Python 버전은 [공식 문서](https://www.tensorflow.org/install/source?#tested_build_configurations)에서 확인할 수 있다.  
