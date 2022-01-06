---
title:  "PutRecords"
keywords: "PutRecords, put records, streaming, stream records, stream producer, stream shards, sharding, shard count, stream partitions, partitioning, partition key, UpdateStream, stream update, record metadata, record sequence number, ClientInfo, FailedRecordCount, PartitionKey, SequenceNumber, ShardId"
menu:
  main:
    parent:       "streaming-web-api"
    identifier:   "streaming-web-api-putrecords"
    weight:       30
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Adds records to a stream.

You can optionally assign a record to specific stream shard by specifying a related shard ID (see the <paramname>[Records.ShardId](#req-param-Records-ShardId)</paramname> request parameter), or associate the record with a specific partition key to ensure that similar records are assigned to the same shard (see the <paramname>[Records.PartitionKey](#req-param-Records-PartitionKey)</paramname> parameter).
By default, the platform assigns records to shards using a Round Robin algorithm.
For more information, see {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}.

{{< note id="max-json-body-size" >}}
The maximum JSON body size for <api>PutRecords</api> requests is 10 MB.
{{< comment >}}<!-- [IntInfo] (sharonl) See the "#stream-web-api-max-putrecords-json-body-size" info in the sw-specifications.md specs page. -->
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
X-v3io-function: PutRecords
<Authorization OR X-v3io-session-key>: <value>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "PutRecords",
            "<Authorization OR X-v3io-session-key>": "<value>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

The path to the stream to which to add the records.
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
    "Records": [
        {
            "ClientInfo":   "blob",
            "Data":         "blob",
            "PartitionKey": "string",
            "ShardId":      number
        }
    ]
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "Records": [
                {
                    "ClientInfo":  "MTIzNA0K",
                    "Data":        "ZGF0YQ0K"
                    }
                ]
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

  <!-- Records -->
  {{< param-doc name="Records" id="req-param-Records" >}}
  An array of one or more records to add to the stream, up to a maximum of 1,000 records.
  If the records limit is exceeded, the request fails.
  {{< comment >}}<!-- [IntInfo] (sharonl) For the max 1,000 records limitation, see also the "#stream-web-api-putrecords-max-records" info in the sw-specifications.md specs page. -->
  {{< /comment >}}

  {{< param-type >}}Array of record JSON objects{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}

  The record JSON object contains these elements:

  <dl>
    <!-- Records[i].ClientInfo -->
    {{< param-doc name="ClientInfo" id="req-param-Records-ClientInfo" >}}
Custom opaque information that can optionally be provided by the producer.
This metadata can be used, for example, to save the data format of a record, or the time at which a sensor or application event was triggered.
See {{< xref f="data-layer/stream/" a="record-metadata" text="Record Metadata" >}}.

{{< param-type >}}{{< text-blob-type >}}{{< /param-type >}}
{{< param-max-size >}}128 bits{{< /param-max-size >}}
{{< param-req "O" >}}{{< /param-req >}}
    {{< /param-doc >}}

  <!-- Records[i].Data -->
  {{< param-doc name="Data" id="req-param-Records-Data" >}}
Record data.

{{< param-type >}}{{< text-blob-type >}}{{< /param-type >}}
{{< param-max-size >}}1 MB{{< /param-max-size >}}
{{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

   <!-- Records[i].PartitionKey -->
  {{< param-doc name="PartitionKey" id="req-param-Records-PartitionKey" >}}
A partition key with which to associate the record (see {{< xref f="data-layer/stream/" a="record-metadata" text="Record Metadata" >}}).
Records with the same partition key are assigned to the same shard, subject to the following exceptions:
if a shard ID is also provided for the record (see the <paramname>Records</paramname> <paramname>[ShardId](#req-param-Records-ShardId)</paramname> request parameter), the record is assigned according to the shard ID, and <paramname>PartitionKey</paramname> is ignored.
In addition, if you increase a stream's shard count after its creation (see <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/updatestream.md" >}}</api>), new records with a previously used partition key will be assigned either to the same shard that was previously used for this partition key or to a new shard.
All records with the same partition key that are added to the stream after the shard-count change will be assigned to the same shard (be it the previously used shard or a new shard).
When neither a Shard ID or a partition key is provided in the request, the {{< product lc >}}'s default shard-assignment algorithm is used.
See also {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}.

{{< param-type >}}String{{< /param-type >}}
{{< param-max-size >}}256 bytes{{< /param-max-size >}}
{{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- Records[i].ShardId -->
  {{< param-doc name="ShardId" id="req-param-Records-ShardId" >}}
The ID of the shard to which to assign the record, as an integer between 0 and one less than the stream's shard count.
<br/>
When both <paramname>ShardId</paramname> and <paramname>[PartitionKey](#req-param-Records-PartitionKey)</paramname> are set, the record is assigned according to the shard ID, and <paramname>PartitionKey</paramname> is ignored.
When neither a Shard ID or a partition key is provided in the request, the {{< product lc >}}'s default shard-assignment algorithm is used.
See also {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}.

{{< param-type >}}Number{{< /param-type >}}
{{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
  </dl>
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
    "FailedRecordCount": number,
    "Records": [
        {
            "ErrorCode":      number,
            "ErrorMessage":   "string",
            "SequenceNumber": number,
            "ShardId":        number
        }
     ]
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

<dl>
  <!-- FailedRecordCount -->
  {{< param-doc name="FailedRecordCount" id="resp-param-FailedRecordCount" >}}
  The number of records whose submissions failed.

  {{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Records -->
  {{< param-doc name="Records" id="resp-param-Records" >}}
  An array of result objects for each submitted record, in the same order as the records appeared in the submission request.

  {{< param-type >}}Array of record JSON objects{{< /param-type >}}

  <b>For records whose submission succeeded</b>, the record JSON object contains these elements:

  <dl>
  <!-- Records[i].SequenceNumber -->
  {{< param-doc name="SequenceNumber" id="resp-param-Records-SequenceNumber" >}}
The record's sequence number, which uniquely identifies the record within the shard.
This ID number can be used in a sequence-based <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/seek.md" >}}</api> operation to get the location of a specific record within a given stream shard.

{{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Record[i].ShardId -->
  {{< param-doc name="ShardId" id="resp-param-Records-ShardId" >}}
The ID of the shard to which the record was assigned.

{{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}
  </dl>

  <b>For records whose submission failed</b>, the record JSON object contains these elements:

  <dl>
  <!-- Record[i].ErrorCode -->
  {{< param-doc name="ErrorCode" id="resp-param-Records-ELEMENTNAME" >}}
  A unique numeric error code.

{{< param-type >}}Number{{< /param-type >}}
  {{< /param-doc >}}

  <!-- Record[i].ErrorMessage -->
  {{< param-doc name="ErrorMessage" id="resp-param-Records-ELEMENTNAME" >}}
  An error message in the form of a unique error-code string &mdash; see [Errors](#errors).

{{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}
  </dl>
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
  <td><api>ResourceIsnotStream</api></td>
  <td>The specified stream path does not point to a stream.</td>
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

Add a new record with custom client-information metadata to a MyStream stream.
Because the request does not specify a shard ID or a partition key for the record, the record's shard assignment will be determined by the {{< product "lc" >}} (default):

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyDirectory/MyStream/ HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: PutRecords
X-v3io-session-key: {{% productUI access_key_example %}}
```
```json
{
    "Records": [
        {
            "ClientInfo": "MTIzNA0K",
            "Data":       "ZGF0YQ0K"
        }
    ]
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyDirectory/MyStream/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "PutRecords",
            "X-v3io-session-key": "{{% productUI access_key_example %}}"
          }
payload = {
            "Records": [
                {
                    "ClientInfo": "MTIzNA0K",
                    "Data": "ZGF0YQ0K"
                    }
                ]
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
    "FailedRecordCount": 0,
    "Records": [
        {
            "SequenceNumber": 13495,
            "ShardId": 199
        }
    ]
}
```

