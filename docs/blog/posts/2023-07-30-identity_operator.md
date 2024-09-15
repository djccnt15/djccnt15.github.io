---
slug: identity-operator
title: 동일성 vs 동등성
date:
    created: 2023-07-30
description: >
    동일성(is) vs 동등성(==)
categories:
    - Python
tags:
    - identity operator
---

Python의 동일성(is)과 동등성(==)  

<!-- more -->

---

## 동일성 vs 동등성

Python에서 값을 비교하는 방법은 `is`와 `==` 두 가지가 있다.  

- `is`: 동일성(Identity) 비교
    - 객체가 할당된 메모리 공간(id)이 동일한지 비교
- `==`: 동등성(Equality) 비교
    - 값이 같은지 비교


아래와 같은 두 객체를 예시로 들어보면,  

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b, a is b)
```
```
True False
```

위와 같은 결과가 나온다.  

두 객체의 id를 확인해보면 아래와 같이 다르게 나오는 것을 확인할 수 있다.  

```python
print(f'{id(a)=}')
print(f'{id(b)=}')
```
```
id(a)=1934227422144
id(b)=1934227407616
```

## 활용

`==` 연산 보다는 메모리의 주소를 참조하는 `is` 연산을 사용하는게 조금 더 빠르기 때문에 메모리 주소가 고정된 Singleton 객체와 대조하는 경우 `is` 연산을 사용하는 것이 더 좋다.  

PEP에서도 아래와 같이 `None`과 같은 Singleton 객체와 대조하는 경우에는 `is` 또는 `is not`을 사용하도록 권장하고 있다.  

!!! note
    Comparisons to singletons like None should always be done with `is` or `is not`, never the equality operators.

---
## Reference
- [PEP 8 – Style Guide for Python Code : Programming Recommendations](https://peps.python.org/pep-0008/#programming-recommendations)
