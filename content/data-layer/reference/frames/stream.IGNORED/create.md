---
title: "create Method"
keywords: "create method, frames streaming create method, frames stream create method, frames create, frames streaming create, frames stream create, frames client create, frames client streaming create, frames client stream create, streaming backend, frames create reference, frames streaming create reference, frames stream create reference, stream creation, stream shards, sharding, retention period, backend, kw, retention_hours, shards, table"
menu:
  main:
    parent:     "frames-apis-stream"
    identifier: "frames-apis-stream-create"
    weight:     20
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Creates a new {{< product lc >}} data stream .
The stream is available immediately upon its creation.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
create(backend, table, if_exists=FAIL[, **kw])
```

The following syntax statement replaces the <paramname>kw</paramname> parameter with the additional keyword arguments that can be passed for the NoSQL backend via this parameter:
```python
create(backend, table, if_exists=FAIL[shards, retention_hours])
```

{{< frames-syntax-undoc-params-note backend_name="streaming" param="table" >}}
{{< comment >}}<!-- [c-frames-create-schema-param] [IntInfo] See in info in
  frames/tsdb/create.md. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>kw</paramname>](#param-kw) |
[<paramname>if_exists</paramname>](#param-if_exists) |
[<paramname>retention_hours</paramname>](#param-retention_hours) (<paramname>kw</paramname> argument) |
[<paramname>shards</paramname>](#param-shards) (<paramname>kw</paramname> argument) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-collection >}}

  <!-- kw -->
  {{< param-doc name="kw" id="param-kw" >}}
  This parameter is used for passing a variable-length list of additional keyword (named) arguments.
  See the following [kw Arguments](#kw-args) section for a list of additional arguments that are supported for the streaming backend via the <paramname>kw</paramname> parameter.
 
  {{< param-type >}}`**` &mdash; variable-length keyword arguments list{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ---------------------------------------- -->
### kw Arguments {#kw-args}

The streaming backend supports the following <func>create</func> arguments via the [<paramname>kw</paramname>](#param-kw) parameter for passing a variable-length list of additional keyword arguments:

<dl>
  <!-- shards -->
  {{< param-doc name="shards" id="param-shards" >}}
  The number of stream shards to create.

  {{< param-type >}}`int`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A positive integer (>= 1). For example, `100`.
  {{< /param-values >}}
  {{< param-default-value >}}`1`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- retention_hours -->
  {{< param-doc name="retention_hours" id="param-retention_hours" >}}
  The stream's retention period, in hours.

  {{< param-type >}}`int`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A positive integer (>= 1). For example, `2` (2 hours).
  {{< /param-values >}}
  {{< param-default-value >}}`24`{{< /param-default-value >}}
  {{< comment >}}<!-- [ci-param-schds-in-nested-param-doc-extra-spacing] -->
  {{< /comment >}}
  {{< /param-doc >}}
</dl>
 {{< /param-doc >}}

  <!-- if_exists -->
  {{< frames-pb-error-options-param backend_type="strean" backend_name="streaming" param="if_exists" >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="errors" >}}

In case of an error, the method raises a <api>CreateError</api> error.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>create</func> method of the {{< getvar v="product.frames.name.lc" >}} streaming backend:

1. <a id="example-set-shard-count"></a>Create a <path>mystream</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)).
    The stream has 4 shards ([<paramname>shards</paramname>](#param-shards)) and a retention period of 24 hours ([<paramname>retention_hours</paramname>](#param-retention_hours) default):
    ```python
    stream = "mystream"
    client.create(backend="stream", table=stream, shards=4)
    ```

2. <a id="example-set-retention-period"></a>Create a <path>taxi_streams/rides</path> stream in the client's data container.
    The stream has 1 shard ([<paramname>shards</paramname>](#param-shards) default) and a retention period of 2 hours ([<paramname>retention_hours</paramname>](#param-retention_hours)):
    ```python
    stream = "/taxi_streams/rides"
    client.create("stream", table=stream, retention_hours=2)
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/frames/stream/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

