---
title:      "Overview of the Cluster-Management REST APIs"
linktitle:  "Management REST APIs Overview"
keywords: "management apis, beta, management, REST, RESTful, management-api structure, api structure, api endpoints, /api, /api/containers, security, user management, users, user groups, containers, containers mangement, sessions, session management, authentication, authorization, data-access policies, tenants, system administration, administration, cluster management, cluster information, http, python, sessions management api, containers management api, cluster-information management api"
menu:
  main:
    name:         "Overview"
    parent:       "mgmt-apis"
    identifier:   "mgmt-apis-overview"
    weight:       10
---

The {{< product lc >}}'s cluster-management REST APIs (**"the management APIs"**) provide an alternative to using the {{< productUI lc >}} to perform management operations &mdash; such as containers management, system administration, and security operations (including management of users, groups, tenants, and data-access polices).
The management-APIs are exposed as **/api/&lt;API ID&gt;** endpoints (for example, /api/containers).

This section describes the {{< xref f="cluster-mgmt/reference/management-apis/general-api-structure.md" text="general structure" >}} of management-API requests and responses, and provides a reference of the following management APIs:

- {{< xref f="cluster-mgmt/reference/management-apis/sessions-api/" >}} for supporting user authentication and authorization.

- {{< xref f="cluster-mgmt/reference/management-apis/containers-api/" >}} for creating and managing containers.

- {{< xref f="cluster-mgmt/reference/management-apis/cluster-info-api/" >}} for retrieving cluster information.

There are also additional management APIs that are currently undocumented.
For more information, contact your {{< company >}} representative.

{{< beta note="1" features="management APIs" >}}
{{< comment >}}<!-- [BETA-MANAGEMENT-APIS] (sharonl) (25.3.18) Because QA
  didn't fully test the management APIs, it was decided by Adi (in consultation
  with Orit, Ori, Oded, and Meir) to keep the Management APIs documentation but
  add a beta disclaimer. I used the custom betaFeatures front-matter
  configuration on the Management APIs main _index.md page and the beta
  shortcode on the overview page (above) to mark this section as beta, and I
  also added beta notations for references to the management APIs from other
  doc sections, marked internally as [BETA-MANAGEMENT-APIS]. -->
{{< /comment >}}

