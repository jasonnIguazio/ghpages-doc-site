---
title:      "V3IO Frames Python API Reference"
linktitle:  "Frames API Reference"
keywords: "frames apis, api reference, v3io frames, frames, frames reference, dataframes, nosql, key-value, kv, tsdb, streaming, python"
description:  "Iguazio V3IO Frames Python API references (NoSQL, TSDB, and streaming)"
layout: "section-list"
menu:
  main:
    name:       "Frames API (Python)"
    parent:     "data-layer-references"
    identifier: "frames-apis"
    Post:       "Iguazio's multi-model open-source V3IO Frames Python client API for working with NoSQL and time-series data"
    weight:     10
---
{{< comment >}}<!-- [ci-no-shcd-in-front-matter-frames] [InfraInfo] (sharonl)
  The title should use the product data variable key frames.name.long_tc,
  and the Post text should also use data variables. (I tried using shortcode
  calls - e.g., {{< getvar v="product.frames.name.full" >}} (in single quotes) -
  or partial syntax - such as {{- $.Site.Data.vars.product.frames.name.full -}}
  - but it appears as-is in the output despite the use of `markdownify` in the
  menu-pages.html theme layout partial. -->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] This section replaces
  reference/api-reference/spark-apis/spark-streaming-integration-api/.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the references to this section and contained pages from the
  v3io/tutorials doc (from data-ingestion-and-preparation/ frames.ipynb and
  v3io-kv.ipynb) and from the v3io/frames README.md file. (Until then and for
  previous tutorials releases, we'll have URL redirect rules as part of the
  restructured-site publication.)
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This documentation
  section and specific pages in this section are referenced also from external
  sources such as the v3io/tutorials notebooks (currently from the
  data-ingestion-and-preparation/ notebooks frames.ipynb and v3io-kv.ipynb) and
  from the v3io/frames README file. -->
<!-- [FRAMES-STREAMING-NO-SUPPORT] [IntInfo] See info regarding the
  frames_stream filter uses in this file in
  frames/stream.IGNORED/_index.html. TODO: When we support Frames streaming,
  also add it to the Post front-matter text. -->
<!-- [c-tsdb-unsupported-tp-features-frames] [IntInfo] (sharonl) (5.4.20) At
  Orit and Adi's request, I edited the latest-release v2.5.4 Frames doc to
  remove documentation of Tech Preview TSDB features (which were planned to be
  Tech Preview also in the upcoming v2.8.0 release) that Orit decided to remove
  from the documentation. I backed up the current Tech Preview doc, before this
  doc update, in as the frames/tsdb/ reference directory, as
  frames/tsdb.v2.5.4.removed_tech_preview_features.IGNORED - as we might need
  to return some of the doc in a future release (some of the removed features
  have been marked as testing candidates and some haven't) and using doc
  filters to filter out this doc would make the doc source very cumbersome and
  hard to work with. (17.5.20) I renamed the file for v2.8.0 to
  frames/tsdb.undocumented_tech_preview_features.IGNORED and edited it (see
  Requirement IG-14367 / DOC IG-14369 for the related v2.8.0 API changes).
  (IGNORED directories are excluded from the ghpages-doc-site build).
  (The ignored-doc changes were in the TSDB `create` & `read` references.
  The overview and `write` and `delete` references didn't change.) See the
  "Tech Preview Documentation" email thread from Apr 2020.
  [TECH-PREVIEW-FRAMES-TSDB-AGGR-WINDOW] [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR]
  [TECH-PREVIEW-TSDB-SQL-QUERIES] [TECH-PREVIEW-TSDB-INTERPOLATION]
  [TECH-PREVIEW-TSDB-GROUP_BY] -->
{{< /comment >}}

Browse reference documentation for version {{< verkey k="frames.version_short" >}} of the {{< getvar v="product.frames.name.full" >}} ("{{< getvar v="product.frames.name.lc" >}}") multi-model open-source Python data-access library for working with NoSQL (key-value){{< condition filter="frames_stream" filterval="true" >}}, stream,{{< /condition >}} and time-series (TSDB) data in the data store of the {{< product full >}}.

