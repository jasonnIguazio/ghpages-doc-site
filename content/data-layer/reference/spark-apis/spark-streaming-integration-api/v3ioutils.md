---
title:  "V3IOUtils Object"
keywords: "V3IOUtils, createDirectStream, spark streaming, spark streaming api, streams, spark input streams, DStream, InputDStream, stream records, record metadata, stream consumption, get records, spark-streaming context, configuration properties, property types, configurations, ssc, v3ioParams, streamNames, messageHandler, container-id, container ID, container name, default-data-block-size"
menu:
  main:
    parent:     "spark-streaming-integration-api"
    identifier: "spark-streaming-integration-api-v3ioutils"
    weight:     300
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>org.apache.spark.streaming.v3io.V3IOUtils</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A singleton utility object for creating Spark input streams that can be used to consume {{< product lc >}} stream records via the Spark Streaming API.

{{< note id="v3io-streams-note" title="V3IO Streams" >}}
To use this object you must first create one or more V3IO streams using the {{< product lc >}}'s create-stream API.
See the <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/createstream.md" text="CreateStream" >}}</api> operation of the Streaming Web API.
{{< comment >}}<!-- [FUTURE-SPARK-STREAMING-NON-WEB-API] TODO: When we document
  our custom Scala/Python/Java Spark Streaming API, edit the doc to refer also
  to the option to use the equivalent create-stream method of these APIs (e.g.,
  the Scala io.iguaz.v3io.streaming.V3IOStreamingOperation CreateStream method
  / class instance (see definition in the following zeta repo file:
  v3io-streaming/src/main/scala/io/iguaz/v3io/streaming/V3IOStreamingOperations.scala). -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Prototype](#prototype)

```scala
object V3IOUtils
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="methods" id="summary-methods" >}}

- <func>[createDirectStream](#createDirectStream)</func>

    ```scala
    def createDirectStream[
        V: ClassTag, VD <: Decoder[V] : ClassTag, R: ClassTag](
        ssc:              StreamingContext,
        v3ioParams:       Map[String, String],
        streamNames:      Set[String],
        messageHandler:   RecordAndMetadata[V] => R)
        : InputDStream[R]
    ```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="prototype" >}}


```scala
object V3IOUtils
```

<!-- //////////////////////////////////////// -->
{{< api-heading h="2" name="createDirectStream" post=" Method" >}}

Creates a Spark input-stream object that can be used to consume record data and metadata from the specified {{< product lc >}} streams, using the Spark Streaming API ([v{{< verkey k="spark.version" >}}]({{< getvar v="spark.streaming_prog_guide.full" >}})).
The new input stream pulls stream records by querying the {{< product lc >}} directly, without using a receiver.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="createDirectStream-syntax" >}}

```scala
createDirectStream[
    V:    ClassTag,
    VD <: Decoder[V] : ClassTag,
    R:    ClassTag](
    ssc:              StreamingContext,
    v3ioParams:       Map[String, String],
    streamNames:      Set[String],
    messageHandler:   RecordAndMetadata[V] => R)
    : InputDStream[R]
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" id="createDirectStream-params" >}}

<dl>
  <!-- ssc -->
  {{< param-doc name="ssc" id="createDirectStream-param-ssc" >}}
  Spark streaming-context object.

  {{< param-type >}}Spark <api>[StreamingContext]({{< getvar v="spark.streaming_scala_api_base.full" >}}.StreamingContext)</api>{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- v3ioParams -->
  {{< param-doc name="v3ioParams" id="createDirectStream-param-v3ioParams" >}}
  An optional map of {{< product lc >}} configuration properties that configure the creation and behavior of the returned Spark input stream.
  For example, <nobr>`Map("default-data-block-size" -> "524288")`</nobr> configures the block size for read operations to 0.5 MB (524288 bytes).

  {{< param-type >}}`Map[String, String]` &mdash; a map of {{< product lc >}}-property name and value string pairs{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}

  {{< note id="v3ioParams-property-types-note" >}}
  All property values are provided as strings.
  The "Property Type" information in the following descriptions indicates the property type that the string represents.
  {{< /note >}}

  {{< comment >}}<!-- [InfraInfo] (sharonl) (3.12.18) I wasn't able to
    successfully use the param-doc, param-type, and/or param-default-value
    shortcodes for the following properties documentation; (the output text was
    either aligned incorrectly or was embedded in a code block); I tested
    different indentations in the Markedown code)  -->
  {{< /comment >}}

  <!-- Start-Position Configuration Properties -->
  {{< small-heading id="createDirectStream-v3ioParams-spark-stream-start-position-cfg-properties" >}}Start-Position Configuration Properties{{< /small-heading >}}

  You can optionally set the following properties to determine the start position for the new Spark input stream:

  - <a id="property-spark-streaming-v3io-streamStartPosition"></a><def>spark.streaming.v3io.streamStartPosition</def> &mdash; the stream start-position type.

      - **Property Type:** String
      - **Default Value:** `"latest"`

      The following property values are supported.
      The start-position information applies to each of the shards in the source V3IO streams (see <paramname>[streamNames](#createDirectStream-param-streamNames)</paramname>):

      - <a id="seek-type-earliest"></a><def>"earliest"</def> &mdash; start at the location of the earliest ingested record in the shard.

      - <a id="seek-type-latest"></a><def>"latest"</def> (default) &mdash; start at the end of the shard.

      - <a id="seek-type-time"></a><def>"time"</def> &mdash; start at the location of the earliest ingested record in the shard beginning at the base time configured in the <opt>[spark.streaming.v3io.streamStartTimeMS](#property-spark-streaming-v3io-streamStartTimeMS)</opt> property.
          For shards without a matching record ingestion time (i.e., if all records in the shard arrived before the configured base time) the start position is set to the end of the shard.

      - <a id="seek-type-sequence"></a><def>"&lt;record sequence number&gt;"</def> &mdash; start at the location of the record whose sequence number matches the property value (for example, `"1"`).
          For shards without a matching record sequence number, the start position is set to the end of the shard.

    - <a id="property-spark-streaming-v3io-streamStartTimeMS"></a><def>spark.streaming.v3io.streamStartTimeMS</def> &mdash; the base time for a time-based stream start position (<opt>[spark.streaming.v3io.streamStartPosition](#property-spark-streaming-v3io-streamStartPosition)</opt>=`"time"`), as a Unix timestamp in milliseconds.
      For example, `1511260205000` sets the base time for determining the start position to 21 Nov 2017 at 10:30:05 AM UTC.

      - **Property Type:** Long
      - **Default Value:** `0` (Unix Epoch &mdash; 1 Jan 1970 at 00:00:00 UTC)
  {{< /param-doc >}}

  <!-- streamNames -->
  {{< param-doc name="streamNames" id="createDirectStream-param-streamNames" >}}
  A set of one or more fully qualified V3IO stream paths of the format  <nobr>`v3io://<container name>/<stream path>`</nobr> &mdash; where `<container name>` is the name of the stream's parent container and `<stream path>` is the path to the stream within the specified container.
  For example, `v3io://mycontainer/mydata/metrics_stream`.

  {{< note >}}
  All streams paths in the <paramname>streamNames</paramname> set must point to existing [V3IO streams](#v3io-streams-note) that reside in the same container.
  {{< /note >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (26.11.18) See info in DOC IG-7946,
    including regarding the decision to stop documenting the alternative method
    of configuring the container-id configuration property, starting with
    v1.9.5. In previous releases, this was the only documented method - first
    because I wasn't aware of the fully qualified streamNames paths method and
    later because we found this method works only for the default container
    (see bugs IG-8763 and IG-9563). In the v1.9.5 release notes, we documented
    that the addition of the new method (as if it was added in this release,
    even though it existed in the code before but with a bug) and we documented
    the container-id configuration method as deprecated. -->
  {{< /comment >}}

  {{< param-type >}}`Set[String]`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- messageHandler -->
  {{< param-doc name="messageHandler" id="createDirectStream-param-messageHandler" >}}
  An optional record handler function for converting a stream record of type <api>{{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/recordandmetadata.md" text="RecordAndMetadata" >}}</api> into the desired input-stream record type, which is indicated by the handler's return value (<paramname>R</paramname>).
  The default record handler returns the record's data (also known as the record payload or value), decoded as the value type of the <api>RecordAndMetadata</api> class instance (<paramname>V</paramname>).

  {{< param-type >}}A record-handler function
  ```scala
messageHandler: RecordAndMetadata[V] =&gt; R
  ```
  {{< /param-type >}}
    {{< comment >}}<!-- [InfraInfo] [ci-shortcode-new-para-in-out-param-type]
      [sharonl] If the entire param-type shortcode call is not on one line, the
      content of the shortcode call appears in the output as a new para (within
      the list item) after the bullet and default text. In this instance we
      can't use a single shortcode-call line because of the code block. -->
    {{< /comment >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="params" pre="Type " id="createDirectStream-tparams" >}}

<ul>
  <!-- V -->
  {{< scala-type-param-doc name="V" id="createDirectStream-tparam-V" >}}
  the type of the input stream's record data ("value").
  {{< /scala-type-param-doc >}}

  <!-- VD -->
  {{< scala-type-param-doc name="VD" id="createDirectStream-tparam-VD" >}}
  the decoder class to use for converting the record data into the specified type &mdash; the input stream's value type, as set in the method's {{< fmt "paramname" >}}[V](#createDirectStream-tparam-V){{< /fmt >}} type parameter.
  See {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/encoding-decoding-types/" >}}.
  {{< /scala-type-param-doc >}}

  <!-- R -->
  {{< scala-type-param-doc name="R" id="createDirectStream-tparam-R" >}}
  the input stream's record type, which is the type of the record handler's return value (see {{< fmt "paramname" >}}[messageHandler](#createDirectStream-param-messageHandler){{< /fmt >}}).
  This type parameter is applicable only when providing a record handler in the method call.
  The default input-stream record type is the decoding type of the record data, as set in the method's {{< fmt "paramname" >}}[V](#createDirectStream-tparam-V){{< /fmt >}} type parameter.
  {{< /scala-type-param-doc >}}
    {{< comment >}}
    <!-- [ci-fmt-shortcode-in-shortcode-call-content-scala-type-param] -->
    {{< /comment >}}
</ul>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="retval" id="createDirectStream-retval" >}}

Returns an instance of a Spark input stream (<api>[InputDStream]({{< getvar v="spark.streaming_scala_api_base.full" >}}.dstream.DStream)</api>), which you can use with the Spark Streaming API to consume stream records in the specified input-stream record type (see the method's <paramname>[R](#createDirectStream-tparam-R)</paramname> type parameter).

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="examples" id="createDirectStream-examples" >}}

<!-- ---------------------------------------- -->
#### Example 1 {#example-1}

Create a Spark input stream for "/DriverStream" and "/Passengers" V3IO streams in a "mycontainer" container using the <api>{{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/recordandmetadata.md" a="payloadWithMetadata" text="RecordAndMetadata.payloadWithMetadata" >}}</api> method as the record handler.
The input stream will return <api>{{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/payloadwithmetadata.md" text="PayloadWithMetadata" >}}</api> record objects that contain string-decoded record data and related metadata:

```scala
val batchInterval = Seconds(1)
val sparkConf = new SparkConf()
                .setAppName("My Car Streams Application")
val ssc = new StreamingContext(sparkConf, batchInterval)
val cfgProperties = Map.empty[String, String]
val streamNames = Set("/DriverStream", "/Passengers")
 
val carsInputDStream = {
    val recordHandler = (rmd: RecordAndMetadata[String]) =>
        rmd.payloadWithMetadata()

    V3IOUtils.createDirectStream[String, StringDecoder,
        PayloadWithMetadata[String]](
        ssc,
        cfgProperties,
        streamNames,
        recordHandler)
}
```

<!-- ---------------------------------------- -->
#### Example 2 {#example-2}

Create a Spark input stream for "/WebClicks" and "/ServerLogs" V3IO streams within a "/Web/Streams/" directory in a "mycontainer" container, starting at the earliest ingested record found in each of the stream shards.
Use the default record handler to create an input stream that returns the record data as a string:

```scala
val batchInterval = Seconds(2)
val sparkConf = new SparkConf()
                .setAppName("My Web Streams Application")
val ssc = new StreamingContext(sparkConf, batchInterval)
val cfgProperties = Map("spark.streaming.v3io.streamStartPosition" -> "earliest")
val streamNames =
    Set("/Web/Streams/WebClicks", "/Web/Streams/ServerLogs")

val webInputDStream = {
    V3IOUtils.createDirectStream[String, StringDecoder](
    ssc,
    cfgProperties,
    streamNames)
}
```

