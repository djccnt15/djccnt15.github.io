---
slug: dict-parser
title: dictionary Parser
date:
    created: 2025-03-22
description: >
    딕셔너리 parser 직접 만들어보기
categories:
    - Python
tags:
    - python
    - dict
    - json
---

[addict 라이브러리](./2022-11-20-python_addict.md)를 사용할 수 없는 상황에서 Python에서 `dictionary`를 쉽게 다룰 수 있는 parser를 직접 만들어보자.  

<!-- more -->

---

## Parser

```python
from collections.abc import Iterable, Mapping


class ParsedDict(dict):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key, value in self.items():
            self[key] = self.__convert(value)

    def __convert(self, value):
        if isinstance(value, Mapping):
            return ParsedDict(value)
        elif isinstance(value, Iterable) and not isinstance(value, (str, bytes)):
            return type(value)(self.__convert(v) for v in value)
        return value

    def __getattr__(self, name):
        try:
            return self[name]
        except KeyError:
            raise AttributeError(name)

    def __setattr__(self, name, value):
        self[name] = value
```

비즈니스 로직에서는 아래와 같이 사용할 수 있다.  

```python
nested_data = {
    "a": {
        "b": {"c": 42},
        "d": [1, {"e": 2}],
        "f": {3, 4, (5, 6, 7)},
    },
}
parsed_data = ParsedDict(nested_data)

print(f"{parsed_data.a.b.c=}")
print(f"{parsed_data.a.d[1].e=}")
print(f"{parsed_data.a.f=}")
```
```
parsed_data.a.b.c=42
parsed_data.a.d[1].e=2
parsed_data.a.f={(5, 6, 7), 3, 4}
```
```python
dict_again = dict(parsed_data)
print(f"{dict_again['a']=}")
```
```
dict_again['a']={'b': {'c': 42}, 'd': [1, {'e': 2}], 'f': {(5, 6, 7), 3, 4}}
```

---
## Reference
- [addict](https://github.com/mewwts/addict)
