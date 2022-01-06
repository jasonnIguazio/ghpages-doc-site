---
title: "Configuring Virtual Networking (PVE)"
description: "Learn how to configure virtual networking on Iguazio MLOps Platform Proxmox VE (PVE) clusters."
keywords: "proxmox ve networking, pve networking, proxmox networking, virtual networking, virtual networks, vm networking, proxmox ve networks, pve networks, proxmox networks, networks, platform networks, management network, data-path network, client network, interconnect network, networks, virtual network bridges, network briges, linux bridges, virtual network switches, virtual switches, vswitchea, network switches, network interface cards, nic, network cards, proxmox ve gui, pve gui"
layout: "section-list"
menu:
  main:
    name:       "Configuring Virtual Networking"
    parent:     "deployment-vm-proxmox-howtos"
    identifier: "deployment-vm-proxmox-howtos-vm-network-cfg"
    weight:     10
---
{{< comment >}}<!-- [ci-no-shcd-in-front-matter] -->
{{< /comment >}}
{{< comment >}}<!-- [ci-no-shcd-in-front-matter] -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

{{< text-network-ifcs >}}

To allow proper communication, you need to create and map network bridges for these networks, as outlined in this guide.
Repeat the procedure for each Proxmox VE hypervisor host machine ("PVE host") in your {{< product lc >}}'s PVE cluster.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have administrative access to the {{< product lc >}}'s PVE cluster, and that each PVE host in the cluster has the following network interfaces:
{{< comment >}}<!-- [IntInfo] (sharonl) (11.11.20) Dany K. said this is a SW
  requirement and therefore shouldn't be added to the VM hypervisor HW spec.
--> 
{{< /comment >}}

{{< text-vm-hypervisor-network-ifcs sw="1" >}}

<!-- //////////////////////////////////////// -->
## Configuring the Management Network {#mgmt-network}

The management network is usually connected to the default existing bridge "vmbr0", and is mapped to the management port.
It's recommended that you add a comment marking this interface as "management":
in the PVE GUI, choose the relevant PVE host, select <gui-label>System | Network</gui-label>, and edit "vmbr0" to add the comment.

<!-- //////////////////////////////////////// -->
## Configuring the Data-Path (Client) Network {#client-network}

To configure the data-path (client) network, in the PVE GUI, choose the relevant PVE host and select <gui-label>System | Network</gui-label>.
Create a new Linux bridge named "vmbr1", add the comment "client", and map the bridge to the {{< product lc >}}'s data-path (client) NIC port on the host (see the [prerequisites](#prerequisites)).
There's no need to configure any IPs for the bridge.
{{< igz-figure img="setup_proxmox_ui_data_path_network_cfg.png" alt="PVE GUI - data-path network Linux-bridge configuration" width="600" >}}

<!-- //////////////////////////////////////// -->
## Configuring the Interconnect Network {#interconnect-network}

{{< note id="interconnect-network-data-nodes-only-note" >}}
The interconnect network is used only for data-nodes communication.
{{< /note >}}

To configure the interconnect network, in the PVE GUI, choose the relevant PVE host and select <gui-label>System | Network</gui-label>.
Create a new Linux bridge named "vmbr2", add the comment "interconnect", and map the bridge to the {{< product lc >}}'s interconnect NIC port on the host (see the [prerequisites](#prerequisites)).
There's no need to configure any IPs for the bridge.
In the case of a single data-node, there's also no need to map the bridge to any external interface.
{{< igz-figure img="setup_proxmox_ui_interconnect_network_cfg.png" alt="PVE GUI - interconnect-need Linux-bridge configuration" width="600" >}}

<!-- //////////////////////////////////////// -->
## Restarting the PVE Host {#restart-hypervisor-host}

When you're done, restart the PVE hypervisor host machine ("the PVE host") to apply your changes.

<!-- //////////////////////////////////////// -->
## Verifying the Configuration {#verification}

When you're done (after the host has restarted), you can verify your configuration in the PVE GUI, as demonstrated in the following image; (the IP addresses and interface names might be different in your configuration):
{{< igz-figure img="setup_proxmox_ui_network_cfg_result.png" alt="PVE GUI - configuration verification" width="2000" >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/on-prem/vm/proxmox/proxmox-installation-guide.md" text="Proxmox VE installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" >}}

