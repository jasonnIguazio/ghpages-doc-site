---
title:      "IN Operator"
keywords: "expression IN operator, IN operator, expression operators, attribute variables,"
menu:
  main:
    parent:       "expressions-operators"
    identifier:   "expressions-in-operator"
    weight:       500
---

```
OPERAND-A IN (OPERAND-B)
```

The `IN` operator checks whether OPERAND-A is found in OPERAND-B, where OPERAND-B is a comma-separated list of 1&ndash;1024 values (or expressions).<br/>
OPERAND-A and the members of OPERAND-B should be of the same type &mdash; either strings or integers.

For example, `"genre IN ('Rock', 'Blues', 'R&B')"` checks whether the value of a "genre" string attribute is identical to one of the genre strings in OPERAND-B ("Rock", "Blues", or "R&B").


