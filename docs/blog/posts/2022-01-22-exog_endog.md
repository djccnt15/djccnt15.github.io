---
slug: exog-endog
title: 독립변수와 종속변수의 변수명
date:
    created: 2022-01-22
description: >
    모델 개발 시 독립변수와 종속변수의 변수명 작명 Tip
categories:
    - Data Analysis
tags:
    - data analysis
    - exog
    - endog
---

AI 모델을 개발할 때 독립변수와 종속변수의 변수명 작명 Tip  

<!-- more -->

---

## 독립변수와 종속변수의 변수명

데이터마이닝과 머신러닝을 다루다 보면 가장 많이 다루는 변수명은 독립변수와 종속변수에 대한 것일 것이다.  

보통은 `X : y`, `X : target`, `data : target`과 같은 조합을 많이 사용하는데, 그러면 코드에서 검색하기 힘들어 지거나 다른 용도의 변수와 헷갈릴 수 있어 좋지 않다.  

`exog : endog`의 조합은 간결하고, 명확하며, 절대 다른 변수와 헷갈릴 수 없는데다, 널리 사용되는 통계 및 데이터 분석 패키지 statsmodels에서 사용하는 변수명이기 때문에 상당히 좋은 변수명이라고 생각된다.  

statsmodels의 [공식 문서](https://www.statsmodels.org/stable/endog_exog.html)에서는 `exog`와 `endog`의 유래를 아래와 같이 밝히고 있다.  

- `exog`: exogenous, caused by factors outside the system
- `endog`: endogenous, caused by factors within the system

참고할 만한 독립변수와 종속변수의 변수명 조합들은 아래와 같다.  

| independent Variable | dependent Variable |
| :------------------: | :----------------: |
|         exog         |       endog        |
|       independ       |       depend       |
|          X           |         y          |
|         data         |       target       |

---
## Reference
- [statsmodels.org - endog, exog, what’s that?](https://www.statsmodels.org/stable/endog_exog.html)
