---
title:  "Logging and Monitoring Services"
description: "Get introduced to the Iguazio MLOps Platform's logging and monitoring services."
keywords: "logging and monitoring services, logging services, applciation logging, logging, monitoring services, monitoring tools, application monitoring, data monitoring, monitoring, grafana, debugging tools, application debugging, debugging, log forwarder, log forwarding, filebeat, elasticsearch, monitoring service"
menu:
  main:
    name:       "Logging and Monitoring"
    parent:     "app-services"
    identifier: "logging-and-monitoring-services"
    weight:     75
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#logging-n-monitoring-services. -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (6.5.19) Adi requested that we use
  "Services" and not "Services and Tools" in the title (when this was still a
  section in a single app-services overview page). -->
{{< /comment >}}

The {{< product lc >}} features a default (pre-deployed) shared single-instance tenant-wide log-forwarder service (`{{< verkey k="log_forwarder.service_display_name" >}}`) for forwarding application-service logs to an instance of the {{< url v="elasticsearch_home" k="text" link="1" >}} open-source search and analytics engine by using the open-source {{< url v="filebeat_home" k="text" link="1" >}} log-shipper utility.

<a id="monitoring-service"></a>In addition, the {{< product lc >}} has a default (pre-deployed) shared single-instance tenant-wide monitoring service (`{{< verkey k="monitoring.service_display_name" >}}`) for monitoring Nuclio serverless functions and gathering performance statistics and additional data.
The {{< product lc >}} visualizes data gathered by the monitoring service in predefined Grafana dashboards.
For more information, see {{< xref f="services/app-services/data-monitoring-and-visualization-services.md" a="grafana" >}}.

For detailed information about these services and how to use them, as well as information about additional {{< product lc >}} monitoring, logging, and debugging tools, see {{< xref f="cluster-mgmt/logging-n-debugging.md" >}} and {{< xref f="services/monitoring-services.md" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="cluster-mgmt/logging-n-debugging.md" >}}
- {{< xref f="services/monitoring-services.md" >}}
- {{< xref f="services/grafana-dashboards.md" >}}

