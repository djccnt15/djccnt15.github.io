---
slug: statistical-probability
title: '[기초통계학] 05. 확률과 통계'
date:
    created: 2022-12-24
description: >
    경우의 수와 통계적 확률
categories:
    - Statistics
tags:
    - statistics 101
    - probability
---

경우의 수와 통계적 확률  

<!-- more -->

---

## 1. 확률

어떤 사건이 발생할 가능성이 얼마나 되는지를 나타내는 $[0, 1]$로 표현한 수치적 측도를 **확률(probability)**이라 하며, 확률은 다음의 성질을 갖는다.  

- 발생 가능한 모든 결과를 알 수 있음
- 어떤 것이 발생할지 예측할 수 없음(불확실성)

위 두 성질을 모두 갖는 실험을 **확률실험(random experiment)**이라 하며, 확률실험에서 발생 가능한 모든 결과들의 집합을 **표본공간(sample space, $\Omega$)**이라 한다. 그리고 표본공간 내에서 연구자가 관심을 갖는 부분집합을 **사건(사상, event)**이라 한다.  

따라서 확률을 언급하기 위해서는 확률실험이 전제되어 표본공간과 사건이 설정되어 있어야 한다.  

### 1-1. 고전적 확률

고전적 확률에서는 표본공간의 각 원소(근원사건)의 **발생가능성이 동일(equally likely)**하다고 가정한다. 따라서 표본공간의 원소개수를 $n$, 사건 $A$의 원소개수를 $k$라 할 때 사건 $A$의 확률은 다음과 같다.  

$$
P(A) = \frac{k}{n}
$$

### 1-2. 연속표본공간에서의 확률

발생가능성이 동일한 상황을 선이나 평면 등을 이용하여 표시한 것을 **연속표본공간(continuous sample space)**이라 한다.  

연속표본공간에서 사건 $A$가 발생한다는 것은 표본공간 $\Omega$ 내에서 무작위로 한 점을 선택할 때, 이 점이 영역 $A$에 있다는 것을 의미한다. 따라서 사건 $A$의 확률은 전체 영역에서 $A$가 차지하는 비율을 의미한다.  

$$
P(A) = \frac{\Vert A \Vert}{\Vert \Omega \Vert}
$$

위 식에서 $\Vert \ \Vert$는 길이, 면적, 부피 등을 의미한다.  

## 2. 경우의 수

확률을 계산하기 위해서는 표본공간과 사건에 있는 원소의 개수를 효율적으로 계산하는 것이 중요한데, 이 때 원소의 개수를 **경우의 수(the number of cases)**라 한다.  

어떤 실험이 $m$개의 연속된 단계로 이루어진다고 할 때, $i$ 번째 단계에서 발생 가능한 결과의 수 $n_{i}$를 모두 합친 값은 곱의 법칙으로 계산된다.  

$$
n = n_{1} \times n_{2} \times \cdots \times n_{m}
$$

이를 일반적인 문제에 적용하면 모집단에서 표본집단을 추출하는 문제가 되는데, 아래와 같은 두 조건을 고려해야한다.  

- 추출방법
    - 복원추출(with replacement)
    - 비복원추출(without replacement)
- 추출 순서의 고려 여부
    - 순열(permutation)
    - 조합(combination)

### 2-1. 순열

**순열(permutation)**은 순서를 고려한 비복원추출의 경우에 발생하는 경우의 수로, 아래 계산식을 통해 계산할 수 있다.  

$$
_{n}P_{k} = \frac{n!}{(n - k)!}
$$

순열 계산을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    def factorial(n: int) -> int:
        """returns factorial of number with for loop"""

        res = 1
        for i in range(1, n + 1):
            res *= i
        return res


    def permutation(n: int, k: int) -> float:
        """returns permutation of N things taken k at a time"""

        return factorial(n) / factorial(n - k)
    ```

=== "Python Standard Library"

    ```python
    from itertools import permutations

    permutation = list(permutations([1, 2, 3, 4], 2))
    ```

=== "SciPy"

    ```python
    from scipy.special import perm

    permutation = perm(10, 7)
    ```

### 2-2. 중복순열

중복순열은 순서를 고려한 복원추출의 경우에 발생하는 경우의 수로, 아래 계산식을 통해 계산할 수 있다.  

$$
_{n}\Pi_{k} = n^{k}
$$

### 2-3. 조합

조합은 순서를 고려하지 않는 비복원추출의 경우에 발생하는 경우의 수로, 아래 계산식에서 볼 수 있듯이 [순열](#2-1)의 결과에서 순서로 인해 발생하는 경우의 수를 제외해준다.  

$$
_{n}C_{k} = \binom{n}{k} = \frac{n!}{(n - k)!k!} = \frac{_{n}P_{k}}{k!}
$$

조합 계산을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    def combination(n: int, k: int) -> float:
        """returns combinations of N things taken k at a time"""

        return factorial(n) / (factorial(n - k) * factorial(k))
    ```

=== "Python Standard Library"

    ```python
    from itertools import combinations

    combination = list(combinations([1, 2, 3, 4], 2))
    ```

=== "SciPy"

    ```python
    from scipy.special import comb

    combinations = comb(10, 7)
    ```

### 2-4. 중복조합

중복조합은 순서를 고려하지 않는 복원추출의 경우에 발생하는 경우의 수로, 아래 계산식에서 볼 수 있듯이 개수가 늘어나는 [순열](#2-1)의 결과에서 순서로 인해 발생하는 경우의 수를 제외해준다.  

$$
_{n}H_{k} = \left(\!\!{n \choose k}\!\!\right) = \ _{n + k - 1}C_{k} = \binom{n + k - 1}{k} = \frac{(n + k - 1)!}{(n - 1)!k!} = \frac{_{n + k - 1}P_{k}}{k!}
$$

중복조합 구하는 공식을 Python으로 구현하면 아래와 같다.  

=== "Python"

    ```python
    def multiset(n: int, k: int) -> float:
        """return multiset of N things taken k at a time"""

        return combination(n + k - 1, k)
    ```

## 3. 통계적 확률

$n$번의 실험에서 특정 사건이 발생할 횟수를 $n(A)$라 하면, 해당 사건이 발생한 비율, 즉 해당 사건이 발생할 확률은 $n(A)/n$으로 표현할 수 있다.  

$$
P(A) \simeq \frac{n(A)}{n}
$$

따라서 실험이 무한히 반복한다면 $n(A)/n$은 특정 값으로 수렴하게 되며, 이를 **상대도수의 극한의 개념**이라고 한다.  

$$
P(A) = \lim_{ n \to \infty}\frac{n(A)}{n}
$$

이를 통계적으로 표현하면, 각각의 실험에서 발생하는 결과는 표본이고 실험을 무한히 반복하면 표본이 모집단이 되기 때문에 이를 **통계적 확률(statistical probability)**이라 한다. 따라서 확률은 모집단이 어떤 형태로 구성되어 있는지를 보여준다고 할 수 있다.  

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)