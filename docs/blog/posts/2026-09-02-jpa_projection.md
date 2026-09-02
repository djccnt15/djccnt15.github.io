---
slug: jpa-projection
title: JPA의 projection
date:
    created: 9999-12-31
description: >
    JPA projection의 종류와 사용 시 주의점
categories:
    - Java
tags:
    - java
    - spring
    - jpa
---

JPA의 `projection`은 Interface-based Projection과 Class-based Projection 두 가지가 있다. 이 중 Interface-based Projection은 사용 방법이 여러가지가 있는데, 사용 방식에 따라 성능에 영향을 줄 수 있어 주의해야 한다.  

<!-- more -->

---

## 샘플 Entity

아래와 같은 간단한 Entity 클래스를 JPA로 쿼리를 하는 경우를 보자.  

```java
@Getter
@Setter
@Entity
@Table(name = "service_user")
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String name;
    
    @Column
    private String email;
    
    @OneToMany(mappedBy = "appUser")
    @Builder.Default @Setter(AccessLevel.NONE)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Set<OrderEntity> orders = new HashSet<>();
}
```

```java
@Getter
@Setter
@Entity
@Table(name = "orders")
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderEntity {
    
    @Id
    @GeneratedValue
    private Long id;
    
    @Column
    private LocalDate orderDate;
    
    @NotNull
    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private UserEntity appUser;
}
```

## Interface-based Projection

Interface-based Projection은 `interface` 객체를 만들어서 JPA의 리턴 타입으로 사용하는 것을 말한다.  

### Open Projection

projection `interface`의 getter에 `@Value`와 SpEL(Spring Expression Language) 표현식을 사용해서 값을 계산해 반환하는 것을 open projection이라고 한다. SpEL은 `target`으로 프록시가 감싸고 있는 원본 엔티티(또는 튜플)에 접근한다.  

!!! warning
    SpEL 표현식이 내부적으로 어떤 프로퍼티를 참조할지 JPA가 미리 알 수 없기 때문에, 대상을 전체 로드한 뒤 표현식을 평가한다. 즉 closed projection과 달리 필요한 컬럼만 `SELECT`하는 쿼리 최적화를 적용할 수 없다.  

```java
public interface OpenProjection {

    @Value("#{target.name + ' - ' + target.orderDate}")
    String getSummary();
}
```

```java
public interface UserRepo extends JpaRepository<UserEntity, Long> {

    @Query("""
        SELECT ...
        """)
    List<OpenProjection> findOrderByUser(@Param("name") String username);
}
```

!!! danger "안티패턴: projection interface가 엔티티 타입을 그대로 반환하는 경우"
    아래처럼 projection `interface`의 `getter`가 엔티티 타입을 그대로 반환하도록 만들 수도 있다.  

    ```java
    public interface EntityWrappingProjection {

        UserEntity getUser();

        OrderEntity getOrder();
    }
    ```

    이 경우 open/closed 여부와 무관하게, 반환되는 `UserEntity`/`OrderEntity`가 영속성 컨텍스트에 관리되는(managed) 상태로 로드된다. 결과적으로 필요한 컬럼만 조회하는 최적화 이점이 사라지고 엔티티 전체를 조회하는 것과 다를 바 없어지므로 지양해야 한다.  

### Closed Projection

아래와 같이 projection `interface`의 getter 메서드가 모두 대상 엔티티의 프로퍼티와 1:1로 매칭되고 SpEL 표현식을 사용하지 않는 경우를 closed projection이라고 한다. accessor가 참조하는 프로퍼티를 JPA가 사전에 전부 파악할 수 있기 때문에, 필요한 컬럼만 `SELECT`하여 비관리(non-managed) 상태로 값을 담아올 수 있다.  

!!! success
    closed projection은 영속성 컨텍스트에 캐싱을 하지 않고 필요한 컬럼만 조회하기 때문에 단순 조회에서는 더 좋은 성능을 보인다.  


```java
public interface ClosedProjection {
    
    Long getUserId();

    String getUsername();
    
    Long getOrderId();

    LocalDate getOrderDate();
}
```

```java
public interface UserRepo extends JpaRepository<UserEntity, Long> {

    @Query("""
        SELECT ...
        """)
    List<ClosedProjection> findOrderByUser(@Param("name") String username);
}
```

### Nested Projection

closed projection의 getter가 스칼라 타입이 아니라 다른 projection `interface`를 반환하도록 만들 수도 있다. 이를 nested projection이라고 한다.  

```java
public interface OrderSummary {

    String getUsername();

    OrderDetail getOrder();

    interface OrderDetail {

        Long getOrderId();

        LocalDate getOrderDate();
    }
}
```

메서드가 호출되는 시점에 대상 프로퍼티를 가져와서 다시 projection 프록시로 감싸는 방식으로 동작한다.  

!!! warning
    projection은 최상위(top-level) 프로퍼티에 대해서만 조회 범위를 제한할 수 있다. 연관관계(`@ManyToOne`, `@OneToMany` 등)로 인해 join이 발생하는 중첩 프로퍼티는, 중첩된 projection에 선언된 필드만 필요하더라도 해당 join의 엔티티 전체가 로드된다. 즉 closed projection이라도 nested 구간에서는 컬럼 단위 최적화가 보장되지 않는다.  

## Class-based Projection

Class-based Projection은 `interface` 대신 실제 클래스(DTO)를 JPA의 리턴 타입으로 사용하는 것을 말한다. 프록시 기반인 interface projection과 달리, 실제 인스턴스가 생성되어 반환된다.  

DTO는 `record`로 선언하는 것이 간단하다. 일반 클래스로 선언할 경우 생성자가 하나여야 하며, 생성자가 여러 개라면 사용할 생성자에 `@PersistenceCreator`를 붙여줘야 한다.  

```java
public record UserSummary(String username, LocalDate orderDate) {
}
```

```java
public interface UserRepo extends JpaRepository<UserEntity, Long> {

    @Query("""
        SELECT u.name, o.orderDate
        FROM OrderEntity o JOIN o.appUser u
        WHERE u.name = :name
        """)
    List<UserSummary> findOrderByUser(@Param("name") String username);
}
```

!!! info
    JPQL에 `new UserSummary(...)` 같은 생성자 표현식을 직접 쓰지 않아도, Spring Data가 `@Query`의 다중 컬럼 `SELECT` 결과를 리턴 타입(`UserSummary`)의 생성자에 맞춰 자동으로 rewrite해준다. 단, JPQL에 이미 생성자 표현식(`new ...`)이 존재하면 Spring Data는 별도로 rewrite를 시도하지 않고 그대로 사용한다.  

## Dynamic Projection

레포지토리 메서드를 제네릭으로 선언하고 `Class<T>` 파라미터를 받으면, 호출하는 쪽에서 실행 시점에 반환 타입을 선택할 수 있다. 쿼리 파생(derived query) 방식으로 선언해야 Spring Data가 요청받은 타입(`T`)에 맞춰 `SELECT` 절을 알아서 구성해준다.  

```java
public interface UserRepo extends JpaRepository<UserEntity, Long> {

    <T> List<T> findByName(String name, Class<T> type);
}
```

```java
List<UserEntity> entities = userRepo.findByName("Jay", UserEntity.class);
List<ClosedProjection> projections = userRepo.findByName("Jay", ClosedProjection.class);
```

!!! warning
    `Class<T>`의 제네릭 타입이 실제 쿼리의 리턴 타입과 일치하도록 매핑되기 때문에, 이 파라미터 자체를 쿼리문이나 SpEL 표현식 안에서 값으로 사용할 수는 없다. 파라미터를 쿼리 조건으로도 활용하고 싶다면 `Class<?>`로 선언해야 한다.  

---
## Reference
- [Projections - Spring Data JPA](https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html)
