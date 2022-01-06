---
title: "Attaching Data Disks to the Data-Node VMs (PVE)"
description: "Learn how to attach SSD data disks to Iguazio MLOps Platform Proxmox VE (PVE) data-node VMs."
keywords: "attach data disks to Proxmox VE vm data nodes, attach data disks to vm data nodes, vm data-node disk attachment, attach SSDs to vm data nodes, SSD vm data-node attachment, data disks, boot disks, data nodes, solid state drives, ssd, raw device mapping, rdm, scsi, iothread"
layout: "section-list"
menu:
  main:
    name:       "Attaching Data Disks to the Data Nodes"
    parent:     "deployment-vm-proxmox-howtos"
    identifier: "deployment-vm-proxmox-howtos-data-disks-attach"
    weight:     30
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} installation requires that you attach data disks (block-storage devices) of a specific type and minimal capacity directly to each of the {{< product lc >}}'s data-node VMs ("the data nodes"), as outlined in this guide.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1.  <a id="prereq-admin-access-n-prev-instal-steps"></a>Administrative access to a {{< product lc >}} PVE cluster with the required networks configuration (see {{< xref f="cluster-mgmt/deployment/on-prem/vm/proxmox/howto/network-cfg.md" >}}) and deployed VMs for each of the {{< product lc >}} nodes (see {{< xref f="cluster-mgmt/deployment/on-prem/vm/proxmox/howto/vms-deploy.md" >}}).
2.  <a id="prereq-data-node-data-disks"></a>At least two 1 TB enterprise-grade SSDs for each of the data nodes.
    Note that you need a separate set of disks for each data node.

<!-- //////////////////////////////////////// -->
## Attaching Data Disks to the Data Nodes {#attach-data-disks-to-data-nodes}

To attach local storage devices (data disks) to the {{< product lc >}}'s data-node VMs, execute the following procedure on each PVE host that has deployed data-node VMs:

1. <a id='step-ssh-to-host'></a>Establish an SSH connection to the PVE host.

2. <a id='step-find-disks'></a>List the disks (block devices) that are attached to the PVE host by running the following command:
    ```sh
    ~# lsblk -o name,size,vendor,model,serial
    ```
    In the returned output, identify the disks that you want to attach and copy their serial numbers.

    Following is an example command output:
    ```sh
    NAME                           SIZE VENDOR   MODEL                   SERIAL
    sda                           44.7G ATA      INTEL_SSDSCKKR048H6     CVLY609000MU048A
    sdb                          953.9G ATA      SanDisk_SD8SB8U1T001122 164108420934
    ├─sdb1                        1007K
    ├─sdb2                         512M
    └─sdb3                       953.4G
      ├─pve-root                    96G
      ├─pve-swap                     8G
      ├─pve-data_tmeta             8.3G
      │ └─pve-data-tpool         816.7G
      │   ├─pve-data             816.7G
      │   ├─pve-vm--101--disk--0   400G
      │   └─pve-vm--102--disk--0   400G
      └─pve-data_tdata           816.7G
        └─pve-data-tpool         816.7G
          ├─pve-data             816.7G
          ├─pve-vm--101--disk--0   400G
          └─pve-vm--102--disk--0   400G
    sdc                          953.9G ATA      SanDisk_SD8SB8U1T001122 163493421984
    sdd                          953.9G ATA      SanDisk_SD8SB8U1T001122 163493420112
    ```
    In this example, disk "sdb" is the PVE partition disk on which the PVE host is installed (note the `pve-<...>` partitions).
    You can select to attach disks "sdc" and/or "sdd" as data disks to either of the host's two data nodes (ID 101 and 102).
    {{< warning id="no-data-stores-attach-warning" >}}
Take care not to perform any manipulations on data-store devices, such as the PVE partition disk.
    {{< /warning >}}

3.  <a id="step-find-disk-data-paths"></a>Locate the unique data paths for the disks that you want to attach to the data nodes, by running the following command; replace `<disk serial number>` with the disk serial numbers that you copied in the previous step:
    ```sh
    ~# lsblk ls /dev/disk/by-id/* | grep -v part | grep <disk serial number>
    ```
    Copy the data paths for your selected disks.

    The following example shows the commands and output for attaching disks "sdc" and "sdd" from the example in the previous step; note that the command filters the results by the disks' serial numbers, as identified in the previous step &mdash; 163493421984 and 163493420112 (respectively):
    ```sh
    root@pve-intel1:~# ls /dev/disk/by-id/* | grep -v part | grep 163493421984
    /dev/disk/by-id/ata-SanDisk_SD8SB8U1T001122_163493421984

    root@pve-intel1:~# ls /dev/disk/by-id/* | grep -v part | grep 163493420112
    /dev/disk/by-id/ata-SanDisk_SD8SB8U1T001122_163493420112
    ```

4.  <a id='step-set-scsi-cfg'></a>Configure the VM options for each data disk that you want to attach, by running the following command; replace the `<...>` placeholders, as explained later in this step:
    ```sh
    dev=/dev/disk/by-id/<data-disk data path> ; qm set <data-node ID> --scsi<n> ${dev[}[,iothread=1],snapshot=0,backup=0,serial=$(lsblk -nd -o serial ${dev})
    ```

    - `<data-disk data path>` is the disk's data path, as identified in the previous step.
    - The <opt>--scsi&lt;n&gt;</opt> option configures the name of the disk's computer system interface (SCSI).
         Assign a unique  name by replacing `<n>` with a unique numeric SCSI ID.
        {{< note id="" >}}
The VM's boot disk is mapped to interface "scsi1".
Therefore, for the data disks, start with "scsi1", and then increment the SCSI ID in each command  (<opt>--scsi1</opt>, <opt>--scsi2</opt>, etc.).
        {{< /note >}}
    - Use the <opt>--serial</opt> option to pass the disk's serial numbers to the VM.
        Note that the command extracts the serial number from the provided data path, so you don't need to enter it manually.
    - You can optionally set `iothread=1` to creates a separate I/O thread per disk, which improves performance.

    The following example maps the two selected data disks from the previous example &mdash; "sdc" (data path "ata-SanDisk_SD8SB8U1T001122_163493421984") and "sdd" (data path "ata-SanDisk_SD8SB8U1T001122_163493420112") &mdash; to interfaces "scsi1" and "scsi2" on the first data node (VM ID 101):

    ```sh
    dev=/dev/disk/by-id/ata-SanDisk_SD8SB8U1T001122_163493421984 ; qm set 101 --scsi1 ${dev},iothread=1,snapshot=0,backup=0,serial=$(lsblk -nd -o serial ${dev})
    dev=/dev/disk/by-id/ata-SanDisk_SD8SB8U1T001122_163493420112 ; qm set 101 --scsi2 ${dev},iothread=1,snapshot=0,backup=0,serial=$(lsblk -nd -o serial ${dev})
    ```

<!-- //////////////////////////////////////// -->
## Verifying the Procedure {#verification}

When you're done, for each data-node VM to which you attached devices, on all relevant PVE hosts, check the devices list under <gui-label>&lt;PVE host&gt; | &lt;data-node VM&gt; | Hardware</gui-label> in the PVE GUI and verify that the data disks that you attached to the respective node VM appear correctly in the list, as demonstrated in the following image:

{{< igz-figure img="setup_proxmox_ui_data_node_hw_disks_attach_verify.png" alt="PVE GUI - data-node VM devices list" width="2000" >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/on-prem/vm/proxmox/proxmox-installation-guide.md" text="Proxmox VE installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" >}}

