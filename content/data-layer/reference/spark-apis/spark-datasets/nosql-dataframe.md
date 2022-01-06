---
title: "The NoSQL Spark DataFrame"
description:  "Iguazio MLOps Platform Spark NoSQL dataframe API reference"
keywords: "nosql dataframe, spark, spark dataframes, NoSQL Spark DataFrame, Iguazio Spark connector, predicate pushdown, nosql, nosql tables, tables, table path, v3io, attributes, columnUpdate, counter attributes, counter, counters, condition, conditional updates, save modes, append mode, overwrite mode, replace mode, columns, partitioning, partitions, partition, item names, object names, item keys, object keys, primary key, primary-key attribute, sharding key, sharding-key attribute, sorting key, sorting-key attribute, range scan, range-scan-even-distribution, SQLContext, sql context, table schema, schema, infer schema, inferSchema, allow-overwrite-schema, sorting-key, v3io GitHub, iguazio_api_examples"
menu:
  main:
    name:       "The NoSQL DataFrame"
    parent:     "spark-datasets-api"
    identifier: "spark-datasets-api-nosql-dataframe"
    weight:     100
---

<!-- //////////////////////////////////////// -->
## Introduction {#intro}

The {{< product lc >}} includes the {{< getvar v="spark.product_connector.full" >}}, which defines a custom Spark [data source](#data-source) for reading and writing NoSQL data in the {{< product lc >}}'s NoSQL store using Spark DataFrames.
A Spark DataFrame of this data-source format is referred to in the documentation as a **NoSQL DataFrame**.
This data source supports data pruning and filtering (predicate pushdown), which allows Spark queries to operate on a smaller amount of data; only the data that is required by the active job is loaded.
{{< comment >}}<!-- [IntInfo] (sharonl) Golan explained that predicate pushdown,
  by definition, is applicable only to reads and not to writes. -->
{{< /comment >}}
The data source also allows you to work with [partitioned tables](#partitioned-tables); perform ["replace" mode](#option-columnUpdate) and [conditional](#conditional-updates) item updates; define specific item attributes as [counter attributes](#counter-attributes) and easily increment or decrement their values; and perform optimized [range scans](#range-scans).
{{< comment >}}<!-- [c-spark-nosql-df-features] [IntInfo] (sharonl) A less
  detailed version of the Spark NoSQL DataFrame advantages is also found in the
  data-layer/reference/spark-apis/spark-datasets/overview.md doc and in the
  services/app-services.md doc. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Data Source {#data-source}

To use the {{< getvar v="spark.product_connector.full" >}} to read or write NoSQL data in the {{< product lc >}}, use the <func>format</func> method to set the DataFrame's data-source format to the {{< product lc >}}'s custom NoSQL data source &mdash; <nobr>`"{{< getvar v="spark.product_connector.nosql_data_source" >}}"`</nobr>.
See the following read and write examples:
{{< comment >}}<!-- [IntInfo] (sharonl) In v2.0.0 (the first version after
  v1.6.3), SQLContext was replaced with SparkSession as the entry point for all
  Spark functionality - see
  https://spark.apache.org/docs/2.1.0/sql-programming-guide.html#starting-point-sparksession;
  http://spark.apache.org/docs/2.1.0/api/scala/index.html#org.apache.spark.sql.SparkSession (Scala) /
  http://spark.apache.org/docs/2.1.0/api/python/pyspark.sql.html#pyspark.sql.SparkSession (Python);
  http://spark.apache.org/docs/2.1.0/api/scala/index.html#org.apache.spark.sql.SQLContext (Scala) /
  http://spark.apache.org/docs/2.1.0/api/python/pyspark.sql.html#pyspark.sql.SQLContext (Python).
  The SparkSession/SQLContext read method returns a DataFrame (or a
  DataFrameReader/DataFrameWriter interface), which exposes the format method.
  (SQLContext is also supported in Spark v2.1 for backwards compatibility.)

  The appName() is optional (SparkSession.builder().getOrCreate() also works)
  but it's recommended to provide a unique session name to help identify the
  application in the Spark UI, for example.
-->
{{< /comment >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
{{< highlight scala "hl_lines=4 10" >}}
import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder.appName("My Spark Application").getOrCreate()
val df = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .load("v3io://mycontainer/src_table")
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .option("key", "id").save("v3io://mycontainer/dest_table")
{{< /highlight >}}
  {{< /tab >}}

  {{< tab "Python" >}}
{{< highlight python "hl_lines=4 10" >}}
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("My Spark Application").getOrCreate()
df = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .load("v3io://mycontainer/src_table")
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .option("key", "id").save("v3io://mycontainer/dest_table")
{{< /highlight >}}
  {{< /tab >}}
{{< /code-tabs >}}
{{< comment >}}<!-- [ci-highlight-in-code-tabs-w-import-extra-space] [InfraInfo]
  (sharonl) (19.7.20( With Hugo v0.73.0, when using the `highlight` shortcode
  within `code-tabs` > tabs`, if we insert an empty line after an `import`
  (Scala) or `from` (Python) line it produces extra vertical between the
  subsequent code lines. There was no similar issue using the same code with
  Hugo v0.57.2 and earlier. There's also no extra space with Hugo v0.73.0 when
  there's no space after the import/from line (therefore we removed the spaces
  in the code blocks above) or when there's no import/from line. TODO: FIXME -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Table Paths {#table-paths}
{{< comment >}}<!-- [IntInfo] See also the info for the "Data Paths" doc in
  the spark-apis/spark-datasets/overview.md#data-paths reference doc. -->
{{< /comment >}}

Specify the path to the NoSQL table that is associated with the DataFrame as a fully qualified `v3io` path of the following format &mdash; where `<container name>` is the name of the table's parent data container and `<data path>` is the relative path to the table within the specified container (see {{< xref f="data-layer/reference/spark-apis/spark-datasets/overview.md" a="data-paths" text="Data Paths" >}} in the Spark Datasets overview):

```
v3io://<container name>/<table path>
```

<!-- ---------------------------------------- -->
### Examples {#table-path-examples}

The following example uses a Spark DataFrame to create a NoSQL table named "cars" in a <dirname>{{< verkey k="doc_samples.ingest_dir" >}}</dirname> directory in the "{{< getvar v="product.default_container.name" >}}" container, and then reads the contents of the table into a DataFrame:

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val nosql_source = "{{% getvar v="spark.product_connector.nosql_data_source" %}}"
var table_path = "v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/cars/"

val writeDF = Seq(
    ("7843321", "Honda", "Accord", "silver", 123000),
    ("2899941", "Ford", "Mustang", "white", 72531),
    ("6689123", "Kia", "Picanto", "red", 29320)
)
writeDF.toDF("reg_license", "vendor", "model", "color", "odometer")
    .write.format(nosql_source)
    .option("key", "reg_license")
    .mode("overwrite")
    .save(table_path)

val readDF = spark.read.format(nosql_source).load(table_path)
readDF.show()
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import sys
from pyspark.sql import *
from pyspark.sql.functions import *

nosql_source = "{{% getvar v="spark.product_connector.nosql_data_source" %}}"
table_path = "v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/cars/"

writeDF = spark.createDataFrame([
    ("7843321", "Honda", "Accord", "silver", 123000),
    ("2899941", "Ford", "Mustang", "white", 72531),
    ("6689123", "Kia", "Picanto", "red", 29320),
], ["reg_license", "vendor", "model", "color", "odometer"])
writeDF.write.format(nosql_source) \
    .option("key", "reg_license") \
    .mode("overwrite") \
    .save(table_path)

readDF = spark.read.format(nosql_source).load(table_path)
readDF.show()
```
  {{< /tab >}}
{{< /code-tabs >}}
{{< comment >}}<!-- [IntInfo] (sharonl) In the Scala code, I used `var` instead
  of `val` snippet so that we can reassign the variable value in the next code
  snippet. -->
{{< /comment >}}

The following code shows several equivalent alternatives for changing the table path from the previous example to a "cars" table in the running-user directory of the "{{< getvar v="product.users_container.name" >}}" container; (note the Python code requires that you add <nobr>`import os`</nobr>).
All variations except for the first one use environment variables instead of explicitly specifying the name of the running user ("{{< getvar v="product.running_user.example" >}}" in the example):

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
table_path = "v3io://{{% getvar v="product.users_container.name" %}}/{{% getvar v="product.running_user.example" %}}/cars"
table_path = "v3io://{{% getvar v="product.users_container.name" %}}/" + System.getenv("{{< getvar v="product.running_user.envar" >}}") + "/cars"
table_path = "v3io://" + System.getenv("{{< getvar v="product.users_container.user_dir.dir_envar" >}}") + "/cars"
table_path = System.getenv("{{< getvar v="product.users_container.user_dir.dir_url_envar" >}}") + "/cars"
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
table_path = "v3io://{{% getvar v="product.users_container.name" %}}/{{% getvar v="product.running_user.example" %}}/cars"
table_path = "v3io://{{% getvar v="product.users_container.name" %}}/" + os.getenv("{{< getvar v="product.running_user.envar" >}}") + "/cars"
table_path = "v3io://" + os.getenv("{{< getvar v="product.users_container.user_dir.dir_envar" >}}") + "/cars"
table_path = os.getenv("{{< getvar v="product.users_container.user_dir.dir_url_envar" >}}") + "/cars"
```
  {{< /tab >}}
{{< /code-tabs >}}

For additional examples, see the [Examples](#examples) section on this page.

<!-- //////////////////////////////////////// -->
## Save Modes {#save-modes}

The {{< getvar v="spark.product_connector.full" >}} supports the standard Spark DataFrame save modes, which can be set using the Spark DataFrame <func>mode</func> method when writing data from a NoSQL DataFrame to a table.
For more information and examples, see the [{{< url g="spark" v="sql_n_ds_guide" k="title" >}}]({{< getvar v="spark.sql_n_ds_guide.full" >}}#save-modes) and the NoSQL DataFrame [write examples](#write-examples).

{{< note id="spark-nosql-df-append-save-mode-diffs" >}}
In some situations &mdash; such as when using the [<opt>columnUpdate</opt>](#option-columnUpdate) or [<opt>counter</opt>](#option-counter) write options &mdash; the <opt>append</opt> save mode behaves differently when used with the {{< getvar v="spark.product_connector.full" >}}, as outlined in the {{< product lc >}} documentation.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Options {#options}

Use the Spark DataFrame <func>option</func> method to configure relevant options.
See the Apache Spark Datasets documentation for the built-in options.
In addition, the {{< getvar v="spark.product_connector.full" >}} supports the following custom NoSQL DataFrame options:

<!-- Custom Read Options -->
{{< small-heading id="custom-spark-nosql-df-read-options" >}}Read Options{{< /small-heading >}}

<dl>
  <!-- inferSchema -->
  {{< param-doc name="inferSchema" id="option-inferSchema" >}}
  Set this option to `true` (`option("inferSchema", "true")`) to instruct the {{< product lc >}} to infer the schema of the NoSQL data that is being read.
  See [Inferring the Table Schema](#inferring-the-table-schema).

  {{< param-type >}}Boolean{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- Custom Write Options -->
{{< small-heading id="custom-spark-nosql-df-write-options" >}}Write Options{{< /small-heading >}}

<dl>
  <!-- key -->
  {{< param-doc name="key" id="option-key" >}}
  The name of the table's sharding-key attribute (for example, `username`).
  This option is used together with the optional [<opt>sorting-key</opt>](#option-sorting-key) option to define the table's primary key, which uniquely identifies items within the table (see {{< xref f="data-layer/reference/spark-apis/spark-datasets/overview.md" a="spark-dataframes-and-tables" text="Spark DataFrames and Tables" >}}).

  For example, for a DataFrame item (row) with a <attr>username</attr> attribute (column) whose value is `"johnd"`, calling `option("key", "username")` without setting the <opt>sorting-key</opt> option defines a simple `username` primary key and sets the item's primary-key value (name) to `johnd`.

  {{< note id="key-option-notes" >}}
- <a id="key-option-matching-df-column-n-no-value-edits-note"></a>The written DataFrame must contain a compatible attribute (column) whose name matches the value of the <opt>key</opt> option.
    Do not modify the value of this attribute after the item's ingestion, as this will result in a mismatch with the item's name and primary-key value (which remains unchanged).
    {{< comment >}}<!-- [c-nosql-structured-api-user-attrs-req] -->
    {{< /comment >}}

- <a id="sharding-key-no-periods-note"></a>The value of the sharding-key attribute cannot contain periods, because the leftmost period in an item's primary-key value is assumed to be a separator between sharding and sorting keys.
    {{< comment >}}<!-- [c-sharding-key-no-periods] [c-period-in-object-name] -->
    {{< /comment >}}
- <a id="primary-key-best-practices-note"></a>See the primary-key guidelines in the {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="string-sorting-key-for-faster-range-scan-queries" >}} guide.
  {{< /note >}}
  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- sorting-key -->
  {{< param-doc name="sorting-key" id="option-sorting-key" >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (23.12.18) I decided, for now, to
    keep the mandatory "key" option as the first option and document the
    "sorting-key" option right after it, even though it's optional and doesn't
    fit the alphabetical order used for the rest of the optional options. -->
  {{< /comment >}}
  The name of the table's sorting-key attribute (for example, `login-date`).
  This option can optionally be used together with the [<opt>key</opt>](#option-key) option to define a compound primary key, which uniquely identifies items within the table (see {{< xref f="data-layer/reference/spark-apis/spark-datasets/overview.md" a="spark-dataframes-and-tables" text="Spark DataFrames and Tables" >}}).

  For example, for a DataFrame item (row) with a <attr>username</attr> attribute whose value is `"johnd"` and a <attr>login-date</attr> attribute whose value is `"20180125"`, calling both `option("key", "username")` and `option("sorting-key", "login-date")` defines a compound `username.login-date` primary key and sets the item's primary-key value (name) to `johnd.20180125`.
  When using the even-distribution write option, the item's primary-key value will be `johnd_<n>.20180125` (for example, `johnd_2.20180125`) &mdash; see [Even Workload Distribution](#even-workload-distribution).

  {{< note id="sorting-key-option-notes" >}}
- <a id="sorting-key-option-matching-df-column-n-no-value-edits-note"></a>The written DataFrame must contain a compatible attribute (column) whose name matches the value of the <opt>sorting-key</opt> option.
    Do not modify the value of this attribute after the item's ingestion, as this will result in a mismatch with the item's name and primary-key value.
    {{< comment >}}<!-- [c-nosql-structured-api-user-attrs-req] -->
    {{< /comment >}}
- <a id="sorting-key-for-compound-primary-n-range-scans-n-best-practices-note"></a>You must set this option if you wish to define a compound `<sharding key>.<sorting key>` table primary key.
    Note that support for [range scans](#range-scans) requires a compound primary key and that range scans for tables with a string sorting-key attribute are more efficient.
    For more information and best-practice guidelines, see {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="string-sorting-key-for-faster-range-scan-queries" >}}.
    {{< comment >}}<!-- [c-sorting-key-type]
      [c-nosql-structured-api-user-attrs-req-spark-df-presto-range-scan] -->
    {{< /comment >}}
  {{< /note >}}
  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- allow-overwrite-schema -->
  {{< param-doc name="allow-overwrite-schema" id="option-allow-overwrite-schema" >}}
  Set this option to `true` (`option("allow-overwrite-schema", "true")`) to instruct the {{< product lc >}} to overwrite the current schema of the target table (if exists) with the schema that is automatically inferred from the contents of the DataFrame.
  By default, if the inferred schema differs from an existing schema for the same table, the existing schema isn't overwritten and the write fails &mdash; see [Overwriting an Existing Table Schema](#overwriting-a-table-schema).

  {{< param-type >}}Boolean{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- columnUpdate -->
  {{< param-doc name="columnUpdate" id="option-columnUpdate" >}}
  Set this option to `true` (`option("columnUpdate", "true")`) together with the <opt>append</opt> [save mode](#save-modes) for a custom replace mode &mdash; append new items and overwrite existing items (similar to the update logic of the [<opt>counter</opt>](#option-counter) option).
  See the [replace-mode write example](#write-example-replace-mode).
  {{< comment >}}<!-- [IntInfo] (sharonl) (10.8.19) The "columnUpdate" option
    can technically be set with any save mode, but it's intended purpose of
    updating the values of existing table attributes will only be implemented
    when using the "append" save mode, therefore Golan and I agreed to document
    that it's applicable with the "append" save mode, as done for the "counter"
    option in the existing doc. See more details in DOC IG-9661. -->
  {{< /comment >}}

  {{< param-type >}}Boolean{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- condition -->
  {{< param-doc name="condition" id="option-condition" >}}
  A Boolean condition expression that defines a conditional logic for executing the write operation.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" >}} for syntax details and examples.
  As explained in the expression reference documentation, attributes in the target table item are referenced in the expression by using the attribute name.
  To reference a column (attribute) in the write DataFrame from within the expression, use the syntax <nobr>`${<column name>}`</nobr>.
  For example, `option("condition", "${version} > version)"` will write to the table only if the table has a matching item (identified by its name &mdash; see the <paramname>[key](#option-key)</paramname> option) whose current <attr>version</attr> attribute value is lower than the value of the <attr>version</attr> column (attribute) in the Spark DataFrame.
  For more information, see [Conditional Updates](#conditional-updates) and the [conditional-update write example](#write-example-condition).

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- counter -->
  {{< param-doc name="counter" id="option-counter" >}}
  A comma-separated list of one or more attribute (column) names that identify counter attributes.
  For example, `option("counter", "odometer, loops")` identifies <attr>odometer</attr> and <attr>loops</attr> as counter attributes.
  For more information, see [Counter Attributes](#counter-attributes) and the [counter-attributes write example](#write-example-counters).

  {{< note >}}
-   Counter attributes must have numeric values.
-   The <opt>counter</opt> option is supported only with the NoSQL DataFrame <opt>append</opt> [save mode](#save-modes), which for counter attributes functions as a custom replace mode (similar to the update logic of the [<opt>columnUpdate</opt>](#option-columnUpdate) option).
-   The DataFrame should contain a value for each of the specified counter attributes.
    This value will be added to or subtracted from the attribute's current value, or used as the initial attribute value if the attribute doesn't already exist in the table.
    {{< comment >}}<!-- [IntInfo] (sharonl) Dina said that named counter attributes for which no value is set in the DataFrame are simply ignored, but I decided not to document this because the expectation when defining a counter attribute is that a related value will be provided. -->
    {{< /comment >}}
  {{< /note >}}

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- partition -->
  {{< param-doc name="partition" id="option-partition" >}}
  {{< techpreview mark="1" >}} A comma-separated list of one or more attribute (column) names that identify partition attributes.
  The written items are saved to <path>&lt;table path&gt;/&lt;attribute&gt;=&lt;value&gt;[/&lt;attribute&gt;=&lt;value&gt;/...]</path> partition directories according to the values of the items' partition attributes.
  Note that the order of the partition attribute names in the option string determines the partitioning hierarchy.
  For example, `option("partition", "year, month, day, hour")` identifies <attr>year</attr>, <attr>month</attr>, <attr>day</attr>, and <attr>hour</attr> as partition attributes and saves items in <path>year=&lt;value&gt;/month=&lt;value&gt;/day=&lt;value&gt;/hour=&lt;value&gt;</path> partitions (such as <path>mytable/year=2018/month=2/day=12/hour=21</path>) within the root table directory.
  For more information and examples, see [Partitioned Tables](#partitioned-tables).

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- range-scan-even-distribution -->
  {{< param-doc name="range-scan-even-distribution" id="option-range-scan-even-distribution" >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (7.1.19) Orit confirmed that the
    "range-scan" reference in the option name isn't accurate because the
    recalculation of the sharding-key (and hence the primary-key) values that
    is done with this option isn't beneficial only to allow range scans. -->
  {{< /comment >}}
  Set this option to `true` (`option("range-scan-even-distribution", "true")`) to instruct the {{< product lc >}} to distribute items with the same sharding-key attribute value among multiple data slices, to achieve a more even distribution of non-uniform data.
  This option is applicable only for tables with a compound `<sharding key>.<sorting key>` primary key, which can be created by using both the [<opt>key</opt>](#option-key) and [<opt>sorting-key</opt>](#option-sorting-key) write options.
  For more information, see [Even Workload Distribution](#even-workload-distribution).

  {{< param-type >}}Boolean{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
## Defining the Table Schema {#defining-the-table-schema}

Spark DataFrames handle structured data.
Therefore, Spark needs to be aware of the schema of the data structure.
When writing NoSQL data by using the {{< product lc >}}'s Spark DataFrame or {{< getvar v="product.frames.name.lc" >}} APIs, the schema of the data table is automatically identified and saved and then retrieved when reading the data with a Spark DataFrame, {{< getvar v="product.frames.name.lc" >}}, or Presto (unless you select to explicitly define the schema for the read operation).
However, to use a Spark DataFrame, {{< getvar v="product.frames.name.lc" >}}, or Presto to read NoSQL data that was written to a table in another way, you first need to define the table schema.
You can use either of the following alternative methods to define or update the schema of a NoSQL table as part of a NoSQL DataFrame read operation:

- Use the custom <opt>inferSchema</opt> option to [infer the schema](#inferring-the-table-schema) (recommended).
- [Define the schema programmatically](#defining-the-table-schema-programmatically) as part of the Spark DataFrame read operation.
    (You can also do this for data that was written using a Spark DataFrame in the {{< product lc >}}, although it's not required.)

For more information, see the {{< xref f="data-layer/reference/nosql-table-schema.md" >}}.

<!-- ---------------------------------------- -->
### Overwriting an Existing Table Schema {#overwriting-a-table-schema}

By default, if the schema inferred from the DataFrame's contents during a write operation differs from the table's current schema &mdash; as defined in its schema file (if such a file exists) &mdash; the write fails.
This is designed to protect against inadvertent schema changes.
However, you can override this default behavior by using the custom [<opt>allow-overwrite-schema</opt>](#option-allow-overwrite-schema) write option, which forces an overwrite of the current table schema with the inferred schema.

<!-- ======================================== -->
#### Table Schema-Overwrite Examples {#schema-overwrite-examples}

The following example creates a "mytable" table in a "mycontainer" data container with <attr>AttrA</attr> and <attr>AttrB</attr> attributes of type string and an <attr>AttrC</attr> attribute of type long, and then overwrites the table schema to change the type of <attr>AttrC</attr> to double:

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession

var df = Seq(("a", "z", 123), ("b", "y", 456))
    .toDF("AttrA", "AttrB", "AttrC")
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("overwrite")
    .option("key", "AttrA")
    .save("v3io://mycontainer/mytable/")

df = Seq(("c", "x", 32.12), ("d", "v", 45.2))
    .toDF("AttrA", "AttrB", "AttrC")
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("append")
    .option("key", "AttrA")
    .option("allow-overwrite-schema", "true")
    .save("v3io://mycontainer/mytable/")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
from pyspark.sql import SparkSession

df = spark.createDataFrame([
    ("a", "z", 123),
    ("b", "y", 456)
], ["AttrA", "AttrB", "AttrC"])
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("overwrite") \
    .option("key", "AttrA") \
    .save("v3io://mycontainer/mytable/")
    
df = spark.createDataFrame([
    ("c", "x", 32.12),
    ("d", "v", 45.2)
], ["AttrA", "AttrB", "AttrC"])
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("append") \
    .option("key", "AttrA") \
    .option("allow-overwrite-schema", "true") \
    .save("v3io://mycontainer/mytable/")
```
  {{< /tab >}}
{{< /code-tabs >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (13.11.18) Initially, I used a single
  command for the Seq + write calls (based on an example that Dina gave me),
  as demonstrated below for the first write operation, but Golan asked that I
  separate it into two commands for clarity. Note that when moving to two
  commands, I had to change `val` in the Scala df definition to `var` (per
  Golan's guidelines), otherwise the second df assignment produces an error
  ("console>:32: error: reassignment to val"). -->
```scala
Seq(("a", "z", 123), ("b", "y", 456))
    .toDF("AttrA", "AttrB", "AttrC")
    .write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("overwrite")
    .option("key", "AttrA")
    .save("v3io://mycontainer/mytable/")
```
```python
spark.createDataFrame([
    ("a", "z", 123),
    ("b", "y", 456)
], ["AttrA", "AttrB", "AttrC"]) \
    .write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("overwrite") \
    .option("key", "AttrA") \
    .save("v3io://mycontainer/mytable/")
```
{{< /comment >}}

{{< note >}}
If you remove or comment out the `option("allow-overwrite-schema", "true")` call in the second write command, the write will fail with the following schema-mismatch error:
```sh
java.lang.RuntimeException: Note you are about the rewrite existing schema file.
           old schema = Schema(List(Field(AttrA,string,false,None), Field(AttrB,string,true,None), Field(AttrC,long,false,None)),AttrA,None,0)
           new schema = Schema(ArraySeq(Field(AttrA,string,false,None), Field(AttrB,string,true,None), Field(AttrC,double,false,None)),AttrA,None,0).
```
{{< /note >}}
{{< comment >}}<!-- [CosmeticsInfo] (sharonl) The code uses 3 tabs (`\t\t\t`)
  before the old and new schema prints in the message (see the zeta repo's
  v3io-spark2-common/src/main/scala/io/iguaz/v3io/SparkToKVConverter.scala file)
  and initially so did the doc. (2.5.20) I changed this, in the active docs
  (v2.5 and v2.3) to 12 spaces (4-space tab) because the tab output didn't look
  good (to much space and no alignment with the note text); I also tested an
  8-space tab and the text was still not aligned with the note text. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Inferring the Table Schema {#inferring-the-table-schema}

You can use the custom NoSQL DataFrame [<opt>inferSchema</opt>](#option-inferSchema) read option to automatically infer the schema of the read table from its contents.

<!-- ======================================== -->
#### Infer-Schema Examples {#infer-schema-examples}

The following example uses a Spark DataFrame to read data from a NoSQL "employees" table in a "department_store" data container.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder.appName("My Spark Application").getOrCreate()

val myDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .option("inferSchema", "true")
    .load("v3io://department_store/employees")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("My Spark Application").getOrCreate()

myDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .option("inferSchema", "true") \
    .load("v3io://department_store/employees")
```
  {{< /tab >}}
{{< /code-tabs >}}

To generate a schema file from the inferred schema, you can write back the content of the read DataFrame to the same table using the <opt>append</opt> save mode; the write operation automatically creates a schema file if it doesn't exist.
For efficiency, use `limit(0)` to write only the schema file:
{{< comment >}}<!-- [IntInfo] (sharonl) (13.11.18) Using the "overwrite" mode
  isn't only less efficient, it doesn't work: I tested and found that it
  creates the schema file but deletes and doesn't recreate all table items.
  Gal T. explained that Spark doesn't execute the commands sequentially as
  they're encountered. For example, it doesn't nothing upon encountering a read
  command. The commands are only executed when there's an action (like write),
  but there's a specific execution logic that isn't fully reflected in the code.
  In the case of the read and write back to the same table test with mode
  "overwrite", it first infers the schema and creates the schema file, then
  deletes the content because of the "overwrite" mode, and only then attempts
  to ready the contents to the DataFrame, but the table is then empty.
  The limit() function indicates the maximum number of rows (items) to write.
  Without it, the code would also work but it would be less efficient because
  the could would check the existence of each item in the current table. -->
{{< /comment >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
myDF.limit(0).write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("append")
    .option("key", "employee_id")
    .save("v3io://department_store/employees")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
myDF.limit(0).write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("append") \
    .option("key", "employee_id") \
    .save("v3io://department_store/employees")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
### Defining the Table Schema Programmatically {#defining-the-table-schema-programmatically}

You can define a NoSQL DataFrame's table schema programmatically by using the Spark DataFrame <func>schema</func> method as part of a read operation:
in your code, you can define a schema variable of the relevant list type, and populate it with structures that provide the required information about the table's attributes (columns).
Then, pass the variable as a parameter to the DataFrame <func>schema</func> read method &mdash; for example, for a `schema` variable, you can call `schema(schema)`.
See {{< xref f="data-layer/reference/nosql-table-schema.md" a="schema-object-fields" text="The Item-Attributes Schema Object ('fields')" >}} reference and the following [examples](#programmatic-table-schema-definition-examples).
{{< comment >}}<!-- [IntInfo] (sharonl) (23.10.18) Golan said that the schema
  method is applicable only to read and not to write operations. -->
{{< /comment >}}

{{< note id="programmatic-schema-def-range-scan-n-even-distribution-note" >}}
Programmatically created table schemas don't support [range-scan](#range-scans) or [even-distribution](#even-workload-distribution) table queries.
{{< comment >}}<!-- [c-range-scan-n-even-distribution-spark-df-presto-infer-schema]
  [InfInfo] (sharonl) See the info in the nosql-table-schema.md reference. -->
{{< /comment >}}
{{< /note >}}

<!-- ======================================== -->
#### Programmatic Table-Schema Definition Examples {#programmatic-table-schema-definition-examples}

The following example uses a Spark DataFrame to read data from a NoSQL "employees" table in a "department_store" data container.
The table has five attributes (columns), which are depicted using the `schema` variable:

- "id" &mdash; a numeric employee ID, which serves as the table's primary key and isn't nullable.
- "firstname" &mdash; the employee's first name, depicted as a string.
- "lastname" &mdash; the employee's last name, depicted as a string.
- "department" &mdash; the department to which the employee belongs, depicted as a string .
- "managerid" &mdash; the numeric ID of the employee's manager.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.types._

val spark = SparkSession.builder.appName("My Spark Application").getOrCreate()

val schema = StructType(List(
    StructField("id", LongType, nullable = false),
    StructField("firstname", StringType, nullable = true),
    StructField("lastname", StringType, nullable = true),
    StructField("department", StringType, nullable = true),
    StructField("managerid", LongType, nullable = true)))
val myDF = spark.read.schema(schema)
    .format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .load("v3io://department_store/employees")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import sys
from pyspark.sql import SparkSession
from pyspark.sql import *
from pyspark.sql.types import *
from pyspark.sql.functions import *

spark = SparkSession.builder.appName("My Spark Application").getOrCreate()

schema = StructType([
    StructField("id", LongType(), False),
    StructField("firstname", StringType(), True),
    StructField("lastname", StringType(), True),
    StructField("department", StringType(), True),
    StructField("managerid", LongType(), True)])
myDF = spark.read.schema(schema) \
    .format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .load("v3io://department_store/employees")
```
  {{< /tab >}}
{{< /code-tabs >}}

For additional examples, see the read examples in the {{< xref f="data-layer/spark-data-ingestion-qs.md" a="reading-the-data" >}} tutorial.

<!-- //////////////////////////////////////// -->
## Conditional Updates {#conditional-updates}

You can use the custom [<opt>condition</opt>](#option-condition) write option of the NoSQL Spark DataFrame to perform conditional item updates, whereby the write operation will be executed only if the specified condition expression evaluates to `true`.

The condition expression is evaluated against the table item to be updated, if it exists.
If the condition evaluates to `true`, the write operation is executed and the item is updated or created; otherwise, the operation completes successfully without an update.
{{< note id="conditional-update-notes" >}}
- If the expression references a non-existent item attribute, the condition processing stops and the operation completes successfully without updating or creating the item.
- If the item doesn't exist and the condition expression doesn't reference any attributes (for example, a `"1==1"` or `"2==3"` expression, which could potentially be auto generated in some programming scenarios), the operation completes successfully and the item is updated or created only if the condition evaluates to `true`.
{{< /note >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (15.11.18) Referencing a
  non-existent DataFrame column (${<column>}) in the condition expression
  produces an error ("value show is not a member of
  org.apache.spark.sql.DataFrameReader"). I decided not to document this
  because this is the expected Spark DF behavior.
  See DOC IG-7406 for more information and tests that I performed. -->
{{< /comment >}}

See the NoSQL DataFrame [conditional-update write example](#write-example-condition).

<!-- //////////////////////////////////////// -->
## Counter Attributes {#counter-attributes}

The {{< getvar v="spark.product_connector.full" >}} enhances the standard Spark DataFrame by allowing you to define numeric attributes (columns) in a table as counter attributes and easily increment or decrement the attributes' values.
This is done by using the custom [<opt>counter</opt>](#option-counter) write option of the NoSQL DataFrame to name one or more attributes as counter attributes.

The <opt>counter</opt> option is supported only with the NoSQL DataFrame <opt>append</opt> [save mode](#save-modes).
However, the significance of this mode when using the <opt>counter</opt> option is different than the standard Spark DataFrame behavior (for both counter and non-counter attributes):

-   **If a DataFrame attribute isn't already found in the table**, the attribute is added to the table and initialized to the value set for it in the DataFrame.
    If the table or item don't exist, they're created and updated with the DataFrame's contents.
    This is the standard append save-mode behavior ant it's the same for both counter and non-counter attributes.
-   **If a DataFrame counter attribute is already found in the table**, its value is incremented or decremented according to the value that was set for this attribute in the DataFrame &mdash; i.e., the attribute value indicates the increment or decrement step (a negative value = decrement).
-   **If a DataFrame non-counter attribute is already found in the table**, its value is overwritten with the value that was set for it in the DataFrame but other attributes in the table remain unaffected (i.e., replace mode, similar to an <opt>append</opt> write with the [<opt>columnUpdate</opt>](#option-columnUpdate) option.)

See the NoSQL DataFrame [counter-attributes write example](#write-example-counters).

<!-- //////////////////////////////////////// -->
## Partitioned Tables {{< techpreview mark="1" fmt="0" >}} {#partitioned-tables}
{{< comment >}}<!-- [c-nosql-partitioned-tables-spark-df] [IntInfo] (sharonl)
  (18.11.18) See the internal information and references (specifically to the
  Spark Datasets documentation) in DOC IG-6629 + [c-nosql-partitioned-tables]
  on the data-layer/nosql/_index.md page.
  (16.6.19) I renamed all "Table Partitioning" doc sections in the recently
  released v2.2.0 doc to "Partitioned Tables", changed the anchor from
  #table-partitioning to #partitioned-tables, and renamed the internal-comment
  marks accordingly. -->
{{< /comment >}}

{{< text-nosql-table-partitioning spark="1" >}}See also the {{< xref f="data-layer/nosql/" a="partitioned-tables" text="Partitioned Tables" >}} documentation on the {{< xref f="data-layer/nosql/" t="title" >}} page, including {{< xref f="data-layer/nosql/" a="table-partitioning-best-practices" text="best practices" >}}.{{< /text-nosql-table-partitioning >}}
{{< comment >}}<!-- [ci-extra-space-around-shcd-output-or-content] See info in
  the text-nosql-partitioned-tables.html shortcode. -->
{{< /comment >}}

The {{< getvar v="spark.product_connector.full" >}} supports table partitioning for the NoSQL DataFrame {{< techpreview mark="1" >}}:

- **Creating a partitioned table** &mdash; the custom NoSQL DataFrame [<opt>partition</opt>](#option-partition) option allows you to select specific item attributes (columns) in a write DataFrame to be used as partitions.
    When using this option, the {{< product lc >}} creates the necessary partition directory path for each written item.
    (Note that after you define partitions for a table, you need to specify the same partitions whenever your write to this table unless you decide to overwrite it.)
- **Querying a partitioned table** &mdash; a partitioned table is queried like any other table, with the table path set to the root table directory and not to a specific partition directory.
    Version {{< productVersion num >}} of the {{< product lc >}} doesn't support using using wild cards in the table path, such as `"mytable/year=*/month=5"` to search the <dirname>month=5</dirname> directories in all <path>mytable/year=&quot;value&quot;</path> directories.
    However, you can easily restrict the query to specific partition directories by using the Spark DataFrame <func>filter</func> method with a filter that references one of the partition attributes.
    In such cases, the {{< product lc >}} searches the root table directory that is specified in the read command for nested directories of the format <path>&lt;attribute&gt;=&lt;value&gt;</path>.
    If it finds such directories, it searches only the partition directories that match the query.
    For example, for a table partitioned by <attr>year</attr> and <attr>month</attr> attributes, a `month == 12` filter will return only the items from the <dirname>month=12</dirname> partition directories in all <dirname>year=*</dirname> directories.
{{< comment >}}<!-- [IntInfo] (sharonl) (19.11.18) The actual filter syntax for
  this example is `filter($"month === 12")` in Scala and `filter("month == 12")`
  in Python. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Table-Partitioning Examples {#table-partitioning-examples}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder.appName("Table-Partitioning Example").getOrCreate()
val table_path = "v3io://mycontainer/weather/"

val df = Seq(
    (2016,  3, 25,  6, 16, 0.00, 55),
    (2016,  3, 25, 17, 19, 0.10, 62),
    (2016,  7, 24,  7, 20, 0.00, 52),
    (2016, 12, 24,  9, 10, 0.05, 47),
    (2016, 12, 24, 19,  8, 0.20, 47),
    (2017,  5,  7, 14, 21, 0.00, 70),
    (2017, 11,  1, 10, 16, 0.00, 34),
    (2017, 11,  1, 22, 13, 0.01, 41),
    (2017, 12, 12, 16, 12, 0.00, 47),
    (2017, 12, 24, 17, 11, 1.00, 50),
    (2018,  1, 18,  5,  8, 0.00, 37),
    (2018,  1, 18, 17, 10, 2.00, 45),
    (2018,  5, 20, 15, 24, 0.00, 62),
    (2018,  5, 20, 21, 20, 0.00, 59),
    (2018, 11,  1, 11, 11, 0.12, 65)
).toDF("year", "month", "day", "hour", "degrees_cel", "rain_ml", "humidity_per")
val df_with_key = df.withColumn("time", concat($"year", $"month", $"day", $"hour"))
df_with_key.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("overwrite")
    .option("key", "time")
    .option("partition", "year, month, day")
    .save(table_path)

var readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"month" < 7)
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"month" === 12 && $"day" === 24)
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"month" > 6 && $"hour" >= 8 && $"hour" <= 20)
readDF.show()
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import sys
from pyspark.sql import SparkSession
from pyspark.sql import *
from pyspark.sql.functions import *

spark = SparkSession.builder.appName("Table-Partitioning Example").getOrCreate()
table_path = "v3io://mycontainer/weather/"

df = spark.createDataFrame([
    (2016,  3, 25,  6, 16, 0.00, 55),
    (2016,  3, 25, 17, 19, 0.10, 62),
    (2016,  7, 24,  7, 20, 0.00, 52),
    (2016, 12, 24,  9, 10, 0.05, 47),
    (2016, 12, 24, 19,  8, 0.20, 47),
    (2017,  5,  7, 14, 21, 0.00, 70),
    (2017, 11,  1, 10, 16, 0.00, 34),
    (2017, 11,  1, 22, 13, 0.01, 41),
    (2017, 12, 12, 16, 12, 0.00, 47),
    (2017, 12, 24, 17, 11, 1.00, 50),
    (2018,  1, 18,  5,  8, 0.00, 37),
    (2018,  1, 18, 17, 10, 2.00, 45),
    (2018,  5, 20, 15, 24, 0.00, 62),
    (2018,  5, 20, 21, 20, 0.00, 59),
    (2018, 11,  1, 11, 11, 0.12, 65)
], ["year", "month", "day", "hour", "degrees_cel", "rain_ml", "humidity_per"])
df_with_key = df.withColumn(
    "time", concat(df["year"], df["month"], df["day"], df["hour"]))
df_with_key.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("overwrite") \
    .option("key", "time") \
    .option("partition", "year, month, day, hour") \
    .save(table_path)

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("month < 7")
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("month == 12 AND day == 24")
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("month > 6 AND hour >= 8 AND hour <= 20")
readDF.show()

```
  {{< /tab >}}
{{< /code-tabs >}}

This examples creates a partitioned "weather" table in a "mycontainer" data container.
The `option("partition", "year, month, day")` write option partitions the table by the <attr>year</attr>, <attr>month</attr>, and  <attr>day</attr> item attributes.
As demonstrated in the following image, if you browse the container in the {{< productUI lc >}} after running the example, you'll see that the <dirname>weather</dirname> directory has <path>year=&lt;value&gt;/month=&lt;value&gt;/day=&lt;value&gt;</path> partition directories that match the written items.
If you select any of the nested <dirname>day</dirname> partition directories, you can see the written items and their attributes.
For example, the first item (with attribute values `2016,  3, 25,  6, 16, 0.00, 55`) is saved to a <file>20163256</file> file in a <path>weather/year=2016/month=3/day=25</path> partition directory.
{{< igz-figure id="img-dashboard_browse_partitioned_table" src="/images/dashboard_browse_partitioned_table.png" alt="Dashboard partition-table browse" >}}

Following is the output of the example's <cmd>show</cmd> commands for each read.
The filtered results are gathered by scanning only the partition directories that match the filter criteria.

Full table read
```sh
+----+-----+---+----+-----------+-------+------------+----------+
|year|month|day|hour|degrees_cel|rain_ml|humidity_per|      time|
+----+-----+---+----+-----------+-------+------------+----------+
|2016|   12| 24|   9|         10|   0.05|          47| 201612249|
|2016|   12| 24|  19|          8|    0.2|          47|2016122419|
|2016|    3| 25|   6|         16|    0.0|          55|  20163256|
|2016|    3| 25|  17|         19|    0.1|          62| 201632517|
|2016|    7| 24|   7|         20|    0.0|          52|  20167247|
|2017|   11|  1|  22|         13|   0.01|          41| 201711122|
|2017|   11|  1|  10|         16|    0.0|          34| 201711110|
|2017|   12| 12|  16|         12|    0.0|          47|2017121216|
|2017|   12| 24|  17|         11|    1.0|          50|2017122417|
|2017|    5|  7|  14|         21|    0.0|          70|  20175714|
|2018|    1| 18|   5|          8|    0.0|          37|  20181185|
|2018|    1| 18|  17|         10|    2.0|          45| 201811817|
|2018|   11|  1|  11|         11|   0.12|          65| 201811111|
|2018|    5| 20|  15|         24|    0.0|          62| 201852015|
|2018|    5| 20|  21|         20|    0.0|          59| 201852021|
+----+-----+---+----+-----------+-------+------------+----------+
```

`month < 7` filter &mdash; retrieve all data for the first six months of each year:
```sh
+----+-----+---+----+-----------+-------+------------+---------+
|year|month|day|hour|degrees_cel|rain_ml|humidity_per|     time|
+----+-----+---+----+-----------+-------+------------+---------+
|2016|    3| 25|   6|         16|    0.0|          55| 20163256|
|2016|    3| 25|  17|         19|    0.1|          62|201632517|
|2017|    5|  7|  14|         21|    0.0|          70| 20175714|
|2018|    1| 18|   5|          8|    0.0|          37| 20181185|
|2018|    1| 18|  17|         10|    2.0|          45|201811817|
|2018|    5| 20|  15|         24|    0.0|          62|201852015|
|2018|    5| 20|  21|         20|    0.0|          59|201852021|
+----+-----+---+----+-----------+-------+------------+---------+
```

`month == 12 AND day == 24` filter &mdash; retrieve all hours on Dec 24 each year:
```sh

+----+-----+---+----+-----------+-------+------------+----------+
|year|month|day|hour|degrees_cel|rain_ml|humidity_per|      time|
+----+-----+---+----+-----------+-------+------------+----------+
|2016|   12| 24|   9|         10|   0.05|          47| 201612249|
|2016|   12| 24|  19|          8|    0.2|          47|2016122419|
|2017|   12| 24|  17|         11|    1.0|          50|2017122417|
+----+-----+---+----+-----------+-------+------------+----------+
```

`month > 6 AND hour >= 8 AND hour <= 20` filter &mdash; retrieve 08:00&ndash;20:00 data for every day in the last six months of each year:
```sh
+----+-----+---+----+-----------+-------+------------+----------+
|year|month|day|hour|degrees_cel|rain_ml|humidity_per|      time|
+----+-----+---+----+-----------+-------+------------+----------+
|2016|   12| 24|   9|         10|   0.05|          47| 201612249|
|2016|   12| 24|  19|          8|    0.2|          47|2016122419|
|2017|   11|  1|  10|         16|    0.0|          34| 201711110|
|2017|   12| 12|  16|         12|    0.0|          47|2017121216|
|2017|   12| 24|  17|         11|    1.0|          50|2017122417|
|2018|   11|  1|  11|         11|   0.12|          65| 201811111|
+----+-----+---+----+-----------+-------+------------+----------+
```

<!-- //////////////////////////////////////// -->
## Range Scans {#range-scans}

A NoSQL Spark DataFrame table query that uses supported sharding-key and optional sorting-key filters to retrieve items with the same sharding-key value, is processed by performing a range scan, which is more efficient than the standard full table scan.
See NoSQL {{< xref f="data-layer/nosql/" a="range-scans" text="Range Scans" >}}.
Note that the support for Spark DataFrame range scans requires a table schema that was inferred with a [NoSQL Spark DataFrame](#defining-the-table-schema), {{< xref f="data-layer/reference/frames/nosql/overview.md" a="table-schema" textvar="product.frames.name.lc" >}}, or the [{{< getvar v="presto.product_connector.full" >}}]({{< xref f="data-layer/presto/presto-cli.md" a="nosql-table-schema" t="url" >}}).
{{< comment >}}<!-- [c-range-scan-n-even-distribution-spark-df-presto-infer-schema]
  [InfInfo] (sharonl) See the info in the nosql-table-schema.md reference. -->
{{< /comment >}}

{{< note id="range-scan-operators" title="Range-Scan Operators" >}}
The NoSQL Spark DataFrame uses range scan for compound primary-key table queries that apply the equal-to (`=`) or IN (`IN`/<func>isin</func>) operator to the sharding-key attribute, and optionally also apply a comparison operator (`=`/`>`/`>=`/`<`/`<=`) to the sorting-key attribute.
{{< comment >}}<!-- [c-big-data-range-scan-operators] [IntInfo] (sharonl)
  See info in DOC IG-9215. -->
{{< /comment >}}
{{< /note >}}

<!-- ---------------------------------------- -->
### Range-Scan Examples {#range-scan-examples}

<!-- ======================================== -->
#### Example 1 &mdash; Basic Range Scan {#range-scan-example-basic}
{{< comment >}}<!-- [IntInfo] (sharonl) (23.12.18) This example table is also
  referenced from the presto/presto-cli.md reference: the range-scan examples
  in the Presto reference are designed for this table. -->
{{< /comment >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder.appName("Range-Scan Example").getOrCreate()
val table_path = "v3io://mycontainer/mytaxis/rides/"

var writeDF = Seq(
    (24, "20180601",  8, 332.0, 18),
    (24, "20180602",  5, 260.0, 11),
    (24, "20180701",  7, 352.1, 21),
    (1,  "20180601", 25, 125.0, 40),
    (1,  "20180602", 20, 106.0, 46),
    (1,  "20180701", 28, 106.4, 42),
    (16, "20180601",  1, 224.2,  8),
    (16, "20180602", 10, 244.0, 45),
    (16, "20180701",  6, 193.2, 24)
).toDF("driver_id", "date", "num_rides", "total_km", "total_passengers")
writeDF = writeDF
    .withColumn("avg_ride_km", $"total_km" / $"num_rides")
    .withColumn("avg_ride_passengers", $"total_passengers" / $"num_rides")
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("overwrite")
    .option("key", "driver_id")
    .option("sorting-key", "date")
    .save(table_path)

// Range-scan queries
var readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"driver_id" === 1)
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"driver_id" === 24 && $"date" >= "20180101" && $"date" < "20180701")
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"driver_id".isin(1, 16, 24) && $"avg_ride_passengers" >= 3)
readDF.show()
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Range-Scan Example").getOrCreate()
table_path = "v3io://mycontainer/mytaxis/rides/"

writeDF = spark.createDataFrame([
    (24, "20180601",  8, 332.0, 18),
    (24, "20180602",  5, 260.0, 11),
    (24, "20180701",  7, 352.1, 21),
    (1,  "20180601", 25, 125.0, 40),
    (1,  "20180602", 20, 106.0, 46),
    (1,  "20180701", 28, 106.4, 42),
    (16, "20180601",  1, 224.2,  8),
    (16, "20180602", 10, 244.0, 45),
    (16, "20180701",  6, 193.2, 24)
], ["driver_id", "date", "num_rides", "total_km", "total_passengers"])
writeDF = writeDF.withColumn(
    "avg_ride_km", writeDF["total_km"] / writeDF["num_rides"]) \
                 .withColumn(
    "avg_ride_passengers", writeDF["total_passengers"] / writeDF["num_rides"])
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("overwrite") \
    .option("key", "driver_id") \
    .option("sorting-key", "date") \
    .save(table_path)

# Range-scan queries
readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("driver_id == 1")
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("driver_id == 24 AND date >= '20180101' AND date < '20180701'")
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("driver_id IN (1, 16, 24) AND avg_ride_passengers >= 3")
readDF.show()

```
  {{< /tab >}}
{{< /code-tabs >}}

This example creates a "rides" table in a <dirname>mytaxis</dirname> directory in a "mycontainer" data container.
The `option("key", "driver_id")` and `option("sorting-key", "date")` write options define the <attr>driver_id</attr> attribute as the table's sharding key and the <attr>date</attr> attribute as the table's sorting key; all items in the DataFrame define these attributes.
If you browse the container in the {{< productUI lc >}} after running the example, you'll see that the names of the files in the <path>mytaxis/rides</path> directory are of the format `<sharding-key value>.<sorting-key value>`, as demonstrated in the following image (for example, `16.20180602`):
{{< igz-figure id="img-dashboard_browse_range_scan_table" src="/images/dashboard_browse_range_scan_table.png" alt="Dashboard basic range-scan table browse" >}}

All of the <cmd>read</cmd> commands will result in faster [range scans](#range-scans), compared to standard full-table scans, because they include range-scan sharding-key and optionally also sorting-key filters.
Following is the output of the example's <cmd>show</cmd> commands for each read:

`"driver_id == 1"` filter &mdash; retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `1` (regardless of the sorting-key value):
```sh
+---------+--------+---------+--------+----------------+------------------+-------------------+
|driver_id|    date|num_rides|total_km|total_passengers|       avg_ride_km|avg_ride_passengers|
+---------+--------+---------+--------+----------------+------------------+-------------------+
|        1|20180601|       25|   125.0|              40|               5.0|                1.6|
|        1|20180602|       20|   106.0|              46|               5.3|                2.3|
|        1|20180701|       28|   106.4|              42|3.8000000000000003|                1.5|
+---------+--------+---------+--------+----------------+------------------+-------------------+
```

`"driver_id == 24 AND date >= '20180101' AND date < '20180701'"` filter &mdash; retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `24` and a <attr>date</attr> sorting-key attribute value within the first six months of 2018:
```sh
+---------+--------+---------+--------+----------------+-----------+-------------------+
|driver_id|    date|num_rides|total_km|total_passengers|avg_ride_km|avg_ride_passengers|
+---------+--------+---------+--------+----------------+-----------+-------------------+
|       24|20180601|        8|   332.0|              18|       41.5|               2.25|
|       24|20180602|        5|   260.0|              11|       52.0|                2.2|
+---------+--------+---------+--------+----------------+-----------+-------------------+
```

`"driver_id IN (1, 16, 24) AND avg_ride_passengers >= 3"` filter &mdash; retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `1`, `16`, or `24` (regardless of the sorting-key value) and an <attr>avg_ride_passengers</attr> attribute value that is greater or equal to 3:
```sh
+---------+--------+---------+--------+----------------+------------------+-------------------+
|driver_id|    date|num_rides|total_km|total_passengers|       avg_ride_km|avg_ride_passengers|
+---------+--------+---------+--------+----------------+------------------+-------------------+
|       16|20180601|        1|   224.2|               8|             224.2|                8.0|
|       16|20180602|       10|   244.0|              45|              24.4|                4.5|
|       16|20180701|        6|   193.2|              24|32.199999999999996|                4.0|
|       24|20180701|        7|   352.1|              21|50.300000000000004|                3.0|
+---------+--------+---------+--------+----------------+------------------+-------------------+
```

<!-- ======================================== -->
#### Example 2 &mdash; Even-Distribution Range Scan {#range-scan-example-even-distribution}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder.appName("Even-Distribution Range-Scan Example").getOrCreate()
val table_path = "v3io://mycontainer/mytaxis/even_distribution_range_scan/rides/"

var writeDF = Seq(
    (24, "20180601",  8, 332.0, 18),
    (24, "20180602",  5, 260.0, 11),
    (24, "20180701",  7, 352.1, 21),
    (1,  "20180101",  4,  90.0, 14),
    (1,  "20180102", 14, 141.4, 28),
    (1,  "20180202",  8, 220.8, 22),
    (1,  "20180601", 25, 125.0, 40),
    (1,  "20180602", 20, 106.0, 46),
    (1,  "20180701", 28, 106.4, 42),
    (16, "20180601",  1, 224.2,  8),
    (16, "20180602", 10, 244.0, 45),
    (16, "20180701",  6, 193.2, 24)
).toDF("driver_id", "date", "num_rides", "total_km", "total_passengers")
    .withColumn("avg_ride_km", $"total_km" / $"num_rides")
    .withColumn("avg_ride_passengers", $"total_passengers" / $"num_rides")
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("overwrite")
    .option("key", "driver_id")
    .option("sorting-key", "date")
    .option("range-scan.even-distribution", "true")
    .save(table_path)

// Range-scan queries
var readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"driver_id" === 1)
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"driver_id" === 24 && $"date" >= "20180101" && $"date" < "20180701")
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path)
    .filter($"driver_id".isin(1, 16, 24) && $"avg_ride_passengers" >= 3)
readDF.show()
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Even-Distribution Range-Scan Example").getOrCreate()
table_path = "v3io://mycontainer/mytaxis/even_distribution_range_scan/rides/"

writeDF = spark.createDataFrame([
    (24, "20180601",  8, 332.0, 18),
    (24, "20180602",  5, 260.0, 11),
    (24, "20180701",  7, 352.1, 21),
    (1,  "20180101",  4,  90.0, 14),
    (1,  "20180102", 14, 141.4, 28),
    (1,  "20180202",  8, 220.8, 22),
    (1,  "20180601", 25, 125.0, 40),
    (1,  "20180602", 20, 106.0, 46),
    (1,  "20180701", 28, 106.4, 42),
    (16, "20180601",  1, 224.2,  8),
    (16, "20180602", 10, 244.0, 45),
    (16, "20180701",  6, 193.2, 24)
], ["driver_id", "date", "num_rides", "total_km", "total_passengers"])
writeDF = writeDF.withColumn(
    "avg_ride_km", writeDF["total_km"] / writeDF["num_rides"]) \
                 .withColumn(
    "avg_ride_passengers", writeDF["total_passengers"] / writeDF["num_rides"])
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("overwrite") \
    .option("key", "driver_id") \
    .option("sorting-key", "date") \
    .option("range-scan.even-distribution", "true") \
    .save(table_path)

# Range-scan queries
readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("driver_id == 1")
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("driver_id == 24 AND date >= '20180101' AND date < '20180701'")
readDF.show()

readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}").load(table_path) \
    .filter("driver_id IN (1, 16, 24) AND avg_ride_passengers >= 3")
readDF.show()

```
  {{< /tab >}}
{{< /code-tabs >}}

This example creates a "rides" table in a <path>mytaxis/even_distribution_range_scan</path> directory in a "mycontainer" data container.
The content of the table is similar to that of the "rides" table in the [basic range-scan example](#range-scan-example-basic) but with additional items with a sharding-key value of 1.
For demonstration purposes, the assumption is that the data in the table is expected to become less uniform as more items are added, with most items having the same sharding-key value (for example, 1).
Therefore, the <opt>range-scan-even-distribution</opt> write option is added to the `writeDF` write command &mdash; `option("range-scan.even-distribution", "true")` &mdash; to recalculate the items' sharding-key values and distribute the items more evenly across multiple data slices.
See [Even Workload Distribution](#even-workload-distribution).

The read queries remain the same as in the basic range-scan example.
However, if you browse the container in the {{< productUI lc >}} after running the example, you'll see that the names of the files in the <path>mytaxis/even_distribution_range_scan/rides</path> directory are of the format `<original sharding-key value>_<n>.<sorting-key value>`, as demonstrated in the following image, and not `<original sharding-key value>.<sorting-key value>` as in the basic example (for example, `16_36.20180602` instead of `16.20180602`):
{{< igz-figure id="img-dashboard_browse_range_scan_even_distribution_table.zoom_out.all_items_no_schema" src="/images/dashboard_browse_range_scan_even_distribution_table.zoom_out.all_items_no_schema.png" alt="Dashboard range-scan even-distribution table browse" >}}

Following is the output of the example's <cmd>show</cmd> commands for each read.
If you compare the output to that of the basic range-scan example, you'll see that it's similar except that the even-distribution range-scan query results have some additional results for sharding-key 1 items that aren't found in the basic-example table and the sort order is different.

`"driver_id == 1"` filter &mdash; retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `1` (regardless of the sorting-key value):
```sh
+---------+--------+---------+--------+----------------+------------------+-------------------+
|driver_id|    date|num_rides|total_km|total_passengers|       avg_ride_km|avg_ride_passengers|
+---------+--------+---------+--------+----------------+------------------+-------------------+
|        1|20180202|        8|   220.8|              22|              27.6|               2.75|
|        1|20180102|       14|   141.4|              28|              10.1|                2.0|
|        1|20180101|        4|    90.0|              14|              22.5|                3.5|
|        1|20180602|       20|   106.0|              46|               5.3|                2.3|
|        1|20180701|       28|   106.4|              42|3.8000000000000003|                1.5|
|        1|20180601|       25|   125.0|              40|               5.0|                1.6|
+---------+--------+---------+--------+----------------+------------------+-------------------+
```

`"driver_id == 24 AND date >= '20180101' AND date < '20180701'"` filter &mdash; retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `24` and a <attr>date</attr> sorting-key attribute value within the first six months of 2018:
```sh
+---------+--------+---------+--------+----------------+-----------+-------------------+
|driver_id|    date|num_rides|total_km|total_passengers|avg_ride_km|avg_ride_passengers|
+---------+--------+---------+--------+----------------+-----------+-------------------+
|       24|20180601|        8|   332.0|              18|       41.5|               2.25|
|       24|20180602|        5|   260.0|              11|       52.0|                2.2|
+---------+--------+---------+--------+----------------+-----------+-------------------+
```

`"driver_id IN (1, 16, 24) AND avg_ride_passengers >= 3"` filter &mdash; retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `1`, `16`, or `24` (regardless of the sorting-key value) and an <attr>avg_ride_passengers</attr> attribute value that is greater or equal to 3:
```sh
+---------+--------+---------+--------+----------------+------------------+-------------------+
|driver_id|    date|num_rides|total_km|total_passengers|       avg_ride_km|avg_ride_passengers|
+---------+--------+---------+--------+----------------+------------------+-------------------+
|        1|20180101|        4|    90.0|              14|              22.5|                3.5|
|       16|20180602|       10|   244.0|              45|              24.4|                4.5|
|       16|20180701|        6|   193.2|              24|32.199999999999996|                4.0|
|       16|20180601|        1|   224.2|               8|             224.2|                8.0|
|       24|20180701|        7|   352.1|              21|50.300000000000004|                3.0|
+---------+--------+---------+--------+----------------+------------------+-------------------+
```

<!-- //////////////////////////////////////// -->
## Even Workload Distribution {#even-workload-distribution}
{{< comment >}}<!-- [IntInfo] (sharonl) (7.1.19) See info in DOC IG-9203
  and the referenced best-practices doc. -->
{{< /comment >}}

The NoSQL Spark DataFrame offers custom support for even distribution of ingested items across the available data slices for the parent container.
The objective is to improve the system's performance when working with a non-uniform data set &mdash; see the {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="string-sorting-key-for-faster-range-scan-queries" a="sharding-key-values-recalculation-for-even-workload-distribution" text="Recalculating Sharding-Key Values for Even Workload Distribution" >}} best-practice guidelines.

When writing (ingesting) data to a table with a compound `<sharding key>.<sorting key>` primary key (see the [<opt>key</opt>](#option-key) and [<opt>sorting-key</opt>](#option-sorting-key) write options), you can optionally also set the custom [<opt>range-scan-even-distribution</opt>](#option-range-scan-even-distribution) option.
This option instructs the {{< product lc >}} to recalculate the primary-key value for each of the ingested items, by splitting the item's original sharding-key value into multiple values, according to the number configured in the {{< product lc >}}'s <api>{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_name" >}}</api> configuration property (default = {{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}}).
As a result, items with the same original sharding-key value (which remains stored in the items' sharding-key attribute) are distributed across multiple data slices, based on the value of the items' sorting key, instead of being stored on the same slice.
This is done implicitly, although if you browse the table directory you can see the new primary-key values (item names) &mdash; of the format `<original sharding-key value>_<n>.<sorting-key value>` (for example, `johnd_1.20180602`) &mdash; as demonstrated in the [even-distribution range-scan example](#range-scan-example-even-distribution).

When submitting a NoSQL Spark DataFrame or Presto sharding-key query for a table that was created with the even-distribution Spark DataFrame option or by using similar calculations, use the original sharding-key value.
Behind the scenes, the {{< product lc >}} searches for all the primary-key values that were derived from the original sharding-key value.
Note that this custom support requires a table schema that was inferred with a [NoSQL Spark DataFrame](#defining-the-table-schema) or with the [{{< getvar v="presto.product_connector.full" >}}]({{< xref f="data-layer/presto/presto-cli.md" a="nosql-table-schema" t="url" >}}).
{{< comment >}}<!-- [c-range-scan-n-even-distribution-spark-df-presto-infer-schema]
  [InfInfo] (sharonl) See the info in the nosql-table-schema.md reference. -->
{{< /comment >}}

For more information on the behind-the-scenes implementation to support this feature, see the {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="string-sorting-key-for-faster-range-scan-queries" a="nosql-spark-df-even-distribution" text="Using a NoSQL Spark DataFrame for Even Workload Distribution" >}} best-practices documentation.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some examples of using the NoSQL Spark DataFrame.
For schema-definition, table-partitioning, and range-scan examples, see the [Defining the Table Schema](#defining-the-table-schema), [Partitioned Tables](#table-partitioning-examples), and [Range Scans](#range-scan-examples) sections, respectively; the range-scan examples also demonstrate the support for [even workload distribution](#range-scan-example-even-distribution).
For additional examples, see {{< xref f="data-layer/spark-data-ingestion-qs.md" >}}.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="examples" pre="Read " id="read-examples" >}}

{{< note id="read-examples-notes" >}}
- For a NoSQL DataFrame read example with an explicit table-schema definition, see the [examples](#programmatic-table-schema-definition-examples) in the [Defining the Table Schema Programmatically](#defining-the-table-schema-programmatically) section.
- The [conditional-update write example](#write-example-condition) also demonstrates reading from a NoSQL table to validate the execution of the write commands.
{{< /note >}}

<!-- ======================================== -->
#### Example 1 &mdash; Basic Read and Related Queries {#read-example-basic-n-related-queries}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder.appName("My Spark Application").getOrCreate()

val df = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .option("inferSchema", "true")
    .load("v3io://mycontainer/WebData")

df.select($"url", $"pages" + $"ads" as "views")
    .where($"browser" != lit("Chrome"))
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

val df = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .option("inferSchema", "true") \
    .load("v3io://mycontainer/WebData")

df.select(df["url"], df["pages"] + df["ads"] as "views") \
    .where(df["browser"] != lit("Chrome"))
```
  {{< /tab >}}
{{< /code-tabs >}}

This example reads page-click data from a "WebData" table in a "mycontainer" data container.
The <opt>inferSchema</opt> option is used to infer the schema of the table (in case the table doesn't have a schema file).
{{< comment >}}<!-- [IntInfo] (sharonl) (23.10.18) I decided not to refer add
  the Tech Preview indication here. It's enough when we mention it above. -->
{{< /comment >}}

{{< note >}}
By using Spark's predicate pushdown, the <func>select</func> and <func>where</func> operations are handed over to the {{< product lc >}}'s NoSQL store, and pruned/filtered data is returned to Spark.
{{< /note >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="examples" pre="Write " id="write-examples" >}}

{{< comment >}}<!-- [IntInfo] (sharonl) Per the guidelines from Golan, in
  v1.7.0 we edited the Scala examples in this section to replace calls to
  mode(SaveMode.Append) with mode("append") (as in the Python examples) and we
  removed the relaed SaveMode import line. Golan said that the "append" syntax
  is supported for Scala only beginning with Spark v2.0, and in v1.5.x of the
  platform we still supported Spark 1.6 (in addition to Spark 2.1), so we used
  SaveMode to accommodate both supported Spark versions. The SaveMode syntax
  would still work in the later platform versions with Spark 2.x, but Golan
  preferred to keep thinks simpler and use  similar Python and Scala code +
  avoid the extra Scala import. See v1.7.0 DOC IG-5674. -->
{{< /comment >}}

<!-- ======================================== -->
#### Example 1 &mdash; Simple Append-Mode Write {#write-example-simple-append}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val df = Seq(("ians", "Ian Smith", 25), ("dorisb", "Doris Brown", 31))
    .toDF("username", "name", "age")
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("append")
    .option("key", "username")
    .save("v3io://mycontainer/IT/Users/")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
df = spark.createDataFrame([
    ("ians", "Ian Smith", 25),
    ("dorisb", "Doris Brown", 31)
], ["username", "name", "age"])
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("append") \
    .option("key", "username") \
    .save("v3io://mycontainer/IT/Users/")
```
  {{< /tab >}}
{{< /code-tabs >}}

This example writes two items (rows) to an "IT/Users" table in a "mycontainer" data container whose primary-key attribute is <attr>username</attr>.
The save mode is set to <opt>append</opt>.
Therefore, DataFrame items that don't already exist in the table will be added in full, and existing items (based on the specified primary-key attribute values) will be updated only to add missing attributes, but values of existing item attributes won't be modified.

<!-- ======================================== -->
#### Example 2 &mdash; Replace-Mode Write {#write-example-replace-mode}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val df = Seq(("ians", "Ian Smith", 26), ("janed", "Jane Doe", 42))
    .toDF("username", "name", "age")
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("append")
    .option("columnUpdate", "true")
    .option("key", "username")
    .save("v3io://mycontainer/IT/Users/")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
df = spark.createDataFrame([
    ("ians", "Ian Smith", 26),
    ("janed", "Jane Doe", 42)
], ["username", "name", "age"])
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("append") \
    .option("columnUpdate", "true") \
    .option("key", "username") \
    .save("v3io://mycontainer/IT/Users/")
```
  {{< /tab >}}
{{< /code-tabs >}}

This example writes two items (rows) to the same table as in the previous [simple append-mode write example](#write-example-simple-append) &mdash; "IT/Users" table in a "mycontainer" data container whose primary-key attribute is <attr>username</attr>.
The save mode is set to <opt>append</opt> and the [<opt>columnUpdate</opt>](#option-columnUpdate) option is set to `"true"`.
Therefore, assuming the code is run after the simple append-mode write example, the new "janed" item (which doesn't exist in the table) will be appended to the table;  the existing "ians" item, which was included in the previous write example, will be overwritten with the item from the new write DataFrame (and the value of the <attr>age</attr> attribute will change from 25 to 26); and the existing "dorisb" item, which was written only in the previous example, will remain unchanged.

<!-- ======================================== -->
#### Example 3 &mdash; Counter Attributes {#write-example-counters}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val df = Seq((532, 5, "IP-953481-35", "Jenny Penny", 7866689))
    .toDF("kms", "num_drives", "policy", "primary_driver", "reg_num")
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .mode("append")
    .option("key", "reg_num")
    .option("counter", "kms, num_drives")
    .save("v3io://mycontainer/Cars/")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
df = spark.createDataFrame([
    (532, 5, "IP-953481-35", "Jenny Penny", 7866689)
], ["kms", "num_drives", "policy", "primary_driver", "reg_num"])
df.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .mode("append") \
    .option("key", "reg_num") \
    .option("counter", "kms, num_drives") \
    .save("v3io://mycontainer/Cars/")
```
  {{< /tab >}}
{{< /code-tabs >}}

This example writes an item (row) to a "Cars" table in a "mycontainer" data container whose primary-key attribute is <attr>reg_num</attr>.
The save mode is set to <opt>append</opt>, which is the required mode when defining [Counter Attributes](#counter-attributes).
The example demonstrates the special significance of this mode when used together with the [<opt>counter</opt> option](#option-counter).

The DataFrame contains a primary-key <attr>reg_num</attr> attribute (7866689); <attr>num_drives</attr> (5) and <attr>kms</attr> (532) attributes, which are defined as counter attributes using the <opt>counter</opt> option; and regular (non-counter) <attr>policy</attr> ("IP-953481") and <attr>primary_driver</attr> ("Jenny Penny") attributes.
<br/>
Assume a matching item (`reg_num=7866689`) already exists in the table and that its has a <attr>num_drives</attr> attribute with the value 95 and a <attr>primary_driver</attr> attribute with the value "Harry Carey", but no <attr>kms</attr> or <attr>policy</attr> attributes.

Because the table item already has the <attr>num_drives</attr> counter attribute, its current value (95) will be incremented by the specified attribute value (5), updating the attribute's value to 100.
Because the <attr>kms</attr> counter attribute is new, it will be added to the item and initialized to its DataFrame value &mdash; 532.
<br/>
Both non-counter attributes in the DataFrame will be added to the table item with the respective DataFrame values, overwriting any existing values: the value of the <attr>primary_driver</attr> attribute will change from "Harry Carey" to "Jenny Penny", and a <attr>policy</attr> attribute with the value "IP-953481" will be added to the item.
(This  behavior is different when using the append or overwrite save modes without the <opt>counter</opt> option for the same non-counter attributes.)

<!-- ======================================== -->
#### Example 4 &mdash; Conditional Update {#write-example-condition}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder.appName("My Spark Application").getOrCreate()

var writeDF = Seq(("7843321", "Honda", 29321))
    .toDF("reg_license", "model", "odometer")
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .option("key", "reg_license")
    .mode("overwrite").save("v3io://mycontainer/cars/")
var readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .load("v3io://mycontainer/cars/")
readDF.show()

writeDF = Seq(("7843321", "Honda", 31718))
    .toDF("reg_license", "model", "odometer")
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .option("key", "reg_license")
    .option("condition", "${odometer} > odometer")
    .mode("append").save("v3io://mycontainer/cars/")
readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .load("v3io://mycontainer/cars/")
readDF.show()

writeDF = Seq(("7843321", "Ford", 40001))
    .toDF("reg_license", "model", "odometer")
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .option("key", "reg_license")
    .option("condition", "${model} == model")
    .mode("append").save("v3io://mycontainer/cars/")
readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .load("v3io://mycontainer/cars/")
readDF.show()
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

writeDF = spark.createDataFrame([("7843321", "Honda", 29321)],
                                ["reg_license", "model", "odometer"])
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .option("key", "reg_license") \
    .mode("overwrite").save("v3io://mycontainer/cars/")
readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .load("v3io://mycontainer/cars/")
readDF.show()

writeDF = spark.createDataFrame([("7843321", "Honda", 31718)],
                                ["reg_license", "model", "odometer"])
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .option("key", "reg_license") \
    .option("condition", "${odometer} > odometer") \
    .mode("append").save("v3io://mycontainer/cars/")
readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .load("v3io://mycontainer/cars/")
readDF.show()

writeDF = spark.createDataFrame([("7843321", "Ford", 40001)],
                                ["reg_license", "model", "odometer"])
writeDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .option("key", "reg_license") \
    .option("condition", "${model} == model") \
    .mode("append").save("v3io://mycontainer/cars/")
readDF = spark.read.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .load("v3io://mycontainer/cars/")
readDF.show()
```
  {{< /tab >}}
{{< /code-tabs >}}

This example demonstrates how to [conditionally update](#conditional-updates) NoSQL table items by using the [<opt>condition</opt>](#option-condition) write option.
Each <func>write</func> call in the example is followed by matching <func>read</func> and <func>show</func> calls to read and display the value of the updated item in the target table after the write operation.

The first write command writes an item (row) to a "cars" table in a "mycontainer" data container.
The item's <attr>reg_license</attr> primary-key attribute is set to 7843321, the <attr>mode</attr> attribute is set to "Honda", and the <attr>odometer</attr> attribute is set to 29321.
The <opt>overwrite</opt> save mode is used to overwrite the table if it already exists and create it otherwise.
Reading the item from the table produces this output:
```sh
+-----------+-----+--------+
|reg_license|model|odometer|
+-----------+-----+--------+
|    7843321|Honda|   29321|
+-----------+-----+--------+
```

The second write command uses the <opt>condition</opt> option to update the value of the item's <attr>odometer</attr> attribute only if this value is higher than the current value of this attribute in the table &mdash; `option("condition", "${odometer} > odometer")`.
The <opt>append</opt> save mode is used to update the specified item rather than overwriting the table.
Because the value of <attr>odometer</attr> in the write DataFrame (31718) is higher than the current value of this attribute in the table (29321), the condition evaluates to `true` and the write is executed, updating the value of the item's <attr>odometer</attr> attribute in the table, as shown when reading the item from the table:
```sh
-----------+-----+--------+
|reg_license|model|odometer|
+-----------+-----+--------+
|    7843321|Honda|   31718|
+-----------+-----+--------+
```

The third write command uses the <opt>condition</opt> option (again with the <opt>append</opt> save mode) to update the value of the item's <attr>odometer</attr> attribute to 40001 only if it the value of the <attr>model</attr> attribute remains the same &mdash; `option("condition", "${model} == model")`.
Because the value of <attr>model</attr> in the write DataFrame ("Ford") is different than the current value of this attribute in the table ("Honda"), the condition evaluates to `false` and the write isn't executed (i.e., the table item isn't updated), as shown when reading the item from the table:
```sh
-----------+-----+--------+
|reg_license|model|odometer|
+-----------+-----+--------+
|    7843321|Honda|   31718|
+-----------+-----+--------+
```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/nosql/" >}}
- {{< xref f="data-layer/data-ingestion-and-preparation" a="spark-sql-n-dfs" text="Ingesting and preparing data using Spark" >}}
- {{< xref f="data-layer/spark-data-ingestion-qs.md" >}}
- {{< xref f="data-layer/reference/nosql-table-schema.md" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/spark-df-data-types.md" >}}
- {{< xref f="data-layer/reference/expressions/condition-expression.md" >}}

