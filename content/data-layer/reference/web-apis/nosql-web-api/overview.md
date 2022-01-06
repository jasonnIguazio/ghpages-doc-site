---
title:      "Overview of the NoSQL Web API"
linktitle:  "NoSQL Web API Overview"
description:  "Overview of the Iguazio MLOps Platform NoSQL API (a.k.a key-value/KV API)"
keywords: "nosql web api, nosql databases, nosql dbs, nosql tables, tables, table items, attributes, table scan, items scan, GetItem, GetItems, PutItem, UpdateItem, data-service web apis, primary key, item names, names, __name, http requests, json, json parameters"
menu:
  main:
    name:         "Overview"
    parent:       "nosql-web-api"
    identifier:   "nosql-web-api-overview"
    weight:       5
---

<!-- //////////////////////////////////////// -->
## Introduction {#introduction}

The {{< product lc >}}'s NoSQL Web API provides access to the NoSQL database service, which enables storing and consuming data in a tabular format.
For more information, see {{< xref f="data-layer/nosql/" >}}.
The {{< product lc >}}'s unified data model enables you to use the NoSQL Web API to fetch and update any object in the system.

-   To add an item to a table or replace an existing item, use <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/putitem.md" >}}</api>.

    To create a table, just begin adding items.
    The table will be created automatically with the first item that you add.
    See {{< xref f="data-layer/nosql/" a="creating-tables" >}}.

-   To update an existing item in a table, use <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" >}}</api>.
    .
-   To retrieve attributes of a table item, use <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/getitem.md" >}}</api>.

-   To retrieve attributes of multiple items in a table or in a data container's root directory, use <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/getitems.md" >}}</api>.

    <api>GetItems</api> supports scan optimizations either by performing range scans that use the items' sharding and sorting keys to locate items more quickly, or by dividing the table-scan operation into multiple segments that can be assigned to different workers for implementing a parallel scan.
    See {{< xref f="data-layer/reference/web-apis/nosql-web-api/getitems.md" a="scan-optimization" text="Scan Optimization" >}} in the <api>GetItems</api> documentation.

-   To delete a table, either delete (remove) the table directory by using a file-system command, or use the <func>{{< xref f="data-layer/reference/frames/nosql/delete.md" text="delete" >}}</func> client method of the {{< getvar v="product.frames.name.long_lc" >}} NoSQL backend.
    See {{< xref f="data-layer/nosql/" a="deleting-tables" >}}.

In the NoSQL Web API, an {{< xref f="data-layer/objects/attributes.md" text="attribute" >}} is represented by an <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" >}}</api> JSON object.
This is true for all {{< xref f="data-layer/objects/attributes.md" a="attribute-types" text="attribute types" >}}.

The NoSQL Web API is part of the data-service web APIs and conforms to the related structure and syntax rules &mdash; see {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}}.

{{< note id="max-json-body-size" >}}
The maximum JSON body size for the NoSQL web-API requests is {{< verkey k="web_api_json_body_max_size" >}}.
{{< comment >}}<!-- [IntInfo] (sharonl) See the
  "#nosql-web-api-max-json-body-size" info in the sw-specific.md intro page.
-->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Item Name and Primary Key {#nosql-item-name-n-primary-key}

A table item is a data object, and as such needs to be assigned a unique primary-key value, which serves as the item's name and is stored by the {{< product lc >}} in the <attr>\_\_name</attr> system attribute &mdash; see {{< xref f="data-layer/objects/object-names-and-keys/" >}}.
When adding a new item by using the <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/putitem.md" text="PutItem" >}}</api> or <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" text="UpdateItem" >}}</api> operation, you can provide the item's primary-key value (name) either in the request URL or as the name of the request's <paramname>Key</paramname> attribute JSON request parameter (see {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" a="web-api-data-service-resource-path" text="Setting the Resource Path" >}}).
If you select to use the <paramname>Key</paramname> JSON parameter, the {{< product lc >}} defines a primary-key user attribute with the specified name and value, in addition to the <attr>\_\_name</attr> system attribute that is always defined for a new item; (see {{< xref f="data-layer/objects/attributes.md" a="attribute-types" text="Attribute Types" >}} for information about user and system attributes).
{{< comment >}}<!-- [InfraInfo] [sharonl] Using `<attr>__name></attr>` for the
  first instance seemed to work well, but then the second instance of this code
  caused the text that follows to be formatted in bold until before "name
  system attribute,", and replacing the shortcode call with
  `<attr>\_\_name</attr>` caused the same text to be formatted in italic.
  Initially, I resolved this by replacing the second instance with the use of
  the `fmt` shortcode - `{{< fmt "api" >}}\_\_name{{< /fmt >}}` - but then I
  found that using `<attr>\_\_name</attr>` in both instances (i.e., escaping the
  underscores) works well to eliminate the unintended formatting.. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Table Schema {#table-schema}

The NoSQL Web API doesn't enforce a specific table schema: i.e., the items don't all need to contain the same attributes and items can have different data types for the same attribute.
However, be advised that if the table items don't follow a consistent attributes schema you might fail to read data from the table using a structured-data interface such as {{< xref f="data-layer/reference/spark-apis/spark-datasets/" text="Spark Datasets" >}}, {{< xref f="data-layer/presto/" text="Presto" >}}, and {{< getvar v="product.frames.name.long_lc" >}}.
{{< comment >}}<!-- [TODO-FRAMES] (sharonl) The Frames reference should link to
  the Frames API reference when added (see DOC IG-12272). [InfraInfo] Set the
  xref "textvar" shortcode parameter to "product.frames.name.long_lc" instead of
  setting "text". -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}}
- {{< xref f="data-layer/reference/web-apis/security.md" >}}
- {{< xref f="data-layer/nosql/" >}}
- {{< xref f="data-layer/objects/attributes.md" >}}
- {{< xref f="data-layer/objects/" >}}
    - {{< xref f="data-layer/objects/object-names-and-keys/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="nosql-web-api" text="NoSQL Web API software specifications and restrictions" >}}

