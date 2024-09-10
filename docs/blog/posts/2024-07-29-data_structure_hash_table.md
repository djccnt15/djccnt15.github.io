---
slug: data-structure-hash-table
title: '[자료구조] 06. 해시 테이블'
date:
    created: 2024-07-29
description: >
    Python으로 해시 테이블 구현하기
categories:
    - Computer Science
tags:
    - data structure
---

해시 테이블(Hash Table)의 개념과 Python으로 구현하기  

<!-- more -->

---

## 해시 테이블의 개념

**해시 테이블(hash table)**은 데이터를 Key - Value 쌍으로 묶어 저장하며 Key를 통해서 데이터에 접근하는 형태의 자료구조를 말한다. 이 때 Key는 중복될 수 없기 때문에, Key로 지정된 값을 hash를 통해 변환하기 때문에 해시 테이블이라고 불린다.  

- 장점
    - Key를 통해 데이터에 접근하기 때문에 데이터 접근 속도가 매우 빠르다
    - 특정 키에 대한 데이터가 존재하는지 확인이 쉽다
- 단점
    - 일반적으로 저장공간이 많이 필요하다
    - Key를 hashing하는 해시 함수에서 동일한 주소(hash address)가 반환될 경우(다른 Key 값인데 동일한 주소가 도출될 경우)에 발생하는 해시 충돌(hash collision)을 방지하기 위한 대처가 필요하다
- 시간 복잡도
    - 해시 충돌이 없는 경우 $O(1)$
    - 해시 충돌이 모두 발생할 경우 $O(n)$
- 주요 용도
    - 검색이 많이 필요한 경우
    - 저장, 삭제, 읽기가 빈번한 경우
    - 캐쉬 구현

!!! note "Key 해시 충돌 해결 방법"
    1. 좋은 해시 함수 사용
    1. Chaining 기법 사용
        - 해시 테이블 외의 공간 활용
        - 연결 리스트를 활용해 충돌 발생 시 데이터를 다음 노드에 저장
    1. Linear Probing 기법 사용
        - 충돌 발생 시 해당 hash address의 다음 address 부터 맨 처음 나오는 빈공간에 저장
        - 저장공간 활용도가 높음

!!! note
    Python의 경우 `dictionary`라는 해시 테이블 자료구조를 기본적으로 제공하는데, 해싱 함수를 통해 도출되는 Key값의 정합성을 유지하기 위해 Key 값에는 immutable 데이터만 사용 가능하다.  
    
## 해시 테이블의 구현

Python으로 해시 테이블을 구현하면 아래와 같다.  

```python
class ReprMixin:
    def __repr__(self) -> str:
        attrs = ", ".join(f"{k}={v!r}" for k, v in vars(self).items())
        return f"{self.__class__.__name__}({attrs})"


class Slot(ReprMixin):
    def __init__(self, key, value) -> None:
        self.key = key
        self.value = value


class ChainingHashTable(ReprMixin):
    def __init__(self, *, size: int) -> None:
        self.table: list[list[Slot]] = [None for _ in range(size)]
        self.size = size

    def hash_key(self, data):
        return data % self.size

    def save_data(self, data, value):
        index_key = hash(data)
        hash_addr = self.hash_key(data=index_key)
        if not self.table[hash_addr]:
            self.table[hash_addr] = [Slot(key=index_key, value=value)]
        else:
            for i in range(len(self.table[hash_addr])):
                if self.table[hash_addr][i].key == index_key:
                    self.table[hash_addr][i].value = value
            self.table[hash_addr].extend([Slot(key=index_key, value=value)])

    def read_data(self, data):
        index_key = hash(data)
        hash_addr = self.hash_key(data=index_key)
        if self.table[hash_addr]:
            for i in range(len(self.table[hash_addr])):
                if self.table[hash_addr][i].key == index_key:
                    return self.table[hash_addr][i].value
            return None
        else:
            return None


class LinearProbingHashTable:
    def __init__(self, *, size: int) -> None:
        self.table: list[Slot] = [None for _ in range(size)]
        self.size = size

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}(size={self.size}, table={self.table})"

    def hash_key(self, data):
        return data % self.size

    def save_data(self, data, value):
        index_key = hash(data)
        hash_addr = self.hash_key(data=index_key)
        if self.table[hash_addr]:
            for i in range(hash_addr, len(self.table)):
                if not self.table[i]:
                    self.table[i] = Slot(key=index_key, value=value)
                elif self.table[i].key == index_key:
                    self.table[i].value = value
            return
        self.table[hash_addr] = Slot(key=index_key, value=value)

    def read_data(self, data):
        index_key = hash(data)
        hash_addr = self.hash_key(data=index_key)
        if self.table[hash_addr]:
            for i in range(hash_addr, len(self.table)):
                if not self.table[i]:
                    return None
                elif self.table[i].key == index_key:
                    return self.table[i].value
        return None
```
