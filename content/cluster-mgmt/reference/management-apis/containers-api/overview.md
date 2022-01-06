---
title:      "Overview of the Containers Management API"
linktitle:  "Overview"
keywords: "containers management api, containers api, management, containers management, containers, Create Container, Delete Container, List Containers, container names, container IDs, names, /api/containers, api endpoints"
menu:
  main:
    parent:     "mgmt-containers-api"
    identifier: "mgmt-containers-api-overview"
    weight:     5
---

The {{< product lc >}}'s Containers Management API ("**the Containers API**") is used to create and manage {{< xref f="data-layer/containers/" text="data containers" >}}.

-  To create a new container, use <api>{{< xref f="cluster-mgmt/reference/management-apis/containers-api/create-container.md" >}}</api>.

-  To return information about all the containers that are visible to the user who sent the request, or about a specific container, use <api>{{< xref f="cluster-mgmt/reference/management-apis/containers-api/list-containers.md" >}}</api>.

-  To delete a container, use <api>{{< xref f="cluster-mgmt/reference/management-apis/containers-api/delete-container.md" >}}</api>.

The Containers API is part of the cluster-management APIs and conforms to the related structure and syntax rules &mdash; see {{< xref f="cluster-mgmt/reference/management-apis/general-api-structure.md" >}}.<br/>
The API's endpoint is `/api/containers`.

The Containers API identifies containers by their IDs.
When creating a new container, you set the container name and get back the container ID.
See {{< xref f="data-layer/containers/container-names.md" >}}.

