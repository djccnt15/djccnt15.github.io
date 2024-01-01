---
published: true
layout: post
title: '[Python] main 선언하기'
description: >
    Python에서 main과 외부 모듈 구별하기
categories: [Python]
tags: [python]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 1. \_\_name\_\_ 이란?

Python으로 개발을 하다보면 아래와 같은 조건문을 종종 볼 수 있다.  

```python
if __name__ == '__main__': ...
```

일단 Python에서 `__name__` 변수는 Python 프로그램, 즉 `.py` 파일마다 기본으로 생성되는 전역 변수로, 프로그램(모듈)의 이름을 뜻한다.  

아래와 같이 전역 변수 호출 함수를 통해 확인할 수 있다.  

```python
print(globals())
```
```
{'__name__': '__main__', '__doc__': None, '__package__': None, '__loader__': <_frozen_importlib_external.SourceFileLoader object at 0x000001692BE38A00>, '__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, '__file__': 'C:\\projects\\python310\\scratch.py', '__cached__': None}
```

## 2. \_\_main\_\_ 이란?

[공식 문서](https://docs.python.org/3.11/library/__main__.html)에 따르면 `__main__`이라는 이름은 아래의 두 가지 구조를 나타내기 위해 사용한다.  

- 프로그램 최상위 환경의 이름
- Python 패키지의 `__main__.py` 파일

따라서 아래와 같이 현재 구동 환경의 `__name__`이 `__main__`과 동일한지 확인해서 스크립트가 메인 프로그램인지 아니면 `import` 된 모듈인지 확인할 수 있다.  

```python
if __name__ == '__main__': ...
```

## 3. 왜 사용할까?

다른 언어들은 `main` 함수나 클래스를 선언해서 호출된 함수가 현재 실행중인 프로그램의 일부인지 아니면 외부 모듈에서 가져온 함수인지를 확인하지만, Python은 `main` 함수나 클래스 선언을 하지 않기 때문에 프로그램이 외부 모듈을 호출할 경우 전체 코드를 모두 실행한다.  

문제는 프로그래밍으로 모듈과 API를 만들면 해당 API들의 테스트 코드를 작성하게 되는데, 해당 모듈을 호출 할 때 덧붙여진 테스트 코드들이 실행된다. `if __name__ == '__main__': ...` 구문은 이로 인해 발생하는 불필요한 작업 수행을 막기 위해 사용한다.  

## 4. 코드로 이해하기

아래와 같은 `samplemodule.py`을 만들었다고 해보자.  

```python
def add(a, b):
    return a + b

print(globals().get('__name__'))
print(add(1, 2))
```
```
__main__
3
```

아래와 같이 다른 코드에서 해당 모듈을 호출하기만 해도 테스트 코드가 실행되는 것을 확인할 수 있다.  

```python
import samplemodule

print(globals().get('__name__'))
```
```
samplemodule
3
__main__
```

아래와 같이 테스트 코드를 `if __name__ == '__main__': ...` 구문으로 넣어주면 자기 자신을 실행시켰을 때는 출력 결과가 동일하지만,  

```python
def add(a, b):
    return a + b

print(globals().get('__name__'))

if __name__ == '__main__':
    print(add(1, 2))
```
```
__main__
3
```

다른 프로그램에서 모듈을 호출 했을 때는 테스트 코드가 실행되지 않는 것을 확인할 수 있다.  

```python
import samplemodule

print(globals().get('__name__'))
```
```
samplemodule
__main__
```

---
## Reference
- [\_\_main\_\_ — Top-level code environment](https://docs.python.org/3.11/library/__main__.html)