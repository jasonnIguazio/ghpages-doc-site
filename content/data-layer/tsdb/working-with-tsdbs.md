---
title: "Working with Time-Series Databases (TSDBs)"
description: "Learn how to work with time-series data (TSDB) in the Iguazio MLOps Platform."
keywords: "working with time-series databases, working with tsdbs, time-series databaes, tsdb, time series, v3io tsdb, tsdb cli, tsdbctl, v3io-python sdk tsdb api, v3io-python sdk, v3io-py tsdb api, v3io-py, v3io frames tsdb backend, v3io frames tsdb api, v3io frames, frames tsdb api, frames tsdb, v3io tsdb nuclio functions, tsdb nuclio functions, tsdb nuclio serverless function, tsdb serverless functions"
menu:
  main:
    parent:     "data-layer-tsdb"
    identifier: "working-with-tsdbs"
    weight:     10
---
{{< comment >}}<!-- Replaces tutorials/tsdb/_index.md.
- [TODO-SITE-RESTRUCT-P3] TODO: Edit further. 
-->
{{< /comment >}}
{{< comment >}}<!-- !!IMPORTANT!! [c-ui-ref-tsdb-doc] Starting with v.2.0.0,
  we refer to this documentation from the dashboard (UI) TSDB Nuclio functions
  custom service parameters screen (see my 28.2.19 email on the
  "TSDB Nuclio Functions service configuration" email thread, copied in the
  comments of DOC IG-9653. (28.2.19) It's not certain yet whether the UI
  text update with this doc ref will be included in the v2.0.0 release. -->
<!-- [TODO-TSDB] [V2.0-TODO-TSDB] See DOC IG-9810.
- Document the TSDB Nuclio functions - #1 ingestion; #2 query.
- [TODO-PROMETHEUS] Mention the option of using the Prometheus service to
  create Prometheus dashboards for querying TSDB tables.
- [TODO-TSDB-DOC-RESTRUCT] Move content from this page and its children to a
  new TSDB concepts page (and edit + add more info), and edit the content in
  this tutorials section accordingly.
- Add references to this section/specific pages and to any additional TSDB doc.
-->
{{< /comment >}}

The {{< product lc >}} comes pre-deployed with the {{< getvar v="product.tsdb.name.long" >}} library (**"{{< getvar v="product.tsdb.name.lc" >}}"**) for working with data in time-series databases (TSDBs).
This library exposes a high-performance API for creating, updating, querying, and deleting time series databases. You can access the API with:
- The {{< getvar v="product.tsdb.name.lc" >}} CLI tool (tsdbctl) that is pre-deployed as part of the default {{< product lc >}} installation, for seamless integration with the {{< product lc >}}.
- The TSDB APIs included in the pre-deployed {{< product lc >}} application services {{< getvar v="product.frames.name.long_sc" >}}, which expose a Python API. 

{{< getvar v="product.tsdb.name.sc" >}} was developed by {{< company >}} as an open-source project. The full {{< getvar v="product.tsdb.name.lc" >}} source code is in the public {{< public-gh ghid="tsdb" k="text" link="1" >}} GitHub repository.
{{< comment >}}<!-- [IntInfo] See [c-tsdb-components] in data/vars/product.toml.
-->
{{< /comment >}}

{{< comment >}}<!-- [TODO-v3io-py-SDK] [DOC IG-15596] TODO: Add a reference to
  the v3io-py SDK's TSDB API. [SITE-RESTRUCT-P2] -->
{{< /comment >}}

{{< note id="tsdb-restrictions-note" >}}
For restrictions related to the {{< product lc >}}'s TSDB support, refer to the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb" >}}.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT-32] TODO: Add more see-also links. -->
{{< /comment >}}

- {{< xref f="data-layer/tsdb/tsdb-cli.md" >}}
- {{< xref f="data-layer/data-ingestion-and-preparation.md" a="frames" text="Accessing Platform NoSQL and TSDB Data Using the Frames Library" >}}
- {{< xref f="data-layer/reference/frames/tsdb/" >}}
- {{< xref f="data-layer/" >}}

