---
title: "Calculating Required Infrastructure Resources (Azure)"
description: "Learn how to calculate the required resources for an Azure cloud installation of the Iguazio MLOps Platform."
keywords: "calaculating azure infrastructure reesources, azure infrastructure resources calculation, subnet"
layout: "section-list"
menu:
  main:
    name:       "Calculating Required Infrastructure Resources"
    parent:     "deployment-cloud-azure-howtos"
    identifier: "deployment-cloud-azure-howtos-resources-calculate"
    weight:     20
---

<!-- //////////////////////////////////////// -->
## Allocated Infrastructure Resources {#allocated-resources}

When the {{< product lc >}} is installed, it creates the following resources.
Take this into account when selecting your installation configuration.
{{< comment >}}<!-- [c-hw-spec-cloud-supported-instance-types] [IntInfo]
  (sharonl) (18.6.20) Orit explained that for the data nodes we need to certify
  each supported instance type/size, while for the app nodes we can say "XXX
  and larger" and we don't need to test larger instances. -->
{{< /comment >}}

<table style="width:100%">
<tr text-align="left">
  <th style="vertical-align:'top'; font-weight:bold;">Type</th>
  <th style="vertical-align:'top'; font-weight:bold;">Amount</th>
  <th style="vertical-align:'top'; font-weight:bold;">When</th>
  <th style="vertical-align:'top'; font-weight:bold;">Notes</th>
</tr>
<tr id="data-node">
  {{< td >}}Data node{{< /td >}}
  {{< td >}}1 or 3{{< /td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}Azure instance type (VM size) Standard_L16s_v2.
    <br/>
    High-availability (HA) requires three nodes.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}Data-cluster application security group{{< /td >}}
  {{< td >}}1 per data cluster{{< / td >}}
  {{< td >}}Always{{< /td >}}
  <td/>
</tr>
<tr id="app-node">
  {{< td >}}Application node{{< /td >}}
  {{< td >}}1 or more{{< / td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}Azure instance type (VM size) Standard_D16s_v3 or larger or NCv3-series (GPU optimized).
    <br/>
    High-availability (HA) requires at least three nodes.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}Application-cluster application security group{{< /td >}}
  {{< td >}}1 per application cluster{{< / td >}}
  {{< td >}}Always{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}Network interface{{< /td >}}
  {{< td >}}1 per node{{< / td >}}
  {{< td >}}Always{{< /td >}}
  <td/>
</tr>
<tr id="os-boot-disk">
  {{< td >}}OS boot disk (Azure managed disk){{< /td >}}
  {{< td >}}1 per node{{< / td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}Premium SSD.
    At least 400 GB for each data node and 250 GB for each application node.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}Public IP address{{< /td >}}
  {{< td >}}1 per node{{< / td >}}
  {{< td >}}The {{< product lc >}} has public IP addresses.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}VNet{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VNet.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}Network security group{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}See {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/network-security-groups-cfg.md" >}}.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}Installer node with a disk, NIC, and application security group{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}A Standard_D8s_v3 Azure VM installer node with additional resources that are used only for the {{< product lc >}} installation and can be deleted after the installation completes.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}AKS Cluster{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}When AKS is used as the application cluster{{< /td >}}
  {{< td >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/azure/installationGuides/azure-installation-guide.md" text="Azure cloud installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/azure/azure-hw-spec.md" >}}

