---
title:      "Overview"
linktitle:  "Frames TSDB-Backend Overview"
keywords: "frames tsdb backend overview, frames tsdb overview, frames tsdb client methods, frames tsdb methods, frames tsdb api, frames tsdb, frames time-series, time-series databsaes, time-series"
layout: "section-list"
menu:
  main:
    name:       "Overview"
    parent:     "frames-apis-tsdb"
    identifier: "frames-apis-tsdb-overview"
    weight:     10
---

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

The TSDB backend of the {{< getvar v="product.frames.name.lc" >}} API supports <api>Client</api> methods and commands for working with time-series databases (TSDBs).
For more information, see also the {{< xref f="data-layer/tsdb/" >}}.

-   To create a new TSDB table, use the <func>{{< xref f="data-layer/reference/frames/tsdb/create.md" text="create" >}}</func> method.

-   To add (ingest) items to a TSDB table, use the <func>{{< xref f="data-layer/reference/frames/tsdb/write.md" text="write" >}}</func> method.

-   To retrieve (consume) items from a TSDB table, use the <func>{{< xref f="data-layer/reference/frames/tsdb/read.md" text="read" >}}</func> method.

-   To delete a TSDB table or specific table items, use the <func>{{< xref f="data-layer/reference/frames/tsdb/delete.md" text="delete" >}}</func> method.
    You can also delete a TSDB table or specific items by using the {{< xref f="data-layer/tsdb/tsdb-cli.md" a="tsdb-delete" text="TSDB CLI" >}} or a file-system command.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/tsdb/" >}} 
- {{< xref f="data-layer/reference/frames/tsdb/" >}}
- {{< xref f="data-layer/reference/frames/overview.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb" text="TSDB sofware specifications and restrictions" >}}

