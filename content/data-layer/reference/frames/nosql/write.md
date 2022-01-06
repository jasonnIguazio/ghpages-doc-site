---
title: "write Method"
keywords: "write method, frames nosql write method, frames kv write method, frames write, frames nosql write, frames kv write, frames client write, frames client nosql write, frames client kv write, frames write reference, frames nosql write reference, frames kv write reference, nosql ingestion, conditional write, pandas DataFrames, DataFrames index columns, data ingestion, backend, condition, dfs, index_cols, max_rows_in_msg, table"
menu:
  main:
    parent:     "frames-apis-nosql"
    identifier: "frames-apis-nosql-write"
    weight:     20
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Writes (ingests) data from pandas DataFrames to a NoSQL table.

{{< note id="write-creates-the-table-note" >}}
- NoSQL tables in the {{< product lc >}} don't need to be created prior to ingestion.
    When writing (ingesting) data into a table that doesn't exist, the table and all directories in the specified path are automatically created.
- When updating a table item (i.e., when writing an item with the same {{< xref f="data-layer/reference/frames/nosql/overview.md" a="item-name-n-primary-key" text="primary-key attribute" >}} value as an existing table item), the existing item is overwritten and replaced with the written item.
- All items that are written to a given table must conform to the same schema.
    For more information, see the {{< xref f="data-layer/reference/frames/nosql/overview.md" a="table-schema" text="Table Schema" >}} overview.
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
write(backend, table, dfs, [condition="", max_rows_in_msg=0, index_cols=None])
```
{{< comment >}}<!-- [c-no-update-expression-support] [IntInfo] (sharonl)
  (26.11.19) The "expression" parameter isn't supported in the current release:
-->
```python
write(backend, table, dfs, [expression="", condition="", max_rows_in_msg=0, index_cols=None])
```
{{< /comment >}}

{{< frames-syntax-undoc-params-note backend_name="NoSQL" param="dfs" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>condition</paramname>](#param-condition) |
[<paramname>dfs</paramname>](#param-dfs) |
[<paramname>index_cols</paramname>](#param-index_cols) |
[<paramname>max_rows_in_msg</paramname>](#param-max_rows_in_msg) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="nosql" backend_name="NoSQL" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="nosql" backend_name="NoSQL" >}}
  {{< /frames-param-collection >}}

  <!-- dfs -->
  {{< param-doc name="dfs" id="param-dfs" >}}One or more DataFrames containing the data to write.
  {{< note id="param-dfs-notes" >}}
- <a id="index-col-note"></a>The written DataFrames must include a single index column whose value is the value of the item's primary-key attribute (name); see {{< xref f="data-layer/reference/frames/nosql/overview.md" a="item-name-n-primary-key" text="Item Name and Primary Key" >}}.
    You can either include the index column as part of the DataFrame definition (as typically done with pandas DataFrames) or by using the [<paramname>index_cols</paramname>](#param-index_cols) parameter of the <func>write</func> method, which overrides any index-column definitions in the DataFrame.
    If you don't define an index column using either of these methods, {{< getvar v="product.frames.name.lc" >}} assigns the name <attr>{{< verkey k="frames.range_idx_col_name" >}}</attr> to the auto-generated pandas range-index column ([<api>pandas.RangeIndex</api>]({{< url v="pandas_ref" k="full" >}}api/pandas.RangeIndex.html)) and uses it as the item's primary-key attribute.
    You should therefore refrain from using the name <attr>{{< verkey k="frames.range_idx_col_name" >}}</attr> for non-index columns (regular user attributes) in NoSQL items.
- <a id="max-df-size-note"></a>See the maximum write DataFrame size {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="frames-max-write-df-size" text="restriction" >}}.
    If you need to write a larger amount of data, use multiple DataFrames.
  {{< /note >}}

  {{< param-type >}}A single DataFrame, a list of DataFrames, or a DataFrames iterator{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- index_cols -->
  {{< param-doc name="index_cols" id="param-index_cols" >}}
  A list of column (attribute) names to be used as index columns for the write operation, for all ingested DataFrames (as set in the [<paramname>dfs</paramname>](#param-dfs) parameter) regardless of any index-column definitions in the DataFrames.
  By default, the DataFrames' index columns are used.
  The NoSQL backend supports a single mandatory index column, which represents the item's primary-key attribute.
  See details in the [index-column note](#index-col-note) for the [<paramname>dfs</paramname>](#param-dfs) parameter.

  {{< param-type >}}`[]str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`None`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- condition -->
  {{< param-doc name="condition" id="param-condition" >}}
  A Boolean condition expression that defines a conditional logic for executing the write operation.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" >}} for syntax details and examples.
  The condition is applied to each written DataFrame row (item).

  To reference an item attribute in the target table from within the expression, use the attribute name &mdash; `<attribute name>`; for example, `"is_init==true"` references an <attr>is_init</attr> attribute in the table.
  <br/>
  To reference an attribute (column) in the written DataFrame, embed the attribute name within curly braces &mdash; <nobr>`{<column name>}`</nobr>; for example, `"{age}>18"` references an <attr>age</attr> attribute in the DataFrame.
  <br/>
  For example, an `"{is_stable} == true AND "{version} > version)"` condition indicates that each DataFrame item (row) should be written to the table only if it has an <attr>is_stable</attr> attribute whose value is `true` and the target table has a matching item (with the same [primary-key attribute](#index-col-note) value) whose current <attr>version</attr> attribute value is lower than the value of the <attr>version</attr> attribute (column) in the DataFrame.
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`None`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- max_rows_in_msg -->
  {{% include f="frames-write-param-max-rows-in-msg.md" %}}
  {{< comment >}}<!-- [ci-include-w-param-xxx] -->
  {{< /comment >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>write</func> method of the {{< getvar v="product.frames.name.lc" >}} NoSQL backend:

1. <a id="example-basic-df-index-column"></a>Write a single DataFrame with several rows (items) to a <path>mytable</path> table in the client's data container ([<paramname>table</paramname>](#param-table)).
    Use the pandas <func>set_index</func> fuction to define <attr>username</attr> as the DataFrame's index column, which identifies the table's primary-key attribute.
    ```python
    table = "mytable"
    data = [
            ["lisaa", "Lisa", "Andrews", 11, "US", "DC"],
            ["toms", "Tom", "Stein", 10, "Israel", "TLV"],
            ["nickw", "Nickolas", "Weber", 15, "Germany", "Berlin"],
            ["georgec", "George", "Costas", 13, "Greece", "Athens"],
            ["christ", "Chris", "Thompson", 10, "UK", "London"],
            ["julyj", "July", "Johnes", 14, "US", "NY"]
    ]
    attrs = ["username", "first_name", "last_name", "age", "country", "city"]
    df = pd.DataFrame(data, columns=attrs)
    df.set_index("username", inplace=True)
    client.write(backend="nosql", table=table, dfs=df)
    ```

2. <a id="example-condition-index_cols-df-iter"></a>Write a DataFrames iterator to a <path>my_tables/students_11-15</path> table in the client's data container ([<paramname>table</paramname>](#param-table)).
    Use the <func>read</func> method's [<paramname>index_cols</paramname>](#param-index_cols) parameter to set the index column (primary-key attribute) for all of the iterator DataFrames to the <attr>username</attr> attribute.
    Use a similar data set to that used in [Example 1](#example-basic-df-index-column), but write only the DataFrames rows (items) for which the value of the <attr>age</attr> column (attribute) is larger or equal to 11 and smaller than 15 ([<paramname>condition</paramname>](#param-condition)).
    ```python
    table = "/my_tables/students_11-15"
    attrs = ["username", "first_name", "last_name", "age", "country", "city"]
    dfs = [
               pd.DataFrame([["lisaa", "Lisa", "Andrews", 11, "US", "DC"]],
                            columns=attrs),
               pd.DataFrame([["toms", "Tom", "Stein", 10, "Israel", "TLV"]],
                            columns=attrs),
               pd.DataFrame([["nickw", "Nickolas", "Weber", 15, "Germany", "Berlin"]],
                            columns=attrs),
               pd.DataFrame([["georgec", "George", "Costas", 13, "Greece", "Athens"]],
                            columns=attrs),
               pd.DataFrame([["christ", "Chris", "Thompson", 10, "UK", "London"]],
                            columns=attrs),
               pd.DataFrame([["julyj", "July", "Johnes", 14, "US", "NY"]],
                            columns=attrs)
    ]
    client.write("nosql", table=table, dfs=dfs,
                     condition="{age}>=11 AND {age}<15", index_cols=["username"])
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/nosql/" a="creating-tables" text="Creating NoSQL Tables" >}}
- {{< xref f="data-layer/reference/frames/nosql/overview.md" >}}
    - {{< xref f="data-layer/reference/frames/nosql/overview.md" a="item-name-n-primary-key" text="Item Name and Primary Key" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

