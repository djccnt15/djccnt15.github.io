---
slug: network-load-balancing
title: 웹 환경에서의 로드 밸런싱
date:
    created: 2026-05-30
description: >
    네트워크 분산 처리를 위한 서버의 로드 밸런싱
categories:
    - Server Engineering
tags:
    - web server
    - load balance
---

로드 밸런싱은 웹 서비스의 트래픽 부하를 분산하기 위한 가장 대표적인 방법이다.  

<!-- more -->

---

## Load Balancing 방법

1. Round-Robin
    - 단순히 각각의 프로세스에 순서대로 번갈아가며 작업을 수행시키는 방식
1. IP Hashing
    - 동일한 IP의 요청을 기존과 동일한 서버로 연결
    - 애플리케이션 서버의 캐시를 활용할 수 있기 때문에 UX 개선
1. Hashing
    - IP Hashing과 동일하나 payload 등 IP가 아닌 다른 데이터를 기반으로 해싱하여 분산 처리
1. Least Connection
    - 요청을 받은 시점에 가장 연결이 적은 서버에서 처리
    - 요청 처리를 위해 connection 유지가 긴 애플리케이션에 적합
1. Least Time
    - 가장 빨리 요청을 줄 것으로 기대되는 서버에서 처리
    - 평균 응답 시간, 유지 중인 connection 개수 등의 값으로 계산[^1]
1. Random
    - 랜덤한 서버에서 처리
    - Least Connection, Least Time 등과 조합하여 사용

[^1]: 계산 공식은 구현체에 따라 다름

!!! note "IP hashing의 한계"
    IP 만으로 같은 유저의 요청이라고 확신할 수는 없으나 HTTP 요청의 payload를 일일이 분석하는 것은 Load Balancer의 자원을 너무 많이 소모하기 때문에 IP로 추정한다.  

!!! info
    IP 값을 직접 사용한 결과로 분산처리를 하면, 사용자 접속 패턴에 따라 특정 애플리케이션에 요청이 편중될 가능성이 높다. 따라서 특정 패턴에 종속되지 않는 랜덤값을 반환하는 hashing을 통해 분산시키면, 단순 IP를 사용한 분산보다 더 고르게 분산시킬 수 있다.  

## 애플리케이션 상태 확인

Load Balancer가 애플리케이션으로 요청을 전달하기 위해서는 대상 서버가 이용 가능한 상태여야 하는데, Load Balancer는 애플리케이션의 이용 가능 여부를 아래 방법들로 확인한다.  

1. TCP/UDP 등 연결 상태 확인
1. 확인용 URI에 요청 전달 후 응답 코드 확인
1. 확인용 데이터 전송 후 응답 값과 기대값 대조

!!! success
    후 순위 방식일수록 health check 비용이 큰 대신 신뢰성이 높다.  
