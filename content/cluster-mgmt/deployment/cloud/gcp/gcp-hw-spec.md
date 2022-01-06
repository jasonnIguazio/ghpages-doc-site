---
title:      "GCP Deployment Specifications"
linktitle:  "GCP Deployment Specifications"
description: "Hardware specifications for deploying the Iguazio MLOps Platform on Google Cloud Platform (GCP)"
keywords: "google cloud deployment specifications, google cloud platform deployment specifications, gcp deployment specifications, google cloud deployment specs, gcp deployment specs, google cloud hardware specifications, gcp hardware specifications, google cloud hardware specs, gcp hardware specs, google cloud specifications, google cloud platform specifications, gcp specifications, google cloud specs, gcp specs, deployment specifications, deployment specs, hardware specifications, hardware specs, hardware configuration, hardware, specification, spec"
menu:
  main:
    name:  "Deployment Specifications"
    parent:     "deployment-cloud-gcp"
    identifier: "gcp-cloud-hardware-specs"
    weight:     10
---
{{< comment >}}<!-- [InfInfo] See the Google Cloud documentation -
  Concepts > Virtual machine instances >
  - "Overview" (https://cloud.google.com/compute/docs/instances)
  - "Machine types" (https://cloud.google.com/compute/docs/machine-types)
    This page describes the VM families and lists the machine names & specs.
  - "CPU platforms" (https://cloud.google.com/compute/docs/cpu-platforms)
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This document lists the hardware specifications for deployment of version {{< productVersion num >}} of the {{< product full >}} ("the {{< product lc >}}") on {{< url v="google_cloud_home" k="text" link="1" >}}, also known as {{< url v="google_cloud_gcp" k="text_long" link="1" >}}; for details, refer to the [{{< url v="google_cloud_compute_engine_docs" k="text_long" >}}]({{< url v="google_cloud_compute_engine_docs" k="full" >}}/machine-types).

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

<!-- ---------------------------------------- -->
## GCP Data-Node Specifications {#gcp-data-node-specs}

Data nodes in {{< product lc >}} GCP deployments must fulfill the following hardware specification requirements:

<table style="width:70%">
<tr text-align="left">
  <th style="font-weight:bold;">
    Component
  </th>
  <th style="font-weight:bold; vertical-align:'top';">
    Specification
  </th>
</tr>
<tr id="gcp-data-node-instance-type">
  {{< td >}}Instance type{{< /td >}}
  {{< td >}}n2-highmem-16{{< /td >}}
</tr>
<tr id="gcp-data-node-vcpu">
  {{< td >}}vCPUs{{< /td >}}
  {{< td >}}16{{< /td >}}
</tr>
<tr id="gcp-data-node-memory">
  {{< td >}}Memory{{< /td >}}
  {{< td >}}128 GB{{< /td >}}
</tr>
<tr id="gcp-data-node-data-disk">
  {{< td >}}Data disks (local storage){{< /td >}}
  {{< td >}}8 x 375 GB NVMe SSD{{< /td >}}
</tr>
<tr id="gcp-data-node-os-boot-disk">
  {{< td >}}OS boot disk{{< /td >}}
  {{< td >}}Premium SSD; 400 GB (minimum){{< /td >}}
</tr>
<tr id="gcp-data-node-usable-storage-capacity">
  {{< td >}}Usable storage capacity{{< /td >}}
  {{< td >}}1 node (Development Cluster) &mdash; 2 TB;<br/>
    3 nodes (Operational Cluster) &mdash; 3.5 TB
    {{< comment >}}<!-- [IntInfo] (sharonl) (23.4.21) According to the internal
      BOM, the usable storage capacity is 2.42 TB for a single node and 3.64 TB
      for 3 nodes, but I confirmed with Orit that we should round this down in
      the external documentation to 2 TB and 3.5 TB; (see also the info in the
      AWS cloud-deployment specs for the similar round down done there). -->
    {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- ---------------------------------------- -->
## GCP Application-Node Specifications {#gcp-app-node-specs}

Application nodes in {{< product lc >}} GCP deployments are supported only on {{< url v="gke_home" k="text_long" link="1" >}} and must use one of the following instance types; choose the type that best fits your requirements.
For specification details for each type, refer to the {{< url v="google_cloud_compute_engine_docs" k="text_long" >}}.

{{< note id="gcp-app-node-specs-os-boot-disk-note" >}}
All of the supported application-node configurations also require a 250 GB (minimum) premium-SSD OS boot disk.
{{< /note >}}

{{< small-heading id="aws-app-node-instance-types-cpu" >}}CPU-Based Instances{{< /small-heading >}}

- c2-standard-16 (default configuration)
- c2-standard-30
- c2-standard-60

{{< small-heading id="aws-app-node-instance-types-cpu" >}}GPU-Based Instances{{< /small-heading >}}

- n1-standard-16
- n1-standard-32
- n1-standard-64
- n1-standard-96

<!-- ---------------------------------------- -->
## GCP Backup-Node Specifications (Optional) {#gcp-backup-node-specs}

If you wish to back up your instance of the {{< product lc >}}, you need an additional backup-node instance of type c2-standard-16.

{{< note id="gcp-backup-notes" >}}
- {{< text-backup-recom >}}
- The backup node is used only for backups and can be shut down between backups to save costs.
- The backup node must have at least 2 TB of network-attached storage (NAS) to be used only for backup purposes. {{% include f="hw-spec-min-storage-data-dependency.md" %}}
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also
{{< comment >}}<!-- [TODO-GCP-deployment] Add a link to the GCP installation
  (deployment) guide, when this guide is added. -->
{{< /comment >}}

- {{< xref f="intro/high-availability.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}}
- {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}}

{{< condition filter="scalability" filterval="true" >}}
- {{< xref filter="scalability" filterval="true" f="intro/scalability.md" >}}
{{< /condition >}}

