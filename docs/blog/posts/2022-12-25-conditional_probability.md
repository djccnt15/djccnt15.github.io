---
slug: conditional-probability
title: '[기초통계학] 06. 조건부 확률'
date:
    created: 2022-12-25
description: >
    조건부 확률과 베이즈 정리
categories:
    - Statistics
tags:
    - statistics 101
    - probability
---

조건부 확률과 베이즈 정리  

<!-- more -->

---

## 1. 확률의 정리

### 1-1. 공리적 확률

이론체계에서 가장 기초적인 근거가 되는 명제로, 증명할 필요가 없이 자명한 진리이자 다른 명제들을 증명하는 데 전제가 되는 원리로서 가장 기본적인 가정을 공리(axiom)라 한다. **확률론의 공리(probability axioms)**는 다음과 같다.  

- 표본공간의 확률은 1이다.

$$
P(\Omega) = 1
$$

- 어떤 사건이 발생할 확률은 0이상 1미만이다.

$$
0 \leq P(A) \leq 1, \quad A \subset \Omega
$$

- 서로 배반인 사건 $A_{1}, A_{2}, \cdots, A_{n}$에 대해, 전체 사건의 합집합은 각각의 확률의 합이다.

$$
P \left( \bigcup_{i=1}^{n}A_{i} \right) = \sum_{i=1}^{n}P(A_{i})
$$

위 세 성질을 만족하는 $P(\, \cdot \,)$를 **확률측도(probability measure)**라 한다.  

### 1-2. 확률의 기본정리

확률론에서 가장 기본적인 정리는 다음의 네 가지이다.  

- 특정 사건이 발생하지 않을 확률(여집합)은 전체에서 특정 사건이 발생할 확률을 뺀 값과 같다.

$$
P(A^{c}) = 1 - P(A)
$$

??? note "증명"
    $$
    1 = P(\Omega) = P(A \cup A^{c}) = P(A) + P(A^{c})
    $$

- 특정 사건 $A$가 다른 사건 $B$의 부분집합이면, $A$가 발생할 확률은 $B$가 발생할 확률보다 작거나 같다.

$$
A \subset B \ \to \ P(A) \leq P(B)
$$

??? note "증명"
    $$
    \begin{align*}
    B = A \cup (B \cap A^{c}) \ \to \ P(B) & = P(A \cup (B \cap A^{c})) \\
    \\
    & = P(A) + P(B \cap A^{c})
    \end{align*}
    $$

- 사건 $A$ 또는 $B$가 발생할 확률은 각각의 사건이 발생할 확률을 더한 값에서 두 사건이 모두 발생할 확률을 뺀 값과 같다.

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

??? note "증명"
    $$
    \begin{align*}
    A = & (A \cap B) \cup (A \cap B^{c}), \ B = (A \cap B) \cup (A^{c} \cap B) \\
    \\
    \to \ & P(A) = P(A \cap B) + P(A \cap B^{c}) \\
    \\
    & P(B) = P(A \cap B) + P(A^{c} \cap B)
    \end{align*}
    $$

- 사건 $A$ 또는 $B$가 발생할 확률은 사건 $A$가 발생할 확률과 $B$가 발생할 확률을 더한 값보다 작거나 같다.

$$
P(A \cup B) \leq P(A) + P(B)
$$

이를 일반식으로 확장한 부울 부등식(Boole's Inequality)은 아래와 같은데, 주로 어떤 합집합의 확률의 상한값을 계산하기 위해 사용한다.  

$$
P \left( \bigcup_{i=1}^{n}A_{i} \right) \leq \sum_{i=1}^{n}P(A_{i})
$$

그리고 이를 아래와 같이 여집합에 대한 식으로 변형하면 본페로니 부등식(Bonferroni's Inequality)을 얻을 수 있는데, 부울 부등식과 반대로 주로 어떤 교집합의 확률의 하한값을 계산하기 위해 사용한다.  

$$
P \left( \bigcap_{i=1}^{n}A_{i} \right) \geq \sum_{i=1}^{n}P(A_{i}) - (n - 1)
$$

??? note "본페로니 부등식의 유도"
    $$
    \begin{align*}
    P(A^{c} \cup B^{c}) & \leq P(A^{c}) + P(B^{c}) \\
    \\
    \Rightarrow P(A^{c} \cup B^{c}) = P((A \cap B)^{c}) = 1 - P(A \cap B) & \leq 1 - P(A) + 1 - P(B) = 2 - \{ P(A) + P(B) \} \\
    \\
    \therefore P(A \cap B) & \geq P(A) + P(B) - 1
    \end{align*}
    $$

본페로니 부등식의 유도를 통해 사건 $A$와 사건 $B$가 모두 발생할 확률은 사건 $A$가 발생할 확률과 사건 $B$가 발생할 확률을 더한 값에서 1을 뺀 값 보다 크거나 같다는 점 또한 확인할 수 있다.  

$$
P(A \cap B) \geq P(A) + P(B) - 1
$$

## 2. 조건부 확률

확률실험에서 새로운 정보 또는 조건 $A$가 추가되었을 때 사건 $B$의 확률을 **조건부 확률(conditional probability)**이라 한다.  

사건 $A$가 발생했다면 $A$ 이외의 것은 일어날 수 없기 때문에, $A$가 새로운 표본공간 $\Omega'$이 되고, $B$가 발생한다는 것은 $A \cap B$에 있는 원소가 발생하는 것을 의미한다. 이를 바탕으로 사건 $A$가 주어졌을 때 사건 $B$의 조건부 확률은 아래와 같이 표현한다.  

$$
P(B \vert A) = \frac{P(A \cap B)}{P(A)}, \quad P(A) > 0
$$

!!! info
    참고로 위 식을 영어로는 *probability of event B given event A*라고 읽는다.  

### 2-1. 순차적 사건의 조건부 확률

위 조건부 확률의 표현식을 아래와 같이 변형하면 교집합의 사건을 순차적인 사건들의 조건부 확률의 곱으로 표시할 수 있다.  

$$
P(A \cap B) = P(A)P(B \vert A) = P(B)P(A \vert B)
$$

어떤 일련의 사건들이 순차적으로 결합된 경우 특정 시점에서의 사건 확률은 앞에서 발생할 수 있는 상황이나 연결된 상황들의 확률을 모두 더하여 구할 수 있고, 이를 통해 사건 $B$가 발생할 확률을 사건 $A$에 대한 조건부 확률로 표현하면 아래와 같다.  

$$
\begin{align*}
P(B) & = P(A \cap B) + P(A^{c} \cap B) \\
\\
& = P(A)P(B \vert A) + P(A^{c})P(B \vert A^{c})
\end{align*}
$$

### 2-2. 표본공간의 분할과 조건부 확률

사건 $A_{1}, A_{2}, \cdots, A_{n}$이 서로 배반사건이고, 각 사건을 모두 더한 합집합이 전체 집합일 때, $A_{1}, A_{2}, \cdots, A_{n}$을 **표본공간의 분할(partition)**이라고 한다.  

사건 $A_{1}, A_{2}, \cdots, A_{n}$이 표본공간 $\Omega$의 분할이면 사건 $A$가 일어났을 때, 사건 $B$가 일어날 확률은 아래와 같이 계산할 수 있다.  

$$
P(B) = \sum_{i=1}^{n}P(A_{i})P(B \vert A_{i})
$$

## 3. 독립사건

사건 $A$와 $B$가 서로에 대해 영향을 주지 않는다면 사건 $A$와 $B$가 **독립사건(independent events)**라고 하며, 수학적으로 표현했을 때 아래와 같이 두 사건이 동시에 발생할 확률과 각각의 확률의 곱이 같으면 독립사건이라고 볼 수 있다.  

$$
P(B \vert A) = P(B), \ P(A \vert B) = P(A) \quad \Leftrightarrow \quad P(A \cap B) = P(A)P(B)
$$

또한 아래 유도에서 볼 수 있듯이 $A$와 $B$가 독립이면 $A$와 $B$의 여집합도 독립이다.  

$$
\begin{align*}
P(A) = P(A \cap B^{c}) + P(A \cap B) \quad \to \quad P(A) - P(A \cap B) & = P(A \cap B^{c}) \\
\\
P(A) - P(A)P(B) & = P(A \cap B^{c}) \\
\\
P(A)(1 - P(B)) & = P(A \cap B^{c}) \\
\\
P(A)P(B^{c}) & = P(A \cap B^{c})
\end{align*}
$$

!!! warning
    그러나 사건 $A$와 $B$가 배반사건이라고 해서 $A$와 $B$가 독립인 것은 아니다.  

## 4. 베이즈 정리

### 4-1. 전향적 연구와 후향적 연구

$P(B \vert A)$는 순서적으로 볼 때, 대부분 사건 $A$가 먼저 발생하고 $B$가 이어 발생하는 상황에 대한 확률로 $A$는 원인, $B$는 결과의 형태를 가진다. 통계학에서는 이런 형태와 같이 원인이 주어졌을 때 결과가 무엇이 나올 것인지에 대해 예측하는 문제를 **코호트 연구(cohort study)**, 또는 **전향적 연구(prospective study)**라한다.  

이 때, $A$의 관점에서 본다면 원인의 가능성인 $P(A)$ 또는 $P(A^{c})$는 $B$가 관측되기 이전의 확률이기 때문에 **사전확률(prior probability)**이라고 한다.  

또한 반대로 결과를 얻은 상태에서 그 결과가 발생하게 된 원인을 역으로 추정하는 경우도 있는데, 이를 **사례-대조연구(case-control study)**, 또는 **후향적 연구(retrospective study)**라 한다.  

이 때, 결과 $B$를 관측했을 때 그 원인이 $A$일 사건의 확률은 $P(A \vert B)$이기 때문에, 사건 $B$가 관측된 후의 $A$의 확률을 **사후확률(posterior probability)**이라 한다.  

### 4-2. 베이즈 정리

후향적 연구, 즉 결과가 얻어졌을 때 그 결과의 원인이 되는 것이 무엇인지에 대한 조건부 확률 문제를 해결하기 사용하는 방법이 **베이즈 정리(Bayes' theorem, Bayes' law, Bayes' rule)**이다. 베이즈 정리 공식은 다음과 같다.  

$$
P(A \vert B) = \frac{P(A)P(B \vert A)}{P(B)}
$$

??? note "베이즈 정리 공식 유도"
    $$
    \begin{align*}
    P(A \vert B) & = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0 \\
    \\
    & = \frac{P(A)P(B \vert A)}{P(A)P(B \vert A) + P(A^{c})P(B \vert A^{c})} \\
    \\
    & = \frac{P(A)P(B \vert A)}{P(B)}
    \end{align*}
    $$

베이즈 정리의 일반식은 다음과 같다.  

- 사건 $A_{1}, A_{2}, \cdots, A_{n}$이 표본공간 $\Omega$의 분할이고,
- 모든 $i$에 대해 $P(A_{i}) > 0$이면,

$$
P(A_{k} \vert B) = \frac{P(A_{k})P(B \vert A_{k})}{P(B)} = \frac{P(A_{k})P(B \vert A_{k})}{\sum_{i=1}^{n}P(A_{i})P(B \vert A_{i})}
$$

베이즈 정리의 각 요소들의 의미는 아래와 같다.  

- $P(A \vert B)$: 사후확률(posterior probability), 사건 $B$가 관측된 후의 $A$의 확률
- $P(A)$: 사전확률(prior probability), $B$가 관측되기 이전에 사건 $A$가 갖고 있는 확률
- $P(B \vert A)$: 가능도(우도, likelihood), 사건 $A$가 발생한 경우에 사건 $B$가 발생할 확률
- $P(B)$: 정규화 상수(normalizing constant), 증거(evidence)

---
## Reference
- [구현한 함수 git repository](https://github.com/djccnt15/mathematics)
