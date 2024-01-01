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

PyCryptodome 패키지의 [공식 문서](https://www.pycryptodome.org/src/examples)를 참고하여 Python SW에 사용할 RSA 알고리즘 기반의 양방향 암호화 모듈을 개발해보았다.  

### Public, Private 키 생성 모듈

키 생성 모듈은 PyCryptodome 패키지를 활용해 공개키와 비공개키를 생성하는 모듈이다.  

RSA 암호화에서는 키의 길이가 중요한데, KISA에서는 2048 비트 이상으로 길게 설정할 것을 추천하고 있다.  

```python
from pathlib import Path

from Crypto.PublicKey import RSA


def create_keys_rsa(
    private_key: Path | str = "private.pem",
    public_key: Path | str = "public.pem",
    length: int = 2048,
):
    key = RSA.generate(bits=length)

    private = key.export_key()
    with open(file=private_key, mode="wb") as f:
        f.write(private)

    public = key.publickey().export_key()
    with open(file=public_key, mode="wb") as f:
        f.write(public)
```

### 데이터 암호화 모듈

데이터 암호화 모듈은 실제로 데이터를 암호화 하는 암호화 함수와 암호화 된 결과 데이터를 파일로 저장하는 함수로 이루어져 있다.  

암호화 함수의 경우 암호화에 `public key`를 사용하는 것으로 작성해두었지만, 실제로는 용도에 따라 `private key`를 입력해도 상관없다.  

```python
from dataclasses import asdict, dataclass
from pathlib import Path

from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes


@dataclass
class EncryptedData:
    enc_session_key: bytes
    nonce: bytes
    tag: bytes
    ciphertext: bytes


def encrypt_rsa(
    data: str,
    public_key: Path | str = "public.pem",
):
    session_key = get_random_bytes(16)

    # Encrypt the session key with the public RSA key
    with open(public_key) as key:
        rsa_key = RSA.import_key(extern_key=key.read())
    cipher_rsa = PKCS1_OAEP.new(key=rsa_key)
    enc_session_key = cipher_rsa.encrypt(message=session_key)

    # Encrypt the data with the AES session key
    cipher_aes = AES.new(
        key=session_key,
        mode=AES.MODE_EAX,
    )
    ciphertext, tag = cipher_aes.encrypt_and_digest(plaintext=data.encode("utf-8"))

    return Encrypted(
        enc_session_key=enc_session_key,
        nonce=cipher_aes.nonce,
        tag=tag,
        ciphertext=ciphertext,
    )


def rsa_to_file(
    encrypted: Encrypted,
    file_name: Path | str = "encrypted.bin",
):
    with open(file_name, "wb") as f:
        for _, v in asdict(obj=encrypted).items():
            f.write(v)
```

PyCryptodome 패키지는 오직 bytes형만 처리 가능하기 때문에 암호화할 데이터를 인코딩해야한다.  

### 데이터 복호화 모듈

복호화 모듈은 파일로 저장된 암호화 된 데이터를 읽어오는 함수와 읽은 데이터를 키를 이용해 복호화 하는 함수로 이루어져 있다.  

암호화 모듈과 마찬가지로 복호화에 `private key`를 사용하는 것으로 작성해두었지만, `private key`로 입력된 데이터를 복호화할 때는 `public key`를 사용하면 된다.  

```python
from dataclasses import dataclass
from pathlib import Path

from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.PublicKey import RSA


@dataclass
class EncryptedData:
    enc_session_key: bytes
    nonce: bytes
    tag: bytes
    ciphertext: bytes


def rsa_from_file(
    private_key: Path | str = "private.pem",
    file_name: Path | str = "encrypted.bin",
):
    with open(private_key) as k:
        private = RSA.import_key(extern_key=k.read())

    with open(file_name, "rb") as f:
        enc_session_key, nonce, tag, ciphertext = [
            f.read(x) for x in (private.size_in_bytes(), 16, 16, -1)
        ]

    return Encrypted(
        enc_session_key=enc_session_key,
        nonce=nonce,
        tag=tag,
        ciphertext=ciphertext,
    )


def decrypt_rsa(
    encrypted: Encrypted,
    private_key: Path | str = "private.pem",
):
    with open(private_key) as k:
        private = RSA.import_key(extern_key=k.read())

    # Decrypt the session key with the private RSA key
    cipher_rsa = PKCS1_OAEP.new(key=private)
    session_key = cipher_rsa.decrypt(ciphertext=encrypted.enc_session_key)

    # Decrypt the data with the AES session key
    cipher_aes = AES.new(
        key=session_key,
        mode=AES.MODE_EAX,
        nonce=encrypted.nonce,
    )

    return cipher_aes.decrypt_and_verify(
        ciphertext=encrypted.ciphertext,
        received_mac_tag=encrypted.tag,
    ).decode("utf-8")
```

---
## Reference
- [Python 시큐어코딩 가이드](https://www.kisa.or.kr/2060204/form?postSeq=13&lang_type=KO)
- [PyCryptodome 공식 문서](https://www.pycryptodome.org/src/examples#generate-public-key-and-private-key)