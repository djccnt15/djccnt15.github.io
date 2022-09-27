# Blog of djccnt15

GitHub Pages를 이용한 블로그 구축 및 공부노트

## Jekyll localhost 서버 구동 명령어

주로 사용하는 서버 구동 옵션은 아래와 같다.  

```powershell
# localhost only
> bundle exec jekyll serve --livereload --future --drafts --unpublished

# hosting with specific IP
> bundle exec jekyll serve --livereload --future --drafts --unpublished --host [IP_address]
```

`--host`, `--port` 옵션을 사용하지 않을 경우 기본 IP 및 포트는 아래와 같이 할당된다.  

- [http:127.0.0.1:4000](http:127.0.0.1:4000)
- [http:localhost:4000](http:localhost:4000)

서버 구동의 세부 옵션 및 설명은 아래와 같다.  

```powershell
# basic command
> bundle exec jekyll serve

# automatic refresh option
> bundle exec jekyll serve --livereload

# build with future dated posting(just like GitHub)
> bundle exec jekyll serve --future

# build with drafts(GitHub doesn't show drafts)
> bundle exec jekyll serve --drafts

# build with unpublished(GitHub doesn't show unpublished posts)
> bundle exec jekyll serve --unpublished

# hosting with ip address
> bundle exec jekyll serve --host [IP_address]

# setting port
> bundle exec jekyll serve --port [port_num]

# rebuild changed pages only
> bundle exec jekyll serve --incremental
```

## Powered by

- [jekyll](https://jekyllrb.com/)
- [Hydejack](https://hydejack.com/)
- [Minimal Mistakes Jekyll theme](https://mmistakes.github.io/minimal-mistakes/)