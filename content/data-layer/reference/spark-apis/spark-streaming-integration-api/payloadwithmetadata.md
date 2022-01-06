---
title:  "PayloadWithMetadata Class"
keywords: "PayloadWithMetadata, spark streaming, stream records, record metadata, record payload, decoding, stream shards, shards, stream partitions, record ingestion, stream consumption, record sequence number, createTimeMs, createTimeNano, partitionId, payload, recordKey, topicName"
menu:
  main:
    parent:     "spark-streaming-integration-api"
    identifier: "spark-streaming-integration-api-payloadwithmetadata"
    weight:     100
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>org.apache.spark.streaming.v3io.PayloadWithMetadata</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A case class that contains decoded stream record data and related metadata.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Instance Constructors](#constructors)

```scala
case class PayloadWithMetadata[V](
    topicName:      String = "",
    partitionId:    Short = -1,
    createTimeMs:   Long = -1,
    createTimeNano: Long = -1,
    recordKey:      Long = -1,
    payload:        V = null.asInstanceOf[V])
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
PayloadWithMetadata[V](
    topicName:      String,
    partitionId:    Short,
    createTimeMs:   Long,
    createTimeNano: Long,
    recordKey:      Long1,
    payload:        V)
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

{{< note id="const-params-n-data-members-note" >}}
The parameters have default initialization values (such as -1), but any parameter that is intended to be used must be set explicitly.
The <func>{{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/recordandmetadata.md" a="payloadWithMetadata" text="RecordAndMetadata.payloadWithMetadata" >}}</func> method sets all parameters for the returned object.
{{< /note >}}

<dl>
  <!-- topicName -->
  {{< param-doc name="topicName" id="const-param-topicName" >}}
  The name of the stream that contains the record.

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

  <!-- partitionId -->
  {{< param-doc name="partitionId" id="const-param-partitionId" >}}
  The ID of the stream shard that contains the record (see {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}).

  {{< param-type >}}`Short`{{< /param-type >}}
  {{< /param-doc >}}

  <!-- createTimeMs -->
  {{< param-doc name="createTimeMs" id="const-param-createTimeMs" >}}
  The record's ingestion time (the time at which the record arrived at the {{< product lc >}}), as a Unix timestamp in milliseconds.
  For example, `1511260205000` indicates that the record was ingested on 21 Nov 2017 at 10:30:05 AM.
  The [<paramname>createTimeNano</paramname>](#const-param-createTimeNano) parameter holds the nanoseconds unit of the ingestion time.

  {{< param-type >}}`Long`{{< /param-type >}}
  {{< /param-doc >}}

  <!-- createTimeNano -->
  {{< param-doc name="createTimeNano" id="const-param-createTimeNano" >}}
  The nanoseconds unit of the [<paramname>createTimeMs</paramname>](#const-param-createTimeMs) ingestion-time timestamp.
  For example, if <paramname>createTimeMs</paramname> is `1511260205000` and <paramname>createTimeNano</paramname> is `500000000`, the record was ingested on 21 Nov 2017 at 10:30 AM and 5.5 seconds.

  {{< param-type >}}`Long`{{< /param-type >}}
  {{< /param-doc >}}

  <!-- recordKey -->
  {{< param-doc name="recordKey" id="const-param-recordKey" >}}
  The record's sequence number (see {{< xref f="data-layer/stream/" a="stream-record-consumption" text="Stream Record Consumption" >}}).

  {{< param-type >}}`Long`{{< /param-type >}}
  {{< /param-doc >}}

  <!-- payload -->
  {{< param-doc name="payload" id="const-param-payload" >}}
  Decoded record data, formatted as the value type of the current class instance (<paramname>[V](#const-tparam-V)</paramname>).

  {{< param-type >}}<paramname>V</paramname>{{< /param-type >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" pre="Type " id="const-tparams" >}}

<ul>
  <!-- V -->
  {{< scala-type-param-doc name="V" id="const-tparam-V" >}}
  the data type into which to convert the record's data payload ("value").
  {{< /scala-type-param-doc >}}
</ul>

