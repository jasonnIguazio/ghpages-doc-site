---
title:  "DescribeStream"
keywords: "DescribeStream, describe stream, streaming, stream configuration, stream shards, shards, shard count, ShardCount, stream retention, retention period, RetentionPeriodHours"
menu:
  main:
    parent:       "streaming-web-api"
    identifier:   "streaming-web-api-describestream"
    weight:   20
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Retrieves a stream's configuration, including the shard count and retention period.

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
X-v3io-function: DescribeStream
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "DescribeStream",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the target stream.
You can optionally set the stream name in the request's <paramname>[StreamName](#req-param-StreamName)</paramname> JSON parameter instead of in the URL.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{
    "StreamName": "string",
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {"StreamName": "string"}
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- StreamName -->
  {{< param-doc name="StreamName" id="req-param-StreamName" >}}
  The name of the stream for which to retrieve the description.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
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
    "ShardCount":            number,
    "RetentionPeriodHours":  number
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

<dl>
  <!-- ShardCount -->
  {{< param-doc name="ShardCount" id="resp-param-ShardCount" >}}
  The steam's shard count (the total number of shards in the stream).

  {{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- RetentionPeriodHours -->
  {{< param-doc name="RetentionPeriodHours" id="resp-param-RetentionPeriodHours" >}}
  The stream's retention period, in hours.
  After this period elapses, when new records are added to the stream, the earliest ingested records are deleted.

  {{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}
</dl>

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
<tr>
  <td><api>ResourceNotFoundException</api></td>
  <td>The specified resource does not exist.</td>
  </td>
</tr>
</tr>
{{< /web-api-errors >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Retrieve configuration information for a MyStream stream:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyStream/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: DescribeStream
X-v3io-session-key: {{% productUI access_key_example %}}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyStream/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "DescribeStream",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }

response = requests.post(url, headers=headers)
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
    "RetentionPeriodHours": 1,
    "ShardCount": 1000
}
```

