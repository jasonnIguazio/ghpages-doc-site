---
title:      "Overview of Spark Datasets"
linktitle:  "Spark-Datasets Overview"
description:  "Overview of Spark datasets and DataFrames in the Iguazio MLOps Platform"
keywords: "spark datasets, spark dataframes, spark, nosql dataframe, Iguazio Spark connector, nosql, nosql tables, counters, counter attributes, data paths, table paths, v3io, table items, rows, attributes, columns, primary key, identity column, sharding key, sorting key, range scan, spark dataframe data types, spark data types, containers, scala, python"
menu:
  main:
    name:       "Overview"
    parent:     "spark-datasets-api"
    identifier: "spark-datasets-api-overview"
    weight: 10
---

<!-- //////////////////////////////////////// -->
## Using Spark DataFrames {#using-spark-dataframes}

A Spark Dataset is an abstraction of a distributed data collection that provides a common way to access a variety of data sources.
A DataFrame is a Dataset that is organized into named columns ("attributes" in the {{< product lc >}}'s unified data model).
See the {{< url g="spark" v="sql_n_ds_guide" k="title" link="1" >}}.
You can use the Spark SQL Datasets/DataFrames API to access data that is stored in the {{< product lc >}}.
{{< comment >}}<!-- [IntInfo] (sharonl) Rephrased on 18.2.18 with Golan.
  Note that Golan asked not to write "Apache Spark Dataset" (remove "Apache").
-->
{{< /comment >}}

In addition, the {{< product lc >}}'s {{< getvar v="spark.product_connector.full" >}} defines a custom data source that enables reading and writing data in the {{< product lc >}}'s NoSQL store using Spark DataFrames &mdash; including support for table partitioning, data pruning and filtering (predicate pushdown), performing "replace" mode and conditional updates, defining and updating counter table attributes (columns), and performing optimized range scans.
For more information, see {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" >}}.
{{< comment >}}<!-- [c-spark-nosql-df-features] [IntInfo] (sharonl) Similar
  info is also found in the services/app-services.md intro doc and a more
  extended version is found in the Spark-APIs reference doc at
  data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md. -->
{{< /comment >}}

See {{< xref f="data-layer/reference/spark-apis/spark-datasets/spark-df-data-types.md" >}} for the data types that are currently supported in the {{< product lc >}}.

<!-- //////////////////////////////////////// -->
## Spark DataFrames and Tables {#spark-dataframes-and-tables}

A **DataFrame** consumes and updates data in a {{< xref f="data-layer/nosql/" a="overview" text="table" >}}, which is a {{< xref f="data-layer/objects/" text="collection" >}} of data objects &mdash; **{{< xref f="data-layer/nosql/" a="overview" text="items" >}}** (**rows**) &mdash; and their **{{< xref f="data-layer/objects/attributes.md" text="attributes" >}}** (**columns**).
The attribute name is the column name, and its value is the data stored in the relevant item (row).
See also {{< xref f="data-layer/nosql/" >}}.
As with all data in the {{< product lc >}}, the tables are stored within {{< xref f="data-layer/containers/" text="data containers" >}}.

When writing (ingesting) data to a table with a Spark DataFrame, you need to set the <opt>key</opt> option to a column (attribute) that identifies the table's sharding key &mdash; the **sharding-key attribute**.
With the NoSQL DataFrame, you can also optionally set the custom <opt>sorting-key</opt> write option to an attribute that identifies the table's sorting key &mdash; the **sorting-key attribute**.
The combination of these keys makes up the table's primary key and is used to uniquely identify items in the table.
When no sorting-key attribute is defined, the sharding-key attribute is also the table's **primary-key attribute** (**identity column**).
See also {{< xref f="data-layer/objects/object-names-and-keys/" >}}.

<!-- //////////////////////////////////////// -->
## Data Paths {#data-paths}

When using Spark DataFrames to access data in the {{< product lc >}}'s data containers, provide the path to the data as a fully qualified `v3io` path of the following format &mdash; where `<container name>` is the name of the parent data container and `<data path>` is the relative path to the data within the specified container:

```
v3io://<container name>/<data path>
```

You pass the path as a string parameter to the relevant Spark method for the operation that you're performing &mdash; such as <func>load</func> or <func>csv</func> for read or <func>save</func> for write.
For example, <nobr>`save("v3io://mycontainer/mytable")`</nobr> or <nobr>`csv("v3io://mycontainer/mycoldata.csv")`</nobr>.
{{< comment >}}<!-- [IntInfo] (sharonl) (13.2.18) We documented only the method
  of setting an absolute v3io:// data path. Golan requested that we don't
  document the alternative methods, which are documented in the v1.0 API
  reference (in the NoSQL DataFrame page), of using `option("container-name",
  "<container name>")` (or `option("container-id", "<container ID>" [*])` and
  then setting the path to the data within the container in the
  load()/save()/... method. It's also possible to not specify the container
  name/ID at all and rely on the default-container configuration, but Golan
  doesn't want to document this option.
  [*] The v3io:// path can actually contain also a container ID instead of a
  container name, but per the guideline from R&D, we didn't document this
  option, and in locations where we mention a container-ID option we also refer
  to the #container-names-and-ids note about the deprecation of the
  container-ID options. -->
{{< /comment >}}

For additional information and examples, see the {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="table-paths" text="NoSQL Spark DataFrame" >}} reference and the {{< xref f="data-layer/spark-data-ingestion-qs.md" >}} tutorial.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/data-ingestion-and-preparation" a="spark-sql-n-dfs" text="Ingesting and preparing data using Spark" >}}
- {{< xref f="data-layer/spark-data-ingestion-qs.md" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/spark-df-data-types.md" >}}
- {{< xref f="data-layer/objects/" >}}

