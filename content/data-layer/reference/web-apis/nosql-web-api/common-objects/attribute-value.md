---
title:  "Attribute Value"
keywords: "Attribute Value, attribute-value object, attribute values, attributes, attribute data types, data types, nosql, json, json objects"
menu:
  main:
    parent:       "nosql-web-api-common-objects"
    identifier:   "nosql-web-api-attribute-value"
    weight:       200
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A JSON object that represents the value of a NoSQL item attribute:

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```json
{"<attribute data type>": "<attribute data value>"}
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="elements" >}}

<dl>
  <!-- <attribute data type> -->
  {{< param-doc name="<attribute data type>" id="attribute-data-type" >}}
  The name of the <api>Attribute Value</api> object, which signifies the type of the attribute's data value.

  {{< param-type >}}String{{< /param-type >}}

  The following attribute-value names (attribute data-type strings) are supported.
  See the {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}} for documentation of the related attribute data types.

  - <a id="type-S"></a>
    **"S"** &mdash; a {{< xref f="data-layer/reference/data-types/attribute-data-types.md" a="type-string" text="string" >}} attribute.
 
  - <a id="type-N"></a>
    "**N**" &mdash; a {{< xref f="data-layer/reference/data-types/attribute-data-types.md" a="type-number" text="number" >}} attribute, represented as a string.

  - <a id="type-BOOL"></a>
    **"BOOL"** &mdash; a {{< xref f="data-layer/reference/data-types/attribute-data-types.md" a="type-boolean" text="Boolean" >}} attribute.

  - <a id="type-B"></a>
    "**B**" &mdash; a {{< xref f="data-layer/reference/data-types/attribute-data-types.md" a="type-blob" text="binary large object (blob)" >}} attribute, represented as a Base64-encoded string.
  {{< comment >}}<!-- [ci-md-bold-text-starts-w-quote-after-anchor] (sharonl)
    (19.7.20) I found that when Markdown bold text that begins with a double
    quote appears directly after an HTML anchor (<a id="..."></a>**"...**), the
    Markdown formatting isn't processed and the formatting asterisks appear
    as-is in the output. This is also true when using &quot; instead of '"'.
    (I tested and verified that this happens only for a quote at the start of
    the text, and it doesn't happen only in lists.) Replacing the MD formatting
    with HTML formatting (<b>...</b>) or adding a space between the anchor and
    the bold MD text - either on the same line or by moving the bold MD code to
    the next line, as done in the list above - resolves the problem. Last
    tested with Hugo v0.73.0. -->
  {{< /comment >}}
   {{< /param-doc >}}

  <!-- <attribute data value> -->
  {{< param-doc name="<attribute data value>" id="attribute-data-value" >}}
  The attribute's data value ("attribute value").
  This value must match the data type signified by the <api>Attribute Value</api> object name (<api>[&lt;attribute data type&gt;](#attribute-data-type)</api>).

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Define a string attribute value.
The name of the attribute-value object is `"S"`, which signifies that the type of the attribute data is a string, and the value of the object (the attribute's data value) is `"johnd"`:
```json
{"S": "johnd"}
```

Define a numeric attribute value.
The name of the attribute-value object is `"N"`, which signifies that the type of the attribute data is a number, and the value of the object (the attribute's data value) is `"34"`; note the numeric data value is represented as a string:
```json
{"N": "34"}
```

Define a Boolean attribute value.
The name of the attribute-value object is `"BOOL"`, which signifies that the type of the attribute data is Boolean, and the value of the object (the attribute's data value) is `false`:
```json
{"BOOL": false}
```

Define a blob attribute value.
The name of the attribute-value object is `"B"`, which signifies that the type of the attribute data is a blob, and the value of the object (the attribute's data value) is `"{{< getvar v="product.running_user.encoded_credentials_example" >}}"`; note the blob data value is represented as a string:
```json
{"B": "{{% getvar v="product.running_user.encoded_credentials_example" %}}"}
```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/objects/attributes.md" >}}
- {{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" >}}
- {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}

