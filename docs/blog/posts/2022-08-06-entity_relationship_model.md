---
slug: entity-relationship-model
title: '[SQL] 02. 엔티티, 속성, 관계, 식별자'
date:
    created: 2022-08-06
description: >
    데이터 모델링의 이해: 엔티티, 속성, 관계, 식별자
categories:
    - Data Engineering
tags:
    - database
    - rdb
    - sqld
---

데이터 모델링의 이해: 엔티티, 속성, 관계, 식별자  

<!-- more -->

---

## 1. 엔티티

### 1-1. 엔티티의 개념

**엔티티(Entity)**란 관리해야 하는 데이터의 집합을 말한다.  

### 1-2. 엔티티의 특징

- 반드시 업무에서 필요하고 관리하고자 하는 정보여야 함
- 유일한 식별자를 가짐
- 둘 이상의 인스턴스의 집합임
- 업무 프로세스에 이용됨
- 속성을 가짐
- 관계를 가짐: 엔티티는 다른 엔티티와 최소 한 개 이상의 관계가 존재해야함

### 1-3. 엔티티의 종류

**유무형에 따른 분류**는 아래와 같다.  

- 유형 엔티티(Tangible Entity)
    - 물리적 형태가 있고 지속적으로 활용되는 엔티티
- 개념 엔티티(Conceptual Entity)
    - 물리적 형태가 없고, 관리해야 할 개념적 정보로 구분이 되는 엔티티
- 사건 엔티티(Event Entity)
    - 비즈니스 프로세스를 실행하면서 생성되는 엔티티

**발생 시점에 따른 분류**는 아래와 같다.  

- 기본/키 엔티티(Fundamental Entity, Key Entity)
    - 업무에 원래 존재하는 정보로서 다른 엔티티와 관계에 의해 생성되지 않고 독립적으로 생성이 가능하고 타 엔티티의 부모의 역할을 하는 엔티티
    - 다른 엔티티로부터 주식별자를 상속받지 않고 자신의 고유한 주식별자를 가지게 됨
- 중심 엔티티(Main Entity)
    - 기본 엔티티로부터 발생되고 그 업무에 있어서 중심적인 역할을 하는 엔티티
    - 기본 엔티티와 행위 엔티티의 중간에 존재. 다른 엔티티와의 관계를 통해 행위 엔티티를 생성
- 행위 엔티티(Active Entity)
    - 두 개 이상의 부모 엔티티로부터 발생. 자주 내용이 바뀌거나 데이터 양이 증가
    - 분석 초기 단계에서는 잘 나타나지 않으며 상세 설계 단계나 프로세스와 상관 모델링을 진행하면서 도출됨

### 1-4. 엔티티의 명명 원칙

- 현업 업무에서 사용하는 용어 사용 지향
- 약어 사용 지양
- 단수 명사 사용
- 모든 엔티티에 유일한 이름 부여
- 엔티티 생성 의미에 따른 이름 부여

## 2. 속성

### 2-1. 속성의 개념

데이터 모델링 관점에서의 **속성(Attribute)**은 인스턴스로 관리하고자 하는 더 이상 분리되지 않는 최소의 데이터 단위를 말한다. 속성의 정의를 정리하면 다음과 같다.  

- 업무에서 필요로 함
- 의미상 더 이상 분리되지 않음
- 엔티티를 설명하고 인스턴스의 구성요소가 됨

### 2-2. 엔티티, 인스턴스, 속성, 속성값의 관계

- 한 개의 엔티티는 두 개 이상의 인스턴스의 집합이어야 함
- 한 개의 엔티티는 두 개 이상의 속성을 가짐
- 한 개의 속성은 한 개의 속성값을 가짐

### 2-3. 속성의 특징

- 반드시 해당 업무에서 필요하고 관리하고자 하는 정보이어야 함
- 정규화 이론에 근간하여 정해진 주식별자에 함수적 종속성을 가져야 함
- 하나의 속성에는 한 개의 값만을 가짐. 하나의 속성에 여러 개의 값이 있는 다중값일 경우 별도의 엔티티를 이용하여 분리함

### 2-4. 속성의 분류

**특성에 따른 분류**는 아래와 같다.  

- 기본 속성(Basic Attribute)
    - 업무 분석을 통해 추출한 속성. 코드성 데이터, 엔티티를 식별하기 위해 부여된 일련번호, 그리고 다른 속성을 계산하거나 영향을 받아 생성된 속성을 제외한 모든 속성
- 설계 속성(Designed Attribute)
    - 업무상 존재하지는 않지만 설계를 하면서 도출해내는 속성. 데이터 모델링 및 업무 규칙화를 위해 속성을 새로 만들거나 변형하여 정의하는 속성
- 파생 속성(Derived Attribute)
    - 다른 속성으로부터 계산이나 변형이 되어 생성되는 속성

**엔티티 구성방식에 따른 분류**는 아래와 같다.  

- 기본키(Primary Key, PK) 속성
    - 엔티티를 식별할 수 있는 속성
- 외래키(Foreign Key, FK) 속성
    - 다른 엔티티와의 관계에서 포함된 속성
- 일반 속성
    - 엔티티에 포함되어 있고 PK, FK에 포함되지 않은 속성

**세부 의미에 따른 분류**는 아래와 같다.  

- 복합 속성(Composite Attribute)
    - 여러 세부 속성들로 구성되는 속성
- 단순 속성(Simple Attribute)
    - 다른 속성들로 구성될 수 없는 단순한 속성

**속성값의 개수에 따른 분류**는 아래와 같다.  

- 단일값 속성(Single-Valued Attribute)
- 다중값 속성(Multi-Valued Attribute): 정규화 또는 별도의 엔티티로 분리 필요

### 2-5. 도메인

각 속성이 가질 수 있는 값의 범위를 **도메인(Domain)**이라 한다. 각 속성은 도메인 이외의 값을 갖지 못한다.  

### 2-6. 속성의 명명 원칙

- 현업에서 사용하는 이름 부여
- 서술식의 속성명 지양
- 공용화 되지 않은 업무에서 사용하지 않는 약어 사용 지양
- 전체 데이터 모델에서의 유일성 확보

## 3. 관계

### 3-1. 관계의 개념

**관계(Relationship)**란 엔티티의 인스턴스 사이의 논리적인 연관성으로서 존재의 형태로서나 행위로서 서로에게 연관성이 부여된 상태를 말한다. 또한 엔티티 안의 인스턴스가 개별적으로 관계를 가지는 것을 **패어링(Paring)**이라 한다.  

관계 설정 시의 유의점은 아래와 같다.  

- 연관된 엔티티 간의 연관 규칙 존재 여부
- 연관된 엔티티 간의 정보의 조합 발생 여부
- 업무기술서, 장표에 관계 연결에 대한 규칙 서술 여부
- 업무기술서, 장표에 관계 연결을 가능하게 하는 동사의 존재 여부

### 3-2. 관계의 종류

- 존재에 의한 관계
    - UML에서는 실선의 연관관계(Association)로 표현
- 행위에 의한 관계
    - UML에서는 점선의 의존관계(Dependency)로 표현

### 3-3. 관계의 표기

- 관계명(Membership)
    - 관계의 이름. 엔티티가 관계에 참여하는 형태를 지칭
- 관계차수(Cardinality/Degree)
    - 1:1, 1:M, M:N과 같이 두 개의 엔티티 간 관계에서 참여자의 수를 표현
- 관계선택사양(Optionality)
    - 필수관계(Mandatory Membership): 참여하는 모든 참여자가 반드시 관계를 가지는, 타 엔티티의 참여자와 연결이 되어야 하는 관계
    - 선택관계(Optional Membership)

### 3-4. 관계 읽기

데이터 모델에서 관계를 읽는 순서 및 예시는 다음과 같다.  

- 각각의/하나의 → 기준 엔티티 → 관계차수 → 관련 엔티티 → 관계선택사양 → 관계명

| 각각의/하나의 | 기준 엔티티 | 관계차수 | 관련 엔티티 | 관계선택사양 | 관계명   |
| ------------- | ----------- | -------- | ----------- | ------------ | -------- |
| 각각의        | 사원은      | 한       | 부서에      | 때때로       | 속한다   |
| 한            | 부서에는    | 여러     | 사원이      | 항상         | 소속된다 |

## 4. 식별자

### 4-1. 식별자의 개념

**식별자(Identifiers)**는 엔티티에 포함된 여러 인스턴스들을 구분할 수 있는 구분자로, 하나의 엔티티에 구성되어 있는 여러 개의 속성 중에 엔티티를 대표할 수 있는 속성을 의미한다.  

!!! note
    하나의 엔티티는 반드시 하나의 유일한 식별자가 존재한다.  

!!! note "식별자와 키의 차이"
    식별자는 업무적으로 구분이 되는 정보로 논리 데이터 모델링 단계에서 사용되며, 키는 데이터베이스 테이블에 접근을 위한 매개체로서 물리 데이터 모델링 단계에서 사용된다.  

### 4-2. 식별자의 특징

- 유일성
    - 주식별자에 의해 엔티티 내에 모든 인스턴스들이 유일하게 구분되어야 함
- 최소성
    - 주식별자를 구성하는 속성의 수는 유일성을 만족하는 최소의 수가 되어야 함
- 불변성
    - 지정된 주식별자의 값은 자주 변하지 않는 것이어야 함
- 존재성
    - 주식별자로 지정이 되면 반드시 값이 존재해야 함

### 4-3. 식별자의 종류

- 대표성 여부
    - 주식별자(Primary Identifier), 보조식별자(Alternate Identifier)
- 자체 생성 여부
    - 내부식별자, 외부식별자(Foreign Identifier)
- 단일 속성으로 식별 여부
    - 단일식별자(Single Identifier), 복합식별자(Composit Identifier)
- 대체 여부
    - 본질식별자(원조식별자), 인조식별자(대리식별자)

### 4-4. 주식별자 도출 기준

- 해당 업무에서 자주 이용되는 속성을 주식별자로 지정
- 이름으로 기술되는 것들은 지양
- 복합식별자 지양

### 4-5. 식별자관계와 비식별자관계

엔티티 자기 자신이 필요한 속성이 아니라 다른 엔티티와의 관계를 통해 생성되는 속성을 **외부식별자(Foreign Identifier)**하며 데이터베이스 생성 시에 Foreign Key 역할을 한다.  

엔티티 간 관계를 연결하면 부모 엔티티의 주식별자를 자식 엔티티의 속성으로 내려 보낸다. 이 때 부모 엔티티로부터 받은 외부 식별자를 자신의 주식별자로 이용할 것인지 또는 부모와 연결이 되는 속성으로서만 이용할 것인지를 결정해야 한다.  

상속된 부모 엔티티의 주식별자가 자식 엔티티의 주식별자로 사용되는 경우를 **식별자 관계(Identifying Relationship)**라 하며, 상속받은 부모 엔티티의 주식별자를 일반적인 속성으로만 사용하는 경우를 **비식별자 관계(Non-Identifying Relationship)**라고 한다. 비식별자 관계는 아래 네 가지 경우에 형성된다.  

- 자식 엔티티가 상속 받은 부모 엔티티의 속성이 필수가 아니기 때문에 부모 엔티티 없는 자식 엔티티가 생성될 수 있는 경우
- 엔티티별로 데이터의 생명 주기(Life Cycle)를 다르게 관리할 경우
- 여러 개의 엔티티가 하나의 엔티티로 통합되어 표현되었는데 각각의 엔티티가 별도의 관계를 가질 때
- 상속 받은 부모 엔티티의 속성을 자식 엔티티에 주식별자로 사용하는 것 보다 별도의 주식별자를 생성하는 것이 더 유리하다고 판단될 경우

!!! note
    부모 엔티티와 자식 엔티티를 식별자 관계로만 설정할 경우 식별자 관계를 연결한 데이터 모델의 PK 속성의 수는 데이터 모델의 흐름이 길어질수록 증가하며, 반대로 비식별자 관계로만 설정할 경우 성능과 개발의 용이성이 저하되는 문제가 있다.  

---
## Reference
- [DATA ON-AIR - 엔터티](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=5&mod=document&uid=326)
- [DATA ON-AIR - 속성](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=5&mod=document&uid=327)
- [DATA ON-AIR - 관계](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=5&mod=document&uid=328)
- [DATA ON-AIR - 식별자](https://dataonair.or.kr/db-tech-reference/d-guide/sql/?pageid=5&mod=document&uid=329)
