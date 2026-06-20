---
slug: spring-initiate-event
title: Spring 서버 시작 이벤트 활용 방법
date:
    created: 2026-06-15
description: >
    Spring에서 서버가 시작될 때 자동 실행 되는 기능 만드는 방법
categories:
    - Spring
tags:
    - spring
    - spring-boot
---

Spring에서 서버가 시작될 때 자동 실행 되는 기능을 만드는 방법은 여러가지가 있는데 용도에 따라 구별해서 사용하면 된다.  

<!-- more -->

---

## 구현 방법

### CommandLineRunner

Spring 실행 시 입력되는 `String[] args` 파라미터를 `String... args`(배열 형태로 변하지 않게 받음)로 접근 가능하기 때문에 터미널 명령어로 인자를 받아 처리하는 간단한 배치/스크립트 성격의 작업에 적합하다.  

```java
@Component
public class CmdLineRunnerImpl implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // 예: java -jar app.jar active production 이라고 실행했다면
        // args[0] = "active", args[1] = "production"
        System.out.println("CommandLineRunner 실행! 첫 번째 인자: " + (args.length > 0 ? args[0] : "없음"));
    }
}
```

### ApplicationRunner

Spring 실행 시 입력되는 `String[] args` 파라미터를 `ApplicationArguments`(객체 형태로 파싱되어 받음) 객체로 접근 가능하기 때문에 (`--key=value`) 등 복잡한 인자 처리가 필요한 초기화 작업에 적합하다.  

```java
@Component
public class AppRunnerImpl implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 예: java -jar app.jar --version=1.0.0 my-value 이라고 실행했다면
        
        boolean hasVersion = args.containsOption("version"); // 옵션 존재 여부 확인 (-- 붙은 것)
        List<String> versionValues = args.getOptionValues("version"); // [1.0.0]
        List<String> nonOptionArgs = args.getNonOptionArgs(); // [my-value] (-- 안 붙은 것)

        System.out.println("ApplicationRunner 실행! 옵션 여부: " + hasVersion);
    }
}
```

### ContextRefreshedEvent

`ContextRefreshedEvent`는 Spring의 `ApplicationContext`(컨테이너)가 초기화되거나 리프레시 되는 이벤트를 확인한다.  

따라서 Spring MVC 구조에서 부모 컨텍스트(Root)와 자식 컨텍스트(Servlet)가 각각 존재할 경우, 이 이벤트가 2번 이상 발생할 수 있고 딱 한 번만 실행되게 하려면 아래와 같이 부모 컨텍스트인지 체크하는 로직이 필요하다.  

```java
@EventListener(ContextRefreshedEvent.class)
public void onApplicationEvent(ContextRefreshedEvent event) {
    // 루트 컨텍스트가 초기화될 때만 실행하도록 방어 코드 작성 필요
    if (event.getApplicationContext().getParent() == null) {
        // 실행할 로직
    }
}
```

### 💡ApplicationStartedEvent

`ApplicationStartedEvent`는 `ApplicationContext`가 리프레시를 마친 후, `CommandLineRunner`와 `ApplicationRunner`가 실행되기 전에 발생하는 이벤트를 확인한다. 컨텍스트 계층 구조와 상관없이 1번만 실행되어 별도의 방어 코드가 필요 없다.  

```java
@Component
public class MyStartedListener {

    @EventListener(ApplicationStartedEvent.class)
    public void onStarted() {
        // CommandLineRunner, ApplicationRunner 실행 전, 별도의 방어 코드 없이 딱 1번만 안전하게 실행됨
        System.out.println("ApplicationContext가 준비되었습니다. Runner 실행 전 초기화 작업을 시작합니다.");
    }
}
```

### 💡ApplicationReadyEvent

`ApplicationReadyEvent`는 애플리케이션이 구동을 마치고 완전히 준비(톰캣 등 내장 WAS 서버가 뜬 후)되는 이벤트를 확인한다. 컨텍스트 계층 구조와 상관없이 애플리케이션 구동 시 1번만 실행되므로 별도의 방어 코드가 필요 없다.  

!!! warning
    애플리케이션이 완전히 준비된 후 실행되어 서버는 이미 열려 있기 때문에 작업이 실행되는 동안에도 외부에서 HTTP 요청이 들어올 수 있다.  

```java
@Component
public class MyInitializer {

    @EventListener(ApplicationReadyEvent.class)
    public void initData() {
        // 별도의 방어 코드 없이 딱 1번만 안전하게 실행됨
        System.out.println("서버가 완전히 준비되었습니다. 초기화 작업을 시작합니다.");
    }
}
```

## 실행 순서

Spring의 구동 방식 때문에 `ContextRefreshedEvent` > `ApplicationStartedEvent` > `CommandLineRunner` / `ApplicationRunner` > `ApplicationReadyEvent`의 우선순위대로 실행되고, 동일한 우선순위에서는 `@Order` 값에 따라 실행 순서가 제어된다.  

!!! tip
    `ApplicationStartedEvent`와 `ApplicationReadyEvent`의 차이는 Runner 실행 여부이다. Runner가 수행하는 초기화 작업의 결과와 무관한 작업이라면 `ApplicationStartedEvent`에서, Runner의 작업 결과까지 필요하다면 `ApplicationReadyEvent`에서 처리하면 된다.  
