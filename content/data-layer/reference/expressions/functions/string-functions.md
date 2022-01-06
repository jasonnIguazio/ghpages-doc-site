---
title:  "Expression String Functions"
keywords: "expression string functions, string functions, starts function, starts, ends function, ends, contains function, contains, strings, attribute variables, string attributes, data types, string, literals, LITERAL"
menu:
  main:
    name:       "String Functions"
    parent:     "expressions-functions"
    identifier: "expressions-string-functions"
    weight:     800
---

The following Boolean string-comparison functions are supported in expressions.
<br/>
All functions receive two string parameters.
Each parameter can be provided either as a constant {{< xref f="data-layer/reference/expressions/overview.md" a="literals" text="literal" >}} string (`LITERAL`), or as an {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="attribute variable" >}} (`ATTRIBUTE`) that represents a {{< xref f="data-layer/reference/data-types/attribute-data-types.md" a="type-string" text="string attribute" >}} (of type `"S"`) whose value will be used in the comparison.

<!-- //////////////////////////////////////// -->
## ends

```
ends(s1, s2)
```

Checks whether the first string (<paramname>s1</paramname>) ends with the second string (<paramname>s2</paramname>).

For example, `ends('4-Jun-2018', year)` returns `true` for a <attr>year</attr> string attribute whose value is `"2018"`.

<!-- //////////////////////////////////////// -->
## contains

```
contains(s1, s2)
```

Checks whether the first string (<paramname>s1</paramname>) contains the second string (<paramname>s2</paramname>).

For example, `contains(rainbow, 'yellow')` returns `true` for a <attr>rainbow</attr> attribute whose value is `"red, orange, yellow, green, blue, indigo, violet"`.

<!-- //////////////////////////////////////// -->
## length

```
length(s)
```

Returns the length of the provided string (<paramname>s</paramname>) &mdash; i.e., the number of characters in the string.
<br/>
<paramname>s</paramname> can also be an expression that evaluates to a string.

For example:

- `length("123")` returns 3.
- `length(mystr)` for a <attr>mystr</attr> attribute whose value is `"Hello World!"` returns 12.
- `length ('abc' + 'efg')` returns 6.

{{< note "length-update-expressions-only-support-note" >}}
<func>length</func> is supported in {{< xref f="data-layer/reference/expressions/update-expression.md" text="update expressions" >}}.
{{< comment >}}<!-- [c-update-expression-restrict-length] [IntInfo]
  (sharonl) (13.11.18) [v1.7.2 & v1.9.4] `length` could potentially also be
  used in condition expressions but as this wasn't tested it was decided to
  restrict the official support, for now, to update expressions. See additional
  info in DOC Task IG-5987. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## starts

```
starts(s1, s2)
```

Checks whether the first string (<paramname>s1</paramname>) starts with the second string (<paramname>s2</paramname>).

For example, `starts(fullName, 'Jo')` returns `true` for a <attr>fullName</attr> attribute whose value is `"Jon Snow"`.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="Attribute Variables" >}}

