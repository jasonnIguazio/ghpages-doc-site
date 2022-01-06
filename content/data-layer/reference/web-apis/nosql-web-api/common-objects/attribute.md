---
title:  "Attribute"
keywords: "Attribute, attribute object, attributes, nosql, json, json objects, attribute names, names, Attribute Value, attribute values"
menu:
  main:
    parent:     "nosql-web-api-common-objects"
    identifier: "nosql-web-api-attribute"
    weight:     100
---

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A named JSON object that represents a NoSQL item {{< xref f="data-layer/objects/attributes.md" text="attribute" >}}.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```
"<attribute name>": <attribute value>
```

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="elements" >}}

<dl>
  <!-- <attribute name> -->
  {{< param-doc name="<attribute name>" id="attribute-name" >}}
  The attribute name.
  See {{< xref f="data-layer/objects/attributes.md" a="attribute-names" text="Attribute Names" >}} for attribute naming guidelines.

  {{< param-type >}}String{{< /param-type >}}
  {{< /param-doc >}}

  <!-- <attribute value> -->
  {{< param-doc name="<attribute value>" id="attribute-value" >}}
  An attribute-value object that provides information about the attribute's data type and value.

  {{< param-type >}}<api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute-value.md" text="Attribute-Value" >}}</api> object{{< /param-type >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Define an attribute named <attr>username</attr> that signifies a username.
The attribute type is a string (`"S"`), and its data value is `"johnd"`:
```json
{"username": {"S": "johnd"}}
```

Define an age attribute named <attr>age</attr> that signifies a user's age.
The attribute type is a number (`"N"`), and its data value is `"34"`; note the numeric data value is represented as a string:
```json
{"age": {"N": "34"}}
```

Define an attribute named <attr>is_admin</attr> that signifies whether a user has administrator privileges.
The attribute type is a Boolean value (`"BOOL"`), and its data value is `false`:
```json
{"is_admin": {"BOOL": false}}
```

Define an age attribute named <attr>credentials</attr> that signifies encoded username and password login credentials.
The attribute type is a number (`"B"`), and its data value is `"{{< getvar v="product.running_user.encoded_credentials_example" >}}"`; note the blob data value is represented as a string:
```json
{"credentials": {"B": "{{% getvar v="product.running_user.encoded_credentials_example" %}}"}}
```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/objects/attributes.md" >}}
- {{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute-value.md" >}}
- {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}

