---
title:  "UpdateItem"
keywords: "UpdateItem, update item, update items, nosql, tables, table items, attributes, change attributes, edit attributes, edit items, condition expressions, update expressions, if-then, if-then-else, item names, object names, primary key, sharding key, sorting key, range scan, AlternateUpdateExpression, ConditionExpression, Key, TableName, UpdateExpression"
menu:
  main:
    parent:       "nosql-web-api"
    identifier:   "nosql-web-api-updateitem"
    weight:       40
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Updates the attributes of a table item.
If the specified item or table don't exist, the operation creates them.

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
X-v3io-function: UpdateItem
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "UpdateItem",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the item to update.
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
    "ConditionExpression":        "string",
    "UpdateExpression":           "string",
    "AlternateUpdateExpression":  "string"
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
            "ConditionExpression":        "string",
            "UpdateExpression":           "string",
            "AlternateUpdateExpression":  "string"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- TableName -->
  {{< param-doc name="TableName" id="req-param-TableName" >}}
  The table (collection) that contains the item &mdash; a relative table path within the configured data container or the end of such a path, depending on the resource configuration in the [request URL](#request-header-params-url-resource).
  See {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="request-resource" >}}.
  <br/>
  If the table doesn't exist, the operation will create it.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Key -->
  {{< param-doc name="Key" id="req-param-Key" >}}
  A primary-key attribute whose value is the item's primary-key value, which uniquely identifies the item within the table.
  The primary-key value is also the item's name and is stored by the {{< product lc >}} in the {{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__name" text="<attr>__name</attr>" >}} system attribute.
  When defining the key for the <api>UpdateItem</api> request by setting the <paramname>Key</paramname> JSON request parameter (instead of setting the key in the URL), the {{< product lc >}} also automatically defines a primary-key user attribute of the specified name, type, and value (the primary-key value).
  See also {{< xref f="data-layer/reference/web-apis/nosql-web-api/overview.md" a="nosql-item-name-n-primary-key" text="Item Name and Primary Key" >}}.

  {{< note id="key-req-param-notes" >}}
- <a id="compound-item-name-for-range-scans-note"></a>
    To support range scans, use a compound `<sharding key>.<sorting key>` primary-key value.
    For more information, see {{< xref f="data-layer/nosql/" >}}.
- <a id="primary-key-best-practices-note"></a>See the primary-key guidelines in the {{< xref f="data-layer/objects/object-names-and-keys/best-practices-primary-keys-n-workload-distribution.md" >}} guide.
  {{< /note >}}

  {{< param-type >}}<api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" text="Attribute" >}}</api> object{{< /param-type >}}
  {{< param-req "R" >}} if the item's name (primary key) is not set in the URL{{< /param-req >}}
  {{< /param-doc >}}

  <!-- UpdateExpression -->
  {{< param-doc name="UpdateExpression" id="req-param-UpdateExpression" >}}
  An update expression that specifies the changes to make to the item's attributes.
  See {{< xref f="data-layer/reference/expressions/update-expression.md" >}} for syntax details and examples.
  You can optionally use the [<paramname-b>ConditionExpression</paramname-b>](#req-param-ConditionExpression) request parameter to define a condition for executing the update expression.
  You can also use the [<paramname-b>AlternateUpdateExpression</paramname-b>](#req-param-AlternateUpdateExpression) parameter to define an alternate update expression to execute if the condition expression evaluates to `false`.
  When the update expression is executed, it's evaluated against the table item to be updated, if it exists.
  If the item doesn't exist, the update creates it (as well as the parent table if it doesn't exist).
  {{< comment >}}<!-- [IntInfo] (sharonl) (14.11.18) Initially, I added the
    following sentence between the two sentences above, but Gal S. thought it's
    more confusing than helpful (even though it's correct), so at his suggestion
    I removed it and integrated the remaining paragraph text into the previous
    paragraph. The same is also true for the AlternateUpdateExpression param.
  -->
  You can use the <func>{{< xref f="data-layer/reference/expressions/functions/exists-n-not-exists-functions/" a="if_not_exists" text="if_not_exists" >}}</func> function, for example, to conditionally update a specific attribute only if doesn't already exist in the item.
  {{< /comment >}}

  {{< note id="update-expression-req-param-notes" >}}
- <a id="nosql-structured-api-user-attrs-req-note"></a>To access the table
  with **Spark DataFrames** or **Presto**, the item must have a sharding-key
  user attribute, and in the case of a compound primary-key also a sorting-key
  user attribute; (for more efficient range scans, use a sorting-key attribute
  of type string).
    To access the table with **{{< getvar v="product.frames.name.long_lc" >}}**, the item must have a primary-key user attribute.
    The NoSQL Web API doesn't attach any special significance to such key user attributes, but to work with a structured-data API you must define the required attributes, set their values according to the value of the item's primary key (name) &mdash; which is composed of a sharding key and optionally also a sorting key &mdash; and refrain from modifying the values of these attributes.
    See also {{< xref f="data-layer/objects/object-names-and-keys/" a="sharding-n-sorting-keys" text="Sharding and Sorting Keys" >}}.
    {{< comment >}}<!-- [c-nosql-structured-api-user-attrs-req] -->
    <!-- [c-sorting-key-type]
        [c-partial-range-scan-for-non-string-sorting-key-spark-nosql-df]
        [c-partial-range-scan-for-non-string-sorting-key-presto] -->
    <!-- [IntInfo] (sharonl) These notes are also referenced from the
      description of the AlternateUpdateExpression request parameter. -->
    {{< /comment >}}
- <a id="empty-update-expr-note"></a>If the update or alternate-update expression is an empty string, the item will be created if it doesn't already exist, but no user attributes will be added or modified (other than adding a primary-key attribute for a new item if the [<paramname>Key</paramname>](#req-param-Key) parameter is set in the request body), and the request will complete successfully (HTTP status code 200).
    {{< comment >}}<!-- [c-nosql-web-api-empty-update-or-alt-update-expr]
      (sharonl) (4.11.19) Added at the request of Orit and Ortal. See the
      correspondence on the "A question about the IN operator in expressions"
      email thread. -->
    {{< /comment >}}
  {{< /note >}}

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- AlternateUpdateExpression -->
  {{< param-doc name="AlternateUpdateExpression" id="req-param-AlternateUpdateExpression" >}}
  An alternate update expression that specifies the changes to make to the item's attributes when a condition expression, defined in the [<paramname-b>ConditionExpression</paramname-b>](#req-param-ConditionExpression) request parameter, evaluates to `false`; (i.e., this parameter defines the `else` clause of a conditional `if-then-else` update expression).
  See {{< xref f="data-layer/reference/expressions/update-expression.md" >}} for syntax details and examples.
  When the alternate update expression is executed, it's evaluated against the table item to be updated, if it exists.
  If the item doesn't exist, the update creates it (as well as the parent table if it doesn't exist).
  See also the [<paramname>UpdateExpression</paramname> notes](#update-expression-req-param-notes), which apply to the alternate update expression as well.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- ConditionExpression -->
  {{< param-doc name="ConditionExpression" id="req-param-ConditionExpression" >}}
  A Boolean condition expression that defines a conditional logic for executing the update operation.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" >}} for syntax details and examples.
  The condition expression is evaluated against the table item to be updated, if it exists.
  Note:

  - If the condition expression evaluates to `true` &mdash; including in the case of an empty condition-expression string &mdash; the update expression that's assigned to the [<paramname-b>UpdateExpression</paramname-b>](#req-param-UpdateExpression) request parameter is executed.
      {{< comment >}}<!-- [c-nosql-web-api-empty-cond-expr] (sharonl) (4.11.19)
        The empty-string reference was added at the request of Orit and Ortal.
        See the correspondence on the "A question about the IN operator in
        expressions" email thread. -->
      {{< /comment >}}
  - If the condition expression evaluates to `false` &mdash; including when the expression references a non-existing item attribute &mdash; the alternate update expression that's assigned to the [<paramname-b>AlternateUpdateExpression</paramname-b>](#req-param-AlternateUpdateExpression) parameter is executed; if no alternate update expression is provided, the operation completes successfully without an update.
      {{< note >}}
In v{{< productVersion num >}}, when <api>ConditionExpression</api> evaluates to `false`, <api>UpdateItem</api> returns a 400 error even though the operation is considered successful.
      {{< /note >}}
      {{< comment >}}<!-- [ci-shortcode-w-content-in-list-items] (sharonl)
        (29.7.19) I was unable to align this note with the parent list item. -->
        <!-- [IntInfo] (sharonl) (29.7.19) A similar note was previously only
        part of the PutItem doc, but Ortal confirmed that it also applies to
        UpdateItem. -->
      {{< /comment >}}

  {{< comment >}}<!-- [IntInfo] (sharonl) (1.11.18) Gal explained that it's not
    possible to create an empty item, because if the item doesn't exist, even
    if the executed update expression has an if_not_exists condition for a
    specific attribute, it will always evaluate to true because there are no
    item attributes yet.
    (29.7.19) I rephrased the description in consultation with Ortal. This was
    done in relation to DOC Bug IG-12853 but the changes extended beyond the
    scope of this bug.
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
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="response" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-data" none="1" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

<!-- ======================================== -->
### Example 1 &mdash; a Basic Update Expression {#example-1}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

For a "MySupermarket" table in the "mycontainer" container, set the value of the <attr>manager</attr> attribute of the item named "beverages" to "Jackson S."; if the attribute exists, overwrite its current value, and if it doesn't exist create it.
Add an <attr>expenses</attr> attribute with the value 0 only if the item doesn't already have such an attribute; (if the attribute exists, it will be reassigned its current value).
If the item or table don't exist, create them and assign the item the specified update-attribute values.

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: UpdateItem
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "TableName":        "MySupermarket",
    "Key":              {"department": {"S": "beverages"}},
    "UpdateExpression": "SET manager='Jackson S.'; SET expenses = if_not_exists(expenses,0);"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "UpdateItem",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {
            "TableName":        "MySupermarket",
            "Key":              {"department": {"S": "beverages"}},
            "UpdateExpression":
            "SET manager='Jackson S.'; SET expenses = if_not_exists(expenses,0);"
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

<!-- ======================================== -->
### Example 2 &mdash; an If-Then Update Expression {#example-2}

For a "Cars" table in the "mycontainer" container, set the value of the <attr>Alarm</attr> attribute of the item named 321234 to "ON" if the item has a <attr>State</attr> attribute whose value is either "Broken" or "Attention".
If the item doesn't have an <attr>Alarm</attr> attribute, create the attribute, provided the state condition is fulfilled.
If the item or table don't exist, create them and assign the item the specified alarm attribute value.

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example2-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/Fleet/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: UpdateItem
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "TableName":            "Cars",
    "Key":                  {"carReg": {"N": "321234"}},
    "ConditionExpression":  "State IN ('Broken', 'Attention')",
    "UpdateExpression":     "SET Alarm='ON'"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/Fleet/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "UpdateItem",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {
            "TableName":            "Cars",
            "Key":                  {"carReg": {"N": "321234"}},
            "ConditionExpression":  "State IN ('Broken', 'Attention')",
            "UpdateExpression":     "SET Alarm='ON'"
          }

response = requests.post(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response" id="example2-response" >}}

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

<!-- ======================================== -->
### Example 3 &mdash; an If-Then-Else Update Expression {#example-3}

For a "site1" table in a <dirname>data</dirname> directory in the "mycontainer" container, update attributes of the item named "13"; (the item path is set as part of the URL in the request header): if the value of the item's <attr>is_init</attr> attribute is `true`, increase the current values of its <attr>a</attr>, <attr>b</attr>, <attr>c</attr>, and <attr>d</attr> attributes by 1.
Otherwise (i.e., if `is_init` is `false` or isn't defined, or if the item doesn't exist), initialize attributes <attr>a</attr>, <attr>b</attr>, <attr>c</attr>, and <attr>d</attr> to 0, 10, 0, and 120 (respectively) and set the value of the <attr>is_init</attr> attribute to `true`; if the item or table don't exist, create them.

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example3-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/data/site1/13 HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: UpdateItem
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "ConditionExpression":        "is_init==true",
    "UpdateExpression":           "a=a+1; b=b+1; c=c+1; d=d+1;",
    "AlternateUpdateExpression":  "a=0; b=10; c=0; d=120; is_init=true;"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/data/site1/13"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "UpdateItem",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {
            "ConditionExpression":        "is_init==true",
            "UpdateExpression":           "a=a+1; b=b+1; c=c+1; d=d+1;",
            "AlternateUpdateExpression":  "a=0; b=10; c=0; d=120; is_init=true;"
          }

response = requests.post(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response" id="example3-response" >}}

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

