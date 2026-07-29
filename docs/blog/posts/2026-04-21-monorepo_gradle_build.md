---
slug: monorepo-gradle-build
title: 모노레포의 Gradle 빌드 전략
date:
    created: 2026-04-21
description: >
    Spring과 React를 모노레포로 구성할 때 Gradle로 빌드를 쉽게 관리하는 방법
categories:
    - Java
tags:
    - gradle
    - vite
    - spring
    - react
---

Spring과 React를 모노레포로 구성할 때 Vite와 Gradle의 설정을 통해 빌드를 쉽게 관리할 수 있다.  

<!-- more -->

---

## Monorepo 구성

Gradle로 빌드를 통합 관리할 예정이기 때문에 Front-End의 소스코드가 Gradle 프로젝트의 하위 폴더에 위치해야 한다. 프로젝트의 구조를 아래와 같이 구성하면 된다.  

```sh
.
├─.gradle
├─build
├─frontend  # (1)!
├─gradle
└─src
    └─main
       ├─java
       │  └─com
       │      └─artifact
       └─resources
           ├─static
           └─templates
```

1. React 프로젝트의 위치

### Gradle + Vite 방식

Vite 빌드 결과 파일이 Spring 앱의 static 경로에 생성되도록 설정해준다.  

```typescript title="vite.config.ts"
export default defineConfig({
  // ...

  build: {
    outDir: '../src/main/resources/static',  // (1)!
    emptyOutDir: true,  // (2)!
  },

  // ...
})
```

1. Spring Boot 정적 리소스 경로
1. 빌드 시 기존 파일 삭제

Gradle로 빌드 수행 시 `processResources` 태스크[^1][^2] 시작 전에 frontend 경로에서 npm 빌드를 먼저 수행하도록 설정하자.  

[^1]: 소스 코드 이외의 resources를 빌드 결과물에 포함시키기 위해 준비하는 과정  
[^2]: 주로 `src/main/resources` 경로의 파일들을 `build/resources/main` 경로로 복사  

```javascript title="build.gradle"
task buildFrontend(type: Exec) {
    workingDir 'frontend'
    
    if (System.getProperty('os.name').toLowerCase().contains('windows')) {
        commandLine 'npm.cmd', 'run', 'build'
    } else {
        commandLine 'npm', 'run', 'build'
    }
}

processResources.dependsOn buildFrontend
```

### Gradle 단일 관리 방식

아래와 같이 설정하면 Vite 설정은 기본으로 유지하고 Gradle 설정만 변경해서 빌드를 통합할 수 있다.  

```javascript title="build.gradle"
task buildFrontend(type: Exec) {
    workingDir 'frontend'
    
    if (System.getProperty('os.name').toLowerCase().contains('windows')) {
        commandLine 'npm.cmd', 'run', 'build'
    } else {
        commandLine 'npm', 'run', 'build'
    }
}

task copyFrontendContents(type: Copy) {
    dependsOn buildFrontend
    from 'frontend/dist'  // (1)!
    into 'build/resources/main/static'  // (2)!
}

processResources.dependsOn copyFrontendContents
```

1. Vite의 빌드 결과물 기본 경로
1. SpringBoot 정적 자원 경로

## npm 패키지 연결

위 방식으로 Monorepo를 구성하면 `worktree`를 사용해서 작업용 코드를 생성 할 때 npm 패키지가 복사되지 않아 `worktree` 단독으로는 정상적으로 실행 및 통합 테스트가 불가능하다. Windows의 경우 아래와 같이 `junction`을 만들어서 해결 가능하다.  

### cmd

- `junction` 생성

```bat
mklink /J "<worktree>\frontend\node_modules" "D:\projects\<main>\frontend\node_modules"
```

```bat
if not exist "<worktree>\frontend\node_modules" mklink /J "<worktree>\frontend\node_modules" "D:\projects\<main>\frontend\node_modules"
```

- `junction` 확인

```bat
dir "<worktree>\frontend"
```

- `junction` 삭제

```bat
rmdir "<worktree>\frontend\node_modules"
```


### PowerShell

- `junction` 생성

```powershell
$worktree = "<worktree 경로>"
$mainRepo = "D:\projects\<main 경로>"
if (-not (Test-Path "$worktree\frontend\node_modules")) {
  New-Item -ItemType Junction -Path "$worktree\frontend\node_modules" -Target "$mainRepo\frontend\node_modules" | Out-Null
}
```

- `junction` 확인

```powershell
Get-Item "$worktree\frontend\node_modules" | Select-Object LinkType, Target
```

- `junction` 삭제

```powershell
cmd /c rmdir "$worktree\frontend\node_modules"
cd "$worktree\frontend"; npm install
```
