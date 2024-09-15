---
slug: css-media-query
title: CSS 미디어 쿼리 정리
date:
    created: 2024-02-21
description: >
    반응형 웹페이지 개발을 위한 미디어 쿼리 정리
categories:
    - Front-End
tags:
    - CSS
---

반응형 웹페이지 개발을 위한 CSS 미디어 쿼리 정리는 MDN Web Docs의 [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)와 W3Schools의 [Responsive Web Design - Media Queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)에 자세히 정리되어 있다.  

<!-- more -->

---

!!!tip
    아래의 모든 미디어 쿼리 조건은 종류에 상관없이 복합적으로 사용할 수 있다.  

## 가로 넓이 기반 breakpoint

넓이에 따라 다른 CSS가 동작하도록 지정  

```css
@media (max-width: 576px) {  /* (1)! */
  .cellphone {
    color: red;
  }
}

@media (min-width: 576px) and (max-width: 992px) {  /* (2)! */
  .tablet {
    color: red;
  }
}
```

1. 가로 넓이가 576px 이하일 때
1. 가로 넓이가 576px 이상 992px 이하일 때

## 화면 비율 기반 

화면의 가로/세로 중 넓은 방향에 따른 CSS 적용  

```css
@media (orientation: landscape) {  /* (1)! */
  body {
    color: green;
    display: flex;
  }
}

@media (orientation: portrait) {  /* (2)! */
  body {
    color: orange;
  }
}
```

1. 가로 넓이가 길 때
1. 세로 넓이가 길 때

## 용도별 스타일 설정

```css
@media screen {  /* (1)! */
  body {
    color: red;
  }
}

@media print {  /* (2)! */
  body {
    color: red;
  }
}
```

1. 화면 출력용
1. 인쇄용
