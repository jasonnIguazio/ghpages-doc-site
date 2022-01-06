---
title: "Ingesting and Consuming Files"
description: "Get introduced to different methods for ingesting and consuming files,in the Iguazio MLOps Platform."
keywords: "data ingestion, data consumption, files, objects, ingest file, injest object, put object, copy file, upload file, consume file, consume object, get file, get object, getting started, quick-start, dashboard, UI, simple-object web api, S3, PUT Object, GET Object, web apis, postman, curl, zeppelin"
menu:
  main:
    parent:     "data-objects"
    identifier: "data-ingestion-n-consumption-qs"
    weight:     40
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  tutorials/getting-started/ingest-n-consume-files.md. -->
{{< /comment >}}<!-- JillG-9-9-21 Zeppelin removed from SW, no plan to return it. The #convert-csv-to-nosql section in this file now points to https://github.com/v3io/tutorials/blob/3.x/data-ingestion-and-preparation/basic-data-ingestion-and-preparation.ipynb
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) (17.2.21) Until today, the
  #convert-csv-to-nosql section in this file was referenced from the
  basic-data-ingestion-and-preparation.ipynb v3io/tutorials notebook. I removed
  this reference in PR #342 (https://github.com/v3io/tutorials/pull/342), post
  the v3.0.0 publication. The old section URL will be redirected to an active
  ghpages-doc-site page. -->
{{< /comment >}}
{{< comment >}}
<!-- [c-projects-default-container] [V3.0.0-TODO-P2] [IntInfo] (sharonl)
  (16.1.21) TODO: Replace "bigdata" container uses in this tutorial (see the
  uses of the `bigdata_container` product data variable) either with
  `default_container`, as was previously the case - only that starting from
  v3.0.0 this references the "projects" container instead of the "bigdata"
  container" - (see info in data/vars/product.toml) - or with `users_container`
  for the "users" container.
  Note that this also requires editing UI screen shots + it should be synced
  with the changes in the working with containers tutorial.
  [c-projects-default-container-zeppelin-gs-example] Note that the Zeppelin
  getting-started example notebook, which is the basis for the current
  #convert-csv-to-nosql section (although we want to change this), currently
  still uses the "bigdata" container (see info in data/vars/product.toml).
  [c-bigdata-container-rm] Note that the intention is to stop predefining a
  "bigdata" container (see info in data/vars/product.toml).
-->
<!-- [TODO-QS-PYTHON-REST-EXAMPLES]: Add Python code examples for web-API and
  management-API requests and refer to the option of running them from Jupyter
  Notebook or Zeppelin instead of Postman. -->
<!-- TODO: Add NoSQL Web API ingestion and consumption examples (create,
  update, and query NoSQL tables); consider whether to this in a separate doc.
  Perhaps add ingest and consume Spark DF and Presto (consume only) examples
  and restructure the doc to include CSV > NoSQL example in the Spark DF
  section, or maybe edit the Spark DF ingestion doc to include a larger example
  and the CSV > NoSQL conversion example. Also, the "ingestion" reference in
  the data-layer/spark-data-ingestion-qs.md tutorial title - "Getting Started
  with Data Ingestion Using Spark" - isn't accurate because the tutorial also
  demonstrates reads (consumption), although the initial purpose was to show
  how to read uploaded data for the purpose of writing (ingesting) it in the
  desired, different, format.
  If we add NoSQL tables to this tutorial, the title should change (and then it
  won't exactly match the file name used in the URL ... ); the original plan
  was to create a separate tutorial for NoSQL tables.

  UPDATE: (13.7.20) We now have a separate ingestion getting-started tutorial -
  data-ingestion-and-preparation.md (based on v3io/tutorials
  data-ingestion-and-preparation/README.md)and there's also a
  data-ingestion-and-preparation/basic-data-ingestion-and-preparation.ipynb
  tutorial (with the CSV > NoSQL conversion example) that we want to integrate
  into the web site, but these tutorials don't include the UI and the
  Simple Object Web API and Postman usage examples in the current tutorial.
  See the comment in #convert-csv-to-nosql section regarding removing/editing
  this section and then editing/splitting/retitling the tutorial and updating
  the references to it [c-convert-csv-to-nosql-example]. If the file remains,
  remember to also update the Post front-matter field. -->
<!-- [TODO-JUPYTER]
- Edit the doc to use the Jupyter getting-started notebook example instead of
  the Zeppelin example (and only mention the Zeppelin alternative - opposite to
  what we currently do).
- See the [TODO-JUPYTER] comment in the getting-started/containers.md tutorial.
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This tutorial demonstrates how to ingest (write) a new file object to a data container in the {{< product lc >}}, and consume (read) an ingested file, either from the [{{< productUI lc >}}](#ingest-consume-files-ui) or by using the [Simple-Object Web API](#ingest-consume-files-s3).
The tutorial also demonstrates how to [convert a CSV file to a NoSQL table](#convert-csv-to-nosql) by using the {{< getvar v="spark.sql_home.text_w_df" >}} API.

The examples are for CSV and PNG files that are copied to example directories in the {{< product lc >}}'s predefined data containers.
You can use the same methods to process other types of files, and you can also modify the file and container names and the data paths that are used in the tutorial examples, but it's up to you to ensure the existence of the elements that you reference.

<!-- //////////////////////////////////////// -->
## Before You Begin {#before-you-begin}

- Follow the {{< xref f="data-layer/containers/working-with-containers.md" >}} tutorial to learn how to create and delete container directories and access container data.

- Note that to send web-API requests, as demonstrated in this tutorial, you need to have the URL of the parent tenant's {{< verkey k="webapi.service_display_name" >}} service, and either a {{< product lc >}} username and password or an access key for authentication.
    To learn more and to understand how to structure and secure the web-API requests, see the {{< xref f="data-layer/reference/web-apis/" text="web-APIs reference" >}}, and especially {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}} and {{< xref f="data-layer/reference/web-apis/security.md" >}}.
    (The tutorial Postman examples use the username-password authentication method, but if you prefer, you can replace this with access-key authentication, as explained in the documentation.)
    To understand how data paths are set in web-API requests, see {{< xref f="data-layer/apis/data-paths.md" a="data-paths-rest-apis" text="RESTful Web and Management API Data Paths" >}}.

<!-- //////////////////////////////////////// -->
## Using the {{< productUI tc >}} to Ingest and Consume Files {#ingest-consume-files-ui}

You can easily [ingest](#ingest-files-dashboard) and [consume](#consume-files-dashboard) files from the {{< productUI lc >}}.

<!-- ---------------------------------------- -->
### Ingesting Files Using the {{< productUI tc >}} {#ingest-files-dashboard}

Follow these steps to ingest (upload) files to the {{< product lc >}} from the {{< productUI lc >}}:

1.  On the <gui-title>Data</gui-title> page, select a container (for example, "{{< getvar v="product.bigdata_container.name" >}}") to display the container <gui-title>Browse</gui-title> data tab (default), which allows you to browse the contents of the container.
    To upload a file to a specific container directory, navigate to this directory as explained in the {{< xref f="data-layer/containers/working-with-containers.md" a="browse-container" >}} tutorial.

2.  Use either of the following methods to upload a file to the container:

    - Simply drag and drop a file into the main-window area (which displays the container or directory contents), as demonstrated in the following image:
        {{< igz-figure id="img-dashboard_data_container_dir_upload_file_drag_n_drop" src="/images/dashboard_data_container_dir_upload_file_drag_n_drop.png" alt="Dashboard - drag-and-drop a file to a container directory" >}}

    - Select the "upload" icon (<span class="igz-icon-ui-upload"></span>) from the action toolbar and then, when prompted, browse to the location of the file in your local file system.

    For example, you can [download]({{< verkey k="doc_samples.dnload_dir" >}}/{{< verkey k="zeppelin.predef_notes.getting_started.sample_csv" >}}) the example <file>{{< verkey k="zeppelin.predef_notes.getting_started.sample_csv" >}}</file> file and upload it to a <dirname>{{< verkey k="doc_samples.ingest_dir" >}}</dirname> directory in the "{{< getvar v="product.bigdata_container.name" >}}" container.
      Creating the directory is as simple as selecting the new-folder icon in the {{< productUI lc >}} (<span class="igz-icon-ui-new-directory"></span>) and entering the directory name; for detailed instructions, see the {{< xref f="data-layer/containers/working-with-containers.md" a="create-delete-container-dirs" >}} tutorial.

When the upload completes, you should see your file in the {{< productUI lc >}}, as demonstrated in the following image:
{{< igz-figure id="img-dashboard_data_container_dir_w_file" src="/images/dashboard_data_container_dir_w_file.png" alt="Dashboard - container directory with an uploaded file" >}}

<!-- ---------------------------------------- -->
### Consuming Files Using the {{< productUI tc >}} {#consume-files-dashboard}

Follow these steps to retrieve (download) an uploaded file from the {{< productUI lc >}}:
on the <gui-title>Data</gui-title> page, select a container (for example, {{< getvar v="product.bigdata_container.name" >}}</gui-title>) to display the container <gui-title>Browse</gui-title> data tab (default), and then use the side navigation tree to navigate to the directory that contains the file.
Then, check the check box next to the file that you want to download, select the download icon (<span class="igz-icon-ui-download"></span>) from the action toolbar, and select the location to which to download the file.

<!-- //////////////////////////////////////// -->
## Using the Simple-Object Web API to Ingest and Consume Files {#ingest-consume-files-s3}

You can [ingest](#ingest-files-s3) and [consume](#consume-files-s3) files by sending Simple-Object Web API HTTP requests using your preferred method, such as Postman or curl.

<!-- ---------------------------------------- -->
### Ingesting Files Using the Simple-Object Web API {#ingest-files-s3}

You can use Postman, for example, to send a Simple-Object Web API <api>{{< xref f="data-layer/reference/web-apis/simple-object-web-api/data-object-operations.md" a="PUT_Object" text="PUT Object" >}}</api> request that uploads a file object to the {{< product lc >}}:

1.  <a id="ingest-files-s3-step-set-method"></a>Create a new request and set the request method to `PUT`.

2.  <a id="ingest-files-s3-step-set-url"></a>In the request URL field, enter the following; replace `<web-APIs URL>` with the URL of the parent tenant's {{< verkey k="webapi.service_display_name" >}} service, replace `<container name>` with the name of the container to which you want to upload the data, and replace `<image-file path>` with the relative path within this container to which you want to upload the file:
    ```
    <web-APIs URL>/<container name>/<image-file path>
    ```

    For example, the following URL sends a request to web-API service URL `{{< verkey k="webapi.url_example" >}}` to upload a file named <file>{{< verkey k="doc_samples.image_file" >}}</file> file to a <dirname>{{< verkey k="doc_samples.ingest_dir" >}}</dirname> directory in the "{{< getvar v="product.bigdata_container.name" >}}" " container:
    ```
    {{% verkey k="webapi.url_example" %}}/{{< getvar v="product.bigdata_container.name" >}}/{{% verkey k="doc_samples.ingest_dir" %}}/{{% verkey k="doc_samples.image_file" %}}
    ```

    Any container directories in the specified `<image-file path>` path that don't already exist will be created automatically, but the container directory must already exist. 

3.  <a id="ingest-files-s3-step-auth"></a>{{< postman-request-auth >}}

4.  <a id="ingest-files-s3-step-req-body"></a>In the <gui-title>Body</gui-title> tab &mdash;

    1.  Select the file format that matches the uploaded file.
        For an image file, select <gui-label>binary</gui-label>.

    2.  Select <gui-label>Choose Files</gui-label> and browse to the file to upload in your local file system.

5.  <a id="ingest-files-s3-step-send-request"></a>Select <gui-label>Send</gui-label> to send the request, and then check the response.

For a successful request, you should be able to see the uploaded image file from the {{< productUI lc >}}:
in the side navigation menu, select <gui-label>Data</gui-label> and then select the container to which you uploaded the file (for example, "{{< getvar v="product.bigdata_container.name" >}}").
In the container's <gui-title>Browse</gui-title> tab, navigate from the left navigation tree to the container directory in which you selected to save the file (for example, <dirname>{{< verkey k="doc_samples.ingest_dir" >}}</dirname>), and verify that the directory contains the uploaded file (for example, <file>{{< verkey k="doc_samples.image_file" >}}</file>).

<!-- ---------------------------------------- -->
### Consuming Files Using the Simple-Object Web API {#consume-files-s3}

After you ingest a file, you can send a Simple-Object Web API <api>{{< xref f="data-layer/reference/web-apis/simple-object-web-api/data-object-operations.md" a="GET_Object" text="GET Object" >}}</api> request to retrieve (consume) it from the {{< product lc >}}.
For example, to retrieve the image file that you uploaded in the previous steps, define the following Postman request:

1.  <a id="consume-files-s3-step-set-method"></a>Set the request method to `GET`.

2.  <a id="consume-files-s3-step-set-url"></a>Enter the following as the request URL, replacing the `<...>` placeholders with the same data that you used in [Step #2](#ingest-files-s3-step-set-url) of the ingest example:
    ```
    <web-APIs URL>/<container name>/<image-file path>
    ```

    For example:
    ```
    {{% verkey k="webapi.url_example" %}}/{{% getvar v="product.bigdata_container.name" %}}/{{% verkey k="doc_samples.ingest_dir" %}}/{{% verkey k="doc_samples.image_file" %}}
    ```

3.  <a id="consume-files-s3-step-auth"></a>{{< postman-request-auth >}}

4.  <a id="consume-files-s3-step-send-request"></a>Select <gui-label>Send</gui-label> to send the request, and then check the response <gui-title>Body</gui-title> tab.
    The response body should contain the contents of the uploaded file.

<!-- //////////////////////////////////////// -->
## Converting a CSV File to a NoSQL Table {#convert-csv-to-nosql}
{{< comment >}}<!-- 
Jill-9-9-21: Since Zeppelin is removed from v3.2, the zeppelin example was removed and there is a pointer to the basic-data-ingestion-and-preparation.ipynb tutorial instead.
  [c-convert-csv-to-nosql-example] (sharonl) (13.7.20) TODO:
  Replace this section with a reference to the similar CSV > NoSQL Spark DF
  conversion example in the basic-data-ingestion-and-preparation.ipynb tutorial
  NB / edit to match the doc and maybe move to another file (we might integrate
  the full basic-data-ingestion-and-preparation.ipynb tutorial into the doc
  site), and be sure to edit any references accordingly. Currently, there's
  only one line to this section, from the grafana-dashboards.md GS tutorial,
  and I already noted there the need for edits. Also, when referring to the
  current tutorial (ingest-n-consume-files.md) we now mention only the dashboard
  and Simple Object Web API ingestion and not the Spark DF CSV > NoSQL
  conversion (since we added the data-ingestion-and-preparation.md tutorial as
  the main ingestion GS tutorial). Note that the Overview in the current doc
  still refers to the conversion section, as long as it's still part of the
  tutorial. TODO: When this doc is removed, consider splitting this tutorial
  into separate UI and S3 web API tutorials or renaming the title.
  Note that the Post front-matter field in the current tutorial still
  references the CSV > NoSQL conversion and should be edited if the tutorial is
  kept but this section is removed. -->
{{< /comment >}}

The unified data model of the {{< product lc >}} allows you to ingest a file in one format and consume it in another format. The [**{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.name" >}}**]
({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}) {{< product lc >}} tutorial Jupyter notebook presents a Python example code for converting a CSV file to a NoSQL table.

{{< note id="csv-to-noql-service-notes" >}}
- <a id="csv-to-noql-create-service-note"></a>To run the Jupyter Notebook example, you first need to create the respective notebook service.
    See {{< xref f="services/fundamentals.md" a="create-new-service" text="Creating a New Service" >}}.
{{< /note >}}

For more information and examples of using Spark to ingest and consume data in different formats and convert data formats, see the {{< xref f="data-layer/spark-data-ingestion-qs.md" >}} tutorial.

{{< comment >}}<!-- [TODO-SITE-RESTRUCT-P2] TODO: Add see-also links. Previously
  this was a tutorial with a "What's Next?" section with this content; I edited
  the xref link targets except where there were no direct alternatives and
  removed the link to tutorials/getting-started/ in the first bullet, as
  there's no direct equivalent in the restructured site: -->
- Select a getting-started tutorial or guide that best suits your interests and requirements.
- {{< xref f="services/fundamentals.md" a="create-new-service" text="Create a Jupyter Notebook service" >}} (if you don't already have one) and read the provided introductory <file>{{< verkey k="jupyter_notebook.tutorials.welcome_nb.file" >}}</file> {{< product lc >}} tutorial notebook (available also as a Markdown <file>README.md</file> file).
    Then, proceed to review and run the code in the tutorial getting-started or demo-application examples, according to your development needs.
    A good place to start is the basic data ingestion and preparation notebook &mdash; <path>{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}</path>.
{{< comment >}}<!-- [IntInfo] (sharonl) (28.4.19) I decided not to link to the
  GitHub repo here, because at this stage the intention is that the user will
  actually run the code from the notebooks in their Jupyter Notebook service.
  I linked to the GitHub repo and more "high-level" references to the welcome
  notebook and related README file. -->
{{< /comment >}}
<!-- //////////////////////////////////////// -->
## See Also
{{< /comment >}}
