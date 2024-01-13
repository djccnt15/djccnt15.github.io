---
slug: how-to-show-image
title: Python에서 이미지 확인하기
date:
    created: 2023-12-24
    updated: 2023-01-31
description: >
    OpenCV로 불러온 이미지 확인하는 방법
categories:
    - Vision
tags:
    - python
    - OpenCV
---

OpenCV로 불러온 이미지 확인하는 방법  

<!-- more -->

---

## OpenCV 활용

OpenCV를 사용한다면, `imshow` 함수를 사용해서 이미지를 확인할 수 있다. 

다만 `imshow`함수는 영상의 재생이 모두 끝나면 자동으로 종료되는데, 영상의 자동 종료를 막고 싶다면 `waitKey` 함수를 같이 사용해줘야 한다.  

```python
import cv2
import numpy as np


def imshow(
    image: np.ndarray,
    title: str = "title",
    time: int = 0,
) -> None:
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

!!! tip
    참고로 time을 0으로 입력하면 사용자가 키를 누를 때까지 대기한다.  