---
title:      "Working with Data Containers"
description: "Introduction to data elements in the Iguazio MLOps Platform - data containers, collections, and objects."
keywords: "containers, getting started, create container, delete container, browser container, directories, folders, create directory, delete directory, create folder, delete folder, web apis, cluster-management apis, management apis, Create Container, Delete Container, List Containers, file system, dfs, hadoop, hdfs, v3io, v3io paths, table paths"
layout: "section-list"
menu:
  main:
    parent:     "data-containers"
    identifier: "working-with-containers"
    weight:     30
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  tutorials/getting-started/containers.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from the
  data-ingestion-and-preparation/ basic-data-ingestion-and-preparation.ipynb,
  file-access.ipynb, frames.ipynb, and spark-jdbc.ipynb notebooks); all links
  are to the #create-delete-container-dirs anchor. (Until then and for existing
  tutorials releases, we'll have URL redirect rules as part of the
  restructured-site publication.)
- [TODO-SITE-RESTRUCT-P2] Split it into separate pages. Note that this will
  also require edit the v3io/tutorials links to this doc (see separate comment).
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from data-ingestion-and-preparation/ notebooks
  basic-data-ingestion-and-preparation.ipynb, file-access.ipynb, frames.ipynb,
  and spark-jdbc.ipynb); all links are to the #create-delete-container-dirs
  anchor. -->
{{< /comment >}}
{{< comment >}}
<!-- [TODO-QS-PYTHON-REST-EXAMPLES]: Add Python code examples for web-API and
  management-API requests and refer to the option of running them from Jupyter
  Notebook or Zeppelin instead of Postman. -->
<!-- [TODO-JUPYTER] Mention here, in the ingestion QS, and in separate Jupyter
  doc the option to do the following easily also from Jupyter (from the
  JupyterLab File Browser in the right pane): list containers (see the
  container directories in the "v3io" mount directory); create, and delete
  container directories (either via the "v3io" mount directory or directly in
  the JupyterLab root directory = the /v3io/users/<username> / /User directory);
  upload, download, and delete files. (27.3.19) Adi said we can mention it but
  it's not a high priority. He said perhaps we should mention it in a doc
  comment within the Jupyter notebook. -->
<!-- TODO: Replace the use of the username/password authentication method in
  the examples with the access-token method, and edit the related info in the 
  #before-you-begin section. -->
<!-- [c-projects-default-container] [V3.0.0-TODO-P2] [IntInfo] (sharonl)
  (16.1.21) [DOC IG-17802] Add the "projects" container to list-containers
  result (UI containers overview and management-API responses) and replace
  container-specific operation examples to replace the "bigdata" containers
  with the "projects" container - in the UI screen shots and the text,
  including code samples. I already replaced "default" container references
  with "predefined" container and removed the reference to the number of
  predefined containers. [INFRA-TODO] return the use of the default_container
  product data variable instead of bigdata_container, except for list-containers
  results. Edit the ingest-n-consume.md tutorial together with this tutorial
  as the intention is to use in that tutorial container directories created in
  this tutorial.
  TODO: Replace the sample responses with actual updated responses; for now, I
  just manually added "projects" to the list-containers response and updated
  the dates. 
  [c-bigdata-container-rm] [FUTURE-TODO] When the "bigdata" container
  is no longer predefined, in a future release, remove the references to it
  (which should remain until then in list-containers results, even after we
  replace the other "bigdata" container uses in the tutorial examples). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This tutorial outlines different methods for performing basic data-container tasks in the {{< product lc >}} &mdash; listing the existing containers, creating and deleting containers and container directories, and browsing container contents.

<!-- //////////////////////////////////////// -->
## Before You Begin {#before-you-begin}

This tutorial demonstrates how to perform basic tasks using different {{< product lc >}} interfaces &mdash; {{< productUI lc >}}, file system, web APIs, and cluster-management APIs.

- To use the **file-system** interface, you need to create a command-line service from which to run your code &mdash; such as a web-based shell, or Jupyter Notebook.
    See {{< xref f="services/fundamentals.md" a="create-new-service" text="Creating a New Service" >}}.
    To understand how data paths are set in file-system commands, see {{< xref f="data-layer/apis/data-paths.md" a="data-paths-fs" text="File-System Data Paths" >}}.
- To send **web-API** requests, you need to have the URL of your tenant's web-APIs service (`{{< verkey k="webapi.service_display_name" >}}`), and either a {{< product lc >}} username and password or an access key for authentication.
    To learn more and to understand how to structure and secure the web-API requests, see the {{< xref f="data-layer/reference/web-apis/" text="web-APIs reference" >}}, and especially {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}} and {{< xref f="data-layer/reference/web-apis/security.md" >}}.
    (The tutorial Postman examples use the username-password authentication method, but if you prefer, you can replace this with access-key authentication, as explained in the documentation.)
    To understand how data paths are set in web-API requests, see {{< xref f="data-layer/apis/data-paths.md" a="data-paths-rest-apis" text="RESTful Web and Management API Data Paths" >}}.
- To send **cluster-management-API ("management-API")** requests, you need to have the URL of the management-API service and a session cookie for authentication.
    To learn more and understand how to structure and secure management-API requests, see the {{< xref f="cluster-mgmt/reference/management-apis/" text="management-APIs reference" >}}, and especially {{< xref f="cluster-mgmt/reference/management-apis/general-api-structure.md" >}} and {{< xref f="cluster-mgmt/reference/management-apis/sessions-api/create-session.md" >}} (including specific instructions for {{< xref f="cluster-mgmt/reference/management-apis/sessions-api/create-session.md" a="postman" text="Postman" >}}).
    To understand how data paths are set in management-API requests, see {{< xref f="data-layer/apis/data-paths.md" a="data-paths-rest-apis" text="RESTful Web and Management API Data Paths" >}}.

<!-- //////////////////////////////////////// -->
## Listing Containers {#list-containers}

You can view information about your tenant's containers and related metadata from the [{{< productUI lc >}}](#list-containers-ui), from the [file-system interface](#list-containers-fs), or by using the RESTful [Container Management API](#list-containers-mgmt-api) or [Simple-Object Web API](#list-containers-s3-web-api).
The {{< productUI lc >}} also displays performance statistics for each container, which can also be retrieved with the management API {{< beta mark="1" >}}.
{{< comment >}}<!-- [BETA-MANAGEMENT-APIS] [IntInfo] The management API for
  returning container statistics or a tenant statistics (Tenant-Statistics
  Management API - /api/tenants/statistics/) - isn't documented yet. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Using the {{< productUI tc >}} {#list-containers-ui}

To view information about the data containers of your tenant, in the {{< productUI lc >}}'s side navigation menu, select <gui-label>Data</gui-label>.
The <gui-title>Data</gui-title> page displays a containers table that includes the name and performance-statistics summary of each container, as demonstrated in the following image:
{{< igz-figure img="dashboard_data_containers_w_multi_active_containers.png" alt="Dashboard containers table" >}}

When you select a container from the table, the <gui-title>Browse</gui-title> tab, which is selected by default, allows you to browse the contents of the container; see [Browsing a Container](#browse-container-ui).

The <gui-title>Overview</gui-title> tab provides more detailed information about the selected container, as demonstrated for the "{{< getvar v="product.bigdata_container.name" >}}" container in the following image:
{{< igz-figure img="dashboard_data_container_overview_active_container.png" alt="Dashboard container overview" >}}
{{< comment >}}<!-- TODO: When Bug IG-8169 is fixed, replace this screen shot
  with one that doesn't have incorrect spikes for new data points in the
  performance graphs (see info in the release-notes known issues), and also try
  to create a screen shot for a container with more data. -->
{{< /comment >}}

The <gui-title>Data-Access Policy</gui-title> tab allows you to define data-access policy rules that restrict access to data in the container based on different criteria.
For more information, see the {{< xref f="users-and-security/security.md" a="data-access-policy-rules" text="Data-Access Policy Rules" >}}.

<!-- ---------------------------------------- -->
### Using the File-System Interface {#list-containers-fs}

You can list the data containers of your tenant from a command-line shell by running a local file-system <cmd>ls</cmd> command on the tenant's data root using the `{{< verkey k="fs_k8s.data_mount.name" >}}` data mount:
```sh
ls {{% verkey k="fs_k8s.data_mount.path" %}}
```

<!-- ---------------------------------------- -->
### Using the Container Management API {#list-containers-mgmt-api}

You can list the data containers of your tenant and see related metadata by using the <api>{{< xref f="cluster-mgmt/reference/management-apis/containers-api/list-containers.md" text="List Containers" >}}</api> operation of the {{< product lc >}}'s RESTful Containers Management API {{< beta mark="1" >}}.
{{< comment >}}<!-- [BETA-MANAGEMENT-APIS] -->
{{< /comment >}}

For example, to send the request from Postman, do the following:

1.  Create a new request and set the request method to `GET`.

2.  In the request URL field, enter the following; replace `<management-APIs URL>` with the HTTPS URL of the {{< productUI short_lc >}}:
    ```
    <management-APIs URL>/api/containers/
    ```

    For example:
    ```
    {{% verkey k="mgmt_apis.url_example" %}}/api/containers/
    ```

3.  In the <gui-title>Headers</gui-title> tab, add the following headers:

    <table>
    <tr>
      <th style="width:15%;">Key</th>
      <th>Value</th>
    </tr>
    <tr>
      <td><api>Content-Type</api></td>
      {{< td >}}`application/json`
      {{< /td >}}
    </tr>
    <tr>
      <td><api>Cookie</api>
      {{< td >}}`session=<cookie>`; replace `<cookie>` with a session cookie returned in the <api>Set-Cookie</api> response header of a previous <api>Create Session</api> request.
      {{< /td >}}
    </tr>
    </table>

4.  Select <gui-label>Send</gui-label> to send the request, and then check the response <gui-title>Body</gui-title> tab.
    Following is an example response body for a tenant that has only the predefined containers ("{{< getvar v="product.projects_container.name" >}}", "{{< getvar v="product.bigdata_container.name" >}}",  and "{{< getvar v="product.users_container.name" >}}"):
    {{< comment >}}<!-- [c-bigdata-container-rm] [FUTURE-TODO] Edit when the
      predefined "bigdata" container is removed. -->
    {{< /comment >}}

    ```json
    {
        "included": [],
        "meta": {
            "ctx": "09348042905611315558"
        },
        "data": [
            {
                "attributes": {
                    "name": "{{% getvar v="product.bigdata_container.name" %}}",
                    "imports": [],
                    "created_at": "2021-01-17T12:41:10.258000+00:00",
                    "operational_status": "up",
                    "id": {{% getvar v="product.bigdata_container.id" %}},
                    "admin_status": "up",
                    "data_lifecycle_layers_order": [],
                    "data_policy_layers_order": [],
                    "properties": []
                },
                "type": "container",
                "id": {{% getvar v="product.bigdata_container.id" %}}
            },
            {
                "attributes": {
                    "name": "{{% getvar v="product.users_container.name" %}}",
                    "imports": [],
                    "created_at": "2021-01-17T12:41:10.959000+00:00",
                    "operational_status": "up",
                    "id": {{% getvar v="product.users_container.id" %}},
                    "admin_status": "up",
                    "data_lifecycle_layers_order": [],
                    "data_policy_layers_order": [],
                    "properties": []
                },
                "type": "container",
                "id": {{% getvar v="product.users_container.id" %}}
            },
            {
                "attributes": {
                    "name": "{{% getvar v="product.projects_container.name" %}}",
                    "imports": [],
                    "created_at": "2021-01-17T12:41:10.258000+00:00",
                    "operational_status": "up",
                    "id": {{% getvar v="product.projects_container.id" %}},
                    "admin_status": "up",
                    "data_lifecycle_layers_order": [],
                    "data_policy_layers_order": [],
                    "properties": []
                },
                "type": "container",
                "id": {{% getvar v="product.projects_container.id" %}}
            }
        ]
    }
    ```

<!-- ---------------------------------------- -->
### Using the Simple-Object Web API {#list-containers-s3-web-api}

You can list the data containers of your tenant by using the <api>{{< xref f="data-layer/reference/web-apis/simple-object-web-api/container-operations.md" a="GET_Service" text="GET Service" >}}</api> operation of the {{< product lc >}}'s Simple-Object Web API, which resembles the Amazon Web Services S3 API.

For example, to send the request from Postman, do the following:

1.  Create a new request and set the request method to `GET`.

2.  In the request URL field, enter the URL of your tenant's web-APIs service (`{{< verkey k="webapi.service_display_name" >}}`).

    For example:
    ```
    {{% verkey k="webapi.url_example" %}}
    ```

3.  {{< postman-request-auth >}}

4.  Select <gui-label>Send</gui-label> to send the request, and then check the response <gui-title>Body</gui-title> tab.
    Following is an example response body (in XML format) for a tenant that has only the two predefined containers ("{{< getvar v="product.bigdata_container.name" >}}" and "{{< getvar v="product.users_container.name" >}}"):
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <ListAllMyBucketsResult>
        <Owner>
            <ID>000000000000000000000000000000</ID>
            <DisplayName>{{% getvar v="product.running_user.example" %}}</DisplayName>
        </Owner>
        <Buckets>
            <Bucket>
                <Name>{{% getvar v="product.bigdata_container.name" %}}</Name>
                <CreationDate>2021-01-17T12:41:10.258000+00:00</CreationDate>
                <Id>{{% getvar v="product.bigdata_container.id" %}}</Id>
            </Bucket>
            <Bucket>
                <Name>{{% getvar v="product.users_container.name" %}}</Name>
                <CreationDate>2021-01-17T12:41:10.959000+00:00</CreationDate>
                <Id>{{% getvar v="product.users_container.id" %}}</Id>
            </Bucket>
            <Bucket>
                <Name>{{% getvar v="product.projects_container.name" %}}</Name>
                <CreationDate>2021-01-17T12:41:10.258000+00:00</CreationDate>
                <Id>{{% getvar v="product.projects_container.id" %}}</Id>
            </Bucket>
        </Buckets>
    </ListAllMyBucketsResult>
    ```
    {{< comment >}}<!-- [ci-cosmetics-code-formatting] See the InfraInfo in
      #browse-container-s3-web-api. -->
    {{< /comment >}}

<!-- //////////////////////////////////////// -->
## Creating and Deleting Containers {#create-delete-containers}

You can create a new data container or delete an existing container from the [{{< productUI lc >}}](#create-delete-containers-ui) or by using the RESTful [Container Management API](#create-delete-containers-mgmt-api).

{{< warning id="delete-container-warning" >}}
{{< text-delete-container-warning >}}
{{< /warning >}}

<!-- ---------------------------------------- -->
### Using the {{< productUI tc >}} {#create-delete-containers-ui}

Follow these steps to create a new container from the {{< productUI lc >}}:

1.  Navigate to the <gui-title>Data</gui-title> page and select the <gui-label>New Container</gui-label> button:
    {{< igz-figure img="dashboard_data_new_container_select.png" alt="Dashboard - new-container select" >}}

2.  In the new-container window, enter a name and description for your new container.
    The following image demonstrates how to create a new container named "mycontainer":
    {{< igz-figure img="dashboard_data_create_container_mycontainer.png" alt="Dashboard - create a new mycontainer container" >}}

After you create a container, you can see it in [the containers table](#list-containers-ui) on the <gui-title>Data</gui-title> page.
For example, the following image shows a table with the predefined "{{< getvar v="product.bigdata_container.name" >}}" container and a "mycontainer" container:

{{< igz-figure img="dashboard_data_w_bigdata_container_n_mycontainer.png" alt="Dashboard - list containers with new container" >}}

To delete containers from the {{< productUI lc >}}, navigate to the <gui-title>Data</gui-title> page.
In the containers table, check the check boxes next to the containers that you want to delete and then select the delete icon (<span class="igz-icon-ui-delete"></span>) from the action toolbar and verify the delete operation when prompted.
The following image demonstrates how to delete a "mycontainer" container:
{{< igz-figure img="dashboard_data_delete_container.png" alt="Dashboard - select container for deletion" >}}
{{< comment >}}<!-- [IntInfo] (sharon) [c-ui-delete-options] You can also
  delete a single container by clicking the vertical dotted "action-bar" icon
  for the container's table row and selecting the delete option (icon + text),
  but I decided not to mention it in order to keep things simple, especially
  because this method can't be used to delete multiple table-row entries; (even
  if  multiple entries are selected, only the row for which the action was
  selected is deleted). -->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Using the Container Management API {#create-delete-containers-mgmt-api}

You can create and delete a container by using the <api>{{< xref f="cluster-mgmt/reference/management-apis/containers-api/create-container.md" text="Create Container" >}}</api> and <api>{{< xref f="cluster-mgmt/reference/management-apis/containers-api/delete-container.md" text="Delete Container" >}}</api> operations of the {{< product lc >}}'s RESTful Containers Management API {{< beta mark="1" >}}, respectively.
{{< comment >}}<!-- [BETA-MANAGEMENT-APIS] -->
{{< /comment >}}

For example, to send the requests from Postman, do the following:

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
#### Send a Create Container Request {#mgmt-api-create-container}

1.  Create a new request and set the request method to `POST`.

2.  In the request URL field, enter the following; replace `<management-APIs URL>` with the HTTPS URL of the {{< productUI short_lc >}}:
    ```
    <management-APIs URL>/api/containers/
    ```

    For example:
    ```
    {{% verkey k="mgmt_apis.url_example" %}}/api/containers/
    ```

3.  In the <gui-title>Headers</gui-title> tab, add the following headers:

    <table>
    <tr>
      <th style="width:15%;">Key</th>
      <th>Value</th>
    </tr>
    <tr>
      <td><api>Content-Type</api></td>
      {{< td >}}`application/json`
      {{< /td >}}
    </tr>
    <tr>
      <td><api>Cookie</api>
      {{< td >}}`session=<cookie>`; replace `<cookie>` with a session cookie returned in the <api>Set-Cookie</api> response header of a previous <api>Create Session</api> request.
      {{< /td >}}
    </tr>
    </table>

4.  In the <gui-title>Body</gui-title> tab, select the <gui-label>raw</gui-label> format and add the following JSON code; you can change the name and descriptions in the example, subject to the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="container-names" text="container naming restrictions" >}}:
    ```json
    {
        "data": {
            "attributes":
            {
                "name":         "mycontainer",
                "description":  "Test container"
            },
            "type": "container"
        }
    }
    ```

5.  Select <gui-label>Send</gui-label> to send the request, and then check the response <gui-title>Body</gui-title> tab.
    For a successful request, the ID of the new container is returned in the response-data <jsonkey>id</jsonkey> element.
    Copy this ID, as it's required by some of the other management operations, such as <api>Delete Container</api>.
    Following is an example <api>Create Container</api> response body for a new container with ID 1030:

    ```json
    {
        "included": [],
        "meta": {
            "ctx": "13053711680930917876"
        },
        "data": {
            "relationships": {
                "mappings": {
                    "data": [
                        {
                            "type": "container_map",
                            "id": "2244cd09-5e7e-4957-a38b-c99d97c946a2"
                        }
                    ]
                },
                "created_by": {
                    "data": {
                        "type": "user",
                        "id": "6e040a9a-9403-44bd-8f90-a61e079c6c45"
                    }
                },
                "storage_class": {
                    "data": {
                        "type": "storage_class",
                        "id": "f8bec94d-9151-475d-98f6-962827ca49ad"
                    }
                },
                "owner": {
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
                },
                "active_mapping": {
                    "data": {
                        "type": "container_map",
                        "id": "2244cd09-5e7e-4957-a38b-c99d97c946a2"
                    }
                }
            },
            "attributes": {
                "description": "Test container",
                "imports": [],
                "created_at": "2021-01-18T10:05:54.400000+00:00",
                "operational_status": "up",
                "id": 1030,
                "admin_status": "up",
                "data_lifecycle_layers_order": [],
                "data_policy_layers_order": [],
                "properties": [],
                "name": "mycontainer"
            },
            "type": "container",
            "id": 1030
        }
    }
    ```

If you [list](#list-containers) your tenant's containers, you can now see your container in the list, and you can browse and modify its contents in the same way as for the predefined containers.
For example, you can see and browse your container from the {{< productUI lc >}}'s <gui-title>Data</gui-title> page.

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
#### Send a Delete Container Request {#mgmt-api-delete-container}

1.  Create a new request and set the request method to `DELETE`.

2.  In the request URL field, enter the following; replace `<management-APIs URL>` with the HTTPS URL of the {{< productUI short_lc >}} and `<container ID>` with the ID of the new container that you created in the [previous step](#mgmt-api-delete-container) :
    ```
    <management-APIs URL>/api/containers/<container ID>
    ```

    For example, the following URL uses the container ID from the example in the previous step &mdash; `1030`:
    ```
    {{% verkey k="mgmt_apis.url_example" %}}/api/containers/1030
    ```

3.  In the <gui-title>Headers</gui-title> tab, add a <api>Cookie</api> header (<gui-label>Key</gui-label>) and set its value to `session=<cookie>`; replace `<cookie>` with a session cookie returned in the <api>Set-Cookie</api> response header of a previous <api>Create Session</api> request.

4.  Select <gui-label>Send</gui-label> to send the request, and then check the response.
    For a successful request, the response-data <jsonkey>type</jsonkey> is `container_deletion` and the <jsonkey>container&#95;id</jsonkey> attribute shows the ID of the deleted container.
    Following is an example <api>Delete Container</api> response body for a container with ID 1030:
    {{< comment >}}<!-- [ci-cosmetics-underscore_md-fmt-issues] See the
      InfraInfo in the #postman section at
      cluster-mgmt/reference/management-apis/sessions-api/create-session/. -->
    {{< /comment >}}

    ```json
    {
        "included": [],
        "meta": {
            "ctx": "11505092891179116359"
        },
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

You can also confirm the container deletion from the {{< productUI lc >}}:
in the side navigation menu, select <gui-label>Data</gui-label>.
The deleted container should no longer appear in the containers table on the <gui-title>Data</gui-title> page.

<!-- //////////////////////////////////////// -->
## Creating and Deleting Container Directories {#create-delete-container-dirs}

You can create and delete container directories from the [{{< productUI lc >}}](#create-delete-container-dirs-ui) or by using the [file-system interface](#create-delete-container-dirs-fs).
You can use the same procedure to create a directory (folder) either as a direct child of the parent container or as a nested child of another directory.

Note that the {{< productUI lc >}} allows you to delete only empty directories.
Therefore, to delete a directory with content, it's typically better to use the file-system interface to run a delete recursive command.

{{< note id="table-n-stream-dir-notes" title="Table and Stream Directories" >}}
NoSQL tables and streams that you create in the {{< product lc >}} are stored in container directories; for more information, see {{< xref f="data-layer/nosql/" >}} and {{< xref f="data-layer/stream/" >}}.
Note:

- <a id="table-n-stream-path-dirs-auto-create-note"></a>When you create a new table or stream, all directories within the target container in the specified path are created automatically if they don't already exist.

- <a id="delete-tables-n-streams-note"></a>To delete a table or stream, simply  delete the respective directory, as outlined in this tutorial.
{{< /note >}}

{{< warning id="delete-container-warning" >}}
Take extra care when performing a recursive delete operation, to avoid losing valuable data.
{{< /warning >}}

<!-- ---------------------------------------- -->
### Using the {{< productUI tc >}} {#create-delete-container-dirs-ui}

Follow these steps to create a new container directory from the {{< productUI lc >}}:

1.  Navigate to the <gui-title>Data</gui-title> page and select a container from the containers table.

2.  In the <gui-title>Browse</gui-title> tab (selected by default), select the new-folder icon (<span class="igz-icon-ui-new-directory"></span>) from the action toolbar and then enter the name of the new directory (folder) when prompted.
    {{< igz-figure img="dashboard_data_container_new_dir.png" alt="Dashboard - creat a new container directory" >}}

To delete a container directory from the {{< productUI lc >}}, you must first delete all files and subdirectories in the directory.
You cannot delete a directory with content from the {{< productUI lc >}}.
To delete an empty container directory, select the directory from the browse table in the <gui-title>Browse</gui-title> container data tab.
Check all items in the directory and then select the delete icon (<span class="igz-icon-ui-delete"></span>) from the action toolbar and confirm the delete operation when prompted.
After you delete all items in the directory, return to the browse table and repeat the procedure for any non-empty directory that you want to delete.
When you're done, check the check boxes next to the directories that you want to delete in the container browse table, select the delete icon from the action toolbar, and confirm the delete operation.
The following image demonstrates how to delete an empty container directory:
{{< igz-figure img="dashboard_data_container_delete_dir.png" alt="Dashboard - delete empy container directory" >}}
{{< comment >}}<!-- See [c-ui-delete-options] in #create-delete-containers-ui.
-->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Using the File-System Interface {#create-delete-container-dirs-fs}

You can create and delete (remove) directories by running a [<cmd>mkdir</cmd>], [<cmd>rm -r</cmd>], or [<cmd>rmdir</cmd>] file-system command, respectively, from a command-line shell.
{{< comment >}}<!-- [c-hadoop-fs-cmd-links] [IntInfo] (sharonl) (17.3.19) I
  decided not to link to the Hadoop FS commands doc because the doc also
  applies to the local FS, for which we should have linked to the Unix doc.
  This is the Hadoop FS command link for this section:
-->
  [<cmd>mkdir</cmd>]({{< getvar v="hadoop.fs_shell_guide.full" >}}#mkdir)
  [<cmd>rm -r</cmd>]({{< getvar v="hadoop.fs_shell_guide.full" >}}#rm)
  [<cmd>rmdir</cmd>]({{< getvar v="hadoop.fs_shell_guide.full" >}}}#rmdir)
{{< /comment >}}

For example:

- The following commands create a <dirname>{{< verkey k="doc_samples.ingest_dir" >}}</dirname> directory in the predefined "{{< getvar v="product.bigdata_container.name" >}}" container and a directory by the same name in the running-user directory of the "{{< getvar v="product.users_container.name" >}}" container:

    Local file-system &mdash;
    ```sh
    mkdir -p {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.bigdata_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    mkdir -p {{% getvar v="product.users_container.user_dir.fs_mount_path" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    ```

    Hadoop FS &mdash;
    ```sh
    hadoop fs -mkdir v3io://{{% getvar v="product.bigdata_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    hadoop fs -mkdir ${{% getvar v="product.users_container.user_dir.dir_url_envar" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    ```

- The following commands remove (delete) the container directories created in the previous examples:

    Local file-system &mdash;
    ```sh
    rm -r {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.bigdata_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    rm -r {{% getvar v="product.users_container.user_dir.fs_mount_path" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    ```

    Hadoop FS &mdash;
    ```sh
    hadoop fs -rm -r v3io://{{% getvar v="product.bigdata_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    hadoop fs -rm -r ${{% getvar v="product.users_container.user_dir.dir_url_envar" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    ```

{{< note id="create-delete-container-dirs-fs-notes" >}}
You can replace `{{< getvar v="product.users_container.user_dir.fs_mount_path" >}}` in the local-file system examples with `{{< getvar v="product.users_container.user_dir.dir_path_w_envar" >}}`, `{{< verkey k="fs_k8s.data_mount.path" >}}/{{< getvar v="product.users_container.name" >}}/${{< getvar v="product.running_user.envar" >}}`, or <code>{{< getvar v="product.users_container.user_dir.dir_path" >}}</code> (for example, `{{< verkey k="fs_k8s.data_mount.path" >}}/{{< getvar v="product.users_container.name" >}}/{{< getvar v="product.running_user.example" >}}` for running-user "{{< getvar v="product.running_user.example" >}}").
<br/>
You can replace `${{< getvar v="product.users_container.user_dir.dir_url_envar" >}}` in the Hadoop FS examples with `{{< getvar v="product.users_container.user_dir.dir_url_w_envar" >}}`, `v3io://{{< getvar v="product.users_container.name" >}}/${{< getvar v="product.running_user.envar" >}}`, or <code>v3io://{{< getvar v="product.users_container.name" >}}/{{< getvar v="product.running_user.envar_value" >}}</code> (for example, `v3io://{{< getvar v="product.users_container.name" >}}/{{< getvar v="product.running_user.example" >}}` for running-user "{{< getvar v="product.running_user.example" >}}").
<br/>
See {{< xref f="data-layer/apis/data-paths.md" a="data-paths-fs" text="File-System Data Paths" >}}.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Browsing a Container {#browse-container}

You can browse the contents of a container and its directories from the [{{< productUI lc >}}](#browse-container-ui), by using the [file-system interface](#browse-container-fs), or by using the [Simple-Object Web API](#browse-container-s3-web-api).

<!-- ---------------------------------------- -->
### Using the {{< productUI tc >}} {#browse-container-ui}

To browse the contents of a container from the {{< productUI lc >}}, navigate to the <gui-title>Data</gui-title> page and select a container from the containers table.
The <gui-title>Browse</gui-title> tab is selected by default and displays the contents of the container.
    See, for example, the [containers-table image](#img-dashboard_data_w_bigdata_container_n_mycontainer) in the [new-container creation](#create-delete-containers-ui) instructions.

To view a directory's metadata, select the directory (folder) in the container's browse table by single-clicking the directory name or checking the adjacent check box.
You can then also perform directory actions (such as delete) by selecting the relevant icon from the action toolbar.
The following image demonstrates a selected <dirname>{{< verkey k="doc_samples.ingest_dir" >}}</dirname> directory in the predefined "{{< getvar v="product.bigdata_container.name" >}}" container:
{{< igz-figure img="dashboard_data_container_dir_select_in_table.png" alt="Dashboard - select a directory in the containers table" >}}

To view a directory's contents, double-click the directory in the browse table or select the directory from the container's navigation tree, as demonstrated in the following image:
{{< igz-figure img="dashboard_data_container_dir_selected_in_nav_tree_no_content.png" alt="Dashboard - select a directory from the container navigtation tree" >}}

<!-- ---------------------------------------- -->
### Using the File-System Interface {#browse-container-fs}

You can run a file-system list-directory command (<cmd>ls</cmd>) to browse the contents of a container or specific container directory from a command-line shell.
{{< comment >}}<!-- [c-hadoop-fs-cmd-links] -->
  [<cmd>ls</cmd>]({{< getvar v="hadoop.fs_shell_guide.full" >}}#ls)
{{< /comment >}}

For example:

- List the contents of the root directory of the predefined "{{< getvar v="product.bigdata_container.name" >}}" container:

    Local file-system &mdash;
    ```sh
    ls -lF {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.bigdata_container.name" %}}/
    ```

    Hadoop FS &mdash;
    ```sh
    hadoop fs -ls v3io://{{% getvar v="product.bigdata_container.name" %}}/
    ```

- List the contents of a <dirname>{{< getvar v="product.users_container.name" >}}/{{< getvar v="product.running_user.example" >}}/{{< verkey k="doc_samples.ingest_dir" >}}</dirname> container directory where "{{< getvar v="product.running_user.example" >}}" is the running user of the command-line shell service (`${{< getvar v="product.running_user.envar" >}}`).
    All of the following syntax variations execute the same copy command:

    Local file-system &mdash;
    ```sh
    ls -lFA {{% getvar v="product.users_container.user_dir.fs_mount_path" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    ls -lFA {{% verkey k="fs_k8s.data_mount.path" %}}/${{% getvar v="product.users_container.user_dir.dir_envar" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    ls -lFA {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.users_container.name" %}}/${{% getvar v="product.running_user.envar" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    ls -lFA {{% verkey k="fs_k8s.data_mount.path" %}}/{{% getvar v="product.users_container.name" %}}/{{% getvar v="product.running_user.example" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/
    ```

    Hadoop FS &mdash;
    ```sh
    hadoop fs -ls ${{% getvar v="product.users_container.user_dir.dir_url_envar" %}}/{{% verkey k="doc_samples.ingest_dir" %}}
    hadoop fs -ls v3io://${{% getvar v="product.users_container.user_dir.dir_envar" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/
    hadoop fs -ls v3io://{{% getvar v="product.users_container.name" %}}/${{% getvar v="product.running_user.envar" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/
    hadoop fs -ls v3io://{{% getvar v="product.users_container.name" %}}/{{% getvar v="product.running_user.example" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/
    ```

<!-- ---------------------------------------- -->
### Using the Simple-Object Web API {#browse-container-s3-web-api}

You can list the objects in a container by using the <api>{{< xref f="data-layer/reference/web-apis/simple-object-web-api/container-operations.md" a="GET_Container" text="GET Container" >}}</api> operation of the {{< product lc >}}'s Simple-Object Web API, which resembles the Amazon Web Services S3 API.

For example, to send the request from Postman, do the following:

1.  Create a new request and set the request method to `GET`.

2.  <a id="ingest-files-s3-step-set-url"></a>In the request URL field, enter the following; replace `<web-APIs URL>` with the URL of the parent tenant's web-APIs service (`{{< verkey k="webapi.service_display_name" >}}`), and replace `<container name>` with the name of the container that you want to browse:
    ```
    <web-APIs URL>/<container name>
    ```

    For example, the following URL sends a request to web-API service URL `{{< verkey k="webapi.url_example" >}}` to browse the "{{< getvar v="product.bigdata_container.name" >}}" container:
    ```
    {{% verkey k="webapi.url_example" %}}/{{% getvar v="product.bigdata_container.name" %}}
    ```

3.  {{< postman-request-auth >}}

5.  Select <gui-label>Send</gui-label> to send the request, and then check the response <gui-title>Body</gui-title> tab.
    Following is an example response body (in XML format):

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <ListBucketResult>
        <Name>{{% getvar v="product.bigdata_container.name" %}}</Name>
        <Prefix/>
        <Marker/>
        <Delimiter>/</Delimiter>
        <NextMarker>tmp</NextMarker>
        <MaxKeys>1000</MaxKeys>
        <IsTruncated>false</IsTruncated>
        <CommonPrefixes>
            <Prefix>mydata/</Prefix>
        </CommonPrefixes>
        <CommonPrefixes>
            <Prefix>naipi_files/</Prefix>
        </CommonPrefixes>
        <CommonPrefixes>
            <Prefix>tmp/</Prefix>
        </CommonPrefixes>
    </ListBucketResult>
    ```
    {{< comment >}}<!-- [ci-cosmetics-code-formatting] [InfraInfo] Using the
      "highlight" shortcode here instead of the Markdown fenced-code syntax
      distorts my Gvim Markdown syntax highlighting. For consistency, I also
      used the fenced-code formatting in the #list-containers-s3-web-api
      section, even though there was no similar distortion there. The output
      seems to be similar for either method.
      I needed to use the "highlight" shortcode mainly when not applying any
      syntax (`highlight none`), otherwise the code snippet seems highlighted
      in bold (a known issue in our site); also, in some cases the use of the
      shortcode resolves indentation and alignment issues that occur with the
      fenced-code syntax. -->
    {{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/containers/" >}}
- {{< xref f="data-layer/apis/" >}}
- {{< xref f="data-layer/data-ingestion-and-preparation.md" >}}
- {{< xref f="data-layer/objects/ingest-n-consume-files.md" >}}


