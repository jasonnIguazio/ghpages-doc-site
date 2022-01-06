---
title: "The Jupyter Notebook Service"
description: "Get introduced to the Jupyter Notebook service of the Iguazio MLOps Platform."
keywords: "jupyter, jupyter notebook, jupyterlab, jupyter terminals, web notebooks, jupyter tutorials, v3io tutorials, v3io, tutorials, command-line shell, command line, shell, spark, presto, presto cli, sql queries, sql, python, open source"
menu:
  main:
    name:       "Jupyter"
    parent:     "app-services"
    identifier: "jupyter-service"
    weight:     15
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#jupyter. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

{{< url v="jupyter_home" k="text" link="1" >}} is a project for development of open-source software, standards, and services for interactive computation across multiple programming languages.
The {{< product sc >}} comes preinstalled with the {{< url v="jupyterlab_docs" k="base" k2="text" link="1" >}} web-based user interface, including {{< url v="jupyter_notebook_docs" k="base" k2="text" link="1" >}} and {{< url v="jupyterlab_docs" k="terminals" k2="text" link="1" >}}, which are available via a Jupyter Notebook user application service.

Jupyter Notebook is an open-source web application that allows users to create and share documents that contain live code, equations, visualizations, and narrative text; it's currently the leading industry tool for data exploration and training.
Jupyter Notebook supports integration with all key analytics services, enabling users to perform all stages of the data science flow, from data collection to production, from a single interface using various APIs and tools to concurrently access the same data without having to move the data.
Your Jupyter Notebook code can execute Spark jobs (for example, using Spark DataFrames); run SQL queries using Presto; define, deploy, and trigger Nuclio serverless functions; send web-API requests; use pandas and V3IO Frames DataFrames; use the Dask library to scale the use of pandas DataFrames; and more.
You can use {{< url v="conda_home" k="text" link="1" >}} and {{< url v="pip_home" k="text" link="1" >}}, which are available as part of the Jupyter Notebook service, to easily install Python packages such as {{< xref f="services/app-services/dask.md" text="Dask" >}} and {{< xref f="services/app-services/python-ds-pkgs.md" text="machine-learning and computation packages" >}}.
In addition, you can use Jupyter terminals to execute shell commands, such as file-system and installation commands.
As part of the configuration of the {{< product lc >}}'s Jupyter Notebook service you select a specific [Jupyter flavor](#jupyter-flavors) and you can optionally define environment variables for the service.

{{< company >}} provides {{< public-gh ghid="tutorials" link="1" path="/" k="text_jupyter_long" >}} with code examples ranging from getting-started examples to full end-to-end demo applications, including detailed documentation.
Start out by reading the introductory [<file>{{< verkey k="jupyter_notebook.tutorials.welcome_nb.file" >}}</file>]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.welcome_nb.file" >}}) notebook (available also as a Markdown [<file>README.md</file>]({{< public-gh ghid="tutorials" path="/" >}}README.md) file), which is similar to the {{< xref f="intro/introduction.md" text="introduction" >}} on the documentation site.
Then, proceed to the [**getting-started tutorial**]({{< public-gh ghid="mlrun_demos" path="/" >}}{{< verkey k="mlrun.demos.gs_tutorial.dir_name" >}}/README.md).

<!-- //////////////////////////////////////// -->
## Jupyter Flavors {#jupyter-flavors}
{{< comment >}}<!-- [IntInfo] (sharonl) See DOC IG-12699. -->
{{< /comment >}}

In version {{< productVersion num >}} of the {{< product lc >}}, you can set the custom <gui-label>Flavor</gui-label> parameter of the Jupyter Notebook service to one of the following flavors to install a matching Jupyter Docker image:

<dl>
  <dt id="jupyter-flavor-full">{{< verkey k="jupyter_notebook.flavors.full" >}}</dt>
  {{< dd >}}A full version of Jupyter for execution over central processing units (CPUs).
  {{< /dd >}}
  <dt id="jupyter-flavor-full-gpu">{{< verkey k="jupyter_notebook.flavors.full_gpu" >}}</dt>
  {{< dd >}}A full version of Jupyter for execution over graphics processing units (GPUs).
    This flavor is available only in environments with GPUs and is sometimes referred to in the documentation as the Jupyter **"GPU flavor"**.
    For more information about the {{< product lc >}}'s GPU support, see {{< xref f="services/app-services/gpu.md" >}}.
  {{< /dd >}}
</dl>

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] TODO: Add more see-also links. -->
{{< /comment >}}

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="intro/introduction.md" a="the-tutorial-notebooks" text="The tutorial Jupyter notebooks" >}}
- {{< xref f="services/app-services/web-shell.md" >}}
- {{< xref f="services/app-services/python-ds-pkgs.md" >}}
- {{< xref f="services/app-services/dask.md" >}}
- {{< xref f="services/app-services/mlops-services.md" >}}
- {{< xref f="services/app-services/gpu.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="jupyter" text="Jupyter software specifications and restrictions" >}}
`
