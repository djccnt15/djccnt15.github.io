---
published: true
layout: post

title: '[블로그] Github Pages 사용법'
description: >
    Jekyll 기반 Github Pages의 각종 사용법
hide_description: false
image:
    path: /assets/img/posts/github_pages.png
related_posts:
    - _posts/blog/2022-01-04-blog_markdown.md

categories:
    - Blog
tags:
    - ⭐starred
    - blog
    - jekyll
---
* toc
{:toc}

## 1. 포스트 작성은 markdown으로

엄밀히 말하면 Github Pages를 통해 배포되기 때문에, `GitHub Flavored Markdown(GFM)`이라는 별도의 markdown을 사용한다. `GFM`에 대한 자세한 설명은 [여기](https://github.github.com/gfm/)로  

- [이 블로그에서 사용된 마크다운 활용법들 보러가기](/Blog/blog_markdown/)

<sub>markdown 기반의 블로그를 만들면서 조금 귀찮아진 부분인데, 나는 기본적으로 vscode의 `Trim Trailing Whitespace` 기능을 켜고 사용한다. 그런데 이 옵션을 킨 상태로 저장하면 vscode가 자동으로 문장 끝의 whitespace를 삭제해서 줄바꿈을 망가뜨리기 때문에 앞으로는 해당 기능을 user 단위가 아니라 workspace 단위로 켜줘야 한다. 기본적으로 켜고 특정 workspace에서만 끄는게 안 되기 때문에.. 반대는 가능하지만</sub>

## 2. YFM 정의 및 활용

YFM(YAML Front Matter)은 markdown 파일의 최상단에 위치하며 3개의 하이픈으로 시작과 끝을 표시한다.  

YAML은 일종의 구조화된 데이터 형식으로, 프로그래밍에서 변수를 설정하듯이 사용할 수 있다.  
YFM을 사용해서 글의 제목, 카테고리, 태그 등을 정의할 수 있다.  

이를 이용해서 정의된 YFM을 이중 괄호 구문을 사용해서 아래와 같이 사이트 정보가 바뀔 때 내용이 변경내용을 자동으로 반영하도록 작성할 수 있다.  

```{% raw %}
이 글의 제목은 {{ page.title }}이고,
카테고리는 {{ page.categories }}이다.
블로그 타이틀은 {{ site.title }}이고, 저자는 {{ site.author.name }}이다.
{% endraw %}```

```
이 글의 제목은 {{ page.title }}이고,
카테고리는 {{ page.categories }}이다.
블로그 타이틀은 {{ site.title }}이고, 저자는 {{ site.author.name }}이다.
```

## 3. 비밀글 작성

### 3-1. YFM으로 비밀글 태그

YFM에서 `published: false`로 정의하면 된다.  
비밀글로 정의된 글을 local에서 미리 확인하고 싶을 때는, 아래와 같이 `--unpublished`를 붙여서 jekyll을 구동하면 된다.  

```powershell
> bundle exec jekyll serve --unpublished
```

~~repository에 md 파일이 다 보일텐데 무슨 소용인지 싶긴한데.. 아무튼 가능하긴하다~~  
[devinlife님의 블로그](https://devinlife.com/)를 보면서 질문하다 알게 되었는데, Github Pro를 사용하면 Github Pages의 repo를 비공개 설정 할 수 있다고 한다.  

### 3-2. _drafts 폴더에 작성하기

`/_drafts` 폴더는 Github Pages가 외부로 배포하지 않도록 설정되어 있다. local에서 내용을 확인하고 싶다면 Jekyll에 `--drafts`를 붙여서 구동해야 한다.  

```powershell
> bundle exec jekyll serve --drafts
```

## 4. local에서 빌드 결과 확인

github pages는 업로드도 귀찮고, 업로드 후 반영되는데 시간이 은근히 걸리기 때문에, local에서 확인하고 검토한 다음에 최종본을 업로드하는게 편하다.  

local에 설치된 Jekyll을 작동시켜서 local 호스팅을 구동하는 명령어는 다음과 같다.  

```powershell
> bundle exec jekyll serve
```

`--livereload`옵션을 사용하면 파일이 수정되었을 때 자동으로 새로고침 해준다.  

```powershell
> bundle exec jekyll serve --livereload
```

미래 날짜로 작성한 포스트를 local에서 확인하려면 아래와 같이 `--future`를 붙여야 한다.  
직접 확인해보지는 않았지만 Github Pages에서는 미래 날짜로 업로드해도 정상적으로 출력된다고 한다.  

```powershell
> bundle exec jekyll serve --future
```

local 호스팅은 `http:127.0.0.1:4000` 또는 `http:localhost:4000`에서 확인할 수 있다.  

그림 사이즈를 모바일에서 미리 확인하는 등 다른 디바이스의 브라우저로 테스트 컴퓨터의 호스팅에 접속하고 싶을 경우가 있는데, 그럴 때는 아래와 같이 서버의 주소를 지정해서 구동하면 된다.  

```powershell
> bundle exec jekyll serve -H 192.168.0.5
```

서버의 주소로 지정할 테스트 컴퓨터의 IP는 `ipconfig/ifconfig` 명령어로 확인할 수 있다. 위의 경우에는 `IPv4`주소인 `192.168.0.5`으로 호스팅 했기 때문에, `http:192.168.0.5:4000`으로 접속해야 내용을 확인할 수 있다.  

❗ **주의** `https:192.168.0.5:4000`가 아니고 `http:192.168.0.5:4000`이다.  
{:.note title='attention'}

`--incremental` 옵션을 사용하면 마지막으로 빌드한 시점 이후에 갱신된 문서와 페이지만 재생성하여 빌드 시간을 줄여준다. 다만 [Jekyll 공식 문서](https://jekyllrb-ko.github.io/docs/configuration/incremental-regeneration/)를 참고하면 이 기능은 문서나 페이지 혹은 그 의존관계가 변경되었을 때만 파일을 다시 생성하는데, 특정 의존 관계만 감지할 수 있다는 점이 문제가 될 수 있다고 한다.  

```powershell
> bundle exec jekyll serve --incremental
```

### 4-1. ⚡ 작업할 때

개인적으로 나는 작업할 때 Jekyll을 아래와 같이 `--future`와 `--drafts` 두 옵션을 주로 사용한다.  

- 업로드 결과와 동일하게 출력할 때

```powershell
# local에서만 확인할 때
> bundle exec jekyll serve --livereload --future

# 호스팅을 해서 다른 디바이스에서도 확인하고 싶을 때
> bundle exec jekyll serve --livereload --future -H [IP_address]
```

- `_drafts`에 있는 초안까지 확인할 때

```powershell
# local에서만 확인할 때
> bundle exec jekyll serve --livereload --future --drafts

# 호스팅을 해서 다른 디바이스에서도 확인하고 싶을 때
> bundle exec jekyll serve --livereload --future --drafts -H [IP_address]

# unpublished 된 비밀글 까지 같이 확인할 때
> bundle exec jekyll serve --livereload --future --drafts --unpublished

# 일부 문제를 감수하고 페이지 재생성 시간을 줄이고 싶을 때
> bundle exec jekyll serve --livereload --future --drafts --unpublished --incremental
```

---
## Reference
- [Jekyll](https://jekyllrb.com/)
- [devinlife](https://devinlife.com/)님의 [하우투: 같이 따라하기 시리즈](https://devinlife.com/howto/)