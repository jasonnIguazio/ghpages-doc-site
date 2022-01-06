---
title:      "Bitwise Operators"
keywords: "expression bitwise operators, bitwise operators, expression operators, attribute variables, binary bitwise operators, binary operators, bitwise AND operator, & operator, bitwise OR operator, | operator, bitwise XOR operator, ^ operator, bitwise left-shift operator, << operator, bitwise righ-shift operator, >> operator, unary bitwise operators, unary operators, bitwise NOT operator, one-complement operator, ~ operator"
menu:
  main:
    parent:       "expressions-operators"
    identifier:   "expressions-bitwise-operators"
    weight:       300
---

The following bitwise operators are supported in expressions.<br/>
The operands are numeric, and the result is a binary number.

<!-- //////////////////////////////////////// -->
## Binary Bitwise Operators

<!-- ---------------------------------------- -->
### Bitwise AND Operator (&)

```
OPERAND-A & OPERAND-B
```

The bitwise AND operator (`&`) sets a result bit to 1 if the corresponding bit in both operands is 1; otherwise, sets the result bit to 0.

<!-- ---------------------------------------- -->
### Bitwise OR Operator (|)

The bitwise OR operator (`|`) sets a result bit to 1 if the corresponding bit in either of the operands is 1; otherwise, sets the result bit to 0.

<!-- ---------------------------------------- -->
### Bitwise XOR Operator (^)

```
OPERAND-A ^ OPERAND-B
```

The bitwise XOR operator (`^`) sets a result bit to 1 if the corresponding bit in either, but not both, of the operands is 1; otherwise, sets the result bit to 0.

<!-- ---------------------------------------- -->
### Bitwise Left-Shift Operator (<<)

```
OPERAND-A << OPERAND-B
```

The bitwise left-shift operator (`<<`) shifts the bits of the left operand (`OPERAND-A`) to the left, shifting in zeros from the right.
The right operand (`OPERAND-B`) determines the number of shifted bits.

<!-- ---------------------------------------- -->
### Bitwise Right-Shift Operator (>>)

```
OPERAND-A >> OPERAND-B
```

The bitwise right-shift operator (`>>`) shifts the bits of the left operand (`OPERAND-A`) to the right, discarding shifted-off bits.
The right operand (`OPERAND-B`) determines the number of shifted bits.

<!-- //////////////////////////////////////// -->
## Unary Bitwise Operators

<!-- ---------------------------------------- -->
### Bitwise NOT / Ones-Complement Operator (~)

```
~OPERAND
```

The bitwise NOT (ones-complement) operator (`~`) inverts the bits of the operand in the result: use 1 instead of 0, and 0 instead of 1.

