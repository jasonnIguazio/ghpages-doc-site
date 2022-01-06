---
title:  "Encoding Trait"
keywords: "Encoding, spark streaming, encoding"
menu:
  main:
    parent:     "spark-streaming-integration-api-encoding-decoding-types"
    identifier: "spark-streaming-integration-api-encoding"
    weight:     40
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>io.iguaz.v3io.spark.streaming.Encoding</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A trait for defining a class that returns a string character encoding.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Prototype](#prototype)

```scala
trait Encoding
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="methods" id="summary-methods" >}}

- <func>[encoding](#encoding)</func>

    ```scala
    def encoding(config: Option[Properties] = None): Charset
    ```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="prototype" id="prototype" >}}

```scala
trait Encoding
```

<!-- //////////////////////////////////////// -->
{{< api-heading h="2" name="encoding" post=" Method" >}}

Returns a character encoding.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="encoding-syntax" >}}

```scala
encoding(config: Option[Properties] = None): Charset
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" id="encoding-params" >}}

<dl>
  <!-- config -->
  {{< param-doc name="config" id="encoding-param-config" >}}
  Optional parameter for setting the returned character encoding.
  When provided, if the properties include the <opt>"v3io.streaming.encoding"</opt> property, the method returns a <api>[Charset]({{< url v="java_api_latest" k="full" >}}charset/Charset.html)</api> instance that corresponds to the value of this property.
  The property value can be any <api>[StandardCharsets]({{< url v="java_api_latest" k="full" >}}charset/StandardCharsets.html)</api> constant (for example, `"UTF_8"`).

  {{< param-type >}}`Option[Properties]`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value str="Character Encoding" >}}When the <paramname>config</paramname> parameter is not provided or does not include the character-encoding configuration property, the method returns a UTF8 character encoding &mdash; `UTF-8 Charset`.{{< /param-default-value >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="retval" id="encoding-retval" >}}

Returns a character encoding (`Charset`).

