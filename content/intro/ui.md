---
title:      "The Platform Dashboard (UI)"
keywords: "dashboard, platform dashboard, GUI, graphical user interface, UI, user interface, project, mlops, mlrun, serverless, nuclio, kuebflow pipelines, pipelines, data, data layer, data containers, browsing data, clusters, data clusters, application clusters, cluster management, user management, users, security, idp, events, logs, debugging, help"
menu:
  main:
    parent:     "intro"
    identifier: "ui-intro"
    weight:     50
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title should
  use {{< productUI short_tc >}}.
-->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces intro/ecosystem/ui.md.
  [InfInfo] (sharonl) (10.1.21) I edited the front matter and the contents to
  describe all the current main UI pages (side-menu options) and link to new
  ghpages-doc-site pages. -->
{{< /comment >}}

The {{< productUI lc >}} is the {{< product lc >}}'s graphical user interface and is also your entry point to your {{< product lc >}} cluster.
Go to the {{< productUI lc >}} URL from any web browser and log in with your {{< product lc >}} login credentials.
The {{< productUI lc >}} allows managing and monitoring {{< product lc >}} activity.
You can navigate the {{< productUI lc >}} pages from the side navigation menu.
{{< note id="ui-permissions-note" >}}
Some areas of the {{< productUI lc >}} and some UI operations might not be available to you, depending on your user permissions.
See {{< xref f="users-and-security/users.md" >}} and {{< xref f="users-and-security/security.md" >}}.
{{< /note >}}

- <a id="product-ui-home"></a><gui-title>Home</gui-title> &mdash; contains useful links to help you get started with common tasks.

- <a id="product-ui-projects"></a><gui-title>Projects</gui-title> &mdash; allows creating, viewing, and managing projects.
    You can view MLOps models, features, artifacts (files), jobs, workflows, and functions; run jobs and workflows; and schedule jobs; for more information, see {{< xref f="ds-and-mlops" >}}.
    You can also create, view, and configure Nuclio serverless functions and API gateways; for more information, see {{< xref f="services/app-services/nuclio.md" >}}.

- <a id="product-ui-pipelines"></a><gui-title>Pipelines</gui-title> &mdash; displays a {{< url v="kubeflow_pipelines_home" k="text" link="1" >}} dashboard for managing your ML pipelines.
    {{< comment >}}<!-- [TODO-SITE-RESTRUCT-P4] Add link to more detailed doc,
      at which point remove the external Kubeflow Pipelines link. -->
    {{< /comment >}}

- <a id="product-ui-services"></a><gui-title>Services</gui-title> &mdash; displays information about application services for the logged-in user with options to create, run, configure, monitor, enable, disable, restart, and delete services from a single interface.
    For more information, see {{< xref f="services/" >}}.
    {{< note id="services-note" >}}
- Except where otherwise specified, when you open a service from the {{< productUI lc >}} you're automatically logged into the service as the active {{< productUI lc >}} user.
- You need to add a security exception upon the first login to any of the HTTPS URLs.
    {{< comment >}}<!-- [c-auto-service-login-from-ui-exceptions] [IntInfo]
      (sharonl) (13.1.19) I added "Except where otherwise specified" because
      there are exceptions to this rule, which I document for the relevant
      services - currently, Grafana. -->
    {{< /comment >}}
    {{< /note >}}
    {{< comment >}}<!-- [TODO-SITE-RESTRUCT-P3] Consider moving the info to the
      services overview. -->
    {{< /comment >}}

- <a id="product-ui-data"></a><gui-title>Data</gui-title> &mdash; allows viewing information about the data containers that make up the {{< product lc >}} data layer, browsing their contents, uploading and downloading files; and managing data-access policies.
    For more information, see {{< xref f="data-layer/" >}}.

- <a id="product-ui-clusters"></a><gui-title>Clusters</gui-title> &mdash; displays information about the {{< product lc >}}'s data and application clusters, including status, alerts, and performance data.
    For data clusters, you can change the cluster's status (for example, take the cluster offline or shut it down), collect logs, and get data-artifact versions.
    For application clusters, you can view a graphical cluster-status Grafana dashboard.
    For more information, see {{< xref f="cluster-mgmt/" >}}.

- <a id="product-ui-storage"></a><gui-title>Storage</gui-title> &mdash; displays information about the {{< product lc >}}'s data nodes and related data disks, including available and used capacity and per-container usage.

- <a id="product-ui-identity"></a><gui-title>Identity</gui-title> &mdash; allows managing the {{< product lc >}}'s users and user groups, including working with an external identity provider (IdP).
    For more information, see {{< xref f="users-and-security/users.md" >}} and {{< xref f="users-and-security/security.md" >}}.

- <a id="product-ui-events"></a><gui-title>Events</gui-title> &mdash; displays {{< product lc >}} event logs, alerts, and audit information.
    For more information, see {{< xref f="cluster-mgmt/logging-n-debugging.md" a="event-logs" >}}.

- <a id="product-ui-help"></a><gui-title>Help</gui-title> &mdash; displays useful information and links to assist you in using in using the {{< product lc >}}.

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT-P3] TODO: Edit the see-also links.
  The previous links were to the sibling data-fabric.md and app-services.md
  ecosystem intro pages, now moved to data-layer/ _index.md & apis/overview.md
  and services/app-services.md, and to the main intro page. For now, I kept the
  latter and added more links. I replaced the links to the obsolete projects.md
  intro-page with a link to ds-and-mlops/. -->
{{< /comment >}}

- {{< xref f="intro/introduction.md" >}}
- {{< xref f="intro/trial-qs.md" >}}
- {{< xref f="ds-and-mlops/" >}}
- {{< xref f="data-layer/" >}}
- {{< xref f="services/" >}}
- {{< xref f="cluster-mgmt/" >}}
- [{{< productUI sc >}} (UI) software specifications and restrictions]({{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="ui" t="url" >}})

