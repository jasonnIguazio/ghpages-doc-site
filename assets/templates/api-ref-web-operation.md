---
title:  "^^OPERATION^^"
menu:
  main:
    parent:     "^^PARENT_API_BASE_ID^^-latest-release"
    identifier: "^^PARENT_API_BASE_ID^^-^^OPERATION^^-latest-release"
    weight:     ^^SIDE-MENU-WEIGHT^^
---
<!-- TODO: Replace all "^^...^^"" placeholders, and delete this comment. -->

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

^^DESCRIPTION^^

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
Host: <web-gateway IP>:<port>
Content-Type: application/json
X-v3io-function: ^^OPERATION^^
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<web-gateway IP>:<port>/<container>/<resource>"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": ^^OPERATION^^
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}

^^REQURLRESPARAMDESC^^

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```json
{
    ^^DATAPARAMS^^
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            ^^DATAPARAMS^^
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- ^^PARAMNAME^^ -->
  {{< param-doc name="^^PARAMNAME^^" id="req-param-^^PARAMNAME^^" >}}
  ^^PARAMDESC^^

  {{< param-type >}}^^PARAMTYPE^^{{< /param-type >}}
  {{< param-req "^^PARAMREQID--OPT--M.R.R-or-url^^" >}}{{< /param-req >}}
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
    ^^JSONELEMENTS^^
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

<dl>
  <!-- ^^ELEMENTNAME^^ -->
  {{< param-doc name="^^ELEMENTNAME^^" id="resp-param-^^ELEMENTNAME^^" >}}
  ^^ELEMENTDESC^^

  {{< param-type >}}^^PARAMTYPE^^{{< /param-type >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="errors" >}}
<!-- ^^TEMPLATE-USE-TODO^^: EDIT for the target operation, or REMOVE the
  section altogether for operations that don't support unique error codes -
  currently supported only for the Streaming Web API.
  Document the error codes in alphabetical order.
-->
<!-- [InfraInfo] TODO: Create a separate Errors reference (for all APIs / for a
  specific group such as web APIs / for a specific API such as the Streaming Web
  API) with all the relevant errors codes, and in the Errors section of the
  operation/function API ref just name the relevant errors for this operation
  and link to the reference. -->

{{< web-api-errors >}}
<tr>
  <td><api>InvalidArgumentException</api></td>
  <td>A provided request parameter is not valid for this request.
  </td>
</tr>
<tr>
  <td><api>ResourceInUseException</api></td>
  <td>A collection already exists in the specified stream path.</td>
  </td>
</tr>
<tr>
  <td><api>Permission denied</api></td>
  <td>The sender of the request does not have the required permissions to perform the operation.
  </td>
</tr>
{{< /web-api-errors >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}



<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /^^CONTAINER^^/ HTTP/1.1
Host: localhost:8081
Content-Type: application/json
X-v3io-function: ^^OPERATION^^
```
```json
{
    ^^DATAPARAMS^^
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "http://localhost:8081/^^CONTAINER^^/"
headers = {
            "Content-Type": "application/json",
            "X-v3io-function": ^^OPERATION^^
          }
payload = {
            ^^DATAPARAMS^^
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
    ^^JSONELEMENTS^^
}
```

