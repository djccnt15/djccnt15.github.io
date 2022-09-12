---
published: true
layout: post
title: '[Jekyll] Jekyll에서 구동 환경 인식하기'
description: >
    Jekyll에서 GitHub Pages 인식하기
categories: [Blog]
tags: [jekyll]
image:
    path: /assets/img/posts/github_pages_metadata.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 개요

나는 GitHub Pages 블로그를 Jekyll을 기반으로 구축했기 때문에 local에서 구동해 화면을 확인하는데, 이렇게 local에서 구동하고 localhost에 접속한 기록도 Google Analytics에 집계가 되서 통계가 이상해진다. GitHub Pages에서 구동되었을 때만 Google Analytics에 집계가 되도록 수정해보았다.  

## 수정하기

[About GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#front-matter) 문서를 보면 아래와 같이 `site.github`를 추가하면 레포지토리 메타데이터를 사용할 수 있다고 적혀있다. 따라서 `site.github` 네임스페이스가 존재하는지를 확인해서 간단히 구분이 가능하다고 한다.  

![github_pages_front_matter](/assets/img/posts/github_pages_front_matter.png)
{:.text-center}

[설명 페이지](https://github.com/jekyll/github-metadata)를 좀 더 읽어보면, `Gemfile`과 `_config.yml`에 `"jekyll-github-metadata"`이 추가되어 있어야 정상적으로 작동한다고 하는데, 현재 테마에서 일단 해당 추가 사항이 없어도 `site.title`, `site.description` 등이 제대로 작동하기도 하고, 지금 목적은 실제로 레포지토리 메타데이터를 사용하는게 아니라 블로그를 빌드하는 환경을 구분하는 것 뿐이니 일단은 해당 사항은 추가 없이 기초적인 수정만 진행해서 적용해보기로 한다.  

Hydejack 테마의 경우 `_includes\body\analytics.html` 파일에 Google Analytics 관련 내용이 있다. 아래와 같이 관련 내용을 수정해준다.  

{% raw %}
```liquid
<!-- before -->
{% if site.google_analytics %}

<!-- after -->
{% if site.google_analytics and site.github %}
```
{% endraw %}

## 실패의 기록

결과는 개같이 fail..ㅠ Google Analytics 통계화면에서도 지속적으로 카운트 되고 있다. 아래 캡처에서 볼 수 있듯이 `analytics.html`를 수정한 내용이 빌드 결과에 제대로 반영이 안 되는 문제가 있는 것 같은데, 웹 개발이나 Jekyll 프레임워크에 대한 이해가 낮아 어디가 문제인지는 모르겠다..

![github_pages_ga_fail](/assets/img/posts/github_pages_ga_fail.png)
{:.text-center}

일단은 `analytics.html`은 원상복구 해두고 나중에 좀 더 실력이 쌓이면 다시 수정해봐야겠다.  

---
## Reference
- [Jekyll로 github pages 인식하기](https://blog.ukjae.io/posts/jekyll%EB%A1%9C-github-pages-%EC%9D%B8%EC%8B%9D%ED%95%98%EA%B8%B0/)