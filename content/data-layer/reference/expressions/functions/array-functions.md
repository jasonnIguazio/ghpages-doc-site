---
title:  "Array Functions"
keywords: "array functions, init_array function, init_array, array attributes, arrays, attribute variables, update expressions"
menu:
  main:
    parent:       "expressions-functions"
    identifier:   "expressions-array-functions"
    weight:       50
---

{{< note id="array-expression-funcs-notes" >}}
- <a id="arrays-support-note"></a>In the current release, the support for array attributes and the use of array operators and functions in expressions is restricted to the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
    {{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20)
      See info in reference/attribute-data-types.md #array-attributes / DOC
      IG-13731.  [c-array-attributes-bool-not-supported] -->
    {{< /comment >}}
- See also the array support of the <func>{{< xref f="data-layer/reference/expressions/functions/min-max-functions.md" a="max-compare-array-elements" text="max" >}}</func> and <func>{{< xref f="data-layer/reference/expressions/functions/min-max-functions.md" a="min-compare-array-elements" text="min" >}}</func> functions.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## length

```
length(ARRAY)
```

Returns the length of the provided array or array slice (<paramname>ARRAY</paramname>) &mdash; i.e., the number of elements in the array or slice.
The parameter can be the name of an {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="array attribute" >}} (`ARRAY-ATTRIBUTE`), or a {{< xref f="data-layer/reference/expressions/operators/array-operator.md" text="array operator" a="array-slice" text="slice" >}} of an array attribute that indicates the zero-based index range of the array elements to compare (<nobr><code>ARRAY-ATTRIBUTE[i<sub>start</sub>..<code>i<sub>end</sub></code>]</code></nobr>).

For example, for a <attr>myArray</attr> array attribute with the values 7, 13, 5, and 1, `"length(myArray)"` returns 4 and <nobr>`"length(myArray[2..3])"`</nobr> returns 2.

{{< note "length-update-expressions-only-support-note" >}}
<func>length</func> is supported in {{< xref f="data-layer/reference/expressions/update-expression.md" text="update expressions" >}}.
{{< comment >}}<!-- [c-update-expression-restrict-length] [IntInfo] See the
  info for the similar note in the expressions string-functions reference. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## init_array {#init_array}

```
init_array(size, type)
```

Creates an {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="array attribute" >}} and initializes all array elements to zero.
The function receives the following parameters:

<dl>
  <!-- size -->
  {{< param-doc name="size" id="init_array-param-size" >}}
  The size of the array &mdash; i.e., the number of elements in the array.

  {{< param-type >}}Integer{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- type -->
  {{< param-doc name="type" id="init_array-param-type" >}}
  The data type of the array elements.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< param-values >}}
  - <opt-b>&apos;int&apos;</opt-b> &mdash; a 64-bit integer
  - <opt-b>&apos;double&apos;</opt-b> &mdash; a 64-bit double
  {{< /param-values >}}
  {{< comment >}}<!-- [c-array-attributes-supported-types] -->
  <!-- [IntInfo] (sharonl) I used single quotes (&apos; = ') because usually we
    delimit expressions using double quotes (") and then embedded strings such
    as the init_array type parameter need to be quoted using single quotes. -->
  {{< /comment >}}
  {{< comment >}}<!-- [c-array-attributes-bool-not-supported] IntInfo (sharonl)
    (8.11.18) Gal said that you use Boolean values for array elements. We don't
    convert such values to int/double (unlike in comparison or min/max
    expressions, for example - see [c-expr-boolean-to-int-conversion]). -->
  {{< /comment >}}
  {{< /param-doc >}}
</dl>

For example, an `"arr = init_array(3, 'int')"` update expression creates an <attr>arr</attr> array attribute that represents an integer array with three elements, all initialized to zero.
You can also change the values of specific elements in the same expression &mdash; for example `"arr=init_array(3, 'int'); arr[1]=1; arr[2]=arr[1]+1;"` results in a new <attr>arr</attr> array attribute with three elements whose values are 0 (default), 1, and 2.

After creating an array attribute, you can use the {{< xref f="data-layer/reference/expressions/operators/array-operator.md" text="array operator (`[]`)" >}} to reference array elements .

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="Array-Attribute Expression Variables" >}}
- {{< xref f="data-layer/reference/expressions/operators/array-operator.md" >}}
- {{< xref f="data-layer/reference/expressions/update-expression.md" >}}
- {{< xref f="data-layer/reference/expressions/operators/assignment-operator.md" >}}

