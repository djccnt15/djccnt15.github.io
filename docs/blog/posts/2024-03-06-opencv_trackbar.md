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
from enum import StrEnum

import cv2

TITLE = "Trackbar Window"


class TrackbarEnum(StrEnum):
    THRESHOLD = "threshold"
    MAX_VALUE = "max value"


def on_change(*args): ...  # (1)!


def create_trackbar(
    *,
    trackbar_name: TrackbarEnum,
    window_name: str,
    value: int,
    count: int,
    pos: int,
):
    cv2.createTrackbar(trackbar_name, window_name, value, count, on_change)
    cv2.setTrackbarPos(trackbar_name, window_name, pos)


def create_window():
    cv2.namedWindow(winname=TITLE, flags=cv2.WINDOW_NORMAL)

    create_trackbar(
        trackbar_name=TrackbarEnum.THRESHOLD,
        window_name=TITLE,
        value=0,
        count=255,
        pos=127,
    )

    create_trackbar(
        trackbar_name=TrackbarEnum.MAX_VALUE,
        window_name=TITLE,
        value=0,
        count=255,
        pos=255,
    )

    cv2.resizeWindow(winname=TITLE, width=500, height=500)


def main():
    image = cv2.imread(filename=r"resources/world.png")

    create_window()

    while cv2.waitKey(1) != 27:  # 27 is keyboard number of esc
        threshold = cv2.getTrackbarPos(TrackbarEnum.THRESHOLD, TITLE)
        max_val = cv2.getTrackbarPos(TrackbarEnum.MAX_VALUE, TITLE)

        _, binary = cv2.threshold(
            src=image,
            thresh=threshold,
            maxval=max_val,
            type=cv2.THRESH_BINARY,
        )

        cv2.imshow(TITLE, binary)

    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
```

1. 슬라이더의 값이 변할 때 호출될 콜백 함수