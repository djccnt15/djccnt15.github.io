---
slug: osi-network
title: OSI 7계층과 TCP/IP
date:
    created: 2024-09-28
description: >
    네트워크 이론: OSI 7계층과 TCP/IP 정리
categories:
    - Computer Science
tags:
    - network
    - osi
    - tcp
    - ip
    - udp
---

네트워크 이론: OSI 7계층과 TCP/IP 정리  

<!-- more -->

---

## OSI 7 계층

일반적으로 OSI 7 계층(Layer)라고 부르는 OSI(Open Systems Interconnection) 모델은 컴퓨터 네트워크 프로토콜 디자인과 통신을 계층으로 나누어 설명하는 모델이다.  

OSI 7 계층을 요약하면 아래와 같다.  

|              |  Num  | Layer        | PDU[^1]          |
| ------------ | :---: | ------------ | ---------------- |
| Host Layers  |   7   | Application  | Data             |
| Host Layers  |   6   | Presentation | Data             |
| Host Layers  |   5   | Session      | Data             |
| Host Layers  |   4   | Transport    | Segment          |
| Media Layers |   3   | Network      | Packet, Datagram |
| Media Layers |   2   | Data Link    | Frame            |
| Media Layers |   1   | Physical     | Bit, Symbol      |

[^1]: [Protocol Data Unit](https://en.wikipedia.org/wiki/Protocol_data_unit), 통신에서 네트워크의 피어 엔티티 간에 전송되는 단일 정보 단위

!!! note
    각 계층을 통과할 때마다 전송되는 데이터에 각 계층별 Header, Trailer 등이 첨부되어 캡슐화된다.  

각 계층의 기능과 상세 내용은 아래와 같다.  

1. Physical(물리) 계층
    - 네트워크의 기본 네트워크 하드웨어 전송
    - raw Bit(0, 1) stream 제어를 위한 전기적 변환
1. Data Link(데이터 링크) 계층
    - 포인트 투 포인트(Point to Point, PPP) 데이터 전송을 제공
    - 데이터의 흐름제어, 오류 검출 및 정정
    - Medium access control(MAC) Layer, Logical link control(LLC) Layer 두 개의 서브 레이어로 구성
1. Network(네트워크) 계층
    - 노드에서 다른 네트워크로 패킷 전송을 위한 기능적, 절차적 수단 제공
    - 논리적 주소 관리 및 패킷 이동 경로 설정
    - 라우팅 프로토콜, 멀티캐스트 그룹 관리, 네트워크 계층 정보 및 오류 제어, 네트워크 계층 주소 할당 등 계층 관리 수행
1. Transport(전송) 계층
    - 호스트 간, 애플리케이션 간 가변 길이 데이터 시퀀스를 전송하는 기능적 및 절차적 수단 제공
    - 데이터의 분할 및 재결합 관리
    - 연결의 유효성 제어, 패킷들의 전송이 유효한지 확인하고 전송 실패한 패킷 재전송
    - 안정성은 전송 계층 내에서 엄격한 요구 사항이 아님[^2]
1. Session(세션) 계층
    - 로컬 및 원격 애플리케이션 간의 연결 설정, 관리 및 종료
    - PC 간 TCP/IP 세션 생성 및 종료 제어
1. Presentation(표현) 계층
    - 애플리케이션 계층에서 지정한 형식으로 데이터 포맷팅 및 데이터 변환[^3]
    - 데이터의 직렬화 및 역직렬화 수행
1. Application(응용) 계층
    - 일반적인 응용 프로세스 수행
    - 네트워크 소프트웨어 UI, 사용자의 입출력(I/O) 수행

[^2]: UDP와 같은 프로토콜은 패킷 손실, 재정렬, 오류 또는 중복을 허용할 의향이 있는 애플리케이션에서 사용  
[^3]: MIME 인코딩, 암호화, 압축 등  

## IP

인터넷 프로토콜 스위트(Internet Protocol Suite)는 네트워크에서 컴퓨터들이 통신하는데 쓰이는 통신규약(프로토콜)의 모음으로, 논리적인 개념 모델인 OSI 7 모델을 실제로 구현한 구현체들을 말한다.  

이 중 가장 많이 사용되는 프토토콜이 TCP(Transmission Control Protocol, 전송 제어 프로토콜)와 IP(Internet Protocol, 인터넷 프로토콜)이기 때문에 일반적으로 TCP/IP라고 부른다.  

TCP/IP는 OSI 7 계층과 아래와 같은 층위에서 연결된다.  

|  Num  | OSI 7 Layer  | TCP/IP Protocols                        |
| :---: | ------------ | --------------------------------------- |
|   7   | Application  | HTTP, HTTPS, FTP, SMTP                  |
|   6   | Presentation | MIME, SSL/TLS, XDR                      |
|   5   | Session      | Sockets                                 |
|   4   | Transport    | **TCP**, **UDP**, SCTP, QUIC, DCCP, RTP |
|   3   | Network      | **IP**, IPsec, ICMP, IGMP, OSPF, RIP    |
|   2   | Data Link    | PPP, SBTV, SLIP, Ethernet               |
|   1   | Physical     | -                                       |

각 계층의 주요 기능 및 장비는 아래와 같다.  

- Application, Presentation, Session
    - 응용 애플리케이션 수행
    - 로드 밸런서 및 웹방화벽
- Transport
    - 통신 노드 간의 연결 제어 및 데이터 송수신, 데이터 재전송 및 흐름제어
    - 로드 밸런서(Port 기반)
- Network
    - 통신 노드 간의 IP 패킷 전송 라우팅
    - 라우터, VPN, 방화벽
- Data Link(Network Access)
    - 네트워크 인터페이스, 물리적 식별
    - 스위치, 허브, 리피터, NIC

!!! note "TCP vs UDP"
    TCP(Transmission Control Protocol)는 [3-way handshake](./2024-07-25-web_client_server.md/#3-way-handshake)를 통해 데이터의 전달 여부와 순서를 보장한다는 특징이 있어 신뢰성이 높기 때문에 대부분 TCP를 사용한다.  

    반면 UDP(User Datagram Protocol)는 3-way handshake와 같은 기능이 없어 데이터 전달 및 순서가 보장되지 않지만 단순하고 속도가 빠르다는 장점이 있다.  

---
## Reference
- [Wikipedia - OSI model](https://en.wikipedia.org/wiki/OSI_model)
- [Wikipedia - Internet protocol suite](https://en.wikipedia.org/wiki/Internet_protocol_suite)
