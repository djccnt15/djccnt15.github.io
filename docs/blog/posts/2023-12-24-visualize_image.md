---
slug: how-to-show-image
title: Python에서 이미지 확인하기
date:
    created: 2023-12-24
    updated: 2024-01-23
description: >
    OpenCV로 불러온 이미지 확인하는 방법
categories:
    - Vision
tags:
    - python
    - OpenCV
    - matplotlib
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
    resize_ratio: float = 1 / 2
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
    resize_ratio : float
        ratio for window resizing

    Returns
    -------
    None
    """
    
    width = int(image.shape[1] * resize_ratio)
    height = int(image.shape[0] * resize_ratio)

    cv2.namedWindow(winname=title, flags=cv2.WINDOW_NORMAL)
    cv2.resizeWindow(title, width=width, height=height)
    cv2.imshow(winname=title, mat=image)
    cv2.waitKey(delay=time)
    cv2.destroyAllWindows()
```

!!! tip
    참고로 `cv2.waitKey`의 입력 인자를 0으로 입력하면 사용자가 키를 누를 때까지 대기한다.  

## matplotlib 활용

matplotlib를 사용해서 간단하게 확인하는 방법도 있다.  

```python
import matplotlib.pyplot as plt
import numpy as np


def imshow(image: np.ndarray) -> None:
    convert_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    plt.axis("off")
    plt.imshow(convert_img)
    plt.show()
```

!!! tip
    `cv2.imread`는 이미지를 BGR로 불러오므로 matplotlib.pyplot로 이미지를 확인하려면 `cv2.cvtColor(image, cv2.COLOR_BGR2RGB)`을 통해서 RGB로 바꿔줘야 정상적으로 출력된다.  