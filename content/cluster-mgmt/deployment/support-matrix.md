---
title: "Support and Certification Matrix"
description: "Want to learn about the support and certification matrix of the Iguazio MLOps Platform? Check out the platform documentation site."
keywords: "support and certification matrix, support matrix, certification matrix, certified software, certified packages, services, application services, specifications, software specifications, software specs, software, specifications, specs, software compatibility, compatibility, installation, default installation, urls, ports, endpoints, dashboard, ui, opearting system, OS, centos, Linux, Linux distribution, application nodes, apache, authenticator, conda, cuda, dex, docker registry, elasticsearch, github, github authentication, grafana, hadoop, hive, horovod, jupyter, jupyterlab, jupyter notebook, kubernetes, log forwarder, logging services, logging, monitoring service, monitoring, nuclio, nuclio jupyter, oauth2, oicd, openid connect, openid, presto, prometheus, serverless, spark, spark operator, spark-on-k8s-operator, tensorflow, tsdb, tsdb cli, tsdbctl, v3io daemon, v3io, web apis, web gateway, web server, nginx, web shell, libraries, java, python, scala, tableau, tech preview"
menu:
  main:
    parent:     "deployment-n-specs"
    identifier: "support-matrix"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces specs/support-matrix.md. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} comes [pre-deployed](#predeployed-app-services-n-tools) with proprietary and third-party open-source tools and libraries that are exposed as application services that are managed using Kubernetes.
Relevant services can be viewed and managed by users from the {{< productUI short_lc >}} using a self-service model.
(Note that some services that don't require user intervention aren't visible in the {{< productUI lc >}}.)
Users can also enhance their development experience by [independently installing additional software](#integration-with-additional-tools) and run it on top of the {{< product lc >}} services.
For more information, see {{< xref f="services/app-services/" >}}.

The {{< product lc >}} has two types of managed application services:

<dl>
  <dt id="default-services">Default services</dt>
  {{< dd >}}There are several service instances &mdash; such as Presto and the web APIs &mdash; that are spawn automatically when the {{< product lc >}} starts and have a tenant-wide scope (i.e., they're accessible to all tenant users with service permissions).
  The default services can't be deleted by users, but service administrators can disable or restart these services and modify some service configurations.
  {{< /dd >}}
  <dt id="user-defined-services">User-defined services</dt>
  {{< dd >}}
  Service administrators can create a wide variety of new service instances for certified services &mdash; such as Spark and Jupyter Notebook.
  Except where otherwise specified, user assigned services should be assigned to a specific running user but can optionally be shared also with all other tenant users with service permissions.
  {{< /dd >}}
</dl>

{{< techpreview note="1" >}}

<!-- //////////////////////////////////////// -->
## Pre-deployed Application Services and Tools {#predeployed-app-services-n-tools}

The following software packages, services, and tools are pre-deployed as part of the default version {{< productVersion num >}} {{< product lc >}} installation:

[Conda](#jupyter-conda) | [{{< productUI tc >}}](#dashboard) | [Docker Registry](#docker-registry) | [Elasticsearch](#log-forwarder) | [{{< getvar v="product.frames.name.tc" >}}](#frames) | [Grafana](#grafana) | [Hadoop](#hadoop) | [Hive](#hive) | [Horovod](#horovod-mpi-opeartor) | [Jupyter](#jupyter) | [Kubernetes](#kubernetes) | [Log Forwarder](#log-forwarder) | [MLRun](#mlrun) | [Monitoring](#monitoring) | [MPI Operator](#horovod-mpi-opeartor) | [Nuclio Serverless Framework](#nuclio) | [Operating System](#os) | [Pipelines](#pipelines) | [Presto](#presto) | [OAuth2 (OIDC) Authenticator](#authenticator) | [Prometheus](#prometheus) | [Spark](#spark) | [Spark Operator](#spark-operator) | [TSDB CLI (V3IO)](#tsdb) | [V3IO Daemon](#v3io-daemon) | [Web APIs](#web-apis) | [Web Shell](#web-shell)
{{< comment >}}<!-- [IntInfo] (sharonl) (18.7.18) Originally I ordered the
  table rows in this section alphabetically and noted it here, but Adi
  preferred to ordered the pre-deployed apps by importance (he dictated the
  order for the third-party apps (except for Sparking Water, not supported
  in v1.7, which Ronen said to place last). For v2.0.0, I modified and
  reordered the services according to the prioritization defined by Adi (see
  DOC IG-9653), and I added alphabetical links. -->
{{< /comment >}}

{{< note id="open-source-restrictions-note" >}}
- Open-source tools and related services are subject to open-source restrictions.
- See [Application Library Versions](#predeployed-app-services-n-tools-lib-versions) for programming application library versions that are used or certified for usage by relevant services, such as Nuclio and Jupyter Notebook.
{{< /note >}}

<table style="width:100%">
<tr text-align="left">
  <th style="width:4%; vertical-align:'top'; font-weight:bold;">
    Service
  </th>
  <th style="width:4%; vertical-align:'top'; font-weight:bold;">
    Type
  </th>
  <th style="width:54.5%; vertical-align:'top'; font-weight:bold;">
    Description
  </th>
  <th style="width:0.5%; vertical-align:'top'; font-weight:bold;">
    Version
  </th>
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <th style="width:40%; vertical-align:'top'; font-weight:bold;">
    URL
  </th>
  {{< /comment >}}
</tr>

<tr id="dashboard">
  {{< td >}}**{{< productUI tc >}}**
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The {{< product lc >}}'s graphical user interface.
  {{< /td >}}
  {{< td >}}{{< productVersion num >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  {{< td >}}
    {{< condition filter="native_app_cluster" filterval="true" >}}
    Available on the default port of the data node (port 443)
    {{< /condition >}}
  {{< /td >}}
  {{< /comment >}}
</tr>

<tr id="kubernetes">
  {{< td >}}**Kubernetes**
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The {{< url v="kubernetes_home" k="text" link="1" >}} (k8s) container orchestration system for automating deployment, scaling, and management of containerized applications.
    Application services in the {{< product lc >}} run on top of Kubernetes.
  {{< /td >}}
  {{< td >}}k8s {{< verkey k="kubernetes.version" >}}
  <hr/>
  Helm {{< verkey k="helm.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="kubernetes-cloud">
  {{< td >}}**Kubernetes on cloud**
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The managed {{< url v="kubernetes_home" k="text" link="1" >}} (k8s) (EKS, AKS, GKE).
  {{< /td >}}
  {{< td >}}k8s {{< verkey k="kubernetes_cloud.version" >}}
  {{< /td >}}
  
<tr id="nuclio">
  {{< td >}}**Nuclio Serverless Framework**<br/>
    (`{{< verkey k="nuclio.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}{{< company >}}'s Nuclio Enterprise Edition serverless framework for development, deployment, and execution of serverless functions for real-time data processing and analysis.
    The Nuclio dashboard is available as part of the <gui-title>Projects</gui-title> area of the {{< productUI short_lc >}} (for users with the Function Admin management policy).
    For more information, see {{< xref f="services/app-services/nuclio.md" >}}.
    {{< comment >}}<!-- [TODO-NUCLIO] [PENDING-DEV] Add info - e.g., regarding
      the Nuclio CLI (nuctl). -->
      <!-- [InfraInfo] If we decide to return the "URL" column or similar,
        consider moving some of the information to this column (as done before
        v2.0.0). -->
    {{< /comment >}}
  {{< /td >}}
  {{< td >}}{{< verkey k="nuclio.version_short" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="mlrun">
  {{< td >}}**MLRun**<br/>
    (`{{< verkey k="mlrun.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}{{< company >}}'s {{< public-gh ghid="mlrun_mlrun" path="/" link="1" >}} open-source machine-learning operations (MLOps) orchestration framework for automating and tracking data science tasks and full workflows, including integration with Kubeflow Pipelines and the Nuclio serverless framework.
    For more information, see {{< xref f="services/app-services/mlops-services.md" a="mlrun" >}}.
      {{< comment >}}<!-- [TODO-SITE-RESTRUCT-P2] (sharonl) Further edit the
        MLRun description based on recent updates to the MLRun docs. -->
      {{< /comment >}}
  {{< /td >}}
  {{< td >}}{{< verkey k="mlrun.version_short" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="pipelines">
  {{< td >}}**Pipelines**<br/>
    (`{{< verkey k="pipelines.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The {{< url v="kubeflow_pipelines_home" k="text_long" link="1" >}} open-source framework for building and deploying portable, scalable machine learning (ML) workflows based on Docker containers.
    For more information, see {{< xref f="services/app-services/mlops-services.md" a="kfp" >}}.
    {{< comment >}}<!-- [InfInfo] See [c-kubeflow-pipelines-framework-term] in
      the services/app-services.md doc regarding the "framework" terminology.
    -->
    {{< /comment >}}
  {{< /td >}}
  {{< td >}}{{< verkey k="pipelines.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="web-apis">
  {{< td >}}**Web APIs**<br/>
    (`{{< verkey k="webapi.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The {{< product lc >}}'s web-APIs (web-gateway) service, which provides access to its {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
  {{< /td >}}
  {{< td >}}{{< productVersion num >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  {{< td >}}
    {{< condition filter="native_app_cluster" filterval="true" >}}
    Available on port 8081 (HTTP) or 8443 (HTTPS) of the master application node
    {{< /condition >}}
  {{< /td >}}
  {{< /comment >}}
</tr>

<tr id="jupyter">
  {{< td >}}**Jupyter**
  {{< /td >}}
  {{< td >}}User-defined
  {{< /td >}}
  {{< td >}}The {{< url v="jupyterlab_docs" k="base" k2="text" link="1" >}} UI, including the {{< url v="jupyter_notebook_docs" k="base" k2="text" link="1" >}} web application and shell terminals and the Conda binary package and environment manager.
    For more information, see {{< xref f="services/app-services/jupyter.md" >}}.
    See also the [Jupyter application-libraries compatibility matrix](#app-lib-vers-juypter).
  {{< /td >}}
  {{< td >}}JupyterLab {{< verkey k="jupyterlab.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="tsdb">
  {{< td >}}**{{< getvar v="product.tsdb.name.tc" >}} CLI**
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The {{< xref f="data-layer/tsdb/tsdb-cli.md/" textvar="product.tsdb.name.full" >}} command-line interface (CLI) tool (<file>{{< getvar v="product.tsdb.cli.name" >}}</file>) for creating and managing time-series databases (TSDBs) using the {{< public-gh ghid="tsdb" link="1" k="text_long" >}} library.
  {{< /td >}}
  {{< td >}}{{< verkey k="tsdb.version_short" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="prometheus">
  {{< td >}}**{{< getvar v="product.prometheus.name.tc" >}}**
  {{< /td >}}
  {{< td >}}User-defined
  {{< /td >}}
  {{< td >}}The {{< public-gh ghid="prometheus" link="1" k="text_long" >}} distribution, which provides a version of the {{< url v="prometheus_home" k="text" link="1" >}} systems monitoring and alerting toolkit that is packaged with the [{{< getvar v="product.tsdb.name.lc" >}}](#tsdb) library and can be used to query time-series databases in the {{< product lc >}}.
  {{< /td >}}
  {{< td >}}{{< verkey k="prometheus.version_short" >}}
  <hr/>
  Prometheus {{< verkey k="prometheus.prometheus_version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  {{< td >}}
    {{< condition filter="native_app_cluster" filterval="true" >}}
    Available on port 9090 of the master application node
    {{< /condition >}}
  {{< /td >}}
  {{< /comment >}}
</tr>

<tr id="frames">
  {{< td >}}**{{< getvar v="product.frames.name.long_tc" >}}**<br/>
    (`{{< verkey k="frames.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}User-defined
  {{< /td >}}
  {{< td >}}The {{< product lc >}}'s {{< getvar v="product.frames.name.long_lc" >}} service, which provides access to the [{{< getvar v="product.frames.name.lc" >}} API]({{< xref f="data-layer/reference/frames/" t="url" >}}) &mdash; an open-source unified high-performance Python DataFrame API for accessing NoSQL, stream, and time-series data in the {{< product lc >}}'s data store.
  {{< /td >}}
  {{< td >}}{{< verkey k="frames.version_short" >}} (server)
  <hr/>
  {{< verkey k="frames.client.version_short" >}} (supported client)
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="spark">
  {{< td >}}**Spark**
  {{< /td >}}
  {{< td >}}User-defined
  {{< /td >}}
  {{< td >}}The {{< url g="spark" v="home" k="text" link="1" >}} data-processing engine, including the following libraries:

  - [SQL and DataFrames]({{< getvar v="spark.sql_home.full" >}})
  - [Streaming]({{< getvar v="spark.streaming_home.full" >}})
  - {{< url g="spark" v="mllib_home" k="text" link="1" >}} for machine learning
  - {{< url g="spark" v="graphx_home" k="text" link="1" >}} for graphs and graph-parallel computation
{{< comment >}}<!-- [IntInfo] See [c-graphx] in data/vars/spark.toml. -->
{{< /comment >}}
{{< comment >}}<!-- [ci-indented-excluded-output-shcd-extra-space-in-output]
  [InfraInfo] See details in the sw-specifications.md specs file. -->
{{< /comment >}}
  {{< /td >}}
  {{< td >}}{{< verkey k="spark.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="spark-operator">
  {{< td >}}**Spark Operator**<br/>
    (`{{< verkey k="spark_operator.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The {{< url v="gcp_spark_k8s_operator_home" k="name" link="1" >}} Kubernetes Operator for Spark ("Spark Operator"), which enables simplifying submission and scheduling of Spark jobs.
      This service is designed to be used via the [MLRun](#mlrun) Spark Operator API.
    {{< comment >}}<!-- [InfInfo] See [c-spark-operator] in product.toml. -->
    {{< /comment >}}
  {{< /td >}}
  {{< td >}}{{< verkey k="spark_operator.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="presto">
  {{< td >}}**Presto**<br/>
    (`{{< verkey k="presto.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The {{< url g="presto" v="home" k="text" link="1" >}} distributed SQL query engine for big data.
  {{< /td >}}
  {{< td >}}{{< verkey k="presto.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  {{< td >}}
    {{< condition filter="native_app_cluster" filterval="true" >}}
    Available on port {{< verkey k="presto.native_app_cluster.port" >}} of the master application node
    {{< /condition >}}
  {{< /td >}}
  {{< /comment >}}
</tr>

<tr id="hive">
  {{< td >}}**Hive Metastore**
  {{< /td >}}
  {{< td >}}Internal
  {{< /td >}}
  {{< td >}}An internal {{< url v="hive_home" k="text" link="1" >}} Metastore service that can be enabled for the [Presto service](#presto) to allow saving views and using the Presto Hive connector.
  {{< /td >}}
  {{< td >}}{{< verkey k="hive.version" >}}
  {{< /td >}}
 {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="horovod-mpi-opeartor">
  {{< td >}}**Horovod / MPI Operator**<br/>
    (`{{< verkey k="horovod.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}Distributed training using {{< url v="kubeflow_mpi_operator_home" k="text" link="1" >}} and Uber's {{< url v="horovod_home" k="text" link="1" >}} distributed deep-learning framework for creating machine-learning models that are trained simultaneously over multiple GPUs or CPUs.
    For more information, see {{< xref f="services/app-services/horovod-mpi-operator.md" >}} and {{< xref f="services/app-services/gpu.md" >}}.
    {{< comment >}}<!-- [c-mpi-operator-horovod-service] [IntInfo] See info in
      data/vars/product.toml. -->
    {{< /comment >}}
  {{< /td >}}
  {{< td >}}{{< verkey k="horovod.version" >}}
  {{< /td >}}
  <td/>
</tr>

<tr id="log-forwarder">
  {{< td >}}**Log Forwarder**<br/>
    (`{{< verkey k="log_forwarder.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}A {{< product lc >}} service that uses {{< url v="filebeat_home" k="text" link="1" >}} to forward application-service logs to be stored and indexed in an instance of the {{< url v="elasticsearch_home" k="text" link="1" >}} search and analytics engine.
    <br/>
    Note that this default service is disabled by default because you need to configure the URL of an Elasticsearch service for storing and indexing the logs.
    For more information, see {{< xref f="cluster-mgmt/logging-n-debugging.md" a="logging-services" >}}.
  {{< /td >}}
  {{< td >}}{{< verkey k="log_forwarder.version" >}}
  <hr/>
  Supports Elasticsearch {{< verkey k="elasticsearch.versions" >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (9.12.20) The supported Elasticsearch
    versions were added retroactively for v2.10.0. See the email thread
    "Documenting supported ES version". I also added an "Elasticsearch" link
    to the log-forwarder service entry at the start of this section. -->
  {{< /comment >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="monitoring">
  {{< td >}}**Monitoring**<br/>
    (`{{< verkey k="monitoring.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}A {{< product lc >}} service for monitoring application services and gathering performance statistics and additional data.
    The gathered data is visualized on Grafana dashboards using the {{< product lc >}}'s Grafana services.
    For more information, see {{< xref f="services/monitoring-services.md" >}}.
  {{< /td >}}
  {{< td >}}{{< verkey k="monitoring.version_short" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="grafana">
  {{< td >}}**Grafana**
  {{< /td >}}
  {{< td >}}User-defined
  {{< /td >}}
  {{< td >}}The {{< url v="grafana_home" k="text" link="1" >}} analytics and monitoring platform.
    <br/>
    In cloud {{< product lc >}} environments, Grafana is currently available as a shared single-instance tenant-wide service.
    <br/>
    The {{< product lc >}} also has a shared single-instance tenant-wide application-cluster Grafana service with monitoring dashboards for the entire Kubernetes application cluster, which isn't visible on the <gui-title>Services</gui-title> {{< productUI lc >}} page but is accessible from the <gui-title>Clusters</gui-title> page.
    For more information, see {{< xref f="services/monitoring-services.md" a="grafana-app-cluster-service" >}}.
    {{< comment >}}<!-- [c-grafana-cloud-single-tenant-wide-service] -->
    {{< /comment >}}
  {{< /td >}}
  {{< td >}}{{< verkey k="grafana.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  {{< td >}}
    {{< condition filter="native_app_cluster" filterval="true" >}}
    Available on port 3000 of the master application node
    {{< /condition >}}
  {{< /td >}}
  {{< /comment >}}
</tr>

<tr id="docker-registry">
  {{< td >}}**Docker Registry**
  {{< /td >}}
  {{< td >}}Default and user-defined
  {{< /td >}}
  {{< td >}}A platform service for working with a {{< url v="docker_doc_docker_registry" k="text" link="1" >}}, which is used by the [Nuclio](#nuclio) service to store the function images.
    You can create a Docker Registry service and configure it to work with a remote off-cluster Docker Registry.
    On the default tenant, the Nuclio service is configured by default to work with a pre-deployed default tenant-wide `{{< verkey k="docker_registry.service_display_name" >}}` service that uses a pre-deployed local on-cluster Docker Registry.
  {{< /td >}}
  {{< td >}}{{< verkey k="docker_registry.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="authenticator">
  {{< td >}}**OAuth2 (OIDC) Authenticator**<br/>
    (`{{< verkey k="authenticator.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}A federated {{< url v="oidc_home" k="text_full" link="1" >}} provider over OAuth2, using OpenID Connect (OIDC).
      This service is used for OAuth2 authentication of user access to Nuclio API gateways and shared Grafana services, including access by external (non-{{< product lc >}}) users.
    {{< comment >}}<!-- [InfInfo] See [c-authenticator-service] in product.toml.
      -->
    {{< /comment >}}
  {{< /td >}}
  {{< td >}}{{< verkey k="authenticator.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="web-shell">
  {{< td >}}**Web Shell**
  {{< /td >}}
  {{< td >}}User-defined
  {{< /td >}}
  {{< td >}}A {{< product lc >}} service that provides a web-based command-line shell ("web shell") for running application services &mdash; such as Spark jobs and Presto queries &mdash; and performing basic file-system operations.
    <br/>
    Note that this isn't a fully functional Linux shell.
    For more information, see {{< xref f="services/app-services/web-shell.md" >}}.
  {{< /td >}}
  {{< td >}}{{< productVersion num >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="hadoop">
  {{< td >}}**Hadoop**
  {{< /td >}}
  {{< td >}}Default
  {{< /td >}}
  {{< td >}}The {{< url g="hadoop" v="home" k="text" link="1" >}} distributed data-processing library{{< condition filter="native_app_cluster" filterval="true" >}}, including the Hadoop YARN framework for job scheduling and cluster resource management{{< /condition >}}.
    For more information, see {{< xref f="services/app-services/hadoop.md" >}}.
  {{< /td >}}
  {{< td >}}{{< verkey k="hadoop.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  {{< td >}}
    {{< condition filter="native_app_cluster" filterval="true" >}}
    Hadoop YARN is available on port 8088 of the master application node
    {{< /condition >}}
  {{< /td >}}
  {{< /comment >}}
</tr>

<tr id="v3io-daemon">
  {{< td >}}**V3IO Daemon**<br/>
    (`{{< verkey k="v3io_daemon.service_display_name" >}}`)
  {{< /td >}}
  {{< td >}}Default (internal)
  {{< /td >}}
  {{< td >}}An internal service for integrating the {{< product lc >}} with external applications by using the {{< product lc >}}'s V3IO library.
  {{< /td >}}
  {{< td >}}{{< productVersion num >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>

<tr id="os">
<tr>
  {{< td >}}**Operating System**
  {{< /td >}}
  {{< td >}}Internal
  {{< /td >}}
  {{< td >}}The {{< url v="centos_home" k="text" link="1" >}} Linux operating-system.
  {{< /td >}}
  {{< td >}}{{< verkey k="centos.version" >}}
  {{< /td >}}
  {{< comment >}}<!-- [ci-url-col-exclude] -->
  <td/>
  {{< /comment >}}
</tr>
</table>

<!-- ---------------------------------------- -->
### Application Library Versions {#predeployed-app-services-n-tools-lib-versions}

The following table provides information about the versions of application libraries (packages) that are used or certified for usage with different pre-deployed {{< product lc >}} tools and services:

<table>
<tr text-align="left">
  <th style="vertical-align:'top'; font-weight:bold;">
    Service
  </th>
  <th style="vertical-align:'top'; font-weight:bold;">
    Pre-deployed and Certified Application Library Versions
  </th>
</tr>

<tr id="app-lib-vers-bigdata-api-libs">
  {{< td >}}**{{< product tc>}} API Libraries**
  {{< /td >}}
  {{< td >}}Java {{< verkey k="bigdata_libs.java.version" >}}
  <hr/>
  Scala {{< verkey k="bigdata_libs.scala.version" >}}
  {{< /td >}}
</tr>

<tr id="app-lib-vers-frames">
  {{< td >}}**{{< getvar v="product.frames.name.tc" >}}**
  {{< /td >}}
  {{< td >}}Python {{< verkey k="frames.python.versions" >}}
  {{< /td >}}
</tr>

<tr id="app-lib-vers-nuclio">
  {{< td >}}**Nuclio**
  {{< /td >}}
  {{< td >}}Python {{< verkey k="nuclio.python.versions" >}}
  {{< /td >}}
</tr>

<tr id="app-lib-vers-juypter">
  {{< td >}}**Jupyter**
  {{< /td >}}
  {{< td >}}{{< company >}} {{< public-gh ghid="tutorials" k="text_long" >}} ({{< public-gh ghid="tutorials" link="1" path="/" k="name" >}}) {{< verkey k="tutorials.version_short" >}}

  <hr/>
  {{< getvar v="product.python_sdk.name.full" >}} ({{< public-gh ghid="python_sdk" link="1" path="/" k="name" >}}) {{< verkey k="python_sdk.version_short" >}} (Python {{< verkey k="python_sdk.python.versions" md=true >}})

  <hr/>
  {{< public-gh ghid="nuclio_jupyter" k="text_long" >}} ({{< public-gh ghid="nuclio_jupyter" path="/" k="name" link="1" >}}) {{< verkey k="nuclio_jupyter.version_short" >}}
 
  <hr/>
  Python {{< verkey k="jupyterlab.python.version" >}}
    {{< comment >}}<!-- [c-jupyter-notebooks-scala-not-supported] TODO: When we
      fix the Jupyter support for Scala, add supported Scala versions.  -->
    {{< /comment >}}

  <hr/>
  <a id="jupyter-conda"></a>{{< url v="conda_home" k="text" link="1" >}} {{< verkey k="jupyter_notebook.conda.version" >}}

  <hr/>
  <a id="jupyter-cuda"></a>NVIDIA {{< url v="cuda_home" k="text" link="1" >}} {{< verkey k="cuda.version" >}}

  <hr/>
  <a id="jupyter-rapids"></a>NVIDIA {{< url v="rapids_home" k="text" link="1" >}} {{< verkey k="rapids.version" >}}

  <hr/>
  <a id="jupyter-frames-client"></a>{{< getvar v="product.frames.name.sc" >}} client {{< verkey k="frames.client.version_short" >}}
  {{< /td >}}
</tr>

<tr id="app-lib-vers-web-shell">
  {{< td >}}**Web Shell**
  {{< /td >}}
  {{< td >}}Python {{< verkey k="web_shell.python.version" >}}

  <hr/>
  Scala {{< verkey k="web_shell.scala.version" >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Integration with Additional Tools {#integration-with-additional-tools}

You can independently install additional software tools &mdash; such as {{< url v="tensorflow_home" k="text" link="1" >}}, {{< url v="pytorch_home" k="text" link="1" >}}, or {{< url v="scikitlearn_home" k="text" link="1" >}} &mdash; and use them on top of the {{< product lc >}} services.
You can also configure remotely installed tools &mdash; such as {{< url v="tableau_home" k="text" link="1" >}} or {{< url v="looker_home" k="text" link="1" >}} &mdash; to analyze and visualize data in the {{< product lc >}}.
In addition, you can use {{< url v="conda_home" k="text" link="1" >}} (which is available as part of the {{< product lc >}}'s [Jupyter Notebook service](#jupyter-conda)) and {{< url v="pip_home" k="text" link="1" >}} (which is available as part of the Jupyter Notebook, Zeppelin, and web-shell services) to install Python packages.
{{< comment >}}<!-- [IntInfo] (sharonl) (13.6.18) Adi said not to provide
  compatible-versions information for the data-visualization applications - see
  DOC IG-8024. (17.71.8) This was confirmed in general for this section after
  consultation also with Golan. (3.19) Adi confirmed this decision also for
  the v2.0 k8s and managed services release.
  (13.6.18) It was decided not to mention QlikView in the examples because we
  didn't test it, although we will still keep the reference to this third-party
  tool in the ecosystem page. See v1.7.1 DOC IG-8557.
  (14.2.19) Adi explained that the visualization tools are installed remotely
  and configured to access data in the platform over a Java database
  connectivity (JDBC) connector. -->
{{< /comment >}}
For more information, see {{< xref f="services/app-services/" >}}.

{{< note id="additional-tools-local-install-over-kubernetes-note" >}}
Services that are installed locally on the {{< product lc >}} need to run on top of Kubernetes.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/" >}}
- {{< xref f="intro/introduction.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}}
- {{< xref f="cluster-mgmt/deployment/" >}}

