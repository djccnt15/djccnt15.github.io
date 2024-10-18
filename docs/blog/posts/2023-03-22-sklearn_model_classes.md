---
slug: sklearn-model-classes
title: scikit-learn 분류 모델의 classes
date:
    created: 2023-03-22
description: >
    scikit-learn 분류 모델의 카테고리 확인 방법
categories:
    - AI
tags:
    - ai
    - scikit-learn
---

scikit-learn 기반의 분류 모델에서 종속 변수의 카테고리 확인 방법  

<!-- more -->

## classes_

scikit-learn을 이용해서 분류 모델을 만들 때, 범주형인 종속변수를 연구자가 직접 인코딩 하지 않아도 모델 클래스가 자동으로 인코딩해서 처리한다.  

이 경우 해당 모델로 신규 데이터에 대한 결과를 예측할 때, `predict_proba` 메서드가 출력하는 결과값의 배열에 담긴 확률들이 각각 어느 카테고리를 지칭하는지를 확인할 필요가 있다.  

scikit-learn의 분류 모델이 학습한 결과값의 카테고리는 `classes_` 어트리뷰트에 저장되기 때문에 해당 데이터를 확인하면 결과값의 카테고리를 확인할 수 있다.  

```python
import pydataset as pds
from sklearn.linear_model import LogisticRegression

data = pds.data("iris")

target = "Species"
endog = data[target]
exog = data[[x for x in data.columns if x != target]]

model = LogisticRegression(
    random_state=0,
    max_iter=1000,
).fit(X=exog, y=endog)

print(model.classes_)
```
```
['setosa' 'versicolor' 'virginica']
```

`LogisticRegression` 외에도 `KNN`이나 `Randomforest` 등 분류 모델 class들은 모두 동일한 어트리뷰트를 갖고 있기 때문에 동일한 방식으로 확인할 수 있다.  

---
## Reference
- [Glossary of Common Terms and API Element](https://scikit-learn.org/stable/glossary.html#term-classes_)
