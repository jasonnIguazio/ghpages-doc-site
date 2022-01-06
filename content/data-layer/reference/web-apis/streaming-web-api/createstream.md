---
title:  "CreateStream"
keywords: "CreateStream, create stream, streaming, stream names, names, StreamName, stream shards, shards, shard count, ShardCount, stream retention, retention period, RetentionPeriodHours"
menu:
  main:
    parent:       "streaming-web-api"
    identifier:   "streaming-web-api-createstream"
    weight:   10
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Creates and configures a new stream.
The configuration includes the stream's shard count and retention period.
The new stream is available immediately upon its creation.

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
X-v3io-function: CreateStream
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "CreateStream",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the new stream.
You can optionally set the stream name in the request's <paramname>[StreamName](#req-param-StreamName)</paramname> JSON parameter instead of in the URL.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{
    "StreamName":           "string",
    "ShardCount":           number,
    "RetentionPeriodHours": number
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "StreamName":           "string",
            "ShardCount":           number,
            "RetentionPeriodHours": number
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- StreamName -->
  {{< param-doc name="StreamName" id="req-param-StreamName" >}}
  A unique name for the new stream (collection) that will be created.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
 {{< /param-doc >}}

  <!-- ShardCount -->
  {{< param-doc name="ShardCount" id="req-param-ShardCount" >}}
  The steam's shard count, i.e., the number of stream shards to create.

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< param-values >}}A positive integer (>= 1).  For example, `100`.
  {{< /param-values >}}
  {{< param-default-value >}}`1`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- RetentionPeriodHours -->
  {{< param-doc name="RetentionPeriodHours" id="req-param-RetentionPeriodHours" >}}
  The stream's retention period, in hours. After this period elapses, when new records are added to the stream, the earliest ingested records are deleted.

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< param-values >}}A positive integer (>= 1).  For example, `2` (2 hours).
  {{< /param-values >}}
  {{< param-default-value >}}`24` (1 day){{< /param-default-value >}}
  {{< /param-doc >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (17.11.19) Ortal said that 0 isn't a
    valid value for this parameter. -->
  {{< /comment >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="response" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-data" none="1" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="errors" >}}

{{< web-api-errors >}}
<tr>
  <td><api>InvalidArgumentException</api></td>
  <td>A provided request parameter is not valid for this request.
  </td>
</tr>
<tr>
  <td><api>Permission denied</api></td>
  <td>The sender of the request does not have the required permissions to perform the operation.
  </td>
</tr>
<tr>
  <td><api>ResourceInUseException</api></td>
  <td>A collection already exists in the specified stream path.</td>
  </td>
</tr>
{{< /web-api-errors >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Create a stream named mycontainer with 1000 shards and a retention period of one hour:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyStream/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: CreateStream
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "ShardCount":           1000,
    "RetentionPeriodHours": 1
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyStream/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "CreateStream",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {"ShardCount": 1000, "RetentionPeriodHours": 1}

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

