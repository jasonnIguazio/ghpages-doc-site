---
title:      "Overview of the Simple-Objet Web API"
linktitle:  "Simple-Object Web API Overview"
description:  "Overview of the Iguazio MLOps Platform Simple-Object Web-API, including data-object and container APIs"
keywords: "simple-object web api, api reference, simple objects, S3, REST, RESTful, Amazon, AWS, containers, data objects, appending data"
menu:
  main:
    name:         "Overview"
    parent:       "simple-object-web-api"
    identifier:   "simple-object-web-api-overview"
    weight:       5
---

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

The {{< product lc >}}'s Simple-Object Web API enables working with {{< xref f="data-layer/containers/" text="data containers" >}} and performing simple {{< xref f="data-layer/objects/" text="data-object" >}} operations via a RESTful interface that resembles Amazon's Simple Storage Service (S3) API. In addition to the S3-like capabilities, the Simple-Object Web API enables appending data to existing objects (see {{< xref f="data-layer/reference/web-apis/simple-object-web-api/data-object-operations.md" a="appending-data" text="Appending Data" >}}).

For information on how to secure your Simple-Object Web API requests &mdash; including support for HTTPS and HTTP user-authentication methods &mdash; see {{< xref f="data-layer/reference/web-apis/security.md" >}}.

For an overview of the Simple-Object Web API response syntax, see the response-syntax documentation in the {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="response-syntax" >}} reference, which applies also to the Simple-Object Web API (with the exception of the error-information syntax in the response body).
{{< comment >}}<!-- [IntInfo] (sharonl)
- See [c-web-api-response-doc] in data-service-web-api-gen-struct.md. I also
  linked to the data-service web-APIs response doc in the "See Also" section.
- (28.8.19) Orit said that the error information that we return in the response
  body for the Simple-Object Web API requests doesn't follow the format of the
  data-service web-APIs error response nor isn't identical to the AWS S3 error
  responses
  (https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html).
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/objects/" >}}
- {{< xref f="data-layer/reference/web-apis/security.md" >}}
- {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="response-syntax" text="Response Syntax" >}} ({{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" t="title" >}})
- {{< xref f="data-layer/containers/working-with-containers.md" >}} and {{< xref f="data-layer/objects/ingest-n-consume-files.md" >}} tutorials &mdash; including Simple-Object Web API examples
  {{< comment >}}<!-- [c-web-api-response-doc] -->
  {{< /comment >}}

