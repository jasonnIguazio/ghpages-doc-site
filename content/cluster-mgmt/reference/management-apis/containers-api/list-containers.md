---
title:  "List Containers"
keywords: "List Containers, management, containers, http GET, GET method, GET"
menu:
  main:
    parent:     "mgmt-containers-api"
    identifier: "mgmt-containers-api-list-containers"
    weight:     30
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Returns information about all containers that are visible to the user who sent the request, according to its tenant (default), or about a specific container (see the <paramname>[&lt;container&gt;](#request-url-param-container)</paramname> URL resource parameter).

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="request" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-header" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
GET /api/containers/[<container>] HTTP/1.1
Host: <management-APIs URL>
Content-Type: application/json
Cookie: session=<cookie>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "<management-APIs URL>/api/containers/[<container>]"
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
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

<dl>
  <!-- <container> -->
  {{< param-doc name="<container>" id="request-url-param-container" >}}
  The ID of a specific container for which to retrieve information.

  {{< param-type >}}Integer{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value str="Behavior" >}}By default, when the <api>&lt;container&gt;</api> parameter is not set, the operation returns information for all containers of the user's tenant.{{< /param-default-value >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" none="1" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="response" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-header" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-header-syntax" >}}

```
HTTP/2.1 <status code; 200 on success> <reason phrase>
Content-Type: application/json
...
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "All Containers" >}}
```json
{
    "data": [
       {
            "attributes": {
                "admin_status": "string",
                "cost":         number,
                "created_at":   "string",
                "data_lifecycle_layers_order":  [],
                "data_policy_layers_order":     [],
                "id":           number,
                "imports": [],
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
                                        "address": "string",
                                        "type":    "string"
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
                                        "url": "string"
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
                "name":                 "string",
                "operational_status":   "string",
                "properties": [],
                "updated_at":           "string"
            },
            "id":   number,
            "type": "container"
        }
    ],
    ...
}
```
  {{< /tab >}}

  {{< tab "Specific Container" >}}
```http
{
    "data": {
        "attributes": {
            "admin_status": "string",
            "cost":         number,
            "created_at":   "string",
            "data_lifecycle_layers_order":  [],
            "data_policy_layers_order":     [],
            "id":           number,
            "imports": [],
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
                                    "address": "string",
                                    "type":    "string"
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
                                    "url": "string"
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
            "name":                 "string",
            "operational_status":   "string",
            "properties": [],
            "updated_at":           "string"
        },
        "id":   number,
        "type": "container"
    },
    ...
}
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

The <jsonkey>data</jsonkey> object in the HTTP response body contains an array of container-information JSON objects (default) or a single object (for a specific-container request).
The returned container information includes the container's name (<paramname>name</paramname>), ID (<jsonkey>id</jsonkey>), creation time (<jsonkey>created_at</jsonkey>), relevant addresses, and version information (<jsonkey>version_info</jsonkey>).
Full the full list of returned data elements, see [response-data syntax](#response-data-syntax) above.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

<!-- ======================================== -->
### Example 1 {#example-1}

Return information about all visible containers for the user's tenant:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
GET /api/containers HTTP/1.1
Host: {{< verkey k="mgmt_apis.url_example" >}}
Content-Type: application/json
Cookie: session={{< verkey k="mgmt_apis.session_cookie_example" >}}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{< verkey k="mgmt_apis.url_example" >}}/api/containers"
headers = {"Cookie": "session={{< verkey k="mgmt_apis.session_cookie_example" >}}"}

response = requests.get(url, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response" id="example1-response" >}}

The response includes an array with a single container-information object:

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
                "admin_status": "up",
                "cost": 0.976715087890625,
                "created_at": "2021-01-15T08:17:19.904000+00:00",
                "data_lifecycle_layers_order": [],
                "data_policy_layers_order": [],
                "id": {{% getvar v="product.default_container.id" %}},
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
                                    "address":
                                        "/dev/shm/mds.1_stats_values",
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
                "updated_at": "2021-01-30T14:30:00.367000+00:00"
            },
            "id": {{% getvar v="product.default_container.id" %}},
            "type": "container"
        }
    ],
    ...
}
```

<!-- ======================================== -->
### Example 2 {#example-2}

Return information about a specific container with ID {{< getvar v="product.default_container.id" >}}:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example2-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
GET /api/containers/{{% getvar v="product.default_container.id" %}} HTTP/1.1
Host: {{< verkey k="mgmt_apis.url_example" >}}
Content-Type: application/json
Cookie: session={{< verkey k="mgmt_apis.session_cookie_example" >}}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{< verkey k="mgmt_apis.url_example" >}}/api/containers/{{% getvar v="product.default_container.id" %}}"
headers = {"Cookie": "session={{< verkey k="mgmt_apis.session_cookie_example" >}}"}

response = requests.get(url, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response" id="example2-response" >}}

The response includes a single container-information object for the requested container (ID = {{< getvar v="product.default_container.id" >}}):

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
            "created_at": "2021-01-15T08:17:19.904000+00:00",
            "data_lifecycle_layers_order": [],
            "data_policy_layers_order": [],
            "id": {{% getvar v="product.default_container.id" %}},
            "imports": [],
            "mapping": {
                "cmds_index": 0,
                "container_id": 0,
                "mds_instances": [
                    {
                        "service_context": {
                            "internal_xio_addresses": [
                                {
                                    "url": "tcp://10.0.0.1:5000"
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
                                    "url": "tcp://10.0.0.1:5001"
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
            "updated_at": "2021-01-30T14:30:00.367000+00:00"
        },
        "id": {{% getvar v="product.default_container.id" %}},
        "type": "container"
    },
    ...
}
```

