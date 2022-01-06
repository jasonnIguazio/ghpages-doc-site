---
title: "Update Expression"
keywords: "update expressions, update items, add items, delete items, remove items, UpdateItem, UpdateExpression, AlternateUpdateExpression, nosql, nosql web api, nosql, table items, attributes, add attributes, delete attributes, remove attributes, counter attributes, increment attributes, expression types, SET expressions, REMOVE expressions, ACTION, KEYWORD, SET keyword, REMOVE keyword, if_not_exists, if-then, if-then-else, techpreview, tech preview, arrays, array attributes, array slices, blob attributes, blob, array operator, [] operator, Fibonacci"
menu:
  main:
    parent:       "expressions"
    identifier:   "expressions-update-expression"
    weight:       30
---
{{< comment >}}<!-- [IntInfo] (sharonl) This page is referenced from the
  V3IO Frames (https://github.com/v3io/frames/) and V3IO Tutorials
  (https://github.com/v3io/tutorials/) docs. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

An **update expression** is an expression that is used to update the attributes of an item.
This includes adding attributes and initializing their values, changing the value of existing attributes, or removing (deleting) item attributes.
For example, the NoSQL Web API <api>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" >}}</api> operation receives an update-expression request parameter (<paramname>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" a="req-param-UpdateExpression" text="UpdateExpression" >}}</paramname>), and optionally also an alternate update-expression parameter for an if-then-else update (<paramname>{{< xref f="data-layer/reference/web-apis/nosql-web-api/updateitem.md" a="req-param-AlternateUpdateExpression" text="AlternateUpdateExpression" >}}</paramname>), that define which item attributes to update and how to update them.

{{< note title="Arrays Support" id="arrays-support-note" >}}
In the current release, the support for array attributes and the use of array operators and functions in expressions is restricted to the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
{{< comment >}}<!-- [c-array-attr-web-api-sup] [IntInfo] (sharonl) (1.6.20) See
  info in reference/attribute-data-types.md #array-attributes / DOC IG-13731.
-->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Syntax {#syntax}

```
KEYWORD ACTION[; KEYWORD ACTION; ...]
```

An update expression is composed of one or more update-action expressions, each made up of an action keyword (`KEYWORD`) followed by a matching action expression (`ACTION`).
(In some cases, the keyword can be omitted, as outlined in the documentation.)
The action expressions are separated by semicolons (`;`).
Spaces around the semicolons are ignored.
The last update-action expression can optionally be terminated with a semicolon as well.

{{< note id="reserved-names-note" >}}
Expression keywords are reserved names in the {{< product lc >}}.
For more information, see {{< xref f="data-layer/reference/reserved-names.md" >}}.
{{< /note >}}

The following update expression types are supported:

- [SET](#SET-expression) expression &mdash; sets the value of an item attribute (including creation of the attribute if it doesn't already exist) or of an element in an array attribute.
    {{< comment >}}<!-- [c-array-attr-web-api-sup] -->
    {{< /comment >}}
- [REMOVE](#REMOVE-expression) expression &mdash; removes (deletes) an item attribute.

<!-- ======================================== -->
### SET Expression {#SET-expression}

```
SET ELEMENT = VALUE
```

A SET expression updates the value of an attribute or an element in an array attribute.
When updating an attribute that isn't already found in the updated item, the {{< product lc >}} creates the attribute and initializes it to the specified value.
{{< comment >}}<!-- [c-array-attr-web-api-sup] -->
{{< /comment >}}

A SET expression can optionally begin with the <api>SET</api> keyword, which is the default keyword for assignment expressions.
The expression contains an assignment expression that consists of an {{< xref f="data-layer/reference/expressions/operators/assignment-operator.md" text="assignment operator" >}} (`=`) whose operands are the updated element (`ELEMENT`) &mdash; an attribute (`ATTRIBUTE`), a slice of an array attribute (<nobr><code>ATTRIBUTE[i<sub>start</sub>..i<sub>end</sub>]</code></nobr>), or an element of an array attribute (`ATTRIBUTE[i]`) &mdash; and the value to assign (`VALUE`).
`VALUE` can also be an expression that evaluates to the value to assign &mdash; for example, <nobr>`"SET myattr = 4 + 5;"`</nobr>.
{{< comment >}}<!-- [c-array-attr-web-api-sup] -->
{{< /comment >}}

{{< note id="blob-attr-assignment-note" >}}
In the current release, you cannot directly assign Base64 encoded strings to blob attributes in expressions.
However, you can define and update blob array attributes in expressions &mdash; see {{< xref f="data-layer/reference/expressions/overview.md" a="array-attribute-expression-variables" text="Array-Attribute Expression Variables" >}}.
{{< comment >}}<!-- [c-array-attr-web-api-sup] -->
{{< /comment >}}
{{< /note >}}

<!-- ======================================== -->
### REMOVE Expression {#REMOVE-expression}

```
REMOVE ATTRIBUTE
```

A REMOVE expression removes an attribute from an item (i.e., deletes the attribute).

The expression begins with the <api>REMOVE</api> keyword followed by the name of the attribute to remove (`ATTRIBUTE`).

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

1.  Increment the current value of an existing <attr>miles</attr> attribute by 1000:
    ```
    "SET miles = miles + 1000"
    ```

2.  Remove an item's <attr>miles</attr> attribute:
    ```
    "REMOVE miles"
    ```

3.  Update the values of two grocery-department income attributes (<attr>produce</attr> and <attr>dairy</attr>), and set the value of a <attr>sum</attr> attribute to the sum of the updated department-income attribute values:
    ```
    "produce=20000; dairy=15000; sum = produce + dairy"
    ```

4.  Set the value of a <attr>rainbow</attr> string attribute:
    ```
    "SET rainbow='red, orange, yellow, green, blue, indigo, violet'"
    ```

5.  Initialize multiple attributes of different types in a person item:
    ```
    "SET name='Alexander Bell'; country='Scotland'; isMarried=true; numChildren=4"
    ```

6.  Add and initialize a <attr>ctr</attr> counter attribute to 1 if it doesn't already exist; if the attribute exists, increment its value by 1 (see  {{< xref f="data-layer/reference/expressions/functions/exists-n-not-exists-functions.md" a="if_not_exists" text="<func>if_not_exists</func>" >}}):
    ```
    "SET ctr = if_not_exists(ctr,0) + 1;"
    ```

7.  Add new attributes to an item and initialize their values; if the attributes already exist, they will be reassigned their current values (see  {{< xref f="data-layer/reference/expressions/functions/exists-n-not-exists-functions.md" a="if_not_exists" text="<func>if_not_exists</func>" >}}):
    ```
    "SET color = if_not_exists(color, 'red'); SET updated = if_not_exists(updated, true)"
    ```

8.  Switch the values of two attributes (<attr>a</attr> and <attr>b</attr>) using a temporary <attr>temp</attr> attribute, and then delete the temporary attribute.
    Attributes <attr>a</attr> and <attr>b</attr> must already be defined for the item:
    ```
    "temp=b; b=a; a=temp; REMOVE temp"
    ```
    {{< comment >}}<!-- [c-array-attr-web-api-sup] Array examples -->
    {{< /comment >}}

9.  Create a new <attr>counters</attr> integer array attribute with five elements, all initialized by default to zero:
    ```
    "SET counters = init_array(5, 'int')"
    ```

10. Create a new <attr>smallArray</attr> array attribute from the first five elements of an existing <attr>myArray</attr> array attribute:
    ```
    "smallArray = myArray[0..4]"
    ```

11. Update the values of the first four elements of an <attr>arr</attr> array attribute.
    The fourth attribute (at index 3) is assigned the result of an arithmetic expression that uses the updated values of the first three array elements:
    ```
    "arr[2]=-1; arr[0]=6; arr[1]=7; arr[3]=arr[0]+arr[2]*arr[1]"
    ```

12. Define an <attr>arrSmallFibonacci</attr> integer array attribute of five elements that implements a small Fibonacci series in which each element (beginning with the third element) is the sum of the previous two elements; (the value of the first element, at index 0, is 0 &mdash; <func>{{< xref f="data-layer/reference/expressions/functions/array-functions.md" a="init_array" text="init_array" >}}</func> default):
    ```
    "arrSmallFibonacci = init_array(5, 'int'); arrSmallFibonacci[1]=1; arrSmallFibonacci[2] = arrSmallFibonacci[0] + arrSmallFibonacci[1]; arrSmallFibonacci[3] = arrSmallFibonacci[1] + arrSmallFibonacci[2]; arrSmallFibonacci[4] = arrSmallFibonacci[2] + arrSmallFibonacci[3];"
    ```
    {{< comment >}}<!-- [c-array-attr-web-api-sup] -->
    {{< /comment >}}

13. Define an <attr>arrFibonacci</attr> integer array attribute of 100 elements and an <attr>i</attr> loop-iterator number attribute, and use the attributes to implement a Fibonacci series in which each element (beginning with the third element) is the sum of the previous two elements.

    1.  Define the attributes and initialize the values of <attr>i</attr> and of the first three elements of the <attr>arrFibonacci</attr> array; (the initialization to 0 of the first element, at index 0, could have been omitted because it's the default <func>{{< xref filter="arrays" filterval="true" f="data-layer/reference/expressions/functions/array-functions.md" a="init_array" text="init_array" >}}</func> value):
        ```
        "i=2; arrFibonacci = init_array(100,'int'); arrFibonacci[0]=0; arrFibonacci[1]=1; arrFibonacci[2] = arrFibonacci[0] + arrFibonacci[1]"
        ```

    2.  Repeatedly update the item using the following update expression to sequentially update the series elements in the array (starting from the fourth element at index 3):
        ```
        "i=i+1; arrFibonacci[i] = arrFibonacci[i-1] + arrFibonacci[i-2];"
        ```
        You can use a {{< xref f="data-layer/reference/expressions/condition-expression.md" text="condition expression" >}} to set the maximum number of array elements to update.
        For example, the following expression limits the update to 55 elements:
        ```
        "i<55"
        ```

    3.  At the end, you can optionally use a REMOVE update expression to delete the <attr>i</attr> attribute:
        ```
        "REMOVE i"
        ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/expressions/condition-expression.md" >}}
- {{< xref f="data-layer/reference/expressions/overview.md" a="attribute-variables" text="Attribute Variables" >}}
- {{< xref f="data-layer/reference/expressions/operators/assignment-operator.md" >}}
- {{< xref f="data-layer/reference/expressions/operators/array-operator.md" >}}
- {{< xref f="data-layer/reference/expressions/functions/array-functions.md" >}}
- {{< xref f="data-layer/reference/reserved-names.md" >}}

