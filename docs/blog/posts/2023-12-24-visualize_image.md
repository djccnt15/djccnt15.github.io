---
slug: how-to-show-image
title: Python에서 이미지 확인하기
date:
    created: 2023-12-24
description: >
    OpenCV로 불러온 이미지 확인하는 방법
categories:
    - Vision
tags:
    - python
    - opencv
    - matplotlib
---

OpenCV로 불러온 이미지 확인하는 방법  

<!-- more -->

---

## OpenCV 활용

OpenCV를 사용한다면, `imshow` 함수를 사용해서 이미지를 확인할 수 있다. 

다만 `imshow` 함수를 단독으로 사용하면 영상의 재생이 모두 끝나고 자동으로 해당 창이 종료되기 때문에, 영상의 자동 종료를 막고 싶다면 아래 예시와 같이 영상 재생용 윈도우를 별도로 제어해줘야 한다.  

=== "Python3.9"

    ```python title="utils.py"
    from typing import Union

    import cv2


    def imshow(
        *,
        image: cv2.typing.MatLike,
        title: str,
        time: int = 0,
        resize_ratio: Union[int, float, None] = 1,
    ) -> int:
        """show image to window of given title

        Parameters
        ----------
        image : cv2.typing.MatLike
            image matrix read with OpenCV
        title : str
            window name to show image
        time : int | None
            time for wait key input, wait constantly if 0
        resize_ratio: int | float | None
            ratio for window resizing
            if none, size of the window follows the drag custom of the user

        Returns
        -------
        input key num
        """

        if resize_ratio:  # resize window size
            width = int(image.shape[1] * resize_ratio)
            height = int(image.shape[0] * resize_ratio)
            cv2.resizeWindow(winname=title, width=width, height=height)

        cv2.imshow(winname=title, mat=image)

        return cv2.waitKey(delay=time)
    ```

=== "Python3.10+"

    ```python title="utils.py"
    import cv2


    def imshow(
        *,
        image: cv2.typing.MatLike,
        title: str,
        time: int = 0,
        resize_ratio: int | float | None = 1,
    ) -> int:
        """show image to window of given title

        Parameters
        ----------
        image : cv2.typing.MatLike
            image matrix read with OpenCV
        title : str
            window name to show image
        time : int | None
            time for wait key input, wait constantly if 0
        resize_ratio: int | float | None
            ratio for window resizing
            if none, size of the window follows the drag custom of the user

        Returns
        -------
        input key num
        """

        if resize_ratio:  # resize window size
            width = int(image.shape[1] * resize_ratio)
            height = int(image.shape[0] * resize_ratio)
            cv2.resizeWindow(winname=title, width=width, height=height)

        cv2.imshow(winname=title, mat=image)

        return cv2.waitKey(delay=time)
    ```

!!! tip
    OpenCV로 GUI 윈도우를 제어할 때는 창의 이름을 기준으로 구별한다.  

!!! tip
    `cv2.waitKey`의 입력 인자를 0으로 입력하면 사용자가 키를 누를 때까지 대기한다.  

!!! note
    `cv2.resizeWindow`가 호출되지 않을 경우 마우스로 조절한 창의 크기가 그대로 유지된다.  

아래와 같이 호출해서 사용하면 되는데, 사용할 GUI 윈도우를 선언해두고, 각 윈도우에 이미지를 넣어주는 방식으로 작동한다.  

```python title="main.py"
from pathlib import Path

import cv2

from src import util

RESOURCES = Path("resources")
TITLE = "Show Image"


def main():
    cv2.namedWindow(winname=TITLE, flags=cv2.WINDOW_NORMAL)

    for img_path in RESOURCES.iterdir():
        img = cv2.imread(str(img_path))
        user_input = util.imshow(image=img, title=TITLE, resize_ratio=1)
        if user_input == 27:  # 27 is keyboard num of esc
            break

    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
```

## matplotlib 활용

matplotlib를 사용해서 간단하게 확인하는 방법도 있다.  

```python
import cv2
import matplotlib.pyplot as plt


def imshow(
    *,
    image: cv2.typing.MatLike,
    title: str = "title",
) -> None:
    convert_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # (1)!
    plt.axis("off")
    plt.title(title)
    plt.imshow(convert_img)
    plt.show()
```

1. `cv2.imread`는 이미지를 BGR로 불러오므로 matplotlib.pyplot로 이미지를 확인하려면 `cv2.cvtColor(image, cv2.COLOR_BGR2RGB)`을 통해서 RGB로 바꿔줘야 정상적으로 출력된다.  

## Pillow 활용

아래와 같이 Pillow 패키지를 활용하는 방법도 있다.  

```python
import cv2
from PIL import Image


def imshow(*, image: cv2.typing.MatLike):
    rgb_img = cv2.cvtColor(src=image, code=cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(obj=rgb_img)
    pil_img.show()
```