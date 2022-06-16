---
published: true
layout: post

title: '[선형대수] 08. QR 분해'
description: >
  정사영, 그람-슈미트 과정, QR 분해
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_08.png
related_posts:
  - _posts/maths/2022-06-05-linear_algebra_07.md
  - _posts/maths/2022-06-09-linear_algebra_09.md

categories:
  - maths
tags:
  - data science
  - linear algebra
  - python
  - numpy
  - scipy
---
* toc
{:toc}

AI를 제대로 이해하고 구현하려면 선형대수의 이해가 필요해서 선형대수를 기초부터 다시 공부하고 정리하려고 한다.  
교재로는 **장철원**님의 **알고리즘 구현으로 배우는 선형대수 with 파이썬**을 보고 있다.  

[구현한 함수 저장소](https://github.com/djccnt15/maths)

## 1. 정사영

**정사영(projection)**이란 한 벡터 공간에 속한 벡터를 부분 공간으로 수직으로 투영하는 것을 말하며, 벡터 $$\mathbf{u}$$를 벡터 $$\mathbf{v}$$에 정사영시키는 것을 아래와 같이 표기한다.  

$$\begin{align*}
proj_{\mathbf{v}} \mathbf{u} & = \Vert \mathbf{u} \Vert \vert \cos \theta \vert \frac{\mathbf{v}}{\Vert \mathbf{v} \Vert} = \Vert \mathbf{u} \Vert \frac{\mathbf{u} \cdot \mathbf{v}}{\Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert} \frac{\mathbf{v}}{\Vert \mathbf{v} \Vert} \\
\\
& = \frac{\mathbf{u} \cdot \mathbf{v}}{\Vert \mathbf{v} \Vert^{2}}\mathbf{v} = \frac{\langle \mathbf{u}, \mathbf{v} \rangle}{\Vert \mathbf{v} \Vert^{2}}\mathbf{v} = \frac{\langle \mathbf{u}, \mathbf{v} \rangle}{\langle \mathbf{v}, \mathbf{v} \rangle}\mathbf{v} \\
\end{align*}$$

정사영 $$proj_{\mathbf{v}} \mathbf{u}$$는 $$\mathbf{u}$$가 갖고 있는 $$\mathbf{v}$$의 성분을 의미한다. `python`으로 구현하면 아래와 같다.  

```python
# projection
def proj(a, b):
    tmp = v_inner(a, b) / v_inner(b, b)
    res = v_smul(tmp, b)

    return res
```

`numpy`를 사용해서 구현하면 아래와 같다.  

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([2, 4, 8])

res = (np.inner(a, b) / np.inner(b, b)) * b
```

벡터 $$\mathbf{u}$$를 벡터$$\mathbf{v}$$에 정사영 시킨 길이 $$\Vert proj_{\mathbf{v}} \mathbf{u} \Vert$$는 다음과 같다.  

$$\Vert proj_{\mathbf{v}} \mathbf{u} \Vert = \Vert \mathbf{u} \Vert \vert \cos \theta \vert$$

정사영을 이용해 내적을 정리하면, 벡터 $$\mathbf{u}$$와 벡터 $$\mathbf{v}$$의 내적이란 벡터 $$\mathbf{u}$$를 벡터 $$\mathbf{v}$$에 정사영시킨 벡터의 길이, 즉 $$\Vert \mathbf{u} \Vert \vert \cos \theta \vert$$와 기존 벡터 $$\mathbf{v}$$의 길이인 $$\Vert \mathbf{v} \Vert$$의 곱과 같다.  

$$\begin{align*}
\langle \mathbf{u}, \mathbf{v} \rangle & = \Vert \mathbf{u} \Vert \Vert \mathbf{v} \Vert \cos \theta \\
\\
& = (\Vert \mathbf{v} \Vert) \times (\Vert \mathbf{u} \Vert \cos \theta) \\
\\
& = (length \ of \ vector \ \mathbf{v}) \times (length \ of \ vector \ proj_{\mathbf{v}}\mathbf{u}) \\
\end{align*}$$

### 정사영 정리

**부분 공간에 대한 정사영 정리(projection theorem for subspaces)**의 내용은 아래와 같다.  

- 벡터 공간 $$S$$의 부분 공간 $$W$$가 존재할 때 벡터 공간 $$S$$에 속하는 임의의 벡터 $$\mathbf{a}$$는 다음과 같이 표현 가능하다.  

$$\mathbf{a} = \mathbf{w}_{1} + \mathbf{w}_{2}$$

- 이 때, $$\mathbf{w}_{1}$$은 부분 공간 $$W$$에 속하는 벡터이며 $$\mathbf{w}_{2}$$는 부분 공간의 직교 공간인 $$W^{\bot}$$에 속하는 벡터다.  

### 직교 정사영

벡터 공간 $$S$$의 부분 공간 $$W$$에서 부분 공간 $$W$$의  **직교 기저(orthogonal basis)**가 $$U = \{ \mathbf{u}_{1}, \mathbf{u}_{2}, \cdots, \mathbf{u}_{n} \}$$일 때, $$\mathbf{a}$$가 전체 벡터 공간 $$S$$의 임의의 벡터이면 $$\mathbf{a}$$를 $$W$$로 정사영 시킨 벡터는 다음과 같다. [직교 벡터를 활용한 좌표 표현](/maths/2022-06-05-linear_algebra_07/#직교-벡터를-활용한-좌표-표현)을 참고하자.  

$$proj_{\mathbf{w}} \mathbf{a} = \frac{\langle \mathbf{a}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}\mathbf{u}_{1} + \frac{\langle \mathbf{a}, \mathbf{u}_{2} \rangle}{\Vert \mathbf{u}_{2} \Vert^{2}}\mathbf{u}_{2} + \cdots + \frac{\langle \mathbf{a}, \mathbf{u}_{n} \rangle}{\Vert \mathbf{u}_{n} \Vert^{2}}\mathbf{u}_{n}$$

따라서 $$proj_{\mathbf{w}} \mathbf{a}$$의 좌표는 다음과 같다.  

$$proj_{\mathbf{w}} \mathbf{a} = \left\{ \frac{\langle \mathbf{a}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}, \frac{\langle \mathbf{a}, \mathbf{u}_{2} \rangle}{\Vert \mathbf{u}_{2} \Vert^{2}}, \cdots, \frac{\langle \mathbf{a}, \mathbf{u}_{n} \rangle}{\Vert \mathbf{u}_{n} \Vert^{2}} \right\}$$

벡터 공간 $$S$$의 부분 공간 $$W$$에서, 부분 공간 $$W$$의 **정규 직교 기저(orthonormal basis)**가 $$\{ \mathbf{v}_{1}, \mathbf{v}_{2}, \cdots, \mathbf{v}_{n} \}$$일 때, $$\mathbf{a}$$가 전체 벡터 공간 $$S$$의 임의의 벡터이면 $$\mathbf{a}$$를 $$W$$로 정사영시킨 벡터는 다음과 같다. [정규 직교 벡터를 활용한 좌표 표현](/maths/2022-06-05-linear_algebra_07/#정규-직교-벡터를-활용한-좌표-표현)을 참고하자.  

$$proj_{\mathbf{w}} \mathbf{a} = \langle \mathbf{a}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} + \cdots + \langle \mathbf{a}, \mathbf{v}_{n} \rangle \mathbf{v}_{n}$$

## 2. 그람-슈미트 과정

**그람-슈미트 과정(Gram-Schmidt Process)**은 기저(basis) 벡터 $$\{ \mathbf{s}_{1}, \mathbf{s}_{2}, \cdots, \mathbf{s}_{n} \}$$를 직교 기저(orthogonal basis) 벡터 $$\{ \mathbf{u}_{1}, \mathbf{u}_{2}, \cdots, \mathbf{u}_{n} \}$$로 변환하는 과정을 의미한다. 그람-슈미트 과정은 다음과 같은 단계로 진행 된다.  

- 1) 기존 기저 벡터 $$\mathbf{s}_{1}$$을 통해 새로운 직교 기저 벡터 $$\mathbf{u}_{1}$$을 정의한다.

$$\mathbf{u}_{1} = \mathbf{s}_{1}$$

- 2) 첫 번째 단계에서 만든 직교 기저 벡터 $$\mathbf{u}_{1}$$를 통해 두 번째 직교 기저 벡터 $$\mathbf{u}_{2}$$를 생성한다.

$$\mathbf{u}_{2} = \mathbf{s}_{2} - \frac{\langle \mathbf{s}_{2}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}\mathbf{u}_{1} = \mathbf{s}_{2} - proj_{\mathbf{u}_{1}} \mathbf{s}_{2}$$

- n) 같은 방식으로 n 번째 직교 기저 벡터까지 구한다.

$$\begin{align*}
\mathbf{u}_{n} & = \mathbf{s}_{n} - \frac{\langle \mathbf{s}_{n}, \mathbf{u}_{1} \rangle}{\Vert \mathbf{u}_{1} \Vert^{2}}\mathbf{u}_{1} - \frac{\langle \mathbf{s}_{n}, \mathbf{u}_{2} \rangle}{\Vert \mathbf{u}_{2} \Vert^{2}}\mathbf{u}_{2} - \cdots - \frac{\langle \mathbf{s}_{n}, \mathbf{u}_{n-1} \rangle}{\Vert \mathbf{u}_{n-1} \Vert^{2}}\mathbf{u}_{n-1} \\
\\
& = \mathbf{s}_{n} - \sum_{i=1}^{n-1}proj_{\mathbf{u}_{i}} \mathbf{s}_{n}
\end{align*}$$

이 과정을 그림으로 표현하면 아래와 같다.  

<img src="/assets/img/posts/Gram-Schmidt_orthonormalization_process.gif">
{:.text-center}
출처: [위키피디아: 그람-슈미트 과정](https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%9E%8C-%EC%8A%88%EB%AF%B8%ED%8A%B8_%EA%B3%BC%EC%A0%95)([영문](https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process))
{:.text-center}

앞서 구현한 함수들을 바탕으로 `python`으로 구현하면 아래와 같다.  

```python
# Gram-Schmidt Process
def gram_schmidt(s):
    res = []

    for i, v in enumerate(s):
        if i == 0:
            res.append(s[i])

        else:
            tmp = v_sub(s[i], v_add(*[proj(s[i], res[j]) for j in range(i)]))
            res.append(tmp)

    return res
```

## 3. QR분해

### QR분해의 기초

행렬 $$A$$의 **열 벡터** $$\mathbf{a}_i$$끼리 모두 선형 독립일 때, 행렬 $$A$$는 아래와 같이 정규 직교 벡터(orthonormal vector) $$n \times p$$ 행렬 $$Q$$와 가역 상 삼각행렬(invertible upper triangular matrix) $$R$$로 분해할 수 있다.  

$$A = QR$$

이러한 **QR분해(QR decomposition, QR factorization)**는 주어진 행렬을 직교하는 행렬로 나타내어 행렬을 다루기 편하게 만들어주며, 크기가 큰 행렬의 고유값을 구할 때 유용하게 사용된다.  
[정규 직교 벡터를 활용한 좌표 표현](/maths/2022-06-05-linear_algebra_07/#정규-직교-벡터를-활용한-좌표-표현)을 참고하면, 행렬 $$A$$의 각 열 벡터는 아래와 같이 나타낼 수 있다.  

$$\begin{align*}
\mathbf{a}_{1} = \langle \mathbf{a}_{1}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}_{1}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} & + \cdots + \langle \mathbf{a}_{1}, \mathbf{v}_{n} \rangle \mathbf{v}_{n} \\
\mathbf{a}_{2} = \langle \mathbf{a}_{2}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}_{2}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} & + \cdots + \langle \mathbf{a}_{2}, \mathbf{v}_{n} \rangle \mathbf{v}_{n} \\
& \vdots \\
\mathbf{a}_{n} = \langle \mathbf{a}_{n}, \mathbf{v}_{1} \rangle \mathbf{v}_{1} + \langle \mathbf{a}_{n}, \mathbf{v}_{2} \rangle \mathbf{v}_{2} & + \cdots + \langle \mathbf{a}_{n}, \mathbf{v}_{n} \rangle \mathbf{v}_{n} \\
\end{align*}$$

따라서 행렬 $$A$$는 다음과 같이 정리할 수 있다.  

$$(\mathbf{a}_{1} \quad \mathbf{a}_{2} \quad \cdots \quad \mathbf{a}_{n}) = (\mathbf{v}_{1} \quad \mathbf{v}_{2} \quad \cdots \quad \mathbf{v}_{n})\begin{pmatrix}
\langle \mathbf{a}_{1}, \mathbf{v}_{1} \rangle & \langle \mathbf{a}_{2}, \mathbf{v}_{1} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{1} \rangle \\
\langle \mathbf{a}_{1}, \mathbf{v}_{2} \rangle & \langle \mathbf{a}_{2}, \mathbf{v}_{2} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{2} \rangle \\
\vdots & \vdots & \ddots & \vdots \\
\langle \mathbf{a}_{1}, \mathbf{v}_{n} \rangle & \langle \mathbf{a}_{2}, \mathbf{v}_{n} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{n} \rangle \\
\end{pmatrix}$$

그람-슈미트 과정에 의해 정규 직교 벡터 $$\mathbf{v}_{j}$$는 벡터 $$\mathbf{a}_{1}, \mathbf{a}_{2}, \cdots, \mathbf{a}_{j-1}$$과 직교하기 때문에, 정규 직교 벡터 $$\mathbf{v}_{j}$$와 각 벡터 $$\mathbf{a}_{1}, \mathbf{a}_{2}, \cdots, \mathbf{a}_{j-1}$$의 내적값은 0이다. 이를 바탕으로 $$A = QR$$을 다시 정리하여 $$Q$$와 $$R$$을 분해하면 다음과 같다.  

$$\begin{align*} \\
& A = QR \\
\\
& Q = (\mathbf{v}_{1} \quad \mathbf{v}_{2} \quad \cdots \quad \mathbf{v}_{n}) \\
\\
& R = \begin{pmatrix}\langle \mathbf{a}_{1}, \mathbf{v}_{1} \rangle & \langle \mathbf{a}_{2}, \mathbf{v}_{1} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{1} \rangle \\
0 & \langle \mathbf{a}_{2}, \mathbf{v}_{2} \rangle & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{2} \rangle \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & \langle \mathbf{a}_{n}, \mathbf{v}_{n} \rangle \\
\end{pmatrix}
\end{align*}$$

### 그람-슈미트 과정을 이용한 QR분해

그람-슈미트 과정을 이용한 QR분해를 `python`으로 구현하면 아래와 같다.  

```python
# QR decomposition, QR factorization with Gram-Schmidt Process
def qr_gramschmidt(a):
    mat = mat_trans(a)
    n = len(mat)
    gs = gram_schmidt(mat)

    q_tmp = [normalize(i) for i in gs]
    q = mat_trans(q_tmp)

    r = [[0 if i > j else v_inner(mat[j], q_tmp[i]) for j in range(n)] for i in range(n)]

    return q, r
```

`numpy`, `scipy`로 구한 값과는 부호가 조금 다르게 나오는데, 바뀐 부호가 $$Q$$와 $$R$$에 공통적으로 적용되어 $$A = QR$$이라는 최종 검산 결과를 만족하면 상관 없다고 한다. 참고로 [WolframAlpha](https://www.wolframalpha.com/input?i=QR+decomposition+%7B%7B10%2C+-10%2C+4%2C+10%7D%2C+%7B20%2C+4%2C+-20%2C+8%7D%2C+%7B30%2C+40%2C+2%2C+6%7D%2C+%7B10%2C+-10%2C+0%2C+3%7D%7D)로 검산을 해보면 내가 구현한 함수와 동일한 부호로 값이 도출된다.  

### 하우스홀더 행렬을 이용한 QR분해

[하우스홀더 행렬](/maths/2022-05-19-linear_algebra_02/#8-하우스홀더-행렬)을 사용해서 구하는 방법도 있다. 그람-슈미트 방법과는 달리 부동소수점 연산에서도 오차가 누적되지 않기 때문에 더 많이 활용된다고 한다. 하우스홀더 행렬을 사용한 QR분해 방법은 다음과 같다.  

- 1) 주어진 행렬 $$A$$를 통해 $$\mathbf{v}_{1}$$를 구한다. 아래 식에서 $$sign$$은 벡터의 첫 스칼라의 부호로, 0 이상이면 $$+$$, 0 미만이면 $$-$$가 된다. $$\mathbf{e}_{1}$$은 [기저 벡터](/maths/2022-05-29-linear_algebra_06/#기저-벡터)를 말한다.  

$$A_{1} = A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} & a_{14} \\
a_{21} & a_{22} & a_{23} & a_{24} \\
a_{31} & a_{32} & a_{33} & a_{34} \\
a_{41} & a_{42} & a_{43} & a_{44} \\
\end{pmatrix}
= (\mathbf{a}_{1} \quad \mathbf{a}_{2} \quad \cdots \quad \mathbf{a}_{n})$$

$$\begin{align*}
\mathbf{v}_{1} = \mathbf{a}_{1} + sign(a_{1}) \Vert \mathbf{a}_{1} \Vert \mathbf{e}_{1} \\
\\
\mathbf{a}_{1} = \begin{pmatrix}
a_{11} \\
a_{21} \\
a_{31} \\
a_{41}\end{pmatrix}, \quad
\mathbf{e}_{1} = \begin{pmatrix}
1 \\
0 \\
0 \\
0
\end{pmatrix}
\end{align*}$$

- 2) 위에서 구한 $$\mathbf{v}_{1}$$를 통해서 [하우스홀더 행렬](/maths/2022-05-19-linear_algebra_02/#8-하우스홀더-행렬)을 구한다.  

$$\begin{align*}
H_{1} & = I - 2\frac{\mathbf{v}_{1}^{}\mathbf{v}_{1}^{T}}{\mathbf{v}_{1}^{T}\mathbf{v}_{1}^{}} \\
\\
& = \begin{pmatrix}
h_{11} & h_{12} & h_{13} & h_{14} \\
h_{21} & h_{22} & h_{23} & h_{24} \\
h_{31} & h_{32} & h_{33} & h_{34} \\
h_{41} & h_{42} & h_{43} & h_{44} \\
\end{pmatrix}
\end{align*}$$

- 3) $$H_{1}$$와 $$A_{1}$$를 곱한 행렬에서 1행 1열을 제외한 나머지 행렬로 $$A_{2}$$를 만들고, 1 ~ 2번 과정을 되풀이 한다.  

$$H_{1}A_{1} = \left(\begin{array}{c|ccc}
a_{11} & a_{12} & a_{13} & a_{14} \\
\hline
a_{21} & a_{22} & a_{23} & a_{24} \\
a_{31} & a_{32} & a_{33} & a_{34} \\
a_{41} & a_{42} & a_{43} & a_{44} \\
\end{array} \right)
\to A_{2} = \begin{pmatrix}
a_{22} & a_{23} & a_{24} \\
a_{32} & a_{33} & a_{34} \\
a_{42} & a_{43} & a_{44} \\
\end{pmatrix}$$

- 4) 1 ~ 3번 과정을 되풀이하여 각각의 하우스홀더 행렬이 모두 구해지면, 아래와 같이 단위 행렬과 조합하여 크기를 맞춘다.  

$$\begin{align*}
H_{1} & = \begin{pmatrix}h_{11} & h_{12} & h_{13} & h_{14} \\
h_{21} & h_{22} & h_{23} & h_{24} \\
h_{31} & h_{32} & h_{33} & h_{34} \\
h_{41} & h_{42} & h_{43} & h_{44} \\
\end{pmatrix} \\
\\
H_{2} & = \begin{pmatrix}1 & 0 & 0 & 0 \\
0 & h_{11} & h_{12} & h_{13} \\
0 & h_{21} & h_{22} & h_{23} \\
0 & h_{31} & h_{32} & h_{33} \\
\end{pmatrix} \\
\\
H_{3} & = \begin{pmatrix}1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & h_{11} & h_{12} \\
0 & 0 & h_{21} & h_{22} \\
\end{pmatrix}
\end{align*}$$

- 5) 아래와 같이 구해진 $$H_{i}$$을 모두 곱해 $$Q$$와 $$R$$을 구한다.  

$$\begin{align*}
Q & = H_{1}H_{2}H_{3} \cdots H_{n}\\
\\
R & = H_{n} \cdots H_{3}H_{2}H_{1}A
\end{align*}$$

`python`으로 구현하면 아래와 같다.  

```python
# QR decomposition, QR factorization with householder matrix
# sign of vector
def v_sign(a):
    res = 1
    if a[0] < 0: res = -1

    return res

# get element of househelder matrixes except last one
def ele_h(a):
    at = mat_trans(a)
    nm = norm(at[0])
    e = [1 if j == 0 else 0 for j in range(len(at[0]))]
    sign = v_sign(at[0])
    tmp = v_smul(sign * nm, e)
    v = v_add(at[0], tmp)
    h = householder(v)

    return h

# QR decomposition
def qr_householder(a):
    n = len(mat_trans(a))
    h_list_tmp = []

    # get househelder matrixes
    for i in range(n):
        if i == 0:
            res = ele_h(a)
            h_list_tmp.append(res)
            tmp_res = mat_mul(res, a)

        elif i < n - 1:
            an = [[tmp_res[j][k] for k in range(1, len(tmp_res[0]))] for j in range(1, len(tmp_res))]
            res = ele_h(an)
            h_list_tmp.append(res)
            tmp_res = mat_mul(res, an)

        else:
            an = [tmp_res[j][k] for k in range(1, len(tmp_res[0])) for j in range(1, len(tmp_res))]
            nm = norm(an)
            e = [1 if j == 0 else 0 for j in range(len(an))]
            sign = v_sign(an)
            tmp = v_smul(sign * nm, e)
            v = v_add(an, tmp)
            h = householder(v)
            h_list_tmp.append(h)

    # convert househelder matrixes to H_{i} form
    m = len(a)
    I = mat_identity(m)
    h_list = [h_tmp if len(h_tmp) == m \
        else [[I[i][j] if i < m - len(h_tmp) or j < m - len(h_tmp) \
            else h_tmp[i - (m - len(h_tmp))][j - (m - len(h_tmp))] \
                for i in range(m)] for j in range(m)] for h_tmp in h_list_tmp]

    # calculate Q
    q = mat_identity(len(h_list[0]))
    for i in h_list:
        q = mat_mul(q, i)

    # calculate R
    tmp = list(reversed(h_list))
    tmp_i = mat_identity(len(h_list[0]))
    for i in tmp:
        tmp_i = mat_mul(tmp_i, i)
    r = mat_mul(tmp_i, a)

    return q, r
```

중간에 `list comprehension`을 3중첩해서 작성한 부분을 풀어쓰면 아래와 같다.  

```python
h_list = []
for h_tmp in h_list_tmp:
    p = len(h_tmp)

    if p == m:
        tmp = h_tmp
    else:
        tmp = []
        for i in range(m):
            row = []
            for j in range(m):
                if i < m - p or j < m - p:
                    row.append(I[i][j])
                else:
                    row.append(h_tmp[i - (m - p)][j - (m - p)])
            tmp.append(row)
    h_list.append(tmp)
```

`numpy`, `scipy`로 구한 값 및 위의 [그람-슈미트 과정](#그람-슈미트-과정을-이용한-qr분해)을 이용해서 도출한 값과는 부호가 조금 다르게 나오는데, 마찬가지로 바뀐 부호가 $$Q$$와 $$R$$에 공통적으로 적용되어 $$A = QR$$이라는 최종 검산 결과를 만족하면 상관 없다고 한다.  

### numpy, scipy 활용

`numpy`를 활용한 QR분해는 아래와 같다.  

```python
import numpy as np

s = np.array([[10, -10, 4, 10], [20, 4, -20, 8], [30, 40, 2, 6], [10, -10, 0, 3]])

q, r = np.linalg.qr(s)
```

`scipy`를 활용한 QR분해는 아래와 같다.  

```python
from scipy import linalg

s = np.array([[10, -10, 4, 10], [20, 4, -20, 8], [30, 40, 2, 6], [10, -10, 0, 3]])

q, r = linalg.qr(s)
```

---
## Reference
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)
- [위키피디아: 그람-슈미트 과정](https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%9E%8C-%EC%8A%88%EB%AF%B8%ED%8A%B8_%EA%B3%BC%EC%A0%95)([영문](https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process))
- [위키피디아: QR 분해](https://ko.wikipedia.org/wiki/QR_%EB%B6%84%ED%95%B4)([영문](https://en.wikipedia.org/wiki/QR_decomposition))
- [QR 분해 - 공돌이의 수학정리노트](https://angeloyeo.github.io/2020/11/23/gram_schmidt.html)