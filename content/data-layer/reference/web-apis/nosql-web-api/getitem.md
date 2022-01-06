---
title:  "GetItem"
keywords: "GetItem, get item, nosql, tables, table items, attributes, item names, object names, primary key, AttributesToGet, Key, TableName, Item"
menu:
  main:
    parent:     "nosql-web-api"
    identifier: "nosql-web-api-getitem"
    weight:     10
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Retrieves the requested attributes of a table item.

{{< note id="optimized-getitem-read-note" title="GetItem Read Optimization" >}}
Querying a table with <api>GetItem</api> is faster than a <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/getitems.md" text="GetItems" >}}</api> table scan, because <api>GetItem</api> searches for a specific object file on the data slice assigned to the item.
See {{< xref f="data-layer/nosql/" a="faster-item-specific-queries" >}}.
{{< comment >}}<!-- [InfInfo] (sharonl) (20.12.18) Ortal explained that GetItem
  is also faster than a GetItems range scan (in addition to the simpler code).
-->
{{< /comment >}}
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
X-v3io-function: GetItem
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "GetItem",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the item to retrieve.
The path includes the table path and the item's name (primary key).
You can optionally set the item name in the request's <paramname>[Key](#req-param-Key)</paramname> JSON parameter instead of in the URL; you can also optionally set the relative table path within the container, or part of the path, in the request's <paramname>[TableName](#req-param-TableName)</paramname> JSON parameter.
See {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="request-resource" >}}.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{
    "TableName":       "string",
    "Key": {
        "string": {
            "S":    "string",
            "N":    "string"
        }
    },
    "AttributesToGet": "string"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "TableName":        "string",
            "Key": {
                "string": {
                    "S": "string",
                    "N": "string"
                }
            },
            "AttributesToGet":  "string"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- TableName -->
  {{< param-doc name="TableName" id="req-param-TableName" >}}
  The table (collection) from which to retrieve the item &mdash; a relative table path within the configured data container or the end of such a path, depending on the resource configuration in the [request URL](#request-header-params-url-resource).
  See {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="request-resource" >}}.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Key -->
  {{< param-doc name="Key" id="req-param-Key" >}}
  A primary-key attribute whose value is the item's primary-key value and name, which uniquely identifies the item within the table (see {{< xref f="data-layer/reference/web-apis/nosql-web-api/overview.md" a="nosql-item-name-n-primary-key" text="Item Name and Primary Key" >}}).

  {{< note id="key-req-param-notes" >}}
  <a id="recalculated-sharding-key-even-distribution-multi-reads-note"></a>To retrieve all items for an original sharding-key value that was recalculated during the ingestion (to achieve a more even workload distribution), you need to repeat the <api<GetItem</api> request for each of the primary-key values that were used in the ingestion; (the primary-key value of the ingested item includes the recalculated sharding-key value).
  If the ingestion was done by using the even-distribution option of the NoSQL Spark DataFrame, you need to repeat the request with <paramname>Key</paramname> values that range from `<original sharding key>_1.<sorting-key value>` to `<original sharding key>_<n>.<sorting-key value>`, where `<n>` is the value of the <api>{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_name" >}}</api> configuration property (default = {{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}}); for example, `johnd_1.20180602 .. johnd_{{< verkey k="cfg_properties.nosql_range_scan_buckets_count_default_value" >}}.20180602`.
  For more information, see {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" a="sharding-key-values-recalculation-for-even-workload-distribution" text="Recalculating Sharding-Key Values for Even Workload Distribution" >}}.
  {{< comment >}}<!-- [c-spark-df-even-distribution-multi-web-api-reads] -->
  {{< /comment >}}
  {{< /note >}}

  {{< param-type >}}<api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" text="Attribute" >}}</api> object{{< /param-type >}}
  {{< param-req "R" >}} if the item's name (primary key) is not set in the URL{{< /param-req >}}
  {{< /param-doc >}}

  <!-- AttributesToGet -->
  {{< param-doc name="AttributesToGet" id="req-param-AttributesToGet" >}}
  The item attributes to return.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`"*"`{{< /param-default-value >}}

  The attributes to return can be depicted in one of the following ways:

  - A comma-separated list of attribute names.<br/>
      **Note:** Currently, the delimiter commas cannot be surrounded by spaces.
      {{< comment >}}<!-- [ci-shortcode-w-content-in-list-items]
        [sharonl] I didn't use the `note` shortcode because in all source
        alignment variations that I tried, using the note caused the text after
        the note to be formatted as a code block; and when I moved the text
        before the note, I wasn't able to align the note with the item text in
        the output; the note was always aligned with the list-item bullet. -->
      {{< /comment >}}

      The attributes can be of any attribute type &mdash; user, system, or hidden.

  - <def>"*"</def> &mdash; retrieve the item's {{< xref f="data-layer/objects/attributes.md" a="user-attributes" text="user attributes" >}}, but not its system or hidden attributes.
      This is the default value.

  - <def>"**"</def> &mdash; retrieve all item attributes &mdash; user, system, and hidden attributes.

  For an overview of the different attribute types, see {{< xref f="data-layer/objects/attributes.md" a="attribute-types" text="Attribute Types" >}}.
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
    "Item": {
        "string": {
            "S":    "string",
            "N":    "string",
            "BOOL": Boolean,
            "B":    "blob"
        }
    }
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

<dl>
  <!-- Item -->
  {{< param-doc name="Item" id="resp-param-Item" >}}
  The requested item attributes.
  Only attributes that were requested in the request's <paramname>[AttributesToGet](#req-param-AttributesToGet)</paramname> parameter are returned in the response.

  {{< param-type >}}An item JSON object that contains zero or more <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" text="Attribute" >}}</api> objects{{< /param-type >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Retrieve from the MyDirectory/People table the <attr>Name</attr>, <attr>Age</attr>, and <attr>Country</attr> attributes of a person whose primary-key value is 1234:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyDirectory/People/1234 HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: GetItem
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "AttributesToGet": "Name,Age,Country"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyDirectory/People/1234"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "GetItem",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {"AttributesToGet": "Name,Age,Country"}

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
    "Item": {
        "Age": {"N": "42"},
        "Country": {"S": "Zimbabwe"},
        "Name": {"S": "Shmerel"}
    }
}
```

