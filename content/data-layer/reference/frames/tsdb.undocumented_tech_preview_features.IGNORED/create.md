---
title: "create Method"
keywords: "create method, frames tsdb create method, frames create, frames tsdb create, frames client create, frames client tsdb create, frames create reference, frames tsdb create reference, tsdb tables creation, tsdb creation, aggregation, TSDB aggregation, aggregators, aggregation functions, over-time aggregation, pre-aggregation, pre-aggregates, aggregation granularity, TSDB ingestion rate, aggregates, aggregation-granularity, backend, kw, rate, table"
menu:
  main:
    parent:     "frames-apis-tsdb"
    identifier: "frames-apis-tsdb-create"
    weight:     20
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Creates a new TSDB table.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
create(backend, table, if_exists=FAIL, **kw)
```

The following syntax statement replaces the <paramname>kw</paramname> parameter with the additional keyword arguments that can be passed for the NoSQL backend via this parameter:
```python
create(backend, table, if_exists=FAIL, rate[, aggregates, aggregation_granularity])
```

{{< frames-syntax-undoc-params-note backend_name="TSDB" param="table" >}}
{{< comment >}}<!-- [c-frames-create-schema-param] [IntInfo] (26.9.19) (sharonl)
  We omitted `schema=None` because the `schema` parameter is used only with the
  `csv` testing backend. [TODO-FRAMES-CSV] If and when we add a CSV backend
  reference, reconsider this decision. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>aggregates</paramname>](#param-aggregates) (<paramname>kw</paramname> argument) |
[<paramname>aggregation_granularity</paramname>](#param-aggregation_granularity) (<paramname>kw</paramname> argument) |
[<paramname>backend</paramname>](#param-backend) |
[<paramname>kw</paramname>](#param-kw) |
[<paramname>if_exists</paramname>](#param-if_exists) |
[<paramname>rate</paramname>](#param-rate) (<paramname>kw</paramname> argument) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-collection >}}

  <!-- if_exists -->
  {{< frames-pb-error-options-param backend_type="tsdb" backend_name="TSDB" param="if_exists" >}}

  <!-- kw -->
  {{< param-doc name="kw" id="param-kw" >}}
  This parameter is used for passing a variable-length list of additional keyword (named) arguments.
  See the following [kw Arguments](#kw-args) section for a list of additional arguments that are supported for the TSDB backend via the <paramname>kw</paramname> parameter.
 
  {{< param-type >}}`**` &mdash; variable-length keyword arguments list{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ---------------------------------------- -->
### kw Arguments {#kw-args}

The TSDB backend supports the following <func>create</func> arguments via the [<paramname>kw</paramname>](#param-kw) parameter for passing a variable-length list of additional keyword arguments:

<dl>
  <!-- rate -->
  {{< param-doc name="rate" id="param-rate" >}}
  The ingestion rate of the TSDB metric samples.
  It's recommended that you set the rate to the average expected ingestion rate for a unique label set (for example, for a single server in a data center), and that the ingestion rates for a given TSDB table don't vary significantly; when there's a big difference in the ingestion rates (for example, x10), consider using separate TSDB tables.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< param-values >}}A string of the format `"[0-9]+/[smh]"` &mdash; where '`s`' = seconds, '`m`' = minutes, and '`h`' = hours.
  For example, `"1/s"` (one sample per minute), `"20/m"` (20 samples per minute), or `"50/h"` (50 samples per hour).
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- aggregates -->
  {{< param-doc name="aggregates" id="param-aggregates" >}}
  A list of aggregation functions ("aggregators") for performing over-time aggregation in real time during the metric-samples ingestion ("pre-aggregation").
  The aggregations results are stored in the TSDB table as array attributes ("pre-aggregates") and used to handle relevant aggregation queries.
  Use the [<paramname>aggregation-granularity</paramname>](#param-aggregation-granularity) parameter to configure the table's pre-aggregation granularity &mdash; the time interval for applying these aggregations.

  {{< note id="param-aggregates-notes" >}}
  - You can also perform aggregation queries for TSDB tables without pre-aggregates, but when configured correctly, pre-aggregation queries are more efficient.
      To ensure that pre-aggregation is used to process aggregation queries and improve performance &mdash;
      - When creating the TSDB table, set its aggregation granularity ([<paramname>aggregation-granularity</paramname>](#param-aggregation-granularity)) to an interval that's significantly larger than the table's metric-samples ingestion rate ([<paramname>rate</paramname>](#param-rate)).
      - When querying the table using the <func>{{< xref f="data-layer/reference/frames/tsdb/read.md" text="read" >}}</func> method, set the aggregation window (see <paramname>{{< xref f="data-layer/reference/frames/tsdb/read.md" a="param-aggregation_window" text="aggregation_window" >}}</paramname>) to a sufficient multiplier of the table's aggregation granularity.
          {{< comment >}}<!-- [c-tsdb-cond-for-applying-pre-aggregates]
            [IntInfo] (sharonl) (12.12.19) Tal said that the query aggregation
            window (default = query aggregation step) has to be a x3 multiple
            of the table's aggregation granularity, but I need more
            clarifications before explicitly specifying this in the doc
            (confirmed also on 3.3.20). -->
        {{< /comment >}}
      For example, if the table's ingestion rate is 1 sample per second (`"1/s"`) and you want to use hourly queries (i.e., use a query aggregation window of `"1h"`), you might set the table's pre-aggregation granularity to 20 minutes (`"20m"`).
      {{< comment >}}<!-- [c-tsdb-pre-aggregation-guidelines] [IntInfo] (sharonl)
        (3.3.20) Tal approved the note. See also Bug IG-14339.
        We also have a similar note in the TSDB CLI tutorial.
        Note: I added "see" before the reference to the `read` method's
        `aggregation_window` parameter because the aggregation window isn't
        necessarily set in this parameter, it defaults to the query
        interval/step, which is explained in the description of the
        `aggregation_window` parameter. -->
      {{< /comment >}}
  - <a id="create-over-time-aggr-only"></a>Pre-aggregation is supported only for over-time aggregation, which returns an aggregation time series for each unique metric label set.
      Cross-series aggregation across all labels of a given metric is supported only during queries.
      {{< comment >}}<!-- [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR]
        See DOC IG-10176 for Requirement IG-10172. -->
      {{< /comment >}}

  For more information about aggregation queries, see the {{< xref f="data-layer/reference/frames/tsdb/read.md" a="aggregation-queries" text="<func>read</func> method" >}}.
  {{< /note >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string containing a comma-separated list of supported aggregation functions; for example, `"count,avg,min,max"`.
     The following aggregation functions are supported:
     {{< text-tsdb-aggr-funcs >}}
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- aggregation-granularity -->
  {{< param-doc name="aggregation-granularity" id="param-aggregation-granularity" >}}
  The TSDB table's pre-aggregation granularity &mdash; i.e., the time interval for executing the aggregation functions that are configured in the [`aggregates`](#param-aggregates) argument for real-time aggregation during metric-samples ingestion.
  {{< note id="param-aggregation-granularity-note" >}}
  To get the expected pre-aggregation performance impact, the size of the aggregation-granularity interval (as set in the <paramname>aggregation-granularity</paramname> parameter) should be significantly larger than the size of the table's metric-samples ingestion rate (as set in the [<paramname>rate</paramname>](#param-rate) argument).
  See the [<paramname>aggregates</paramname> argument notes](#param-aggregates-notes).
  {{< /note >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (3.3.20) See info in Bug IG-14339. -->
  {{< /comment >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string of the format `"[0-9]+[mhd]"` &mdash; where '`m`' = minutes, '`h`' = hours, and '`d`' = days.
    For example, `"30m"` (30 minutes), `"2h"` (2 hours), or `"1d"` (1 day).
  {{< /param-values >}}
  {{< param-default-value >}}`"1h"` (1 hour){{< /param-default-value >}}
  {{< /param-doc >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="errors" >}}

In case of an error, the method raises a <api>CreateError</api> error.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}
{{< comment >}}<!-- [c-frames-tsdb-create-rate-n-write-times] [IntInfo]
  (sharonl) The `create` `rate` was set to match the average samples ingestion
  rage (the sample-times frequency for each unique label set) for the
  corresponding table in the `write` examples. Also, for a table with
  pre-aggregates, the corresponding write examples take into account the
  table's aggregators and aggregation granularity. -->
{{< /comment >}}

Following are some usage examples for the <func>create</func> method of the {{< getvar v="product.frames.name.lc" >}} TSDB backend:

1. <a id="example-basic"></a>Create a TSDB table named "mytsdb" in the root directory of the client's data container ([<paramname>table</paramname>](#param-table)) with an ingestion rate of 1 sample per second ([<paramname>rate</paramname>](#param-rate)):
    ```python
    tsdb_table = "mytsdb"
    client.create(backend="tsdb", table=tsdb_table, rate="1/s")
    ```

2. <a id="example-aggr"></a>Create a TSDB table named "my_metrics" in a <dirname>tsdb</dirname> directory in the client's data container ([<paramname>table</paramname>](#param-table)) with an ingestion rate of 12 samples per hour ([<paramname>rate</paramname>](#param-rate)).
   The table is created with the `count`, `avg`, `min`, and `max` aggregation functions ([<paramname>aggregates</paramname>](#param-aggregates)) and an aggregation granularity of 1 hour ([<paramname>aggregation-granularity</paramname>](#param-aggregation-granularity)):
   ```python
    tsdb_table = "/tsdb/my_metrics"
    client.create("tsdb", table=tsdb_table, rate="12/h",
                         aggregates="count,avg,min,max",
                         aggregation_granularity= "1h")
    ```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/tsdb/tsdb-cli.md" a="tsdb-create" text="Creating a New TSDB" >}} ({{< xref f="data-layer/tsdb/tsdb-cli.md" t="title" >}})
- {{< xref f="data-layer/reference/frames/tsdb/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

