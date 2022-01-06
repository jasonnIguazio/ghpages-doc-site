---
title: "Working with Services"
description:  "Learn how to work with application services in the Iguazio MLOps Platform and how to create new services."
keywords: "working with services, working with application services, application services, services, creating services, service create, service fundamentals, fundamentals, dashboard, ui"
menu:
  main:
    parent:     "services"
    identifier: "services-fundamentals"
    weight:     20
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  tutorials/getting-started/fundamentals.md#app-services. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The <gui-title>Services</gui-title> page of the {{< productUI short_lc >}} displays information about running application services &mdash; which include both default services that are created as part of the {{< product lc >}}'s deployment (such as the web-APIs or Presto services) and user-defined services (such as Spark or Jupyter Notebook).
A service administrator can create, delete, enable, disable, restart, and configure application services, and view service logs.
A user-defined service is typically assigned to a specific running user and can also optionally be shared with all other users in the same tenant.
Except for service administrators, who can view all services, users can see and use only the services that they're running and the shared services (including the default services).
For more information about the {{< product lc >}}'s application services, see {{< xref f="services/app-services/" >}}.
For information about the required permissions for viewing, running, and managing application services in the {{< product lc >}}, see {{< xref f="users-and-security/security.md" a="ui-services-page-mgmt-policy-perm-note" >}}.

{{< note id="services-notes" >}}
- <a id="nested-service-exec-parent-service-running-user-permis"></a> When running an application service from another service, the service is executed using the permissions of the running user of the parent service.
  For example, if user "c" logs into a shared web-shell service for running user "a", which is configured to work with a Spark service for running user "b", and runs Spark from the web shell&mdash;Spark is executed with the permissions of user "a" (the running user of the parent web-shell service), and _not_ as user "c" (the running user of the  Spark service) or user "b" (the logged-in user of the shell service).
  {{< comment >}}<!-- [IntInfo] (sharonl) See DOC IG-10843.  -->
  {{< /comment >}}
- <a id="services-restrictions-note"></a>Check the product {{< xref f="cluster-mgmt/deployment/sw-specifications.md" text="software specifications and restrictions" >}} and {{< xref s="release-notes" f="CURRENTVER" text="release notes" >}} for additional restrictions and known issues related to application services.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## DNS-Configuration Prerequisite {#app-services-dns-cfg-note}

As a prerequisite to using the {{< product lc >}}'s application services, you need to configure conditional forwarding for your cluster's DNS server.
For more information and step-by-step instructions, see {{< xref f="cluster-mgmt/deployment/post-deployment-howtos/dns.md" >}}.

<!-- //////////////////////////////////////// -->
## Creating a New Service {#create-new-service}

Follow these steps to create a new application service from the {{< productUI lc >}}. You must have the {{< xref f="users-and-security/security.md" a="mgmt-policy-service-admin" text="Service Admin" >}} management policy to create a service:

1.  <a id="new-service-step-services-page"></a>In the side navigation menu, select <gui-label>Services</gui-label>.

2.  <a id="new-service-step-new-service"></a> On the <gui-title>Services</gui-title> page, select the <gui-label>New Service</gui-label> option from the top action toolbar.

3.  <a id="new-service-step-cfg-params"></a>Select the desired service type, configure the required parameters, and optionally configure additional parameters.
    You can also select to share the service with all users of the parent tenant.
    {{< note id="service-cfg-notes" >}}
- <a id="service-resources-cfg-note"></a>**Common parameters tab**&mdash;You can configure the memory and CPU resources for the service from the <gui-label>Resources</gui-label> section of the <gui-title>Common Parameters</gui-title> {{< productUI lc >}} tab.
    For empty parameter fields, the {{< product lc >}} uses the default system values.
    The {{< product lc >}} doesn't perform logical validation of your configuration.
    It's up to you to balance the resource needs of your application services, taking into account the available resources of your {{< product lc >}} environment.
    When setting the resource limits, consider that an insufficient limit might result in the termination of the service.
    If you're using the {{< cloud-trial "name.short_lc" >}}, remember that your environment has limited resources (see the {{< cloud-trial "name.lc" >}} {{< xref f="intro/trial-qs.md" a="overview" text="evaluation overview" >}}).
	For some services, you must define the running user.

- <a id="custom-parameters-cfg-note"></a>**Custom parameters tab:**&mdash;Individual services may have additional custom parameters. For example, you can configure the number of replicas (workers) for the Spark and Presto services. The customizable parameters are described in each service topic.

- <a id="service-dependencies-cfg-note"></a>**Dependent services**&mdash;Some services allow you to configure related services to be used by the new service, from among the services that are accessible to the selected running user.
    For example, you can configure a Spark service to be used for running Spark jobs from a web-based shell, or Jupyter Notebook.
    (The web-shell services and Jupyter Notebook use an internal Spark service by default.)
    
- <a id="service-cfg-changes-note"></a>**Configuration changes**&mdash;You can change the service's configuration at a later stage, after its initial deployment.
    {{< /note >}}

4.  <a id="new-service-step-create-more-services"></a>Optionally repeat the previous steps to create as many services as you wish.

5.  <a id="new-service-step-apply-changes"></a>When you're done defining services, remember to select <gui-label>Apply Changes</gui-label> from the top action toolbar, and wait for confirmation of a successful deployment.
    The deployment might take a while to complete, depending on the number and type of services that you create.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/app-services/" >}}
- {{< xref f="intro/ui.md" >}}
- {{< xref f="users-and-security/security.md" >}}
    - {{< xref f="users-and-security/security.md" a="ui-services-page-mgmt-policy-perm-note" text="Services Management Policies" >}}
    - {{< xref f="users-and-security/security.md" a="mgmt-policy-service-admin" text="The Service Admin management policy" >}}
- {{< xref f="services/monitoring-services.md" >}}
- {{< xref f="data-layer/" >}}&mdash;learn how to use the application services to access and work with data in the {{< product lc >}}
- {{< xref f="intro/introduction.md" >}}
