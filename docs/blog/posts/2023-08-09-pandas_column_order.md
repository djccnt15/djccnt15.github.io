---
slug: pandas-how-to-change-column-order
title: pandas DataFrame의 칼럼 순서 바꾸기
date:
    created: 2023-08-09
description: >
    pandas DataFrame의 칼럼 순서 바꾸는 방법
categories:
    - Data Analysis
tags:
    - pandas
---

pandas DataFrame의 칼럼 순서를 바꾸는 방법  

<!-- more -->

---

## DataFrame 칼럼 순서 바꾸기

pandas를 이용해서 데이터를 분석할 때 칼럼의 순서를 바꾸고 싶은 경우가 종종 있다. 이 때는 아래와 같은 방법으로 손쉽게 바꿔줄 수 있다.  

```python
import pydataset as pds

df = pds.data('iris')
print(df.head())
```
```
   Sepal.Length  Sepal.Width  Petal.Length  Petal.Width Species
1           5.1          3.5           1.4          0.2  setosa
2           4.9          3.0           1.4          0.2  setosa
3           4.7          3.2           1.3          0.2  setosa
4           4.6          3.1           1.5          0.2  setosa
5           5.0          3.6           1.4          0.2  setosa
```

```python
df = df[['Species', 'Petal.Width', 'Petal.Length', 'Sepal.Width', 'Sepal.Length']]
print(df.head())
```
```
  Species  Petal.Width  Petal.Length  Sepal.Width  Sepal.Length
1  setosa          0.2           1.4          3.5           5.1
2  setosa          0.2           1.4          3.0           4.9
3  setosa          0.2           1.3          3.2           4.7
4  setosa          0.2           1.5          3.1           4.6
5  setosa          0.2           1.4          3.6           5.0
```
