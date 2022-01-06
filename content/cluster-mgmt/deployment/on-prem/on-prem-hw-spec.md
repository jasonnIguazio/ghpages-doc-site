---
title:      "On-Premises Deployment Specifications"
linktitle:  "On-Prem Deployment Specifications"
description: "Hardware specifications for deploying the Iguazio MLOps Platform on-prem (VM and bare-metal)"
keywords: "VM hardware specifications, virtual machine, VM, hardware specs, hardware configuration, hardware, specification, spec, on-prem, on-prem spec"
menu:
  main:
    name:       "Deployment Specifications"
    parent:     "deployment-on-prem"
    identifier: "on-prem-hardware-specs"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces 
  specs/hardware/on-prem-hw-spec.md#aws_specs. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This document lists the hardware specifications for on-premises ("on-prem") deployment of version {{< productVersion num >}} of the {{< product full >}} ("the {{< product lc >}}").

{{< text-hw-spec-capacity-calc-note note="1" >}}

<!-- ---------------------------------------- -->
### Hardware Configurations {#hw-cfgs}

{{% include f="hw-cfgs.md" %}}

For both configurations, data nodes in on-prem deployments are always deployed on virtual machines (VMs) while application nodes can be deployed on either VMs or local machines (bare-metal).

<!-- ---------------------------------------- -->
### VM Deployment Notes {#vm-deployment-notes}

{{< warning id="vm-deployment-warnings" >}}
- <a id="provisioning-note"></a> Provisioning (deployment) of the {{< product lc >}}'s node VMs is done by using a dedicated virtualization package, provided by {{< company >}}.
    <br/>
    **Don't attempt to provision the servers yourself prior to the deployment.**
    {{< comment >}}<!-- [c-cloud-n-vm-install-servers-provisioning] [InfInfo]
      See info in the include-install-vm-installation-guide.md shortcode.  -->
    {{< /comment >}}
- {{< text-deploy-vm-shutdown >}}
    {{< comment >}}<!-- [c-vm-shutdown] -->
    {{< /comment >}}
{{< /warning >}}

<a id="evc-note"></a>When deploying on virtual machines, notify {{< company >}}'s {{< email id="support" link="1" text="support team" >}} whenever VMware Enhanced vMotion Compatibility (EVC) mode is enabled, as a low EVC level might disable required CPU features.

<!-- ---------------------------------------- -->
## VM Hypervisor Host Specifications {#vm-hypervisor-specs}

Hypervisor host machines in VM {{< product lc >}} deployments must fulfill the following hardware specification requirements:

<table>
<tr text-align="left">
  <th style="font-weight:bold;">
    Component
  </th>
  <th style="font-weight:bold; vertical-align:'top';">
    Specification
  </th>
</tr>
<tr id="vm-hypervisor-network-ifcs">
  {{< td >}}Network interfaces{{< /td >}}
  {{< td >}}
{{< text-vm-hypervisor-network-ifcs >}}
  {{< /td >}}
</tr>
<tr id="vm-data-node-hypervisor">
  {{< td >}}Hypervisor{{< /td >}}
  {{< td >}}VMware vSphere ESXi {{< verkey k="vmware.hypervisor.versions" >}}, or Proxmox VE (PVE) {{< verkey k="proxmox.hypervisor.versions" >}}{{< /td >}}
  {{< comment >}}<!-- [IntInfo] References
  - VMware
    - https://docs.vmware.com/en/VMware-vSphere/
    - https://kb.vmware.com/s/article/2143832
    - https://my.vmware.com/en/web/vmware/info/slug/datacenter_cloud_infrastructure/vmware_vsphere/6_7
    - https://my.vmware.com/en/web/vmware/evalcenter?p=free-esxi6
  - Proxmox
    - https://www.proxmox.com/en/proxmox-ve
    - https://www.proxmox.com/en/downloads
    - https://pve.proxmox.com/wiki/Qemu/KVM_Virtual_Machines
  -->
  {{< /comment >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## VM Data-Node Specifications {#data-node-specs-vm}

Data nodes in on-prem {{< product lc >}} deployments are VMs that must fulfill the following hardware specification requirements.

{{< note id="data-node-specs-vm-notes" >}}
<a id="vm-data-node-sizes-note"></a>For some components, the specification differentiates between small and large data nodes.
Large data nodes provide greater processing capabilities.
Note that you cannot mix the specifications of these two alternative configurations.
{{< /note >}}

<table>
<tr text-align="left">
  <th style="font-weight:bold;">
    Component
  </th>
  <th style="font-weight:bold; vertical-align:'top';">
    Specification
  </th>
</tr>
<tr id="vm-data-node-memory">
  {{< td >}}Memory{{< /td >}}
  {{< td >}}64 GB (POC node) / 128 GB (small node) / 256 GB (large node){{< /td >}}
</tr>
<tr id="vm-data-node-cores">
  {{< td >}}Cores{{< /td >}}
  {{< td >}}4 (POC node) / 8 (small node) / 16 (large node){{< /td >}}
</tr>
<tr id="vm-data-node-vm-boot-disk">
  {{< td >}}VM boot disk{{< /td >}}
  {{< td >}}400 GB (minimum) image (hosted on an enterprise-grade SSD-based data store){{< /td >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (21.2.22) I added "minimum" at Orit
    and Maor's request (see the "Add the VM spec" email thread).
    (16.6.20) I added "image" per Dany's request (confirmed with Orit). Dany
    wrote "I already encountered a confusion where customer thought that a 400
    GB physical disk is enough to create a datastore and host our 400 GB vmdk
    which is not true - physical disk (and the datastore) need to be a bit
    bigger than the vmdk itself.". See the "Add the VM spec" email thread.
    (22.1.20) Initially, we documented a 500 GB requirement, based on the
    discussion from 10.11.19 detailed below. But at Maor's request, I've now
    changed the requirement (also in the internal spec) to 400 GB (for both the
    app and data nodes). Maor said that it's OK because we specifically say
    refer to *VM* boot disks. (I suggested changing it to "400 GB. Note that
    the VM boot disks are hosted on an enterprise-grade SSD-based data store,
    which requires additional hypervisor space (500 GB overall, including the
    VM disks)." but Maor said it's confusing and might not be right.)
    (10.11.19) Dany said that the requirement is actually 400 GB for the VM and
    500 GB for the hypervisor, but it's not accumulative: the hypervisor needs
    500 GB to support the 400 GB VM storage. We agreed that we can keep this as
    a single 400 GB VM requirement (as was the case in Adi's original internal
    VM spec, except this spec didn't distinguish between VM and hypervisor
    requirements) and rephrase to use the "hosted on ..." terminology because
    the SSD part of the requirement is actually related to the hypervisor. -->
  {{< /comment >}}
</tr>
<tr id="vm-data-node-data-disks">
  {{< td >}}Data disks{{< /td >}}
  {{< td >}}2, 4, 6, or 12 (POC and small node) / 2, 4, 6, 8, or 12 (large node) NVMe or enterprise-grade SSD data disks (drives) of 1 TB (minimum) each, which are mapped exclusively to the data-node VM using direct attach storage (DAS), such as raw device mapping (RDM).
    {{< comment >}}<!-- [IntInfo] (sharonl) (20.10.20) Edited for v2.10.0 at
      the request of Maor and Dany, approved by Orit. See the "Num of data
      disks in VMs" email thread. Maor said there's no need to edit the docs
      for earlier releases, as this spec is applicable to new deployments and
      we only deploy the latest release. (23.11.20 I edited to remove support
      for 24 SSDs for large nodes (Bug IG-7224 / DOC IG-17288), at which time I
      merged the entire data-disks spec entry also to the v2.8.0 docs and I
      made similar edits in the v2.5.4 VM HW spec. -->
    {{< /comment >}}
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Application-Node Specifications {#app-node-specs}

In on-prem deployments you can select whether to deploy the application nodes on virtual machines ([VMs](#app-node-specs-vm)) or on local machines ([bare-metal](#app-node-specs-bare-metal)), provided the same method is used on all nodes.
{{< comment >}}<!-- [InfInfo] (sharonl) (3.9.20) Orit said that at least
  currently (in v2.10.0 and earlier) you cannot mix app-node deployment methods.
-->
{{< /comment >}}

<!-- ---------------------------------------- -->
### VM Application-Node Specifications {#app-node-specs-vm}

Application nodes in VM {{< product lc >}} deployments are VMs that must fulfill the following hardware specification requirements.

{{< note id="app-node-specs-vm-notes" >}}
<a id="vm-app-node-sizes-note"></a>For some components, the specification differentiates between small and large application nodes.
Large application nodes provide greater processing capabilities.
Note that you cannot mix the specifications of these two alternative configurations.
{{< /note >}}

<table>
<tr text-align="left">
  <th style="font-weight:bold;">
    Component
  </th>
  <th style="font-weight:bold; vertical-align:'top';">
    Specification
  </th>
</tr>
<tr id="vm-app-node-memory">
  {{< td >}}Memory{{< /td >}}
  {{< td >}}64 GB (small node) / 128 GB (large node){{< /td >}}
</tr>
<tr id="vm-app-node-cores">
  {{< td >}}Cores{{< /td >}}
  {{< td >}}8 (small node) / 16 (large node){{< /td >}}
</tr>
<tr id="vm-app-node-vm-boot-disk">
  {{< td >}}VM boot disk{{< /td >}}
  {{< td >}}400 GB (minimum) image (hosted on an enterprise-grade SSD-based data store)
  {{< /td >}}
  {{< comment >}}<!-- See the [IntInfo] for data-node-vm-boot-disk. -->
  {{< /comment >}}
</tr>
<tr id="vm-app-node-gpu">
  {{< td >}}GPU (Optional){{< /td >}}
  {{< td >}}GPUs supported by the [{{< verkey k="nvdia.gpu_driver.name_full" >}}]({{< verkey k="nvdia.gpu_driver.supported_gpus_url" >}}).
  {{< /td >}}
</tr>
</table>

<!-- ---------------------------------------- -->
### Bare-Metal Application-Node Specifications {#app-node-specs-bare-metal}

Application nodes in bare-metal {{< product lc >}} deployments are supplied by the customer and must fulfill the following hardware specification requirements:

<table>
<tr id="bm-app-node-cores">
  {{< td >}}Cores{{< /td >}}
  {{< td >}}8 (minimum){{< /td >}}
</tr>
<tr id="bm-app-node-memory">
  {{< td >}}Memory{{< /td >}}
  {{< td >}}64 GB of RAM (minimum){{< /td >}}
</tr>
<tr id="bm-app-node-os-boot-disk">
  {{< td >}}OS boot disk{{< /td >}}
  {{< td >}}400 GB (minimum) enterprise-grade SSDs{{< /td >}}
</tr>
<tr id="bm-app-node-network-ifcs">
  {{< td >}}Network interfaces{{< /td >}}
  {{< td >}}
- Single port 1 Gb (minimum) NIC for the management network
- Single port 10 Gb (minimum) NIC for the data-path (client) network
  {{< /td >}}
</tr>
<tr id="bm-app-node-gpu">
  {{< td >}}GPU (Optional){{< /td >}}
  {{< td >}}GPUs supported by the [{{< verkey k="nvdia.gpu_driver.name_full" >}}]({{< verkey k="nvdia.gpu_driver.supported_gpus_url" >}}).
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Backup-Node Specifications (Optional) {#backup-node-specs}

If you wish to back up your instance of the {{< product lc >}}, you need an additional VM or bare-metal backup node, which is used only for backups.
The backup node must fulfill the following hardware specification requirements:
{{< comment >}}<!-- [IntInfo] (sharonl) (31.12.20) Efi (Support) said that the
  deployment type of the backup node (VM/bare-metal) doesn't need to match the
  app-node deployment type. -->
{{< /comment >}}

{{< note id="backup-notes" >}}
{{< text-backup-recom >}}
{{< /note >}}

<table>
<tr text-align="left">
  <th style="font-weight:bold;">
    Component
  </th>
  <th style="font-weight:bold; vertical-align:'top';">
    Specification
  </th>
</tr>
<tr id="backup-node-memory">
  {{< td >}}Memory{{< /td >}}
  {{< td >}}64 GB{{< /td >}}
</tr>
<tr id="backup-node-cores">
  {{< td >}}Cores{{< /td >}}
  {{< td >}}8{{< /td >}}
</tr>
<tr id="backup-node-vm-boot-disk">
  {{< td >}}VM boot disk{{< /td >}}
  {{< td >}}400 GB (minimum) image (hosted on an enterprise-grade SSD-based data store){{< /td >}}
  {{< comment >}}<!-- See the [IntInfo] for data-node-vm-boot-disk. -->
  {{< /comment >}}
</tr>
<tr id="backup-node-backup-storage">
  {{< td >}}Backup storage{{< /td >}}
  {{< td >}}2 TB (minimum) of network or direct attached storage or a storage area network (NAS/DAS/SAN). {{% include f="hw-spec-min-storage-data-dependency.md" %}}
  {{< /td >}}
  {{< comment >}}<!-- See the [IntInfo] for data-node-vm-boot-disk. -->
  {{< /comment >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="intro/high-availability.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" >}}
- {{< xref f="cluster-mgmt/deployment/support-matrix.md" >}}

{{< condition filter="scalability" filterval="true" >}}
- {{< xref filter="scalability" filterval="true" f="intro/scalability.md" >}}
{{< /condition >}}

