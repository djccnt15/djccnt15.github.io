---
published: true
layout: post
title: '[백준] 소수 관련 문제들'
description: >
    백준 1978. 소수 찾기, 2581. 소수, 1929. 소수 구하기
categories: [CodingTest]
tags: [baekjoon, python]
image:
    path: /assets/img/posts/thumbnail_codingtest.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 문제

소수는 1보다 큰 자연수 중 1과 자기 자신만을 약수로 가지는 수를 말한다.  

1978번. 주어진 수 N개 중에서 소수가 몇 개인지 찾아서 출력하는 프로그램을 작성하라.  

2581번. 자연수 M과 N이 주어질 때 M이상 N이하의 자연수 중 소수인 것을 모두 골라 이들 소수의 합과 최솟값을 찾는 프로그램을 작성하라. 만약 해당하는 소수가 없다면 -1을 출력하라.  

1929번. M이상 N이하의 소수를 모두 출력하는 프로그램을 작성하라.  

## 풀이

소수 관련 문제들은 두 가지 방법으로 풀 수 있는데, 우선 아래와 같이 주어진 자연수가 소수인지 확인하는 함수를 만들어 풀 수 있다. 참고로 특정 수가 소수인지 확인할 때는 자기 자신의 제곱근 보다 큰 수들은 확인할 필요가 없다는 점을 감안하면 좀 더 판별 속도를 올릴 수 있다.  

```python
def is_prime(n):
    if n == 1:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True


# Q. 1978
input()
print(sum(is_prime(int(x)) for x in input().split()))

# Q. 2581
d = [v for v in (i for i in range(*[int(input()), int(input()) + 1])) if is_prime(v) == True]
print(-1) if bool(d) == False else print(sum(d), min(d), sep='\n')

# Q. 1929
a, b = (int(x) for x in (input().split()))

for v in (i for i in range(a, b + 1)):
    if is_prime(v):
        print(v)
```

그리고 [에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)라는 개념이 있는데, 주어진 수의 범위에서 작은 숫자부터 시작하여 해당 수의 배수들을 전부 지워나가면 소수를 쉽게 찾을 수 있는 방법이다.  

![Sieve_of_Eratosthenes](https://upload.wikimedia.org/wikipedia/commons/b/b9/Sieve_of_Eratosthenes_animation.gif)
{:.text-center}

에라토스테네스의 체를 응용하면 아래와 같이 문제를 풀어낼 수도 있다. BOJ에 제출해서 결과를 보면 아래 해법이 메모리를 좀 더 많이 먹는 대신 작동 시간이 위 방법에 비해 확연히 빠른 것을 확인할 수 있다.  

```python
# Q. 1929
m, n = (int(x) for x in (input().split()))

d = [i for i in range(2, n + 1)]
c = {j for i in range(2, int(n ** 0.5) + 1) for j in range(i * 2, n + i, i)}

for v in d:
    if v >= m and v not in c:
        print(v)
```

---
## Reference
- [풀어낸 문제 git repository](https://github.com/djccnt15/coding_test)
- [문제 출처(1978번)](https://www.acmicpc.net/problem/1978)
- [문제 출처(2581번)](https://www.acmicpc.net/problem/2581)
- [문제 출처(1929번)](https://www.acmicpc.net/problem/1929)