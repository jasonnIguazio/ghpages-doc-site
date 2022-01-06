---
title:  "UpdateStream"
keywords: "UpdateStream, update stream, streaming, stream configuration, stream shards, shards, shard count, ShardCount"
menu:
  main:
    parent:       "streaming-web-api"
    identifier:   "streaming-web-api-updatestream"
    weight:   50
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Updates a stream's configuration by increasing its shard count.
The changes are applied immediately.

{{< note id="spark-streaming-consume-after-shard-increase" title="Spark-Streaming Note" >}}
In v{{< productVersion >}}, to use the {{< xref f="data-layer/reference/spark-apis/spark-streaming-integration-api/" text="Spark Streaming API" >}} to consume records from new shards after a shard-count increase, you must first restart the consumer application.
{{< comment >}}<!-- See [c-spark-streaming-consume-after-shard-increase] in the sw-specifications.md specs page. -->
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
X-v3io-function: UpdateStream
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "UpdateStream",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the stream to be updated.
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
    "ShardCount": number,
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "StreamName": "string",
            "ShardCount": number
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- StreamName -->
  {{< param-doc name="StreamName" id="req-param-StreamName" >}}
  The name of the stream to be updated.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
 {{< /param-doc >}}

  <!-- ShardCount -->
  {{< param-doc name="ShardCount" id="req-param-ShardCount" >}}
  The stream's new shard count (total number of shards in the stream).<br/>
  The new shard count cannot be smaller than the current shard count.

  {{< note >}}
If you increase a stream's shard count after its creation, new records with a previously used partition key might be assigned to a new shard.
See {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}, and <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" >}}</api>.
  {{< /note >}}

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
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
  <td><api>InvalidShardCountException</api></td>
  <td>The provided shard count is not larger than the current number of shards within the stream.
  </td>
</tr>
<tr>
  <td><api>ResourceNotFoundException</api></td>
  <td>The specified resource does not exist.</td>
</tr>
<tr>
  <td><api>ResourceNotStreamException</api></td>
  <td>The specified resource is not a stream.</td>
</tr>
<tr>
  <td><api>Permission denied</api></td>
  <td>The sender of the request does not have the required permissions to perform the operation.
  </td>
</tr>
{{< /web-api-errors >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Update the shard count of a MyStream stream to 200:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyStream/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: UpdateStream
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "ShardCount": 200
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyStream/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "UpdateStream",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {"ShardCount": 200}

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

