---
title:  "Expression Operators"
keywords: "expression operators, expressions, operators, binary operators, unary operators, OPERATOR, OPERAND, arithmetic operators, assignment operator, bitwise operators, comparison operators, logical operators , IN operator, techpreview, tech preview, arrays, array attributes, array operator, [] opeartor"
layout: "section-list"
menu:
  main:
    name:       "Operators"
    parent:     "expressions"
    identifier: "expressions-operators"
    weight:     50
---
The {{< product lc >}} supports expressions that perform calculations, logical evaluations, and comparisons, by applying operators to operands.

{{< note >}}
- Function operators are described separately.
    See {{< xref f="data-layer/reference/expressions/functions/" >}}.
- For update-expression keyword operators, see {{< xref f="data-layer/reference/expressions/update-expression.md" >}}.
- The names expression operators are reserved names in the {{< product lc >}}.
    For more information, see {{< xref f="data-layer/reference/reserved-names.md" >}}.
{{< /note >}}

A **binary operator** receives two operands:

```
OPERAND-A OPERATOR OPERAND-B
```

A **unary operator** receives a single operand:

```
OPERATOR OPERAND
```

There are also special operators such as the {{< xref f="data-layer/reference/expressions/operators/array-operator.md" text="array operator" >}} (`[ ]`).
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) I
  decided not to mention here that the array support is currently restricted
  only to the web APIs. This is noted in the referenced array-operator doc. -->
{{< /comment >}}

An `OPERAND` can be any expression that evaluates to a value that
matches the types supported by the related operator.

This section documents the operators can be used in expressions.

