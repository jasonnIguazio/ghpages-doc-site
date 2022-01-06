---
title: "Deploying the Platform Nodes (PVE)"
description: "Learn how to deploy Proxmox VE (PVE) VMs as Iguazio MLOps Platform nodes from GZ VM images."
keywords: "proxmox ve vm deployment, pve vm deployment, proxmox vm deployment, vm deployment, virtualization package, virtualization files, vm backups, vm images, vm templates, vma backups, vam, gz files, gzip"
layout: "section-list"
menu:
  main:
    name:       "Deploying the Platform Nodes"
    parent:     "deployment-vm-proxmox-howtos"
    identifier: "deployment-vm-proxmox-howtos-vms-deploy"
    weight:     20
---
{{< comment >}}<!-- [ci-no-shcd-in-front-matter] -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) References:
  - "VMA" / Proxmox wiki
    https://pve.proxmox.com/wiki/VMA
  - "vzdump(1)" / PVE documentation
    https://pve.proxmox.com/pve-docs/vzdump.1.html
  - "Qemu/KVM Virtual Machines" / PVE documentation
    https://pve.proxmox.com/wiki/Qemu/KVM_Virtual_Machines
  - "qmrestore(1)" / PVE documentation
    https://pve.proxmox.com/pve-docs/qmrestore.1.html
-->
<!-- [c-vm-virtualization-pkg] [IntInfo] (sharonl) (10.12.20)
  See info in the include-install-vm-installation-guide.md shortcode regarding
  the "virtualization package"/"virtualization" files/images terminology. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

To install (deploy) an instance of the {{< product lc >}} on a Proxmox VE (PVE) cluster, you need to deploy virtual machines (VMs) that will serve as the {{< product lc >}}'s data and application nodes.
The nodes can reside on the same PVE hypervisor host machine ("PVE host") or on different PVE hosts, as long as every node VM meets the required hardware specifications (see the prerequisites in this guide and the {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" >}}.
This guide outlines how to deploy {{< product lc >}} VMs from VMA GZ files (images archives).

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1.  <a id="prereq-node-ovf-files"></a>A PVE {{< product lc >}} virtualization package with VMA GZ files for each of the {{< product lc >}} nodes, received from {{< company >}}.
2.  <a id="prereq-admin-access-n-prev-instal-steps"></a>Administrative access to a {{< product lc >}} PVE cluster with the required networks configuration (see {{< xref f="cluster-mgmt/deployment/on-prem/vm/proxmox/howto/network-cfg.md" >}}).
3.  <a id="prereq-hypervisor-data-store-for-vm-boot-disks"></a>PVE-host data stores with a minimum of 400 GB available storage for each of the {{< product lc >}} nodes (to be used for running the nodes' VM boot-disk images).
4.  <a id="prereq-hypervisor-resources"></a>Sufficient dedicated physical resources on the PVE hosts to allow running the {{< product lc >}}'s node VMs without over-provisioning.
5.  <a id="prereq-hypervisor-host-bios-settings"></a>The following BIOS settings are configured on the PVE hosts:

    - <gui-label>Hyper Threading</gui-label> &mdash; disabled
    - <gui-label>Advanced | CPU Configuration | Intel Virtualization Technology</gui-label> &mdash; enabled
    - <gui-label>Chipset Configuration | North Bridge | IIO Configuration | Intel VT for Directed I/O (VT-d)</gui-label> &mdash; enabled

<!-- //////////////////////////////////////// -->
## Renaming the Backup Files (PVE 6.2.1&ndash;6.2-9) {#rename-backup-files}

{{< note id="rename-backup-files-versions-note" >}}
This step is required only for PVE versions 6.2-1&mdash;6.2-9.
If you're using PVE version 6.2-10 or newer, skip to the [next step](#copy-backup-files-to-hypervisor-hosts).
{{< /note >}}

PVE version 6.2-1 introduced a strict restriction to the names of VM-backup (virtualization) image files, which requires including the image-creation date in the file name.
This requirement was canceled in PVE version 6.2-10.
The default names of the PVE virtualization files provided by {{< company >}} don't include the creation date.
Therefore, if you're using PVE version 6.2-1&ndash;6.2-9, before deploying the VMs, run the following commands to rename the backup image files to add image-creation dates:

```sh
mv vzdump-qemu-data-node-8.cores-122G.ram-400G.ssd.vma.gz vzdump-qemu-108-2020_05_20-10_00_00.vma.gz
mv vzdump-qemu-data-node-16.cores-244G.ram-400G.ssd.vma.gz vzdump-qemu-116-2020_05_20-10_00_00.vma.gz
mv vzdump-qemu-app-node-8.cores-61G.ram-400G.ssd.vma.gz vzdump-qemu-208-2020_05_20-10_00_00.vma.gz
mv vzdump-qemu-app-node-16.cores-122G.ram-400G.ssd.vma.gz vzdump-qemu-216-2020_05_20-10_00_00.vma.gz
```

<!-- //////////////////////////////////////// -->
## Copying the Backup Files to the PVE Hosts {#copy-backup-files-to-hypervisor-hosts}

Copy the image files from the provided PVE {{< product lc >}} virtualization package to the <path>{{< getvar v="product.install_proxmox.vm_virtualization_files_hypervisor_dir" >}}</path> directory on all PVE hosts in the {{< product lc >}}'s PVE cluster.
You can use the <cmd>scp</cmd> command to copy the files.

<!-- ---------------------------------------- -->
## Deploying the VMs from the Backup Files {#deploy-vms-from-backup-files}

To import and deploy the {{< product lc >}}'s node VMs from the provided VMA GZ image files, execute the following procedure for each of the PVE hosts (hypervisors) in the {{< product lc >}}'s PVE cluster.

{{< note id="sequencial-node-vm-ids-note" title="VM IDs" >}}
As part of each VM deployment, you assign a unique cluster-wide numeric ID to the VM.
It's recommended that you begin with ID 101 and increment the ID for each deployed {{< product lc >}} node VM, regardless of the node type and whether the cluster has a single or multiple PVE hosts.
For example, for a single data node and a single application node, assign ID 101 to the data node and ID 102 to the application node.
{{< /note >}}

1.  Open a command-line interface with a connection to the PVE host &mdash; either by selecting the PVE host in the PVE GUI and then selecting <gui-label>Shell</gui-label>, or by establishing an SSH connection to the PVE host.
    The commands in the next steps should be run from this command line.

2.  Run the following command:

    ```sh
    cd {{% getvar v="product.install_proxmox.vm_virtualization_files_hypervisor_dir" %}}
    ```

3. Deploy the {{< product lc >}}'s data and application nodes by repeating the following command for each node; it's recommended that you first deploy all the data-node VMs and then all the application-node VMs:
    ```sh
    qmrestore <data-node VM image file> <node ID> --unique
    ```

    For example, the following command deploys a data-node VM with ID 101:
    ```sh
    qmrestore vzdump-qemu-data-node-8.cores-122G.ram-400G.ssd.vma.gz 101 --unique
    ```

    {{< note id="vm-deploy-cmd-notes" >}}
- `101` is the VM's cluster-wide unique numeric ID.
    As explained, it's recommended to use sequential IDs starting with 101 &mdash; see the [VM IDs](#sequencial-node-vm-ids-note) note.
- The <opt>--unique</opt> option generates a new unique random MAC addresses for the VM upon deployment (image import).
- By default, the VM is placed on the default "local-lvm" data store, which is fine in most cases.
    If you want to place the VM on another data store, use the <opt>--storage</opt> option to specify the name of the desired data store &mdash; `--storage <data-store name>`.
    {{< /note >}}

<!-- //////////////////////////////////////// -->
## Renaming the Deployed VMs (Optional) {#rename-deployed-vms}

In clusters with more than one node VM of each type (data and application) &mdash; as is the case for the {{< product lc >}}'s {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" a="operational-cluster" text="Operational Cluster" >}} configuration &mdash; it's recommended that you also rename each deployed node VM to a unique name.
For example, for a cluster with three data nodes and three application nodes, you could name the data nodes "data-node-1", "data-node-2", and "data-node-3", and the application nodes "app-node-1", "app-node-2" and "app-node-3".
You can rename the VMs from the PVE GUI by editing the VM name under <gui-label>&lt;VM&gt; | Options | Name</gui-label>.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/on-prem/vm/proxmox/proxmox-installation-guide.md" >}}
- {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" >}}

