---
title:  "Create Container"
keywords: "Create Container, management, containers, http POST, POST method, POST, container attributes"
menu:
  main:
    parent:     "mgmt-containers-api"
    identifier: "mgmt-containers-api-create-container"
    weight:     10
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Creates a new container.

You must provide a name for the new container (see the <paramname>[name](#req-param-name)</paramname> request-data parameter).
This name will be used to identify your container in the {{< productUI "lc" >}}.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="request" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-header" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /api/containers HTTP/1.1
Host: <management-APIs URL>
Content-Type: application/json
Cookie: session=<cookie>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "<management-APIs URL>/api/containers"
headers = {
            "Content-Type": "application/json",
            "Cookie": "session=<cookie>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="http-method" >}}

<api>POST</api>

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" none="1" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{
    "data": {
        "attributes":
        {
            "name":         "string",
            "description":  "string"
        },
        "type": "container"
    }
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "data": {
                "attributes": {
                    "name":         "string",
                    "description":  "string"
                }
            }
            "type": "container"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- attributes -->
  {{< param-doc name="attributes" id="req-param-attributes" >}}
  Container attributes.

  {{< param-type >}}A JSON object of container attributes{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}

  The following container attributes are applicable to this request:

  <dl>
  <!-- name -->
  {{< param-doc name="name" id="req-param-name" >}}
  A unique name for the new container.
  See {{< xref f="data-layer/containers/container-names.md" >}}, and specifically {{< xref f="data-layer/containers/container-names.md" a="container-name-restrictions" text="Cotnainer-Name Restrictions" >}}.

{{< param-type >}}String{{< /param-type >}}
{{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- description -->
  {{< param-doc name="description" id="req-param-description" >}}
  A textual description of the container.
  When provided, this description is displayed in the {{< productUI lc >}} together with the container name.

{{< param-type >}}String{{< /param-type >}}
{{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
  </dl>
  {{< /param-doc >}}

  <!-- type -->
  {{< param-doc name="type" id="req-param-type" >}}
  The type of the data object. This value must be set to "container".

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

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
    "data": {
        "attributes": {
            "admin_status": "string",
            "cost":         number,
            "created_at":   "string",
            "data_lifecycle_layers_order":  [],
            "data_policy_layers_order":     [],
            "id":           number,
            "imports":      [],
            "mapping": {
                "cmds_index":   number,
                "container_id": number,
                "mds_instances": [
                    {
                        "service_context": {
                            "internal_xio_addresses": [
                                {
                                    "url": "string"
                                }
                            ],
                            "rest_addresses": [
                                {
                                    "url": "string"
                                }
                            ],
                            "shared_memory_objects": [
                                {
                                    "address":  "string",
                                    "type":     "string"
                                }
                            ],
                            "shutdown": {
                                "phase":    number,
                                "timeout":  number
                            },
                            "version_info": {
                                "external": "string",
                                "git":      "string ",
                                "offline":  "string "
                            },
                            "xio_addresses": [
                                {
                                    "url":  "string"
                                }
                            ]
                        },
                        "service_id": {
                            "node_name":        "string",
                            "service_instance": number,
                            "service_name":     "string"
                        }
                    }
                ],
                "num_slices": 0
            },
            "name":               "string",
            "operational_status": "string",
            "properties":         [],
            "updated_at":         "string"
        },
        "id":   number,
        "type": "container"
    },
    ...
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

The <jsonkey>data</jsonkey> object in the HTTP response body contains information about the new container, including its name (<paramname>name</paramname>), ID (<jsonkey>id</jsonkey>), creation time (<jsonkey>created_at</jsonkey>), relevant addresses, and version information (<jsonkey>version_info</jsonkey>).
Full the full list of returned data elements, see [response-data syntax](#response-data-syntax) above.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Create a container named "mycontainer" with the description "My first container".
The ID of the created container in this example (as returned in the response) is 1030:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /api/containers HTTP/1.1
Host: {{< verkey k="mgmt_apis.url_example" >}}
Content-Type: application/json
Cookie: session={{< verkey k="mgmt_apis.session_cookie_example" >}}
```
```json
{
    "data": {
        "attributes":
        {
            "name":         "mycontainer",
            "description":  "My first container"
        },
        "type": "container"
    }
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{< verkey k="mgmt_apis.url_example" >}}/api/containers"
headers = {
            "Content-Type": "application/json",
            "Cookie": "session={{< verkey k="mgmt_apis.session_cookie_example" >}}"
          }
payload = {
            "data": {
                "attributes": {
                    "name":         "mycontainer",
                    "description":  "My first container"
                }
            }
            "type": "container"
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
    "data": {
        "attributes": {
            "admin_status": "up",
            "cost": 0.976715087890625,
            "created_at": "2018-01-15T08:17:19.904000+00:00",
            "data_lifecycle_layers_order": [],
            "data_policy_layers_order": [],
            "id": 1030,
            "imports": [],
            "mapping": {
                "cmds_index": 0,
                "container_id": 0,
                "mds_instances": [
                    {
                        "service_context": {
                            "internal_xio_addresses": [
                                {
                                    "url": "tcp:// 10.0.0.1:5000"
                                }
                            ],
                            "rest_addresses": [
                                {
                                    "url": "10.0.0.1:8154"
                                }
                            ],
                            "shared_memory_objects": [
                                {
                                    "address": "/dev/shm/mds.1_stats_metadata",
                                    "type": "statsMetadata"
                                },
                                {
                                    "address": "/dev/shm/mds.1_stats_values",
                                    "type": "statsValues"
                                },
                                {
                                    "address": "place_holder_for_log_shm",
                                    "type": "log"
                                },
                                {
                                    "address": "/dev/shm/mds.1_stats_names",
                                    "type": "statsMetricNames"
                                }
                            ],
                            "shutdown": {
                                "phase": 0,
                                "timeout": 0
                            },
                            "version_info": {
                                "external": "",
                                "git": "",
                                "offline": ""
                            },
                            "xio_addresses": [
                                {
                                    "url": "tcp:// 10.0.0.1:5001"
                                }
                            ]
                        },
                        "service_id": {
                            "node_name": "igz0",
                            "service_instance": 1,
                            "service_name": "mds"
                        }
                    }
                ],
                "num_slices": 0
            },
            "name": "mycontainer",
            "operational_status": "up",
            "properties": [],
            "updated_at": "2018-01-30T14:30:00.367000+00:00"
        },
        "id": 1030,
        "type": "container"
    },
    ...
}
```

