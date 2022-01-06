---
title: "execute Method"
keywords: "execute method, frames streaming execute method, frames stream execute method, frames execute, frames streaming execute, frames stream execute, frames client execute, frames client streaming execute, frames client stream execute, frames execute reference, frames streaming execute reference, frames stream execute reference, frames streaming put, frames stream put, frames put command, put command, frames streaming put record, frames put record, streaming put record, put record, add record, stream record ingestion, record ingestion, partition key, partitions, args, backend, command, table, client_info, data, partition_key"
menu:
  main:
    parent:     "frames-apis-stream"
    identifier: "frames-apis-stream-execute"
    weight:     60
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Executes the specified command.
This method is used to extend the basic functionality of the other client methods.
Currently, the streaming backend supports a [<cmd>put</cmd>](#cmd-put) command for adding a record to a stream shard.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
execute(backend, table, command="", args=None)
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="const-params-n-data-members" >}}

[<paramname>args</paramname>](#param-args) |
[<paramname>backend</paramname>](#param-backend) |
[<paramname>command</paramname>](#param-command) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-collection >}}

  <!-- command -->
  {{< param-doc name="command" id="param-command" >}}
  The command to execute.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< param-values >}}The streaming backend currently supports a <cmd-b id="cmd-put">&quot;put&quot;</cmd-b> command, which adds a single record to a stream shard.
    This command is more efficient than writing a single record with the <func>{{< xref f="data-layer/reference/frames/stream/write.md" text="write" >}}</func> method, because the command is processed without using DataFrames.
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- args -->
  {{< param-doc name="args" id="param-args" >}}
A dictionary of `"<argument name>": <value>` pairs for passing additional backend-specific method parameters (arguments).
  {{< comment >}}<!-- [ci-li-param-xxx-shcds-in-nested-param-doc] Align the
    `param-doc` content with the start of the line to avoid extra space around
    the last li `param-xxx` bullet in the last nested `param-doc`. -->
  {{< /comment >}}

{{< param-type >}}`dict`{{< /param-type >}}
{{< param-req "R" >}}{{< /param-req >}}

<!-- *************** -->
{{< small-heading id="cmd-put-args" >}}put Command Arguments{{< /small-heading >}}

The [<cmd>put</cmd>](#cmd-put) command of the streaming backend supports the following arguments:
{{< comment >}}<!-- [IntInfo] (sharonl) (6.1.20) Tal confirmed that the max-size
  restrictions for the equivalent parameters of the NoSQL Web API PutRecords
  operation apply also to the Frames API. -->
{{< /comment >}}

<dl>
<!-- data -->
{{< param-doc name="data" id="put-arg-data" >}}
The record data.

{{< note id="put-arg-data-notes" >}}
When <paramname>data</paramname> is set to a valid JSON string, <func>{{< xref f="data-layer/reference/frames/stream/read.md" text="read" >}}</func> displays the data in corresponding table columns (similar to the read results for data that was written with the <func>{{< xref f="data-layer/reference/frames/stream/write.md" text="write" >}}</func> method).
If {{< getvar v="product.frames.name.lc" >}} fails to parse the data as a JSON string, <func>read</func> displays the data in a <attr>raw_data</attr> column.
{{< /note >}}
{{< comment >}}<!-- [InfInfo] (sharonl) (5.2.20) I decided there's no need to
  mention here that raw_data is a reserved keyword. It's sufficient that we
  document it in the reserved-names.md reference. -->
{{< /comment >}}

{{< param-type >}}`str`{{< /param-type >}}
{{< param-max-size >}}1 MB{{< /param-max-size >}}
{{< param-req "R" >}}{{< /param-req >}}
{{< /param-doc >}}

<!-- client_info -->
{{< param-doc name="client_info" id="put-arg-client_info" >}}
Custom metadata information for the written record.
You can use this metadata, for example, to save the data format of a record, or the time at which a sensor or application event was triggered.
See {{< xref f="data-layer/stream/" a="record-metadata" text="Record Metadata" >}}.

{{< param-type >}}`str`{{< /param-type >}}
{{< param-max-size >}}128 bits{{< /param-max-size >}}
{{< param-req "O" >}}{{< /param-req >}}
{{< /param-doc >}}

<!-- partition_key -->
{{< param-doc name="partition_key" id="put-arg-partition_key" >}}
A partition key with which to associate the record (see {{< xref f="data-layer/stream/" a="record-metadata" text="Record Metadata" >}}).
Records with the same partition key are assigned to the same shard.
By default, when no partition key is provided, the {{< product lc >}}'s default shard-assignment algorithm is used.
See also {{< xref f="data-layer/stream/" a="stream-sharding-and-partitioning" text="Stream Sharding and Partitioning" >}}.
{{< comment >}}<!-- [InfInfo] (sharonl) (8.12.20) In v3.0.0, the argument was
  renamed, at my request, from "partition" to "partition_key" (PR #575 -
  https://github.com/v3io/frames/pull/575) - see Improvement IG-13700. (The
  initial request is covered in the "Frames API Changes" email thread, copied
  in DOC IG-12272 and DOC IG-14369.) => I updated the doc without a doc ticket,
  as the Frames Streaming backend API is still not documented externally. -->
{{< /comment >}}

{{< param-type >}}`str`{{< /param-type >}}
{{< param-max-size >}}256 bytes{{< /param-max-size >}}
{{< param-req "O" >}}{{< /param-req >}}
{{< /param-doc >}}
</dl>
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

<!-- ---------------------------------------- -->
### put Examples {#examples-put}

Following are examples of using the [<cmd>put</cmd>](#cmd-put) command of the <func>execute</func> method:

1. <a id="put-example-basic-data-w-schema-json"></a>Add a record to a <path>mystream</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)); provide only the mandatory [<paramname>data</paramname>](#put-arg-data) argument.
    Because the [<paramname>partition_key</paramname>](#put-arg-partition_key) argument isn't set, the record will be assigned automatically to one of the stream's shards using the {{< product lc >}}'s default stream-assignment algorithm.
    ```python
    client.execute(backend='stream', table='mystream', command='put',
                   args={'data': '{"col1": "E", "col2": 5, "col3": true}'})
    ```
    {{< comment >}}<!-- [InfInfo] (sharonl) Note that in order to read the data
      as DF columns like for `write` writes with DFs, instead of as a `raw_data`
      column, you need to set `data` to a JSON string using double quotes (")
      and not single quotes (') and Boolean values should be specified using
      lowercase letters (e.g., `true` and not `True` like in Python, used in
      the `write` method). Therefore, I had to embed the `data` string within
      single quotes in this example, and for consistency I decided to use
      single quotes also for the other string parameters.
      The Base64 encdoing of `{"col1": "E", "col2": 5, "col3": true}` is
      "eyJjb2wxIjogIkUiLCAiY29sMiI6IDUsICJjb2wzIjogdHJ1ZX0=". But Frames doesn't
      try to decode the string, so if you write this string, read returns it
      as-is within a `raw_data` column. -->
    {{< /comment >}}

2. <a id="put-example-client_info"></a>Add a record to a <path>taxi_streams/rides</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)); in addition to the mandatory [<paramname>data</paramname>](#put-arg-data) argument, set the [<paramname>client_info</paramname>](#put-arg-client_info) argument to a custom schema name for identifying the schema of the record data:
    ```python
    client.execute("stream", table="mystream", command="put",
                   args={"data": "1, '2019-09-01T00:00:00Z', 2, 42.3, 5",
                         "client_info": "rides_schema"})
    ```
    {{< comment >}}<!-- [IntInfo] (sharonl) Note:
    - I initially wanted to set `client_info` to a schema string like
      '{"driver_id": N, "date": S, "num_rides": N, "total_km": N, "total_passengers": N}'
      or to a columns list like
      "driver_id, date, num_rides, _total_km, total_passengers", but these
      strings exceed the max client-info size (derived from the Streaming Web
      API PutRecords ClientInfo restriction) of 128 bits = 16 bytes <=> 16
      chars.
      Encoding the schema string as a Base64 string produces an even larger
      string. => After also consulting with R&D (Gal & Tal), I decided to use a
      custom schema name ("rides_schema").
    - I thought of setting `data` to a Base64 encoded string, as per the web-API
      requirement, but Gal told me that Frames converts the data string to
      Bsae64 anyway, which means we'll have an inefficient double conversion,
      and it makes the example less clear.
    - Frames doesn't currently provide any way of reading back the client info,
      which makes it not particularly useful unless you read from the stream
      with the web API.
    -->
    {{< /comment >}}

3. <a id="put-example-data-w-schema-json-n-pk"></a>Add two records to a <path>mystream</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)); in addition to the mandatory [<paramname>data</paramname>](#put-arg-data) argument, set the [<paramname>partition_key</paramname>](#put-arg-partition_key) argument for both writes to the same partition-key string to ensure that both records are written to the same stream shard:
    ```python
    client.execute('stream', table="mystream", command='put',
                   args={'data': '{"col1": "G", "col2": 6, "col3": false}',
                        'partition_key': 'pk1'})
    client.execute('stream', table="mystream", command='put',
                   args={'data': '{"col1": "H", "col2": 7, "col3": false}',
                        'partition_key': 'pk1'})
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/frames/stream/write.md" text="write" >}} ({{< getvar v="product.frames.name.lc" >}} streaming backend)
- {{< xref f="data-layer/reference/frames/stream/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

