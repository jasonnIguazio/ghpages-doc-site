---
title: "read Method"
keywords: "read method, frames nosql read method, frames kv read method, frames read, frames nosql read, frames kv read, frames client read, frames client nosql read, frames client kv read, frames read reference, frames nosql read reference, frames kv read reference, nosql ingestion, data ingestion, sharding keys, pandas DataFrames, DataFrames index columns, primary key attribute, item names, backend, columns, filter, kw, max_rows_in_msg, reset_index, sharding_keys, table"
menu:
  main:
    parent:     "frames-apis-nosql"
    identifier: "frames-apis-nosql-read"
    weight:     30
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}
{{< comment >}}<!-- [TECH-PREVIEW-FRAMES-NOSQL-RANGE-SCAN]
  [IntInfo] (sharonl) See details in DOC IG-13749.
  NOTE: Frames NoSQL doesn't support faster primary-key attribute queries; such
  queries are handled like regular queries (same as Spark DF).

  [V2.8.0-TODO]
  - Add a "Range Scan" section and edit the sharding_keys, sort_key_range_start,
    and sort_key_range_end params (kw args) to link to this section instead of
    the NoSQL DBs concepts range-scan doc. After adding this section, edit/add
    the following doc (some locations already marked with TODO comments):
    - Edit the xref to the Frames range-scan doc in the
    - data-layer/nosql/_index.md doc to link to the new range-scan section.
    - Add an xref to this section in the reference/nosql-table-schema.md doc.
    - Add a linked reference to range scans in the `read` section of the
      reference/frames/nosql/overview.md doc (similar to what we
      have for the NoSQL Web API overview doc, but restrict to range scans).
  - Add range-scan examples.
-->
{{< /comment >}}

Reads (consumes) item attributes from a NoSQL table into pandas DataFrames.

{{< note id="query-params-notes" >}}
By default, the method returns all user attributes (columns) of all the items (rows) in the specified NoSQL table.
You can optionally restrict the read query by setting the [<paramname>filter</paramname>](#param-filter) parameter to a filter expression that restricts which items to read and/or setting the [<paramname>columns</paramname>](#param-columns) parameter to a list of item attributes to return for the read items (as restricted by the <paramname>filter</paramname> expression, if set).
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
read(backend, table=''[, columns=None, filter='', max_rows_in_msg=0,
    iterator=False, **kw])
```

The following syntax statement replaces the <paramname>kw</paramname> parameter with the additional keyword arguments that can be passed for the NoSQL backend via this parameter:
```python
read(backend, table=''[, columns=None, filter='', max_rows_in_msg=0,
     iterator=False, reset_index, sharding_keys, sort_key_range_start,
     sort_key_range_end])
```

{{< frames-syntax-undoc-params-note backend_name="NoSQL" param="table" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>columns</paramname>](#param-columns) |
[<paramname>filter</paramname>](#param-filter) |
[<paramname>kw</paramname>](#param-kw) |
[<paramname>max_rows_in_msg</paramname>](#param-max_rows_in_msg) |
[<paramname>reset_index</paramname>](#param-reset_index) (<paramname>kw</paramname> argument) |
[<paramname>sharding_keys</paramname>](#param-sharding_keys) (<paramname>kw</paramname> argument) |
[<paramname>sort_key_range_start</paramname>](#param-sort_key_range_start) (<paramname>kw</paramname> argument) |
[<paramname>sort_key_range_end</paramname>](#param-sort_key_range_end) (<paramname>kw</paramname> argument) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="nosql" backend_name="NoSQL" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="nosql" backend_name="NoSQL" >}}
  {{< /frames-param-collection >}}

  <!-- iterator  -->
  {{< param-doc name="iterator" id="param-iterator" >}}
  Determines whether to return a pandas DataFrames iterator or a single DataFrame:
  `True` &mdash; return a DataFrames iterator; `False` (default) &mdash; return a single DataFrame.
  {{< comment >}}<!-- [ci-bullets-in-param-doc-desc] [InfraInfo] (sharonl) I
    didn't use a bulleted list because the bullets seem to be part of a single
    list with the param-xxx bullets below. -->
  {{< /comment >}}

  {{< param-type >}}`bool`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}`True` | `False`{{< /param-values >}}
  {{< param-default-value >}}`False` (return a single DataFrame){{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- filter  -->
  {{< param-doc name="filter" id="param-filter" >}}
  A {{< product lc >}} filter expression that restricts which items (rows) to read.
  For example, `"vendor=='Honda" AND color=='red'"`.
  Only attributes for items that match the filter criteria are returned.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" a="filter-expression" text="Filter Expression" >}} for syntax details and examples.
  {{< note id="param-filter-notes" >}}
  You can use the [<paramname>columns</paramname>](#param-columns) parameter to specify which attributes to return for the items that match the filter expression.
  For more information, see the [notes](#query-params-notes) in the method description.
  {{< /note >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- columns  -->
  {{< param-doc name="columns" id="param-columns" >}}
  A list of item attributes (columns) to return.
  For example, `["vendor", "color", "km"]`.
  By default, the method returns all of the items' user attributes.
  {{< note id="param-columns-notes" >}}
  You can optionally use the [<paramname>filter</paramname>](#param-filter) parameter to restrict the items for which to return attributes.
  For more information, see the [notes](#query-params-notes) in the method description.
  {{< /note >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (5.12.19) Tal said that unlike the
    GetItem(s) web API operations, the Frames `columns` parameter doesn't
    support "*" and "**" values and the default returned attributes don't
    include the `__name` system attribute (which isn't required because
    currently the Frames "nosql"|"kv" backend requires a primary-key user
    attribute). -->
  {{< /comment >}}

  {{< param-type >}}`[]str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- max_rows_in_msg -->
  {{< param-doc name="max_rows_in_msg" id="param-max_rows_in_msg" >}}
  The maximum number of table items (rows) to read in each message (i.e., the size of the read chunks).
  <br/>
  When <func>read</func> returns a DataFrames iterator (when the [<paramname>iterator</paramname>](#param-iterator) parameter is set to `True`), the size each of the returned DataFrames is the configured message size.

  {{< param-type >}}`int`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`256`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- kw -->
  {{< param-doc name="kw" id="param-kw" >}}
  This parameter is used for passing a variable-length list of additional keyword (named) arguments.
  See the following [kw Arguments](#kw-args) section for a list of additional arguments that are supported for the NoSQL backend via the <paramname>kw</paramname> parameter.
 
  {{< param-type >}}`**` &mdash; variable-length keyword arguments list{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ---------------------------------------- -->
### kw Arguments {#kw-args}

The NoSQL backend supports the following <func>read</func> arguments via the [<paramname>kw</paramname>](#param-kw) parameter for passing a variable-length list of additional keyword arguments:

<dl>
  <!-- reset_index -->
  {{< param-doc name="reset_index" id="param-reset_index" >}}
  Determines whether to reset the index index column of the returned DataFrame:
  `True` &mdash; reset the index column by setting it to the auto-generated pandas range-index column; `False` (default) &mdash; set the index column to the table's {{< xref f="data-layer/objects/object-names-and-keys/" text="primary-key attribute" >}}.

  {{< param-type >}}`bool`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}`True` | `False`{{< /param-values >}}
  {{< param-default-value >}}`False`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- sharding_keys -->
  {{< param-doc name="sharding_keys" id="param-sharding_keys" >}}
  {{< techpreview mark="1" >}} A list of item sharding-key values to query to get by using a {{< xref f="data-layer/nosql/" a="range-scans" text="range scan" >}}.
  The sharding-key value is the part to the left of the leftmost period in a {{< xref f="data-layer/objects/object-names-and-keys/" a="compound-primary-key" text="compound primary-key" >}} value (item name).
  For example, `["january", "february", "march"]`.
  You can optionally use the [<paramname>sort_key_range_start</paramname>](#param-sort_key_range_start) and/or [<paramname>sort_key_range_end</paramname>](#param-sort_key_range_end) keyword arguments to restrict the search to a specific range of sorting keys (`sort_key_range_start >= <sorting key> < sort_key_range_end`).
  {{< comment >}}<!--
    [TECH-PREVIEW-FRAMES-NOSQL-RANGE-SCAN-READ-SHARDING-KEYS-KW-ARG]
    [V2.8.0-TODO] Add an even-distribution recalculation note - compare to the
    reference/web-apis/nosql-web-api/getitems.md
    #recalculated-sharding-key-even-distribution-multi-reads-note note. -->
  {{< /comment >}}

  {{< param-type >}}`[]str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- sort_key_range_start -->
  {{< param-doc name="sort_key_range_start" id="param-sort_key_range_start" >}}
  {{< techpreview mark="1" >}} The minimal sorting-key value of the items to get by using a {{< xref f="data-layer/nosql/" a="range-scans" text="range scan" >}}.
  The sorting-key value is the part to the right of the leftmost period in a {{< xref f="data-layer/objects/object-names-and-keys/" a="compound-primary-key" text="compound primary-key" >}} value (item name).
  This argument is applicable only together with the [<paramname>sharding_keys</paramname>](#param-sharding_keys) keyword argument.
  The scan will return all items with the specified sharding-key values whose sorting-key values are greater than or equal to (`>=`) than the value of the <paramname>sort_key_range_start</paramname> argument and less than (`<`) the value of the [<paramname>sort_key_range_end</paramname>](#param-sort_key_range_end) argument (if set).
  {{< comment >}}<!-- [TECH-PREVIEW-FRAMES-NOSQL-RANGE-SCAN-SORT-KEY-KW-ARGS]
  -->
  {{< /comment >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- sort_key_range_end -->
  {{< param-doc name="sort_key_range_end" id="param-sort_key_range_end" >}}
  {{< techpreview mark="1" >}} The maximal sorting-key value of the items to get by using a {{< xref f="data-layer/nosql/" a="range-scans" text="range scan" >}}.
  The sorting-key value is the part to the right of the leftmost period in a {{< xref f="data-layer/objects/object-names-and-keys/" a="compound-primary-key" text="compound primary-key" >}} value (item name).
  This argument is applicable only together with the [<paramname>sharding_keys</paramname>](#param-sharding_keys) keyword argument.
  The scan will return all items with the specified sharding-key values whose sorting-key values are greater than or equal to (`>=`) the value of the [<paramname>sort_key_range_start</paramname>](#param-sort_key_range_start) argument (if set) and less than (`<`) the value of the <paramname>sort_key_range_end</paramname> argument.
  {{< comment >}}<!-- [TECH-PREVIEW-FRAMES-NOSQL-RANGE-SCAN-SORT-KEY-KW-ARGS]
  -->
  {{< /comment >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="retval" >}}

- When the value of the [<paramname>iterator</paramname>](#param-iterator) parameter is `True` &mdash; returns a pandas DataFrames iterator.
- When the value of the [<paramname>iterator</paramname>](#param-iterator) parameter is `False` (default) &mdash; returns a single pandas DataFrame.
{{< comment >}}<!-- [IntInfo] (26.9.19) The returned DF has a `labels`
  attribute for backend-specific data, but Tal said that this isn't currently
  applicable to the "nosql"|"kv" backend (no backend-specific data). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>read</func> method of the {{< getvar v="product.frames.name.lc" >}} NoSQL backend:

1. <a id="example-basic-ret-df-iterator"></a>Read all items (rows) of a <path>mytable</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) into a DataFrames iterator ([<paramname>iterator</paramname>](#param-iterator) = `True`):
    ```python
    table = "mytable"
    dfs = client.read(backend="nosql", table=table, iterator="True")
    for df in dfs:
        display(df)
    ```

2. <a id="example-filter-columns-ret-single-df"></a>Read from a <path>mytable</path> into a single DataFrame (default [<paramname>iterator</paramname>](#param-iterator) value = `False`).
    Return only the specified item attributes ([<paramname>columns</paramname>](#param-columns)) for items whose <attr>age</attr> attribute value is greater or equal to 11 and less than 15 ([<paramname>filter</paramname>](#param-filter)).
    ```python
    table = "mytable"
    df = client.read("nosql", table=table, filter="age>=11 AND age<15",
                     columns=["username", "age", "country", "city"])
    display(df)
    ```

3. <a id="example-filter-reset_indexret-single-df"></a>Read from a <path>my_tables/students</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) into a single DataFrame (default [<paramname>iterator</paramname>](#param-iterator) value = `False`) and reset the index of the returned DataFrame ([<paramname>reset_index</paramname>](#param-reset_index) = `True`).
    Return only items whose <attr>age</attr> attribute value is greater than 10 and whose <attr>country</attr> attribute value is either "US" or "UK" ([<paramname>filter</paramname>](#param-filter)).
    ```python
    table = "/my_tables/students_11-15"
    df = client.read("nosql", table=table, reset_index=True,
                     filter="age > 10 AND country IN ('US', 'UK')")
    display(df)
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/frames/nosql/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}
- {{< xref f="data-layer/objects/object-names-and-keys/" >}}

