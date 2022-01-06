---
title:      "Overview of the Frames Streaming Backend"
linktitle:  "Frames Streaming-Backend Overview"
keywords: "frames streaming backend overview, frames stream backend overview, frames streaming overview, frames stream overview, frames streaming client methods, frames stream client methods, frames streaming methods, frames stream methods, frames streaming api, frames stream api, frames streaming, streaming, streams"
layout: "section-list"
menu:
  main:
    name:       "Overview"
    parent:     "frames-apis-stream"
    identifier: "frames-apis-stream-overview"
    weight:     10
---

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

The streaming backend of the {{< getvar v="product.frames.name.lc" >}} API supports <api>Client</api> methods and commands for working with data as streams.
For more information, see {{< xref f="data-layer/stream/" >}}.

-   To create a new stream, use the <func>{{< xref f="data-layer/reference/frames/stream/create.md" text="create" >}}</func> method.

-   To add (ingest) records to a stream, use the <func>{{< xref f="data-layer/reference/frames/stream/write.md" text="write" >}}</func> method.

    To add a single record to a stream, you can also use the {{< xref f="data-layer/reference/frames/stream/execute.md" text="execute" a="cmd-put" text="<cmd>put</cmd>" >}} command of the <func>{{< xref f="data-layer/reference/frames/stream/execute.md" text="execute" >}}</func> method.
    This is more efficient than adding a single record with the <func>write</func> method, because the <cmd>put</cmd> command is processed without using DataFrames.
    The command also allows you to optionally add custom record metadata and provide a partition key.
    {{< comment >}}<!-- [IntInfo] (sharonl) 14.1.20) At Dina's request, I
      removed "to influence the shard assignment" after the reference to the
      partition-key parameter because she said that without more info it's more
      confusing than helpful; we provide the necessary info in the description
      of the `execute` > `put` command that the overview doc links to. -->
    <!-- [c-frames-stream-write-put-api-changes] [IntInfo]
      (sharonl) (6.1.20) I asked R&D to consider adding optional client-info
      and partition-key parameters also to the `write` method for the stream
      backend, as well as to add a sharding-ID parameter both to the `write`
      method and to the `put` command of the `execute` method. See the "Frames
      API Changes" email thread, copied in DOC IG-12272. If and when such
      change are made, we'll also need to edit the text in this bullet. -->
    {{< /comment >}}

-   To retrieve (consume) records from a specific stream shard, use the <func>{{< xref f="data-layer/reference/frames/stream/read.md" text="read" >}}</func> method.

-   To delete a stream, use the <func>{{< xref f="data-layer/reference/frames/stream/delete.md" text="delete" >}}</func> method.
    You can also delete a stream by using a file-system command.
    See {{< xref f="data-layer/stream/" a="deleting-streams" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/stream/" >}}
- {{< xref f="data-layer/reference/frames/overview.md" >}}

