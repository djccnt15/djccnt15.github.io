---
slug: handling-dict-easily
title: Dictionary 쉽게 사용하기
date:
    created: 2022-11-20
description: >
    addict 라이브러리로 Dictionary 편하게 다루기
categories:
    - Python
tags:
    - python
    - dict
    - json
---

addict 라이브러리로 Dictionary 편하게 다루기  

<!-- more -->

---

## 1. 다층 구조의 dict 자료형 만들기

Python에서 JSON을 다룰 때는 `dict` 타입을 사용하면 매우 편리하지만, 문제는 `dict` 타입이 그닥 코딩하기 편한 형태가 아니다.  

Python에서 다층 구조의 `dict` 타입 데이터를 만드는 방법은 다음과 같다.  

```python
output = {}
output["a"] = 1
output["b"] = 2
output["c"] = {}
output["c"]["d"] = 2
output["c"]["e"] = [3, 4]
output["c"]["f"] = {}
output["c"]["f"]["g"] = {}
output["c"]["f"]["g"]["h"] = [5, 6, 7]
output["c"]["f"]["g"]["i"] = [8, 9, 10]

print(type(output))
print(output)
```
```
<class 'dict'>
{'a': 1, 'b': 2, 'c': {'d': 2, 'e': [3, 4], 'f': {'g': {'h': [5, 6, 7], 'i': [8, 9, 10]}}}}
```

## 2. Dictionary 자료형 쉽게 다루기

addict 라이브러리를 사용하면 다층 구조의 `dict` 타입 데이터를 아래와 같이 매우 쉽게 다룰 수 있다.  

```python
from addict import Dict

test = Dict()
test.a = 1
test.b = 2
test.c.d = 2
test.c.e = [3, 4]
test.c.f.g.h = [5, 6, 7]
test.c.f.g.i = [8, 9, 10]

print(type(test))
print(test)
```
```
<class 'addict.addict.Dict'>
{'a': 1, 'b': 2, 'c': {'d': 2, 'e': [3, 4], 'f': {'g': {'h': [5, 6, 7], 'i': [8, 9, 10]}}}}
```

addict 라이브러리의 `Dict` 자료형을 Python의 `dict` 자료형으로 바꾸고 싶다면 아래와 같이 `to_dict` 메서드를 사용하면 된다.  

```python
test.to_dict()

print(type(test))
```
```
<class 'dict'>
```

## 3. JSON에 응용하기

JSON에 응용하면 아래와 같이 복잡한 다층구조의 JSON 데이터에서 특정 데이터만 추출하는 것도 매우 쉽다.  

```python
import json

from addict import Dict

with open('input.json') as input:
    json_data = Dict(json.load(fp=input))

res = json_data.c.f.g

print(type(json_data))
print(json_data)
print(res)
```
```
<class 'addict.addict.Dict'>
{'a': 1, 'b': 2, 'c': {'d': 2, 'e': [3, 4], 'f': {'g': {'h': [5, 6, 7], 'i': [8, 9, 10]}}}}
{'h': [5, 6, 7], 'i': [8, 9, 10]}
```

반대로 아래와 같이 `Dict` 자료형을 바로 JSON으로 저장하는 것도 가능하다.  

```python
from addict import Dict

output = Dict()
output.a = 1
output.b = 2

with open('json_example.json', 'w') as outfile:
    json.dump(obj=output, fp=outfile, indent=2)
```
```json
{
  "a": 1,
  "b": 2
}
```

---
## Reference
- [addict](https://github.com/mewwts/addict)
