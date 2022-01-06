---
title: "Deploying the Platform Nodes (vSphere)"
description: "Learn how to deploy VMware vSphere VMs as Iguazio MLOps Platform nodes from OVF files."
keywords: "vmware vsphere vm deployment, vsphere vm deployment, vmware vm deployment, vm deployment, virtualization package, virtualization files, vm backups, vm images, vm templates, ovf files, ovf"
layout: "section-list"
menu:
  main:
    name:       "Deploying the Platform Nodes"
    parent:     "deployment-vm-vmware-howtos"
    identifier: "deployment-vm-vmware-howtos-vms-deploy"
    weight:     20
---
{{< comment >}}<!-- [ci-no-shcd-in-front-matter] -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) References:
  VMware doc - 
  - "Deploy an OVF or OVA Template" / VMware vSphere product documentation
    https://docs.vmware.com/en/VMware-vSphere/6.7/com.vmware.vsphere.vm_admin.doc/GUID-17BEDA21-43F6-41F4-8FB2-E01D275FE9B4.html

  Third-party doc -
  - "Deploying FortiTester-VM on VMware vSphere" /
    Fortinet doc - Deploying FortiTester-VM on ESXi
    https://docs.fortinet.com/document/fortitester/4.0.0/deploying-fortitester-vm-on-esxi/492924/Configuring%20access%20to%20FortiTester%E2%80%99s%20web%20UI%20&%20CLI.htm
  - "Step 1: Setting Up a Virtual Server with VMware ESXi 6.7 Web Interface" /
    Teramind doc - On-Premise Deployment Guide
    https://teramind.zendesk.com/hc/en-us/articles/360049587714-Step-1-Setting-Up-a-Virtual-Server-with-VMware-ESXi-6-7-Web-Interface
-->
<!-- [c-vm-virtualization-pkg] [IntInfo] (sharonl) (10.12.20) See info in the
  include-install-vm-installation-guide.md shortcode regarding the
  "virtualization package"/"virtualization" files/images terminology. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

To install (deploy) an instance of the {{< product lc >}} on a VMware vSphere cluster, you need to deploy virtual machines (VMs) that will serve as the {{< product lc >}}'s data and application nodes.
The nodes can reside on the same VMware ESXi hypervisor host machine ("ESXi host") or on different ESXi hosts, as long as every node VM meets the required hardware specifications (see the prerequisites in this guide and the {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" >}}.
This guide outlines how to deploy {{< product lc >}} VMs from open virtualization format (OVF) template files and virtual machine disk (VMDK) files.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1.  <a id="prereq-node-ovf-files"></a>A vSphere {{< product lc >}} virtualization package with OVF and VMDK files for each of the {{< product lc >}} nodes, received from {{< company >}}.
2.  <a id="prereq-admin-access-n-prev-instal-steps"></a>Administrative access to a {{< product lc >}} vSphere cluster with the required networks configuration (see {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/howto/network-cfg.md" >}}.
3.  <a id="prereq-hypervisor-data-store-for-vm-boot-disks"></a>ESXi-host data stores with a minimum of 400 GB available storage for each of the {{< product lc >}} nodes (to be used for running the nodes' VM boot-disk images).
4. <a id="prereq-hypervisor-resources"></a>Sufficient dedicated physical resources on the ESXi hsots to allow running the {{< product lc >}}'s node VMs without over-provisioning.

<!-- //////////////////////////////////////// -->
## Copying the Backup Files to the ESXi Hosts {#copy-backup-files-to-hypervisor-hosts}

Copy the image files from the provided vSphere {{< product lc >}} virtualization package to a location that's accessible to all of the ESXi hosts and the vSphere Web Client in the {{< product lc >}}'s vSphere cluster.
You can the <cmd>scp</cmd> command, for example, to copy the files to the ESXi hosts.

<!-- //////////////////////////////////////// -->
## Deploying the VMs from the Backup Files {#deploy-vms-from-backup-files}

To deploy the {{< product lc >}}'s node VMs from the provided OVF and VMDK files, execute the following procedure from the vSphere Web Client for each of the {{< product lc >}}'s node VMs:

1.  Select <gui-label>Virtual Machines | Create / Register VM | Deploy a Virtual Machine from an OVF or OVA</gui-label>.

2.  In <gui-label>Select creation type</gui-label> select <gui-label>Deploy a virtual machine from an OVF or OVA file</gui-label>, and select <gui-label>Next</gui-label>.

3.  Enter a name for the VM; for example, "iguazio-data-node".

4.  Select <gui-label>Click to select files or drag/drop</gui-label>.

5.  Navigate to the directory of the data-node VM; select the relevant OVF SSD file and the VMDK file for the node &mdash; for example, <file>data-node-8.cores-122G.ram-400G.ssd</file> and <file>disk-0.vmdk</file>; and select <gui-label>Next</gui-label>.

6.  Select a vSphere data store with sufficient space to host the VM boot disk (400 GB minimum), and select <gui-label>Next</gui-label>.

7.  Map networks to matching port groups &mdash; <gui-label>VM Network</gui-label> for the management network, <gui-label>Client</gui-label> for the data-path (client) network, and <gui-label>Interconnect</gui-label> for the interconnect network (data-nodes only).
    For more information on the {{< product lc >}} networks, see {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/howto/network-cfg.md" >}}.

8.  Select <gui-label>Thick</gui-label> to configure thick disk provisioning, and select <gui-label>Next</gui-label>.

9.  Deselect (uncheck) the <gui-label>Power on automatically</gui-label> option.

10. Select <gui-label>Finish</gui-label> to complete the deployment.

<!-- //////////////////////////////////////// -->
## See Also

- [Deploy an OVF or OVA Template]({{< url v="vsphere_docs_latest" k="full" >}}GUID-17BEDA21-43F6-41F4-8FB2-E01D275FE9B4.html) (VMware vSphere documentation)
- {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/vmware-installation-guide.md" text="VMware vSphere installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" >}}

