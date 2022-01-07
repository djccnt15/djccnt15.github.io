---
title: "블로그 사용법"
excerpt: "Github Pages 블로그와 Minimal Mistakes theme 사용법"
published: true

toc: true
toc_sticky: true

categories:
  - Blog
tags:
  - blog

updated_at: 2022-01-02 #T08:06:00-05:00
---
# {{ page.excerpt }}
---

## 1. 포스트 작성은 markdown으로
markdown 기반의 블로그를 만들면서 조금 귀찮아진 부분인데, 나는 기본적으로 vscode의 `Trim Trailing Whitespace` 기능을 켜고 사용한다.  

그런데 이 옵션을 킨 상태로 저장하면 vscode가 자동으로 문장 끝의 whitespace를 삭제해서 줄바꿈을 망가뜨린다.  

앞으로는 해당 기능을 user 단위가 아니라 workspace 단위로 켜줘야 한다  
기본적으로 켜고 특정 workspace에서만 끄는게 안 되기 때문에.. 반대는 가능하지만  

[이 블로그에서 사용된 마크다운 활용법들 보러가기](/blog/markdown_for_blog)

## 2. YFM 정의
YFM(YAML Front Matter)은 markdown 파일의 최상단에 위치하며 3개의 하이픈으로 시작과 끝을 표시한다.  
YAML은 일종의 구조화된 데이터 형식으로, 프로그래밍에서 변수를 설정하듯이 사용할 수 있다.  

### 2-1. YFM을 본문에 활용
YFM을 사용해서 글의 제목, 카테고리, 태그 등을 정의할 수 있다.  
정의된 YFM을 이중 괄호 구문을 사용해서 아래와 같이 사이트 정보가 바뀔 때 내용이 변경내용을 자동으로 반영하도록 작성할 수 있다.

```markdown
{% raw %}이 글의 제목은 {{ page.title }}이고,
작성된 날짜는 {{ page.updated_at }}이다.
블로그 타이틀은 {{ site.title }}이고, 저자는 {{ site.author.name }}이다.{% endraw %}
```

```markdown
이 글의 제목은 {{ page.title }}이고,
작성된 날짜는 {{ page.updated_at }}이다.
블로그 타이틀은 {{ site.title }}이고, 저자는 {{ site.author.name }}이다.
```

## 3. 비밀글 작성

### 3-1. YFM으로 비밀글 태그
YFM에서 `published: false`로 정의하면 된다.  
비밀글로 정의된 글을 local에서 미리 확인하고 싶을 때는, 아래와 같이 `--unpublished`을 붙여서 jekyll을 구동하면 된다.

```powershell
> bundler exec jekyll serve --unpublished
```

~~repository에 md 파일이 다 보일텐데 무슨 소용인지 싶긴한데.. 아무튼 가능하긴하다~~  
[devinlife님의 블로그](https://devinlife.com/)를 보면서 질문하다 알게 되었는데, Github Pro를 사용하면 Github Pages의 repo를 비공개 설정 할 수 있다고 한다.  

### 3-2. _drafts 폴더에 작성하기
_drafts 폴더는 Github Pages가 외부로 보이게 출력하지 않는다. local에서 내용을 확인하고 싶다면 Jekyll에 `--drafts`를 붙여서 구동해야 한다.  

```powershell
> bundler exec jekyll serve --drafts
```

## 4. local Jekyll로 결과 확인
github pages는 업로드도 귀찮고, 업로드 후 반영되는데 시간이 은근히 걸리기 때문에, local에서 바로바로 확인하고 업로드하는게 편하다.  

local에 설치된 Jekyll을 작동시켜서 local 호스팅을 띄우는 명령어는 다음과 같다.

```powershell
> bundle exec jekyll serve
```

미래 날짜로 작성한 포스트를 local에서 확인하려면 아래와 같이 `--future`를 붙여야 한다.  
직접 확인해보지는 않았지만 Github Pages에서는 미래날짜로 업로드해도 정상적으로 출력된다고 한다.  

```powershell
> bundle exec jekyll serve --future
```

local 호스팅은 `http:127.0.0.1:4000` 또는 `http:localhost:4000`에서 확인할 수 있다.  

그림 사이즈를 모바일에서 미리 확인하는 등 다른 디바이스의 브라우저로 테스트 컴퓨터의 호스팅에 접속하고 싶을 경우가 있는데,  
그럴 때는 아래와 같이 서버의 주소를 지정해서 구동하면 된다.  

```powershell
> bundle exec jekyll serve -H 192.168.0.5
```

서버의 주소로 지정할 테스트 컴퓨터의 IP는 `ipconfig/ifconfig` 명령어로 확인할 수 있다.  
위의 경우에는 `192.168.0.5`으로 호스팅 했기 때문에, `http:192.168.0.5:4000`으로 접속해야 내용을 확인할 수 있다.

### 4-1. ❗작업할 때
개인적으로 나는 작업할 때 Jekyll을 아래와 같이 `--future`와 `--unpublished`를 둘 모두 적용해서 사용한다.

```powershell
# local에서만 확인할 때
> bundle exec jekyll serve --future --unpublished

# 호스팅을 해서 다른 디바이스에서도 확인하고 싶을 때
> bundle exec jekyll serve -H 192.168.0.5 --future --unpublished
```

### 4-2. timezone 설정
_config.yml에 timezone이 설정된 경우 Gemfile에 아래 코드를 넣어줘야 local에서 Jekyll을 구동시킬 수 있다.  

```ruby
gem 'tzinfo'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
```

Minimal Mistakes의 [Configuration](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) 문서에 따르면 default는 os에 설정된 local timezone으로 설정되어 있기 때문에 어지간해서는 굳이 설정할 필요는 없다.

## 5. 각종 블로그 스타일 수정
### 5-1. 스킨 수정
스킨을 수정하고 싶을 때는  
1. `assets/css/main.scss` 파일에 입력해서 오버라이드 하거나  
2. `_sass/minimal-mistakes/skins`에서 각 스킨들을 직접 건드리면 된다.  

나는 default 스킨을 아주 조금만 건드리고 싶고, 다른 스킨들은 건드리기 싫어서  
`_default.scss` 파일에 아래와 같은 내용을 입력해줬다.

```scss
$background-color: #eeeeee !default;
$text-color: #222831 !default;
$muted-text-color: #393e46 !default;
$primary-color: #7a7a7a !default;
$border-color: mix(#fff, #393e46, 75%) !default;
$footer-background-color: $primary-color !default;
$masthead-link-color: $text-color !default;
$masthead-link-color-hover: $text-color !default;
$navicon-link-color-hover: mix(#fff, $text-color, 80%) !default;

.page__footer {
  color: #fff !important; // override
}

.page__footer-follow .social-icons .svg-inline--fa {
  color: inherit;
}
```

### 5-2. 줄간격 조정
Minimal Mistakes는 기본 줄간격이 너무 좁아 가독성이 떨어진다.  
이럴 때는 `_sass/_page.scss`를 수정해주면 된다.  
나는 아래와 같이 `.page__content`의 `p`에 `line-height`를 추가해서 문단 스타일을 수정했다.

```scss
.page__content {
  /* paragraph indents */
  p {
    line-height: 2; // 가독성을 위해 줄 간격 추가
  }
}
```

### 5-3. 좌우 여백 조정
Minimal Mistakes 테마의 좌우 여백은 여기 저기에 정의 되어 있는데,  
공통적으로 `$right-sidebar-width` 변수를 활용하고 있으니 `_sass/_variables.scss`의 관련 내용을 수정하면 된다.  
나의 경우에는 아래와 같이 수정했다.  

```scss
$right-sidebar-width-narrow: 200px !default;  // default 200px
$right-sidebar-width: 250px !default;         // default 300px
$right-sidebar-width-wide: 250px !default;    // default 400px
```

### 5-4. 문단을 박스 안에
Minimal Mistakes 테마는 notice 스타일을 제공하는데,  
사용법은 문단 뒤에 {% raw %}`{: .notice}`{% endraw %}를 입력하면 된다.  

{% raw %}notice  
문단 뒤에 `{: .notice}` 추가{% endraw %}
{: .notice}

{% raw %}primary notice  
문단 뒤에 `{: .notice--primary}` 추가{% endraw %}
{: .notice--primary}

{% raw %}info notice  
문단 뒤에 `{: .notice--info}` 추가{% endraw %}
{: .notice--info}

{% raw %}warning notice  
문단 뒤에 `{: .notice--warning}` 추가{% endraw %}
{: .notice--warning}

{% raw %}success notice  
문단 뒤에 `{: .notice--success}` 추가{% endraw %}
{: .notice--success}

{% raw %}danger notice  
문단 뒤에 `{: .notice--danger}` 추가{% endraw %}
{: .notice--danger}

---
# Reference
- [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)
- [devinlife](https://devinlife.com/)님의 [하우투: 같이 따라하기 시리즈](https://devinlife.com/howto/)
