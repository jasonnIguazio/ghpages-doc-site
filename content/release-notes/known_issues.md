---
title:    "Known Issues"
subtitle: "Known Issues"
keywords: "known issues"
menu:
    main:
        name:       "Known Issues"
        parent:     "release-notes"
        identifier: "known issues"
        weight:     700
---


<!-- //////////////////////////////////////// -->
<!-- Known Issues -->
{{< rn-heading t="known-issues" >}}

[Application Services](#ki-managed-app-services)  | [Backup and Recovery](#ki-backup-recovery-n-ha) | [Dashboard (UI](#ki-dashboard) | [File System](#ki-file-system) | [Frames](#ki-frames) | [Hadoop](#ki-hadoop) | [High Availability (HA)](#ki-backup-recovery-n-ha) | [Hive](#ki-presto-n-hive) | [Jupyter](#ki-jupyter) | [MLRun](#ki-mlrun)  | [Logging and Monitoring Services](#ki-logging-n-monitoring-services) | [Nuclio](#ki-nuclio) | [Presto](#ki-presto-n-hive) | [Prometheus](#ki-tsdb-prometheus) | [Security](#ki-security-n-user-management) | [Spark](#ki-spark) | [TSDB](#ki-tsdb) | [User Management](#ki-security-n-user-management) | [Web APIs](#ki-web-apis)

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-managed-app-services" text="Managed Application Services" >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (12.5.19) At Adi's request, I removed
  the note that I previously added here to refer to the dashboard known issues
  for UI issues related to services. -->
{{< /comment >}}

- <a id="ki-services-failure-for-reused-usernames"></a>A user whose username was previously in use in the platform cannot run application services.

  {{< internal-release-note rnid="ki-services-failure-for-reused-usernames" ig="14150" type="bug" ki_start_ver="2.0.0" owner="Felix G. (felixg)" >}}
  <br/>
  (sharonl) (21.3.19) In consultation with Adi, I documented this only as a known issue in the release notes, but not in other doc locations.
  <br/>
  (25.5.20) In the v2.0.0&ndash;v2.5.0 RNs, this issue was associated with Bug {{< jira ig="11202" >}}.
  On 6.5.20, Orit closed this bug as _Not a bug_ and opened Requirement {{< jira ig="14150" >}} "deletion of user workspace when deleting a user" (currently planned for v3.0.0), which according to Orit should also resolve this issue.
  => I've now linked the KI in Jira to requirement IG-14150 instead of the closed IG-11202 bug (including duplicating the existing RN labels and adding a KI RN label for v2.8.0), and I've marked IG-11202 as _External Release Note_ = _DONE_ so that it doesn't appear in related queries.
  {{< comment >}}<!-- [IntInfo] (sharonl) (25.5.20) In the v2.8.0 RNs I also
  removed the connection to DOC IG-10843, as this was the general v2.0.0/v2.1.0
  doc task for managed application services. -->
  {{< /comment >}}
  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-jupyter" text="Jupyter Notebook" >}}

- <a id="ki-jupyter-notebooks-scala-not-supported"></a>Running Scala code from a Jupyter notebook isn't supported in the current release.
  Instead, run Scala code from a Zeppelin notebook or by using <file>spark-submit</file>, or use Python.

  {{< internal-release-note rnid="ki-jupyter-notebooks-scala-not-supported" ig="11174" type="bug" ki_start_ver="2.0.0" owner="Gal T. (galt)" docig="10216" id="11174" >}}
  <br/>
  (sharonl) This is documented also in the **Software Specifications and Restrictions** and in other locations in the doc.
  {{< comment >}}<!-- [c-jupyter-notebooks-scala-not-supported] -->
  {{< /comment >}}
  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-frames" text="V3IO Frames" >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5" id="ki-frames-nosql" text="Frames NoSQL Backend (&quot;nosql&quot;/&quot;kv&quot;)" >}}

- <a id="ki-frames-nosql-write-partitioned-table-overwriteTable-not-supported"></a>The <func>write</func> client method's <api>"overwriteTable"</api> save mode isn't supported for partitioned tables {{< techpreview mark="1" >}}.

  {{< internal-release-note rnid="ki-frames-nosql-write-partitioned-table-overwriteTable-not-supported" ig="16167" type="bug" ki_start_ver="2.10.0" owner="Dina N. (dinan)" docig="15553" >}}
  <br/>
  (sharon) (27.9.20) I added the {{< techpreview mark="1" >}} mark because the support for writing partitioned tables is {{< techpreview fmt="0" >}} in v2.10.0 (see Requirement {{< jira ig="13538" >}}, DOC {{< jira ig="15553" >}}) and the related {{< xref f="release-notes/version-2.10/v2.10.0.md" a="new-frames-nosql-write-partitioned-tables-tp" text="v2.10.0 new-feature release note" >}}.

  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-mlrun" text="MLRun" >}}
{{< internal-release-note reviewed="odedm" >}}
{{< /internal-release-note >}}

- <a id="ki-mlrun-default-projet-dir-permissions"></a>The default-project directory (<dirname>default</dirname>) is shared for read-only and execution.

  {{< internal-release-note rnid="ki-mlrun-default-projet-dir-permissions" ml="211" type="bug" ki_start_ver="3.0.0" owner="Hedi I. (hedii)" >}}
  {{< /internal-release-note >}}

- <a id="ki-mlrun-misnamed-old-projects"></a>Beginning with platform version 3.0.0 / MLRun version 0.6.0, project-name restrictions are enforced for MLRun projects both from the dashboard (UI) and the MLRun API.
  Project names must conform to the [RFC 1123](https://tools.ietf.org/html/rfc1123) DNS label-name requirements (DNS-1123 label) &mdash; 1&ndash;63 characters, contain only lowercase alphanumeric characters (a&ndash;z, 0&ndash;9) or hyphens (-), and begin and end with a lowercase alphanumeric character.
  Older MLRun projects whose names don't conform to these restrictions will be in a degraded mode and won't have Nuclio functionality (no serverless functions or API gateways).
  To fix this you need to replace the old projects (you cannot simply rename them).
  For assistance in upgrading old projects, contact Iguazio's support team.

  {{< internal-release-note reviewed="erann" rnid="ki-mlrun-misnamed-old-projects" ig="16531" type="subreq" req="14392" ki_start_ver="3.0.0" owner="Hedi I. (hedii)" docig="17599" >}}
  <br/>
  (sharonl) (2.3.21) See also the related v3.0.0 MLRun {{< xref f="release-notes/version-3.0/v3.0.0.md" a="new-mlrun-enforce-project-name-restrictions" text="#new-mlrun-enforce-project-name-restrictions" >}} enhancement release notes and the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="mlrun-project-names" text="MLRun project-name software restrictions" >}}.
  <br/>
  I confirmed with R&D (Hedi, Liran, and Eran N.) that For Nuclio we already enforced project-name restrictions from the UI in previous releases (Eran said that we actually enforced stricter DNS-1035 label restrictions, as they don't allow names to begin with a digit, which is permitted in DNS-1123 label &mdash; so the v3.0.0 UI restrictions are more lenient).
  Liran said that we added the project-name restrictions enforcement to the Nuclio API only in Nuclio v1.5.x / platform v3.0.0, but I decided not to mention this in the release notes (I wasn't asked to do this and I think most Nuclio projects in the platform are likely to have been created from the UI, which enforced the restrictions.)
  {{< comment >}}<!-- [c-project-name-restrictions] -->
  {{< /comment >}}
  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-nuclio" text="Nuclio Serverless Functions" >}}

- <a id="ki-nuclio-unsupported-dark-site-langs"></a>Function deployment for the Ruby, Node.js, and .NET Core runtimes isn't supported for platform installations without an internet connection (offline installations).

  {{< internal-release-note rnid="ki-nuclio-unsupported-dark-site-langs" ig="13134" type="bug" ki_start_ver="2.0.0" owner="Oded M. (odedm)" id="13134" >}}
  **[PERMANENT-KI]**
  <br/>
  <br/>
  (sharonl) (16.10.19) In the v2.5.0 release notes, I moved the Java reference that was in the similar v2.3 release-notes known issue for Bug {{< jira ig="11148" >}} to a {{< xref f="release-notes/version-2.5/v2.5.0.md" a="fix-nuclio-unsupported-dark-site-java" text="fix note" >}} for this bug, and I added .NET Core to the remaining known issue and associated it with the new bug {{< jira ig="13134" >}}.
  <br/>
  (18.11.20) Oded resolved Bug 13134 as _Won't Fix_; see info in the bug [comment](https://jira.iguazeng.com/browse/IG-13134?focusedCommentId=69937&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-69937):
> I am closing this as we're dragging this bug for a lot of versions now and this is not really beneficial.
> It is a decision to not support those runtimes in dark site for now, and due to lack of customer interest there is currently no plan to make them dark-site compatible in the foreseeable future

(25.2.12) I marked this internally in the RNs as a permanent known issue and disconnected the known issue from Bug 13134 (marked as _External Release Note_ = _Done_ to avoid checking the bug for future release notes).
{{< comment >}}<!-- [c-nuclio-unsupported-dark-site-langs] [IntInfo] (sharonl)
(7.10.20) In v2.10.0, I added related info also in specs/sw-specifications.md
- #nuclio-offline-deploy > #nuclio-offline-deploy-unsupported-langs. -->
{{< /comment >}}
{{< /internal-release-note >}}

- <a id="ki-nuclio-ui-error-for-successful-deployment-after-prev-timeout-failure"></a>In case of a successful automatic deployment of a Nuclio function for a request that previously timed out &mdash; for example, if a requested resource, such as a GPU, becomes available after the time-out failure &mdash; the function status in the dashboard is still <gui-label>Error</gui-label>.

  {{< internal-release-note rnid="ki-nuclio-ui-error-for-successful-deployment-after-prev-timeout-failure" ig="12487" type="bug" ki_start_ver="2.3.0" owner="Adi H. (adih)" id="12487" >}}
  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-tsdb" text="Time-Series Databases (TSDBs)" >}}

{{< comment >}}<!-- [TODO-NEXT-RNS] Uncomment if we add a ki-tsdb-nuclio-funcs
  section (and add a link to the section at the start of the KIs section). -->
{{< note id="ki-tsdb-other-ki-secs-ref-note" >}}
See also the [TSDB Nuclio functions](#ki-tsdb-nuclio-funcs) section under the Nuclio known issues.
{{< /note >}}
{{< comment >}}<!-- [c-tsdb-nuclio-funcs-classif] -->
{{< /comment >}}
{{< /comment >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5" id="ki-tsdb-prometheus" text="Prometheus" >}}

- <a id="ki-tsdb-prometheus-service-change-to-invalid-path"></a>Changing the TSDB-table configuration for an existing Prometheus service to an invalid path doesn't return a deployment error.

  {{< internal-release-note rnid="ki-tsdb-prometheus-service-change-to-invalid-path" ig="12187" type="bug" owner="Golan S. (golans)" docig="10843" id="12187" >}}
  Known issue since RN v2.2.0 / TSDB v0.9.2<br/>
  <br/>
  (sharonl) (6.6.19) The previous known issue of succeeding to create a new Prometheus table with an invalid TSDB table path was {{< xref s="release-notes" f="version-2.2/v2.2.0.md" text="v2.2.0 release notes" a="fix-tsdb-prometheus-service-create-for-non-existent-tsdb-table" text="fixed" >}} in v2.2.0.
  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-presto-n-hive" text="Presto and Hive" >}}

- <a id="ki-presto-hive-username-cant-be-changed-for-existing-db"></a>You can't change the MySQL DB user for an existing Hive MySQL DB.
  To change the user, you need to either reconfigure Hive for Presto to set a different DB path that doesn't yet exist (in addition to the different user); or disable Hive for Presto, apply your changes, delete the current MySQL DB directory (using a file-system command), and then re-enable Hive for Presto and configure the same DB path with a new user.

  {{< internal-release-note rnid="ki-presto-hive-username-cant-be-changed-for-existing-db" ig="11757" type="bug" ki_start_ver="2.2.0" owner="Golan S. (golans)" docig="9650" id="11757" >}}
  {{< /internal-release-note >}}
  {{< comment >}}<!-- [ci-presto-hive-username-cant-change-for-existing-db]
      (sharonl) (5.7.20) In consultation with Dina and Orit, I documented this
      restriction also in the Hive notes in data-layer/presto/overview.md
      (added retroactively to the current active doc sites when this was in a
      reference/section - v2.8.0 & v2.5.4). -->
  {{< /comment >}}

- <a id="ki-presto-invalid-cfg-service-n-dependent-services-failure"></a>Invalid Presto configuration files or connector definitions might cause the Presto service and all dependent services to fail.
  This is the expected behavior.
  To recover, delete the problematic configuration or manually revert relevant changes to the default Presto configuration files, save the changes to the Presto service, and select <gui-label>Apply Changes</gui-label> on the dashboard <gui-title>Services</gui-title> page.
  {{< internal-release-note rnid="ki-presto-invalid-cfg-service-n-dependent-services-failure" ig="15849" type="bug" ki_start_ver="2.10.0" owner="Dina N. (dinan)" >}}
  <br/>
  (sharonl) (23.2.12) In consultation with Orit, in the v3.0.0 release notes I removed "(including Jupyter Notebook)" after "dependent services" in the first sentence because in v3.0.0 we removed the Jupyter dependency on Presto &mdash; see Requirement {{< jira ig="16847" >}} and Bug {{< jira ig="17332" >}}, which was fixed and closed in v3.0.0, and the related v3.0.0 RNs enhancement note (`#new-jupyter-rmv-presto-dependency`).
  <br/>
  (7.3.21) Following input from Customer Success (Nir), I edited the note for the new v3.0.0 release notes and retroactively in the v2.10.0 release notes to expand it also to invalid editing of Presto configuration files and not only of an invalid Presto connector configuration.
  (I changed the note anchor ID, accordingly, from `#ki-presto-invalid-connector-cfg-service-n-dependent-services-failure` to `#ki-presto-invalid-cfg-service-n-dependent-services-failure`, but in the v2.10.0 release notes I also kept the old anchor so as not to break the old link.)
  {{< /internal-release-note >}}

- <a id="ki-presto-wrong-default-cfg-edit-no-revert"></a>In rare cases, after failing to deploy incorrect edits to a default configuration file, it might not be possible to revert the default Presto configuration from the dashboard.

  {{< internal-release-note reviewed="dinan" rnid="ki-presto-wrong-default-cfg-edit-no-revert" ig="18147" type="bug" ki_start_ver="3.0.0" owner="Dina N. (dinan)" >}}
  {{< /internal-release-note >}}

- <a id="ki-hive-cli-no-web-shell-multi-user-exec-permiss"></a>Running the Hive CLI from a Jupyter Notebook service when there's no web-shell service in the cluster might fail if another user had previously run the CLI from another instance of Jupyter.
  To resolve this, ensure that there's at least one web-shell service in the cluster.

  {{< internal-release-note reviewed="dinan" rnid="ki-hive-cli-no-web-shell-multi-user-exec-permiss" ig="18009" type="bug" ki_start_ver="3.0.0" owner="Dina N. (dinan)" >}}
  <br/>
  (sharonl (4.3.21) I added the bug in the new v3.0.0 release notes and in consultation with Orit, I added it also, retroactively, to the v2.10.0 RNs; (the affected version in IG-18009 is 2.2.0, which according to Orit is when we added Hive).
  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-spark" text="Spark" >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5" id="ki-spark-ui" text="Spark UI" >}}

- <a id="ki-spark-ui-broken-links-after-app-kill"></a>The Spark UI might display broken links after killing a running application from the UI.
  To resolve this, close the current Spark UI browser tab and reopen the UI in a new tab.

  {{< internal-release-note rnid="ki-spark-ui-broken-links-after-app-kill" ig="12143" type="bug" ki_start_ver="2.3.0" owner="Uri H. (urih)" id="12143" >}}
  **[PERMANENT-KI]**
  <br/>
  <br/>
  (sharonl) (24.9.20) The bug was closed as _Won't Fix_.
  Because this is expected to be a permanent KI, I set the bug's <gui-label>External Release Note</gui-label> field to _DONE_ and not to _DONE-KNOWN-ISSUES_, as there's no point in updating the ticket for each new RN with this KI.
  {{< /internal-release-note >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5" id="ki-spark-streaming" text="Spark Streaming" >}}

- <a id="ki-spark-streaming-consume-after-shard-count-increase-ig-6471"></a>To consume records from new shards after increasing a stream's shard count, you must first restart the Spark Streaming consumer application.

  {{< internal-release-note rnid="ki-spark-streaming-consume-after-shard-count-increase-ig-6471" ig="6471" type="bug" owner="Golan (golans)" docig="7157" ki_start_ver="1.5.3" id="6471" >}}
  <br/>
  (sharonl) The shard-count increase can currently be done only using the <api>UpdateStream</api> Streaming Web API operation.
  <br/>
  This bug exists also in earlier versions but was discovered only before the v1.5.3 release and the v1.5.0 documentation publication, and therefore added to the RNs only in v1.5.3 + added to the **Software Specifications and Restrictions** and <api>UpdateStream</api> Streaming Web API reference documentation in v1.5.0 and retroactively also in the v1.0.3 reference &mdash; see DOC Task {{< jira ig="7157" >}}.
  {{< /internal-release-note >}}
  {{< comment >}}<!-- [c-spark-streaming-consume-after-shard-increase] -->
  {{< /comment >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5" id="ki-spark-operator" text="Spark Operator" >}}
{{< internal-release-note reviewed="urih" >}}
{{< /internal-release-note >}}

- <a id="ki-spark-opeartor-job-name-size"></a>Spark jobs whose names exceed 63 characters might fail because of a Spark bug when running on Kubernetes &mdash; see Spark Bug [SPARK-24894](https://issues.apache.org/jira/browse/SPARK-24894), which was resolved in Spark version 3.0.0.

  {{< internal-release-note rnid="ki-spark-opeartor-job-name-size" ig="17068" type="bug" ki_start_ver="3.0.0" owner="Urih H. (urih)" docig="17932" >}}
  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-web-apis" text="Web APIs" >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5" id="ki-simple-object-web-api" text="Simple-Object Web API" >}}

- <a id="ki-s3-web-api-get-n-head-object-wrong-ret-data"></a><api>GET Object</api> and <api>HEAD Object</api> don't return correct `ETag` and `Content-Type` metadata.

  {{< internal-release-note rnid="ki-s3-web-api-get-n-head-object-wrong-ret-data" ig="3453" type="bug" ki_start_ver="1.0.0" owner="Assaf B. (assafb)" >}}
  <br/>
  (sharonl)
  (25.5.20) In the v1.5.0&ndash;v2.5.0 RNs we had a joint KI for Bugs {{< jira ig="3451" >}} and {{< jira ig="3453" >}}.
  In v2.8.0 QA verified that the part of the existing RNs KI related to Bug IG-3451 &mdash; <api>GET Object</api> doesn't return the correct <api>Last-Modified</api> metadata &mdash; no longer exists in v2.8.0.
  According to Assaf and Orit, it was probably fixed before v2.8.0.
  => In consultation with Orit, I edited the existing KI to restrict it to the remaining issues for Bug IG-3453, associated the KI only with IG-3453, and marked IG-3451 as _External Release Note_ = _Done_, without a v2.8.0 RN label and without adding a v2.8.0 fix note.
  {{< /internal-release-note >}}

- <a id="ki-s3-web-api-ofb-range-req-wrong-ret-code"></a>A range request with an out-of-bounds range returns HTTP status code 200 instead of 400.

  {{< internal-release-note rnid="ki-s3-web-api-ofb-range-req-wrong-ret-code" ig="13449" type="bug" ki_start_ver="2.5.0" owner="Roy B. (royb))" id="13449" >}}
  {{< /internal-release-note >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5" id="ki-nosql-web-api" text="NoSQL Web API" >}}

- <a id="ki-nosql-web-api-range-scan-after-container-or-dir-recreate-migh-fail"></a>Range-scan requests following recreation of a data container or a container directory might return a 513 error; in such cases, reissue the request.

  {{< internal-release-note reviewed="assafb" rnid="ki-nosql-web-api-range-scan-after-container-or-dir-recreate-migh-fail" ig="17963" type="bug" ki_start_ver="3.0.0" owner="Roy B. (royb)" >}}
  {{< /internal-release-note >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5" id="ki-streaming-web-api" text="Streaming Web API" >}}

-	<a id="ki-putrecords-for-non-stream-dir-error-ig-4310"></a><api>PutRecords</api> with a stream path that points to an existing non-stream directory returns error <api>ResourceNotFoundException</api> instead of <api>ResourceIsnotStream</api>.

    {{< internal-release-note rnid="ki-putrecords-for-non-stream-dir-error-ig-4310" ig="4310" owner="Assaf B. (assafb)" ki_start_ver="1.0.0" >}}
    {{< /internal-release-note >}}

-	<a id="ki-web-invalid-updatestream-req-body-resp-error"></a><api>UpdateStream</api> with an invalid request-body JSON format may not return the expected <api>InvalidArgumentException</api> error.

    {{< internal-release-note rnid="ki-web-invalid-updatestream-req-body-resp-error" ig="4310" owner="Assaf B. (assafb)" ki_start_ver="1.0.0" >}}
    {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-logging-n-monitoring-services" text="Logging and Monitoring Services" >}}
{{< internal-release-note reviewed="odedm" >}}
{{< /internal-release-note >}}

- <a id="ki-data-cluster-statistics-not-available-offline"></a>Data-cluster statistics are not available when the platform is in offline mode.

  {{< internal-release-note reviewed="odedm" rnid="ki-data-cluster-statistics-not-available-offline" ig="9029" type="req" owner="Adam M. (adamm)" ki_start_ver="3.0.0" >}}
  **[PERMANENT-KI]**
  <br/>
  <br/>
  (sharonl) (3.3.21) In v3.0.0 we moved to gathering data-cluster statistics using Prometheus instead of Graphite (on the application cluster), and a byproduct of this change is that data-cluster statistics (storage and performance statistics, such as those displayed in the container overview in the UI) are no longer available when the cluster is in offline mode.
  Therefore, we added this permanent known issue in v3.0.0 and newer release notes.
  {{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-hadoop" text="Hadoop" >}}

-	<a id="ki-hadoop-unsupported-hdfs-commands"></a>The following Hadoop (`hdfs`) commands aren't supported:
     <cmd>createSnapshot</cmd>, <cmd>deleteSnapshot</cmd>, <cmd>getfattr</cmd>, <cmd>setfattr</cmd>, <cmd>setfacl</cmd>, and <cmd>setrep</cmd>.

    {{< internal-release-note rnid="ki-hadoop-unsupported-hdfs-commands" ki_start_ver="1.0.0" id="hdfs-unsupported-cmds" >}}
**[PERMANENT-KI]**
<br/>
<br/>
(sharonl) (26.6.18) Initially, this known issue included the <cmd>truncate</cmd> command and was associated with Bug {{< jira ig="3106" >}} to implement this command.
Bug 3106 and duplicate Bug {{< jira ig="5239" >}} were resolved in v1.7.0 as {{< techpreview fmt="0" >}} (not tested by QA), at which point I documented the support for <cmd>truncate</cmd> as an {{< xref s="release-notes" f="version-1.7/v1.7.1.md" a="3106" text="enhancement" >}} in the v1.7.1 (v1.7 GA) release notes, removed the reference to the command from the known-issue note, and disassociated the known-issue note from Bug 3106.
The changes were done after the initial publication of the v1.7.0 Equinix Early Edition release notes.
<br/>
Golan said there's no Jira ticket to support the other commands.
<br/>
(2.5.19) In the v2.1.0 release notes, the reference to the supported <cmd>truncate</cmd> command was marked as  {{< techpreview fmt="0" >}}.
(27.10.19) In the v2.5.0 RNs, the <cmd>truncate</cmd> reference was removed from this note, after QA have verified the support for this command.
{{< /internal-release-note >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-file-system" text="File System" >}}

{{< note id="ki-file-system-hadoop-fs-note" >}}
For Hadoop FS known issues, see the [Hadoop known issues](#ki-hadoop).
{{< /note >}}

-	<a id="ki-fs-ops-no-stream-shard-sup"></a>File-system operations are not supported for stream shards.

    {{< internal-release-note rnid="ki-fs-ops-no-stream-shard-sup" ig="3605" type="task" owner="Ortal L. (ortall))" ki_start_ver="1.0.0" id="3604" >}}
**[PERMANENT-KI]**
<br/>
<br/>
(17.10.19) I decided to stop making RN-updates in Task {{< jira ig="3604" >}} because the task has now been canceled => permanent known issue.
{{< /internal-release-note >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-security-n-user-management" text="Security and User Management" >}}

- <a id="ki-app-cluster-status-dashboard-access-requires-direct-it-admin-policy"></a>Users who are members of a user group with the IT Admin management policy but are not assigned this policy directly cannot access the application-cluster status dashboard.
  To bypass this issue, assign the IT Admin management policy directly to any user who require such access..

  {{< internal-release-note reviewed="odedm" rnid="ki-app-cluster-status-dashboard-access-requires-direct-it-admin-policy" ig="17514" type="bug" ki_start_ver="3.0.0" owner="Oded M. (odedm)" >}}
  <br/>
  (sharonl) (3.3.21) This is a field issue (reported by Ambyint) that was discovered in v2.10.0 but added only in the v3.0.0 release notes.
  {{< /internal-release-note >}}

- <a id="ki-authenticator-token-expiration-change-no-affect-on-existing-tokens"></a>Changing the token-expiration period for the `authenticator` service (`id_tokens_expiration` configuration) doesn't affect existing tokens.
  For further assistance, contact Iguazio's support team.

  {{< internal-release-note reviewed="odedm" rnid="ki-authenticator-token-expiration-change-no-affect-on-existing-tokens" ig="17295" type="bug" ki_start_ver="3.0.0" owner="Hedi I. (hedii)" >}}
  {{< /internal-release-note >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-backup-recovery-n-ha" text="Backup, Recovery, and High Availability (HA)" >}}

- <a id="ki-stream-data-no-backup"></a>Stream data is not backed up and restored as part of the platform's backup and upgrade operations.

  {{< internal-release-note rnid="ki-stream-data-no-backup" ki_start_ver="1.5.1" >}}
  **[PERMANENT-KI]**
  <br/>
  <br/>
  (sharonl) (13.2.18) Adi requested that we document this as a known issue in the RNs even though this behavior is by design and currently there's no plan to change it => permanent known issue.
  <br/>
  This is also documented in the **Software Specifications and Restrictions** document (DOC Task {{< jira ig="3582" >}}).
  {{< /internal-release-note >}}

- <a id="ki-ha-main-k8s-master-app-node-failure-cloud-azure"></a>In Azure cloud environments, in case of failure in the main master application node of a Kubernetes application cluster, the platform's access to the application nodes is lost and it can no longer manage the cluster's application services.
  Previously run application services will continue to run but cannot be stopped, and new services cannot be created.

  {{< internal-release-note rnid="ki-ha-main-k8s-master-app-node-failure-cloud-azure" ig="13840" type="req" owner="Alze P. (alexp)" >}}
  Known issue since RN v2.1.0 for all environments; restricted in RN v2.3.0 to the cloud, and restricted in RN v2.8.0 to Azure (see the v2.8.0 {{< xref s="release-notes" f="version-2.8/v2.8.0.md" text="v2.8.0 release notes" a="fix-cloud-vip-aws" text="AWS fix note" >}})<br/>
  <br/>
  (sharonl) (10.7.19) In the **v2.1.0 &amp; v2.2.0** release notes we had a known issue for this HA bug that wasn't restricted to cloud environments.
  The known issue was for Bug {{< jira ig="11774" >}}.
  In **v2.3.0**, this bug was fixed only for non-cloud environments and Bug {{< jira ig="12573" >}} and Requirement {{< jira ig="12636" >}} were opened for the remaining cloud issues.
  => In the v2.3.0 release notes, I restricted the known issue to cloud environments and linked it to the new cloud tickets, and I added a {{< xref s="release-notes" f="version-2.3/v2.3.0.md" a="fix-ha-main-k8s-master-app-node-failure-non-cloud" text="fix note" >}} for non-cloud environments.
  (24.5.20) In **v2.8.0**, the KI was fixed for AWS as part of Requirement {{< jira ig="12636" >}}, which was then modified not to cover Azure and a separate v3.0.0 Requirement {{< jira ig="13840" >}} was opened for Azure cloud deployment changes that should also fix this KI, and the RN KI was modified accordingly and tagged `#ki-ha-main-k8s-master-app-node-failure-cloud-azure`; see also the v2.8.0 RNs `#fix-cloud-vip-aws` {{< xref s="release-notes" f="version-2.8/v2.8.0.md" text="v2.8.0 release notes" a="fix-cloud-vip-aws" text="AWS fix note" >}}.
  {{< /internal-release-note >}}

- <a id="ki-ha-duplicated-data-on-recovery"></a>The automatic execution of the system-failure recovery process might result in duplicated data for streaming and simple-object data-append operations or duplicated execution of update expressions.

  {{< internal-release-note rnid="ki-ha-duplicated-data-on-recovery" id="4887-7790" >}}
  **Bugs:** {{< jira ig="4887" >}} (streaming &amp; S3 data append)<br/>
  **Owner:** Orit N. (oritn)<br/>
  Known issue since RN v1.5.0 for Bug {{< jira ig="4887" >}} and since RN v1.7.0 also for Bug {{< jira ig="7790" >}} (update-expression addition).<br/>
  <br/>
  (sharonl) This issue is also documented in the **"Software Specifications and Restrictions"** doc (`#duplicated-sys-failure-recovery-data`).
  <br/>
  (27.2.19) Bug {{< jira ig="7790" >}} has now been closed as _Won't Fix_.
  Ori wrote in the comments "This is a known arch limitation of the system, at this point one can use the conditional update with the mtime returned on the command".
  (2.6.19) Orit confirmed that the issue persists in v2.2.0 and she and Adi said to keep the known issue in the release notes as-is (see also this IG-7790 [comment](https://jira.iguazeng.com/browse/IG-7790?focusedCommentId=44092&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-44092) in Bug {{< jira ig="7790" >}}).
  Orit wrote that this issue isn't related to the app nodes but rather the data path.
  <br/>
  (17.10.19) I decided to stop making RN-updates in Bug {{< jira ig="7790" >}} because the bug has been closed as _Won't Fix_ for a while and the issue isn't likely to be resolved in the foreseeable future => permanent known issue.
  Bug {{< jira ig="4887" >}}, which is also related to this known issue, is still open, so I still update the RN information in that bug.
  {{< comment >}}<!-- (25.2.21) I removed Bug IG-7790 from the "Bugs" in the
  internal RN info at the start so it's not checked for future releases. -->
<!-- [PERMANENT-KI] in relation to Bug IG-7790 (not IG-4887). -->
{{< /comment >}}
{{< /internal-release-note >}}

- <a id="ki-ha-getitems-failure-ig-6475"></a>The <api>GetItems</api> NoSQL Web API operation might fail during failover.

  {{< internal-release-note rnid="ki-ha-getitems-failure-ig-6475" ki_start_ver="1.7.0" >}}
  **[PERMANENT-KI]**
  <br/>
  <br/>
  (sharonl) (26.2.19) In previous release notes we had a combined HA known issue for bugs {{< jira ig="6475" >}} and {{< jira ig="6246" >}}, phrased generically as "I/O requests might fail during failover.", per Ori's guideline (see, for example, the {{< xref s="release-notes" f="version-1.9/v1.9.5.md" a="ki-ha-io-requests-failure-ig-6475-6246" text="v1.9.5 RNs" >}}) and the details in the bugs' _Release Note Information_).
  In v2.0.0, Bug IG-6246 was fixed and closed, but Bug IG-6475 remained open and was deferred to v2.4.0.
  Roy B. and Ortal confirmed that the remaining known issue for Bug IG-6475 is only for the <api>GetItems</api> NoSQL Web API operation.
  Therefore, I rephrased the known issue and created a {{< xref s="release-notes" f="version-2.0/v2.0.0.md" text="v2.0.0 release notes" a="fix-ha-io-stream-requests-failure-ig-6246" text="fix RN" >}} for Bug IG-6246.
  <br/>
  (23.2.12) Bug {{< jira ig="6475" >}} was fixed and closed in v3.0.0.
  Orit explained that the fix is that in case of failover, <api>GetItems</api> will no longer return duplicate/missing items, it will stop and return status code 513.
  But the known issue, as phrased in the release notes (possible failure of <api>GetItems</api> during failover) persists and should remain documented.
  => I unlinked the RN from Bug IG-6475 and removed the release-notes requirement tag to avoid following up on the bug resolution.
  This should remain a known issue in future release notes as well, until further notice.
  {{< /internal-release-note >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-dashboard" text="Dashboard (UI)" >}}

{{< note id="ki-dashboard-other-ki-secs-ref-note" >}}
See the [MLRun](#ki-mlrun) and [Nuclio](#ki-nuclio) known issues for dashboard issues related specifically to these frameworks.
{{< /note >}}
{{< comment >}}<!-- [TODO-NEXT-RNS] Check #ki-mlrun and #ki-nuclio for
  relevance. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
<!-- Notes -->
{{< rn-heading t="notes" >}}

- <a id="note-coordinated-platform-actions"></a>Platform start-up, shut-down, and upgrade actions should be coordinated with the Iguazio support team.

  {{< internal-release-note rnid="note-coordinated-platform-actions" docig="5829" >}}
  <br/>
  (sharonl) (2.4.18) Adi requested that we add this in the release notes (starting with the v1.5.3 RNs, even though it's also true for earlier versions).
  <br/>
  (20.3.19) At Maor's request, I rephrased the previous note to replace "restart, and shut-down" with "start-up and upgrade" (+ I added "actions"); Maor said that customers don't need to coordinate platform shutdowns.
  <br/>
  (25.5.20)At Maor's request, I returned the reference to "shut-down". Maor wrote (in his v2.8.0 RNs review) &mdash; "I know I (probably) said a user can shutdown the platform by himself (cause he can, thru the UI), but let's add "shutdown" there as well.
  The reason is that customer can't really verify a successful shutdown, and might end up with a full data loss if they physically shutdown the servers without verifying the data from the cache was dumped into the disks."
  {{< /internal-release-note >}}

