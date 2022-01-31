---
title: "numpy array의 변형"
excerpt: "reshape, transpose, T의 활용"
published: true
mathjax: false

toc: true
toc_sticky: true

categories:
  - data mining
tags:
  - python
  - data mining
  - numpy
---
# {{ page.excerpt }}
---
`numpy.array`를 쉽게 변형해보자.  

```python
import numpy as np

array = np.arange(24)

print(array)
```

## 1. reshape
`numpy.array`의 데이터 변형 없이 모양만 바꿔주는 함수로, 주요 인자는 아래와 같다.  

- a: array_like, 변형될 데이터
- newshape: 변형할 모양, -1이 입력되면 나머지 차원의 설정에 따라 자동으로 계산된다
{: .notice}

```python
import numpy as np

reshape = np.reshape(a=array, newshape=(3, -1))

print(reshape)
```
```markdown
[[ 0  1  2  3  4  5  6  7]
 [ 8  9 10 11 12 13 14 15]
 [16 17 18 19 20 21 22 23]]
```

## 2. transpose, ndarray.T
함수냐 메서드냐 차이만 있을 뿐 둘 모두 원본 데이터의 축을 뒤집어 주는 기능은 똑같다.  

```python
import numpy as np

transpose = np.transpose(a=reshape)

print(transpose)
```
```markdown
[[ 0  8 16]
 [ 1  9 17]
 [ 2 10 18]
 [ 3 11 19]
 [ 4 12 20]
 [ 5 13 21]
 [ 6 14 22]
 [ 7 15 23]]
```

```python
import numpy as np

print(reshape.T)
```
```markdown
[[ 0  8 16]
 [ 1  9 17]
 [ 2 10 18]
 [ 3 11 19]
 [ 4 12 20]
 [ 5 13 21]
 [ 6 14 22]
 [ 7 15 23]]
```

다차원의 데이터도 뒤집을 수 있다.

```python
import numpy as np

array = np.arange(24)

reshape = np.reshape(a=array, newshape=(2, 3, -1))

print(reshape)
```
```markdown
[[[ 0  1  2  3]
  [ 4  5  6  7]
  [ 8  9 10 11]]

 [[12 13 14 15]
  [16 17 18 19]
  [20 21 22 23]]]
```

```python
import numpy as np

print(reshape.T)
```
```markdown
[[[ 0 12]
  [ 4 16]
  [ 8 20]]

 [[ 1 13]
  [ 5 17]
  [ 9 21]]

 [[ 2 14]
  [ 6 18]
  [10 22]]

 [[ 3 15]
  [ 7 19]
  [11 23]]]
```
---
# Reference
- [numpy.reshape](https://numpy.org/doc/stable/reference/generated/numpy.reshape.html)
- [numpy.transpose](https://numpy.org/doc/stable/reference/generated/numpy.transpose.html#numpy.transpose)
- [numpy.ndarray.T](https://numpy.org/doc/stable/reference/generated/numpy.ndarray.T.html)