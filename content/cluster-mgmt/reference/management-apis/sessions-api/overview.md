---
title:      "Overview of the Sessions Management API"
linktitle:  "Overview"
keywords: "sessions management api, sessions api, management, session management, sesions, security, authentication, authorization, session cookies, cookies, Create Session, /api/sesions, api endpoints"
menu:
  main:
    parent:     "mgmt-sessions-api"
    identifier: "mgmt-sessions-api-overview"
    weight:     5
---

The {{< product lc >}}'s Sessions Management API ("**the Sessions API**") is used to support user authentication and authorization.
The management-API operations (except where otherwise specified) authenticate the sender by requiring a session cookie, and authorize the sender to perform the operation based on the authentication results.
You acquire this cookie by using the Session API's <api>{{< xref f="cluster-mgmt/reference/management-apis/sessions-api/create-session.md" >}}</api> operation.

The Sessions API is part of the cluster-management APIs and conforms to the related structure and syntax rules &mdash; see {{< xref f="cluster-mgmt/reference/management-apis/general-api-structure.md" >}}.<br/>
The API's endpoint is `/api/sessions`.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="users-and-security/security.md" >}}

