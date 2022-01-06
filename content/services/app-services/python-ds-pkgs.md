---
title: "Python Machine-Learning and Scientific-Computation Packages"
description: "Get introduced to installing and using ML and scientific-computation packages on the Iguazio MLOps Platform."
keywords: "machine-learning and scientific computation packages, ML and scientific-computation packages, machine-learning packages, ML packages, scientific-programming packages, machine learning, ML, deep learning, model training, scientific computation, scientific computation, computation, keras, pyplot, pytorch, numpy, scikit-learn, sklearn, tensorflow, python libraries, python apis, python, cpu, gpu, jupyter, jupyter notebook, installation, open source"
menu:
  main:
    name:       "Python ML and Scientific Computation"
    parent:     "app-services"
    identifier: "ml-n-scientific-computation-packages"
    weight:     20
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#machine-learning-packages and the pandas
  section in intro/ecosystem/app-services.md#pandas-and-dask. -->
{{< /comment >}}

<a id="pandas"></a>The {{< product lc >}}'s {{< xref f="services/app-services/jupyter.md" text="Jupyter Notebook service" >}} pre-deploys the {{< url v="pandas_home" k="text" link="1" >}} open-source Python library for high-performance data processing using structured DataFrames ("pandas DataFrames").
The {{< product lc >}} also pre-deploys other Python packages that utilize pandas DataFrames, such the {{< xref f="services/app-services/dask.md" text="Dask" >}} parallel-computation library or {{< company >}}'s {{< public-gh ghid="python_sdk" link="1" path="/" k="text" >}} and {{< xref f="services/app-services/frames.md" textvar="product.frames.name.long_lc" >}} libraries.
{{< comment >}}<!-- [v3io-py-SDK-TODO] [DOC IG-15596] TODO: Link to a dedicated
  v3io-py SDK page when added (and also add a see-also link at the end). -->
{{< /comment >}}

You can easily install additional Python machine-learning (ML) and scientific-computation packages &mdash; such as {{< url v="tensorflow_home" k="text" link="1" >}}, {{< url v="keras_home" k="text" link="1" >}}, {{< url v="scikitlearn_home" k="text" link="1" >}}, {{< url v="pytorch_home" k="text" link="1" >}}, {{< url v="pyplot_home" k="text" link="1" >}}, and {{< url v="numpy_home" k="text" link="1" >}}.
The {{< product lc >}}'s architecture was designed to deploy computation to one or more CPU or GPU with a single Python API.

For example, you can install the TensorFlow open-source library for numerical computation using data-flow graphs.
You can use TensorFlow to train a logistic regression model for prediction or a deep-learning model, and then deploy the same model in production over the same {{< product lc >}} instance as part of your operational pipeline.
The data science and training portion can be developed using recent field data, while the development-to-production workflow is automated and time to insights is significantly reduced.
All the required functionality is available on a single platform with enterprise-grade security and a fine-grained access policy, providing you with visibility into the data based on the organizational needs of each team.
The following Python code sample demonstrates the simplicity of using the {{< product lc >}} to train a TensorFlow model and evaluate the quality of the model's predictions:

```python
model.train(
    input_fn=lambda: input_fn(train_data, num_epochs, True, batch_size))
results = model.evaluate(input_fn=lambda: input_fn(
    test_data, 1, False, batch_size))
for key in sorted(results):
    print('%s: %s' % (key, results[key]))
```

The [image-classification-with-distributed-training]({{< public-gh ghid="mlrun_demos" path="/" >}}image-classification-with-distributed-training) demo demonstrates how to build an image recognition and classification ML model and perform distributed model training by using Horovod, Keras, TensorFlow, and Nuclio.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="services/app-services/jupyter.md" >}}
- {{< xref f="services/app-services/dask.md" >}}
- {{< xref f="services/app-services/horovod-mpi-operator.md" >}}
- {{< xref f="services/app-services/gpu.md" >}}
- {{< xref f="services/app-services/mlops-services.md" >}}

