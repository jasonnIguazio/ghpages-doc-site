---
title:  "Data Monitoring and Visualization Services and Tools"
description: "Get introduced to the Iguazio MLOps Platform's data analytics, monitoring, and visualization services and tools."
keywords: "data visualization, visualization services, visualization tools, visualization, data analytics, analytics services, analytics tools, analytics, data monitoring, monitoring services, monitoring service, monitoring tools, monitoring, remote visualization, grafana, grafana dashboards, application-cluster monitoring, app-cluster monitoring, application-cluster dashboards, application cluster, looker, qlikview, tableau, remote analytics, remote monitoring"
menu:
  main:
    name:       "Data Monitoring and Visualization"
    parent:     "app-services"
    identifier: "monitoring-and-visualization-tools"
    weight:     70
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#data-visualization-tools. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

There are various tools that allow you to monitor and query your data and produce graphical interactive representations that make it easy to quickly analyze the data and begin discovering new actionable insights in a matter of seconds, with no programming effort.

<!-- //////////////////////////////////////// -->
## Grafana {#grafana}

The {{< url v="grafana_home" k="text" link="1" >}} open-source platform for data analytics, monitoring, and visualization is pre-integrated in the {{< product lc >}} and available as a user application service.
{{< note id="grafana-notes" >}}
<a id="grafana-cloud-single-tenant-wide-service-note"></a>In cloud {{< product lc >}} environments, Grafana is currently available as a shared single-instance tenant-wide service.
{{< comment >}}<!-- [c-grafana-cloud-single-tenant-wide-service] -->
{{< /comment >}}
{{< /note >}}

In addition, there's a predefined single-instance tenant-wide Grafana service for IT administrators, which has dashboards with monitoring data at the application-cluster level.
{{< comment >}}<!-- [c-grafana-app-cluster-service] -->
{{< /comment >}}

All Grafana services in the {{< product lc >}} have predefined dashboards that leverage the {{< product lc >}}'s monitoring service to display monitoring data, such as performance statistics, for application services.
For more information, see {{< xref f="services/monitoring-services.md" >}}.

You can use the Grafana service to define custom Grafana dashboards for monitoring, visualizing, and understanding data stored in the {{< product lc >}}, such as time-series metrics and NoSQL data.
This can be done by using the custom `{{< verkey k="grafana.product_data_source.name" >}}` data source, or by using a Prometheus data source for running Prometheus queries on {{< product lc >}} TSDB tables.
You can also issue data alerts and create, explore, and share dashboards.
For more information, see {{< xref f="services/grafana-dashboards.md" >}}.

See also the Grafana restrictions in the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="grafana" >}} documentation.

<!-- //////////////////////////////////////// -->
## Remote Visualization Tools {#remote-visualization-tools}

All leading BI data visualization tools can be installed remotely and configured to run on top of the data services of the {{< product full >}} over a Java database connectivity (JBDC) connector.
The following images display data visualization using the popular {{< url v="tableau_home" k="text" link="1" >}}, {{< url v="qlikview_home" k="text" link="1" >}}, and {{< url v="looker_home" k="text" link="1" >}} visualization tools:

{{< igz-figure src="/images/tableau_server_dashboard.png" title="Tableau" alt="Tableau data-visualization image" inline="p" width="350" >}}
<p style="display: inline-block">&nbsp;&nbsp;&nbsp;&nbsp;</p>
{{< igz-figure src="/images/qlikview_dashboard_social_media_buzz.png" title="QlikView" alt="QlikView dashboard social-media buzz image" inline="p" width="350" >}}
<p style="display: inline-block">&nbsp;&nbsp;&nbsp;&nbsp;</p>
{{< igz-figure src="/images/looker-snowplow-traffic-pulse-dashboard-top-part.png" title="Looker" alt="Looker Pulse dashboard with snowplow traffic image" inline="p" width="350" >}}

{{< note >}}
Other integrated services might also contain data-visualization tools.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="services/monitoring-services.md" >}}
- {{< xref f="services/grafana-dashboards.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="grafana" text="Grafana software specifications and restrictions" >}}

