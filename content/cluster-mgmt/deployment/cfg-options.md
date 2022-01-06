---
title: "Hardware-Configuration and Deployment Options"
description: "Learn about the different hardware-configuration and deployment options for the Iguazio MLOps Platform."
keywords: "hardware configuration, deployment options, hardware specifications, hardware specs, specification, spec, development kit, operational cluster, cloud, on-premises, on-prem, bare metal, hybrid cloud, edge cloud, virtual machines, vms"
menu:
  main:
    parent:     "deployment-n-specs"
    identifier: "hardware-specs-overview"
    weight:     30
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces specs/hardware/overview.md. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product full >}} ("the {{< product lc >}}") provides enterprises with the flexibility to run applications on-premises ("on-prem") or in an edge or hybrid cloud architecture.
The {{< product lc >}} was built from the ground up to maximize CPU utilization and leverage the benefits of non-volatile memory, 100 GbE remote direct memory access (RDMA), flash memory, and dense storage.
This design enables the {{< product lc >}} to achieve extreme performance while maintaining data consistency, at the lowest cost.

<!-- //////////////////////////////////////// -->
## Hardware Configurations {#hw-cfgs}

{{% include f="hw-cfgs.md" %}}

<!-- //////////////////////////////////////// -->
## Deployment Methods {#deployment-methods}

The {{< product lc >}} supports the following alternative deployment methods:

<dl>
<dt id="cloud-deployment">Cloud</dt>
{{< dd >}}Deployment on an {{< url v="aws_home" k="text" >}} or {{< url v="azure_home" k="text" >}} cloud &mdash; either as part of your virtual private cloud (VPC) or virtual network (VNet) or as a software as a service (SaaS) in {{< company >}}'s cloud account.
  See {{< xref f="cluster-mgmt/deployment/cloud/aws/" >}} and {{< xref f="cluster-mgmt/deployment/cloud/azure/" >}}.
{{< /dd >}}

<dt id="on-prem-deployment">On-Prem</dt>
{{< dd >}}On-premises deployment.
  The data nodes are deployed on virtual machines (VMs), and the application nodes can optionally be deployed either on VMs or on physical machines (bare-metal).
  See {{< xref f="cluster-mgmt/deployment/on-prem/" >}}.
{{< /dd >}}
</dl>

<!-- //////////////////////////////////////// -->
## Notes {#notes}

- {{< text-hw-spec-capacity-calc-note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/azure/" >}}
- {{< xref f="cluster-mgmt/deployment/on-prem/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}}
- {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}}
- {{< xref f="intro/high-availability.md" >}}

{{< condition filter="scalability" filterval="true" >}}
- {{< xref filter="scalability" filterval="true" f="intro/scalability.md" >}}
{{< /condition >}}

