---
title:      "The Nuclio Serverless-Functions Service"
linktitle:  "Nuclio Serverless Functions"
description: "Learn about the Nuclio serverless-functions service of the Iguazio MLOps Platform."
keywords: "nuclio, serverless functions, serverless, jupyter, jupyter notebook, docker registry, docker, open source"
menu:
  main:
    name:       "Nuclio Serverless Functions"
    parent:     "app-services"
    identifier: "nuclio-service"
    weight:     90
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces intro/serverless.md and
  intro/ecosystem/app-services.md#nuclio. -->
{{< /comment >}}


<!-- //////////////////////////////////////// -->
## Overview {#overview}

{{< company >}}'s Nuclio Enterprise Edition serverless-functions framework &mdash; a leading open-source project for converging and simplifying data management &mdash; is integrated into the {{< product lc >}}.
Nuclio is a high-performance low-latency framework that supports execution over CPUs or GPUs and a wide array of tools and event triggers, providing users with a complete cloud experience of data services, ML, AI, and serverless functionality &mdash; all delivered in a single integrated and self-managed offering at the edge, on-premises ("on-prem"), or in a hosted cloud.

You can use Nuclio functions, for example, to

- Collect and ingest data into the {{< product lc >}} and consume (query) the data on an ongoing basis.
    Nuclio offers built-in function templates for collecting data from common sources, such as Apache Kafka streams or databases, including examples of data enrichment and data-pipeline processing.

- Run machine-learning models in the serving layer, supporting high throughput on demand and elastic resource allocation.

Nuclio can be easily integrated with {{< xref f="services/app-services/jupyter.md" text="Jupyter Notebook" >}}, enabling users to develop their entire code (model, feature vector, and application) in Jupyter Notebook and use a single command to deploy the code as a serverless function that runs in the serving layer.
For examples, see the {{< product lc >}}'s {{< public-gh ghid="tutorials" link="1" path="/" k="text_jupyter_long" >}}. 

Nuclio is provided as a default (pre-deployed) shared single-instance tenant-wide {{< product lc >}} service (`{{< verkey k="nuclio.service_display_name" >}}`).
Users can disable, enable, and restart this service, as well as configure the Docker Registry for storing the Nuclio function images.
See also the Nuclio restrictions in the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="nuclio" >}} documentation.

<!-- //////////////////////////////////////// -->
## Configuring the Docker Registry for the Nuclio Service {#nuclio-docker-registry-cfg}

By default, the Nuclio service on the default tenant is configured to work with a predefined default tenant-wide Docker Registry service (`{{< verkey k="docker_registry.service_display_name" >}}`), which uses a pre-deployed local on-cluster {{< url v="docker_doc_docker_registry" k="text" link="1" >}}.
However, you can create your own Docker Registry service for working with a remote off-cluster Docker Registry, and change the configuration of the Nuclio service to work with your Docker Registry service and use your registry to store the Nuclio function images.
{{< comment >}}
<!-- [FUTURE-MULTI-TENANTS] [c-default-docker-registry-service] TODO: When we
  release a k8s version with multi-tenancy support, edit the doc: the default
  Docker Registry service for the local on-cluster Docker Registry exists only
  on the default tenant. When creating a new tenant, the Nuclio service is
  disabled for this tenant until the user creates a Docker Registry service
  that's configured to work with a remote off-cluster Docker Registry and then
  configures the Nuclio service to work with that Docker Registry service and
  enables the Nuclio services. See DOC IG-9660. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Configuring the Node Selector {#nuclio-node-selector-cfg}

The pods of a Nuclio function can only run on nodes whose labels match the node selector entries configured for the specific function. You can configure the key-value node selector pairs in the <gui-label>Custom Parameters</gui-label> tab of the service. If there is no specified node selector, it defaults to the Kubernetes default behavior, and runs on a random node.

<!-- //////////////////////////////////////// -->
## Introduction to Nuclio and Serverless Functions {#nuclio-infro}

In recent years, the concept of serverless development has been rapidly gaining traction.
Serverless solutions accelerate and facilitate the development process by eliminating tedious server orchestration tasks and allowing developers to concentrate their efforts on the development logic.
Developers can embed flexible computation within their data flow without worrying about the server infrastructure provisioning and DevOps considerations.

To provide users of the {{< product full >}} ("the {{< product lc >}}") with a serverless solution on top of the {{< product lc >}}, {{< company >}} developed {{< url v="nuclio_home" k="text" link="1" >}} &mdash; a standalone open-source self-service application-development environment.
The Nuclio Enterprise edition is integrated into the {{< product lc >}} as part of the default installation.
Nuclio allows developers to build and run auto-scaling applications, in their preferred programming language, without worrying about managing servers.
Nuclio is currently the fastest serverless framework in the market.
It allows running functions over CPUs or GPUs; supports a large variety of event sources (triggers); can be deployed in the cloud or on-premises ("on-prem"); and provides many other significant advantages.
Combining the {{< product lc >}} with Nuclio provides users with a complete cloud experience of data services, machine learning (ML) and artificial intelligence (AI), and serverless functionality &mdash; all delivered in a single integrated and self-managed offering at the edge, on-prem, or in a hosted cloud.

Nuclio comes with powerful UI ({{< getvar v="product.nuclio_ui.lc" >}}) and CLI (<file>{{< getvar v="product.nuclio_cli.name" >}}</file>) applications and is simple to install and use.
When using Nuclio from the {{< product lc >}}, its {{< getvar v="product.nuclio_ui.lc" >}} is available in the <gui-title>Projects</gui-title> area of the {{< productUI short_lc >}}.
See specifically the <gui-title>Functions</gui-title> project page.
In the <gui-label>Quick Links</gui-label> section of the project-overview sidebar, you can find <gui-label>Real-time functions (Nuclio)</gui-label> and <gui-label>API gateways (Nuclio)</gui-label> links to the <gui-title>Functions</gui-title> page's <gui-title>Functions</gui-title> and <gui-title>API Gateways</gui-title> tabs.

Note that viewing, managing, and developing Nuclio functions is supported only for users with the {{< xref f="users-and-security/security.md" a="mgmt-policy-data" text="Function Admin" >}} management policy.

For detailed information about Nuclio, including comprehensive documentation, visit the Nuclio [website]({{< url v="nuclio_home" k="full" >}}) and [GitHub repository]({{< public-gh ghid="nuclio_nuclio" path="/" >}}).
For information about creating and deploying Python Nuclio functions from Jupyter Notebook, see the {{< public-gh ghid="nuclio_jupyter" k="text_long" >}} &mdash; {{< public-gh ghid="nuclio_jupyter" path="/" k="repo_name" link="1" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="ds-and-mlops/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="nuclio" text="Nuclio software specifications and restrictions" >}}

