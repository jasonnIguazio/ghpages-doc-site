---
title: "Calculating Required Infrastructure Resources (AWS)"
description: "Learn how to calculate the required resources for an AWS cloud installation of the Iguazio MLOps Platform."
keywords: "calaculating aws infrastructure reesources, aws infrastructure resources calculation, subnet"
layout: "section-list"
menu:
  main:
    name:       "Calculating Required Infrastructure Resources"
    parent:     "deployment-cloud-aws-howtos"
    identifier: "deployment-cloud-aws-howtos-resources-calculate"
    weight:     10
---

<!-- //////////////////////////////////////// -->
## Allocated Infrastructure Resources {#allocated-resources}

When the {{< product lc >}} is installed, it creates the following resources.
Take this into account when selecting your installation configuration.
Note that you also need to consider the [service quotas]({{< url v="aws_gen_ref" k="full" >}}aws_service_limits.html) (a.k.a. limits) for your AWS account.
{{< comment >}}<!-- [c-aws-outposts-cert-req] (sharonl) (5.11.20) I added the
  reference to the AWS service quotas at the request of Product (Gilad) to
  comply with AWS Outposts review requirements. -->
{{< /comment >}}
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
  {{< td >}}1 or 3{{< / td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}EC2 instance type i3.2xlarge, i3.4xlarge or i3.8xlarge.<br/>
    High-availability (HA) requires three nodes.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}Data auto-scaling group{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}Always{{< /td >}}
  <td/>
</tr>
<tr id="app-node">
  {{< td >}}Application node{{< /td >}}
  {{< td >}}1 or more{{< / td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}EC2 CPU instance type m5.4xlarge or larger / GPU instance type p3.8xlarge or larger, or g4dn.12xlarge larger.
    <br/>
    High-availability (HA) requires at least three nodes.
  {{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}Application auto-scaling group{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}Always{{< /td >}}
  <td/>
</tr>
<tr id="os-boot-disk">
  {{< td >}}OS boot disk (EBS volume){{< /td >}}
  {{< td >}}1 per node{{< / td >}}
  {{< td >}}Always{{< /td >}}
  {{< td >}}EBS volume type General Purpose SSD (gp2).
    At least 400 GB for each data node and 250 GB for each application node.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}Elastic IP address{{< /td >}}
  {{< td >}}1 per node{{< / td >}}
  {{< td >}}The {{< product lc >}} has public IP addresses.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}VPC{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VPC.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}Subnet{{< /td >}}
  {{< td >}}1 or more{{< / td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VPC.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}Route table{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VPC.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}Internet gateway{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VPC.{{< /td >}}
  <td/>
</tr>
<tr>
  {{< td >}}Security group{{< /td >}}
  {{< td >}}2{{< / td >}}
  {{< td >}}The {{< product lc >}} is deployed to a new VPC.{{< /td >}}
  {{< td >}}See {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/network-security-groups-cfg.md" >}}.
  {{< /td >}}
</tr>
<tr>
  {{< td >}}EKS Cluster{{< /td >}}
  {{< td >}}1{{< / td >}}
  {{< td >}}EKS is used as the Application Cluster{{< /td >}}
  {{< td >}}
  {{< /td >}}
</tr>
</table>


<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/aws/aws-hw-spec.md" text="AWS cloud deployment specifications" >}}

