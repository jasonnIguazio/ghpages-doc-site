---
title: "write Method"
keywords: "write method, frames streaming write method, frames stream write method, frames write, frames streaming write, frames stream write, frames client write, frames client streaming write, frames client stream write, streaming backend, frames write reference, frames streaming write reference, frames stream write reference, stream ingestion, data ingestion, records ingestion, stream records, backend, dfs, max_rows_in_msg, table"
menu:
  main:
    parent:     "frames-apis-stream"
    identifier: "frames-apis-stream-write"
    weight:     30
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Writes (ingests) records from pandas DataFrames to a stream.

{{< note id="execute-put-cmd-note" >}}
You can also add records to a stream by using the {{< xref f="data-layer/reference/frames/stream/execute.md" text="execute" a="cmd-put" text="<cmd>put</cmd>" >}} command of the streaming backend's <func>execute</func> client method.
This command can only be used to write a single record at at at time (unlike the <func>write</func> method, which supports batch writes).
However, using the <cmd>put</cmd> command is more efficient than writing a single record with the <func>write</func> method, because the command is processed without using DataFrames.
The command also allows you to optionally add custom record metadata and provide a partition key to influence the shard assignment.
{{< comment >}}<!-- [c-frames-stream-write-put-api-changes] (sharonl) see
  the related [IntInfo] in data-layer/reference/frames/stream/overview.md. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
write(backend, table, dfs,[ max_rows_in_msg=0])
```
{{< comment >}}<!-- [c-frames-stream-index-cols] [InfInfo] (sharonl) (26.11.19)
  I confirmed with Tal that the `write` index_cols parameter isn't relevant to
  the `stream` backend (similar to a manual definition of a written DF column
  as an index column). In reads, the record sequence number is returned as a
  DF index column. -->
{{< /comment >}}

{{< frames-syntax-undoc-params-note backend_name="streaming" param="dfs" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>dfs</paramname>](#param-dfs) |
[<paramname>max_rows_in_msg</paramname>](#param-max_rows_in_msg) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-collection >}}

  <!-- dfs -->
  {{< param-doc name="dfs" id="param-dfs" >}}One or more DataFrames containing the data to write.
  {{< note id="param-dfs-notes" >}}
- <a id="index-col-note"></a>The <func>write</func> method for the streaming backend doesn't attach any special significance to index columns in the written DataFrames.
    As part of the write operation, {{< getvar v="product.frames.name.lc" >}} assigns a sequence number to the written stream record and sets the record's {{< xref f="data-layer/objects/object-names-and-keys/" text="primary-key attribute (name)" >}} to this sequence number.
    When reading stream data, each returned DataFrame has a <attr>seq_number</attr> index column that contains the record's sequence number (as well as a regular <attr>stream_time</attr> column that contains the record's ingestion time); see the {{< xref f="data-layer/reference/frames/stream/read.md" a="retval" text="return value" >}} of the <func>read</func> method.
- <a id="max-df-size-note"></a>See the maximum write DataFrame size {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="frames-max-write-df-size" text="restriction" >}}.
    If you need to write a larger amount of data, use multiple DataFrames.
  {{< /note >}}

  {{< param-type >}}A single DataFrame, a list of DataFrames, or a DataFrames iterator{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- max_rows_in_msg -->
  {{% include f="frames-write-param-max-rows-in-msg.md" %}}
  {{< comment >}}<!-- [ci-include-w-param-xxx] -->
  {{< /comment >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>write</func> method of the {{< getvar v="product.frames.name.lc" >}} streaming backend:

1. <a id="example-basic-dfs-list"></a>Write a list of stream-records DataFrames to a <path>mystream</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)).
    ```python
    stream = "mystream"
    attrs = ["col1", "col2", "col3"]
    dfs = [
           pd.DataFrame([["A", 1, True]], columns=attrs),
           pd.DataFrame([["B", 2, False]], columns=attrs),
           pd.DataFrame([["C", 3, True]], columns=attrs),
           pd.DataFrame([["D", 4, False]], columns=attrs)
    ]
    client.write(backend="stream", table=stream, dfs=dfs)
    ```

2. <a id="example-basic-single-df"></a>Write a single stream-records DataFrame to a <path>taxi_streams/rides</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)):
    ```python
    from datetime import datetime
    stream = "/taxi_streams/rides"
    data = [
            [24, pd.datetime(2019, 7, 1),  8, 332.0, 18],
            [24, pd.datetime(2019, 7, 2),  5, 260.0, 11],
            [24, pd.datetime(2019, 8, 1),  7, 352.1, 21],
            [1,  pd.datetime(2019, 7, 1), 25, 125.0, 40],
            [1,  pd.datetime(2019, 7, 2), 20, 106.0, 46],
            [1,  pd.datetime(2019, 8, 1), 28, 106.4, 42],
            [16, pd.datetime(2019, 7, 1),  0,   0.0,  0],
            [6,  pd.datetime(2019, 7, 2), 10, 244.0, 45],
            [16, pd.datetime(2019, 8, 1),  6, 193.2, 24]
    ]
    attrs = ["driver_id", "date", "num_rides", "total_km", "total_passengers"]
    df = pd.DataFrame(data, columns=attrs)
    client.write("stream", table=stream, dfs=df)
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/frames/stream/execute.md" text="execute" a="cmd-put" text="<func>execute</func> <cmd>put</cmd> command" >}} ({{< getvar v="product.frames.name.lc" >}} streaming backend)
- {{< xref f="data-layer/reference/frames/stream/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

