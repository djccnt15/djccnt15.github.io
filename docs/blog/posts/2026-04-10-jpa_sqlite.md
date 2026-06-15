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

### Gradle 의존성 주입 및 property 설정

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

SQLite 연결을 위한 `application.yaml`의 JPA 설정은 아래와 같다.  

```yaml
spring:
  jpa:
    database-platform: org.hibernate.community.dialect.SQLiteDialect
  datasource:
    url: jdbc:sqlite:C:\projects\python312\assets\embedded.db
    driver-class-name: org.sqlite.JDBC
```

### `LocalDatetime` 매핑

SQLAlchemy는 Python `datetime`을 SQlite의 `DATETIME(TEXT)` 타입으로 매핑하는데, JPA는 Java `LocalDateTime`을 SQLite의 `TIMESTAMP(INTEGER)` 타입으로 매핑하기 때문에 데이터 매핑이 맞지 않아 별도 처리가 필요하다.  

#### property 설정 방식

아래와 같이 `spring.datasource.hikari.data-source-properties`에 `LocalDate`, `LocalDateTime`를 `DATETIME(TEXT)`로 매핑하도록 설정하는 방법이다.  

!!! tip
    코드를 수정하지 않고 `profile`로 쉽게 분리/조건부 적용이 가능한 `application.yaml`만 수정하면 되기 때문에 신규 프로젝트의 MVC 용도로 사용하기 좋은 방법이다.  

```yaml
spring:
  jpa:
    database-platform: org.hibernate.community.dialect.SQLiteDialect
  datasource:
    url: jdbc:sqlite:sample.db
    driver-class-name: org.sqlite.JDBC
    hikari.data-source-properties:
      date_class: "text"
      timestamp_string_format: "yyyy-MM-dd HH:mm:ss"
```

!!! note
    `timestamp_string_format: "yyyy-MM-dd HH:mm:ss"` 옵션 외에 `date_string_format: "yyyy-MM-dd"`, 도 있는데, 둘을 동시에 사용할 경우 `date_string_format`이 우선 적용되어 `timestamp_string_format` 옵션이 무시된다. `LocalDate` 만 사용할 경우 `date_string_format`을 사용해도 무방하지만 보통은 `LocalDateTime`을 같이 사용하기 때문에 사용할 일은 잘 없을 것 같다.  

####  `AttributeConverter` 방식

아래와 같이 `AttributeConverter`를 구현한 `@Converter`를 개발하여 사용하는 방법이다.  

!!! tip
    `AttributeConverter`를 직접 구현해서 사용하기 때문에 레거시 데이터가 있어 다양한 포멧으로 존재하는 경우를 모두 처리할 수 있어야 하는 경우에 유리하다.  

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

아래와 같이 JPA 엔티티 클래스의 `LocalDateTime` 필드에 `@Convert`를 지정해준다.  

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

!!! tip
    `@Converter(autoApply = true)`를 지정해주면 Field 마다 `@Convert`를 일일이 적용하지 않아도 된다.  

!!! note
    `ddl-auto: validate` 옵션을 `converter` 설정 없이 사용할 경우 아래와 같은 에러가 발생한다.  

    ```
    Schema-validation: wrong column type encountered in column [created_at] in table [user_account]; found [datetime (Types#VARCHAR)], but expecting [timestamp (Types#TIMESTAMP)]
    ```
