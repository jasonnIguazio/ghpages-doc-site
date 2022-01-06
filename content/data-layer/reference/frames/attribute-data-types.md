---
title:      "Attribute Data Types"
linktitle:  "Frames Attribute Data Types"
keywords: "frames attribute data types, v3io frames, frames, data types, attribute data types, pandas data types, pandas dataframes, pandas, nosql, nosql table schema, table schema, schema types, boolean, bool, category, double, float, float16, float32, float64, float128, int, int8, int16, int32, int64, long, object, string"
menu:
  main:
    name:       "Attribute Data Types"
    parent:     "frames-apis"
    identifier: "frames-apis-attr-data-types"
    weight:     90
---
{{< comment >}}<!-- [c-frames-attr-types]
  [InfInfo] (sharonl) (3.12.19) Or Z. explained that a pandas DataFrame is a
  NumpyArray with metadata, and therefore the pandas DF data types are the
  NumPy data types. He recommended that we also mention NumPy in the doc (and
  write "pandas (NumPy) Data Types" in the table header). See IG-11257 for the
  list of supported DF types for product v2.5. (Regarding `int` and `float`,
  mentioned in the ticket - the pandas & NumPy types doc doesn't mention this
  and Or showed me that `int` translates to `int64`, so it's probably a type of
  shorthand, therefore I decided to ignore these types in the doc.) See also
  the "PadSquad Error loading data from mysql" email thread from 12/19, copied
  in DOC IG-12272
  (https://jira.iguazeng.com/browse/IG-12272?focusedCommentId=56231&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-56231).
  [TODO-V2.8.0] V2.8.0 is expected to support the same types + arrays (array
  `object`) - see Requirement IG-13388 / DOC IG-14008.
-->
{{< /comment >}}

{{< getvar v="product.frames.name.long_sc" >}} currently supports item attributes (DataFrame columns) of the following pandas DataFrame (NumPy) data types.
For a description of the DataFrame types, see the [pandas]({{< url v="pandas_ref" k="full" >}}api/pandas.DataFrame.dtypes.html) and [NumPy]({{< url v="numpy_docs" k="full" >}}user/basics.types.html) documentation.
For a general reference of the attribute data types that are supported in the {{< product lc >}}, see the {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}.

{{< note id="type-converstion-note" >}}
The {{< product lc >}} implicitly converts between pandas DataFrame column data types and [{{< product lc >}} table-schema]({{< xref f="data-layer/reference/nosql-table-schema.md" t="url" >}}) attribute data types, and converts integer and short values (`int<n>`) to long values (`int64` / `"long"`) and floating-point values (`float<n>`) to double-precision values (`float64` / `"double"`).
The **"Schema of Data Type"** column in the following table indicates the matching {{< product lc >}} attribute data type for each pandas data type.
{{< /note >}}

<table style="width:45%">
<tr text-align="left">
  <th style="vertical-align:'top'; font-weight:bold;">pandas (NumPy) Data Type
  </th>
  <th style="vertical-align:'top'; font-weight:bold;">Schema Data Type
  </th>
</tr>
<tr id="bool">
  {{< td >}}`bool | BooleanDType`{{< /td >}}
  {{< td >}}`"boolean"`{{< /td >}}
</tr>
<tr id="category">
  {{< td >}}`category`{{< /td >}}
  {{< td >}}`"string"`{{< /td >}}
<tr id="float">
  {{< td >}}`float16` | `float32` | `float64`{{< /td >}}
  {{< td >}}`"double"`{{< /td >}}
</tr>
<tr id="int | Integer32DType | Integer64DType">
  {{< td >}}`int8` | `int16` | `int32` | `int64`{{< /td >}}
  {{< td >}}`"long"`{{< /td >}}
</tr>
<tr id="string">
  {{< td >}}`object` (string) `| StringDtype`{{< /td >}}
  {{< td >}}`"string"`{{< /td >}}
</tr>
<tr id="datetime64">
  {{< td >}}`datetime64`{{< /td >}}
  {{< td >}}`"timestamp"`{{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/objects/attributes.md" >}}
- {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}
- {{< xref f="data-layer/reference/nosql-table-schema.md" >}}
- {{< xref f="data-layer/reference/frames/overview.md" >}}

