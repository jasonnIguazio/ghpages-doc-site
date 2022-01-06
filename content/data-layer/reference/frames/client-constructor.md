---
title:      "Client Constructor"
linktitle:  "Frames Client Constructor"
keywords: "frames client constructor, frames client, frames client initialization, frames client init, user authentiation, authentication, Frames authentication, address, container, data_url, password, token, user"
menu:
  main:
    name:       "Client Constructor"
    parent:     "frames-apis"
    identifier: "frames-api-client-constructor"
    weight:     10
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

All {{< getvar v="product.frames.name.lc" >}} operations are executed via an object of the <api>Client</api> class, which is created by using the <api>Client</api> constructor.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
Client(address="", container=""[, data_url="", user="", password="", token=""])
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="const-params-n-data-members" >}}

[<paramname>address</paramname>](#param-address) |
[<paramname>container</paramname>](#param-container) |
[<paramname>data_url</paramname>](#param-data_url) |
[<paramname>password</paramname>](#param-password) |
[<paramname>token</paramname>](#param-token) |
[<paramname>user</paramname>](#param-user)

<dl>
  <!-- address -->
  {{< param-doc name="address" id="param-address" >}}
  The address of the {{< getvar v="product.frames.name.lc" >}} service.
  <br/>
  **When running locally on the {{< product lc >}}**, set this parameter to `"{{< verkey k="frames.grpc.address" >}}"` for a gRPC client (recommended) or to `"{{< verkey k="frames.http.address" >}}"` for an HTTP client.
    (In the {{< product lc >}} Jupyter Notebook and web-shell services, the gRPC and HTTP port numbers of the {{< getvar v="product.frames.name.lc" >}} service are stored in predefined `{{< verkey k="frames.grpc.port_envar" >}}` and `{{< verkey k="frames.http.port_envar" >}}` environment variables, respectively.)
  <br/>
  **When connecting to the {{< product lc >}} remotely**, set this parameter to the API address of a {{< getvar v="product.frames.name.lc" >}} {{< product lc >}} service in the parent tenant.
    You can copy this address from the <gui-label>API</gui-label> column of the {{< getvar v="product.frames.name.long_lc" >}} service on the <gui-title>Services</gui-title> {{< productUI lc >}} page.
  {{< comment >}}<!-- [InfraInfo] (sharonl) I didn't use a list because then
    the list-item bullets of the param-type and param-req shortcodes, below,
    appear to be a continuation of the li bullets in the param description. -->
  {{< /comment >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- container -->
  {{< param-doc name="container" id="param-container" >}}
  The name of the data container that contains the backend data.
  For example, `"{{< getvar v="product.default_container.name" >}}"` or `"{{< getvar v="product.users_container.name" >}}"`.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- data_url -->
  {{< param-doc name="data_url" id="param-data_url" >}}
  A web-API base URL for accessing the backend data.
  By default, the client uses the data URL that's configured for the {{< getvar v="product.frames.name.lc" >}} service, which is typically the HTTPS URL of the web-APIs service of the parent tenant.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- token -->
  {{< param-doc name="token" id="param-token" >}}
  A valid {{< product lc >}} access key that allows access to the backend data.
  See {{< xref f="data-layer/reference/frames/overview.md" a="user-authentication" text="User Authentication" >}}.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}} when neither the [<api>user</api>](#param-user) or [<api>password</api>](#param-password) parameters or the authentication environment variables are set.
  {{< /param-req >}}
    {{< comment >}}<!-- [ci-paramname-in-li-param-xxx-shcds] `paramname`
      replaced with `api` to avoid extra space around the output bullet. -->
    {{< /comment >}}
  {{< /param-doc >}}

  <!-- user -->
  {{< param-doc name="user" id="param-user" >}}
  The username of a {{< product lc >}} user with permissions to access the backend data.
  See {{< xref f="data-layer/reference/frames/overview.md" a="user-authentication" text="User Authentication" >}}.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}} when neither the [<api>token</api>](#param-token) parameter or the authentication environment variables are set.
    <br/>
    When the <api>user</api> parameter is set, the [<api>password</api>](#param-password) parameter must also be set to a matching user password.
  {{< /param-req >}}
    {{< comment >}}<!-- [ci-paramname-in-li-param-xxx-shcds] -->
    {{< /comment >}}
  {{< /param-doc >}}

  <!-- password -->
  {{< param-doc name="password" id="param-password" >}}
  A {{< product lc >}} password for the user configured in the [<paramname>user</paramname>](#param-user) parameter.
  See {{< xref f="data-layer/reference/frames/overview.md" a="user-authentication" text="User Authentication" >}}.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}} when the [<api>user</api>](#param-user) parameter is set.
  {{< /param-req >}}
    {{< comment >}}<!-- [ci-paramname-in-li-param-xxx-shcds] -->
    {{< /comment >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="retval" >}}

Returns a new {{< getvar v="product.frames.name.lc" >}} <api>Client</api> object.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

The following example, for local {{< product lc >}} execution creates a {{< getvar v="product.frames.name.lc" >}} client for accessing data in the "{{< getvar v="product.users_container.name" >}}" data container.
The identity of the user is authenticated by setting the <paramname>{{< xref f="data-layer/reference/frames/client-constructor.md" a="param-token" text="token" >}}</paramname> parameter of the <api>Client</api> constructor to a {{< product lc >}} access key:
```python
import {{% getvar v="product.frames.client.lib_name" %}} as v3f
client = v3f.Client("{{% verkey k="frames.grpc.address" %}}", container="{{% getvar v="product.users_container.name" %}}", token="{{< productUI access_key_example >}}")
```

The following example is similar to the previous exactly except that the identity of the user is authenticated by setting the <paramname>{{< xref f="data-layer/reference/frames/client-constructor.md" a="param-user" text="user" >}}</paramname> and <paramname>{{< xref f="data-layer/reference/frames/client-constructor.md" a="param-password" text="password" >}}</paramname> parameters of the <api>Client</api> constructor to the name of a {{< product lc >}} user and the matching password:
```python
import {{% getvar v="product.frames.client.lib_name" %}} as v3f
client = v3f.Client("{{% verkey k="frames.grpc.address" %}}", container="{{% getvar v="product.users_container.name" %}}, user="{{% getvar v="product.running_user.example" %}}", password="mypass")
```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/frames/overview.md" >}}
    - {{< xref f="data-layer/reference/frames/overview.md" a="init" text="Initialization" >}}
    - {{< xref f="data-layer/reference/frames/overview.md" a="user-authentication" text="User authentication" >}}
    - {{< xref f="data-layer/reference/frames/overview.md" a="client-methods" text="Client Methods" >}}

