---
published: true
layout: post
title: '[GA] 웹페이지에 GA4 적용하기'
description: >
  Hydejack 테마에 GA4 직접 적용하기
categories: [Blog]
tags: [GA]
image:
  path: /assets/img/posts/google_analytics.webp
related_posts:
  - _posts/blog/2022-09-10-github_pages_ga.md
---
* toc
{:toc}

## 문제점

![ga_ua_warning](/assets/img/posts/ga_ua_warning.png)

Google Analytics에서 곧 더 이상 Universal Analytics를 지원하지 않고, GA4만 지원한다고 하는데, 내가 사용하는 [Hydejack](https://hydejack.com/) 테마는 아직까지 UA만 지원한다. 그래서 GA4를 직접 적용해보았다.  

## 해결

Google Analytics 페이지를 잘 뒤져보면 아래와 같이 수동으로 태그를 설치하는 법이 나와있다. 경로가 나중에 바뀔 수도 있는데, 나는 **관리 > 계정 설정 > 데이터 스트림 > 웹 스트림 세부정보 > 태그 안내 보기 > 직접 설치** 경로에서 찾을 수 있었다.  

![ga_install_manually](/assets/img/posts/ga_install_manually.png)

Google Analytics를 적용할 페이지의 `<head>`에 입력하라고 설명되어 있는데, Hydejack 테마의 경우 `/_includes/my-head.html`에서 일괄적으로 적용할 수 있다. 위 페이지에서 코드를 복사하여 아래와 같이 수정하자.  

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-**********"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-**********');
</script>
```

## 개선점

위 코드를 그대로 사용하면 [GitHub Pages 인식](/blog/github_pages_ga/)을 못해서 작성중인 내용 확인을 위해 로컬 서버에서 배포하고 접속한 기록까지 전부 카운트 된다. 그래서 아래와 같이 `JavaScript` 조건문을 사용해 GitHub pages를 통해서 배포 되었을 때만 코드가 적용되도록 개선하였다.  

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-**********"></script>
<script>
  if (window.location.hostname == "{YOUR_HOSTNAME}") {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-**********');
  }
</script>
```

참고로 `window.location.hostname`과 같이 `JavaScript` 명령어를 웹상에 배포된 페이지에서 확인하려면 아래와 같이 개발자 도구(DevTools)의 콘솔(Console) 항목에서 입력해보면 된다.  

![ga_hostname](/assets/img/posts/ga_hostname.png)

---
## Reference
- [Jekyll 블로그에 Google Analytics 붙이기 (GA4 기준)](https://kim-eun-ji.github.io/etc/2021-05-18-ga/)