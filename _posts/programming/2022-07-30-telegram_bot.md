---
published: true
layout: post

title: '[Bot] Telegram Bot 만들기'
description: >
    Telegram Bot API로 python 자동 알림 만들기
hide_description: false
image:
    path: /assets/img/posts/telegram_bot_setting.png
related_posts:
    - _posts/programming/2022-07-30-telegram_bot.md

categories:
    - Programming
tags:
    - bot
---
* toc
{:toc}

## 1. 개요

회사에서 머신러닝 모델 개발 및 학습 업무를 담당하고 있는데, 코드가 다 돌면 매번 결과 확인 후 하이퍼 파라미터 튜닝을 해줘야 하기 때문에 계속 신경 써줘야하는 주제에 시간은 오래 걸리고 자동화는 어렵다. ~~빨리 AutoML을 적용해야 하는데 ㅠ~~  

그래서 [Knowblesse](https://blog.knowblesse.com/)님의 블로그를 참고하여 [Telegram](https://telegram.org/) API를 활용해서 코드가 다 돌아가면(학습이 끝나면) 자동으로 메세지를 보내는 기능을 구현해보았다.  

## 2. Telegram 준비 및 bot 설정

Telegram을 가입 후 **BotFather**를 검색해서 새로운 bot을 만들자.  

![telegram_bot_setting](/assets/img/posts/telegram_bot_setting.png)
{:.text-center}

검정색으로 가려진 부분이 **HTTP access token**이다.  

❗공식 마크를 잘 확인하자. 사칭이 좀 있다.  
{:.note title="attention"}

## 3. HTTP 호출을 통한 bot 생성 확인

웹브라우저 주소창에 아래와 같이 입력하면 생성한 bot과의 연결 상태를 확인할 수 있다.  

```
https://api.telegram.org/bot{YOUR_HTTP_ACCESS_TOKEN}/getMe
```

![telegram_bot_getMe_01](/assets/img/posts/telegram_bot_getMe_01.png)
{:.text-center}

![telegram_bot_getMe_02](/assets/img/posts/telegram_bot_getMe_02.png){: width="50%"}
{:.text-center}

## 4. ID 확인

bot에게 말을 걸어서 대화방을 생성하고 **id**를 확인하자. 스팸 문제로 bot이 먼저 사용자에게 말을 걸 수는 없다고 한다.  

![telegram_bot_getUpdates_01](/assets/img/posts/telegram_bot_getUpdates_01.png){: width="50%"}
{:.text-center}

웹브라우저 주소창에 아래와 같이 입력하면 생성한 bot과의 대화방을 업데이트 한다.  

```
https://api.telegram.org/bot{YOUR_HTTP_ACCESS_TOKEN}/getUpdates
```

![telegram_bot_getUpdates_02](/assets/img/posts/telegram_bot_getUpdates_02.png)
{:.text-center}

![telegram_bot_getUpdates_03](/assets/img/posts/telegram_bot_getUpdates_03.png){: width="50%"}
{:.text-center}

`message`의 `from` `id`를 보면 되는데, 이 경우에는 `5463934262`이다.  

## 5. 메세지 보내기

이제 `http request`의 `sendMessage`를 사용해서 메시지를 보내면 된다.  

```
https://api.telegram.org/bot{YOUR_HTTP_ACCESS_TOKEN}/sendMessage?chat_id={YOUR_ID}&text={YOUR_MESSAGE}
```

`python`에서 메세지를 보내는 방법은 아래와 같다.  

```python
import requests

requests.get('https://api.telegram.org/bot{YOUR_HTTP_ACCESS_TOKEN}/sendMessage?chat_id=5463934262&text=Code Finished')
```

![telegram_bot_test](/assets/img/posts/telegram_bot_test.png){: width="25%"}
{:.text-center}

---
## Reference
- [Telegram bot을 활용한 코드 실행이 끝나면 핸드폰으로 메시지 보내기](https://blog.knowblesse.com/43?category=733209)