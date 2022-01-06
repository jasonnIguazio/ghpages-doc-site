---
title:  "StringDecoder Class"
keywords: "StringDecoder, spark streaming, decoding"
menu:
  main:
    parent:     "spark-streaming-integration-api-encoding-decoding-types"
    identifier: "spark-streaming-integration-api-string"
    weight:     30
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>io.iguaz.v3io.spark.streaming.Decoder.StringDecoder</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A class for defining a {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/encoding-decoding-types/decoder.md" text="Decoder" >}} object that converts a byte array into a string.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Instance Constructors](#constructors)

```scala
class StringDecoder(config: Option[Properties] = None)
    extends Decoder[String]
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="methods" id="summary-methods" >}}

- <func>[fromBytes](#fromBytes)</func>

    ```scala
    def fromBytes(bytes: Array[Byte])(
        implicit encoding: Option[Properties] => Charset)
        : String
    ```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
new StringDecoder(config: Option[Properties])
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

<dl>
  <!-- config -->
  {{< param-doc name="config" id="const-param-config" >}}
  Optional properties that are passed to the <paramname>[encoding](#fromBytes-param-encoding)</paramname> function of the class's <func>fromBytes</func> method.

  {{< param-type >}}`Option[Properties]`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< api-heading h="2" name="fromBytes" post=" Method" >}}

Converts a byte array into a string.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="fromBytes-syntax" >}}

```scala
fromBytes(bytes: Array[Byte])(
    implicit encoding: Option[Properties] => Charset)
    : String
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" id="fromBytes-params" >}}

<dl>
  <!-- bytes -->
  {{< param-doc name="bytes" id="fromBytes-param-bytes" >}}
  The byte array to convert (decode).

  {{< param-type >}}`Array[Bytes]`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- encoding -->
  {{< param-doc name="encoding" id="fromBytes-param-encoding" >}}
  An implicit function that returns the character encoding to use in the conversion.

  {{< param-type >}}`encoding: Option[Properties] => Charset)`{{< /param-type >}}
  {{< param-req "I" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="retval" id="fromBytes-retval" >}}

Returns the converted (decoded) string.

