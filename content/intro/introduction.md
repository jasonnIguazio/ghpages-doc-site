---
title:   "Introducing the Platform"
keywords: "introduction, overview, getting started, data science, data science workflow, data colleciton, data ingestion, data exploration, data models, model training, model deployment, deployment to production, data visualization, visualization, data analytics, data monitoring, data logging, data pipelines, ML pipelines, automated pipelines, worflow pipelines, operational pipelines, data-engineering pipelines, data science pipelines, features, architecture, apis, web apis, data, simple objects, data services, application services, data management, streaming, data streams, sql, nosql, key value, KV, scala, python, nuclio, v3io tsdb, tsdb, time series, v3io frames, frames, presto, spark, grafana, tensorflow, keras, pytortch, pandas, dask, matplotlib, pyplot, numpy, nvidia, nvidia, data frames, dataframes, aws, amazon, operating system, web server, web gateway, nginx, anaylics, AI, artificial intelligence, ML, machine learning, mlib, jupyter, jupyterlab, jupyter notebook, prometheus, REST"
menu:
    main:
        parent:     "intro"
        identifier: "prod-intro"
        weight:     10
---
{{< comment >}} <!-- 
    IMPORTANT!! ***Notes on how to copy from content from https://github.com/v3io/tutorials readme.md.***
    Use the introduction-old file in the repo as the base to understand the adjustments that need to be made.
    Make adjustments to links as needed.
    Make adjustments to hard coded terms when shortcuts are needed.
    Remove the "open locally" from the table.
    Adjust the images location for the Github logo (remove the ./assets from the link after copying).
--> {{< /comment >}}
# Welcome to the Iguazio Data Science {{< product tc >}}

An initial introduction to the Iguazio Data Science {{< product lc >}} and the {{< product lc >}} tutorials

- [{{< product tc >}} Overview](#{{< product tc >}}-overview)
- [Data Science Workflow](#data-science-workflow)
- [The Tutorial Notebooks](#the-tutorial-notebooks)
- [Getting-Started Tutorial](#getting-started-tutorial)
- [End-to-End Use-Case Application and How-To Demos](#demos)
- [Installing and Updating the MLRun Python Package](#mlrun-python-pkg-install-n-update)
- [Data Ingestion and Preparation](#data-ingestion-and-preparation)
- [Additional {{< product lc >}} Resources](#{{< product lc >}}-resources)
- [Miscellaneous](#misc)

<a id="{{< product lc >}}-overview"></a>

## Platform Overview

The Iguazio Data Science {{< product lc >}} (**"the {{< product lc >}}"**) is a fully integrated and secure data science {{< product lc >}} as a service (PaaS), which simplifies development, accelerates performance, facilitates collaboration, and addresses operational challenges.
The {{< product lc >}} incorporates the following components:

- A data science workbench that includes Jupyter Notebook, integrated analytics engines, and Python packages
- The [MLRun](https://mlrun.readthedocs.io) open-source MLOps orchestration framework for ML model management with experiments tracking and pipeline automation
- Managed data and machine-learning (ML) services over a scalable Kubernetes cluster
- A real-time serverless functions framework for model serving ([Nuclio](https://nuclio.io/))
- An extremely fast and secure data layer that supports SQL, NoSQL, time-series databases, files (simple objects), and streaming
- Integration with third-party data sources such as Amazon S3, HDFS, SQL databases, and streaming or messaging protocols
- Real-time dashboards based on Grafana

<br><img src="/images/igz-self-service-{{< product lc >}}.png" alt="Self-service data science {{< product lc >}}" width="650"/><br>

<a id="data-science-workflow"></a>

## Data Science Workflow

The {{< product lc >}} provides a complete data science workflow in a single ready-to-use {{< product lc >}} that includes all the required building blocks for creating data science applications from research to production:

- Collect, explore, and label data from various real-time or offline sources
- Run ML training and validation at scale over multiple CPUs and GPUs
- Deploy models and applications into production with serverless functions
- Log, monitor, and visualize all your data and services

![Data Science Workflow](/images/igz-data-science-workflow.gif)

<a id="the-tutorial-notebooks"></a>

## The Tutorial Notebooks

The home directory of the {{< product lc >}}'s running-user directory (**/User/&lt;running user&gt;**) contains pre-deployed tutorial Jupyter 
notebooks with code samples and documentation to assist you in your development &mdash; including 
a **demos** directory with end-to-end use-case applications (see the next section) and a **data-ingestion-and-preparation**] 
directory with documentation and examples for performing data ingestion and preparation tasks.

> **Note:**
> - To view and run the tutorials from the {{< product lc >}}, you first need to create a Jupyter Notebook service.
> - The **welcome.ipynb** notebook and main **README.md** file provide the same introduction in different formats.

<a id="getting-started-tutorial"></a>

## Getting-Started Tutorial

Start out by running the getting-started tutorial to familiarize yourself with the {{< product lc >}} and experience firsthand some of its main capabilities.

<a href="https://github.com/mlrun/demos/blob/release/v0.9.x-latest/getting-started-tutorial/README.md"><img src="/images/view-tutorial-button.png" alt="View tutorial"/></a>

You can also view the tutorial on [GitHub](https://github.com/mlrun/demos/blob/release/v0.9.x-latest/getting-started-tutorial/README.md).

<a id="demos"></a>

## End-to-End Use-Case Application and How-To Demos

Iguazio provides full end-to-end use-case application and how-to demos that demonstrate how to use the {{< product lc >}}, its MLRun service, and related tools to address data science requirements for different industries and implementations.
These demos are available in the [MLRun demos repository](https://github.com/mlrun/demos).
Use the provided [**update-demos.sh**](./update-demos.sh) script to get updated demos from this repository.
By default, the script retrieves the files from the latest release that matches the version of the installed `mlrun` package (see [Installing and Updating the MLRun Python Package](#mlrun-python-pkg-install-n-update)).
The files are copied to the **/v3io/users/&lt;username&gt;/demos** directory, where `<username>` is the name of the running user (`$V3IO_USERNAME`) unless you set the `-u|--user` flag to another username.
> **Note:** Before running the script, close any open files in the **demos** directory.

```
# Get additional demos
!{{% verkey k="jupyter_notebook.tutorials.demos.update_script.path" %}}
```

For full usage instructions, run the script with the `-h` or `--help` flag:

```
!{{% verkey k="jupyter_notebook.tutorials.demos.update_script.path" %}} --help
```

<a id="end-to-end-use-case-applications"></a>

### End-to-End Use-Case Application Demos

<table width='100%'>
<tr align="left" style="border-bottom: 1pt solid black;">
<th>Demo</th>
<th/>
<th>Description</th>
</tr>
    <tr>
        <td><b>News Article Summarization and Keyword Extraction via NLP</b></td>
        <td align="center", style="min-width:45px; padding: 10px;">
            <a target="_blank" href="https://github.com/mlrun/demos/tree/release/v0.9.x-latest/news-article-nlp/"><img src="/images/GitHub-Mark-32px.png"/><br>View on GitHub</a>
        </td>
        <td>Demonstrates how to create an NLP pipeline that will summarize and extract keywords from a news article URL. We will be using state-of-the-art transformer models such as BERT to perform these NLP tasks.
        </td>
    </tr>
    <tr>
        <td><b>Mask Detection</b></td>
        <td align="center", style="min-width:45px; padding: 10px;">
            <a target="_blank" href="https://github.com/mlrun/demos/tree/release/v0.9.x-latest/mask-detection/"><img src="/images/GitHub-Mark-32px.png"/><br>View on GitHub</a>
        </td>
        <td>Demonstrates how to use MLRun to create a mask detection app. We'll train a model that classifies an image of a person as wearing a mask or not, and serve it to an HTTP endpoint.
        </td>
    </tr>
    <tr>
        <td><b>Fraud Prevention - Iguazio Feature Store</b></td>
        <td align="center", style="min-width:45px; padding: 10px;">
            <a target="_blank" href="https://github.com/mlrun/demos/tree/release/v0.9.x-latest/fraud-prevention-feature-store"><img src="/images/GitHub-Mark-32px.png"/><br>View on GitHub</a>
        </td>
        <td>Demonstrates how to develop a fraud prevention pipeline using the Iguazio feature store.
            The demo creates a full end to end flow starting with creating feature sets,then deploying them as operational
            feature sets, then train the models, then deploy it as an online serving function, and then close the loop with model monitoring.
        </td>
    </tr>
</table>

<a id="howto-demos"></a>

### How-To Demos

<table align="left">
    <tr align="left" style="border-bottom: 1pt solid black;">
    <th>Demo</th>
    <th/>
    <th>Description</th>
    </tr>
    <tr>
        <td><b>How-To: Converting existing ML code to an MLRun project</b></td>
        <td align="center", style="min-width:45px; padding: 10px;">
            <a target="_blank" href="https://github.com/mlrun/demos/tree/release/v0.9.x-latest/howto/converting-to-mlrun"><img src="/images/GitHub-Mark-32px.png"/><br>View on GitHub</a>
        </td>
        <td>Demonstrates how to convert existing ML code to an MLRun project.
            The demo implements an MLRun project for taxi ride-fare prediction based on a <a href="https://www.kaggle.com/jsylas/python-version-of-top-ten-rank-r-22-m-2-88">Kaggle notebook</a> with an ML Python script that uses data from the <a href="https://www.kaggle.com/c/new-york-city-taxi-fare-prediction">New York City Taxi Fare Prediction competition</a>.
        </td>
    </tr>
    <tr>
        <td><b>How-To: Running a Spark job for reading a CSV file</b></td>
        <td align="center", style="min-width:45px; padding: 10px;">
            <a target="_blank" href="https://github.com/mlrun/demos/blob/release/v0.9.x-latest/howto/spark/spark-mlrun-read-csv.ipynb"><img src="/images/GitHub-Mark-32px.png"/><br>View on GitHub</a>
        </td>
        <td>Demonstrates how to run a Spark job that reads a CSV file and logs the data set to an MLRun database.
        </td>
    </tr>
    <tr>
        <td><b>How-To: Running a Spark job for analyzing data</b></td>
        <td align="center", style="min-width:45px; padding: 10px;">
            <a target="_blank" href="https://github.com/mlrun/demos/blob/release/v0.9.x-latest/howto/spark/spark-mlrun-describe.ipynb"><img src="/images/GitHub-Mark-32px.png"/><br>View on GitHub</a>
        </td>
        <td>Demonstrates how to create and run a Spark job that generates a profile report from an Apache Spark DataFrame based on pandas profiling.
        </td>
    </tr>
    <tr>
        <td><b>How-To: Running a Spark Job with Spark Operator</b></td>
        <td align="center", style="min-width:45px; padding: 10px;">
            <a target="_blank" href="https://github.com/mlrun/demos/blob/release/v0.9.x-latest/howto/spark/spark-operator.ipynb"><img src="/images/GitHub-Mark-32px.png"/><br>View on GitHub</a>
        </td>
        <td>Demonstrates how to use <a target="_blank" href="https://github.com/GoogleCloud{{< product lc >}}/spark-on-k8s-operator">Spark Operator</a> to run a Spark job over Kubernetes with MLRun.
        </td>
    </tr>
</table>

<a id="mlrun-python-pkg-install-n-update"></a>

## Installing and Updating the MLRun Python Package

The demo applications and many of the {{< product lc >}} tutorials use [MLRun](https://mlrun.readthedocs.io) &mdash; Iguazio's end-to-end open-source MLOps solution for managing and automating your entire analytics and machine-learning life cycle, from data ingestion through model development to full pipeline deployment in production.
MLRun is available in the {{< product lc >}} via a default (pre-deployed) shared {{< product lc >}} service (`mlrun`).
However, to use MLRun from Python code (such as in the demo and tutorial notebooks), you also need to install the [MLRun Python package](https://readthedocs.org/projects/mlrun/) (`mlrun`).
The version of the installed package must match the version of the {{< product lc >}}'s MLRun service and must be updated whenever the service's version is updated.

The {{< product lc >}} provides an <file>{{< verkey k="mlrun.align_script.file" >}}</file> script for simplifying the MLRun package installation and version synchronization with the MLRun service.
The script is available in the running-user directory (your Jupyter home directory), which is accessible via the `/User` data mount.
Use the following command to run this script for the initial package installation (after creating a new Jupyter Notebook service) and whenever the MLRun service is updated; (the command should be run for each Jupyter Notebook service):

```
!{{% verkey k="mlrun.align_script.path" %}}
```


<a id="data-ingestion-and-preparation"></a>

## Data Ingestion and Preparation

The {{< product lc >}} allows storing data in any format.
The {{< product lc >}}'s multi-model data layer and related APIs provide enhanced support for working with NoSQL ("key-value"), time-series, and stream data.
Various steps of the data science life cycle (pipeline) might require different tools and frameworks for working with data, especially when it comes to the different mechanisms required during the research and development phase versus the operational production phase.
The {{< product lc >}} features a wide array of methods for manipulating and managing data, of different formats, in each step of the data life cycle, using a variety of frameworks, tools, and APIs &mdash; such as as the following:

- Spark SQL and DataFrames
- Spark Streaming
- Presto SQL queries
- pandas DataFrames
- Dask
- {{< getvar v="product.frames.name.long_sc" >}} Python library
- V3IO SDK
- Web APIs

The {{< xref f="data-layer/data-ingestion-and-preparation.md" >}} tutorial README (**data-ingestion-and-preparation/README.ipynb/.md**) provides an overview of various methods for collecting, storing, and manipulating data in the {{< product lc >}}, and references to sample tutorial notebooks that demonstrate how to use these methods.
<br>
**&#x25B6; [Open the README notebook](https://github.com/v3io/tutorials/blob/3.x/data-ingestion-and-preparation/README.ipynb) / [Markdown file](https://github.com/v3io/tutorials/blob/3.x/data-ingestion-and-preparation/README.md)**

<a id="{{< product lc >}}-resources"></a>

## Additional {{< product lc >}} Resources

You can find more information and resources in the MLRun documentation:
<br>
**&#x25B6; [View the MLRun documentation](https://mlrun.readthedocs.io)**

You might also find the following resources useful:

- [Introduction video](https://www.youtube.com/watch?v=8OmAN4wd7To)
- [In-depth {{< product lc >}} overview]({{< product lc >}}-overview.ipynb) with a break down of the steps for developing a full data science workflow from development to production
- [{{< product lc >}} Services](https://www.iguazio.com/docs/v3.0/services/)
- [{{< product lc >}} data layer](https://www.iguazio.com/docs/v3.0/data-layer/), including [references](https://www.iguazio.com/docs/v3.0/data-layer/reference/)
- [nuclio-jupyter SDK](https://github.com/nuclio/nuclio-jupyter/blob/master/README.md) for creating and deploying Nuclio functions with Python and Jupyter Notebook

<a id="misc"></a>

## Miscellaneous

<a id="creating-virtual-environments-in-jupyter-notebook"></a>
### Creating Virtual Environments in Jupyter Notebook

A virtual environment is a named, isolated, working copy of Python that maintains its own files, directories, and paths so that you can work with specific versions of libraries or Python itself without affecting other Python projects.
Virtual environments make it easy to cleanly separate projects and avoid problems with different dependencies and version requirements across components.
See the [virtual-env](virtual-env.ipynb) tutorial notebook for step-by-step instructions for using conda to create your own Python virtual environments, which will appear as custom kernels in Jupyter Notebook.

<a id="update-notebooks"></a>
### Updating the Tutorial Notebooks

You can use the provided **igz-tutorials-get.sh** script to get updated {{< product lc >}} tutorials from the [tutorials GitHub repository](https://github.com/v3io/tutorials/).
By default, the script retrieves the files from the latest release that matches the current {{< product lc >}} version.
For details, see the [**update-tutorials.ipynb**](https://github.com/v3io/tutorials/blob/3.x/update-tutorials.ipynb) notebook.

<a id="v3io-dir"></a>
### The v3io Directory

The **v3io** directory that you see in the file browser of the Jupyter UI displays the contents of the `v3io` data mount for browsing the {{< product lc >}} data containers.
For information about the {{< product lc >}}'s data containers and how to reference data in these containers, see [{{< product lc >}} Data Containers](data-ingestion-and-preparation/README.ipynb#{{< product lc >}}-data-containers).

<a id="support"></a>
### Support

The Iguazio [support team](mailto:support@iguazio.com) will be happy to assist with any questions.
