---
title:  "Delete Container"
keywords: "Delete Container, management, containers, http DELETE, DELETE method, DELETE, container IDs"
menu:
  main:
    parent:     "mgmt-containers-api"
    identifier: "mgmt-containers-api-delete-container"
    weight:     20
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Deletes a container.

{{< warning id="delete-container-warning" >}}
{{< text-delete-container-warning >}}
{{< /warning >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="request" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-header" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
DELETE /api/containers/<container> HTTP/1.1
Host: <management-APIs URL>
Cookie: session=<cookie>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "<management-APIs URL>/api/containers/<container>"
headers = {"Cookie": "session=<cookie>"}
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="http-method" >}}

<api>DELETE</api>

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

<dl>
  <!-- <container> -->
  {{< param-doc name="<container>" id="request-url-param-container" >}}
  The ID of the container to delete.

  {{< param-type >}}Integer{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
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
HTTP/1.1 <status code; 200 on success> <reason phrase>
Content-Type: application/json
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-syntax" >}}

```json
{
    "data": {
        "attributes": {
            "container_id": number,
            "job_id":       "string"
        },
        "type": "container_deletion",
        "id": 0
    }
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}


The <jsonkey>container_id</jsonkey> attribute of the response data contains the numeric ID of the deleted container.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Delete a container with ID 1030:

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
DELETE /api/containers/1030 HTTP/1.1
Host: {{< verkey k="mgmt_apis.url_example" >}}
Cookie: session={{< verkey k="mgmt_apis.session_cookie_example" >}}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{< verkey k="mgmt_apis.url_example" >}}/api/containers/1030"
headers = {"Cookie": "session={{< verkey k="mgmt_apis.session_cookie_example" >}}"}

response = requests.delete(url, headers=headers)
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
            "container_id": 1030,
            "job_id": "6e7f9bf5-4a7c-4efb-83b7-31785fa82183"
        },
        "type": "container_deletion",
        "id": 0
    }
}
```

