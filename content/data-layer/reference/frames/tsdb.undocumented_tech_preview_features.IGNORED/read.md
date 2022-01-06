---
title: "read Method"
keywords: "read method, frames tsdb read method, frames read, frames tsdb read, frames client read, frames client tsdb read, frames read reference, frames tsdb read reference, tsdb ingestion, data ingestion, TSDB metrics, TSDB labels, pandas DataFrames, DataFrames index columns, aggregation, TSDB aggregation, aggregation functions, aggregation step, aggregation interval, aggregation window, pre-aggregation, cross-series aggregation, label aggregation, interpolation, interpolation functions, interpolation tolerance, SQL queries, SQL, select, where, group by, aggregators, aggregation_window, backend, columns, end, filter, group_by, kw, multi_index, query, start, step, table, next, next_val, prev, prev_val, linear, none"
menu:
  main:
    parent:     "frames-apis-tsdb"
    identifier: "frames-apis-tsdb-read"
    weight:     40
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

Reads (consumes) data from a TSDB table into pandas DataFrames.

- [Query Options](#query-options)
- [Aggregation Queries](#aggregation-queries)
{{< comment >}}<!-- [TECH-PREVIEW-TSDB-INTERPOLATION] [IntInfo] See in the
  #interpolation section. -->
- [Interpolation](#interpolation)
{{< /comment >}}

<!-- ---------------------------------------- -->
{{< small-heading id="query-options" >}}Query Options{{< /small-heading >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (9.12.19) I used the terminology
  "options" and "approaches" below rather than "methods" to avoid a possible
  confusion with API methods (functions). -->
{{< /comment >}}

You can construct the read query using either of the following alternative approaches (but not both concurrently):

1. <def id="non-sql-query">Non-SQL query</def> &mdash; set one or more of the following <func>read</func> parameters:

    - [<paramname-b>table</paramname-b>](#param-table) &mdash; the path to the TSDB table to query (required).
    - [<paramname-b>columns</paramname-b>](#param-columns) &mdash; a list of metric names (default = all metrics).
    - [<paramname-b>filter</paramname-b>](#param-filter) &mdash; a query filter that restricts which information to return.
    - [<paramname-b>aggregators</paramname-b>](#param-aggregators) &mdash; a list of aggregation functions to apply to the query metrics (for an [aggregation query](#aggregation-queries)).
    - [<paramname-b>group_by</paramname-b>](#param-group_by) &mdash; a list of metric labels that determine how to group the read results.

2. <def id="sql-query">SQL query</def> &mdash; set the [<paramname-b>query</paramname-b>](#param-query) parameter to an SQL query string; see the parameter description for details.
    {{< comment >}}<!-- [c-frames-tsdb-sql-query-table-path] [IntInfo] (sharonl)
      (12.16.19) We found that with Frames v0.6.6-v0.9.10 (platform v2.5.1),
      you can't optionally set the table path for an SQL query (when the
      `query` parameter is set) in the `read` method's `table` parameter. =>
      For now, we document that you must set the table path for an SQL query as
      part of the `FROM` clause in the `query` string. -->
    When using this option, you can optionally set the path to the TSDB table either as part of the SQL query or in the <func>read</func> method's [<paramname>table</paramname>](#param-table) parameter.
    {{< /comment >}}

For either approach, you can also optionally set one or more of the following <func>read</func> parameters:

- [<paramname-b>start</paramname-b>](#param-start) &mdash; the earliest sample time to query; (default = `<end time> - 1h`).
- [<paramname-b>end</paramname-b>](#param-end) &mdash; the latest sample time to query; (default = `now`).
- [<paramname-b>step</paramname-b>](#param-step) &mdash; the [aggregation step](#def-aggr-step) (interval) for an [aggregation query](#aggregation-queries), or the raw-data downsampling interval for a query without aggregators.
- [<paramname-b>aggregation_window</paramname-b>](#param-aggregation_window) &mdash; the [aggregation window](#def-aggr-window) (for an [aggregation query](#aggregation-queries)).

<!-- ---------------------------------------- -->
{{< small-heading id="aggregation-queries" >}}Aggregation Queries{{< /small-heading >}}

A TSDB query can include **aggregation functions** (**"aggregators"**) to apply to the sample metrics; for a list of the supported aggregation functions, see the description of the [<paramname>aggregators</paramname>](#param-aggregators) parameter.
You can use one of the following way to define aggregators for a <func>read</func> query &mdash;

- For a [non-SQL query](#non-sql-query) &mdash; set the [<paramname>aggregators</paramname>](#param-aggregators) parameter to a list of aggregation functions.
    Each function is applied to all metrics configured for the query (see the [<paramname>columns</paramname>](#param-columns) parameter).
- For an [SQL query](#sql-query) &mdash; set the [<paramname>query</paramname>](#param-query) parameter to an SQL query whose <api>SELECT</api> statement includes aggregation functions; the function calls specify the metrics to which to apply the aggregation.
    See details in the description of the <paramname>query</paramname> parameter.

<a id="query-aggr-types"></a>You can use one of two types of aggregations, but you cannot combine both types in the same query.
<a id="def-aggr-step"></a>For both types, the aggregation is done at each **aggregation step** (a.k.a., **aggregation interval**) &mdash; the time interval for executing the aggregation functions over the query's time range; the step determines the aggregation data points, starting at the query's start time.
The default step is the query's time range (which can be configured via the [<paramname>start</paramname>](#param-start) and [<paramname>end</paramname>](#param-end) parameters).
You can override the default aggregation step by setting the [<paramname>step</paramname>](#param-step) parameter.
{{< comment >}}<!-- [c-tsdb-query-no-aggr-types-mix] See Requirement IG-10172,
  IG-10176. -->
{{< /comment >}}

- <def id="over-time-aggregation">Over-time aggregation</def> (default) &mdash; aggregates the data for unique metric label sets over time, and returns a separate aggregation time series for each label set.
    <a id="def-aggr-window"></a>The aggregation is applied to all sample data within the query's **aggregation window**.
    By default, the aggregation window is identical to the aggregation step and the aggregation is calculated for an aggregation window that _starts_ at the aggregation step; for example, for an aggregation step and default aggregation window of 1 hour, the aggregation at step 10:00 is done for the period of 10:00&ndash;11:00.
    However, you can override the default aggregation window by setting the [<paramname>aggregation_window</paramname>](#param-step) parameter.
    When this parameter is set, the aggregation is calculated for an aggregation window of the configured size that _ends_ at the aggregation step; for example, for a step of 1 hour and an aggregation window of 2 hours, aggregation at step 10:00 is done for the period 08:00&ndash;10:00.
    {{< comment >}}<!-- [c-tsdb-unsupported-tp-features-aggr-window-frames]
      [TECH-PREVIEW-FRAMES-TSDB-AGGR-WINDOW] [IntInfo] See info for the
      aggregation_window parameter. -->
    {{< /comment >}}
    {{< note id="aggregation-query-notes" title="Pre-Aggregation Note" >}}
<a id="pre-aggregation"></a>When creating a TSDB table, you can optionally configure **pre-aggregates** that will be calculated for all metric samples as part of their ingestion into the TSDB table.
For each aggregation request in an over-time aggregation query, if the TSDB table has matching pre-aggregated data (same aggregation function and the query's aggregation window is a sufficient multiplier of the table's aggregation granularity), the pre-aggregated data is used instead of performing a new aggregation calculation, which speeds up the query processing.
For more information about pre-aggregation and how to configure it, see the description of the <func>create</func> method's<paramname>{{< xref f="data-layer/reference/frames/tsdb/create.md" a="param-aggregates" text="aggregates" >}}</paramname> argument.
{{< comment >}}<!-- [IntInfo] (sharonl) See the info for the `create` method's
  `aggregates` keyword argument (passed via the `kw` parameter), including
  [c-tsdb-cond-for-applying-pre-aggregates]. -->
{{< /comment >}}
    {{< /note >}}

- <def id="cross-series-aggregation">Cross-series aggregation</def> (a.k.a. **label aggregation**) &mdash; aggregates all the sample data for a given metric at each aggregation step &mdash; across all labels &mdash; and returns a single aggregation time series for the metric.
    This aggregation type is currently supported only for [SQL queries](#sql-query).
    To perform cross-series aggregation, use aggregators whose names end with `_all` (for example, `avg_all`).{{< comment >}}
    <!-- [TECH-PREVIEW-TSDB-INTERPOLATION] -->
    You can also pass an interpolation function to the aggregator to configure how to handle missing data at the aggregation step; see [Interpolation](#interpolation).
    {{< /comment >}}
    For more information and examples, see the description of the [<paramname>query</paramname>](#param-query) parameter.
    {{< comment >}}<!-- [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR] [IntInfo]
      (sharonl) See v2.0.0 TSDB Tech Preview Requirement IG-10172 / DOC
      IG-10176.  See also the related issue of Tech Preview support for TSDB
      SQL queries [TECH-PREVIEW-TSDB-SQL-QUERIES]. (31.5.20) Orit later decided
      not to document TSDB cross-series aggregation (Frames & TSDB CLI), for
      now, not even as Tech Preview. (18.10.20) Still not supported for v2.10.0
      and the requirement testing (Fix Version) and doc tasks are planned for
      Future. [FUTURE-TODO] Follow up with QA & Orit. -->
    {{< /comment >}}

{{< comment >}}<!-- [TECH-PREVIEW-TSDB-INTERPOLATION]
  [c-frames-tsdb-interpolation-next] [IntInfo] (sharonl) (30.12.19) It turns
  out that currently, users can't use the `next` interpolation function in TSDB
  queries because the SQL parser identifies it as a reserved keyword (resulting
  in errors like `"can't query: syntax error at position 22 near
  'next'","grpc_status":2}"`). `next` is the default interpolation function,
  but users might want to use it in a query to override the default
  interpolation tolerance for this function. => Tal opened Bug IG-14353 for
  this issue. It was agreed with Orit and Tal that this bug will be fixed for
  v2.8 (the fix will probably be to rename the `next` function), and that in
  the v2.5 Tech Preview Frames doc we should just filter out the interpolation
  doc. (18.10.20) Bug IG-14353 was resolved as fixed on 7.1.20, before the
  release of v2.8.0 (in May 2020). The fix was to rename the TSDB "next" and
  "prev" interpolation functions to "next_val" and "prev_val" -
  https://github.com/v3io/v3io-tsdb/pull/418. => I edited the references to the
  "next" and "prev" functions in the doc accordingly. However, as interpolation
  is still not documented, even at Tech Preview, I didn't bother editing this
  ignored doc to remove the filtering out of the interpolation doc. (7.3.21)
  Still Tech Preview also in v3.0.0. => [V3.2.0-TODO] Follow up with QA & Orit.
-->
<!-- ---------------------------------------- -->
{{< small-heading id="interpolation" >}}Interpolation{{< /small-heading >}}
{{< comment >}}<!-- [TECH-PREVIEW-TSDB-INTERPOLATION] [IntInfo] See v2.0.0 TSDB
  Tech Preview Requirement IG-10522 / DOC IG-10822. (7.4.20) I canceled the TSDB
  interpolation TP doc task (DOC IG-10822) after Orit and Adi decided not to
  document this feature (Frames & TSDB CLI), not even as Tech Preview. (We
  never documented it for the CLI, because of more pressing tasks, and the
  Frames doc that I had prepared was never published.) (18.10.20) TSDB
  interpolation is still not supported and documented, even as Tech Preview, in
  v2.8 and v2.10.0. (7.3.21) Still Tech Preview also in v3.0.0.
  => [V3.2.0-TODO] Follow up with QA & Orit.

  (25.5.20) [c-tsdb-interpolation-prev-bugs] Because it was decided not to
  document the support for TSDB interpolation, beginning with the v2.8.0 RNs, I
  stopped including a KI for Bug IG-12235 "tsdb is not doing Interpolation for
  the top edge of the data for 'prev' interpolation" - see
  #ki-tsdb-prev-interop-last-data-point in the v2.5.0 RNs and earlier ("SQL
  queries with `prev` interpolation might not return data for the last data
  point when no newer sample data is available."). It was too late to update
  earlier RNs. (Note also that it was also decided not to document at all the
  support for TSDB SQL queries, and interpolation is currently technically
  supported only via SQL queries.) (7.3.21) Bug IG-12235 is still open and is
  now planned for v3.2.0. => [V3.2.0-TODO]: If and when it's decided to
  document the TSDB interpolation support, check the bug status and the
  possible need to return the related RNs KI and/or document the issue in other
  locations. -->
{{< /comment >}}

When performing [**cross-series aggregation**](#cross-series-aggregation) (by including `*_all` cross-series aggregators in the query) or raw-data sampling (by setting the [<paramname>step</paramname>](#param-step) parameter for a query without aggregators), the query calculations are applied to all metric sample data (across all labels) whose timestamp matches the query-step time.
The {{< getvar v="product.tsdb.name.lc" >}} library supports filling in missing data at the query steps by using **interpolation** &mdash; i.e., by searching for samples with the closest available times.

<a id="interpolation-functions"></a>The **interpolation function** determines whether and how to perform the interpolation.
The following interpolation functions are supported:

- <func>next_val</func> (default) &mdash; search for data with a newer timestamp (forward search).
- <func>prev_val</func> &mdash; search for data with an older timestamp (backwards search).
- <func>linear</func> &mdash; search for both earlier and newer data (bi-directional search).
- <func>none</func> &mdash; don't perform interpolation.

<a id="interpolation-tolreance"></a>The **interpolation tolerance** determines the time frame for the interpolation &mdash; i.e., how far to search for data relative to the query-step time; the direction for the search is derived from the interpolation method.
The default interpolation tolerance is twice the value of the query's [aggregation step](#def-aggr-step); for example, for a 1-hour step, the default interpolation tolerance is 3 hours.

You can currently override the default interpolation function and step only in [SQL queries](#sql-query), by including interpolation functions in the <api>SELECT</api> statement of your query.
The interpolation functions receive a mandatory metric-name parameter and an optional interpolation-tolerance parameter.
For details and examples, see the documentation of the [<paramname>query</paramname>](#sql-query-interpolation) method parameter.
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
read(backend[, table='', query='', columns=None, filter='', group_by='',
    max_rows_in_msg=0, iterator=False, **kw])
```

The following syntax statement replaces the <paramname>kw</paramname> parameter with the additional keyword arguments that can be passed for the TSDB backend via this parameter:
```python
read(backend[, table='', query='', columns=None, filter='', group_by='',
     max_rows_in_msg=0, iterator=False, start, end, aggregators,
     aggregation_window, step, multi_index])
```

{{< frames-syntax-undoc-params-note backend_name="TSDB" param="table" >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>aggregators</paramname>](#param-aggregators) (<paramname>kw</paramname> argument) |
[<paramname>aggregation_window</paramname>](#param-aggregation_window) (<paramname>kw</paramname> argument) |
[<paramname>backend</paramname>](#param-backend) |
[<paramname>columns</paramname>](#param-columns) |
[<paramname>end</paramname>](#param-end) (<paramname>kw</paramname> argument) |
[<paramname>filter</paramname>](#param-filter) |
[<paramname>group_by</paramname>](#param-group_by) |
[<paramname>kw</paramname>](#param-kw) |
[<paramname>multi_index</paramname>](#param-multi_index) (<paramname>kw</paramname> argument) |
[<paramname>query</paramname>](#param-query) |
[<paramname>start</paramname>](#param-start) (<paramname>kw</paramname> argument) |
[<paramname>step</paramname>](#param-step) (<paramname>kw</paramname> argument) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="tsdb" backend_name="TSDB"
    req_extra=" except when using the [<api>query</api>](#sql-query-from-table) parameter to perform an SQL query" >}}
  {{< /frames-param-collection >}}
  {{< comment >}}<!-- [c-frames-tsdb-sql-query-table-path] -->
  {{< frames-param-collection backend_type="tsdb" backend_name="TSDB"
    req_extra=" except when the table path is set as part of an SQL query in the [<api>query</api>](#sql-query-from-table) parameter" >}}
  {{< /frames-param-collection >}}
  {{< /comment >}}
  {{< comment >}}<!-- [ci-paramname-in-li-param-xxx-shcds] -->
  {{< /comment >}}

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
  - You can restrict the metrics list for the query within the query filter, as explained for [<paramname>filter</paramname>](#param-filter) parameter.
  - You can alternatively specify the metric names for the query as part of the <api>SELECT</api> statement of an SQL query in the [<paramname>query</paramname>](#sql-query-select-data) parameter.
      The <paramname>columns</paramname> and <paramname>query</paramname> parameters cannot be set concurrently.

  For more information, see [Query Options](#query-options).
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
    (18.10.20) Multi-metric Frames TSDB read queries are still not supported or
    documented in v2.10.0 (only partially tested by QA and I wasn't asked to
    document this as Tech Preview). I verified that the v3io/tutorials Frames
    NB for v2.10.0 doesn't use this feature and other unsupported/ Tech Preview
    TSDB features. (7.3.21) Still Tech Preview also in v3.0.0.
    => [V3.2.0-TODO] Follow up with QA & Orit. -->
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
- You can alternatively define a query filter as part of the <api>WHERE</api> clause of an SQL query in the [<paramname>query</paramname>](#sql-query-where-filter) parameter.
    The <paramname>filter</paramname> and <paramname>query</paramname> parameters cannot be set concurrently.
For more information, see [Query Options](#query-options).
- <a id="tsdb-string-labels-note"></a>Currently, only labels of type string are supported; see the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb-labels" >}}.
    Therefore, ensure that you embed label attribute values in your filter expression within quotation marks even when the values represent a number (for example, <nobr>"`node == '1'`"</nobr> or <nobr>"node = '1'"</nobr> in an SQL query), and don't apply arithmetic operators to such attributes (unless you want to perform a lexicographic string comparison).{{< comment >}}
      <!-- [c-tsdb-label-types-string] -->
      <!-- [ci-comment-shcd-extra-space] (sharonl) I moved the opening line of the
      `comment` shortcode to the end of the uncommented doc to avoid an extra
      vertical space for the command call at the end of the note in the HTML output.
      -->
    {{< /comment >}}
  {{< /note >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- group_by -->
  {{< param-doc name="group_by" id="param-group_by" >}}
  A comma-separated list of metric label names, which determines how to group the returned read results.
  For example, `"os,host"`.
  {{< comment >}}<!-- [c-tsdb-unsupported-tp-features-group-by-frames]
    [TECH-PREVIEW-TSDB-GROUP_BY] [IntInfo] (sharonl) See v2.0.0 Tech Preview
    TSDB Requirement IG-10171 / DOC IG-10175.
    (17.12.19) Dana told me that QA tested group-by for Frames, but she didn't
    know to what extent; she said it might have only been basic tests because
    this is a TP TSDB feature. (31.5.20) Orit later decided not to document the
    group_by parameter and the support for TSDB group-by in general, for now,
    not even as Tech Preview. (18.10.20) TSDB group-by queries are still not
    supported and documented, even as Tech Preview, in v2.8 and v2.10.0.
    (7.3.21) Still Tech Preview also in v3.0.0.
    => [V3.2.0-TODO] Follow up with QA & Orit. -->
  <!-- [IntInfo] (sharonl) (12.12.19) Initially, Tal told me (in connection to
    the TSDB CLI) that this option is supported only for aggregation queries.
    However, after discussing it further with him it seems that we don't
    restrict GROUP BY to aggregation queries, it's just that this is the common
    use case; (Tal wasn't sure how this option might be used for
    non-aggregation queries). => I decided not to restrict the option in the
    docs to aggregation queries, but to demonstrate it only with such queries.
    [From the Open TSDB "Aggregation" doc -
    http://opentsdb.net/docs/build/html/user_guide/query/aggregators.html -
    "This document focuses on how aggregators are used in a group by context,
    i.e. when merging multiple time series into one. Additionally, aggregators
    can be used to downsample time series (i.e. return a lower resolution set
    of results)."
    From the w3schools SGL Group By doc - 
    https://www.w3schools.com/sql/sql_groupby.asp -
    "The GROUP BY statement is often used with aggregation functions (COUNT,
    MAX, MIN, SUM, AVG) to group the result-set by one or more columns.".]
  -->
  {{< /comment >}}
  {{< note id="param-group_by-notes" >}}
  You can alternatively include a <api>GROUP BY</api> statement in an SQL query in the [<paramname>query</paramname>](#sql-query-group-by-labels) parameter.
  The <paramname>group_by</paramname> and <paramname>query</paramname> parameters cannot be set concurrently.
  For more information, see [Query Options](#query-options).
  {{< /note >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- query -->
  {{< param-doc name="query" id="param-query" >}}
  A string that defines an SQL query.
  {{< comment >}}<!-- [TECH-PREVIEW-TSDB-SQL-QUERIES] [IntInfo] (sharonl) See
    TSDB Requirement IG-10529 / DOC G-10816.
    (17.12.19) Dana told me that QA tested the use of the `query` parameter to
    perform SQL queries, but she didn't know to what extent; she said it might
    have only been basic tests because this is a TP TSDB feature. Note that we
    use an SQL query in the Frames v3io/tutorials getting-started Jupyter NB.
    (31.5.20) Orit later decided not to document the support for TSDB SQL
    queries (Frames & TSDB CLI), for now, not even as Tech Preview. (18.10.20)
    TSDB SQL queries are still not supported and documented, even as Tech
    Preview, in v2.8 and v2.10.0. (7.3.21) Still Tech Preview also in v3.0.0.
    => [V3.2.0-TODO] Follow up with QA & Orit. -->
  <!-- [ci-admon-indent-in-paramdoc-li] [InfraInfo] [FIXME] (sharonl) (16.12.19)
    (Hugo v0.57.2) I wasn't able to correctly indent admonitions created with
    admon shortcodes (such as `note`) within list items inside the `param-doc`
    description. I tested multiple indentation variations / spacing before the
    shortcode call / shortcode-call syntax ('<'/'>'), and I also tested
    shifting the entire param-doc to the left so that it begins at the start of
    the line. I also wasn't able to correctly align admonitions after the
    syntax code snippet. => In some cases, I decided to include the info as
    regular text instead of notes, and in others I used HTML code with the
    admonition CSS class (namely, `admonition note`) directly in the MD doc.
    NOTE: Markdown code in these notes isn't interpreted (but HTML tags and
    shortcode calls work well). Also, single quotes within the HTML div appear
    differently in the output, so I replaced `'` instances with `&apos;`. I
    marked the relevant locations (in which I used the HTML code) with internal
    comments. -->
  {{< /comment >}}

  {{< note id="sql-query-param-notes" >}}
- The <paramname>query</paramname> parameter cannot be set concurrently with the [<paramname>aggregators</paramname>](#param-aggregators), [<paramname>columns</paramname>](#param-columns), [<paramname>filter</paramname>](#param-filter), or [<paramname>group_by</paramname>](#param-group_by) parameters.
    For more information, see [Query Options](#query-options).
- You cannot currently use uppercase letters in the query keywords (such as `SELECT`).
    See the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb-queries" text="TSDB query restrictions" >}}.{{< comment >}}
    <!-- [c-tsdb-sql-query-letter-case] [IntInfo] (sharonl) I
      used lowercase characters in all our TSDB SQL query examples because of
      the related V3IO TSDB restriction (sw-specifications.md
      #tsdb-sql-query-letter-case, which is a bullet in the TSDB queries
      restriction #tsdb-queries, which I linked to above). -->
    <!-- [ci-comment-shcd-extra-space] -->
    {{< /comment >}}
  {{< /note >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}

  The SQL query string must be of the following format:
  ```sql

  select <data> from <table> [where <filter>] [group by <labels>]
  ```
  {{< comment >}}<!-- [c-frames-tsdb-sql-query-table-path] -->
  select <data> [from <table>] [where <filter>] [group by <labels>]
  {{< /comment >}}

  [<api>SELECT &lt;data&gt;</api>](#sql-query-select-data) | 
  [<api>FROM &lt;table&gt;</api>](#sql-query-from-table) | 
  [<api>WHERE &lt;filter&gt;</api>](#sql-query-where-filter) | 
  [<api>GROUP BY &lt;labels&gt;</api>](#sql-query-group-by-labels)

  - <a id="sql-query-select-data"></a><api-b>SELECT &lt;data&gt;</api-b> &mdash;
      The object of the <api>SELECT</api> statement is a comma-separated list of either metric names or aggregation functions ("aggregators") that are applied to specific metrics; note that you cannot use both in the same query.
      <br/>
      You can use the '`*`' wildcard character to represent all metrics.
      {{< comment >}}<!-- [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR] [IntInfo] See
        info for #cross-series-aggregation. -->
      <!-- [IntInfo] See [c-frames-tsdb-read-wildcard-in-interp-funcs] [IntInfo]
        for the query aggregators doc. -->
      <!-- [IntInfo] (sharonl) Spaces around the commas in the SELECT statement
        are ignored, so `cpu,disk` and `cpu, disk`, for example, both work. -->
      {{< /comment >}}
      {{< comment >}}<!-- [IntInfo] (sharonl)
        [c-tsdb-query-metrics-data-n-aggr-mix] (12.12.19) I found that mixing
        metric names in the same TSDB SQL query doesn't work correctly; (with
        `step` we seemed to get the correct metric downsample data but `NaN`
        for the aggregation function; without `step` we seemed to get the
        correct aggregation and raw sample-data results but only for the first
        sample; I'm not sure about the results interpretation, other than `NaN`
        is obviously bad.) Note that the Frames non-SQL `read` queries don't
        support mixing metric names with aggregation functions by design,
        because when you set `aggregators` to aggregation functions they're
        applied to all metrics in `columns` (default = all table metrics). => I
        agreed with Tal that I'll document that such mixture is unsupported.
        -->
      {{< /comment >}}

      - For **metric names**, the query returns the raw sample data of the specified metrics, or downsampled data when the [<paramname>step</paramname>](#param-step) parameter of the <func>read</func> method is set.
          <br/>
          **Examples:** "`select mem`"; "`select cpu, disk`"; "`select *`"
          {{< comment >}}<!-- [TECH-PREVIEW-TSDB-MULTI-METRICS] [IntInfo]
          (sharonl) See the info for the `columns` parameter. Here we also have
          the issue the related issue of TSDB SQL queries
          [TECH-PREVIEW-TSDB-SQL-QUERIES]. -->
      {{< /comment >}}

      - For **aggregators"**, the query returns the requested aggregation data for the specified metrics; see [Aggregation Queries](#aggregation-queries).
          <br/>
          For a list of the supported aggregation functions, see the description of the [<paramname>aggregators</paramname>](#param-aggregators) parameter.
          <br/>
          You can perform one of two types of aggregation queries, but you cannot use both in the same query:

          - Use regular aggregation function names for performing [**over-time aggregation**](#over-time-aggregation).
              You can use the '`*`' wildcard character as the value of the metric-name parameter to apply the aggregation to all metrics.
              <br/>
              **Examples:** "`select avg(cpu), sum(cpu), sum(disk), max(*), min(*)`"
              {{< comment >}}<!-- [c-tsdb-query-no-aggr-types-mix] -->
              <!-- [c-frames-tsdb-read-wildcard-in-interp-funcs] [IntInfo]
                (sharonl) (30.12.19) Currently, the wildcard character ('*')
                can be used to represent all metric names only when passed as a
                direct parameter to an aggregation function (e.g., `avg(*)` or
                `avg_all(*)`) but not as parameter of an interpolation function,
                as Tal originally told me (e.g., `avg_all(prev_val(*))` or 
                `none(*)` for a non-aggregation query isn't supported), which
                produces an error. As we didn't previously document this as a
                valid option, I didn't document this as a known issue, I just
                removed all examples of the unsupported uses; I explicitly
                mentioned the wildcard character option here in the context of
                a direct aggregation-function metric (when initially I only
                mentioned it generically at the start of the description of the
                `SELECT` query clause); and I clarified in the
                interpolation-functions doc that this isn't supported. I asked
                Tal to consult Dina and Orit as to whether we want to support
                this, in which case a relevant Jira requirement should be
                opened.  [PENDING-DEV]
                [c-frames-tsdb-multi-metric-cross-series-aggr] Because
                mutli-metric cross-series aggregation - including using '*'` as
                the metric name parameter to signify all metrics - is currently
                not supported (returns valid information only for the first
                metric, as explained separately - Bug IG-14322), I mentioned
                the wildcard character option, for now, only in the over-time
                aggregation bullet instead of for both aggregation types.
                (31.5.20) Bug IG-14322 as fixed and closed in v2.8.0, but don't
                yet support TSDB SQL queries or cross-series aggregation in
                this release (even as Tech Preview)
                [TECH-PREVIEW-TSDB-SQL-QUERIES]
                [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR]
                [c-tsdb-unsupported-tp-features-cross-series-aggr-frames].
                (18.10.20) TSDB SQL queries and cross-series aggregation are
                still not supported and documented, even as Tech Preview, in
                v2.8 and v2.10.0. (7.3.21) Still Tech Preview also in v3.0.0.
                => [V3.2.0-TODO] Follow up with QA & Orit and edit the example
                when we're ready to support SQL queries and cross-series
                aggregation. -->
              {{< /comment >}}
          - Use aggregation function names ending with `_all` for performing [**cross-series aggregation**](#cross-series-aggregation) across all metric labels.
              In the current release, this option is supported only for single-metric queries.
              <br/>
              **Examples:** "`select count_all(cpu), sum_all(cpu)`"
              {{< comment >}}<!-- [c-frames-tsdb-multi-metric-cross-series-aggr]
                [IntInfo] (sharonl) (30.12.19) Currently, when the query
                includes cross-series aggregators (xxx_all) for multiple
                metrics, including by using the '*' wildcard character, the
                results include valid information only for the first metric and
                `NaN` for the rest - see Bug IG-14322. => Therefore, for now, I
                documented this option as applicable only to single-metric
                queries and I documented the option of using the wildcard
                character only for the over-time aggregators (see also
                [c-frames-tsdb-read-wildcard-in-interp-funcs] above).
                (31.5.20) Bug IG-14322 was fixed in v2.8.0 (see info previously
                in this file). (18.10.20) TSDB SQL queries and cross-series
                aggregation are still not supported and documented, even as Tech
                Preview, in v2.8 and v2.10.0. (7.3.21) Still Tech Preview also
                in v3.0.0. => [V3.2.0-TODO] Follow up with
                QA & Orit and edit the example when we're ready to document
                TSDB SQL queries and cross-series aggregation. -->
              **Examples:** "`select count_all(*), sum_all(cpu)`"
              {{< /comment >}}

          {{< comment >}}<!-- [TECH-PREVIEW-TSDB-INTERPOLATION] -->
          <a id="sql-query-interpolation"></a>**Interpolation functions** &mdash; for cross-series aggregation and raw-data downsampling, the <api>SELECT</api> statement can also include interpolation functions, which control whether and how to perform interpolation to substitute missing data at the query step for the specified metric; see [Interpolation](#interpolation).
          <br/>
          The interpolation functions receive a mandatory metric-name parameter and an optional interpolation-tolerance parameter to configure the interpolation tolerance &mdash; `<interpolation func>(<metric>[, <tolerance>])`.
          <br/>
          The interpolation tolerance is specified as a string of the format `"[0-9]+[mhd]"` &mdash; where '`m`' = minutes, '`h`' = hours, and '`d`' = days.
          The default tolerance is twice the value of the <func>read</func> method's [<paramname>step</paramname>](#param-step) parameter; for example, if <paramname>step</paramname> is `'1h'` (1 hour) the default interpolation tolerance is `'2h'` (2 hours).
          <br/>
          In aggregation queries, pass the interpolation function as a parameter of the cross-series aggregation function instead of the metric name (which is passed to the interpolation function) &mdash; `<aggregation func>(<interpolation func>(<metric>[, <tolerance>]))`.
          <br/>
          **Examples:** "`select mem none(cpu), prev_val(disk), next_val(temp, '30m')`"; "`select max_all(linear(cpu)), avg_all(next_val(cpu, '2h'))`"
          {{< comment >}}<!-- [c-frames-tsdb-read-wildcard-in-interp-funcs]
            [FUTURE-TODO] If and when we support the wildcard character ('*')
            as the value of the interpolation function's metric-name parameter
            (see info for the mention of this option in the aggregators section
            above), add the following examples:
              "`select prev_val(*)`"; "`select count_all(none(*))`"
            -->
            {{< /comment >}}
          {{< /comment >}}

      <div class="admonition note" id="sql-query-select-data-notes">
        <div class="admonition-title">Note</div>
<a id="sql-query-column-alias"></a>You can optionally use <b>column aliases</b> in your <api>SELECT</api> statement, provided you don't use a metric name as the alias.
{{< comment >}}<!-- [IntInfo] (sharonl) See Bug IG-12374 regarding not using a
  metric name as a column alias. Dina said that she doesn't think this should
  be considered a bug and that we don't plan to fix it. -->
{{< /comment >}}
<br/>
<b>Examples:</b> "<code>select temp as temperature</code>"; "<code>select min(disk) as min_disk</code>"; "<code>select avg_all(mem) as cs_memory_average</code>"
      </div>
      {{< comment >}}<!-- [ci-admon-indent-in-paramdoc-li] -->
      {{< /comment >}}

  - <a id="sql-query-from-table"></a><api-b>FROM &lt;table&gt;</api-b> &mdash; the path to the TSDB table to query (required).
      <br/>
      Note that when the table path contains slashes (`/`), it must be embedded within quotation marks.
      <br/>
      **Examples:** "`from mytsdb`"; "`from '/tsdb/my_metrics'`"
      {{< comment >}}<!-- [c-frames-tsdb-sql-query-table-path] [FUTURE-TODO] If
        and when we support optionally setting the table path for an SQL query
        via the `table` method parameter (as originally intended), remove
        "(required)" from the first sentence and uncomment the following before
        the examples + check for effects on other docs, such as the data-paths
        doc in the getting-started/fundamentals.md tutorial: -->
      This is required unless you set the <func>read</func> method's [<paramname>table</paramname>](#param-table) parameter to the table path.
      {{< /comment >}}

  - <a id="sql-query-where-filter"></a><api-b>WHERE &lt;filter&gt;</api-b> &mdash; an optional {{< product lc >}} {{< xref f="data-layer/reference/expressions/condition-expression.md" a="filter-expression" text="filter expression" >}} that restricts the information that will be returned.
      For more information, see the description of the [<paramname>filter</paramname>](#param-filter) parameter, which is used for non-SQL queries.
      <br/>
      <div class="admonition note" id="sql-query-where-filter-notes">
        <div class="admonition-title">Note</div>
The filter expression in the query string uses an SQL syntax.
Therefore, unlike when setting it in the <paramname>filter</paramname> parameter, the expression string isn't embedded within quotation marks and the comparison operator is &apos;<code>=</code>&apos; and not &apos;<code>==</code>&apos; (as documented in the {{< product lc >}} expression reference).
      </div>
      **Examples:** "`where os='linux' AND arch='amd64'`"; "`where node != '0'`"
      {{< comment >}}<!-- [ci-admon-indent-in-paramdoc-li] -->
      {{< /comment >}}

  - <a id="sql-query-group-by-labels"></a><api-b>GROUP BY &lt;labels&gt;</api-b> &mdash; an optional comma-separated list of label names, which determines how to group the returned results. 
      For more information, see the description of the [<paramname>group_by</paramname>](#param-group_by) parameter, which is used for non-SQL queries.
      <br/>
      **Examples:** "`group by os,host`"; "`group by min_disk`"
      {{< comment >}}<!-- [TECH-PREVIEW-TSDB-GROUP_BY] [IntInfo] See the info
        for the `group_by` parameter. -->
      {{< /comment >}}
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
  You can configure the aggregation step and/or window in the [<paramname>step</paramname>](#param-step) and [<paramname>aggregation_window</paramname>](#param-aggregation_window) parameters, respectively.
  {{< note id="param-aggregators-notes" >}}
  You can alternatively define the aggregation functions as part of the <api>SELECT</api> statement of an SQL query in the [<paramname>query</paramname>](#sql-query-select-data) parameter, which also supports cross-series (label) aggregation and enables you to apply specific aggregation functions to different metrics.
  The <paramname>aggregators</paramname> and <paramname>query</paramname> parameters cannot be set concurrently.
  For more information, see [Query Options](#query-options).
  {{< comment >}}<!-- [TECH-PREVIEW-TSDB-INTERPOLATION] [V3.2.0-TODO] When we
  return the interpolation doc, replace the period at the end of the first note
  sentence with the following (after "metrics"): -->
  and to control the aggregation interpolation.
  {{< /comment >}}
  {{< /note >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string containing a comma-separated list of supported aggregation functions ("aggregators"); for example, `"count,avg,min,max"`; `"count_all,avg_all,min_all,max_all"`.
    Functions whose names end with `_all` perform [cross-series aggregation](#cross-series-aggregation) instead of the default [over-time aggregation](#over-time-aggregation); note that you cannot mix these two aggregation types in the same query.
    The following aggregation functions are supported:
    {{< text-tsdb-aggr-funcs all="1" >}}
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- step -->
  {{< param-doc name="step" id="param-step" >}}
  The query step (interval), which determines the points over the query's time range at which to perform aggregations (for an [aggregation query](#aggregation-queries)) or downsample the data (for a query without aggregators).
  The default step is the query's time range, which can be configured via the [<paramname>start</paramname>](#param-start) and [<paramname>end</paramname>](#param-end) parameters.
  For more information, see [Aggregation Queries](#def-aggr-step). 
  {{< comment >}}<!-- [c-tsdb-unsupported-tp-features-aggr-window-frames]
    [TECH-PREVIEW-FRAMES-TSDB-AGGR-WINDOW] [TECH-PREVIEW-TSDB-AGGR-WINDOW] -->
  {{< /comment >}}

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string of the format `"[0-9]+[mhd]"` &mdash; where '`m`' = minutes, '`h`' = hours, and '`d`' = days.
    For example, `"30m"` (30 minutes), `"2h"` (2 hours), or `"1d"` (1 day).
  {{< /param-values >}}
  {{< /param-doc >}}

  <!-- aggregation_window -->
  {{< param-doc name="aggregation_window" id="param-aggregation_window" >}}
  For an [over-time aggregation query](#over-time-aggregation) &mdash; the query's aggregation window, i.e., the time frame to which to apply the configured aggregation functions at each aggregation step.
  The default aggregation window is the query's [aggregation step](#def-aggr-step).
  When using the default aggregation window, the aggregation window starts at the aggregation step; when the <paramname>aggregation_window</paramname> parameter is set, the aggregation window ends at the aggregation step.
  For more information, see [Aggregation Queries](#def-aggr-window). 
  {{< comment >}}<!-- [c-tsdb-unsupported-tp-features-aggr-window-frames]
    [TECH-PREVIEW-FRAMES-TSDB-AGGR-WINDOW] [IntInfo] (sharonl) (17.12.19) This
    feature was added to the Frames "tsdb" backend in v2.3.0 as part of
    Requirement IG-11903 (not marked as Tech Preview) / DOC IG-12272 (original
    DOC IG-12120 was CANCELED as a duplicate of IG-12272 to add a Frames
    reference). (18.10.20) Requirement IG-11903 has a QA label but the status
    is still DONE and note TESTED, and the aggregation_window parameter is
    still not documented, even as Tech Preview, in v2.8.0 and v2.10.0.
    (7.3.21) Still Tech Preview also in v3.0.0.
    => [V3.2.0-TODO] Follow up with QA & Orit. -->
  <!-- [IntInfo] (sharonl)This is the related release note in the v2.3.0
    release notes:
  -->
  Added an <paramname>aggregation_window</paramname> parameter to the <func>client.read</func> DataFrame method to support TSDB sliding-window aggregation queries in which the aggregation window differs from the data interval {{< techpreview mark="1" >}}.
  <!-- => TODO: Consider editing the doc to refer to this as a "sliding-window"
    feature (especially if we need to document it as Tech Preview). -->
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

2. <a id="example-sql-read-all-ret-dfs-iter"></a>Issue an SQL query ([<paramname>query</paramname>](#param-query)) to read from of a <path>tsdb/my_metrics</path> table in the client's data container (set in the query's `FROM` clause); return all items (default [<paramname>columns</paramname>](#param-columns) = all metrics, [<paramname>start</paramname>](#param-start) = `"0"`, and default [<paramname>end</paramname>](#param-end) = `"now`") in a DataFrames iterator ([<paramname>iterator</paramname>](#param-iterator) = `True`):
    ```python
    tsdb_table = "/tsdb/my_metrics"
    query_str = f"select * from '{tsdb_table}'"
    dfi = client.read("tsdb", query=query_str, start="0", iterator=True,
                      multi_index=True)
    for df in dfi:
        display(df.head())
        display(df.tail())
    ```

3. <a id="example-ot-aggr-start-end-params-rfc"></a>Issue a non-SQL over-time aggregation query ([<paramname>aggregators</paramname>](#param-aggregators)) to a <path>mytsdb</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) for the "cpu" metric ([<paramname>columns</paramname>](#param-columns)); use the default aggregation step and window ([<paramname>step</paramname>](#param-step) and [<paramname>aggregation_window</paramname>](#param-aggregation_window) not set), which is the query's time range &mdash; 09:00&ndash;17:00 on 1 Jan 2019 (see [<paramname>start</paramname>](#param-start) and [<paramname>end</paramname>](#param-end)):
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
      doc-examples tests Jupyter NB). -->
    {{< /comment >}}

    <a id="example-ot-aggr-start-end-aggr-win-param"></a>The following variation explicitly sets the aggregation window for the query to 1 hour ([<paramname>aggregation_window</paramname>](#param-aggregation_window) = `'1h'`):
    ```python
    tsdb_table = "mytsdb"
    df = client.read("tsdb", table=tsdb_table, start="2019-01-01T09:00:00Z",
                     end="2019-01-01T17:00:00Z", columns=["cpu"],
                     aggregators="avg,min,max", aggregation_window="1h",
                     multi_index=True)
    display(df)
    ```

4. <a id="example-sql-ot-aggr-filter-n-group-step-n-start-params-ret-dfs-iter"></a>Issue an SQL over-time aggregation query ([<paramname>query</paramname>](#param-query)) to a <path>tsdb/my_metrics</path> table in the client's data container (set in the query's `FROM` clause) for the last day (see [<paramname>start</paramname>](#param-start) = `"now-1d"` and default [<paramname>end</paramname>](#param-end) = `"now"`).
    Apply the `count` aggregator to all metrics and the `avg` aggregator only to the `disk` metric (<paramname>query</paramname> with "`select count(*), avg(disk)`") with an aggregation step of 4 hours ([<paramname>step</paramname>](#param-step)) and a similar default aggregation window ([<paramname>aggregation_window</paramname>](#param-aggregation_window) not set), and only apply the query to samples with a "NY" <attr>site</attr> label (<paramname>query</paramname> with "`where site='NY'`"). 
    Return a DataFrames iterator (`iterator=True`) and group the results by the <attr>host</attr> label (<paramname>query</paramname> with "`group by host`").
    ```python
    tsdb_table = "/tsdb/my_metrics"
    query_str = f"select count(*), avg(disk) from '{tsdb_table}' where site='NY'" \
        " group by host"
    dfi = client.read("tsdb", query=query_str, start="now-1d", step="4h",
                      iterator=True, multi_index=True)
    for df in dfi:
        display(df)
    ```

5. <a id="example-ot-aggr-columns-filter-step-start-end-params"></a>Issue a non-SQL over-time aggregation query to a <path>tsdb/my_metrics</path> table in the client's data container ([<paramname>table</paramname>](#param-table)) for the previous two days ([<paramname>start</paramname>](#param-start) = `"now-2d"` and [<paramname>end</paramname>](#param-end) = `"now-1d"`); apply the `sum` and `avg` aggregators ([<paramname>aggregators</paramname>](#param-aggregators)) to the "disk" and "cpu" metrics ([<paramname>columns</paramname>](#param-columns)) with a 12-hours aggregation step ([<paramname>step</paramname>](#param-step)) and a similar default aggregation window ([<paramname>aggregation_window</paramname>](#param-aggregation_window) not set), and only apply the query to samples with a "linux" <attr>os</attr> label ([<paramname>filter</paramname>](#param-filter) = `os=='linux`).
    ```python
    tsdb_table = "/tsdb/my_metrics"
    df = client.read("tsdb", table=tsdb_table, columns=["disk", "memory"],
                     filter="os=='linux'", aggregators="sum,avg", step="12h",
                     group_by="site,host", start="now-2d", end="now-1d",
                     multi_index=True)
    display(df)
    ```

6. <a id="example-downsampling"></a>Issue a 1-hour raw-data downsampling non-SQL query ([<paramname>step</paramname>](#param-step) = `"1h"` and [<paramname>aggregators</paramname>](#param-aggregators) not set) to a <path>mytsdb</path> table in the client's data container ([<paramname>table</paramname>](#param-table)); apply the query to all metric samples (default [<paramname>columns</paramname>](#param-columns)) from 1 Jan 2019 ([<paramname>start</paramname>](#param-start) = `"2019-01-01T00:00:00Z"` and [<paramname>end</paramname>](#param-end) = `"2019-02-01T00:00:00Z"`):
    ```python
    tsdb_table = "mytsdb"
    df = client.read("tsdb", table=tsdb_table, start="2019-01-01T00:00:00Z",
                     end="2019-02-01T00:00:00Z", step="1h", multi_index=True)
    display(df)
    ```

7. <a id="example-sql-cs-aggr-fitler-step-start-end-params-group-ret-df-iter"></a>Issue an SQL cross-series aggregation query to a <path>tsdb/my_metrics</path> table in the client's data container (set in the query's `FROM` clause) for the last day ([<paramname>start</paramname>](#param-start) = `"now-1d"` and default [<paramname>end</paramname>](#param-end) = `"now"`).
    Apply the `count` and `avg` aggregators to the "disk" metric ([<paramname>query</paramname>](#param-query) with "`select count_all(disk), avg_all(disk)`") with an aggregation step of 4 hours ([<paramname>step</paramname>](#param-step) = `"4h"`), and only apply the query to samples with a "DC" <attr>site</attr> label (<paramname>query</paramname> with "`where site='DC'`").
    Return a DataFrames iterator (`iterator=True`) and group the results by the <attr>site</attr> label (<paramname>query</paramname> with "`group by site`").
    ```python
    tsdb_table = "/tsdb/my_metrics"
    query_str = f"select count_all(disk), avg_all(disk) from '{tsdb_table}' " \
        "where site='DC' group by site"
    dfi = client.read("tsdb", query=query_str, start="now-1d", step="4h",
                      iterator=True, multi_index=True)
    for df in dfi:
        display(df)
    ```
    {{< comment >}}<!-- [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR] 
      [c-tsdb-unsupported-tp-features-cross-series-aggr-frames] -->
    <!-- [c-frames-tsdb-multi-metric-cross-series-aggr]
      [TECH-PREVIEW-TSDB-MULTI-METRICS] (18.10.20) Bug IG-14322 has been
      resolved and closed for v2.8.0 (see info previously in this file), but
      TSDB SQL queries, cross-series aggregation are still not supported and
      multi-metric queries are still not supported and documented, even as Tech
      Preview, in v2.8 and v2.10.0. (7.3.21) Still Tech Preview also in v3.0.0.
      => [V3.2.0-TODO] Follow up with QA & Orit. 
      When TSDB SQL queries and cross-series aggregation are documented,
      consider editing this example or adding an example to demonstrate
      multi-metric cross-series aggregation - at which point check whether we
      need to document this as Tech Preview because of the current Tech Preview
      nature of multi-metric TSDB queries in general. -->
    {{< /comment >}}

{{< comment >}}<!-- [TECH-PREVIEW-TSDB-INTERPOLATION] [V3.2.0-TODO] When we
  publish the interpolation doc (including after the Bug IG-14353 fix - the
  renaming of the "next" and "prev" interpolation functions to "next_val" and
  "prev_val" - is verified [c-frames-tsdb-interpolation-next]), add the
  following as Example 7; renumber the current Example 7 (above) to Example 8;
  and add a variation for Example 8 to demonstrates interpolation for
  cross-series aggregation. (See my Frames doc-example Jupyter NB.)
  [PENDING-DEV] -->
7. <a id="example-sql-downsampling-w-interp-cfg-"></a>Issue a 12-hour raw-data downsampling SQL query ([<paramname>step</paramname>](#param-step) = `"12h"` and [<paramname>query</paramname>](#param-query) without aggregators) to a <path>tsdb/my_metrics</path> table in the client's data container (set in the query's `FROM` clause) for the last day ([<paramname>start</paramname>](#param-start) = `"now-1d"` and default [<paramname>end</paramname>](#param-end) = `"now"`).
    Configure the interpolation functions and tolerance &mdash; a 2-minute <func>linear</func> interpolation for the "cpu" metric, no interpolation (<func>none</func>) for the "disk" metric, and the default interpolation (<func>next_val</func> with a tolerance of twice the downsampling step) for the "memory" metric (<paramname>query</paramname> with `"select linear(cpu, '2m'), none(disk), memory`").
    ```python
    tsdb_table = "/tsdb/my_metrics"
    query_str = f"select linear(cpu, '2m'), none(disk), memory from '{tsdb_table}'"
    df = client.read("tsdb", query=query_str, start="now-1d", step="12h",
                     multi_index=True)
    ```
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/tsdb/tsdb-cli.md" a="tsdb-query" text="Querying a TSDB" >}} ({{< xref f="data-layer/tsdb/tsdb-cli.md" t="title" >}})
- {{< xref f="data-layer/reference/frames/tsdb/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

