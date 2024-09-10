---
slug: pandas-profiling
title: pandas를 활용한 데이터 프로파일링
date:
    created: 2023-03-18
description: >
    pandas DataFrame 기초 프로파일링 쉽게 하는 방법
categories:
    - Data Analysis
tags:
    - pandas
---

pandas DataFrame 기초 프로파일링 쉽게 하는 방법  

<!-- more -->

---

## ydata-profiling

데이터 분석을 시작하면 제일 데이터를 프로파일링하고 EDA를 진행해야 한다. 이 때 아래와 같이 ydata-profiling 라이브러리를 사용하면 매우 쉽게 기초 EDA 결과를 확인할 수 있다.  

!!! info
    인터넷에 관련 자료를 찾아보면 pandas-profiling 라이브러리에 대한 후기가 많은데, 해당 라이브러리가 ydata-profiling으로 변경되었으며 pandas-profiling은 곧 지원을 종료한다고 한다.  

ydata-profiling 패키지를 사용하는 기초 방법은 아래와 같다.  

```python
import pydataset as pds
from ydata_profiling import ProfileReport

df = pds.data('iris')
profile = ProfileReport(df, title="Profiling Report")
profile.to_file("your_report.html")
```

대략 아래와 같은 보고서를 만들어준다.  

![ydata_sample](./img/ydata_sample.gif){ loading=lazy width=600 }  
^[출처: https://ydata-profiling.ydata.ai](https://ydata-profiling.ydata.ai/docs/master/pages/integrations/data_apps.html)^

---
## Reference
- [ydata-profiling](https://ydata-profiling.ydata.ai)
