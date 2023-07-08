---
published: true
layout: post
title: '[Python] 데이터를 저장하고 불러오기'
description: >
    메모리에 있는 데이터를 파일로 저장하고 불러오기
categories: [Python]
tags: [python]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 데이터의 재활용

프로그래밍을 하다보면 객체, 즉 메모리에 있는 바이너리 데이터를 파일로 저장하고 그 파일을 불러와서 재활용해야 하는 경우가 있다. 나는 주로 전처리 관련 모델과 AI 모델을 저장하고 다시 불러올 일이 많은데, 이 때 사용하는 모듈이 pickle과 Joblib이다.  

❗외부의 객체를 불러오는 것이기 때문에 절대 안전하지 않고, 반드시 신뢰할 수 있는 파일만 사용해야한다. Python에서 보안 및 데이터 암호화는 [hashlib](https://docs.python.org/3/library/hashlib.html)과 [hmac](https://docs.python.org/3/library/hmac.html)모듈 참고
{:.note title='attention'}

## pickle

pickle은 Python의 기본 모듈로 json 모듈과 마찬가지로 `dump` 함수로 파일을 저장하고 `load` 함수로 파일을 불러온다.  

```python
import pickle

class Foo:
    def __init__(self, data) -> None:
        self.data = data

foo = Foo('sample data')

with open(file='foo.pkl', mode='wb') as f:
    pickle.dump(foo, f)
```
```python
import pickle

with open(file='foo.pkl', mode='rb') as f:
    bar = pickle.load(file=f)

print(bar.data)
```
```
sample data
```

💡바이너리 파일을 읽고 쓰는 것이기 때문에 모드에 `b`를 지정해야 한다.  
{:.note}

## Joblib

Joblib은 데이터 파이프라이닝을 쉽게 하기 위한 라이브러리로 다른 기능들도 제공하지만 pickle을 쉽게 쓸 수 있는 `dump`와 `load` 함수를 제공한다.  

```python
import joblib

class Foo:
    def __init__(self, data) -> None:
        self.data = data

foo = Foo('sample data')

joblib.dump(foo, 'foo.joblib')
```
```python
import joblib

bar = joblib.load('foo.joblib')

print(bar.data)
```
```
sample data
```

아래와 같이 pickle과 같은 방식으로 사용할 수도 있다.  

```python
import joblib

class Foo:
    def __init__(self, data) -> None:
        self.data = data

foo = Foo('sample data')

with open(file='foo.joblib', mode='wb') as f:
    joblib.dump(foo, f)
```
```python
import joblib

with open(file='foo.joblib', mode='rb') as f:
    bar = joblib.load(filename=f)

print(bar.data)
```
```
sample data
```

## pickle vs Joblib

pickle은 Python 기본 모듈이고 Joblib은 pickle을 래핑하면서 기능을 추가한 모듈로 차이점은 아래와 같다.  

- pickle은 CPython 기본 모듈이기 때문에 다수의 저용량 객체를 처리하는 속도가 빠르다.
- Joblib은 AI 모델과 같은 대용량의 numpy array를 처리하는 속도가 매우 빠르며, 데이터를 압축해서 다뤄준다.
- Joblib은 numpy array의 데이터 버퍼를 로드할 때 메모리 매핑을 가능하게 하여 프로세스 간에 메모리를 공유할 수 있도록 한다.

---
## Reference
- [pickle — Python object serialization](https://docs.python.org/3/library/pickle.html)
- [Joblib: running Python functions as pipeline jobs](https://joblib.readthedocs.io/en/latest/)