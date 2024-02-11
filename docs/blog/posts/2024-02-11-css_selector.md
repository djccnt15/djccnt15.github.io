---
slug: css-selectors
title: CSS 선택자 정리
date:
    created: 2024-02-11
description: >
    CSS 주요 선택자 정리
categories:
    - Front-End
tags:
    - css
---

CSS의 선택자는 MDN Web Docs의 [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)와 W3Schools의 [CSS Selectors](https://www.w3schools.com/css/css_selectors.asp), [CSS Selector Reference](https://www.w3schools.com/cssref/css_selectors.php)에 자세히 정리되어 있다.  

<!-- more -->

---

## 기본 선택자

- 전체 선택자(Universal Selector): 모든 태그 선택

```css
* {
  color: red;
}
```

- 태그 선택자(Type Selector): 태그 이름으로 선택

```css
li {
  color: red;
}
```

- 클래스 선택자(Class Selector): HTML 태그의 class 속성의 값으로 선택

```html
<li class="orange">오렌지</li>
```
```css
.orange {
  color: red;
}
```

- 아이디 선택자(ID Selector): HTML 태그의 ID 값으로 선택

```html
<li id="orange">오렌지</li>
```
```css
#orange {
  color: red;
}
```

## 복합 선택자

- 일치 선택자(Basic Combinator): 두 가지 조건을 동시에 만족하는 태그 선택

```html
<span class="orange">오렌지</span>
```
```css
span.orange {
  color: red;
}
```

- 자식 선택자(Child Combinator): 특정 태그의 자식 태그 선택

```html
<ul>
  <li class="orange">오렌지</li>
</ul>
```
```css
ul>.orange {
  color: red;
}
```

- 후손(하위) 선택자(Descendant Combinator): 특정 태그의 후손(하위) 태그를 선택

```html
<div>
  <ul>
    <li class="orange">오렌지</li>
  </ul>
</div>
```
```css
div .orange {
  color: red;
}
```

- 인접 형제 선택자(Adjacent Sibling Combinator): 특정 태그의 다음 형제 태그 **하나** 선택

```html
<ul>
  <li class="orange">오렌지</li>
  <li>망고<li>  <-- 선택 -->
</ul>
```
```css
.orange + li {
  color: red;
}
```

- 일반 형제 선택자(General Sibling Combinator): 특정 태그의 다음 형제 태그 **모두** 선택

```html
<ul>
  <li>딸기</li>
  <li class="orange">오렌지</li>
  <li>망고</li>  <-- 선택 -->
  <li>사과</li>  <-- 선택 -->
</ul>
```
```css
.orange ~ li {
  color: red;
}
```

## 가상 클래스 선택자

특정 상황에서만 작동하는 클래스를 가상 클래스라 함

- 특정 태그들에서만 사용 가능한 가상 클래스 선택자

```css
a:hover {
  color: red;
}
```
```css
a:active {
  color: red;
}
```
```css
input:focus {
  background-color: orange;
}
```

- first-child: 지정 된 선택자가 형제 태그 중 첫 번째이면 선택

```html
<div class="fruits">
  <span>딸기</span>  <-- 선택 -->
  <span>오렌지</span>
</div>
```
```css
.fruits span:first-child {
	color: red;
}
```

- last-child: 지정 된 선택자가 형제 태그 중 마지막이면 선택

```html
<div class="fruits">
  <span>딸기</span>
  <div>오렌지</div>  <-- 미선택 -->
  <h3>사과</h3>
</div>
```
```css
.fruits div:last-child {
  color: red;
}
```

- nth-child: 지정 된 선택자가 형제 태그 중 n 번째이면 선택

```html
<div class="fruits">
  <span>딸기</span>
  <div>오렌지</div>  <-- 선택 -->
  <h3>사과</h3>
</div>
```
```css
.fruits *:nth-child(2) {
  color: red;
}
```
```css
.fruits *:nth-child(2n) {  /* 짝수번째 선택 */
  color: red;
}
```

## 가상 태그 선택자

- `before`/`after`: 지정 된 선택자 내부의 앞/뒤에 가상의 태그를 만들어 내용(content) 삽입하는 가상 태그로, 인라인 태그로 생성됨

```html
<div class="box">
  content
</div>
```
```css
.box::before {
  content: "앞";
}
```
```css
.box::after {
  content: "뒤";
}
```

## 속성 선택자

특정 속성을 포함한 태그를 선택함

```html
<input type="text" value="qwer" disabled>
```
```css
[disabled] {
  color: red;
}
```
```css
[type="text"] {
  color: red;
}
```