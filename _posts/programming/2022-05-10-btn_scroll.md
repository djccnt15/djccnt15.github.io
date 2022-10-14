---
published: true
layout: post
title: '[Front-end] 스크롤 버튼'
description: >
  scroll to top/bottom 버튼 만들기
categories: [Programming]
tags: [front-end]
image:
  path: /assets/img/posts/btn.png
related_posts:
  - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

블로그 테마를 바꾸면서 기존에 링크 방식으로 사용하던 [scroll to home/top/bottom 버튼](/blog/blog_customizing/#2-단축-버튼-만들기)의 기능이 망가지는 바람에 JavaScript를 사용해서 새롭게 만들어보았다.  

## 1. scss로 버튼 스타일 만들기

Hydejack 테마에 scss 코드를 추가할 때는 `_sass/my-style.scss` 파일을 수정하면 된다. 아래 코드와 같이 추가하자.  

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

.btn_home {
  position: fixed;
  bottom: 0.5em;
  right: 5.3em;
  z-index: 10;
  cursor: pointer;
}
```

## 2. body에 버튼을 달기

body 위치에 들어갈 HTML 코드는 `_includes/my-body.html`을 수정해서 추가하면 된다.  

```html
<div>
  <img src="/assets/img/blog/arrow_up.png" class="scroll_top" alt="top" id="scroll_top">
  <img src="/assets/img/blog/arrow_down.png" class="scroll_bot" alt="bottom" id="scroll_bot">
  <a href="{{ '/' | relative_url }}">
    <img src="/assets/img/blog/home.png" class="btn_home" alt="home">
  </a>
</div>
<script src="/assets/js/my-body.js"></script>
```

## 3. 버튼에 기능 넣기

버튼에 기능을 넣기 위해 `assets/js/my-body.js` 파일을 아래와 같이 생성해준다.  

```javascript
let scroll_top = document.getElementById("scroll_top");
scroll_top.addEventListener(
  type='click',
  listener=function() {
    window.scrollTo({top:0, left:0, behavior:'smooth'})
  }
);

let scroll_bot = document.getElementById("scroll_bot");
scroll_bot.addEventListener(
  type='click',
  listener=function() {
    window.scrollTo({top:document.body.scrollHeight, left:0, behavior:'smooth'})
  }
);
```