---
slug: annotation
title: Java의 annotation 정리
date:
    created: 2025-04-27
description: >
    Java의 `annotation` 문법 정리
categories:
    - Java
tags:
    - java
    - annotation
---

Java 코드를 짤 때 `annotation`을 사용하면 클래스와 메서드에 메타 데이터를 추가해서 다양한 용도로 활용할 수 있다.  

<!-- more -->

---

## 기초 문법

1. `@interface` 키워드를 사용해서 생성
1. 애너테이션이 가질 수 있는 필드의 종류
    1. Java가 기본으로 제공하는 원시 자료형(`int`, `float` 등) 및 `String`
    1. `enum` 클래스
    1. 다른 애너테이션 및 사용자 클래스의 메타 데이터
    1. 위 타입들의 배열
1. 요소는 파라미터가 없는 메서드 형태로 지정[^1]하며, `default` 값 지정 가능[^2]
1. 예외를 선언할 수 없음
1. 필드로 `value` 라는 이름의 필드 하나만 존재할 경우 애너테이션 사용 시 요소 이름 생략 가능

[^1]: `void`를 반환할 수 없다.  
[^2]: 일반적으로는 항상 지정해준다. `default` 값이 있는 경우 애너테이션 사용 시 해당 필드 생략 가능  

```java
public @interface MyAnnotation {
    int count() default 0;
    String value() default "";
    String[] tags() default {};
    MyEnum myEnum() default MyEnum.VALUE;
    Class<? extends OtherAnnotation> anno() default OtherAnnotation.class;
    Class<? extends MyClass> myField() default MyClass.class;
}
```

## 메타 애너테이션

메타 애너테이션은 애너테이션을 정의하는데 사용하는 애너테이션으로 아래 두 종류가 있다.  

- `@Retention`: 애너테이션의 생존 기간 정의
    - `RetentionPolicy.SOURCE`: 소스 코드에서만 사용되며, 컴파일 시점에서 삭제
    - `RetentionPolicy.CLASS`: `class` 파일에서까지 사용되며, 실행 시점에서 삭제(기본값)
    - `RetentionPolicy.RUNTIME`: 실행 시점에서까지 사용, 대부분 이 설정을 사용
- `@Target`: 애너테이션의 사용 위치, 아래 세 종류가 주로 사용됨
    - `ElementType.TYPE`: 클래스 선언에 사용 가능
    - `ElementType.FIELD`: 필드에 사용 가능
    - `ElementType.METHOD`: 메서드에 사용 가능
- `@Documented`: Java API 문서를 만들 때 해당 애너테이션이 포함되도록 지정[^3]
- `@Inherited`: 자식 클래스가 부모 클래스의 애너테이션을 상속 받을 수 있도록 지정

[^3]:
    Spring의 컴포넌트들을 보면 아래와 같이 `@Documented`가 지정되어 있는 것을 볼 수 있다.  

    ```java
    @Target({ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @Indexed
    public @interface Component {
        String value() default "";
    }
    ```

## 활용 예시

- 스프링 프로젝트에서 컴포넌트의 용도를 구분하기 위한 애너테이션

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Service
public @interface Business {
    
    @AliasFor(annotation = Service.class)
    String value() default "";
}
```

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Service
public @interface Converter {
    
    @AliasFor(annotation = Service.class)
    String value() default "";
}
```

- DTO에서 필드의 메타 데이터를 추가하기 위한 애너테이션

```java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface TableHeader {
    
    String value() default "";
}
```
