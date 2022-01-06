---
title: "Spark DataFrame Data Types"
keywords: "spark dataframe data types, spark data types, spark, spark datasets, spark dataframes, data types, BooleanType, DoubleType, FloatType, IntegerType, LongType, NullType, ShortType, StringType, type conersion, double, float, integer, long, sql, nosql, nosql table schema, table schema, schema types, attributes, attribute data types, TimestampType, timestamps"
menu:
  main:
    parent:     "spark-datasets-api"
    identifier: "spark-dataframes-data-types"
    weight: 900
---

The {{< product lc >}} currently supports the following Spark DataFrame data types.
For a description of the Spark types, see the [Spark SQL data types documentation]({{< getvar v="spark.sql_n_ds_guide.full" >}}#data-types)
For a general reference of the attribute data types that are supported in the {{< product lc >}}, see the {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}.

{{< note id="type-converstion-note" >}}
The {{< product lc >}} implicitly converts between Spark DataFrame column data types and [{{< product lc >}} table-schema]({{< xref f="data-layer/reference/nosql-table-schema.md" t="url" >}}) attribute data types, and converts integer (`IntegerType`) and short (`ShortType`) values to long values (`LongType` / `"long"`) and floating-point values  (`FloatType`) to double-precision values (`DoubleType` / `"double"`).
The **"Schema of Data Type"** column in the following table indicates the matching {{< product lc >}} attribute data type for each Spark data type.
{{< /note >}}

<table style="width:40%">
<tr text-align="left">
  <th style="vertical-align:'top'; font-weight:bold;">Spark Data Type</th>
  <th style="vertical-align:'top'; font-weight:bold;">Schema Data Type</th>
</tr>
<tr id="boolean">
  {{< td >}}`BooleanType`{{< /td >}}
  {{< td >}}`"boolean"`{{< /td >}}
</tr>
<tr id="double">
  {{< td >}}`DoubleType`{{< /td >}}
  {{< td >}}`"double"`{{< /td >}}
</tr>
<tr id="float">
  {{< td >}}`FloatType`{{< /td >}}
  {{< td >}}`"double"`{{< /td >}}
</tr>
<tr id="int">
  {{< td >}}`IntegerType`{{< /td >}}
  {{< td >}}`"long"`{{< /td >}}
</tr>
<tr id="long">
  {{< td >}}`LongType`{{< /td >}}
  {{< td >}}`"long"`{{< /td >}}
</tr>
<tr id="null">
  {{< td >}}`NullType`
  {{< /td >}}
  {{< td >}}`"null"`{{< /td >}}
</tr>
<tr id="short">
  {{< td >}}`ShortType`{{< /td >}}
  {{< td >}}`"long"`{{< /td >}}
</tr>
<tr id="string">
  {{< td >}}`StringType`{{< /td >}}
  {{< td >}}`"string"`{{< /td >}}
</tr>
<tr id="timestamp">
  {{< td >}}`TimestampType`{{< /td >}}
  {{< td >}}`"timestamp"`{{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/objects/attributes.md" >}}
- {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/overview.md" text="Spark Datasets Overview" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" >}}
- {{< xref f="data-layer/reference/nosql-table-schema.md" >}}

