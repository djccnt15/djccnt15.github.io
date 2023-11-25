---
published: true
layout: post
title: '[pandas] 문자열 칼럼 다루기'
description: >
    pandas로 문자열 칼럼 쉽게 다루기
categories: [DataAnalysis]
tags: [python, pandas]
image:
    path: /assets/img/posts/thumbnail_pandas.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 데이터 준비

pandas로 데이터를 전처리하다보면 문자열 칼럼을 처리할 일이 종종 있다. 이 때 유용한 메서드들이 있어 정리해둔다.  

```python
import pydataset as pds

df = pds.data('iris')
df = df[['Species']]
```

## 문자열 슬라이싱

문자열 칼럼을 슬라이싱 하는 방법은 아래와 같다.  

```python
df['test'] = df['Species'].str.slice(start=1, stop=5)

print(df.head())
```
```
  Species  test
1  setosa  etos
2  setosa  etos
3  setosa  etos
4  setosa  etos
5  setosa  etos
```

```python
df['test'] = df['Species'].str.slice(step=2)

print(df.head())
```
```
  Species test
1  setosa  sts
2  setosa  sts
3  setosa  sts
4  setosa  sts
5  setosa  sts
```

## 문자열 split

특정 문자를 기준으로 split하는 방법은 아래와 같다.  

```python
df['test'] = df['Species'].str.split('o')

print(df.head())
```
```
  Species       test
1  setosa  [set, sa]
2  setosa  [set, sa]
3  setosa  [set, sa]
4  setosa  [set, sa]
5  setosa  [set, sa]
```

## 응용

위 메서드들을 응용하면, 칼럼에 배열이 들어있는 형태의 칼럼을 처리해주는 함수를 아래와 같이 만들 수 있다. 일정한 길이의 배열에 담은 센서 데이터를 한 칼럼에 저장한 형태의 데이터를 일괄적으로 전처리하기 위해 만들어 보았다.  

```python
import pandas as pd


def df_text_split(df: pd.DataFrame, col_name: list[str], target: str, sep: str = ','):
    df_sep = pd.DataFrame(df[target].str.split(sep).tolist(), columns=col_name)
    df.drop(columns=target, inplace=True)
    return pd.concat(objs=[df, df_sep], axis=1)
```