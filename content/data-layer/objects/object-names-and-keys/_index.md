---
title: "Object Names and Primary Keys"
description: "Learn about object names and primary keys in the Iguazio MLOps Platform."
keywords: "object names, object keys, object primary key, simple primary key, compound primary key, sharding key, sorting key, object-name restrictions, attribute-name restrictions, attribute names, naming restrictions, object attributes, item attributes, attributes, data slices, slices, shards, buckets, object metadata, metadata, objects, simple objects, files, items, nosql items, nosql, nosql tables, spark dataframes, spark, dataframes, nosql dataframe, v3io frames, frames, presto, range scan, read optimization, workload-distribution optiomization, workload distribution, performance optimization, performance"
nosectiontoc: true
menu:
  main:
    parent:     "data-objects"
    identifier: "object-names-and-keys"
    weight:     20
---
{{< comment >}}<!-- [SITE-RESTRUCT] This section replaces content previously
  found in concepts/containers-collections-objects.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] See info in data-layer/_index.md.
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Introduction {#intro}

When adding a new data object to the {{< product lc >}}, you provide the object's **name** or the required components of the name.
The {{< product lc >}} stores the object name in the <attr>__name</attr> system attribute, which is automatically created for each object, and uses it as the value of the object's **primary key**, which uniquely identifies the object within a collection (such as a NoSQL table).

<!-- //////////////////////////////////////// -->
## Sharding and Sorting Keys {#sharding-n-sorting-keys}
{{< comment >}}<!-- [IntInfo] (sharonl)
- NOTE: This doc section is referenced from the v3io/tutorials
  getting-started/spark-sql-analytics.ipynb Jupyter notebook starting from
  V3IO Tutorials v2.3.0 / platform v2.3.0 (which uses v3io/tutorials v2.3.3).
- (6.1.19) Orit said not to document this specifically for range scan or only
  in the NoSQL documentation. See the information in the v1.9 range-scan Tech
  Preview DOC IG-7260 (web API) and DOC IG-7459 (big data - Spark & Presto) and
  big-data even-distribution ingestion Tech Preview DOC - IG-9023, and the
  v2.0.0 range-scan official-support DOC IG-9215. See also the AWS DynamoDB
  "Partitions and Data Distribution" documentation
  (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html)
  and our best-practices-primary-keys-n-workload-distribution.md tutorial
  (guide) and the AWS DynamoDB documentation mentioned in its internal comments.
-->
{{< /comment >}}

Primary keys affect the way that objects are stored in the {{< product lc >}}, which in turn affects performance.
The {{< product lc >}} supports two types of object primary keys:

<dl>
  <dt id="simple-primary-key">Simple primary key</dt>
  {{< dd >}}
  A simple primary key is composed of a single logical key whose value uniquely identifies the object.
  This key is known as the object's **sharding key**.
  For example, a collection with a simple username primary key might have an object with the primary-key value "johnd", which is also the value of the object's sharding key.
  {{< /dd >}}

  <dt id="compound-primary-key">Compound primary key</dt>
  {{< dd >}}
  A compound primary key is composed of two logical keys &mdash; a **sharding key** and a **sorting key** &mdash; whose combined values uniquely identify the object.
  The value of a compound primary key is of the format `<sharding-key value>.<sorting-key value>`.
  All characters before the leftmost period in an object's primary-key value define the object's sharding-key value, and the characters to the right of this period (if exist) define its sorting-key value.
  For example, a collection with a compound primary key that is made up of a username sharding key and a date sorting key might have an object with the sharding-key value "johnd", the sorting-key value "20180602", and the combined unique compound primary-key value "johnd.20180602".
  {{< /dd >}}
</dl>

The {{< product lc >}} divides the physical data storage into multiple units &mdash; data **slices** (also known as data **shards** or **buckets**).
When a new data object is added, a hash function is applied to the value of its sharding key and the result determines on which slice the object is stored.
All objects with the same sharding-key value are stored in a cluster on the same slice, sorted in ascending lexicographic order according to their sorting-key values (if exist).
{{< comment >}}<!-- [IntInfo] (sharonl) (3.1.19) Golan told me that we also
  sort the objects by their sharding keys, but Orit said this isn't true and it
  was agreed in a f2f with both of them not document this. (The similar AWS
  DynamoDB "Partitions and Data Distribution" doc -
  https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html
  - also says that items aren't stored on a partition (our "slice"/"shard") in
  a sorted order, unlike when using a composite object name with a sort key -
  in which case all items with the same partition key physically close together
  and ordered by the sort key value. -->
{{< /comment >}}
This design enables the support for faster NoSQL table queries that include a sharding-key and optionally also a sorting-key filter (see NoSQL {{< xref f="data-layer/nosql/" a="read-optimization" text="read optimization" >}}).

For best-practice guidelines for defining primary keys, optimizing data and workload distribution, and improving performance, see {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" >}}.

{{< note id="object-keys-notes" >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (3.1.19) Some of the restrictions are
  also mentioned in the sw-specifications.md spec page and in relevant
  reference documentation. -->
{{< /comment >}}
- <a id="sharding-key-no-periods-note"></a>The value of a sharding key cannot contain periods, because the leftmost period in an object's primary-key value (name) is assumed to be a separator between sharding and sorting keys.
    {{< comment >}}<!-- [c-sharding-key-no-periods] [c-period-in-object-name] -->
    {{< /comment >}}
- <a id="nosql-structured-api-user-attrs-req-note"></a>To work with a NoSQL table using **Spark DataFrames** or **Presto**, the table items must have a sharding-key user attribute, and in the case of a compound primary-key also a sorting-key user attribute; for more efficient range scans, use a sorting-key attribute of type string (see {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="string-sorting-key-for-faster-range-scan-queries" >}} for more information).
    To work with a NoSQL table using **{{< getvar v="product.frames.name.long_lc" >}}**, the table items must have a primary-key user attribute.
    The values of such key user attributes must match the value of the item's primary key (name) and shouldn't be modified after the initial item ingestion.
    (The NoSQL Web API doesn't require such attributes and doesn't attach any special meaning to them if they exist.)
    To change an item's primary key, delete the existing item and create a new item with the desired combination of sharding and sorting keys and matching user key attributes, if required.
    {{< comment >}}<!-- [c-nosql-structured-api-user-attrs-req]
      [c-sorting-key-type]
      [c-partial-range-scan-for-non-string-sorting-key-spark-nosql-df]
      [c-partial-range-scan-for-non-string-sorting-key-presto] -->
    {{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Object-Name Restrictions {#object-name-restrictions}
{{< comment >}}<!-- [IntInfo] (sharonl) The object-name restrictions are also
  documented in the sw-specifications.md specs page (see "#object-names"). -->
{{< /comment >}}

The names of all data objects in the {{< product lc >}} (such as items and files) are subject to the general {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="file-names" text="file-system naming restrictions" >}}, including a maximum length of {{< verkey k="object_name_max_length" >}} characters.
In addition &mdash;

- A period in an object name indicates a compound name of the format `<sharding key>.<sorting key>`.
    See [Sharding and Sorting Keys](#sharding-n-sorting-keys).
    {{< comment >}}<!-- [c-period-in-object-name] IntInfo: See also the similar
      info in the sw-specifications.md object-name restrictions and in other
      related documentation. -->
    {{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] TODO: Add more see-also links. -->
{{< /comment >}}

- {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" >}}
- {{< xref f="data-layer/objects/attributes.md" >}}
- {{< xref f="data-layer/nosql/" >}}
    - {{< xref f="data-layer/nosql/" a="read-optimization" text="Read Optimization" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="object-names" text="Object-name software specifications and restrictions" >}}

