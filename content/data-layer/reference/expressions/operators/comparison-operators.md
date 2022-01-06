---
title:      "Comparison Operators"
keywords: "expression comparison operators, comparison operators, expression operators, attribute variables, expression equality operators, equality operators, equality operator, == operator, inequality operator, != operator, expression relational operators, relational operators, greater-than operator, > operator, greater-than or equal-to operator, >= operator, less-than operator, < operator, less-than or equal-to operator, <= operator"
menu:
  main:
    parent:       "expressions-operators"
    identifier:   "expressions-comparison-operators"
    weight:       400
---

The following binary comparison operators are supported in expressions.<br/>
The operands can be numeric or strings.
Strings are compared using lexicographic string comparison.

{{< note >}}
If the operands cannot be compared (for example, when comparing attributes of different types), the comparison evaluates to `false`.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Equality Operators {#equality-operators}

<!-- ---------------------------------------- -->
### Equality Operator (==)

```
OPERAND-A == OPERAND-B
```

The equality operator (`==`) returns `true` if the operands are equal; otherwise, returns `false`.


<!-- ---------------------------------------- -->
### Inequality Operator (!=)

The inequality operator (`!=`) returns `true` if the operands are not equal; otherwise, returns `false`.

```
OPERAND-A != OPERAND-B
```

<!-- //////////////////////////////////////// -->
## Relational Operators

<!-- ---------------------------------------- -->
### Greater-Than Operator (>)

```
OPERAND-A > OPERAND-B
```

The greater-than operator (`>`) returns `true` if the left operand (OPERAND-A) is greater than the right operand (OPERAND-B); otherwise, returns `false`.

<!-- ---------------------------------------- -->
### Greater-Than or Equal-To Operator (>=)

```
OPERAND-A >= OPERAND-B
```

The greater-than or equal-to operator (`>=`) returns `true` if the left operand (OPERAND-A) is greater than or equal to the right operand (OPERAND-B); otherwise, returns `false`.

<!-- ---------------------------------------- -->
### Less-Than Operator (<)

```
OPERAND-A < OPERAND-B
```

The less-than operator (`<`) returns `true` if the left operand (OPERAND-A) is less than the right operand (OPERAND-B); otherwise, returns `false`.

<!-- ---------------------------------------- -->
### Less-Than or Equal-To Operator (&lt;=)

```
OPERAND-A <= OPERAND-B
```

The less-than or equal-to operator (`<=`) returns `true` if the left operand (OPERAND-A) is less than or equal to the right operand (OPERAND-B); otherwise, returns `false`.

