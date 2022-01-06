---
title: "Data Science Automation (MLOps) Services"
description: "The Iguazio MLOps Platform's data science and MLOps automation services (MLRun and Kubeflow Pipelines)."
keywords: "data science automation services, data science automation, data science services, data science, mlops automation services, mlops automation, mlops services, mlops, machine-learning automation services, machine-learning automation, machine-learning services, machine learning, ML automation services, ML automation, ML services, ML, mlops services, ML services, machine learning, ML, tracking services, machine-learning tracking, ML tracking, tracking, mlrun, kubeflow pipelines, kfp, kubeflopw, data science pipelines, pipelines, data science workflows, workflows, jupyter, jupyter notebook, open source"
menu:
  main:
    name:       "MLOps: MLRun and Kubeflow Pipelines"
    parent:     "app-services"
    identifier: "mlops-services"
    weight:     26
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#data-science-automation. -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (3.11.19) In v2.5.0 I added section
  "Data Science Automation and Tracking" (#data-science-automation) to the
  app-services overview doc. The section title was suggested by Yaron H. See
  info in DOC IG-11986. [SITE-RESTRUCT] (10.2.21) As part of the ghpages-doc-site
  restructure, I also split the app-services overview to separate pages and
  changed the title of the new page in light of recent changes to the MLRun
  documentation. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} has pre-deployed services for data science and machine-learning operations (MLOps) automation and tracking:

- [MLRun](#mlrun)
- [Kubeflow Pipelines](#kfp)

<!-- //////////////////////////////////////// -->
## MLRun {#mlrun}
{{< comment >}}<!-- [TODO-SITE-RESTRUCT-P2] [c-mlrun] [IntInfo] (sharonl)
  (7.3.21) TODO: Update this section. Sync with newer updates to the MLRun
  README and documentation in mlrun/mlrun, and also consider removing some of
  the documentation in light of the fact that the MLRun documentation is now
  embedded in the product documentation and linked to from this section.
  Also, remember that is is a services section, which should focus on the MLRun
  service and not the client API. -->
{{< /comment >}}

{{< public-gh ghid="mlrun_mlrun" link="1" k="text" >}} is {{< company >}}'s open-source MLOps orchestration framework, which offers an integrative approach to managing machine-learning pipelines from early development through model development to full pipeline deployment in production.
MLRun offers a convenient abstraction layer to a wide variety of technology stacks while empowering data engineers and data scientists to define the feature and models.
MLRun also integrates seamlessly with other {{< product lc >}} services, such as [Kubeflow Pipelines](#kfp), {{< xref f="services/app-services/nuclio.md" text="Nuclio" >}}, and {{< xref f="services/app-services/frames.md" textvar="product.frames.name.long_lc" >}}.

The MLRun server is provided as a default (pre-deployed) shared single-instance tenant-wide {{< product lc >}} service (`{{< verkey k="mlrun.service_display_name" >}}`), including a graphical user interface (**"the MLRun dashboard"** or **"the MLRun UI"**), which is integrated as part of the <gui-title>Projects</gui-title> area of the {{< productUI short_lc >}}.

The MLRun client API is available via the MLRun Python package (`mlrun`), including a command-line interface (`mlrun`).
You can easily install and update this package from the Jupyter Notebook service by using the <path>{{< verkey k="mlrun.align_script.path" >}}</path> script, which is available in your running-user directory after you create a Jupyter Notebook {{< product lc >}} service.
For more information, see {{< xref f="intro/introduction.md" a="mlrun-python-pkg-install-n-update" text="Installing and Updating the MLRun Python Package" >}} in the {{< product lc >}} introduction.

The MLRun library features a generic and simplified mechanism for helping data scientists and developers describe and run scalable ML and other data science tasks in various runtime environments while automatically tracking and recording execution code, metadata, inputs, and outputs.
The capability to track and view current and historical ML experiments along with the metadata that is associated with each experiment is critical for comparing different runs, and eventually helps to determine the best model and configuration for production deployment.

MLRun is runtime and platform independent, providing a flexible and portable development experience.
It allows you to develop functions for any data science task from your preferred environment, such as a local IDE or a web notebook; execute and track the execution from the code or using the MLRun CLI; and then integrate your functions into an automated workflow pipeline (such as Kubeflow Pipelines) and execute and track the same code on a larger cluster with scale-out containers or functions.

For detailed MLRun information and examples, including an API reference, see the {{< url v="mlrun_docs" k="text" link="1" >}}, which is available also in the {{< xref f="ds-and-mlops/" >}} section of the {{< product lc >}} documentation.
See also the MLRun restrictions in the {{< product lc >}}'s {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="mlrun" >}}.

You can find full MLRun end-to-end use-case demo applications as well as a getting-started and how-to tutorials in the {{< public-gh ghid="mlrun_demos" path="/" text="MLRun-demos repository" link="1" >}} repository.
These demos and tutorials are pre-deployed in each user's <path>{{< getvar v="product.users_container.user_dir.fs_mount_path" >}}/{{< verkey k="jupyter_notebook.tutorials.demos.dir_name" >}}</path> directory for the first Jupyter Notebook service created for the user.
You can also find a pre-deployed <path>{{< verkey k="jupyter_notebook.tutorials.demos.update_script.path" >}}</path> script for updating the demo files.
For details, see {{< xref f="intro/introduction.md" a="demos" text="End-to-End Use-Case Applications and How-To Demos" >}} in the {{< product lc >}} introduction.
In addition, check out the {{< public-gh ghid="mlrun_functions" k="text" link="1" >}} &mdash; a centralized location for open-source contributions of function components that are commonly used in machine-learning development.

<!-- //////////////////////////////////////// -->
## Kubeflow Pipelines {#kfp}
{{< comment >}}<!-- [c-kubeflow-pipelines-framework-term] I decided to replace
  the "platform" terminology used in some of the Kubeflow Pipelines doc with
  "framework" to avoid confusion with our platform and after I found other
  references to Kubeflow Pipelines as a framework; our UI tooltip for the
  pipelines service (which I didn't write) uses this terminology as well. -->
{{< /comment >}}

{{< url v="kubeflow_pipelines_home" k="text_long" link="1" >}} is an open-source framework for building and deploying portable, scalable ML workflows based on Docker containers.
For detailed information, see the {{< url v="kubeflow_pipelines_docs" k="text" link="1" >}}.

Kubeflow Pipelines is provided as a default (pre-deployed) shared single-instance tenant-wide {{< product lc >}} service (`{{< verkey k="pipelines.service_display_name" >}}`), which can be used to create and run ML pipeline experiments.
The pipeline artifacts are stored in a <dirname>pipelines</dirname> directory in the "{{< getvar v="product.users_container.name" >}}" data container and pipeline metadata is stored in a <dirname>mlpipeline</dirname> directory in the same container.
The pipelines dashboard can be accessed by selecting the <gui-label>Pipelines</gui-label> option in the {{< productUI short_lc >}}'s navigation side menu.
(This option is available to users with a Service Admin, Application Admin, or Application Read Only management policy.)
{{< comment >}}<!-- [IntInfo] (sharonl) (23.10.19) Oded said that the artifacts
  and metadata distinction is dictated by Kubeflow.
  [InfraInfo] As I don't currently expect to mention these directories
  elsewhere in the documentation, I decided not to add related data variables.
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="ds-and-mlops/" >}}
- {{< xref f="intro/introduction.md" >}}
- {{< xref f="services/app-services/nuclio.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="mlrun" text="MLRun software specifications and restrictions" >}}

