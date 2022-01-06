---
title:      "AWS Cloud Deployment Specifications"
linktitle:  "AWS Deployment Specifications"
description: "Hardware specifications for deploying the Iguazio MLOps Platform on an AWS cloud / AWS Outposts"
keywords: "aws cloud deployment specifications, aws deployment specifications, amazon web services deployment specifications, aws deployment specs, aws hardware specifications, amazon web services hardware specifications, aws hardware specs, aws specifications, amazon web services specifications, aws specs, deployment specifications, deployment specs, hardware specifications, hardware specs, hardware configuration, hardware, specification, spec"
menu:
  main:
    name:       "Deployment Specifications"
    parent:     "deployment-cloud-aws"
    identifier: "aws-cloud-hardware-specs"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces 
  specs/hardware/cloud-hw-spec.md#aws_specs. -->
{{< /comment >}}
{{< comment >}}<!-- [InfInfo] (sharonl)
- [IMPORTANT] (18.6.20) Similar spec info is found also in the AWS cloud
  installation docs in this section, and especially in resources-calculate.md
  (under and aws/howto/). Any updates should currently be done in both
  locations.
- (3.2.20) In consultation with Adi, Orit, and Maor it was decided to list the
  configuration details for the data nodes, as we only support one instance
  type for each cloud vendor. However, for the application nodes, for which we
  support multiple instance types, it was decided to refer to the cloud-vendor
  documentation for details.
-->
<!-- [InfInfo] See "Amazon EC2 Instance Types"
  (https://aws.amazon.com/ec2/instance-types/). Note that to see the info for
  some instance types, such as M5 (the CPU-based instances supported for our
  application nodes) or i3en.6xlarge (the supported data-node instance type for
  AWS Outposts), you need to select the relevant tab in the instances table
  (such as "M5" or "13en"). There are also specific Amazon EC2 instance-type
  pages for such instance types:
  - "Amazon EC2 I3 Instances"
    (https://aws.amazon.com/ec2/instance-types/i3/)
  - "Amazon EC2 M5 Instances"
    (https://aws.amazon.com/ec2/instance-types/m5/)
  - "Amazon EC2 P3 Instances"
    (https://aws.amazon.com/ec2/instance-types/p3/)
  - "Amazon EC2 G4 Instances"
    (https://aws.amazon.com/ec2/instance-types/g4/)
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This document lists the hardware specifications for deployment of version {{< productVersion num >}} of the {{< product full >}} ("the {{< product lc >}}") on the {{< url v="aws_home" k="text" link="1" >}} cloud; for details, refer to the [AWS documentation](https://aws.amazon.com/ec2/instance-types/).

{{< note id="aws-notes" >}}
- <a id="aws-outposts-note"></a>All references to AWS cloud apply also to {{< url v="aws_outposts_home" k="text" link="1" >}}, except where otherwise specified.
- <a id="aws-specs-elastic-ip-note"></a>AWS {{< product lc >}} deployments also require an Elastic IP address.
    For more information, see the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html).
- <a id="capacity-calculation-note"></a>{{< text-hw-spec-capacity-calc-note >}}
{{< /note >}}

{{< warning id="deployment-warnings" >}}
- {{< text-deploy-cloud-provision-note >}}
- {{< text-deploy-cloud-data-node-shutdown >}}
{{< /warning >}}

<!-- ---------------------------------------- -->
### Hardware Configurations {#hw-cfgs}

{{% include f="hw-cfgs.md" %}}

<!-- ---------------------------------------- -->
## AWS Data-Node Specifications {#aws-data-node-specs}

Data nodes in {{< product lc >}} AWS cloud deployments must use one of the following EC2 instance types and fulfill the related specifications; choose the type that best fits your requirements. 

- <a id="aws-i32xlarge"></a>i3.2xlarge
  {{< comment >}}<!-- [IntInfo] (sharonl) Added in v3.0.0 (Requirement IG-16114
    / DOC IG-17766). -->
  {{< /comment >}}

    <table style="width:70%">
    <tr text-align="left">
      <th style="font-weight:bold;">
        Component
      </th>
      <th style="font-weight:bold; vertical-align:'top';">
        Specification
      </th>
    </tr>
    <tr id="aws-i32xlarge-data-node-vcpu">
      {{< td >}}vCPUs{{< /td >}}
      {{< td >}}8{{< /td >}}
    </tr>
    <tr id="aws-i32xlarge-data-node-memory">
      {{< td >}}Memory{{< /td >}}
      {{< td >}}61 GiB{{< /td >}}
    </tr>
    <tr id="aws-i32xlarge-data-node-data-disk">
      {{< td >}}Data disks (local storage){{< /td >}}
      {{< td >}}1 x 1.9 TB NVMe SSD{{< /td >}}
    </tr>
    <tr id="aws-i32xlarge-data-node-os-boot-disk">
      {{< td >}}OS boot disk (EBS volume){{< /td >}}
      {{< td >}}General Purpose SSD (gp2); 400 GB (minimum){{< /td >}}
    </tr>
    <tr id="aws-i32xlarge-data-node-usable-storage-capacity">
      {{< td >}}Usable storage capacity{{< /td >}}
      {{< td >}}1 node (Development Cluster) &mdash; 1 TB;<br/>
          3 nodes (Operational Cluster) &mdash; 2 TB
          {{< comment >}}<!-- [IntInfo] (sharonl) (2.3.21) According to the
            internal BOM, the usable storage capacity is 1.35 TB for a single
            node and 2.02 TB for 3 nodes, but Adi wrote in his 21.2.21 email on
            the "AWS i3.2xl support" email thread to round this down to 1 TB
            and 2 TB (similar to the external-spec round-down for other
            data-node types, as I had summarized on the same thread). -->
          {{< /comment >}}
      {{< /td >}}
    </tr>
    </table>

- <a id="aws-i34xlarge"></a>i3.4xlarge

    <table style="width:70%">
    <tr text-align="left">
      <th style="font-weight:bold;">
        Component
      </th>
      <th style="font-weight:bold; vertical-align:'top';">
        Specification
      </th>
    </tr>
    <tr id="aws-i34xlarge-data-node-vcpu">
      {{< td >}}vCPUs{{< /td >}}
      {{< td >}}16{{< /td >}}
    </tr>
    <tr id="aws-i34xlarge-data-node-memory">
      {{< td >}}Memory{{< /td >}}
      {{< td >}}122 GiB{{< /td >}}
    </tr>
    <tr id="aws-i34xlarge-data-node-data-disk">
      {{< td >}}Data disks (local storage){{< /td >}}
      {{< td >}}2 x 1.9 TB NVMe SSD{{< /td >}}
    </tr>
    <tr id="aws-i34xlarge-data-node-os-boot-disk">
      {{< td >}}OS boot disk (EBS volume){{< /td >}}
      {{< td >}}General Purpose SSD (gp2); 400 GB (minimum){{< /td >}}
    </tr>
    <tr id="aws-i34xlarge-data-node-usable-storage-capacity">
      {{< td >}}Usable storage capacity{{< /td >}}
      {{< td >}}Single node (Development Cluster) &mdash; 2.5 TB;
          3 nodes (Operational Cluster) &mdash; 4 TB
      {{< /td >}}
    </tr>
    </table>

- <a id="aws-i38xlarge"></a>i3.8xlarge
  {{< comment >}}<!-- [IntInfo] (sharonl) (2.3.21) According to Adi's 21.2.21
    email on the "AWS i3.2xl support" email thread, we only offer a 3-node
    i3.8xlarge configuration to customers (even though the internal BOM also
    has a single-node spec). -->
  {{< /comment >}}

    <table style="width:70%">
    <tr text-align="left">
      <th style="font-weight:bold;">
        Component
      </th>
      <th style="font-weight:bold; vertical-align:'top';">
        Specification
      </th>
    </tr>
    <tr id="aws-i38xlarge-data-node-vcpu">
      {{< td >}}vCPUs{{< /td >}}
      {{< td >}}32{{< /td >}}
    </tr>
    <tr id="aws-i38xlarge-data-node-memory">
      {{< td >}}Memory{{< /td >}}
      {{< td >}}244 GiB{{< /td >}}
    </tr>
    <tr id="aws-i38xlarge-data-node-data-disk">
      {{< td >}}Data disks (local storage){{< /td >}}
      {{< td >}}4 x 1.9 TB NVMe SSD{{< /td >}}
    </tr>
    <tr id="aws-i38xlarge-data-node-os-boot-disk">
      {{< td >}}OS boot disk (EBS){{< /td >}}
      {{< td >}}General Purpose SSD (gp2); 400 GB (minimum){{< /td >}}
    </tr>
    <tr id="aws-i38xlarge-data-node-usable-storage-capacity">
      {{< td >}}Usable storage capacity{{< /td >}}
      {{< td >}}3 nodes (Operational Cluster) &mdash; 9 TB{{< /td >}}
    </tr>
    </table>

{{< note id="aws-data-node-specs-outposts" title="AWS Outposts Note" >}}
For deployment on AWS Outposts, currently only the i3en.6xlarge EC2 instance type is supported.
{{< /note >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (1.11.20) This was added at Gilad's
  request. Gilad preferred that we add it as a short note after the table and
  not include the full spec because this wasn't fully tested and we'd like to
  keep the doc references for AWS Outposts specific requirements to a minimum.
  (The app-node specs are the same for AWS Outposts. I added a note at the
  start of the AWS section that all AWS cloud references apply also to AWS
  Outposts except where otherwise specified (#aws-outposts-note); currently,
  the only exception is the data-node instance type. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
## AWS Application-Node Specifications {#aws-app-node-specs}

Application nodes in {{< product lc >}} AWS cloud deployments must use one of the following EC2 instance types; choose the type that best fits your requirements.
For specification details, refer to the AWS documentation. Elastic Kubernetes Service (EKS) is also supported for application nodes, including multiple node groups, using the instance types listed below. 

{{< note id="aws-app-node-specs-os-boot-disk-note" >}}
All of the supported application-node configurations also require a 250 GB (minimum) General Purpose SSD (gp2) OS boot disk (EBS volume).
{{< /note >}}

<!-- *************** -->
{{< small-heading id="aws-app-node-instance-types-cpu" >}}CPU-Based Instances{{< /small-heading >}}

- m5.4xlarge (default configuration)
- m5.8xlarge
- m5.12xlarge
- m5.16xlarge
- m5.24xlarge

<!-- *************** -->
{{< small-heading id="aws-app-node-instance-types-gpu" >}}GPU-Based Instances{{< /small-heading >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (11.6.20) Support for the G4 series GPU
  instances for NVIDIA T4 GPUs was added in v2.8.0 (Req 13489 / DOC IG-14017).
  For the EC2 G4 instances, see the "G4" tab in the "Accelerated Computing"
  section of the AWS "Amazon EC2 Instance Types" page
  (https://aws.amazon.com/ec2/instance-types/#Accelerated_Computing) and the
  "Amazon EC2 G4 Instances" page
  (https://aws.amazon.com/ec2/instance-types/g4/).

  (18.6.20) I marked p3.2xlarge in the v2.8 spec as trial-only, after Orit said
  that we technically still support this type and it appears as an option in
  the Provazio AWS installation UI, but we decided to use it only for trial
  installations and for the production of 2.8 we formally qualified p3.8xlarge
  and above only.
  Note that we intentionally don't mention this instance type in the AWS
  installation doc (Eran's decision). (see
  cluster-mgmt/deployment/cloud/aws/howto/resources-calculate.md). -->
{{< /comment >}}

- p3.2xlarge ({{< cloud-trial "name.lc" >}} only)
- p3.8xlarge
- p3.16xlarge
- g4dn.12xlarge
- g4dn.16xlarge

<!-- ---------------------------------------- -->
## AWS Backup-Node Specifications (Optional) {#aws-backup-node-specs}

If you wish to back up your instance of the {{< product lc >}}, you need an additional backup-node EC2 instance of type m5.4xlarge.

{{< note id="aws-backup-notes" >}}
- {{< text-backup-recom >}}
- The backup node is used only for backups and can be shut down between backups to save costs.
- The backup node must have at least 2 TB of network-attached storage (NAS) to be used only for backup purposes. {{% include f="hw-spec-min-storage-data-dependency.md" %}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" >}}
- {{< xref f="intro/high-availability.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}}
- {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}}

{{< condition filter="scalability" filterval="true" >}}
- {{< xref filter="scalability" filterval="true" f="intro/scalability.md" >}}
{{< /condition >}}

