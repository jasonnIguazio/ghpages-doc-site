---
title: "Reserved Names"
keywords: "reference, reserved names, reserved keywords, keywords, reserved attribute names, attribute names, attributes, expressions, v3io frames, frames, system attributes"
menu:
  main:
    parent:     "data-layer-references"
    identifier: "reserved-names-reference"
    Post:       "Reserved names that cannot be used for custom API components"
    weight:     500
---
{{< comment >}}<!-- [IntInfo] (sharonl) (5.2.20) See DOC IG-14611.
- The keywords in each section are in alphabetical order.
- This doc is referenced from multiple other doc pages.
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This reference lists reserved names in the {{< product lc >}}'s data=layer APIs.
Don't use these names for your custom components such as for attribute names.
For additional restrictions, see the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}}.
{{< comment >}}<!-- [IntInfo] (sharonl) (5.2.20) Orit confirmed that container
  names can use a reserved name. There's no need to say this explicitly, I just
  didn't include a related restriction in the container-name restrictions as I
  did for the attribute-name restrictions. -->
{{< /comment >}}

{{< note id="keywords-case-insensitive-note" >}}
The reserved names are case insensitive.
For example, for the reserved keyword <api>set</api>, also avoid using `SET` or `Set`.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Expressions {#expressions}

All expression keywords, including the following, are reserved names in the {{< product lc >}}:

- [Logical operators](#expression-logical-operators)
- [Update-expression keywords](#update-expression-keywords)

<!-- ---------------------------------------- -->
### Logical Operators {#expression-logical-operators}

- <a id="keyword-and"></a><api-b>and</api-b>
- <a id="keyword-in"></a><api-b>in</api-b>
- <a id="keyword-or"></a><api-b>or</api-b>
- <a id="keyword-out"></a><api-b>out</api-b>

{{< note id="expression-logical-operators-note" >}}
For more information, see the {{< xref f="data-layer/reference/expressions/operators/logical-operators.md" >}} expressions reference.
{{< /note >}}

<!-- ---------------------------------------- -->
### Update-Expression Keywords {#update-expression-keywords}

- <a id="keyword-remove"></a><api-b>remove</api-b>
- <a id="keyword-set"></a><api-b>set</api-b>

{{< note id="update-expression-keywords-note" >}}
For more information, see the 
{{< xref f="data-layer/reference/expressions/update-expression.md" >}} reference.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## {{< getvar v="product.frames.name.tc" >}} {#frames}

The [{{< getvar v="product.frames.name.long_lc" >}} API]({{< xref f="data-layer/reference/frames/" t="url" >}}) uses these reserved keywords:

- <api-b>idx</api-b>
- <api-b>idx-0</api-b>
- <api-b>raw_data</api-b>
- <api-b>seq_number</api-b>
- <api-b>stream_time</api-b>

In addition, when using the {{< getvar v="product.frames.name.lc" >}} TSDB backend, <api-b>time</api-b> is reserved for the name of the sample ingestion-time attribute and cannot be used as a label name.
{{< comment >}}<!-- [c-frames-tsdb-time-label] [IntInfo] (sharonl) (26.5.20)
  See the info for the similar restriction as part of the TSDB labels
  restriction in specs/sw-specifications.md ( #tsdb-labels). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## System Attributes {#system-attributes}

For a list of reserved predefined {{< product lc >}} system attributes, see the {{< xref f="data-layer/reference/system-attributes.md" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}}
- {{< xref f="data-layer/reference/expressions/" >}}
- {{< xref f="data-layer/reference/frames/" >}}
- {{< xref f="data-layer/reference/system-attributes.md" >}}

