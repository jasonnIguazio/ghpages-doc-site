---
title: "Condition Expression"
keywords: "condition expressions, filter expressions, conditional update, updat items, UpdateItem, GetItems, FilterExpression, nosql, nosql web api, nosql, table items, attributes, boolean expressions, logical operators, binary logical operators, CONDITION, AND operator, OR operator, NOT operator, if-then, if-then-else, tech preview, arrays, array attributes, array operator"
menu:
  main:
    parent:       "expressions"
    identifier:   "expressions-condition-expression"
    weight:       20
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  reference/expressions/condition-expression.md
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the references to this doc in v3io/tutorials (from
  data-ingestion-and-preparation/ frames.ipynb and v3io-kv.ipynb) and from the
  v3io/frames README.md file. (Until then and for previous tutorials releases,
  we'll have URL redirect rules as part of the restructured-site publication.)
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from data-ingestion-and-preparation/frames.ipynb and
  v3io-kv.ipynb) and from the v3io/frames README.md file, including specific
  links to the #filter-expression anchor. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

A **condition expression** is an expression that defines a condition for executing an operation, based on the attributes of the items against which the expression is evaluated.
For example, the NoSQL Web API <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" >}}</api> operation receives an optional condition-expression request parameter (<paramname>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" a="req-param-ConditionExpression" text="ConditionExpression" >}}</paramname>) that defines a condition that determines whether to update the item or which update expression to use in the case of an if-then-else update.

{{< note title="Arrays Support" id="arrays-support-note" >}}
In the current release, the support for array attributes and the use of array operators and functions in expressions is restricted to the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) See
  info in reference/attribute-data-types.md #array-attributes / DOC IG-13731.
-->
{{< /comment >}}
{{< /note >}}

<!-- ---------------------------------------- -->
### Filter Expression {#filter-expression}

For operations that retrieve existing item attributes, the condition expression acts as a **filter expression** that restricts the operation to a subset of items to be returned in the response.
For example, the NoSQL Web API <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/getitems.md" >}}</api> operation receives an optional <paramname>{{< xref f="data-layer/reference/web-apis/nosql-web-api/getitems.md" a="req-param-FilterExpression" text="FilterExpression" >}}</paramname> request parameter that defines a condition that determines which items to return.

<!-- //////////////////////////////////////// -->
## Syntax {#syntax}

```
"CONDITION [LOGICAL-OPERATOR CONDITION ...]"
```

A condition expression is a Boolean {{< xref f="data-layer/reference/expressions/overview.md" a="expression" text="expression" >}} that is composed of one or more Boolean expressions (`CONDITION`) that are connected using a {{< xref f="data-layer/reference/expressions/operators/logical-operators.md" a="binary-logical-operators" text="binary logical operator" >}} (`LOGICAL-OPERATOR`) &mdash; {{< xref f="data-layer/reference/expressions/operators/logical-operators.md" a="AND-operator" text="`AND`" >}} or {{< xref f="data-layer/reference/expressions/operators/logical-operators.md" a="OR-operator" text="`OR`" >}}.
The unary logical operator {{< xref f="data-layer/reference/expressions/operators/logical-operators.md" a="NOT-operator" text="`NOT`" >}} can be used to negate a condition.<br/>
A condition can optionally be enclosed within parentheses.

{{< note >}}
If a condition within the expression references an attribute that is not set in the evaluated item, the condition fails (evaluates to `false`).
The result of the entire condition expression depends on the expression's overall logic.
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

1.  Check for "Car" products with less than 15 known bugs:
      ```
      "(bugs < 15) AND starts(Product_Name, 'Car')"
      ```

2.  Check for 40-year-old people whose first names are "John" and are not residents of Arizona or Massachusetts:
      ```
      "(age == 40) and (firstName == 'John') and NOT(State IN ('AZ','MA'))"
      ```
      {{< comment >}}<!-- [c-array-attr-web-api-sup] -->
      {{< /comment >}}

3.  Check whether the value of the third element in an `"intArray"` array attribute equals the sum of the first two elements in the array:
    ```
    "intArray[2] == intArray[0] + intArray[1]"
    ```

4.  Check whether the value of the first or second elements of an `"arr"` array attribute is 7:
    ```
    "arr[0]==7 OR arr[1]==7"
    ```

5.  Check for released adult prisoners who haven't reported to their parole officer:
    ```
    "(age > 18) AND isReleased==true AND reported==false"
    ```
    {{< comment >}}<!-- [c-array-attr-web-api-sup] -->
    {{< /comment >}}

6.  Check whether the first or last five elements of a `"ctrs"` array contain the highest value:
    ```
    "max(ctrs[0..4]) > max(ctrs[5..9])"
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/update-expression.md" >}}
- {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="Attribute Variables" >}}

