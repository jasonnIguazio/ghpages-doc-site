---
title:   "APIs Overview"
keywords: "apis overview, overview, introduction, apis, web apis, REST, RESTful, simple objects, S3, data-service web apis, streaming, nosql, key value, KV, scala, python, spark, spark streaming, hadoop, hcfs, hdfs, file system, FUSE, management apis, dashboard"
menu:
  main:
    parent:     "intro"
    identifier: "apis-overview"
    weight:     60
---

The {{< product lc >}} exposes the following application programming interfaces (APIs).

- **Data science and MLOps APIs** &mdash; the {{< product lc >}} integrates {{< company >}}'s open-source MLRun machine-learning operations (MLOps) orchestration framework and Nuclio serverless-functions framework.
    For detailed information about these frameworks and their APIs, see {{< xref f="ds-and-mlops/" >}}.

- **Data-layer APIs** &mdash; the {{< product lc >}} exposes multiple APIs for working with data of all types &mdash; NoSQL ("key-value") databases, time-series databases (TSDBs), streams, and simple objects (files) &mdash; including the following APIs.
    For detailed information, see the data-layer {{< xref f="data-layer/apis/overview" text="APIs overview" >}} and {{< xref s="data-layer/reference/" text="API references" >}}.

    - The {{< getvar v="product.python_sdk.name.full" >}} for working with NoSQL and stream data
    - The {{< getvar v="product.frames.name.full" >}} DataFrame API for working with NoSQL and time-series data
          {{< comment >}}<!-- [FRAMES-STREAMING-NO-SUPPORT] -->
          {{< /comment >}}
    - Spark SQL and DataFrames and streaming APIs, including the {{< product lc >}}'s proprietary APIs for working with NoSQL and stream data
    - The {{< product lc >}}'s simple-object, NoSQL, and streaming RESTful web APIs
    - Local Linux file-system and Hadoop Compatible File System (HCFS) commands for working with files (simple objects)

- **Cluster-Management APIs ("Management APIs")** {{< beta mark="1" >}} &mdash; the {{< product lc >}} exposes REST APIs for performing administrative cluster-management operations.
    For detailed information, see the {{< xref f="cluster-mgmt/reference/management-apis/" text="cluster-management APIs reference" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="ds-and-mlops/" >}}
- {{< xref s="data-layer/apis/overview.md" >}}
- {{< xref f="data-layer/reference" >}}
- {{< xref f="cluster-mgmt/reference/" >}}
- {{< xref f="cluster-mgmt/logging-n-debugging.md" a="api-error-info" text="API Error Information" >}}
- {{< xref s="intro" f="introduction.md" >}}
- {{< xref s="services" >}}

