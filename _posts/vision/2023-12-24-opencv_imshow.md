---
published: true
layout: post
title: '[OpenCV] 이미지 켜두기'
description: >
    OpenCV에서 이미지를 켜두는 방법
categories: [Vision]
tags: [OpenCV, python]
image:
    path: /assets/img/posts/thumbnail_opencv.png
related_posts:
    - _posts/category/0000-01-01-format_post.md
---
* toc
{:toc}

## OpenCV로 영상 확인하기

OpenCV를 이용해서 영상 처리를 할 때, `imshow` 함수로 영상을 확인하면서 처리를 하게 되는데 이때 영상의 재생이 모두 끝나면 자동으로 종료된다.  

영상의 자동 종료를 막고 싶으면 `waitKey` 함수를 같이 사용해줘야 하는데, 아래와 같이 함수로 묶어두면 편리하다.  

```python
import cv2
import numpy as np


def imshow(image: np.ndarray, title: str, time: int = 0) -> None:
    """show image and wait

    Parameters
    ----------
    image : np.ndarray
        image matrix
    title : str
        window name
    time : int
        image waiting time(ms), need push a key to close window if 0 is given

    Returns
    -------
    None
    """

    cv2.imshow(winname=title, mat=image)
    cv2.waitKey(time)
    cv2.destroyAllWindows()
```

참고로 time을 0으로 입력하면 사용자가 키를 누를 때까지 대기한다.  
