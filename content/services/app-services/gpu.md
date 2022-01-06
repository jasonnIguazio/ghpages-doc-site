---
title:      "Running Applications over GPUs"
description: "Learn about running Iguazio MLOps Platform services overview graphics processing units (GPUs)."
keywords: "gpu support, gpu, graphical processing units, horovod, rapids, nvidia, cudf, cuml, keras, tensorflow, pytorch, nuclio, serverless functions, kubeflow mpi operator, mpi operator, mpi jobs, mpi, jupyter, jupyter notebook, deep learning, machine learning, ml, ml models, model training, performance"
menu:
  main:
    parent:     "app-services"
    identifier: "gpu-support"
    weight:     25
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#gpu.
  [InfInto] (sharonl) I decided to change the title from the previous section
  title - "GPU Support" - and move it out of the app-services overview. I
  created an app-services/horovod-mpi-operator.md page for the "MPI Operator"
  Horovod service ([c-mpi-operator-horovod-service]) that links to the current
  services/gpu.md page. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} supports accelerated code execution over {{< url v="nvidia_home" k="text" link="1" >}} graphics processing units (GPUs):

- <a id="gpu-nuclio"></a>You can run {{< xref f="services/app-services/nuclio.md" text="Nuclio serverless functions" >}} on GPUs.

- You can run GPU applications that use one of the following supported GPU libraries from a {{< product lc >}} Jupyter Notebook service with the {{< xref f="services/app-services/jupyter.md" a="jupyter-flavor-full-gpu" text="GPU flavor" >}}:

    - [Horovod](#horovod)
    - [RAPIDS](#rapids)

<!-- //////////////////////////////////////// -->
## Horovod {#horovod}
{{< comment >}}<!-- [c-mpi-operator-horovod-service] [IntInfo] See info in
  data/vars/product.toml. -->
{{< /comment >}}

The {{< product lc >}} has a default (pre-deployed) shared single-instance tenant-wide {{< url v="kubeflow_mpi_operator_home" k="text" link="1" >}} service (`{{< verkey k="horovod.service_display_name" >}}`), which facilitates Uber's {{< url v="horovod_home" k="text" link="1" >}} distributed deep-learning framework.
Horovod, which is already preinstalled as part of the {{< product lc >}}'s Jupyter Notebook service, is widely used for creating machine-learning models that are trained simultaneously over multiple GPUs or CPUs.

You can use Horovod to convert a single-GPU TensorFlow, Keras, or PyTorch model-training program to a distributed multi-GPU program.
The objective is to speed up your model training with minimal changes to your existing single-GPU code and without complicating the execution.
Note that you can also run Horovod code over CPUs with just minor modification.
For an example of using Horovod on the {{< product lc >}}, see the [image-classification-with-distributed-training demo]({{< public-gh ghid="mlrun_demos" path="/" >}}image-classification-with-distributed-training).

{{< note id="horovod-gpu-notes" >}}
- To run Horovod code, ensure that the `{{< verkey k="horovod.service_display_name" >}}` {{< product lc >}} service is enabled.
(This service is enabled by default.)
- <a id="horovod-dynamic-gpus-alloc-note"></a>Horovod applications allocate GPUs dynamically from among the available GPUs in the system; they don't use the GPU resources of the parent Jupyter Notebook service.
See also the [Jupyter GPU resources note](#jupyter-gpu-resources-note).
{{< /note >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (6.10.20) In consultation with Product
  (Gilad, Adi) and R&D (Oded, Orit), it was decided to keep the Horovod doc in
  the GPU section, even though it can also run over CPUs (as indicated in the
  docs), because users who don't use GPUs aren't likely to benefit from
  Horovod. See the "MPI Operator & Horovod" email thread, and specifically
  Gilad and Oded's 6.10.20 emails. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## RAPIDS {#rapids}

You can use NVIDIA's {{< url v="rapids_home" k="text" link="1" >}} open-source libraries suite to execute end-to-end data science and analytics pipelines entirely on GPUs.

To use the cuDF and cuML RAPIDS libraries, you need to create a RAPIDS Conda environment.
For example, you can run the following command from a Jupyter notebook or terminal to create a RAPIDS Conda environment named `rapids`:
```python
conda create -n rapids -c rapidsai -c nvidia -c anaconda -c conda-forge -c defaults ipykernel rapids={{% verkey k="rapids.version" %}} python={{% verkey k="rapids.example_python_ver" %}}) cudatoolkit={{% verkey k="cuda.version" %}}
```
For more information about using Conda to create Python virtual environments, see the {{< product lc >}}' [<file>{{< verkey k="jupyter_notebook.tutorials.virtual_env_nb.file" >}}</file>]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.virtual_env_nb.file" >}}) tutorial Jupyter notebook.

For a comparison of performance benchmarks using the cuDF RAPIDS GPU DataFrame library and pandas DataFrames, see the [<file>{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.gpu_rapids_cudf_benchmark_nb.file" >}}]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.gpu_rapids_cudf_benchmark_nb.file" >}}) tutorial notebook.

{{< note id="rapids-gpu-notes" >}}
- <a id="rapids-supported-gpus-note"></a>RAPIDS supports GPUs with the {{< url v="nvidia_pascal_arch" k="text" link="1" >}} architecture or better and [compute capability]({{< url v="cuda_gpus" k="full" >}}) 6.0+.
{{< comment >}}<!-- [IntInfo] (sharonl) (5.8.19) The GPU requirements were
added at Golan's request and the phrasing is based on the "Prerequisites"
section in the NVIDIA RAPIDS getting-started page
(https://rapids.ai/start.html#prerequisites); I only rephrased it very
slightly and added the link to the NVIDIA Pascal page, but I
intentionally didn't edit the "or better" and "6.0+" phrasings, even
though I would phrased it differently. See info in DOC IG-12605. -->
{{< /comment >}}
- <a id="rapids-jupyter-gpu-res-alloc-note"></a>RAPIDS applications use the GPU resource of the parent Jupyter Notebook service.
Therefore, you must configure at least one GPU resource for this service:
from the {{< productUI lc >}} <gui-title>Services</gui-title> page, select to edit your Jupyter Notebook service, select the <gui-title>Common Parameters</gui-title> tab, and set the <gui-label>Resources | GPU | Limit</gui-label> field to a value greater than zero.
See also the [Jupyter GPU resources note](#jupyter-gpu-resources-note).
{{< /note >}}

For more information about using RAPIDS to run applications over GPUs, see {{< xref f="data-layer/data-ingestion-and-preparation.md" a="gpu" text="" >}}.

<!-- //////////////////////////////////////// -->
## Jupyter GPU Resources Note {#jupyter-gpu-resources-note}

In environments with GPUs, you can use the common <gui-label>Resources | GPU | Limit</gui-label> parameter of the Jupyter Notebook service to guarantee the configured number of GPUs for use by each service replica.
In addition, you can enable scale to zero for a Jupyter Notebook service to automatically free up resources, including GPUs, when the service becomes idle, by checking the <gui-label>Enabled</gui-label> check box for the common <gui-label>Scale to zero</gui-label> parameter.
When configuring your Jupyter Notebook service, take the following into account:
while the Jupyter Notebook service is enabled and not scaled to zero, it monopolizes the configured amount of GPUs even when the GPUs aren't in use.
RAPIDS applications use the GPUs that were allocated for the Jupyter Notebook service from which the code is executed, while Horovod applications allocate GPUs dynamically and don't use the GPUs of the parent Jupyter Notebook service.
For example, on systems with limited GPU resources you might need to reduce the amount of GPU resources allocated to the Jupyter Notebook service or set it to zero to successfully run the Horovod code over GPUs.
{{< comment >}}<!-- [c-jupyter-scale-to-zero] [IntInfo] (sharonl) (30.6.20) The
  scale-to-zero option is supported also for environments with CPUs, but we
  recommend using it only with GPUs - see the v2.8.0 new-feature RN
  #new-jupyter-scale-to-zero and the related internal info + the info in the
  related v2.8.0 Requirement IG-11392 / DOC IG-13779. Also see the RN KI
  #ki-jupyter-scale-to-zero-wakeup-wo-service-admin-policy for v2.8.0 Bug
  IG-15862 (Won't Fix) / v2.10.0 Bug IG-15863 and the related internal info +
  the info in Bug IG-15862. Therefore, other than the release notes, we only
  mention the option here, in relation to GPUs. (Approved by Adi.)
  In v2.8.0 the "Scale to zero" option is enabled by default when creating a
  new Jupyter Notebook service. In v2.10.0 the option is disabled by default -
  see v2.10.0 Requirement IG-16287 / DOC IG-16307. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="services/app-services/horovod-mpi-operator.md" >}}
- {{< xref f="data-layer/data-ingestion-and-preparation.md" a="gpu" text="Running DataFrames on GPUs using NVIDIA cuDF" >}}
- {{< xref f="services/app-services/jupyter.md" >}}
- {{< xref f="services/app-services/nuclio.md" >}}

