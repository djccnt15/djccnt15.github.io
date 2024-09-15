---
slug: bootstrap-tips
title: 부트스트랩 활용 팁
date:
    created: 2024-02-17
description: >
    각종 부트스트랩 활용 팁 정리
categories:
    - Front-End
tags:
    - bootstrap
---

각종 부트스트랩 활용 팁 정리  

<!-- more -->

---

## Columns

- Bootstrap의 그리드는 한 줄을 12개의 칼럼을 정의함
- `col`을 단독으로 사용하면 각 태그가 12개 열을 동일한 넓이로 나누어 사용함
- `col-n`으로 전체 행 대비 각 열이 차지할 비율을 정의할 수 있는데, 각 n의 합이 12를 넘을 경우 자동으로 다음 줄로 박스가 넘어감

!!! tip
    반응형 웹페이지로 개발하려면 `col-md-n`과 같이 작성하여 `breakpoint`와 같이 사용해야함

## Breakpoints

- `breakpoint`는 viewport의 크기에 따라 레이아웃이 변경되어 작동할 너비의 기준을 말함
- class 속성에서 실제로 사용되는 각 `breakpoint`의 약어와 정의는 [공식 문서](https://getbootstrap.com/docs/5.3/layout/breakpoints/#available-breakpoints)에서 확인 가능함

|    Breakpoint     | Class infix | Dimensions |
| :---------------: | :---------: | :--------: |
|    Extra small    |    None     |  < 576px   |
|       Small       |    `sm`     |  ≥ 576px   |
|      Medium       |    `md`     |  ≥ 768px   |
|       Large       |    `lg`     |  ≥ 992px   |
|    Extra large    |    `xl`     |  ≥ 1200px  |
| Extra extra large |    `xxl`    |  ≥ 1400px  |
