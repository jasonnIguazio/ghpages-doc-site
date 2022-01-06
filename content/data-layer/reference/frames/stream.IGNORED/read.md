---
title: "read Method"
keywords: "read method, frames streaming read method, frames stream read method, frames read, frames streaming read, frames stream read, frames client read, frames client streaming read, frames client stream read, streaming backend, frames read reference, frames streaming read reference, frames stream read reference, stream consumption, data consumption, records consumption, stream records, backend, kw, max_rows_in_msg, seek, table"
menu:
  main:
    parent:     "frames-apis-stream"
    identifier: "frames-apis-stream-read"
    weight:     40
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Reads (consumes) records from a stream into pandas DataFrames.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
read(backend, table=''[, max_rows_in_msg=0, iterator=False], **kw)
```

The following syntax statement replaces the <paramname>kw</paramname> parameter with the additional keyword arguments that can be passed for the streaming backend via this parameter:
```python
read(backend, table=''[, max_rows_in_msg=0, iterator=False], shard_id, seek,
    sequence, start)
```

{{< frames-syntax-undoc-params-note backend_name="streaming" param="table" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>kw</paramname>](#param-kw) |
[<paramname>max_rows_in_msg</paramname>](#param-max_rows_in_msg) |
[<paramname>seek</paramname>](#param-seek) (<paramname>kw</paramname> argument) |
[<paramname>sequence</paramname>](#param-sequence) (<paramname>kw</paramname> argument) |
[<paramname>shard_id</paramname>](#param-shard_id) (<paramname>kw</paramname> argument) |
[<paramname>start</paramname>](#param-start) (<paramname>kw</paramname> argument) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="stream" backend_name="streaming" >}}
  {{< /frames-param-collection >}}

  <!-- iterator  -->
  {{< param-doc name="iterator" id="param-iterator" >}}
  Determines whether to return a pandas DataFrames iterator or a single DataFrame:
  `True` &mdash; return a DataFrames iterator; `False` (default) &mdash; return a single DataFrame.
  {{< comment >}}<!-- [ci-bullets-in-param-doc-desc] [InfraInfo] (sharonl) I
    didn't use a bulleted list because the bullets seem to be part of a single
    list with the param-xxx bullets below. -->
  {{< /comment >}}

  {{< param-type >}}`bool`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}`True` | `False`{{< /param-values >}}
  {{< param-default-value >}}`False` (return a single DataFrame){{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- max_rows_in_msg -->
  {{< param-doc name="max_rows_in_msg" id="param-max_rows_in_msg" >}}
  The maximum number of records (rows) to read in each message (i.e., the size of the read chunks).
  <br/>
  When <func>read</func> returns a DataFrames iterator (when the [<paramname>iterator</paramname>](#param-iterator) parameter is set to `True`), the size each of the returned DataFrames is the configured message size.

  {{< param-type >}}`int`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`1024`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- kw -->
  {{< param-doc name="kw" id="param-kw" >}}
  This parameter is used for passing a variable-length list of additional keyword (named) arguments.
  See the following [kw Arguments](#kw-args) section for a list of additional arguments that are supported for the streaming backend via the <paramname>kw</paramname> parameter.
 
  {{< param-type >}}`**` &mdash; variable-length keyword arguments list{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
</dl>

<!-- ---------------------------------------- -->
### kw Arguments {#kw-args}

The streaming backend supports the following <func>read</func> arguments via the [<paramname>kw</paramname>](#param-kw) parameter for passing a variable-length list of additional keyword arguments:

<dl>
  <!-- shard_id -->
  {{< param-doc name="shard_id" id="param-shard_id" >}}
  The ID of the stream shard from which to read.<br/>

  {{< param-type >}}`str`{{< /param-type >}}
    {{< comment >}}<!-- [c-frames-read-stream-shard_id-type] [IntInfo]
      (sharonl) (5.12.19) Tal confirmed that it would make more sense if the
      parameter type was an integer (int64/int). I added this to my list of
      suggested Frames API improvements. -->
    {{< /comment >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< param-values >}}`"0"` ... `"<stream shard count> - 1"`
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- seek -->
  {{< param-doc name="seek" id="param-seek" >}}
  The seek type, which determines the location within the specified stream [shard](#param-shard_id) from which to start reading.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< param-values >}}

  - <a id="seek-type-earliest"></a><def>"earliest"</def> &mdash; the location of the earliest ingested record in the shard.
  - <a id="seek-type-latest"></a><def>"latest"</def> &mdash; the location of the end of the shard.
      {{< comment >}}<!-- [IntInfo] (sharonl) (5.12.19) The code also supports
        a `"late"` string but I decided not to document it. See the v3io/frames
        backends/stream/reader.go file. (It also wasn't documented in the
        Frames GitHub README, which did document both `"seq"` and
        `"sequence"`.) -->
      {{< /comment >}}
  - <a id="seek-type-sequence"></a><def>"seq" | "sequence"</def> &mdash; the location of the record whose sequence number is specified in the [<paramname>sequence</paramname>](#param-sequence) parameter.
  - <a id="seek-type-time"></a><def>"time"</def> &mdash; the location of the earliest ingested record in the shard starting at the time specified in the [<paramname>start</paramname>](#param-start) parameter.
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- sequence -->
  {{< param-doc name="sequence" id="param-sequence" >}}
  For a seek by record sequence number ([<paramname>seek</paramname>](#param-seek) = [`"sequence"`](#seek-type-sequence)) &mdash; the sequence number of the record from which to start reading.
  {{< /comment >}}

  {{< param-type >}}`int64`{{< /param-type >}}
  {{< param-req "R" >}} when the value of the [<paramname>seek</paramname>](#param-seek) parameter is [`"sequence"`](#seek-type-sequence){{< /param-req >}}
  {{< param-values >}}`1` ... `<n>`
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- start -->
  {{< param-doc name="start" id="param-start" >}}
  For a seek by time ([<paramname>seek</paramname>](#param-seek) = [`"time"`](#seek-type-time)) &mdash; the record ingestion time from which to start reading (i.e., read only records that were ingested into the stream at or after the specified time).
  {{< /comment >}}

  {{< param-type >}}`int64`{{< /param-type >}}
  {{< param-req "R" >}} when the value of the [<paramname>seek</paramname>](#param-seek) parameter is [`"time"`](#seek-type-time){{< /param-req >}}
  {{< param-values >}}A string containing an RFC 3339 time, a Unix timestamp in milliseconds, a relative time of the format `"now"` or `"now-[0-9]+[mhd]"` (where `m` = minutes, `h` = hours, and `'d'` = days), or 0 for the earliest time.
  For example: `"2019-09-26T14:10:20Z"`; `"1569507020"`; `"now-3h"`; `"now-7d"`.
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="retval" >}}

- When the value of the [<paramname>iterator</paramname>](#param-iterator) parameter is `True` &mdash; returns a pandas DataFrames iterator.
- When the value of the [<paramname>iterator</paramname>](#param-iterator) parameter is `False` (default) &mdash; returns a single pandas DataFrame.
{{< comment >}}<!-- [c-frames-read-df-labels] [IntInfo] See info in
  frames/tsdb/read.md regarding the returned `labels` metadata
  column and why it's currently undocumented. -->
{{< /comment >}}

Each row in the returned DataFrame represents a stream record.
The DataFrame has the following columns (attributes):

- An index column named <attr>seq_number</attr> that contains the record's sequence number
- A regular column named <attr>stream_time</attr> that contains the time at which the data was ingested into the stream (as a Unix timestamp)
- Regular columns that contain the record data

{{< note id="reserved-attr-names-note" >}}
If you intend to read streams with {{< getvar v="product.frames.name.lc" >}}, don't include attributes named <attr>seq_number</attr> or <attr>stream_time</attr> in your stream records.
See {{< xref f="data-layer/reference/reserved-names.md" >}}.
{{< comment >}}<!-- [c-reserved-attr-names-frames-stream] [IntInfo] (sharonl)
  I added the note in consultation with Tal, after I found that if you include
  a regular `seq_number` or `stream_time` column in the `write` DF and then
  read it with the Frames `read` method, there's no error but the DF returned
  by `read` has only the "auto generated" columns and not the ingested ones.
-->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>read</func> method of the {{< getvar v="product.frames.name.lc" >}} streaming backend:

1. <a id="example-basic-seek-earliest-multi-shards-ret-single-df"></a>Read all records ([<paramname>seek</paramname>](#param-seek) = `"earliest"`) from the first 4 shards of a <path>mystream</path> stream in the client's data container ([<paramname>table</paramname>](#param-table)) into a single DataFrame (default [<paramname>iterator</paramname>](#param-iterator) value = `False`):
    ```python
    stream = "mystream"
    for shard_id in range(4):
        id_str = str(shard_id)
        df = client.read(backend="stream", table=stream, seek="earliest",
                         shard_id=id_str)
        print("Shard #" + id_str + " Records")
        display(df)
    ```

2. <a id="example-seek-start-time-ret-single-df"></a>Read from the first shard ([<paramname>shard_id</paramname>](#param-shard_id) = `"0"`) of a <path>taxi_streams/rides</path> stream the client's data container ([<paramname>table</paramname>](#param-table)) into a single DataFrame (default [<paramname>iterator</paramname>](#param-iterator) value = `False`).
    Read only records that were ingested into the stream during the last week ([<paramname>seek</paramname>](#param-seek) = [`"time"`](#seek-type-time) and [<paramname>start</paramname>](#param-start) = `now-7d`):
    ```python
    stream = "/taxi_streams/rides"
    df = client.read("stream", table=stream, shard_id="0", seek="time",
                     start="now-7d")
    display(df)
    ```

3. <a id="example-seek-record-sequence-num-ret-df-iter"></a>Read from the same stream shard as in [Example 2](#example-seek-start-time-ret-single-df) (first shard in <path>taxi_streams/rides</path>) but return the results in a DataFrame iterator ([<paramname>iterator</paramname>](#param-iterator) = `True`) and start reading from the record whose sequence number is 5 ([<paramname>seek</paramname>](#param-seek) = [`"sequence"`](#seek-type-sequence) and [<paramname>sequence</paramname>](#param-sequence) = `5`):
    ```python
    stream = "/taxi_streams/rides"
    dfs = client.read("stream", table=stream, shard_id="0", seek="sequence",
                      sequence=5, iterator=True)
    for df in dfs:
        display(df)
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/frames/stream/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

