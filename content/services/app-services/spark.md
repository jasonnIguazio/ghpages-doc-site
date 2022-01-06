---
title: "The Spark Service"
description: "Get introduced to using the Apache Spark data engine in the Iguazio MLOps Platform."
keywords: "spark, spark sql and datafarames, spark sql, sql, spark dataframes, Iguazio Spark connector, dataframes, spark nosql dataframe, nosql dataframe, r language, sparkr, nosql, key-value, kv, spark streaming, spark-streaming integration api, streaming, streams, jupyter, jupyter notebook, jupyter terminals, jupyter tutorials, v3io tutorials, tutorials, web shell, open source"
menu:
  main:
    name:       "Spark"
    parent:     "app-services"
    identifier: "spark-service"
    weight:     55
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#spark. -->
{{< /comment >}}

The {{< product lc >}} is integrated with the {{< url g="spark" v="home" k="text" link="1" >}} data engine for large-scale data processing, which is available as a user application service.
You can use Spark together with other {{< product lc >}} services to run SQL queries, stream data, and perform complex data analysis &mdash; both on data that is stored in the {{< product lc >}}'s data store and on external data sources such as RDBMSs or traditional Hadoop "data lakes".
The support for Spark is powered by a stack of Spark libraries that include {{< url g="spark" v="sql_home" k="text_w_df" link="1" >}} for working with structured data, {{< url g="spark" v="streaming_home" k="text" link="1" >}} for streaming data, {{< url g="spark" v="mllib_home" k="text" link="1" >}} for machine learning, and {{< url g="spark" v="graphx_home" k="text" link="1" >}} for graphs and graph-parallel computation.
You can combine these libraries seamlessly in the same application.
{{< comment >}}<!-- See [c-graphx] in data/vars/spark.toml. -->
{{< /comment >}}

<p align="center">
<img src="/images/spark-stack.png" alt="Apache Spack stack" width="350"/>
</p>

Spark is fully optimized when running on top of the {{< product lc >}}'s data services, including data filtering as close as possible to the source by implementing predicate pushdown and column-pruning in the processing engine.
Predicate pushdown and column pruning can optimize your query, for example, by filtering data before it is transferred over the network, filtering data before loading it into memory, or skipping reading entire files or chunks of files.

The {{< product lc >}} supports the standard Spark Dataset and DataFrame APIs in Scala, Java, Python, and R.
In addition, it extends and enriches these APIs via the {{< getvar v="spark.product_connector.full" >}}, which features a custom NoSQL data source that enables reading and writing data in the {{< product lc >}}'s NoSQL store using Spark DataFrames &mdash; including support for table partitioning, data pruning and filtering (predicate pushdown), performing "replace" mode and conditional updates, defining and updating counter table attributes (columns), and performing optimized range scans.
{{< comment >}}<!-- [c-spark-nosql-df-features] [IntInfo] (sharonl) Similar
  info is also found in the Spark-APIs reference doc at
  data-layer/reference/spark-apis/spark-datasets/overview.md, and a more
  extended version is found in the NoSQL Spark DF reference doc at
  data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md. -->
{{< /comment >}}
{{< condition filter="nosql_scala_api" filterval="false" >}}
The {{< product lc >}} also supports the Spark Streaming API.
{{< /condition >}}
{{< condition filter="nosql_scala_api" filterval="true" >}}
The {{< product lc >}} also provides a custom NoSQL Spark API that includes support for various item update modes, conditional-update logic and the use of update expressions, and the ability to define counter attributes.
The {{< product lc >}} supports the Spark Streaming API as well.
{{< /condition >}}
For more information, see the {{< xref f="data-layer/reference/spark-apis/" text="Spark APIs reference" >}}.

You can run Spark jobs on your {{< product lc >}} cluster from a Jupyter web notebook; for details, see {{< xref f="data-layer/reference/spark-apis/overview.md" a="web-notebook" text="Running Spark Jobs from a Web Notebook" >}}.
You can also run Spark jobs by executing <file>spark-submit</file> from a web-based shell or Jupyter terminal or notebook; for details, see {{< xref f="data-layer/reference/spark-apis/overview.md" a="spark-submit" text="Running Spark Jobs with spark-submit" >}}.
You can find many examples of using Spark in the {{< product lc >}}'s {{< xref f="services/app-services/jupyter.md" text="Jupyter" >}} tutorial notebook, {{< xref f="data-layer/spark-data-ingestion-qs.md/" text="Spark data-ingestion quick-start tutorial" >}}, and {{< xref f="data-layer/reference/spark-apis/" text="Spark APIs reference" >}}.
See also the Spark restrictions in the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="spark" >}} documentation.
{{< comment >}}<!-- [TODO-SITE-RESTRUCT-P2] (sharonl) TODO: Edit further. For
  now, I replaced the previous link to the getting-started/tutorials/ index
  page with a link to the Spark data-ingestion QSG. -->
{{< /comment >}}

You can also use the Spark SQL and DataFrames API to run Spark over a Java database connectivity (JDBC) connector.
For more information, see {{< xref f="data-layer/data-ingestion-and-preparation.md" a="spark-over-jdbs" >}}.

{{< note id="spark-session-start-stop-best-practice-note" >}}
It's good practice to create a Spark session at the start of the execution flow (for example, by calling <func>SparkSession.builder</func> and assigning the result to a `spark` variable) and stop the session at the end of the flow to release resources (for example, by calling `spark.stop()`).
{{< comment >}}<!-- [c-spark-multi-sessions] [IntInfo] (sharonl) This is
  especially important in k8s environments and specifically when using multiple
  concurrent notebooks (e.g., multiple Jupyter notebooks or Jupyter notebooks
  and the Zeppelin notebook). See the info in DOC IG-10363. (JG 12-9-21) Zeppelin not supported from v3.2. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="data-layer/reference/spark-apis/" >}}
- {{< xref f="services/app-services/presto.md" >}}
- {{< xref f="data-layer/nosql/" >}}
- {{< xref f="data-layer/tsdb/" >}}
- {{< xref f="data-layer/stream/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="spark" text="Spark software specifications and restrictions" >}}

