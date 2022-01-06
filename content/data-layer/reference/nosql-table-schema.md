---
title: "NoSQL Table Schema Reference"
keywords: "table schema, schema, infer schema, inferSchema, data types, reference, attributes, nosql, boolean, blob, number, string, integer, floating point, spark, presto, v3io, v3io GitHub, iguazio_api_examples"
menu:
  main:
    name:       "NoSQL Table Schema"
    parent:     "data-layer-references"
    identifier: "nosql-table-schema-reference"
    Post:       "The platform's custom table schema for working with NoSQL data using Frames, Spark, and Presto"
    weight:     800
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The Post param
  use {{< product lc >}}. -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) We decided not to document the option
  of manually creating a .#schema file in the same directory as the table,
  which is what the platform does for the supported methods. See additional
  information in DOC Task IG-3948. -->
{{< /comment >}}
{{< comment >}}<!-- [TODO-v3io-py-SDK] [IntInfo] (sharonl)[DOC IG-15596] TODO:
  Check whether the v3io-py SDK uses the NoSQL table schema and if so, edit
  the content and the front matter (keywords and Post params) accordingly. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

To support reading and writing NoSQL data using structured-data interfaces &mdash; such as {{< xref f="data-layer/reference/spark-apis/spark-datasets/overview.md" text="Spark DataFrames" >}}, {{< xref f="data-layer/presto/" text="Presto" >}}, and {{< xref f="data-layer/reference/frames/" textvar="product.frames.name.long_lc" >}} ("{{< getvar v="product.frames.name.lc" >}}") &mdash; the {{< product lc >}} uses a schema file that defines the schema of the data structure.
When writing NoSQL data in the {{< product lc >}} using a Spark or {{< getvar v="product.frames.name.lc" >}} DataFrame, the schema of the data table is automatically identified and saved and then retrieved when using a structure-data interface to read data from the same table (unless you explicitly define the schema for the read operation).
However, to use a structure-data interface to read NoSQL data that was not written in this manner, you first need to define the table schema.
The schema is stored as a JSON file (<file>.#schema</file>).
You don't typically need to manually create or edit this file.
{{< comment >}}<!-- [IntInfo] (sharonl)
- [IntInfo] Our schema inference (at least in Spark) reads only the first row,
  so manual definitions or editing might be required. (30.12.18) Bug IG-10229
  was opened to infer the schema based on more than one row. (16.7.19) The bug
  is currently planned for v2.5.0. (24.12.18) Golan asked not to explicitly
  mention the option of creating the schema file manually. See also the
- [c-range-scan-n-even-distribution-spark-df-presto-infer-schema] - see info
  below.
-->
{{< /comment >}}
Instead, use any of the supported methods to define or update the schema of a NoSQL table:

- <a id="infer-schema-spark"></a>Spark &mdash; do one of the following as part of a NoSQL Spark DataFrame read operation.
    For more information, see {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="defining-the-table-schema" text="Defining the Table Schema" >}} in the Spark NoSQL DataFrame reference:

    - Use the custom <opt>inferSchema</opt> option to infer the schema (recommended).
    - Define the schema programmatically.
        {{< note id="programmatic-schema-def-range-scan-n-even-distribution-note" >}}
Programmatically created table schemas don't support {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="range-scans" text="range-scan" >}} or {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="even-workload-distribution" text="even-distribution" >}} table queries.
{{< comment >}}<!-- [c-range-scan-n-even-distribution-spark-df-presto-infer-schema]
  [IntInfo] (sharonl) (7.1.19)) The user can also manually create the schema
  file or perhaps use a combination of programmatic schema definition read and
  then write & manual schema-file editing, but Golan asked not to refer to
  these options and simply document that support for range scans requires using
  our inferred schema. For Presto, we already documented the need for inferring
  the schema as a prerequisites to all scans (see below), therefore I didn't
  mention this explicitly in Presto specific documentation. -->
{{< /comment >}}
        {{< /note >}}

- <a id="infer-schema-presto"></a>Presto &mdash; use the custom <cmd>v3io.schema.infer</cmd> Presto CLI command to generate a schema file.
    For more information, see {{< xref f="data-layer/presto/presto-cli.md" a="nosql-table-schema" text="Defining the NoSQL Table Schema" >}} in the Presto reference.

- <a id="infer-schema-frames"></a>{{< getvar v="product.frames.name.lc" >}} &mdash; use the {{< xref f="data-layer/reference/frames/nosql/execute.md" text="execute" a="cmd-infer" text="<cmd>infer_schema</cmd> or <cmd>infer</cmd> command" >}} of the NoSQL backend's <func>{{< xref f="data-layer/reference/frames/nosql/execute.md" text="execute" >}}</func> client method to generate a schema file.

<!-- //////////////////////////////////////// -->
## The Item-Attributes Schema Object ('fields') {#schema-object-fields}

The NoSQL-table schema JSON file contains a <jsonkey>fields</jsonkey> array object with one or more objects that describe the table's attributes (columns).
The attribute object has three fields:

<dl>
  <!-- name -->
  {{< param-doc name="name" id="schema-fields-name" >}}
  The name of the attribute (column). For example, `"id"` or `"age"`.

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

  <!-- type -->
  {{< param-doc name="type" id="schema-fields-type" >}}
  The attribute's data type (i.e., the type of the data that is stored in the column).
  The type can be one of the following string values &mdash; `"boolean"`, `"double"`, `"long"`, `"null"`, `"string"`, or `"timestamp"`.
  The {{< product lc >}} implicitly converts integer and short values to long values (`"long"`) and floating-point values to double-precision values (`"double"`).

  {{< param-type >}}String in the schema file; [Spark SQL data type]({{< getvar v="spark.sql_n_ds_guide.full" >}}#data-types) when defining the schema programmatically using a Spark DataFrame{{< /param-type >}}

  {{< note id="table-schema-attr-type-note-spark-df-programmatic-schema-def" title="Spark DataFrame Programmatic Schema Definition Note" >}}
When {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="defining-the-table-schema-programmatically" text="defining the table shcema programmatically" >}} as part of a Spark DataFrame read operation, use the {{< xref f="data-layer/reference/spark-apis/spark-datasets/spark-df-data-types.md" text="Spark SQL data types" >}} that match the supported schema-file attribute types (such as <api>StringType</api> for `"string"` or <api>LongType</api> for `"long"`).
When writing the data to the NoSQL table, the {{< product lc >}} will translate the Spark data types into the relevant attribute data types and perform any necessary type conversions.
  {{< /note >}}
  {{< /param-doc >}}

  <!-- nullable -->
  {{< param-doc name="nullable" id="schema-fields-nullable" >}}
  Indicates whether the value is "nullable".
  If `true`, the attribute value can be null.

  {{< param-type >}}Boolean{{< /param-type >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
## The Item-Key Schema Objects ('key' and 'sortingKey') {#schema-object-key}

The NoSQL-table schema JSON file contains a <jsonkey>key</jsonkey> object that identifies the table's sharding-key attribute, and optionally also a <jsonkey>sortingKey</jsonkey> object that identifies the table's sorting-key attribute.
These attributes are used to determine an item's name and primary-key value, which uniquely identifies items in the table.
See {{< xref f="data-layer/objects/object-names-and-keys/" >}}.

<dl>
  <!-- key -->
  {{< param-doc name="key" id="schema-key" >}}
  The name of the table's sharding-key attribute, which together with the sorting-key attribute ([<jsonkey>sortingKey</jsonkey>](#schema-sortingKey)), if defined, determines the primary-key values of the table items.
  For example, `"id"`.

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

   <!-- sortingKey -->
  {{< param-doc name="sortingKey" id="schema-sortingKey" >}}
  The name of the table's sorting-key attribute, if defined, which together with the sharding-key attribute ([<jsonkey>key</jsonkey>](#schema-key)) determines the primary-key values of the table items.
  For example, `"date"`.

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}
</dl>

{{< note id="faster-primary-key-queries-note"
    title="Faster Primary-Key Queries" >}}
The schema's key objects enable supporting faster NoSQL table reads (queries).
See the {{< xref f="data-layer/presto/presto-cli.md" a="read-optimization" text="Presto read-optimization" >}} and the {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="range-scans" text="NoSQL Spark DataFrame range-scans" >}} reference documentation.
{{< comment >}}<!-- [IntInfo] (sharonl) (24.12.18) Spark DF standard
  primary-key queries aren't faster than regular queries. (31.5.20) And neither
  are Frames NoSQL primary-key queries (see DOC IG-13749). -->
<!-- [TECH-PREVIEW-FRAMES-NOSQL-RANGE-SCAN] DOC IG-13749. TODO: When we add a
  Frames range-scan doc section, add a link to it above. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< getvar v="product.frames.name.sc" >}} NoSQL-backend reference &mdash; {{< xref f="data-layer/reference/frames/nosql/overview.md" a="table-schema" text="Table Schema" >}}
- Presto reference &mdash; {{< xref f="data-layer/presto/presto-cli.md" a="nosql-table-schema" text="Defining the NoSQL Table Schema" >}}
- Spark NoSQL DataFrame reference &mdash; {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="defining-the-table-schema" text="Defining the Table Schema" >}}
- {{< xref f="data-layer/objects/object-names-and-keys/" >}}
- {{< xref f="data-layer/reference/frames/attribute-data-types.md" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/spark-df-data-types.md" >}}
- {{< xref f="data-layer/spark-data-ingestion-qs.md" >}} > {{< xref f="data-layer/spark-data-ingestion-qs.md" a="reading-nosql-data" text="Reading NoSQL Data" >}}

