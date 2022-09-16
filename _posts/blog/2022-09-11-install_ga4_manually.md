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
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 문제점

![ga_ua_warning](/assets/img/posts/ga_ua_warning.png)

Google Analytics에서 곧 더 이상 Universal Analytics를 지원하지 않고, GA4만 지원한다고 하는데, 내가 사용하는 [Hydejack](https://hydejack.com/) 테마는 아직까지 UA만 지원한다. 그래서 GA4를 직접 적용해보았다.  

## 해결

Google Analytics 페이지를 잘 뒤져보면 아래와 같이 수동으로 태그를 설치하는 법이 나와있다. 경로가 나중에 바뀔 수도 있는데, 나는 **관리 > 계정 설정 > 데이터 스트림 > 웹 스트림 세부정보 > 태그 안내 보기 > 직접 설치** 경로에서 찾을 수 있었다.  

![ga_install_manually](/assets/img/posts/ga_install_manually.png)

페이지의 `<head>` 바로 아래에 입력하라고 하는데, Hydejack 테마의 경우 `/_includes/my-head.html`에서 일괄적으로 적용할 수 있다. [GitHub Pages를 인식](/blog/github_pages_ga/)하는 코드를 더해서 아래와 같은 내용을 추가했다.  

{% raw %}
```html
{% if site.google_analytics and site.url == "https://djccnt15.github.io/" %}
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-**********"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-**********');
  </script>
{% endif %}
```
{% endraw %}

---
## Reference
- [Jekyll 블로그에 Google Analytics 붙이기 (GA4 기준)](https://kim-eun-ji.github.io/etc/2021-05-18-ga/)