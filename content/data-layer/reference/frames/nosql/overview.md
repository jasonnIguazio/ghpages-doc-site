---
title:      "Overview of the Frames NoSQL Backend"
linktitle:  "Frames NoSQL-Backend Overview"
keywords: "frames nosql backend overview, frames kv backend overview, frames nosql overview, frames kv overview, frames nosql client methods, frames kv client methods, frames nosql methods, frames kv methods, frames nosql api, frames kv api, frames nosql, frames kv, nosql, kv"
layout: "section-list"
menu:
  main:
    name:       "Overview"
    parent:     "frames-apis-nosql"
    identifier: "frames-apis-nosql-overview"
    weight:     10
---

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

The NoSQL backend of the {{< getvar v="product.frames.name.lc" >}} API supports <api>Client</api> methods and commands for working with NoSQL data in the {{< product lc >}} using the NoSQL database service, which enables storing and consuming data in a tabular format.
For more information, see {{< xref f="data-layer/nosql/" >}}.

-   To add, replace, or update a table item, use the <func>{{< xref f="data-layer/reference/frames/nosql/write.md" text="write" >}}</func> method.

    To create a table, just begin adding items.
    The table will be created automatically with the first item that you add.
    See also {{< xref f="data-layer/nosql/" a="creating-tables" >}}.

    {{< note id="write-notes" >}}
In the current release &mdash;

-   When updating a table item (i.e., when writing an item with the same [primary-key attribute](#item-name-n-primary-key) value as an existing table item), the existing item is overwritten and replaced with the written item.
-   All items that are written to a given table must conform to the same schema.
    For more information, see [Table Schema](#table-schema) in this overview.
    {{< /note >}}
    {{< comment >}}<!-- [c-frames-nosql-write-save-modes] [V2.8.0-TODO]
      [IntInfo] (sharonl) Edit the notes when we release the support for write
      save modes. See Requirement IG-13663 DOC IG-13747. -->
    {{< /comment >}}

-   To retrieve items or specific item attributes from a table, use the <func>{{< xref f="data-layer/reference/frames/nosql/read.md" text="read" >}}</func> method.

-   To infer the schema of a NoSQL table and create a schema file, use the {{< xref f="data-layer/reference/frames/nosql/execute.md" text="execute" a="cmd-infer" text="<cmd>infer_schema</cmd> or <cmd>infer</cmd>" >}} command of the <func>{{< xref f="data-layer/reference/frames/nosql/execute.md" text="execute" >}}</func> method.
    Note that that the schema is automatically inferred when using the <func>write</func> method.
    For more information, see [Table Schema](#table-schema) in this overview.

-   To delete a table or specific table items, use the <func>{{< xref f="data-layer/reference/frames/nosql/delete.md" text="delete" >}}</func> method.
    You can also delete a table by using a file-system command.
    See {{< xref f="data-layer/nosql/" a="deleting-tables" >}}.

<!-- //////////////////////////////////////// -->
## Item Name and Primary Key {#item-name-n-primary-key}

A table item is a data object, and as such needs to be assigned a unique primary-key value, which serves as the item's name and is stored by the {{< product lc >}} in the <attr>\_\_name</attr> system attribute &mdash; see {{< xref f="data-layer/objects/object-names-and-keys/" >}}.
When using the <func>{{< xref f="data-layer/reference/frames/nosql/write.md" text="write" >}}</func> method to add or update an item in a NoSQL table, you must provide the item's primary-key value (name) by designating the relevant DataFrame column as an index column.
For more information see the {{< xref f="data-layer/reference/frames/nosql/write.md" text="write" a="index-col-note" text="index-column note" >}} in the documentation of the <func>write</func> method.

<!-- //////////////////////////////////////// -->
## Table Schema {#table-schema}

The NoSQL {{< getvar v="product.frames.name.sc" >}} backend handles structured data.
Therefore, the backend needs to be aware of the schema of the data structure.
When writing NoSQL data by using the {{< product lc >}}'s {{< getvar v="product.frames.name.lc" >}} or Spark NoSQL DataFrame APIs, the schema of the data table is automatically identified and saved and then retrieved when reading the data with {{< getvar v="product.frames.name.lc" >}}, a Spark DataFrame, or Presto.
However, to use {{< getvar v="product.frames.name.lc" >}}, a Spark DataFrame, or Presto to read NoSQL data that was written to a table in another way (such as using the {{< product lc >}}'s {{< xref f="data-layer/reference/web-apis/nosql-web-api/" text="NoSQL web API" >}}), you first need to define the table schema.
You can do this by using the {{< xref f="data-layer/reference/frames/nosql/execute.md" text="execute" a="cmd-infer" text="infer-schema command" >}} of the <func>{{< xref f="data-layer/reference/frames/nosql/execute.md" text="execute" >}}</func> method (<cmd>infer_schema</cmd> / <cmd>infer</cmd>).
For more information about NoSQL table schemas in the {{< product lc >}}, see the {{< xref f="data-layer/reference/nosql-table-schema.md" >}}.

Note that all items in the table must conform to the same schema (i.e., have the same attribute names and types).
In the current release, the table schema is updated according to the last write operation and you can only read from the table items that match the updated table schema.
{{< comment >}}<!-- [c-frames-nosql-write-save-modes] [IntInfo] (sharonl)
  (7.1.20) See my "Frames KV: Changing the Table Schema (V2.5)" email from
  7.1.20, copied in DOC IG-13747 for the new `write` save modes added to the
  NoSQL ("nosql"|"kv") backend in v2.8.0 (Requirement IG-13663). [V2.8.0-TODO]
  Edit the doc in light of the new `write` save modes and other related v2.8
  changes. -->
{{< /comment >}}
<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/nosql/" >}}
- {{< xref f="data-layer/objects/object-names-and-keys/" >}}
- {{< xref f="data-layer/reference/nosql-table-schema.md" >}}
- {{< xref f="data-layer/reference/frames/overview.md" >}}

