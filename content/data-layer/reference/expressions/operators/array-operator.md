---
title: "Array Operator ([ ])"
keywords: "expression array operator, array operator, [] operator, [], expression operators, attribute variables"
menu:
  main:
    parent:     "expressions-operators"
    identifier: "expressions-array-operator"
    weight:     150
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} enables you to define {{< xref f="data-layer/reference/data-types/attribute-data-types.md" a="array-attributes" text="array attributes" >}} &mdash; blob attributes that represent numeric arrays of 64-bit integer or double values.
{{< comment >}}<!-- [c-array-attributes-bool-not-supported] IntInfo (sharonl)
  (8.11.18) Gal said that you use Boolean values for array elements. We don't
  convert such values to int/double (unlike in comparison or min/max
  expressions, for example - see [c-expr-boolean-to-int-conversion]). -->
{{< /comment >}}
See {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="Array-Attribute Expression Variables" >}}.
{{< comment >}}<!-- [c-array-attributes-supported-types] -->
{{< /comment >}}
You can use one of the following syntax variations of the array operator (`[]`) to reference specific elements of an array attribute in expressions.
In all variations, an element's index number can also be provided as an expression that evaluates to an integer.

{{< note id="arrays-support-note" >}}
In the current release, the support for array attributes and the use of array operators and functions in expressions is restricted to the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) See
  info in reference/attribute-data-types.md #array-attributes / DOC IG-13731.
 [c-array-attributes-bool-not-supported] -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Single Array Element {#single-array-element}

```
ATTRIBUTE[i]
```

This syntax references an element at the specified zero-based index (`i`) of an array attribute (`ATTRIBUTE`).
For example, `"km[ctr+1]"`, where <attr>ctr</attr> is a numeric attribute with the value 2, references the fourth element (index 3) of the <attr>km</attr> array attribute.

<!-- //////////////////////////////////////// -->
## Array Slice {#array-slice}

<pre class="code-block">
ATTRIBUTE[i<sub>start</sub>..i<sub>end</sub>]
</pre>

This syntax references an **array slice** &mdash; a range of elements between the specified zero-based start (i<sub>start</sub>) and end (i<sub>end</sub>) indexes of an array attribute (`ATTRIBUTE`).
Note that the range includes the end index.
{{< comment >}}<!-- [IntInfo] (sharonl) (20.6.18) I added the end-index
  inclusion note to the v1.5.4 Tech Preview doc (retroactive) and to the
  upcoming v1.7.0 development doc. Sagi explained that in Linux, an array range
  doesn't include the end index but currently in the platform the end index is
  included. R&D are considering changing the platform behavior to match Linux
  (as well as changing the index-range syntax from ".." to ":") - see Bug
  IG-6468, which is currently planned for v1.9.0. -->
{{< /comment >}}
In v{{< productVersion num >}}, the following uses of array slices in expressions are supported:
{{< comment >}}<!-- [IntInfo] (sharonl) (28.5.18) Gal S. verified that these
  are the supported array-slice uses in v1.5.3, but he said that in v1.7.0 we
  added support for appending arrays and array slices. This is covered by the v
  1.7.0 Tech Preview DOC ticket IG-7462. ==> TODO-v1.7.0-TECH-PREVIEW -->
{{< /comment >}}

-   As a parameter of the <func>{{< xref f="data-layer/reference/expressions/functions/min-max-functions.md" a="max-compare-array-elements" text="max" >}}</func> or <func>{{< xref f="data-layer/reference/expressions/functions/min-max-functions.md" a="min-compare-array-elements" text="min" >}}</func> function &mdash; to retrieve the highest or lowest value from among the elements in the specified array slice.
    For example, `"max(arr[2..10])"` returns the highest value from among the values of the <attr>arr</attr> array attribute's elements at indexes 2 to 10.
-   As an operand of the {{< xref f="data-layer/reference/expressions/operators/array-operator.md" text="array operator" >}} (`[]`) in a {{< xref f="data-layer/reference/expressions/update-expression.md" a="SET-expression" text="SET update expression" >}} &mdash; to assign a slice of an existing array attribute to another array attribute.
    For example, `"SET arr2 = arr1[0..4]"` assigns the values of the first five elements of an existing <attr>arr1</attr> array attribute to an <attr>arr2</attr> attribute.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="Array-Attribute Expression Variables" >}}
- {{< xref f="data-layer/reference/expressions/functions/array-functions.md" >}}
- {{< xref f="data-layer/reference/expressions/update-expression.md" >}}
- {{< xref f="data-layer/reference/expressions/operators/assignment-operator.md" >}}

