---
title: "System-Attributes Reference"
keywords: "reference, attributes, system attributes, attribute names, objects, object names, primary key, __name"
menu:
  main:
    name:       "System Attributes"
    parent:     "data-layer-references"
    identifier: "sys-attr-reference"
    Post:       "The platform's system attributes"
    weight:     300
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The Post param
  use {{< product lc >}}. -->
{{< /comment >}}

The {{< product lc >}} defines the following object (item) system attributes.
For more information, see the description of {{< xref f="data-layer/objects/attributes.md" a="system-attributes" text="system attributes" >}} in the attribute-types introduction.

{{< note id="reserved-names-note" >}}
The names of the predefined system attributes are reserved names in the {{< product lc >}}.
For more information, see {{< xref f="data-layer/reference/reserved-names.md" >}}.
{{< /note >}}

<table style="width:100%">
<tr text-align="left">
  <th style="font-weight:bold;">Attribute</th>
  <th style="font-weight:bold;">Description</th>
</tr>
<tr id="sys-attr-__name">
  {{< td class="attr-b" >}}__name{{< /td >}}
  {{< td >}}Object name, which uniquely identifies the object within a collection and serves as the value of the object's primary key.
    See {{< xref f="data-layer/objects/object-names-and-keys/" >}}.
  {{< /td >}}
<tr id="sys-attr-__size">
  {{< td class="attr-b" >}}__size{{< /td >}}
  {{< td >}}Object size.
  {{< /td >}}
</tr>
<tr id="sys-attr-__mode">
  {{< td class="attr-b" >}}__mode{{< /td >}}
  {{< td >}}Object access control list (ACL).
  {{< /td >}}
</tr>
<tr id="sys-attr-__atime_secs">
  {{< td class="attr-b" >}}__atime_secs{{< /td >}}
  {{< td >}}Access time in seconds, as a Unix timestamp.
  {{< /td >}}
</tr>
<tr id="sys-attr-__atime_nsecs">
  {{< td class="attr-b" >}}__atime_nsecs{{< /td >}}
  {{< td >}}Nano-seconds resolution for the <api>__atime_secs</api> access time.
  {{< /td >}}
</tr>
<tr id="sys-attr-__mtime_secs">
  {{< td class="attr-b" >}}__mtime_secs{{< /td >}}
  {{< td >}}Last modification time in seconds, as a Unix timestamp.
  {{< /td >}}
</tr>
<tr id="sys-attr-__mtime_nsecs">
  {{< td class="attr-b" >}}__mtime_nsecs{{< /td >}}
  {{< td >}}Nano-seconds resolution for the <api>__mtime_secs</api> last modification time.
  {{< /td >}}
</tr>
<tr id="sys-attr-__ctime_secs">
  {{< td class="attr-b" >}}__ctime_secs{{< /td >}}
  {{< td >}}Creation time in seconds, as a Unix timestamp.
  {{< /td >}}
</tr>
<tr id="sys-attr-__ctime_nsecs">
  {{< td class="attr-b" >}}__ctime_nsecs{{< /td >}}
  {{< td >}}Nano-seconds resolution for the <api>__ctime_nsecs</api> creation time.
  {{< /td >}}
</tr>
<tr id="sys-attr-__uid">
  {{< td class="attr-b" >}}__uid{{< /td >}}
  {{< td >}}Unique identifier (UID) of the object owner.
  {{< /td >}}
</tr>
<tr id="sys-attr-__gid">
  {{< td class="attr-b" >}}__gid{{< /td >}}
  {{< td >}}Group identifier (GID) of the object owner's group.
  {{< /td >}}
</tr>
<tr id="sys-attr-__obj_type">
  {{< td class="attr-b" >}}__obj_type{{< /td >}}
  {{< td >}}Object type.
  {{< /td >}}
</tr>
<tr id="sys-attr-__collection_id">
  {{< td class="attr-b" >}}__collection_id{{< /td >}}
  {{< td >}}Parent-collection ID.
      A collection can be a stream, a table, or a directory.
  {{< /td >}}
</tr>
<tr id="sys-attr-__last_sequence_num">
  {{< td class="attr-b" >}}__last_sequence_num{{< /td >}}
  {{< td >}}The sequence number of the last record in stream shard; applicable only to stream-shard objects.
  {{< /td >}}
</tr>
</table>

</table>

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/objects/attributes.md" >}}
    - {{< xref f="data-layer/objects/attributes.md" a="system-attributes" text="System attributes" >}}.
- {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}

