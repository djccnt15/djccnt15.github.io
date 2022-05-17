---
published: true
layout: post

title: 카테고리 페이지 만들기
description: >
  posts by category
hide_description: false
image: 
  path: /assets/img/posts/by_category.png
related_posts:
  - _posts/blog/2022-05-17-by_category.md

categories:
  - blog
tags:
  - blog
---

* toc
{:toc}

## 카테고리별로 정리시키기

Minimal Mistakes 테마의 카테고리별 정리 코드를 활용해서 만들었다.  
`_layout/categories.html`을 아래와 같은 내용으로 만들어 넣어주고, 레이아웃을 설정해주면 된다.  

```html
---
layout: about
---

{{ '{{ content '}}}}

{{ '{% assign categories_max = 0 '}}%}
{{ '{% for category in site.categories '}}%}
  {{ '{% if category[1].size > categories_max '}}%}
    {{ '{% assign categories_max = category[1].size '}}%}
  {{ '{% endif '}}%}
{{ '{% endfor '}}%}

<ul class="taxonomy__index">
  {{ '{% for i in (1..categories_max) reversed '}}%}
    {{ '{% for category in site.categories '}}%}
      {{ '{% if category[1].size == i '}}%}
        <li>
          <a href="/{{ '{{ category[0] '}}}}">
            <strong>{{ '{{ category[0] '}}}}</strong> <span class="taxonomy__count">{{ i }}</span>
          </a>
        </li>
      {{ '{% endif '}}%}
    {{ '{% endfor '}}%}
  {{ '{% endfor '}}%}
</ul>
```

---
## Reference
- [Minimal Mistakes - Posts by Category](https://mmistakes.github.io/minimal-mistakes/categories/)