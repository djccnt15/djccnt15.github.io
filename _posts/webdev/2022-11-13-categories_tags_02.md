---
published: true
layout: post
title: '[Jekyll] 반응형 카테고리/태그 페이지'
description: >
    반응형 카테고리, 태그 페이지 만들기
categories: [WebDev]
tags: [jekyll]
image:
    path: /assets/img/posts/thumbnail_jekyll.png
related_posts:
    - _posts/webdev/2022-05-17-categories_tags.md
---
* toc
{:toc}

## 1. 목표

기존에 사용하던 [카테고리/태그 페이지](/webdev/categories_tags/)에서 마음에 안 드는 점들이 있어서 수정해서 다시 만들었다. 이번 수정에서 개선한 내용은 아래와 같다.  

1. 필요 없는 코드 지우기
    - 기존 코드는 다른 사람의 코드를 베껴서 만들다보니 기존 코드에는 필요 없는 코드가 많이 있었는데, 신규 코드는 처음부터 만드는 수준으로 기존 코드를 아주 약간만 참고해서 만들고 그 과정에서 필요 없는 코드는 다 지워버리기
1. 카테고리/태그 페이지의 인덱스 영역 및 링크 정렬을 알파벳 순으로 바꾸기
    - 기존에 Minimal Mistakes 태그를 참고해서 만든 카테고리/태그 페이지는 페이지 내의 내용 정렬이 포스트 개수 순으로 되어 있어 변동이 심하고 혼동을 유발하니 알파벳 순 인덱스로 바꾸기
1. 반응형 기능 부여
    - 기존 코드에는 인덱스 영역의 칼럼 개수가 2개로 고정되어 있었는데, 화면 사이즈에 따라 2 ~ 4개로 변하도록 반응형 기능을 추가하기

## 2. 템플릿 수정

Jekyll은 [템플릿 언어](https://jekyllrb.com/docs/step-by-step/02-liquid/#use-liquid)로 [Liquid](https://shopify.github.io/liquid/)를 사용한다. Liquid에서 제공하는 [반복문](https://shopify.github.io/liquid/tags/iteration/), [조건문](https://shopify.github.io/liquid/tags/control-flow/), [변수](https://shopify.github.io/liquid/tags/variable/) 등 프로그래밍 기능 및 탬플릿 필터들과 [Jekyll](https://jekyllrb.com/docs/liquid/)의 템플릿이 추가로 제공하는 기능을 조합하여 알파벳 순으로 카테고리 및 필터를 정렬한 배열을 만들고 해당 배열을 통해 페이지가 생성되도록 만들었다.  

참고로 Jekyll에서 템플릿은 `_layouts` 디렉토리에 보관된다.  

### 2-1. 카테고리 페이지

Liquid에는 정렬을 위한 필터가 두 개가 있는데, `sort` 필터는 대소문자를 구분하고 `sort_natural` 필터는 대소문자를 구분하지 않는다는 차이가 있다.  

`categories.html` 파일을 아래와 같이 수정했다.  

{% raw %}
```html
---
layout: plain
---

{{ content }}

{% capture categories %}
  {% for category in site.categories %}
    {{ category[0] }}
  {% endfor %}
{% endcapture %}
{% assign category_sorted = categories | split:' ' | sort_natural %}

<ul class="taxonomy__index">
  {% for category in category_sorted %}
    <li>
      <a href="#{{ category }}"><strong>{{ category }}</strong></a>
      <a href="/{{ category | downcase }}">{{ site.categories[category].size }}</a>
    </li>
  {% endfor %}
</ul>

{% for category in category_sorted %}
  <section id="{{ category }}">
    <h2>{{ category }}</h2>
    <div>
      {% for post in site.categories[category] %}
        {% include archive-single.html %}
      {% endfor %}
    </div>
    <a href="#">Back to Top &uarr;</a>
    <hr>
  </section>
{% endfor %}
```
{% endraw %}

❗ Liquid의 [반복문](https://shopify.github.io/liquid/tags/iteration/)은 스페이스를 구분자로 사용하는데, 그 부분을 따로 처리하지 않았기 때문에 **카테고리에 띄어쓰기가 포함된 포스트가 있으면 버그가 발생**한다.  
{:.note title='attention'}

### 2-2. 태그 페이지

태그는 카테고리와 달리 스페이스가 들어간 포스트가 있어 구분자를 스페이스가 아닌 `,`로 바꿔주고 [스페이스를 따로 처리](https://shopify.github.io/liquid/basics/whitespace/)해 주었다.  

`tags.html` 파일을 아래와 같이 수정했다.  

{% raw %}
```html
---
layout: plain
---

{{ content }}

{%- capture tags -%}
  {%- assign tags_len = 1 -%}
  {%- for tag in site.tags -%}
    {%- if tags_len < site.tags.size -%}
      {{- tag[0] -}},
      {%- assign tags_len = tags_len | plus: 1 -%}
    {%- else -%}
      {{- tag[0] -}}
    {%- endif -%}
  {%- endfor -%}
{%- endcapture -%}
{%- assign tag_sorted = tags | split:',' | sort_natural -%}

<ul class="taxonomy__index">
  {% for tag in tag_sorted %}
    <li>
      <a href="#{{ tag }}"><strong>{{ tag }}</strong> {{ site.tags[tag].size }}</a>
    </li>
  {% endfor %}
</ul>

{% for tag in tag_sorted %}
  <section id="{{ tag }}">
    <h2>{{ tag }}</h2>
    <div>
      {% for post in site.tags[tag] %}
        {% include archive-single.html %}
      {% endfor %}
    </div>
    <a href="#">Back to Top &uarr;</a>
    <hr>
  </section>
{% endfor %}
```
{% endraw %}

### 2-3. 보조 템플릿

각 페이지에서 카테고리/태그 별로 포스트를 모아서 목록을 만들어주는 템플릿을 {% raw %}`{% include [source] %}`{% endraw %} 태그로 가져오는데, 해당 템플릿을 아래와 같이 만들어준다.  

{% raw %}
```html
<div>
  <article class="archive__item">
    <b>
      <time class="faded fine" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date:"%Y-%m-%d" }}</time>
      <a href="{{ post.url | relative_url }}" rel="permalink" class="flip-title">{{ post.title }}</a>
    </b>
    {% if post.description %}
      <p class="description">{{ post.description | markdownify | strip_html | truncate: 160 }}</p>
    {% endif %}
  </article>
</div>
```
{% endraw %}

## 3. 반응형 스타일

Jeykll에서 Sass 관련 파일은 `_sass` 디렉토리에서 관리하고, Hydejack 테마는 `my-style.scss` 파일을 통해 개발자가 스타일을 커스터마이징할 수 있도록 지원한다.  

아래와 같이 [미디어 쿼리](https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout/Media_queries)를 이용해 화면 크기에 따라 칼럼의 개수가 변하도록 만들어준다.  

```scss
// break point

$small: 600px;
$medium: 768px;
$medium-wide: 900px;
$large: 1024px;
$x-large: 1280px;
$xx-large: 1440px;

// taxonomy__index columns

.taxonomy__index {
  column-count: 2;
  justify-content: space-evenly;

  @media (min-width: $small) {
    column-count: 2;
  }
  @media (min-width: $medium) {
    column-count: 3;
  }
  @media (min-width: $x-large) {
    column-count: 4;
  }
}

.archive__item {
  line-height: 2.5;
}
```