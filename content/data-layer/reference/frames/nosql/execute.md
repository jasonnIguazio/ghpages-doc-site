---
title: "execute Method"
keywords: "execute method, frames nosql execute method, frames kv execute method, frames execute, frames nosql execute, frames kv execute, frames client execute, frames client nosql execute, frames client kv execute, frames execute reference, frames nosql execute reference, frames kv execute reference, frames nosql infer_schema, frames kv infer_schema, frames nosql infer, frames kv infer, frames infer_schema command, frames infer command, infer_schema command, infer command, frames nosql infer schema, frames infer schema, nosql infer schema, infer schema, infer table schema, args, backend, command, table, key"
menu:
  main:
    parent:     "frames-apis-nosql"
    identifier: "frames-apis-nosql-execute"
    weight:     50
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Executes the specified command.
This method is used to extend the basic functionality of the other client methods.
Currently, the NoSQL backend supports an [<cmd>infer_schema</cmd>](#cmd-infer) command with an <cmd>infer</cmd> alias for inferring the table schema.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

{{< comment >}}<!-- [c-frames-nosql-execute-args-na] See the [IntInfo] for the
  commented-out `args` param doc. -->
{{< /comment >}}
{{< condition filter="frames_nosql_execute_args_param" filterval="true" >}}
```python
execute(backend, table, command=""[, args=None])
```
{{< /condition >}}
{{< not-condition filter="frames_nosql_execute_args_param" filterval="false" >}}
```python
execute(backend, table, command=""
```

{{< frames-syntax-undoc-params-note backend_name="NoSQL" param="table" >}}
{{< /not-condition >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="const-params-n-data-members" >}}

{{< condition filter="frames_nosql_execute_args_param" filterval="true" >}}[<paramname>args</paramname>](#param-args) |{{< /condition >}}
[<paramname>backend</paramname>](#param-backend) |
[<paramname>command</paramname>](#param-command) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="nosql" backend_name="NoSQL" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="nosql" backend_name="NoSQL" >}}
  {{< /frames-param-collection >}}

  <!-- command -->
  {{< param-doc name="command" id="param-command" >}}
  The command to execute.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< param-values >}}The NoSQL backend currently supports an <cmd-b id="cmd-infer">&quot;infer_schema&quot;</cmd-b> or <cmd-b>&quot;infer&quot;</cmd-b> command, which infers the schema of a given NoSQL table and creates a schema for the table.
    The command creates a <file>.#schema</file> file in the table directory.
    For more information, see {{< xref f="data-layer/reference/frames/nosql/overview.md" a="table-schema" text="Table Schema" >}} in the {{< getvar v="product.frames.name.lc" >}} NoSQL backend overview.
    All references to the <cmd>infer_schema</cmd> command in the documentation apply also to the <cmd>infer</cmd> alias.
  {{< /param-values >}}
  {{< /param-doc >}}

{{< condition filter="frames_nosql_execute_args_param" filterval="true" >}}
{{< comment >}}<!-- [c-frames-nosql-execute-args-na] [IntInfo] (sharonl)
  (20.5.20) I removed the documentation of the `key` argument, which was
  previously documented for internal use (see the commented-out v2.5 doc
  below). As this was the only documented `args` argument (dictionary key), I
  also removed the documentation of the `args` parameter. See the uses of the
  `frames_nosql_execute_args_param` filter (currently undefined) in this file.
  We documented this argument for v2.5 because users might need to use it to
  bypass Bug IG-12619 - `infer_schema` command doesn't set the schema key isn't
  set to the name of table's primary-key attribute, as expected, and
  consequently the table can't be read with Spark or Presto - which was
  documented as a KI in the v2.5.0 RNs
  (#ki-frames-kv-infer-schema-wo-key-param), including the option of setting
  `key` to bypass this. The bug was fixed and closed in v2.8.0 and the RNs KI
  was replaced with a fix note in the v2.8.0 RNs.
  Note that as this is a dictionary key, it's not part of the method prototype
  and isn't mentioned in the embedded help or in the Frames GitHub README,
  therefore we can ignore it in the documentation now that users have no reason
  to use it (and we don't want them to). -->
{{< /comment >}}
  <!-- args -->
  {{< param-doc name="args" id="param-args" >}}
A dictionary of `"<argument name>": <value>` pairs for passing additional backend-specific method parameters (arguments).
  {{< comment >}}<!-- [ci-li-param-xxx-shcds-in-nested-param-doc] Align the
    `param-doc` content with the start of the line to avoid extra space around
    the last li `param-xxx` bullet in the last nested `param-doc`. -->
  {{< /comment >}}

{{< param-type >}}`dict`{{< /param-type >}}
{{< param-req "O" >}}{{< /param-req >}}
{{< param-default-value >}}`None`{{< /param-default-value >}}

<!-- *************** -->
{{< small-heading id="cmd-infer-args" >}}infer_schema Command Arguments{{< /small-heading >}}

The [<cmd>infer_schema</cmd>](#cmd-infer) command of the NoSQL backend supports the following arguments:

<dl>
<!-- key -->
{{< param-doc name="key" id="infer-arg-key" >}}
The name of the table's primary-key attribute.
{{< note id="infer-arg-key-notes" >}}
This argument is **intended for internal use**, as the infer-schema command should typically identify and set the key automatically.
{{< /note >}}

{{< param-type >}}`str`{{< /param-type >}}
{{< param-req "O" >}} [FOR INTERNAL USE]{{< /param-req >}}
{{< /param-doc >}}
</dl>
{{< /condition >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

<!-- ---------------------------------------- -->
### infer_schema Examples {#examples-infer}

Following are examples of using the [<cmd>infer_schema</cmd>](#cmd-infer) command of the <func>execute</func> method or its <cmd>infer</cmd> alias:

1. <a id="infer-example-basic"></a>Infer the schema of a <path>mytable</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) using the <cmd>infer</cmd> command ([<paramname>command</paramname>](#param-command)):
    ```python
    client.execute(backend="nosql", table="mytable", command="infer")
    ```

2. <a id="infer-example-basic-infer_schema"></a>Infer the schema of a <path>my_tables/students</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) using <cmd>infer_schema</cmd> ([<paramname>command</paramname>](#param-command)):
    ```python
    client.execute("nosql", table="/my_tables/students", command="infer_schema")
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/nosql-table-schema.md" >}}
- {{< xref f="data-layer/reference/frames/nosql/overview.md" >}}
    - {{< xref f="data-layer/reference/frames/nosql/overview.md" a="table-schema" text="Table Schema" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

