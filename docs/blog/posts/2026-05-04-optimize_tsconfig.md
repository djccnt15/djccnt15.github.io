---
slug: optimizing-tsconfig
title: `tsconfig.json` 최적화하기
date:
    created: 2026-05-04
description: >
    `tsconfig.json` 최적화를 통해 VSCode의 속도를 높혀보자
categories:
    - SW Engineering
tags:
    - vscode
---

node.js로 개발을 하다보면 IntelliSense 로딩이 끝나지 않는 경우가 있다. `tsconfig.json` 최적화를 통해 VSCode의 속도를 높혀보자

<!-- more -->

---

## `tsconfig.json`

IntelliSense 로딩이 끝나지 않는 원인은 대부분 대형 외부 라이브러리가 문제인 경우가 많다. 내 경우엔 [MUI](https://mui.com/), [MUI X](https://mui.com/x/)를 사용하고 있는데, [MUI X Data Grid](https://mui.com/x/react-data-grid/)를 본격적으로 사용하기 시작하면서 IntelliSense 로딩이 끝나지 않는 현상이 발생했다.  

아래와 같이 `"skipLibCheck": true` 옵션을 통해 외부 라이브러리 검사를 제외하면 IntelliSense 로딩이 정상적으로 종료된다.  

```json
{
  // ... 기존 설정
  "compilerOptions": {
    "skipLibCheck": true // (1)!
  },
  "exclude": ["node_modules", "dist", "build", "**/*.spec.ts"]
}
```

1. 외부 라이브러리의 타입 체크 skip

!!! warning
    다만, 라이브러리 업데이트 직후나 배포 전에는 가끔씩 `"skipLibCheck": false`로 변경해 전체적인 타입 무결성을 한 번씩 점검해보는 프로세스를 갖추는 것이 안전하다고 한다.  
