---
slug: html-layout
title: HTML의 레이아웃 관련 정리
date:
    created: 2024-02-14
description: >
    description
categories:
    - Front-End
tags:
    - HTML
    - CSS
---

HTML의 레이아웃에 대한 내용은 W3Schools의 [HTML Layout Elements and Techniques](https://www.w3schools.com/html/html_layout.asp)에 자세히 정리되어 있다.  

CSS로 레이아웃을 조정하기 위해 사용하는 flexbox에 대한 내용은 MDN Web Docs의 [Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)와 W3Schools의 [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp)에 자세히 정리되어 있다.  

<!-- more -->

---

## HTML layout

### 기본 특징

- HTML의 레이아웃은 대표적으로 Block, Inline 모드가 있음
    - 태그를 구분하기 위한 큰 범주일 뿐 다른 종류의 태그들도 있음
    - `<input>` 태그와 같이 inline-block 인 태그도 있음

!!! tip
    블록 태그 안에 인라인 태그는 가능, 인라인 태그 안에 블록 태그는 불가능

### 레이아웃 모드 비교

|   구분    |           블록(Block) 태그            |          인라인(Inline) 태그           |
| :-------: | :-----------------------------------: | :------------------------------------: |
|   용도    |       페이지의 레이아웃을 형성        |      글자 등 내용을 표시하고 제어      |
| 누적 방향 |               수직 방향               |               수평 방향                |
|   크기    |     가로 크기가 최대한 늘어남[^1]     | 포함한 콘텐츠 크기로 최대한 감소함[^2] |
|   예시    | `<div>`, `<h>`, `<p>`, `<ul>`, `<li>` |  `<span>`, `<img>`, `<a>`[^3], `<br>`  |

[^1]: 가로 크기는 부모 태그의 크기만큼 자동으로 커지며, 상하 크기의 경우 inline 태그와 마찬가지로 최대한 줄어들음  
[^2]: 스타일 속성을 통해 크기를 지정할 수 없음  
[^3]: `<a>` 태그는 블록 태그를 포함할 수 있음  

## CSS flexbox

- `display: flex`
    - 모든 요소를 가로로 둠
    - 부모 태그에 적용을 하고 자손 요소들의 `flexbox`를 조정
- `justify-content`
    - 요소들의 가로 정렬
    - `flex-start`, `center`, `flex-end`, `space-between`, `space-around`
- `align-items`
    - 요소들의 세로 정렬
- `flex-direction: column`
    - 가로로 정렬된 요소를 세로로 바꾸고 `justify-content`는 세로 정렬, `align-items`는 가로 정렬로 바뀜

!!! tip "CSS flexbox 연습용 사이트 목록"
    - [FLEXBOX FROGGY](https://flexboxfroggy.com/)