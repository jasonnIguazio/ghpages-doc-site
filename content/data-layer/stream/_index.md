---
title: 'Working with Data Streams ("Streaming")'
description: "streams and data streaming using different streaming APIs"
keywords: "streaming, streams, stream shards, shards, sharding, stream partititons, partitioning, stream records, record metadata, record sequence number, PutRecords, GetRecords, scalability, stream consumption, parallel consumption, record ingestion, stream delete, stream producer, stream consumer, stream seek, seek records, get records, stream retention, retention period, terminology"
layout: "single"
menu:
  main:
    name:       "Streams"
    parent:     "data-layer"
    identifier: "data-layer-stream"
    weight:     60
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces concepts/streams.md.
- [SITE-RESTRUCT-P3] [IntInfo] (sharonl) TODO: Move the content of this page
  into a child working-with-streams.md page or section; split the current
  content into multiple pages; and add API-specific sections for the NoSQL APIs
  (at the first stage these can have short text that link to related reference
  and other documentation such as in data-ingestion-and-preparation.md).
  In preparation for these changes, I used stream/_index.md instead of
  streams.md, even though there's currently only one NoSQL data-layer page.
  [InfraInfo] I used `layout: "single"` to eliminate the auto section
  menu-pages links.
  [TODO-INFRA] 
  - Update both internal ghpages-ghpages-doc-site and external references and add redirect
    rules for modified URLs.
  - Edit the front matter, including to change the `layout` value from "single"`
    to `section-list`.
    [InfraInfo] These are the front-matter keywords that I had initially
    prepared for the data-layer/stream/_index.md:
keywords: "data streams, streams, streaming, streaming api"
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from notebook
  data-ingestion-and-preparation/v3io-streams.ipynb); v3io-streams.ipynb also
  includes specific links to the #stream-sharding-and-partitioning anchor.
  (Until then and for previous tutorials releases, we'll have URL redirect
  rules as part of the restructured-site publication.) TODO: Consider linking
  to the parent stream/ index page instead.
- [TODO-SITE-RESTRUCT-P2] TODO: Move some of the content to separate pages.
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from data-ingestion-and-preparation/v3io-streams.ipynb);
  v3io-streams.ipynb also includes specific links to the
  #stream-sharding-and-partitioning anchor. -->
{{< /comment >}}
{{< comment >}}<!-- [FRAMES-STREAMING-NO-SUPPORT] [IntInfo] See info regarding
  the frames_stream filter uses in this file in
  data-layer/reference/frames/stream.IGNORED/_index.html. -->
{{< /comment >}}
{{< comment >}}<!-- TODO: [sharonl] Consider moving some of the content to a
  separate streaming workflow section (maybe with code examples, although still
  a generic section). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

<a id="definition-stream"></a>**Streams** are used for storing sequenced information that is rapidly and continuously produced and consumed.
Stream data is stored as a continuous series of data <a id="definition-record"></a>**records**, which can include any type of data.
The {{< product lc >}} treats the data as a binary large object (blob).

For optimal performance and scalability, the {{< product lc >}} allows dividing a stream into multiple **shards**, so that records are ingested and consumed sequentially per shard.
See the detailed explanation in the [Stream Sharding and Partitioning](#stream-sharding-and-partitioning) section in this document.

After a data container is created and configured, you can create one or more streams in the container.
The following image shows a container with Web Clicks and Server Logs streams:

<p align="center">
<img src="/images/streams_in_container.png" alt="Diagram of streams in a data container"/>
</p>

A **producer** adds records to a stream. For example, an IoT device that sends sensor data to the {{< product lc >}} is a producer.
A **consumer** retrieves and processes stream data sequentially.

Streams are identified by their user-assigned names, which must be unique within the parent container's relative stream path.

When creating a stream, you also set its retention period. All stream records are guaranteed to be available for consumption during the stream's retention period. After this period elapses, existing records might be deleted to make room for new records, starting from the earliest ingested records.

{{< condition filter="frames_stream" filterval="true" >}}
You can manage and access stream data in the {{< product lc >}} by using the streaming {{< xref filter="frames_stream" filterval="true" f="data-layer/reference/frames/stream/" textvar="product.frames.name.lc" >}}, {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/" text="Spark" >}}, or {{< xref f="data-layer/reference/web-apis/streaming-web-api/" text="web" >}} APIs.
{{< /condition >}}
{{< condition filter="frames_stream" filterval="false" >}}
You can manage and access stream data in the {{< product lc >}} by using the {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/" text="Spark" >}} or {{< xref f="data-layer/reference/web-apis/streaming-web-api/" text="web" >}} APIs.
{{< /condition >}}

{{< comment >}}<!-- [IntInfo] (sharonl) See the
  "stream-no-data-backup-n-recovery" restriction in the sw-specifications.md
  specs page and the related internal info regarding refraining from mentioning
  the restriction here. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Terminology Comparison {#terminology-comparison}

The following table compares the {{< product full >}}'s streaming terminology with that of similar third-party tools and the {{< product lc >}}'s file interface:

{{< igz-figure src="/images/streaming_terminology_comparison.png" alt="Streaming terminology-comparison table" width="700" >}}

<!-- //////////////////////////////////////// -->
## Stream Sharding and Partitioning {#stream-sharding-and-partitioning}

For optimal performance and to enable scalability of consumers, records are best distributed among <a id="definition-shard"></a>**shards**, which are uniquely identified data sets within a stream.<br/>
When a record is added to a stream, it is assigned to a specific shard from which it can subsequently be retrieved.
Sequencing of records by their ingestion time (the time the data arrived at the {{< product lc >}}) is guaranteed within each shard but not across shards.

By default, the {{< product lc >}} handles assignment of records to shards internally, using the Randomized Round Robin (RRR) algorithm.
However, the producer can select to assign new stream records to specific shards by providing the shard ID for each record.
Alternatively, the producer can select to use custom partition keys to influence the designation of records to shards: as explained in the following [Record Metadata](#record-metadata) section, the producer can optionally provide partition-key metadata for new records.
The {{< product lc >}} uses a hash function to map a record's partition key (if provided) to a specific shard, so that in the context of a fixed shard structure all records with the same key are mapped to the same shard (subject to the documented exceptions).
This mechanism allows you to group similar records together and ensure a
specific sequence of record consumption.
If both a shard ID and a
partition key are provided, the record is assigned based on the shard ID
and the partition key does not affect the shard assignment.

When creating a stream, you must configure its shard count (the number
of shards in the stream).
You can increase the shard count at any time, but you cannot reduce it.
From the {{< product lc >}}'s perspective, there is virtually no cost to creating even thousands of shards.<br/>
Note that after increasing a stream's shard count, new records with a previously used partition key are assigned either to the same shard that was used for this partition key or to a new shard. All records with the same partition key that are added after the shard-count change will be assigned to the same shard (be it the previously used shard or a new shard).

The following diagram depicts a {{< product lc >}} data stream with sequenced shard records: 

{{< igz-figure src="/images/platform_stream_diagram.png" alt="Diagram of a stream with shards and sequenced records in each shard" >}}

<!-- //////////////////////////////////////// -->
## Record Metadata {#record-metadata}

The {{< product lc >}} returns to the consumer, together with the records, metadata for each record.
The metadata includes the record's sequence number and ingestion time, as well as the following optional user metadata if provided by the producer during the record submission:

<dl>
    <dt>Client information</dt>
    <dd>Custom client information, which is opaque to the {{< product lc >}} (provided as a blob).
        You can use this metadata, for example, to save the data format of a record, or the time at which a sensor or application event was triggered.
    </dd>
    <dt>Partition key</dt>
    {{< dd >}}
A partition key to associate with the record.
Records with the same partition-key values are typically assigned to the same shard (unless you override the partition key with a shard ID) &mdash; see [Stream Sharding and Partitioning](#stream-sharding-and-partitioning).
    {{< /dd >}}
</dl>

<!-- //////////////////////////////////////// -->
## Stream Record Consumption  {#stream-record-consumption}

Multiple consumer instances can consume data from the same stream.
A consumer retrieves records from a specific shard.
It is recommended that you distribute the data consumption among several consumer instances ("workers"), assigning each instance one or more shards.

For each shard, the consumer should determine the location within the shard from which to begin consuming records.
This can be the earliest ingested record, the end of the shard, the first ingested record starting at a specific time, or a specific record identified by its sequence number (a unique record identifier that is assigned by the {{< product lc >}} based on the record's ingestion time).
The consumer first uses a seek operation to obtain the desired consumption location, and then provides this location as the starting point for its record consumption.
The consumption operation returns the location of the next record to consume within the shard, and this location should be used as the location for a subsequent consumption operation, allowing for sequential record consumption.

The following diagram demonstrates records ingestion into multiple stream shards (for example, using the Streaming Web API {{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" text="<api>PutRecords</api>" >}} operation), and records consumption from a specific shard (for example, using the Streaming Web API {{< xref f="data-layer/reference/web-apis/streaming-web-api/getrecords.md" text="<api>GetRecords</api>" >}} operation):

{{< igz-figure src="/images/platform_stream_multi_shard_putrecords_n_getrecords.png" alt="Diagram of stream-records multi-shard ingestion with PutRecords and consumption with GetRecords" >}}

<!-- //////////////////////////////////////// -->
## Deleting Streams {#deleting-streams}

{{% delete-object stream %}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/" >}}
    {{< condition filter="frames_stream" filterval="true" >}}
    - {{< xref filter="frames_stream" filterval="true" f="data-layer/reference/frames/stream/" >}}
    {{< /condition >}}
    - {{< xref f="data-layer/reference/web-apis/streaming-web-api/" >}}
    - {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/" >}}

