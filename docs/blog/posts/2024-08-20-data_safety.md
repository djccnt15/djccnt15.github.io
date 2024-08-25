---
slug: data-safety
title: 데이터를 안전하게 전송하기 위한 변환
date:
    created: 2024-08-20
description: >
    데이터의 안전한 전송을 위한 변환의 종류와 차이점 정리
categories:
    - Computer Science
tags:
    - data
---

데이터의 안전한 전송을 위한 변환의 종류와 차이점 관련 정리  

<!-- more -->

---

## Encoding, Hashing, Encryption

세 가지 모두 개발 중에 데이터 변환 위해 자주 사용되는 기법들인데, 각각의 기법이 정확히 의미하는 바를 확실히 정리할 필요가 있어 정리해 보았다.  

### Encoding

- 목적: 공개된 방식을 사용해 데이터를 다른 형식(format)으로 변환
- 목표: 서로 다른 시스템에서 전달된 데이터가 제대로 사용됨
- 핵심: 가역성, 데이터는 동일한 변환 방식을 통해 원상복구(decoding) 될 수 있음
- 예시: Base64, URL encoding, UNICODE, ASCII, utf-8, euc-kr

```python
data = "가@b:8000"
encoded = data.encode(encoding="utf-8")

print(f"{encoded=}")
print(f"{encoded.decode()=}")
```
```
encoded=b'\xea\xb0\x80@b:8000'
encoded.decode()='가@b:8000'
```

### Hashing

- 목적: 원래 데이터 크기에 관계없이 데이터에서 **고정된 크기의 문자열** 생성
- 목표: 데이터의 고유한 지문을 제공하여 데이터 무결성과 진위성 보장
- 핵심: 비가역성, 데이터는 원본 데이터로 원상복구 될 수 없음
- 예시: MD5, SHA-1, SHA-256
- 주의: **동일한 입력값은 반드시 동일한 결과값을 반환**함

!!! note
    Hashing은 단방향(일방향) 암호화로 지칭되기도 한다.  

!!! warning
    데이터가 원본 데이터로 원상복구 될 수 없다는 점을 이용해 해싱 알고리즘을 암호화 알고리즘으로 사용하는 경우도 많지만, 해싱 알고리즘을 단독으로 암호화 알고리즘으로 사용하면 Rainbow Table Attack에 매우 취약해지기 때문에 **Salt**, **Pepper** 등 보조 암호화 기법을 추가로 적용해야한다.  

```python
from hashlib import sha256

data = "가@b:8000"
hashed = sha256(data.encode())

print(f"{hashed.hexdigest()=}")
```
```
hashed.hexdigest()='6a9719cb6a54c3dcef5653a27d9b4dd2b351712dd1ed98e90daa1cc4eff9aad7'
```

### Encryption

- 목적: 권한이 없는 사용자가 읽을 수 없는 형식으로 변환하여 데이터 보호
- 목표: 데이터의 기밀성 보장
- 핵심: 가역성, 데이터는 동일한 변환 방식을 통해 복호화(decrypt) 될 수 있음
- 예시: [Python 비대칭 암호화(RSA) 예시](./2023-07-05-asymmetric_encryption.md)
    - 대칭키 방식: AES, DES 등. 암호화와 복호화에 동일한 키 사용
    - 비대칭키 방식: RSA, ECC 등. 암호화와 복호화에 공개키와 비밀키 사용