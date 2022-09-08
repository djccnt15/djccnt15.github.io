---
published: true
layout: post
title: '[웹사이트 모니터링] 01'
description: >
    프로젝트의 목적과 기초 구상
categories: [Programming]
tags: [web scraping]
image:
    path: /assets/img/posts/github_pages.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## 목적

회사를 다니다보면, 관련 정부기관의 지원사업의 공고문이라든가 기술 동향 보고서가 업로드 되었는지 주기적으로 확인해야 하는 업무들이 있다.  

솔직히 매우 귀찮은 일인데 안 할 수는 없고.. 그래서 이 업무를 자동으로 처리해주는 웹 스크래핑 프로그램을 하나 만들어보려고 한다.  

## 기초 구상

0. 각 대상 사이트 자료를 긁어와서 보기 좋게 만들어주는 웹 스크래퍼 개발
    - 1회/1일 스크랩 및 신규 게시물 있을 경우 해당 내용 출력
    - 오류 방지를 위해 전일 데이터를 로그로 저장하여 차이 있는지 확인
    - 주 1회 요약 보고서 출력
0. 웹 스크래퍼가 출력하는 보고서를 메일로 발송하는 메일링 프로그램 개발
    - 메일링 리스트 관리의 편리성을 위해 google drive에서 메일링 목록 관리
0. google drive에 log 업로드하는 모듈 개발
0. 서버에서 작동시켜야 하니 하나로 묶어줄 container에 탑재하여 docker에서 구동 확인
0. docker에서 구동 확인 후 AWE나 MS Azure같은 클라우드 서버에 올려서 구동
0. 고려중인 대안: AWS lambda 사용을 통해 손쉽게 구동 및 요금절약