---
published: true
layout: post
title: '[빅분기] 실기 시험 cheat sheet'
description: >
  빅데이터분석기사 실기 시험장에서 볼 수 있는 cheat sheet
categories: [DataAnalysis]
tags: [data analysis, Bigdata Certificate]
image:
  path: /assets/img/posts/bigdata_certi.png
related_posts:
  - _posts/dataanalysis/2022-09-17-bigdata_certi_04.md
---
* toc
{:toc}

{% include series_bigdatacerti.html %}

## dir, __all__

Python에서는 아래와 같이 `dir`이나 `__all__` 명령어를 통해 해당 라이브러리가 제공하는 모든 API에 대한 정보를 얻을 수 있다.  

```python
import sklearn

print(dir(sklearn))
```
```
['__SKLEARN_SETUP__', '__all__', '__builtins__', '__cached__', '__check_build', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__', '__version__', '_config', '_distributor_init', '_isotonic', '_loss', 'base', 'calibration', 'clone', 'cluster', 'compose', 'config_context', 'covariance', 'cross_decomposition', 'datasets', 'decomposition', 'discriminant_analysis', 'dummy', 'ensemble', 'exceptions', 'experimental', 'externals', 'feature_extraction', 'feature_selection', 'gaussian_process', 'get_config', 'impute', 'inspection', 'isotonic', 'kernel_approximation', 'kernel_ridge', 'linear_model', 'logger', 'logging', 'manifold', 'metrics', 'mixture', 'model_selection', 'multiclass', 'multioutput', 'naive_bayes', 'neighbors', 'neural_network', 'os', 'pipeline', 'preprocessing', 'random', 'random_projection', 'semi_supervised', 'set_config', 'setup_module', 'show_versions', 'svm', 'sys', 'tree', 'utils']
```

```python
import sklearn

print(sklearn.__all__)
```
```
['calibration', 'cluster', 'covariance', 'cross_decomposition', 'datasets', 'decomposition', 'dummy', 'ensemble', 'exceptions', 'experimental', 'externals', 'feature_extraction', 'feature_selection', 'gaussian_process', 'inspection', 'isotonic', 'kernel_approximation', 'kernel_ridge', 'linear_model', 'manifold', 'metrics', 'mixture', 'model_selection', 'multiclass', 'multioutput', 'naive_bayes', 'neighbors', 'neural_network', 'pipeline', 'preprocessing', 'random_projection', 'semi_supervised', 'svm', 'tree', 'discriminant_analysis', 'impute', 'compose', 'clone', 'get_config', 'set_config', 'config_context', 'show_versions']
```

```python
from sklearn import linear_model

print(linear_model.__all__)
```
```
['ARDRegression', 'BayesianRidge', 'ElasticNet', 'ElasticNetCV', 'Hinge', 'Huber', 'HuberRegressor', 'Lars', 'LarsCV', 'Lasso', 'LassoCV', 'LassoLars', 'LassoLarsCV', 'LassoLarsIC', 'LinearRegression', 'Log', 'LogisticRegression', 'LogisticRegressionCV', 'ModifiedHuber', 'MultiTaskElasticNet', 'MultiTaskElasticNetCV', 'MultiTaskLasso', 'MultiTaskLassoCV', 'OrthogonalMatchingPursuit', 'OrthogonalMatchingPursuitCV', 'PassiveAggressiveClassifier', 'PassiveAggressiveRegressor', 'Perceptron', 'QuantileRegressor', 'Ridge', 'RidgeCV', 'RidgeClassifier', 'RidgeClassifierCV', 'SGDClassifier', 'SGDRegressor', 'SGDOneClassSVM', 'SquaredLoss', 'TheilSenRegressor', 'enet_path', 'lars_path', 'lars_path_gram', 'lasso_path', 'orthogonal_mp', 'orthogonal_mp_gram', 'ridge_regression', 'RANSACRegressor', 'PoissonRegressor', 'GammaRegressor', 'TweedieRegressor']
```

## help

클래스나 함수에 대한 설명은 아래와 같이 `help()` 함수를 사용해서 출력할 수 있다.  

```python
from sklearn import linear_model

help(linear_model.LinearRegression)
```

<details><summary>summary</summary><div markdown="1">
```
Help on class LinearRegression in module sklearn.linear_model._base:

class LinearRegression(sklearn.base.MultiOutputMixin, sklearn.base.RegressorMixin, LinearModel)
 |  LinearRegression(*, fit_intercept=True, normalize='deprecated', copy_X=True, n_jobs=None, positive=False)
 |
 |  Ordinary least squares Linear Regression.
 |
 |  LinearRegression fits a linear model with coefficients w = (w1, ..., wp)
 |  to minimize the residual sum of squares between the observed targets in
 |  the dataset, and the targets predicted by the linear approximation.
 |
 |  Parameters
 |  ----------
 |  fit_intercept : bool, default=True
 |      Whether to calculate the intercept for this model. If set
 |      to False, no intercept will be used in calculations
 |      (i.e. data is expected to be centered).
 |
 |  normalize : bool, default=False
 |      This parameter is ignored when ``fit_intercept`` is set to False.
 |      If True, the regressors X will be normalized before regression by
 |      subtracting the mean and dividing by the l2-norm.
 |      If you wish to standardize, please use
 |      :class:`~sklearn.preprocessing.StandardScaler` before calling ``fit``
 |      on an estimator with ``normalize=False``.
 |
 |      .. deprecated:: 1.0
 |         `normalize` was deprecated in version 1.0 and will be
 |         removed in 1.2.
 |
 |  copy_X : bool, default=True
 |      If True, X will be copied; else, it may be overwritten.
 |
 |  n_jobs : int, default=None
 |      The number of jobs to use for the computation. This will only provide
 |      speedup in case of sufficiently large problems, that is if firstly
 |      `n_targets > 1` and secondly `X` is sparse or if `positive` is set
 |      to `True`. ``None`` means 1 unless in a
 |      :obj:`joblib.parallel_backend` context. ``-1`` means using all
 |      processors. See :term:`Glossary <n_jobs>` for more details.
 |
 |  positive : bool, default=False
 |      When set to ``True``, forces the coefficients to be positive. This
 |      option is only supported for dense arrays.
 |
 |      .. versionadded:: 0.24
 |
 |  Attributes
 |  ----------
 |  coef_ : array of shape (n_features, ) or (n_targets, n_features)
 |      Estimated coefficients for the linear regression problem.
 |      If multiple targets are passed during the fit (y 2D), this
 |      is a 2D array of shape (n_targets, n_features), while if only
 |      one target is passed, this is a 1D array of length n_features.
 |
 |  rank_ : int
 |      Rank of matrix `X`. Only available when `X` is dense.
 |
 |  singular_ : array of shape (min(X, y),)
 |      Singular values of `X`. Only available when `X` is dense.
 |
 |  intercept_ : float or array of shape (n_targets,)
 |      Independent term in the linear model. Set to 0.0 if
 |      `fit_intercept = False`.
 |
 |  n_features_in_ : int
 |      Number of features seen during :term:`fit`.
 |
 |      .. versionadded:: 0.24
 |
 |  feature_names_in_ : ndarray of shape (`n_features_in_`,)
 |      Names of features seen during :term:`fit`. Defined only when `X`
 |      has feature names that are all strings.
 |
 |      .. versionadded:: 1.0
 |
 |  See Also
 |  --------
 |  Ridge : Ridge regression addresses some of the
 |      problems of Ordinary Least Squares by imposing a penalty on the
 |      size of the coefficients with l2 regularization.
 |  Lasso : The Lasso is a linear model that estimates
 |      sparse coefficients with l1 regularization.
 |  ElasticNet : Elastic-Net is a linear regression
 |      model trained with both l1 and l2 -norm regularization of the
 |      coefficients.
 |
 |  Notes
 |  -----
 |  From the implementation point of view, this is just plain Ordinary
 |  Least Squares (scipy.linalg.lstsq) or Non Negative Least Squares
 |  (scipy.optimize.nnls) wrapped as a predictor object.
 |
 |  Examples
 |  --------
 |  >>> import numpy as np
 |  >>> from sklearn.linear_model import LinearRegression
 |  >>> X = np.array([[1, 1], [1, 2], [2, 2], [2, 3]])
 |  >>> # y = 1 * x_0 + 2 * x_1 + 3
 |  >>> y = np.dot(X, np.array([1, 2])) + 3
 |  >>> reg = LinearRegression().fit(X, y)
 |  >>> reg.score(X, y)
 |  1.0
 |  >>> reg.coef_
 |  array([1., 2.])
 |  >>> reg.intercept_
 |  3.0...
 |  >>> reg.predict(np.array([[3, 5]]))
 |  array([16.])
 |
 |  Method resolution order:
 |      LinearRegression
 |      sklearn.base.MultiOutputMixin
 |      sklearn.base.RegressorMixin
 |      LinearModel
 |      sklearn.base.BaseEstimator
 |      builtins.object
 |
 |  Methods defined here:
 |
 |  __init__(self, *, fit_intercept=True, normalize='deprecated', copy_X=True, n_jobs=None, positive=False)
 |      Initialize self.  See help(type(self)) for accurate signature.
 |
 |  fit(self, X, y, sample_weight=None)
 |      Fit linear model.
 |
 |      Parameters
 |      ----------
 |      X : {array-like, sparse matrix} of shape (n_samples, n_features)
 |          Training data.
 |
 |      y : array-like of shape (n_samples,) or (n_samples, n_targets)
 |          Target values. Will be cast to X's dtype if necessary.
 |
 |      sample_weight : array-like of shape (n_samples,), default=None
 |          Individual weights for each sample.
 |
 |          .. versionadded:: 0.17
 |             parameter *sample_weight* support to LinearRegression.
 |
 |      Returns
 |      -------
 |      self : object
 |          Fitted Estimator.
 |
 |  ----------------------------------------------------------------------
 |  Data and other attributes defined here:
 |
 |  __abstractmethods__ = frozenset()
 |
 |  ----------------------------------------------------------------------
 |  Data descriptors inherited from sklearn.base.MultiOutputMixin:
 |
 |  __dict__
 |      dictionary for instance variables (if defined)
 |
 |  __weakref__
 |      list of weak references to the object (if defined)
 |
 |  ----------------------------------------------------------------------
 |  Methods inherited from sklearn.base.RegressorMixin:
 |
 |  score(self, X, y, sample_weight=None)
 |      Return the coefficient of determination of the prediction.
 |
 |      The coefficient of determination :math:`R^2` is defined as
 |      :math:`(1 - \frac{u}{v})`, where :math:`u` is the residual
 |      sum of squares ``((y_true - y_pred)** 2).sum()`` and :math:`v`
 |      is the total sum of squares ``((y_true - y_true.mean()) ** 2).sum()``.
 |      The best possible score is 1.0 and it can be negative (because the
 |      model can be arbitrarily worse). A constant model that always predicts
 |      the expected value of `y`, disregarding the input features, would get
 |      a :math:`R^2` score of 0.0.
 |
 |      Parameters
 |      ----------
 |      X : array-like of shape (n_samples, n_features)
 |          Test samples. For some estimators this may be a precomputed
 |          kernel matrix or a list of generic objects instead with shape
 |          ``(n_samples, n_samples_fitted)``, where ``n_samples_fitted``
 |          is the number of samples used in the fitting for the estimator.
 |
 |      y : array-like of shape (n_samples,) or (n_samples, n_outputs)
 |          True values for `X`.
 |
 |      sample_weight : array-like of shape (n_samples,), default=None
 |          Sample weights.
 |
 |      Returns
 |      -------
 |      score : float
 |          :math:`R^2` of ``self.predict(X)`` wrt. `y`.
 |
 |      Notes
 |      -----
 |      The :math:`R^2` score used when calling ``score`` on a regressor uses
 |      ``multioutput='uniform_average'`` from version 0.23 to keep consistent
 |      with default value of :func:`~sklearn.metrics.r2_score`.
 |      This influences the ``score`` method of all the multioutput
 |      regressors (except for
 |      :class:`~sklearn.multioutput.MultiOutputRegressor`).
 |
 |  ----------------------------------------------------------------------
 |  Methods inherited from LinearModel:
 |
 |  predict(self, X)
 |      Predict using the linear model.
 |
 |      Parameters
 |      ----------
 |      X : array-like or sparse matrix, shape (n_samples, n_features)
 |          Samples.
 |
 |      Returns
 |      -------
 |      C : array, shape (n_samples,)
 |          Returns predicted values.
 |
 |  ----------------------------------------------------------------------
 |  Methods inherited from sklearn.base.BaseEstimator:
 |
 |  __getstate__(self)
 |
 |  __repr__(self, N_CHAR_MAX=700)
 |      Return repr(self).
 |
 |  __setstate__(self, state)
 |
 |  get_params(self, deep=True)
 |      Get parameters for this estimator.
 |
 |      Parameters
 |      ----------
 |      deep : bool, default=True
 |          If True, will return the parameters for this estimator and
 |          contained subobjects that are estimators.
 |
 |      Returns
 |      -------
 |      params : dict
 |          Parameter names mapped to their values.
 |
 |  set_params(self, **params)
 |      Set the parameters of this estimator.
 |
 |      The method works on simple estimators as well as on nested objects
 |      (such as :class:`~sklearn.pipeline.Pipeline`). The latter have
 |      parameters of the form ``<component>__<parameter>`` so that it's
 |      possible to update each component of a nested object.
 |
 |      Parameters
 |      ----------
 |      **params : dict
 |          Estimator parameters.
 |
 |      Returns
 |      -------
 |      self : estimator instance
 |          Estimator instance.
```
</div></details><br>

해당 함수의 [공식문서](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html)와 비교해보면 동일한 설명을 출력해주는 것을 알 수 있다.  

[응시환경 체험](https://dataq.goorm.io/exam/116674/%EC%B2%B4%ED%97%98%ED%95%98%EA%B8%B0/quiz/3)에서도 동일하게 출력되는 것을 확인할 수 있다.  