---
title:  "Maximal-/Minimal-Value Expression Functions"
keyword: "maximal-value expression functions, max function, max, minimal-value expression functions, min function, min, update expressions, attribute variablese, techpreview, tech preview, arrays, array attributes, ARRAY-ATTRIBUTES, array slices, blob attributes, blob"
menu:
  main:
    name:         "Maximal-/Minimal-Value Functions"
    parent:       "expressions-functions"
    identifier:   "expressions-max-min-functions"
    weight:       400
---

{{< note "max-min-funcs-notes" >}}
- <a id="update-expressions-only-onte"></a><func>min</func> and <func>max</func> are supported in {{< xref f="data-layer/reference/expressions/update-expression.md" text="update expressions" >}}.
    {{< comment >}}<!-- [IntInfo] [c-update-expression-restrict-min-max]
      (sharonl) (30.1.18) [v1.5.0] `min` and `max` could potentially also be
      used in condition expressions but as this wasn't tested and there are
      some know issues with this use (namely with arrays - see Bug IG-6297,
      currently resolved on the v1.7.0 branch), it was decided to restrict the
      official support, for now, to update expressions. See additional info in
      DOC Task IG-3335. (1.6.20) Orit said to keep all the previous
      update-expression-only and other specific expression restrictions also in
      v2.8.0, at least for now.
      The only change in the v2.8.0 doc is that we returned the previous arrays
      doc for expressions, removed the Tech Preview indications, and instead
      restricted it to the web APIs, and extended the support also to condition
      expressions (DOC IG-13731) [c-array-attr-web-api-sup]. -->
    {{< /comment >}}
- <a id="arrays-support-note"></a>Regarding the use of the <func>min</func> and <func>max</func> functions with arrays, note that in the current release this is restricted to the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
    {{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20)
      See info in reference/attribute-data-types.md #array-attributes / DOC
      IG-13731.  [c-array-attributes-bool-not-supported] -->
    {{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## max {#max}

The <func>max</func> function supports the following variations:

- [Simple-values comparison](#max-compare-simple-values)
- [Array-elements comparison](#max-compare-array-elements)

<!-- ======================================== -->
### Compare Simple Values {#max-compare-simple-values}

```
max(a, b)
```

When <func>max</func> receives two parameters, it returns the highest (maximal) parameter value.
The function supports comparison of Boolean, numeric, and string values.
The values can also be provided as expressions (for example, `attr1+attr1` or `attr1==attr2`).

For example, given <attr>attr1</attr>, <attr>attr2</attr>, and <attr>attr3</attr> attributes with the respective values 5, 1, and 6, <nobr>`"max(attr1, attr2+attr3)"`</nobr> returns the sum of <attr>attr2</attr> and <attr>attr3</attr> &mdash; 7.

{{< note id="max-data-types-note" >}}
- Strings are compared using lexicographic string comparison.
- Numeric values of different data types are compared using numeric promotion.
    The type of the return value is that of the largest data type from among the compared values.
    For example, `"max(1.0, 9)` returns 9.0 (double).
- Boolean values are implicitly converted to numbers to allow comparison &mdash; `true` = 1 and `false` = 0.
    However, the data type of the function's return value in the case of a Boolean operand is the winning data type &mdash; i.e., the original data type of the returned value.
    For example, `"max(1==1, 1==2)"` and `"max(1==1, 0)"` both return `true` (Boolean), but `"max(1==1, 3)"` returns 3 (integer).
    {{< comment >}}<!-- [IntInfo] (sharonl) [c-expr-max-min-bool-comp-ret-type];
      See info in DOC IG-7073 regarding the return-value data type. -->
    {{< /comment >}}
{{< /note >}}

<!-- ======================================== -->
### Compare Array Elements {#max-compare-array-elements}
{{< comment >}}<!-- [c-array-attr-web-api-sup] -->
{{< /comment >}}

```
max(ARRAY)
```

When <func>max</func> receives  a single array or array-slice parameter (`ARRAY`), it returns the highest (maximal) value from among the values of all elements of the specified array or array slice.
The parameter can be the name of an {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="array attribute" >}} (`ARRAY-ATTRIBUTE`), or a {{< xref f="data-layer/reference/expressions/operators/array-operator.md" text="array operator" a="array-slice" text="slice" >}} of an array attribute that indicates the zero-based index range of the array elements to compare (<nobr><code>ARRAY-ATTRIBUTE[i<sub>start</sub>..<code>i<sub>end</sub></code>]</code></nobr>).

For example, for a <attr>myArray</attr> integer-array attribute with the values 7, 13, 5, and 1, `"max(myArray)"` returns 13 and <nobr>`"max(myArray[2..3])"`</nobr> returns 5.

<!-- //////////////////////////////////////// -->
## min {#min}

The <func>min</func> function supports the following variations:

- [Simple-values comparison](#min-compare-simple-values)
- [Array-elements comparison](#min-compare-array-elements)

<!-- ======================================== -->
### Compare Simple Values {#min-compare-simple-values}

```
min(a, b)
```

When <func>min</func> receives two parameters, it returns the lowest (minimal) parameter value.
The function supports comparison of Boolean, numeric, and string values.
The values can also be provided as expressions (for example, `attr1+attr1` or `attr1==attr2`).

For example, given <attr>attr1</attr>, <attr>attr2</attr>, and <attr>attr3</attr> attributes with the respective values 5, 1, and 6, <nobr>`"min(attr1, attr2+attr3)"`</nobr> returns the value of <attr>attr1</attr> &mdash; 5.

{{< note id="min-data-types-note" >}}
- Strings are compared using lexicographic string comparison.
- Numeric values of different data types are compared using numeric promotion.
    The type of the return value is that of the largest data type from among the compared values.
    For example, `"min(1, 9.0)` returns 1.0 (double).
- Boolean values are implicitly converted to numbers to allow comparison &mdash; `true` = 1 and `false` = 0.
    However, the data type of the function's return value in the case of a Boolean operand is the winning data type &mdash; i.e., the original data type of the returned value.
    For example, `"min(1==1, 1==2)"` and `"min(1==2, 1)"` both return `false` (Boolean), but `"min(1==1, 0)"` returns 0 (integer).
    {{< comment >}}<!-- [IntInfo] (sharonl) [c-expr-max-min-bool-comp-ret-type];
      See info in DOC IG-7073 regarding the return-value data type. -->
    {{< /comment >}}
{{< /note >}}

<!-- ======================================== -->
### Compare Array Elements {#min-compare-array-elements}
{{< comment >}}<!-- [c-array-attr-web-api-sup] -->
{{< /comment >}}

```
min(ARRAY)
```

When <func>min</func> receives  a single array or array-slice parameter (`ARRAY`), it returns the lowest (minimal) value from among the values of all elements of the specified array or array slice.
The parameter can be the name of an {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="array attribute" >}} (`ARRAY-ATTRIBUTE`), or a {{< xref f="data-layer/reference/expressions/operators/array-operator.md" text="array operator" a="array-slice" text="slice" >}} of an array attribute that indicates the zero-based index range of the array elements to compare (<nobr><code>ARRAY-ATTRIBUTE[i<sub>start</sub>..<code>i<sub>end</sub></code>]</code></nobr>).

For example, for a <attr>myArray</attr> integer-array attribute with the values 7, 13, 5, and 1, `"min(myArray)"` returns 1 and <nobr>`"min(myArray[1..2])"`</nobr> returns 5.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/update-expression.md" >}}
- {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="Attribute Variables" >}}

