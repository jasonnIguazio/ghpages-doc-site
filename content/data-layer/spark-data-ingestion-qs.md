---
title: "Getting Started with Data Ingestion Using Spark"
description: "Get introduced to using Apache Spark to ingest data in the Iguazio MLOps Platform."
keywords: "data ingestion, spark, spark apis, spark dataframes, getting started, quick-start, web notebook,, jupyter, jupyter notebook, hadoop, csv, parquet, nosql, key value, KV, nosql dataframe, nosql tables, tables, table items, item names, primary key, attributes, scala, python, table schema, schema, infer schema, inferSchema"
menu:
  main:
    name:       "Spark Data-Ingestion Quick-Start"
    parent:     "data-layer"
    identifier: "spark-data-ingestion-qs"
    weight:     80
---
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] Replaces
  tutorials/getting-started/data-ingestion-w-spark-qs.md.
- [TODO-SITE-RESTRUCT-P2] Reconsider the guide and its placement.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from
  data-ingestion-and-preparation/README.ipynb/.md). (Until then and for
  previous tutorials releases, we'll have URL redirect rules as part of the
  restructured-site publication.)
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from data-ingestion-and-preparation/README.ipynb/.md). -->
{{< /comment >}}
{{< comment >}}<!-- [V2.0-TODO-JUPYTER] Further edit to replace or extend
  Zeppelin references to Jupyter Notebook; some Jupyter references were already
  added. -->
<!-- [IntInfo] (sharonl) (16.1.21) TODO: Consider replacing the use of the
  default container (`default_container`) for the examples in this tutorial
  with the "users" container or a custom "mycontainer" container. The original
  thought behind using the default container was that it's predefined and users
  can just copy-paste the code, although they would still need to create the
  sample directory and use the same sample files or otherwise modify the code.
  In v3.0.0 the default container changed from "bigdata" to the new predefined
  "projects" container, which is intended to have <project>/ directories, and
  not as currently used in this tutorial. See the [c-projects-default-container]
  and [c-bigdata-container-rm] info in data/vars/product.toml. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview

You can use the {{< url g="spark" v="home" k="text" link="1" >}} open-source data engine to work with data in the {{< product lc >}}.
This tutorial demonstrates how to run Spark jobs for reading and writing data in different formats (converting the data format), and for running SQL queries on the data.
For more information about Spark, see the {{< url g="spark" v="quickstart" k="text" link="1" >}}.

<!-- ---------------------------------------- -->
### Before You Begin {#before-you-begin}

To follow this tutorial, you must first ingest some data, such as a CSV or Parquet file, into the {{< product lc >}} (i.e., write data to a {{< product lc >}} data container).
For information about the available data-ingestion methods, see the {{< xref f="data-layer/data-ingestion-and-preparation.md" >}} and {{< xref f="data-layer/objects/ingest-n-consume-files.md" >}} tutorials.

<!-- ---------------------------------------- -->
### Data Formats {#data-formats}

The Spark jobs in this tutorial process data in the following data formats:

-   Comma Separated Value (CSV)

-   Parquet &mdash; an Apache columnar storage format that can be used in Apache Hadoop.<br/>
    For more information about Parquet, see {{< url v="parquet_home" k="full" link="1" >}}.<br/>
    For more information about Hadoop, see the {{< url g="hadoop" v="home" k="text" link="1" >}} web site.

-   NoSQL &mdash; the {{< product lc >}}'s NoSQL format.
    A **NoSQL table** is a collection of items (objects) and their attributes.
    **"items"** are the equivalent of NoSQL database rows, and **"attributes"**  are the equivalent of NoSQL database columns.<br/>
    All items in the {{< product lc >}} share one common attribute, which serves as an item's **name** and **primary key**.
    The value of this attribute must be unique to each item within a given NoSQL table.
    The primary key enables unique identification of specific items in the table, and efficient sharding of the table items.<br/>
    For more information, see {{< xref f="data-layer/nosql/" >}}.

    You can use {{< xref f="data-layer/reference/spark-apis/spark-datasets/" >}}, or the {{< product lc >}}'s {{< xref f="data-layer/reference/web-apis/nosql-web-api/" >}}, to add, retrieve, and remove NoSQL table items.
    You can also use the {{< product lc >}}'s {{< xref f="data-layer/reference/spark-apis/" text="Spark API extensions" >}} or NoSQL Web API to extend the basic functionality of Spark Datasets (for example, to conditionally update an item in a NoSQL table).
    For more information, see the related API references.

<!-- //////////////////////////////////////// -->
## Using a Web Notebook {#using-a-web-notebook}

A common way to run Spark data jobs is by using web notebook for performing interactive data analytics, such as {{< url v="jupyter_notebook_docs" k="base" k2="text" link="1" >}}.
You create a web notebook with notes that define Spark jobs for interacting with the data, and then run the jobs from the web notebook.
The code can be written in any of the supported language interpreters.
This tutorial contains examples in Scala and Python.
For more information about Jupyter Notebook, see the product documentation.
See also {{< xref f="data-layer/reference/spark-apis/overview.md" a="web-notebook" text="Running Spark Jobs from a Web Notebook" >}} in the Spark reference overview.
{{< comment >}}<!-- [IntInfo] (sharonl) I decided not to explicitly mention here
  the ZEPPELIN-1620 Apache bug that we refer to in the referenced Spark
  reference-overview Zeppelin notes. See the internal info in that section. -->
{{< /comment >}}

The examples in this tutorial were tested with [Spark v{{< verkey k="spark.version" >}}]({{< getvar v="spark.doc.full" >}}).

<!-- ---------------------------------------- -->
### Selecting the Programming Language and Creating a Spark Session {#select-prog-lang-n-create-spark-session}

In JupyterLab, select to create a new Python or Scala notebook.
{{< note id="jupyter-notebooks-scala-not-supported-note" title="Scala Jupyter Notebooks" >}}
Version {{< productVersion num >}} of the {{< product lc >}} doesn't support Scala Jupyter notebooks.
See the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="jupyter-notebooks-scala-not-supported" >}}.
{{< comment >}}<!-- [c-jupyter-notebooks-scala-not-supported] Bug IG-11174 -->
{{< /comment >}}
{{< /note >}}

Then, add the following code in your Jupyter notebook cell or Zeppelin note paragraph to perform required imports and create a new Spark session; you're encouraged to change the `appName` string to provide a more unique description:

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.types._

val spark = SparkSession.builder.appName("My Spark Application").getOrCreate()
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

```
  {{< /tab >}}
{{< /code-tabs >}}

At the end of your code flow, add a cell/paragraph with the following code to stop the Spark session and release its resources:
{{< comment >}}<!-- [c-spark-multi-sessions] -->
{{< /comment >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
spark.stop()
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
spark.stop()

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- //////////////////////////////////////// -->
## Sample Workflows {#sample-workflows}

Following are some possible workflows that use the Spark jobs outlined in this tutorial:

<!-- *************** -->
{{< small-heading id="sample-workflow-csv-to-parquet" >}}Workflow 1: Convert a CSV File into a Partitioned Parquet Table{{< /small-heading >}}

1.  Write a CSV file to a {{< product lc >}} data container.

2.  [Convert](#writing-parquet-data) the CSV file into a Parquet table.

3.  [Run SQL queries](#running-sql-data-queries) on the data in Parquet table.

<!-- *************** -->
{{< small-heading id="sample-workflow-parquet-to-nosql" >}}Workflow 2: Convert a Parquet Table into a NoSQL Table{{< /small-heading >}}

1.  Write a Parquet table to a {{< product lc >}} data container.

2.  [Convert](#writing-nosql-data) the Parquet table into a NoSQL table.

3.  [Run SQL queries](#running-sql-data-queries) on the data in NoSQL table.

<!-- //////////////////////////////////////// -->
## Reading the Data {#reading-the-data}

- [Reading CSV Data](#reading-csv-data)
- [Reading Parquet Data](#reading-parquet-data)
- [Reading NoSQL Data](#reading-nosql-data)

<!-- ---------------------------------------- -->
### Reading CSV Data {#reading-csv-data}

Use the following code to read data in CSV format.<br/>
You can read both CSV files and CSV directories.

{{< note title="Defining the Table Schema" id="read-csv-table-schema-note" >}}
To read CSV data using a Spark DataFrame, Spark needs to be aware of the schema of the data.
You can either define the schema programmatically as part of the read operation as demonstrated in this section, or let Spark infer the schema as outlined in the Spark SQL and DataFrames documentation (e.g., `option("inferSchema", "true")` in Scala or `csv(..., inferSchema="true")` in Python).
(Note that `inferSchema` requires an extra pass over the data.)
{{< comment >}}<!-- [IntInfo] (sharonl) This refers to the built-in Spark DF
  CSV inferSchema option, and not to our custom NoSQL inferSchema option. -->
{{< /comment >}}
{{< /note >}}

{{< note >}}
Before running the read job, ensure that the referenced data source exists.
{{< /note >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="syntax" id="reading-csv-data-syntax" >}}

The <opt>header</opt> and <opt>delimiter</opt> options are optional.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val <schema variable> = StructType(List(
    StructField("<column name>", <column type>, nullable = <Boolean value>),
    <additional StructField() columns> of the same format, for each column>))
val <DF variable> = spark.read.schema(<schema variable>)
    .option("header", "<true/false>")
    .option("delimiter", "<delimiter>")
    .csv("v3io://<container name>/<path to CSV data>")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
<schema variable> = StructType([
    StructField("<column name>", <column type>, <is-nullable Boolean value>),
    <additional StructField() columns> of the same format, for each column>)])
<DF variable> = spark.read.schema(<schema variable>) \
    .option("header", "<true/false>") \
    .option("delimiter", "<delimiter>") \
    .csv("v3io://<container name>/<path to CSV data>")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="example" id="reading-csv-data-examples" >}}
<!-- [IntInfo] (sharonl) (26.2.18) The examples are based on code examples that
  were successfully tested by Blossom, except that I replaced the docs_examples
  container directory with mydata and I removed 3 fields from her example for
  cosmetic reasons, to avoid the need for vertical scrolling in the code tabs;
  (Blossom approved the changes):
  Scala
    StructField("extra", DoubleType, nullable = true),
    StructField("mta_tax", DoubleType, nullable = true),
    StructField("improvement_surcharge", DoubleType, nullable = true),
  Python
    StructField("extra", DoubleType(), True),
    StructField("mta_tax", DoubleType(), True),
    StructField("improvement_surcharge", DoubleType(), True),
-->

The following example reads a <path>/mydata/nycTaxi.csv</path> CSV file from the "{{< getvar v="product.default_container.name" >}}" container into a `myDF` DataFrame variable.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val schema = StructType(List(
    StructField("pickup_time", LongType, nullable = true),
    StructField("dropoff_time", LongType, nullable = true),
    StructField("passenger_count", LongType, nullable = true),
    StructField("trip_distance", DoubleType, nullable = true),
    StructField("payment_type", LongType, nullable = true),
    StructField("fare_amount", DoubleType, nullable = true),
    StructField("tip_amount", DoubleType, nullable = true),
    StructField("tolls_amount", DoubleType, nullable = true),
    StructField("total_amount", DoubleType, nullable = true)
))
val myDF = spark.read.schema(schema)
    .option("header", "false")
    .option("delimiter", "|")
    .csv("v3io://{{% getvar v="product.default_container.name" %}}/mydata/nycTaxi.csv")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
schema = StructType([
    StructField("pickup_time", LongType(), True),
    StructField("dropoff_time", LongType(), True),
    StructField("passenger_count", LongType(), True),
    StructField("trip_distance", DoubleType(), True),
    StructField("payment_type", LongType(), True),
    StructField("fare_amount", DoubleType(), True),
    StructField("tip_amount", DoubleType(), True),
    StructField("tolls_amount", DoubleType(), True),
    StructField("total_amount", DoubleType(), True)
])
myDF = spark.read.schema(schema) \
    .option("header", "false") \
    .option("delimiter", "|") \
    .csv("v3io://{{% getvar v="product.default_container.name" %}}/mydata/nycTaxi.csv")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
### Reading Parquet Data {#reading-parquet-data}

Use the following code to read data as a Parquet database table.

{{< note >}}
Before running the read job, ensure that the referenced data source exists.
{{< /note >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="syntax" id="reading-parquet-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val <DF variable> = spark.read.parquet("v3io://<container name>/<path to Parquet data>")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
<DF variable> = spark.read.parquet("v3io://<container name>/<path to Parquet data>")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="example" id="reading-parquet-data-examples" >}}

The following example reads a <path>/mydata/my-parquet-table</path> Parquet database table from the "{{< getvar v="product.default_container.name" >}}" container into a `myDF` DataFrame variable.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val myDF = spark.read.parquet("v3io://{{% getvar v="product.default_container.name" %}}/mydata/my-parquet-table")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
myDf = spark.read.parquet("v3io://{{% getvar v="product.default_container.name" %}}/mydata/my-parquet-table")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
### Reading NoSQL Data {#reading-nosql-data}

Use the following code to read data as a NoSQL table.

{{< note title="Defining the Table Schema" id="read-nosql-table-schema-note" >}}
When using a Spark DataFrame to read data that was written in the {{< product lc >}} using a {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" text="NoSQL Spark DataFrame" >}}, the schema of the table structure is automatically identified and retrieved (unless you select to explicitly define the schema for the read operation).
However, to read NoSQL data that was written to a table in another way, you first need to define the table schema.
You can either define the schema programmatically as part of the read operation as demonstrated in this section, or let the {{< product lc >}} infer the schema by using the <opt>inferSchema</opt> option (`option("inferSchema", "true")`).
For more information, see {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="defining-the-table-schema" text="Defining the Table Schema" >}} in the Spark NoSQL DataFrame reference.
{{< /note >}}

{{< note >}}
Before running the read job, ensure that the referenced data source exists.
{{< /note >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="syntax" id="reading-nosql-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val <schema variable> = StructType(List(
    StructField("<column name>", <column type>, nullable = <Boolean value>),
    <additional StructField() columns> of the same format, for each column>))
val <DF variable> = spark.read.schema(<schema variable>)
    .format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .load("v3io://<container name>/<path to a NoSQL table>")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
<schema variable> = StructType([
    StructField("<column name>", <column type>, <is-nullable Boolean value>),
    <additional StructField() columns> of the same format, for each column>)])
<DF variable> = spark.read.schema(<schema variable>) \
    .format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .load("v3io://<container name>/<path to a NoSQL table>")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="example" id="reading-nosql-data-examples" >}}
<!-- [IntInfo] (sharonl) (26.2.18) The examples are based on code examples that
  were successfully tested by Blossom, except that I replaced the docs_examples
  container directory with mydata, I changed the table name from "flight" to
  "flights", and I changed the `nullable` value for the `id` column to `false`
  (because I think NoSQL tables need to have a mandatory primary-key attribute
  and this attribute shouldn't be null + it's good to have at least one example
  of nullable = false). Blossom approved the changes. (She said the `id`
  column's nullable filed was probably set to true as a result of a copy-paste.)
-->

The following example reads a <path>/mydata/flights</path> NoSQL table from the "{{< getvar v="product.default_container.name" >}}" container into a `myDF` DataFrame variable.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val schema = StructType(List(
    StructField("id", StringType, nullable = false),
    StructField("origin_country", StringType, nullable = true),
    StructField("call_sign", StringType, nullable = true),
    StructField("velocity", DoubleType, nullable = true),
    StructField("altitude", DoubleType, nullable = true),
    StructField("__mtime_secs", LongType, nullable = true)
))
val myDF = spark.read.schema(schema)
    .format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .load("v3io://{{% getvar v="product.default_container.name" %}}/mydata/flights")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
schema = StructType([
    StructField("id", StringType(), False),
    StructField("origin_country", StringType(), True),
    StructField("call_sign", StringType(), True),
    StructField("velocity", DoubleType(), True),
    StructField("altitude", DoubleType(), True),
    StructField("__mtime_secs", LongType(), True)
])
myDF = spark.read.schema(schema) \
    .format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .load("v3io://{{% getvar v="product.default_container.name" %}}/mydata/flights")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- //////////////////////////////////////// -->
## Writing the Data (Converting the Format) {#writing-the-data}

- [Writing Parquet Data](#writing-parquet-data)
- [Writing NoSQL Data](#writing-nosql-data)
- [Writing CSV Data](#writing-csv-data)

<!-- ---------------------------------------- -->
### Writing Parquet Data {#writing-parquet-data}

Use the following code to write data as a Parquet database table.

<!-- *************** -->
{{< igz-heading-small group="apiref" type="syntax" id="writing-parquet-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
<DF variable>.write.parquet("v3io://<container name>/<path to Parquet data>")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
<DF variable>.write.parquet("v3io://<container name>/<path to Parquet data>")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="example" id="writing-parquet-data-example" >}}

The following example converts the data that is currently associated with the `myDF` DataFrame variable into a <path>/mydata/my-parquet-table</path> Parquet database table in the "{{< getvar v="product.default_container.name" >}}" container.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
myDF.write.parquet("v3io://{{% getvar v="product.default_container.name" %}}/mydata/my-parquet-table")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
myDF.write.parquet("v3io://{{% getvar v="product.default_container.name" %}}/mydata/my-parquet-table")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
### Writing NoSQL Data {#writing-nosql-data}

Use the following code to write data as a NoSQL table.

<!-- *************** -->
{{< igz-heading-small group="apiref" type="syntax" id="writing-nosql-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
<DF variable>.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .option("key", <key column>)
    .save("v3io://<container name>/<path to a NoSQL table>")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
<DF variable>.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .option("key", <key column>) \
    .save("v3io://<container name>/<path to a NoSQL table>")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="example" id="writing-nosql-data-example" >}}

The following example converts the data that is currently associated with the `myDF` DataFrame variable into a <path>/mydata/my-nosql-table</path> NoSQL table in the "{{< getvar v="product.default_container.name" >}}" container.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
myDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}")
    .option("key", "ID").save("v3io://{{% getvar v="product.default_container.name" %}}/mydata/my-nosql-table")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
myDF.write.format("{{% getvar v="spark.product_connector.nosql_data_source" %}}") \
    .option("key", "ID").save("v3io://{{% getvar v="product.default_container.name" %}}/mydata/my-nosql-table")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
### Writing CSV Data {#writing-csv-data}

Use the following code to write data in CSV format.<br/>
You can write both CSV files and CSV directories.

<!-- *************** -->
{{< igz-heading-small group="apiref" type="syntax" id="writing-csv-data-syntax" >}}

The <opt>header</opt> and <opt>delimiter</opt> options are optional.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
<DF variable>.write
    .option("header", "<true/false>")
    .option("delimiter", "<delimiter>")
    .csv("v3io://<container name>/<path to CSV data>")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
<DF variable>.write \
    .option("header", "<true/false>") \
    .option("delimiter", "<delimiter>") \
    .csv("v3io://<container name>/<path to CSV data>")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="example" id="writing-csv-data-example" >}}

The following example converts the data that is currently associated with the `myDF` DataFrame variable into <path>/mydata/my-csv-data</path> CSV data in the "{{< getvar v="product.default_container.name" >}}" container.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
myDF.write.option("header", "true").option("delimiter", ",")
    .csv("v3io://{{% getvar v="product.default_container.name" %}}/mydata/my-csv-data")
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
myDF.write.option("header", "true").option("delimiter", ",") \
    .csv("v3io://{{% getvar v="product.default_container.name" %}}/mydata/my-csv-data")
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- //////////////////////////////////////// -->
## Running SQL Data Queries {#running-sql-data-queries}

Use the following syntax to run an SQL query on your data.

<!-- *************** -->
{{< igz-heading-small group="apiref" type="syntax" id="running-sql-data-queries-syntax" >}}

The call to <func>show</func> is optional.

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
<DF variable>.createOrReplaceTempView("<SQL table name>")
spark.sql("<SQL query string>").show()
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
<DF variable>.createOrReplaceTempView("<SQL table name>")
spark.sql("<SQL query string>").show()
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- *************** -->
{{< igz-heading-small group="apiref" type="example" id="running-sql-data-queries-example" >}}

The following example creates a temporary `myTable` SQL table for the database associated with the `myDF` DataFrame variable, and runs an SQL query on this table:

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
myDF.createOrReplaceTempView("myTable")
spark.sql("select column1, count(1) as count from myTable
    where column2='xxx' group by column1").show()
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
myDF.createOrReplaceTempView("myTable")
spark.sql("select column1, \
    count(1) as count from myTable where column2='xxx' group by column1") \
    .show()
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/app-services/spark.md" >}}
- {{< xref f="data-layer/data-ingestion-and-preparation.md" a="spark" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/" >}}
    - {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" >}}
{{< xref f="data-layer/reference/nosql-table-schema.md" >}}

