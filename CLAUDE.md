# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code(claude.ai/code)가 참고할 지침을 제공합니다.

## 프로젝트 개요

**MkDocs + Material for MkDocs**로 만든 한국어 개인 블로그/포트폴리오 사이트이며, GitHub Pages로 배포합니다. 애플리케이션 코드나 별도의 빌드 단계, 테스트 스위트는 없고, 저장소는 대부분 Markdown 콘텐츠와 MkDocs 설정으로 이루어져 있습니다.

## 명령어

```bash
pip install -r requirements.txt   # mkdocs, mkdocs-material, mkdocs-glightbox 설치
mkdocs serve                      # 로컬 개발 서버 실행 (http://127.0.0.1:8000)
mkdocs serve --no-livereload      # 자동 새로고침 비활성화
mkdocs serve --dirty              # 새로고침 시 변경된 페이지만 다시 빌드
mkdocs build                      # 정적 사이트를 ./site 에 빌드
```

배포는 자동으로 이루어집니다. `main`에 push하면 `.github/workflows/ci.yaml`이 `mkdocs gh-deploy --force`를 실행합니다. 수동 배포 단계나 lint/test 명령어는 없습니다.

## 저장소 구조

- `mkdocs.yml` — 사이트 중앙 설정: nav 구조, 테마, Markdown 확장, 플러그인, 그리고 (특히 중요한) `extra.tags`와 `theme.icon.tag` 매핑, `plugins.blog.categories_allowed`.
- `docs/blog/posts/` — 블로그 글 (글 하나당 Markdown 파일 하나).
- `docs/blog/posts/img/` — 블로그 글에서 참조하는 이미지.
- `docs/pages/` — 독립 페이지 (`about/`, `tags.md`, `favorites.md`).
- `docs/portfolio/` — 포트폴리오 프로젝트 페이지. 이미지는 `docs/portfolio/assets/`에 있습니다.
- `docs/assets/` — 사이트 전역 이미지/아이콘.
- `docs/javascripts/` — 추가 JS (KaTeX 수식 렌더링, 테이블 정렬, 단축키). `mkdocs.yml`의 `extra_javascript`로 연결됩니다.
- `overrides/main.html` — Material 테마 `base.html`의 Jinja 오버라이드 (사이트 인증용 meta 태그 추가).

## 블로그 글 작성 규칙

새 글은 템플릿인 `docs/blog/posts/9999-12-31-template.md`를 바탕으로 작성합니다. 파일명 형식은 `YYYY-MM-DD-slug_with_underscores.md`입니다.

Front matter 형식:

```yaml
---
slug: kebab-case-slug
title: 글 제목 (한국어)
date:
    created: YYYY-MM-DD
description: >
    한 줄 설명
categories:
    - SomeCategory
tags:
    - tag1
    - tag2
---
```

- `<!-- more -->` 앞의 도입 문단은 글 발췌문으로 사용됩니다 (`post_excerpt: required`).
- `categories` 값은 **반드시** `mkdocs.yml`의 `plugins.blog.categories_allowed`에 있어야 하며, 없으면 빌드가 실패합니다.
- `tags` 값은 `extra.tags`(mkdocs.yml)에서 정규화된 태그 아이콘 키로 매핑되고, 실제 아이콘은 `theme.icon.tag`에서 찾습니다. 새 태그에 아이콘을 표시하려면 두 곳 모두에 항목을 추가합니다 (없으면 기본 아이콘으로 표시됩니다).
- **초안**: `date.created`를 미래 날짜(보통 `9999-12-31`)로, `categories: [_Draft]`로 설정하고, 필요하면 `draft: true`도 추가합니다. 블로그 플러그인의 `draft_if_future_date: true` 설정 덕분에 미래 날짜의 글은 게시된 사이트에서 자동으로 숨겨집니다. `docs/blog/posts/`의 여러 `9999-12-*` 파일은 작성 중인 초안이므로 날짜가 잘못된 실제 글로 취급하면 안 됩니다.
- 글끼리는 상대 경로 Markdown 링크로 연결할 수 있습니다. 예: `[text](./2026-05-31-winpython.md)`.
- 수식은 `pymdownx.arithmatex` + KaTeX(`$...$` / `$$...$$`)로 지원합니다. 다이어그램은 Mermaid 펜스 코드 블록(```mermaid \n ... ```)을 사용합니다 (`pymdownx.superfences` 커스텀 펜스).

## 포트폴리오 항목 / nav 페이지 추가

새 최상위 페이지(포트폴리오 항목, About 페이지 등)는 `mkdocs.yml`의 `nav:` 섹션에 추가해야 사이트 내비게이션에 표시됩니다. `docs/portfolio/index.md`와 `docs/pages/favorites.md`는 Material "grid cards"(`<div class="grid cards" markdown>`)로 링크된 페이지를 나열하므로, 항목을 추가할 때 기존 카드 형식을 따릅니다.

## 커밋 메시지 스타일

이 저장소의 커밋은 짧고 설명적인 현재 시제 패턴을 따릅니다. 예:
- `create post about <topic>`
- `update <file> <what changed>`
- `rm post of <topic>`
- `update tag '<old>' to '<new>'`
