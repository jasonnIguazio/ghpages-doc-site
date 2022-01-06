---
title:  "PutItem"
keywords: "PutItem, put item, put items, nosql, tables, table items, attributes, condition expressions, item names, object names, attribute names, primary key, sharding key, sorting key, range scan, ConditionExpression, Key, Item, TableName"
menu:
  main:
    parent:       "nosql-web-api"
    identifier:   "nosql-web-api-putitem"
    weight:       30
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Creates an item with the provided attributes.
If an item with the same name (primary key) already exists in the specified table, the existing item is completely overwritten (replaced with a new item).
If the item or table do not exist, the operation creates them.

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
X-v3io-function: PutItem
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "PutItem",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the item to add.
The path includes the table path and the item's name (primary key).
You can optionally set the item name in the request's <paramname>[Key](#req-param-Key)</paramname> JSON parameter instead of in the URL; you can also optionally set the relative table path within the container, or part of the path, in the request's <paramname>[TableName](#req-param-TableName)</paramname> JSON parameter.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{
    "TableName": "string",
    "Key": {
        "string": {
            "S": "string",
            "N": "string"
        }
    },
    "ConditionExpression": "string",
    "Item": {
        "string": {
            "S":     "string",
            "N":     "string",
            "BOOL":  Boolean,
            "B":     "blob"
        }
    }
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "TableName": "string",
            "Key": {
                "string": {
                    "S": "string",
                    "N": "string"
                }
            },
            "ConditionExpression": "string",
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
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- TableName -->
  {{< param-doc name="TableName" id="req-param-TableName" >}}
  The table (collection) to which the new item should be added &mdash; a relative table path within the configured data container or the end of such a path, depending on the resource configuration in the [request URL](#request-header-params-url-resource).
  See {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="request-resource" >}}.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Key -->
  {{< param-doc name="Key" id="req-param-Key" >}}
  A primary-key attribute whose value is the item's primary-key value, which uniquely identifies the item within the table.
  The primary-key value is also the item's name and is stored by the {{< product lc >}} in the {{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__name" text="<attr>__name</attr>" >}} system attribute.
  When defining the key for the <api>PutItem</api> request by setting the <paramname>Key</paramname> JSON request parameter (instead of setting the key in the URL), the {{< product lc >}} also automatically defines a primary-key user attribute of the specified name, type, and value (the primary-key value).
  See also {{< xref f="data-layer/reference/web-apis/nosql-web-api/overview.md" a="nosql-item-name-n-primary-key" text="Item Name and Primary Key" >}}.

  {{< note id="key-req-param-notes" >}}
- <a id="compound-item-name-for-range-scans-note"></a>
    To support range scans, use a compound `<sharding key>.<sorting key>` primary-key value.
    For more information, see {{< xref f="data-layer/nosql/" >}}.
- <a id="primary-key-best-practices-note"></a>See the primary-key guidelines in the {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" >}} guide.
  {{< /note >}}

  {{< param-type >}}<api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" text="Attribute" >}}</api> object{{< /param-type >}}
  {{< param-req >}}Required if the item's name (primary key) is not set in the URL{{< /param-req >}}
  {{< /param-doc >}}

  <!-- ConditionExpression -->
  {{< param-doc name="ConditionExpression" id="req-param-ConditionExpression" >}}
  A Boolean condition expression that defines a conditional logic for executing the put-item operation.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" >}} for syntax details and examples.
  The condition expression is evaluated against the table item to be updated, if it exists.
  Note:

  - If the condition expression evaluates to `true` &mdash; including in the case of an empty condition-expression string &mdash; the item is created or overwritten (if it already exists).
      {{< comment >}}<!-- [c-nosql-web-api-empty-cond-expr] (sharonl) (4.11.19)
        The empty-string reference was added at the request of Orit and Ortal.
        See the correspondence on the "A question about the IN operator in
        expressions" email thread. -->
      {{< /comment >}}
  - If the condition expression evaluates to `false` &mdash; including when the expression references a non-existing item attribute &mdash; the operation completes successfully without creating or overwriting the item.
      {{< note >}}
In v{{< productVersion num >}}, when <api>ConditionExpression</api> evaluates to `false`, <api>PutItem</api> returns a 400 error even though the operation is considered successful.
      {{< /note >}}
      {{< comment >}}<!-- [ci-shortcode-w-content-in-list-items] (sharonl)
        (29.7.19) I was unable to align this note with the parent list item. -->
      {{< /comment >}}

  {{< comment >}}<!-- [IntInfo] (sharonl) (29.7.19) I rephrased the description
    in consultation with Ortal. This was done in relation to DOC Bug IG-12853
    but the changes extended beyond the scope of this bug.
    Ortal confirmed that referencing a non-existing attribute covers also a
    reference to any attribute for a non-existing item, but I decided that
    indicating this explicitly would just complicate the doc.
    When the expression references a non-existing attribute, the processing
    stops, as we previously documented for the UpdateItem operation, but as
    part of the doc rephrasing I also decided not to mention this, for the sake
    of simplicity. -->
  {{< /comment >}}

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Item -->
  {{< param-doc name="Item" id="req-param-Item" >}}
  The item to add &mdash; an object containing zero or more attributes.

  {{< note id="item-req-param-notes" >}}
- <a id="user-primary-key-attr-note"></a>As explained in the description of the [<paramname>Key</paramname>](#req-param-Key) parameter, when this parameter is set in the JSON request body, the {{< product lc >}} defines a primary-key user attribute whose value is the item's name and primary-key value, which is also always stored in the item's {{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__name" text="<attr>__name</attr>" >}} system attribute.
    If you select to include in your request's <paramname>Item</paramname> object an attribute with the same name as specified in the <paramname>Key</paramname> parameter (even though this is redundant), make sure to set the value of this attribute to the same primary-key value as set in the <paramname>Key</paramname> parameter.
- <a id="nosql-structured-api-user-attrs-req-note"></a>To access the table with **Spark DataFrames** or **Presto**, the item must have a sharding-key user attribute, and in the case of a compound primary-key also a sorting-key user attribute; (for more efficient range scans, use a sorting-key attribute of type string).
    To access the table with **{{< getvar v="product.frames.name.long_lc" >}}**, the item must have a primary-key user attribute.
    The NoSQL Web API doesn't attach any special significance to such key user attributes, but to work with a structured-data API you must define the required attributes, set their values according to the value of the item's primary key (name) &mdash; which is composed of a sharding key and optionally also a sorting key &mdash; and refrain from modifying the values of these attributes.
    See also {{< xref f="data-layer/objects/object-names-and-keys/" a="sharding-n-sorting-keys" text="Sharding and Sorting Keys" >}}.
    {{< comment >}}<!-- [c-nosql-structured-api-user-attrs-req] -->
    <!-- [c-sorting-key-type]
        [c-partial-range-scan-for-non-string-sorting-key-spark-nosql-df]
        [c-partial-range-scan-for-non-string-sorting-key-presto] -->
    {{< /comment >}}
  {{< /note >}}

  {{< param-type >}}An item JSON object that contains zero or more <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" text="Attribute" >}}</api> objects{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="response" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-data" none="1" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

Add to the People table a person item with a primary-key <attr>ID</attr> attribute, and <attr>Name</attr>, <attr>Age</attr>, and <attr>Country</attr> attributes.
If the item already exists, it will be entirely overwritten:

{{< code-tabs >}}
  {{< tab "HTTP" >}}
  ```http
POST /mycontainer/MyDirectory/People/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: PutItem
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "Key": {"ID": {"N": "1234"}},
    "Item": {
        "Age":     {"N": "42"},
        "Country": {"S": "UK"},
        "Name":    {"S": "John"}
    }
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyDirectory/People/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "PutItem",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {
            "Key": {"ID": {"N": "1234"}},
            "Item": {
                "Age":      {"N": "42"},
                "Country":  {"S": "UK"},
                "Name":     {"S", "John"}
            }
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
```

