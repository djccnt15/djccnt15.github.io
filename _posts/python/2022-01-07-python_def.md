---
published: true
layout: post

title: '[Python] function'
description: >
    python의 함수에 대한 노트
hide_description: false
image:
    path: /assets/img/posts/def_func.png
related_posts:
    - _posts/python/2022-01-06-about_PEP.md

categories:
    - python
tags:
    - python
    - programming
---
* toc
{:toc}

## Ellipsis

Ellipsis는 말줄임표를 말하는데, `python`에서 Ellipsis라고 할 경우 `...`을 말한다. 함수나 제어문에서 `pass`를 대신하여 사용할 수 있다.  

```python
for i in range(10):
    if i == 5:
        ...

    print(i, end='')
```
```
0123456789
```

```python
def test(): ...

print(test())
```
```
None
```

## parameter의 초기값 지정

parameter의 초기값은 아래와 같이 지정할 수 있다. `__defaults__` 속성을 사용하면 각 parameter에 지정된 초기값을 확인할 수 있다.  

```python
def add(a=1, b=False):

    return a + b

print(add.__defaults__)
```
```
(1, False)
```

```python
print(add(1))
```
```
1
```

💡 함수에 입력값이 없어도 되는 parameter를 만들고 싶을 때는 초기값을 `False`로 지정하면 된다.  
{:.note}

❗ 초기값이 설정된 parameter는 초기값이 설정되지 않는 parameter보다 반드시 뒤에 나와야 한다.  
{:.note title='attention'}

## Function Annotation

`python`의 함수를 작성할 때, 다음과 같이 각 `parameter`와 `return`의 형태에 대한 주석을 달아서 작성할 수 있다. `#`을 이용해서 표기한 주석과 마찬가지로 어떠한 강제성도 없다. `__annotations__` 속성을 사용하면 내용을 확인할 수 있다.  

```python
def add(a:'a is int', b:int) -> int:

    return a + b

print(add.__annotations__)
```
```
{'a': 'a is int', 'b': <class 'int'>, 'return': <class 'int'>}
```

## Function Document

함수에 대한 문서를 코드 내부에 작성하고 싶을 때는 아래와 같이 작성하면 된다. `__doc__` 속성을 사용해서 내용을 확인할 수 있다.

```python
def add(a, b):
    'this is test function'

    return a + b

print(add.__doc__)
```
```
this is test function
```

## *args, **kwargs

`asterisk`를 사용해서 하나의 인자가 여러개의 입력값을 받거나 여러개의 인자가 하나의 집합객체를 각각 입력받는 함수를 만들 수 있다. 각각 `packing`, `unpacking`이라고 한다. 같은 개념인데, `asterisk`가 `parameter`에 붙는지 아니면 `input`에 붙는지만 달라진다고 보면 된다.  

```python
a = [1, 2]
b = [3, 4]
c = [a, b, b, b]

# addition of vector
def v_add(*a): # packing
    res = [sum(v) for v in zip(*a)]

    return res

res = v_add(*c) # unpacking

print(res)
```
```
[10, 14]
```

```python
def test(**kwargs): # packing

    return kwargs

print(test(name='John Doe', age=30))
```
```
{'name': 'John Doe', 'age': 30}
```

---
## Reference
- [Python Documentation: Defining Functions](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)([한글](https://docs.python.org/ko/3/tutorial/controlflow.html#defining-functions))
- [PEP 3107 – Function Annotations](https://peps.python.org/pep-3107/)