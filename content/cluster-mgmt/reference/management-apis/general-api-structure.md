---
title:  "General Management-API Structure"
keywords: "management-api structure, api structure, management apis, management, api reference, REST, RESTful, http, http requests, http headers, request header, request parameters, http responses, http operations, host, management-api operations, request url, url resource parameters, json, json apis, json api specification, json parameters, json elements, python, api endpoints, dashboard, dashboard endpoint, dashboard ip, host, ports, dashboard port, security, cookies, session cookies, authentication, http authentication, errors, http status, http status codes, debugging, containers management api, Delete Container, sessions management api, Create Session, data attributes, http POST, POST method, POST, http PUT, PUT method, PUT, http DELETE, DELETE method, DELETE"
menu:
  main:
    parent:     "mgmt-apis"
    identifier: "mgmt-api-gen-struct"
    weight:     20
---
{{< comment >}}<!-- [IntInfo] (sharonl) See [c-k8s-mgmt-api-url],
  [c-k8s-mgmt-api-http-ip-addr-only], and [c-mgmt-api-url-not-in-ui] in
  data/vars/product.toml. -->
{{< /comment >}}

The management APIs are RESTful APIs that use a subset of the [JSON API specification](http://jsonapi.org/) to represent request and response data.

<!-- //////////////////////////////////////// -->
## Request Syntax {#request-syntax}

The management-API operations are HTTP requests that you send to a {{< productUI lc >}} endpoint using an appropriate HTTP method (such as <api>GET</api> or <api>POST</api>).
Data parameters (where required) are passed within the request's HTTP body, in JSON format.
The requests conform to the following general format:

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```
<method> /<resource> HTTP/1.1
Host: <management-APIs URL>
Content-Type: application/json
Cookie: session=<cookie>
```

```json
{
    "data": {
        "attributes": {
           <attributes>
        },
        "type": "<type>"
    }
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "<management-APIs URL>/<resource>"
headers = {
            "Content-Type": "application/json",
            "Cookie": "session=<cookie>"
          }
payload = {
            "data": {
                "attributes": {
                    <attributes>
                },
                "type": "<type>"
                }
          }

response = requests.<method>(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

Following is an explanation of the `<...>` placeholders used in the request syntax:

<dl>
  {{< param-doc name="<method>" id="request-http-method" >}}
  The HTTP method for the request &mdash; for example, <api>GET</api> (HTTP) or <api>get</api> (Python).
  {{< /param-doc >}}

  {{< param-doc name="<resource>" id="request-resource" >}}
  The full path to the operation's target resource.
  The path begins with the relevant API endpoint &mdash; for example, `/api/containers` for the {{< xref f="cluster-mgmt/reference/management-apis/containers-api/" >}} &mdash; and is optionally followed by a forward slash (`/`) and URL resource parameters &mdash; for example, `/1030` to set the container ID for a <api>{{< xref f="cluster-mgmt/reference/management-apis/containers-api/delete-container.md" >}}</api> operation.
  {{< /param-doc >}}

  {{< param-doc name="<management-APIs URL>" id="request-mgmt-apis-url" >}}
  The URL of the management-APIs service of a {{< product lc >}} tenant.
  Set this URL to the HTTPS URL of the {{< productUI short_lc >}}; for example, `{{< verkey k="mgmt_apis.url_example" >}}`.
  In bare-metal deployments, you can alternatively set the URL to `http://<{{< productUI lc >}} IP>:<port>` where `<{{< productUI lc >}} IP>` is the IP address or resolvable host domain name of the {{< productUI lc >}} and `<port>` is  `{{< verkey k="mgmt_apis.port" >}}`, which is the host port on which the management-APIs are served; for example, `{{< verkey k="mgmt_apis.url_example_http_ip" >}}`.

  {{< note id="req-url-examples-note" >}}
  To run the examples in this reference, you must replace the sample management-APIs URL in the examples with a tenant web-APIs URL for your {{< product lc >}} environment.
  {{< /note >}}
  {{< /param-doc >}}

  {{< param-doc name="<cookie>" id="request-cookie" >}}
  A session cookie that was received from a <api>Create Session</api> operation and is used to authenticate the sender of the request, and authorize the sender to perform management operations.
  For example, `{{< verkey k="mgmt_apis.session_cookie_example" >}}`.
  For more information, see <api>{{< xref f="cluster-mgmt/reference/management-apis/sessions-api/create-session.md" >}}</api>.

  {{< note id="session-cookie-examples-note" >}}
  To run the examples in this reference, you must replace the sample session cookie in the examples with a valid session cookie for your cluster.
  {{< /note >}}
  {{< /param-doc >}}

  {{< param-doc name="<attributes>" id="request-attributes" >}}
  Data attributes that serve as request parameters, where relevant.
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
## Response Syntax {#response-syntax}

A response to a management API request includes an HTTP status code and a related reason phrase (see RFC 7231 [6. Response Status Codes](https://tools.ietf.org/html/rfc7231#page-47)).
Some successful operations also return, within the <jsonkey>data</jsonkey> object of the response HTTP body, additional information relating to the operation that was performed, in JSON format.
The data structure is operation-specific.

<!-- ======================================== -->
### Success Status Codes {#success-status-codes}

The following HTTP status codes are returned for successful operations:

<table style="width:100%">
<tr text-align="left">
  <th style="font-weight:bold;">HTTP Method</th>
  <th style="font-weight:bold;">Operation Types</th>
  <th style="font-weight:bold;">Success Status Code</th>
</tr>
<tr>
  <td><api>POST</api></td>
  <td>Create</td>
  <td>200</td>
</tr>
<tr>
  <td><api>GET</api></td>
  <td>List; Get</td>
  <td>201</td>
</tr>
<tr>
  <td><api>DELETE</api></td>
  <td>Delete</td>
  <td>204</td>
</tr>
</table>

<!-- ======================================== -->
### Error Information {#error-information}

In the event of an error, in addition to the HTTP status code returned in the response, the operation returns, within the response HTTP body, an <paramname>errors</paramname> array of error-information JSON objects.
Each error-information object has a <jsonkey>status</jsonkey> element that contains the operation's HTTP status code (for example, `400`), and a <jsonkey>detail</jsonkey> string element that contains a textual description of the error:

```json
{
    "errors": [
        {
            "status": <HTTP status code>,
            "detail": "<error description>"
        }
    ]
} 
```

