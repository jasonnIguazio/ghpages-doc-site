---
title:  "GetItems"
keywords: "GetItems, get items, nosql, tables, table items, attributes, table scan, items scan, partial scan, segmented table scan, partial response, table segments, item names, object names, range scan, primary key, sharding key, sorting key, filter expressions, condition expressions, AttributesToGet, FilterExpression, Key, Limit, Marker, Segment, ShardingKey, SortKeyRangeStart, SortKeyRangeEnd, TableName, TotalSegment, Items, LastItemIncluded, NextMarker, NumItems"
menu:
  main:
    parent:       "nosql-web-api"
    identifier:   "nosql-web-api-getitems"
    weight:       20
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Retrieves (reads) attributes of multiple items in a table or in a data container's root directory, according to the specified criteria.

<!-- ---------------------------------------- -->
{{< small-heading id="scan-optimization" >}}Scan Optimization{{< /small-heading >}}

<api>GetItems</api> enables you to optimize table scans by using either of the following methods:

- [Range Scan](#range-scan)
- [Parallel Scan](#parallel-scan)

{{< note id="getitems-notes" >}}
- <a id="getitems-mutually-exclusive-optimizaton-methods"></a>You can't use both optimization methods together in the same <api>GetItems</api> request.
    {{< comment >}}<!-- [IntInfo] (sharonl) See also the sw-specifications.md doc
      - #nosql-web-api-range-scan-no-sup-w-parallel-scan. -->
  {{< /comment >}}
- <a id="optimized-getitem-scans"></a>If you're looking for a specific item, use <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/getitem.md" text="GetItem" >}}</api>, which is faster than either of these <api>GetItems</api> optimized-scan methods because it searches for a specific object file on the relevant data slice.
    See {{< xref f="data-layer/nosql/" a="faster-item-specific-queries" >}}.
    {{< comment >}}<!-- [InfInfo] (sharonl) (20.12.18) Ortal explained that
      GetItem is also faster than a GetItems range scan (in addition to the
      simpler code). -->
    {{< /comment >}}
{{< /note >}}

<dl>
  <!-- Range Scan -->
  <dt id="range-scan">Range Scan</dt>
  {{< dd >}}
  <api>GetItems</api> allows you to perform a range scan to retrieve items with a specific sharding-key value by setting the [<paramname>ShardingKey</paramname>](#req-param-ShardingKey) request parameter to the requested sharding-key value.
  You can also optionally restrict the query to a specific range of item sorting-key values by using the [<paramname>SortKeyRangeStart</paramname>](#req-param-SortKeyRangeStart) and/or [<paramname>SortKeyRangeEnd</paramname>](#req-param-SortKeyRangeEnd) parameters.
  A range scan is more efficient than the default <api>GetItems</api> full table scan because of the way that the data is stored and accessed.
  For more information, see {{< xref f="data-layer/nosql/" a="range-scans" >}}.
  {{< /dd >}}

  <!-- Parallel Scan -->
  <dt id="parallel-scan">Parallel Scan (Segmented Table Scan)</dt>
  {{< comment >}}<!-- [IntInfo] (sharonl) TODO: Read the AWS DynamoDB
    parallel-scan doc - such as the "Taking Advantage of Parallel Scans"
    section in the "Best Practices for Querying and Scanning Data" doc
    (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-query-scan.html#bp-query-scan-parallel)
    - and determine whether to edit our doc. -->
  {{< /comment >}}
  {{< dd >}}
  <api>GetItems</api> scans table items in search for the requested items.
  By default, the scan is executed sequentially.
  However, you can optionally scan only a specific portion (segment) of the table:
  you can set the request's <paramname>[TotalSegment](#req-param-TotalSegment)</paramname> parameter to the number of segments into which you wish to divide the table, and set the request's <paramname>[Segment](#req-param-Segment)</paramname> parameter to the ID of the segment that you wish to scan in the current operation.
  To improve performance, you can implement a parallel table scan by dividing the scan among multiple application instances ("workers"), assigning each worker a different segment to scan.
  Note that such an implementation requires that the workers all send <api>GetItems</api> requests with the same scan criteria and total-segments count but with different scan segments.

  The following table depicts a parallel multi-worker scan of a segmented table with <api>GetItems</api>:
  <p align="center">
  <img src="/images/getitems_parallel_scan.png" alt="Diagarm of a GetItems parallel scan of a segmented table" width="650"/>
  </p>
  {{< /dd >}}
</dl>

<!-- ---------------------------------------- -->
{{< small-heading id="partial-response" >}}Partial Response{{< /small-heading >}}

The <api>GetItems</api> response might not return all the requested items, especially if the overall size of the requested data is considerable.
In such cases, the value of the <paramname>[LastItemIncluded](#resp-param-LastItemIncluded)</paramname> response element is `"FALSE"`.
To retrieve the remaining requested items, send a new identical <api>GetItems</api> request, and set its <paramname>[Marker](#req-param-Marker)</paramname> parameter to the value of the <jsonkey>[NextMarker](#resp-param-NextMarker)</jsonkey> element that was returned in the response of the previous request.
When the <paramname>Marker</paramname> request parameter is set, the operation begins searching for matching items at the specified marker location.

{{< note id="partial-response-notes" >}}
- <a id="partial-response-limit-param-calc-note"></a>The <paramname>[Limit](#req-param-Limit)</paramname> request parameter defines the maximum number of items to return in the response object for the current API call.
    When issuing a <api>GetItems</api> request with a new marker, after receiving a partial response, consider recalculating the limit to subtract the items returned in the responses to the previous requests.
- <a id="partial-response-less-items-than-limit-note"></a> A <api>GetItems</api> response might contain less items than specified in the <paramname>[Limit](#req-param-Limit)</paramname> request parameter even if there are additional table items that match the request (i.e., the value of the <paramname>[LastItemIncluded](#resp-param-LastItemIncluded)</paramname> response element is `"FALSE"`).
    In such cases, you need to issue a new <api>GetItems</api> request to retrieve the remaining items, as explained above.
    {{< comment >}}<!-- [IntInfo] [c-getitems-limit-n-ret-items-per-vn]
      (sharonl) (7.3.18) A GetItems response contains items only from the same
      VN. As a result, even when requesting a small number of items with a high
      limit, the response might not include all the requested items. This
      behavior is confusing to customers. Also, some customers assume that the
      Limit request parameter indicates the requested maximum number of items
      to return overall - for the sum of all GetItems quests that recalculate
      the marker. In consultation with Adi, I added the note above (we
      intentionally didn't explicitly mention the single-VN restriction in the
      doc) and I edited the Limit parameter description to emphasize that it
      determines the number of items in the Items array of the request's
      response object.
      See also Bug IG-6868 (closed as "Not a bug") and the "How GetItems works
      - Markers and limits" email thread (started by
      Tsiyon). -->
    {{< /comment >}}
- <a id="partial-response-same-scan-type-note"></a>Requests that set the <paramname>[Marker](#req-param-Marker)</paramname> parameter must perform a similar scan to that performed by the previous partial-response request &mdash; be it a parallel scan, a range scan, or a regular scan.
    For example, you cannot use the <paramname>[NextMarker](#resp-param-NextMarker)</paramname> response element returned for a previous range-scan request as the value of the <paramname>Marker</paramname> parameter of a parallel-scan request.
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="request" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-header" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /<container>/<resource> HTTP/1.1
Host: <web-APIs URL>
Content-Type: application/json
X-v3io-function: GetItems
X-v3io-session-key: <access key>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "GetItems",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

- To retrieve items from a specific table, set the relative table path within the configured container in the request URL or in the <paramname>[TableName](#req-param-TableName)</paramname> JSON parameter, or split the path between the URL and the JSON parameter.
    See {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="request-resource" >}}.
- To retrieve items from the root directory of the configured container, omit the `<resource>` URL element &mdash; i.e., end the URL in the request header with `<container>/` &mdash; and either don't set the request's <paramname>[TableName](#req-param-TableName)</paramname> JSON parameter or set it to `"/"`.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{
    "TableName":          "string",
    "Limit":              number,
    "AttributesToGet":    "string",
    "FilterExpression":   "string",
    "ShardingKey":        "string",
    "SortKeyRangeStart":  "string",
    "SortKeyRangeEnd":    "string",
    "Segment":            number,
    "TotalSegment":       number,
    "Marker":             "string"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "TableName":          "string",
            "Limit":              number,
            "AttributesToGet":    "string",
            "FilterExpression":   "string",
            "ShardingKey":        "string",
            "SortKeyRangeStart":  "string",
            "SortKeyRangeEnd":    "string",
            "Segment":            number,
            "TotalSegment":       number,
            "Marker":             "string"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- TableName -->
  {{< param-doc name="TableName" id="req-param-TableName" >}}

  To retrieve items from a specific table (collection), set the relative table path within the configured container in this parameter or in the [request URL](#request-header-params-url-resource), or split the path between the URL and the JSON parameter.
  See {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="request-resource" >}}.

  To retrieve items from the root directory of the configured container, end the URL in the request header with `<container>/` and either don't set the <paramname>TableName</paramname> JSON parameter or set it to `"/"`.
  {{< comment >}}<!-- [CosmeticsInfo] Initially I used bullets like in the URL
    resource doc, but the bullets were at the same level as the Type and
    Requirement bullets, which looks a bit weird. -->
  {{< /comment >}}

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Limit -->
  {{< param-doc name="Limit" id="req-param-Limit" >}}
  The maximum number of items to return within the response (i.e., the maximum number of elements in the response object's [Items](#resp-param-Items) array). 
  {{< comment >}}<!-- [IntInfo] See [c-getitems-limit-n-ret-items-per-vn] -->
  {{< /comment >}}

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- AttributesToGet -->
  {{< param-doc name="AttributesToGet" id="req-param-AttributesToGet" >}}
  The attributes to return for each item.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`"*"`{{< /param-default-value >}}

  The attributes to return can be depicted in one of the following ways:

  - A comma-separated list of attribute names.<br/>
      **Note:** Currently, the delimiter commas cannot be surrounded by spaces.
      {{< comment >}}<!-- [ci-shortcode-w-content-in-list-items]
        [sharonl] See the info for AttributeToGet in getitem.md. -->
      {{< /comment >}}

      The attributes can be of any attribute type &mdash; user, system, or hidden.

  - <def>"*"</def> &mdash; retrieve the item's {{< xref f="data-layer/objects/attributes.md" a="user-attributes" text="user attributes" >}} and <api>{{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__name" text="__name" >}}</api> system attribute, but not other system attributes or hidden attributes.
      This is the default value.

  - <def>"**"</def> &mdash; retrieve all item attributes &mdash; user, system, and hidden attributes.

  For an overview of the different attribute types, see {{< xref f="data-layer/objects/attributes.md" a="attribute-types" text="Attribute Types" >}}.
  {{< /param-doc >}}

  <!-- FilterExpression -->
  {{< param-doc name="FilterExpression" id="req-param-FilterExpression" >}}
  A filter expression that restricts the items to retrieve.
  Only items that match the filter criteria are returned.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" a="filter-expression" text="filter expression" >}}.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- ShardingKey -->
  {{< param-doc name="ShardingKey" id="req-param-ShardingKey" >}}
  The sharding-key value of the items to get by using a [range scan](#range-scan).
  The sharding-key value is the part to the left of the leftmost period in a {{< xref f="data-layer/objects/object-names-and-keys/" a="compound-primary-key" text="compound primary-key" >}} value (item name).
  You can optionally use the [<paramname>SortKeyRangeStart</paramname>](#req-param-SortKeyRangeStart) and/or [<paramname>SortKeyRangeEnd</paramname>](#req-param-SortKeyRangeEnd) request parameters to restrict the search to a specific range of sorting keys (`SortKeyRangeStart >= <sorting key> < SortKeyRangeEnd`).

  {{< note id="shardingkey-req-param-notes" >}}
  <a id="recalculated-sharding-key-even-distribution-multi-reads-note"></a>To retrieve all items for an original sharding-key value that was recalculated during the ingestion (to achieve a more even workload distribution), you need to repeat the <api>GetItems</api> request for each of the sharding-key values that were used in the ingestion.
  If the ingestion was done by using the even-distribution option of the NoSQL Spark DataFrame, you need to repeat the request with <paramname>ShardingKey</paramname> values that range from `<original sharding key>_1` to `<original sharding key>_<n>`, where `<n>` is the value of the <api>{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_name" >}}</api> configuration property (default = {{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}}); for example, `johnd_1 .. johnd_{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}}`.
  For more information, see {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="sharding-key-values-recalculation-for-even-workload-distribution" text="Recalculating Sharding-Key Values for Even Workload Distribution" >}}.
  {{< comment >}}<!-- [c-spark-df-even-distribution-multi-web-api-reads] -->
  {{< /comment >}}
  {{< /note >}}

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req >}}Optional; required when either the [<paramname>SortKeyRangeStart</paramname>](#req-param-SortKeyRangeStart) or [<paramname>SortKeyRangeEnd</paramname>](#req-param-SortKeyRangeEnd) request parameter is set{{< /param-req >}}
  {{< /param-doc >}}

  <!-- SortKeyRangeStart -->
  {{< param-doc name="SortKeyRangeStart" id="req-param-SortKeyRangeStart" >}}
  The minimal sorting-key value of the items to get by using a [range scan](#range-scan).
  The sorting-key value is the part to the right of the leftmost period in a {{< xref f="data-layer/objects/object-names-and-keys/" a="compound-primary-key" text="compound primary-key" >}} value (item name).
  This parameter is applicable only together with the [<paramname>ShardingKey</paramname>](#req-param-ShardingKey) request parameter.
  The scan will return all items with the specified sharding-key value whose sorting-key values are greater than or equal to (`>=`) the value of the <paramname>SortKeyRangeStart</paramname> parameter and less than (`<`) the value of the [<paramname>SortKeyRangeEnd</paramname>](#req-param-SortKeyRangeEnd) parameter (if set).

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- SortKeyRangeEnd -->
  {{< param-doc name="SortKeyRangeEnd" id="req-param-SortKeyRangeEnd" >}}
  The maximal sorting-key value of the items to get by using a [range scan](#range-scan).
  The sorting-key value is the part to the right of the leftmost period in a {{< xref f="data-layer/objects/object-names-and-keys/" a="compound-primary-key" text="compound primary-key" >}} value (item name).
  This parameter is applicable only together with the [<paramname>ShardingKey</paramname>](#req-param-ShardingKey) request parameter.
  The scan will return all items with the specified sharding-key value whose sorting-key values are greater than or equal to (`>=`) than the value of the [<paramname>SortKeyRangeStart</paramname>](#req-param-SortKeyRangeStart) parameter (if set) and less than (`<`) the value of the <paramname>SortKeyRangeEnd</paramname> parameter.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Segment -->
  {{< param-doc name="Segment" id="req-param-Segment" >}}
  The ID of a specific table segment to scan &mdash; 0 to one less than <paramname>[TotalSegment](#req-param-TotalSegment)</paramname>.
  See [Parallel Scan](#parallel-scan).

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "R" >}} when <paramname>[TotalSegment](#req-param-TotalSegment)</paramname> is provided{{< /param-req >}}
  {{< /param-doc >}}

  <!-- TotalSegment -->
  {{< param-doc name="TotalSegment" id="req-param-TotalSegment" >}}
  The number of segments into which to divide the table scan &mdash; 1 to 1024.
  See [Parallel Scan](#parallel-scan).
  The segments are assigned sequential IDs starting with 0.

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "R" >}} when <paramname>[Segment](#req-param-Segment)</paramname> is provided{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Marker -->
  {{< param-doc name="Marker" id="req-param-Marker" >}}
  An opaque identifier that was returned in the <jsonkey>NextMarker</jsonkey> element of a response to a previous <api>GetItems</api> request that did not return all the requested items.
  This marker identifies the location in the table from which to start searching for the remaining requested items.
  See [Partial Response](#partial-response) and the description of the <jsonkey>[NextMarker](#resp-param-NextMarker)</jsonkey> response element.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="response" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-syntax" >}}

```json
{
    "LastItemIncluded":   "string",
    "NumItems":           number,
    "NextMarker":         "string",
    "Items": [
        {
            "string": {
                "S":      "string",
                "N":      "string",
                "BOOL":   Boolean,
                "B":      "blob"
            }
        }
    ]
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

<dl>
  <!-- LastItemIncluded -->
  {{< param-doc name="LastItemIncluded" id="resp-param-LastItemIncluded" >}}
  `"TRUE"` if the scan completed successfully &mdash; the entire table was scanned for the requested items and all relevant items were returned (possibly in a previous response &mdash; see [Partial Response](#partial-response)); `"FALSE"` otherwise.

  {{< param-type >}}Boolean string &mdash; `"TRUE"` or `"FALSE"`{{< /param-type >}}
  {{< /param-doc >}}
  {{< comment >}}<!-- [c-json-boolean-string-type-Getitems-LastItemIncluded]
    [IntInfo] (sharonl) (14.5.19) Previously, we documented the element type
    as Boolean (values = `true` or `false`), but I've confirmed with Roy B. and
    via tests (performed by Gal T. and by me) that the type of the
    LastItemIncluded  response element is actually a string that functions as a
    Boolean result; the returned values are either `"TRUE"` or `"FALSE"`.
    (Perhaps we didn't yet support a Boolean JSON element type when the API was
    defined.) (The range-scan doc example showed the correct LastItemIncluded
    value, but the other example and the explanations in the doc were
    incorrect.) => I modified the doc accordingly. -->
  {{< /comment >}}

  <!-- NumItems -->
  {{< param-doc name="NumItems" id="resp-param-NumItems" >}}
  The number of items in the response's <paramname>[Items](#resp-param-Items)</paramname> array.

  {{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- NextMarker -->
  {{< param-doc name="NextMarker" id="resp-param-NextMarker" >}}
  An opaque identifier that marks the location in the table at which to start searching for remaining items in the next call to <api>GetItems</api>.
  See [Partial Response](#partial-response) and the description of the <paramname>[Marker](#req-param-Marker)</paramname> request parameter.
  When the response contains all the requested items, <paramname>NextMarker</paramname> is not returned.

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Items -->
  {{< param-doc name="Items" id="resp-param-Items" >}}
  An array of items containing the requested attributes.
  The array contains information only for items that satisfy the conditions of the <paramname>[FilterExpression](#req-param-FilterExpression)</paramname> request parameter.
  Each returned item object includes only the attributes requested in the <paramname>[AttributesToGet](#req-param-AttributesToGet)</paramname> parameter, provided the item has these attributes.

  {{< param-type >}}An array of item JSON objects that contain <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" text="Attribute" >}}</api> objects{{< /param-type >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

<!-- ---------------------------------------- -->
### Example 1 &mdash; Basic Filter-Expression Scan {#example-1}

Retrieve from a "MyDirectory/Cars" table in a "mycontainer" container the <attr>\_\_name</attr>, <attr>km</attr>, <attr>state</attr>, and <attr>manufacturer</attr> attributes (if exist) of up to 1,000 items whose <attr>km</attr> attribute value is greater than or equal to 10,000, and whose <attr>lastService</attr> attribute value is less than 10,000:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyDirectory/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: GetItems
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "TableName":        "Cars",
    "Limit":            1000,
    "AttributesToGet":  "__name,km,state,manufacturer",
    "FilterExpression": "(km >= 10000) AND (lastService < 10000)"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyDirectory/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "GetItems",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {
            "TableName":        "Cars",
            "Limit":            1000,
            "AttributesToGet":  "__name,km,state,manufacturer",
            "FilterExpression": "(km >= 10000) AND (lastService < 10000)"
          }

response = requests.post(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response" id="example1-response" >}}

```http
HTTP/1.1 200 OK
Content-Type: application/json
...
```
```json
{
    "LastItemIncluded": "TRUE",
    "NumItems": 3,
    "Items": [
        {
            "__name": {"S": "7348841"},
            "km": {"N": "10000"},
            "state": {"S": "OK"}
        },
        {
            "__name": {"S": "6924123"},
            "km": {"N": "15037"},
            "state": {"N": "OUT_OF_SERVICE"},
            "manufacturer": {"S": "Honda"}
        },
        {
            "__name": {"S": "7222751"},
            "km": {"N": "12503"}
        },
        {
            "__name": {"S": "5119003"},
            "km": {"N": "11200"},
            "manufacturer": {"S": "Toyota"}
        }
    ]
}
```

<!-- ---------------------------------------- -->
### Example 2 &mdash; Range Scan {#example-2}

This examples demonstrates two [range-scan](#range-scan) queries for a "mytaxis/rides" table in a "mycontainer" container.
The table contains the following items:
```sh
+---------+--------+---------+--------+----------------+------------------+-------------------+
|driver_id|    date|num_rides|total_km|total_passengers|       avg_ride_km|avg_ride_passengers|
+---------+--------+---------+--------+----------------+------------------+-------------------+
|        1|20180601|       25|   125.0|              40|               5.0|                1.6|
|        1|20180602|       20|   106.0|              46|               5.3|                2.3|
|        1|20180701|       28|   106.4|              42|3.8000000000000003|                1.5|
|       16|20180601|        1|   224.2|               8|             224.2|                8.0|
|       16|20180602|       10|   244.0|              45|              24.4|                4.5|
|       16|20180701|        6|   193.2|              24|32.199999999999996|                4.0|
|       24|20180601|        8|   332.0|              18|              41.5|               2.25|
|       24|20180602|        5|   260.0|              11|              52.0|                2.2|
|       24|20180701|        7|   352.1|              21|50.300000000000004|                3.0|
+---------+--------+---------+--------+----------------+------------------+-------------------+
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example2-request" >}}

The first query scans for all attributes of the items whose sharding-key value is 1:

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/mytaxis/rides/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: GetItems
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "ShardingKey":      "1",
    "AttributesToGet":  "*"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/mytaxis/rides/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "GetItems",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {
            "ShardingKey":      "1",
            "AttributesToGet":  "*"
          }

response = requests.post(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

The second query scans for the <attr>driver_id</attr>, <attr>date</attr>, <attr>avg_ride_km</attr>, and <attr>avg_ride_passengers</attr> attributes of all items whose sharding-key value is 24 and whose sorting-key values are within the first six months of 2018:

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/mytaxis/rides/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: GetItems
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "ShardingKey":        "24",
    "SortKeyRangeStart":  "20180101",
    "SortKeyRangeEnd":    "20180701",
    "AttributesToGet":    "__name,driver_id,date,avg_ride_km,avg_ride_passengers"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/mytaxis/rides/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "GetItems",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {
            "ShardingKey":        "24",
            "SortKeyRangeStart":  "20180101",
            "SortKeyRangeEnd":    "20180701",
            "AttributesToGet":    "__name,driver_id,date,avg_ride_km,avg_ride_passengers"
          }

response = requests.post(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response" id="example2-response" >}}

Response to the first query &mdash;

```http
HTTP/1.1 200 OK
Content-Type: application/json
...
```
```json
{
    "LastItemIncluded": "TRUE",
    "NumItems": 3,
    "Items": [
        {
            "__name": {
                "S": "1.20180601"
            },
            "avg_ride_km": {
                "N": "5"
            },
            "total_passengers": {
                "N": "40"
            },
            "driver_id": {
                "N": "1"
            },
            "avg_ride_passengers": {
                "N": "1.6"
            },
            "total_km": {
                "N": "125"
            },
            "date": {
                "S": "20180601"
            },
            "num_rides": {
                "N": "25"
            }
        },
        {
            "__name": {
                "S": "1.20180602"
            },
            "avg_ride_km": {
                "N": "5.3"
            },
            "total_passengers": {
                "N": "46"
            },
            "driver_id": {
                "N": "1"
            },
            "avg_ride_passengers": {
                "N": "2.3"
            },
            "total_km": {
                "N": "106"
            },
            "date": {
                "S": "20180602"
            },
            "num_rides": {
                "N": "20"
            }
        },
        {
            "__name": {
                "S": "1.20180701"
            },
            "avg_ride_km": {
                "N": "3.8"
            },
            "total_passengers": {
                "N": "42"
            },
            "driver_id": {
                "N": "1"
            },
            "avg_ride_passengers": {
                "N": "1.5"
            },
            "total_km": {
                "N": "106.4"
            },
            "date": {
                "S": "20180701"
            },
            "num_rides": {
                "N": "28"
            }
        }
    ]
}
```


Response to the second query &mdash;

```http
HTTP/1.1 200 OK
Content-Type: application/json
...
```
```json
{
    "LastItemIncluded": "TRUE",
    "NumItems": 2,
    "Items": [
        {
            "__name": {
                "S": "24.20180601"
            },
            "driver_id": {
                "N": "24"
            },
            "date": {
                "S": "20180601"
            },
            "avg_ride_km": {
                "N": "41.5"
            },
            "avg_ride_passengers": {
                "N": "2.25"
            }
        },
        {
            "__name": {
                "S": "24.20180602"
            },
            "driver_id": {
                "N": "24"
            },
            "date": {
                "S": "20180602"
            },
            "avg_ride_km": {
                "N": "52"
            },
            "avg_ride_passengers": {
                "N": "2.2"
            }
        }
    ]
}
```

