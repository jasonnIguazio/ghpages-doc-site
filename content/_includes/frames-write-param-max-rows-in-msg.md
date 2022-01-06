---
---
{{< comment >}}<!-- [ci-include-w-param-xxx] [InfraInfo] (sharonl) (3.12.19)
  There's extra space before the last li param-xxx bullet in the content (in
  this case, `param-default-value`) regardless of the content of this shortcode
  call or of the indentation used in the include file or in the related
  `include` shortcode call. The result is the same when using the `%` or `</>`
  shortcode-call syntax. If replace the `include` shortcode call with the
  following content, the issue disappears (no extra space), regardless of
  whether the `param-doc` call is indented from the start of the line or not.
  For now, I decided this doesn't warrant eliminating the shortcode call.
-->
{{< /comment >}}
<!-- max_rows_in_msg -->
{{< param-doc name="max_rows_in_msg" id="param-max_rows_in_msg" >}}
The maximum number of DataFrame rows to write in each message (i.e., the size of the write chunks).
When the value of this parameter is 0 (default), each DataFrame is written in a single message.

{{< param-type >}}`int`{{< /param-type >}}
{{< param-req "O" >}}{{< /param-req >}}
{{< param-default-value >}}`0`{{< /param-default-value >}}
{{< /param-doc >}}

