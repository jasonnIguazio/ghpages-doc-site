---
title:      "^^APINAME^^ ^^APITYPE^^"
menu:
  main:
    name:       "^^APINAME^^ ^^APITYPE^^"
    parent:     "^^PARENT_API_BASE_ID^^-latest-release"
    identifier: "^^PARENT_API_BASE_ID^^-^^APINAME^^-latest-release"
    weight:     ^^SIDE-MENU-WEIGHT^^
---
<!-- ^^TODO^^: Replace all "^^...^^"" placeholders, and delete ^^TODO^^ and
  ^^NOTE^^ comments including this comment. -->

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>^^FQN^^</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

^^DESCRIPTION^^

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

<!-- ^^NOTE^^: In the summary, use the full prototype, as defined in the code -
  including keywords such as `def`, `case`, `class`, `trait`, `object`,
  `extends`; the constructor apply method; and default values.
  The same is true for Prototype sections, which should be used, for example,
  for trait types (for which you can't directly create an instance).
  In the Syntax section of class/object types or methods, omit the keywords and
  the constructor apply method, and use the `new` keyword in the constructor
  syntax when the keyword is required (not required for case classes, for
  example), and do not include default values (these will be documented in the
  parameter descriptions where relevant; (we went with "Syntax" rather than
  "Prototype" to support this).
  In both cases, in the case of multiple parameters and/or type parameters,
  place each parameter and the return value on individual lines and align the
  parameter types. -->

[Instance Constructors](#constructors)
<!-- [*] ^^NOTE^^: OR instead of instance constructor, prototype (e.g., for a
  trait)  -->
[Prototype](#prototype)

```scala
^^COSNTRUCTOR-PROTOTYPE^^
```

<!-- ^^TODO^^: In the case of multiple prototypes, use code tabs. -->
{{< code-tabs >}}
  {{< tab "V1" >}}
```scala
^^COSNTRUCTOR-PROTOTYPE^^
```
  {{< /tab >}}

  {{< tab "V2" >}}
```scala
^^COSNTRUCTOR-PROTOTYPE^^
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="methods" id="summary-methods" >}}

- <func>[^^METHODNAME^^](#^^METHODNAME^^)</func>

    ```scala
    ^^METHODPROTOTYPE^^
    ```
  <!-- ^^TODO^^: In the case of multiple prototypes, use code tabs. -->

    {{< code-tabs >}}
  {{< tab "V1" >}}
```scala
^^METHODPROTOTYPE^^
```
  {{< /tab >}}

  {{< tab "V2" >}}
```scala
^^METHODPROTOTYPE^^
```
  {{< /tab >}}
    {{< /code-tabs >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}
<!-- [*] ^^NOTE^^ OR replace with "prototype" in relevant cases (e.g., for a
  trait), and then omit "const-" from the ID of the nested headings below: -->
{{< igz-heading h="2" group="apiref" type="prototype" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
^^COSNTRUCTOR-PROTOTYPE^^
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

<dl>
  <!-- ^^PARAMNAME^^ -->
  {{< param-doc name="^^PARAMNAME^^" id="const-param-^^PARAMNAME^^" >}}
  ^^PARAMDESC^^

  {{< param-type >}}^^PARAMTYPE^^{{< /param-type >}}
  {{< param-req "^^PARAMREQID--OPT--M.R.R-or-url^^" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- ^^PARAMNAME^^ -->
  {{< param-doc name="^^PARAMNAME^^" id="const-param-^^PARAMNAME^^" >}}
  ^^PARAMDESC^^

  {{< param-type >}}^^PARAMTYPE^^{{< /param-type >}}
  {{< param-req "^^PARAMREQID--OPT--M.R.R-or-url^^" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" pre="Type " id="const-tparams" >}}

<ul>
  <!-- ^^TPARAMNAME^^ -->
  {{< scala-type-param-doc name="^^TPARAMNAME^^" id="const-tparam-^^TPARAMNAME^^" >}}
  the type of the input stream's record data ("value").
  {{< /scala-type-param-doc >}}

  <!-- ^^TPARAMNAME^^ -->
  {{< scala-type-param-doc name="^^TPARAMNAME^^" id="^^const-tparam-^^TPARAMNAME^^" >}}
  the type of the input stream's record data ("value").
  {{< /scala-type-param-doc >}}
</ul>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="examples" id="const-examples" >}}

```scala
^^EXAMPLE^^
```

<!-- //////////////////////////////////////// -->
{{< api-heading h="2" name="^^METHODNAME^^" post=" Method" >}}

^^METHODDESC^^

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="^^METHODNAME^^-syntax" >}}

```scala
^^METHOD-PROTOTYPE^^
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" id="^^METHODNAME^^-params" >}}

<dl>
  <!-- ^^PARAMNAME^^ -->
  {{< param-doc name="^^PARAMNAME^^" id="^^METHODNAME^^-param-^^PARAMNAME^^" >}}
  ^^PARAMDESC^^

  {{< param-type >}}^^PARAMTYPE^^{{< /param-type >}}
  {{< param-req "^^PARAMREQID--OPT--M.R.R-or-url^^" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" pre="Type " id="^^METHODNAME^^-tparams" >}}

<ul>
  <!-- ^^TPARAMNAME^^ -->
  {{< scala-type-param-doc name="^^TPARAMNAME^^" id="^^METHODNAME^^-tparam-^^TPARAMNAME^^" >}}
  the type of the input stream's record data ("value").
  {{< /scala-type-param-doc >}}
</ul>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="retval" id="^^METHODNAME^^-retval" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="examples" id="^^METHODNAME^^-examples" >}}

```scala
^^EXAMPLE^^
```

