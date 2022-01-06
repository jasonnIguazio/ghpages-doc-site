---
title:  "V3IOPath Class"
keywords: "V3IOPath, v3io, v3io path, nosql tables, tables, table path, files, URI, Path, containerIdentifier"
menu:
  main:
    parent:       "nosql-scala-api"
    identifier:   "nosql-scala-api-v3iopath"
    weight:       500
---

<!-- ---------------------------------------- -->
{{< igz-heading-small group="apiref" type="fqn" >}}

<api>import io.iguaz.v3io.file.V3IOPath</api>

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="description" >}}

A case class for creating a v3io path to a file or directory within a specific container.

{{< note >}}
In future versions, the <api>V3IOPath</api> class is expected to be replaced with the option to set a table path via a Uniform Resource Identifier (URI) string.
{{< /note >}}
{{< comment >}}<!-- [c-V3IOPath-replace-with-URI] See info in IG-5994. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="summary" >}}

[Instance Constructors](#constructors)

```scala
case class V3IOPath(path: Path, containerIdentifier: String) extends Path
```

<!-- //////////////////////////////////////// -->
{{< igz-heading h="2" group="apiref" type="constructors" >}}

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="syntax" id="const-syntax" >}}

```scala
V3IOPath(path: Path, containerIdentifier: String) extends Path
```

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="const-params-n-data-members" >}}

<dl>
  <!-- path -->
  {{< param-doc name="path" id="const-param-path" >}}
  Path to a file or directory within the container specified by the [<paramname>containerIdentifier</paramname>](#const-param-containerIdentifier) parameter.<br/>
  Note that the first path string that you pass to the <func>[Paths.get]({{< url v="java_api_latest" k="full" >}}file/Paths.html)</func> method to create the path must begin with a forward slash (`/`).
  For example, `Paths.get("/myTable")` creates a path to a "myTable" table in the container's root directory.

  {{< param-type >}}<api>[Path]({{< url v="java_api_latest" k="full" >}}file/Path.html)</api>{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}

  <!-- containerIdentifier -->
  {{< param-doc name="containerIdentifier" id="const-param-containerIdentifier" >}}
  The name (alias) of the data container that contains the target file or directory.
  For example, `"mycontainer"`.

  {{< param-type >}}String{{< /param-type >}}
  {{< param-req "R" >}}{{< /param-req >}}
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
{{< igz-heading h="3" group="apiref" type="examples" id="const-examples" >}}

The following example uses the <api>V3IOPath</api> class constructor to initialize a <api>tablePath</api> variable to the v3io path to a "myTable" table within a "tables" directory in a "mycontainer" container:

```scala
import java.nio.file.Paths
import io.iguaz.v3io.file.V3IOPath

val tablePath = V3IOPath(Paths.get("/tables/myTable"), "mycontainer")
```

