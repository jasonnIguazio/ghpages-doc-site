---
title: "The Presto Service"
description: "Get introduced to using the Preso SQL query in the Iguazio MLOps Platform."
keywords: "presto, presto cli, Iguazio Presto connector, distributed sql query engine, sql query engine, hive, hive metastore, parquet, parquez, orc, sql queries, sql, nosql, key-value, kv, time-series databases, time series, tsdb, jupyter, jupyter notebook, jupyter terminals, jupyter tutorials, v3io tutorials, tutorials, web shell, open source"
menu:
  main:
    name:       "Presto and Hive"
    parent:     "app-services"
    identifier: "presto-service"
    weight:     50
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#presto. -->
{{< /comment >}}
{{< comment >}}<!-- [c-presto-in-jupyter] (sharonl) If and when we support
  running Presto from Jupyter Notebook, mention this here as well. -->
{{< /comment >}}

{{< url g="presto" v="home" k="text" link="1" >}} is an open-source distributed SQL query engine for running interactive analytic queries.
The {{< product lc >}} has a pre-deployed tenant-wide Presto service that can be used to run SQL queries and perform  high-performance low-latency interactive data analytics.
You can ingest data into the {{< product lc >}} using your preferred method &mdash; such as using Spark, the NoSQL Web API, a Nuclio function, or {{< getvar v="product.frames.name.long_lc" >}} &mdash; and use Presto to analyze the data interactively with the aid of your preferred {{< xref f="services/app-services/data-monitoring-and-visualization-services.md" text="visualization tool" >}}.
Running Presto over the {{< product lc >}}'s data services allows you to filter data as close as possible to the source.

You can run SQL commands that use ANSI SQL <cmd>SELECT</cmd> statements, which will be executed using Presto, from {{< xref f="services/app-services/jupyter.md" text="Jupyter Notebook" >}}, a serverless {{< xref f="services/app-services/nuclio.md" text="Nuclio" >}} function, or a local or remote Presto client.
The {{< product lc >}} comes pre-deployed with the native Presto CLI client (<file>presto-cli</file>), a convenience wrapper to this CLI that preconfigures some options for local execution (<file>presto</file>), and the Presto web UI &mdash; which you can log into from the {{< productUI lc >}}'s <gui-title>Services</gui-title> page.
You can also integrate the {{< product lc >}}'s Presto service with a remote Presto client &mdash; such as Tableau or QlikView >}} &mdash; to remotely query and analyze data in the {{< product lc >}} over a Java database connectivity (JDBC) connector.

The {{< getvar v="presto.product_connector.full" >}} enables you to use Presto to run queries on data in the {{< product lc >}}'s NoSQL store &mdash; including support for partitioning, predicate pushdown, and column pruning, which enables users to optimize their queries.

<a id="hive"></a>You can also use Presto's built-in **{{< url g="presto" v="doc" k="hive_connector" k2="text_short" link="1" >}}** to query data of the supported file types, such as Parquet or ORC, or to save table-query views to the default Hive schema.
Note that to use the Hive connector, you first need to create a Hive Metastore by enabling Hive for the {{< product lc >}}'s Presto service.
For more information, see {{< xref f="data-layer/presto/overview.md" a="hive-connector" text="Using the Hive Connector" >}} in the Presto overview.
{{< comment >}}<!-- [IntInfo] (sharonl) The Presto Hive connector doc uses the
  "file type" terminology. See [c-presto-hive-connector-sup-file-types] in
  data/vars/presto.toml for more info and the full list of supported file types.
-->
{{< /comment >}}

The {{< product lc >}} also has a built-in process that uses Presto SQL to create a Hive view that monitors both real-time data in the {{< product lc >}}'s NoSQL store and historical data in Parquet or ORC tables {{< techpreview mark="1" >}}.
{{< comment >}}<!-- [IntInfo] (sharonl) [c-parquez-name-in-docs] [PENDING-ADI]
  (29.7.18) For now, following Ronen's input that "Parquez" is an internal tool
  name that should not be mentioned in the doc, I didn't refer to "Parquez" in
  the documentation. However, the user currently activates this tool by running
  a "run_parquez" CLI utility and the Parquez files are located in the same
  directory as the CLI. Avi says he has no problem changing this but Adi needs
  to define what he wants the CLI name to be and whether to place the Parquez
  files in a different location. I asked Adi, several times, to do this. We
  decided not to mention any name for this process/tool until the external name
  is finalized, although both Nir and I think this we need to mention the name
  ASAP. See additional info in DOC IG-8018 and in the internal info for the
  Parquez IG-7066 release note in the v1.7.1 RNs. (12.6.19) This is still true
  for v2.2.0 and its k8s deployments. I reminded Adi about this also for this
  release, but I still don't have an answer. See also DOC IG-10720. -->
{{< /comment >}}

For more information about using Presto in the {{< product lc >}}, see the {{< xref f="data-layer/presto/" text="Presto Reference" >}}.
See also the Presto and Hive restrictions in the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="presto" >}} documentation.

{{< note  >}}
If you delete the Presto service, Hive and Mariadb will automatically be disabled.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="data-layer/presto/" >}}
- {{< xref f="data-layer/presto/presto-cli.md" >}}
- {{< xref f="services/app-services/spark.md" >}}
- {{< xref f="data-layer/nosql/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="presto" text="Presto and Hive software specifications and restrictions" >}}

