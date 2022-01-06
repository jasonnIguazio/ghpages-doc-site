---
title:  "SimpleRow Class"
keywords: "SimpleRow, simple row, nosql tables, tables, table items, rows, attributes, columns, primary key, item names, key, fields"
menu:
  main:
    parent:       "nosql-scala-api"
    identifier:   "nosql-scala-api-simplerow"
    weight:       300
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>io.iguaz.v3io.kv.SimpleRow</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A case class that represents a simple item (row) in a table.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Instance Constructors](#constructors)

```scala
case SimpleRow(
    key:    String,
    fields: Map[String, Any])
    extends Row
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
SimpleRow(
    key:    String,
    fields: Map[String, Any])
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

<dl>
  <!-- key -->
  {{< param-doc name="key" id="const-param-key" >}}
  The primary-key value (name) of the item (row), which uniquely identifies the item within a given table (see {{< xref f="data-layer/objects/object-names-and-keys/" >}}).

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- fields -->
  {{< param-doc name="fields" id="const-param-fields" >}}
  A map of item attribute (column) names and their respective values.
  Note that you can also use an <api>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/increment.md" text="Increment" >}}</api> object to increment or decrement the current value of a counter attribute.

  {{< param-type >}}`Map[String, Any]` &mdash; a map of item-attribute name and value pairs{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

