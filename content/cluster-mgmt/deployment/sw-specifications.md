---
title: "Software Specifications and Restrictions"
description: "Want to learn about the software specifications and restrictions of the Iguazio MLOps Platform? Check out the platform documentation site."
keywords: "software specifications, software specs, software, specifications, specs, restrictions, limitations, known issues, names, object names, item names, attribute names, user names, tenant name, backup, recovery, security, user management, web apis, spark, spark dataframes, nosql spark dataframe, nosql dataframe, presto, range scan, primary key, sharding key, sorting key"
menu:
  main:
    parent:     "deployment-n-specs"
    identifier: "sw-specs"
    weight:     20
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces specs/sw-specifications.md. -->
{{< /comment >}}
{{< comment >}}<!-- [ci-internal-shcd-in-list-item-alignment] [InfraInfo]
  (sharonl) (18.7.20) With Hugo v0.73.0, I couldn't align the output for some
  `internal` shortcodes in list items with the parent item in the output, and
  for multi-line `internal` content (with line breaks, not source multi lines)
  only the first line appeared within the admonition in the output. I tried
  different indentation and spacing solutions + changing the indentation in the
  `internal` partial, but so far unsuccessfully. => For now, I edited the
  source so that such `internal` admonitions appear after instead of within the
  relevant list item (and contain all the content lines within the admonition).
  Also, I had to add spaces between the list items to properly process the list
  items in the output (also for the non-internal builds). TODO: FIXME -->
{{< /comment >}}

Following is a list of software specifications and restrictions for version {{< productVersion num >}} of the {{< product full >}} ("the {{< product lc >}}").
For a list of reserved names in the {{< product lc >}}, see the {{< xref f="data-layer/reference/reserved-names.md" text="reserved-names reference" >}}.
For a list of known issues for the current release, see the {{< xref s="release-notes" f="CURRENTVER" text="release notes" >}}.
<br/>
(Note: For amount values, `M` = million; `B` = billion.)

{{< reg-users-only-note section="1" >}}

{{< internal >}}(sharonl) See also the internal [Specifications](https://confluence.iguazeng.com/pages/viewpage.action?spaceKey=ARC&title=Specifications) and [API limits & constraints](https://confluence.iguazeng.com/pages/viewpage.action?pageId=23102765) Confluence pages.
{{< /internal >}}

{{< comment >}}<!--  -->
<!-- [IntInfo] (sharonl) Orit said there's no need to document the
  collection-name limitation in the internal Confluence specifications page. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## General {#general}

<table>
<tr id="replication-factor">
  {{< td >}}Replication factor{{< /td >}}
  {{< td >}}2{{< /td >}}
</tr>
<tr id="max-sessions">
  {{< td >}}Maximum number of concurrent sessions{{< /td >}}
  {{< td >}}100,000{{< /td >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (29.10.19) Changed in v2.5.0 from
    "Configurable.  The default is unlimited." - see DOC IG-12824. -->
  {{< /comment >}}
<tr id="max-data-access-policy-rules">
  {{< td >}}Maximum number of rules per data-access policy{{< /td >}}
  {{< td >}}100
  {{< internal >}}(sharonl) (3.2.19) I changed the restriction retroactively from "200" following input from Oded and consultation with Orit; see the "[confluence] Architecture > Specifications" email thread, copied in DOC {{< jira ig="9921" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
{{< comment >}}<!-- [FUTURE-MULTI-TENANTS] [IntInfo] (sharonl) (26.6.19) I
  filtered out the max-tenants restriction in the new v2.3.0 specs - after
  editing it from 5 to 2 (Requirement IG-12114 / DOC IG-12115, canceled because
  of no k8s multi-tenancy support) - and also retroactively in the v2.2.0 and
  v2.1.0 specs because since v2.0.0 (docs no longer published) the doc is only
  for the k8s installations and these releases don't support multi-tenancy.
  TODO: When we add support for multi-tenancy for k8s (currently planned for
  v2.5.0), uncomment this restriction and edit it - see v2.5.0 max-tenants
  increase Requirement IG-12432 / DOC IG-12433.
  [INFRA-TODO] When add back the max-tenants doc, add a versioned max_tenants
  product data variable for the relevant release (and newer releases). -->
<tr id="max-tenants">
  {{< td >}}Maximum number of tenants{{< /td >}}
  {{< td >}}2{{< /td >}}
</tr>
{{< /comment >}}
<tr id="max-users">
  {{< td >}}Maximum number of users{{< /td >}}
  {{< td >}}10,000
  {{< internal >}}(sharonl) (3.2.19) I changed the restriction retroactively from "Up to 20,000 users for a single tenant and 100,000 users for the entire cluster" following input from Oded and consultation with Orit; see the "[confluence] Architecture > Specifications" email thread, copied in DOC {{< jira ig="9921" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="max-user-groups">
  {{< td >}}Maximum number of user groups{{< /td >}}
  {{< td >}}64 per user; 1,000 overall.<br/>
      **Note:** If a user is a member of more than 64 user groups, only 64 of the groups (which always include the primary user group) are used for checking data-access permissions.
  {{< internal >}}(sharonl) (6.7.20) I changed the restriction to add the per-user restriction, following a request from Maor and Orit.
    (12.7.20) I added the note after R&D decided we won't increase the number of user groups allowed per user and Orit asked to add an explanation regarding the implications of having more than 64 user groups.
    <br/>
    Orit said that's there's no clear rule which 64 groups will be used for checking data-access permissions, accept for the primary user group, which is guaranteed to be checked.
    Because the data-access policy rules are checked only for the user's primary user group (in addition to the user's directly assigned rules), this restriction affects only POSIX ACLs data-access authorization.
    <br/>
    Orit said that the max user groups per-user restriction doesn't affect a user's management policies, which are derived from all of the user's groups, even if they exceed 64 (+ the user's directly assigned policies).
    <br/>
    See details in v2.10.0 Bug {{< jira ig="16237" >}}, which was closed as _Won't Fix_.
    <br/><br/>
    (3.2.19) I changed the restriction retroactively from "5,000" following input from Oded and consultation with Orit; see the "[confluence] Architecture > Specifications" email thread, copied in DOC {{< jira ig="9921" >}}.
    (We previously noted internally that 5,000 is the desired value since v1.5 but that this wasn't tested by QA.)
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="usernames">
  {{< td >}}Usernames{{< /td >}}
  {{< td >}}Usernames are subject to the following restrictions:

  - Contain only the following characters:

      - Alphanumeric characters (a&ndash;z, A&ndash;Z, 0&ndash;9)
      - Hyphens (-)
      - Underscores (_)
  - Begin with a letter (a&ndash;z, A&ndash;Z)
  - Length of 1&ndash;{{< verkey k="username_max_length" >}} characters

  {{< internal >}}(sharonl) See info in DOC {{< jira ig="11078" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
{{< condition filter="multi_tenancy" filterval="true" >}}
{{< comment >}}<!-- [FUTURE-MULTI-TENANTS] [IntInfo] (sharonl) (15.7.20) I
  retroactively excluded this from the v2.8.0 and v2.5.4 docs, at Orit's
  request, because we currently don't support multi-tenancy and don't plan to
  support it in the foreseeable future. In the past we decided there's no harm
  to keep this restriction even for single-tenant versions, but Orit and Maor
  think the tenant references are confusing for users of single-tenant versions.
-->
{{< /comment >}}
<tr id="tenant-names">
  {{< td >}}Tenant names{{< /td >}}
  {{< td >}}Tenant name are subject to the following restrictions:

  - Contain only the following characters:

      - Alphanumeric characters (a&ndash;z, A&ndash;Z, 0&ndash;9)
      - Underscores (_)

  - Begin with a letter (a&ndash;z, A&ndash;Z)
  - End with an alphanumeric character (a&ndash;z, A&ndash;Z, 0&ndash;9)
  - Length of 1&ndash;{{< verkey k="tenant_name_max_length" >}} characters

  {{< internal >}}(sharonl) See info in DOC {{< jira ig="11078" >}} and DOC {{< jira ig="11813" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
{{< /condition >}}
<tr id="user-passwords">
  {{< td >}}User passwords{{< /td >}}
  {{< td >}}Use passwords are subject to the following restrictions:

  - Contain at least one uppercase letter (A&ndash;Z)
  - Contain at least one lowercase letter (a&ndash;-z)
  - Contain at least one special character (!, @, #, $, %, ^, &, *)
  - Contain at least one digit (0&ndash;9)
  - Length of at least 8 characters

  {{< internal >}}(sharonl) See v2.10.0 Requirement {{< jira ig="14100" >}} to enforce stricter restrictions, and the v2.10.0 release-notes email thread, copied in DOC [IG-16761](https://jira.iguazeng.com/browse/IG-16761?focusedCommentId=67824&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-67824).
  {{< comment >}}<!-- [ci-pwd-restrictions] These restrictions are referenced
    from the installation guides. -->
  {{< /comment >}}
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="project-names">
  {{< td >}}Project names
  {{< /td >}}
  {{< td >}}Project names must conform to the following restrictions ({{< url v="rfc_1123" k="text" link="1" >}} DNS label-name requirements, a.k.a DNS-1123 label):

  - Contain only the following characters:

      - Lowercase letters (a&ndash;z) and numeric digits (0&ndash;9)
      - Hyphens (-)

  - Begin and end with a lowercase letter (a&ndash;z) or a numeric digit (0&ndash;9)
  - Length of 1&ndash;{{< verkey k="project_name_max_length" >}} characters

  (See the [MLRun project-name restrictions](#mlrun-project-names) for information regarding upgrading old MLRun projects that don't meet these requirements.)
  {{< internal >}}[[#project-names](#project-names)] (sharonl) (1.3.21) See v3.0.0 Requirement {{< jira ig="14392" >}} and Platform-backend Sub-Requirement {{< jira ig="16351" >}} and the information in DOC {{< jira ig="17599" >}}.
    <br/>
    See also the separate [MLRun](#mlrun-project-names) and [Nuclio](#nuclio-project-names) restrictions (which refer to this general restriction), including the MLRun old-project-names known issue.
  {{< /internal >}}
  {{< comment >}}<!-- [c-project-name-restrictions] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="dns-dependency">
  {{< td >}}DNS dependency{{< /td >}}
  {{< td >}}{{< product sc >}} startup requires an accessible Domain Name System (DNS).
  {{< internal >}}See info in Bug {{< jira ig="6115" >}} (resolved as _Won't Fix_) and in DOC Task {{< jira ig="5832" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
</table>

{{< internal >}}(sharonl) (19.2.18) Orit said not to mention in the external documentation the number of OSS (object storage service) or the max-versions information.
{{< /internal >}}

<!-- //////////////////////////////////////// -->
## Data Elements {#data-elements}
{{< comment >}}<!-- [IntInfo] (sharonl) Orit suggested this classification
  instead of File System for the directory and file info and NoSQL for the
  attributes info, because of our unified data model. -->
{{< /comment >}}

<table>
<tr id="max-objects">
  {{< td >}}Maximum number of objects{{< /td >}}
  {{< td >}}The maximum supported number of objects depends on the size of the data-node memory and on the number of data nodes.
      The <gui-label>Max Objects &mdash; Single Node</gui-label> column indicates the maximum number of objects on a single data node (which is also the total maximum number of objects on a Development Kit cluster); the <gui-label>Max Objects &mdash; Cluster</gui-label> column indicates the maximum number of objects on the entire cluster for a 3-node cluster (Operational Cluster).
  <table style="width:85%">
  <tr text-align="left">
    <th style="vertical-align:'top'; font-weight:bold;">Deployment Type</th>
    <th style="vertical-align:'top'; font-weight:bold;">Memory Size</th>
    <th style="vertical-align:'top'; font-weight:bold;">Max Objects &mdash; Single&nbsp;Node</th>
    <th style="vertical-align:'top'; font-weight:bold;">Max Objects &mdash; Cluster</th>
  </tr>
  <!-- Cloud - AWS -->
  <!-- AWS i3.8xlarge -->
  <tr id="max-objects-aws-i3-8xlarge">
  {{< td >}}Cloud &mdash; AWS i3.8xlarge{{< /td >}}
  {{< td >}}244 GiB{{< /td >}}
  {{< td >}}500M{{< /td >}}
  {{< td >}}1B{{< /td >}}
  </tr>
  <!-- AWS i3.4xlarge -->
  <tr id="max-objects-aws-i3-4xlarge">
  {{< td >}}Cloud &mdash; AWS i3.4xlarge{{< /td >}}
  {{< td >}}122 GiB{{< /td >}}
  {{< td >}}180M{{< /td >}}
  {{< td >}}360M{{< /td >}}
  </tr>
  <!-- AWS i3.2xlarge -->
  <tr id="max-objects-aws-i3-2xlarge">
  {{< td >}}Cloud &mdash; AWS i3.2xlarge{{< /td >}}
  {{< td >}}61 GiB{{< /td >}}
  {{< td >}}90M{{< /td >}}
  {{< td >}}90M{{< /td >}}
  </tr>
  <!-- Azure L16s_v2 -->
  <tr id="max-objects-azure-l16s-v2">
  {{< td >}}Cloud &mdash; Azure L16s_v2{{< /td >}}
  {{< td >}}128 GB{{< /td >}}
  {{< td >}}180M{{< /td >}}
  {{< td >}}360M{{< /td >}}
  </tr>
  <!-- Virtual Machines (VM) -->
  <!-- Large VM data node (156 GB) -->
  <tr id="max-objects-vm-large-node">
  {{< td >}}VM &mdash; large node{{< /td >}}
  {{< td >}}256 GB{{< /td >}}
  {{< td >}}500M{{< /td >}}
  {{< td >}}1B{{< /td >}}
  </tr>
  <!-- Small VM data node (128 GB) -->
  <tr id="max-objects-vm-small-node">
  {{< td >}}VM &mdash; small node{{< /td >}}
  {{< td >}}128 GB{{< /td >}}
  {{< td >}}180M{{< /td >}}
  {{< td >}}360M{{< /td >}}
  </tr>
  <!-- Bare-Metal -->
  <tr id="max-objects-bare-metal">
  {{< td >}}Bare-metal{{< /td >}}
  {{< td >}}512 GB{{< /td >}}
  {{< td >}}500M{{< /td >}}
  {{< td >}}1B{{< /td >}}
  </tr>
  </table>
    {{< comment >}}<!-- [IntInfo] (sharonl) (25.5.20) I updated the data for
      v2.8.0 and also retroactively for v2.5.4 to distinguish between the
      different deployment types, per Adi's request. -->
    {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="max-containers">
  {{< td >}}Maximum number of data containers{{< /td >}}
  {{< td >}}
  - Cloud &mdash; 10
  - VM &mdash; 20
  - Bare-metal &mdash; 20
  {{< /td >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (25.5.20) I edited the data for
    v2.8.0 and also retroactively for v2.5.4 to add VM data and use a list
    format. -->
  {{< /comment >}}
</tr>
<tr id="max-dirs-per-cluster">
  {{< td >}}Maximum number of collections per cluster
  {{< /td >}}
  {{< td >}}The maximum number of collections (tables/streams/directories) in a cluster depends on the size of the data-node memory.
  <table style="width:70%">
  <tr text-align="left">
    <th style="vertical-align:'top'; font-weight:bold;">Deployment Type</th>
    <th style="vertical-align:'top'; font-weight:bold;">Memory Size</th>
    <th style="vertical-align:'top'; font-weight:bold;">Max Elements</th>
  </tr>
  <!-- Cloud - AWS -->
  <!-- AWS i3.8xlarge -->
  <tr id="max-dirs-per-cluster-aws-i3-8xlarge">
  {{< td >}}Cloud &mdash; AWS i3.8xlarge{{< /td >}}
  {{< td >}}244 GiB{{< /td >}}
  {{< td >}}10M{{< /td >}}
  </tr>
  <!-- AWS i3.4xlarge -->
  <tr id="max-dirs-per-cluster-aws-i3-4xlarge">
  {{< td >}}Cloud &mdash; AWS i3.4xlarge{{< /td >}}
  {{< td >}}122 GiB{{< /td >}}
  {{< td >}}5M{{< /td >}}
  </tr>
  <!-- AWS i3.2xlarge -->
  <tr id="max-dirs-per-cluster-aws-i3-2xlarge">
  {{< td >}}Cloud &mdash; AWS i3.2xlarge{{< /td >}}
  {{< td >}}61 GiB{{< /td >}}
  {{< td >}}1M{{< /td >}}
  {{< comment >}}<!-- [c-aws-i3.2xlarge-spec] [IntInfo] (sharonl) (5.4.21)
    Added retroactively for v3.0 (the current latest release) based on info
    received from Orit. Note that the spec data is intentionally lower than
    what is technically supported. See the "i3.2xlarge max data elements" email
    thread, copied in DOC IG-17766. -->
  {{< /comment >}}
  </tr>
  <!-- Azure L16s_v2 -->
  <tr id="max-dirs-per-cluster-azure-l16s-v2">
  {{< td >}}Cloud &mdash; Azure L16s_v2{{< /td >}}
  {{< td >}}128 GB{{< /td >}}
  {{< td >}}5M{{< /td >}}
  </tr>
  <!-- Virtual Machines (VM) -->
  <!-- Large VM data node (156 GB) -->
  <tr id="max-dirs-per-cluster-vm-large-node">
  {{< td >}}VM &mdash; large node{{< /td >}}
  {{< td >}}256 GB{{< /td >}}
  {{< td >}}10M{{< /td >}}
  </tr>
  <!-- Small VM data node (128 GB) -->
  <tr id="max-dirs-per-cluster-vm-small-node">
  {{< td >}}VM &mdash; small node{{< /td >}}
  {{< td >}}128 GB{{< /td >}}
  {{< td >}}5M{{< /td >}}
  </tr>
  <!-- Bare-Metal -->
  <tr id="max-dirs-per-cluster-bare-metal">
  {{< td >}}Bare-metal{{< /td >}}
  {{< td >}}512 GB{{< /td >}}
  {{< td >}}10M{{< /td >}}
  </tr>
  </table>
  {{< /td >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) This correlates to the "Number of
    directories" entry on our internal Specifications Confluence page.
    (25.5.20) I updated the data for v2.8.0 and also retroactively for v2.5.4
    to distinguish between the different deployment types, per Adi's request.
    (1.6.20) I edited the doc to distinguish by the size of the data-node
    memory and not just the deployment type (following Maor's request and in
    consultaiton with Adi). -->
  {{< /comment >}}
</tr>
<tr id="max-elements-in-collection">
  {{< td >}}Maximum elements in a collection (table/stream/directory){{< /td >}}
  {{< td >}}The maximum elements in a collection equals the maximum number of objects per data node and depends on the size of the data-node memory.
  <table style="width:70%">
  <tr text-align="left">
    <th style="vertical-align:'top'; font-weight:bold;">Deployment Type</th>
    <th style="vertical-align:'top'; font-weight:bold;">Memory Size</th>
    <th style="vertical-align:'top'; font-weight:bold;">Max Elements</th>
  </tr>
  <!-- Cloud - AWS -->
  <!-- AWS i3.8xlarge -->
  <tr>
  {{< td >}}Cloud &mdash; AWS i3.8xlarge{{< /td >}}
  {{< td >}}244 GiB{{< /td >}}
  {{< td >}}500M{{< /td >}}
  </tr>
  <!-- AWS i3.4xlarge -->
  <tr>
  {{< td >}}Cloud &mdash; AWS i3.4xlarge{{< /td >}}
  {{< td >}}122 GiB{{< /td >}}
  {{< td >}}180M{{< /td >}}
  </tr>
  <!-- Azure L16s_v2 -->
  <tr>
  {{< td >}}Cloud &mdash; Azure L16s_v2{{< /td >}}
  {{< td >}}128 GB{{< /td >}}
  {{< td >}}180M{{< /td >}}
  </tr>
  <!-- Virtual Machines (VM) -->
  <!-- Large VM data node (156 GB) -->
  <tr>
  {{< td >}}VM &mdash; large node{{< /td >}}
  {{< td >}}256 GB{{< /td >}}
  {{< td >}}500M{{< /td >}}
  </tr>
  <!-- Small VM data node (128 GB) -->
  <tr>
  {{< td >}}VM &mdash; small node{{< /td >}}
  {{< td >}}128 GB{{< /td >}}
  {{< td >}}180M{{< /td >}}
  </tr>
  <!-- Bare-Metal -->
  <tr>
  {{< td >}}Bare-metal{{< /td >}}
  {{< td >}}512 GB{{< /td >}}
  {{< td >}}500M{{< /td >}}
  </tr>
  </table>
  {{< /td >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) This correlates to the "Max directory
    size" entry in our internal Specifications Confluence page.
    (25.5.20) The internal spec refers to the max objects per node - i.e., the
    #max-objects data for a single data node. I updated the data for v2.8.0 and
    also retroactively for v2.5.4 to distinguish between different deployment
    types, per Adi's request. -->
  {{< /comment >}}
</tr>
<tr id="max-object-path-size">
  {{< td >}}Maximum object path size{{< /td >}}
  {{< td >}}The maximum size of the relative path to an object (file) within a given data container is 4,096 bytes.
  {{< /td >}}
</tr>
<tr id="max-object-size">
  {{< td >}}Maximum object size{{< /td >}}
  {{< td >}}The maximum size of an object (file) depends on the interface:

  - For the Simple-Object Web API (<api>PUT Object</api>) &mdash; <nobr>5 GB</nobr>
  {{< internal >}}(sharonl) (1.8.18) I edited the max object (file) size for the Simple-Object Web API (<api>PUT Object</api>), retroactively, in the v1.7.1 and v1.5.4 specs, from 5 GB to 2 GB because of v1.7 Bug {{< jira ig="8695" >}} "[nginx] unable to upload a file larger than 2GB in a single shot".
QA didn't test 5 GB in v1.5 and Gilad confirmed that if it doesn't work in v1.7 it likely doesn't work in v1.5 either.
<br/>
(26.6.19) The max object size for <api>PUT Object</api> was increased from 2 GB to 5 GB and tested by QA in v2.0.0, but the our internal [Specifications](http://confluence.iguazeng.com:8090/display/ARC/Specifications) incorrectly logged this change only for v2.3.0. I decided not to retroactively edit the already published v2.2 and v2.1 specs and update the specs only beginning with v2.3.0.
  {{< /internal >}}

  - For the file-system interface (file creation) &mdash; <nobr>1 TB</nobr>.
      <br/>
      The `truncate -s` command can be used to add a maximum of <nobr>240 MB</nobr> to the current file size.
  {{< internal >}} (sharonl) (19.7.18) See the info in Bug
{{< jira ig="7501" >}} and DOC {{< jira ig="7417" >}}.
  {{< /internal >}}

  - For other APIs &mdash; <nobr>500 GB</nobr>.
  {{< /td >}}
</tr>
<tr id="nosql-max-item-size">
  {{< td >}}Maximum NoSQL-table item size{{< /td >}}
  {{< td >}}The maximum size of a NoSQL-table item (row) &mdash; i.e., the maximum total size of the item's attributes &mdash; is <nobr>1.5 MB</nobr>.
  {{< comment >}}<!-- [IntInfo] (sharonl) (22.8.19) Orit explained (and Golan
    confirmed) that the table-item size refers to the maximum size of the
    item's (object's) attributes, as opposed to the max object-size
    restriction, which refers to the max size of the object file (which is
    bigger). -->
  {{< /comment >}}
  {{< comment >}}<!--  [ci-internal-shcd-in-list-item-alignment] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="displayed-object-size">
  {{< td >}}Displayed object size{{< /td >}}
  {{< td >}}Displayed object (file) sizes don't include the size of the object's attributes.
  {{< internal >}}(sharonl) (19.2.18) The container size does include the attribute sizes of the contained objects, but Orit said there's no need to mention this here.
    <br/>
    (22.7.18) I removed the sentence "Similarly, displayed collection (table/stream/directory) sizes don't include the attribute sizes of the collection's objects." after Ori confirmed with Orit that we also don't display file sizes for collections (it's not the expected behavior, unlike attribute sizes for objects).
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="max-distinct-attr-names-per-container">
  {{< td >}}Maximum number of distinct attribute names per container{{< /td >}}
  {{< td >}}64,000{{< /td >}}
    <!-- [IntInfo] (sharonl) (19.2.18) Orit said that the restrictions is for
      the maximum number of different (distinct) attribute names across the
      container. The same attribute name in different tables is counted once.
    -->
</tr>
<tr id="max-attrs-per-object">
  {{< td >}}Maximum number of attributes per object{{< /td >}}
  {{< td >}}Between 400 and 1600 attributes, depending on the attribute type
  {{< internal >}}(sharonl) (19.2.18) Orit said to use the generic phrasing above and not to provide the specific page and attribute-type information from our internal Confluence specs page.
    <br/>
    (22.7.18) The actual values are 403&ndash;1612, but I rounded them down at Ori's request (just because the rounded numbers look better).
  {{< /internal >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (24.21.8) Orit requested that I
    rephrase from "403&ndash;1612 &mdash; depending on the attribute type". She
    thought the numeric range seems weird in this context. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="max-attr-size">
  {{< td >}}Maximum attribute size{{< /td >}}
  {{< td >}}The maximum object (item) attribute size is 61,200 bytes for string attributes and 1 MB for other attribute types, subject to the following restrictions:

  - For blob attributes when using the NoSQL Web API, the maximum size applies to the decoded data  for the <api>PutItem</api> operation and to the encoded data for the <api>UpdateItem</api> operation.
      {{< internal >}}(sharonl) See v2.0.0 Bug {{< jira ig="9409" >}}, which Orit decided to close as _"Won't Fix"_ and just document the restrictions.
      {{< /internal >}}

  - The total size of all attributes whose size is smaller or equal to 200 bytes cannot exceed 8 KB.

  {{< internal >}}(sharonl) The maximum attribute size was increased to 1 MB initially for v1.7, but this was officially released only in v2.0.0 &mdash; see Requirement {{< jira ig="6469" >}}.
  {{< /internal >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (25.6.18) Adi approved my decision
    not to document these restrictions in the release notes (as was the case in
    v1.0 & v1.5). -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="stream-max-shards">
  {{< td >}}Maximum number of shards in a stream{{< /td >}}
  {{< td >}}4,096{{< /td >}}
</tr>
<tr id="stream-max-retention-period">
  {{< td >}}Maximum stream retention period{{< /td >}}
  {{< td >}}1 year{{< /td >}}
</tr>
<tr id="object-names">
  {{< td >}}Object names{{< /td >}}
  {{< td >}}Names of data objects (such as items and files) are subject to the general [file-system naming restrictions](#file-names), including a maximum length of {{< verkey k="object_name_max_length" >}} characters.
  In addition &mdash;

  - A period in an object name indicates a compound name of the format `sharding key>.<sorting key>`.
    See {{< xref f="data-layer/objects/object-names-and-keys/" >}}.
{{< comment >}}<!-- [c-period-in-object-name] IntInfo: See also the
      similar info in the data-layer/objects/object-names-and-keys/_index.md
      #object-name-restrictions doc and in other related documentation. -->
{{< /comment >}}
{{< internal >}}(sharonl) The object-name restrictions are documented also in {{< xref f="data-layer/objects/object-names-and-keys/" a="object-name-restrictions" >}}.
{{< /internal >}}
{{< comment >}}<!-- [ci-indented-excluded-output-shcd-extra-space-in-output]
  [InfraInfo] (sharonl) (27.8.19) (Hugo v57.0.2) Indenting the `comment` or
  `internal` opening and closing shortcode-call tags adds extra space in the
  output for the excluded text. This is true for both the `%` and `<`/`>`
  shortcode-call syntax. -->
{{< /comment >}}
  {{< /td >}}
</tr>
<tr id="container-names">
  {{< td >}}Container names{{< /td >}}
  {{< td >}}Container names are subject to the general [file-system naming restrictions](#file-names) and the following additional restrictions:

  - Contain only the following characters:

      - Lowercase letters (a&ndash;z) and numeric digits (0&ndash;9)
      - Hyphens (-)
      - Underscores (_)

  - Begin and end with a lowercase letter (a&ndash;z) or a numeric digit (0&ndash;9)
  - Contain at least one lowercase letter (a&ndash;z)
  - Not contain multiple successive hyphens (-) or underscores (_)
  - Length of 1&ndash;{{< verkey k="container_name_max_length" >}} characters

  {{< internal >}}(sharonl) The container-name restrictions are documented also in {{< xref f="data-layer/containers/container-names.md" a="container-name-restrictions" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="attribute-names">
  {{< td >}}Attribute names{{< /td >}}
  {{< td >}}Attribute names are subject to the general [file-system naming restrictions](#file-names) and the following additional restrictions:

  - Contain only the following characters:

      - Alphanumeric characters (a&ndash;z, A&ndash;Z, 0&ndash;9)
      - Underscores (_)

  - Begin either with a letter (a&ndash;z, A&ndash;Z) or with an underscore (_)
  - Not identical to a reserved name &mdash; see {{< xref f="data-layer/reference/reserved-names.md" >}}
  - Length of 1&ndash;{{< verkey k="attr_name_max_length" >}} characters

  {{< internal >}}(sharonl) The attribute-name restrictions are documented also in {{< xref f="data-layer/objects/attributes.md" a="attribute-names" >}}.
    <br/>
    The maximum attribute-name size is {{< verkey k="attr_name_max_size" >}} bytes, which is equivalent to {{< verkey k="attr_name_max_length" >}} characters + the Null character.<br/>
    See additional information in DOC Task {{< jira ig="6818" >}}, R&D Task {{< jira ig="6809" >}}, and Bug {{< jira ig="9023" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="sharding-key-no-periods">
  {{< td >}}Sharding-key value{{< /td >}}
  {{< td >}}The value of an object's sharding key cannot contain periods, because the leftmost period in an object's primary-key value (name) is assumed to be a separator between sharding and sorting keys.
  {{< comment >}}<!-- [c-sharding-key-no-periods]; [c-period-in-object-name] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="users-container-restrictions">
  {{< td >}}"{{< getvar v="product.users_container.name" >}}" container{{< /td >}}
  {{< td >}}
  - Don't attempt to delete the predefined "{{< getvar v="product.users_container.name" >}}" container.
  - If you have a web-based shell, Jupyter Notebook, or Zeppelin service, don't delete the <dirname>{{< getvar v="product.running_user.envar_value" >}}</dirname> running-user directory in the "{{< getvar v="product.users_container.name" >}}" container or the auto-generated service files in this directory.

{{< internal >}}(sharonl) These restrictions are referenced also from the
    {{< xref f="data-layer/containers/predefined-containers.md" a="users-container-restrictions-note" >}} page.
    <br/>
    See also v2.2.0 Requirement {{< jira ig="11076" >}} (UI) and Sub-Task {{< jira ig="11271" >}} (Platform backend) to prevent the deletion of this container from the {{< productUI short_lc >}} (DOC {{< jira ig="11247" >}}).
{{< /internal >}}
{{< comment >}}<!-- [c-users-container-restrictions] See additional info in DOC
    IG-10843 and DOC IG-11247. -->
{{< /comment >}}
{{< comment >}}<!-- [ci-indented-excluded-output-shcd-extra-space-in-output] -->
{{< /comment >}}
  {{< /td >}}
</tr>
<tr id="stream-shard-file-ops">
  {{< td >}}Stream-shard file operations{{< /td >}}
  {{< td >}}Don't perform any file operations other than delete on stream-shard directories by using the Simple-Object Web API or the file-system interface (including commands that trigger such operations, such as <cmd>vi</cmd> or <cmd>cat</cmd>).
    Such operations should be executed only via a dedicated streaming API, such as the {{< xref f="data-layer/reference/web-apis/streaming-web-api/" text="Streaming Web API" >}}.
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## File System {#file-system}

{{< note id="fs-notes" >}}
See also the files and directories information in the [Data Elements](#data-elements) section.
{{< /note >}}

<table>
<tr id="file-names">
  {{< td >}}File and directory names{{< /td >}}
  {{< td >}}All files and directories in the {{< product lc >}} &mdash; including containers, tables, streams, and attributes &mdash; are subject to the file-naming restrictions of the Linux operating system.
  <br/>
  The size of a file or directory name must be between 1 and {{< verkey k="object_name_max_length" >}} characters.

  {{< note id="file-n-dir-w-same-name-in-same-path-note" >}}
  The {{< product lc >}} allows using the same name for a file and a directory that reside in the same path.
  However, you cannot access such files and directories from the file-system interface because of the file-system naming restrictions.
  {{< internal >}}(sharonl) (25.7.18) This note was added at Orit's request.
    See more information in Bug {{< jira ig="6921" >}} and  DOC {{< jira ig="7417" >}}.
  {{< /internal >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) The note was added in v1.7.1 (v1.7 GA)
    and merged retroactively to the v1.5 specs as well -->
  {{< /comment >}}
  {{< /note >}}
  {{< /td >}}
</tr>
<tr id="files-moving-and-renaming">
  {{< td >}}Moving and renaming files{{< /td >}}
  {{< td >}}The maximum file size when moving or renaming files using a local file-system commands is 30 GB.
    To move or rename a larger file, use an Hadoop FS command.
    {{< internal >}}See the information in Bug {{< jira ig="9801" >}} and DOC {{< jira ig="9921" >}} (v2.0.0 specs-update).
    {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="dir-cp-mv-rename">
  {{< td >}}Moving (renaming) directories{{< /td >}}
  {{< td >}}
  - Moving (renaming) of directories is not supported.
  - Renaming of streams is not supported

  See also the specific [Jupyter Notebook directory copy and move restrictions](#jupyter-dir-cp-mv-rename).
  {{< internal >}} (JillG) (23.9.21) Moving is supported from v3.2 IG-16679 so all restrictions on moving was removed. (sharonl) (13.10.20) Added for the new v2.10.0 doc; (18.10.20) retroactively merged to v2.8.0.
    This spec note replaces the previous v2.8.0 RNs `#ki-jupyter-dir-rename` known issue, which was retroactively removed.
    The changes are relevant also to v2.5, but we decided not to edit the v2.5 docs.
    See the information in v2.10.0 Requirement {{< jira ig="15813" >}} and the related [#jupyter-dir-cp-mv-rename](#jupyter-dir-cp-mv-rename) Jupyter specs &amp; restrictions entry.
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="sparse-files">
  {{< td >}}Sparse files{{< /td >}}
  {{< td >}}Sparse files are not supported:
      the physical space consumed by such files in the {{< product lc >}} is the same as the logical space, including all holes.
    {{< internal >}}(26.10.20) Added retroactively on on active doc sites (v2.10.0, v2.8.0, and v2.5.4).
        See Bug {{< jira ig="16909" >}}.
    {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="dir-cp-mv-rename">
</table>

<!-- //////////////////////////////////////// -->
## Security {#security}

<table>
<tr id="auth-policies-distribution-time">
  {{< td >}}Authorization-policies distribution
  {{< /td >}}
  {{< td >}}In some cases, authorization-policies distribution can take up to 30 seconds.
  {{< internal >}}(sharonl) (19.7.18) See info in Bug {{< jira ig="7223" >}} and in DOC {{< jira ig="7417" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="idp-max-imported-users">
  {{< td >}}Maximum number of imported IdP users
  {{< /td >}}
  {{< td >}}1,000
  {{< internal >}}(sharonl) (28.2.19) See info in Bug {{< jira ig="10370" >}} and in DOC {{< jira ig="9921" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="symlink-data-access-permiss">
  {{< td >}}Symbolic links
  {{< /td >}}
  {{< td >}}For symbolic links, the {{< product lc >}} checks the data-access policy rules and POSIX ACLs of both the source and destination locations.
  {{< internal >}}(sharonl) (3.11.19) Added to the v2.5.0 docs and retroactively also to the v2.3.1 docs, at Orit's request.
    This is documented also in the {{< xref f="users-and-security/security.md" a="symlink-data-access-permiss-note" text="security documentation" >}}.
    See info in DOC {{< jira ig="12001" >}}.
  {{< /internal >}}
  {{< comment >}}<!-- [c-symlink-data-access-permiss] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Expressions {#expressions}
{{< comment >}}<!-- [IntInfo] (sharonl) We reference this section from the
  #expression-notes notes on the Expressions reference Overview page. -->
{{< /comment >}}

<table>
<tr id="expression-max-length">
  {{< td >}}Maximum length of an expression{{< /td >}}
  {{< td >}}8 KB{{< /td >}}
</tr>
<tr id="expression-max-operators">
  {{< td >}}Maximum number of operators in an expression{{< /td >}}
  {{< td >}}700{{< /td >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (14.11.18) "operators" in this
    context also includes functions calls. Gilad said that from the code
    perspective, function calls are also operators. (He didn't know for sure
    whether any use of parentheses would also count as an operator.) -->
  {{< /comment >}}
</tr>
<tr id="expression-backslash-no-support">
  {{< td >}}Backslash in expressions{{< /td >}}
  {{< td >}}The backslash character (\\) isn't supported within expressions in the current release.
  {{< internal >}}(sharonl) (16.7.19) See Bug {{< jira ig="12722" >}}.
  {{< /internal >}}
  {{< comment >}}<!-- [c-expressions-backslash-no-support] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## MLRun {#mlrun}

{{< note id="mlrun-notes" >}}
The restrictions refer to MLRun version {{< verkey k="mlrun.version_short" >}}, which is used in version {{< productVersion num >}} of the {{< product lc >}}.
For full specifications and restrictions, see the {{< xref f="ds-and-mlops/" text="MLRun documentation" >}}.
{{< /note >}}

<table>
<tr id="mlrun-project-names">
  {{< td >}}Project names
  {{< /td >}}
  {{< td >}}See the general [project-name restrictions](#project-names).
    Note: Prior to {{< product lc >}} version 3.0.0 / MLRun version 0.6.0, these restrictions weren't enforced for MLRun projects.
    Older MLRun projects whose names don't conform to the updated restrictions will be in a degraded mode and won't have Nuclio functionality (no serverless functions or API gateways).
    To fix this you need to replace the old projects (you cannot simply rename them).
    For assistance in upgrading old projects, contact {{< company >}}'s {{< email id="support" link="1" text="support team" >}}.
    {{< internal >}}[[#mlrun-project-names](#mlrun-project-names)] (sharonl) (1.3.21)
      See v3.0.0 Requirement {{< jira ig="14392" >}} and Platform-backend Sub-Requirement {{< jira ig="16351" >}} and the information in DOC {{< jira ig="17599" >}}.
      <br/>
      This is also a known issue in the release notes ({{< xref s="release-notes" f="CURRENTVER" a="ki-mlrun-misnamed-old-projects" text="#ki-mlrun-misnamed-old-projects" >}}), starting with the v3.0.0 release notes.
    {{< /internal >}}
    {{< comment >}}<!-- [c-project-name-restrictions] -->
    {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Nuclio {#nuclio}

{{< note id="nuclio-notes" >}}
The restrictions refer to Nuclio version {{< verkey k="nuclio.version_short" >}}, which is used in version {{< productVersion num >}} of the {{< product lc >}}.
For full specifications and restrictions, see the [Nuclio documentation]({{< public-gh ghid="nuclio_nuclio" path="/" >}}).
{{< /note >}}

{{< comment >}}<!-- [c-nuclio-auto-scaling-w-product-streams] (sharonl)
  (1.11.19) Yaron H. told me that Nuclio auto scaling doesn't work well with our
  custom product streams (as opposed to Kafka streams). (I'm not sure whether
  this applies also to scale to zero.) (3.11.19) Orit said we don't need to
  document this because most Nuclio users don't currently use the platform
  streams. I noted this in Requirement IG-11461. -->
{{< /comment >}}

<table>
<tr id="nuclio-reserved-names">
  {{< td >}}Reserved names
  {{< /td >}}
  {{< td >}}The following names are reserved for internal use and cannot be used as the names of Nuclio functions or API gateways:

  - <api>controller</api>
  - <api>dashboard</api>
  - <api>dlx</api>
  - <api>scaler</api>
    {{< comment >}}<!-- [c-nuclio-reserved-names] [IntInfo] (sharonl) (23.2.21)
      I added this in the v3.0.0 RNs. Previously, we had a Nuclio section in
      the reserved-names.md reference that included only the restriction not to
      name Nuclio functions "dashboard" - a restriction that wasn't enforced
      before v3.0.0 (Nuclio v1.5), resulting in Bug IG-16818 (inaccessible
      "Projects" dashboard page upon deployment of a "dashboard" Nuclio
      function"), for which we had a known issue in the v2.10.0 and v2.8.0
      (retroactive) RNs - #ki-nuclio-function-name-dashboard
      [c-nuclio-function-name-dashboard]. The v3.0.0 resolution was to prevent
      using reserved names (including "dashboards") for Nuclio functions and
      API gateways. As part of the v3.0.0 doc-site restructure and the move of
      most of the platform's API reference documentation to the data-layer
      section, I decided to also cancel the Nuclio section in this reference
      (as this was the only non-data-layer API in this reference) and document
      the reserved Nuclio API names in the Nuclio SW specs and restrictions
      section. (The reserved-names reference already had a general reference to
      the SW specs & restrictions doc for additional information.) -->
    {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="nuclio-project-names">
  {{< td >}}Project names
  {{< /td >}}
  {{< td >}}See the general [project-name restrictions](#project-names).
    {{< internal >}}[[#nuclio-project-names](#nuclio-project-names)] (sharonl) (1.3.21) See v3.0.0 Requirement {{< jira ig="14392" >}} and Platform-backend Sub-Requirement {{< jira ig="16351" >}} and the information in DOC {{< jira ig="17599" >}}.
      <br/>
      See also the related MLRun restriction ([#mlrun-project-names](#mlrun-project-names)).
      For Nuclio projects, we enforced the project-name restrictions from the UI also prior to {{< product lc >}} v3.0.0 (actually, we enforced slightly stricter DNS-1035 label restrictions, which don't permit the names to begin with a digit), so I decided not to add a similar old-projects note and known issue for Nuclio projects as done for MLRun, even though we added the naming-restrictions enforcement to the Nuclio API only in Nuclio v1.5.x / Platform v3.0.0 (confirmed with Liran &mdash; see {{< jira ig="16351" >}}.
    {{< /internal >}}
    {{< comment >}}<!-- [c-project-name-restrictions] -->
    {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="nuclio-offline-deploy">
  {{< td >}}Offline function deployment
  {{< /td >}}
  {{< td >}}As a general rule, you can deploy Nuclio functions also in air-gapped environments without an internet connection (a.k.a. "dark sites").
      However, for code languages (function runtimes) that download files dynamically during the build, offline deployment might either require an additional effort or might not be possible.
      For example &mdash;

  - <a id="nuclio-offline-deploy-unsupported-langs"></a>Offline deployment of **Ruby**, **Node.js**, and **.NET Core** Nuclio functions is currently not supported.
      {{< internal >}}(sharonl) (7.10.20) See Bug {{< jira ig="13134" >}}. This is also documented as a known issue in the release notes {{< xref s="release-notes" f="CURRENTVER" a="ki-nuclio-unsupported-dark-site-langs" text="#ki-nuclio-unsupported-dark-site-langs" >}}. (18.11.20) Bug IG-13134 was resolved as _Won't Fix_. (25.2.12) I disconnected the related release-notes known issue from the bug and marked the known issue internally as a permanent known issue. For more information, see Bug IG-13134 and the internal info for this known issue.
        {{< /internal >}}
      {{< comment >}}<!-- [c-nuclio-unsupported-dark-site-langs] -->
      {{< /comment >}}

  - <a id="nuclio-offline-deploy-go"></a>Offline deployment of **Go** Nuclio functions requires implementing a solution in which the necessary module files are available during the build.
      The reason for this is that {{< product lc >}} version {{< productVersion num >}} uses Nuclio version {{< verkey k="nuclio.version" >}}, which uses [Go modules](https://github.com/golang/go/wiki/Modules), which download module files dynamically.
      You can bypass this problem, for example, by doing either of the following:

      - Use Nuclio to build the function on an environment with an internet connection, and then push the function's Docker image to the Docker Registry service of your air-gapped {{< product lc >}} environment.
          Once the Docker image is available in the system's Docker Registry, you can deploy a Nuclio function using this Docker image.
      - Set up a Go proxy in your offline platform environment that contains the required modules for building the function, and use it to serve the modules for the build.
            Note that this implementation is outside the scope of the {{< company >}} support.
      {{< internal >}}(sharonl) (7.10.20) See Bug {{< jira ig="16556" >}} (closed as _Won't Fix_).
      {{< /internal >}}
      {{< comment >}}<!-- [c-nuclio-go-offline-deploy] [IntInfo] (sharonl)
        (7.10.20) We moved to Go modules in Nuclio v1.4.2, which used Go v1.4,
        and then we upgraded to Go v1.4.3 in Nuclio v1.4.14. Platform v2.8 uses
        Nuclio v1.3.25, which used an earlier version Go and didn't use Go
        modules, so this issue was introduced in the platform in v2.10, which
        uses Nuclio v1.4.17. We added a note in the v2.10.0 release notes
        regarding this change with a reference to this specs doc. See the
        comments in Bug IG-16556 for more information. -->
      {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="nuclio-scale-to-zero">
  {{< td >}}Scale to zero
  {{< /td >}}
  {{< td >}}Functions that have been scaled to zero can only be awoken by using an HTTP trigger.
   {{< comment >}}<!-- [c-nuclio-scale-to-zero-http-trigger] -->
   {{< /comment >}}
   Note that you can avoid scaling a function to zero by setting its minimum-replicas configuration parameter to a value higher than zero.
   {{< comment >}}<!-- [nuclio-scale-to-zero-avoid-w-min-replicas-gt-0] -->
   {{< /comment >}}
  {{< /td >}}
</tr>
</table>


<!-- //////////////////////////////////////// -->
## Web APIs {#web-apis}

<!-- ---------------------------------------- -->
### NoSQL Web API {#nosql-web-api}

<table>
<tr id="nosql-web-api-max-json-body-size">
  {{< td >}}Maximum JSON body size{{< /td >}}
  {{< td >}}<nobr>{{< verkey k="web_api_json_body_max_size" >}}</nobr>
    {{< internal >}}(sharonl) I added a similar {{< xref f="data-layer/reference/web-apis/nosql-web-api/overview.md" a="max-json-body-size" text="note" >}} in the NoSQL Web API reference overview.
    {{< /internal >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) Orit said that 1 MB = 1,024. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="nosql-web-api-range-scan-no-sup-w-parallel-scan">
  {{< td >}}Parallel range scan{{< /td >}}
  {{< td >}}<api>GetItems</api> doesn't support combining parallel table scans and range scans in the same request.
    {{< internal >}} (sharonl) See info in DOC {{< jira ig="7260" >}}.
    {{< /internal >}}
  {{< /td >}}
</tr>
</table>

<!-- ---------------------------------------- -->
### Streaming Web API {#streaming-web-api}

<table>
<tr id="stream-web-api-max-putrecords-json-body-size">
  {{< td >}}Maximum <api>PutRecords</api> JSON body size{{< /td >}}
  {{< td >}}<nobr>10 MB</nobr>
    {{< internal >}}(sharonl) (24.2.18) Based on information from Orit and Meir.
Currently there's no JIRA ticket to change this restriction.
I added a similar {{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" a="max-json-body-size" text="note" >}} in the <api>PutRecords</api> reference documentation.
    {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="streaming-web-api-max-record-size">
  {{< td >}}Maximum record size{{< /td >}}
  {{< td >}}2 MB{{< /td >}}
</tr>
<tr id="stream-web-api-putrecords-max-records">
  {{< td >}}Maximum number of records that can be added in a single <api>PutRecords</api> operation{{< /td >}}
  {{< td >}}1,000
    {{< internal >}}(sharonl) This restriction is also documented in the description of the <api>PutRecords</api> <paramname>{{< xref f="data-layer/reference/web-apis/streaming-web-api/putrecords.md" a="req-param-Records" text="Records" >}}</paramname> request parameter.
    {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="stream-web-api-getrecords-max-records-size">
  {{< td >}}Maximum overall size of records that can be retrieved in a single <api>GetRecords</api> operation{{< /td >}}
  {{< td >}}<nobr>10 MB</nobr>
    {{< internal >}}(sharonl) (22.2.18) I mentioned this restriction also in the documentation of the <api>GetRecords</api> <paramname>{{< xref f="data-layer/reference/web-apis/streaming-web-api/getrecords.md" a="req-param-Limit" text="Limit" >}}</paramname> request parameter.
    {{< /internal >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) Orit said that 10 MB = 10,024. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Jupyter {#jupyter}

<table>
<tr id="jupyter-notebooks-scala-not-supported">
  {{< td >}}Scala notebooks{{< /td >}}
  {{< td >}}Running Scala code from a Jupyter notebook isn't supported in the current release.
  Instead, run Scala code from a Zeppelin notebook or by using <file>spark-submit</file>, or use Python.
  {{< internal >}}(sharonl) See Bug {{< jira ig="11174" >}}.
<br/>
This issue is also documented as a known issue in the {{< xref s="release-notes" f="CURRENTVER" a="ki-jupyter-notebooks-scala-not-supported" text="release notes" >}} (added in v2.0.0) and mentioned in the {{< xref f="data-layer/spark-data-ingestion-qs.md" a="jupyter-notebooks-scala-not-supported-note" >}} tutorial.
  {{< /internal >}}
  {{< comment >}}<!-- [c-jupyter-notebooks-scala-not-supported] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="jupyter-dir-cp-mv-rename">
  {{< td >}}Copying and moving (renaming) directories
  {{< /td >}}
  {{< td >}}
  -  The JupyterLab UI handles directory renaming by using the <cmd>shutil.move</cmd> command.
      Because file-system moving (renaming) of directories isn't supported in the {{< product lc >}}, the command tries to execute the move by recursively copying the directory to the new location, and then deleting the original directory.
      To prevent possible data loss as a result of such a recursive copy (which copies only file objects and not additional metadata, such as object attributes), the {{< product lc >}} blocks renaming of directories with nested directories in the Jupyter Notebook service.
      You can still move such directories, when necessary, by running recursive file-system copy and delete commands from a command line.
      (Note that Jupyter automatically creates a hidden directory for each notebook, therefore every directory with a notebook has a nested directory and cannot be moved from the JupyterLab UI in the {{< product lc >}}.)
      See also the [FS directory copy and move restrictions](#dir-cp-mv-rename).
  - If a notebook or other file remains open while the parent directory is being moved (renamed), when the move completes you need to re-select the notebook's kernel (such as "Python 3") from the JupyterLab UI before running code from this notebook.
  {{< internal >}}(sharonl) (14.10.20) Added in v2.10.0; (18.10.20) retroactively merged to v2.8.0 instead of the previous v2.8.0 RNs `#ki-jupyter-dir-rename` known issue, which was retroactively removed.
    In the v2.8 doc we don't refer to the new v2.10.0 feature of blocking copies of directories with nested directories from the Jupyter UI.
    The changes are relevant also to v2.5, but we decided not to edit the v2.5 docs.
    See the information in v2.10.0 Requirement {{< jira ig="15813" >}} and the related [#dir-cp-mv-rename](#dir-cp-mv-rename) FS specs &amp; restrictions entry.
    <br/>
    Uri H. (R&amp;D) verified that the blocking of nested directories copy is applied for all types of directory move/renaming methods in the Jupyter UI &mdash; selecting to rename a directory; dragging a directory to another parent directory; cutting a directory and then pasting it in another parent directory.
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="jupyter-ui-trash-disable">
  {{< td >}}Files and directories deletion from the Jupyter UI{{< /td >}}
  {{< td >}}To allow deletion of directories (folders) from the Jupyter UI, the trash mechanism is disabled for both files and directories, so deleted items are not moved to the trash and cannot be restored.
    {{< internal >}}(sharonl) (23.2.21) In v3.0.0 we disabled the Jupyter trash mechanism in the Jupyter UI (`delete_to_trash=False`) to allow deleting directories (folders).
        The trade off is that deleted files and directories aren't moved to the trash and cannot be restored in the case of accidental deletion (no delete undo), as opposed to previous versions.
        See Bug {{< jira ig="16587" >}}.
        This was documented also in the fix note for the no-directory-deletion known issue for this bug in the version 3.0.0 release notes ({{< xref f="release-notes/version-3.0/v3.0.0.md" a="fix-jupyter-dir-delete" text="#fix-jupyter-dir-delete" >}}).
    {{< /internal >}}
    {{< comment >}}<!-- [c-jupyter-ui-trash-disable] -->
    {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## {{< getvar v="product.tsdb.name.tc" >}} {#tsdb}

{{< note id="tsdb-notes" >}}
See also the [TSDB Nuclio functions](#tsdb-nuclio-funcs) specifications and restrictions.
{{< comment >}}<!-- [c-tsdb-nuclio-funcs-classif] -->
{{< /comment >}}
{{< /note >}}

<table>
<tr id="tsdb-metric-samples">
  {{< td >}}TSDB metric samples
  {{< /td >}}
  {{< td >}}TSDB metric-sample values can be of type integer or float and cannot contain periods ('`.`') or commas ('`,`').
  Note that all values for a given metric must be of the same type.
  {{< comment >}}<!-- [c-tsdb-metric-sample-types] [IntInfo] (sharonl)
    (15.7.19) The metric-sample value type restrictions were already documented
    for all relevant releases in the tsdb/tsdb-cli.md tutorial. With the
    publication of the v2.3.0 docs, I also added the info here and moved the
    internal info to this location, referenced from the CLI doc.
    [c-tsdb-metric-sample-types-string] (25.6.19) Orit and Golan confirmed that
    the support for string metric-sample values, which was added as Tech
    Preview in v2.0.0 (Req IG-10173 &  IG-10527 - later canceled as a duplicate
    of IG-10173), is still Tech Preview in v2.3.0.
    (1.4.20) At Orit and Adi's request, I removed the documentation of the
    Tech Preview support for string metric samples from the active docs (v2.5.4
    & v2.3.1) - `... integer, float, or string {{< techpreview mark="1" >}}` -
    after it was established that it won't be tested in the foreseeable future.
    [c-tsdb-sample-values-w-commas] [IntInfo] (sharonl) (6.2.20) The restriction
    was added retroactively to the v2.5.4 and v2.3.1 docs, at Dina's request -
    see Bug IG-14785 and DOC IG-14793. (22.6.20) Bug IG-14785 was closed as
    "Won't Fix".
  -->
  <!-- [c-tsdb-sample-values-w-periods] [IntInfo] (sharonl) (19.2.20) The
    restriction was added retroactively to the v2.5.4 and v2.3.1 docs in
    consultation with Dina, Adi, and Orit - see Bug IG-14861. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="tsdb-labels">
  {{< td >}}TSDB labels
  {{< /td >}}
  {{< td >}}TSDB label values must be of type string and cannot contain commas ('`,`').
  <br/>
  In addition, {{< getvar v="product.frames.name.lc" >}} doesn't support labels named "time" (as this is reserved for the name of the sample ingestion-time attribute).
  {{< internal >}}(sharonl) (29.10.19) I added the string restriction &mdash; see DOC {{< jira ig="13511" >}}.
<br/>
(2.5.19) Currently, it's technically possible to ingest labels whose values contain commas using a TSDB Nuclio function, but related queries fail. R&D plan to block such ingestion by returning an error.
It was decided there's no need to document this as a known issue.
See info in Bug {{< jira tsdb="77" >}}.
<br/>
(16.5.20) I added the Frames "time" label restriction for v2.8.0 and also retroactively for v2.5.4 &mdash; see info in Bug {{< jira ig="12740" >}} / DOC {{< jira ig="15185" >}}.
(22.6.20) Bug IG-12740 was closed as _Won't Fix_.
  {{< /internal >}}
  {{< comment >}}<!--
  - [c-tsdb-label-values-w-commas] DOC IG-9921.
  - [c-tsdb-label-types-string] DOC IG-13511. [IntInfo] (sharonl) This
    restriction is also mentioned in the TSDB CLI tutorial and Frames reference.
  - [c-frames-tsdb-time-label] Orit confirmed that we can document this as a
    restriction and not as a known issue in the RNs. See info in Bug IG-12740
    and DOC IG-15185. I decided to include this in the TSDB label restrictions
    and not in the Frames restrictions, especially as this restriction is
    relevant also when using other interfaces (namely, the TSDB CLI) if you
    want to be able to also use Frames with the same TSDB table.
    I also mention this in the reference/reserved-names.md#frames reference,
    and I refer to the TSDB SW restrictions from the Frames TSDB overview.
  -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="tsdb-queries">
  {{< td >}}TSDB queries
  {{< /td >}}
  {{< td >}}
  - <a id="tsdb-query-object"></a>TSDB queries can be applied only to sample metrics and not to labels.
    However, you can use labels in query filters (for example, `select cpu where host='A' and os='linux'` &mdash; where "cpu" is a metric name and "host" and "os" are label names).
    {{< internal >}}(sharonl) (29.10.19) See info in DOC {{< jira ig="13511" >}}.
    {{< /internal >}}

  - <a id="tsdb-sql-query-letter-case"></a> The SQL query syntax {{< techpreview mark="1" >}} doesn't support uppercase letters in keyword names; for example, use `select` and not `SELECT`.
    {{< internal >}}(sharonl) (29.10.19) See info in DOC {{< jira ig="10816" >}}.
    {{< /internal >}}
    {{< comment >}}<!-- [TECH-PREVIEW-TSDB-SQL-QUERIES]
      [c-tsdb-sql-query-letter-case] -->
    {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## {{< getvar v="product.frames.name.long_tc" >}} {#frames}

<table>
<tr id="frames-max-write-df-size">
  {{< td >}}Maximum write DataFrame size{{< /td >}}
  {{< td >}}120 MB{{< /td >}}
  {{< comment >}}<!-- [c-frames-max-write-df-size] [IntInfo] (sharonl) (11.2.20)
    Added retroactively to the v2.5.4 and v2.3.1 doc. See Bug IG-13996.
    (1.12.20) The bug was initially marked as fixed for v2.8.0 but it wasn't
    tested by QA for this release and QA later reopened the bug. The bug was
    ultimately closed as "Won't Fix", so the restriction remains. -->
  {{< /comment >}}
</tr>
<tr id="frames-attr-types">
  {{< td >}}Attribute data types
  {{< /td >}}
  {{< td >}}See the {{< xref f="data-layer/reference/frames/attribute-data-types.md" >}} reference for the supported item-attribute data types.
  {{< internal >}}(sharonl) (3.13.19) I replaced the restriction of no support for blob attributes for {{< jira ig="12317" >}} (`#frames-blob-attr-no-support`) with a link to the new {{< getvar v="product.frames.name.lc" >}} attribute data types reference (see {{< jira ig="11257" >}} & DOC {{< jira ig="12272" >}}).
    (20.5.20) In the v2.8.0 RNs release notes, I also removed the previous known issue for no support for blob attributes (`#ki-frames-blob-attr-no-support`), which was initially added in the v2.3.0 release notes.
    See Frames Requirement {{< jira ig="12603" >}} to support blob attributes (currently with a Future target version).
  {{< /internal >}}
  {{< comment >}}<!-- [c-frames-attr-types] [c-frames-blob-attr-no-support] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="frames-nosql-partitioned-tables--write-no-support">
  {{< td >}}Partitioned tables
  {{< /td >}}
  {{< td >}}The NoSQL backend (`"nosql"|"kv"`) doesn't support writing partitioned tables (although you can read partitioned tables with {{< getvar v="product.frames.name.lc" >}}).
  {{< internal >}}(sharonl) (20.5.20) See info in DOC {{< jira ig="12795" >}} for the v2.5.1 Requirement {{< jira ig="12459" >}} to support reading of partitioned NoSQL tables with Frames, which was tested after this release and documented from v2.8.0.
  {{< /internal >}}
  {{< comment >}}<!-- [c-nosql-partitioned-tables-frames] [IntInfo] (sharonl)
    See info in DOC IG-12795. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Spark {#spark}
{{< comment >}}<!-- [IntInfo] This section is referenced also from other docs,
  such as the services/app-services.md page. -->
{{< /comment >}}

{{< note id="spark-notes" >}}
For issues related to running Spark from a Jupyter Notebook, see the [Jupyter](#jupyter) section.
{{< /note >}}

<!-- ---------------------------------------- -->
### NoSQL Spark DataFrame {#spark-nosql-df}

<table>
<tr id="spark-df-write-buffer-size">
  {{< td >}}Write-buffer size{{< /td >}}
  {{< td >}}The default size of write buffers for NoSQL Spark DataFrames is 24 KB.
  The buffer size is automatically adjusted according to the specific write request but this affects the performance.
  {{< internal >}} (sharonl) This restriction was initially added as a joint restriction for the Scala NoSQL API `KeyValueOperations` class and the NoSQL Spark DataFrame under a "NoSQL" section on this page, and also included a reference to the option of modifying the `capn-message-size-ratio` configuration property in <path>/opt/iguazio/bigdata/conf/v3io.conf</path> to affect the default write buffer size; (we recommended trying to change the default value from 3 to 10).
    The restriction was added on 24.2.18 based on information that I received from Golan in connection with Bug {{< jira ig="4386" >}} (although it ultimately turned out that the cause for that bug was a hardcoded write buffer size of 128 KB, regardless of the configured ratio, which caused a performance degradation &mdash; fixed for v1.5.1).
    <br/>
    (22.8.19) We currently don't publish NoSQL Scala API documentation, and Golan confirmed that the option of changing the ratio configuration isn't applicable to Kubernetes environments.
  {{< /internal >}}
  {{< comment >}}<!-- [NOSQL-SCALA-API-REF] [FUTURE-NOSQL-PYTHON]
    [FUTURE-NOSQL-JAVA] TODO: When we document Scala/Python/Java NoSQL API, add
    a similar restriction for these APIs (and consider consolidating into a
    shared item in a different location, as was originally the case when we had
    the "NoSQL" section and documented the NoSQL Scala API). -->
  <!-- [IntInfo] (sharon) (16.1.21) I replaced the use of the
    default_container.name product data-variable key in the internal comment
    with "bigdata" - /opt/iguazio/bigdata/conf/v3io.conf - because in v3.0.0
    the default container changed from "bigdata" to "projects"
    [c-projects-default-container] and I don't think we should have used the
    default-container name here in the first place (I think the directory just
    happened to have the same name as the default container, like another
    "bigdata" directory that we have and contains the "big-data" libraries).
    Note that I couldn't find an /opt/iguazio/bigdata/ directory on my v2.10.0
    platform. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="spark-nosql-df-range-scan-non-string-sorting-key">
  {{< td >}}Non-string sorting key{{< /td >}}
  {{< td >}}Range-scan queries on a table with a non-string sorting-key attribute ignore the items' sorting-key values: the query's sharding-key value is still used to identify the relevant data slice more quickly, but the entire slice is scanned rather than scanning only the items within the query's sorting-keys range (as done for a string sorting key).
  The reason is that the lexicographic sorting-key sort order that's used for storing the items on the data slice might not match the logical sort order for a non-string sorting key.
  Therefore, for faster range scans, use string sorting keys.
  {{< internal >}} (sharonl) See the info for Bug {{< jira ig="8503" >}} in DOC {{< jira ig="9215" >}}, and the similar [Presto restriction](#presto-range-scan-non-string-sorting-key).
  {{< /internal >}}
  {{< comment >}}<!-- [c-sorting-key-type]
    [c-partial-range-scan-for-non-string-sorting-key-spark-nosql-df] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- ---------------------------------------- -->
### Spark Streaming {#spark-streaming}

<table>
<tr id="spark-streaming-consume-after-shard-increase">
  {{< td >}}Shard-count increase 
  {{< /td >}}
  {{< td >}}Consuming stream records from new shards after increasing a stream's shard count (using the <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/updatestream.md" text="UpdateStream" >}}</api> web-API operation) requires first restarting the Spark Streaming consumer application.
  {{< internal >}}(sharonl) (26.3.18) See Bug {{< jira ig="6471" >}} and DOC Task {{< jira ig="7157" >}}.
    This is also documented as a known issue since the {{< xref s="release-notes" f="version-1.5/v1.5.3.md" a="ig-6417" text="v1.5.3 Release Notes" >}}.
    In consultation with Golan, I also documented this issue in the reference documentation of the <api>{{< xref f="data-layer/reference/web-apis/streaming-web-api/updatestream.md" text="UpdateStream" >}}</api> Streaming Web API operation.
  {{< /internal >}}
  {{< comment >}}<!-- [c-spark-streaming-consume-after-shard-increase] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Presto and Hive {#presto}
{{< comment >}}<!-- [IntInfo] This section is referenced also from other docs,
  such as the services/app-services.md page. -->
{{< /comment >}}

<table>
<tr id="presto-supported-operations">
  {{< comment >}}<!-- [IntInfo] (sharonl) See also the Presto CLI reference doc.
  -->
  {{< /comment >}}
  {{< td >}}Supported operations
  {{< /td >}}
  {{< td >}}The {{< getvar v="presto.product_connector.full" >}} supports the <cmd>CREATE VIEW</cmd>, <cmd>DROP VIEW</cmd>, <cmd>SELECT</cmd>, <cmd>SHOW CATALOGS</cmd>, <cmd>SHOW CREATE VIEW</cmd>, <cmd>SHOW FUNCTIONS</cmd>, <cmd>SHOW SCHEMAS</cmd>, and <cmd>SHOW TABLES</cmd> queries and the custom <cmd>v3io.schema.infer</cmd> command. Note:
  {{< comment >}}<!-- [c-presto-supported-operations] [IntInfo] (sharonl) Golan
    and Dina said that the specific-commands restriction applies only to our
    Presto connector and its v3io catalog. (For example, if you use the Presto
    CLI with the Hive connector you're not restricted to these commands.)
    (11.6.19) I retroactively added the `SHOW CATALOGS` and `SHOW FUNCTIONS`
    commands for the latest v2.2.0 release and the earlier v2.1.0 and v1.9.6
    doc, and the `CREATE VIEW`, `DROP VIEW`, and `SHOW CREATE VIEW` commands
    for v2.2.0. See DOC IG-9650. -->
  {{< /comment >}}

  - <cmd>SHOW TABLES</cmd> returns only tables that reside in the container's root directory, provided the access key includes data-access permissions for this directory.
      {{< comment >}}<!-- [c-presto-show-tables-restrictions] [IntInfo]
        (sharonl) (6.6.19) Following Golan's review and after consulting Adi, I
        removed the reference to the performance considerations not supporting
        nested tables for the SHOW TABLES command (removed also from the Presto
        CLI reference doc). (11.6.19) `SHOW TABLES` also shows views - saved
        queries. Therefore, if users add a `SELECT *` view for a nested table,
        they will see the view (which represents the table). But Golan said not
        to mention this in relation to SHOW TABLES nested-tables restrictions.
      -->
      {{< /comment >}}
  - The view commands (<cmd>CREATE VIEW</cmd>, <cmd>DROP VIEW</cmd>, and <cmd>SHOW CREATE VIEW</cmd>) require that you first enable Hive for the {{< product lc >}}'s Presto service.
      {{< comment >}}<!-- [c-presto-view-cmds-hive-dependency] [IntInfo]
        (sharonl) (10.6.19) See DOC IG-9650. -->
      {{< /comment >}}

  {{< internal >}}See DOC {{< jira ig="7407" >}}, DOC {{< jira ig="10843" >}}, Bug {{< jira ig="11615" >}}, and DOC {{< jira ig="9650" >}}.
  {{< /internal >}}
  {{< /td >}}
</tr>
<tr id="presto-range-scan-non-string-sorting-key">
  {{< td >}}Non-string sorting key{{< /td >}}
  {{< td >}}Range-scan queries on a table with a non-string sorting-key attribute ignore the items' sorting-key values: the query's sharding-key value is still used to identify the relevant data slice more quickly, but the entire slice is scanned rather than scanning only the items within the query's sorting-keys range (as done for a string sorting key).
  The reason is that the lexicographic sorting-key sort order that's used for storing the items on the data slice might not match the logical sort order for a non-string sorting key.
  Therefore, for faster range scans, use string sorting keys.
  {{< internal >}} (sharonl) See the info for Bug {{< jira ig="8503" >}} in DOC {{< jira ig="9215" >}}, and the similar [NoSQL Spark DataFrame restriction](#spark-nosql-df-range-scan-non-string-sorting-key).
  {{< /internal >}}
  {{< comment >}}<!-- [c-sorting-key-type]
    [c-partial-range-scan-for-non-string-sorting-key-presto] -->
  {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Grafana {#grafana}

<table>
<tr id="grafana-restart-ui-changes-lose">
  {{< td >}}Service restart
  {{< /td >}}
  {{< td >}}Changes to the Grafana UI &mdash; including custom dashboards and data sources &mdash; might not be retained when restarting the Grafana service.
  {{< comment >}}<!-- [c-grafana-restart-ui-changes-lose] [IntInfo] (sharonl)
    (24.7.19) I added this restriction to the v2.1-v2.3 (latest-release) specs
    following Adi's "Grafana dashboard - solving the persistency issue" email.
    The restriction was already mentioned (in a different manner) in the
    grafana-dashboards.md getting-started tutorials for these product versions;
    I've now just added an internal info comment.
    This restriction is also mentioned in the grafana-dashboards.md GS tutorial.
  -->
  {{< /comment >}}
  {{< internal >}}(sharonl) (19.5.20) In v2.8.0 we made the Grafana service persistent, which should fix this issue (Requirement {{< jira ig="12817 " >}}/ DOC {{< jira ig="14792" >}}) but this was done as a {{< techpreview fmt="0" >}} feature that's planned for external testing (not by QA) and the testing hasn't been done yet.
    Therefore, it was decided to keep the existing restriction but rephrase it so as to use "might" terminology (as opposed to conclusive language used in previous releases).
  {{< /internal >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Web Shell {#web-shell}

<table>
<tr id="web-shell-restricted-cmd-shell">
  {{< td >}}Restricted command shell
  {{< /td >}}
  {{< td >}}The web-based shell service doesn't provide a fully functional Linux shell.
    It's designed mainly for running application services &mdash; such as Spark jobs or Presto queries &mdash; and for performing basic file-system operations, but it doesn't support all Linux commands and tools.
  {{< comment >}}<!-- [c-web-shell-restrictions] [IntInfo] (sharonl) See the
    web-shell restrictions info in DOC IG-9653 and the related email
    correspondence copied in DOC IG-10216. (28.10.19) In v2.5.0, I removed the
    vi example of an unsupported command because we added vi to the web shell
    - see Requirement IG-12467 / DOC IG-12900. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## {{< productUI tc >}} (UI) {#ui}

<table style="width:70%">
{{< comment >}}<!-- [CosmeticsInfo] I reduced the table width to avoid the 
  value in the second column being displayed to the far right of the page.
  (30.7.19) I increased the width from 45% to make the width of the new
  internal comment less awkward.
  (27.8.19) I increased the width from 60% to 70% to fix the output on laptop
  screens ("2GB" in the second column of the second row was split into 2 lines)
  and slightly improve the appearance of the internal comment. -->
{{< /comment >}}
<tr id="ui-max-concurrent-users">
  {{< td >}}Maximum number of concurrent {{< productUI lc >}} users{{< /td >}}
  {{< td >}}30
  {{< /td >}}
</tr>
<tr id="ui-max-file-upload-size">
  {{< td >}}Maximum upload file size{{< /td >}}
  {{< td >}}{{< verkey k="ui_uploaded_file_max_size" >}}
  {{< internal >}}(sharonl) (30.7.19) Added retroactively to the latest-release v2.3.0 doc and previous v2.1.0 and v2.2.0 doc, at Adi's request.
  {{< /internal >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Backup, Recovery, and High Availability (HA) {#backup-recovery-n-ha}

<table>
<tr id="stream-no-data-backup-n-recovery">
  {{< td >}}Stream-data backup{{< /td >}}
  {{< td >}}Stream data is not backed up and restored as part of the {{< product lc >}}'s backup and upgrade operations.
  {{< internal >}}See info in v1.5.0 DOC Task {{< jira ig="5832" >}}.<br/>
    (16.4.18) Initially, I also added a similar no-backup note at the end of the {{< xref f="data-layer/stream/" a="overview" text="Overview" >}} in the {{< xref f="data-layer/stream/" >}} documentation (<path>concepts\/streams.md</path> at the time), but I removed it at Orit's request so as not to expose this limitation to unregistered users.
    Orit said there's no need to add in the streams overview, instead, a general reference to the restriction documentation here (in the registered-users only doc).
  {{< /internal >}}
  {{< comment >}}<!-- TODO: If and when this restriction is removed, also
    delete the related internal comment in the streams.md concepts page. -->
  <!-- [InfraInfo] (sharonl) (19.7.18) I moved this from the Streaming section
    when I added another backup-and-recovery restriction, but I didn't edit the
    tr id because we also reference it from other pages. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="duplicated-sys-failure-recovery-data">
  {{< td >}}Data duplication during system-failure recovery{{< /td >}}
  {{< td >}}Automated system-failure recovery for ingested stream records, data appended to a simple object, or update expressions might result in duplicate data writes.
  {{< comment >}}<!-- [IntInfo] (sharonl) (19.7.18) These restrictions have
    also been documented as known issues in the RNs since v1.5.0 for Bug
    IG-4887; edited in v1.7.0 for Bug IG-7790.
    In v1.7.1, I added the restriction also to the SW specs & restrictions doc
    for both v1.7 and v1.5. (See also DOC IG-7417).
    (27.2.19) Bug IG-7790, for which we added the update-expression reference,
    was resolved and closed in v.2.0.0 "Won't Fix". Ori added this comment:
    "This is a know arch limitation of the system, at this point one can use
    the conditional update with the mtime returned on the command".
    (2.6.19) Adi and Orit said to keep the known issue in the v2.2.0+ RNs
    without documenting any mitigation. -->
  {{< /comment >}}
  {{< /td >}}
</tr>
<tr id="ha-degraded-mode-restrictions">
  {{< td >}}Restricted operations in degraded mode{{< /td >}}
  {{< td >}}The following restrictions are applicable when the cluster in the degraded mode:

  - <a id="ha-create-delete-container-in-degraded-mode"></a>Create and delete container operations aren't permitted.
    {{< internal >}}(sharonl) (19.7.18) See info in DOC {{< jira ig="7417" >}} and Bug {{< jira ig="7246" >}}.
    {{< /internal >}}

  - <a id="ha-dir-number-of-objects-not-in-degraded-mode"></a>The file-system interface doesn't return information about the number of objects in container directories (as reflected in the {{< productUI lc >}}'s <gui-label>Number of objects</gui-label> directory-metadata field when browsing a data container).

{{< internal >}}(sharonl) (22.10.19) See info in DOC {{< jira ig="12691" >}} for v2.5.0 Requirement {{< jira ig="11913" >}} to return the number-of-objects metadata and display it in the {{< productUI lc >}} (in the <gui-title>General</gui-title> tab of the directory-metadata panel that's displayed when you select a directory by single clicking it in the data-container browse table).
{{< /internal >}}
{{< comment >}}<!-- [c-ha-dir-number-of-objects-not-in-degraded-mode] -->
{{< /comment >}}
{{< comment >}}<!-- [ci-indented-excluded-output-shcd-extra-space-in-output] -->
{{< /comment >}}
  {{< /td >}}
</tr>
<tr id="backup-sys-attrs">
  {{< td >}}System-attributes backup{{< /td >}}
  {{< td >}}Objects' modification-time (`__mtime_*`) and creation-time (`__ctime_*`) system attributes aren't restored as part of the {{< product lc >}}'s backup and upgrade operations.
  {{< internal >}}(sharonl) (24.5.20) Added in v2.8.0 and also retroactively to the active v2.5.4 and v2.3.1 docs at Maor and Orit's request.
    Maor said that this has always been the behavior of our backup tool and there's currently no open Jira ticket to change it.
    Orit asked that we explicitly refer to "creation time" and not just mention the attribute names, because for POSIX users `ctime` is typically "change time" (although note that in our {{< xref f="data-layer/reference/system-attributes.md" >}} reference we document the `ctime` attributes as referring to the creation time.)
    (I used `xxx_*` because there are two attributes for each type, one for `secs` and one for `nsecs`.)
  {{< /internal >}}
  {{< comment >}}<!-- [InfraInfo] I used MD fenced-code syntax (``) rather than
    <attr></attr> because the latter produced issues because the underscores
    and asterisk were interpreted as Markdown italics and bold formatting tags,
    even when escaping these characters with a backslash. I also encountered a
    similar issue using `<code></code>` + within the `internal-release-note`
    shortcode I also had some issues when using the MD fenced-code syntax. -->
  {{< /comment >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/reference/reserved-names.md" >}} 
- {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}}
- {{< xref f="cluster-mgmt/deployment/" >}}
- {{< xref s="release-notes" >}}

