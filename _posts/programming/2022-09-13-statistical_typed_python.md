---
published: true
layout: post
title: '[Python] 정적 언어처럼 사용하기'
description: >
  python에서 변수 타입을 고정하고 엄격하게 사용하는 방법
categories: [Programming]
tags: [python]
image:
  path: /assets/img/posts/python_type_cheking_pylance.png
related_posts:
  - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 정적 타입 언어와 동적 타입 언어

프로그래밍 언어는 변수의 타입이 정해지는 시점에 따라 [**정적 타입**언어와 **동적 타입** 언어](https://en.wikipedia.org/wiki/Type_system#Type_checking)로 나누어진다.  

**정적 타입(Statically Typed)** 언어는 컴파일 시점에 변수의 타입이 결정되는 언어로, 이를 위해 코드에 미리 데이터의 자료형을 지정해줘야 한다. 타입 에러로 인한 문제를 컴파일 타임에 해결할 수 있기 때문에 안정성이 높고, 컴파일 시에 미리 타입을 결정하기 때문에 실행속도가 빠르지만, 프로그래밍의 유연성이 낮다. C, C++, Java 등이 대표적인 정적 타입 언어들이다.  

**동적 타입(Dynamically Typed)** 언어는 런타임 시점에 변수의 타입이 결정되는 언어로, 따라서 코드에 미리 데이터의 자료형을 지정해줄 필요가 없다. 코딩 시 타입에 대한 제한이 없기 때문에 유연성이 높아 생산성이 좋지만, 런타임 단계에서 데이터의 자료형으로 인한 오류가 발생할 수 있다. Python, Ruby, JavaScript 등이 대표적인 동적 타입 언어들이다.  

## Python에서 정적 타입 검사하기

### Mypy와 Variable Annotations 사용

Python에서도 [Mypy](https://github.com/python/mypy)와 [Variable Annotations](https://peps.python.org/pep-0008/#variable-annotations)을 사용하면 정적 타입 언어처럼 미리 타입 에러를 체크해볼 수 있다.  

Mypy는 아래와 같이 pip를 통해서 설치할 수 있다.  

```
pip install mypy
```

아래와 같이 짧은 코드를 작성하고 `test.py`로 저장한 후  

```python
a: int = 'a'  # annotate a as int but declare it as str
```

`mypy`를 통해서 파일을 시행하면,  

```
> mypy test.py
```
```
test.py:1: error: Incompatible types in assignment (expression has type "str", variable has type "int")
Found 1 error in 1 file (checked 1 source file)
```

이렇게 타입 에러를 검사해준다. 참고로 Python의 Annotations은 comment와 마찬가지로 강제성이 전혀 없기 때문에 실행 시에 Annotations을 작성해주는 것 자체로는 런타임 시에 에러가 나지는 않는다.  

![python_type_cheking_mypy](/assets/img/posts/python_type_cheking_mypy.png)

💡 참고로 [Variable Annotations](https://peps.python.org/pep-0008/#variable-annotations)는 Python 3.6 부터 도입된 일종의 주석 기능으로, [PEP 526](https://peps.python.org/pep-0526/)에서 세부 내용을 확인할 수 있다.  
{:.note}

### IDE 기능 사용

VSCode에서 Python 스크립트를 코딩할 때 사용하는 extension 중 [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)가 있다. Pylance의 `Type Checking Mode`옵션을 켜주면 아래 그림과 같이 데이터의 자료형을 검사해준다.  

![python_type_checking_pylance](/assets/img/posts/python_type_checking_pylance.png)

### Annotation 무시하기

이런저런 이유로 Annotation을 무시하고 싶을 수도 있는데, 이 때는 아래와 같이 `# type: ignore` 주석을 해당 라인 뒤에 붙여주면 된다.  

```python
a: int = "a"  # type: ignore
```

![python_type_checking_ignore](/assets/img/posts/python_type_checking_ignore.png)

---
## Reference
- [How to Use Static Type Checking in Python 3.6](https://medium.com/@ageitgey/learn-how-to-use-static-type-checking-in-python-3-6-in-10-minutes-12c86d72677b)
- [[CS 기초] 정적타입 언어 vs 동적타입 언어](https://algorfati.tistory.com/112)