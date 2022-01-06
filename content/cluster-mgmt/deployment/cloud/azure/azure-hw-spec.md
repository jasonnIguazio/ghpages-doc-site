---
title:      "Azure Cloud Deployment Specifications"
linktitle:  "Azure Deployment Specifications"
description: "Hardware specifications for deploying the Iguazio MLOps Platform on an Azure cloud"
keywords: "azure cloud deployment specifications, azure deployment specifications, azure deployment specs, azure hardware specifications, azure hardware specs, azure specifications, azure specs, deployment specifications, deployment specs, hardware specifications, hardware specs, hardware configuration, hardware, specification, spec"
menu:
  main:
    name:  "Deployment Specifications"
    parent:     "deployment-cloud-azure"
    identifier: "azure-cloud-hardware-specs"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces 
  specs/hardware/cloud-hw-spec.md#azure_specs. -->
{{< /comment >}}
{{< comment >}}<!-- [InfInfo] (sharonl)
- [IMPORTANT] (18.6.20) Similar spec info is found also in the Azure cloud
  installation docs in this section, and especially in resources-calculate.md
  (under and azure/howto/). Any updates should currently be done in both
  locations.
- (3.2.20) In consultation with Adi, Orit, and Maor it was decided to list the
  configuration details for the data nodes, as we only support one instance
  type for each cloud vendor. However, for the application nodes, for which we
  support multiple instance types, it was decided to refer to the cloud-vendor
  documentation for details.
-->
<!-- [InfInfo] Microsoft references -
- Azure doc | Virtual Machines ("Virtual Machines Documentation")
  - Linux ("Linux virtual machines in Azure"): Concepts | VM types and sizes |
    VM sizes ("Sizes for Linux virtual machines in Azure")
    (https://docs.microsoft.com/en-us/azure/virtual-machines/linux/sizes) /
    Windows ("Windows virtual machines in Azure"): Concepts | VM types and sizes
    | VM sizes ("Sizes for Windows virtual machines in Azure")
    (https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes).
    NOTE: Some of the menu entries in the OS-specific docs link to the same
    non-OS-specific Azure | Virtual Machines doc. See examples in the specific
    reference info for the Azure data- and app-node spec sections.
- "Linux Virtual Machines Pricing"
  (https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) &
  "Windows Virtual Machines Pricing"
  (https://azure.microsoft.com/en-us/pricing/details/virtual-machines/windows/)
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This document lists the hardware specifications for deployment of version {{< productVersion num >}} of the {{< product full >}} ("the {{< product lc >}}") on the {{< url v="azure_home" k="text" link="1" >}} cloud; for details, refer to the [Azure documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/sizes-general).

{{< note id="capacity-calculation-note" >}}
{{< text-hw-spec-capacity-calc-note >}}
{{< /note >}}

{{< warning id="deployment-warnings" >}}
- {{< text-deploy-cloud-provision-note >}}
- {{< text-deploy-cloud-data-node-shutdown >}}
{{< /warning >}}

<!-- ---------------------------------------- -->
### Hardware Configurations {#hw-cfgs}

{{% include f="hw-cfgs.md" %}}

{{< note id="azure-specs-elastic-ip-note" >}}
Azure {{< product lc >}} deployments also require a static public IP address.
For more information, see the [Azure documentation](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-public-ip-address).
{{< /note >}}

<!-- ---------------------------------------- -->
## Azure Data-Node Specifications {#azure-data-node-specs}
{{< comment >}}<!-- [IntInfo] See info for #azure-specs + these data-node refs:
- Azure doc | Virtual Machines ("Virtual Machines Documentation"):
  VM types and sizes | Storage optimized |
  - Overview ("Storage optimized virtual machine sizes")
    (https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-storage)
  - "Lsv2-series"
    (https://docs.microsoft.com/en-us/azure/virtual-machines/lsv2-series)
  NOTE: The Linux and Windows Azure-VM docs have similar menu entries that link
  to the same non-OS-specific VM general-purpose doc (same URLs). -->
{{< /comment >}}

Data nodes in {{< product lc >}} Azure cloud deployments must fulfill the following hardware specification requirements:

<table style="width:70%">
<tr text-align="left">
  <th style="font-weight:bold;">
    Component
  </th>
  <th style="font-weight:bold; vertical-align:'top';">
    Specification
  </th>
</tr>
<tr id="azure-data-node-instance-type">
  {{< td >}}Instance type{{< /td >}}
  {{< td >}}Standard_L16s_v2{{< /td >}}
</tr>
<tr id="azure-data-node-vcpu">
  {{< td >}}vCPUs{{< /td >}}
  {{< td >}}16{{< /td >}}
</tr>
<tr id="azure-data-node-memory">
  {{< td >}}Memory{{< /td >}}
  {{< td >}}128 GB{{< /td >}}
</tr>
<tr id="azure-data-node-data-disk">
  {{< td >}}Data disks (local storage){{< /td >}}
  {{< td >}}2 x 1.9 TB NVMe SSD{{< /td >}}
</tr>
<tr id="azure-data-node-os-boot-disk">
  {{< td >}}OS boot disk (Azure managed disk){{< /td >}}
  {{< td >}}Premium SSD; 400 GB (minimum){{< /td >}}
</tr>
<tr id="azure-data-node-usable-storage-capacity">
  {{< td >}}Usable storage capacity{{< /td >}}
  {{< td >}}1 node (Development Cluster) &mdash; 2.5 TB;<br/>
    3 nodes (Operational Cluster) &mdash; 4 TB
  {{< /td >}}
</tr>
</table>

<!-- ---------------------------------------- -->
## Azure Application-Node Specifications {#azure-app-node-specs}
{{< comment >}}<!-- [IntInfo] See info for #azure-specs + these app-node refs:
- Azure doc | Virtual Machines ("Virtual Machines Documentation"):
  Instances | Sizes |
  - Overview ("Sizes for virtual machines in Azure"]
  - General purpose |
    - Overview ("General purpose virtual machine sizes")
      (https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-general).
    - "Dv3 and Dsv3-series"
      (https://docs.microsoft.com/en-us/azure/virtual-machines/dv3-dsv3-series)
      - "Dsv3-series"
        (https://docs.microsoft.com/en-us/azure/virtual-machines/dv3-dsv3-series#dsv3-series)
  - GPU - accelerated compute |
    - Overview ("GPU optimized virtual machine sizes)
      (https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-gpu)
    - NCv3-series
      (https://docs.microsoft.com/en-us/azure/virtual-machines/ncv3-series)
  NOTE: The Linux and Windows Azure-VM docs have similar menu entries that link
  to the same non-OS-specific VM general-purpose doc (same URLs).

  [c-gpu-cloud-azure-no-support] (18.6.20) Orit said that the currently
  supported Azure application-node instance type - Standard_L16s_v2 - supports
  CPU only, and that we don't currently support GPU for Azure. (We don't
  explicitly say this in the docs, but it can be implied from the supported
  instance types).
-->
{{< /comment >}}

Application nodes in {{< product lc >}} Azure cloud deployments must use one of the following instance types; choose the type that best fits your requirements. Azure Kubernetes Service (AKS) is also supported for application nodes, using the instance types listed below. 
For specification details for each type, refer to the Azure documentation.

{{< note id="azure-app-node-specs-os-boot-disk-note" >}}
All of the supported application-node configurations also require a 250 GB (minimum) premium-SSD OS boot disk (Azure managed disk).
{{< /note >}}

- Standard_D16s_v3 (default configuration)
- Standard_D32s_v3
- Standard_D48s_v3
- Standard_D64s_v3
- NCv3-series (GPU optimized)
    {{< comment >}}<!-- [InfInfo] (sharonl) (2.3.21) Adi and Orit confirmed
      that we support all NCv3-series VM sizes (see Req 16059 / DOC IG-17662).
      These are the current sizes in this family:
      - Standard_NC6s_v3
      - Standard_NC12s_v3
      - Standard_NC24s_v3
      - Standard_NC24rs_v3
    -->
    {{< /comment >}}

<!-- ---------------------------------------- -->
## Azure Backup-Node Specifications (Optional) {#azure-backup-node-specs}

If you wish to back up your instance of the {{< product lc >}}, you need an additional backup-node instance of type Standard_D16s_v3.

{{< note id="azure-backup-notes" >}}
- {{< text-backup-recom >}}
- The backup node is used only for backups and can be shut down between backups to save costs.
- The backup node must have at least 2 TB of network-attached storage (NAS) to be used only for backup purposes. {{% include f="hw-spec-min-storage-data-dependency.md" %}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/azure/installationGuides/azure-installation-guide.md" >}}
- {{< xref f="intro/high-availability.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}}
- {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}}

{{< condition filter="scalability" filterval="true" >}}
- {{< xref filter="scalability" filterval="true" f="intro/scalability.md" >}}
{{< /condition >}}

