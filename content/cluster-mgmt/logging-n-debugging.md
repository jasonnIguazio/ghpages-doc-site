---
title:  "Logging, Monitoring, and Debugging"
description:  "Learn how to log, monitor, and debug the execution of services, tools, and APIs in the Iguazio MLOps Platform."
keywords: "logging and monitoring services, logging services, applciation logging, logging, monitoring services, monitoring tools, application monitoring, data monitoring, monitoring, grafana, debugging tools, application debugging, debugging, log forwarder, log forwarding, filebeat, elasticsearch, monitoring service, kubectl, kubernetes logging, events, event logs, api error information, jupyter, jupyter notebook, web shell"
menu:
  main:
    parent:     "cluster-mgmt"
    identifier: "logging-n-debugging"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces intro/logging-n-debugging.md,
  except for the monitoring section, which was moved to
  services/monitoring-services.md. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

There are a variety of ways in which you can log and debug the execution of {{< product lc >}} {{< xref f="services/app-services/" text="application services" >}}, tools, and APIs.

{{< note id="monitoring-services-note" >}}
To learn how to use the {{< product lc >}}'s default monitoring service and pre-deployed Grafana dashboards to monitor application services, see {{< xref f="services/monitoring-services.md" >}}.
{{< /note >}}

- [Logging application services](#logging-services) (Log forwarder and Elasticsearch)
- [Kubernetes tools](#kubernetes-tools)
- [Event logs](#event-logs)
- [Cluster support logs](#cluster-support-logs)
- [API error information](#api-error-info)

For further troubleshooting assistance, visit {{< url v="product_support" k="text_long" link="1" >}}.
{{< comment >}}<!-- [IntInfo] (sharonl) This page also contains support contact
  info, including the support email, which is currently also our
  customer-success email, so I decided not to add email links in the doc. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Logging Application Services {#logging-services}

The {{< product lc >}} has a default tenant-wide log-forwarder application service (`{{< verkey k="log_forwarder.service_display_name" >}}`) for forwarding application-service logs.
The logs are forwarded to an instance of the {{< url v="elasticsearch_home" k="text" link="1" >}} open-source search and analytics engine by using the open-source {{< url v="filebeat_home" k="text" link="1" >}} log-shipper utility.
The log-forwarder service is disabled by default.
To enable it, on the <gui-title>Services</gui-title> {{< productUI lc >}} page, select to edit the `{{< verkey k="log_forwarder.service_display_name" >}}` service; in the <gui-title>Custom Parameters</gui-title> tab, set the <gui-label>Elasticsearch URL</gui-label> parameter to an instance of Elasticsearch that will be used to store and index the logs; then, save and apply your changes to deploy the service.

Typically, the log-forwarder service should be configured to work with your own remote off-cluster instance of Elasticsearch.
{{< note id="log-forwarder-elasticsearch-url-cfg-notes" >}}
- The default transfer protocol, which is used when the URL doesn't begin with "`http://`" or "`https://`", is HTTPS.
- The log-forwarder service doesn't support off-cluster Elasticsearch user authentication, regardless of whether you use an HTTP or HTTPS URL.
- The default port, which is used when the URL doesn't end with "`:<port number>`", is port 80 for HTTP and port 443 for HTTPS.
{{< comment >}}<!-- [IntInfo] (sharonl) (23.4.19) See info in DOC IG-9665. -->
{{< /comment >}}
{{< /note >}}

In cloud {{< product lc >}} environments you can also configure the log-forwarder service to work with a tenant-wide Elasticsearch service that uses a pre-deployed on-cluster vanilla installation of Elasticsearch.
To do so, you first need to create such an Elasticsearch service:
from the <gui-title>Services</gui-title> {{< productUI lc >}} page, select to create a new service of type "{{< verkey k="elasticsearch.service_type_display_name" >}}", optionally edit the default configuration, and apply your changes to deploy the service.
You can then configure the log-forwarder service to forward the application-service logs to this service by selecting your Elasticsearch service from the drop-down list of the <gui-label>Elasticsearch</gui-label> parameter.
{{< comment >}}<!-- [c-elasticsearch-service-cloud-only] [IntInfo] See DOC
  IG-9665. -->
{{< /comment >}}

After enabling the log-forwarder service, you can view the forwarded logs in the <gui-title>Logs</gui-title> page of the {{< productUI short_lc >}} (including filtering options), provided you have the {{< xref f="users-and-security/security.md" a="mgmt-policy-service-admin" text="Service Admin" >}} management policy.
The <gui-label>Logs</gui-label> column on the <gui-title>Services</gui-title> {{< productUI lc >}} page has links to filtered log views for each service.
{{< note id="log-forwareder-all-longs-for-cfgs-elasticsearch" >}}
Note that the <gui-title>Logs</gui-title> page displays all logs from the configured log-forwarder Elasticsearch instance, regardless of their origin.
It's therefore recommended that you use a dedicated Elasticsearch instance for each {{< product lc >}} cluster that enables log forwarding.
{{< /note >}}

{{< warning id="logging-services-warnings" >}}
<a id="elasticsearch-delete-warning"></a>Note that you cannot delete an Elasticsearch service while it's being used by the log-forwarder service.
{{< comment >}}<!-- [c-log-forwarder-elasticsearch-dependency] [IntInfo]
  (sharonl) (27.6.19) See the Release Note Information for v2.2.0 Bug IG-11788
  and the related v2.2.0 RNs known issue and v2.3.0 RNs fix
  (#ki-ui-logs-displayed-w-error-for-unavailable-log-forwarder &
  #fix-ui-logs-displayed-w-error-for-unavailable-log-forwarder).
  The fix was a Platform backend fix to prevents the deletion of an
  Elasticsearch service that's being used by a log-forwarder service; the UI
  doesn't currently prevent or warn about the delete operation, it only
  displays the backend error when the deployment fails. In the v2.3.0 doc, I
  edited the note above to replace "Take care not to delete" with "Note that
  you cannot delete". -->
{{< /comment >}}
{{< /warning >}}

<!-- //////////////////////////////////////// -->
## Kubernetes Tools {#kubernetes-tools}

You can use the Kubernetes <file>kubectl</file> CLI from a {{< product lc >}} web-shell or Jupyter Notebook application service to monitor, log, and debug your Kubernetes application cluster:

- <a id="kubectl-get-pods"></a>Use the [<cmd>get pods</cmd>]({{< url v="kubectl" k="gen_ref" k2="full" >}}#get) command to display information about the cluster's pods:
    ```sh
    kubectl get pods
    ```
- <a id="kubectl-logs"></a>Use the [<cmd>logs</cmd>]({{< url v="kubectl" k="gen_ref" k2="full" >}}#logs) command to view the logs for a specific pod; replace `POD` with the name of one of the pods returned by the <cmd>get</cmd> command:
    ```sh
    kubectl logs POD
    ```
- <a id="kubectl-top-pod"></a>Use the [<cmd>top pod</cmd>]({{< url v="kubectl" k="gen_ref" k2="full" >}}#-em-pod-em-) command to view pod resource metrics and monitor resource consumption; replace `[POD]` with the name of one of the pods returned by the <cmd>get</cmd> command or remove it to display logs for all pods:
    ```sh
    kubectl top pod [POD]
    ```

{{< note id="kubectl-web-shell-service-accounts-note" >}}
To run <file>kubectl</file> commands from a web-shell service, the service must be configured with an appropriate service account; for more information about the web-shell service accounts, see {{< xref f="services/app-services/web-shell.md" >}}.

- The <cmd>get pods</cmd> and <cmd>logs</cmd> commands require the "Log Reader" service account or higher.
- The <cmd>top pod</cmd> command requires the "Service Admin" service account.
{{< /note >}}

For more information about the <file>kubectl</file> CLI, see the [Kubernetes documentation]({{< url v="kubectl" k="ref" k2="full" >}}).

<a id="igztop"></a>

### IGZTOP - Performance Reporting Tool
IGZTOP is a small tool which is intended to display useful information about pods in the default-tenant namespace. It 
is a performance troubleshooting tool providing insights on how your MLrun jobs are consuming resources in the cluster. 
and enhances the standard set of provided Kubernetes tools.

#### Prerequisites
To use the IGZTOP feature you will need the to have a shell service configured with service admin rights. 
To setup a new service see {{< xref f="services/fundamentals.md" a="create-new-service" text="Creating a New Service" >}}.
To run the shell service:
1. In the side navigation menu, select Services.
2. On the Services page, press the Shell Service name (link) from the list of services.
A shell window opens.

#### How to Run IGZTOP
Use the following command in the shell service window. Use the flags (options) to customize your results.

```
  igztop [--sort=<KEY>] [--limit=<KEY>] [--wide] [--all] [--kill-job=<JOB>] [--no-borders] [--check-permissions] [--update]
```

<table width="100%">
<tr align="left" style="border-bottom: 1pt solid black; column-width: fit-content">
<th>Options</th>
<th>Description</th>
</tr>
<tr>
  <td>

`-h --help`</td>
  <td>Displays the command help</td>
</tr>
<tr>
  <td>

`-v --version`
</td>
  <td>Displays the current version</td>
</tr>
<tr>
  <td>

`-s --sort=<KEY>`</td>
  <td>Sort by key (for example --sort memory)</td>
</tr>
<tr>
  <td>

`-l --limit=<KEY>`</td>
  <td>filter using a key:value pair (for example 'node=k8s-node1', 'name=presto')</td>
</tr>
<tr>
  <td>

`-w --wide`</td>
  <td>Show additional fields including “requests” and “limits”</td>
</tr>
<tr>
  <td>

`-a --all`</td>
  <td>Include pods which are not currently running</td>
</tr>
<tr>
  <td>

`-b --no-borders`</td>
  <td>Print the table without borders</td>
</tr>
<tr>
  <td>

`-k --kill-job=<JOB>`</td>
  <td>Kill one or more MLRun job pods (use * to kill multiple matching pods</td>
</tr>
<tr>
  <td>

`-c --check-permissions`</td>
  <td>Check the permissions of the user running this Service</td>
</tr>
<tr>
  <td>

`-u --update`</td>
  <td>Fetch the latest version of IGZTOP</td>
</tr>
</table>

### Examples
The following is an example of the default output.<br>
```
$ igztop
+--------------------------------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| NAME                                             | CPU(m) | MEMORY(Mi) | NODE      | STATUS  | GPUs | GPU Util. | MLRun Proj. | MLRun Owner |
+--------------------------------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| authenticator-fb7dc6df7-vg9tl                    | 1      | 6          | k8s-node2 | Running |      |           |             |             |
| docker-registry-676df9d6f6-x788h                 | 1      | 6          | k8s-node2 | Running |      |           |             |             |
| framesd-8b4c489f-sx9rw                           | 1      | 17         | k8s-node1 | Running |      |           |             |             |
| grafana-5b456dc59-vjszb                          | 1      | 31         | k8s-node1 | Running |      |           |             |             |
| jupyter-58c5bf598f-z86qm                         | 9      | 641        | k8s-node1 | Running | 1/1  | 0.00%     |             |             |
| metadata-envoy-deployment-786b65df7d-lldp2       | 3      | 11         | k8s-node2 | Running |      |           |             |             |
| metadata-grpc-deployment-7cfc8d9b8-prdr8         | 1      | 1          | k8s-node2 | Running |      |           |             |             |
| metadata-writer-7bfd6bf6dd-x8fj9                 | 1      | 140        | k8s-node2 | Running |      |           |             |             |
| metrics-server-exporter-75b49dd6b8-k9r5q         | 5      | 14         | k8s-node2 | Running |      |           |             |             |
| ml-pipeline-565cb8497d-wkx2b                     | 5      | 16         | k8s-node2 | Running |      |           |             |             |
| ml-pipeline-persistenceagent-746949f667-822ch    | 1      | 9          | k8s-node1 | Running |      |           |             |             |
| ml-pipeline-scheduledworkflow-6fd754dfcf-slrtk   | 1      | 9          | k8s-node1 | Running |      |           |             |             |
| ml-pipeline-ui-7694dc85ff-4cjc5                  | 4      | 52         | k8s-node1 | Running |      |           |             |             |
| ml-pipeline-viewer-crd-6fbf9f8fbf-9cwvq          | 2      | 10         | k8s-node2 | Running |      |           |             |             |
| ml-pipeline-visualizationserver-66ccfd8f98-l6g86 | 5      | 80         | k8s-node1 | Running |      |           |             |             |
| mlrun-api-68cfd974db-cgph4                       | 4      | 317        | k8s-node2 | Running |      |           |             |             |
| mlrun-ui-88cbcffc4-8s76d                         | 0      | 11         | k8s-node1 | Running |      |           |             |             |
| monitoring-prometheus-server-78d5bbc9d4-vgrhm    | 5      | 42         | k8s-node2 | Running |      |           |             |             |
| mpi-operator-7589fbff58-87xr7                    | 1      | 13         | k8s-node1 | Running |      |           |             |             |
| mysql-kf-67b6cb589d-dvh94                        | 4      | 460        | k8s-node1 | Running |      |           |             |             |
| nuclio-controller-5bcbd8bcf6-6hqvv               | 1      | 10         | k8s-node2 | Running |      |           |             |             |
| nuclio-dashboard-84ddf6f9bd-c4scb                | 1      | 43         | k8s-node1 | Running |      |           |             |             |
| nuclio-dlx-86cbc4cdb9-wcds2                      | 1      | 5          | k8s-node2 | Running |      |           |             |             |
| nuclio-scaler-7b96584d57-l9cwj                   | 1      | 10         | k8s-node1 | Running |      |           |             |             |
| oauth2-proxy-5bd48c96d8-ghvqq                    | 1      | 4          | k8s-node2 | Running |      |           |             |             |
| presto-coordinator-65d6d64b5f-vc7gh              | 17     | 1319       | k8s-node1 | Running |      |           |             |             |
| presto-worker-76d774b948-dxxjr                   | 8      | 1229       | k8s-node2 | Running |      |           |             |             |
| presto-worker-76d774b948-vlxcn                   | 13     | 1236       | k8s-node1 | Running |      |           |             |             |
| provazio-controller-controller-c9bff698c-xk6r9   | 3      | 50         | k8s-node2 | Running |      |           |             |             |
| shell-7b47994578-z7s6k                           | 50     | 108        | k8s-node2 | Running |      |           |             |             |
| spark-operator-658bdfb6f5-bl2lb                  | 2      | 10         | k8s-node1 | Running |      |           |             |             |
| v3io-webapi-b9b9f                                | 8      | 1147       | k8s-node1 | Running |      |           |             |             |
| v3io-webapi-p4kbq                                | 8      | 1431       | k8s-node2 | Running |      |           |             |             |
| v3iod-fztqm                                      | 13     | 2541       | k8s-node2 | Running |      |           |             |             |
| v3iod-jg68d                                      | 14     | 2536       | k8s-node1 | Running |      |           |             |             |
| v3iod-locator-599b9d5c9f-76vrr                   | 0      | 5          | k8s-node1 | Running |      |           |             |             |
| workflow-controller-7d59d94444-5n7r7             | 1      | 12         | k8s-node2 | Running |      |           |             |             |
+--------------------------------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| SUM                                              | 197m   | 13582Mi    |           |         |      |           |             |             |
+--------------------------------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
```

The following examples compares Presto memory usage across all cluster nodes. <br>
```
$ igztop --sort memory --limit name=presto
+-------------------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| NAME                                | CPU(m) | MEMORY(Mi) | NODE      | STATUS  | GPUs | GPU Util. | MLRun Proj. | MLRun Owner |
+-------------------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| presto-coordinator-65d6d64b5f-vc7gh | 17     | 1320       | k8s-node1 | Running |      |           |             |             |
| presto-worker-76d774b948-vlxcn      | 12     | 1237       | k8s-node1 | Running |      |           |             |             |
| presto-worker-76d774b948-dxxjr      | 12     | 1230       | k8s-node2 | Running |      |           |             |             |
+-------------------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| SUM                                 | 41m    | 3787Mi     |           |         |      |           |             |             |
+-------------------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
```
The following example displays which pods are using GPUs.
```
$ igztop --sort memory --limit gpu
+--------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| NAME                     | CPU(m) | MEMORY(Mi) | NODE      | STATUS  | GPUs | GPU Util. | MLRun Proj. | MLRun Owner |
+--------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| jupyter-58c5bf598f-z86qm | 10     | 644        | k8s-node1 | Running | 1/1  | 0.00%     |             |             |
+--------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
| SUM                      | 10m    | 644Mi      |           |         |      |           |             |             |
+--------------------------+--------+------------+-----------+---------+------+-----------+-------------+-------------+
```

The following example displays the --all flag and includes pods which are not running.
```
$ igztop -a
+---------------------------------------------------------------+--------+------------+-----------+-----------+--------------------------------+-------------+
| NAME                                                          | CPU(m) | MEMORY(Mi) | NODE      | STATUS    | MLRun Proj.                    | MLRun Owner |
+---------------------------------------------------------------+--------+------------+-----------+-----------+--------------------------------+-------------+
| v3io-webapi-dcknw                                             | 19     | 5069       | k8s-node1 | Running   |                                |             |
| presto-coordinator-68df99bdf9-8swbp                           | 20     | 1855       | k8s-node1 | Running   |                                |             |
| ml-pipeline-viewer-crd-656775dc5c-n4tzl                       | 2      | 11         | k8s-node1 | Running   |                                |             |
| prep-data-5vpsb                                               |        |            | k8s-node1 | Completed | getting-started-tutorial-admin | admin       |
| nuclio-dlx-555d6c4cc5-64mns                                   | 1      | 5          | k8s-node1 | Running   |                                |             |
| workflow-controller-64fdf54f56-8wq2v                          | 1      | 11         | k8s-node1 | Running   |                                |             |
| zeppelin-68fdc8bdb5-fnc5v                                     | 58     | 685        | k8s-node1 | Running   |                                |             |
| shell-service-admin-6f4bb85cc8-5d9v7                          | 56     | 89         | k8s-node1 | Running   |                                |             |
| nuclio-dashboard-5bcff7dc4c-b7r4j                             | 7      | 43         | k8s-node1 | Running   |                                |             |
| prep-data-fblfn                                               |        |            | k8s-node1 | Completed | getting-started-tutorial-admin | admin       |
| v3iod-x5fmt                                                   | 16     | 5080       | k8s-node1 | Running   |                                |             |
| prep-data-77k4m                                               |        |            | k8s-node1 | Completed | getting-started-tutorial-admin | admin       |
| spark-m9zrumpebc-rdxs6-worker-8647d4466f-rjk9h                | 9      | 302        | k8s-node1 | Running   |                                |             |
| metadata-grpc-deployment-6475f89f9b-t2gns                     | 1      | 1          | k8s-node1 | Running   |                                |             |
| metadata-writer-85ddb586d-wzz8v                               | 1      | 140        | k8s-node1 | Running   |                                |             |
| spark-m9zrumpebc-rdxs6-master-5fd5d6964b-bk527                | 8      | 361        | k8s-node1 | Running   |                                |             |
| nuclio-controller-dd6fcbc74-4pt82                             | 1      | 13         | k8s-node1 | Running   |                                |             |
| spark-operator-7f698b78dc-8x2sh                               | 2      | 10         | k8s-node1 | Running   |                                |             |
| prep-data-g6dps                                               |        |            | k8s-node1 | Completed | getting-started-tutorial-admin | admin       |
| mpi-operator-68dbcc88cc-z8nls                                 | 1      | 14         | k8s-node1 | Running   |                                |             |
| spark-operator-init-zxp8r                                     |        |            | k8s-node1 | Completed |                                |             |
| mlrun-ui-657cb7f889-rpn7t                                     | 0      | 11         | k8s-node1 | Running   |                                |             |
| prep-data-bgwg2                                               |        |            | k8s-node1 | Completed | getting-started-tutorial-admin | admin       |
| metadata-envoy-deployment-5f6c59895d-59qk9                    | 4      | 11         | k8s-node1 | Running   |                                |             |
| mysql-kf-77b69d9d9-4wwkc                                      | 3      | 463        | k8s-node1 | Running   |                                |             |
| framesd-7b89dc9cfb-t4p7x                                      | 1      | 17         | k8s-node1 | Running   |                                |             |
| ml-pipeline-86dc8d885-z6zpm                                   | 5      | 16         | k8s-node1 | Running   |                                |             |
| spark-master-7cf99697df-9dprz                                 | 7      | 408        | k8s-node1 | Running   |                                |             |
| ml-pipeline-visualizationserver-78ccd99c4b-zqwzb              | 4      | 76         | k8s-node1 | Running   |                                |             |
| ml-pipeline-scheduledworkflow-868c7467f5-6jxst                | 1      | 8          | k8s-node1 | Running   |                                |             |
| metrics-server-exporter-594f9c9c97-hvnsd                      | 8      | 12         | k8s-node1 | Running   |                                |             |
| mlrun-api-5dbb8899cb-5zwh5                                    | 28     | 403        | k8s-node1 | Running   |                                |             |
| shell-none-6d64c8675c-tndv4                                   | 5      | 66         | k8s-node1 | Running   |                                |             |
| provazio-controller-controller-77866b6b98-n7psm               | 4      | 50         | k8s-node1 | Running   |                                |             |
| monitoring-prometheus-server-5c959fc895-hfqg2                 | 6      | 43         | k8s-node1 | Running   |                                |             |
| v3iod-locator-597b4c7c87-jn2gx                                | 0      | 5          | k8s-node1 | Running   |                                |             |
| spark-worker-664878f4b6-mwq2r                                 | 8      | 404        | k8s-node1 | Running   |                                |             |
| prep-data-pq8jm                                               |        |            | k8s-node1 | Completed | getting-started-tutorial-admin | admin       |
| docker-registry-6d8b657f8d-h5297                              | 1      | 45         | k8s-node1 | Running   |                                |             |
| hive-5bfbc84589-5l9rg                                         | 7      | 284        | k8s-node1 | Running   |                                |             |
| ml-pipeline-persistenceagent-56f77bdb5f-vn9ms                 | 1      | 9          | k8s-node1 | Running   |                                |             |
| shell-app-admin-57474fc864-dkzct                              | 5      | 95         | k8s-node1 | Running   |                                |             |
| presto-worker-758dcccf6f-hst2f                                | 12     | 1809       | k8s-node1 | Running   |                                |             |
| jupyter-77bfdd798d-vbt6r                                      | 9      | 585        | k8s-node1 | Running   |                                |             |
| mariadb-74d5c8cb74-zjq82                                      | 4      | 76         | k8s-node1 | Running   |                                |             |
| shell-log-reader-7d67d7f567-vbldj                             | 5      | 52         | k8s-node1 | Running   |                                |             |
| ml-pipeline-ui-7db966bb54-znch6                               | 4      | 46         | k8s-node1 | Running   |                                |             |
| oauth2-proxy-85b8c78fb7-8ktzx                                 | 1      | 3          | k8s-node1 | Running   |                                |             |
| nuclio-getting-started-tutorial-admin-serving-6d8fbdc9d-r4x2w | 1      | 165        | k8s-node1 | Running   |                                |             |
| authenticator-6647dd8467-r2g9n                                | 1      | 7          | k8s-node1 | Running   |                                |             |
| nuclio-scaler-78cc778b6c-kr7m9                                | 1      | 10         | k8s-node1 | Running   |                                |             |
+---------------------------------------------------------------+--------+------------+-----------+-----------+--------------------------------+-------------+
| SUM                                                           | 339m   | 18868Mi    |           |           |                                |             |
+---------------------------------------------------------------+--------+------------+-----------+-----------+--------------------------------+-------------+
```

To delete MLRun use ```igztop``` with the ```-k --kill-job``` option followed by a job name. Use '*' as a wildcard at the start or end of a job name 
to kill multiple job pods.
```
$ igztop -k '*data*'
pod "prep-data-5vpsb" deleted
pod "prep-data-77k4m" deleted
pod "prep-data-bgwg2" deleted
pod "prep-data-fblfn" deleted
pod "prep-data-g6dps" deleted
pod "prep-data-pq8jm" deleted
```

<!-- //////////////////////////////////////// -->
## Event Logs {#event-logs}

The <gui-title>Events</gui-title> page of the {{< productUI lc >}} displays different {{< product lc >}} event logs:

- The <gui-title>Event Log</gui-title> tab displays system event logs.
- The <gui-title>Alerts</gui-title> tab displays system alerts.
- The <gui-title>Audit</gui-title> tab displays a subset of the system events for audit purposes &mdash; security events (such as a failed login) and user actions (such as creation and deletion of a container).

The <gui-title>Events</gui-title> page is visible to users with the {{< xref f="users-and-security/security.md" a="mgmt-policy-it-admin" text="IT Admin" >}} management policy &mdash; who can view all event logs &mdash; or to users with the {{< xref f="users-and-security/security.md" a="mgmt-policy-security-admin" text="Security Admin" >}} management policy &mdash; who can view only the <gui-title>Audit</gui-title> tab.

<!-- //////////////////////////////////////// -->
## Cluster Support Logs {#cluster-support-logs}

Users with the {{< xref f="users-and-security/security.md" a="mgmt-policy-it-admin" text="IT Admin" >}} management policy can collect and download support logs for the {{< product lc >}} clusters from the {{< productUI lc >}}.
Log collection is triggered for a data cluster, but the logs are collected from both the data and application cluster nodes.

You can trigger collection of cluster support-logs from the {{< productUI lc >}} in one of two ways; (note that you cannot run multiple collection jobs concurrently):

- On the <gui-title>Clusters</gui-title> page, open the action menu (<span class="igz-icon-ui-more"></span>) for a data cluster in the clusters table (<gui-label>Type</gui-label> = "Data"); then, select the <gui-label>Collect logs</gui-label> menu option.
- On the <gui-title>Clusters</gui-title> page, select to display the <gui-title>Support Logs</gui-title> tab for a specific data cluster &mdash; either by selecting the <gui-label>Support logs</gui-label> option from the cluster's action menu (<span class="igz-icon-ui-more"></span>) or by selecting the data cluster and then selecting the <gui-title>Support Logs</gui-title> tab; then, select <gui-label>Collect Logs</gui-label> from the action toolbar.

You can view the status of all collection jobs and download archive files of the collected logs from the data-cluster's <gui-title>Support Logs</gui-title> {{< productUI lc >}} tab.

<!-- //////////////////////////////////////// -->
## API Error Information {#api-error-info}

The {{< product lc >}} APIs return error codes and error and warning messages to help you debug problems with your application.
See, for example, the {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="error-information" text="Error Information" >}} documentation in the {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" t="title" >}} reference documentation.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/app-services/logging-and-monitoring-services.md" >}}
- {{< xref f="services/monitoring-services.md" >}}

