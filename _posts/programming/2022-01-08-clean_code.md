---
title: "깨끗한 코드"
excerpt: "깨끗한 코드를 위한 팁"
published: false

toc: true
toc_sticky: true

categories:
  - Programming
tags:
  - clean code
---
# {{ page.excerpt }}
---
노마드코더님이 올리신 영상 중에 깨끗한 코드를 위한 좋은 팁이 있어서 까먹지 않기 위해 내 생각을 추가해서 정리해둔다.  

## 1. 검색 가능한 이름 사용해라
상수를 사용해야 할 경우, 변수로 지정해서 사용할 것  
이렇게 하면 나중에 상수에 의미를 부여할 수 있어서 코드를 수정할 필요가 생길 때 상황에 맞는 상수를 수정하기 좋다.  

## 2. 함수 이름은 동사로 지을 것
함수는 단 하나의 기능만 수행해야 하며, 그 기능을 함수의 이름으로 사용하면 됨  
함수의 기능이 늘어날 것 같으면 함수를 분리하는 것이 좋다.  

정말 아무것도 모르고 개발했을 때 하나의 함수에 여러개의 기능울 욱여넣은 적이 있다.  
그 때 그 코드는 다시 볼 때마다 아주 골머리가 아프다.. 언젠가 그 코드를 수정할지도 모르는 누군가에게 애도..  

## 3. 함수의 argument는 3개나 그 이하로
인자가 3개 이상이 될 경우 configuration object를 사용할 것을 추천함  
파이썬에서는 의미 없는 듯? 굳이 하고 싶다면 아래와 같이 asterisk를 사용해서 argument unpacking을 통해 인자를 하면 된다.  

```python
def func(a, b):
    return a + b

# args일 때
args = [1, 2]
test2 = test_func(*args)

# kwargs일 때
kwargs = {'a' : 1, 'b' : 3}
test = test_func(**kwargs)
```

## 4. boolean 값을 함수의 인자로 사용하는 것을 피하자
if else에 따라 동작이 달라지는 함수는 기능별로 쪼개는 것이 좋다.  

## 5. 짧은 변수명이나 이해하기 힘든 축약어를 쓰지 마라
코드는 읽기 쉽고 명확해야 한다.  


[![보러가기](https://img.youtube.com/vi/Jz8Sx1XYb04/0.jpg)](https://youtu.be/Jz8Sx1XYb04)

---
# Reference
[노마드코더](https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ): [깨끗한 코드를 위한 5가지 팁](https://youtu.be/Jz8Sx1XYb04)