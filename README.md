# Iguazio MLOps Platform Documentation-Site Repo

The `iguazio/doc-site` repository includes the sources for generating the documentation web site of the Iguazio MLOps Platform (**"the platform"**).

HTML documentation is generated from Markdown, HTML, and Go templates using the [Hugo](https://gohugo.io) static site generator.
<br/>
**This branch was tested with Hugo version 0.81.0.**
<!-- TODO: Update the version number also in the doc-site wiki. -->

The doc site is published externally at https://www.iguazio.com/docs/, which has **latest-release/** and **vX.Y/** versioned doc-site directories.
https://www.iguazio.com/docs/ redirects to https://www.iguazio.com/docs/latest-release/.

The doc-site **staging web server** is https://igzdocsdev.wpengine.com.
The home page contains links to relevant documentation pages on this site.

<a id="published-docs"></a>

- **Currently published** doc-site copies are found under https://igzdocsdev.wpengine.com/docs/ ([latest-release](https://igzdocsdev.wpengine.com/docs/latest-release/),) and versions with **internal** comments are found at https://igzdocsdev.wpengine.com/internal/docs/ ([latest-release](https://igzdocsdev.wpengine.com/internal/docs/latest-release/)).
- **Development** doc sites are found at https://igzdocsdev.wpengine.com/docs-dev/ ([latest-release](https://igzdocsdev.wpengine.com/docs-dev/latest-release/) &mdash; from the `deveopment` branch), and versions with **internal** comments are found at https://igzdocsdev.wpengine.com/internal/docs-dev/) ([latest-release](https://igzdocsdev.wpengine.com/internal/docs-dev/latest-release/)).
- Occasionally, temporary **documentation drafts** are uploaded to https://igzdocsdev.wpengine.com/doc-drafts/.

For more information about the documentation infrastructure, including installation instructions, see the [doc-site Wiki](https://github.com/iguazio/doc-site/blob/development/README.md).

Some more text I added here.