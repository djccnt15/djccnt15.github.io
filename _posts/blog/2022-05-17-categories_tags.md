---
published: true
layout: post

title: '[블로그] 카테고리/태그 페이지'
description: >
    posts by Category, posts by Tag
hide_description: false
image:
    path: /assets/img/posts/by_category.png
related_posts:
    - _posts/blog/2022-05-17-categories_tags.md

categories:
    - Blog
tags:
    - blog
    - html
    - scss
    - jekyll
---
* toc
{:toc}

Minimal Mistakes 테마를 참고해서 만들었다.  

## 1. Category 레이아웃 만들기

`/_layout/categories.html`을 아래와 같은 내용으로 만들어 넣어주고, 레이아웃을 설정해주면 된다.  

```html{% raw %}
---
layout: about
---

{{ content }}

{% assign categories_max = 0 %}
{% for category in site.categories %}
  {% if category[1].size > categories_max %}
    {% assign categories_max = category[1].size %}
  {% endif %}
{% endfor %}

<ul class="taxonomy__index">
  {% for i in (1..categories_max) reversed %}
    {% for category in site.categories %}
      {% if category[1].size == i %}
        <li>
          <a href="#{{ category[0] }}"><strong>{{ category[0] }}</strong></a> <a href="/{{ category[0] | downcase }}">{{ i }}</a>
        </li>
      {% endif %}
    {% endfor %}
  {% endfor %}
</ul>

{% assign entries_layout = page.entries_layout | default: 'list' %}
{% for i in (1..categories_max) reversed %}
  {% for category in site.categories %}
    {% if category[1].size == i %}
      <section id="{{ category[0] }}">
        <h2>{{ category[0] }}</h2>
        <div>
          {% for post in category.last %}
            {% include archive-single.html type=entries_layout %}
          {% endfor %}
        </div>
        <a href="/categories">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
        <hr>
      </section>
    {% endif %}
  {% endfor %}
{% endfor %}
{% endraw %}```

## 2. Tag 레이아웃 만들기

`/_layout/categories.html`을 아래와 같은 내용으로 만들어 넣어주고, 레이아웃을 설정해주면 된다.  

```html{% raw %}
---
layout: about
---

{{ content }}

{% assign tags_max = 0 %}
{% for tag in site.tags %}
  {% if tag[1].size > tags_max %}
    {% assign tags_max = tag[1].size %}
  {% endif %}
{% endfor %}

<ul class="taxonomy__index">
  {% for i in (1..tags_max) reversed %}
    {% for tag in site.tags %}
      {% if tag[1].size == i %}
        <li>
          <a href="#{{ tag[0] }}"><strong>{{ tag[0] }}</strong> {{ i }}</a>
        </li>
      {% endif %}
    {% endfor %}
  {% endfor %}
</ul>

{% assign entries_layout = page.entries_layout | default: 'list' %}
{% for i in (1..tags_max) reversed %}
  {% for tag in site.tags %}
    {% if tag[1].size == i %}
      <section id="{{ tag[0] }}">
        <h2>{{ tag[0] }}</h2>
        <div>
          {% for post in tag.last %}
            {% include archive-single.html type=entries_layout %}
          {% endfor %}
        </div>
        <a href="/tags">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
        <hr>
      </section>
    {% endif %}
  {% endfor %}
{% endfor %}
{% endraw %}```

## 3. 보조 레이아웃 만들기

`/_includes/archive-single.html`을 아래 내용으로 만들어주자.  

```html{% raw %}
{% assign format = include.format | default:site.data.date_formats.related_post | default:"%Y-%m-%d" %}

{% if post.header.teaser %}
  {% capture teaser %}{{ post.header.teaser }}{% endcapture %}
{% else %}
  {% assign teaser = site.teaser %}
{% endif %}

{% if post.id %}
  {% assign title = post.title | markdownify | remove: "<p>" | remove: "</p>" %}
{% else %}
  {% assign title = post.title %}
{% endif %}

<div class="{{ include.type | default: 'list' }}__item">
  <article class="archive__item">
    <b>
      <time class="faded fine" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date:format }}</time>
      {% if post.link %}
        <a href="{{ post.link }}">{{ post.title }}</a> <a href="{{ post.url | relative_url }}" rel="permalink"><span class="sr-only">Permalink</span></a>
      {% else %}
        <a href="{{ post.url | relative_url }}" rel="permalink" class="flip-title">{{ post.title }}</a>
      {% endif %}
    </b>
    {% if post.description %}<p class="description">{{ post.description | markdownify | strip_html | truncate: 160 }}</p>{% endif %}
  </article>
</div>
{% endraw %}```

## 3. 스타일 수정하기

`/_sass/my-style.scss`에 아래와 같이 추가하자.  

```scss
// taxonomy__index columns

.taxonomy__index {
  column-count: 2;
}

.archive__item {
  line-height: 2.5;
}
```

---
## Reference
- [Minimal Mistakes - Posts by Category](https://mmistakes.github.io/minimal-mistakes/categories/)