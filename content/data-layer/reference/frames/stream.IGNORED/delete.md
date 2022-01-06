---
title: "delete Method"
keywords: "delete method, frames streaming delete method, frames stream delete method, frames delete, frames streaming delete, frames stream delete, frames client delete, frames client streaming delete, frames client stream delete, streaming backend, frames delete reference, frames streaming delete reference, frames stream delete reference, deleting streams, backend, if_missing, table, IGNORE, fpb.IGNORE"
menu:
  main:
    parent:     "frames-apis-stream"
    identifier: "frames-apis-stream-delete"
    weight:     50
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Deletes a data stream.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
delete(backend, table)
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>if_missing</paramname>](#param-if_missing) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-collection >}}

  <!-- if_missing -->
  {{< frames-pb-error-options-param backend_type="stream" backend_name="streaming" param="if_missing" >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="errors" >}}

In case of an error, the method raises a <api>DeleteError</api> error.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>delete</func> method of the {{< getvar v="product.frames.name.lc" >}} streaming backend:

1. <a id="example-basic"></a>Delete a <path>mystream</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)):
    ```python
    stream = "mystream"
    client.delete(backend="stream", table=stream)
    ```

2. <a id="example-if_missing-ignore"></a>Delete a <path>taxi_streams/rides</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)); don't raise an error if the stream doesn't exist ([<paramname>if_missing</paramname>](#param-if_missing) = <opt>IGNORE</opt>):
    ```python
    from {{% getvar v="product.frames.client.lib_name" %}} import frames_pb2 as fpb
    stream = "/taxi_streams/rides"
    client.delete("delete", table=stream, if_missing=fpb.IGNORE)
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/stream/" a="deleting-streams" text="Deleting Streams" >}}
- {{< xref f="data-layer/reference/frames/stream/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

