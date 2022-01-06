---
title: "The Web-Shell Service"
description: "Get introduced to the web-based command-line shell (web shell) service of the Iguazio MLOps Platform."
keywords: "web shell, web-based command-line shell, web-based shell, command-line shell, command line, shell, file system, hadoops, hdfs, spark, presto, presto cli, sql queries, sql"
menu:
  main:
    name:       "Web Shell"
    parent:     "app-services"
    identifier: "web-shell-service"
    weight:     80
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#web-shell. -->
{{< /comment >}}

The {{< product lc >}} includes a web-based command-line shell ("web shell") service for running application services and performing basic file-system operations from a web browser.
For example, you can use the Presto CLI to run SQL queries on your data; use the TSDB CLI to work with TSDBs; use <file>spark-submit</file> to run Spark jobs; run local and Hadoop file-system commands; or use <file>{{< url v="kubectl" k="ref" k2="text" link="1" >}}</file> CLI to run commands against the {{< product lc >}}'s application clusters.

The custom web-shell service parameters allow you to optionally associate the service with a Spark service and select a Kubernetes service account that will determine the permissions for using the <file>kubectl</file> CLI from the web shell.
Following is a list of the <file>kubectl</file> operations that can be performed with each service account:

- **"None"** &mdash; no permission to use <file>kubectl</file>.
- **"Log Reader"** &mdash; list pods and view logs.
- **"Application Admin"** &mdash; list pods; view logs; and create or delete secrets and ConfigMaps.
- **"Service Admin"** &mdash; list pods; view logs and resource metrics; create or delete secrets and ConfigMaps; create, delete, list, or get jobs and cron jobs; and view, edit, list, or delete Persistent Volume Claims (PVCs).

{{< note id="web-shell-notes" >}}
- <a id="web-shell-note-full-linux-shell-note"></a>The web shell isn't a fully functional Linux shell.
    See {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="web-shell" >}} for specific restrictions.
- <a id="web-shell-exit-note"></a>To log out of the web shell, run the <cmd>exit</cmd> command in the shell.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] TODO: Add more see-also links. -->
{{< /comment >}}

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="services/app-services/jupyter.md" >}}
- {{< xref f="services/app-services/spark.md" >}}
- {{< xref f="services/app-services/presto.md" >}}
- {{< xref f="services/app-services/hadoop.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="web-shell" text="web-shell software specifications and restrictions" >}}

