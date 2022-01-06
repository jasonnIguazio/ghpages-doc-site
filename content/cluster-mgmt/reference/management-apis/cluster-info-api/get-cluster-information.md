---
title:  "Get Cluster Information"
keywords: "Get Cluster information, api endpoints, http GET, GET method, GET"
menu:
  main:
    parent:     "mgmt-cluster-info-api"
    identifier: "mgmt-cluster-info-api-get-clustere-info"
    weight:     10
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Returns information about the endpoints of the {{< product lc >}} cluster, which provide access to the {{< product lc >}}'s resources.
The information includes the IP addresses of the endpoints.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="request" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-header" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
GET /api/cluster_info HTTP/1.1
Host: <management-APIs URL>
Content-Type: application/json
Cookie: session=<cookie>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "<management-APIs URL>/api/cluster_info"
headers = {
            "Content-Type": "application/json",
            "Cookie": "session=<cookie>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="http-method" >}}

<api>GET</api>

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" none="1" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" none="1" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="response" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-header" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-header-syntax" >}}

```
HTTP/1.1 <status code; 200 on success> <reason phrase>
Content-Type: application/json
...
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-syntax" >}}

```json
{
    "data": [
        {
            "attributes": {
                "cluster_name": "string",
                "created_at":   "string",
                "endpoints": {
                    <cluster-endpoint arrays>
                }
            },
            "id":   "string",
            "type": "cluster_info"
        }
    ]
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

The <jsonkey>data</jsonkey> object in the HTTP response body contains the requested cluster information, which includes these elements:

<dl>
  <!-- attributes -->
  {{< param-doc name="attributes" id="req-param-attributes" >}}
  Cluster-information attributes.

  {{< param-type >}}A JSON object of cluster-information attributes{{< /param-type >}}

  The following cluster-information attributes are returned:

  <dl>
  <!-- cluster_name -->
  {{< param-doc name="cluster_name" id="req-param-attributes-cluster_name" >}}
  The name of the cluster.

{{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

  <!-- created_at -->
  {{< param-doc name="created_at" id="req-param-attributes-created_at" >}}
  The date and time at which the cluster was created.

{{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

  <!-- endpoints -->
  {{< param-doc name="endpoints" id="req-param-attributes-endpoints" >}}
  Information about the cluster's endpoints, which provide access to the {{< product lc >}}'s resources.
  The returned information includes the endpoints' URLs &mdash; the IP addresses and port numbers for accessing the resources.

{{< param-type >}}A JSON object containing endpoint-information arrays{{< /param-type >}}
  {{< /param-doc >}}
  </dl>
  {{< /param-doc >}}

  <!-- id -->
  {{< param-doc name="id" id="req-param-attributes-id" >}}
  A unique cluster ID.

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

  <!-- type -->
  {{< param-doc name="type" id="req-param-type" >}}
  The type of the data object. This value must be set to "cluster_info".

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
GET /api/cluster_info HTTP/1.1
Host: {{< verkey k="mgmt_apis.url_example" >}}
Content-Type: application/json
Cookie: session={{< verkey k="mgmt_apis.session_cookie_example" >}}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{< verkey k="mgmt_apis.url_example" >}}/api/cluster_info"
headers = {
            "Content-Type": "application/json",
            "Cookie": "session={{< verkey k="mgmt_apis.session_cookie_example" >}}"
          }

response = requests.get(url, headers=headers)
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
    "data": [
        {
            "attributes": {
                "cluster_name": "igzc0",
                "created_at": "2018-01-15T13:26:48.353000+00:00",
             "endpoints": {
                    "api": [
                        {
                            "service_id": "igz0.api.0",
                            "urls": [
                                "10.0.0.1:8113"
                            ]
                        }
                    ],
                    "bridge": [
                        {
                            "rdma_urls": [
                                "tcp://10.0.0.1:1234"
                            ],
                            "service_id": "igz0.bridge.1",
                            "tcp_urls": [
                                "10.0.0.1:8100"
                            ]
                        }
                    ],
                    "ui": [
                        {
                            "service_id": "igz0.dashboard.0",
                            "urls": [
                                "10.0.0.1:8000"
                            ]
                        }
                    ],
                    "web": []
                }
            },
            "id": "string",
            "type": "cluster_info"
        }
    ],
    ...
}
```

