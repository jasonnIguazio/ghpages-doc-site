---
title:  "Create Session"
keywords: "Create Session, management, sessions, session cookies, cookies, Set-Cookie header, Set-Cookie, http headers, request header, http POST, POST method, POST, TTL, user-credential attributes, username, password"
menu:
  main:
    parent:     "mgmt-sessions-api"
    identifier: "mgmt-sessions-api-create-container"
    weight:     10
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Creates a new management session.
The operation returns a session cookie that can be used to authenticate the user when sending other management requests (see the description of the <paramname>{{< xref f="cluster-mgmt/reference/management-apis/general-api-structure.md" a="request-cookie" text="&lt;cookie&gt;" >}}</paramname> parameter in the {{< xref f="cluster-mgmt/reference/management-apis/general-api-structure.md" type="title" >}} documentation).

The cookie is valid for the duration of its time-to-live (**TTL**) period, which is returned in the operation's response (both in the <paramname>max-age</paramname> parameter of the <api>[Set-Cookie](#response-header-Set-Cookie)</api> response header, and in the <jsonkey>ttl</jsonkey> [response-data attribute](#response-data-elements)).
When this period elapses, the cookie expires.
The cookie's expiration time is returned in the <jsonkey>expires_at</jsonkey> response-data attribute.

<api>Create Session</api> itself doesn't require a session cookie.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="request" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="request-header" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-header-syntax" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /api/sessions HTTP/1.1
Host: <management-APIs URL>
Content-Type: application/json
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
url = "<management-APIs URL>/api/sessions"
headers = { "Content-Type": "application/json" }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="http-method" >}}

<api>POST</api>

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
        "attributes": {
            "username": "string",
            "password": "string"
        },
        "type": "session"
    }
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
payload = {
            "data": {
                "attributes": {
                    "username": "string",
                    "password": "string"
                },
                "type": "session"
            }
          }
```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request-data-params" >}}

<dl>
  <!-- attributes -->
  {{< param-doc name="attributes" id="req-param-attributes" >}}
  User-credentials attributes, as received from your {{< product lc >}}'s security administrator (see {{< xref f="users-and-security/users.md" a="user-security_admin" textvar="product.ver.predef_users.security_admin_user" >}}).
  {{< param-type >}}A JSON object of user-credentials attributes{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}

  The following user-credentials attributes are applicable to this request:

  <dl>
  <!-- username -->
  {{< param-doc name="username" id="req-param-attributes-username" >}}
  User name.

{{< param-type >}}String{{< /param-type >}}
{{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- password -->
  {{< param-doc name="password" id="req-param-attributes-password" >}}
  Password.

{{< param-type >}}String{{< /param-type >}}
{{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
  </dl>
  {{< /param-doc >}}

  <!-- type -->
  {{< param-doc name="type" id="req-param-type" >}}
  The type of the data object. This value must be set to "session".

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
HTTP/1.1 <status code; 201 on success> <reason phrase>
Content-Type: application/json
Set-Cookie: session=<cookie>; max-age=<age>; path=/;
...
```

<!-- ---------------------------------------- -->
{{< small-heading id="response-header-Set-Cookie" >}}Set-Cookie Header{{< /small-heading >}}

The <api>Set-Cookie</api> response header contains the new session cookie that you created (<paramname>&lt;cookie&gt;</paramname>).
Save this cookie and use it to submit requests to other management-API resources (see the {{< xref f="cluster-mgmt/reference/management-apis/sessions-api/overview.md" text="Sessions API overview" >}} and [<api>Create Session</api> description](#description).

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref_web" type="response-data" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-syntax" >}}

```json
{
    "data": {
        "attributes": {
            "created_at": "string",
            "expires_at": number,
            "gids": [
                "string"
            ],
            "group_ids": [
                "string"
            ],
            "plane":  "string",
            "ttl":    number,
            "uid":    number
        },
        "id": "string",
        "relationships": {
            "tenant": {
                "data": {
                    "id":   "string",
                    "type": "string"
                }
            },
            "user": {
                "id":   "string",
                "type": "string"
            }
        },
        "type": "session"
    }
}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response-data-elements" >}}

The <jsonkey>data</jsonkey> object in the HTTP response body contains information about the new session, such as its creation time (<jsonkey>created_at</jsonkey> attribute), expiration time (<jsonkey>expires_at</jsonkey> attribute), and time-to-live period in seconds (<jsonkey>ttl</jsonkey>).
Full the full list of returned data elements, see [response-data syntax](#response-data-syntax) above.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="request" id="example1-request" >}}

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
POST /api/sessions HTTP/1.1
Host: {{< verkey k="mgmt_apis.url_example" >}}
Content-Type: application/json
```
```json
{
    "data": {
        "attributes":
        {
            "username": "myuser",
            "password": "MyPass1298"
        },
        "type": "session"
    }
}
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{< verkey k="mgmt_apis.url_example" >}}/api/sessions"
headers = {"Content-Type": "application/json"}
payload = {
            "data": {
                "attributes": {
                    "username": "myuser",
                    "password": "MyPass1298"
                },
                "type": "session"
            }
          }

response = requests.post(url, json=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref_web" type="response" id="example1-response" >}}

```http
HTTP/1.1 201 Created
Content-Type: application/json
Date: Mon, 18 Mar 2019 00:48:30 GMT
Set-Cookie: session=j%3A%7B%22sid%22%3A%20%22240e02ed-2204-4f30-abce-52ebd8456d94%22%7D; max-age=86400; path=/;
Transfer-Encoding: chunked
```
```json
{
    "data": {
        "relationships": {
            "user": {
                "data": {
                    "type": "user",
                    "id": "6e040a9a-9403-44bd-8f90-a61e079c6c45"
                }
            },
            "tenant": {
                "data": {
                    "type": "tenant",
                    "id": "b7c663b1-a8ee-49a9-ad62-ceae7e751ec8"
                }
            }
        },
        "attributes": {
            "kind": "session",
            "group_ids": [],
            "uid": 0,
            "gids": [
                65534
            ],
            "tenant_id": "b7c663b1-a8ee-49a9-ad62-ceae7e751ec8",
            "created_at": "2019-03-18T00:48:30.614000+00:00",
            "expires_at": 1552956510,
            "plane": "control",
            "ttl": 86400
        },
        "type": "session",
        "id": "290818d2-1ded-4c9c-beeb-0940f8dcf0a5"
    }
}
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref_web" type="postman" >}}

To send a <api>Create Session</api> request using Postman, follow these steps:

1.  Create a new request and set the request method to `POST`.

2.  In the request URL field, enter the following; replace `<management-APIs URL>` with the HTTPS URL of the {{< productUI short_lc >}}:
    ```
    <management-APIs URL>/api/sessions/
    ```

    For example:
    ```
    {{% verkey k="mgmt_apis.url_example" %}}/api/sessions/
    ```

3.  In the <gui-title>Headers</gui-title> tab, add a <api>Content-Type</api> header (<gui-label>Key</gui-label>) and set its value to `application/json`.

4.  In the <gui-title>Body</gui-title> tab, select the <gui-label>raw</gui-label> format and add the following JSON code; replace the `<username>` and `<password>` placeholders with your {{< product lc >}} login credentials:
    ```json
    {
        "data": {
            "attributes": {
                "username": "<username>",
                "password": "<password>"
            },
            "type": "session"
        }
    }
    ```

5.  Select <gui-label>Send</gui-label> to send the request, and then check the response.
    In the case of a successful request &mdash;

    - The <gui-title>Headers</gui-title> response tab contains a <api>Set-Cookie</api> header with a <paramname>session</paramname> element whose value is the session cookie (`session=<cookie>`).
        You can also see the cookie in the <gui-title>Cookies</gui-title> response tab (for example, `{{< verkey k="mgmt_apis.session_cookie_example" >}}`).
        Copy and save this cookie.
        You'll need to pass it as the value of the <paramname>session</paramname> parameter of the <api>Cookie</api> header in other management-API requests.
    - The <api>Set-Cookie</api> header also contains a <paramname>max-age</paramname> element, which contains the session's time-to-live (TTL) period, in seconds; when this period elapses, the session expires and the cookie is no longer valid.
        The same value is also returned in the <jsonkey>data.attributes.ttl</jsonkey> response-body data element, which you can see in the <gui-title>Body</gui-title> tab.
    - In the <gui-title>Body</gui-title> tab, you can see the full JSON response data.
        Among the returned response-data attributes is a <jsonkey>ttl</jsonkey> attribute that contains the same session TTL value that's returned in the <paramname>max-age</paramname> header parameter, and an <jsonkey>expires&#95;at</jsonkey> attribute that contains the session's expiration time as a Unix timestamp in seconds.
        The expiration time can also be seen as a date format in the <gui-label>Expires</gui-label> column of the <gui-title>Cookies</gui-title> response tab.
        {{< comment >}}<!-- [ci-cosmetics-underscore_md-fmt-issues] [InfraInfo]
          (sharonl) In the expires_at reference, I replaced the underscore with
          the &#95; HTML underscore character because the underscore messed up
          my Markdown Gvim syntax highlighting. -->
        {{< /comment >}}

