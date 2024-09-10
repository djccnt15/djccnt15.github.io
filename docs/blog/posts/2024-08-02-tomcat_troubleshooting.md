---
slug: tomcat-troubleshooting
title: 톰캣 트러블 슈팅 모음
date:
    created: 2024-08-02
description: >
    톰캣 트러블 슈팅 모음
categories:
    - Server Engineering
tags:
    - tomcat
    - troubleshooting
---

톰캣 트러블 슈팅 모음  

<!-- more -->

---

## ERR_CONNECTION_RESET

- 현상: Tomcat 매니저를 통해 배포 중 `ERR_CONNECTION_RESET` 오류 발생
- 원인: Tomcat 매니저를 통해 배포할 수 있는 WAR, JAR 파일의 용량을 초과할 경우 주로 발생
- 해결: `\webapps\manager\WEB-INF\web.xml` 파일에서 아래 설정값 수정

```xml title="web.xml"
<multipart-config>
    <!-- 50 MiB max -->
    <max-file-size>{YOUR_OWN_SIZE}</max-file-size>
    <max-request-size>{YOUR_OWN_SIZE}</max-request-size>
    <file-size-threshold>0</file-size-threshold>
</multipart-config>
```
