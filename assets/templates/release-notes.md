---
title: "Version ^^RELEASE_VERSION_FULL^^ Release Notes"
subtitle: "Release Date: ^^DAY MONTH-SHORT YEAR^^"
keywords: "release notes"
menu:
  main:
    parent:     "realese-notes-^^RELEASE_VERSION_SHORT^^"
    identifier: "realese-notes-^^RELEASE_VERSION_FULL^^"
    weight:     ^^MENU_WEIGHT^^
---
{{< comment >}}<!--
- [TODO-NEXT-RNS] Add `{{< in-progress >}}` while working on the release notes.
- TODO: Update the front-matter metadata and the version number in the opening
  paragraph and at the start of the #highlights section.
- TODO: Check for internal "[TODO-NEXT-RNS]" comments for changes to be made in
  the next release notes.
- TODO: Add Highlights.
- TODO: At the end, update the subsection links in each h2 RN section and check
  all section cross-references/links to ensure they're relevant to the final
  release notes for this version.
  Also, check for the applicability of the Tech Preview and Beta notes.
- [TODO-POST-REVIEW] Replace the internal-release-note "reviewer" param for the
  reviewed notes with the "reviewed" param.
- TODO: Handle any [TODO-BEFORE-PUBLICATION] comments for open RN issues.
-->
<!-- [IntInfo] Permanent KIs are not linked to a specific Jira ticket in the
  internal info and are marked internally as `**[PERMANENT-KI]**`. -->
{{< /comment >}}

<!-- ^^TODO^^ When adding a new RNs file before the RNs are full ready, add the
  following and remove it when the RNs are ready: -->
{{< in-progress >}}
{{< comment >}}<!-- [WIP] TODO: REMOVE when the doc is ready. -->
{{< /comment >}}

<!-- TODO: Replace all "^^XXX^^" placeholders in the file (including in the
  front matter); add release notes; delete unused release headings; and delete
  this comment.
  NOTE:
  - ^^MENU_WEIGHT^^ should be a lower number than the previous release, to
    automatically sort the release notes in the side menu in descending order,
    from latest to earliest. We started with a v1.0.0 weight of 900.
  - DO NOT USE TEXT-REPLACEMENT SHORTCODES in release notes (including the
    product name and version), because these might change in the future while
    the release notes for a specific version should not change.

- TODO: Check the status of all bugs related to Known Issues in the previous
  release notes, and either duplicate in the current notes' Known Issues or
  duplicate to equivalent Fixes notes.

  Fixes should mainly be documented in maintenance (SP) releases (vX.Y.Z); in
  minor (X.Y.0) and major (X.0) releases, we should typically include fixes for
  known issues in previous release notes that were resolved, or for bugs that
  were reported by customers or evaluators ("field bugs").
  Optionally update the internal info for the previous release (e.g., by
  setting the `internal-release-note` `fixver` shortcode param for a fix).

- Use the `internal-release-note` shortcode to add internal info, which is
  processed only when building the site with the igzBuildInternal CLI option or
  when setting the $IGZ_BUILD_INTERNAL environment variable to "true" (which is
  automatically done when using the CLI option).
  Useful options are `ig`, `docig`, and `owner` to add IG-XXX issue links and
  mention the related R&D owner + `type` to indicate the `ig` issue type
  ("bug"|"req"|"subreq"|"task"; defaults to "Issue"). Use "title" to append
  text to the default "[INTERNAL-RN]" title.

    {{</* internal-release-note ig="^^IGNUM^^" type="^^bug|req|subreq|task^^" docig="^^DOCIGNUM^^" owner="^^OWNER_NAME^^ (^^OWNER_USER_NAME^^)" */>}}

    {{</* /internal-release-note */>}}
  For known issues/fixes, add more info:
    {{</* internal-release-note ig="^^IGNUM^^" type="^^bug|req|subreq|task^^" docig="^^DOCIGNUM^^" owner="^^OWNER_NAME^^ (^^OWNER_USER_NAME^^)" ki_start_ver=^^FULL_VER_NUM_OF_FIRST_RN_W_THIS_KNOWN_ISSUE^^" fixver="^^FULL_FIX_VER_NUM^^" */>}}

    {{</* /internal-release-note */>}}

- Use `&ndash;&gt; **<font color="red">TODO-^^NAME^^</font>**`, preferably at
  the start of new lines (after <br/>) to clearly mark internal open issues.

- TODO: Use the `rn-heading`, `rn-heading-small`, and `rn-heading-small-sub`
  shortcodes. The supported `rn-heading` types are demonstrated below. See the
  end of the file for examples of common small headings.
-->

This document outlines the main additions and changes to the Iguazio MLOps Platform ("the platform") in ^^RELEASE_VERSION_FULL^^, and known issues in this version.

<!-- ^^TODO ^^
If we decide to document Tech Preview features,

- Add the following note here:

{{< techpreview note="1" >}}

- Add `{{< techpreview mark="1" >}}` in Tech Preview notes, and optionally use
  the techpreview shortcode also in other locations to include tech-preview
  references (e.g., `{{< techpreview fmt="0" >}}` in comments). If an entire
  section is Tech Preview, add 'techpreview="1"' to the rn-heading shortcode
  call.
-->

<!-- ^^TODO ^^
If we decide to document Beta features (such as Management API changes),

- Add the following note here:

{{< beta note="1" >}}

- Add `{{< beta mark="1" >}}` in beta notes, and optionally use the beta
  shortcode also in other locations to include beta references (e.g., `{{< beta
  fmt="0" >}}` in comments). If an entire section is beta, add 'beta="1"' to
  the rn-heading shortcode call - for example:
{{< rn-heading h="4" id="new-mgmt-apis" text="Management APIs" beta="1" >}}
-->

{{< internal-rn-heading.inline >}}
{{- if eq (getenv "IGZ_BUILD_INTERNAL") "true" -}}
<!-- //////////////////////////////////////// -->
<h2 style="color:BlueViolet;" id="internal-open-issues-n-questions">[INTERNAL] OPEN ISSUES &amp; QUESTIONS</h2>
<!-- [InfraInfo] Trying to use the rn-heading shortcode within this inline
  shortcode produces this error: "inline shortcodes do not support nesting" -->
{{- end -}}
<!-- ^^ TODO^^ Add internal-release-note shortcode calls with open issues and
  questions for the reviewers. -->
{{< /internal-rn-heading.inline >}}

{{< internal-release-note >}}
**v^^FULL_FIX_VER_NUM^^ RNs DOC Task:** {{< jira ig="^^RNS-DOC-Task^^" >}}
<br/>
<!-- ^^TODO: Include the following in VX.Y.0 major-release notes, and a smaller
  version with the vX.Y Confluence JIRA requirement links in the vX.Y index
  page.^^ -->
**Release Index:** [Confluence](http://confluence.iguazeng.com:8090/display/RM/Release+Index)
<br/>
**Maintenance Releases** JIRA [dashboard](https://jira.iguazeng.com/secure/Dashboard.jspa?selectPageId=10810): [Release Notes candidates](https://jira.iguazeng.com/issues/?filter=12292)
<br/>
**Build:** ^^BUILD_NUM^^
<br/>
**v^^SHORT_VER_NUM^^ Requirements:** [Confluence](^^CONFLUENCE-VERSION-REQ-PAGE^^)
<br/>
**v^^FULL_FIX_VER_NUM^^ Requirements:** JIRA: [All](https://jira.iguazeng.com/issues/?jql=(%22target%20version%22%20%3D%20^^FULL_FIX_VER_NUM^^%20OR%20fixVersion%20%3D%20^^FULL_FIX_VER_NUM^^)%20and%20issuetype%3Drequirement); [Done](https://jira.iguazeng.com/issues/?jql=(%22target%20version%22%20%3D%20^^FULL_FIX_VER_NUM^^%20OR%20fixVersion%20%3D%20^^FULL_FIX_VER_NUM^^)%20and%20issuetype%3Drequirement%20AND%20Status%20%3D%20Done); [Open](https://jira.iguazeng.com/issues/?jql=(%22target%20version%22%20%3D%20^^FULL_FIX_VER_NUM^^%20OR%20fixVersion%20%3D%20^^FULL_FIX_VER_NUM^^)%20AND%20issuetype%3Drequirement%20AND%20Status%20not%20in%20(Done%2C%20Canceled%2C%20Cancelled))
<br/>
**v^^FULL_FIX_VER_NUM^^ RNs JIRA Issues:** [JIRA query](https://jira.iguazeng.com/issues/?jql=project%20%3D%20IG%20AND%20labels%20in%20(RN-^^FULL_FIX_VER_NUM^^-fixes%2C%20RN-^^FULL_FIX_VER_NUM^^%2C%20RN-^^FULL_FIX_VER_NUM^^-known-issues%2C%20RN-^^FULL_FIX_VER_NUM^^-TechPreview)%20ORDER%20BY%20key%20ASC)
{{< /internal-release-note >}}

{{< internal-release-note id="internal-open-issues" title="Open Issues" >}}
- Verify the release date.
<!-- ^^TODO: Add links to open issues marked with TODO comments in the release notes.^^ -->
{{< /internal-release-note >}}

<!-- //////////////////////////////////////// -->
<!-- Highlights-->
{{< rn-heading t="highlights" >}}

Version 2.8.0 introduces many new powerful features and enhancements, as well as bug fixes, as detailed in the release notes.
Following are some of the main highlights of this release:

<!-- //////////////////////////////////////// -->
<!-- New Features and Enhancements -->
{{< rn-heading t="new-and-enhance" >}}

<!-- ^^TODO: Update links. -->
[Application Services](#new-managed-app-services) | [Backup and Recovery](#new-backup-recovery-n-ha) | [Dashboard (UI](#new-dashboard) | [Frames](#new-frames) | [General](#new-general) | [High Availability (HA)](#new-backup-recovery-n-ha) | [Horovod](#new-horovod) | [Jupyter Notebook](#new-jupyter) | [Logging and Monitoring Services](#new-logging-services) | [Nuclio](#new-nuclio) | [Pipelines](#new-pipelines) | [Presto](#new-presto) | [TSDB Nuclio Functions](#new-tsdb-nuclio-funcs) | [Web APIs](#new-web-apis) | [Web Shell](#new-web-shell)

<!-- //////////////////////////////////////// -->
<!-- Fixes -->
{{< rn-heading t="fixes" >}}

<!-- ^^TODO: Update links. -->
The following issues were fixed in the current release:
[Application Services](#fixes-managed-app-services) | [Dashboard (UI](#fixes-dashboard) | [Frames](#fixes-frames) | [Jupyter Notebook](#fixes-jupyter) | [Nuclio](#fixes-nuclio)

<!-- //////////////////////////////////////// -->
<!-- Known Issues -->
{{< rn-heading t="known-issues" >}}

<!-- ^^TODO: Update links. -->
[Application Services](#ki-managed-app-services) | [Backup and Recovery](#ki-backup-recovery-n-ha) | [Dashboard (UI](#ki-dashboard) | [File System](#ki-file-system) | [Frames](#ki-frames) | [Hadoop](#ki-hadoop) | [High Availability (HA)](#ki-backup-recovery-n-ha)| [Hive](#ki-presto-n-hive) | [Jupyter Notebook](#ki-jupyter) | [Nuclio](#ki-nuclio) | [Platform Management](#ki-platform-mgmt) | [Pipelines](#ki-pipelines) | [Prometheus](#ki-tsdb-prometheus) | [Presto](#ki-presto-n-hive) | [Security](#ki-security-n-user-management) | [Spark](#ki-spark)| [TSDB](#ki-tsdb)  | [TSDB Nuclio Functions](#ki-tsdb-nuclio-funcs) | [User Management](#ki-security-n-user-management) | [Web APIs](#ki-web-apis)

<!-- //////////////////////////////////////// -->
<!-- Notes -->
{{< rn-heading t="notes" >}}

<!-- //////////////////////////////////////// -->
<!-- Deprecated Features -->
{{< rn-heading t="deprecated" >}}

<!-- //////////////////////////////////////// -->
<!-- Obsolete Features -->
{{< rn-heading t="obsolete" >}}

<!-- ^^^^^^^^^^ -->
<!-- ^^TODO^^ Copy relevant small headings, edit the IDs to replace "ki" with
  "fixes", "new", etc. - depending on the RN section the heading is used in -
  edit the text, as needed, and delete this comment. -->

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-general" text="General"}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-managed-app-services" text="Managed Application Services" >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-web-apis" text="Web APIs" >}}
{{< internal-release-note reviewer="assafb" >}}
{{< /internal-release-note >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5"-sub id="ki-streaming-web-api" text="Streaming Web API" >}}

<!-- *************** -->
{{< rn-heading-small id="ki-streaming-web-api-xxx" >}}XXX{{< /rn-heading-small >}}

<!-- *************** -->
{{< rn-heading-small id="ki-streaming-web-api-yyy" >}}YYY{{< /rn-heading-small >}}

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
{{< rn-heading h="5"-sub id="ki-nosql-web-api" text="NoSQL Web API" >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-presto-n-hive" text="Presto and Hive" >}}
{{< internal-release-note reviewer="dinan" >}}
{{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-spark-datasets" text="Spark Datasets" >}}
{{< internal-release-note reviewer="dinan" >}}
{{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-spark-streaming-integration-api" text="Spark-Streaming Integration API" >}}
{{< internal-release-note reviewer="dinan" >}}
{{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-hadoop" text="Hadoop" >}}
{{< internal-release-note reviewer="dinan" >}}
{{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4" id="ki-logging-services" text="Logging Services" >}}
{{< internal-release-note reviewer="odedm" >}}
{{< /internal-release-note >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-management-apis" text="Management APIs" >}}
{{< internal-release-note reviewer="odedm" >}}
{{< /internal-release-note >}}

<!-- ======================================== -->
{{< rn-heading h="4"-sub id="ki-container-management-api" text="Container Management API" >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-file-system" text="File System" >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-security" text="Security" >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-dashboard" text="Dashboard (UI)" >}}
{{< internal-release-note reviewer="erann" >}}
{{< /internal-release-note >}}

<!-- ---------------------------------------- -->
{{< rn-heading id="ki-support-n-debugging" text="Support and Debugging" >}}

<!-- ^^^^^^^^^^ -->

