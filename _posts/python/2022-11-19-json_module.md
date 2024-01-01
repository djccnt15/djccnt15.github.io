---
published: true
layout: post
title: '[Python] JSON 파일 다루기'
description: >
    Python으로 JSON 읽고 쓰기
categories: [Python]
tags: [python, json]
image:
    path: /assets/img/posts/thumbnail_json.png
related_posts:
    - _posts/python/2022-11-20-addict_package.md
---
* toc
{:toc}

## JSON과 Dictionary 자료형

JSON은 **{Key: Value}** 쌍으로 이루어져있어 데이터의 저장 및 전달에 유용한 데이터 타입이라 이래저래 많이 쓰인다.  

Python에서는 [Dictionaries](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) 자료형이 동일한 구조를 갖고 있으며, 기본 모듈로 제공되는 json 모듈과 `dict` 객체를 이용해서 JSON 파일을 읽고 수정할 수 있다.  

## JSON 읽기

아래와 같은 `input.json` 파일이 있다고 해보자.  

```json
{
    "a": 1,
    "b": 2,
    "c": {
        "d": 2,
        "e": [3, 4],
        "f": {
            "g": {
                "h": [5, 6, 7],
                "i": [8, 9, 10]
            }
        }
    }
}
```

위와 같은 JSON 파일을 읽기 위해서는 아래와 같이 `json.load`를 사용해 `dict` 타입으로 불러와주면 된다.  

```python
import json

with open('input.json') as input:
    data = json.load(fp=input)

res = data["c"]["f"]["g"]

print(type(data))
print(data)
print(res)
```
```
<class 'dict'>
{'a': 1, 'b': 2, 'c': {'d': 2, 'e': [3, 4], 'f': {'g': {'h': [5, 6, 7], 'i': [8, 9, 10]}}}}
{'h': [5, 6, 7], 'i': [8, 9, 10]}
```

로드 된 JSON 데이터는 `dict` 자료형으로 처리되기 때문에 수정하는 방법은 `dict` 자료형을 수정하는 방법과 같다.  

## JSON 저장하기

반대로 `dict` 타입 데이터를 JSON으로 저장하려면 `json.dump`를 사용하면 된다.  

```python
import json

example = {"a": 1,"b": 2, "c": 3}

with open('output.json', 'w') as f:
    json.dump(obj=example, fp=f, indent=2)
```

`output.json`을 열어보면 아래와 같이 저장되어 있다.  

```json
{
  "a": 1,
  "b": 2,
  "c": 3
}
```

---
## Reference
- [json — JSON encoder and decoder](https://docs.python.org/3/library/json.html)([한글](https://docs.python.org/ko/3/library/json.html))