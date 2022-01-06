---
title:  "Decoder Trait"
keywords: "Decoder, spark streaming, decoding"
menu:
  main:
    parent:     "spark-streaming-integration-api-encoding-decoding-types"
    identifier: "spark-streaming-integration-api-decoder"
    weight:     10
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>io.iguaz.v3io.spark.streaming.Decoder</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A trait for defining a decoder class that converts a byte array into the specified type.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Prototype](#prototype)

```scala
trait Decoder[T] extends Encoding
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="methods" id="summary-methods" >}}

- <func>[fromBytes](#fromBytes)</func>

    ```scala
    def fromBytes(bytes: Array[Byte])(
        implicit encoding: Option[Properties] => Charset)
        : T
    ```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="prototype" id="prototype" >}}

```scala
trait Decoder[T] extends Encoding
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" pre="Type " id="tparams" >}}

<ul>
  <!-- T -->
  {{< scala-type-param-doc name="T" id="tparam-T" >}}
  the type into which to covert (decode) the data.
  {{< /scala-type-param-doc >}}
</ul>

<!-- //////////////////////////////////////// -->
{{< api-heading h="2" name="fromBytes" post=" Method" >}}

Converts a byte array into the specified data type.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="fromBytes-syntax" >}}

```scala
fromBytes(bytes: Array[Byte])(
    implicit encoding: Option[Properties] => Charset)
    : T
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
  An implicit encoding function that returns a string character encoding.

  {{< param-type >}}`encoding: Option[Properties] => Charset)`{{< /param-type >}}
  {{< param-req "I" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="retval" id="fromBytes-retval" >}}

Returns the converted (decoded) data in the specified data format (<paramname>[T](#tparam-T)</paramname>).

