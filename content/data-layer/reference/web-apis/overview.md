---
title:      "Overview of the Web APIs"
linktitle:  "Web-APIs Overview"
description:  "Overview of the Iguazio MLOps Platform RESTful web APIs"
keywords: "web apis, REST, RESTful, simple-obejct web api, data-service web apis, web-api structure, api structure, streaming web api, nosql web api, streaming, nosql, http, python"
menu:
  main:
    name:       "Overview"
    parent:     "web-apis"
    identifier: "web-apis-overview"
    weight:     10
---

The {{< product lc >}} provides the following web APIs:

- {{< xref f="data-layer/reference/web-apis/simple-object-web-api/" >}} for working with data as simple data objects using an S3-like interface.

- Data-service web APIs for complex manipulation of specific data types (see the {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}} section for high-level structure and syntax details) &mdash;

    - {{< xref f="data-layer/reference/web-apis/streaming-web-api/" >}} for working with data streams.

    - {{< xref f="data-layer/reference/web-apis/nosql-web-api/" >}} for working with NoSQL data objects.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/web-apis/security.md" >}}
- {{< xref f="data-layer/apis/data-paths.md" a="data-paths-rest-apis" text="RESTful Web and Management API Data Paths" >}}
- {{< xref f="data-layer/containers/working-with-containers.md" >}} and {{< xref f="data-layer/objects/ingest-n-consume-files.md" >}} tutorials &mdash; including web-API examples
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="web-apis" text="Web-APIs software specifications and restrictions" >}}

