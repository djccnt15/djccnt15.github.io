---
draft: true
slug: messaging-pattern
title: Messaging Pattern
date:
    created: 2024-07-15
description: >
    메세지 전송을 위한 디자인 패턴 정리
categories:
    - SW Engineering
tags:
    - design patterns
    - cache
---

메세지 전송을 위한 디자인 패턴 정리  

<!-- more -->

---

## Pub/Sub Pattern

서버의 부하를 줄이기 위해 사용하는 패턴으로 서버는 RabbitMQ와 같은 Message Broker로 메세지를 전송하고, 각각의 클라이언트가 Message Broker로부터 데이터를 전송 받는다.  

![publish_subscribe_pattern](./img/publish_subscribe_pattern.png){ loading=lazy }