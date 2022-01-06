---
title:  "Platform Services"
description: "Learn about the services of the Iguazio MLOps Platform and how to use them."
keywords: "platform services, services, application services"
layout: "section-list"
menu:
  main:
    identifier: "services"
    weight:     40
---
{{< comment >}}<!-- [ci-no-shcd-in-front-matter] -->
{{< /comment >}}

In addition to its core data services, the {{< product lc >}} comes pre-deployed with essential and useful proprietary and third-party open-source tools and libraries that facilitate the implementation of a full data science workflow, from data collection to production (see {{< xref s="intro" f="introduction.md" >}}). 
Both built-in and integrated tools are exposed to the user as application services that are managed by the {{< product lc >}} using {{< url v="kubernetes_home" k="text" link="1" >}}. Each application is packaged as a logical unit within a Docker container and is fully orchestrated by Kubernetes, which automates the deployment, scaling, and management of each containerized application. This provides users with the ability and flexibility to run any application anywhere, as part of their operational pipeline.

The application services can be viewed and managed from the {{< productUI lc >}} <gui-title>Services</gui-title> using a self-service model. This approach enables users to quickly get started with their development and focus on the business logic without having to spend precious time on deploying, configuring, and managing multiple tools and services. In addition, users can independently install additional software&mdash;such as real-time data analytics and visualization tools&mdash;and run them on top of the {{< product lc >}} services.

