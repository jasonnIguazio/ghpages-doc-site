---
title:  "GetRecords"
keywords: "GetRecords, get records, streaming, stream records, stream consumption, stream shards, sharding, stream seek, Seek, PutRecords, stream partitions, partitioning, record metadata, record sequence number, record arrival time, record location, ArrivalTimeNSec, ArrivalTimeSec, ClientInfo, Location, PartitionKey, SequenceNumber, ShardId"
menu:
  main:
    parent:       "streaming-web-api"
    identifier:   "streaming-web-api-getrecords"
    weight:   30
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Retrieves (consumes) records from a stream shard.

{{< note id="get-location-note" title="Determining the Start Location" >}}
Before submitting a <api>GetRecords</api> request, you need to determine the location within the shard at which to begin the record consumption.
Before the first request for a specific shard, send a <api>Seek</api> request to get the desired location (see the <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" >}}</api> <jsonkey>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" a="resp-param-Location" text="Location" >}})</jsonkey> response element.
In subsequent <api>GetRecords</api> requests, pass the <jsonkey>NextLocation</jsonkey> value that you received in a previous <api>GetRecords</api> response as the <paramname>Location</paramname> value for the current request.
See the descriptions of <paramname>[Location](#req-param-Location)</paramname> and <jsonkey>[NextLocation](#resp-param-NextLocation)</jsonkey>, and the {{< xref f="data-layer/stream/" a="stream-record-consumption" text="Stream Record Consumption" >}} overview.
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
X-v3io-function: GetRecords
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "GetRecords",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the stream shard from which to retrieve the records.
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
    "StreamName": "string",
    "ShardId":    number,
    "Location":   "blob",
    "Limit":      number
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "StreamName": "string",
            "ShardId":    number,
            "Location":   "blob",
            "Limit":      number
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
  The ID of the shard from which to retrieve records.<br/>
  The shard ID is an integer between 0 and one less than the stream's shard count.

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "R-or-url" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Location -->
  {{< param-doc name="Location" id="req-param-Location" >}}
  The location within the shard at which to begin consuming records.

  {{< note >}}
  The location must be exactly as received either in the <jsonkey>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" a="resp-param-Location" text="Location" >}}</jsonkey> element of a previous <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" >}}</api> response or in the <jsonkey>[NextLocation](#resp-param-NextLocation)</jsonkey> element of a previous <api>GetRecords</api> response.
See [Determining the Start Location](#get-location-note) in the operation description above.
Do not attempt to calculate the location yourself.
  {{< /note >}}

  {{< param-type >}}{{< text-blob-type >}}{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Limit -->
  {{< param-doc name="Limit" id="req-param-Limit" >}}
  The maximum number of records to return in the response.
  The minimum is 1.
  There's no restriction on the amount of returned records, but the maximum supported overall size of all the returned records is <nobr>10 MB</nobr> and the maximum size of a single record is 2 MB, so calculate the limit accordingly.
  {{< comment >}}<!-- [IntInfo] (sharonl) See the "#stream-web-api-getrecords-max-records-size" info in the sw-specifications.md specs page. -->
  {{< /comment >}}

  {{< param-type >}}Number{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}1000{{< /param-default-value >}}
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
    "NextLocation":         "blob",
    "MSecBehindLatest":     number,
    "RecordsBehindLatest":  number,
    "Records": [
        {
            "ArrivalTimeSec":   number,
            "ArrivalTimeNSec":  number,
            "SequenceNumber":   number,
            "ClientInfo":       "blob",
            "PartitionKey":     "string",
            "Data":             "blob"
        }
    ]
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

<dl>
  <!-- NextLocation -->
  {{< param-doc name="NextLocation" id="resp-param-NextLocation" >}}
  The location of the next shard record to consume (based on the records' sequence numbers).
  This value should be used as the value of the <paramname>[Location](#req-param-Location)</paramname> parameter in a subsequent <api>GetRecords</api> request.
  See also [Determining the Start Location](#get-location-note) in the operation description above.

  {{< param-type >}}{{< text-blob-type >}}{{< /param-type >}}
  {{< /param-doc >}}

  <!-- MSecBehindLatest -->
  {{< param-doc name="MSecBehindLatest" id="resp-param-MSecBehindLatest" >}}
  The difference in the ingestion time of the last record returned in the response and the latest ingested record in the shard, in milliseconds.

  {{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- RecBehindLatest -->
  {{< param-doc name="RecBehindLatest" id="resp-param-RecBehindLatest" >}}
  The difference between the last record returned in the response and the latest ingested record in the shard, in number of records.
  A value of 0 means that the latest record in the shard has been consumed.

  {{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Records -->
  {{< param-doc name="Records" id="resp-param-Records" >}}
  An array of the requested records.

  {{< param-type >}}Array of record JSON objects{{< /param-type >}}

  The record JSON object contains these elements:

  <dl>
  <!-- Records[i].ArrivalTimeSec -->
  {{< param-doc name="ArrivalTimeSec" id="resp-param-Records-ArrivalTimeSec" >}}
  The record's ingestion time (the time at which the record arrived at the {{< product lc >}}), as a Unix timestamp in seconds.
  For example, `1511260205` indicates that the record was ingested on 21 Nov 2017 at 10:30:05 AM.
  The [<paramname>ArrivalTimeNSec</paramname>](#resp-param-Records-ArrivalTimeNSec) response element holds the nanoseconds unit of the ingestion time.

{{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Records[i].ArrivalTimeNSec -->
  {{< param-doc name="ArrivalTimeNSec" id="resp-param-Records-ArrivalTimeNSec" >}}
  The nanoseconds unit of the [<paramname>ArrivalTimeSec</paramname>](#resp-param-Records-ArrivalTimeSec) ingestion-time timestamp.
  For example, if <paramname>ArrivalTimeSec</paramname> is `1511260205` and <paramname>ArrivalTimeNSec</paramname> is `500000000`, the record was ingested on 21 Nov 2017 at 10:30 AM and 5.5 seconds.

  {{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Records[i].SequenceNumber -->
  {{< param-doc name="SequenceNumber" id="resp-param-Records-SequenceNumber" >}}
The record's sequence number, which uniquely identifies the record within the shard.
This ID number can be used in a sequence-based <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" >}}</api> operation to get the location of a specific record within a given stream shard.

{{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Records[i].ClientInfo -->
  {{< param-doc name="ClientInfo" id="resp-param-Records-ClientInfo" >}}
  Custom opaque information, if provided by the producer.
  This metadata can be used, for example, to save the data format of a record, or the time at which a sensor or application event was triggered.
  See {{< xref f="data-layer/stream/" a="record-metadata" text="Record Metadata" >}}.

  {{< param-type >}}{{< text-blob-type >}}{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Records[i].PartitionKey -->
  {{< param-doc name="PartitionKey" id="resp-param-Records-PartitionKey" >}}
  The partition key associated with the record, if provided by the producer (see the <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" >}}</api> <paramname>{{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" a="req-param-Records-PartitionKey" text="PartitionKey" >}}</paramname> record request parameter, and {{< xref f="data-layer/stream/" a="record-metadata" text="Record Metadata" >}}).
  Records with the same partition key are assigned to the same shard.
  See {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}.

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Records[i].Data -->
  {{< param-doc name="Data" id="resp-param-Records-Data" >}}
  Record data, as provided by the producer (see <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" >}}</api>).

  {{< param-type >}}{{< text-blob-type >}}{{< /param-type >}}
  {{< /param-doc >}}
  </dl>
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="errors" >}}

{{< web-api-errors >}}
<tr>
  <td><api>IllegalLocation</api></td>
  <td>The specified record location does not exist in the shard.
      The requested records may have moved.
      Perform another <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" >}}</api> operation to get an updated location).
  </td>
</tr>
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

Retrieve the first two records from location "AQAAAAAAAAAAAAAAAAAAAA==" in shard 199 of a MyStream stream:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyDirectory/MyStream/199 HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: GetRecords
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "Location": "AQAAAAAAAAAAAAAAAAAAAA==",
    "Limit":    2
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyDirectory/MyStream/199"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "GetRecords",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {"Location": "AQAAAAAAAAAAAAAAAAAAAA==", "Limit": 2}

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
    "NextLocation": "AQAAAAsAAAAFAEC2/+sAAA==",
    "MSecBehindLatest": 0,
    "RecordsBehindLatest": 0,
    "Records": [
        {
            "ArrivalTimeSec": 1485685671,
            "ArrivalTimeNSec": 160186781,
            "SequenceNumber": 15756,
            "PartitionKey": "MyKey",
            "Data": "ZGF0YQ0K"
        }
    ]
}
```

