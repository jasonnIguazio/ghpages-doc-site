---
title:  "Overview of the NoSQL Scala API"
keywords: "nosql scala api, nosql databases, nosql dbs, nosql tables, tables, table items, attributes, coutner attributes, conditional update, add items, update items"
menu:
  main:
    name:         "Overview"
    parent:       "nosql-scala-api"
    identifier:   "nosql-scala-api-overview"
    weight:       5
---

The {{< product lc >}}'s NoSQL Scala API provides access to the NoSQL database service, which enables storing and consuming data in a tabular format &mdash; see {{< xref f="data-layer/nosql/" >}}.
Due to the {{< product lc >}}'s unified data model, you can use this API to fetch and update any object in the system.

This reference describes components of this API, which enable you to update an existing table item or add a new item &mdash; including support for conditional updates, different update modes, and counter attributes.
For information on additional functions of this API, contact your {{< company >}} representative.

The NoSQL Scala API is provided in the <pkg>io.iguaz.v3io.kv</pkg> package.

