---
published: true
layout: post

title: '[수학] SymPy 입문'
description: >
    SymPy로 입문하는 symbolic computation
hide_description: false
image:
    path: /assets/img/posts/sympy_tutorial.png
related_posts:
    - _posts/maths/2022-07-17-sympy_tutorial.md

categories:
    - maths
tags:
    - maths
    - sympy
---
* toc
{:toc}

## SymPy 입문

`SymPy`는 기호 수학(symbolic mathematics)을 위한 `python` 라이브러리로 기호를 선언해서 사람이 직접 계산하는 것과 같은 기호 계산(symbolic computation)을 가능하게 해준다.  

기호 수학을 통한 계산은 부동소수점 문제를 방지할 수 있는데, 제곱근(square root) 계산이 포함된 아래 예시를 비교해보자.  

```python
import math

x = math.sqrt(8)
res = x ** 2

print(res)
```
```
8.000000000000002
```

```python
import sympy as sp

x = sp.sqrt(8)
res = x ** 2

print(res)
```
```
8
```

## 변수 선언

기호 수학의 시작은 미지수를 정의하는 것인데, `sympy`에서 변수(수학)를 변수(프로그래밍)로 선언하는 방법은 아래와 같다.  

```python
import sympy as sp

x = sp.symbols('x')

print(type(x))
```
```
<class 'sympy.core.symbol.Symbol'>
```

## 수식 선언

`sympy`를 사용하면 아래와 같이 변수를 바탕으로 수식을 선언하고 수식을 객체로 다룰 수 있다.  

```python
import sympy as sp

x, y = sp.symbols('x y')
expr = x + 2*y

print(expr)
```
```
x + 2*y
```

```python
expr = expr - x + 1

print(expr)
```
```
2*y + 1
```

### 등식

`sympy`에서 등식을 선언하고 해를 구하는 방법은 아래와 같다.  

```python
import sympy as sp

x = sp.symbols('x')
expr = sp.Eq(x + 1, 4)

print(expr)
```
```
Eq(x + 1, 4)
```

```python
res = sp.solve(expr)

print(res)
```
```
[3]
```

### 식의 비교

`sympy`에서 두 식이 같은 식인지를 확인하는 방법은 아래와 같다.  

```python
import sympy as sp

x = sp.symbols('x')

a = (x + 1)**2
b = x**2 + 2*x + 1

res = a.equals(b)

print(res)
```
```
True
```

💡 `sympy`에서 `==`는 구조적으로 완벽히 동일한지를 확인하고 `boolean`결과를 반환하는 연산을 한다.  
{:.note}

## 다항식의 전개

`expand`와 `factor`를 이용하면 아래와 같이 다항식을 전개하거나 인수분해할 수 있다.  

```python
import sympy as sp

x, y = sp.symbols('x y')
expr = x + 2*y

expr = x * expr

print(expr)
```
```
x*(x + 2*y)
```

```python
expr = sp.expand(expr)

print(expr)
```
```
x**2 + 2*x*y
```

```python
expr = sp.factor(expr)

print(expr)
```
```
x*(x + 2*y)
```

## 대입

`sympy`를 통해 선언한 수식의 변수에 숫자를 대입하려면 아래와 같이 `subs` 메서드를 사용하면 된다.  

```python
import sympy as sp

x, y = sp.symbols('x y')
expr = x + 2*y

expr = expr.subs([(x, 2), (y, 3)])

print(expr)
```
```
8
```

---
## Reference
- [SymPy’s documentation](https://docs.sympy.org/)
- [SymPy Tutorial](https://docs.sympy.org/latest/tutorial/index.html#tutorial)