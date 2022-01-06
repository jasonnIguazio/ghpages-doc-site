---
title:      "Working with NoSQL (Key-Value) Data"
linktitle:  "Working with NoSQL Data"
description: "Learn how to work with NoSQL (key-value/KV) data in the Iguazio MLOps Platform."
keywords: "working with nosql databases, working with nosql data, working with key-value data, working with kv data, nosql databases, nosql dbs, nosql data, key-value data, kv data, nosql tables, kv tables, nosql, key-value, kv, datbases, tables, table items, rows, attributes, columns, deleting tables, partitioning, partitions, range scan, items names, object names, primary key, sharding key, sorting key, terminology"
layout: "single"
menu:
  main:
    name:       "NoSQL (Key-Value) Databases"
    parent:     "data-layer"
    identifier: "data-layer-nosql"
    weight:     50
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces concepts/nosql-dbs.md.
- [SITE-RESTRUCT-P3] [IntInfo] (sharonl) TODO: Move the content of this page
  into a child working-with-nosql-dbs.md page or section; split the current
  content into multiple pages; and add API-specific sections for the NoSQL APIs
  (at the first stage these can have short text that link to related reference
  and other documentation such as in data-ingestion-and-preparation.md).
  In preparation for these changes, I used nosql/_index.md instead of nosql.md,
  even though there's currently only one NoSQL data-layer page. [InfraInfo] I
  used `layout: "single"` to eliminate the auto section menu-pages links.
  [TODO-INFRA] 
  - Update both internal ghpages-ghpages-doc-site and external references and add redirect
    rules for modified URLs.
  - Edit the front matter, including to change the `layout` value from "single"`
    to `section-list`.
    [InfraInfo] These are the front-matter keywords that I had initially
    prepared for the data-layer/nosql/_index.md:
keywords: "nosql data, nosql, key-value, kv, nosql databases, nosql tables, nosql apis, key-value apis, kv apis"
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from notebook
  data-ingestion-and-preparation/v3io-kv.ipynb). (Until then and for
  previous tutorials releases, we'll have URL redirect rules as part of the
  restructured-site publication.) TODO: Consider linking to the parent nosql/
  index page instead.
- [TODO-SITE-RESTRUCT-P2] TODO: Move some of the content to separate pages.
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from data-ingestion-and-preparation/v3io-kv.ipynb). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} provides a <a id="nosql-db-service"></a>**NoSQL database service**, which supports storage and consumption of data in a tabular format.
A **table** is a collection of data objects known as **items** (*rows*), and their **attributes** (*columns*).
For example, items can represent people with attribute names such as <attr>Name</attr>, <attr>Age</attr>, and <attr>PhoneNumber</attr>.

You can manage and access NoSQL data in the {{< product lc >}} by using the NoSQL {{< xref f="data-layer/reference/frames/nosql/" textvar="product.frames.name.lc" >}}, {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" text="Spark DataFrame" >}}{{< condition filter="nosql_scala_api" filterval="true" >}}, {{< xref filter="nosql_scala_api" filterval="true" f="data-layer/reference/scala-apis/nosql-scala-api/" text="Scala" >}}{{< /condition >}}, or {{< xref f="data-layer/reference/web-apis/nosql-web-api/" text="web" >}} APIs.

<!-- ---------------------------------------- -->
### Terminology Comparison {#terminology-comparison}

The following table compares the {{< product full >}}'s NoSQL DB terminology with that of similar third-party tools and the {{< product lc >}}'s file interface:

{{< igz-figure src="/images/nosql_terminology_comparison.png" alt="NoSQL terminology-comparison table" width="800" >}}

<!-- //////////////////////////////////////// -->
## Creating Tables {#creating-tables}

NoSQL tables in the {{< product lc >}} don't need to be created prior to ingestion.
When writing data to a NoSQL table, if the table doesn't exit, it's automatically created in the specified path as part of the write operation.

<!-- //////////////////////////////////////// -->
## Deleting Tables {#deleting-tables}

{{% delete-object table %}}

<!-- //////////////////////////////////////// -->
## Partitioned Tables {#partitioned-tables}
{{< comment >}}<!-- [IntInfo] (sharonl) (18.11.18) [c-nosql-partitioned-tables]
- See the internal information and references in DOC IG-6629 (Spark DF)
  [c-nosql-partitioned-tables-spark-df] and DOC IG-9709 (Presto)
  [c-nosql-partitioned-tables-presto] and the related NoSQL Spark DataFrame and
  Presto CLI reference documentation.
- [c-nosql-partitioned-tables-web-api] It's also possible to use the NoSQL Web
  API PutItem or UpdateItem operation to partition a table by providing the
  specific partition-directory path as the table path; (the web API just
  considers this a regular table write). QA use this, for example, to test
  querying of a partitioned table with Presto (because you can't create the
  partitions with Presto). However, we don't provide any specific support for
  querying such tables with the web API: to read an item from a partitioned
  table, you would need to specify the same partition-directory table path as
  in the equivalent write command. After consulting Ortal and Adi, I decided
  not to specifically refer to web-API partitioning in the doc.
- (16.6.19) I renamed all "Table Partitioning" doc sections in the recently
  released v2.2.0 doc to "Partitioned Tables", changed the anchor from
  #table-partitioning to #partitioned-tables, and renamed the internal-comment
  marks accordingly.
- [c-nosql-partitioned-tables-frames] In v2.5.1 we added support for reading
  partitioned tables with Frames (Requirement IG-12459 / DOC IG-12795), but the
  changes were tested only after this release and documented from v2.8.0.
  Creating (writing) partitioned tables is still not supported for Frames.
-->
{{< /comment >}}

{{< text-nosql-table-partitioning >}}The {{< product lc >}} includes specific support for partitioning NoSQL tables with Spark DataFrames {{< techpreview mark="1" >}}, and for querying partitioned tables with {{< getvar v="product.frames.name.lc" >}}, Spark DataFrames {{< techpreview mark="1" >}}, or Presto.
For more information, see the {{< xref f="data-layer/reference/frames/nosql/read.md" textvar="product.frames.name.lc" >}}, {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="partitioned-tables" text="Spark" >}}, and {{< xref f="data-layer/presto/presto-cli.md" a="partitioned-tables" text="Presto" >}} references.{{< /text-nosql-table-partitioning >}}
{{< comment >}}<!-- [ci-extra-space-around-shcd-output-or-content] See info in
  the text-nosql-table-partitioning.html shortcode. -->
{{< /comment >}}

{{< note  title="Partitioning Best Practices"
          id="table-partitioning-best-practices" >}}
When defining table partitions, follow these guidelines:

- Partition the table according to the queries that you expect to be run most often.
    For example, if you expect most queries to be by <attr>day</attr>, define a single <dirname>day</dirname> partition.
    However, if you expect most queries to be based on other attributes, partition your table accordingly; for example, if most queries will be by <attr>country</attr>, <attr>state</attr>, and <attr>city</attr>, create <path>country/state/city</path> partition directories.
- Bear in mind that the number of partitions and their sizes affect the performance of the queries:
    to optimize performance, avoid partitions that are too small (less than 10Ks of items) by consolidating partitions, especially if you have many partitions.
    For example, partitioning a table by seconds or minutes will result in a huge amount of very small partitions and therefore querying the table is likely to be inefficient, especially if you expect to have occasional scans of a larger period of time (such as a year).
{{< comment >}}<!-- [IntInfo] (sharonl) (9.12.18) Modified at Golan's request,
  including to use a single "day" partition and not "year/month/day" in the
  examples. See details in DOC IG-6629 & DOC IG-9709. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Read Optimization {#read-optimization}

By default, read requests (queries) on a NoSQL table are processed by scanning all items in the table, which affects performance.
However, the {{< product lc >}}'s NoSQL APIs support two types of read optimizations that can be used to improve performance:

- [Item-specific queries](#faster-item-specific-queries)
- [Range Scans](#range-scans)

Both optimizations involve queries on the table's primary key or its components and rely on the way that data objects (such as table items) are stored in the {{< product lc >}}:
  the name of the object is the value of its primary-key attribute; the object is mapped to a specific data slice according to the value of its sharding key (which is also the primary key for simple object names); and objects with a compound primary key that have the same sharding-key value are sorted on the data slice according to the value of their sorting key.
See {{< xref f="data-layer/objects/object-names-and-keys/" >}}.

It's recommended that you consider these optimizations when you select your table's primary key and plan your queries.
For more information and best-practice guidelines, see {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" >}}.

<!-- ---------------------------------------- -->
### Faster Item-Specific Queries {#faster-item-specific-queries}
{{< comment >}}<!-- [IntInfo] (sharonl) (7.1.19) We support such faster queries
  for the NoSQL Web API and Presto, but not for the NoSQL Spark DataFrame or
  with the Frames NoSQL backend (see DOC IG-13479). -->
{{< /comment >}}

The fastest table queries when using the {{< product lc >}}'s NoSQL Web API or the {{< getvar v="presto.product_connector.full" >}} are those that uniquely identify a specific item by its primary-key value.
Such queries are processed more efficiently because the {{< product lc >}} searches the names of the object files only on the relevant data slice and stops the search when the requested item is located.
See the web-API <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/getitem.md" text="GetItem" >}}</api> operation and the {{< xref f="data-layer/presto/presto-cli.md" a="faster-item-specific-queries" text="Presto CLI" >}} references.

<!-- ---------------------------------------- -->
### Range Scans {#range-scans}
{{< comment >}}<!-- [IntInfo] (sharonl) (19.12.18) See v1.7 & v1.9 range-scan
  Tech Preview DOC IG-7260 (web API) and DOC IG-7459 (big data - Spark &
  Presto), and v2.0.0 range-scan official-support DOC IG-9215. -->
{{< /comment >}}

A range scan is a query for specific sharding-key values and optionally also for a range of sorting-key values, which is processed by searching the sorted object names on the data slice that is associated with the specified sharding-key value(s).
Such processing is more efficient than the standard full table scan, especially for large tables.

When using {{< xref f="data-layer/reference/frames/nosql/read.md" textvar="product.frames.name.lc" >}}, {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="range-scans" text="NoSQL Spark DataFrames" >}}, or {{< xref f="data-layer/presto/presto-cli.md" a="range-scans" text="Presto" >}}, the {{< product lc >}} executes range scans automatically for compatible queries.
When using the {{< xref f="data-layer/reference/web-apis/nosql-web-api/getitems.md" a="range-scan" text="NoSQL Web API" >}}, you can select whether to perform a range scan, a parallel scan, or a standard full table scan.
{{< comment >}}<!-- [TECH-PREVIEW-FRAMES-NOSQL-RANGE-SCAN] DOC IG-13749. TODO:
  When we add a Frames range-scan doc section, edit the Frames reference xref
  to link specifically to this section. -->
{{< /comment >}}

Note that to support and use range scans effectively, you need to have a table with a compound `<sharding key>.<sorting key>` primary key that is optimized for your data set and expected data-access patterns.
When using a NoSQL Spark DataFrame or Presto, the table must also contain sharding- and sorting-key user attributes.
{{< comment >}}<!--[IntInfo] (sharonl)
  [c-nosql-structured-api-user-attrs-req-spark-df-presto-range-scan]
  (16.7.19) Frames doesn't currently support range scans (see DOC IG-12272). -->
{{< /comment >}}
Note that range scans are more efficient when using a string sorting-key attribute.
{{< comment >}}<!-- [c-sorting-key-type]
  [c-partial-range-scan-for-non-string-sorting-key-spark-nosql-df]
  [c-partial-range-scan-for-non-string-sorting-key-presto] -->
{{< /comment >}}
For more information and best-practice guidelines, see the {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" >}} guide, and especially the {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="compound-primary-key-for-faster-nosql-queries" text="Using a Compound Primary Key for Faster NoSQL Table Queries" >}} and {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="string-sorting-key-for-faster-range-scan-queries" text="Using a String Sorting Key for Faster Range-Scan Queries" >}} guidelines.

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT-P2] TODO: Further edit the see-also
  links, including replacements for the following previous links: -->
{{< /comment >}}

- {{< xref f="data-layer/data-ingestion-and-preparation.md" a="frames" text="Accessing Platform NoSQL and TSDB Data Using the Frames Library" >}}
- {{< xref f="data-layer/reference/" >}}.
    - {{< xref f="data-layer/reference/frames/nosql/" >}}
    - {{< xref f="data-layer/reference/web-apis/nosql-web-api/" >}}
    {{< condition filter="nosql_scala_api" filterval="true" >}}
    - {{< xref filter="nosql_scala_api" filterval="true" f="data-layer/reference/scala-apis/nosql-scala-api/" >}}
    {{< /condition >}}
    - {{< xref f="data-layer/reference/spark-apis/spark-datasets/" >}}
- {{< xref f="data-layer/presto/" >}}
- {{< xref f="data-layer/objects/" >}}
    - {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" >}}

