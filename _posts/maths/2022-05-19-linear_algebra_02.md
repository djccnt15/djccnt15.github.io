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

<h4>Linear Algebra Series</h4>
<div class="taxonomy__index">
    <ol class="description">
        <li><a href="/maths/linear_algebra_01/">선형대수의 기초</a></li>
        <li><a href="/maths/linear_algebra_02/">다양한 행렬</a></li>
        <li><a href="/maths/linear_algebra_03/">선형 시스템</a></li>
        <li><a href="/maths/linear_algebra_04/">행렬식</a></li>
        <li><a href="/maths/linear_algebra_05/">역행렬</a></li>
        <li><a href="/maths/linear_algebra_06/">기저와 차원</a></li>
        <li><a href="/maths/linear_algebra_07/">내적</a></li>
        <li><a href="/maths/linear_algebra_08/">직교공간과 QR 분해</a></li>
        <li><a href="/maths/linear_algebra_09/">다양한 곱 연산</a></li>
        <li><a href="/maths/linear_algebra_10/">고유값과 고유벡터</a></li>
        <li><a href="/maths/linear_algebra_11/">직교 행렬</a></li>
        <li><a href="/maths/linear_algebra_12/">행렬의 대각화</a></li>
        <li><a href="/maths/linear_algebra_13/">LU 분해</a></li>
    </ol>
</div>

## 1. 전치 행렬

**전치 행렬(transposed matrix)**은 기존 행렬의 행과 열을 바꾼 행렬을 말하며 $$A^{T}$$와 같이 표기한다. 수식으로 표현하면 아래와 같다.  

$$A = \begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22} \\
a_{31} & a_{32} \\
\end{bmatrix}
\to A^{T} = \begin{bmatrix}
a_{11} & a_{21} & a_{31} \\
a_{12} & a_{22} & a_{32} \\
\end{bmatrix}$$

전치 행렬의 성질 중 행렬 곱의 전치 행렬은 아래와 같아 조금 주의해야 한다.  

$$(AB)^{T} = B^{T}A^{T}$$

`python`으로 구현하면 아래와 같다.  

```python
# transposed matrix
def mat_trans(a):
    At = [list(r) for r in zip(*a)]

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

$$A = \begin{bmatrix}
a & b & c \\
b & d & e \\
c & e & f \\
\end{bmatrix}, \quad
a_{ij} = a_{ji}$$

$$\therefore A = A^{T}$$

선형대수에서는 $$AA^{T}$$나 $$A^{T}A$$와 같은 형태를 종종 볼 수 있는데, 둘 모두 **대칭 행렬**이 된다.  

`python`으로 대칭 행렬 여부를 확인하려면 아래와 같이 앞서 만든 전치 행렬을 반환하는 함수를 활용하면 된다.  

```python
# symmetric matrix check
def symmetric_check(a):
    At = mat_trans(a)

    return a == At
```

### 반대칭 행렬

아래와 같이 [전치 행렬](#1-전치-행렬)이 원래 행렬에 $$-1$$을 곱한 행렬일 경우 행렬 $$A$$를 **반대칭 행렬(skew-symmetric matrix)**이라고 한다.  

$$A^{T} = -A$$

## 3. 대각 행렬

**대각 행렬(diagonal matrix)**은 아래와 같이 행렬의 주 대각 원소가 아닌 원소가 0인 **정사각** 행렬을 말하며, $$D$$로 표기한다.  

$$D = \begin{bmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{bmatrix}$$

대각 행렬은 다음과 같이 행렬에 대각 행렬을 곱하면 열 벡터가 배수가 되고, 대각 행렬에 행렬을 곱하면 행 백터가 배수가 되는 성질 때문에 선형대수에서 중요한 역할을 한다.  

$$AD = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{bmatrix}\begin{bmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{bmatrix}
= \begin{bmatrix}
a_{11} \times d_{11} & a_{12} \times d_{22} & a_{13} \times d_{33} \\
a_{21} \times d_{11} & a_{22} \times d_{22} & a_{23} \times d_{33} \\
a_{31} \times d_{11} & a_{32} \times d_{22} & a_{33} \times d_{33} \\
\end{bmatrix}$$

$$DA = \begin{bmatrix}
d_{11} & 0 & 0 \\
0 & d_{22} & 0 \\
0 & 0 & d_{33} \\
\end{bmatrix}\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{bmatrix}
= \begin{bmatrix}
a_{11} \times d_{11} & a_{12} \times d_{11} & a_{13} \times d_{11} \\
a_{21} \times d_{22} & a_{22} \times d_{22} & a_{23} \times d_{22} \\
a_{31} \times d_{33} & a_{32} \times d_{33} & a_{33} \times d_{33} \\
\end{bmatrix}$$

어떤 행렬의 대각 행렬을 구한다는 것은 대각 원소를 제외한 나머지 원소를 0으로 바꾸는 것을 의미하는데, 대각 원소 구하는 것과 대각 행렬 구하는 것을 `python`으로 구현하면 아래와 같다.  

```python
# elements of diagonal matrix
def diag_ele(a):
    d = [v[i] for i, v in enumerate([*a])]

    return d

# diagonal matrix
def mat_diag(a):
    D = [[v if i == j else 0 for j, v in enumerate(r)] for i, r in enumerate(a)]

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

$$A = \begin{bmatrix}
a_{11} & a_{12} & 0 & 0 \\
0 & a_{22} & a_{23} & 0 \\
0 & 0 & a_{33} & a_{34} \\
0 & 0 & 0 & a_{44} \\
\end{bmatrix}, \quad
A = \begin{bmatrix}
a_{11} & 0 & 0 & 0 \\
a_{21} & a_{22} & 0 & 0 \\
0 & a_{32} & a_{33} & 0 \\
0 & 0 & a_{43} & a_{44} \\
\end{bmatrix}$$

어떤 행렬을 받아서 이중 대각 행렬을 반환하는 함수를 `python`으로 구현하면 아래와 같다.  

```python
# upper bidiagonal matrix
def mat_bidiag_u(a):
    res = [[0 if i > j or j - i > 1 else v for j, v in enumerate(r)] for i, r in enumerate(a)]

    return res

# lower bidiagonal matrix
def mat_bidiag_l(a):
    res = [[0 if i < j or i - j > 1 else v for j, v in enumerate(r)] for i, r in enumerate(a)]

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

**단위 행렬(identity matrix)**은 아래와 같이 주 대각 원소가 1이고 그 외 나머지 원소는 모두 0인 [대각 행렬](#3-대각-행렬)을 의미한다. $$I$$로 표기하며, 항등 행렬이라고도 부른다.  

$$I = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}$$

단위 행렬은 **단위**라는 말에서 알 수 있듯이, 다른 행렬과 곱했을 때 곱해진 행렬을 그대로 유지하는 성질이 있다.  

$$AI = IA = A$$

단위 행렬을 생성하는 함수를 `python`으로 구현하면 아래와 같다.  

```python
# identity matrix
def mat_identity(n):
    I = [[1 if i == j else 0 for j in range(n)] for i in range(n)]

    return I
```

`numpy`를 활용하면 아래와 같다.  

```python
import numpy as np

i = np.identity(3)
```

## 5. 영 행렬

**영 행렬(zero matrix)**은 아래와 같이 행렬의 구성 원소가 모두 0인 행렬, **영 벡터(zero vector)**는 구성 원소가 모두 0인 벡터를 말한다.  

$$0 = \begin{bmatrix}
0 & 0 \\
0 & 0 \\
\end{bmatrix}$$

`python`으로 구현하면 아래와 같다.  

```python
# zero matrix
def mat_zeros(r, c):
    Z = [[0 for _ in range(c)] for _ in range(r)]

    return Z

# zero vector
def v_zeros(n):
    Z = [0 for i in range(n)]

    return Z
```

`numpy`를 활용하면 아래와 같다.  

```python
import numpy as np

z = np.zeros((3, 2))
```

## 6. 삼각 행렬

**삼각 행렬(triangular matrix)**은 0이 아닌 구성 원소가 삼각형 형태인 행렬로, 주 대각 원소 아래쪽의 모든 원소가 0인 **상 삼각 행렬(upper triangular matrix)**과 주 대각 원소 위쪽의 모든 원소가 0인 **하 삼각 행렬(lower triangular matrix)**이 있다.  

$$U = \begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33} \\
\end{bmatrix}, \quad
L = \begin{bmatrix}
l_{11} & 0 & 0 \\
l_{21} & l_{22} & 0 \\
l_{31} & l_{32} & l_{33} \\
\end{bmatrix}$$

입력된 행렬을 삼각 행렬로 만들어주는 것을 `python`으로 구현하면 아래와 같다.  

```python
# upper triangular matrix
def mat_tri_u(a):
    res = [[0 if i > j else v for j, v in enumerate(r)] for i, r in enumerate(a)]

    return res

# lower triangular matrix
def mat_tri_l(a):
    res = [[0 if i < j else v for j, v in enumerate(r)] for i, r in enumerate(a)]

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

$$T = \begin{bmatrix}
t_{0} & t_{-1} & t_{-2} & \cdots & t_{-(n-1)} \\
t_{1} & t_{0} & t_{-1} & \ddots & \vdots \\
t_{2} & t_{1} & \ddots & \ddots & \vdots \\
\vdots & \ddots & \ddots & t_{-1} & t_{-2} \\
\vdots & \ddots & t_{1} & t_{0} & t_{-1} \\
t_{n-1} & t_{n-2} & \cdots & t_{1} & t_{0} \\
\end{bmatrix}$$

토플리츠 행렬 $$T$$의 $$i$$행 $$j$$열 원소는 다음과 같이 표현할 수 있다.  

$$T_{i,j} = T_{i+1,j+1} = t_{i-j}$$

두 개의 벡터를 받아 하나의 토플리츠 행렬을 반환하는 함수를 `python`으로 구현하면 아래와 같다.  

```python
# toeplitz matrix
def mat_toeplitz(a, b):
    T = [[a[i - j] if i >= j else b[j - i] for j, _ in enumerate(b)] for i, _ in enumerate(a)]

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

**하우스홀더 행렬(householder matrix)**은 모든 열이 [정규 직교(orthonormal)](/maths/linear_algebra_08/#1-직교-공간)하는 정사각 행렬로, 아래와 같은 수식을 따르는 행렬 $$H$$를 말한다.  

$$\mathbf{v} = \begin{bmatrix}
v_{1} \\
v_{2} \\
\vdots \\
v_{n}
\end{bmatrix}
\to H = I - 2\frac{\mathbf{vv}^{T}}{\mathbf{v}^{T}\mathbf{v}}$$

$${\mathbf{vv}^{T}}$$은 [벡터의 외적](/maths/linear_algebra_09/#1-외적), $${\mathbf{v}^{T}\mathbf{v}}$$은 [벡터의 내적](/maths/linear_algebra_07/#1-내적)을 뜻하기 때문에 하우스홀더 행렬 공식을 `python`으로 구현하기 위해서는 벡터의 내적과 외적의 함수를 먼저 구현해야 한다.  

```python
# outer product, tensor product of vector
def v_outer(a, b):
    res = [[v * u for u in b] for v in a]

    return res

# inner product of vector
def v_inner(a, b):
    res = sum(v * u for v, u in zip(a, b))

    return res
```

앞서 구현한 함수들을 기반으로 입력된 벡터를 받아 하우스홀더 행렬을 반환하는 함수를 `python`으로 구현하면 아래와 같다.  

```python
# householder matrix
def householder(v):
    n = len(v)
    V = mat_smul(1 / v_inner(v, v), v_outer(v, v))
    V = mat_smul(2, V)

    H = mat_sub(mat_identity(n), V)

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
- [구현한 함수 git repository](https://github.com/djccnt15/maths)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))