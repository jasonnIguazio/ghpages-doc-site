---
title:      "Assignment Operator (=)"
keywords: "expression assignment operator, assignment operator, = operator, expression operators, update expressions, SET expressions, update items, attributes, attribute variables, ATTRIBUTE, techpreview, tech preview, arrays, array attributes"
menu:
  main:
    parent:     "expressions-operators"
    identifier: "expressions-assignment-operator"
    weight:     200
---

```
OPERAND-A = OPERAND-B
```

The assignment operator (`=`) is used in {{< xref f="data-layer/reference/expressions/update-expression.md" a="SET-expression" text="SET update expressions" >}} to assign the value of the right operand (`OPERAND-B`) to the left operand (`OPERAND-A`).
The left operand should be either an {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="attribute variable" >}} (`ATTRIBUTE`) or an element of an {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="array attribute variable" >}} (`ATTRIBUTE[i]`).

{{< note id="arrays-support-note" >}}
In the current release, the support for array attributes and the use of array operators and functions in expressions is restricted to the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) See
  info in reference/attribute-data-types.md #array-attributes / DOC IG-13731.
-->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/update-expression.md" >}}
- {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="Attribute Variables" >}}

