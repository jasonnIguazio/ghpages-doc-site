---
title: "Configuring Virtual Networking (vSphere)"
description: "Learn how to configure virtual networking on Iguazio MLOps Platform VMware vSphere clusters."
keywords: "vmware vsphere netowrking, vsphere netowrking, vmware netowrking, virtual networking, virtual networks, vm networking, vsphere networks, vmware networks, platform networks, management network, data-path network, client network, interconnect network, networks, virtual network switches, virtual switches, vswitchea, network switches, network interface cards, nic, network cards, vsphere web client, vsphere ui"
layout: "section-list"
menu:
  main:
    name:       "Configuring Virtual Networking"
    parent:     "deployment-vm-vmware-howtos"
    identifier: "deployment-vm-vmware-howtos-vm-network-cfg"
    weight:     10
---
{{< comment >}}<!-- [ci-no-shcd-in-front-matter] -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

{{< text-network-ifcs >}}

To allow proper communication, you need to create and map virtual network switches (vSwitches) for these networks, as outlined in this guide.
Repeat the procedure for each VMware ESXi hypervisor host machine ("ESXi host") in your {{< product lc >}}'s vSphere cluster.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have administrative access to the {{< product lc >}}'s vSphere cluster, and that each ESXi host in the cluster has the following network interfaces:
{{< comment >}}<!-- [IntInfo] (sharonl) (11.11.20) Dany K. said this is a SW
  requirement and therefore shouldn't be added to the VM hypervisor HW spec.
--> 
{{< /comment >}}

{{< text-vm-hypervisor-network-ifcs sw="1" >}}

<!-- //////////////////////////////////////// -->
## Configuring the Management Network {#mgmt-network}

The management-network vSwitch needs to be mapped to ports that are on the management virtual LAN (VLAN).
If such a vSwitch is already configured in your environment (typically named "vSwitch0"), you may use it instead of creating an additional switch.
To create a management-network vSwitch, follow these steps:

1. Create a new vSwitch named "igz_management", and map it to the appropriate vNIC on the ESXi host.
3. Create a new port group named "igz_management", and map it to the "igz_management" vSwitch.

<!-- //////////////////////////////////////// -->
## Configuring the Data-Path (Client) Network {#client-network}

{{< note id="data-path-network-cfg-skip-note" >}}
If all the data and application node VMs reside on the same ESXi host, it may be possible to skip this step.
Consult {{< company >}}'s {{< email id="support" link="1" text="support team" >}}.
{{< /note >}}

To configure the data-path (client) network &mdash;

1.  Create a new vSwitch named "igz_client", and map it to the {{< product lc >}}'s data-path (client) NIC port on the ESXi host (see the [prerequisites](#prerequisites)).
2.  Create a new port group named "igz_client", and map it to the "igz_client" vSwitch.

<!-- //////////////////////////////////////// -->
## Configuring the Interconnect Network {#interconnect-network}

{{< note id="interconnect-network-notes" >}}
- <a id="interconnect-network-data-nodes-only-note"></a>The interconnect network is used only for data-nodes communication.
- <a id="interconnect-network-cfg-skip-note"></a>If all the data and application node VMs reside on the same ESXi host, it may be possible to skip this step.
Consult {{< company >}}'s {{< email id="support" link="1" text="support team" >}}.
{{< /note >}}

To configure the interconnect network &mdash;

1. Create a new vSwitch named "igz_interconnect", and map it to the {{< product lc >}}'s interconnect NIC port on the ESXi host (see the [prerequisites](#prerequisites)).
2. Create a new port group named "igz_interconnect", and map it to the igz_interconnect vSwitch.

<!-- //////////////////////////////////////// -->
## Verifying the Configuration {#verification}

When you're done, you can verify your configuration in the vSphere Web Client, as demonstrated in the following image:
{{< igz-figure img="setup_vmware_ui_network_cfg_result.png" alt="vSphere vSwitches" width="1024" >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/vmware-installation-guide.md" text="VMware vSphere installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" >}}

