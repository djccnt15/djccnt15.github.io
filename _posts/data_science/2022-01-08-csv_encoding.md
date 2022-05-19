---
published: true
layout: post

title: csv 인코딩
description: >
  pandas로 csv 인코딩 바꾸기
hide_description: false
image: 
  path: /assets/img/posts/scrap_result_2021.png
related_posts:
  - _posts/data_science/2022-01-08-csv_encoding.md

categories:
  - data_science
tags:
  - python
  - data science
  - pandas
  - csv
---

* toc
{:toc}

인터넷에서 가져온 csv파일의 경우 위와 같이 인코딩 문제로 다 깨져서 나오는 경우가 많다.  

이럴 때는 메모장으로 열어서 인코딩을 `ANSI`나 `UTF-8(BOM)`으로 변경하여 저장하면 되기는 하는데, `pandas`를 사용해서 바꿔주는 방법은 아래와 같다.  
`encoding` 인자를 `'utf-8-sig'`로 지정해주면 된다.  

```python
import pandas as pd

df = pd.read_csv('FILE_NAME.csv')
df.to_csv('FILE_NAME.csv', encoding='utf-8-sig')
```

결과물은 아래와 같다.  

![scrap_result_2021_encoded.png](/assets/img/posts/scrap_result_2021_encoded.png)  