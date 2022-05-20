---
published: true
layout: post

title: 웹사이트 모니터링 프로젝트 01
description: >
  프로젝트의 목적과 기초 구상
hide_description: false
image: 
  path: /assets/img/posts/github_pages.png
# related_posts:
#   - _posts/blog/2017-11-23-example-content-ii.md
#   - /example/2012-02-07-example-content/

categories:
  - programming
tags:
  - web scraping
---

* toc
{:toc}

회사를 다니다보면, 관련 정부기관의 지원사업의 공고문이라든가 기술 동향 보고서가 업로드 되었는지 주기적으로 확인해야 하는 업무들이 있다.  

솔직히 매우 귀찮은 일인데 안 할 수는 없고.. 그래서 이 업무를 자동으로 처리해주는 웹 스크래핑 프로그램을 하나 만들어보려고 한다.  

## 프로젝트의 기초 구상
1. 각 대상 사이트 자료를 긁어와서 보기 좋게 만들어주는 웹 스크래퍼 개발
  - 1회/1일 스크랩 및 신규 게시물 있을 경우 해당 내용 출력
  - 오류 방지를 위해 전일 데이터를 로그로 저장하여 차이 있는지 확인
  - 주 1회 요약 보고서 출력
2. 웹 스크래퍼가 출력하는 보고서를 메일로 발송하는 메일링 프로그램 개발
  - 메일링 리스트 관리의 편리성을 위해 google drive에서 메일링 목록 관리
3. google drive에 log 업로드하는 모듈 개발
4. 서버에서 작동시켜야 하니 하나로 묶어줄 container에 탑재하여 docker에서 구동 확인
5. docker에서 구동 확인 후 AWE나 MS Azure같은 클라우드 서버에 올려서 구동
6. 고려중인 대안: AWS lambda 사용을 통해 손쉽게 구동 및 요금절약

---

업무 효율이 상승하는 효과도 있겠지만, docker라든가 클라우드 컴퓨팅의 실사용에 대한 공부를 여러모로 하게 될 것 같아 기대된다.