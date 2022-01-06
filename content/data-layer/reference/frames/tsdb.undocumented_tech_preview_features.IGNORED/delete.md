---
title: "delete Method"
keywords: "delete method, frames tsdb delete method, frames delete, frames tsdb delete, frames client delete, frames client tsdb delete, frames delete reference, frames tsdb delete reference, deleting tsdb tables, deleting tsdbs, delete by filter, backend, end, if_missing, start, table, IGNORE, fpb.IGNORE"
menu:
  main:
    parent:     "frames-apis-tsdb"
    identifier: "frames-apis-tsdb-delete"
    weight:     50
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This page is
  referenced from the v3io/frames README file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

{{< comment >}}<!-- [FRAMES-DELETE-BY-FILTER-TSDB] [TSDB-DELETE-BY-FILTER]
  [V2.8.0-TODO] Document the options to delete by a filter expression (see the
  `filter` parameter) and by metric names (see the `metrics` parameter).
  For now, I referred to these parameters in the syntax (updated for v2.8.0)
  and in the method description. See Requirement IG-14760 / DOC IG-14819. -->
{{< /comment >}}
Deletes a TSDB table or or specific table items.

{{< note id="delete-notes" >}}
<a id="default-table-delete-note"></a>When no filter parameter is set ([<paramname>start</paramname>](#param-start), [<paramname>end</paramname>](#param-end), <paramname>filter</paramname>, or <paramname>metrics</paramname>), the entire TSDB table and its schema file (<file>.schema</file>) are deleted.
{{< /note >}}
{{< comment >}}<!-- [V2.8.0-TODO] [FRAMES-DELETE-BY-FILTER-TSDB] When we add
  descriptions for the `filter` and/or `metrics` parameters, add links.  -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="syntax" >}}

```python
delete(backend, table[, filter='', start='', end='', if_missing=FAIL, metrics=[]])
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="params" >}}

[<paramname>backend</paramname>](#param-backend) |
[<paramname>end</paramname>](#param-end) |
[<paramname>if_missing</paramname>](#param-if_missing) |
[<paramname>start</paramname>](#param-start) |
[<paramname>table</paramname>](#param-table)

<dl>
  <!-- backend -->
  {{< frames-param-backend backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-backend >}}

  <!-- table -->
  {{< frames-param-collection backend_type="tsdb" backend_name="TSDB" >}}
  {{< /frames-param-collection >}}

  <!-- start -->
  {{< param-doc name="start" id="param-start" >}}
  Start (minimum) time for the delete operation &mdash; i.e., delete only items whose data sample time is at or after (`>=`) the specified start time.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string containing an RFC 3339 time, a Unix timestamp in milliseconds, a relative time of the format `"now"` or `"now-[0-9]+[mhd]"` (where `m` = minutes, `h` = hours, and `'d'` = days), or 0 for the earliest time.
    For example: `"2016-01-02T15:34:26Z"`; `"1451748866"`; `"now-90m"`; `"0"`.
  {{< /param-values >}}
  {{< param-default-value >}}`""` when neither <api>start</api> nor [<api>end</api>](#param-end) are set &mdash; to delete the entire TSDB table &mdash; and `0` when <api>end</api> is set{{< /param-default-value >}}
    {{< comment >}}<!-- [ci-paramname-in-li-param-xxx-shcds] -->
    {{< /comment >}}
  {{< /param-doc >}}

  <!-- end -->
  {{< param-doc name="end" id="param-end" >}}
  End (maximum) time for the delete operation &mdash; i.e., delete only items whose data sample time is before or at (`<=`) the specified end time.

  {{< param-type >}}`str`{{< /param-type >}}
  {{< param-req "O" >}}{{< /param-req >}}
  {{< param-values >}}A string containing an RFC 3339 time, a Unix timestamp in milliseconds, a relative time of the format `"now"` or `"now-[0-9]+[mhd]"` (where `m` = minutes, `h` = hours, and `'d'` = days), or 0 for the earliest time.
  For example: `"2018-09-26T14:10:20Z"`; `"1537971006000"`; `"now-3h"`; `"now-7d"`.
    {{< note id="param-end-values-note" >}}
    In the current release, only an <paramname>end</paramname> value of `"now"` is supported.
    {{< /note >}}
    {{< comment >}}<!-- [V2.8.0-TODO] [FRAMES-DELETE-BY-FILTER-TSDB-END-VALUES]
      I added the `end` = "now" only restriction per Orit's guidelines, but I'm
      awaiting final confirmation from her that she wants to keep this
      restriction, even though Meir confirmed that QA tested other `end` values
      for v2.8.0. See Requirement IG-14760 / DOC IG-14819 [PENDING-DEV] -->
    {{< /comment >}}
  {{< /param-values >}}
  {{< param-default-value >}}`""` when neither [<api>start</api>](#param-start) nor <api>end</api> are set &mdash; to delete the entire TSDB table &mdash; and `0` when <api>start</api> is set{{< /param-default-value >}}
    {{< comment >}}<!-- [IntInfo] (sharonl) (8.12.19) Yaron H. agreed that a
      default end time of 0 (when `start` is set) doesn't make sense. He said
      it would be best to use a future timestamp that essentially represents
      "forever" (rather than using "now" as I had suggested). (9.12.19) I
      relayed this to R&D and product in the "Frames API Changes" email thread,
      copied in DOC IG-12272. -->
    <!-- [ci-paramname-in-li-param-xxx-shcds] -->
    {{< /comment >}}
  {{< /param-doc >}}

  <!-- if_missing -->
  {{< frames-pb-error-options-param backend_type="tsdb" backend_name="TSDB" param="if_missing" >}}
</dl>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="errors" >}}

In case of an error, the method raises a <api>DeleteError</api> error.

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="examples" >}}

Following are some usage examples for the <func>delete</func> method of the {{< getvar v="product.frames.name.lc" >}} TSDB backend.

1. <a id="example-basic"></a>Delete a <path>mytsdb</path> TSDB table in the client's data container ([<paramname>table</paramname>](#param-table)).
  Because no filter parameter is set (<paramname>start</paramname>, <paramname>end</paramname>, <paramname>filter</paramname>, or </paramname>metrics</paramname>), the entire table is deleted.
    ```python
    tsdb_table = "mytsdb"
    client.delete(backend="tsdb", table=tsdb_table)
    ```

2. <a id="example-if_missing-ignore"></a>Delete a <path>tsdb/my_metrics</path> TSDB table in the client's data container ([<paramname>table</paramname>](#param-table)); don't raise an error if the table doesn't exist ([<paramname>if_missing</paramname>](#param-if_missing) = <opt>IGNORE</opt>):
    ```python
    from {{% getvar v="product.frames.client.lib_name" %}} import frames_pb2 as fpb
    tsdb_table = "/tsdb/my_metrics"
    client.delete("tsdb", table=tsdb_table, if_missing=fpb.IGNORE)
    ```

3. <a id="example-start-end-times"></a>For a <path>mytsdb</path> TSDB table in the client's data container ([<paramname>table</paramname>](#param-table)), delete all items for data that was sampled during the last 24 hours &mdash; between `now-1d` ([<paramname>start</paramname>](#param-start)) and `now` ([<paramname>end</paramname>](#param-end)):
    ```python
    tsdb_table = "mytsdb"
    client.delete("tsdb", table=tsdb_table, start="now-1d", end="now")
    ```

{{< comment >}}<!--[FRAMES-DELETE-BY-FILTER-TSDB-END-VALUES] [IntInfo] (sharonl)
  See the info for the `end` parameter. TODO: If and when we support `end`
  values other than `"now"`, add the following example as well. -->
4. <a id="example-end-w-default-start-time-n-if_missing-ignore"></a>For a <path>tsdb/my_metrics</path> TSDB table in the client's data container ([<paramname>table</paramname>](#param-table)), delete all items for data that was sampled prior to the end of June 2019 (default [<paramname>start</paramname>](#param-start) = `0` and [<paramname>end</paramname>](#param-end) = `2019-06-30T23:59:59Z`); don't raise an error if the table doesn't exist ([<paramname>if_missing</paramname>](#param-if_missing) = <opt>IGNORE</opt>):
    ```python
    from {{% getvar v="product.frames.client.lib_name" %}} import frames_pb2 as fpb
    tsdb_table = "/tsdb/my_metrics"
    client.delete("tsdb", table=tsdb_table, end="2019-06-30T23:59:59Z",
                  if_missing=fpb.IGNORE)
    ```
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/tsdb/tsdb-cli.md" a="tsdb-delete" text="Deleting a TSDB" >}} ({{< xref f="data-layer/tsdb/tsdb-cli.md" t="title" >}})
- {{< xref f="data-layer/reference/frames/tsdb/overview.md" >}}
- {{< xref f="data-layer/reference/frames/client-constructor.md" >}}

