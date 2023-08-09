---
published: true
layout: post
title: '[Python] 비대칭 암호화'
description: >
    Python으로 비대칭 암호화 하기
categories: [Python]
tags: [python, security, encrypt, decrypt]
image:
    path: /assets/img/posts/thumbnail_python.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 비대칭 암호화 모듈 개발

SW를 개발할 때 각종 키 등 구동에 필요한 중요정보는 암호화 후 분리해서 보관해야 하는데, KISA의 [Python 시큐어 코딩 가이드](https://www.kisa.or.kr/2060204/form?postSeq=13&lang_type=KO)에서는 PyCryptodome 패키지를 사용해 암호화 하는 것을 추천하고 있다.  

PyCryptodome 패키지의 [공식 문서](https://www.pycryptodome.org/src/examples)를 참고하여 Python SW에 사용할 암호화/복호화 모듈을 개발해보았다.  

### Public, Private 키 생성 모듈

```python
from pathlib import Path

from Crypto.PublicKey import RSA


def create_keys_rsa(
        private_key: Path | str = 'private.pem',
        public_key: Path | str = 'public.pem',
        length: int = 2048
):
    key = RSA.generate(length)

    private = key.export_key()
    with open(private_key, 'wb') as f:
        f.write(private)

    public = key.publickey().export_key()
    with open(public_key, 'wb') as f:
        f.write(public)
```

### 데이터 암호화 모듈

```python
from pathlib import Path

from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES, PKCS1_OAEP


def encrypt_rsa(
        data: str,
        file_name: Path | str = 'encrypted.bin',
        public_key: Path | str = 'public.pem'
):
    session_key = get_random_bytes(16)

    # Encrypt the session key with the public RSA key
    with open(public_key) as key:
        cipher_rsa = PKCS1_OAEP.new(RSA.import_key(key.read()))
    enc_session_key = cipher_rsa.encrypt(session_key)

    # Encrypt the data with the AES session key
    cipher_aes = AES.new(session_key, AES.MODE_EAX)
    ciphertext, tag = cipher_aes.encrypt_and_digest(data.encode('utf-8'))

    with open(file_name, 'wb') as f:
        for x in (enc_session_key, cipher_aes.nonce, tag, ciphertext):
            f.write(x)
```

❗pycryptodome는 오직 bytes형만 처리 가능하다는 점을 주의
{:.note title='attention'}

### 데이터 복호화 모듈

```python
from pathlib import Path

from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP


def decrypt_rsa(
        file_name: Path | str = 'encrypted.bin',
        private_key: Path | str = 'private.pem'
):
    with open(private_key) as k:
        private = RSA.import_key(k.read())

    with open(file_name, 'rb') as f:
        enc_session_key, nonce, tag, ciphertext = [f.read(x) for x in (private.size_in_bytes(), 16, 16, -1)]

    # Decrypt the session key with the private RSA key
    cipher_rsa = PKCS1_OAEP.new(private)
    session_key = cipher_rsa.decrypt(enc_session_key)

    # Decrypt the data with the AES session key
    cipher_aes = AES.new(session_key, AES.MODE_EAX, nonce)
    return cipher_aes.decrypt_and_verify(ciphertext, tag).decode('utf-8')
```

## 사용 예시

개인적으로 중요정보는 JSON 형태로 사용하기 때문에 JSON 파일을 예시로 들면 아래와 같다.  

```json
{
    "auth": {
        "secret_key": "****",
        "algorithm": "HS256"
    }
}
```

Python은 JSON을 입력받을 경우 자동으로 `dict`로 매핑하기 때문에 `literal_eval`를 사용해서 데이터를 자료구조로 복원하는 것이 가능하다.  

```python
import json
from ast import literal_eval

# create RSA key
create_keys_rsa('private.pem', 'public.pem')

# encrypt key data
with open('tmp.json') as f:
    key_json = json.load(f)
encrypt_rsa(str(key_json), 'encrypted.bin', 'public.pem')

# decrypt key data
key = literal_eval(decrypt_rsa('encrypted.bin', 'private.pem'))
print(key, type(key))
```
```
{'auth': {'secret_key': '****', 'algorithm': 'HS256'}} <class 'dict'>
```

---
## Reference
- [Python 시큐어코딩 가이드](https://www.kisa.or.kr/2060204/form?postSeq=13&lang_type=KO)
- [PyCryptodome 공식 문서](https://www.pycryptodome.org/src/examples#generate-public-key-and-private-key)