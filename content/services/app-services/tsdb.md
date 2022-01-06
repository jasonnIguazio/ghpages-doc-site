---
title:      "Time-Series Database (TSDB) Services"
linktitle:  "TSDB application services"
description: "Get introduced to the time-series database (TSDB) services of the Iguazio MLOps Platform."
keywords: "time-series database services, tsdb services, v3io tsdb library, v3io tsdb, time series databases, time-series, tsdb, v3io tsdb cli, tsdb cli, tsdbctl, v3io prometheus, prometheus, v3io frames, frames, v3io tsdb nuclio functions, tsdb nuclio functions, nuclio, jupyter, jupyter notebook, jupyter terminals, web shell, shell, open source"
menu:
  main:
    name:       "Time-Series Database (TSDB)"
    parent:     "app-services"
    identifier: "tsdb-services"
    weight:     30
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#tsdb. -->
{{< /comment >}}

Time-series databases (TSDBs) are used for storing time-series data &mdash; a series of time-based data points.
The {{< product lc >}} features enhanced built-in support for working with TSDBs, which includes a rich set of features for efficiently analyzing and storing time series data.
The {{< product lc >}} uses the {{< public-gh ghid="tsdb" k="text_long" link="1" >}} open-source library, which exposes a high-performance API for working with TSDBs &mdash; including creating and deleting TSDB instances (tables) and ingesting and consuming (querying) TSDB data.
This API can be consumed in various ways:

- Use the {{< getvar v="product.tsdb.name.lc" >}} command-line interface (CLI) tool (<file>{{< getvar v="product.tsdb.cli.name" >}}</file>), which is pre-deployed in the {{< product lc >}}, to easily create, delete, and manage TSDB instances (tables) in the {{< product lc >}}'s data store, ingest metrics into such tables, and issue TSDB queries.
    The CLI can be run locally on a {{< product lc >}} cluster &mdash; from a command-line shell interface, such as the web-based shell or a Jupyter terminal or notebook &mdash; or remotely from any computer with a network connection to the cluster.
    The {{< product lc >}}'s web shell and Jupyter terminal environments predefine a `{{< tsdb-cli >}}` alias to the native CLI that preconfigures the URL of the web-APIs service and the authentication access key for the running user of the parent shell or Jupyter Notebook service.
- <a id="prometheus"></a>Use the Prometheus service service to run TSDB queries.
    {{< url v="prometheus_home" k="text" link="1" >}} is an open-source systems monitoring and alerting toolkit that features a dimensional data model and a flexible query language.
    The {{< product lc >}}'s Prometheus service uses the pre-deployed {{< public-gh ghid="prometheus" link="1" k="text_long" >}} distribution, which packages Prometheus with the {{< getvar v="product.tsdb.name.lc" >}} library for a robust, scalable, and high-performance TSDB solution.

For more information and examples, see {{< xref f="data-layer/tsdb/" >}} (including a {{< xref f="data-layer/tsdb/tsdb-cli.md" text="TSDB CLI guide" >}}), as well as the TSDB section in the [<file>frames.ipynb</file>]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/frames.ipynb) tutorial Jupyter notebook.
{{< comment >}}<!-- [Info] (sharonl) (16.4.19) Adi asked that we refer to the
  Frames tutorial Jupyter notebook, even though Frames is currently a Tech
  Preview feature, because this is the only tutorial that currently has a
  dedicated section for TSDB, although we plan to add a dedicated TSDB tutorial.
  [c-jupyter-tutorial-nb-tsdb] TODO: When we add a TSDB tutorial NB, edit the
  doc here and in the TSDB tutorials. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="data-layer/reference/frames/tsdb/" >}}
- {{< xref f="data-layer/tsdb/" >}}
    - {{< xref f="data-layer/tsdb/working-with-tsdbs.md" >}}
    - {{< xref f="data-layer/tsdb/tsdb-cli.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb" text="TSDB software specifications and restrictions" >}}

