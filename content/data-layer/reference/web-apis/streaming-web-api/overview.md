---
title:      "Overview of the Streaming Web API"
linktitle:  "NoSQL Web API Overview"
description:  "Overview of the Iguazio MLOps Platform Streaming API"
keywords: "streaming web api, streaming, streams, stream shards, shards, sharding, stream records, stream partitions, partitioning, stream consumption, CreateStream, create stream, DescribeStream, describe stream, UpdateStream, update stream, PutRecords, add records, Seek, stream seek, seek records, stream delete, data-service web apis"
menu:
  main:
    name:         "Overview"
    parent:       "streaming-web-api"
    identifier:   "streaming-web-api-overview"
    weight:       5
---

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

The {{< product lc >}}'s Streaming Web API enables working with data in the {{< product lc >}} as streams.
For more information, see {{< xref f="data-layer/stream/" >}}.

-   To create and configure a new stream, use <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/createstream.md" >}}</api>.

-   To get the description of a stream's configuration, use <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/describestream.md" >}}</api>.

-   To update a stream's configuration (change its shard count), use <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/updatestream.md" >}}</api>.

-   To add records to a stream, use <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" >}}</api>.

    You can optionally control the assignment of records to specific shards.
    For more information, see {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}.

-   To retrieve a specific location within a shard, to be used in a subsequent <api>GetRecords</api> operation, use <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" >}}</api>.

-   To retrieve records from a specific stream shard, use <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/getrecords.md" >}}</api>.

    <api>GetRecords</api> receives as a parameter the location within the specified stream shard from which to begin consuming records.
    Use the <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" >}}</api> operation to retrieve the location of the first record to consume, according to the desired location type.
    <api>GetRecords</api> returns the location of the next record in the shard to consume, which you can use as the location parameter of a subsequent <api>GetRecords</api> operation.
 For more information, see {{< xref f="data-layer/stream/" a="stream-record-consumption" text="Stream Record Consumption" >}}.

{{< condition filter="frames_stream" filterval="true" >}}
-   To delete a stream, either delete (remove) the stream directory by using a file-system command, or use the <func>{{< xref filter="frames_stream" filterval="true" f="data-layer/reference/frames/stream/delete.md" text="delete" >}}</func> client method of the {{< getvar v="product.frames.name.long_lc" >}} streaming backend.
    See {{< xref f="data-layer/stream/" a="deleting-streams" >}}.
{{< /condition >}}
{{< condition filter="frames_stream" filterval="false" >}}
-   To delete a stream, delete (remove) the stream directory by using a file-system command.
    See {{< xref f="data-layer/stream/" a="deleting-streams" >}}.
{{< /condition >}}
{{< comment >}}<!-- [FRAMES-STREAMING-NO-SUPPORT] [IntInfo] See info in
  frames/stream.IGNORED/_index.html, -->
{{< /comment >}}

The Streaming Web API is part of the data-service web APIs and conforms to the related structure and syntax rules &mdash; see {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}}
- {{< xref f="data-layer/reference/web-apis/security.md" >}}
- {{< xref f="data-layer/stream/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="streaming-web-api" text="Streaming Web API software specifications and restrictions" >}}

