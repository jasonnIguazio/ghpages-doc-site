---
title: "Expressions Overview"
keywords: "expressions, condition expressions, filter expressions, update expressions, update items, nosql, nosql items, nosql tables, tables, table items, attributes, attribute variables, attributes arithmetic, attribute values, literals, expression functions, functions, expression operators, operators, ATTRIBUTE, EXPRESSION, LITERAL, OPERATOR, OPERAND, tech preview, arrays, array attributes, array operator, [] operator"
menu:
  main:
    name:       "Overview"
    parent:     "expressions"
    identifier: "expressions-overview"
    weight:     10
---
{{< comment >}}<!-- [IntInfo] (sharonl) (17.2.21) Orit said that the
  expressions syntax is supported only in our NoSQL APIs, but the relevant API
  operations (such as the NoSQL Web API UpdateItem or GetItem(s) operations)
  can be applied to any type of data and to files and used to work on the
  metadata. -->
{{< /comment >}}

The {{< product lc >}} APIs support the use of expressions to define execution logic and enhance the support for working with {{< xref f="data-layer/nosql/" a="overview" text="NoSQL items" >}} ({{< xref f="data-layer/objects/" text="objects)" >}} and their {{< xref f="data-layer/objects/attributes.md" text="attributes" >}}.

{{< xref f="data-layer/reference/expressions/condition-expression.md" text="Condition expressions" >}} define a logical condition for performing a specific operation.
<br/>
{{< xref f="data-layer/reference/expressions/update-expression.md" text="Update expressions" >}} can be used to add and initialize item attributes, update the values of existing attributes or elements in an array attribute, or remove (delete) attributes.
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) I
  decided not to mention here that the array support is currently restricted
  only to the web APIs. This is noted in the array-attributes section. -->
{{< /comment >}}

This reference outlines the supported expressions and their syntax.

<!-- //////////////////////////////////////// -->
## Expression {#expression}

The *EXPRESSION* notation represents a basic expression syntax, which can also be included in other expressions.
An expression is typically defined as a string that can include a combination of any of the following components (depending on the context).

{{< note id="expression-notations-note" >}}
The document uses *XXX* notations, such as `FUNCTION` and `ATTRIBUTE`, as placeholder identifiers for the related components.
{{< /note >}}

- [Literals](#literals) (`LITERAL`)
- [Attribute Variables](#attribute-variables) (`ATTRIBUTE`)
- {{< xref f="data-layer/reference/expressions/functions/" text="Functions" >}} (*FUNCTION*)
- {{< xref f="data-layer/reference/expressions/operators/" text="Operators and operands" >}} (`OPERATOR` and `OPERAND`)
- Other expressions (`EXPRESSION`).

{{< note id="expression-notes" >}}
- The names of the expression functions and operands are case insensitive.
    For example, <nobr>`color in (red, blue)`</nobr> and <nobr>`color IN (red, blue)`</nobr> both work (see the {{< xref f="data-layer/reference/expressions/operators/in-operator.md" text="<api>in</api>" >}} operator).
- String values within the expression are enclosed within single quotes (`' '`).
- Expression keywords, including the names of expression operators, are reserved names in the {{< product lc >}}.
    For more information, see {{< xref f="data-layer/reference/reserved-names.md" >}}.
- See the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="expressions" >}} for known expression restrictions.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Literals {#literals}

```
LITERAL
```

`LITERAL` represents a constant literal value. For example: 'blue'; 5; true.

<!-- //////////////////////////////////////// -->
## Attribute Variables {#attribute-variables}

```
ATTRIBUTE
```

`ATTRIBUTE` in expressions represents an attribute variable, which is the name of an item {{< xref f="data-layer/objects/attributes.md" text="attribute" >}} &mdash; for example, first-name or color.

Attribute variables can refer to any supported {{< xref f="data-layer/objects/attributes.md" a="attribute-types" text="attribute type" >}}, including {{< xref f="data-layer/objects/attributes.md" a="system-attributes" text="system attributes" >}} such as <attr>{{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__mtime_secs" text="__mtime_secs" >}}</attr> or <attr>{{< xref f="data-layer/reference/system-attributes.md" a="sys-attr-__uid" text="__uid" >}}</attr>.

{{< note >}}
"**attribute value**" in the expressions documentation refers to the attribute data value.
In the <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/" >}}</api>, this refers to the value of an <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/common-objects/attribute-value.md" >}}</api> object.
{{< /note >}}

If an attribute name is a reserved word, such as a function name, enclose the word within acute-accent characters (<code>\`</code>) &mdash; <nobr><code>\`&lt;reserved word&gt;\`</code></nobr>.
For example, for an attribute named <attr>exists</attr>, use <nobr><code>&quot;\`exists\` == true&quot;</code></nobr>.

{{< note >}}
Expressions enable you to use attributes as variables in arithmetic or logical calculations and evaluations.
For example, you can define an <attr>i</attr> attribute to be used as a loop iterator, and increment or decrement its value sequentially.
{{< /note >}}

<!-- ======================================== -->
### Array-Attribute Expression Variables {#array-attribute-expression-variables}

The {{< product lc >}} enables you to define {{< xref f="data-layer/reference/data-types/attribute-data-types.md" a="array-attributes" text="array attributes" >}} as special {{< xref f="data-layer/reference/data-types/attribute-data-types.md" a="array-attributes" a="type-blob" text="blob attributes" >}} that identify Base64 encoded integer or double arrays.
{{< comment >}}<!-- [c-array-attributes-bool-not-supported] IntInfo (sharonl)
  (8.11.18) Gal said that you use Boolean values for array elements. We don't
  convert such values to int/double (unlike in comparison or min/max
  expressions, for example - see [c-expr-boolean-to-int-conversion]). -->
{{< /comment >}}
{{< comment >}}<!-- [c-array-attribute-supported-types] -->
{{< /comment >}}

{{< note id="arrays-support-note" >}}
In the current release, the support for array attributes and the use of array operators and functions in expressions is restricted to the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) See
  info in reference/attribute-data-types.md #array-attributes / DOC IG-13731.
-->
{{< /comment >}}
{{< /note >}}

Array attributes are defined in {{< xref f="data-layer/reference/expressions/update-expression.md" a="SET-expression" text="SET update expressions" >}} &mdash; for example, in the <paramname>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" a="req-param-UpdateExpression" text="UpdateExpression" >}}</paramname> request parameter of the NoSQL Web API <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" text="UpdateItem" >}}</api> operation.
You can either use the <func>{{< xref f="data-layer/reference/expressions/functions/array-functions.md" a="init_array" text="init_array" >}}</func> expression function to define and initialize a new array attribute (for example, <nobr>`"SET arr=init_array(100,'double')"`</nobr>), or assign an existing array attribute or a slice of such an attribute to a new array attribute (for example, <nobr>`"SET newArr=oldArr"`</nobr> or <nobr>`"SET newArr=oldArr[0..99]"`</nobr>).

The elements of an array attribute can be referenced in expressions using the {{< xref f="data-layer/reference/expressions/operators/array-operator.md" text="array operator" >}} (`[ ]`).
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) I
  decided not to mention here that the array support is currently restricted
  only to the web APIs. This is noted in the referenced array-operator doc. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Boolean Conversions {#boolean-conversions}

In most cases, Boolean values can also be used as numeric operands: the {{< product lc >}} implicitly converts `true` to 1 and `false` to 0.
For example, the following update expression is valid, implicitly converting the results of the embedded Boolean expressions to 1 or 0: `res=(1 in (1,2,3,4,5))*10 + (starts('abc','xx'))*100 + (ends('abc','bc'))*1000 + (contains('abxxc','xx'))*100000;`.
However, this doesn't apply to attribute comparisons because the {{< product lc >}} verifies that the compared value matches the current attribute data type. For example, if the value of attribute <attr>a</attr> is 5 (integer) and the value of attribute <attr>b</attr> is `false` (Boolean), the expressions `a==true` and `b==0` will both fail because of a type mismatch.
But an expression such as `"c = (a==5)*4 + b;"` will succeed &mdash; implicitly converting the result of the `a==5` comparison from `true` to 1 and the value of `b` (`false`) to 0 and setting the value of attribute <attr>c</attr> to 4 (1*4+0).
{{< comment >}}<!-- IntInfo (sharonl) [c-expr-boolean-to-int-conversion]; auto
  Bool > num conversion is also not supported for array elements
  [c-array-attributes-bool-not-supported]. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/condition-expression.md" >}} and {{< xref f="data-layer/reference/expressions/update-expression.md" >}}.
- Expression {{< xref f="data-layer/reference/expressions/functions/" text="functions" >}} and {{< xref f="data-layer/reference/expressions/operators/" text="operators" >}}
- {{< xref f="data-layer/objects/attributes.md" >}}
- {{< xref f="data-layer/reference/data-types/attribute-data-types.md" >}}
- {{< xref f="data-layer/reference/system-attributes.md" >}}
- {{< xref f="data-layer/apis/" >}}
- {{< xref f="data-layer/nosql/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="expressions" text="Expressions software specifications and restrictions" >}}

