# Blog of djccnt15

GitHub Pages를 이용한 블로그 구축 및 공부노트

## Jekyll localhost 서버 구동 명령어

주로 사용하는 서버 구동 옵션은 아래와 같다.  

```bat
bundle exec jekyll serve --livereload --future --drafts --unpublished
```

```bat
bundle exec jekyll serve --livereload --future --drafts --unpublished --host [IP_address]
```

```bat
bundle exec jekyll serve --livereload --future --drafts --unpublished --port [port_num]
```

`--host`, `--port` 옵션을 사용하지 않을 경우 기본 IP 및 포트는 아래와 같이 할당된다.  

- [http://127.0.0.1:4000](http://127.0.0.1:4000)
- [http://localhost:4000](http://localhost:4000)

서버 구동의 세부 옵션 및 설명은 아래와 같다.  

- 기본 구동

```bat
bundle exec jekyll serve
```

- 내용 변경 시 자동 재시작

```bat
bundle exec jekyll serve --livereload
```

- 미래 날짜 포스팅도 렌더링

```bat
bundle exec jekyll serve --future
```

- `_draft` 폴더의 포스팅 렌더링

```bat
bundle exec jekyll serve --drafts
```

- `published: false` 옵션 포스팅 렌더링

```bat
bundle exec jekyll serve --unpublished
```

- 호스트 IP 설정

```bat
bundle exec jekyll serve --host [IP_address]
```

- 호스트 port 설정

```bat
bundle exec jekyll serve --port [port_num]
```

- 변경된 페이지만 재렌더링

```bat
bundle exec jekyll serve --incremental
```

- 렌더링 프로파일 출력

```bat
bundle exec jekyll serve --profile
```

## Powered by

- [jekyll](https://jekyllrb.com/)
- [Hydejack](https://hydejack.com/)
- [Minimal Mistakes Jekyll theme](https://mmistakes.github.io/minimal-mistakes/)