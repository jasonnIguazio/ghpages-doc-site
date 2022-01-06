---
title: "write Method"
keywords: "write method, frames tsdb write method, frames write, frames tsdb write, frames client write, frames client tsdb write, frames write reference, frames tsdb write reference, tsdb ingestion, data ingestion, TSDB metrics, TSDB labels, pandas DataFrames, DataFrame index columns, backend, dfs, index_cols, labels, max_rows_in_msg, table"
menu:
  main:
    parent:     "frames-apis-tsdb"
    identifier: "frames-apis-tsdb-write"
    weight:     30
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Writes (ingests) data from pandas DataFrames to a TSDB table.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
write(backend, table, dfs, [labels=None, max_rows_in_msg=0, index_cols=None])
```

{{< frames-syntax-undoc-params-note backend_name="TSDB" param="dfs" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>dfs</paramname>](#param-dfs) |
[<paramname>index_cols</paramname>](#param-index_cols) |
[<paramname>labels</paramname>](#param-labels) |
[<paramname>max_rows_in_msg</paramname>](#param-max_rows_in_msg) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-collection >}}

  <!-- dfs -->
  {{< param-doc name="dfs" id="param-dfs" >}}One or more DataFrames containing the data to write.
  {{< note id="param-dfs-notes" >}}
- <a id="index-cols-note"></a>DataFrame index columns &mdash;
    - You must define one or more non-index DataFrame columns that represent the sample metrics; the name of the column is the metric name and its values is the sample data (i.e., the ingested metric).
    See also TSDB metric-samples {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb-metric-samples" text="sofware specifications and restrictions" >}}.
    - You must define a single index column whose value is the value the sample time of the data.
        Note that a TSDB DataFrame cannot have more than one index column of a time data type.
    - <a id="tsdb-label-index-columns"></a>You can optionally define string index columns that represent metric labels for the current DataFrame row.
        See also TSDB-labels {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb-labels" text="sofware specifications and restrictions" >}}.
    Note that you can also define labels for all DataFrame rows by using the [`labels`](#param-labels) parameter (in addition or instead of using column indexes to apply labels to a specific row).
    - <a id="param-dfs-index_cols-note"></a>You can either include the index columns as part of the DataFrame definition (as typically done with pandas DataFrames) or by using the [<paramname>index_cols</paramname>](#param-index_cols) parameter of the <func>write</func> method, which overrides any index-column definitions in the DataFrame.
- <a id="max-df-size-note"></a>See the maximum write DataFrame size {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="frames-max-write-df-size" text="restriction" >}}.
    If you need to write a larger amount of data, use multiple DataFrames.
  {{< /note >}}

  {{< param-type >}}A single DataFrame, a list of DataFrames, or a DataFrames iterator{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- labels -->
  {{< param-doc name="labels" id="param-labels" >}}
  A dictionary of metric labels of the format `{<label>: <value>[, <label>: <value>, ...]}`, which will be applied to all the DataFrame rows (i.e., to all the ingested metric samples).
  For example, `{"os": "linux", "arch": "x86"}`.
  See also TSDB-labels {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb-labels" text="sofware specifications and restrictions" >}}.
  Note that you can also define labels for a specific DataFrame row by adding a string index column to the row (in addition or instead of using the <paramname>labels</paramname> parameter to define labels for all rows), as explained in the description of the [<paramname>dfs</paramname>](#tsdb-label-index-columns) parameter.

  {{< param-type >}}`dict` with `str` keys{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`None`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- index_cols -->
  {{< param-doc name="index_cols" id="param-index_cols" >}}
  A list of column (attribute) names to be used as index columns for the write operation, for all ingested DataFrames (as set in the [<paramname>dfs</paramname>](#param-dfs) parameter) regardless of any index-column definitions in the DataFrames.
  By default, the DataFrames' index columns are used.
  As explained for the <paramname>dfs</paramname> parameter, the TSDB backend supports a single mandatory time index column that represents the sample time of the data and multiple optional string index columns that represent metric labels.

  {{< param-type >}}`[]str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-default-value >}}`None`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- max_rows_in_msg -->
  {{% include f="frames-write-param-max-rows-in-msg.md" %}}
  {{< comment >}}<!-- [ci-include-w-param-xxx] -->
  {{< /comment >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}
{{< comment >}}<!-- [c-frames-tsdb-create-rate-n-write-times] [IntInfo]
  (sharonl) The `create` `rate` was set to match the average samples ingestion
  rage (the sample-times frequency for each unique label set) for the
  corresponding table in the `write` examples. Also, for a table with
  pre-aggregates, the corresponding write examples take into account the
  table's aggregators and aggregation granularity. -->
<!-- [V2.8.0-TODO] [c-frames-write-time-w-tz-tsdb-index_cols] [IntInfo]
  (sharonl) (3.15.20) Now that Bug IG-14253 - relating to the inability to
  write a `datetime64` attribute (column) with a timezone configuration
  (previously restriction #frames-write-time-w-tz) - has been fixed and closed
  for v2.8.0, consider editing the examples to explicitly set the UTC time
  zone, and then consider also editing the read examples to also demonstrate
  Unix timestamp `start`/`end` equivalents for one of the RFC 3339 string
  examples. -->
<!-- TODO: Consider adding code comments. Initially I reduced code comments
  here mostly because of infrastructure issues that might no longer exist with
  Hugo v0.73.0 and later. -->
{{< /comment >}}

Following are some usage examples for the <func>write</func> method of the {{< getvar v="product.frames.name.lc" >}} TSDB backend.
See the [DataFrame index-columns note](#index-cols-note) in the description of the [<paramname>dfs</paramname>](#param-dfs) parameter for information regarding the alternative methods for defining the metric sample-time and label attributes for the write operation, which are demonstrates in the examples.

Both examples use the following functions to generate random metrics data:
```python
import numpy as np


# Generate a matrix of random floating-point numbers between 0 and `max`
def gen_floats(d0=1, d1=1, max=100):
    return np.random.rand(d0, d1) * max
```

1. <a id="example-basic-single-df-pandas-index-cols"></a>Write a DataFrame with time-series sample metrics to a <path>mytsdb</path> TSDB table in the client's data container ([<paramname>table</paramname>](#param-table)); define the metric sample-time and label attributes as DataFrame index columns:
    ```python
    from datetime import datetime

    metrics = ["cpu", "temperature"]
    times = pd.date_range(freq="1S", start=datetime(2019, 1, 1, 0, 0, 0, 0),
                          end = datetime(2019, 1, 1, 23, 59, 59, 0))
    df = pd.DataFrame(data=gen_floats(num_items, len(metrics)),
                      index=[times, ["1"] * len(times)], columns=metrics)
    df.index.names = ["time", "node"]

    tsdb_table = "mytsdb"
    client.write(backend="tsdb", table=tsdb_table, dfs=df)
    ```

2. <a id="example-single-df-labels-param-or-multi-dfs-index-cols-param"></a>Write time-series metric samples to a <path>tsdb/my_metrics</path> table in the client's data container ([<paramname>table</paramname>](#param-table)), using one of two alternative variations; both variations use the following code for generating the data set:
    ```python
    from datetime import datetime, timedelta

    metrics = ["cpu", "memory", "disk"]
    num_metrics = len(metrics)
    label_sets = [
        {"site": "DC", "host": "1", "os": "linux"},
        {"site": "DC", "host": "3", "os": "windows"},
        {"site": "NY", "host": "2", "os": "windows"},
        {"site": "SC", "host": "4", "os": "linux"},
        {"site": "SC", "host": "5", "os": "windows"},
        {"site": "NY", "host": "6", "os": "linux"}
    ]
    end_t = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    start_t = end_t - timedelta(days=2)
    times = pd.date_range(freq="5min", start=start_t, end=end_t)
    num_items = len(times)
    ```

    <a id="example-single-df-labels-param"></a>**Variation 1** &mdash; set the sample-time attribute as a DataFrame index column and use the <func>write</func> method's [<paramname>labels</paramname>](#param-labels) parameter to define the metric-label attributes; use multiple single-DataFrame ([<paramname>dfs</paramname>](#param-dfs)) <func>write</func> calls:
    ```python
    tsdb_table = "/tsdb/my_metrics"
    for label_set in label_sets:
        df = pd.DataFrame(data=gen_floats(num_items, num_metrics), index=times,
                          columns=metrics)
        df.index.name = "time"
        client.write("tsdb", table=tsdb_table, dfs=df, labels=label_set)
    ```

    <a id="example-multi-dfs-index-cols-param"></a>**Variation 2** &mdash; define the metric sample-time and label attributes by using the <func>write</func> method's [<paramname>index_cols</paramname>](#param-index_cols) parameter; use a single <func>write</func> call with multiple DataFrames ([<paramname>dfs</paramname>](#param-dfs)):
    ```python
    dfs = []
    for label_set in label_sets:
        df = pd.DataFrame(data=gen_floats(num_items, num_metrics),
                          index=[times, [label_set["site"]] * num_items,
                                 [label_set["host"]] * num_items,
                                 [label_set["os"]] * num_items], columns=metrics)
        df.index.names = index_cols
        df.reset_index(inplace=True)
        dfs.append(df)

    tsdb_table = "/tsdb/my_metrics"
    index_cols = ["time", "site", "host", "os"]
    client.write("tsdb", table=tsdb_table, dfs=df, index_cols=index_cols)
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/tsdb/tsdb-cli.md" a="tsdb-samples-add" text="Adding Samples to a TSDB" >}} ({{< xref f="data-layer/tsdb/tsdb-cli.md" t="title" >}})
- {{< xref f="data-layer/reference/frames/tsdb/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

