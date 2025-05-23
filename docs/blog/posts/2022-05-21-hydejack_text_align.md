---
status: deprecated
slug: hydejack-text-align
title: Hydejack 테마 글자 정렬
date:
    created: 2022-05-21
description: >
    css로 Hydejack 테마 글자 정렬 기능 만들기
categories:
    - Jekyll
tags:
    - hydejack
---

css로 Hydejack 테마 글자 정렬 기능 만들기  

<!-- more -->

---

!!! warning
    아래 내용은 블로그에 적용했던 [Hydejack](https://hydejack.com/) 테마를 커스터마이징 했던 내용들이다. **현재 테마와는 관련 없다.**  

## 1. scss 수정

Minimal Mistakes 테마를 참고하여 텍스트 정렬 기능을 만들었다. 우선 `_sass/my-style.scss` 파일에 아래 코드를 추가하자.  

```scss title="my-style.scss"
// text align

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-justify {
  text-align: justify;
}

.text-nowrap {
  white-space: nowrap;
}
```

## 2. 적용하기

문단 아래에 아래와 같이 정렬 명령어를 붙여주면 된다.  

```markdown
Googling stuff online does make you a Programmer.
{:.text-center}
```

Googling stuff online does make you a Programmer.

```markdown
Googling stuff online does make you a Programmer.
{:.text-right}
```

Googling stuff online does make you a Programmer.

```markdown
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{:.text-justify}
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```markdown
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{:.text-nowrap}
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

---
## Reference
- [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/)
