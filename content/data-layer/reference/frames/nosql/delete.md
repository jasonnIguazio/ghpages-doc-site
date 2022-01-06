---
title: "delete Method"
keywords: "delete method, frames nosql delete method, frames kv delete method, frames delete, frames nosql delete, frames kv delete, frames client delete, frames client nosql delete, frames client kv delete, frames delete reference, frames nosql delete reference, frames kv delete reference, deleting nosql tables, deleting tables, delete by filter, backend, filter, if_missing,table, IGNORE, fpb.IGNORE"
menu:
  main:
    parent:     "frames-apis-nosql"
    identifier: "frames-apis-nosql-delete"
    weight:     40
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}
{{< comment >}}<!-- [V2.8.0-TODO] [FRAMES-DELETE-BY-FILTER-NOSQL] [IntInfo]
  (sharonl) (17.5.20) For now, I used the updated v2.8.0 method prototype in
  the Syntax and added filtered-out references to the new `start`/`end`
  parameter references using `frames_nosql_delete_by_time` filter (currently
  not defined in config.toml). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Deletes a NoSQL table or or specific table items.

{{< note id="delete-notes" >}}
- <a id="delete-partitioned-table-note"></a>In the current release, to delete a partitioned table you need to delete each table partition separately, by issuing multiple <func>delete</func> calls and setting the [<paramname>table</paramname>](#param-table) parameter in each call to the path to a different partition directory.
    After deleting all the partitions, you can call the <func>delete</func> method with the root table path to delete the table's schema file and complete the deletion.
    {{< comment >}}<!-- [c-frames-nosql-delete-partitioned-table] [IntInfo]
      (sharonl) (27.9.20) See info in v2.8.0 DOC IG-16143 and the related
      Requirement IG-16086 / DOC IG-16144 to support deletion of partitioned
      tables (currently planned for Future). Note that we also mention this
      restriction in the description of the `table` parameter. -->
    {{< /comment >}}
- <a id="default-table-delete-note"></a>When the [<paramname>filter</paramname>](#param-filter) parameter isn't set, the entire table and its schema file (<file>.#schema</file>) are deleted.
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
delete(backend, table[, filter='', if_missing=FAIL]])
```

{{< frames-syntax-undoc-params-note backend_name="NoSQL" param="table" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>filter</paramname>](#param-filter) |
[<paramname>if_missing</paramname>](#param-if_missing) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="nosql" backend_name="NoSQL" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="nosql" backend_name="NoSQL" >}}
    You can also set the path to a table partition; see the [partitioned-table deletion note](#delete-partitioned-table-note) regarding the need to delete the table partitions before attempting to delete the entire table.
    {{< comment >}}<!-- [c-frames-nosql-delete-partitioned-table] [InfInfo]
      See the info for #delete-partitioned-table-note in the description. -->
    {{< /comment >}}
  {{< /frames-param-collection >}}

  <!-- filter -->
  {{< param-doc name="filter" id="param-filter" >}}
  A Boolean filter expression that identifies specific items to delete.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" a="filter-expression" text="Filter Expression" >}} for syntax details and examples.
  <br/>
  To reference an item attribute in the target table from within the expression, use the attribute name &mdash; `<attribute name>`.
  For example, an `"is_registered==false OR age<18"` filter deletes all table items for which either the value of the <attr>is_registered</attr> attribute is `false` or the value of the <attr>age</attr> attribute is smaller than 18.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`""` &mdash; delete the entire table and its schema file{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- if_missing -->
  {{< frames-pb-error-options-param backend_type="nosql" backend_name="NoSQL" param="if_missing" >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="errors" >}}

In case of an error, the method raises a <api>DeleteError</api> error.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>delete</func> method of the {{< getvar v="product.frames.name.lc" >}} NoSQL backend:

1. <a id="example-basic"></a>Delete a <path>mytable</path> table in the client's data container ([<paramname>table</paramname>](#param-table)).
    Because the <paramname>filter</paramname> parameter isn't set, the entire table is deleted.
    ```python
    table = "mytable"
    client.delete(backend="nosql", table=table)
    ```

2. <a id="example-if_missing-ignore"></a>Delete a <path>my_tables/students_11-15</path> table in the client's data container ([<paramname>table</paramname>](#param-table)); don't raise an error if the table doesn't exist ([<paramname>if_missing</paramname>](#param-if_missing) = <opt>IGNORE</opt>):
    ```python
    from {{% getvar v="product.frames.client.lib_name" %}} import frames_pb2 as fpb
    table = "/my_tables/students_11-15"
    client.delete("nosql", table=table, if_missing=fpb.IGNORE)
    ```

3. <a id="example-filter-expression-n-if_missing-ignore"></a>For a <path>my_tables/students_11-15</path> table in the client's data container ([<paramname>table</paramname>](#param-table)), delete all items whose <attr>age</attr> attribute value is greater than 40 (see [<paramname>filter</paramname>](#param-filter)); don't raise an error if the table doesn't exist ([<paramname>if_missing</paramname>](#param-if_missing) = <opt>IGNORE</opt>):
    ```python
    from {{% getvar v="product.frames.client.lib_name" %}} import frames_pb2 as fpb
    table = "/my_tables/students_11-15"
    client.delete("nosql", table=table, filter="age>40", if_missing=fpb.IGNORE)
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/nosql/" a="deleting-tables" text="Deleting NoSQL Tables" >}}
- {{< xref f="data-layer/reference/frames/nosql/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

