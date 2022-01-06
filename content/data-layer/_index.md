---
title:  "Data Layer"
description: "The Iguazio MLOps Platform's multi-model data layer, including NoSQL (KV), TSDB, streams, and data objects."
keywords: "data layer, data frabric, data store, multi-model data layer, unified data model, nosql, key value, kv, streaming, streams, tsdb, time series, simple objects, data objects, objects, s3, files:"
layout: "section-list"
menu:
  main:
    identifier: "data-layer"
    weight:     30
---
{{< comment >}}<!-- [SITE-RESTRUCT] The content on this page replaces content
  previously found in intro/ecosystem/data-fabric.md and
  concepts/containers-collections-objects.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from notebooks
  data-ingestion-and-preparation/ spark-sql-analytics.ipynb, v3io-kv.ipynb,
  v3io-objects.ipynb, and v3io-streams.ipynb); spark-sql-analytics.ipynb links
  to the #sharding-n-sorting-keys anchor. Some of the old referenced content is
  now found in the data-layer/containers/_index.md,
  data-layer/objects/_index.md, and data-layer/objects/object-names-and-keys.md.
  (Until then and for previous tutorials releases, we'll have URL redirect
  rules as part of the restructured-site publication.)
  TODO: After we fix the references, add [c-ext-ref] info comments on the
  relevant pages to list the external referencing files.
-->
{{< /comment >}}

The {{< product full >}} has a built-in multi-model data layer (a.k.a. "data fabric", "data store", or "database") for storing and analyzing various types of data structures &mdash; such as NoSQL ("key-value") tables, time-series databases (TSDB), data streams, binary objects, and files.
Data is stored as {{< xref f="data-layer/objects/" text="objects" >}} within {{< xref f="data-layer/containers/" text="containers" >}}.
The data objects can represent any supported data type (such as files, table items, or stream records), and objects can be grouped into type-specific collections (such as stream shards, NoSQL tables, or file-system directories).

The {{< product lc >}} exposes and supports multiple industry-standard and industry-compatible programming interfaces that allow you to perform high-level data manipulation for the supported data formats.
You can optionally switch between different APIs for accessing the same data; for example, you can ingest data through one interface and consume it through another interface, depending on you preferences and needs.
You can often also access the same data in different formats.
The {{< product lc >}}'s unique unified data model eliminates the need for multiple data stores, constant synchronization, complex pipelines, and painful extract-transform-load (ETL) processes.
For more information, see {{< xref f="data-layer/apis/" >}}.

