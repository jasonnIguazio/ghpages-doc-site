---
title:  "Seek"
keywords: "Seek, stream seek, seek records, streaming, seek types, stream records, stream consumption, GetRecords, stream shards, record arrival time, record sequence number, record location, Location, StartingSequenceNumber, TimestampNSec, TimestampSec"
menu:
  main:
    parent:       "streaming-web-api"
    identifier:   "streaming-web-api-seek"
    weight:       40
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Returns the requested location within the specified stream shard, for use
in a subsequent <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/getrecords.md" >}}</api> operation.
The operation supports different seek types, as outlined in the {{< xref f="data-layer/stream/" a="stream-record-consumption" text="Stream Record Consumption" >}} overview and in the description of the <paramname>[Type](#req-param-Type)</paramname> request parameter below.

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
X-v3io-function: Seek
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "Seek",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the target stream shard.
The path includes the stream path and the shard ID.
You can optionally set the stream name and shard ID, or only the shard ID, in the request's <paramname>[StreamName](#req-param-StreamName)</paramname> and <paramname>[ShardId](#req-param-ShardId)</paramname> JSON parameters instead of in the URL.

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{
    "StreamName":             "string",
    "ShardId":                number,
    "Type":                   "string",
    "TimestampSec":           number,
    "TimestampNSec":          number,
    "StartingSequenceNumber": number
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "StreamName":              "string",
            "ShardId":                 number,
            "Type":                    "string",
            "TimestampSec":            number,
            "TimestampNSec":           number,
            "StartingSequenceNumber":  number
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- StreamName -->
  {{< param-doc name="StreamName" id="req-param-StreamName" >}}
  The name of the stream that contains the shard resource.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- ShardId -->
  {{< param-doc name="ShardId" id="req-param-ShardId" >}}
  The ID of the shard for which to obtain the requested location.<br/>
  The shard ID is an integer between 0 and one less than the stream's shard count.

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Type -->
  {{< param-doc name="Type" id="req-param-Type" >}}
  The seek type, which determines the location in the specified stream shard to retrieve.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}

  The following seek types are supported:

  - <a id="seek-type-earliest"></a><def>"EARLIEST"</def> &mdash; the location of the earliest ingested record in the shard.

  - <a id="seek-type-latest"></a><def>"LATEST"</def> &mdash; the location of the end of the shard.

  - <a id="seek-type-time"></a><def>"TIME"</def> &mdash; the location of the earliest ingested record in the shard beginning at the base time set in the <paramname>[TimestampSec](#req-param-TimestampSec)</paramname> and <paramname>[TimestampNSec](#req-param-TimestampNSec)</paramname> request parameters.
      If no matching record is found (i.e., if all records in the shard arrived before the specified base time) the operation returns the location of the end of the shard.

  - <a id="seek-type-sequence"></a><def>"SEQUENCE"</def> &mdash; the location of the record whose sequence number matches the sequence number specified in the <paramname>[StartingSequenceNumber](#req-param-StartSequenceNumber)</paramname> request parameter.
      If no match is found, the operation fails.
  {{< /param-doc >}}

  <!-- TimestampSec -->
  {{< param-doc name="TimestampSec" id="req-param-TimestampSec" >}}
  The base time for a time-based seek operation (<paramname>[Type](#req-param-Type)</paramname>=<api>[TIME](#seek-type-time)</api>), as a Unix timestamp in seconds.
  For example, `1511260205` sets the search base time to 21 Nov 2017 at 10:30:05 AM UTC.
  The [<paramname>TimestampNSec</paramname>](#req-param-TimestampNSec) request parameter sets the  nanoseconds unit of the seek base time.
  <br/>
  When the <paramname>TimestampSec</paramname> and <paramname>TimestampNSec</paramname> parameters are set, the operation searches for the location of the earliest ingested record in the shard (the earliest record that arrived at the {{< product lc >}}) beginning at the specified base time.
  If no matching record is found (i.e., if all records in the shard arrived before the specified base time), return the last location in the shard.

{{< param-type >}}Number{{< /param-type >}}
{{< param-req "R" >}} when the value of the <paramname>[Type](#req-param-Type)</paramname> request parameter is <api>[TIME](#seek-type-time)</api>{{< /param-req >}}
  {{< /param-doc >}}

  <!-- TimestampNSec -->
  {{< param-doc name="TimestampNSec" id="req-param-TimestampNSec" >}}
  The nanoseconds unit of the [<paramname>TimestampSec</paramname>](#req-param-TimestampSec) base-time timestamp for a time-based seek operation (<paramname>[Type](#req-param-Type)</paramname>=<api>[TIME](#seek-type-time)</api>).
  For example, if <paramname>TimestampSec</paramname> is `1511260205` and <paramname>TimestampNSec</paramname> is `500000000`, seek should search for the earliest ingested record since 21 Nov 2017 at 10:30 AM and 5.5 seconds.

{{< param-type >}}Number{{< /param-type >}}
{{< param-req "R" >}} when the value of the <paramname>[Type](#req-param-Type)</paramname> request parameter is <api>[TIME](#seek-type-time)</api>{{< /param-req >}}
    {{< comment >}}<!-- [IntInfo] (sharonl) (28.6.18) I verified with Ortal
      that TimestampNSec is required when the seek type is TIME (i.e., it
      doesn't default to 0). -->
    {{< /comment >}}
  {{< /param-doc >}}

  <!-- StartSequenceNumber -->
  {{< param-doc name="StartSequenceNumber" id="req-param-StartSequenceNumber" >}}
  Record sequence number for a sequence-number based seek operation &mdash; <paramname>[Type](#req-param-Type)</paramname>=<api>[SEQUENCE](#seek-type-sequence)</api>.
  When this parameter is set, the operation returns the location of the record whose sequence number matches the parameter.

  {{< param-type >}}Number{{< /param-type >}}
{{< param-req "R" >}} when the value of the <paramname>[Type](#req-param-Type)</paramname> request parameter is <api>[SEQUENCE](#seek-type-sequence)</api>{{< /param-req >}}
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
    "Location": "blob"
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

<dl>
  <!-- Location -->
  {{< param-doc name="Location" id="resp-param-Location" >}}
  The requested location within the specified stream shard (see the [<paramname>Type</paramname>](#req-param-Type) request parameter).

  {{< param-type >}}{{< text-blob-type >}}{{< /param-type >}}
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
</tr>
<tr>
  <td><api>ResourceNotFoundException</api></td>
  <td>The specified resource does not exist.</td>
</tr>
<tr>
  <td><api>ShardIDOutOfRangeException</api></td>
  <td>The specified shard does not exist in this stream.
  </td>
</tr>
{{< /web-api-errors >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Obtain the location of the earliest ingested record in shard 199 of a MyStream stream:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyDirectory/MyStream/199 HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: Seek
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "Type": "EARLIEST"
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyDirectory/MyStream/199"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "Seek",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {"Type": "EARLIEST"}

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
{"Location": "AQAAAAAAAAAAAAAAAAAAAA=="}
```

