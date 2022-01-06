---
title: "Calculating Required Infrastructure Resources (GCP)"
description: "Learn how to calculate the required resources for an GCP cloud installation of the Iguazio MLOps Platform."
keywords: "calaculating gcp infrastructure resources, gcp infrastructure resources calculation, subnet"
layout: "section-list"
menu:
  main:
    name:       "Calculating Required Infrastructure Resources"
    parent:     "deployment-cloud-gcp-howtos"
    identifier: "deployment-cloud-gcp-howtos-resources-calculate"
    weight:     10
---

<!-- //////////////////////////////////////// -->
## Allocated Infrastructure Resources {#allocated-resources}

When the {{< product lc >}} is installed, it creates the following resources.
Take this into account when selecting your installation configuration.

You also need to consider the [GCP quotas](https://cloud.google.com/compute/quotas) (known as limits) for your GCP account.

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
  {{< td >}}Instance type n2-highmem-16.<br/>
    High-availability (HA) requires three nodes.
  {{< /td >}}
</tr>
</tr>
<tr id="app-node">
  {{< td >}}Application node{{< /td >}}
  {{< td >}}1 or more{{< /td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}Instance type c2-standard-16 or larger.
    <br/>
    High-availability (HA) requires at least three nodes.
  {{< /td >}}
  <td/>
</tr>
</tr>
<tr id="os-boot-disk">
  {{< td >}}OS boot disk{{< /td >}}
  {{< td >}}1 per node{{< /td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}At least 400 GB for each data node and 250 GB for each application node.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}External IP address{{< /td >}}
  {{< td >}}1 per node{{< /td >}}
  {{< td >}}The {{< product lc >}} has external IP addresses.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}VPC Network{{< /td >}}
  {{< td >}}1{{< /td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VPC network.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}Subnet{{< /td >}}
  {{< td >}}1{{< /td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VPC network.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}FW rules{{< /td >}}
  {{< td >}}4{{< /td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VPC network.{{< /td >}}
  <td/>
<tr>
  {{< td >}}GKE Cluster{{< /td >}}
  {{< td >}}1{{< /td >}}
  {{< td >}}Always{{< /td >}}
 <td/>
 </tr>
</table>

<!-- //////////////////////////////////////// -->
## See Also


- {{< xref f="cluster-mgmt/deployment/cloud/gcp/gcp-hw-spec.md" text="GCP  deployment specifications" >}}

