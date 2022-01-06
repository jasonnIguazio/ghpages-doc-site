---
title: "Data-Service Web-API General Structure"
description:  "Learn about the general structure of the Iguazio MLOps Platform data-service web APIs (NoSQL & streaming)."
keywords: "data-service web-api structure, api structure, data-service web apis, api reference, web apis, REST, RESTful, http, http requests, http headers, request header, request parameters, http responses, http operations, web-api operations, request url, url resource parameters, json, json parameters, json elements, python, web gateway, nginx, host, ports, api endpoints, X-v3io-function, security, authentication, http authentication, errors, http status, debugging"
menu:
  main:
    parent:     "web-apis"
    identifier: "data-servicec-web-api-gen-struct"
    weight:     30
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  reference/api-reference/web-apis/data-service-web-api-gen-struct.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from notebooks
  data-ingestion-and-preparation/ v3io-kv.ipynb, v3io-objects.ipynb, and
  v3io-streams.ipynb). (Until then and for previous tutorials releases, we'll
  have URL redirect rules as part of the restructured-site publication.)
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from data-ingestion-and-preparation/ notebooks v3io-kv.ipynb,
  v3io-objects.ipynb, and v3io-streams.ipynb). -->
{{< /comment >}}

The data-service web APIs enable complex manipulation of specific data types.
These APIs include the {{< xref f="data-layer/reference/web-apis/streaming-web-api/" >}} and the {{< xref f="data-layer/reference/web-apis/nosql-web-api/" >}}.

<!-- //////////////////////////////////////// -->
## Request Syntax {#request-syntax}

The data-service API operations are HTTP requests that you send to the web-APIs (web-gateway) service of a {{< product lc >}} tenant using the <api>PUT</api> or <api>POST</api> HTTP method.
The operation to perform is specified within an <api>X-v3io-function</api> HTTP header.
Data parameters (where required) are passed within the request's HTTP body, in JSON format.
The requests conform to the following general format; (the order of the headers isn't important):

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```
<method> /<container>/<resource> HTTP/1.1
Host: <web-APIs URL>
Content-Type: application/json
X-v3io-function: <operation>
<authentication header>: <value>

{<data parameters>}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "<web-APIs URL>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": "<operation>",
            "<authentication header>": "<value>"
          }
payload = {<data parameters>}

response = requests.<method>(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

Following is an explanation of the `<...>` placeholders used in the request syntax:

<dl>
  <!-- <method> (request) -->
  {{< param-doc name="<method>" id="request-http-method" >}}
  The HTTP method for the request &mdash; <api>POST</api> or <api>PUT</api> (</api>post</api> or <api>put</api> in Python).<br/>
  <api>POST</api> and <api>PUT</api> behave the same in the {{< product lc >}}.
  {{< /param-doc >}}

  <!-- <container> (request) -->
  {{< param-doc name="<container>" id="request-container" >}}
  An identifier of the data container of the operation's resource.
  The container can be identified by its name or by its ID.
  For example, `{{< getvar v="product.default_container.name" >}}`.

  {{< note >}}
  {{% text-container-name-not-container-id-note %}}
  {{< /note >}}
  {{< /param-doc >}}

  <!-- <resource> (request) -->
  {{< param-doc name="<resource>" id="request-resource" >}}
  URL resource parameters, signifying the full path to the operation's resource within the [container](#request-container), or the first part of this path.
  The path can point, for example, to a collection (such as stream or a table), a collection component (such as a shard), or an object in the collection (such as a table item).
  It is also possible to provide the last part of the resource path via data parameters in the request's HTTP body (in JSON format) &mdash; see [&lt;data parameters&gt;](#request-data-parameters) and [Setting the Resource Path](#web-api-data-service-resource-path).
  {{< /param-doc >}}

  <!-- <web-APIs URL> (request) -->
  {{< param-doc name="<web-APIs URL>" id="request-web-apis-url" >}}
  The URL of the web-APIs (web gateway) service of a {{< product lc >}} tenant.
  {{% include f="web-apis-urls.md" %}}

  {{< note id="req-url-examples-note" >}}
  To run the examples in this reference, you must replace the sample web-APIs URL in the examples with a tenant web-APIs URL for your {{< product lc >}} environment.
  {{< /note >}}
  {{< /param-doc >}}

  <!-- <operation> (request) -->
  {{< param-doc name="<operation>" id="request-operation" >}}
  The requested operation to be performed. For example, `GetRecords`.
  {{< /param-doc >}}

  <!-- <authentication header> (request) -->
  {{< param-doc name="<authentication header>" id="authentication-header" >}}
  You must authenticate the identity of the sender of the request by using either an <api>X-v3io-session-key</api> or <api>Authorization</api> header, as outlined in the {{< xref f="data-layer/reference/web-apis/security.md" a="http-user-authentication" >}} documentation.
  {{< /param-doc >}}

  <!-- <data parameters> (request) -->
  {{< param-doc name="<data parameters>" id="request-data-parameters" >}}
  Data parameters for the request, where relevant, in JSON format.

  {{< note >}}
  If the request URL doesn't include the full path to the target resource (see [&lt;resource&gt;](#request-resource)), the remaining path (such as a table or stream name, an item's primary key, or a shard ID) must be assigned to relevant JSON parameters in the request's HTTP body.
  <br/>
  Note that the values of the request data parameters cannot contain path slashes (/). See [Setting the Resource Path](#web-api-data-service-resource-path).
  {{< /note >}}
  {{< /param-doc >}}
</dl>

{{< small-heading id="web-api-data-service-resource-path" >}}Setting the Resource Path{{< /small-heading >}}

The resource path for the operation can be provided using any of the following alternative methods.
The examples are for a <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/getitem.md" >}}</api> operation that retrieves an item (resource) from a "MyDirectory/Students" table (collection) in a "mycontainer" container.
The item's name and primary-key ("StudentId") value is "0358123":

-   **The full path is provided in the request URL in the header** (see [&lt;resource&gt;](#request-resource)).

    For example, the <api>GetItem</api> request URL has the full path to the student item &mdash;

    ```http
    POST /mycontainer/MyDirectory/Students/0358123 HTTP/1.1
    ```

-   **The resource path is split across the request URL in the header and the request body**: the start of the path is set in the URL, after the container identifier, and the rest is set in the JSON body.

    {{< note >}}
When using this option, the path in the URL must end in a forward slash (/).
    {{< /note >}}

    For example, the <api>GetItem</api> request URL sets the path to a "MyDirectory/" directory:

    ```http
    POST /mycontainer/MyDirectory/ HTTP/1.1
    ```
    And the request's JSON body sets the <paramname>TableName</paramname> parameter to the name of the "Students" table (located in "MyDirectory/"), and the <paramname>Key</paramname> parameter to a <attr>StudentID</attr> attribute with the primary-key value "0358123" (which is also the item's name &mdash; see {{< xref f="data-layer/reference/web-apis/nosql-web-api/overview.md" a="nosql-item-name-n-primary-key" text="Item Name and Primary Key" >}}):

    ```json
    {
        "TableName": "Students",
        "Key":       {"StudentID": {"N": "0358123"}}
    }
    ```

    Another option is for the request URL to set the full path to the "Students" table &mdash;
{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyDirectory/Students/ HTTP/1.1
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "<web-APIs URL>/mycontainer/MyDirectory/Students/"
```
  {{< /tab >}}
{{< /code-tabs >}}

    &mdash; and for the request's JSON body to set the <paramname>Key</paramname> parameter to the item's primary-key attribute ("StudentID" with the value "0358123"):
{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{"Key": {"StudentID": {"N": "0358123"}}}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {"Key": {"StudentID": {"N": "0358124"}}}
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- //////////////////////////////////////// -->
## Response Syntax {#response-syntax}
{{< comment >}}<!-- [c-web-api-response-doc] [IntInfo] (sharonl) (28.8.19) This
  doc section is currently referenced also from the Simple-Object Web API
  reference overview (web-apis/simple-object-web-api/overview.md).
  [TODO][INFRA-TODO] When we add a full reference for the Simple-Object Web API
  (DOC IG-12993), create a shared include file for the response doc and use it
  from both reference sections, or move the successful-response doc to a
  separate reference section that's common to all the web APIs (which can be
  done even before we add a full Simple-Object Web API reference). Note that
  error-response information is different for these two APIs. -->
{{< /comment >}}

The HTTP response to a web-API request includes headers that contain the HTTPS status code of the operation and additional information.
Some responses also return data in the response's HTTP body, in JSON format.
The responses conform to the following general format; (the order of the headers isn't important):

```
HTTP/1.1 <HTTP status code> <HTTP reason phrase>
Content-Type: <content type>
<last modification-time header>
...

{<data elements>}
```
{{< comment >}}<!-- [c-http-response-status-field] [IntInfo] (sharonl) (20.8.19)
  The raw response headers that I see in the Postman console also have a
  `status: <HTTP status code>` field after the HTTP field. However, I decided
  not to include it in the syntax because our existing examples don't use it,
  I'm not sure all HTTP clients will display it, and it's not necessary because
  the status code is also returned in the HTTP field. Ortal confirmed that
  there header components aren't necessarily returned in a specific order, so
  the "status" can be included in the "..." part. -->

<!-- [IntInfo] (sharonl) (20.8.19) Following is an example of a full response
  for a successful GetItem request, copied from the "Raw" tab in Postman's
  console (View > Console / ALT-CTRL-C); Postman displays the HTTP phrase
  reason ("OK" for status code 200) separately: -->
```
HTTP/1.1 200
status: 200
Date: Tue, 20 Aug 2019 10:42:45 GMT
Content-Type: application/json
Content-Length: 198
Connection: keep-alive
Last-Modified: Wed, 24 Jul 2019 13:05:48 GMT
X-v3io-transaction-verifier: __mtime_secs==1563973548 and __mtime_nsecs==495583838
Access-Control-Allow-Credentials: true
Strict-Transport-Security: max-age=15724800; includeSubDomains
```
```json
{ "Item": {"_name": {"S":"temperature" },"degrees": {"S":"Celsius" },"_enc": {"S":"1" },"_lset": {"S":"degrees=Celsius" },"_v38": {"B":"+AFsGcm/4EBAAAAAAAAA" },"_maxtime": {"N":"1563800748000" } } }
```
{{< /comment >}}

Following is an explanation of the `<...>` placeholders used in the response syntax:

<dl>
  <!-- <content type> (response) -->
  {{< param-doc name="<content type>" id="response-content-type" >}}
  The HTTP media type (content type) of the response data.
  For example, `application/json` or `application/octet-stream`.
  {{< /param-doc >}}

  <!-- <last- modification-time header> (response) -->
  {{< param-doc name="<last modification-time header>" id="response-last-modification-time-header" >}}
  Some web-API responses return one or both of the following headers, which contain the last modification time of the operation object (such as a NoSQL table item, a stream shard, or a binary object) in different formats:

  - <a id="x-v3io-transaction-verifier-header"></a> <api-b>X-v3io-transaction-verifier</api-b> &mdash; returns the values of the [<attr>__mtime_secs</attr>]({{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__mtime_secs" t="url" >}}) and [<attr>__mtime_nsecs</attr>]({{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__mtime_nsecs" t="url" >}}) system attributes, which together provide the object's last modification time as a Unix timestamp with nano-seconds resolution:
      {{< comment >}}<!-- [InfraInfo] (sharonl) (sharonl) (28.8.19) With Hugo
        v0.54.0 / platform doc v2.3.1, including the <attr></attr> formatting
        as part of the system-attribute xref shortcode calls - for example,
        {{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__mtime_secs" text="<attr>__mtime_secs</attr>" >}} -
        didn't work correctly because of the underscores in the attribute name:
        the output for the first call was "mtime_secs" (i.e., the leading
        underscores - "__" - were omitted) and it was formatted in bold; the
        "and" and second xref-call output were also formatted in bold; and the
        output of the second xref call was as follows - where '�' is a
        formatted opening double quote and '�' is a formatted closing double
        quote; everything before mtime_nsecs is bold; and __mtime_nsecs at the
        end is formatted as code (<attr> formatting):
        `<a href=�/reference/latest-release/system-attributes/#sys-attr-mtime_nsecs�>__mtime_nsecs`
        Using "\_\_" in the <attr></attr> tags didn't help. -->
      {{< /comment >}}

      ```
      X-v3io-transaction-verifier: __mtime_secs==<Unix timesamp in seconds> and __mtime_nsecs==<nanoseconds>
      ```

      For example:
      ```
      X-v3io-transaction-verifier: __mtime_secs==1542838673 and __mtime_nsecs==250965583
      ```

  - <a id="last-modified-header"></a><api-b>Last-Modified</api-b> &mdash; returns the object's last modification time as a string of the format `ddd, dd MMM yyyy HH:mm:ss K`:

      ```
      Last-Modified: ddd, dd MMM yyyy HH:mm:ss K
      ```

      For example:
      ```
      Last-Modified: Wed, 24 Nov 2018 22:17:53 GMT
      ```

  <!-- <data elements> (response) -->
  {{< param-doc name="<data elements>" id="response-data-elements" >}}
  Some successful operations return, within the response HTTP body, a JSON object with additional information relating to the operation that was performed.
  The structure of this data object is operation-specific.
  <br/>
  The response object might also contain additional error information for failed operations, as explained in the [Error Information](#error-information) section.
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
### Error Information {#error-information}

In the event of an error, in addition to the HTTP status code returned in the response header, the operation's response HTTP body includes an error-information JSON object.
This object has an <jsonkey>ErrorCode</jsonkey> element that contains a unique numeric error code for the failed operation (for example, `-1` or `-201326592`), and an <jsonkey>ErrorMessage</jsonkey> element that contains an error-message string (for example, `"Operation not permitted"` or `"InvalidArgumentException"`):
{{< comment >}}<!-- [IntInfo] (sharonl) (19.8.19) See info in DOC IG-8122.
  In the current release,
- See [c-http-response-status-field] for the parent section regarding omitting
  "status:" from the syntax and doc examples.
- The error codes and messages for all errors except for the update-expression
  error messages can be found in error_reporting_managed_rc_external_msg.csv in
  the NGINX team's zeek repo: rc_name contains our internal error-code string,
  rc_code contains the error code, external_msg_format contains the error
  message, and http_status_name contains an internal HTTP status-code
  preprocessor definition that's mapped to an HTTP status code in
  infra/error_reporting/error_reporting_http_status.h; in the current release
  the error messages don't have parameters.
  For "Operation not permitted" example above, rc_name is RC_EPERM; rc_code is
  -1; and http_status_name is HTTP_FORBIDDEN = HTTP status code 403
  "Forbidden".
  For the "InvalidArgumentException" Streaming Web API example above, rc_name
  is RC_STREAM_INVALID_ARG; rc_code is -201326592; and http_status_name is
  HTTP_BAD_REQUEST = HTTP status code 400 "Bad request".
- For the Streaming Web API, ErrorMessage has a string error code rather than
  a textual error message and we provide the message string as part of the
  documentation of each operation (using the web-api-errors shortcode).
.
-->
{{< /comment >}}

```
HTTP/1.1 <HTTP status code> <HTTP reason phrase>
Content-Type: application/json
...
```
```json
{
    "ErrorCode":    <numeric error code>,
    "ErrorMessage": "<error message>"
}
```
{{< comment >}}<!-- [IntInfo] (sharonl) (20.8.19) Following is an example of a
  full response for a GetItem request with an invalid parameter in the request
  body, copied from the "Raw" tab in Postman's console (View > Console /
  ALT-CTRL-C); Postman displays the HTTP phrase reason ("Not Found" for status
  code 404) separately: -->
```http
HTTP/1.1 404
status: 404
Date: Tue, 20 Aug 2019 09:35:19 GMT
Content-Type: application/json
Content-Length: 66
Connection: keep-alive
Strict-Transport-Security: max-age=15724800; includeSubDomains
```
```json
{ "ErrorCode": -2, "ErrorMessage": "No such file or directory" }
```
{{< /comment >}}

For multi-object operations, error information might be returned separately for each object that produced an error (see, for example, the <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" >}}</api> response).

<!-- //////////////////////////////////////// -->
## Examples {#examples}

The following example is of an HTTP request for a <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/getrecords.md" >}}</api> operation that retrieves records from shard 199 in a "MyDirectory/MyStream" stream within a "mycontainer" container.
The path to the shard resource is set entirely in the request URL, and the request's JSON body sets the values of the <paramname>Location</paramname> and <paramname>Limit</paramname> parameters.

<!-- Request -->
{{< small-heading id="example-GetRecords-request" >}}Request{{< /small-heading >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /mycontainer/MyDirectory/MyStream/199 HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/json
X-v3io-function: GetRecords
X-v3io-session-key: {{< productUI access_key_example >}}
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
            "X-v3io-session-key": "{{< productUI access_key_example >}}"
          }
payload = {"Location": "AQAAAAAAAAAAAAAAAAAAAA==", "Limit": 2}

response = requests.post(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- Response -->
{{< small-heading id="example-GetRecords-response" >}}Response{{< /small-heading >}}

<a id="example-GetRecords-response-success"></a>The following response example is for a successful <api>GetRecords</api> operation that returned one matching record:

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

<a id="example-GetRecords-response-error"></a>The following response example is for a failed <api>GetRecords</api> operation that returned HTTP status code 400 (Bad Request) and web-API error code -201326594 and error message <paramname>ShardIDOutOfRangeException</paramname>, indicating that the shard ID specified in the request (199) doesn't exist in the specified stream ("MyStream"):

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
...
```
```json
{
    "ErrorCode":    -201326594,
    "ErrorMessage": "ShardIDOutOfRangeException"
}
```
{{< comment >}}<!-- [IntInfo] (sharonl) rc_name = RC_STREAM_OUT_OF_SHARD_RANGE;
  http_status_name = HTTP_BAD_REQUEST => HTTP status code 400 "Bad request".
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/web-apis/security.md" >}}

