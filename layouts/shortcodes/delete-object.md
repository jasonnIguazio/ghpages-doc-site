<!-- delete-object: Delete-collection (table/stream) text.
  [FUTURE-FRAMES-DELETE-BY-FILTER-NOSQL] [V2.8.0-TODO] When the Frames NoSQL
  backends support deleting specific table items, consider mentioning this
  option in this doc (when $0="table).

  [FRAMES-STREAMING-NO-SUPPORT] (sharonl) TODO: When we support the Frames
  streaming backend, edit the implementation to link to the streaming backend's
  delete method for $frames_backend = "streaming" (as currently done only for
  the "NoSQL" backend).

  [FRAMES-V2.5-NO-SUPPORT] I filtered out the Frames reference from the
  streaming doc added by this shortcode - see the uses of the "frames_stream"
  filter and the info in the data-layer/reference/frames/stream/_index.html
  reference file.
  TODO: Consider using this shortcode also for deleting of TSDB tables.

[InfraInfo] [ci-md-shcd-md-fenced-code-w-templates] (sharonl) (17.7.20) I found
templates (such as .Site.Data.vars.product.ver.fs_k8s.data_mount.path or $obj)
within Markdown fenced code (```sh ... ```) in a Markdown shortcode causes the
code block to be processed incorrectly, including displaying ``` and "sh" in
the HTML output. (In some tests using only a variable worked, but the same code
failed in other tests.) I tested with Hugo v0.73.0 (extended) for Windows.
(4.11.20) When testing ```sh MD fenced code in another shortcode with shortcode
variables and site params, also with Hugo v0.73, I found that while the
variable and params were translated correctly in the output, opening angle
brackets (`<`) were translated to `&lt'` in the HTML output; (but for a simple
code block with just "<TEST>", '<`' was translated correctly in the output).
`\<`, `<<`, `&lt;`, or a variable that translates to `&lt;` with `markdownify`
didn't help (and it wouldn't be a good solution anyway). => Therefore, for now, we use the following for relevant code blocks in shortcodes:
<div class="highlight"><pre class="chroma"><code class="language-sh" data-lang="sh">...</code></pre></div>
-->
{{- $obj := .Get 0 -}} <!-- Param $0 supported values: "stream" | "table" -->
<!-- [InfraInfo] The text assumes the object name should be preceded with the
  'a' article (as opposed to "an"); currently, there's no need to make this
  more generic because the expected object types are "stream" or "table". -->
{{- $frames_backend := (cond (eq $obj "stream") "streaming" "NoSQL") -}}
Currently, most {{ $.Site.Data.vars.product.name.lc }} APIs don't have a dedicated method for deleting a {{ $obj -}}.
{{- if or (eq $frames_backend "NoSQL") }}
An exception to this is the [<func>delete</func>]({{ partial "func/xref.html" (dict "ctx" . "f" "data-layer/reference/frames/nosql/delete.md" "t" "url") }}) method of the {{ $.Site.Data.vars.product.frames.name.long_lc }} client's {{ $frames_backend }} backend.
{{- end }}
However, you can use the file-system interface to delete a {{ $obj }} directory from the relevant data container:

<div class="highlight"><pre class="chroma"><code class="language-sh" data-lang="sh">rm -r &lt;path to {{ $obj }}&gt;</code></pre></div>

The following examples delete a "my{{- $obj }}" {{ $obj }} from a "mycontainer" container:

- Local file-system command &mdash;

    <div class="highlight"><pre class="chroma"><code class="language-sh" data-lang="sh">rm -r {{ .Site.Data.vars.product.ver.fs_k8s.data_mount.path -}}/mycontainer/my{{- $obj -}}</code></pre></div>
- Hadoop FS command &mdash;

    <div class="highlight"><pre class="chroma"><code class="language-sh" data-lang="sh">hadoop fs -rm -r v3io://mycontainer/my{{- $obj -}}</code></pre></div>

