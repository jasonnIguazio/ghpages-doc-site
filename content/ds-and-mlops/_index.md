---
title:      "Data Science and Machine-Learning Operations (MLOps)"
linktitle:  "Data Science and MLOps"
description: "Use MLRun in the Iguazio MLOps Platform for data science and MLOps development. (MLRun documentation)"
keywords: "data science and mlops services, mlrun, data science, mlops, machine-learning opeartions, machine learning, ML"
layout: "section-list"
nominitoc: true
nosectiontoc: true
iframecontent: true
menu:
  main:
    identifier: "ds-and-mlops"
    weight:     20
---
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] NEW: Embedded MLRun documentation -->
{{< /comment >}}

{{< condition env="IGZ_BUILD_OFFLINE" envval="false" >}}
{{< doc-frames-container >}}
    <!-- Embedded MLRun Documentation -->
    {{< doc-frame url_var="mlrun_docs" name="iframe_mlrun_docs" >}}
{{< /doc-frames-container >}}
{{< /condition >}}
{{< condition env="IGZ_BUILD_OFFLINE" envval="true" >}}
{{< comment >}}<!-- [c-mlrund-doc-in-offline-build] [IntInfo] [InfraInfo]
  (sharonl) (25.1.21) To avoid a broken iframe in offline builds, it was
  decided, for now, to simply link to the MLRun docs in offline builds; (when
  the offline doc site is viewed without an internet connection, users won't be
  able to use the link, but they will be able to copy and save the URL (copy
  link location). Down the line, we can consider embedding or pulling the
  MLRun HTML or PDF static output in the doc site to include it also in offline
  builds, although this would require a sync solution for mlrun/mlrun updates.
-->
{{< /comment >}}
To learn how to use the {{< product lc >}}'s MLRun service for data science and MLOps development, see the {{< url v="mlrun_docs" k="text" link="1" >}}.
{{< / condition >}}

