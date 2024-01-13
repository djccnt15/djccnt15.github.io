---
status: deprecated
slug: basic-tutorial-for-jekyll
title: Jekyll 기초 사용법
date:
    created: 2022-01-02
description: >
    Jekyll로 마크다운 기반 블로그 구축하는 방법 기초 입문
categories:
    - Jekyll
tags:
    - Jekyll
---

Jekyll로 마크다운 기반 블로그 구축하는 방법 기초 입문  

<!-- more -->

---

## 1. 설치

GitHub Pages는 정적 웹 사이트를 생성할 수 있는 웹 프레임워크라면 아무거나 활용 가능하지만, Jekyll의 추천이 많고 테마가 많아 Jekyll을 이용해서 쉽고 빠르게 만들어보기로 했다.  

### 1-1. Ruby 설치

[Jekyll](https://jekyllrb.com/)은 [Ruby](https://www.ruby-lang.org/en/)의 웹 프레임워크이므로, Ruby를 먼저 설치해야 한다. Windows를 사용한다면 [RubyInstaller](https://rubyinstaller.org/downloads/)를 사용해서 Ruby를 설치할 수 있다.  

Ruby 설치 여부는 아래와 같이 확인할 수 있다.

```bat
ruby -v
```
```
ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [x64-mingw-ucrt]
```

### 1-2. Jekyll 설치

Ruby의 패키지 관리 프로그램인 gem을 통해 아래와 같이 Jekyll과 Bundler를 설치할 수 있다.  

```bat
gem install jekyll bundler
```

### 1-3. bundle 설치

위에서 설치한 [Bundler](https://bundler.io/)는 gem을 통해 관리하는 Ruby의 라이브러리들을 실질적으로 관리해주는 프로그램으로, 프로그램에서 사용할 라이브러리들의 목록을 `Gemfile`로 저장해두면 이를 바탕으로 `Gemfile.lock` 파일을 생성해준다. 기존 테마를 사용한다면 `Gemfile`이 이미 존재할 것이다.  

아래와 같은 명령어로 bundle을 설치하고 업데이트하면 된다.  

```bat
bundle install
```

```bat
bundle update
```

## 2. local 호스팅

GitHub pages는 업로드도 귀찮고, 업로드 후 반영되는데 시간이 은근히 걸리기 때문에, local에서 확인하고 검토한 다음에 최종본을 업로드하는게 편하다.  

local에 설치된 Jekyll을 작동시켜서 local 호스팅을 구동하는 명령어는 다음과 같다.  

```bat
bundle exec jekyll serve
```

`--livereload`옵션을 사용하면 파일이 수정되었을 때 자동으로 새로고침 해준다.  

```bat
bundle exec jekyll serve --livereload
```

미래 날짜로 작성한 포스트를 local에서 확인하려면 아래와 같이 `--future`를 붙여야 한다.  

```bat
bundle exec jekyll serve --future
```

!!! info
    GitHub Pages를 사용한다면 저장소로 push 한 시점에만 빌드와 배포가 이루어지기 때문에, 미래 날짜의 문서는 출력이 되지 않고 해당 날짜가 도래해도 자동으로 출력되게 바뀐하거나 하지는 않는다.  

local 호스팅은 [http://127.0.0.1:4000](http://127.0.0.1:4000) 또는 [http://localhost:4000](http://localhost:4000)에서 확인할 수 있다.  

기본 포트가 `4000`으로 잡혀있기 때문에 웹페이지를 동시에 여러 프로젝트를 구동하려면 두 번째부터는 포트를 별도로 설정해줘야 한다. 포트를 설정하는 방법은 아래와 같다.  

```bat
bundle exec jekyll serve --port [port_num]
```

그림 사이즈를 모바일에서 미리 확인하는 등 다른 디바이스의 브라우저로 테스트 컴퓨터의 호스팅에 접속하고 싶을 경우가 있는데, 그럴 때는 아래와 같이 서버의 IP 주소를 지정해서 구동하면 된다.  

```bat
bundle exec jekyll serve --host 192.168.0.5
```

서버의 주소로 지정할 테스트 컴퓨터의 IP는 `ipconfig`/`ifconfig` 명령어로 확인할 수 있다. 위의 경우에는 `IPv4`주소인 `192.168.0.5`으로 호스팅 했기 때문에, [http://192.168.0.5:4000](http://192.168.0.5:4000)으로 접속해야 내용을 확인할 수 있다.  

!!! note
    `https://192.168.0.5:4000`가 아니고 `http://192.168.0.5:4000`이다.  

`--incremental` 옵션을 사용하면 새롭게 갱신된 문서와 페이지만 재생성하여 빌드 시간을 줄여준다. 다만 [Jekyll 공식 문서](https://jekyllrb-ko.github.io/docs/configuration/incremental-regeneration/)를 참고하면 이 기능은 문서나 페이지 혹은 그 의존관계가 변경되었을 때만 파일을 다시 생성하는데, 특정 의존 관계만 감지할 수 있다는 점이 문제가 될 수 있다고 한다.  

```bat
bundle exec jekyll serve --incremental
```

`--profile` 옵션을 사용하면 사이트 생성 과정에서 각 페이지의 조회 횟수, 용량, 소요 시간이 얼마나 되는지를 보여준다. 서버 최적화가 필요할 때 사용하는 옵션이다.  

```
bundle exec jekyll serve --profile
```

### 2-1. ⚡작업할 때

개인적으로 나는 작업할 때 Jekyll을 아래와 같이 `--future`, `--drafts`, `--unpublished` 옵션들을 주로 사용한다.  

- 업로드 결과와 동일하게 빌드할 때

```bat
# localhost only
bundle exec jekyll serve --livereload --future

# hosting with specific IP
bundle exec jekyll serve --livereload --future --host [IP_address]
```

- 모든 글을 빌드할 때

```bat
# localhost only
bundle exec jekyll serve --livereload --future --drafts --unpublished

# hosting with specific IP
bundle exec jekyll serve --livereload --future --drafts --unpublished --host [IP_address]
```

## 3. YFM 정의 및 활용

`YFM(YAML Front Matter)`은 markdown 파일의 최상단에 위치하며 3개의 하이픈으로 시작과 끝을 표시한다. `YAML`은 일종의 구조화된 데이터 형식으로 프로그래밍에서 변수를 설정하듯이 사용할 수 있다. `YFM`을 사용해서 글의 제목, 카테고리, 태그 등을 정의할 수 있다.  

이를 이용해서 정의된 `YFM`을 이중 괄호 구문을 사용해서 아래와 같이 사이트 정보가 바뀔 때 내용이 변경내용을 자동으로 반영하도록 작성할 수 있다.  

```
이 글의 제목은 {{ page.title }}이고,
카테고리는 {{ page.categories }}이다.
블로그 타이틀은 {{ site.title }}이고, 저자는 {{ site.author.name }}이다.
```

```
이 글의 제목은 {{ page.title }}이고,
카테고리는 {{ page.categories }}이다.
블로그 타이틀은 {{ site.title }}이고, 저자는 {{ site.author.name }}이다.
```

## 4. 비밀글 작성

### 4-1. YFM으로 비밀글 태그

`YFM`에서 `published: false`로 정의하면 된다. 비밀글로 정의된 글을 local에서 미리 확인하고 싶을 때는, 아래와 같이 `--unpublished`를 붙여서 jekyll을 구동하면 된다.  

```bat
bundle exec jekyll serve --unpublished
```

~~repository에 md 파일이 다 보일텐데 무슨 소용인지 싶긴한데.. 아무튼 가능하긴하다~~  
[devinlife님의 블로그](https://devinlife.com/)를 보면서 질문하다 알게 되었는데, GitHub Pro를 사용하면 GitHub Pages의 repo를 비공개 설정 할 수 있다고 한다.  

### 4-2. _drafts 폴더에 작성하기

`/_drafts` 폴더는 GitHub Pages가 외부로 배포하지 않도록 설정되어 있다. local에서 내용을 확인하고 싶다면 Jekyll에 `--drafts`를 붙여서 구동해야 한다.  

```bat
bundle exec jekyll serve --drafts
```

## 5. include 태그

아래와 같이 `include` 태그를 사용해서 다른 파일의 내용을 포함시킬 수 있다.  

```liquid
{% include [source] %}
```

기본적으로는 `_includes` 디렉토리에서 파일을 가져오지만, `{% include_relative [source] %}` 태그를 이용해서 상대참조도 가능하다.  

---
## Reference
- [Jekyll](https://jekyllrb.com/)
- [devinlife](https://devinlife.com/)님의 [하우투: 같이 따라하기 시리즈](https://devinlife.com/howto/)