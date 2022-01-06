---
title: "The Presto CLI"
description: "Learn how use the Presto CLI to run SQL queries in the Iguazio MLOps Platform."
keywords: "presto cli, presto-cli, presto, cli, Iguazio Presto connector, v3io catalog, v3io, data paths, table paths, tables, nosql, nosql tables, partitioning, partitions, primary key, sharding key, sorting key, range scan"
menu:
  main:
    parent:      "presto"
    identifier:  "presto-cli"
    weight:      20
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces reference/presto/presto-cli.md. -->
{{< /comment >}}
{{< comment >}}<!-- [V2.0-TODO-PRESTO-AUTH] (sharonl) (24.2.19) I edited the
  v2.0.0 k8s doc to replaces master app node and SSH connection info with refs
  to the web shell and Jupyter terminals, change CLI paths and server URL info,
  and change the internal "presto" wrapper. TODO: Add Presto access-key user
  authentication (Presto username and password) (DOC IG-9662) and Presto
  CLI/server TrustStore authentication info (DOC IG-10809); so far, I only
  mentioned that the "presto" wrapper preconfigures this. The username &
  password and TrustStore file & password flags need to be added also to all
  existing presto-cli examples in this file (e.g., when demonstrating setting
  the server, catalog, and schema flags with presto-cli), as the presto-cli
  requires setting these flags to work.
  Use the {{< text-access-key-get >}} shortcode to document how to get an
  access key (which is required when using the native Presto CLI).
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The web-based shell service and the terminals of the Jupyter Notebook service are automatically connected to the Presto service and include a copy of [the native Presto command-line interface]({{< getvar v="presto.doc.cli.full" >}}) (CLI) &mdash; <file>{{< verkey k="presto.cli" >}}</file> &mdash; which you can use to query data in the {{< product lc >}}.
The native Presto CLI is found in the <path>{{< verkey k="presto.k8s.install_bin_dir_path" >}}</path> directory, which is included in the environment path (`$PATH`) to simplify execution from any directory.
To facilitate using Presto with the {{< getvar v="presto.product_connector.full" >}} to query NoSQL tables in the {{< product lc >}}'s data containers, the environment path also contains a <cmd-b>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd-b> wrapper that preconfigures your cluster's Presto server URL, the `v3io` catalog, the Presto user's username and password ({{< product lc >}} access key), and the Presto Java TrustStore file and password.
{{< comment >}}<!-- [IntInfo] (sharonl)
- (25.2.19) Orit said that the access key that should be provided to the CLI as
  the password is that of the current user (which is running the shell etc.),
  but to allow the "presto" wrapper preconfiguration we use the access key of
  the running user, although this isn't something we necessarily want to
  document. => I phrased the text above so as to bypass this issue.
- [c-presto-wrapper] "presto" in the k8s environments is an alias that
  comprises other aliases: -->
  ```sh
  presto is aliased to `prestow --catalog=v3io`
  prestow is aliased to `prestojks --server https://presto:8443`
  prestojks is aliased to `PRESTO_PASSWORD=<access key for the running user> presto-cli --truststore-path /var/run/iguazio/java/cert/iguazio.jks --truststore-password <Presto Java TrustStore password> --user <running user> --password`;
  ```
  `prestojks` example for user "iguazio" &mdash;
  ```sh
    prestojks is aliased to `PRESTO_PASSWORD=4e1b1361-2f0d-4c88-9305-ba5c7cd8ca5b presto-cli --truststore-path /var/run/iguazio/secrets/tls.jks --truststore-password dbac3ff917774c9f9335ae6da6db5868 --user iguazio --password`
  ```
  `prestojks` example for user "admin" &mdash;
  ```sh
  prestojks is aliased to `PRESTO_PASSWORD=dff11fae-3727-43d7-a6e9-bfdeee0a0835 presto-cli --truststore-path /var/run/iguazio/secrets/tls.jks --truststore-password dbac3ff917774c9f9335ae6da6db5868 --user admin --password`
  ```
{{< /comment >}}
For detailed information about Presto and its CLI, refer to the {{< url g="presto" v="doc" k="text" link="1" >}}.

You start the Presto CLI by running either <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd> (recommended) or <cmd>{{< verkey k="presto.cli" >}}</cmd> from a web shell or JupyterLab terminal.
For information about the supported CLI options, see [CLI Options](#cli-options).
For example:
```sh
{{% verkey k="presto.cli_v3io_wrapper" %}}
```

You can stop the CLI, at any time, by running the <cmd>exit</cmd> command.

<!-- //////////////////////////////////////// -->
## CLI Options {#cli-options}

When starting the CLI, you can specify any supported native Presto CLI option.
Use the `--help` option to see a full list.
The following options are especially relevant when using the CLI in the {{< product lc >}}:

<dl>
  <!-- server -->
  {{< param-doc name="--server" id="option-server" >}}
  Sets the location of the Presto server.
  The <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd> wrapper already preconfigures the server location for your {{< product lc >}} cluster.
  However, when running <cmd>{{< verkey k="presto.cli" >}}</cmd>, you must set <opt>--server</opt> to the location of the Presto server in your cluster.
  The Presto server URL is the API URL of the predefined Presto service (`{{< verkey k="presto.service_display_name" >}}`), which you can copy from the <gui-title>Services</gui-title> page of the {{< productUI short_lc >}}.
  The following command demonstrates setting the Presto server URL to `{{< verkey k="presto.k8s.api_url_example" >}}`:
  ```sh
  {{% verkey k="presto.cli" %}} --server {{% verkey k="presto.k8s.api_url_example" %}}
  ```
  {{< /param-doc >}}

  <!-- catalog -->
  {{< param-doc name="--catalog" id="option-catalog" >}}
  Sets the default Presto-connector catalog.
  If you don't configure a default catalog, you need to specify the catalog in the `FROM` string of each Presto command; for table commands, the catalog is specified at the start of the table path.
  (You can override the default configuration by specifying another catalog in specific Presto commands.)

  To use the {{< getvar v="presto.product_connector.full" >}} to query {{< product lc >}} NoSQL tables, you need to use the `v3io` catalog (see [The v3io Catalog](#v3io-catalog)).
  The <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd> wrapper already preconfigures the catalog to `v3io`.
  When running <cmd>{{< verkey k="presto.cli" >}}</cmd>, you can optionally use the <nobr><opt>--catalog</opt></nobr> option to set the default Presto-connector catalog to `v3io`.
  For example:
  ```sh
  {{% verkey k="presto.cli" %}} --catalog v3io --server {{% verkey k="presto.k8s.api_url_example" %}}
  ```
  {{< /param-doc >}}

  <!-- schema -->
  {{< param-doc name="--schema" id="option-schema" >}}
  Sets the default Presto schema.
  In the {{< product full >}}, the Presto schema is the name of the data container that contains the queried tables.
  If you don't configure a default container, you need to include the container name as part of the table path in each Presto command.
  (You can override the default configuration by specifying another container name in specific Presto commands.)
  This is true for both <cmd>{{< verkey k="presto.cli" >}}</cmd> and <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd>.
  For example, the following command configures the CLI to query tables in the "{{< getvar v="product.default_container.name" >}}" container using <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd>:
  ```sh
  {{% verkey k="presto.cli_v3io_wrapper" %}} --schema {{% getvar v="product.default_container.name" %}}
  ```
  And this is an example of a similar command using the native Presto CLI (<cmd>{{< verkey k="presto.cli" >}}</cmd>):
  ```sh
  {{% verkey k="presto.cli" %}} --schema {{% getvar v="product.default_container.name" %}} --catalog v3io --server {{% verkey k="presto.k8s.api_url_example" %}}
  ```
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
## The v3io Catalog {#v3io-catalog}

To configure Presto to work with the {{< getvar v="presto.product_connector.full" >}} for querying data in the {{< product lc >}}'s NoSQL store, you need to use the connector's custom `v3io` Presto catalog.
The <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd> CLI wrapper already preconfigures this catalog.
When running the native Presto CLI (<cmd>{{< verkey k="presto.cli" >}}</cmd>), you can set the [<nobr><opt>--catalog</opt></nobr>](#option-catalog) option to configure `v3io` as the default catalog.
For example:
```sh
{{% verkey k="presto.cli" %}} --catalog v3io --server {{% verkey k="presto.k8s.api_url_example" %}}
```
If you don't configure the `v3io` catalog when starting the CLI (either by using <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd> or by explicitly setting <nobr><opt>--catalog v3io</opt></nobr>), you need to specify the catalog in the `FROM` string of each Presto command; for commands that reference {{< product lc >}} NoSQL tables, the table path must begin with `v3io` (see [Table Paths](#table-paths) for details).
The following example queries a NoSQL "mytable" table in a "mycontainer" data container:
```sh
SELECT * from v3io.mycontainer.mytable;
```

<!-- //////////////////////////////////////// -->
### Supported Commands {#supported-commands}

After starting the Presto CLI, you can run supported commands for your selected catalog from the Presto command line.
Version {{< productVersion num >}} of the {{< getvar v="presto.product_connector.full" >}}'s `v3io` catalog supports the Presto [<cmd>CREATE VIEW</cmd>]({{< getvar v="presto.doc.sql.create_view.full" >}}), [<cmd>DROP VIEW</cmd>]({{< getvar v="presto.doc.sql.drop_view.full" >}}), [<cmd>SELECT</cmd>]({{< getvar v="presto.doc.sql.select.full" >}}), [<cmd>SHOW CATALOGS</cmd>]({{< getvar v="presto.doc.sql.show_catalogs.full" >}}), [<cmd>SHOW CREATE VIEW</cmd>]({{< getvar v="presto.doc.sql.show_create_view.full" >}}), [<cmd>SHOW FUNCTIONS</cmd>]({{< getvar v="presto.doc.sql.show_functions.full" >}}), [<cmd>SHOW SCHEMAS</cmd>]({{< getvar v="presto.doc.sql.show_schemas.full" >}}), and [<cmd>SHOW TABLES</cmd>]({{< getvar v="presto.doc.sql.show_tables.full" >}}) queries and the custom [<cmd>v3io.schema.infer</cmd>](#nosql-table-schema) command.
See the [v3io query examples](#v3io-query-examples).
{{< comment >}}<!-- [IntInfo] [c-presto-supported-operations] (sharonl) See
  the internal info for the supported Presto commands doc in the
  sw-specifications.md specs doc. -->
{{< /comment >}}

{{< note id="supported-cmds-notes" >}}
- <a id="show-tables-notes"></a><cmd>SHOW TABLES</cmd> returns only tables that reside in the container's root directory, provided the access key includes data-access permissions for this directory.
    {{< comment >}}<!-- [IntInfo] [c-presto-show-tables-restrictions] (sharonl)
      See the internal info for the similar restrictions in the
      sw-specifications.md specs doc. -->
    {{< /comment >}}
- <a id="view-cmds-hive-dep-note"></a>To use the view commands (<cmd>CREATE VIEW</cmd>, <cmd>DROP VIEW</cmd>, and <cmd>SHOW CREATE VIEW</cmd>), you first need to enable Hive for the Presto service.
    See {{< xref f="data-layer/presto/overview.md" a="hive-enable" text="Enabling Hive" >}}.
    You can then save views of {{< product lc >}} NoSQL tables, as well as other supported file types, to the default schema of the Hive presto connector (`hive.default`).
    {{< comment >}}<!-- [c-presto-view-cmds-hive-dependency] See DOC IG-9650. -->
    {{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Table Paths {#table-paths}

When using the {{< getvar v="presto.product_connector.full" >}}, you can specify table paths in one of two ways:

- <a id="table-path-table-name-syntax"></a>Table name &mdash; this is the standard Presto syntax and is currently supported only for tables that reside directly in the root directory of the configured data container (Presto schema).

    - When using built-in Presto commands, such as <cmd>SELECT</cmd>, you specify the path as `v3io.<container name>.<table name>`.
        For example, `SELECT * FROM v3io.mycontainer.mytable;`.
  - When using the custom [<cmd>v3io.schema.infer</cmd>](#v3io-schema-infer) command, you pass the container and table names as separate parameters &mdash; `v3io.schema.infer('<container name>', '<table name>');`.
        For example, `call v3io.schema.infer ('mycontainer', 'mytable');`.

- <a id="table-path-file-path-syntax"></a>File path &mdash; the relative path to the table within the configured data container (`/path/to/table`).
    Currently, nested tables in the {{< product lc >}}'s data containers must be referenced using this syntax.

  - When using built-in Presto commands, such as <cmd>SELECT</cmd>, you specify the path as `v3io.<container name>."/path/to/table"`.
    For example, `SELECT * FROM v3io.mycontainer."/mytables/cars/vendors";`.
    Note that the table path must be embedded within double quotes.
  - When using the custom [<cmd>v3io.schema.infer</cmd>](#v3io-schema-infer) command, you pass the container name and table path as separate parameters &mdash; `v3io.schema.infer('<container name>', '/path/to/table');`.
    For example, `call v3io.schema.infer ('mycontainer', '/mytables/cards/vendors');`.
    {{< comment >}}<!-- [IntInfo] (sharonl) (16.6.19) Omitting the slash at the
      start of the path in the v3io.schema.infer command also works, but I
      decided not to mention this option or use it in the doc examples to keep
      the doc simple and as consistent as possible for the different syntax
      options. -->
    {{< /comment >}}

{{< note id="table-path-notes" >}}
- <a id="table-path-preconfigured-catalog-or-schema-note"></a>For both syntax variations, in standard Presto commands you can optionally omit the catalog and container (schema) names if they're already preconfigured; see the CLI [<opt>--catalog</opt>](#option-catalog) and [<opt>--schema</opt>](#option-schema) options.
    The  <cmd>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd> wrapper preconfigures the `v3io` catalog.
    {{< comment >}}<!-- [IntInfo] (sharonl) I don't know whether there's a way
      to configure a default schema without configuring a default catalog and
      then specifying only the catalog name in the table paths and omitting the
      schema name. I consulted Vadim and he didn't know either. -->
    {{< /comment >}}
- <a id="table-path-for-container-root-dir-tables-note"></a>Tables in a data container's root directory can be accessed by using either the table-name or file-path syntax.
    The table-name syntax is simpler but slower.
    Therefore, it's recommended that you use the path syntax when you need to frequently repeat a specific query.
- <a id="table-path-letter-case-note"></a>Table-path letter case &mdash;

    - The table-name syntax (which is supported for tables in the root container directory) ignores the letter case in the table path.
        Therefore, it also supports uppercase letters in the path; (note that the table names will appear in lowercase letters in query results).
    - The file-path syntax doesn't currently support uppercase letters in the table path.
    {{< comment >}}<!-- [IntInfo] (sharonl) (17.10.19) See Bug IG-12353 to
      support uppercase letters in the table path (opened by me in v2.2.0 and 
      currently planned for v2.8.0). -->
    {{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Defining the NoSQL Table Schema {#nosql-table-schema}

Presto handles structured data.
Therefore, it needs to be aware of the schema of the data structure.
(Don't confuse this with native Presto schemas, which are used for organizing tables &mdash; as explained, for example, for the [<opt>--schema</opt>](#option-schema) option.)
When writing NoSQL data in the {{< product lc >}} using {{< xref f="data-layer/reference/frames/nosql/write.md" textvar="product.frames.name.lc" >}} or a {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" text="Spark DataFrame" >}}, the schema of the data table is automatically identified and saved and then retrieved when using {{< getvar v="product.frames.name.lc" >}}, Spark DataFrames, or Presto to read data from the same table (unless you select to explicitly define the schema for the read operation).
However, to use Presto, {{< getvar v="product.frames.name.lc" >}}, or Spark DataFrames to read NoSQL data that was written to a table in another way, you first need to define the table schema.
You can do this by using the {{< product lc >}}'s custom Presto [<cmd>v3io.schema.infer</cmd>](#v3io-schema-infer) command, which generates the required schema file.
For more information, see the {{< xref f="data-layer/reference/nosql-table-schema.md" >}}.
{{< comment >}}<!-- [IntInfo] (sharonl) I decided not to add the Tech Preview
  mark here. It's enough that we add it in the referenced command doc, below.
-->
{{< /comment >}}

<!-- ---------------------------------------- -->
### The v3io.schema.infer Command {#v3io-schema-infer}

The {{< getvar v="presto.product_connector.full" >}} exposes a <cmd>v3io.schema.infer</cmd> command that can be used to infer the schema of an existing table by analyzing its data.
The command has the following syntax &mdash; where `<container name>` is the name of the data container (schema) that contains the table and `<relative table path>` is the relative path to the table within the container (see [Table Paths](#table-paths)):
```sh
call v3io.schema.infer('<container name>', '<relative table path>');
```
When the table resides in the container's root directory, the relative path can be the table name.
For example, the following command infers the schema of a "mytable" table in the root directory of a "mycontainer" data container:
```sh
call v3io.schema.infer('mycontainer', 'mytable');
```
For nested tables, you need to specify the table path as `'/path/to/table'`.
For example, the following command infers the schema of a "mytable" table in a <dirname>mydata</dirname> directory of a "mycontainer" data container:
```sh
call v3io.schema.infer('mycontainer', '/mydata/mytable');
```

The infer-schema command creates a JSON schema file (<file>.#schema</file>) in the table directory.
You can find more information about this file in the {{< xref f="data-layer/reference/nosql-table-schema.md" >}}, although note that you don't typically need to edit this file.

<!-- //////////////////////////////////////// -->
## Partitioned Tables {#partitioned-tables}
{{< comment >}}<!-- [c-nosql-partitioned-tables-presto] [IntInfo] (sharonl)
  (20.11.18) See the internal information and references in DOC IG-9709 +
  [c-nosql-partitioned-tables] in the data-layer/nosql/_index.md page.
  (16.6.19) I renamed all "Table Partitioning" doc sections in the recently
  released v2.2.0 doc to "Partitioned Tables", changed the anchor from
  #table-partitioning to #partitioned-tables, and renamed the internal-comment
  marks accordingly. -->
{{< /comment >}}

{{< text-nosql-table-partitioning >}}See also the {{< xref f="data-layer/nosql/" a="partitioned-tables" text="Partitioned Tables" >}} overview in the {{< xref f="data-layer/nosql/" t="title" >}} documentation, including {{< xref f="data-layer/nosql/" a="table-partitioning-best-practices" text="best practices" >}}.{{< /text-nosql-table-partitioning >}}
{{< comment >}}<!-- [ci-extra-space-around-shcd-output-or-content] See info in
  the text-nosql-table-partitioning.html shortcode. -->
{{< /comment >}}

The {{< getvar v="presto.product_connector.full" >}} supports querying of partitioned NoSQL tables:
a partitioned table is queried like any other table, with the table path set to the root table directory and not to a specific partition directory.
When processing queries, the {{< product lc >}} searches the root table directory that is specified in the read command for nested directories of the format <path>&lt;attribute&gt;=&lt;value&gt;</path>.
If it finds such directories, it searches only the partition directories that match the query.
For example, for a "mytable" table in a "mycontainer" data container that's partitioned by <attr>year</attr> and <attr>month</attr> attributes, a `SELECT * FROM v3io.mycontainer.mytable WHERE month = 12;` query will return only the items from the <dirname>month=12</dirname> partition directories in all <dirname>year=*</dirname> directories.

<!-- //////////////////////////////////////// -->
## Read Optimization {#read-optimization}

The {{< getvar v="presto.product_connector.full" >}} supports the following optimized table queries (reads), which are more efficient compared to the standard full table scan:

- [Faster item-specific queries](#faster-item-specific-queries)
- [Range Scans](#range-scans)

For more information about these query types, see NoSQL {{< xref f="data-layer/nosql/" a="read-optimization" text="read optimization" >}}.

<!-- ---------------------------------------- -->
### Faster Item-Specific Queries {#faster-item-specific-queries}

The fastest Presto NoSQL table queries are those that uniquely identify a specific item by its primary-key value.
See NoSQL {{< xref f="data-layer/nosql/" a="faster-item-specific-queries" text="faster item-specific queries " >}}.

{{< note id="item-specific-query-operators"
         title="Item-Specific Query Operators" >}}
The {{< getvar v="presto.product_connector.full" >}} executes this faster processing for queries that apply the equal-to (`=`) or IN (`IN`) operator to the sharding-key attribute and optionally also apply one of these operators the sorting-key attribute (in the case of a compound primary key).
{{< comment >}}<!-- [presto-faster-item-specific-queries-operators] [IntInfo]
  (sharonl) See info in DOC IG-9215. -->
{{< /comment >}}
{{< /note >}}

<!-- ======================================== -->
#### Faster Item-Specific Query Examples {#faster-item-specific-query-examples}

The following commands all identify a specific item by its primary-key value and will be processed more quickly than table-scan processing; (it is assumed that [`v3io`](#v3io-catalog) is configured as the default catalog):

- Retrieve an item with the simple primary-key value "345":
    ```sh
    SELECT * FROM mycontainer.mytable" WHERE id = 345;
    ```

- Retrieve an item with the compound primary-key value "myfile.txt":
    ```sh
    SELECT * FROM mycontainer.mytable" WHERE basename = 'myfile' and suffix = 'txt';
    ```

<!-- ---------------------------------------- -->
### Range Scans {#range-scans}

A Presto NoSQL table query that uses supported sharding-key and optional sorting-key filters to retrieve items with the same sharding-key value, is processed by performing a range scan, which is more efficient than the standard full table scan.
See NoSQL {{< xref f="data-layer/nosql/" a="range-scans" text="range scans" >}}.
{{< comment >}}<!-- [c-range-scan-n-even-distribution-spark-df-presto-infer-schema]
  [InfInfo] (sharonl) (8.1.19) See the info in the nosql-table-schema.md
  reference. I decided not to mention the need for an inferred schema here,
  because we already document a general requirement for an inferred schema for
  using the platform's v3io NoSQL Presto connection. -->
{{< /comment >}}

{{< note id="range-scan-operators" title="Range-Scan Operators" >}}
The {{< getvar v="presto.product_connector.full" >}} uses range scan for compound primary-key table queries that apply the equal-to (`=`) or IN (`IN`) operator to the sharding-key attribute, and optionally also apply a comparison operator (`=`/`>`/`>=`/`<`/`<=` / `BETWEEN`) to the sorting-key attribute.
{{< comment >}}<!-- [c-big-data-range-scan-operators] [IntInfo] (sharonl)
  See info in DOC IG-9215. -->
{{< /comment >}}
{{< /note >}}

{{< comment >}}<!-- [IntInfo] See also [c-range-scan-n-even-distribution-spark-df-presto-infer-schema] in the nosql-table-schema.md reference. -->
{{< /comment >}}

<!-- ======================================== -->
#### Range-Scan Query Examples {#range-scan-query-examples}

The following commands query a "rides" table in a <dirname>mytaxis</dirname> table in a "mycontainer" data container.
The table is assumed to have compound `<sharding key>.<sorting key>` primary key, a <attr>driver_id</attr> sharding-key attribute, a <attr>date</attr> sorting-key attribute, and a compatible schema &mdash; which enable performing range-scan queries that use a sharding-key and optionally also a sorting-key filter.
You can find sample Spark DataFrame code for creating a compatible range-scan table in the {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="range-scan-example-basic" text="NoSQL Spark DataFrame reference" >}}.
The following commands and outputs are compatible with this sample table; (it is assumed that [`v3io`](#v3io-catalog) is configured as the default catalog):

- Retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `1` (regardless of the sorting-key value):

    ```sh
    SELECT * FROM mycontainer."/mytaxis/rides/" WHERE driver_id = 1;
    ```

    Output
    {{< highlight bash >}}
   date   |    avg_ride_km     | avg_ride_passengers | driver_id | total_km | num_rides | total_passengers
----------+--------------------+---------------------+-----------+----------+-----------+------------------
 20180601 |                5.0 |                 1.6 |         1 |    125.0 |        25 |               40
 20180602 |                5.3 |                 2.3 |         1 |    106.0 |        20 |               46
 20180701 | 3.8000000000000003 |                 1.5 |         1 |    106.4 |        28 |               42
(3 rows)
    {{< /highlight >}}

- Retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `24` and a <attr>date</attr> sorting-key attribute value within the first six months of 2018:

    ```sh
    SELECT * FROM mycontainer."/mytaxis/rides/" WHERE driver_id = 24 AND date >= '20180101' AND date < '20180701';
    ```
 
    Output
    {{< highlight bash >}}
   date   | avg_ride_km | avg_ride_passengers | driver_id | total_km | num_rides | total_passengers
----------+-------------+---------------------+-----------+----------+-----------+------------------
 20180602 |        52.0 |                 2.2 |        24 |    260.0 |         5 |               11
 20180601 |        41.5 |                2.25 |        24 |    332.0 |         8 |               18
(2 rows)
    {{< /highlight >}}

- Retrieve all items with a <attr>driver_id</attr> sharding-key attribute value of `1`, `16`, or `24` (regardless of the sorting-key value) and an <attr>avg_ride_passengers</attr> attribute value that is greater or equal to 3:

    ```sh
    SELECT * FROM mycontainer."/mytaxis/rides/" WHERE driver_id IN (1, 16, 24) AND avg_ride_passengers >= 3;
    ```
 
    Output
    {{< highlight bash >}}
     date   |    avg_ride_km     | avg_ride_passengers | driver_id | total_km | num_rides | total_passengers
  ----------+--------------------+---------------------+-----------+----------+-----------+------------------
   20180701 | 32.199999999999996 |                 4.0 |        16 |    193.2 |         6 |               24
   20180601 |              224.2 |                 8.0 |        16 |    224.2 |         1 |                8
   20180602 |               24.4 |                 4.5 |        16 |    244.0 |        10 |               45
   20180701 | 50.300000000000004 |                 3.0 |        24 |    352.1 |         7 |               21
  (4 rows)
    {{< /highlight >}}

<!-- //////////////////////////////////////// -->
## v3io Query Examples {#v3io-query-examples} 

{{< note id="v3io-query-examples-notes" >}}
- The examples in this section assume that [`v3io`](#v3io-catalog) has been configured as the default catalog.
    If this isn't the case, add "`FROM v3io`" in <cmd>SHOW SCHEMAS</cmd> commands and "`v3io.`" at the start of the table paths (before the name of the data container) in <cmd>SHOW TABLES</cmd> and <cmd>SELECT</cmd> commands.
    For example, replace "`{{< getvar v="product.default_container.name" >}}.mytable`" with "`v3io.{{< getvar v="product.default_container.name" >}}.mytable`"; see [Table Paths](#table-paths) for details.
- See also the separate [range-scan query examples](#range-scan-query-examples).
{{< /note >}}

The following command lists all the data containers (schemas) in the parent {{< product lc >}} tenant whose names end in "data":
```sh
SHOW SCHEMAS LIKE '%data';
```

The following command lists all the tables in the root directory of the "{{< getvar v="product.default_container.name" >}}" data container.
([Remember](#show-tables-notes) that the <cmd>SHOW TABLES</cmd> command only identifies tables in the container's root directory.)
```sh
SHOW TABLES IN {{% getvar v="product.default_container.name" %}};
```

The following command shows the contents of a "mytable" table in the "{{< getvar v="product.default_container.name" >}}" data container:
```sh
SELECT * FROM {{% getvar v="product.default_container.name" %}}.mytable;
```

The following command shows the contents of a nested "tests/nosql/table1" table in the "{{< getvar v="product.default_container.name" >}}" container; (see the [file-path syntax](#table-path-file-path-syntax)):
```sh
SELECT * FROM {{% getvar v="product.default_container.name" %}}."/tests/nosql/table1";
```

If you configured the default Presto [schema](#option-schema) when starting the CLI to "{{< getvar v="product.default_container.name" >}}", you can optionally run the commands from the previous examples without explicitly specifying the name of the data container:
```sh
SHOW TABLES;
SELECT * FROM mytable;
SELECT * FROM "/tests/nosql/table1";
```

<!-- ---------------------------------------- -->
### v3io Query Examples Using Views {#v3io-query-examples-using-views}

The following commands demonstrate how to create and use a query view for a NoSQL table.
Note that because the view is saved to the `default` Hive schema, before you create the view you need to ensure that Hive is enabled for the {{< product lc >}}'s Presto service:
{{< comment >}}<!-- [IntInfo] (sharonl) (10.6.19) The inferred schema for
  the sample table identifies all columns - including numeric columns such as
  "numberoftrades" (("MaxPrice") - as strings. -->
{{< /comment >}}
{{< note id="sample-nosql-table-jupyter-tutorial-gen-note" >}}
You can generate a compatible table by running the first steps of the getting-started example in the [<file>{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}) tutorial notebook.
Just remember to replace `{{< getvar v="product.running_user.example" >}}` in the following commands with your {{< product lc >}} username.
{{< /note >}}

1. Create an `{{< getvar v="product.running_user.example" >}}_{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_nosql_table_gs_example" >}}_etc_view` view of a `SELECT` query for all items with the <attr>securitytype</attr> attribute value `"ETC"` in a <path>{{< getvar v="product.users_container.name" >}}/{{< getvar v="product.running_user.envar_value" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_dir" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_nosql_table_gs_example" >}}</path> table for user "{{< getvar v="product.running_user.example" >}}":

    ```sh
    CREATE VIEW hive.default.iguazio_{{% verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_nosql_table_gs_example" %}}_etc_view AS SELECT * FROM {{% getvar v="product.users_container.name" %}}."/{{% getvar v="product.running_user.example" %}}/examples/{{% verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_nosql_table_gs_example" %}}" WHERE securitytype = 'ETC';
    ```
2. Show the view's SQL statement:

    ```sh
    SHOW CREATE VIEW hive.default.{{% getvar v="product.running_user.example" %}}_{{% verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_nosql_table_gs_example" %}}_etc_view;
    ```
3. Use the view to return all items in the table:

    ```sh
    SELECT * FROM hive.default.{{% getvar v="product.running_user.example" %}}_{{% verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_nosql_table_gs_example" %}}_etc_view;
    ```
    You can also optionally apply an additional filter to the view query.
    For example, the following query returns all items with the <attr>securitytype</attr> attribute value `"ETC"` (view query) and a <attr>numberoftrades</attr> attribute value that's greater than `1`:

    ```sh
    SELECT * FROM hive.default.{{% getvar v="product.running_user.example" %}}_{{% verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_nosql_table_gs_example" %}}_etc_view WHERE numberoftrades > 1;
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/presto/overview.md" >}}
- {{< xref s="data-layer/nosql/" >}}
- {{< xref f="data-layer/reference/nosql-table-schema.md" >}}

