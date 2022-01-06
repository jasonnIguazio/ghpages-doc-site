---
title:      "Logical Operators"
keywords: "expression logical operators, logical operators, expression operators, attribute variablese, binarly logical operators, binary operators, logical AND operator, AND expression operator, AND operator, logical OR operator, OR operator, unary logical operators, unary operators, logical negation operator, negation operator, logical NOT operator, NOT operator"
menu:
  main:
    parent:     "expressions-operators"
    identifier: "expressions-logical-operators"
    weight:     600
---

The following binary logical operators are supported in expressions.<br/>
The operands are Boolean.

{{< note id="logical-operators-notes" >}}
- Use the literal operator names &mdash; `AND`, `OR`, or `NOT` &mdash; and not the operator signs that are commonly associated with these operators.
- The names of the logical expression operators are reserved names in the {{< product lc >}}.
    For more information, see {{< xref f="data-layer/reference/reserved-names.md" >}}.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Binary Logical Operators {#binary-logical-operators}

<!-- ---------------------------------------- -->
### Logical AND Operator {#AND-operator}

```
OPERAND-A AND OPERAND-B
```

The logical `AND` operator returns `true` if both operands are `true`; otherwise, returns `false`.

<!-- ---------------------------------------- -->
### Logical OR Operator {#OR-operator}

```
OPERAND-A OR OPERAND-B
```

The logical `OR` operator returns `true` if either of the operands is true; otherwise, returns `false`.

<!-- //////////////////////////////////////// -->
## Unary Logical Operators {#unary-logical-operators}

<!-- ---------------------------------------- -->
### Logical Negation (NOT) Operator {#NOT-operator}

```
NOT OPERAND
```

The logical negation operator (`NOT`) negates the value of the operand:
if the operand evaluates to `true`, the operator returns `false`; if the operand evaluates to `false`, the operator returns `true`.

