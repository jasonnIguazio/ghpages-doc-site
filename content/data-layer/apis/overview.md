---
title:      "Overview of the Data-Layer APIs"
linktitle:  "Data-Layer APIs Overview"
description: "An overview of the Iguazio MLOps Platform data-layer APIs for NoSQL (KV), TSDB, stream, and file/object dataa"
keywords: "data layer, data fabric, data store, distributed file system, dsf, platform data layer, platform data fabric, platform distributed file system, platform file system, file system, platform data, platform database, database, data services, data apis, platform apis, apis, nosql, kv, nosql store, kv store, nosql database, nosql tables, data streams, streams, tsdb, time-series data bases, time-series, dask, frames, v3io frames, kafka, pandas, prometheus, v3io prometheus, nuclio, presto, spark, spark dataframes, spark datasets, spark nosql dataframe, spark sql, spark streaming api, v3io tsdb, tsdb cli, tsdb nuclio functions, web apis, nosql web api, simple-object web api, streaming web api"
menu:
  main:
    name:       "APIs Overview"
    parent:     "data-layer-apis"
    identifier: "data-layer-apis-overview"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces the intro/ecosystem/data-fabric.md
  data-fabric (data-layer) APIs overview.
  [TODO-SITE-RESTRUCT-P2] Edit the content and consider duplicating or moving
  to the data-layer/reference/ section.
  [TODO-SITE-RESTRUCT-P3] Check and edit the front-matter keywords. -->
{{< /comment >}}
{{< comment >}}<!-- [TODO-v3io-py-SDK] [IntInfo] (sharonl) TODO: Refer also
  to the V3IO Python SDK [DOC IG-15596]. We still need to decide how to
  document it as part of the platform doc. -->
{{< /comment >}}

As explained in the {{< xref f="data-layer/" text="data-layer overview" >}}, the {{< product lc >}} exposes multiple proprietary and third-party application programming interfaces (APIs) for working with different types of data, including data ingestion and preparation, and allows you to access the same data from different interfaces.

The following table shows the provided programming interfaces for working with different types of data in the {{< product lc >}}'s data store.
For full API references, see the {{< xref f="data-layer/reference/" text="data-layer references" >}}.

<table style="width:100%">
<tr text-align="left">
  <th style="width:20%; vertical-align:'top'; font-weight:bold;">
    Data Type
  </th>
  <th style="font-weight:bold; vertical-align:'top';">
    Interfaces
  </th>
</tr>
<tr>
  {{< td >}}NoSQL (Wide-Column Key/Value) Data
    {{< comment >}}<!-- [IntInfo] (sharonl) (12.2.18) Previously we referred
      to "Unstructured Data (NoSQL)" but Golan said it's incorrect to
      characterize NoSQL as unstructured data (it can be structured or
      unstructured, the main difference, initially, from SQL was that it
      supported distributed DBs), and it's incorrect to refer to Spark DFs
      (even only our NoSQL DF) as a solution for unstructured data because
      Spark DFs work only with structured data. Adi OKed referring simply to
      "NoSQL Data" (and to "SQL Data" in the next row). (17.4.19) I added
      "(Wide-Column Key/Value)" based on the previous v2.x v3io/tutorials
      PlatformComponents.pdf document, which was replaced with this doc page.
    -->
    {{< /comment >}}
  {{< /td >}}
  {{< td >}}The {{< product lc >}}'s NoSQL data store was built to take advantage of a distributed cluster of physical and virtual machines that use flash memory to deliver in-memory performance while keeping flash economy and density.
    You can access NoSQL data through these interfaces:

- {{< xref f="data-layer/reference/web-apis/nosql-web-api/" text="NoSQL Web API" >}} (Amazon DynamoDB equivalent)
{{< condition filter="nosql_scala_api" filterval="true" >}}
- {{< xref filter="nosql_scala_api" filterval="true" f="data-layer/reference/scala-apis/nosql-scala-api/" text="NoSQL API" >}} (Scala)
{{< /condition >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" text="NoSQL Spark DataFrame" >}}
- [{{< getvar v="product.frames.name.long_sc" >}}]({{< xref f="data-layer/reference/frames/" t="url" >}})
  {{< /td >}}
</tr>
<tr>
  {{< td >}}SQL Data
  {{< /td >}}
  {{< td >}}You can work with SQL data in the {{< product lc >}} through these interfaces:

- [Spark SQL and Datasets]({{< getvar v="spark.home.full" >}}) &mdash; for writing and reading (querying) SQL data
- {{< xref f="data-layer/presto/" text="Presto" >}} &mdash; for running SQL queries
  {{< /td >}}
<tr>
  {{< td >}}Time-Series Data
  {{< /td >}}
  {{< td >}}You can create and manage time-series databases in the {{< product lc >}}'s data store through these interfaces:

- [{{< getvar v="product.tsdb.name.tc" >}} CLI]({{< public-gh ghid="tsdb" k="full" >}}) &mdash; for creating and deleting TSDB tables, and ingesting and consuming (querying) time-series data
- {{< public-gh ghid="prometheus" link="1" k="text" >}} &mdash; for querying TSDBs
  {{< /td >}}
</tr>
</tr>
<tr>
  {{< td >}}Stream
  {{< /td >}}
  {{< td >}}You can stream data directly into the {{< product lc >}} and consume data from {{< product lc >}} streams through the following interfaces:

- {{< xref f="data-layer/reference/web-apis/nosql-web-api/" text="Streaming Web API" >}} (Amazon Kinesis equivalent)
- [Apache Spark Streaming API]({{< getvar v="spark.streaming_home.full" >}}), which is supported via the {{< product lc >}}'s {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/" text="Spark-Streaming Integration API" >}}
    {{< comment >}}<!-- [c-v3ioutils-python-support] TODO: Verify the Python
      reference with Adi. Currently it's unclear whether we'll officially
      support this but our public taxi-streaming example uses this API. -->
    {{< /comment >}}
- {{< url v="kafka_home" k="text" link="1" >}} distributed streaming platform
- [{{< getvar v="product.frames.name.long_sc" >}}]({{< xref f="data-layer/reference/frames/" t="url" >}})
  {{< /td >}}
</tr>
<tr>
  {{< td >}}File / Simple Data Object
  {{< /td >}}
  {{< td >}}You can work with data files and simple data objects &mdash; such CSV, Parquet, or Avro files, or binary image or video files &mdash; through these interfaces:

- Local Linux file system
- {{< xref f="data-layer/reference/web-apis/simple-object-web-api/" text="Simple-Object Web API" >}} (Amazon S3 equivalent)
    {{< comment >}}<!-- https://aws.amazon.com/documentation/s3/ -->
    {{< /comment >}}
- [Apache Hadoop Compatible File System (HCFS)]({{< getvar v="hadoop.user_guide.full" >}}) (the {{< product lc >}}'s distributed file system (DFS) is HCFS compliant)
- [{{< getvar v="product.frames.name.long_sc" >}}]({{< xref f="data-layer/reference/frames/" t="url" >}})
- [Spark SQL and Datasets]({{< getvar v="spark.home.full" >}}) &mdash; for supported data formats such as CSV and Parquet
- {{< url v="pandas_home" k="text" link="1" >}} or {{< url v="dask_home" k="text" link="1" >}}
  {{< /td >}}
</tr>
</table>

{{< note id="data-services-notes" >}}
- See {{< xref f="data-layer/apis/overview.md" >}} for a summary of the {{< product lc >}} data-layer APIs; {{< xref f="data-layer/apis/data-paths" >}} for explanations on how to set the data paths for each API; and {{< xref f="data-layer/reference/" >}} for comprehensive references.
- See the {{< product lc >}}'s {{< public-gh ghid="tutorials" link="1" path="/" k="text_jupyter_long" >}} for code examples and full use-case applications that demonstrate how to use the different APIs.
- The {{< product lc >}}'s web APIs (for working with NoSQL, streaming, and simple-object data) are exposed as an application service.
    The API endpoint URL of this service is available from the {{< productUI lc >}} <gui-title>Services</gui-title> page.
    For more information about working with the web APIs, see the {{< xref f="data-layer/reference/web-apis/" text="web-APIs reference" >}}, and especially {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}} and {{< xref f="data-layer/reference/web-apis/security.md" >}}.
- See also {{< xref f="services/app-services/" >}} for information on related application services &mdash; and specifically {{< xref f="services/app-services/spark.md" text="Spark" >}}, {{< xref f="services/app-services/presto.md" text="Presto" >}}, {{< xref f="services/app-services/tsdb.md" text="TSDB" >}}, {{< xref f="services/app-services/python-ds-pkgs" a="pandas" text="pandas" >}}, and {{< xref f="services/app-services/frames.md" textvar="product.frames.name.long_lc" >}}.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/apis/data-paths.md" >}}
- {{< xref f="data-layer/reference/" >}}
- {{< xref f="data-layer/presto/" >}}
- {{< xref f="data-layer/data-ingestion-and-preparation.md" >}}
- {{< xref f="services/" >}}

