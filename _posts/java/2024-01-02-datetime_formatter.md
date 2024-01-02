---
published: true
layout: post
title: '[Java] 날짜/시간 데이터 다루기'
description: >
    DateTimeFormatter로 날짜 및 시간 데이터 다루기
categories: [Java]
tags: [java, datetime, java 17]
image:
    path: /assets/img/posts/thumbnail_openjdk.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## DateTimeFormatter

Java 17에서 문자열로 입력되는 Datetime 데이터를 파싱하려면, `DateTimeFormatter`를 사용하면 된다.  

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ParseDatetime {
    
    public static void main(String[] args) {
    
    String sampleDatetime = "2024-01-01T14:18:11.314750";
    
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
    
    LocalDateTime parsedDatetime = LocalDateTime.parse(sampleDatetime, formatter);
    
    System.out.println("parsed datetime: %s".formatted(parsedDatetime));
    }
}
```
```
parsed datetime: 2024-01-01T14:18:11.314750
```

날짜 및 시간 데이터 관련 포멧은 [공식 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/format/DateTimeFormatter.html)에 정리되어 있는데, 주로 사용하는 포멧은 아래와 같다.  

- `y`: 연도
- `M`: 숫자, 이름 형식 월
- `d`: 숫자 형식 일
- `H`: 24시간 형식의 시간
- `m`: 분
- `s`: 초
- `S`: microsecond
- `E`: 일 전체/축약 이름

---
## Reference
- [DateTimeFormatter](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/format/DateTimeFormatter.html)