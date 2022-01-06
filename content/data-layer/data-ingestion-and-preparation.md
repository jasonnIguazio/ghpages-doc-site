---
title: "Ingesting and Preparing Data"
description: "Learn how to ingest, analyze, and prepare data in the Iguazio MLOps Platform as part of your data pipeline."
keywords: "data ingestion, data preparation, data pipelines, data consumption, files, ingest file, copy file, upload file, consume file, get file, getting started, quick-start, AWS S3, S3, spark dataframes, spark streaming, spark"
menu:
  main:
    parent:     "data-layer"
    identifier: "data-ingestion-n-preparation-qs"
    weight:     40
---

Learn about different methods for ingesting data into the {{< product full >}}, analyzing the data, and preparing it for the next step in your data pipeline.

{{< note id="tutorial-notebooks-note" >}}
A version of this tutorial is available also as a **README** notebook and Markdown file in the [<dirname>{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}</dirname>]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}) directory of the {{< product lc >}}'s {{< xref f="intro/introduction.md" a="the-tutorial-notebooks" text="introduction" text="tutorial Jupyter notebooks" >}}, which also contains most of the tutorial notebooks referenced in this tutorial.
After reading the tutorial, review and run from a Jupyter Notebook service the tutorial notebooks that are most relevant to your development needs.
A good place to start is the <file>{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}</file> notebook.
If you don't already have a Jupyter Notebook service, {{< xref f="services/fundamentals.md" a="create-new-service" text="create one" >}} first.
{{< comment >}}<!-- Doc-site-specific note -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product full >}} ("the {{< product lc >}}) allows storing data in any format.
The {{< product lc >}}'s multi-model data layer and related APIs provide enhanced support for working with NoSQL ("key-value"), time-series, and stream data.
Various steps of the data science life cycle (pipeline) might require different tools and frameworks for working with data, especially when it comes to the different mechanisms required during the research and development phase versus the operational production phase.
The {{< product lc >}} features a wide set of methods for manipulating and managing data, of different formats, in each step of the data life cycle, using a variety of frameworks, tools, and APIs &mdash; such as Spark SQL and DataFrames, Spark Streaming, Presto SQL queries, pandas DataFrames, Dask, the {{< getvar v="product.frames.name.long_lc" >}} Python library, and web APIs.

This tutorial provides an overview of various methods for collecting, storing, and manipulating data in the {{< product lc >}}, and refers to sample tutorial notebooks that demonstrate how to use these methods.<br>
For an in-depth overview of the {{< product lc >}} and how it can be used to implement a full data science workflow, see {{< xref f="intro/product-overview.md" >}}.
For information about the available full end-to-end use-case application and how-to demos, see {{< xref f="intro/introduction.md" a="demos" >}}.

{{< igz-figure img="pipeline-diagram.png" alt="pipeline-diagram" >}}

<!-- //////////////////////////////////////// -->
## Basic Flow {#basic-flow}

The [**{{< verkey k="jupyter_notebook.tutorials.virtual_env_nb.name" >}}**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.virtual_env_nb.file" >}}) tutorial walks you through basic scenarios of ingesting data from external sources into the {{< product lc >}}'s data store and manipulating the data using different data formats.
The tutorial includes an example of ingesting a CSV file from an AWS S3 bucket; converting it into a NoSQL table using Spark DataFrames; running SQL queries on the table; and converting the table into a Parquet file.

<!-- //////////////////////////////////////// -->
## The {{< product tc >}}'s Data Layer {#data-layer}
{{< comment >}}<!-- [IntInfo] (sharonl) (25.2.21) TODO: Edit the API references
  in this section to match our terminology and API names make additional
  related doc edits, including distinguishing between the web APIs and v3io-py
  SDK APIs, and merge to the v3io/tutorials data-ingestion-and-preparation
  README.ipynb/.md + do a doc review of the referenced notebooks. (Note that we
  currently don't support the v3io-py simple-object API, only NoSQL and
  streaming - see DOC IG-15596.) For now, I only did basic editing and added
  doc-site references only in the new v3.0.0 restructured doc-site
  documentation [SITE-RESTRUCT]. [TODO-SITE-RESTRUCT-P2] -->
{{< /comment >}}

The {{< product lc >}} features an extremely fast and secure {{< xref f="data-layer/" text="data layer " >}} (a.k.a. "data store") that supports storing data in different formats &mdash; SQL, NoSQL, time-series databases, files (simple objects), and streaming.
The data is stored within data containers can be accessed using a variety of APIs &mdash; including [simple-object](#simple-object-api), [NoSQL ("key-value")](#nosql-api), and [streaming](#streaming-api) APIs.
For detailed information, see the {{< xref f="data-layer/apis/overview.md" text="data-layer APIs overview" >}} and the {{< xref f="data-layer/reference/" text="data-layer API  references" >}}.

<!-- ---------------------------------------- -->
### {{< product tc >}} Data Containers {#data-containers}
{{< comment >}}<!-- [IntInfo] (sharonl) This section in the tutorials README
  (data-ingestion-and-preparation/README.ipynb/.NB) has more information, which
  is available along with additional information in the referenced doc-site
  data-layer documentation, so there was no point repeating it here. -->
{{< /comment >}}

Data is stored within data containers in the {{< product lc >}}'s distributed file system (DFS), which makes up the {{< product lc >}}'s data layer (a.k.a. "data store").
There are predefined containers, such as the "{{< getvar v="product.users_container.name" >}}" container, and you can also create additional custom containers.
For detailed information about data containers and how to use them and reference data in containers, see {{< xref f="data-layer/containers/" >}} and {{< xref f="data-layer/apis/data-paths.md" >}}.

<!-- ---------------------------------------- -->
### The Simple-Object {{< product tc >}} API {#simple-object-api}

The {{< product lc >}}'s Simple-Object API enables performing simple data-object and container operations that resemble the Amazon Web Services (AWS) Simple Storage Service (S3) API.
In addition to the S3-like capabilities, the Simple-Object Web API enables appending data to existing objects.
See {{< xref f="data-layer/objects/" >}} and the {{< xref f="data-layer/reference/web-apis/simple-object-web-api/" >}}.
For more information and API usage examples, see the [**v3io-objects**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/v3io-objects.ipynb) tutorial.

<!-- ---------------------------------------- -->
### The NoSQL (Key-Value) {{< product tc >}} API {#nosql-api}

The {{< product lc >}}'s NoSQL (a.k.a. key-value/KV) API provides access to the {{< product lc >}}'s NoSQL data store (database service), which enables storing and consuming data in a tabular format.
See {{< xref f="data-layer/nosql/" >}}.
For more information and API usage examples, see the [**v3io-kv**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/v3io-kv.ipynb) tutorial.

<!-- ---------------------------------------- -->
### The Streaming {{< product tc >}} API {#streaming-api}

The {{< product lc >}}'s Streaming API enables working with data in the {{< product lc >}} as streams.
See the {{< xref f="data-layer/reference/web-apis/streaming-web-api/" >}}.
For more information and API usage examples, see the [**v3io-streams**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/v3io-streams.ipynb) tutorial.
In addition, see the [Working with Streams](#streams) section in the current tutorial for general information about different methods for working with data streams in the {{< product lc >}}.

<!-- //////////////////////////////////////// -->
## Reading Data from External Databases {#external-dbs}

You can use different methods to read data from external databases into the {{< product lc >}}'s data store, such Spark over JDBC or SQLAlchemy.

<!-- //////////////////////////////////////// -->
### Using Spark over JDBC {#spark-over-jdbs}

Spark SQL includes a data source that can read data from other databases using Java database connectivity (JDBC).
The results are returned as a Spark DataFrame that can easily be processed using Spark SQL, or joined with other data sources.
The [**spark-jdbc**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/spark-jdbc.ipynb) tutorial includes several examples of using Spark JDBC to ingest data from various databases &mdash; such as MySQL, Oracle, and PostgreSQL.

<!-- ---------------------------------------- -->
### Using SQLAlchemy {#sqlalchemy}

The [**read-external-db**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/read-external-db.ipynb) tutorial outlines how to ingest data using {{< url v="sqlalchemy_home" k="text" link="1" >}} &mdash; a Python SQL toolkit and Object Relational Mapper, which gives application developers the full power and flexibility of SQL &mdash; and then use Python DataFrames to work on the ingested data set.

<!-- //////////////////////////////////////// -->
## Working with Spark {#spark}

The {{< product lc >}} has a default pre-deployed Spark service that enables ingesting, analyzing, and manipulating data using different {{< url g="spark" v="home" k="text_short" link="1" >}} APIs:

- Using Spark SQL and DataFrames
- Using the Spark Streaming API &mdash; see [Using Streaming Streaming](#streams-spark) under "Working with Spark".

<!-- ---------------------------------------- -->
### Using Spark SQL and DataFrames {#spark-sql-n-dfs}

Spark lets you write and query structured data inside Spark programs by using either SQL or a familiar DataFrame API.
DataFrames and SQL provide a common way to access a variety of data sources.
You can use the {{< url g="spark" v="sql_home" k="text_w_df" link="1" >}} API to ingest data into the {{< product lc >}}, for both batch and micro-batch processing, and analyze and manipulate large data sets, in a distributed manner.

The {{< product lc >}}'s custom NoSQL Spark DataFrame implements the Spark data-source API to support a custom data source that enables reading and writing data in the {{< product lc >}}'s NoSQL store using Spark DataFrames, including enhanced features such as data pruning and filtering (predicate push down); queries are passed to the {{< product lc >}}'s data store, which returns only the relevant data.
This allows accelerated and high-speed access from Spark to data stored in the {{< product lc >}}.

The [**spark-sql-analytics**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/spark-sql-analytics.ipynb) tutorial demonstrates how to use Spark SQL and DataFrames to access objects, tables, and unstructured data that persists in the {{< product lc >}}'s data store.

For more information and examples of data ingestion with Spark DataFrames, see {{< xref f="data-layer/spark-data-ingestion-qs.md" >}}.<br>
For more about running SQL queries with Spark, see [Running Spark SQL Queries](#sql-spark) under "Running SQL Queries on {{< product tc >}} Data".

<!-- //////////////////////////////////////// -->
## Working with Streams {#streams}

The {{< product lc >}} supports various methods for working with data streams, including the following:

- [Using Nuclio to Get Data from Common Streaming Engines](#streams-nuclio)
- [Using the {{< product tc >}}'s Streaming Engine](#streams-platform)
- [Using Spark Streaming](#streams-spark)

<!-- ---------------------------------------- -->
### Using Nuclio to Get Data from Common Streaming Engines {#streams-nuclio}

The {{< product lc >}} has a default pre-deployed Nuclio service that uses {{< company >}}'s {{< url v="nuclio_home" k="text" link="1" >}} serverless-framework, which provides a mechanism for analyzing and processing real-time events from various streaming engines.
Nuclio currently supports the following streaming frameworks &mdash; Kafka, Kinesis, Azure Event Hubs, {{< product lc >}} streams (a.k.a. V3IO streams), RabbitMQ, and MQTT.

Using Nuclio functions to retrieve and analyze streaming data in real time is a very common practice when building a real-time data pipeline.
You can stream any type of data &mdash; such as telemetry (NetOps) metrics, financial transactions, web clicks, or sensors data &mdash; in any format, including images and videos.
You can also implement your own logic within the Nuclio function to manipulate or enrich the consumed stream data and prepare it for the next step in the pipeline.

Nuclio serverless functions can sustain high workloads with very low latencies, thus making them very useful for building an event-driven applications with strict latency requirements.

For more information about Nuclio, see the {{< xref f="services/app-services/nuclio.md" >}}.

<!-- ---------------------------------------- -->
### Using the {{< product tc >}}'s Streaming Engine {#streams-platform}

The {{< product lc >}} features a custom streaming engine and a related stream format &mdash; a {{< product lc >}} stream (a.k.a. V3IO stream).
You can use the {{< product lc >}}'s streaming engine to write data into a queue in a real-time data pipeline, or as a standard streaming engine (similar to Kafka and Kinesis), so you don't need to use an external engine.

The {{< product lc >}}'s streaming engine is currently available via the {{< product lc >}}'s {{< xref f="data-layer/reference/web-apis/streaming-web-api/" text="Streaming Web API" >}}.<br>
In addition, the {{< product lc >}}'s Spark-Streaming Integration API enables using the Spark Streaming API to work with {{< product lc >}} streams, as explained in the next section ([Using Spark Streaming](#streams-spark)).


The [**v3io-streams**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/v3io-streams.ipynb) tutorial demonstrates basic usage of the streaming API.

{{< comment >}}
<!-- [IntInfo] The referenced demo doesn't exist.
The [**model deployment with streaming**](https://github.com/mlrun/demo-model-deployment-with-streaming) demo application includes an example of a Nuclio function that uses {{< product lc >}} streams.
-->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Using Spark Streaming {#streams-spark}

You can use the {{< url g="spark" v="streaming_home" k="text" link="1" >}} API to ingest, consume, and analyze data using data streams.
The {{< product lc >}} features a custom {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/" text="Spark-Streaming Integration API" >}} to allow using the Spark Streaming API with [{{< product lc >}} streams](#streams-platform).

{{< comment >}}
<!-- TODO: Add more information / add a tutorial and refer to it. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Running SQL Queries on {{< product tc >}} Data {#sql}

You can run SQL queries on NoSQL and Parquet data in the {{< product lc >}}'s data store, using any of the following methods:

- [Running full ANSI Presto SQL queries](#sql-presto) using SQL magic
- [Running Spark SQL queries](#sql-spark)
- [Running SQL queries from Nuclio functions](#sql-nuclio)

<!-- ---------------------------------------- -->
### Running Full ANSI Presto SQL Queries {#sql-presto}

The {{< product lc >}} has a default pre-deployed Presto service that enables using the {{< url g="presto" v="home" k="text" link="1" >}} open-source distributed SQL query engine to run interactive SQL queries and perform high-performance low-latency interactive analytics on data that's stored in the {{< product lc >}}.
To run a Presto query from a Jupyter notebook, all you need is to use an SQL magic command &mdash; `%sql` followed by your Presto query.
Such queries are executed as distributed queries across the {{< product lc >}}'s application nodes.
The [**{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.name" >}}**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}) tutorial demonstrates how to run Presto queries using SQL magic.

Note that for running queries on Parquet tables, you need to work with Hive tables.
The [**csv-to-hive**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/csv-to-hive.ipynb) tutorial includes a script that converts a CSV file into a Hive table.

<!-- ---------------------------------------- -->
### Running Spark SQL Queries {#sql-spark}

The [**spark-sql-analytics**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/spark-sql-analytics.ipynb) tutorial demonstrates how to run Spark SQL queries on data in the {{< product lc >}}'s data store.

For more information about the {{< product lc >}}'s Spark service, see [Working with Spark](#spark) in this tutorial.

<!-- ---------------------------------------- -->
### Running SQL Queries from Nuclio Functions {#sql-nuclio}

In some cases, you might need to run SQL queries as part of an event-driven application.
The [**nuclio-read-via-presto**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/nuclio-read-via-presto.ipynb) tutorial demonstrates how to run an SQL query from a serverless Nuclio function.

<!-- ---------------------------------------- -->
### Running SQL Queries from MLRun Jobs {#data-ingest-sql-mlrun}

In some cases, you might need to run SQL queries as part of an MLRun job.
The [**mlrun-read-via-presto**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/mlrun-read-via-presto.ipynb) tutorial demonstrates how to run an SQL query from an MLRun job using Presto.

<!-- //////////////////////////////////////// -->
## Working with Parquet Files {#parquet}

Parquet is a columnar storage format that provides high-density high-performance file organization.<br>
The [**parquet-read-write**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/parquet-read-write.ipynb) tutorial demonstrates how to create and write data to a Parquet table in the {{< product lc >}} and read data from the table.

After you ingest Parquet files into the {{< product lc >}}, you might want to create related Hive tables and run SQL queries on these tables.<br>
The [**parquet-to-hive**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/parquet-to-hive.ipynb) tutorial demonstrates how you can do this using Spark DataFrames.

<!-- //////////////////////////////////////// -->
## Accessing {{< product tc >}} NoSQL and TSDB Data Using the {{< getvar v="product.frames.name.tc" >}} Library {#frames}

{{< public-gh ghid="frames" link="1" k="text" >}} (**"{{< getvar v="product.frames.name.sc" >}}"**) is a multi-model open-source data-access library, developed by {{< company >}}, which provides a unified high-performance DataFrame API for working with data in the {{< product lc >}}'s data store.
{{< getvar v="product.frames.name.sc" >}} currently supports the NoSQL (key-value) and time-series (TSDB) data models via its NoSQL (`nosql`|`kv`) and TSDB (`tsdb`) backends.
The [**{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.frames_nb.name" >}}**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.frames_nb.file" >}}) tutorial provides an introduction to {{< getvar v="product.frames.name.lc" >}} and demonstrates how to use it to work with NoSQL and TSDB data in the {{< product lc >}}.
See also the [{{< getvar v="product.frames.name.lc" >}} API reference]({{< xref f="data-layer/reference/frames/" t="url" >}}).

<!-- //////////////////////////////////////// -->
## Getting Data from AWS S3 Using curl {#s3-curl}

A simple way to ingest data from the Amazon Simple Storage Service (S3) into the {{< product lc >}}'s data store is to run a curl command that sends an HTTP request to the relevant AWS S3 bucket, as demonstrated in the following code cell.
For more information and examples, see the [**{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.name" >}}**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}#ingest-from-amazon-s3-using-curl) tutorial.
{{< comment >}}<!--  -->
<!-- TODO: Add a reference to the XCP tool and explain how to load a bulk of data from S3. -->
{{< /comment >}}

```sh
%%sh
CSV_PATH="{{% getvar v="product.users_container.user_dir.fs_mount_path" %}}/examples/stocks.csv"
curl -L "https://s3.wasabisys.com/iguazio/data/stocks/2018-03-26_BINS_XETR08.csv" > ${CSV_PATH}
```

<!-- //////////////////////////////////////// -->
## Running Distributed Python Code with Dask {#dask}

{{< url v="dask_home" k="text" link="1" >}} is a flexible library for parallel computation in Python, which is useful for computations that don't fit into a DataFrame.
Dask exposes low-level APIs that enable you to build custom systems for in-house applications.
This helps parallelize Python processes and dramatically accelerates their performance.
The [**dask-cluster**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/dask-cluster.ipynb) tutorial demonstrates how to use Dask with {{< product lc >}} data.

Dask is pre-deployed in the {{< product lc >}}'s Jupyter Notebook service.
For more information about using Dask in the {{< product lc >}}, see {{< xref f="services/app-services/dask.md" text="the Dask application service" >}}.

<!-- //////////////////////////////////////// -->
## Running DataFrames on GPUs using NVIDIA cuDF {#gpu}

The {{< product lc >}} allows you to use NVIDIA's {{< url v="rapids_home" k="text" link="1" >}} open-source libraries suite to execute end-to-end data science and analytics pipelines entirely on GPUs.
{{< url v="rapids_cudf_docs" k="text_short" link="1" >}} is a RAPIDS GPU DataFrame library for loading, joining, aggregating, filtering, and otherwise manipulating data.
This library features a pandas-like API that will be familiar to data engineers and data scientists, who can use it to easily accelerate their workflows without going into the details of CUDA programming.
The [**{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.gpu_rapids_cudf_benchmark_nb.name" >}}**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.gpu_rapids_cudf_benchmark_nb.file" >}}) tutorial demonstrates how to use the cuDF library and compares performance benchmarks with pandas and cuDF.

{{< note id="cudf-needs-rapids-conda-envr-note" >}}
To use the cuDF library, you need to create a RAPIDS Conda environment.
For more information, see the [**{{< verkey k="jupyter_notebook.tutorials.virtual_env_nb.name" >}}**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.virtual_env_nb.file" >}}) tutorial.
{{< /note >}}

For more information about the {{< product lc >}}'s GPU support, see {{< xref f="services/app-services/gpu.md" >}}.

<!-- //////////////////////////////////////// -->
## Visualizing Data with Grafana {#data-ingest-grafana}

The {{< product lc >}} has a {{< xref f="services/app-services/data-monitoring-and-visualization-services.md" a="grafana" text="Grafana service " >}} with predefined dashboards that leverage the monitoring service to display monitoring data, such as performance statistics, for application services.
You can also {{< xref f="services/grafana-dashboards.md" text="define custom Grafana " >}} dashboards for monitoring, visualizing, and understanding data stored in the {{< product lc >}}, such as time-series metrics and NoSQL data.
You can read and analyze data from the {{< product lc >}}'s data store and visualize it on Grafana dashboards in the desired formats, such as tables and graphs.
This can be done by using the custom `iguazio` data source, or by using a Prometheus data source for running Prometheus queries on {{< product lc >}} TSDB tables.
You can also issue data alerts and create, explore, and share dashboards.

You can use {{< company >}}'s {{< public-gh ghid="grafwiz" link="1" >}} Python library to create an deploy Grafana dashboards programmatically, as demonstrated in the [**grafana-grafwiz**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/grafana-grafwiz.ipynb) tutorial.
{{< comment >}}<!-- [c-grafwiz] [IntInfo] (sharonl) (28.2.21) I couldn't locate
  a requirement for supporting v3io/grafwiz and I don't have a doc task for this
  (neither in Jira or in Trello). I previously understood from Adrian, Or Z.,
  and Gilad that this was implemented in v2.10.0 and modified for v3.10.0; the
  tutorial and doc-site reference were added only in v3.0.0. I asked Adi and
  Gilad to open a requirement and a doc task for this and set prioritization;
  qualify the feature as Tech Preview in v3.0.0; add versioning to the
  v3io/grafwiz GitHub repo (which currently has only a single `master` branch
  and no releases or tags); and add info about the supported version to the
  product's external and internal support matrix. [PENDING-PRODUCT] -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/" >}}
- {{< xref f="data-layer/" >}}
    - {{< xref f="data-layer/nosql/" >}}
    - {{< xref f="data-layer/stream/" >}}
    - {{< xref f="data-layer/tsdb/" >}}
    - {{< xref f="data-layer/spark-data-ingestion-qs.md" >}}
    - {{< xref f="data-layer/presto/" >}}
    - {{< xref f="data-layer/reference/" >}}

