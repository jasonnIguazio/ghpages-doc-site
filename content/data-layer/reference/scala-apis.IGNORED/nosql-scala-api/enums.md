---
title:  "Enumerations"
keywords: "enumerations, enums, scala data types, scala, OverwriteMode, conditional update, update items, update modes, APPEND, APPEND_NEW, OVERWRITE, REPLACE"
menu:
  main:
    parent:       "nosql-scala-api"
    identifier:   "nosql-scala-api-enums"
    weight:       900
---

## OverwriteMode {#OverwriteMode}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>io.iguaz.v3io.kv.OverwriteMode</api>

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="description" >}}

An enumeration of table-item update modes (see <func>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/keyvalueoperations.md" a="update" text="KeyValueOperations.update" >}}</func>).

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="enum-values" >}}

-   <def id="OverwriteMode-APPEND">APPEND</def> &mdash; Add to an existing item the update attributes that don't already exist in the item, but do not modify existing attributes.
    If the update item is not found in the table, add to the table a new item with the specified primary-key value and attributes.

-   <def id="OverwriteMode-APPEND_NEW">APPEND_NEW</def> &mdash; Add to the table a new item with the specified primary-key value and attributes.
    If the update item is already found in the table, do not modify it (do nothing).

-   <def id="OverwriteMode-OVERWRITE">OVERWRITE</def> &mdash; Entirely overwrite an existing item with the specified update attributes (replacing any existing attributes).
    If the update item is not found in the table, add to the table a new item with the specified primary-key value and attributes.

-   <def id="OverwriteMode-REPLACE">REPLACE</def> &mdash; Replace the values of the update attributes that already exist in the item, and append to the item any update attributes that are not already found in the item.
    Existing item attributes that are not included in the update information remain unaffected. If the update item is not found in the table, add to the table a new item with the specified primary-key value and attributes.

