---
title:  "Increment Class"
keywords: "Increment, SupportedIncrement, attributes, counter attributes, attribute increment, attribute decrement"
menu:
  main:
    parent:       "nosql-scala-api"
    identifier:   "nosql-scala-api-increment"
    weight:       100
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>io.iguaz.v3io.kv.Increment</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A case class for incrementing or decrementing a related numeric value, such as the value of a counter item attribute (see <func>{{< xref f="data-layer/reference/scala-apis/nosql-scala-api/keyvalueoperations.md" a="update" text="KeyValueOperations.update" >}}</func>).

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Instance Constructors](#constructors)

```scala
case class Increment[T: SupportedIncrement](increment: T)
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
Increment[T: SupportedIncrement](increment: T)
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

<dl>
  <!-- increment -->
  {{< param-doc name="increment" id="const-param-increment" >}}
  Incrementation step, which indicates by how much to increment or decrement the current value.
  To decrement the value, use a negative incrementation step.

  {{< param-type >}}<paramname>[T](#const-tparam-V)</paramname>{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" pre="Type " id="const-tparams" >}}

<ul>
  <!-- T -->
  {{< scala-type-param-doc name="T" id="const-tparam-T" >}}the type of the [{{< fmt "paramname" >}}increment{{< /fmt >}}](#const-param-increment) parameter; one of the following numeric types &mdash; `Long`, `Int`, `Short`, `Double`{{< /scala-type-param-doc >}}
    {{< comment >}}
    <!-- [ci-fmt-shortcode-in-shortcode-call-content-scala-type-param] -->
    {{< /comment >}}
</ul>

