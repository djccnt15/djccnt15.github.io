---
status: deprecated
slug: jekyll-next-page-button
title: Jekyll 이전/다음 글 버튼
date:
    created: 2022-06-04
description: >
    Jekyll 프레임워크의 이전 글, 다음 글 버튼 만들기
categories:
    - Jekyll
tags:
    - Jekyll
---

Jekyll 프레임워크의 이전 글, 다음 글 버튼 만들기  

<!-- more -->

---

## 1. 버튼 만들기

`_includes/page-button.html`를 아래와 같은 내용을 만들어 주자.  

```html title="page-button.html"
<div class="page-control">
  <div>
    {% if page.previous.url %}
      &laquo; <a id="prev" class="flip-title" href="{{ page.previous.url }}">{{ page.previous.title }}</a>
    {% endif %}
  </div>
  <div>
    {% if page.next.url %}
      <a id="next" class="flip-title" href="{{ page.next.url }}">{{ page.next.title }}</a> &raquo;
    {% endif %}
  </div>
</div>
```

## 2. 페이지에 버튼 넣기

`_layouts/post.html`의 적당한 위치에 아래 내용 추가  

```liquid title="post.html"
{% include page-button.html %}
```

## 3. 버튼 스타일 부여

`_sass/my-style.scss`에 아래 내용 추가  

```scss title="my-style.scss"
// previous, next btn

.page-control {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

---
## Reference
- [11.이전글, 다음글 버튼 만들기](https://khw11044.github.io/blog/githubpages/2020-12-26-making-blog-11/)
