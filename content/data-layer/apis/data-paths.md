---
title:      "API Data Paths"
description:  "Learn how to set API data paths for accessing data in Iguazio MLOps Platform data containers."
keywords: "api data paths, container data paths, data paths, v3io mount, v3io, data apis, api, rest api, rest, web api, cluster-management apis, management api, frames, spark, presto"
menu:
  main:
    parent:     "data-layer-apis"
    identifier: "data-layer-api-data-paths"
    weight:     20
---
{{< comment >}} <!-- [SITE-RESTRUCT] Replaces
  tutorials/getting-started/fundamentals/#data-paths.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from
  data-ingestion-and-preparation/ README.ipynb/.md and frames.ipynb). (Until
  then and for previous tutorials releases, we'll have URL redirect rules as
  part of the restructured-site publication.)
- [TODO-SITE-RESTRUCT-P2] Consider removing this file and moving the data-path
  info for each API to a relevant data-layer/ API/data-type doc section (and
  update the ghpages-doc-site and external doc references). We already have explanations
  on how to set data paths for each API, perhaps we just need to edit it and
  ensure all the info from this overview doc is provided for each API.
-->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl)
- [c-ext-ref] This doc is referenced from v3io/tutorials (from
  data-ingestion-and-preparation/ README.ipynb/.md and frames.ipynb); some
  references are to specific anchors (such as #data-paths-presto).
- [TODO-NUCLIO] add info about container paths in Nuclio functions.
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The data containers and their contents are referenced differently depending on the programming interface.
You need to know how to set the data paths for each interface, as outlined in this guide:

- [RESTful Web and Management API Data Paths](#data-paths-rest-apis)
- [{{< getvar v="product.frames.name.sc" >}} API Data Paths](#data-paths-frames)
- [Spark API Data Paths](#data-paths-spark)
- [Presto Data Paths](#data-paths-presto)
- [File-System Data Paths](#data-paths-fs)

<!-- ---------------------------------------- -->
### Predefined Environment Variables {#predefined-envars}

The {{< product lc >}}'s command-line services (Jupyter Notebook and the web shell) predefine the following environment variables for simplifying access to the running-user directory of [the predefined "{{< getvar v="product.users_container.name" >}}" container]({{< xref f="data-layer/containers/predefined-containers.md" a="users-container" t="url" >}}):
{{% include f="users-container-envars" %}}

<!-- //////////////////////////////////////// -->
## RESTful Web and Management API Data Paths {#data-paths-rest-apis}

To refer to a data container or to a specific directory or file in a container from a RESTful web or cluster-management API request, specify the path as part of the URL in the request header:

```
<API-endpoint URL>/<container name>[/<path to file or directory>]
```

For example, the following web-API request URL references the "{{< getvar v="product.default_container.name" >}}" container:
```
{{% verkey k="webapi.url_example" %}}/{{% getvar v="product.default_container.name" %}}/
```

And this is a similar cluster-management API ("management API") request URL:
```
{{% verkey k="mgmt_apis.url_example" %}}/{{% getvar v="product.default_container.name" %}}/
```

The following web-API request URL references a <dirname>mytable</dirname> table directory in an <dirname>{{< getvar v="product.running_user.example" >}}</dirname> running-user directory in the "{{< getvar v="product.users_container.name" >}}" container:
```
{{% verkey k="webapi.url_example" %}}/{{% getvar v="product.users_container.name" %}}/{{% getvar v="product.running_user.example" %}}/mytable
```

When using the {{< product lc >}}'s data-service web APIs, you can optionally set the relative file or directory path within the configured container in the request's JSON body.
For example, for a NoSQL Web API request, you can end the URL path in the previous example with the container name (`{{< getvar v="product.users_container.name" >}}`) and set the <paramname>TableName</paramname> data parameter in the request's JSON body to `"{{< verkey k="doc_samples.ingest_dir" >}}/mytable"`.

For full details and examples, see the {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" text="data-service web-API" >}} and {{< xref f="cluster-mgmt/reference/management-apis/general-api-structure.md" text="management-API" >}} reference documentation.

<!-- //////////////////////////////////////// -->
## {{< getvar v="product.frames.name.sc" >}} API Data Paths {#data-paths-frames}

When using the {{< getvar v="product.frames.name.long_sc" >}} (**{{< getvar v="product.frames.name.lc" >}}**) Python API, you create a client object for a specific data container; the container name is specified in the <paramname>{{< xref f="data-layer/reference/frames/client-constructor.md" a="param-container" text="container" >}}</paramname> parameter of the {{< xref f="data-layer/reference/frames/client-constructor.md" text="<api>Client</api> constructor" >}}.
For example:
```python
import {{% getvar v="product.frames.client.lib_name" %}} as v3f
# Create a client object for the "users" container:
client = v3f.Client("{{% verkey k="frames.grpc.address" %}}", container="{{% getvar v="product.users_container.name" %}}", token="{{< productUI access_key_example >}}")
```

To refer to a specific data collection &mdash; such as a NoSQL or TSDB table or a stream &mdash; you specify in the relevant <api>Client</api> method parameter the relative data path within the container of the parent client object.
In most cases, the data path is set in the <paramname>table</paramname> parameter.
For example:
```python
# Read from a "mytable" table in the root directory of the `client` object's
# container:
df = client.read(backend="kv", table="mytable")

# Read from a "mytable" table in the running-user directory (`{{% getvar v="product.running_user.envar" %}}`)
# of the `client` object's container (typically for the "{{% getvar v="product.users_container.name" %}}" container):
tsdb_table = os.path.join(os.getenv("{{% getvar v="product.running_user.envar" %}}"), "mytable")
df = client.read(backend="tsdb", table=tsdb_table)

# Read from a "drivers" stream in a "my_streams" directory in the `client`
# object's container:
stream = "/my_streams/drivers"
df = client.read(backend="stream", table="/my_streams/drivers", seek="earliest")
```

{{< comment >}}<!-- [c-tsdb-query] [IntInfo] (sharonl) The following text is
  applicable to the undocumented `query` TSDB backend `read` parameter for
  running SQL queries. This parameter is currently documented in the excluded
  data-layer/reference/frames/tsdb.undocumented_tech_preview_features.IGNORED/
  read.md file and marked internally as [TECH-PREVIEW-TSDB-SQL-QUERIES].
  [FUTURE-TODO] When this feature is supported and the `query` read parameter
  is documented, uncomment this text and edit as needed. -->
For an SQL TSDB query, the table path is specified in the <api>FROM</api> clause of the SQL query that's defined in the <func>read</func> method's <paramname>{{< xref f="data-layer/reference/frames/tsdb/read.md" a="param-query" text="query" >}}</paramname> parameter.
Note that when the path contains slashes (`/`), it must be embedded within quotation marks.
For example:
{{< comment >}}<!-- [IntInfo] (sharonl) See [c-frames-tsdb-sql-query-table-path]
  in the frames/tsdb/read.md reference doc regarding optionally
  supporting setting the table path for a TSDB SQL query also in the `table`
  method parameter instead of in the `FROM` clause, in which case we might need
  to slightly rephrase the doc here as well. -->
{{< /comment >}}
```python
# Read from a "tdsb/mytable" table in the `client` object's container:
query_str = f"select * from '/tsdb/mytable'"
df = client.read(backend="tsdb", query=query_str)
```
{{< /comment >}}

For detailed information and examples, see the [{{< getvar v="product.frames.name.lc" >}} API reference]({{< xref f="data-layer/reference/frames/" t="url" >}}).

<!-- //////////////////////////////////////// -->
## Spark API Data Paths {#data-paths-spark}

To refer to data in a data container from Spark API code, such as Spark DataFrames, specify the data path as a fully qualified `v3io` path of the following format &mdash; where `<container name>` is the name of the parent data container and `<data path>` is the relative path to the data within the specified container:

```
v3io://<container name>/<data path>
```

When using a NoSQL DataFrame, you set the data source to <nobr>`"{{% getvar v="spark.product_connector.nosql_data_source" %}}"`</nobr>.

For example:
{{< comment >}}<!-- [IntInfo] (sharonl) In the Scala code, I used `var` instead
  of `val` snippet so that we can reassign the variable value in the next code
  snippet. -->
{{< /comment >}}

{{< code-tabs >}}
  {{< tab "Scala" >}}
```scala
val nosql_source = "{{% getvar v="spark.product_connector.nosql_data_source" %}}"

// Read from a "mytable" NoSQL table in a "{{% verkey k="doc_samples.ingest_dir" %}}" directory in the "{{% getvar v="product.default_container.name" %}}" container:
var table_path = "v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/mytable/"
var readDF = spark.read.format(nosql_source).load(table_path)

// Read from a "mytable" table in the running-user directory of the "{{% getvar v="product.users_container.name" %}}" container.
// The table_path assignments demonstrate alternative methods for setting the same path
// for running-user "{{% getvar v="product.running_user.example" %}}" (specified explicitly only in the first example):
table_path = "v3io://users/{{% getvar v="product.running_user.example" %}}/mytable"
table_path = "v3io://users/" + System.getenv("{{% getvar v="product.running_user.envar" %}}") + "/mytable"
table_path = "v3io://" + System.getenv("{{% getvar v="product.users_container.user_dir.dir_envar" %}}") + "/mytable"
table_path = System.getenv("{{% getvar v="product.users_container.user_dir.dir_url_envar" %}}") + "/mytable"
readDF = spark.read.format(nosql_source).load(table_path)
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import os
nosql_source = "{{% getvar v="spark.product_connector.nosql_data_source" %}}"

# Read from a NoSQL table "mytable" in a "{{% verkey k="doc_samples.ingest_dir" %}}" directory in the "{{% getvar v="product.default_container.name" %}}" container:
table_path = "v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/mytable/"
df = spark.read.format(nosql_source).load(table_path)

# Read from a "mytable" table in the running-user directory of the "{{% getvar v="product.users_container.name" %}}" container.
# The table_path assignments demonstrate alternative methods for setting the same path
# for running-user "{{% getvar v="product.running_user.example" %}}" (specified explicitly only in the first example):
table_path = "v3io://users/{{% getvar v="product.running_user.example" %}}/mytable"
table_path = "v3io://users/" + os.getenv("{{% getvar v="product.running_user.envar" %}}") + "/mytable"
table_path = "v3io://" + os.getenv("{{% getvar v="product.users_container.user_dir.dir_envar" %}}") + "/mytable"
table_path = os.getenv("{{% getvar v="product.users_container.user_dir.dir_url_envar" %}}") + "/mytable"
readDF = spark.read.format(nosql_source).load(table_path)
```
  {{< /tab >}}
{{< /code-tabs >}}

For detailed information and examples, see the {{< xref f="data-layer/reference/spark-apis/spark-datasets/" text="Spark datasets reference" >}} &mdash; and especially the {{< xref f="data-layer/reference/spark-apis/spark-datasets/overview.md" a="data-paths" text="Data Paths" >}} overview and the {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="table-paths" text="Table Paths" >}} NoSQL DataFrame sections; the {{< xref f="data-layer/spark-data-ingestion-qs.md" >}} tutorial; and the Spark examples in the {{< product lc >}}'s {{< xref f="intro/introduction.md" a="the-tutorial-notebooks" text="introduction" text="tutorial Jupyter notebooks" >}} (see details in the {{< xref f="data-layer/data-ingestion-and-preparation.md" a="spark" >}} tutorial).

<!-- //////////////////////////////////////// -->
## Presto Data Paths {#data-paths-presto}

To refer to a table in a data container from a Presto query, specify the table path using the following format &mdash; where `<catalog>` is the name of the Presto connector catalog (`v3io` for the {{< getvar v="presto.product_connector.full" >}}, `<container name>` is the name of the table's parent data container (the Presto schema), and `<table path>` is the relative path to the table within the specified container:
```sh
[<catalog>.][<container name>.]<table path>
```
To specify a path to a nested table, use the following syntax:
```sh
[<catalog>.][<container name>.]"/path/to/table"
```
The catalog and container (schema) names are marked as optional (`[]`) because you can select to configure default values for these parameters when starting the Presto CLI.
For example, the <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd> wrapper that's available in the {{< product lc >}} command-line service environments preconfigures `v3io` as the default catalog.

For example, following are Presto CLI queries that reference NoSQL tables in the {{< product lc >}}'s data containers:
```sh
# Query a "mytable" table in the "{{% getvar v="product.default_container.name" %}}" container:
SELECT * FROM v3io.{{% getvar v="product.default_container.name" %}}.mytable;

# Query a "mytable" table in the "{{% getvar v="product.running_user.example" %}}" running-user directory of the "{{% getvar v="product.users_container.name" %}}" container:
SELECT * FROM v3io.{{% getvar v="product.users_container.name" %}}."/{{% getvar v="product.running_user.example" %}}/mytable";
```
{{< note id="presto-data-path-tips" >}}
- When using the <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd> wrapper instead of the native Presto CLI, you can omit "`v3io.`" from the path:
    ```sh
    SELECT * FROM {{% getvar v="product.default_container.name" %}}.mytable;
    SELECT * FROM {{% getvar v="product.users_container.name" %}}."/{{% getvar v="product.running_user.example" %}}/mytable";
    ```

- You can use a bash table-path variable and the Presto CLI's <opt>execute</opt> option to replace the hardcoded running-user directory name in the second example ("{{< getvar v="product.running_user.example" >}}") with the `{{< getvar v="product.running_user.envar" >}}` environment variable:
    ```sh
    presto_table_path="v3io.users.\"/${{% getvar v="product.running_user.envar" %}}/mytable\""
    presto --execute "SELECT * FROM $presto_table_path"
    ``` 
    {{< comment >}}<!-- [InfraInfo] (sharonl) [IntInfo] replacing the double
      quotes around the $table_path value with single quotes (to eliminate the
      need for escaping the nested-table double quotes in the variable value),
      causes $V3IO_USERNAME not to be evaluated (i.e., it's treated as a regular
      string that's part of the string value). -->
    {{< /comment >}}
{{< /note >}}

Following is an example of an SQL query in a Python Jupyter Notebook, which uses Presto to query a "mytable" table in the running-user directory of the "{{< getvar v="product.users_container.name" >}}" container:
{{< comment >}}<!-- (sharonl) TODO: When we support running Scala from Jupyter
  Notebook (see the [c-jupyter-notebooks-scala-not-supported] known issue), add
  a similar example in Scala and remove the specific "Python" reference above.
-->
{{< /comment >}}
```python
presto_table_path = os.path.join('v3io.users."/' + os.getenv("{{% getvar v="product.running_user.envar" %}}") + '/mytable"')
print("SELECT * FROM " + presto_table_path)
%sql SELECT * FROM $presto_table_path
```

For detailed information and examples, see {{< xref f="data-layer/presto/" >}}, and especially the {{< xref f="data-layer/presto/overview.md" a="table-paths" text="Table Paths" >}} overview and the similar {{< xref f="data-layer/presto/presto-cli.md" a="table-paths" text="Presto CLI" >}} guide that it references.

<!-- //////////////////////////////////////// -->
## File-System Data Paths {#data-paths-fs}

- [Local file-system data paths](#data-paths-local-fs)
- [Hadoop FS data paths](#data-paths-hadoop-fs)

<!-- ---------------------------------------- -->
### Local File-System Data Paths {#data-paths-local-fs}

To refer to data in the {{< product lc >}} from a local file-system command, use the predefined "`{{< verkey k="fs_k8s.data_mount.name" >}}`" data mount:
```sh
{{% verkey k="fs_k8s.data_mount.path" %}}[/<container name>][/<path to file or directory>]
```

To refer to the running-user directory in the "{{< getvar v="product.users_container.name" >}}" container, you can select to use the predefined "`{{< getvar v="product.users_container.user_dir.fs_mount_name" >}}`" mount to this directory:
```sh
{{% getvar v="product.users_container.user_dir.fs_mount_path" %}}/[<path to file or directory in the {{< getvar v="product.users_container.user_dir.dir" >}} directory>]
```
{{< comment >}}<!-- [ci-shcd-w-angle-brackets-in-code-block-sh] [InfraInfo]
  (sharonl) (13.7.20) We typically use the `%` shortcode-call syntax in code
    blocks instead of the `<`/`>` syntax, after we found that the latter creates
    issues in some cases. However, I've now changed the second shortcode call
    in the code block above to use the `<`/`>` syntax because with `%` the
    angle brackets within the data-variable text are translated into the HTML
    bracket tags - `&lt;` and `&gt;`. I'm not sure whether this is because the
    data variable is itself used within angle brackets in this instance,
    because we have other instances of `%` shortcode calls for data variables
    with angle brackets in the text, including withing `sh` code blocks, which
    are processed properly and show the angle brackets in the output.
    Encountered with Hugo v0.57.2 and v0.73.0. -->
{{< /comment >}}

For example:

```sh
# List all data-container directories
ls /v3io
# List the contents of the "{{% getvar v="product.default_container.name" %}}" container
ls {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.default_container.name" %}}/
# List the contents of the "{{% verkey k="doc_samples.ingest_dir" %}}" directory in the "{{% getvar v="product.default_container.name" %}}" container
ls -lF {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/

# Copy a myfile.txt file from a "{{% verkey k="doc_samples.ingest_dir" %}}" directory in the "{{% getvar v="product.default_container.name" %}}" container
# to the running-user directory of the "{{% getvar v="product.users_container.name" %}}" container for user "{{% getvar v="product.running_user.example" %}}".
# All of the following syntax variations evaluate to the same copy command:
cp {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/myfile.txt {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.users_container.name" %}}/{{% getvar v="product.running_user.example" %}}/
cp {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/myfile.txt {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.users_container.name" %}}/${{% getvar v="product.running_user.envar" %}}
cp {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/myfile.txt {{% verkey k="fs_k8s.data_mount.path" %}}/${{% getvar v="product.users_container.user_dir.dir_envar" %}}
cp {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/myfile.txt {{% getvar v="product.users_container.user_dir.fs_mount_path" %}}
```

<!-- ---------------------------------------- -->
### Hadoop FS File-System Data Paths {#data-paths-hadoop-fs}

To refer to a data container or its contents from an Hadoop FS command, specify the data path as a fully qualified `v3io` path of the following format:

```sh
v3io://<container name>/[<data path>]
```
For example:
```sh
# List the contents of the "{{% getvar v="product.default_container.name" %}}" container
hadoop fs -ls v3io://{{% getvar v="product.default_container.name" %}}/
# List the contents of the "{{% verkey k="doc_samples.ingest_dir" %}}" directory in the "{{% getvar v="product.default_container.name" %}}" container
hadoop fs -ls -lF v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/

# Copy a myfile.txt file from a "{{% verkey k="doc_samples.ingest_dir" %}}" directory in the "{{% getvar v="product.default_container.name" %}}" container
# to the running-user directory of the "{{% getvar v="product.users_container.name" %}}" container for user "{{% getvar v="product.running_user.example" %}}"
# All of the following syntax variations evaluate to the same copy command:
hadoop fs -cp v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/myfile.txt v3io://{{% getvar v="product.users_container.name" %}}/{{% getvar v="product.running_user.example" %}}/
hadoop fs -cp v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/myfile.txt v3io://{{% getvar v="product.users_container.name" %}}/${{% getvar v="product.running_user.envar" %}}
hadoop fs -cp v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/myfile.txt v3io://${{% getvar v="product.users_container.user_dir.dir_envar" %}}
hadoop fs -cp v3io://{{% getvar v="product.default_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/myfile.txt ${{% getvar v="product.users_container.user_dir.dir_url_envar" %}}
```

{{< note id="hadoop-fs-data-paths-notes" >}}
<a id="hadoop-fs-data-paths-n-uri-3-slashes-note"></a>The [URI generic-syntax specification](https://tools.ietf.org/html/rfc3986) requires that fully qualified paths contain at least three forward slashes (`/`).
Therefore, to list the contents of a container's root directory you must end the path with a slash, as demonstrated in the examples.
{{< comment >}}<!-- [c-uri-fq-paths-3-slashes-minimum] [IntInfo] (sharonl) I
  found that `hadoop -ls fs v3io://<container name>` returns a NullPointer
  error while `hadoop fs -ls v3io://<container name>/` or `hadoop fs -ls
  v3io://<container name>/<dir name>` succeeds, and Golan explained that this
  is a restriction of fully qualified URI paths, which must contain at least
  three slashes (/). -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (17.1.21) I removed the following note
  for the upcoming v3.0.0 release per Orit's guidelines. In v3.0.0 we changed
  the default container from "bigdata" to "projects" (Requirement IG-15834 /
  DOC IG-17802) [c-projects-default-container] . I found that `hadoop fs -ls
  v3io:///` in this release indeed shows the content of the new default
  container, "projects". But the intention is to eventually not use a default
  container (see Requirement IG-7036, which is currently unplanned) and in
  v3.0.0 we removed all remaining "default container" instances from the doc
  (see DOC IG-17802).) -->
- <a id="hadoop-fs-data-paths-v3io-maps-to-bigdata-note"></a>An Hadoop FS <cmd>ls</cmd> command on `v3io://` or `v3io:///`, without referencing a specific container, lists the contents of the default "{{< getvar v="product.default_container.name" >}}" container.
    (It doesn't list all of the tenant containers like a local file-system <cmd>ls</cmd> command on `{{< verkey k="fs_k8s.data_mount.path" >}}`.)
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/containers/" >}}
  - {{< xref f="data-layer/containers/predefined-containers.md" >}}
- {{< xref f="data-layer/apis/overview.md" >}}
- {{< xref f="data-layer/reference/" >}}
- {{< xref f="data-layer/data-ingestion-and-preparation.md" >}}

