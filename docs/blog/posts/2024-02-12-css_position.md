---
slug: position-of-css
title: CSS position 정리
date:
    created: 2024-02-12
description: >
    CSS에서 위치 설정을 위한 position 속성 기초 정리
categories:
    - Front-End
tags:
    - CSS
---

CSS의 위치 설정을 위한 `position` 속성은 MDN Web Docs의 [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)과 W3Schools의 [CSS Layout - The position Property](https://www.w3schools.com/css/css_positioning.asp)에 자세히 정리되어 있다.  

<!-- more -->

---

## Position 기초 정리

1. `static`
    - 웹사이트의 기본 속성값, `left`/`right`/`top`/`bottom` 등 위치 속성은 무시됨
1. `relative`
    - 해당 HTML 태그가 있는 위치에서 `left`/`right`/`top`/`bottom`값을 통해 움직임
1. `absolute`
    - 부모 영역에서 `left`/`right`/`top`/`bottom`을 이용해 주어진 위치로 움직임
    !!! warning
        부모 태그의 `position` 속성이 `relative`, `absolute`, `fixed` 중 하나여야 함. 만약 부모 태그가 해당 속성을 가지고 있지 않다면 상위 요소를 기준으로 하고, 최종적으로는 `body` 태그를 기준으로 함[^1]
1. `fixed`
    - `absolute`와 비슷하지만 스크롤을 내려도 그 위치에 고정됨
    - viewport(웹 브라우저 윈도우)를 기준으로 함
1. `Sticky`
    - `relative`와 비슷하지만 스크롤을 내리면 `fixed`처럼 그 위치에 고정됨

[^1]: `body` 태그는 `relative`를 기본 속성으로 가지고 있음  