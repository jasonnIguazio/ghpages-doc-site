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
^^HTTPMETHOD^^ /api/^^EP^^ HTTP/1.1
Host: <{{< productUI lc >}} IP>:<port>
Content-Type: application/json
Cookie: session=<cookie>
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "http://<{{< productUI lc >}} IP>:<port>/api/^^EP^^"
headers = {
            "Content-Type": "application/json",
            "Cookie": "session=<cookie>"
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="http-method" >}}

<api>^^HTTPMETHOD^^</api>

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-params-url-resource" >}}
<!-- ^^NOTE^^: For most operations, add `none="1"` in the shortcode call about,
  and delete the description placeholder below. -->

<dl>
  <!-- ^^PARAMNAME^^ -->
  {{< param-doc name="^^PARAMNAME^^" id="request-url-param-^^PARAMNAME^^" >}}
  ^^PARAMDESC^^

  {{< param-type >}}^^PARAMTYPE^^{{< /param-type >}}
  {{< param-req "^^PARAMREQID--OPT--M.R.R-or-url^^" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

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
  <!-- attributes -->
  {{< param-doc name="attributes" id="req-param-attributes" >}}
  ^^PARAMDESC^^

  {{< param-type >}}A JSON object of ^^ATTRIBUTESDESC^^ attributes{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}

  The following ^^ATTRIBUTESDESC^^ attributes are applicable to this request:

  <dl>
  <!-- ^^ATTRNAME^^ -->
  {{< param-doc name="^^ATTRNAME^^" id="req-param-attributes-^^ATTRNAME^^" >}}
  ^^ATTRDESC^^

{{< param-type >}}^^PARAMTYPE^^{{< /param-type >}}
{{< param-req "^^PARAMREQID--OPT--M.R.R-or-url^^" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- ^^ATTRNAME^^ -->
  {{< param-doc name="^^ATTRNAME^^" id="req-param-attributes-^^ATTRNAME^^" >}}
  ^^ATTRDESC^^

{{< param-type >}}^^PARAMTYPE^^{{< /param-type >}}
{{< param-req "^^PARAMREQID--OPT--M.R.R-or-url^^" >}}{{< /param-req >}}
  {{< /param-doc >}}
  </dl>
  {{< /param-doc >}}

  <!-- type -->
  {{< param-doc name="type" id="req-param-type" >}}
  The type of the data object. This value must be set to "^^APITYPE^^".

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

```http
HTTP/1.1 <status code; ^^HTTP-SUCCESS-STATUS-CODE^^ on success> <reason phrase>
Content-Type: application/json
...
```

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

The <element>data</jsonkey> object in the HTTP response body contains information about ^^RESPONSE-DATA-INFO^^.
Full the full list of returned data elements, see [response-data syntax](#response-data-syntax) above.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}



<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}
<!-- ^^NOTE^^: For requests without JSON data, in the HTTP tab, remove the
  `json` code block; and in the Python tab, remove the `payload` assignment and
  the `json=payload` `requests.<method>()` call in the `response` assignment.
-->

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
^^HTTPMETHOD^^ /api/^^EP^^ HTTP/1.1
Host: localhost:4001
Content-Type: application/json
Cookie: session=<cookie>
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

url = "http://localhost:4001/api/^^EP^^"
headers = {
            "Content-Type": "application/json",
            "Cookie": "session=<cookie>"
          }
payload = {
            ^^DATAPARAMS^^
          }

response = requests.^^HTTPMETHOD-PYTHON^^(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response" id="example1-response" >}}

```http
HTTP/1.1 ^^HTTPSTATUS^^ ^^HTTPREASONPHRASE^^
Content-Type: application/json
...
```
```json
{
    ^^JSONELEMENTS^^
}
```

