---
published: true
layout: post
title: '[TF] TensorFlow 설치 시 주의점'
description: >
    TensorFlow 설치 시 주의할 점
categories: [AI]
tags: [tensorflow]
image:
    path: /assets/img/posts/thumbnail_tensorflow.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## TensorFlow 설치 시 주의점

오랜만에 신규 Tensorflow 개발 환경을 세팅하는데 아래와 같은 에러가 발생했다.  

```
ERROR: Could not find a version that satisfies the requirement tensorflow==2.4.0 (from versions: none)
ERROR: No matching distribution found for tensorflow==2.4.0
```

TensorFlow 설치 시 주의할 점이 몇 가지 있는데, 너무 당연해서 신경쓰지 않던 부분을 실수해서 발생한 문제였다. 우선 TensorFlow 설치 시 주의할 점은 아래와 같다.  

- TensorFlow는 **64-bit** Python에서만 사용 가능(32-bit 버전에서 사용 불가)
- TensorFlow는 특정 버전의 Python에서만 사용 가능

위 에러는 32-bit Python에 TensorFlow을 설치하려고해서 발생한 에러이다.  

참고로 TensorFlow 각 버전별 호환되는 Python 버전은 [공식 문서](https://www.tensorflow.org/install/source?#tested_build_configurations)에서 확인할 수 있다.  