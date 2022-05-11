---
published: true
layout: post

title: Minimal Mistakes 테마 커스터마이징
description: >
  Minimal Mistakes 테마의 각종 설정 및 수정들에 대한 정리
hide_description: false
# image: 
#   path: /path/to/thumbnail/of/the/post.png
  # srcset:
  #   1060w: /assets/img/blog/example-content-iii.jpg
  #   530w:  /assets/img/blog/example-content-iii@0,5x.jpg
  #   265w:  /assets/img/blog/example-content-iii@0,25x.jpg
related_posts:
  - _posts/blog/2022-01-02-manual_github_pages.md

categories:
  - blog
tags:
  - blog
---

* toc
{:toc}

**아래 내용은 블로그에 처음에 적용했던 Minimal Mistakes 테마를 커스터마이징 했던 내용들이다.**  
**현재 테마와는 관련 없다.**

## 1. 각종 블로그 스타일 수정
### 1-1. 스킨 수정
스킨을 수정하고 싶을 때는  
1. `/assets/css/main.scss`에 입력해서 오버라이드 하거나  
2. `/_sass/minimal-mistakes/skins`에서 각 스킨들을 직접 건드리면 된다.  

나는 default 스킨만 조금 수정하고 다른 스킨들은 건드리기 싫어서 `/_sass/minimal-mistakes/skins/_default.scss`에 아래와 같은 내용을 추가해줬다.

```scss
// customize skin color
$background-color: #eeeeee !default;
$text-color: #2a2231 !default;
$muted-text-color: #403946 !default;
$primary-color: #3d3d3d !default;
$border-color: mix(#fff, #393e46, 75%) !default;
$footer-background-color: mix(#fff, $primary-color, 80%) !default;
$link-color: #39006e !default;
$masthead-link-color: $text-color !default;
$masthead-link-color-hover: $text-color !default;
$navicon-link-color-hover: mix(#fff, $text-color, 80%) !default;

.pagination--pager:hover {
  background-color: $link-color !important; //override
  // color: #fff;
}

// customize remote buttons color
.fa-h-square:before {
  color: #a3a3a3;
}

.fa-caret-square-up:before {
  color: #a3a3a3;
}

.fa-caret-square-down:before {
  color: #a3a3a3;
}
```

### 1-2. 줄간격 조정
Minimal Mistakes는 기본 줄간격이 너무 좁아 가독성이 떨어진다. 줄간격을 조정하려면 `/_sass/_page.scss`를 수정해주면 된다.  
나는 아래와 같이 `.page__content`의 `p`에 `line-height`를 추가해서 문단 스타일을 수정했다.

```scss
.page__content {
  /* paragraph indents */
  p {
    line-height: 2; // 가독성을 위해 줄 간격 추가
  }
}
```

### 1-3. 좌우 여백 조정
Minimal Mistakes 테마의 좌우 여백은 `/_sass/minimal-mistakes/_variables.scss`에 정의된 `$right-sidebar-width`, `Breakpoints` 변수를 수정해서 조절할 수 있다.  

```scss
$right-sidebar-width-narrow: 200px !default;  // default 200px
$right-sidebar-width: 250px !default;         // default 300px
$right-sidebar-width-wide: 250px !default;    // default 400px
```

기본 좌우 여백이 거슬려서 `Breakpoints`도 아래와 같이 수정해봤는데, 막상 최소한으로 줄이니 답답한 느낌이 들어 기본값으로 되돌렸다.  

```scss
/*
   Breakpoints
   ========================================================================== */

$small: 768px !default;          // default 600px
$medium: 900px !default;         // default 768px
$medium-wide: 1024px !default;   // default 900px
$large: 1280px !default;         // default 1024px
$x-large: 1440px !default;       // default 1280px
$max-width: $x-large !default;
```

### 1-4. 프로필 사진 칸 수정
`/_sass/minimal-mistakes/_sidebar.scss`의 `.author__avatar` 항목 수정

```scss
.author__avatar {
  img {
    max-width: 110px;
    border-radius: 5%;  // 테두리 둥글기
  }
}
```

### 1-5. 링크 밑줄 설정
`/_sass/minimal-mistakes/_base.scss`의 `/* links */` 수정

```scss
a {
  text-decoration: none;
}
```
### 1-6. 업로드 날짜 보이기
Minimal Mistakes는 기본 설정으로 읽는 시간이 표시되어 있도록 구성되어 있는데, 영 쓸모가 없다. 읽는 시간 대신 업로드 날짜를 보이게 하려면, 아래와 같이 `/_config.yml`에서 `read_time`을 `false`로, `show_date`를 `true`로 수정해주면 된다.  

```yml
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      read_time: false
      show_date: true

  # _pages
  - scope:
      path: ""
      type: pages
    values:
      read_time: false
      show_date: true
```

## 2. 단축 버튼 만들기
홈페이지, 맨 위로, 맨 아래로 보내는 단축 버튼 만드는 방법  
`/_sass/minimal-mistakes/_sidebar.scss`에 아래 내용 추가

```scss
.sidebar__home {
  position: fixed;
  bottom: 0.5em;
  right: 6.2em;
  z-index: 10;
}

.sidebar__top {
  position: fixed;
  bottom: 0.5em;
  right: 3.7em;
  z-index: 10;
}

.sidebar__bottom {
  position: fixed;
  bottom: 0.5em;
  right: 1.2em;
  z-index: 10;
}
```

`/layouts/default.html`의 `<body>`에 아래 내용 추가

```html
<html>
  <body>
    <aside class="sidebar__home">
      <a href="/recent/">
        <div style="font-size: 0.5rem;"><i class="fas fa-h-square fa-5x"></i></div>
      </a>
    </aside>

    <aside class="sidebar__top">
      <a href="#site-nav">
        <div style="font-size: 0.5rem;"><i class="fas fa-caret-square-up fa-5x"></i></div>
      </a>
    </aside>

    <aside class="sidebar__bottom">
      <a href="#footer">
        <div style="font-size: 0.5rem;"><i class="fas fa-caret-square-down fa-5x"></i></div>
      </a>
    </aside>
```

## 3. MathJax로 수학식 표시하기
Github Pages에 수학식을 출력하는 방법은 여러 가지가 있는데, 페이지 로딩이나 작성 편의성 등을 고려했을 때 아래 방식이 제일 좋은 것 같다.  

`/_includes/mathjax.html` 생성 및 아래 내용 입력  

```html
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
</script>
  
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```

`/_layouts/default.html`의 `<head>` 부분에 아래 내용 추가

```scss{% raw %}
<html>
  <head>
    {% if page.mathjax %}
      {% include mathjax.html %}
    {% endif %}
  </head>
{% endraw %}```

수식을 사용할 포스트의 `YFM`을 아래와 같이 설정 

```markdown
mathjax: true
```

글 작성 시 수식 입력 방법은 [여기](/blog/2022-01-04-blog_markdown/#4-수식-입력)에서 확인할 수 있다.

## 4. favicon 설정
`/assets/images/logo.ico` 폴더에 favicon 파일들 저장 후 `/_includes/head/custom.html`에 아래 내용 추가

```html
<link rel="apple-touch-icon" sizes="180x180" href="/assets/logo.ico/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo.ico/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/logo.ico/favicon-16x16.png">
<link rel="manifest" href="/assets/logo.ico/site.webmanifest">
<link rel="mask-icon" href="/assets/logo.ico/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
```

## 6. Posts by Month 작성
`/_layouts/monthly.html` 생성 후 아래 내용 입력

```html{% raw %}
---
layout: archive
---

{{ content }}

<ul class="taxonomy__index">
  {% assign postsInMonth = site.posts | group_by_exp: 'post', 'post.date | date: "%Y/%m"' %}
  {% for month in postsInMonth %}
    <li>
      <a href="#{{ month.name }}">
        <strong>{{ month.name }}</strong> <span class="taxonomy__count">{{ month.items | size }}</span>
      </a>
    </li>
  {% endfor %}
</ul>

{% assign postsByMonth = site.posts | group_by_exp: 'post', 'post.date | date: "%Y/%m"' %}
{% for month in postsByMonth %}
  <section id="{{ month.name }}" class="taxonomy__section">
    <h2 class="archive__subtitle">{{ month.name }}</h2>
    <div class="entries-{{ page.entries_layout | default: 'list' }}">
      {% for post in month.items %}
        {% include archive-single.html type=page.entries_layout %}
      {% endfor %}
    </div>
    <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  </section>
{% endfor %}
{% endraw %}```

`/_pages/monthly-archive.md` 생성 후 아래 내용 입력

```markdown
---
title: "Posts by Month"
permalink: /month-archive/
layout: monthly
author_profile: true
---
```

`/_data/navigation.yml`의 `main`항목에 아래 내용 추가

```yml
main:
  - title: "Posts by Month"
    url: /month-archive/
```

## 7. Home 화면 설정
블로그의 첫 화면에 대한 설정은 `root`의 `index.html`에서 변경할 수 있다.  
현재 설정은 아래와 같다.  

```html
---
layout: splash
author_profile: true
---

<br>
<p align="center">
    <a href="/recent/"><img src="/assets/images/standing_on_the_shoulders_of_giants.png" alt="Visit the Homepage">
</p>
```

## 8. timezone 설정
`/_config.yml`에 timezone이 설정된 경우 `/Gemfile`에 아래 코드를 넣어줘야 local에서 Jekyll을 구동시킬 수 있다.  

```ruby
gem 'tzinfo'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
```

Minimal Mistakes의 [Configuration](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) 문서에 따르면 default는 os에 설정된 local timezone으로 설정되어 있기 때문에 어지간해서는 굳이 설정할 필요는 없다.

---
## Reference
- [Include "Back to top" Icon](https://github.com/mmistakes/minimal-mistakes/issues/1731)
- [Jekyll Github 블로그에 MathJax로 수학식 표시하기](https://mkkim85.github.io/blog-apply-mathjax-to-jekyll-and-github-pages/)
- [How to add Latex to Minimal Mistakes](https://www.janmeppe.com/blog/How-to-add-mathjax-to-minimal-mistakes/)
- [[Github Blog] 파비콘(Favicon) 세팅하기](https://velog.io/@eona1301/Github-Blog-%ED%8C%8C%EB%B9%84%EC%BD%98Favicon-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0)
- [Github.io 월별 게시글 분류 추가하기](https://danggai.github.io/github.io/Github.io-%EC%9B%94%EB%B3%84-%EA%B2%8C%EC%8B%9C%EA%B8%80-%EB%B6%84%EB%A5%98-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0/)