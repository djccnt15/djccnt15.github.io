---
published: true
layout: post

title: '[선형대수] 13. LU 분해'
description: >
    기본 행렬, LU 분해
hide_description: false
image:
    path: /assets/img/posts/linear_algebra_13.png
related_posts:
    - _posts/mathematics/2022-06-13-linear_algebra_12.md

categories:
    - Mathematics
tags:
    - mathematics
    - linear algebra
    - python
    - scipy
---
* toc
{:toc}

<h4>Linear Algebra Series</h4>
<div class="taxonomy__index">
    <ol class="description">
        <li><a href="/mathematics/linear_algebra_01/">선형대수의 기초</a></li>
        <li><a href="/mathematics/linear_algebra_02/">다양한 행렬</a></li>
        <li><a href="/mathematics/linear_algebra_03/">선형 시스템</a></li>
        <li><a href="/mathematics/linear_algebra_04/">행렬식</a></li>
        <li><a href="/mathematics/linear_algebra_05/">역행렬</a></li>
        <li><a href="/mathematics/linear_algebra_06/">기저와 차원</a></li>
        <li><a href="/mathematics/linear_algebra_07/">내적과 norm</a></li>
        <li><a href="/mathematics/linear_algebra_08/">직교공간과 QR 분해</a></li>
        <li><a href="/mathematics/linear_algebra_09/">다양한 곱 연산</a></li>
        <li><a href="/mathematics/linear_algebra_10/">고유값과 고유벡터</a></li>
        <li><a href="/mathematics/linear_algebra_11/">직교 행렬</a></li>
        <li><a href="/mathematics/linear_algebra_12/">행렬의 대각화</a></li>
        <li><a href="/mathematics/linear_algebra_13/">LU 분해</a></li>
    </ol>
</div>

## 1. 기본 행렬

**기본 행렬(elementary matrix)**은 단위 행렬에 [기본 행 연산](/mathematics/linear_algebra_01/#기본-행-연산)을 한 번 실행하여 얻어진 행렬을 말하며, 일반적으로 $$E$$로 표기한다. 기본 행렬은 아래와 같이 일반적인 행렬에 비해 역행렬을 아주 쉽게 구할 수 있다.  

- 기본 행렬이 대각 행렬인 경우, 1이 아닌 원소의 역수를 대입하면 된다.

$$E = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & n \\
\end{bmatrix}
\to E^{-1} = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1/n \\
\end{bmatrix}$$

- 기본 행렬이 대각 행렬이 아닌 경우, 0이 아닌 원소의 부호를 바꿔주면 된다.

$$E = \begin{bmatrix}
1 & 0 & 0 \\
n & 1 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}
\to E^{-1} = \begin{bmatrix}
1 & 0 & 0 \\
-n & 1 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}$$

## 2. LU 분해

### LU 분해의 기본 개념

**LU 분해(LU decomposition, LU factorization)**는 행렬 $$A$$를 아래와 같이 [하 삼각 행렬](/mathematics/linear_algebra_02/#6-삼각-행렬) $$L$$과 [상 삼각 행렬](/mathematics/linear_algebra_02/#6-삼각-행렬) $$U$$로 분해하는 것을 말하며, [가우스-조르단 소거법](/mathematics/linear_algebra_03/#가우스-조르단-소거법)을 사용해 선형 시스템의 해를 구하는 것보다 컴퓨팅 리소스를 효율적으로 사용할 수 있다고 한다.  

$$\begin{align*}
A & = LU \\
\\
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{bmatrix} & = \begin{bmatrix}
l_{11} & 0 & 0 \\
l_{21} & l_{22} & 0 \\
l_{31} & l_{32} & l_{33} \\
\end{bmatrix}
\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33} \\
\end{bmatrix}
\end{align*}$$

### LU 분해 방법

LU 분해 방법은 아래와 같다.  

- 1) 위 정리에서 $$a_{11} \neq 0$$ 이어야 하기 때문에, [피벗팅](/mathematics/linear_algebra_03/#피벗)을 해준다.

- 2) 주어진 행렬 $$A$$를 [기본 행 연산](/mathematics/linear_algebra_01/#기본-행-연산)을 통해 [상 삼각 행렬](/mathematics/linear_algebra_02/#6-삼각-행렬) $$U$$로 변환한다.

$$E_{n}E_{n-1} \cdots E_{2}E_{1}A = U$$

- 3) 위 식을 아래와 같이 정리하여 $$L, U$$ 형태로 변환한다.

$$\begin{align*}
U & = E_{n}E_{n-1} \cdots E_{2}E_{1}A \\
\\
L & = E_{1}^{-1}E_{2}^{-1} \cdots E_{n-1}^{-1}E_{n}^{-1} \\
\\
& \because A = E_{1}^{-1}E_{2}^{-1} \cdots E_{n-1}^{-1}E_{n}^{-1}U
\end{align*}$$

### 쉬운 LU 분해 방법

[기본 행렬](#1-기본-행렬)의 모양을 잘 관찰하면 LU 분해 과정에서 구한 기본 행렬의 역행렬을 모두 곱해서 행렬 $$L$$을 만드는 것은 아래와 같이 요약 된다는 것을 알 수 있다.  

- 행렬 $$A$$의 주 대각 원소를 1로 바꾸기 위해 곱하는 수의 역수는 행렬 $$L$$의 주 대각 원소가 됨
- 행렬 $$A$$의 주 대각 원소 아래에 위치한 원소를 0으로 만들기 위해 필요한 배수의 음수는 행렬 $$L$$의 동일한 위치의 원소가 됨

위 분해 방법을 `python`으로 구현하면 아래와 같다.  

```python
# LU decomposition
def lu_decomp(a):
    a = mat_pivot(a)
    n = len(a)
    m = len(a[0])

    l = mat_zeros(n, m)
    u = []

    for i in range(n):
        u_tmp = a[i]
        val = 1 / u_tmp[i]
        l[i][i] = 1 / val
        u_tmp = [ele * val for ele in u_tmp]
        u.append(u_tmp)

        for j in range(i+1, n):
            r = a[j]
            a_tmp = [ele * -r[i] for ele in u_tmp]
            l[j][i] = r[i]
            a[j] = [a_tmp[k] + r[k] for k in range(m)]

    return l, u
```

출처: [알고리즘 구현으로 배우는 선형대수 with 파이썬](https://github.com/bjpublic/linearalgebra)
{:.figcaption}

`scipy`로 LU 분해를 수행하는 방법은 아래와 같다. `numpy`에는 LU 분해를 위한 함수가 없다.  

```python
from scipy import linalg

a = [[3, 2, 1], [2, 1, 4], [1, 4, 2]]

p, l, u = linalg.lu(a)
```

위 함수들을 실제로 사용해보면 LU 분해의 결과가 조금 다른 것을 알 수 있는데, LU 분해는 그 자체로 의미가 있기 보다는 [하 삼각 행렬과 상 삼각 행렬](/mathematics/linear_algebra_02/#6-삼각-행렬)로 분해한 후의 활용이 중요하기 때문에 $$A = LU$$의 검산만 맞으면 결과는 상관 없다.  

## 3. LU 분해를 통한 선형 시스템의 풀이

LU 분해를 사용하면 선형 시스템을 쉽게 풀어낼 수 있다. 그 과정은 아래와 같다.  

- 1) 행렬 $$A$$를 LU 분해하여 행렬 $$L$$과 $$U$$로 분해한다.

$$A \mathbf{x} = B \Leftrightarrow LU \mathbf{x} = B$$

- 2) $$U \mathbf{x}$$를 $$\mathbf{y}$$로 정의하고 기존 방정식을 $$L \mathbf{y} = B$$로 고쳐 쓴 후 $$\mathbf{y}$$에 대한 방정식의 해를 구한다.

$$U \mathbf{x} = \mathbf{y} \Leftrightarrow L \mathbf{y} = B$$

- 3) $$ \mathbf{y}$$의 값을 이용해서 방정식 $$U \mathbf{x} = \mathbf{y}$$의 해를 구한다. 전체 과정을 정리하면 아래와 같다.

$$\begin{align*}
A \mathbf{x} & = B \\
\\
\Leftrightarrow & \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} \\
\end{bmatrix}\begin{bmatrix}
x_{1} \\
x_{2} \\
x_{3} \\
\end{bmatrix} = \begin{bmatrix}
b_{1} \\
b_{2} \\
b_{3} \\
\end{bmatrix}\\
\\
\Leftrightarrow & \begin{bmatrix}
l_{11} & 0 & 0 \\
l_{21} & l_{22} & 0 \\
l_{31} & l_{32} & l_{33} \\
\end{bmatrix}
\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33} \\
\end{bmatrix}\begin{bmatrix}
x_{1} \\
x_{2} \\
x_{3} \\
\end{bmatrix} = \begin{bmatrix}
b_{1} \\
b_{2} \\
b_{3} \\
\end{bmatrix} \\
\\
\Leftrightarrow & \begin{bmatrix}
l_{11} & 0 & 0 \\
l_{21} & l_{22} & 0 \\
l_{31} & l_{32} & l_{33} \\
\end{bmatrix}\begin{bmatrix}
y_{1} \\
y_{2} \\
y_{3} \\
\end{bmatrix} = \begin{bmatrix}
b_{1} \\
b_{2} \\
b_{3} \\
\end{bmatrix} \\
\\
\Leftrightarrow & \begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33} \\
\end{bmatrix}\begin{bmatrix}
x_{1} \\
x_{2} \\
x_{3} \\
\end{bmatrix} = \begin{bmatrix}
y_{1} \\
y_{2} \\
y_{3} \\
\end{bmatrix}
\end{align*}$$

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
- [미적분과 벡터해석 기초 with Python](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160735314)
- [알고리즘 구현으로 배우는 선형대수 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791165921125)([코드](https://github.com/bjpublic/linearalgebra))