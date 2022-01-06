---
title:  "Monitoring Platform Services"
description:  "Learn how to monitor Iguazio MLOps Platform services with the monitoring service and Grafana dashboards."
keywords: "monitoring services, monitoring application services, monitoring, monitoring service, grafana monitoring dashboards, grafana dashboards, grafana, kubectl, kubernetes"
menu:
  main:
    parent:     "services"
    identifier: "monitoring-services"
    weight:     30
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title should
  use {{< product tc >}}. -->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces "The Monitoring Application Service
  and Grafana Dashboards" section {#monitoring-service} in
  intro/logging-n-debugging.md. The rest of that file was moved to
  cluster-mgmt/logging-n-debugging.md -->
<!-- [TODO-SITE-RESTRUCT-P3] Improve this page, including creating a separate
  headings for the app-cluster monitoring. -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) See info in v2.5.0 DOC IG-12556, and
  in v2.5.1 Requirement IG-13542 / DOC IG-13562 - enable the service by default.
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## The Monitoring Application Service and Grafana Dashboards {#monitoring-service}

The {{< product lc >}} has a default (pre-deployed) tenant-wide monitoring application service (`{{< verkey k="monitoring.service_display_name" >}}`) for monitoring application services and gathering performance statistics and additional data.
This service is enabled by default.

All Grafana user services in the {{< product lc >}} that are created or restarted after the monitoring service is enabled have a <dirname>{{< verkey k="grafana.predef_dashboards_dir" >}}</dirname> dashboards directory that contains the following predefined dashboards.
The dashboards visualize data gathered by the monitoring service for application services of the parent tenant:

- <gui-title>{{< verkey k="monitoring.visualization_dashboards.all_apps" >}}</gui-title> &mdash; displays information for all the managed application services.
- <gui-title>{{< verkey k="monitoring.visualization_dashboards.nuclio_overview" >}}</gui-title> &mdash; displays information for all the deployed serverless Nuclio functions.
- <gui-title>{{< verkey k="monitoring.visualization_dashboards.nuclio_per_func" >}}</gui-title> &mdash; displays information for a specific Nuclio function, as set in the dashboard filter.

The name of the monitoring service on the <gui-title>Services</gui-title> {{< productUI short_lc >}} page (`{{< verkey k="monitoring.service_display_name" >}}`) links to the UI of the related Prometheus service.

<a id="grafana-app-cluster-service"></a>The {{< product lc >}} also has a shared single-instance tenant-wide application-cluster Grafana service with monitoring dashboards for the entire Kubernetes application cluster (rather than a specific Kubernetes namespace like the dashboards for the Grafana user service).
The dashboards are located under a <dirname>{{< verkey k="grafana.predef_dashboards_dir" >}}</dirname> directory.
<br/>
This service is accessible from the {{< productUI short_lc >}} to users with the {{< xref f="users-and-security/security.md" a="mgmt-policy-it-admin" text="IT Admin" >}} management policy via a <gui-label>Status dashboard</gui-label> link on the <gui-title>Clusters | Application</gui-title> tab.
The link opens the <gui-title>{{< verkey k="grafana.app_cluster_service.default_dashboard" >}}</gui-title> dashboard, but you can find additional dashboards in the parent <dirname>{{< verkey k="grafana.app_cluster_service.predef_dashboards_dir" >}}</dirname> dashboards directory.
{{< comment >}}<!-- [c-grafana-app-cluster-service] [IntInfo] (sharonl) See
  Requirement IG-13167 / DOC IG-13782 (v2.8.0 Tech Preview) and DOC IG-17430
  (v3.0.0 GA support). -->
{{< /comment >}}

{{< note id="monitoring-service-notes" >}}
<a id="monitoring-service-dependent-features-note"></a>Several {{< product lc >}} features rely on the monitoring service of the parent tenant, including the following:
{{< comment >}}<!-- [IntInfo] (sharonl) (27.10.19) This reliance is also
  mentioned in the v2.5.0 release notes for the addition of the respective
  features in this release. Beginning with v2.5.1, it's less critical to
  emphasize these dependencies because the monitoring service is enabled by
  default (see Req IG-13542 / DOC IG-13562), although the information is still
  relevant, and I intentionally didn't phrase this note as requiring the user
  to enable the service. (We mention separately, above, in the v2.5.0 doc that
  the monitoring service is disabled by default.) -->
{{< /comment >}}

- The application-services and Nuclio-functions monitoring data that's displayed in the {{< productUI short_lc >}} and in the {{< product lc >}}'s Grafana monitoring dashboards.
    Note that the predefined monitoring Grafana dashboards display information only when the monitoring service is enabled; the service is enabled by default.
- Auto scaling of Nuclio functions.
    {{< comment >}}<!-- [IntInfo] (sharonl) See info in Requirement IG-11461
      and DOC IG-13436. -->
    {{< /comment >}}

- <a id="kubernetes-monitoring-tools"></a>You can also use the Kubernetes <file>kubectl</file> CLI from a {{< product lc >}} web-shell or Jupyter Notebook application service to monitor your Kubernetes application cluster.
    For details, see {{< xref f="cluster-mgmt/logging-n-debugging.md" a="kubernetes-tools" text="Kubernetes monitoring tools" >}}.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/app-services/logging-and-monitoring-services.md" >}}
- {{< xref f="services/app-services/data-monitoring-and-visualization-services.md" >}}
- {{< xref f="cluster-mgmt/logging-n-debugging.md" >}}
  - {{< xref f="cluster-mgmt/logging-n-debugging.md" a="kubernetes-tools" text="Kubernetes monitoring tools" >}}

