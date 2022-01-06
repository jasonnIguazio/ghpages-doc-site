---
title: "Data Objects"
description: "Learn about data objects (items), object attributes, and data collections in the Iguazio MLOps Platform."
keywords: "data objects, objects, data items, items, simple objects, data files, files, data attributes, attributes, objet metadata, metadata, data collectons, collections, nosql items, nosq, key-value, kv, data streams, streams, stream records, records, time-series, tsdb, directories"
layout: "section-list"
menu:
  main:
    parent:     "data-layer"
    identifier: "data-objects"
    weight:     20
---
{{< comment >}}<!-- [SITE-RESTRUCT] This section replaces content previously
  found in concepts/containers-collections-objects.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] See info in data-layer/_index.md.
-->
{{< /comment >}}

Data in the {{< product lc >}} is stored as **data objects** (a.k.a. **data items**) within {{< xref f="data-layer/containers/" text="data containers" >}} in the {{< product lc >}}'s data layer ("data store").
The {{< product lc >}} uses **{{< xref f="data-layer/objects/attributes.md" text="object attributes" >}}** to store object-metadata information.
You can save and access data objects of any type &mdash; such as files, binary large objects (blobs), table items, and stream records.
You can also group data objects of any type into <a id="definition-collection"></a>**collections** &mdash; such as {{< xref f="data-layer/stream/" a="definition-shard" text="stream shards" >}}, {{< xref f="data-layer/nosql/" a="overview" text="NoSQL tables" >}}, or file-system directories &mdash; and perform high-level type-specific data manipulation.

{{< note id="sw-specs-note" >}}
See the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="data-elements" text="data-elements software specifications and restrictions" >}} for object-related restrictions.
{{< /note >}}

