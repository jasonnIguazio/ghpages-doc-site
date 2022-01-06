---
title: "Attaching Data Disks to the Data-Node VMs (vSphere)"
description: "Learn how to attach SSD data disks to Iguazio MLOps Platform VMware vSphere data-node VMs."
keywords: "attach data disks to VMware vSphere vm data nodes, attach data disks to vm data nodes, vm data-node disk attachment, attach SSDs to vm data nodes, SSD vm data-node attachment, data disks, data nodes, solid state drives, ssd, raw device mapping, rdm"
layout: "section-list"
menu:
  main:
    name:       "Attaching Data Disks to the Data Nodes"
    parent:     "deployment-vm-vmware-howtos"
    identifier: "deployment-vm-vmware-howtos-data-disks-attach"
    weight:     30
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} installation requires that you attach data disks (block-storage devices) of a specific type and minimal capacity, which are configured with raw device mapping (RDM), directly to each of the {{< product lc >}}'s data-node VMs ("the data nodes"), as outlined in this guide.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1.  <a id="prereq-admin-access-n-prev-instal-steps"></a>Administrative access to a {{< product lc >}} vSphere cluster with the required networks configuration (see {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/howto/network-cfg.md" >}}) and deployed VMs for each of the {{< product lc >}} nodes (see {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/howto/vms-deploy.md" >}}).
2.  <a id="prereq-data-node-data-disks"></a>At least two 1 TB enterprise-grade SSDs for each of the data nodes.
    Note that you need a separate set of disks for each data node.

<!-- //////////////////////////////////////// -->
## Attaching Data Disks to the Data Nodes {#attach-data-disks-to-data-nodes}

To configure RDM on local storage devices (data disks) and attach the disks to the {{< product lc >}}'s data-node VMs, execute the following procedure on each ESXi host that has deployed data-node VMs:

1. <a id='step-ssh-to-host'></a>Establish an SSH connection to the ESXi host.

2. <a id='step-find-disks'></a>List the disks (block devices) that are attached to the ESXi host by running the following command:
    ```sh
    ~# ls /vmfs/devices/disks | grep -v "vml\|:"
    ```
    In the returned output, identify the data disks that you want to attach and copy their names.
    The device names are likely to be prefixed with "t10.", as demonstrated in the following example command output:
    ```sh
    t10.NVMe____INTEL_SSDPE2MX450G7_____________________BTPF80350054450RGN__00000001
    t10.NVMe____INTEL_SSDPE2MX450G7_____________________BTPF803500GP450RGN__00000001
    t10.NVMe____INTEL_SSDPE2MX450G7_____________________BTPF8036004R450RGN__00000001
    t10.NVMe____INTEL_SSDPE2MX450G7_____________________BTPF8036004Y450RGN__00000001
    ```
    {{< warning id="no-data-stores-attach-warning" >}}
Take care not to perform any manipulations on data-store devices.
    {{< /warning >}}

3.  <a id="step-rdm-cfg"></a>For each disk that you want to attach to a data-node VM, run the following command to configure the disk as an RDM device and map it to a new RDM-pointer VMDK file in the target data-node VM directory:
    ```sh
    vmkfstools -z /vmfs/devices/disks/<disk name> /vmfs/volumes/<data store name>/<VM directory>/<VM name>.vmdk
    ```
	  For example, the following command configures and maps four SSDs to <file>ssd&lt;n&gt;.vmdk</file> files in a <dirname>data-node</dirname> VM directory in a "datastore1" data store on the ESXi host:
    ```
    vmkfstools -z /vmfs/devices/disks/t10.NVMe____INTEL_SSDPE2MX450G7_____________________BTPF80350054450RGN__00000001 /vmfs/volumes/datastore1/data-node/ssd1.vmdk
    vmkfstools -z /vmfs/devices/disks/t10.NVMe____INTEL_SSDPE2MX450G7_____________________BTPF803500GP450RGN__00000001 /vmfs/volumes/datastore1/data-node/ssd2.vmdk
    vmkfstools -z /vmfs/devices/disks/t10.NVMe____INTEL_SSDPE2MX450G7_____________________BTPF8036004R450RGN__00000001 /vmfs/volumes/datastore1/data-node/ssd3.vmdk
    vmkfstools -z /vmfs/devices/disks/t10.NVMe____INTEL_SSDPE2MX450G7_____________________BTPF8036004Y450RGN__00000001 /vmfs/volumes/datastore1/data-node/ssd4.vmdk
    ```

4. <a id="step-verify-vmdk-files"></a>Verify that the configured VMDK files were created in the target data-node VM directory:
    ```sh
    ls -la /vmfs/volumes/<data-store name>/<VM directory>/
    ```
    For example:
    ```sh
    ls -la /vmfs/volumes/datastore1/data-node/
    ```
    Following is an example command output:
    ```sh
    total 419431552
    drwxr-xr-x    1 root     root         77824 Feb 26 08:10 .
    drwxr-xr-t    1 root     root         73728 Feb 26 07:23 ..
    -rw-------    1 root     root     429496729600 Feb 26 07:24 data-node-flat.vmdk
    -rw-------    1 root     root           495 Feb 26 07:23 data-node.vmdk
    -rw-r--r--    1 root     root             0 Feb 26 07:23 data-node.vmsd
    -rwxr-xr-x    1 root     root          2391 Feb 26 07:23 data-node.vmx
    -rw-------    1 root     root     450098159616 Feb 26 08:10 ssd1-rdmp.vmdk
    -rw-------    1 root     root           494 Feb 26 08:10 ssd1.vmdk
    -rw-------    1 root     root     450098159616 Feb 26 08:10 ssd2-rdmp.vmdk
    -rw-------    1 root     root           494 Feb 26 08:10 ssd2.vmdk
    -rw-------    1 root     root     450098159616 Feb 26 08:10 ssd3-rdmp.vmdk
    -rw-------    1 root     root           494 Feb 26 08:10 ssd3.vmdk
    -rw-------    1 root     root     450098159616 Feb 26 08:10 ssd4-rdmp.vmdk
    -rw-------    1 root     root           494 Feb 26 08:10 ssd4.vmdk
    ```

5.  <a id="step-vm-ui-attach-rdm-device-to-data-node-vm"></a>Attach each RDM data disk to the respective data-node VM by using the generated VMDK file:

    1.  Log into the vSphere Web Client.
    2.  Right-click the target data-node VM and select <gui-label>Edit Settings</gui-label>.
    3.  Select: <gui-label>Add</gui-label>.
    4.  On the <gui-title>Device Type</gui-title> page, select the device type <gui-label>Hard Disk</gui-label>, and then select <gui-label>Next</gui-label>.
    5.  On the <gui-title>Select a Disk</gui-title> page, select <gui-label>Use an existing virtual disk</gui-label> to display the <gui-label>Datastore browser<gui-title> page.
    6.  Browse to the target data-node VM directory.
        <p/>
        {{< igz-figure img="setup_vmware_ui_data_node_disks_attach_vmdk_select.png" alt="add-disk-2" width="512" >}}
        <p/>
        Select the relevant VMDK file, and then choose <gui-label>Save</gui-label> on the <gui-title>Edit settings - &lt;data-node VM&gt;</gui-title> page.

<!-- //////////////////////////////////////// -->
## Verifying the Procedure {#verification}

When you're done, for each data-node VM to which you attached devices, on all relevant ESXi hosts &mdash;

1.  Open the VM console from the vSphere Web Client and run the following command to list the examples in the previous steps; you can optionally add options and filters to the command:
    ```sh
    lsblk
    ```
    You can also run the following command to check the disks' SCSI configuration:
    ```sh
    lsscsi
    ```

2.  Verify that the data disks that you attached to the data node appear in the output, and save the disks' names.
    In the following example output, the <dirname>data-node</dirname> VM directory has four attached data disks &mdash; "sdb", "sdc", sdd", and "sde":

    {{< igz-figure img="setup_vmware_data_disks_attach_cli_verify.png" alt="lsblk" width="512" >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/vmware-installation-guide.md" text="VMware vSphere installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" >}}

