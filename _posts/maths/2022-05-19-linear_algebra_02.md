---
published: true
layout: post

title: '[선형대수] 02. 다양한 행렬'
description: >
  전치/대칭/대각/이중대각/단위/영/삼각/토플리츠/하우스홀더 행렬
hide_description: false
image: 
  path: /assets/img/posts/linear_algebra_02.png
related_posts:
  - _posts/maths/2022-05-01-linear_algebra_01.md
  - _posts/maths/2022-05-22-linear_algebra_03.md

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

## 1. 전치 행렬

**전치 행렬(transposed matrix)**은 기존 행렬의 행과 열을 바꾼 행렬을 말하며 $$A^{T}$$와 같이 표기한다. 수식으로 표현하면 아래와 같다.  

$$A = \begin{pmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
a_{31} & a_{32} \\
\end{pmatrix}
\to A^{T} = \begin{pmatrix}
a_{11} & a_{21} & a_{31} \\
a_{12} & a_{22} & a_{32} \\
\end{pmatrix}$$

전치 행렬의 성질 중 행렬 곱의 전치 행렬은 아래와 같아 조금 주의해야 한다.  

$$(AB)^{T} = B^{T}A^{T}$$

`python`으로 구현하면 아래와 같다.  

```python
# transposed matrix
def mat_transpose(a):
    At = [[e for e in i] for i in zip(*a)]

    return At
```

`numpy`를 사용하면 아래와 같다.  

```python
import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# use function
mat_transpose = np.transpose(a=a)

# use method
mat_transpose = a.T
```

## 2. 대칭 행렬

**대칭 행렬(symmetric matrix)**이란 아래와 같이 기존 행렬과 전치 행렬이 동일한 행렬을 말한다.  

$$A = \begin{pmatrix}
a & b & c \\
b & d & e \\
c & e & f \\
\end{pmatrix}, \quad
A_{ij} = A_{ji}$$

$$\therefore A = A^{T}$$

선형대수에서는 $$AA^{T}$$나 $$A^{T}A$$와 같은 형태를 종종 볼 수 있는데, 둘 모두 **대칭 행렬**이 된다.  

`python`으로 대칭 행렬 여부를 확인하려면 아래와 같이 앞서 만든 전치 행렬을 반환하는 함수를 활용하면 된다.  

```python
# symmetric matrix check
def symmetric_check(a):
    At = mat_transpose(a)

    return a == At
```

## 3. 대각 행렬

**대각 행렬(diagonal matrix)**은 아래와 같이 행렬의 주 대각 원소가 아닌 원소가 0인 **정사각** 행렬을 말하며, $$D$$로 표기한다.  

$$D = \begin{pmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{pmatrix}$$

대각 행렬은 다음과 같이 행렬에 대각 행렬을 곱하면 열 벡터가 배수가 되고, 대각 행렬에 행렬을 곱하면 행 백터가 배수가 되는 성질 때문에 선형대수에서 중요한 역할을 한다.  

$$AD = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{pmatrix}\begin{pmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{pmatrix}
= \begin{pmatrix}
a_{11} \times d_{11} & a_{12} \times d_{22} & a_{13} \times d_{33} \\
a_{21} \times d_{11} & a_{22} \times d_{22} & a_{23} \times d_{33} \\
a_{31} \times d_{11} & a_{32} \times d_{22} & a_{33} \times d_{33} \\
\end{pmatrix}$$

$$DA = \begin{pmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{pmatrix}\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{pmatrix}
= \begin{pmatrix}
a_{11} \times d_{11} & a_{12} \times d_{11} & a_{13} \times d_{11} \\
a_{21} \times d_{22} & a_{22} \times d_{22} & a_{23} \times d_{22} \\
a_{31} \times d_{33} & a_{32} \times d_{33} & a_{33} \times d_{33} \\
\end{pmatrix}$$

어떤 행렬의 대각 행렬을 구한다는 것은 대각 원소를 제외한 나머지 원소를 0으로 바꾸는 것을 의미하는데, 대각 원소 구하는 것과 대각 행렬 구하는 것을 `python`으로 구현하면 아래와 같다.  

```python
# elements of diagonal matrix
def diag_ele(a):
    d = [i[n] for n, i in enumerate([*a])]

    return d

# diagonal matrix
def mat_diag(a):
    D = [[j if n == m else 0 for m, j in enumerate(i)] for n, i in enumerate(a)]

    return D
```

`numpy`를 활용하면 아래와 같이 `np.diag`함수 하나로 대각 원소와 대각 행렬을 모두 구할 수 있다.  

```python
import numpy as np

a = np.array([[1, 2, 3], [2, 4, 5], [3, 5, 6]])

diagonal_ele = np.diag(a)
diagonal_matrix = np.diag(diagonal_ele)
```

### 이중 대각 행렬

**이중 대각 행렬(bidiagonal matrix)**은 아래와 같이 대각 원소에 더해 대각 원소의 바로 위나 아래의 원소가 0이 아닌 행렬을 말한다. 삼각 행렬과 마찬가지로 upper bidiagonal matrix와 lower bidiagonal matrix가 있다.  

$$A = \begin{pmatrix}
a_{11} & a_{12} & 0 & 0 \\
0 & a_{22} & a_{23} & 0 \\
0 & 0 & a_{33} & a_{34} \\
0 & 0 & 0 & a_{44} \\
\end{pmatrix}, \quad
A = \begin{pmatrix}
a_{11} & 0 & 0 & 0 \\
a_{21} & a_{22} & 0 & 0 \\
0 & a_{32} & a_{33} & 0 \\
0 & 0 & a_{43} & a_{44} \\
\end{pmatrix}$$

어떤 행렬을 받아서 이중 대각 행렬을 반환하는 함수를 `python`으로 구현하면 아래와 같다.  

```python
# upper bidiagonal matrix
def mat_bidiag_u(a):
    res = [[0 if n > m or m - n > 1 else j for m, j in enumerate(i)] for n, i in enumerate(a)]

    return res

# lower bidiagonal matrix
def mat_bidiag_l(a):
    res = [[0 if n < m or n - m > 1 else j for m, j in enumerate(i)] for n, i in enumerate(a)]

    return res
```

`numpy`로 구현하면 아래와 같다.  

```python
import numpy as np

f = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])

# upper bidiagonal matrix
diag = np.diag(np.diag(f))
diag_u = np.diag(v=np.diag(v=f, k=1), k=1)

mat_bidiag_u = diag + diag_u

# lower bidiagonal matrix
diag = np.diag(np.diag(f))
diag_l = np.diag(v=np.diag(v=f, k=-1), k=-1)

mat_bidiag_l = diag + diag_l
```

## 4. 단위 행렬

**단위 행렬(identity matrix)**은 아래와 같이 주 대각 원소가 1이고 그 외 나머지 원소는 모두 0인 **대각 행렬**을 의미한다. $$I$$로 표기하며, 항등 행렬이라고도 부른다.  

$$I = \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
\end{pmatrix}$$

단위 행렬은 **단위**라는 말에서 알 수 있듯이, 다른 행렬과 곱했을 때 곱해진 행렬을 그대로 유지하는 성질이 있다.  

$$AI = IA = A$$

단위 행렬을 생성하는 함수를 `python`으로 구현하면 아래와 같다.  

```python
# identity matrix
def mat_identity(size):
    I = [[1 if i == j else 0 for j in range(size)] for i in range(size)]

    return I
```

`numpy`를 활용하면 아래와 같다.  

```python
import numpy as np

i = np.identity(3)
```

## 5. 영 행렬

**영 행렬(zero matrix)**은 아래와 같이 행렬의 구성 원소가 모두 0인 행렬을 말한다.  

$$0 = \begin{pmatrix}
0 & 0 \\
0 & 0 \\
\end{pmatrix}$$

`python`으로 구현하면 아래와 같다.  

```python
# zero matrix
def mat_zeros(row, col):
    Z = [[0 for j in range(col)] for i in range(row)]

    return Z

# zero vector
def v_zeros(size):
    Z = [0 for i in range(size)]

    return Z
```

`numpy`를 활용하면 아래와 같다.  

```python
import numpy as np

z = np.zeros((3, 2))
```

## 6. 삼각 행렬

**삼각 행렬(triangular matrix)**은 0이 아닌 구성 원소가 삼각형 형태인 행렬로, 주 대각 원소 아래쪽의 모든 원소가 0인 상 삼각 행렬(upper triangular matrix)과 주 대각 원소 위쪽의 모든 원소가 0인 하 삼각 행렬(lower triangular matrix)이 있다.  

$$A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
0 & a_{22} & a_{23} \\
0 & 0 & a_{33} \\
\end{pmatrix}, \quad
A = \begin{pmatrix}
a_{11} & 0 & 0 \\
a_{21} & a_{22} & 0 \\
a_{31} & a_{32} & a_{33} \\
\end{pmatrix}$$

입력된 행렬을 삼각 행렬로 만들어주는 것을 `python`으로 구현하면 아래와 같다.  

```python
# upper triangular matrix
def mat_tri_u(a):
    res = [[0 if n > m else j for m, j in enumerate(i)] for n, i in enumerate(a)]

    return res

# lower triangular matrix
def mat_tri_l(a):
    res = [[0 if n < m else j for m, j in enumerate(i)] for n, i in enumerate(a)]

    return res
```

`numpy`를 활용하면 아래와 같다.  

```python
import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

mat_tri_u = np.triu(a)
mat_tri_l = np.trul(a)
```

## 7. 토플리츠 행렬

**토플리츠 행렬(toeplitz matrix)**은 아래와 같이 1행의 원소가 2행으로 가면서 한 열씩 오른쪽으로 이동하는 행렬을 말하며, $$T$$로 표시한다. **시계열 데이터를 행렬 형태로 변환할 때 사용**한다.  

$$T = \begin{pmatrix}
t_{0} & t_{-1} & t_{-2} & \cdots & t_{-(n-1)} \\
t_{1} & t_{0} & t_{-1} & \ddots & \vdots \\
t_{2} & t_{1} & \ddots & \ddots & \vdots \\
\vdots & \ddots & \ddots & t_{-1} & t_{-2} \\
\vdots & \ddots & t_{1} & t_{0} & t_{-1} \\
t_{n-1} & t_{n-2} & \cdots & t_{1} & t_{0} \\
\end{pmatrix}$$

토플리츠 행렬 $$T$$의 $$i$$행 $$j$$열 원소는 다음과 같이 표현할 수 있다.  

$$T_{i,j} = T_{i+1,j+1} = t_{i-j}$$

두 개의 벡터를 받아 하나의 토플리츠 행렬을 반환하는 함수를 `python`으로 구현하면 아래와 같다.  

```python
# toeplitz matrix
def mat_toeplitz(a, b):
    T = [[a[n - m] if n >= m else b[m - n] for m, j in enumerate(b)] for n, i in enumerate(a)]

    return T
```

`scipy`를 활용하면 아래와 같다. `numpy`에는 토플리츠 행렬을 만드는 기능이 없다.  

```python
from scipy.linalg import toeplitz

g = [1, 2, 3, 4]
h = [5, 6, 7, 8]

mat_toeplitz = toeplitz(g, h)
```

## 8. 하우스홀더 행렬

**하우스홀더 행렬(householder matrix)**은 모든 열이 정규 직교(orthonormal)하는 정사각 행렬로, 아래와 같은 수식을 따르는 행렬 $$H$$를 말한다.  

$$\mathbf{v} = \begin{pmatrix}
v_{1} \\
v_{2} \\
\vdots \\
v_{n}
\end{pmatrix}$$

$$H = I - 2\frac{\mathbf{vv}^{T}}{\mathbf{v}^{T}\mathbf{v}}$$

$${\mathbf{vv}^{T}}$$은 벡터의 외적, $${\mathbf{v}^{T}\mathbf{v}}$$은 벡터의 내적을 뜻하기 때문에 하우스홀더 행렬 공식을 `python`으로 구현하기 위해서는 벡터의 내적과 외적의 함수를 먼저 구현해야 한다.  

```python
# outer product, tensor product of vector
def v_outer(a, b):
    res = [[i * j for j in b] for i in a]

    return res

# inner product of vector
def v_inner(a, b):
    res = sum(x * y for x, y in zip(a, b))

    return res
```

앞서 구현한 함수들을 기반으로 입력된 벡터를 받아 하우스홀더 행렬을 반환하는 함수를 `python`으로 구현하면 아래와 같다.  

```python
# householder matrix
def householder(v):
    n = len(v)
    outer = v_outer(v, v)
    inner = v_inner(v, v)

    V1 = mat_smul(1 / inner, outer)
    V2 = mat_smul(2, V1)

    H = mat_sub(mat_identity(n), V2)

    return H
```

하우스홀더 행렬을 `numpy`를 활용하여 구하면 아래와 같다.  

```python
import numpy as np

a = np.array([1, 2, 3, 4])
n = len(a)

outer = np.outer(a, a)
inner = np.inner(a, a)

i = np.identity(n)

H = i - 2 * (outer / inner)
```

---
## Reference
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))
- [로스카츠의 AI 머신러닝](https://losskatsu.github.io/)