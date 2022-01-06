---
title: "Attribute Data Types Reference"
keywords: "attribute data types, reference, attributes, data types, nosql, Boolean, blob, number, string, integer, floating point, IEEE 754, precision, 16-digit precision, nosql web api, Attribute, Attribute Value, utf8, string encoding, encoding, spark dataframe attribute types, spark data types, spark, techpreview, tech preview, arrays, array attributes, blob attributes, array operator, [] operator"
menu:
  main:
    name:       "Attribute Data Types"
    parent:     "data-layer-types-reference"
    identifier: "attr-data-types-reference"
    weight:     10
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

All data objects in the {{< product lc >}} have attributes, which provide information (metadata) about the objects.
See {{< xref f="data-layer/objects/attributes.md" >}}.
The {{< product lc >}} supports the following attribute data types

{{< note title="API-Specific Attribute Types" id="api-specific-attribute-types-note" >}}
Some APIs, such as Spark DataFrames and {{< getvar v="product.frames.name.lc" >}}, require support for interface-specific data types and related type conversions to and from {{< product lc >}} data types.
Information about API-specific attribute data-types support is provided in the relevant API references.
See, for example, the {{< xref f="data-layer/reference/spark-apis/spark-datasets/spark-df-data-types.md" text="Spark DataFrames" >}} and {{< xref f="data-layer/reference/frames/attribute-data-types.md" textvar="product.frames.name.lc" >}} data-types references.
{{< /note >}}

<dl>
  <dt id="type-boolean">Boolean</dt>
  {{< dd >}}
  A Boolean value &mdash; true or false.
  {{< /dd >}}

  <dt id="type-blob">Blob</dt>
  {{< dd >}}
  A Base64-encoded binary large object (blob).<br/>
  In the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}, a blob attribute is represented as a string.
  <!-- [IntInfo] (sharonl) (27.2.18) Orit thinks the Base64 encoding is true
    for all interfaces (but not necessarily a Base64 encoded string, as
    previously documented - now restricted to the web API). However, Orit needs
    to check this with Golan, specifically after speaking with Gal S. who said
    we might have an issue with blob support in the v3io daemon. [PENDING-DEV]
  -->

    {{< note id="array-blob-attr-note" >}}
The web APIs also support array blob attributes.
See [Array Attributes](#array-attributes).
{{< comment >}}<!-- [c-array-attr-web-api-sup] -->
{{< /comment >}}
    {{< /note >}}
  {{< /dd >}}

  <dt id="type-number">Number</dt>
  {{< dd >}}
  One of the following numeric types:

  - **Integer**. For example, 0, 16, -5.
    <!-- [IntInfo] (sharonl) (27.2.18) Orit said not to refer also to unsigned integers. -->

  - **Floating point** &mdash; a base-10 (_b_) 64-bit-encoded floating-point number format.
      The {{< product lc >}} supports a 16-digit precision (_p_), but numbers with more than 14 significant digits may incur a bias. The exponent (_e_) values can be between -308 (E<sub>min</sub> and +308 (E</sub>max</sub>
      The following examples demonstrate the supported non-bias precision and exponent limits:
    12345.678901234, -12345.678901234, 1.2345678901234e-308, 1.2345678901234e+308.

      For more information about floating points, refer to the [IEEE 754: Standard for Binary Floating-Point Arithmetic](https://standards.ieee.org/standard/754-2019.html) and the related [Wikipedia page](https://en.wikipedia.org/wiki/IEEE_754#Basic_and_interchange_formats).

      {{< note >}}
In some contexts, numeric attribute values are represented as strings, such as in the NoSQL Web API {{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute-value.md" >}} objects.
Note that string floating numbers are not identical to true floating-point numbers. For example, "1" and "1.00" are not considered identical. Therefore, consider carefully how you define your floating-point number strings, and avoid comparisons of number strings.
Before performing any comparisons or calculations, convert floating-point strings into actual floating-point numbers.
      {{< /note >}}
  {{< /dd >}}

  <dt id="type-string">String</dt>
  {{< dd >}}
  A Unicode string with UTF-8 binary encoding.
  <!-- [IntInfo] (sharonl) (28.2.18) Orit said not to refer to the option of
    using a different string encoding, even though it's supported in some APIs
    (such as the NoSQL Scala APIs) because using a different encoding breaks
    the unified model and prevents successful access to the data from other
    interfaces. -->
  {{< /dd >}}
</dl>

<!-- //////////////////////////////////////// -->
## Array Attributes {#array-attributes}
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) We
  documented Tech Preview array-attributes and array expression operators &
  functions support for a long time. Then, at Orit's request, we retroactively
  removed this doc from the v2.5.4 and v2.3.1 docs because of major bugs that
  were discovered with this feature. In v2.8.0, we added back the documentation
  without the Tech Preview indication (official support), but restricted it to
  the web APIS - see v2.8.0 Requirement IG-13676 / DOC IG-13731. -->
{{< /comment >}}

The {{< product lc >}}'s {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}} support array attributes.
An **array attribute** is a special type of [blob attribute](#type-blob) that the {{< product lc >}} identifies as a Base64 encoded array.
The current release supports numeric array attributes of type integer and double.
{{< comment >}}<!-- [c-array-attributes-bool-not-supported] IntInfo (sharonl)
  (8.11.18) Gal said that you use Boolean values for array elements. We don't
  convert such values to int/double (unlike in comparison or min/max
  expressions, for example - see [c-expr-boolean-to-int-conversion]). -->
{{< /comment >}}
{{< comment >}}<!-- [c-array-attributes-supported-types] -->
{{< /comment >}}
In the web APIs, an array attribute, like all blob attributes, is represented as a Base64 encoded string.
{{< comment >}}<!-- [IntInfo] (sharonl) [c-array-attribute-supported-types]
  (27.5.18) Gal S. (R&D) told me to document that we support only integer and
  double types, and he'll check for v1.7.0 whether we can also officially
  unsigned integer. See additional info in v1.5.3 Tech Preview DOC Task
  IG-3416.
  [INFRA-TODO] When we remove the web-APIs only arrays-support restriction,
  make the web APIs reference in the last sentence above an xref to the
  web-APIs reference (as was previously the case). -->
{{< /comment >}}

Array attributes are defined in {{< xref f="data-layer/reference/expressions/update-expression.md" a="SET-expression" text="SET update expressions" >}} and can be referenced in update expressions using the {{< xref f="data-layer/reference/expressions/operators/array-operator.md" text="array operator" >}} (`[ ]`).
For more information, see {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="Array-Attribute Expression Variables" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/objects/attributes.md" >}}
- NoSQL Web API {{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute.md" >}} and {{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute-value.md" >}}
- {{< xref f="data-layer/reference/frames/attribute-data-types.md" >}}
- {{< xref f="data-layer/reference/spark-apis/spark-datasets/spark-df-data-types.md" >}}
- {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="Array-Attribute Expression Variables" >}}

