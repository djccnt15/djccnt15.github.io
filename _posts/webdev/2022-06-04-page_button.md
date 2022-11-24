---
published: true
layout: post
title: '[Jekyll] 이전 글, 다음 글'
description: >
    이전 글, 다음 글 버튼 만들기
categories: [WebDev]
tags: [jekyll]
image:
    path: /assets/img/posts/page_button.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. 버튼 만들기

`_includes/page-button.html`를 아래와 같은 내용을 만들어 주자.  

{% raw %}
```html
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
{% endraw %}

## 2. 페이지에 버튼 넣기

`_layouts/post.html`의 적당한 위치에 아래 내용 추가  

{% raw %}
```liquid
{% include page-button.html %}
```
{% endraw %}

## 3. 버튼 스타일 부여

`_sass/my-style.scss`에 아래 내용 추가  

```scss
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