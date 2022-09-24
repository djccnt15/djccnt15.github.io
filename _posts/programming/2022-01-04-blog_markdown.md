---
published: true
layout: post
title: '[Markdown] 마크다운 활용팁'
description: >
    posting에 유용한 팁들
categories: [Programming]
tags: [Markdown, ⭐starred]
image:
    path: /assets/img/posts/markdown.png
related_posts:
    - _posts/programming/2022-01-02-manual_github_pages.md
---
* toc
{:toc}

## 1. 이모지

⭐⚡❗💡  
🏆🥇🥈🥉🏅  
🏷️🔖📎📌🔑🗝️🧭  
🌟🌠☄️🌈🔥💧❄️  
🥞🧀🥓🍔🍕🍺  
🇰🇷💣💢💥💯💤🦈🎓💎🔔💰💲  
🔋💻🖥️🔒🔗  
⭕❌✔️©️®️™️  

전체 이모지는 [여기](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md)에서 확인할 수 있다.  
윈도우에서는 `window key + .`, `window key + ;`로도 확인할 수 있다.  

## 2. 이미지/동영상 삽입

### 이미지 삽입

이미지를 삽입하려면 이미지를 어딘가에 업로드 하고 링크를 걸면 된다.  
난 보통 `/assets/img/posts`에 업로드 한다.  
![yagongman_Dijkstra](/assets/img/posts/yagongman_Dijkstra.png)

마크다운 코드는 아래와 같다.  

```
![IMAGE_ALT_TEXT](/assets/img/posts/file_name)
```

### 동영상 삽입

마크다운은 기본적으로 동영상 임베드를 허용하지 않아서 아래와 같이 미리보기를 띄우고 링크를 걸어야 한다.

```
[![IMAGE_ALT_TEXT](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://youtu.be/YOUTUBE_VIDEO_ID_HERE)
```

[![the_first_video](https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg)](https://youtu.be/jNQXAC9IVRw)

미리보기 방식 대신 유튜브 동영상을 임베드 하고 싶다면 유튜브 동영상을 우클릭하여 `소스 코드 복사`를 한 다음에 붙여넣으면 된다.  

```html
<iframe width="675" height="506" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

<iframe width="675" height="506" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 3. 수식 입력

hydejack 테마에서 수식을 입력할 때는 양 끝에 `$$`표시를 하고 `LaTex`문법을 사용하면 된다.  
[위키백과 TeX 문법](https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:TeX_%EB%AC%B8%EB%B2%95)([영어](https://en.wikipedia.org/wiki/Help:Displaying_a_formula))  

```
$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}$$
```

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}$$

💡 [CodeCogs Equation Editor](https://latex.codecogs.com/)을 이용하면 쉽게 `LaTex`수식을 만들 수 있다.  
{:.note}

## 4. {% raw %} {% %} {% endraw %} 인식 금지

`liquid` 언어의 ```{% raw %} {% %} {% endraw %}```을 인식하지 않도록 작성하고 싶을 때는 앞 뒤로 `{{ "{% raw "}}%}  {{ "{% endraw "}}%}`을 넣어주면 된다.

```liquid
{{ "{% raw "}}%}  {{ "{% endraw "}}%}
```

## 5. `*` 삽입

마크다운에서 `*`을 삽입하려면, 아래와 같이 입력하면 된다.  

```markdown
\*
```
```
*
```

## 6. 펼치기/접기

마크다운 자체에는 펼치기/접기 기능이 없어서, HTML의 `<details>` 태그를 사용해야 한다. `<summary>` 태그는 내용의 요약을 표시할 수 있고, 접혀진 부분 안에서 다시 마크다운 문법을 사용하려면 `<div markdown="1">` 태그로 구역을 만들어줘야 한다. 참고로 태그와 마크다운 문법 사이에 빈 줄이 있어야 정상적으로 마크다운 문법을 인식한다.  

```html
<details><summary>summary</summary><div markdown="1">

> **Your** Contents

</div></details>
```

<details><summary>summary</summary><div markdown="1">

> **Your** Contents

</div>