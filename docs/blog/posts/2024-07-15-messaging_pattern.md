---
slug: messaging-pattern
title: Messaging Pattern
date:
    created: 2024-07-15
description: >
    서버 간 통신을 위한 디자인 패턴 정리
categories:
    - SW Engineering
tags:
    - design patterns
---

서버 간 통신을 위한 디자인 패턴 정리

<!-- more -->

---

## Publish – Subscribe Pattern

줄여서 Pub/Sub 패턴이라고도 부르는 Publish – Subscribe Pattern은 통신이 필요한 서버 간의 느슨한 결합(**loose coupling**)을 위해 사용된다.  

Pub/Sub 패턴은 서버의 부하를 줄이기 위해 사용하는 패턴으로 서버는 RabbitMQ와 같은 Message Broker로 메세지를 전송하고, 각각의 클라이언트는 Message Broker로부터만 데이터를 전송 받는다.  

![pub_sub_pattern](./img/pub_sub_pattern.png){ loading=lazy }

메세지를 발송하는 Publisher는 메세지를 수신할 Subscriber에 대한 정보를 알 필요 없이 Message broker에게만 메세지를 전송하면 되기 때문에 시스템 아키텍처를 효율적으로 구성할 수 있다.  

Pub/Sub 패턴을 사용하는 대표적은 기능들은 아래와 같다.  

- MSA 환경에서의 이벤트 기반 프로세스 처리
- 알림 기능
- 실시간 메세지

Message broker로 사용할 수 있는 서비스들의 예시는 아래와 같다.  

- Redis
- Kafka
- RabbitMQ