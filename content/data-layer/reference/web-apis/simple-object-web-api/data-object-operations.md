---
title: "Data-Object Operations"
keywords: "data-object operations, simple objects, S3, REST, RESTful, objects, data objects, objects, containers, DELETE Object, GET Object, HEAD Object, POST Object, PUT Object, create object, add object, object metadata"
menu:
  main:
    parent:       "simple-object-web-api"
    identifier:   "simple-object-web-api-data-object-ops"
    weight:       20
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  reference/api-reference/web-apis/simple-object-web-api/data-object-operations.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from
  data-ingestion-and-preparation/v3io-objects.ipynb). (Until then and for
  previous tutorials releases, we'll have URL redirect rules as part of the
  restructured-site publication.)
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from data-ingestion-and-preparation/v3io-objects.ipynb). -->
{{< /comment >}}

To work with data, of any format, as a simple data object, first retrieve the container objects using the <api>{{< xref f="data-layer/reference/web-apis/simple-object-web-api/container-operations.md" a="GET_Container" text="GET Container" >}}</api> operation, and then use the following S3-like RESTful API object operations:

- <a id="GET_Object"></a><def>GET Object</def> &mdash; retrieves an object from a container.
    {{< comment >}}<!-- GET Object:
      https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectGET.html?shortFooter=true
    -->
    {{< /comment >}}

- <a id="DELETE_Object"></a><def>DELETE Object</def> &mdash; deletes an object from a container.
    {{< comment >}}<!-- DELETE Object:
      https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectDELETE.html?shortFooter=true
    -->
    {{< /comment >}}

- <a id="PUT_Object"></a>
  <def>PUT Object</def> &mdash; adds a new object to a container, or appends data to an existing object.
    The option to append data is extension to the S3 PUT Object capabilities &mdash; see [Appending Data](#appending-data).
    {{< comment >}}<!-- PUT Object:
      https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html?shortFooter=true
    -->
    {{< /comment >}}

- <a id="POST_Object"></a><def>POST Object</def> &mdash; an alias of the PUT Object operation.
    {{< comment >}}<!-- POST Object:
      https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPOST.html?shortFooter=true
    -->
    {{< /comment >}}
    {{< note id="post-n-put-note" >}}
Unlike S3, POST Object acts in the same way as {{< fmt "api" >}}PUT Object{{< /fmt >}}.
    {{< /note >}}

- <a id="HEAD_Object"></a><def>HEAD Object</def> &mdash; retrieves the metadata of a data object.

{{< note id="s3-web-api-examples-note" >}}
You can find examples of Simple Object Web-API data-object operation requests in the {{< xref f="data-layer/objects/ingest-n-consume-files.md" a="ingest-consume-files-s3" >}} tutorial.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Appending Data {#appending-data}

To append data to an existing container object, use a <api>PUT Object</api> operation (see <api>[PUT Object](#PUT_Object)</api>), and include the following header in the request:

```
Range: -1
```

<!-- ---------------------------------------- -->
### Examples {#appending-data-examples}

The following example adds the string "The End" at the end of a "MyObject" object:

{{< code-tabs >}}
  {{< tab "HTTP" >}}
```http
PUT /mycontainer/MyObject HTTP/1.1
Host: {{% verkey k="webapi.url_example" %}}
Content-Type: application/octet-stream
X-v3io-session-key: {{% productUI access_key_example %}}
Range: -1
```
```
"The End"
```
  {{< /tab >}}

  {{< tab "Python" >}}
```python
import requests

url = "{{% verkey k="webapi.url_example" %}}/mycontainer/MyObject/"
headers = {
            "Content-Type": "application-octet-stream",
            "X-v3io-session-key": "{{% productUI access_key_example %}}",
            "Range": "-1"
          }
payload = "The End"

response = requests.put(url, data=payload, headers=headers)
print(response.text)

```
  {{< /tab >}}
{{< /code-tabs >}}

