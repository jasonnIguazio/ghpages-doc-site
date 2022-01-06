---
title:  "If Exists/Not-Exists Expression Functions"
keywords: "if-exists function, exists function, if-not-exists function, if_not_exists function, if_not_exists, attribute variables, update expressions"
menu:
  main:
    name:         "If Exists/Not-Exists Functions"
    parent:       "expressions-functions"
    identifier:   "expressions-exists-not-exists-functions"
    weight:       100
---

<!-- //////////////////////////////////////// -->
## exists {#exists}

```
exists(ATTRIBUTE)
```

Checks whether an attribute with the specified name (<paramname>ATTRIBUTE</paramname> &mdash; see {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="Attribute Variables" >}}) exists in the evaluated item.

For example, `exists(Vendor)` returns `true` if the evaluated item has a <attr>Vendor</attr> attribute.

<!-- //////////////////////////////////////// -->
## if_not_exists {#if_not_exists}
{{< comment >}}<!-- [IntInfo] (sharonl) [c-expressions-if_not_exists-w-arrays]
  Gal S. tested and found that the following examples of using if_not_exists
  with array attributes work in v1.7.0; he couldn't test in v1.5.3:
  `"c=if_not_exists(c,init_array(100,'int'));"`, `"c=if_not_exists(c, b);"`.
  I decided it was OK document this in the v1.5.3 Tech Preview documentation,
  however ultimately I didn't mention it in the documentation.
  I noted in the v1.7.0 DOC ticket IG-6857 the need to check with QA whether
  this was tested, at which point we should reevaluate the documentation
  decision (as this would be useful to document once the feature is verified).
  [V2.8.0-TODO] Check with QA whether this was tested (at this stage, for the
  web APIs - DOC IG-13731), -->
{{< /comment >}}

```
if_not_exists(ATTRIBUTE, VALUE)
```

If the specified attribute (<paramname>ATTRIBUTE</paramname> &mdash; see {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="Attribute Variables" >}}) exists, the function returns its value.
Otherwise, the function returns the default value specified in the <paramname>VALUE</paramname> parameter.

For example, a `"SET lastName = if_not_exists(lastName, '')"` {{< xref f="data-layer/reference/expressions/update-expression.md" text="update expression" >}} creates a <attr>lastName</attr> attribute and initializes its value to an empty string, provided the attribute doesn't already exist; if the attribute exists, it will be reassigned its current value (i.e., remain unchanged).

{{< note >}}
<func>if_not_exists</func> is supported in {{< xref f="data-layer/reference/expressions/update-expression.md" text="update expressions" >}}.
{{< comment >}}<!-- [IntInfo] [c-update-expression-restrict-if_not_exists]
  (sharonl) (30.1.18) [v1.5.0] `if_not_exists` could potentially also be used
  in condition expressions but as this wasn't tested it was decided to restrict
  the official support, for now, to update expressions. See additional info in
  DOC Task IG-3335. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/update-expression.md" >}}
- {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="Attribute Variables" >}}

