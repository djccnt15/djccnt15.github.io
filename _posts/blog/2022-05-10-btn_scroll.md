---
published: true
layout: post

title: '[블로그] 스크롤 버튼'
description: >
    scroll to top/bottom 버튼 만들기
hide_description: false
image:
    path: /assets/img/posts/btn.png
related_posts:
    - _posts/blog/2022-05-10-btn_scroll.md

categories:
    - blog
tags:
    - blog
    - scss
    - html
---
* toc
{:toc}

블로그 테마를 바꾸면서 기존에 링크 방식으로 사용하던 scroll to home/top/bottom 버튼의 기능이 망가졌다.  
동료 개발자의 도움을 조금 받아 자바 스크립트를 사용해서 수정했다.

## 1. scss로 버튼 스타일 만들기

hydejack 테마는 inline에 적용되는 scss 코드를 추가할 때 `/_sass/my-inline.scss` 파일을 수정하면 된다.  
아래 코드와 같이 추가하자.

```scss
// scroll btn

.scroll_top {
  position: fixed;
  bottom: 0.5em;
  right: 3em;
  z-index: 10;
  cursor: pointer;
}

.scroll_bot {
  position: fixed;
  bottom: 0.5em;
  right: 1em;
  z-index: 10;
  cursor: pointer;
}

.btn_to_home {
  position: fixed;
  bottom: 0.5em;
  right: 5.3em;
  z-index: 10;
  cursor: pointer;
}
```

## 2. body에 버튼을 달고 기능 부여하기

body 위치에 들어가는 html 코드는 `/_includes/my-body.html`을 수정해서 추가하면 된다.  
아래 코드와 같이 추가하자.

```html
<aside class="scroll_top">
  <div>
    <i onclick="window.scrollTo({top:0,left:0, behavior:'smooth'})">
      <img src="/assets/img/blog/arrow_up.png" alt="top">
    </i>
  </div>
</aside>

<aside class="scroll_bot">
  <div>
    <i onclick="window.scrollTo({top:document.body.scrollHeight,left:0, behavior:'smooth'})">
      <img src="/assets/img/blog/arrow_down.png" alt="bottom">
    </i>
  </div>
</aside>

<aside class="btn_to_home">
  <div>
    <a class="no-hover" href="{{ '/' | relative_url }}">
      <img src="/assets/img/blog/home.png" alt="home">
    </a>
  </div>
</aside>
```