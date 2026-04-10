---
slug: jpa-sqlite
title: JPA로 SQLite 다루기
date:
    created: 2026-04-10
description: >
    SQLite DB를 JPA로 다루는 방법
categories:
    - Data Engineering
tags:
    - java
    - python
    - sqlite
    - orm
    - jpa
    - sqlalchemy
---

Python 프로그램의 Embedded DB로 많이 사용되는 SQLite를 Spring 앱에서 JPA로 다루는 방법과 주의점

<!-- more -->

---

## 1. SQLite DB 및 테이블

!!! info
    Python으로 SQLite DB를 생성하고 관리하는 방법은 [SQLAlchemy, Alembic 기초 활용법](./2024-05-05-sqlalchemy_alembic.md) 문서, [SQLAlchemy로 Python에서 ORM 사용하기](./2024-05-12-sqlalchemy_orm.md)문서를 참고하자.  

Python으로 관리되는 샘플 테이블 엔티티 클래스는 아래와 같다.  

```python
from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class UserEntity(Base):
    __tablename__ = "user_account"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[str | None] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime)
```

`alembic.ini`에 작성한 SQLite DB의 주소는 아래와 같다. Embedded DB이기 때문에 프로그램 내부에 DB를 생성한다.  

```ini
sqlalchemy.url = sqlite:///./assets/embedded.db
```

## 2. JPA로 SQLite DB 연결

SQLite를 사용하기 위한 패키지들의 Gradle 의존성 주입은 아래와 같다.  

```gradle
dependencies {
    ...

    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.xerial:sqlite-jdbc'
    implementation 'org.hibernate.orm:hibernate-community-dialects'

    ...
}
```

Spring 애플리케이션 설정을 위한 `application.yaml`에 SQLite 연결을 위해 작성할 JPA 설정은 아래와 같다.  

```yaml
spring:
  jpa:
    database-platform: org.hibernate.community.dialect.SQLiteDialect
    hibernate:
      ddl-auto: validate
  datasource:
    url: jdbc:sqlite:C:\projects\python312\assets\embedded.db
    driver-class-name: org.sqlite.JDBC
```

Spring 애플리케이션에서 동일한 테이블에 접근하기 위한 JPA 엔티티 클래스는 아래와 같다.  

```java
@Data
@Entity
@Table(name = "user_account")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "fullname")
    private String fullName;
    
    @Column(name = "created_at")
    @CreationTimestamp
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime createdAt;
}
```

```java
@Converter
public class LocalDateTimeConverter implements AttributeConverter<LocalDateTime, String> {
    
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    @Override
    public String convertToDatabaseColumn(LocalDateTime localDateTime) {
        return (localDateTime == null) ? null : localDateTime.format(FORMATTER);
    }
    
    @Override
    public LocalDateTime convertToEntityAttribute(String dbData) {
        return (dbData == null || dbData.isEmpty()) ? null : LocalDateTime.parse(dbData, FORMATTER);
    }
}
```

!!! tip
    SQLAlchemy는 `Datetime`을 SQlite의 `DATETIME` 타입으로 매핑하는데, JPA는 `LocalDatetime`을 SQLite의 `TIMESTAMP` 타입으로 매핑하기 때문에 `AttributeConverter`를 통해서 데이터가 적절하게 변환되도록 설정해줘야 한다.  

!!! note
    위와 동일한 이유로 `ddl-auto: validate` 옵션을 `converter` 설정 없이 사용할 경우 아래와 같은 에러가 발생한다.  

    ```
    Schema-validation: wrong column type encountered in column [created_at] in table [user_account]; found [datetime (Types#VARCHAR)], but expecting [timestamp (Types#TIMESTAMP)]
    ```
