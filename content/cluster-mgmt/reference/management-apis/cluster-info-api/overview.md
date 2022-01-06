---
title:      "Overview of the Cluster-Information Management API"
linktitle:  "Overview"
keywords: "cluster-information management api, cluster-information api, management, cluster management, cluster information, Get Cluster Information, /api/cluster_info, api endpoints"
menu:
  main:
    parent:     "mgmt-cluster-info-api"
    identifier: "mgmt-cluster-info-api-overview"
    weight:     5
---
The {{< product lc >}}'s Cluster-Information Management API ("**the Cluster-Information API**") supports a <api>{{< xref f="cluster-mgmt/reference/management-apis/cluster-info-api/get-cluster-information.md" >}}</api> operation for retrieving information about the endpoints of the {{< product lc >}} cluster, which provide access to the {{< product lc >}}'s resources.
The returned information includes the endpoints' IP addresses.

The Cluster-Information API is part of the cluster-management APIs and conforms to the related structure and syntax rules &mdash; see {{< xref f="cluster-mgmt/reference/management-apis/general-api-structure.md" >}}.<br/>
The API's endpoint is `/api/cluster_info`.

