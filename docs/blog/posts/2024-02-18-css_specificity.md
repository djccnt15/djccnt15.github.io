---
slug: css-specificity
title: CSS 우선순위 정리
date:
    created: 2024-02-18
description: >
    CSS 스타일 적용 우선순위 정리
categories:
    - Front-End
tags:
    - CSS
---

CSS 적용 우선순위는 MDN Web Docs의 [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)와 W3Schools의 [CSS Specificity](https://www.w3schools.com/css/css_specificity.asp)에 자세히 정리되어 있다.  

<!-- more -->

---

## 기초 정리

1. 속성값 뒤에 `!important`가 붙은 것

    ```css
    p {
      background-color: red !important;
    }
    ```

1. Inline styles
    - `HTML`에서 직접 스타일을 지정한 경우

    ```html
    <h1 style="color: pink;">
    ```

1. IDs
    - `#id`로 스타일을 지정한 경우

    ```css
    div #tag_id {
      background-color: green;
    }
    ```

1. Classes, pseudo-classes, attribute selectors
    - 클래스, [가상 클래스](./2024-02-11-css_selector.md/#가상-클래스-선택자), 속성 선택자로 지정한 경우

    ```css
    .intro {
      background-color: yellow;
    }
    ```

1. Elements and pseudo-elements
    - 태그, [가상 태그](./2024-02-11-css_selector.md/#가상-태그-선택자)로 지정한 경우

    ```css
    p {
      color: red;
    }
    ```

1. 전역 속성 및 상속된 속성

## 우선순위 가중치 계산법

MDN Web Docs와 W3Schools의 설명에 따르면 `!important`를 제외한 CSS의 정확한 우선 순위는 선택자의 가중치를 계산하여 가중치가 높은 순서로 정해지는데, 선택자별 가중치와 계산 예시는 아래와 같다.  

- 인라인 스타일: 1000
- ID 선택자: 100
- 클래스 선택자: 10
- 태그 선택자: 1

| 선택자                     | 가중치 | 계산          |
| -------------------------- | ------ | ------------- |
| `p`                        | 1      | 1             |
| `p.test`                   | 11     | 1 + 10        |
| `p#demo`                   | 101    | 1 + 100       |
| `<p style="color: pink;">` | 1000   | 1000          |
| `#demo`                    | 100    | 100           |
| `.test`                    | 10     | 10            |
| `p.test1.test2`            | 21     | 1 + 10 + 10   |
| `#navbar p#demo`           | 201    | 100 + 1 + 100 |
| `*`                        | 0      | 0[^1]         |

[^1]: 전역 선택자는 무시됨  

---
## Reference
- [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [CSS Specificity](https://www.w3schools.com/css/css_specificity.asp)