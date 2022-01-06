---
title:  "KeyValueOperations Class"
keywords: "KeyValueOperations, update method, update, nosql, key value, KV, nosql tables, tables, table items, rows, columns, update items, condition expressions, filter expressions, update modes, Container, Increment, OverwriteMode, SimpleRow, SQLFilter, Row, collection, expression, filter, mode, row"
menu:
  main:
    parent:       "nosql-scala-api"
    identifier:   "nosql-scala-api-keyvalueoperations"
    weight:       200
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>io.iguaz.v3io.kv.KeyValueOperations</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A class that exposes methods for working with tabular NoSQL data.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Instance Constructors](#constructors)

```scala
def apply(
    identifier: ContainerIdentifier,
    options:    Map[String, Any])
    : KeyValueOperations
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="methods" id="summary-methods" >}}

- <func>[update](#update)</func>

    {{< code-tabs >}}
  {{< tab "V1" >}}
```scala
def update(
    collection: V3IOPath,
    row:        Row,
    mode:       OverwriteMode,
    filter:     Option[Filter],
    expression: String = "")
    : Future[Boolean]
```
  {{< /tab >}}

  {{< tab "V2" >}}
```scala
def update(
    collection: V3IOPath,
    row:        Row,
    mode:       OverwriteMode,
    filter:     SQLFilter)
    : Future[Boolean]
```
  {{< /tab >}}

  {{< tab "V3" >}}
```scala
def update(
    collection: V3IOPath,
    row:        Row,
    mode:       OverwriteMode)
    : Future[Boolean]
```
  {{< /tab >}}
    {{< /code-tabs >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
KeyValueOperations(
    identifier: ContainerIdentifier,
    options:    Map[String, Any])
    : KeyValueOperations
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

<dl>
  <!-- identifier -->
  {{< param-doc name="identifier" id="const-param-identifier" >}}
  A container-identifier object that identifies the container to associate with the returned <api>KeyValueOperations</api> instance.
  The container can be identified either by its name (alias) or by its ID.

  {{< note >}}
  {{% text-container-name-not-container-id-note %}}
  {{< /note >}}

  {{< param-type >}}
  - For a container-name identifier &mdash; <api>io.iguaz.v3io.api.container.ContainerAlias</api>

    ```scala
    final case class ContainerAlias(alias: String)
      extends ContainerIdentifier
    ```

  - For a container-ID identifier &mdash; <api>io.iguaz.v3io.api.container.ContainerID</api>

    ```scala
    final case class ContainerID(id: Int)
      extends ContainerIdentifier
    ```
  {{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- options -->
  {{< param-doc name="options" id="const-param-options" >}}
  A map of optional {{< product "lc" >}} properties for configuring the new instance.

  {{< param-type >}}`Map[String, Any]` &mdash; a map of {{< product "lc" >}}-property name and value pairs{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="examples" id="const-examples" >}}

Create an instance of the KeyValueOperations class for a "mycontainer" container:

```scala
val kvOps = KeyValueOperations(ContainerAlias("mycontainer"), Map[String, Any]())
```

<!-- //////////////////////////////////////// -->
{{< api-heading h="2" name="update" post=" Method" >}}

Updates items in a table according to the specified update mode and optional conditions.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="update-syntax" >}}

{{< code-tabs >}}
  {{< tab "V1" >}}
```scala
update(
    collection: V3IOPath,
    row:        Row,
    mode:       OverwriteMode,
    filter:     Option[Filter],
    expression: String = "")
    : Future[Boolean]
```
  {{< /tab >}}

  {{< tab "V2" >}}
```scala
update(
    collection: V3IOPath,
    row:        Row,
    mode:       OverwriteMode,
    filter:     SQLFilter)
    : Future[Boolean]
```
  {{< /tab >}}

  {{< tab "V3" >}}
```scala
update(
    collection: V3IOPath,
    row:        Row,
    mode:       OverwriteMode)
    : Future[Boolean]
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" id="update-params" >}}

<dl>
  <!-- collection -->
  {{< param-doc name="collection" id="update-param-collection" >}}
  A v3io path to the table (collection) to update.

  {{< param-type >}}<api>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/v3iopath.md" text="V3IOPath" >}}</api>{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- row -->
  {{< param-doc name="row" id="update-param-row" >}}
  An item (row) to be updated in the table (<api>[collection](#update-param-collection)</api>).
  The item object includes the primary-key value (name) of the target item (row) and a map of the names of the item attributes (columns) to update and the new attribute values.
  You can also use an <api>Increment</api> object to increment or decrement the value of a counter attribute (see <api>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/increment.md" >}}</api>).
  {{< note >}}
  When using the [<paramname>expression</paramname>](#update-param-expression) parameter to define an update expression, the <paramname>row</paramname> object should contain only the item's primary key and the object's map member (<paramname>fields</paramname>) should be set to an empty map (`Map.empty`).
  {{< /note >}}

  {{< param-type >}}<api>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/simplerow.md" text="SimpleRow" >}}</api> class{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- mode -->
  {{< param-doc name="mode" id="update-param-mode" >}}
  Update mode, which determines how to perform the update.
  See the <api>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/enums.md" a="OverwriteMode" text="OverwriteMode" >}}</api> enumeration.

  {{< param-type >}}<api>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/enums.md" a="OverwriteMode" text="OverwriteMode" >}}</api> enumeration{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- filter -->
  {{< param-doc name="filter" id="update-param-filter" >}}
  A condition expression that defines a condition for executing the update.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" >}}.
  The expression is evaluated against the provided item (<paramname>[row](#update-param-row)</paramname>).
  If the expression evaluates to `false`, the update is considered successful but the item is not modified.

  {{< note >}}
  The <paramname>filter</paramname> is passed as a Scala `Option`.
  Therefore, you should either pass `Some(<filter>)` (for example, `Some(SQLFilter("age > 21"))`) or `None` for no filter.
  {{< /note >}}

  {{< param-type >}}<api>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/sqlfilter.md" text="SQLFilter" >}}</api> class `Option`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`None`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- expression -->
  {{< param-doc name="expression" id="update-param-expression" >}}
  An update expression that specifies the changes to make to the item's attributes.
  See {{< xref f="data-layer/reference/expressions/update-expression.md" >}}.
  The expression is evaluated against the provided item (<paramname>[row](#update-param-row)</paramname>).
  If the expression evaluates to `false`, the update is considered successful but the item is not modified.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`""`{{< /param-default-value >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_scala" type="future-response" id="update-future-response" >}}

Returns the Boolean result of the update operation &mdash; true if the item update succeeded, and false otherwise.

{{< param-type >}}Boolean{{< /param-type >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="examples" id="update-examples" >}}

#### Example 1 &mdash; Use Condition and Update Expressions {#example-1}

Set the value of a car item's <attr>Alarm</attr> attribute in a "mycontainer/Cars" table to "ON" if the item has a <attr>State</attr> attribute whose value is either "Broken" or "Attention".
If the item doesn't have an <attr>Alarm</attr> attribute, create the attribute, provided the state condition is fulfilled.
(If the item or table don't exist, they will be created and the item will be assigned the specified alarm attribute.)

```scala
import java.nio.file.Paths
import io.iguaz.v3io.file.V3IOPath
import io.iguaz.v3io.api.container.{ContainerAlias, ContainerID}
import io.iguaz.v3io.kv.{Filters, SQLFilter, KeyValueOperations, OverwriteMode, SimpleRow}

val containerName = ContainerAlias("mycontainer")
val kvOps = KeyValueOperations(containerName, Map[String, Any]())

val tablePath = V3IOPath(Paths.get("/Cars"), "mycontainer")
val row = SimpleRow("321234", Map.empty)
val updateCondition = SQLFilter("State IN ('Broken', 'Attention')")
val updateExpression = "SET Alarm='ON'"

kvOps.update(tablePath, row, OverwriteMode.REPLACE, Some(updateCondition), updateExpression)
```

#### Example 2 &mdash; Use an Update Expression {#example-2}

Set the value of the <attr>manager</attr> attribute of a "beverages" supermarket-department item in a "mycontainer/MySupermarket" table to "Jackson S."; if the attribute exists, overwrite its current value, and if it doesn't exist create it.
Add an <attr>expenses</attr> attribute with the value 0 only the item doesn't already have such an attribute; (if the attribute exists, it will be reassigned its current value).
(If the item or table don't exist, they will be created and the item will be assigned the specified update attributes.)

```scala
import java.nio.file.Paths
import io.iguaz.v3io.file.V3IOPath
import io.iguaz.v3io.api.container.{ContainerAlias, ContainerID}
import io.iguaz.v3io.kv.{KeyValueOperations, OverwriteMode, SimpleRow}

val containerName = ContainerAlias("mycontainer")
val kvOps = KeyValueOperations(containerName, Map[String, Any]())

val tablePath = V3IOPath(Paths.get("/MySupermarket"), "mycontainer")
val row = SimpleRow("beverages", Map.empty)
val updateExpression = "SET manager='Jackson S.'; SET expenses = if_not_exists(expenses,0);"

kvOps.update(tablePath, row, OverwriteMode.REPLACE, None, updateExpression)
```

#### Example 3 &mdash; Use a Condition Expression {#example-3}

Conditionally update the state attribute of a car item in a "mycontainer/Cars" table based on the car's current state and distance counter:

```scala
import java.nio.file.Paths
import io.iguaz.v3io.file.V3IOPath
import io.iguaz.v3io.api.container.{ContainerAlias, ContainerID}
import io.iguaz.v3io.kv.{Filters, SQLFilter, KeyValueOperations, OverwriteMode, SimpleRow}

val containerName = ContainerAlias("mycontainer")
val kvOps = KeyValueOperations(containerName, Map[String, Any]())

val tablePath = V3IOPath(Paths.get("/Cars"), "mycontainer")
val row = SimpleRow("1423051", Map("State" -> "OUT_OF_SERVICE"))
val updateCondition = SQLFilter("(Miles > 200000) and (State == 'OK')")

kvOps.update(tablePath, row, OverwriteMode.REPLACE, Some(updateCondition))
```

#### Example 4 &mdash; No Expressions; Increment a Counter {#example-4}

Entirely overwrite a car item in a "mycontainer/Cars" table with the specified attributes, including incrementation of the car's current distance counter:

```scala
import java.nio.file.Paths
import io.iguaz.v3io.file.V3IOPath
import io.iguaz.v3io.api.container.{ContainerAlias, ContainerID}
import io.iguaz.v3io.kv.{KeyValueOperations, OverwriteMode, SimpleRow, Increment}

val containerName = ContainerAlias("mycontainer")
val kvOps = KeyValueOperations(containerName, Map[String, Any]())

val tablePath = V3IOPath(Paths.get("/Cars"), "mycontainer")
val row = SimpleRow(
    "8870456",
    Map("State" -> "OK",
        "Miles" -> Increment(523),
        "Color" -> "blue",
        "Vendor" -> "Toyota"))

kvOps.update(tablePath, row, OverwriteMode.OVERWRITE)
```

