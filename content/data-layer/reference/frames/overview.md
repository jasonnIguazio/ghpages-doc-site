---
title:      "Overview of the Frames API"
linktitle:  "Frames Overview"
description:  "Overview of the Iguazio V3IO Frames Python API for NoSQL, TSDB, and stream data."
keywords: "frames apis, v3io frames, frames, frames reference, frames overview, frames backends, frames methods, frames initialization, frames init, frames client, frames client backends, frames client methods, dataframes, pandas dataframes, pandas, nosql, key-value, kv, tsdb, streaming, stream"
menu:
  main:
    name:       "Overview"
    parent:     "frames-apis"
    identifier: "frames-apis-overview"
    weight:     5
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. [TODO-SITE-RESTRUCT-P2] The
  Frames README references the old URL under reference/api-reference/frames/.
  => TODO: Edit. -->
<!-- [FRAMES-STREAMING-NO-SUPPORT] [IntInfo] See info regarding the
  frames_stream filter uses in this file in
  frames/stream.IGNORED/_index.html. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

{{< getvar v="product.frames.name.full" >}} ("{{< getvar v="product.frames.name.lc" >}}") is a multi-model open-source data-access library that provides a unified high-performance DataFrame API for working with NoSQL (key-value){{< condition filter="frames_stream" filterval="true" >}}, stream,{{< /condition >}} and time-series (TSDB) data in the data store of the {{< product full >}} ("the {{< product lc >}}").
This reference describes the library's DataFrame API for Python {{< verkey k="frames.python.versions" >}}.
See also the {{< getvar v="product.frames.name.lc" >}} restrictions in the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="frames" >}} documentation.

In addition to the examples provided in this reference, you can find many examples of using the {{< getvar v="product.frames.name.lc" >}} API in the {{< product lc >}}'s {{< public-gh ghid="tutorials" link="1" path="/" k="text_jupyter_long" >}}.
It's recommended that you begin your development with the [<file>{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.frames_nb.file" >}}</file>]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.frames_nb.file" >}}) notebook, which has getting-started examples and related documentation.

<!-- //////////////////////////////////////// -->
## Creating a {{< getvar v="product.frames.name.tc" >}} Service {#create-frames-service}

To use {{< getvar v="product.frames.name.lc" >}}, you first need to create a {{< getvar v="product.frames.name.lc" >}} service:

1.  On the <gui-title>Services</gui-title> {{< productUI lc >}} page, select <gui-label>New Service</gui-label> from the top action toolbar.
2.  In the <gui-title>Basic Settings</gui-title> tab, select <gui-label>{{< verkey k="frames.service_type_display_name" >}}</gui-label> from the <gui-label>Service type</gui-label> drop-down menu.
    You can optionally edit the service name and description.
    {{< note id="single-instance-service-note" >}}
You can only create a single shared tenant-wide instance of the {{< getvar v="product.frames.name.lc" >}} service.
If the <gui-label>{{< verkey k="frames.service_type_display_name" >}}</gui-label> option is disabled, this means that the parent tenant already has a {{< getvar v="product.frames.name.lc" >}} service (as indicated in the tooltip for this service type).
In this case, cancel the service creation, locate the {{< getvar v="product.frames.name.lc" >}} service in the services table, and verify that it's enabled.
Otherwise, proceed to the next step.
  {{< /note >}}
3.  Proceed to the <gui-label>Common Parameters</gui-label> tab and optionally change the default resource configuration; this isn't advisable for new users.
4.  Proceed to the <gui-label>Custom Parameters</gui-label> tab and select <gui-label>Save Service</gui-label> to save your changes.
5.  Select <gui-label>Apply Changes</gui-label> from the top action toolbar of the <gui-title>Services</gui-title> page to deploy your changes.
    When the deployment completes, you should be able to see the {{< getvar v="product.frames.name.lc" >}} service in the services table, as demonstrated in the following image:

    {{< igz-figure id="img-dashboard_services_frames_table_entry" src="/images/dashboard_services_frames_table_entry.png" alt="Frames service" >}}

<!-- //////////////////////////////////////// -->
## Initialization {#init}

To use the {{< getvar v="product.frames.name.lc" >}} API, you need to import the (<file>{{< public-gh ghid="frames" link="1" k="lib_name" >}}</file>) Python library.
For example:
```python
import {{% getvar v="product.frames.client.lib_name" %}} as v3f
```
Then, you need to create and initialize an instance of the <api>Client</api> class; see {{< xref f="data-layer/reference/frames/client-constructor.md" >}}.
After you have a client object, you can use the <api>Client</api> methods to perform different data operations for the supported backend types.

<!-- //////////////////////////////////////// -->
## Backend Types {#backend-types}

All {{< getvar v="product.frames.name.lc" >}} client methods receive a <paramname>backend</paramname> parameter for setting the {{< getvar v="product.frames.name.lc" >}} backend type.
{{< getvar v="product.frames.name.lc" >}} supports the following backend types:

- <api-b>nosql</api-b> or <api-b>kv</api-b> &mdash; a NoSQL backend for working with {{< product lc >}} NoSQL (key/value) tables.
    See {{< xref f="data-layer/reference/frames/nosql/" >}}.
- <api-b>tsdb</api-b> &mdash; a time-series database (TSDB) backend for working with TSDB tables.
    See {{< xref f="data-layer/reference/frames/tsdb/" >}}.
{{< condition filter="frames_stream" filterval="true" >}}
- <api-b>stream</api-b> &mdash; a streaming backend for working with {{< product lc >}} data streams.
    See {{< xref filter="frames_stream" filterval="true" f="data-layer/reference/frames/stream/" >}}.
    {{< comment >}}<!-- [FUTURE-FRAMES-STREAM-QA] [IntInfo] See details in
      frames/stream.IGNORED/_index.md. -->
    {{< /comment >}}
{{< /condition >}}
- <api-b>csv</api-b> &mdash; a CSV backend for working with comma-separated-value (CSV) files.
    This backend type is used only for testing purposes.

{{< condition filter="frames_stream" filterval="false" >}}
{{< note id="stream-backend-no-support-note" >}}
The <api>stream</api> backend type isn't supported in the current release.
{{< /note >}}
{{< /condition >}}

<!-- //////////////////////////////////////// -->
## Client Methods {#client-methods}

The <api>Client</api> class features the following methods for supporting basic data operations on a data **collection**, such as a NoSQL or TSDB table{{< condition filter="frames_stream" filterval="true" >}} or a data stream{{< /condition >}}:

- <func-b>create</func-b> &mdash; creates a new collection.
    {{< note id="client-create-method-backends-note" >}}
The <func>create</func> method isn't applicable to the NoSQL backend (<api>nosql | kv</api>), because NoSQL tables in the {{< product lc >}} don't need to be created prior to ingestion; when ingesting data into a table that doesn't exist, the table is automatically created.
See {{< xref f="data-layer/nosql/" a="creating-tables" >}}.
    {{< /note >}}
- <func-b>delete</func-b> &mdash; deletes a collection or specific collection items.
- <func-b>read</func-b> &mdash; reads data from a collection into pandas DataFrames.
- <func-b>write</func-b> &mdash; writes data from pandas DataFrames to a collection.
- <func-b>execute</func-b> &mdash; executes a backend-specific command on a collection.
    Each backend may support multiple commands.

While most methods and commands are supported by all backends, there are differences in the supported parameters and their significance.
{{< condition filter="frames_stream" filterval="true" >}}
Therefore, this reference provides separate method documentation for each backend type; see the {{< xref f="data-layer/reference/frames/nosql/" text="NoSQL" >}}, {{< xref f="data-layer/reference/frames/tsdb/" text="TSDB" >}}, and {{< xref filter="frames_stream" filterval="true" f="data-layer/reference/frames/stream/" text="streaming" >}} backend API references.
{{< /condition >}}
{{< condition filter="frames_stream" filterval="false" >}}
Therefore, this reference provides separate method documentation for each backend type; see the {{< xref f="data-layer/reference/frames/nosql/" text="NoSQL" >}} and {{< xref f="data-layer/reference/frames/tsdb/" text="TDSB" >}} backend API references.
{{< /condition >}}
{{< comment >}}<!-- [FRAMES-STREAMING-NO-SUPPORT] -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## User Authentication {#user-authentication}
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This section is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

When creating a {{< getvar v="product.frames.name.lc" >}} client, you must provide valid {{< product lc >}} credentials for accessing the backend data, which {{< getvar v="product.frames.name.lc" >}} will use to identify the identity of the user.
This can be done by using any of the following alternative methods (documented in order of precedence):

- <a id="user-auth-client-const-params"></a>Provide the authentication credentials in the {{< xref f="data-layer/reference/frames/client-constructor.md" a="const-params-n-data-members" text="<api>Client</api> constructor parameters" >}} by using either of the following methods:

    - <a id="user-auth-token"></a>Set the <paramname>{{< xref f="data-layer/reference/frames/client-constructor.md" a="param-token" text="token" >}}</paramname> constructor parameter to a valid {{< product lc >}} access key with the required data-access permissions.
        You can {{< text-access-key-get >}}.
    - <a id="user-auth-user-password"></a>Set the <paramname>{{< xref f="data-layer/reference/frames/client-constructor.md" a="param-user" text="user" >}}</paramname> and <paramname>{{< xref f="data-layer/reference/frames/client-constructor.md" a="param-password" text="password" >}}</paramname> constructor parameters to the username and password of a {{< product lc >}} user with the required data-access permissions.

        {{< note >}}
You cannot use both methods concurrently: setting both the <paramname>token</paramname> and <paramname>user</paramname> and <paramname>password</paramname> parameters in the same constructor call will produce an error.
        {{< /note >}}

- <a id="user-auth-client-envar"></a>Set the authentication credentials in environment variables, by using either of the following methods:

  - <a id="user-auth-client-envar-access-key"></a>Set the `{{< getvar v="product.running_user.access_key_envar" >}}` environment variable to a valid {{< product lc >}} access key with the required data-access permissions.
        {{< note >}}
The {{< product lc >}}'s Jupyter Notebook service automatically defines the `{{< getvar v="product.running_user.access_key_envar" >}}` environment variable and initializes it to a valid access key for the running user of the service.
        {{< /note >}}
  - <a id="user-auth-client-envar-user-pwd"></a>Set the `{{< getvar v="product.running_user.envar" >}}` and `{{< getvar v="product.running_user.pwd_envar" >}}` environment variables to the username and password of a {{< product lc >}} user with the required data-access permissions.
        {{< note >}}
- When the client constructor is called with authentication parameters ([option #1](#user-auth-client-const-params)), the authentication-credentials environment variables (if defined) are ignored.
- When `{{< getvar v="product.running_user.access_key_envar" >}}` is defined, `{{< getvar v="product.running_user.envar" >}}` and `{{< getvar v="product.running_user.pwd_envar" >}}` are ignored.
        {{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- TODO: Add additional links (for example, to getting-started
  tutorials after we add Frames doc to these tutorials).
-->
{{< /comment >}}

- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}
- {{< xref f="data-layer/reference/frames/nosql/" >}}
- {{< xref f="data-layer/reference/frames/tsdb/" >}}
{{< condition filter="frames_stream" filterval="true" >}}
- {{< xref filter="frames_stream" filterval="true" f="data-layer/reference/" >}}
{{< /condition >}}
- {{< xref f="data-layer/reference/frames/attribute-data-types.md" >}}
- [{{< getvar v="product.frames.name.sc" >}} software specifications and restrictions]({{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="frames" t="url" >}})

