---
published: true
layout: post
title: '[coding] 깨끗한 코드'
description: >
  깨끗한 코드를 위한 팁
categories: [SWEngineering]
tags: [coding]
image:
  path: /assets/img/posts/clean_code.png
related_posts:
  - _posts/swengineering/2022-01-08-clean_code.md
---
* toc
{:toc}

[노마드코더](https://www.youtube.com/c/%EB%85%B8%EB%A7%88%EB%93%9C%EC%BD%94%EB%8D%94NomadCoders)님이 올리신 영상 중에 깨끗한 코드를 위한 좋은 팁이 있어서 까먹지 않기 위해 내 생각을 추가해서 정리해둔다.  

## 1. 검색 가능한 이름을 사용할 것

상수를 사용해야 할 경우, 변수로 지정해서 사용하자.  

그러면 상수에 의미를 부여할 수 있어서 코드를 수정할 필요가 생길 때 상황에 맞는 상수를 수정하기 좋다.  

## 2. 함수 이름은 동사로 지을 것

함수는 단 하나의 기능만 수행해야 하며, 그 기능을 함수의 이름으로 사용하면 된다.  
함수의 기능이 늘어날 것 같으면 함수를 분리하는 것이 좋다.  

정말 아무 것도 모르고 개발하던 시절 하나의 함수에 여러개의 기능을 욱여넣은 적이 있다. 그 때 그 코드는 다시 볼 때마다 아주 골머리가 아프다.. 언젠가 그 코드를 수정할지도 모르는 누군가에게 애도..  

## 3. 함수의 argument는 3개나 그 이하로

인자가 3개 이상이 될 경우 configuration object를 사용하는게 좋다.  

데이터 분석이나 AI분야들은 유용한 패키지들 부터가 인자를 10개도 넘게 받는 경우가 많아 크게 의미는 없는 것 같다. 그래도 해당 패키지들을 사용하는 연구자가 이 부분을 고려해서 작업한다면 코드가 훨씬 깨끗하고 나중에 다시 이해하기 쉬울 것이다.  

실제로는 아래와 같이 `asterisk`를 사용해서 `argument unpacking`을 통해 인자를 인식하게 하면 된다. 상황에 따라 다르겠지만 개인적으로는 가능하다면 `args` 방식보다는 더 `explicit`한 `kwargs` 방식을 선호한다.  

```python
def func(a, b):
    return a + b

# args일 때
args = [1, 2]
test2 = test_func(*args)

# kwargs일 때
kwargs = {'a': 1, 'b': 3}
test = test_func(**kwargs)
```

## 4. boolean 값을 함수의 인자로 사용하는 것을 피할 것

`if else`에 따라 동작이 달라지는 함수는 기능별로 쪼개는 것이 좋다.  

## 5. 짧은 변수명이나 이해하기 힘든 축약어를 쓰지 말 것

코드는 읽기 쉽고 명확해야 한다.  

---
## Reference
- [노마드코더](https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ): [깨끗한 코드를 위한 5가지 팁](https://youtu.be/Jz8Sx1XYb04)  
<iframe src="https://www.youtube.com/embed/Jz8Sx1XYb04" title="깨끗한 코드를 위한 5가지 팁" frameborder="0" allowfullscreen></iframe>