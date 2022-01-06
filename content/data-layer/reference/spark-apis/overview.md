---
title:      "Overview of the Spark APIs"
linktitle:  "Spark-APIs Overview"
description:  "Overview of the Iguazio MLOps Platform Spark APIs"
keywords: "spark apis, spark, spark datasets, spark dataframes, sql, nosql, nosql dataframe, spark streaming, spark streaming api, spark streaming integration api, streaming, scala, python, spark-submit"
menu:
  main:
    name:       "Overview"
    parent:     "spark-apis"
    identifier: "spark-apis-overview"
    weight:     5
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  reference/api-reference/spark-apis/overview.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from
  data-ingestion-and-preparation/spark-sql-analytics.ipynb). (Until then and
  for previous tutorials releases, we'll have URL redirect rules as part of the
  restructured-site publication.)
-->
{{< /comment >}}

{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from data-ingestion-and-preparation/spark-sql-analytics.ipynb).
-->
{{< /comment >}}
{{< comment >}}<!-- [V2.0-TODO-SPARK] Add Spark resources configuration info -
  see Requirement IG-10774 / DOC IG-11180. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

The {{< product lc >}} supports the following standard [Apache Spark](https://spark.apache.org/) APIs and custom extensions and APIs for working with data over the Spark engine:

-   **Spark Datasets** &mdash; you can consume and update data in the {{< product lc >}} by using Apache Spark SQL Datasets/DataFrames.
    You can also extend the standard Spark DataFrames functionality by using the {{< product lc >}}'s custom NoSQL Spark DataFrame data source.
    See {{< xref f="data-layer/reference/spark-apis/spark-datasets/" >}}.

-   **Spark Streaming API** &mdash; you can use the {{< product lc >}}'s Spark-Streaming Integration Scala API to map {{< product lc >}} streams to Spark input streams, and then use the Apache Spark Streaming API to consume data and metadata from these streams.
    See {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/" >}}.

{{< condition filter="nosql_scala_api" filterval="true" >}}
{{< comment >}}<!-- [NOSQL-SCALA-API-REF] TODO: If and when the following is
  returned, consider returning "counters, counter attributes" to the page's
  keywords. -->
{{< /comment >}}
Note that the {{< product lc >}}'s Scala and web NoSQL APIs extend the functionality provided by the Spark APIs and related {{< product lc >}} extensions.
For example, these APIs support various item update modes, conditional-update logic and the use of update expressions, and the ability to define counter attributes.
For more information, see {{< xref f="data-layer/reference/web-apis/nosql-web-api/" >}} and {{< xref filter="nosql_scala_api" filterval="true" f="data-layer/reference/scala-apis/nosql-scala-api/" >}}.
{{< /condition >}}
{{< condition filter="nosql_scala_api" filterval="false" >}}
Note that the {{< product lc >}}'s NoSQL Web API extends the functionality provided by the Spark APIs and related {{< product lc >}} extensions.
This API supports various item update modes, conditional-update logic and the use of update expressions, and the ability to define counter attributes.
For more information, see {{< xref f="data-layer/reference/web-apis/nosql-web-api/" >}}.
{{< /condition >}}

You can run Spark jobs in the {{< product lc >}} using standard industry tools.
For example, you can run [<file>spark-submit</file>](#spark-submit) from a web-based shell or Jupyter Notebook service, or [run Spark jobs from a web notebook](#web-notebook) such as Jupyter Notebook, provided the service is connected to a Spark service.
All these {{< product lc >}} interfaces have a predefined `{{< verkey k="spark.k8s.install_dir_envar" >}}` environment variable that maps to the Spark installation directory.
The spark-installation binaries directory (<path>{{< verkey k="spark.k8s.install_bin_dir_path_w_envar" >}}</path>) contains the required binaries and shell scripts for running Spark; this directory is included in the environment path (`$PATH`) to simplify execution from any directory.
The installation also includes the required library files for using the {{< product lc >}}'s Spark APIs and the built-in Spark examples.

{{< note id="spark-session-start-stop-best-practice-note" >}}
It's good practice to create a Spark session at the start of the execution flow (for example, by calling <func>SparkSession.builder</func> and assigning the result to a `spark` variable) and stop the session at the end of the flow to release its resources (for example, by calling `spark.stop()`).
{{< comment >}}<!-- [c-spark-multi-sessions] [IntInfo] (sharonl) (20.3.19) This
  was initially added to bypass an issue with a single Spark application
  (running from a Jupyter or Zeppelin notebook or with spark-submit) consumes
  all available Spark resources and therefore prevents other Spark apps from
  running - see Bug IG-10774. This was resolved for v2.0.0 (k8s) by configuring
  default max resources for our Spark jobs (and allowing users to override the
  default), but Golan and Orit confirmed that we should still keep this
  best-practice note, because the configured resources are still being used
  until the application releases them by stopping the Spark session/context.
  (In v2.0.0 there's a bug related to the default resource configurations not
  being applied in Zeppelin - see Bug IG-11162.)
  See also the info in DOC IG-11180. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Running Spark Jobs with spark-submit {#spark-submit}

You can run Spark jobs by executing <file>spark-submit</file> from the UI of a web-based shell service or from a terminal or notebook in the UI of a Jupyter Notebook service, provided the service is connected to a Spark service.
For detailed information about <file>spark-submit</file>, see the {{< url g="spark" v="spark_submit_doc" k="title" link="1" >}} Spark documentation.
<cmd>spark-submit</cmd> is mapped to the location of the script (<path>{{< verkey k="spark.k8s.install_bin_dir_path_w_envar" >}}/spark-submit</path>), so you can run <cmd>spark-submit</cmd> without specifying the path.

The master URL of the Spark cluster is preconfigured in the environments of the {{< product lc >}} web-based shell and Jupyter Notebook services.
Do _not_ use  the <opt>--master</opt> option to override this configuration.
{{< comment >}}<!-- [InfInfo] (sharonl) (24.6.20) I commented out the following
  doc from all active doc sites (v2.8.0 & v2.5.4), in consultation with R&D
  (Orit and Dina) because we don't currently document the low-level Python APIs
  and we don't want users to use them + we now have a v3io-py SDK
  (https://github.com/v3io/v3io-py/), so the use of the same name for the
  low-level API might cause confusion.
  [c-v3io-py-api-rename] In v2.10.0 we've renamed the "v3io-py" API module to
  to "v3iopy" and the v3io-py.zip Java libraries-bundle archive file to
  v3io-pyspark.zip (and PYTHONPATH was updated accordingly) - see Task IG-16069.
-->
<br/>
The path to the {{< product lc >}}'s Python-API libraries bundle (<path>{{< verkey k="fs_k8s.java.v3io_python_lib.bundle_path_w_envar" >}}</path>) is also preconfigured in these environments, so you don't need to add the <opt>--py-files</opt> option to <cmd>spark-submit</cmd> commands that run Spark jobs that use these APIs.
{{< /comment >}}

The library files for the built-in Spark examples are found at <path>{{< verkey k="spark.k8s.install_dir_path_w_envar" >}}/examples/jars</path>.
You can run the following command, for example, to execute the SparkPi example, which calculates the value of pi:
```sh
spark-submit --class org.apache.spark.examples.SparkPi {{% verkey k="spark.k8s.install_dir_path_w_envar" %}}/examples/jars/spark-examples*.jar 10
```
When the command succeeds, the output should contain the following line:
```sh
Pi is roughly 3.1432911432911435 
```

To refer <file>spark-submit</file> to your own Spark application or library (JAR) file, upload the file to one of your cluster's data containers, and then specify the path to the file by using the `{{< verkey k="fs_k8s.data_mount.name" >}}` cluster data mount &mdash; `{{< verkey k="fs_k8s.data_mount.path" >}}/<container name>/<path to file>`.
For example, the following command runs a <file>myapp.py</file> Python application that is found in a <dirname>pyspark_apps</dirname> directory in the "{{< getvar v="product.default_container.name" >}}" container:
  ```sh
spark-submit {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.default_container.name" %}}/pyspark_apps/myapp.py
```

<!-- ---------------------------------------- -->
### Deploy Modes {#deploy-modes}
{{< comment >}}<!-- [InfInfo] (sharonl) See Requirement IG-14199 / DOC IG-16398.
  References:
  - Spark doc: "Spark Standalone Mode" > "Launching Spark Applications" -
    https://spark.apache.org/docs/latest/spark-standalone.html#launching-spark-applications
  - Internal spec: "Enabling cluster deploy-mode for the Spark service" -
    https://confluence.iguazeng.com/pages/viewpage.action?spaceKey=FC&title=Enabling+cluster+deploy-mode+for+the+Spark+service

  The Spark documentation uses the terminology "deploy mode" and not
  "deployment node". -->
{{< /comment >}}

<!-- ======================================== -->
#### Client Deployment {#client-deployment}

By default, <file>spark-submit</file> launches applications using the <api-b>client</api-b> deploy mode.
In this mode, the driver is launched in the same worker process as the client that submits the application (such as Jupyter Notebook, or a web shell).

<!-- ======================================== -->
#### Cluster Deployment {#cluster-deployment}

You can optionally submit Spark jobs using the <api-b>cluster</api-b> deploy mode by adding <opt>--deploy-mode=cluster</opt> to the <cmd>spark-submit</cmd> call.
In this mode, the driver is launched from a worker process in the cluster.
This mode is supported for Scala and Java; Spark doesn't currently support Python in standalone clusters.

Cluster deployment provides a variety of advantages such as the ability to automate jobs execution and run Spark jobs remotely on the cluster &mdash; which is useful, for example, for running ongoing Spark jobs, such as streaming.

<!-- //////////////////////////////////////// -->
## Running Spark Jobs from a Web Notebook {#web-notebook}

One way to run Spark jobs is from a web notebook for interactive analytics.
The {{< product lc >}} comes preinstalled with an open-source web-notebook application &mdash; {{< url v="jupyter_notebook_docs" k="base" k2="text" link="1" >}}. (See {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}} and {{< xref f="services/app-services/" >}}).
For more information about these tools and how to use them to run Spark jobs, see the respective third-party product documentation.

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] TODO: Add more see-also links. -->
{{< /comment >}}

- {{< xref f="services/app-services/spark.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="spark" text="Spark software specifications and restrictions" >}}

