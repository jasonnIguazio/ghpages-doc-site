---
title:  "RecordAndMetadata Class"
keywords: "RecordAndMetadata, payload, payloadWithMetadata, spark streaming, stream records, record metadata, record payload, decoding, decoder, stream shards, shards, stream partitions, partitionId, topic, valueDecoder"
menu:
  main:
    parent:     "spark-streaming-integration-api"
    identifier: "spark-streaming-integration-api-recordandmetadata"
    weight:     200
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>org.apache.spark.streaming.v3io.RecordAndMetadata</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A case class that represents a {{< product lc >}} stream record.
The class exposes methods for extracting decoded record data and related metadata.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Instance Constructors](#constructors)

```scala
case class RecordAndMetadata[V](
    topic:            String,
    partitionId:      Short,
    private val rec:  ConsumerRecord,
    valueDecoder:     Decoder[V])
    extends Encoding with Logging
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="methods" id="summary-methods" >}}

- <func>[payload](#payload)</func>

    ```scala
    def payload(): V
    ```

- <func>[payloadWithMetadata](#payloadWithMetadata)</func>

    ```scala
    def payloadWithMetadata(): PayloadWithMetadata[V]
    ```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
RecordAndMetadata[V](
    topic:            String,
    partitionId:      Short,
    private val rec:  ConsumerRecord,
    valueDecoder:     Decoder[V])
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

<dl>
  <!-- topic -->
  {{< param-doc name="topic" id="const-param-topic" >}}
  The name of the stream that contains the record.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- partitionId -->
  {{< param-doc name="partitionId" id="const-param-partitionId" >}}
  The ID of the stream shard that contains the record (see {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}).

  {{< param-type >}}`Short`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- valueDecoder -->
  {{< param-doc name="valueDecoder" id="const-param-valueDecoder" >}}
  A decoder instance for converting the record's data into the desired type &mdash; the value type of the current class instance (see the <paramname>[V](#const-tparam-V)</paramname> type parameter).

  {{< param-type >}}<api>{{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/encoding-decoding-types/decoder.md" text="Decoder" >}}</api><api>[</api><api>[V](#const-tparam-V)</api><api>]</api>{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" pre="Type " id="const-tparams" >}}

<ul>
  <!-- V -->
  {{< scala-type-param-doc name="V" id="const-tparam-V" >}}
  the data type into which to convert the record data ("value").
  {{< /scala-type-param-doc >}}
</ul>

<!-- //////////////////////////////////////// -->
{{< api-heading h="2" name="payload" post=" Method" >}}

Returns decoded record data ("payload"), in the specified format.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="payload-syntax" >}}

```scala
payload(): V
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" id="payload-params" none="1" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="retval" id="payload-retval" >}}

Returns the decoded record data, formatted as the value type of the current class instance (see the constructor's <paramname>[V](#const-tparam-V)</paramname> type parameter).

<!-- //////////////////////////////////////// -->
{{< api-heading h="2" name="payloadWithMetadata" post=" Method" >}}

Returns decoded record data ("payload"), in the specified format, and related metadata.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="payloadWithMetadata-syntax" >}}

```scala
payloadWithMetadata(): PayloadWithMetadata[V]
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" id="payloadWithMetadata-params" none="1" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="retval" id="payloadWithMetadata-retval" >}}

Returns a <api>{{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/payloadwithmetadata.md" text="PayloadWithMetadata" >}}</api> object that contains the decoded record data and related metadata.

