---
published: true
layout: post
title: '[빅분기] 실기 대비 05'
description: >
    빅데이터 분석기사 실기 시험장에서 볼 수 있는 cheat sheet
categories: [DataAnalysis]
tags: [data analysis, Bigdata Certificate]
image:
    path: /assets/img/posts/bigdata_certi.png
related_posts:
    - _posts/dataanalysis/2022-09-17-bigdata_certi_04.md
    - _posts/dataanalysis/2022-11-26-bigdata_certi_06.md
---
* toc
{:toc}

{% include series_bigdatacerti.html %}

## dir, \_\_all\_\_

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

❗ pandas는 `__all__` 명령어를 지원하지 않아 아래와 같이 `dir` 함수를 써야 한다.  

```python
import pandas as pd

print(dir(pd.DataFrame))
```
```
['T', '_AXIS_LEN', '_AXIS_NAMES', '_AXIS_NUMBERS', '_AXIS_ORDERS', '_AXIS_REVERSED', '_AXIS_TO_AXIS_NUMBER', '_HANDLED_TYPES', '__abs__', '__add__', '__and__', '__annotations__', '__array__', '__array_priority__', '__array_ufunc__', '__array_wrap__', '__bool__', '__class__', '__contains__', '__copy__', '__deepcopy__', '__delattr__', '__delitem__', '__dict__', '__dir__', '__divmod__', '__doc__', '__eq__', '__finalize__', '__floordiv__', '__format__', '__ge__', '__getattr__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__iadd__', '__iand__', '__ifloordiv__', '__imod__', '__imul__', '__init__', '__init_subclass__', '__invert__', '__ior__', '__ipow__', '__isub__', '__iter__', '__itruediv__', '__ixor__', '__le__', '__len__', '__lt__', '__matmul__', '__mod__', '__module__', '__mul__', '__ne__', '__neg__', '__new__', '__nonzero__', '__or__', '__pos__', '__pow__', '__radd__', '__rand__', '__rdivmod__', '__reduce__', '__reduce_ex__', '__repr__', '__rfloordiv__', '__rmatmul__', '__rmod__', '__rmul__', '__ror__', '__round__', '__rpow__', '__rsub__', '__rtruediv__', '__rxor__', '__setattr__', '__setitem__', '__setstate__', '__sizeof__', '__str__', '__sub__', '__subclasshook__', '__truediv__', '__weakref__', '__xor__', '_accessors', '_accum_func', '_add_numeric_operations', '_agg_by_level', '_agg_examples_doc', '_agg_summary_and_see_also_doc', '_align_frame', '_align_series', '_arith_method', '_as_manager', '_box_col_values', '_can_fast_transpose', '_check_inplace_and_allows_duplicate_labels', '_check_inplace_setting', '_check_is_chained_assignment_possible', '_check_label_or_level_ambiguity', '_check_setitem_copy', '_clear_item_cache', '_clip_with_one_bound', '_clip_with_scalar', '_cmp_method', '_combine_frame', '_consolidate', '_consolidate_inplace', '_construct_axes_dict', '_construct_axes_from_arguments', '_construct_result', '_constructor', '_constructor_sliced', '_convert', '_count_level', '_data', '_dir_additions', '_dir_deletions', '_dispatch_frame_op', '_drop_axis', '_drop_labels_or_levels', '_ensure_valid_index', '_find_valid_index', '_from_arrays', '_from_mgr', '_get_agg_axis', '_get_axis', '_get_axis_name', '_get_axis_number', '_get_axis_resolvers', '_get_block_manager_axis', '_get_bool_data', '_get_cleaned_column_resolvers', '_get_column_array', '_get_index_resolvers', '_get_item_cache', '_get_label_or_level_values', '_get_numeric_data', '_get_value', '_getitem_bool_array', '_getitem_multilevel', '_gotitem', '_hidden_attrs', '_indexed_same', '_info_axis', '_info_axis_name', '_info_axis_number', '_info_repr', '_init_mgr', '_inplace_method', '_internal_names', '_internal_names_set', '_is_copy', '_is_homogeneous_type', '_is_label_or_level_reference', '_is_label_reference', '_is_level_reference', '_is_mixed_type', '_is_view', '_iset_item', '_iset_item_mgr', '_iset_not_inplace', '_iter_column_arrays', '_ixs', '_join_compat', '_logical_func', '_logical_method', '_maybe_cache_changed', '_maybe_update_cacher', '_metadata', '_min_count_stat_function', '_needs_reindex_multi', '_protect_consolidate', '_reduce', '_reindex_axes', '_reindex_columns', '_reindex_index', '_reindex_multi', '_reindex_with_indexers', '_replace_columnwise', '_repr_data_resource_', '_repr_fits_horizontal_', '_repr_fits_vertical_', '_repr_html_', '_repr_latex_', '_reset_cache', '_reset_cacher', '_sanitize_column', '_series', '_set_axis', '_set_axis_name', '_set_axis_nocheck', '_set_is_copy', '_set_item', '_set_item_frame_value', '_set_item_mgr', '_set_value', '_setitem_array', '_setitem_frame', '_setitem_slice', '_slice', '_stat_axis', '_stat_axis_name', '_stat_axis_number', '_stat_function', '_stat_function_ddof', '_take_with_is_copy', '_to_dict_of_blocks', '_typ', '_update_inplace', '_validate_dtype', '_values', '_where', 'abs', 'add', 'add_prefix', 'add_suffix', 'agg', 'aggregate', 'align', 'all', 'any', 'append', 'apply', 'applymap', 'asfreq', 'asof', 'assign', 'astype', 'at', 'at_time', 'attrs', 'axes', 'backfill', 'between_time', 'bfill', 'bool', 'boxplot', 'clip', 'columns', 'combine', 'combine_first', 'compare', 'convert_dtypes', 'copy', 'corr', 'corrwith', 'count', 'cov', 'cummax', 'cummin', 'cumprod', 'cumsum', 'describe', 'diff', 'div', 'divide', 'dot', 'drop', 'drop_duplicates', 'droplevel', 'dropna', 'dtypes', 'duplicated', 'empty', 'eq', 'equals', 'eval', 'ewm', 'expanding', 'explode', 'ffill', 'fillna', 'filter', 'first', 'first_valid_index', 'flags', 'floordiv', 'from_dict', 'from_records', 'ge', 'get', 'groupby', 'gt', 'head', 'hist', 'iat', 'idxmax', 'idxmin', 'iloc', 'index', 'infer_objects', 'info', 'insert', 'interpolate', 'isin', 'isna', 'isnull', 'items', 'iteritems', 'iterrows', 'itertuples', 'join', 'keys', 'kurt', 'kurtosis', 'last', 'last_valid_index', 'le', 'loc', 'lookup', 'lt', 'mad', 'mask', 'max', 'mean', 'median', 'melt', 'memory_usage', 'merge', 'min', 'mod', 'mode', 'mul', 'multiply', 'ndim', 'ne', 'nlargest', 'notna', 'notnull', 'nsmallest', 'nunique', 'pad', 'pct_change', 'pipe', 'pivot', 'pivot_table', 'plot', 'pop', 'pow', 'prod', 'product', 'quantile', 'query', 'radd', 'rank', 'rdiv', 'reindex', 'reindex_like', 'rename', 'rename_axis', 'reorder_levels', 'replace', 'resample', 'reset_index', 'rfloordiv', 'rmod', 'rmul', 'rolling', 'round', 'rpow', 'rsub', 'rtruediv', 'sample', 'select_dtypes', 'sem', 'set_axis', 'set_flags', 'set_index', 'shape', 'shift', 'size', 'skew', 'slice_shift', 'sort_index', 'sort_values', 'sparse', 'squeeze', 'stack', 'std', 'style', 'sub', 'subtract', 'sum', 'swapaxes', 'swaplevel', 'tail', 'take', 'to_clipboard', 'to_csv', 'to_dict', 'to_excel', 'to_feather', 'to_gbq', 'to_hdf', 'to_html', 'to_json', 'to_latex', 'to_markdown', 'to_numpy', 'to_parquet', 'to_period', 'to_pickle', 'to_records', 'to_sql', 'to_stata', 'to_string', 'to_timestamp', 'to_xarray', 'to_xml', 'transform', 'transpose', 'truediv', 'truncate', 'tshift', 'tz_convert', 'tz_localize', 'unstack', 'update', 'value_counts', 'values', 'var', 'where', 'xs']
```

## help

클래스나 함수에 대한 설명은 아래와 같이 `help` API를 사용해서 출력할 수 있다.  

```python
from sklearn import linear_model

help(linear_model.LinearRegression)
```

<details><summary>terminal</summary><div markdown="1">
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

해당 함수의 [공식 문서](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html)와 비교해보면 동일한 설명을 출력해주는 것을 알 수 있다.  

[응시환경 체험](https://dataq.goorm.io/exam/116674/%EC%B2%B4%ED%97%98%ED%95%98%EA%B8%B0/quiz/3)에서도 동일하게 출력되는 것을 확인할 수 있다.  

---
## Reference
- [주피터 노트북](https://github.com/djccnt15/bigdata_certi/blob/main/cheatsheet.ipynb)