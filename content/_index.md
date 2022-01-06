---
title: "Iguazio MLOps Platform Documentation"
linktitle:  "Documentation Home"
keywords: "Iguazio data science platform, data science platform documentation, data science platform, data science, analytics platform, coninuous platform, getting started, development resources"
menu:
  main:
    identifier: "docs-home"
    weight:     10
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title should
  use {{< product full >}}. -->
{{< /comment >}}

<!-- Main Doc Tiles -->
{{< doc-tiles-container type="main" >}}
    <!-- Introduction -->
    {{< doc-tile type="main" class="intro"
        title="Introduction">}}
        Get a high-level overview of the {{< product lc >}} and its core vision and capabilities, and find links to more in-depth information.
    {{< /doc-tile >}}
    <!-- Data Science and MLOps -->
    {{< doc-tile type="main" class="ds-and-mlops"
        title="Data Science and MLOps Service">}}
        Manage your machine-learning pipelines from early development through to your production environment.
    {{< /doc-tile >}}
    <!-- Getting-Started Tutorial -->
    {{< doc-tile type="main" class="getting-started-tutorial"
        title="Getting-Started Tutorial">}}
        Get a hands-on introduction to the {{< product lc >}} by following the getting-started tutorial.
    {{< /doc-tile >}}
{{< /doc-tiles-container >}}

<!-- Secondary Doc Tiles ("Sub Tiles") -->
{{< doc-tiles-container type="sub" >}}
    <!-- Data Layer -->
    {{< doc-tile type="sub" class="data-layer"
        title="Data Layer">}}
        Learn how to ingest and manipulate data using a variety of APIs and frameworks.
    {{< /doc-tile >}}
    <!-- Services -->
    {{< doc-tile type="sub" class="services" icon-class="igz-icon-services1"
        title="Application Services">}}
        Learn about the application services that are integrated into the {{< product lc >}} and how to manage them.
    {{< /doc-tile >}}
    <!-- Cluster Management -->
    {{< doc-tile type="sub" class="cluster-mgmt" icon-class="igz-icon-clusters"
        title="Cluster Management">}}
        Learn how to deploy and manage your {{< product lc >}} clusters, including logging and monitoring of {{< product lc >}} events.
    {{< /doc-tile >}}
    {{< condition filter="faq" filterval="true" >}}
    {{< comment >}}<!-- [c-faq] [IntInfo] (sharonl) (8.2.21) The support/
      section is filtered out until we add FAQs ([PENDING-CS] - DOC IG-14359),
      so we currently filter out the link to this section. See more info and
      action items in the support/_index.md page. -->
    {{< /comment >}}
    <!-- FAQs and Best Practices ("Support") -->
    {{< doc-tile type="sub" class="support"
        title="FAQ and Best Practices">}}
        Read frequently asked questions and best practices for working with the {{< product lc >}}.
    {{< /doc-tile >}}
    {{< /condition >}}
    {{< comment >}}<!-- [IntInfo] (sharonl) (6.4.21) It was decided not to
      include a release-notes link on the home page. -->
    <!-- Release Notes -->
    {{< doc-tile type="sub" class="release-notes"
        title="Release Notes">}}
        Review the {{< product lc >}}'s release notes.
    {{< /doc-tile >}}
    {{< /comment >}}
{{< /doc-tiles-container >}}

