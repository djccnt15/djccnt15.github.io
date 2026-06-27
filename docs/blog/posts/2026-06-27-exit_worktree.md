---
slug: exit-worktree
title: 클로드 코드에서 worktree 나가는 스킬
date:
    created: 2026-06-27
description: >
    클로드 코드 사용 중에 worktree에서 나가는 스킬
categories:
    - Claude
tags:
    - claude
    - agentic-engineering
    - skill.md
    - worktree
---

클로드 코드로 바이브 코딩을 하다보면 worktree로 작업 경로가 변경되는 경우가 있다. claude code는 현재 작업 경로를 worktree에서 프로젝트 root로 되돌려주는 공식 명령어를 제공하지 않기 때문에, 전역 스킬로 해당 작업을 처리해주는 스킬을 만들어서 사용하고 있다.  

<!-- more -->

---

## SKILL

OS 별로 클로드 코드의 전역 스킬이 저장되는 경로는 아래와 같다.  

- windows: `C:\Users\{사용자이름}\.claude\skills\{SKILL_NAME}\`
- linux: `~/.claude/skills/{SKILL_NAME}`

```markdown title="SKILL.md"
---
name: exit-worktree
description: 현재 작업 중인 Git worktree를 정리하고 안전하게 종료합니다.
---

# Exit Worktree

## Purpose

현재 활성화된 Git worktree 세션을 안전하게 종료하고 정리합니다.

## Instructions

1. 현재 작업 공간의 변경 사항(`git status`, `git diff`)을 먼저 점검해 주세요.
2. 커밋되지 않은 중요한 변경 사항이 있다면 사용자에게 커밋 혹은 스태시(stash) 여부를 먼저 물어보세요.
3. 정리가 완료되면 현재 worktree를 닫거나 제거하는 등 안전하게 종료 작업을 수행하세요.
```

??? note "위 스킬 없이 작업 경로 문제 해결하는 방법"
    간단하게 `/exit` 명령어로 클로드 코드를 종료했다가 다시 키면 된다. `/clear` 명령어는 단순히 대화 기록을 비우고 새로고침하는 명령어이기 때문에 `/clear` 명령어로는 해결할 수 없다.  
