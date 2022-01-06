---
title:      "Introduciton to Using Presto in the Platform"
linktitle:  "Presto Overview"
description: "Learn how to use Presto and the Presto CLI to run SQL queries in the Iguazio MLOps Platform."
keywords: "presto overview, presto, reference, presto cli, presto web ui, presto web interface, Iguazio Presto connector, sql queries, sql hive metastore, hive, parquet tables, parquet files, parquet, orc files, orc, data paths, table paths, range scan, nosql"
menu:
  main:
    name:       "Overview"
    parent:     "presto"
    identifier: "presto-overview"
    weight:     10
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title should
  use {{< product tc >}}. -->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces presto/overview.md. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

You can use the {{< url g="presto" v="home" k="text" link="1" >}} open-source distributed SQL query engine to run interactive SQL queries and perform high-performance low-latency interactive analytics on data that is stored in the {{< product lc >}}.
Running Presto over the {{< product lc >}}'s data services enables you to filter data as close as possible to the source.
The {{< product lc >}}'s {{< getvar v="presto.product_connector.full" >}} defines a custom data source that enables you to use Presto to query data in the {{< product lc >}}'s NoSQL store &mdash; including support for table partitioning, predicate pushdown, column pruning, and performing optimized item-specific and range-scan queries.
You can also use Presto's built-in Hive connector to query data of the supported file types, such as Parquet or ORC, that is stored in {{< product lc >}} data containers; see [Using the Hive Connector](#hive-connector).
In addition, it's possible to add an {{< url g="presto" v="doc" k="oracle_connector" k2="text_short" link="1" >}} to Presto {{< techpreview mark="1" >}}; for more information, contact {{< company >}}'s {{< email id="support" link="1" text="support team" >}}.

The default v{{< productVersion num >}} {{< product lc >}} installation includes the following Presto version {{< verkey k="presto.version" >}} components:

- **The Presto [command-line interface]({{< getvar v="presto.doc.cli.full" >}}) (CLI)** for running queries.
    The web-based shell service and the terminals of the Jupyter Notebook {{< product lc >}} service are automatically connected to the predefined Presto service and include both the native Presto CLI (<file>{{< verkey k="presto.cli" >}}</file>) and a <cmd-b>{{< verkey k="presto.cli_v3io_wrapper" >}}</cmd-b> wrapper to simplify working with the {{< getvar v="presto.product_connector.full" >}}.
    For more information, see {{< xref f="data-layer/presto/presto-cli.md" >}}.
- **The Presto server**.
    The server address is the API URL of the Presto service (`{{< verkey k="presto.service_display_name" >}}`), which you can copy from the {{< productUI lc >}} <gui-title>Services</gui-title> page.
- **The Presto [web UI]({{< getvar v="presto.doc.web_ifc.full" >}})** for monitoring and managing queries.
    This interface can be accessed by using the HTTP or HTTPS UI URLs of the Presto service, which are available from the {{< productUI lc >}} <gui-title>Services</gui-title> page.

<!-- //////////////////////////////////////// -->
## Table Paths {#table-paths}

For information about setting table paths when using the {{< getvar v="presto.product_connector.full" >}}, see {{< xref f="data-layer/presto/presto-cli.md" a="table-paths" text="Table Paths" >}} in the Presto CLI reference.
For information about setting table paths when using the Hive connector, see [Using the Hive Connector](#hive-connector).

<!-- //////////////////////////////////////// -->
## Using the Hive Connector {#hive-connector}

You can use Presto's built-in {{< url g="presto" v="doc" k="hive_connector" k2="text_short" link="1" >}} to query data of the supported file types, such as Parquet or ORC, that is stored in {{< product lc >}} data containers, or to save table-query views to the default Hive schema (`hive.default`).
{{< comment >}}<!-- [IntInfo] (sharonl) The Presto Hive connector doc uses the
  "file type" terminology. See [c-presto-hive-connector-sup-file-types] in
  data/vars/presto.toml for more info and the full list of supported file types.
-->
{{< /comment >}}

{{< note id="running-the-hive-cli-note" title="Running the Hive CLI" >}}
You can start the Hive CLI in the {{< product lc >}} by running the <cmd>hive</cmd> command from a web shell or Jupyter terminal.
{{< /note >}}

<!-- ---------------------------------------- -->
### Enabling Hive {#hive-enable}

To use the Presto Hive connector, you first need to create a Hive Metastore by enabling Hive for the {{< product lc >}}'s Presto service:
{{< comment >}}<!-- [c-presto-hive-connector-sup-file-types] -->
{{< /comment >}}

1. On the <gui-title>Services</gui-title> {{< productUI lc >}} page, select to edit the Presto service and navigate to the <gui-title>Custom Parameters</gui-title> tab.
2. Check the <gui-label>Enable Hive</gui-label> check box and provide the required configuration parameters:

    - <gui-label>Username</gui-label> &mdash; the name of a {{< product lc >}} user for creating and accessing the Hive Metastore.
    - <gui-label>Container</gui-label> &mdash; The name of the data container that contains the Hive Metastore.
    - <gui-label>Hive Metastore path</gui-label> &mdash; The relative path to the Hive Metastore within the configured container.
        If the path doesn't exist, it will be created by the {{< product lc >}}.
        
    Select <gui-label>Save Service</gui-label> to save your changes.
3. Select <gui-label>Apply Changes</gui-label> from the top action toolbar of the <gui-title>Services</gui-title> page to deploy your changes.

{{< note id="hive-notes" >}}
- <a id="hive-metastore-db-no-auto-delete"></a>If you later select to disable Hive or change the Hive Metastore path, the previously configured Hive Metastore won't be deleted automatically.
      You can delete it like any other directory in the {{< product lc >}}'s distributed file system, by running a file-system command (such as <cmd>rm -rf</cmd>) from a command-line interface (a web shell or a Jupyter notebook or terminal).
      {{< comment >}}<!-- [IntInfo] (sharonl) See DOC IG-9650. -->
      {{< /comment >}}
- <a id="hive-username-cant-change-for-existing-db"></a>You cannot change the Hive user of the Presto service for an existing Hive Metastore.
    To change the user, you need to either also change the metastore path so as not to point to an existing metastore; or first delete the existing metastore &mdash; disable Hive for Presto, apply your changes, delete the current Hive Metastore directory (using a file-system command), and then re-enable Hive for Presto and configure the same metastore path with a new user.
    {{< comment >}}<!-- [ci-presto-hive-username-cant-change-for-existing-db]
      [IntInfo] (sharonl) (5.7.20) See Bug IG-11757 and the related RNs known
      #ki-presto-hive-username-cant-be-changed-for-existing-db issue (since the
      v2.2.0 release notes). In consultation with Dina and Orit, I've now also
      documented the restriction here (added retroactively to the active doc
      sites - v2.8.0 and v2.5.4). -->
    {{< /comment >}}
{{< /note >}}

<!-- ---------------------------------------- -->
### Creating External Tables {#hive-external-tables}

To use the Hive connector to query data in a {{< product lc >}} data container, you first need to use the Hive CLI to run a <cmd>CREATE EXTERNAL TABLE</cmd> statement that creates an external table.
The statement should map the relevant data path to a unique table name, and define the names and data types of the table's columns (attributes); the data path in the statement should be specified as a fully qualified `v3io` path of the format `v3io://<container name>/<relative data path>`:

```sh
CREATE EXTERNAL TABLE <table name> (<column name> <column type>[, <column name> <column type>, ...]) stored as <file type> LOCATION '<data path>';
```

For example, the following command creates an external Hive table that links to a "prqt1" Parquet file in a "mycontainer" container with a string <attr>col1</attr> column and a big-integer <attr>col2</attr> column:
```sh
CREATE EXTERNAL TABLE prqt1 (col1 string, col2 bigint) stored as parquet LOCATION 'v3io://mycontainer/prqt1';
```

You can then reference this table by its name from Presto queries that use the `hive` catalog.
For example:
```sh
SELECT * FROM hive.mycontainer.prqt1;
```

<!-- ---------------------------------------- -->
### Defining Table Partitions {#hive-table-partitions}
{{< comment >}}<!-- [IntInfo] (sharonl) (16.6.19) This information was added in
  the v2.2.0 doc based on info received from Golan - see DOC IG-9650. I found
  this related Hive documentation: "Language Manual" > "LanguageManual DDL" -
  "Alter Table/Partition/Column" > "Alter Partition"
  (https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL > 
  https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-AlterTable/Partition/Column >
  https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-AlterPartition)
  - "Add Partitions" (https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-AddPartitions)
  "Recover Partitions (MSCK REPAIR TABLE)"
  https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-RecoverPartitions(MSCKREPAIRTABLE))
  See also the internal info for the #partitioned-table section in the
  presto-cli.md reference page. [c-nosql-partitioned-tables-presto]
-->
{{< /comment >}}

The Hive connector can also be used to query partitioned tables (see {{< xref f="data-layer/presto/presto-cli.md" a="partitioned-tables" text="Partitioned Tables" >}} in the Presto CLI reference), but it doesn't automatically identify table partitions.
Therefore, you first need to use the Hive CLI to define the table partitions after [creating an external table](#hive-external-tables).
You can do this by using either of the following methods

- Use the [<cmd>MSCK REPAIR TABLE</cmd>]({{< url v="hive_wiki" k="full" >}}/LanguageManual+DDL#LanguageManualDDL-RecoverPartitions(MSCKREPAIRTABLE)) statement to automatically identify the table partitions and update the table metadata in the Hive Metastore:

    ```
    MSCK REPAIR TABLE <table name>;
    ```

    For example, the following command updates the partition metadata for an external "prqt1" table:
    ```
    MSCK REPAIR TABLE prqt1;
    ```

    This is the simplest method, but it only identifies partition directories whose names are of the format <dirname>&lt;column name&gt;=&lt;column value&gt;</dirname>.

- Use the [<cmd>ALTER TABLE ADD PARTITION</cmd>]({{< url v="hive_wiki" k="full" >}}/LanguageManual+DDL#LanguageManualDDL-AddPartitions) statement to manually define partitions &mdash; where `<partition spec>` is of the format `<partition column> = <partition value>[, <partition column> = <partition value>, ...]`, and `<partition path>` is a fully qualified `v3io` path of the format `v3io://<container name>/<relative table-partition path>`:

    ```
    ALTER TABLE <table name> ADD [IF NOT EXISTS] PARTITION (<partition spec>) LOCATION '<partition path>'[, PARTITION <partition spec> LOCATION '<partition path>'];
    ```

    For example, the following command defines a partition named "year" whose value is "2019", which maps to a partition directory named <dirname>year=2019</dirname> in a "prqt1" table in a "mycontainer" container:
    ```
    ALTER TABLE prqt1 ADD PARTITION (year=2019) LOCATION 'v3io://mycontainer/prqt1/year=2019';
    ```
    {{< comment >}}<!-- The directory name in the example conforms to the
      `<column name>=<column value>` convention, so it's possible to just use
      the MSCK REPAIR TABLE statement to identify the partition and update the
      Hive Metastore. -->
    {{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/presto/presto-cli.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="presto" text="Presto and Hive software specifications and restrictions" >}}

