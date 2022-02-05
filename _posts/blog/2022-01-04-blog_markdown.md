---
title: "마크다운 활용팁"
excerpt: "posting에 유용한 팁들"
published: true
mathjax: true

toc: true
toc_sticky: true

categories:
  - blog
tags:
  - ⭐starred
  - blog
---
# {{ page.excerpt }}
---
## 1. 이모지
⭐❗💡🏷️🔖📎  
⚡🌟🌠☄️🌈🔥💧❄️  
🥞🧀🥓🍔🍕🍺  
🏆🥇🥈🥉🏅  
🇰🇷💣💢💥💯💤🦈🧭🎓💎🔔💰💲  
🔋💻🖥️📌🔑🗝️🔒🔗  
⭕❌✔️©️®️™️  

전체 이모지는 [여기](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md)에서 확인할 수 있다.  

## 2. 이미지/동영상 삽입
### 2-1. 이미지 삽입
이미지를 삽입하려면 이미지를 어딘가에 업로드 하고 링크를 걸면 된다.  
난 보통 `/assets/images/posts`에 업로드 한다.  
![yagongman_Dijkstra](/assets/images/posts/yagongman_Dijkstra.png)

마크다운 코드는 아래와 같다.  

```markdown
![IMAGE_ALT_TEXT](/assets/images/posts/file_name)
```

### 2-2. 동영상 삽입
마크다운은 기본적으로 동영상 임베드를 허용하지 않아서 아래와 같이 미리보기를 띄우고 링크를 걸어야 한다. 난 평소에도 임베드 보다는 유튜브에서 직접 보는 것을 선호하는데 아주 내 취향이다.  

예시 동영상은 유튜브의 첫번째 비디오이다.  

[![the_first_video](https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg)](https://youtu.be/jNQXAC9IVRw)

위와 같이 띄우는 마크다운 코드는 아래와 같다.  

```markdown
[![IMAGE_ALT_TEXT](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://youtu.be/YOUTUBE_VIDEO_ID_HERE)
```

만약 유튜브 동영상을 임베드 하고 싶다면 유튜브 동영상을 우클릭하여 `소스 코드 복사`를 한 다음에 붙여넣으면 된다.  

<iframe width="675" height="506" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
\
Minimal Mistakes 테마가 제공하는 방법을 써도 된다.  

{% include video id="jNQXAC9IVRw" provider="youtube" %}

사용하는 코드는 아래와 같다.  

```scss{% raw %}
{% include video id="YOUTUBE_VIDEO_ID" provider="youtube" %}
{% endraw %}```

## 3. notice 스타일
Minimal Mistakes 테마는 notice 스타일을 제공하는데,  
사용법은 문단 뒤에 {% raw %}`{: .notice}`{% endraw %}를 입력하면 된다.  

{% raw %}
notice  
문단 뒤에 `{: .notice}` 추가
{% endraw %}{: .notice}

{% raw %}
primary notice  
문단 뒤에 `{: .notice--primary}` 추가
{% endraw %}{: .notice--primary}

{% raw %}
info notice  
문단 뒤에 `{: .notice--info}` 추가
{% endraw %}{: .notice--info}

{% raw %}
success notice  
문단 뒤에 `{: .notice--success}` 추가
{% endraw %}{: .notice--success}

{% raw %}
warning notice  
문단 뒤에 `{: .notice--warning}` 추가
{% endraw %}{: .notice--warning}

{% raw %}
danger notice  
문단 뒤에 `{: .notice--danger}` 추가
{% endraw %}{: .notice--danger}

## 4. 수식 입력
수식을 입력할 때는 우선 수식을 사용할 포스트의 `YFM`을 설정한 후,  

```markdown
mathjax: true
```

양 끝에 `$`, `$$`표시를 하고 `LaTex`문법을 사용하면 된다.  

- inlineMath: `$\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}$`

$\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}$
{: .notice}

- displayMath: `$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}$$`  

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}$$
{: .notice}

❗ `LaTex`문법 중간에 띄어쓰기가 들어가 있으면 수식이 제대로 인식 되지 않는다.  
입력: `$\beta_{0}x_{0}$`, `$\beta _{0}x_{0}$`  
출력: $\beta_{0}x_{0}$, $\beta _{0}x_{0}$
{: .notice--warning}

💡 [CodeCogs Equation Editor](https://latex.codecogs.com/)을 이용하면 쉽게 `LaTex`수식을 만들 수 있다.  
{: .notice--info}

## 5. 강제 줄바꿈
마크다운은 엔터 공백이나 double space로 줄을 바꿔주는데, 기본 기능으로는 한 줄 이상 빈 줄이 들어가지도 않고, html 코드와 겹치면서 줄바꿈이 되지 않는 경우도 있다. 그럴 땐 `<br>`이나 `\`을 넣어주면 된다. `<br>`를 이용하면 문단단위로 박스에 들어가는 `{: .notice}` 안 에서 빈 줄을 넣어 줄 수 있다.

## 6. Django 템플릿 인식 금지
Django 템플릿 ```{% raw %} {% %} {% endraw %}```을 인식하지 않도록 작성하고 싶을 때는 앞 뒤로 `{{ "{% raw "}}%}  {{ "{% endraw "}}%}`을 넣어주면 된다.

```markdown
{{ "{% raw "}}%}  {{ "{% endraw "}}%}
```