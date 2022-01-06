---
title: "The Platform's Application Services"
description: "Learn about the application services of the Iguazio MLOps Platform."
keywords: "application services, services, managed services, managed application services, integrated services, integrated application services, pre-deployed services, preinstalled services, ecosystem, development ecosystem, open source"
layout: "section-list"
menu:
  main:
    parent:     "services"
    identifier: "app-services"
    weight:     28
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title should
  use {{< product tc >}}. -->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] This section replaces
  intro/ecosystem/app-services.md and intro/serverless.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to intro/ecosystem/app-services.md
  and perhaps also references the to intro/ecosystem/ section (from
  welcome.ipynb/README.md) with a reference to this new doc section and/or
  specific pages in this section, including editing the link text. (Until then
  and for previous tutorials releases, we'll have URL redirect rules as part of
  the restructured-site publication.) After updating the tutorials link, add
  the following internal comment here: -->
<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from welcome.ipynb/README.md). -->
{{< /comment >}}

The {{< product lc >}}'s application development ecosystem includes

- Distributed data frameworks and engines &mdash; such as {{< xref f="services/app-services/spark.md" text="Spark" >}}, {{< xref f="services/app-services/presto.md" text="Presto" >}}, {{< xref f="services/app-services/horovod-mpi-operator" text="Horovod" >}}, and {{< xref f="services/app-services/hadoop.md" text="Hadoop" >}}.
- The {{< xref f="services/app-services/nuclio.md" text="Nuclio serverless framework" >}}.
- Enhanced support for {{< xref f="data-layer/tsdb/"  text="time-series databases">}} (TSDBs) &mdash; including a CLI tool, serverless functions, and integration with Prometheus.
- {{< xref f="services/app-services/jupyter.md" text="Jupyter Notebook" >}} and for development and testing of data science and general data applications.
- A {{< xref f="services/app-services/web-shell.md" text="web-based shell" >}} shell) service and {{< xref f="services/app-services/jupyter.md" text="Jupyter terminals" >}}, which provide bash command-line shells for running application services and performing basic file-system operations.
- Integration with popular {{< xref f="services/app-services/python-ds-pkgs.md" text="Python machine-learning and scientific-computation packages" >}} for development of ML and artificial intelligence (AI) applications &mdash; such as TensorFlow, Keras, scikit-learn, pandas, PyTorch, Pyplot, and NumPy.
- Integration with common Python libraries that enable high-performance Python based data processing &mdash; such as {{< xref f="services/app-services/dask.md" text="Dask" >}} and {{< xref f="services/app-services/gpu.md" a="rapids" text="RAPIDS" >}}.
- Support for {{< xref f="services/app-services/mlops-services.md" tex="automating and tracking data science tasks and workflows (MLOps)" >}} using the MLRun library and Kubeflow Pipelines &mdash; including defining, running, and tracking managed, scalable, and portable ML tasks and full workflow pipelines.
- The {{< xref f="services/app-services/frames.md" textvar="product.frames.name.long_lc" >}} open-source unified high-performance DataFrame API library for working with NoSQL, stream, and time-series data in the {{< product lc >}}.
- Support for {{< xref f="services/app-services/gpu.md" text="executing code over GPUs" >}}.
- Integration with {{< xref f="services/app-services/data-monitoring-and-visualization-services.md" text="data analytics, monitoring, and visualizations tools" >}} &mdash; including built-in integration with the open-source Grafana metric analytics and monitoring tool and easy integration with commercial business-intelligence (BI) analytics and visualization tools such as Tableau, Looker, and QlikView.
- {{< xref f="services/app-services/logging-and-monitoring-services.md" text="Logging and monitoring services" >}} for monitoring, indexing, and viewing application-service logs &mdash; including a log-forwarder service and integration with Elasticsearch.

For basic information about how to manage and create services in the {{< productUI lc >}}, see {{< xref f="services/fundamentals.md" >}}.
For detailed service specifications, see the {{< product lc >}}'s {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}}.

{{< note id="alphabteical-services-list-note" >}}
If you're looking for a specific service or tool, see also the {{< xref f="services/app-services/overview.md" a="services-list" text="alphabetical list of supported services and tools" >}} in the application services overview.
{{< /note >}}

