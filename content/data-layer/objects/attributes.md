---
title: "Objects Attributes"
description: "Learn about object attributes (a.k.a item attributes) in the Iguazio MLOps Platform."
keywords: "object attributes, item attributes, attributes, object metadata, file metadata, metadata, attribute types, system attributes, user attributes, hidden attributes, attribute names, attribute-name restrictions, naming restrictions, objects, simple objects, items, nosql items, nosql, key-value, kv, nosql databases, nosql tables, table items, table columns, columns"
layout: "section-list"
menu:
  main:
    parent:     "data-objects"
    identifier: "object-attributes"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] This section replaces content previously
  found in concepts/containers-collections-objects.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] See info in data-layer/_index.md.
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Introduction {#intro}

All data objects in the {{< product lc >}} have <a id="definition-attribute"></a>**attributes**.
An attribute provides information (metadata) about an object.
NoSQL table-item attributes in the {{< product lc >}} are the equivalent of columns in standard NoSQL databases.
See {{< xref f="data-layer/nosql/" >}}, including a {{< xref f="data-layer/nosql/" a="terminology-comparison" text="terminology comparison" >}}.
For the supported attribute data types, see the {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}.

<!-- //////////////////////////////////////// -->
## Attribute Types {#attribute-types}

Attributes are classified into three logical types:

<dl>
    <dt><a id="user-attributes"></a>User attributes</dt>
    <dd>Attributes that the user assigns to a data object using the {{< product lc >}} APIs.
    </dd>
    <dt><a id="system-attributes"></a>System attributes</dt>
    <dd>Attributes that the {{< product lc >}} automatically assigns to all objects.
        The system attributes contain the object's <b>name</b> (<attr>__name</attr>) and miscellaneous information that was identified for the object by the system, such as the UID (<api>__uid</api>) and GID (<api>__gid</api>) of the object's owner, and the object's last-modification time <api>__mtime_secs</api>.
        For a full list of the supported system attributes, see the {{< xref f="data-layer/reference/system-attributes.md" >}}.
    </dd>
    <dt><a id="hidden-attributes"></a>Hidden attributes</dt>
    <dd>Attributes that the user or {{< product lc >}} optionally assign to an object and are used to store internal information that is not meant to be exposed.
    </dd>
</dl>

{{< note >}}
The {{< product lc >}}'s naming convention is to prefix the names of system and hidden attributes with two underscores (<code>__</code>) to differentiate them from user attributes.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Attribute Names {#attribute-names}
{{< comment >}}<!--  -->
<!-- [IntInfo] (sharonl) (26.2.18)
- See v1.5.0 DOC Task IG-6818 for which we edited this section, and related
  v1.7.0 R&D Bug IG-6809 and v1.9.1 R&D Task IG-9023.
- The attribute-name restrictions are also documented in the
  sw-specifications.md specs page (see "#attribute-names").
-->
{{< /comment >}}

Attribute names are subject to the general {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="file-names" text="file-system naming restrictions" >}} and the following additional restrictions:

- Contain only the following characters:

    - Alphanumeric characters (a&ndash;z, A&ndash;Z, 0&ndash;9)
    - Underscores (_)
- Begin either with a letter (a&ndash;z, A&ndash;Z) or with an underscore (_)
- Not identical to a reserved name &mdash; see {{< xref f="data-layer/reference/reserved-names.md" >}}
- Length of 1&ndash;{{< verkey k="attr_name_max_length" >}} characters

{{< note >}}
Spaces in attribute names are currently not supported.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/system-attributes.md" >}}
- {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}
- {{< xref f="data-layer/reference/reserved-names.md" >}}
- {{< xref f="data-layer/objects/object-names-and-keys/" >}}
- {{< xref f="data-layer/nosql/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="attribute-names" text="Attribute-name software specifications and restrictions" >}}

