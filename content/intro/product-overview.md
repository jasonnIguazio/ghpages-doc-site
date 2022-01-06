---
title:   "In-Depth Platform Overview"
keywords: "in-depth platform overview, platform overview, overview, introduction, getting started, data science, data science workflow, data colleciton, data ingestion, data exploration, data models, model training, model deployment, deployment to production, data visualization, visualization, data analytics, data monitoring, data logging, mlrun, features, architecture, apis, web apis, data, simple objects, data services, application services, data management, streaming, data streams, sql, nosql, key value, KV, scala, python, nuclio, v3io tsdb, tsdb, time series, v3io frames, frames, presto, spark, grafana, tensorflow, keras, pytortch, pandas, dask, matplotlib, pyplot, numpy, nvidia, nvidia, data frames, dataframes, aws, amazon, operating system, web server, web gateway, nginx, anaylics, AI, artificial intelligence, ML, machine learning, mlib, jupyter, jupyterlab, jupyter notebook, prometheus, REST"
menu:
  main:
    parent:     "intro"
    identifier: "prod-overview"
    weight:     15
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title should
  use {{< product tc >}}.
-->
{{< /comment >}}
{{< comment >}}<!-- !!IMPORTANT!! (sharonl) This page is based on the
  platform-overview.ipynb tutorial Jupyter notebook and should be synced with
  changes to that notebook, provided they're applicable to the documented
  product version. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This document provides an in-depth overview of the {{< product full >}} ("the {{< product lc >}}") and how to use it to implement a full data science workflow.

{{< note id="intro-doc-ref-note" >}}
Start out by first reading the {{< xref f="intro/introduction.md" >}} introduction and high-level overview.
{{< /note >}}

The {{< product lc >}} uses {{< url v="kubernetes_home" k="text" link="1" >}} (k8s) as the baseline cluster manager, and deploys various application microservices on top of Kubernetes to address different data science tasks.
Most of the provided services support scaling out and GPU acceleration and have a secure and low-latency access to the {{< product lc >}}'s shared data store and file system, enabling high performance and scalability with maximum resource efficiency.

The {{< product lc >}} makes extensive use of [Nuclio serverless functions]({{< public-gh ghid="nuclio_nuclio" >}}) to automate various tasks &mdash; such as data collection, extract-transform-load (ETL) processes, model serving, and batch jobs.
Nuclio functions describe the code and include all the required resource definitions and configuration for running the code.
The functions auto scale and can be versioned.
The {{< product lc >}} supports various methods for generating Nuclio functions &mdash; using the graphical dashboard, Docker, Git, or Jupyter Notebook &mdash; as demonstrated in the {{< product lc >}} tutorials.
{{< comment >}}<!-- [IntInfo] (sharonl) (27.3.19) Adi requested that we link
  to the Nuclio GitHub repo here and not to the Nuclio web site. -->
{{< /comment >}}

The following sections detail how you can use the {{< product lc >}} to implement all stages of a data science workflow from research to production.

<!-- ---------------------------------------- -->
## Collecting and Ingesting Data {#data-collection-and-ingestion}

There are many ways to collect and ingest data from various sources into the {{< product lc >}}:

- Streaming data in real time from sources such as Kafka, Kinesis, Azure Event Hubs, or Google Pub/Sub.
    {{< comment >}}<!-- [IntInfo] (sharonl) (27.3.19) Adi said that this refers
      to the option to ingest stream data from these sources with Nuclio. -->
    {{< /comment >}}
- Loading data directly from external databases using an event-driven or periodic/scheduled implementation.
    See the explanation and examples in the [**read-external-db**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/read-external-db.ipynb#ingest-from-external-db-to-no-sql-using-frames) tutorial.
    {{< comment >}}<!-- [IntInfo] (sharonl) (27.3.19) Adi said that this refers
      to the option of Nuclio functions with event triggers. -->
    {{< /comment >}}
- Loading files (objects), in any format (for example, CSV, Parquet, JSON, or a binary image), from internal or external sources such as Amazon S3 or Hadoop.
    See, for example, the [**file-access**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/file-access.ipynb) tutorial.
    {{< comment >}}<!-- [IntInfo] (sharonl) (27.3.19) Adi said that this refers
      to the option to ingest (read) files (simple objects) with different
      platform APIs, such as a curl download command or using the S3 API. -->
  {{< /comment >}}
- Importing time-series telemetry data using a Prometheus compatible scraping API.
    {{< comment >}}<!-- [IntInfo] (sharonl) (27.3.19) I think this refers to the
      TSDB Nuclio ingest function. -->
    {{< /comment >}}
- Ingesting (writing) data directly into the system using RESTful AWS-like simple-object, streaming, or NoSQL APIs.
    See the {{< product lc >}}'s {{< xref f="data-layer/reference/web-apis/" text="Web-API References" >}}.
    {{< comment >}}<!-- [IntInfo] (sharonl) (27.3.19) Adi said that this refers
      to using the platform's web APIs. -->
    {{< /comment >}}

For more information and examples of data collection, ingestion, and preparation with the {{< product lc >}}, see the [**{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.name" >}}**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}#gs-data-collection-and-ingestion) tutorial Jupyter notebook.

<!-- ---------------------------------------- -->
## Exploring and Processing Data {#data-exploration-and-processing}

The {{< product lc >}} includes a wide range of integrated open-source data query and exploration tools, including the following:

- {{< url g="spark" v="home" k="text" link="1" >}} data-processing engine &mdash; including the Spark SQL and Datasets, MLlib, R, and GraphX libraries &mdash; with real-time access to the {{< product lc >}}'s NoSQL data store and file system.
- {{< url g="presto" v="home" k="text" link="1" >}} distributed SQL query engine, which can be used to run interactive SQL queries over {{< product lc >}} NoSQL tables or other object (file) data sources.
- {{< url v="pandas_home" k="text" link="1" >}} Python analysis library, including structured DataFrames.
- {{< url v="dask_home" k="text" link="1" >}} parallel-computation Python library, including scaled pandas DataFrames.
- {{< public-gh ghid="frames" link="1" k="text_long" >}} &mdash; {{< company >}}'s open-source data-access library, which provides a unified high-performance API for accessing NoSQL, stream, and time-series data in the {{< product lc >}}'s data store and features native integration with pandas and {{< url v="rapids_home" k="text_long" link="1" >}}.
    See, for example, the [**frames**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/frames.ipynb) tutorial.
- Built-in support for ML packages such as {{< url v="scikitlearn_home" k="text" link="1" >}}, {{< url v="pyplot_home" k="text" link="1" >}}, {{< url v="numpy_home" k="text" link="1" >}}, {{< url v="pytorch_home" k="text" link="1" >}}, and {{< url v="tensorflow_home" k="text" link="1" >}}.

All these tools are integrated with the {{< product lc >}}'s Jupyter Notebook service, allowing users to access the same data from Jupyter through different interfaces with minimal configuration overhead.
Users can easily install additional Python packages by using the {{< url v="conda_home" k="text" link="1" >}} binary package and environment manager and the {{< url v="pip_home" k="text" link="1" >}} Python package installer, which are both available as part of the Jupyter Notebook service.
This design, coupled with the {{< product lc >}}'s unified data model, enables users to store and access data using different formats &mdash; such as NoSQL ("key/value"), time series, stream data, and files (simple objects) &mdash; and leverage different tools and APIs for accessing and manipulating the data, all from a single development environment (namely, Jupyter Notebook).

{{< note id="ui-services-page-ref-note" >}}
You can deploy and manage application services, such as Spark and Jupyter Notebook, from the **Services** page of the {{< productUI short_lc >}}.
For more information, see {{< xref f="services/fundamentals.md" >}}.
{{< /note >}}

For more information and examples of data exploration with the {{< product lc >}}, see the [**getting-started**]({{< public-gh ghid="mlrun_demos" path="/" >}}{{< verkey k="mlrun.demos.gs_tutorial.dir_name" >}}/README.md) and [**{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.name" >}}**]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.dir_name" >}}/{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.file" >}}) tutorials.
{{< comment >}}<!-- [c-mlrun-gs-tutorial-ref] (sharonl) TODO: When the embedded
  MLRun documentation at ds-and-mlops/_index.md contains a tutorial/ section
  with a copy of the getting-started tutorial from the mlrun/demos repo
  (already available on the mlrun/mlrun `0.6.x-dev` development branch),
  consider linking also to this documentation here. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
## Building and Training Models {#building-and-training-models}

You can develop and test data science models in the {{< product lc >}}'s Jupyter Notebook service or in your preferred external editor.
When your model is ready, you can train it in Jupyter Notebook or by using scalable cluster resources such as Nuclio functions, Dask, Spark ML, or Kubernetes jobs.
You can find model-training examples in the following {{< product lc >}} demos; for more information and download instructions, see the [{{< product lc >}} introduction]({{< xref f="intro/introduction.md" a="demos" t="url" >}}).

- The NetOps demo demonstrates predictive infrastructure-monitoring using scikit-learn.
- The image-classification demo demonstrates image recognition using TensorFlow and Horovod with MLRun.

If you're are a beginner, you might find the following ML guide useful &mdash; [Machine Learning Algorithms In Layman's Terms](https://towardsdatascience.com/machine-learning-algorithms-in-laymans-terms-part-1-d0368d769a7b).

<!-- ---------------------------------------- -->
### Experiment Tracking {#experiment-tracking}

One of the most important and challenging areas of managing a data science environment is the ability to track experiments.
Data scientists need a simple way to track and view current and historical experiments along with the metadata that is associated with each experiment.
This capability is critical for comparing different runs, and eventually helps to determine the best model and configuration for production deployment.
The {{< product lc >}} leverages the open-source {{< public-gh ghid="mlrun_mlrun" link="1" k="text" >}} library to help tackle these challenges.
You can find examples of using MLRun in the MLRun demos.
See the information about getting additional demos in the [{{< product lc >}} introduction]({{< xref f="intro/introduction.md" a="end-to-end-use-case-applications" t="url" >}}).

<!-- ---------------------------------------- -->
## Deploying Models to Production {#deploying-models-to-production}

The {{< product lc >}} allows you to easily deploy your models to production in a reproducible way by using the open-source Nuclio serverless framework.
You provide Nuclio with code or Jupyter notebooks, resource definitions (such as CPU, memory, and GPU), environment variables, package or software dependencies, data links, and trigger information.
Nuclio uses this information to automatically build the code, generate custom container images, and connect them to the relevant compute or data resources.
The functions can be triggered by a wide variety of event sources, including the most commonly used streaming and messaging protocols, HTTP APIs, scheduled (cron) tasks, and batch jobs.

Nuclio functions can be created from the {{< productUI short_lc >}} or by using standard code IDEs, and can be deployed on your {{< product lc >}} cluster.
A convenient way to develop and deploy Nuclio functions is by using Jupyter Notebook and Python tools.
For detailed information about Nuclio, visit the [Nuclio website]({{< url v="nuclio_home" k="full" >}}) and see the product [documentation]({{< url v="nuclio_docs" k="full" >}}).

{{< note id="nuclio-funcs-not-only-for-model-serving-note" >}}
Nuclio functions aren't limited to model serving: they can automate data collection, serve custom APIs, build real-time feature vectors, drive triggers, and more.
{{< /note >}}

For an overview of Nuclio and how to develop, document, and deploy serverless Python Nuclio functions from Jupyter Notebook, see the [{{< public-gh ghid="nuclio_jupyter" k="repo_name" >}} documentation]({{< public-gh ghid="nuclio_jupyter" path="/README.md" >}}).
You can also find examples in the {{< product lc >}} tutorials.
For example, the NetOps demo demonstrates how to deploy a network-operations model as a function; for more information about this demo and how to get it, see the [{{< product lc >}} introduction]({{< xref f="intro/introduction.md" a="end-to-end-use-case-applications" t="url" >}}).

<!-- ---------------------------------------- -->
## Visualization, Monitoring, and Logging {#visualization-monitoring-and-logging}

Data in the {{< product lc >}} &mdash; including collected data, internal or external telemetry and logs, and program-output data &mdash; can be analyzed and visualized in different ways simultaneously.
The {{< product lc >}} supports multiple standard data analytics and visualization tools, including SQL, Prometheus, Grafana, and pandas.
For example, you can plot or chart data within Jupyter Notebook using {{< url v="matplotlib_home" k="text" link="1" >}}; use your favorite BI visualization tools, such as {{< url v="tableau_home" k="text" link="1" >}}, to query data in the {{< product lc >}} over a Java database connectivity connector (JDBC); or build real-time dashboards in Grafana.

The data analytics and visualization tools and services generate telemetry and log data that can be stored using the {{< product lc >}}'s time-series database (TSDB) service or by using external tools such as {{< url v="elasticsearch_home" k="text" link="1" >}}.
{{< product sc >}} users can easily instrument code and functions to collect various statistics or logs, and explore the collected data in real time.

The {{< url v="grafana_home" k="text" link="1" >}} open-source analytics and monitoring framework is natively integrated into the {{< product lc >}}, allowing users to create dashboards that provide access to {{< product lc >}} NoSQL tables and time-series databases from different dashboard widgets.
You can also create Grafana dashboards programmatically (for example, from Jupyter Notebook) using wizard scripts.
For information on how to create Grafana dashboards to monitor and visualize data in the {{< product lc >}}, see {{< xref f="services/grafana-dashboards.md" >}}.

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT-P3] Further edit the see-also links.
  Before the restructure there were also getting-started tutorials and concepts
  section xrefs and the APIs-overview xref bullet previously also had a
  reference/ bullet. -->
{{< /comment >}}

- {{< xref f="intro/introduction.md" >}}
- {{< xref f="data-layer/" >}}
- {{< xref f="services/" >}}
- {{< xref f="intro/apis-overview.md" >}}
- {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}} and {{< xref s="release-notes" text="release notes" >}}  (registered users only) 

