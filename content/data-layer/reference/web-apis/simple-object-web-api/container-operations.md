---
title: "Container Operations"
keywords: "container operations, containers, simple objects, S3, REST, RESTful, HEAD, find container, container access permissions, GET Container, get objects, GET Service, list containers, get containers, access permissions, security, authentication, authorization, cluster-management apis, management apis, container managment web api, management, dashboard"
menu:
  main:
    parent:       "simple-object-web-api"
    identifier:   "simple-object-web-api-container-ops"
    weight:       10
---

Containers resemble Amazon S3 buckets, but unlike S3 buckets, containers can be used to store any type of data.
Containers are created and managed either from the {{< productUI lc >}} or by using the RESTful {{< xref f="cluster-mgmt/reference/management-apis/containers-api/" text="Containers Management API" >}} {{< beta mark="1" >}}.
You can also perform some container operations through the Simple-Object Web API:

- <a id="GET_Service"></a><def>GET Service</def> &mdash; lists the containers that are visible to the user who sent the request, according to its tenant.
    {{< comment >}}<!-- AWS S3 GET Service:
      https://docs.aws.amazon.com/AmazonS3/latest/API/RESTServiceOps.html?shortFooter=true
    -->
    {{< /comment >}}

- <a id="GET_Container"></a><def>GET Container</def> &mdash; returns the objects that are stored in the data container.
    {{< comment >}}<!-- GET Bucket (List Objects) Version 2:
      https://docs.aws.amazon.com/AmazonS3/latest/API/v2-RESTBucketGET.html?shortFooter=true
    -->
    {{< /comment >}}

- <a id="HEAD_Container"></a><def>HEAD Container</def> &mdash; checks whether a container exists and the user has permission to access it.
    {{< comment >}}<!-- AWS S3 HEAD Bucket
      https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketHEAD.html?shortFooter=true
    -->
    {{< /comment >}}

{{< note id="s3-web-api-examples-note" >}}
You can find examples of Simple Object Web-API container-operation requests in the {{< xref f="data-layer/containers/working-with-containers.md" >}} tutorial.
{{< /note >}}

