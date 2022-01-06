---
title: "Data Containers"
description: "Learn about the Iguazio MLOps Platform's data containers and how to access data in containers."
keywords: "data containers, containers, predefined containers, container directories, data directories, data layer, data store,, distributed file system, dsf, file system, platform data, data access"
layout: "section-list"
menu:
  main:
    parent:     "data-layer"
    identifier: "data-containers"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] This section replaces content previously
  found in concepts/containers-collections-objects.md,
  tutorials/getting-started/fundamentals/#data-containers,
  tutorials/getting-started/containers/#overview, and
  intro/ecosystem/data-fabric.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] See info in data-layer/_index.md.
-->
{{< /comment >}}

Data is stored as within **data containers** in the distributed file system (DFS) of the {{< product lc >}}'s data layer ("data store").
A single container can be used to store different types of data &mdash; NoSQL ("key-value"), time-series, stream data, or simple data objects (files).
The data is stored as simple objects with attribute metadata, and can be grouped into collections according to the data type.
For more information, see {{< xref f="data-layer/objects/" >}}.
As explained in the {{< xref f="data-layer/" text="data-layer overview" >}}, you can store and access container data using a variety of {{< xref f="data-layer/apis/" text="APIs" >}}, which accommodate multiple data formats, without duplicating the data.

All {{< product lc >}} instances have some {{< xref f="data-layer/containers/predefined-containers.md" text="predefined containers" >}}, and you can create additional custom containers.
The best practice is to have a dedicated container per application.
You can also organize data within containers in directories (both in the predefined and custom containers).
To learn how to create and delete data containers and container directories, browse their contents, and ingest and consume files, see {{< xref f="data-layer/containers/working-with-containers.md" >}}.

{{< note id="sw-specs-note" >}}
See the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="data-elements" text="data-elements software specifications and restrictions" >}} for container-related restrictions.
{{< /note >}}

