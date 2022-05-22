---
published: true
layout: post

title: list layout 수정하기
description: >
  list layout을 시계열로 연결된 디자인으로 수정하기
hide_description: false
image: 
  path: /assets/img/posts/list_layout.png
related_posts:
  - _posts/blog/2022-05-21-text_align.md

categories:
  - blog
tags:
  - blog
---

* toc
{:toc}

[따라쟁이](https://khw11044.github.io/githubpages/)님의 블로그 디자인이 아주 괜찮아서 따라해보았다.  

## 1. scss로 라인 스타일 만들기

hydejack 테마는 style에 적용되는 scss 코드를 추가할 때 `/_sass/my-style.scss` 파일을 수정하면 된다.  
아래 코드와 같이 추가하자.

```scss
// time-line

.list-lead{
  margin-bottom: 0;
}
.list-lead::after{
  content:"";
  display:block;
  position: relative;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  top: -21px;
  left: 62px;
  // border: 3px solid;

  background-color: lightgrey;
  z-index: 1;
}
.list-post li {
  line-height: 3rem;
}
.list-post > ul > li:first-child::before, .list-post > ul > li::after{
  content: "";
  width: 4px;
  left: 66px;
  display: inline-block;
  float: left;
  position: relative;
  background-color: lightgrey;
}
.list-post > ul > li > div{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-post > ul > li > div > a{
  margin-left: 1.5rem;
  position: relative;
}
.list-post > ul > li > div > a::before{
  content: "";
  display: inline-block;
  position: relative;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  float: left;
  top: 1.35rem;
  left: 60px;
  box-shadow: 0 0 5px 0 grey;
  background-color: white;
  z-index: 1;

  transition: all 0.5s;
}
.list-post > ul > li > div > a:hover::before{
  background-color: lightgrey;
  margin-right: 0.3rem;
  box-shadow: 0 0 2px 0 grey;
}
.list-post > ul > li:first-child::before{
  height: 3.0rem;
  top: -1.5rem;
}
.list-post > ul > li:not(:last-child)::after{
  height: 3.3rem;
  top: -1.3rem;
}
.list-post ul:not(:last-child)>li:last-child::after{
  height: 5.2rem;
  top: -1.3rem;
}

.list-post .related-posts>li+li{
  margin-top: 0;
}
.list-post li.h6{
  margin-top: 0;
}
```

## 2. layout 수정

`_layouts/list.html`을 아래와 같이 수정하자.  

```html
---
layout: page
---
<div class="markdown-body">
  {{ '{{ content '}}}}
</div>
{{ '{% assign posts = site.categories[page.slug] | default:site.tags[page.slug] | default:site.posts '}}%}

{{ '{% assign date_formats  = site.data.strings.date_formats               '}}%}
{{ '{% assign list_group_by = date_formats.list_group_by | default:"%Y"    '}}%}
{{ '{% assign list_entry    = date_formats.list_entry    | default:"%m %d" '}}%}

{{ '{% assign prev_date = 0 '}}%}
{{ '{% if page.no_groups '}}%}<ul class="related-posts">{{ '{% endif '}}%}
<div class="list-post">
{{ '{% for post in posts '}}%}
  {{ '{% assign current_date = post.date | date:list_group_by '}}%}
  {{ '{% unless page.no_groups '}}%}{{ '{% if current_date != prev_date '}}%}
    {{ '{% unless forloop.first '}}%}</ul>{{ '{% endunless '}}%}
    <h2 class="list-lead">{{ '{{ current_date '}}}}</h2>
    <ul class="related-posts">
    {{ '{% assign prev_date = current_date '}}%}
  {{ '{% endif '}}%}{{ '{% endunless '}}%}
  {{ '{% include_cached components/post-list-item.html post=post format=list_entry '}}%}
  {{ '{% if forloop.last '}}%}</ul>{{ '{% endif '}}%}
{{ '{% endfor '}}%}
</div>
```

## 3. components 수정

`_includes/components/post-list-item.html`을 아래와 같이 수정하자.  

```html
{{ "{% assign post = include.post "}}%}
{{ '{% assign format = include.format | default:site.data.date_formats.related_post | default:"%Y %m %d" '}}%}

<li class="h6">
  <div>
    <time style="display: inline-block; width: 2.2rem" class="faded fine" datetime="{{ '{{ post.date | date_to_xmlschema '}}}}">{{ '{{ post.date | date:format '}}}}</time>
    <a href="{{ '{{ post.url | relative_url '}}}}" class="flip-title"><span>{{ '{{ post.title '}}}}</span></a>
    <span style="font-weight: normal; font-size: smaller;">{{ '{{ post.description '}}}}</span>
  </div>
</li>
```

---
## Reference
- [따라쟁이의 AI 대학원 블로그](https://khw11044.github.io/githubpages/)