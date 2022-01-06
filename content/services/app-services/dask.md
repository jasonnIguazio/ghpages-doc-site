---
title: "Dask"
description: "Get introduced to using the Dask parallel-computation Python library in the Iguazio MLOps Platform."
keywords: "dask, parallel computation, parallel computing, parallel anayltics, parallelizm, data analytics, anayltics, scaling, performance, python libraries, python packages, python apis, python, jupyter, jupyter notebook, jupyter tutorials, v3io tutorials, tutorials, dask-cluster, open source"
menu:
  main:
    parent:     "app-services"
    identifier: "dask-service"
    weight:     40
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces the Dask part in
  intro/ecosystem/app-services.md#pandas-and-dask. -->
{{< /comment >}}

{{< url v="dask_home" k="text" link="1" >}} is a parallel-computation Python library that features scaled pandas DataFrames and allows running distributed Python code that performs fast Python based data processing.

You can easily install Dask on your {{< product lc >}} cluster &mdash; for example, by using {{< url v="pip_home" k="text" link="1" >}} or {{< url v="conda_home" k="text" link="1" >}}.
Dask is pre-deployed in the {{< product lc >}}'s {{< xref f="services/app-services/jupyter.md" text="Jupyter Notebook service" >}}.
{{< comment >}}<!-- [IntInfo] (sharonl) (15.2.21) Uri confirmed that Dask is
  preinstalled in our Jupyter Notebook service. -->
{{< /comment >}}

You can find examples of using Dask in the {{< product lc >}}'s {{< public-gh ghid="tutorials" link="1" path="/" k="text_jupyter_long" >}}.
See specifically the [**dask-cluster**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/dask-cluster.ipynb) tutorial.

For more information about using Dask in the {{< product lc >}}, see {{< xref f="data-layer/data-ingestion-and-preparation.md" a="dask" >}}.
For general information about Dask and how to use it, see the {{< url v="dask_docs" k="text" link="1" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="data-layer/data-ingestion-and-preparation.md" a="dask" text="Running Distributed Python Code with Dask" >}}
- {{< xref f="services/app-services/python-ds-pkgs.md" >}}
- {{< xref f="services/app-services/gpu.md" >}}

