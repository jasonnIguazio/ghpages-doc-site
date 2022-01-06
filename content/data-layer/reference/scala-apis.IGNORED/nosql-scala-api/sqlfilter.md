---
title:  "SQLFilter Class"
keywords: "SQLFilter, condition expressions, filter expressions, update items, Filter, KeyValueOperations, update, update method"
menu:
  main:
    parent:       "nosql-scala-api"
    identifier:   "nosql-scala-api-sqlfilter"
    weight:       400
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>io.iguaz.v3io.kv.Filters.SQLFilter</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A case class for creating a condition-expression string (see {{< xref f="data-layer/reference/expressions/condition-expression.md" >}}).

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Instance Constructors](#constructors)

```scala
final case class SQLFilter(sql: String) extends Filter
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
SQLFilter(sql: String) extends Filter
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

<dl>
  <!-- sql -->
  {{< param-doc name="sql" id="const-param-sql" >}}
  A condition-expression string that defines conditions for performing an operation.
  See, for example, the <paramname>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/keyvalueoperations.md" a="update-param-filter" text="filter" >}}</paramname> parameter of the <func>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/keyvalueoperations.md" a="update" text="KeyValueOperations.update" >}}</func> method.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

