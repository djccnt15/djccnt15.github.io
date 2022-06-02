---
published: true
layout: post

title: 상관 계수
description: >
  python으로 상관 분석 구현하기
hide_description: false
image: 
  path: /assets/img/posts/github_pages.png
# related_posts:
#   - _posts/blog/2017-11-23-example-content-ii.md

categories:
  - maths
tags:
  - python
  - correlation coefficient
---

* toc
{:toc}

## 피어슨 상관 계수

### 공분산

**공분산(covariance)**은 두 개의 확률 변수의 선형관계를 나타내는 값으로, 기본 정의는 아래와 같다.  

$$Cov(X,Y) = \mathrm{E}\{(X - \mathrm{E}[X])\,(Y - \mathrm{E}[Y])\}$$

피어슨 상관 계수는 **표본 공분산(sample covariance)**을 기반으로 구할 수 있는데, 표본 공분산의 수식은 아래와 같다.  

$$Cov(X,Y) = \frac{\sum_{i}^{n}(X_i - \overline{X})(Y_i - \overline{Y})}{n - 1}$$

표본 공분산을 `python`으로 구현하면 아래와 같다.  

```python
```

### 피어슨 상관 계수

**피어슨 상관 계수(Pearson correlation coefficient, Pearson's r)**는 데이터 분석에서 가장 널리 쓰이는 상관 계수로, 측정하려는 두 변수의 상관 관계가 서로 선형일 때(1차 함수로 표현 가능)할 때 유용하다. 피어슨 상관 계수는 두 변수의 표본 공분산을 각각 표준 편차의 곱으로 나눈 값으로, 수식을 정리하면 아래와 같다.  

$$\begin{align*}
r_{xy} & = \frac{\frac{\sum_{i=1}^{n}(x_{i} - \overline{x})(y_{i} - \overline{y})}{n - 1}}{\sqrt{\frac{\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}}{n - 1}} \sqrt{\frac{\sum_{i}^{n}(y_{i} - \overline{y})^{2}}{n - 1}}} \\
& \\
& = \frac{\sum_{i=1}^{n}(x_{i} - \overline{x})(y_{i} - \overline{y})}{\sqrt{\sum_{i=1}^{n}(x_{i} - \overline{x})^{2}}  \sqrt{\sum_{i=1}^{n}(y_{i} - \overline{y})^{2}}}
\end{align*}$$

`python`으로 구현하면 아래와 같다.  

```
```

## 스피어만 상관 계수

text

## 켄달 상관 계수

text

---
## Reference
- text