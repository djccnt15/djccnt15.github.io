---
title: "마크다운 활용팁"
excerpt: "블로그 작성에 사용한 유용한 팁들"
published: true
use_math: true

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
블로그 내용을 작성하는데 사용된 유용한 마크다운 팁들 모음

## 1. 이모지들
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
마크다운은 동영상 임베드를 허용하지 않아서 아래와 같이 미리보기를 띄우고 링크를 거는 수밖에 없다. 난 평소에도 임베드 보다는 유튜브에서 직접 보는 것을 선호하는데 아주 내 취향이다.  

예시 동영상은 유튜브의 첫번째 비디오이다.  

[![the_first_video](https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg)](https://youtu.be/jNQXAC9IVRw)

위와 같이 띄우는 마크다운 코드는 아래와 같다.  

```markdown
[![IMAGE_ALT_TEXT](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://youtu.be/YOUTUBE_VIDEO_ID_HERE)
```

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
warning notice  
문단 뒤에 `{: .notice--warning}` 추가
{% endraw %}{: .notice--warning}

{% raw %}
success notice  
문단 뒤에 `{: .notice--success}` 추가
{% endraw %}{: .notice--success}

{% raw %}
danger notice  
문단 뒤에 `{: .notice--danger}` 추가
{% endraw %}{: .notice--danger}

## 4. 수식 입력
수식을 입력할 때는 우선 수식을 사용할 포스트의 `YFM`을 설정한 후,  

```markdown
use_math: true
```

아래와 같이 양 끝에 `$`표시를 하고 `LaTex`문법을 사용하면 된다.  

- 입력: `$\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}$`
- 출력: $\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_{i}$

[CodeCogs Equation Editor](https://latex.codecogs.com/)을 이용하면 쉽게 `LaTex`수식을 만들 수 있다.  