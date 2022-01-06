---
title: "read Method"
keywords: "read method, frames tsdb read method, frames read, frames tsdb read, frames client read, frames client tsdb read, frames read reference, frames tsdb read reference, tsdb ingestion, data ingestion, TSDB metrics, TSDB labels, pandas DataFrames, DataFrames index columns, aggregation, TSDB aggregation, aggregation functions, aggregation step, aggregation interval, aggregation window, pre-aggregation, label aggregation, interpolation, interpolation functions, interpolation tolerance, aggregators, aggregation_window, backend, columns, end, filter, kw, multi_index, query, start, step, table, next, prev, linear, none"
menu:
  main:
    parent:     "frames-apis-tsdb"
    identifier: "frames-apis-tsdb-read"
    weight:     40
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
<!-- [c-tsdb-unsupported-tp-features-frames] [IntInfo] (sharonl) (5.4.20)
  I removed documentation of Tech Preview features that it was decided not to
  document - including SQL queries and cross-series aggregation via the `query`
  parameter and configuration of a sliding aggregation window via the
  `aggregation_window` parameter (`aggregationWindow` in v2.5 - see IG-14367) +
  the interpolation doc, which was already filtered out of the doc build - and
  I removed the examples of unsupported features. See more info in
  data-layer/reference/frames/tsdb/_index.md.
  Note that the changes in this file also included updating the method syntax.
  [TECH-PREVIEW-FRAMES-TSDB-AGGR-WINDOW] [TECH-PREVIEW-TSDB-AGGR-WINDOW]
  [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR] [TECH-PREVIEW-TSDB-SQL-QUERIES]
  [TECH-PREVIEW-TSDB-INTERPOLATION] [TECH-PREVIEW-TSDB-GROUP_BY] -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Reads (consumes) data from a TSDB table into pandas DataFrames.

<!-- ---------------------------------------- -->
{{< small-heading id="aggregation-queries" >}}Aggregation Queries{{< /small-heading >}}

A TSDB query can include **aggregation functions** (**"aggregators"**) to apply to the sample metrics; for a list of the supported aggregation functions, see the description of the [<paramname>aggregators</paramname>](#param-aggregators) parameter.
To create an aggregation query, set the <func>read</func> method's [<paramname>aggregators</paramname>](#param-aggregators) parameter to a list of aggregation functions.
Each function is applied to all metrics configured for the query (see the [<paramname>columns</paramname>](#param-columns) parameter).

<a id="over-time-aggregation"></a>The {{< getvar v="product.frames.name.lc" >}} TSDB backend currently supports **"over-time aggregation"**, which aggregates the data for unique metric label sets over time, and returns a separate aggregation time series for each label set.

<a id="def-aggr-step"></a>The aggregation is done at each **aggregation step** (a.k.a., **aggregation interval**) &mdash; the time interval for executing the aggregation functions over the query's time range; the step determines the aggregation data points, starting at the query's start time.
The default step is the query's time range (which can be configured via the [<paramname>start</paramname>](#param-start) and [<paramname>end</paramname>](#param-end) parameters).
You can override the default aggregation step by setting the [<paramname>step</paramname>](#param-step) parameter.

<a id="def-aggr-window"></a>The aggregation is applied to all sample data within the query's **aggregation window**, which currently always equals the query's aggregation step.
For example, for an aggregation step of 1 hour, the aggregation at step 10:00 is done for an aggregation window of 10:00&ndash;11:00.

{{< note id="aggregation-query-notes" title="Pre-Aggregation Note" >}}
<a id="pre-aggregation"></a>When creating a TSDB table, you can optionally configure **pre-aggregates** that will be calculated for all metric samples as part of their ingestion into the TSDB table.
For each aggregation request in an over-time aggregation query, if the TSDB table has matching pre-aggregated data (same aggregation function and the query's aggregation window is a sufficient multiplier of the table's aggregation granularity), the pre-aggregated data is used instead of performing a new aggregation calculation, which speeds up the query processing.
For more information about pre-aggregation and how to configure it, see the description of the <func>create</func> method's <paramname>{{< xref f="data-layer/reference/frames/tsdb/create.md" a="param-aggregates" text="aggregates" >}}</paramname> argument.
{{< comment >}}<!-- [IntInfo] (sharonl) See the info for the `create` method's
  `aggregates` keyword argument (passed via the `kw` parameter), including
  [c-tsdb-cond-for-applying-pre-aggregates]. -->
{{< /comment >}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
read(backend[, table='', columns=None, filter='', max_rows_in_msg=0,
    iterator=False, **kw])
```

The following syntax statement replaces the <paramname>kw</paramname> parameter with the additional keyword arguments that can be passed for the TSDB backend via this parameter:
```python
read(backend[, table='', columns=None, filter='', max_rows_in_msg=0,
    iterator=False, start, end, aggregators, step, multi_index])
```

{{< frames-syntax-undoc-params-note backend_name="TSDB" param="table" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>aggregators</paramname>](#param-aggregators) (<paramname>kw</paramname> argument) |
[<paramname>backend</paramname>](#param-backend) |
[<paramname>columns</paramname>](#param-columns) |
[<paramname>end</paramname>](#param-end) (<paramname>kw</paramname> argument) |
[<paramname>filter</paramname>](#param-filter) |
[<paramname>kw</paramname>](#param-kw) |
[<paramname>multi_index</paramname>](#param-multi_index) (<paramname>kw</paramname> argument) |
[<paramname>start</paramname>](#param-start) (<paramname>kw</paramname> argument) |
[<paramname>step</paramname>](#param-step) (<paramname>kw</paramname> argument) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-collection >}}

  <!-- iterator -->
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

  <!-- columns -->
  {{< param-doc name="columns" id="param-columns" >}}
  A list of metric names to which to apply the query.
  For example, `["cpu", "temperature", "disk"]`.
  By default, the query is applied to all metrics in the TSDB table.
  {{< note id="param-columns-notes" >}}
- Queries with multiple metric names is currently supported only as {{< techpreview >}}.
- You can restrict the metrics list for the query within the query filter, as explained for [<paramname>filter</paramname>](#param-filter) parameter.
  {{< /note >}}
  {{< comment >}}<!-- [TECH-PREVIEW-TSDB-MULTI-METRICS] [IntInfo] (sharonl) See
    v2.0.0 Tech Preview TSDB Requirement IG-10174 / DOC IG-10178.
    (17.12.19) Dana told me that QA tested multi-column queries using the
    `columns` param for Frames, but she didn't know to what extent; she said it
    might have only been basic tests because this is a TP TSDB feature. Note
    that we use multiple metrics in the Frames v3io/tutorials getting-started
    Jupyter NB. (31.5.20) Marked as Tech Preview for v2.8.0 (in v2.5 Frames as
    a whole is Tech Preview). I think Adi might have also edited the Frames GS
    tutorial NB to remove the use of Tech Preview features such as this. =>
    (18.10.20) Multi-metric Frames TSDB read queries are still Tech Preview in
    v2.10.0 (only partially tested by QA). I verified that the v3io/tutorials
    Frames NB for v2.10.0 doesn't use this feature. (7.3.21) Still Tech Preview
    also in v3.0.0. => [V3.1.0-TODO] Follow up with QA & Orit. -->
  {{< /comment >}}

  {{< param-type >}}`[]str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- filter -->
  {{< param-doc name="filter" id="param-filter" >}}
  A {{< product lc >}} filter expression that restricts the information that will be returned.
  See {{< xref f="data-layer/reference/expressions/condition-expression.md" a="filter-expression" text="Filter Expression" >}} for syntax details and examples.
  <br/>
  The filter is typically applied to metric labels; for example, `"os=='linux' AND arch=='amd64'"`.
  <br/>
  You can also apply the filter to the <attr>_name</attr> attribute, which stores the metric name.
  This is less efficient than specifying the metric names in the [<paramname>columns</paramname>](#param-columns) parameter, but it might be useful in some cases.
  For example, if you have many "cpu&lt;n&gt;" metrics, you can use `"starts(_name,'cpu')"` in your filter expression to apply the query to all metrics (or all metrics specified in the <paramname>columns</paramname> parameter, if set) whose names begin with the string "cpu".
  {{< note id="param-filter-notes" >}}
<a id="tsdb-string-labels-note"></a>Currently, only labels of type string are supported; see the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb-labels" >}}.
Therefore, ensure that you embed label attribute values in your filter expression within quotation marks even when the values represent a number (for example, <nobr>"`node == '1'`"</nobr>), and don't apply arithmetic operators to such attributes (unless you want to perform a lexicographic string comparison).
{{< /note >}}
{{< comment >}}
<!-- [c-tsdb-label-types-string] -->
{{< /comment >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- kw -->
  {{< param-doc name="kw" id="param-kw" >}}
  This parameter is used for passing a variable-length list of additional keyword (named) arguments.
  See the following [kw Arguments](#kw-args) section for a list of additional arguments that are supported for the TSDB backend via the <paramname>kw</paramname> parameter.
 
  {{< param-type >}}`**` &mdash; variable-length keyword arguments list{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ---------------------------------------- -->
### kw Arguments {#kw-args}

The TSDB backend supports the following <func>read</func> arguments via the [<paramname>kw</paramname>](#param-kw) parameter for passing a variable-length list of additional keyword arguments:

<dl>
  <!-- start -->
  {{< param-doc name="start" id="param-start" >}}
  The query's start time &mdash; the earliest sample time to query: read only items whose data sample time is at or after (`>=`) the specified start time.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string containing an RFC 3339 time, a Unix timestamp in milliseconds, a relative time of the format `"now"` or `"now-[0-9]+[mhd]"` (where `m` = minutes, `h` = hours, and `'d'` = days), or 0 for the earliest time.
    For example: `"2016-01-02T15:34:26Z"`; `"1451748866"`; `"now-90m"`; `"0"`.
  {{< /param-values >}}
  {{< param-default-value >}}`<end time> - 1h`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- end -->
  {{< param-doc name="end" id="param-end" >}}
  The query's end time &mdash; the latest sample time to query: read only items whose data sample time is before or at (`<=`) the specified end time.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string containing an RFC 3339 time, a Unix timestamp in milliseconds, a relative time of the format `"now"` or `"now-[0-9]+[mhd]"` (where `m` = minutes, `h` = hours, and `'d'` = days), or 0 for the earliest time.
  For example: `"2018-09-26T14:10:20Z"`; `"1537971006000"`; `"now-3h"`; `"now-7d"`.
  {{< /param-values >}}
  {{< param-default-value >}}`now`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- aggregators -->
  {{< param-doc name="aggregators" id="param-aggregators" >}}
  A list of aggregation functions ("aggregators") to apply to the raw sample data of the configured query metrics (see the [<paramname>columns</paramname>](#param-columns) parameter) in order to perform an [aggregation query](#aggregation-queries).
  You can configure the aggregation step, which serves also as the aggregation window, in the [<paramname>step</paramname>](#param-step) parameter.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string containing a comma-separated list of supported aggregation functions ("aggregators"); for example, `"count,avg,min,max"`.
    The following aggregation functions are supported:
    {{< text-tsdb-aggr-funcs >}}
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- step -->
  {{< param-doc name="step" id="param-step" >}}
  The query step (interval), which determines the points over the query's time range at which to perform aggregations (for an [aggregation query](#aggregation-queries)) or downsample the data (for a query without aggregators).
  The default step is the query's time range, which can be configured via the [<paramname>start</paramname>](#param-start) and [<paramname>end</paramname>](#param-end) parameters.
  In the current release, the aggregation step is also the aggregation window to which the aggregators are applies.
  For more information, see [Aggregation Queries](#def-aggr-step). 
  {{< comment >}}<!-- [c-tsdb-unsupported-tp-features-aggr-window-frames]
    [TECH-PREVIEW-FRAMES-TSDB-AGGR-WINDOW] [TECH-PREVIEW-TSDB-AGGR-WINDOW]
    [IntInfo] (sharonl) (5.4.20) I rephrased in light of the removal of the
    support for the `aggregation_window` parameter (`aggregationWindow` in
    v2.5). -->
  {{< /comment >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string of the format `"[0-9]+[mhd]"` &mdash; where '`m`' = minutes, '`h`' = hours, and '`d`' = days.
    For example, `"30m"` (30 minutes), `"2h"` (2 hours), or `"1d"` (1 day).
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- multi_index -->
  {{< param-doc name="multi_index" id="param-multi_index" >}}
  Determines the indexing of the returned DataFrames:
  `True` &mdash; return a multi-index DataFrame in which all metric-label attributes are defined as index columns in addition to the metric sample-time attribute (the primary-key attribute); `False` (default) &mdash; return a single-index DataFrame in which only the metric sample-time attribute is defined as an index column.
  {{< comment >}}<!-- [ci-bullets-in-param-doc-desc] -->
  {{< /comment >}}

  {{< param-type >}}`bool`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`False` (return a single-index DataFrame){{< /param-default-value >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="retval" >}}

- When the value of the [<paramname>iterator</paramname>](#param-iterator) parameter is `True` &mdash; returns a pandas DataFrames iterator.
- When the value of the [<paramname>iterator</paramname>](#param-iterator) parameter is `False` (default) &mdash; returns a single pandas DataFrame.
{{< comment >}}<!-- [c-frames-read-df-labels] [IntInfo] (sharonl) (5.12.19) Tal
  said that the returned DF also has a `labels` metadata dictionary column
  (attribute) (he thinks this is a built-in pandas concept), which we currently
  use for the "tsdb" backend and "stream" backends.
  "tsdb" - when reading a single DF, Tal was initially unsure what `labels`
  was supposed to hold but when we tested, `printf(df.labels)` returned the
  metric labels for the DF (in the test there was only one label); when reading
  a DFs iterator, each DF represents a unique labels set, which `labels` is
  supposed to display, but when we tested we found that when trying to print
  df.labels for the iterator DFs there's a runtime error -
  "AttributeError: 'DataFrame' object has no attribute 'labels'".
  "stream" - `labels` is supposed to hold the record sequence number of the
  last record that was read - according to Tal + I also saw this code line in
  backends/stream/reader.go:
    labels := map[string]interface{}{"last_seq": lastSequence}
  - but when tested, `labels` was an empty dictionary for a single DF (even
  though the stream had ingested records and read returned results), and trying
  to print `labels` for the DFs in an iterator produced the same error
  regarding no 'labels' attribute as for the TSB backend.
  NOTE: The returned DF `labels` metadata wasn't documented until now.
  => Tal opened Bug IG-14065 for all returned `labels` issues and agreed with
  Meir that QA will test the different usage scenarios. Tal and I agreed that
  for now, we'll refrain from documenting the returned DF `labels` attribute,
  for now (he said that even if it worked it's not that helpful to users).
  (8.12.19) Dina wrote in IG-14065 "After discussing with Tal Neima nand Dina
  Nimrodi, they need to ask Orit regarding this DF labels feature (maybe will
  be removed completely) and will update us accordingly so currently leave this
  ticket for now.". [PENDING-DEV] TODO: Follow up with R&D and QA. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>read</func> method of the {{< getvar v="product.frames.name.lc" >}} TSDB backend.
All of the examples set the <func>read</func> method's [<paramname>multi_index</paramname>](#param-multi_index) parameter to `True` to display metric-label attributes as index columns (in addition to the sample-time attribute, which is always displayed as an index column).
Except where otherwise specified, the examples return a single DataFrame (default [<paramname>iterator</paramname>](#param-iterator) value = `False`).

1. <a id="example-basic-read-all"></a>Read all items (rows) of a <path>mytsdb</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) &mdash;  [<paramname>start</paramname>](#param-start) = `"0"` and default [<paramname>end</paramname>](#param-end) (`"now`") and [<paramname>columns</paramname>](#param-columns) (all metrics):
    ```python
    tsdb_table = "mytsdb"
    df = client.read(backend="tsdb", table=tsdb_table, start="0", multi_index=True)
    display(df.head())
    display(df.tail())
    ```

2. <a id="example-ot-aggr-start-end-params-rfc"></a>Issue an aggregation query ([<paramname>aggregators</paramname>](#param-aggregators)) to a <path>mytsdb</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) for the "cpu" metric ([<paramname>columns</paramname>](#param-columns)); use the default aggregation step ([<paramname>step</paramname>](#param-step) not set), which is the query's time range &mdash; 09:00&ndash;17:00 on 1 Jan 2019 (see [<paramname>start</paramname>](#param-start) and [<paramname>end</paramname>](#param-end)):
    ```python
    tsdb_table = "mytsdb"
    df = client.read("tsdb", table=tsdb_table, start="2019-01-01T09:00:00Z",
                     end="2019-01-01T17:00:00Z", columns=["cpu"],
                     aggregators="avg,min,max", multi_index=True)
    display(df)
    ```
    {{< comment >}}<!-- [V2.8.0-TODO] [c-frames-write-time-w-tz-tsdb-index_cols]
      (sharonl) (31.5.20) See info for the write examples regarding perhaps
      editing the example to use explicit UTC time-zone times, now that the
      related Bug IG-14253 has been fixed and closed in v2.8.0.
      I think we can give a variation of this read example using Unix timestamp
      `start` and `end` times - perhaps as part of the following
      `aggregation_window` variation (although note that `aggregation_window`
      is still not documented, intentionally, in v2.8.0 - see below).
      In v2.5, when I used the supposed timestamp equivalents - 1546333200 and
      1546362000 - I got 0 items in the results (see my Frames TSDB
      doc-examples tests Jupyter NB).

      [c-tsdb-unsupported-tp-features-aggr-window-frames]
      [TECH-PREVIEW-FRAMES-TSDB-AGGR-WINDOW] [TECH-PREVIEW-TSDB-AGGR-WINDOW]
      (5.4.20) I removed the `aggregation_window` variation as this parameter
      is currently not supported even as Tech Preview.
    -->
    {{< /comment >}}

3. <a id="example-ot-aggr-columns-filter-step-start-end-params"></a>Issue an aggregation query to a <path>tsdb/my_metrics</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) for the previous two days ([<paramname>start</paramname>](#param-start) = `"now-2d"` and [<paramname>end</paramname>](#param-end) = `"now-1d"`); apply the `sum` and `avg` aggregators ([<paramname>aggregators</paramname>](#param-aggregators)) to the "disk" and "cpu" metrics ([<paramname>columns</paramname>](#param-columns)) with a 12-hours aggregation step ([<paramname>step</paramname>](#param-step)), and only apply the query to samples with a "linux" <attr>os</attr> label ([<paramname>filter</paramname>](#param-filter) = `os=='linux`).
    ```python
    tsdb_table = "/tsdb/my_metrics"
    df = client.read("tsdb", table=tsdb_table, columns=["disk", "memory"],
                     filter="os=='linux'", aggregators="sum,avg", step="12h",
                     start="now-2d", end="now-1d", multi_index=True)
    display(df)
    ```
    {{< comment >}}<!-- [c-tsdb-unsupported-tp-features-group-by-frames]
      [IntOnfo] (sharonl) (5.4.20) I removed the `group_by` parameter, which
      was set in the example before the `start` parameter. Note that the
      example text was missing a reference to this parameter (should be added
      if and when we add this back to the example, if and when it's decided to
      support this): `group_by="site,host"`. [TECH-PREVIEW-TSDB-GROUP_BY] -->
    {{< /comment >}}

4. <a id="example-downsampling"></a>Issue a 1-hour raw-data downsampling query ([<paramname>step</paramname>](#param-step) = `"1h"` and [<paramname>aggregators</paramname>](#param-aggregators) not set) to a <path>mytsdb</path> table in the client's data container ([<paramname>table</paramname>](#param-table)); apply the query to all metric samples (default [<paramname>columns</paramname>](#param-columns)) from 1 Jan 2019 ([<paramname>start</paramname>](#param-start) = `"2019-01-01T00:00:00Z"` and [<paramname>end</paramname>](#param-end) = `"2019-02-01T00:00:00Z"`):
    ```python
    tsdb_table = "mytsdb"
    df = client.read("tsdb", table=tsdb_table, start="2019-01-01T00:00:00Z",
                     end="2019-02-01T00:00:00Z", step="1h", multi_index=True)
    display(df)
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/tsdb/tsdb-cli.md" a="tsdb-query" text="Querying a TSDB" >}} ({{< xref f="data-layer/tsdb/tsdb-cli.md" t="title" >}})
- {{< xref f="data-layer/reference/frames/tsdb/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

