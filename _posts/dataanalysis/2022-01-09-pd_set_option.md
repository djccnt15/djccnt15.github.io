---
published: true
layout: post
title: '[pandas] pandas 옵션 설정'
description: >
    pandas.set_option 사용법
categories: [DataAnalysis]
tags: [python, pandas]
image:
    path: /assets/img/posts/thumbnail_pandas.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. display.max_rows

DataFrame의 출력이 생략되서 나올 때는 `display.max_rows`옵션을 수정해서 출력 가능 숫자를 확인할 수 있다.  
물론 별도의 파일로 저장해서 Excel이나 Access를 통해 확인하는게 더 효과적이긴 할텐데, 별도의 파일을 만들지 않고 싶을 때는 `display.max_rows`옵션을 수정해서 출력하면 된다.

```python
import pandas as pd

df = pd.DataFrame()
df['test'] = [i for i in range(65)]

print(df)
```
```
    test
0      0
1      1
2      2
3      3
4      4
..   ...
60    60
61    61
62    62
63    63
64    64

[65 rows x 1 columns]
```

```python
import pandas as pd

pd.set_option('display.max_rows', None)

df = pd.DataFrame()
df['test'] = [i for i in range(65)]

print(df)
```
```
    test
0      0
1      1
2      2
3      3
4      4
5      5
6      6
7      7
8      8
9      9
10    10
11    11
12    12
13    13
14    14
15    15
16    16
17    17
18    18
19    19
20    20
21    21
22    22
23    23
24    24
25    25
26    26
27    27
28    28
29    29
30    30
31    31
32    32
33    33
34    34
35    35
36    36
37    37
38    38
39    39
40    40
41    41
42    42
43    43
44    44
45    45
46    46
47    47
48    48
49    49
50    50
51    51
52    52
53    53
54    54
55    55
56    56
57    57
58    58
59    59
60    60
61    61
62    62
63    63
64    64
```

---
## Reference
- [pandas.set_option](https://pandas.pydata.org/docs/reference/api/pandas.set_option.html)