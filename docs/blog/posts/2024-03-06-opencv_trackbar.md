---
slug: opencv-trackbar
title: OpenCV Trackbar 사용법
date:
    created: 2024-03-06
description: >
    OpenCV High-level GUI를 위한 Trackbar 사용법 예시
categories:
    - Vision
tags:
    - OpenCV
---

OpenCV High-level GUI를 위한 Trackbar 사용법 예시  

<!-- more -->

---

## Trackbar

OpenCV GUI와 Trackbar를 이용해서 이미지 이진화의 적정값을 쉽게 찾을 수 있는 프로그램 예시

```python
from enum import Enum

import cv2
from pydantic import BaseModel

WINDOW_TITLE = "Trackbar Window"


class TrackbarModel(BaseModel):
    name: str
    value: int
    count: int


class TrackbarEnum(Enum):
    """
    name of a trackbar must be unique!
    name of a trackbar is a key value of the trackbar
    """

    THRESHOLD = TrackbarModel(name="threshold", value=127, count=255)
    MAX_VALUE = TrackbarModel(name="max value", value=255, count=255)

    @classmethod
    def to_list(cls):
        return [v.value for v in cls]


def on_change(*args): ...  # (1)!


def create_window(
    *,
    window_name: str,
    width: int,
    height: int,
    trackbars: list[TrackbarModel],
):
    cv2.namedWindow(winname=window_name, flags=cv2.WINDOW_NORMAL)
    cv2.resizeWindow(winname=window_name, width=width, height=height)

    for trackbar in trackbars:
        cv2.createTrackbar(  # cv.createTrackbar takes no kwargs!
            trackbar.name, window_name, trackbar.value, trackbar.count, on_change
        )


def main():
    image = cv2.imread(filename=r"resources/world.png")

    create_window(
        window_name=WINDOW_TITLE,
        width=500,
        height=500,
        trackbars=TrackbarEnum.to_list(),
    )

    while cv2.waitKey(1) != 27:  # 27 is keyboard number of esc
        trackbar_data = {
            v.name: cv2.getTrackbarPos(
                trackbarname=v.name,
                winname=WINDOW_TITLE,
            )
            for v in TrackbarEnum.to_list()
        }

        _, binary = cv2.threshold(
            src=image,
            thresh=trackbar_data[TrackbarEnum.THRESHOLD.value.name],
            maxval=trackbar_data[TrackbarEnum.MAX_VALUE.value.name],
            type=cv2.THRESH_BINARY,
        )

        cv2.imshow(WINDOW_TITLE, binary)

    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
```

1. 슬라이더의 값이 변할 때 호출될 콜백 함수