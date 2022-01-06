---
title: "Best Practices for Defining Primary Keys and Distributing Data Workloads"
keywords: "best practices, primary key, defining primary keys, keys, sharding key, sorting key, collection keys, collections, table keys, object names, item names, names, __name, naming objects, workload distribution, data distribution, even distribution, even workload distribution, nosql, range scan, scan optimization, table partitioning, nosql spark dataframe, nosql web api, range-scan-even-distribution, PutItem, UpdateItem, GetItem, GetItems"
menu:
  main:
    parent:     "object-names-and-keys"
    identifier: "best-practice-primary-keys"
    weight:     10
---
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] Moved from tutorials/.
- [IntInfo] (sharonl) (8.2.21) This page was planned to be part of a new
  "FAQs and Best Practices" section (support/) in the restructured site, but as
  we currently filter out this page because we don't yet have FAQs and have
  only this single best-practices guide, we currently filter out the support/
  section and include the guide under data-layer/. See more info and action
  items when we add support/ in support/_index..md. -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (6.1.19) See the information in the
  v1.9 range-scan Tech Preview DOC IG-7260 (web API) and DOC IG-7459 (big data
  - Spark & Presto) and big-data range-scan-even-distribution Tech Preview DOC
  - IG-9023, and the v2.0.0 range-scan official-support DOC IG-9215, and the
  AWS DynamoDB documentation referenced in the internal comments on this page.
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

When creating a new collection &mdash; namely, a NoSQL table or a directory in the file system &mdash; you should select a primary key for uniquely identifying the objects in the collection; (for streaming, this is handled implicitly by the {{< product lc >}}).
An object's primary key serves also as the object's name (i.e., the name of the object file) and is stored by the {{< product lc >}} in the <attr>{{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__name" text="<attr>__name</attr>" >}}</attr> system attribute.
The primary-key value of a data object (such as a table item or a file) is composed of a sharding key &mdash; which determines the data shard (slice) on which the object is physically stored &mdash; and optionally also a sorting key &mdash; which determines how objects with the same sharding key are sorted on the assigned slice.
For more information about object keys and names, see {{< xref f="data-layer/objects/object-names-and-keys/" >}}.

Your aim should be to select a primary key that results in an even distribution of the data and the data-access workload across the available data slices.
This should be done by taking into account the collection's expected data set and ingestion and consumption patterns.
Following are best-practice guidelines to help you in this mission.

<!-- //////////////////////////////////////// -->
## Using a Compound Primary Key for Faster NoSQL Table Queries {#compound-primary-key-for-faster-nosql-queries}
{{< comment >}}<!-- [IntInfo] (sharonl) See the info in DOC IG-7459 and IG-7260,
  and especially Golan's "Range scan guidelines" email from 2.1.19 and the
  related thread (copied in the ticket comments).
  Also, see the AWS DynamoDB doc, including
  - "Partitions and Data Distribution"
    (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html)
  - "Best Practices for Using Sort Keys to Organize Data"
    (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-sort-keys.html) -->
{{< /comment >}}

A major motivation for using a compound `<sharding key>.<sorting key>` primary key for a NoSQL-table collection is to optimize query performance.
A compound key enables the {{< product lc >}} to support optimized range-scan and item-specific queries that include sharding- and sorting-key filters &mdash; see NoSQL {{< xref f="data-layer/nosql/" a="read-optimization" text="read optimization" >}}.
Such queries can be significantly faster than the standard full-table queries,  because the {{< product lc >}} searches the names of the clustered and sorted object files on the relevant data slice instead of scanning all table items.
{{< comment >}}<!-- [IntInfo] (sharonl) Faster primary-key "get-item"
  item-specific queries (for simple or compound item names) are supported by
  the NoSQL Web API and Presto but not by the NoSQL Spark DataFrame. -->
{{< /comment >}}

Range scans are most beneficial if the majority of the table queries are expected to include a common filter criteria that consists of the same one or two attributes.
Therefore, when selecting your keys, consider which queries are likely to be issued most often.
For example, if you have a connected-cars application and most of your queries will include car-ID and trip-ID filter criteria &mdash; such as `"car_id = <value>"`, `"car_id = <value> AND trip_id = <value>"`, or `"car_id = <value> AND trip_id > <value> AND trip_id <= <value>"` &mdash; it would make sense to use the car-ID attribute as your table's sharding key and the trip-ID attribute as the sorting key, resulting in a `<car_id>.<trip_id>` primary key.
{{< comment >}}<!-- [IntInfo] (sharonl) (7.1.19) With Presto, a '=' query on
  both the sharding- and sorting-key values, as in the second example above,
  will result in a faster item-specific ("get-item") query rather than a range
  scan. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Using a String Sorting Key for Faster Range-Scan Queries {#string-sorting-key-for-faster-range-scan-queries}
{{< comment >}}<!-- [c-sorting-key-type]
  [c-partial-range-scan-for-non-string-sorting-key-spark-nosql-df]
  [c-partial-range-scan-for-non-string-sorting-key-presto]
  [c-nosql-structured-api-user-attrs-req-spark-df-presto-range-scan]
  [IntInfo] See the info for Bug IG-8503 in in DOC IG-9215, and the related
  NoSQL Spark DataFrame and Presto restrictions in the sw-specifications.md
  specs page. -->
{{< /comment >}}

To support Presto and Spark DataFrame {{< xref f="data-layer/nosql/" a="range-scans" text="range-scan queries" >}}, the table must have sharding- and sorting-key user attributes.
For faster range scans, use sorting-key attributes of type string:
for a string sorting key, after identifying the relevant data slice by using the query's sharding-key value, the {{< product lc >}} scans only the items within the query's sorting-keys range; but for a non-string sorting-key, the {{< product lc >}} ignores the sorting key and scans all items on the data slice.
The reason for ignoring non-string sorting keys is that the lexicographic sorting-key sort order that's used for storing the items on the data slice might not match the logical sort order for a non-string sorting key.

<!-- //////////////////////////////////////// -->
## Selecting a Sharding Key for Even Workload Distribution {#sharding-key-selection-for-even-workload-distribution}
{{< comment >}}<!-- [IntInfo] (sharonl) (6.1.19) See the AWS DynamoDB
  "Designing Partition Keys to Distribute Your Workload Evenly" documentation
  (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-uniform-load.html)
  and the second paragraph in the "Best Practices for Designing and Using
  Partition Keys Effectively" documentation
  (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html). -->
{{< /comment >}}

As explained, a collection's sharding key affects the distribution of the data among the available storage slices, as all objects with the same sharding-key value are assigned to the same slice.
To balance the system's workload and optimize performance, try to select a sharding key for which there are enough distinct values in your data set to distribute evenly across the available slices ({{< verkey k="container_slice_count" >}} slices per container).
In addition, consider the expected data-access patterns.
Note that even if your data set has many potential distinct sharding-key values, if most of the ingested objects or most of the table queries are for the same few sharding-key values, the performance is likely to suffer.
As a general rule, increasing the ratio of accessed sharding-key values to the total number of distinct sharding-key values in the collection improves the efficiency of the data processing.

For example, a username for a data set with many users is likely to be a good sharding key, unless most of the information applies only to a few users.
But an area ZIP code for a data set with only a few ZIP codes relative to the number of objects would not make for a good sharding key.

Using a compound `<sharding key>.<sorting key>` primary key can also help improve your collection's data distribution.
For example, you can use a date sharding key and a device-ID sorting key (with values such as `20180523.1273`) to store all data generated on the same day on the same data slice, sorted by the ID of the device that generated the data.

If you can't identify a sufficiently good sharding key for your collection, consider recalculating the sharding-key values as part of the objects' ingestion &mdash; see [Recalculating Sharding-Key Values for Even Workload Distribution](#sharding-key-values-recalculation-for-even-workload-distribution).

<!-- //////////////////////////////////////// -->
## Recalculating Sharding-Key Values for Even Workload Distribution {#sharding-key-values-recalculation-for-even-workload-distribution}
{{< comment >}}<!-- [IntInfo] (sharonl) See the AWS DynamoDB "Using Write
  Sharding to Distribute Workloads Evenly" documentation
  (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-sharding.html) and the information for our Spark DataFrame and Presto
  "range-scan even-distribution" support in DOC IG-9023. -->
{{< /comment >}}

To better balance the system's workload and improve performance when working with a non-uniform data set, consider recalculating the sharding-key values during the objects' ingestion so as to split a single object sharding-key value into multiple values.
The objective is to increase the number of distinct sharding-key values in the collection and thus distribute the data objects more evenly across the available data slices.

{{< note id="sharding-key-values-recalculation-for-even-workload-distribution-notes" >}}
- <a id="sharding-key-values-recalculation-only-w-compound-primary-key-note"></a>This method relevant only for collections with a compound `<sharding key>.<sorting key>` primary key, which allows for multiple objects in the collection to have the same sharding-key value.
- <a id="sharding-key-values-recalculation-n-table-partitioning-note"></a>This method should typically be used with "flat" tables or with tables that have only one or two partitions.
    Data in multiple-partition tables should already be evenly distributed across the available data slices.
    For more information on partitioning of NoSQL tables, see {{< xref f="data-layer/nosql/" a="partitioned-tables" text="Partitioned Tables" >}}.
{{< /note >}}

One method for splitting a sharding-key value is to add a random number to the end of the original sharding-key value (separated from the original value by a predefined character, such as an underscore), thus randomizing the data ingestion across multiple slices instead of a single slice.
For example, objects with the username sharding-value `johnd`, such as `johnd.20180602` and `johnd.20181015`, might be ingested as `johnd_1.20181002` and `johnd_2.20181015`.

However, using a random sharding-key suffix makes it difficult to retrieve a specific object by its original primary-key value, because you don't know which random suffix was used when ingesting the specific object.
This can be solved by calculating the suffix that is added to the original sharding-key value based on the value of an attribute that you might use for retrieving (reading) objects from the collection.
For example, you can apply a hash to the value of the sorting-key attribute, as done by the even-distribution write option of the {{< product lc >}}'s NoSQL Spark DataFrame (see details in [the following subsection](#nosql-spark-df-even-distribution)).
The new object primary-key values look similar to the values for the randomized-suffix method &mdash; for example, `johnd_1.20180602` and `johnd_2.20181015`.
But because the numeric suffixes in this case were created by using a known formula that is based on an object attribute, you can always apply the same calculation to retrieve a specific object by its original sharding- and sorting-key values.

Note that regardless of the sharding-key recalculation method, retrieving all objects for a given sharding-key value from the original data set requires submitting multiple read requests (queries) &mdash; one for each of the new primary-key object values.
However, the {{< product lc >}}'s NoSQL Spark DataFrame and Presto interfaces handle this implicitly, as outlined in [the following subsection](#nosql-spark-df-even-distribution).

<!-- ---------------------------------------- -->
### Using a NoSQL Spark DataFrame for Even Workload Distribution {#nosql-spark-df-even-distribution}

The {{< product lc >}}'s {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" text="NoSQL Spark DataFrame" >}} has a custom <opt>range-scan-even-distribution</opt> write option to simplify even distribution of ingested items by allowing the {{< product lc >}} to recalculate the sharding- and primary-key values of the ingested items based on the value of the items' sorting-key.

In addition, the NoSQL Spark DataFrame and the {{< getvar v="presto.product_connector.full" >}} allow you to query such tables by using the original sharding-key value (which remains stored in the item's sharding-key attribute), instead of submitting separate queries for each of the new sharding-key values that are used in the item's primary-key values.

For more information, see the NoSQL DataFrame {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" a="even-workload-distribution" text="Even Workload Distribution" >}} reference and the following [behind-the-scenes implementation details](#nosql-spark-df-n-presto-even-distribution-behind-the-scenes).

<!-- ======================================== -->
#### Behind the Scenes {#nosql-spark-df-n-presto-even-distribution-behind-the-scenes}

The {{< product lc >}} calculates the new item sharding-key value for the NoSQL Spark DataFrame even-distribution write option in the following manner:

- Apply the <func>xxHash</func> hash function to the item's sorting-key value.
- Perform a modulo operation on the sorting-key hash result, using the value that is configured in the {{< product lc >}}'s <api>{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_name" >}}</api> configuration property (default = {{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}}) as the modulus.
- Append to the original sharding-key value an underscore ('`_`') followed by the result of the modulo operation on the sorting-key hash.

The result is a new primary-key value of the format `<original sharding-key value>_{xxHash(<sorting-key value>) % <preconfigured modulus>}.<sorting-key value>`.
For example, `johnd_1.20180602` for an original `johnd` sharding-key value.
With this design, items with the same original sharing-key value are stored on different data slices, but all items with the same sorting-key value (which remains unchanged) are stored on the same slice.

When you query a table with a NoSQL Spark DataFrame or with the Presto CLI, you use the original sharding-key value.
Behind the scenes, the {{< product lc >}} can identify whether the original sharding-key value was recalculated using the method of the Spark DataFrame even-distribution option (provided the table has a schema that was inferred with a NoSQL DataFrame or the {{< getvar v="presto.product_connector.full" >}}.
In such cases, the {{< product lc >}} searches all relevant slices to locate and return information for all items with the same original sharding-key value.

<!-- ---------------------------------------- -->
### Using the NoSQL Web API for Even Workload Distribution {#nosql-web-api-even-distribution}

The {{< xref f="data-layer/reference/web-apis/nosql-web-api/" text="NoSQL Web API" >}} doesn't have specific support for even workload distribution, but you can select to implement this manually:
when ingesting items with the <api>PutItem</api> or <api>UpdateItem</api> operation, recalculate the sharding-key value (using the provided guidelines) and set the item's primary-key value to `<recalculated sharing-key value>.<sorting-key value>`.

Note that when submitting a NoSQL Web API <api>GetItem</api> request, you need to provide the full item primary-key value (with the recalculated sharding-key value), and when submitting a <api>GetItems</api> range-scan request, you need to provide the full recalculated sharding-key value.
As explained in this guide, to retrieve all items with the same original sharding-key value, you'll need to repeat the requests for each of the newly calculated sharding-key values.

  <!-- ======================================== -->
#### NoSQL Spark DataFrame and Presto Notes {#nosql-web-api-n-spark-df-even-distribution-notes}

- <a id="spark-df-even-distribution-web-api-ingestion"></a> When ingesting an item with the web API, if you wish to also support table reads (queries) using Spark DataFrames or Presto &mdash;
  - You must define user attributes for the original sharding-key and sorting-key values, regardless of whether you recalculate the sharding-key value.
      Take care not to modify the values of such attributes after the ingestion.
      {{< comment >}}<!-- [c-range-scan-w-spark-df-or-presto-user-sharding-n-sorting-key-attrs] -->
      {{< /comment >}}
  - If you select to do recalculate the sharding-key value, use the method that is used by the NoSQL Spark DataFrame's even-distribution option (as outlined in [the previous subsection](#nosql-spark-df-even-distribution)) &mdash; i.e., use primary-key values of the format `<original sharding-key value>_{xxHash(<sorting-key value>) % <modulus set in the {{< verkey k="cfg_properties.nosql_range_scan_buckets_count_name" >}} property>}.<sorting-key value>` &mdash; to allow simplified Spark and Presto queries that use the original sharding-key value.

- <a id="spark-df-even-distribution-multi-web-api-reads"></a>To use the web API to retrieve items that were ingested by using the NoSQL Spark DataFrame's even-distribution write option (or an equivalent manual web-API ingestion), you need to repeat the get-item(s) request with `<original sharding key>_1` to `<original sharding key>_<n>` sharding-key values, where `<n>` is the value of the <api>{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_name" >}}</api> configuration property.

    For example, for an original sharding-key value of `johnd`, a sorting-key value of `20180602`, and the default configuration-property value of {{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}} &mdash; call <api>GetItem</api> with primary-key values from `johnd_1.20180602` to `johnd_{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}}.20180602`, and call <api>GetItems</api> with sharding-key values from `johnd_1` to `johnd_{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}}`.
    {{< comment >}}<!-- [c-spark-df-even-distribution-multi-web-api-reads] -->
    {{< /comment >}}

<!-- ---------------------------------------- -->
## Distributing the Data Ingestion Efficiently {#data-ingestion-efficient-distribution}
{{< comment >}}<!-- [IntInfo] (sharonl) (6.1.19) See the AWS DynamoDB
  "Distributing Write Activity Efficiently During Data Upload" documentation
  (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-data-upload.html).
  Orit confirmed that it's also true for our platform, although not a major
  consideration.
  This section is relevant only to tables with a compound primary key, because
  only such tables can't have multiple objects with the same sharding-key value,
  but I decided not to mention this explicitly as it's more cumbersome than
  helpful. -->
{{< /comment >}}

It's recommended that you don't write (ingest) multiple objects with the same sharding-key value at once, as this might create an ingestion backlog on the data slice to which the data objects are assigned while other slices remain idle.

An alternative ingestion flow, which better balances the ingestion load among the available data slices, is to order the ingestion based on the values of the objects' sorting key.
Objects with the same sorting-key value don't have the same sharding-key value and therefore won't be assigned to the same slice.
For example, if you have a collection with a device-ID sharding key and a date sorting key, you can ingest all objects for a given date (sorting-key value) and then proceed to the next date in the data set.
{{< comment >}}<!-- [IntInfo] (sharonl) See the AWS DynamoDB doc
  "Distributing Write Activity Efficiently During Data Upload"
  (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-data-upload.html). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/objects/object-names-and-keys/" >}}
- {{< xref f="data-layer/objects/attributes.md" >}}
- {{< xref f="data-layer/nosql/" a="range-scans" text="Range Scans" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/nosql-dataframe.md" text="NoSQL Spark DataFrame Reference" >}}
- {{< xref f="data-layer/presto/presto-cli.md" >}}
- {{< xref f="data-layer/reference/web-apis/nosql-web-api/" text="NoSQL Web API Reference" >}}

