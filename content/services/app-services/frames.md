---
title: "The V3IO Frames Service"
description: "Get introduced to using the V3IO Frames multi-model DataFrame Python library in the Iguazio MLOps Platform."
keywords: "v3io frames, frames, structured dataframes, dataframes, nosql, key-value, kv, time-series databases, time series, tsdb, python libraries, python packages, python apis, python, jupyter, jupyter notebook, jupyter tutorials, v3io tutorials, tutorials, open source"
menu:
  main:
    name:       "V3IO Frames"
    parent:     "app-services"
    identifier: "frames-service"
    weight:     45
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title and
  other front-matter fields should use product.frames.name.xxx data variables.
-->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#frames. -->
{{< /comment >}}
<!-- [FRAMES-STREAMING-NO-SUPPORT] [IntInfo] See info in
  data-layer/reference/frames/stream.IGNORED/_index.html. TODO: When we support
  Frames streaming, edit the content, add streaming keywords in the front
  matter, and  add streaming links to the "See Also" section. -->

{{< public-gh ghid="frames" link="1" k="text_long" >}} is  multi-model open-source data-access library that provides a unified high-performance Python DataFrame API for working with NoSQL, stream, and time-series (TSDB) data in the {{< product lc >}}'s data store.
For more information and detailed usage instructions, see the [{{< getvar v="product.frames.name.lc" >}} API reference]({{< xref f="data-layer/reference/frames/" t="url" >}}).
As indicated in this reference, you can find many examples of using the {{< getvar v="product.frames.name.lc" >}} API in the {{< product lc >}}'s {{< public-gh ghid="tutorials" link="1" path="/" k="text_jupyter_long" >}}; see specifically the [<file>frames.ipynb</file>]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/frames.ipynb) notebook.
See also the {{< getvar v="product.frames.name.lc" >}} restrictions in the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="frames" >}} documentation.

{{< getvar v="product.frames.name.sc" >}} is provided as a default (pre-deployed) shared single-instance tenant-wide {{< product lc >}} service (`{{< verkey k="frames.service_display_name" >}}`).

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="data-layer/reference/frames/" >}}
- {{< xref f="services/app-services/python-ds-pkgs" >}}
- {{< xref f="services/app-services/spark.md" >}}
- {{< xref f="services/app-services/dask.md" >}}
- {{< xref f="data-layer/nosql/" >}}
- {{< xref f="data-layer/tsdb/" >}}
- [{{< getvar v="product.frames.name.sc" >}} software specifications and restrictions]({{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="frames" t="url" >}})

