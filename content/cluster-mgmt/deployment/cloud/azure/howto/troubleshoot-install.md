---
title:      "Troubleshooting Azure Cloud Installations"
linktitle:  "Troubleshooting Azure Installations"
description: "Learn how to troubleshoot problems with Iguazio MLOps Platform installations on an Azure cloud."
keywords: "troubleshooting azure installation, azure installtion troubleshooting, azure troubleshooting, azure, troubleshooting"
layout: "section-list"
menu:
  main:
    name:       "Troubleshooting Installations"
    parent:     "deployment-cloud-azure-howtos"
    identifier: "deployment-cloud-azure-howtos-troubleshooting-azure-install"
    weight:     100
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} installation is done using two sequential deployments.
The first deployment creates a virtual network (optional), an empty security group, and a small installer virtual machine (**"the installer VM"**).
After the installer VM initializes, the {{< product lc >}} installer (**"{{< getvar v="product.installer.name.lc" >}}"**) is executed by running a script that launches a Docker image (<path>{{< getvar v="product.installer.ui.image.path.install_0" >}}</path>) that contains the installer.
The script generates a system configuration and posts it to {{< getvar v="product.installer.name.lc" >}}.
{{< getvar v="product.installer.name.sc" >}} then starts the installation process according to the system configuration, and creates a second deployment that's responsible for bringing up the infrastructure.

When something goes wrong during the installation, relevant information can be found in the logs of the installation Docker container.
By default, these failure logs are automatically sent to {{< company >}} for analysis.
However, on rare occasions you might be asked to gather error information and provide it to {{< company >}}'s support team.
The following sections provide instructions for gathering the required information for such occasions.

<!-- //////////////////////////////////////// -->
## Getting Information from the Azure Portal {#azure-ui-get-info}

- [Locating your installation resource group](#azure-ui-find-resource-group)
- [Checking the deployment status and getting error logs](#azure-ui-deployment-status-n-error-logs)

<!-- ---------------------------------------- -->
### Locating Your Installation Resource Group {#azure-ui-find-resource-group}

To get deployment information from the [Azure Portal](https://portal.azure.com), you first need to locate the resource group that you used for the {{< product lc >}} installation:
in a web browser, browse to the URL of your Azure Portal and select <gui-label>Resource Groups</gui-label>.
{{< igz-figure id="img-setup_troubleshoot_azure_rg" src="/images/setup_troubleshoot_azure_rg.png" alt="Azure portal - select resource group" width="600" >}}

Under <gui-label>Resource groups</gui-label>, find and select the resource group that you used for the {{< product lc >}} installation.
Then, gather relevant information for this group, as outlined in the following sections.

<!-- ---------------------------------------- -->
### Checking the Deployment Status and Getting Error Logs {#azure-ui-deployment-status-n-error-logs}

To check the installer VM's deployment status and retrieve error logs, in the Azure portal, [find and select your installation resource group](#azure-ui-find-resource-group) and select <gui-label>Settings | Deployments</gui-label> from the resource-group menu.
{{< igz-figure id="img-setup_troubleshoot_azure_deployment" src="/images/setup_troubleshoot_azure_deployment.png" alt="Azure portal - deployments settings" width="600" >}}

Check the deployment status.
If the status is "Failed", select the <gui-label>Error details</gui-label> link, copy and save the error information, and send it to {{< company >}}'s {{< email id="support" link="1" text="support team" >}}.

<!-- //////////////////////////////////////// -->
## Gathering Logs from the {{< product tc >}} Installer ({{< getvar v="product.installer.name.tc" >}}) {#installer-logs-gather}

To gather logs from the {{< product lc >}} installer ({{< getvar v="product.installer.name.lc" >}}), you need to [create a shell connection to the installer VM](#installer-vm-connect), and then run shell commands to [gather installer logs](#installer-vm-logs-gather).

<!-- ---------------------------------------- -->
### Connecting to the Installer VM {#installer-vm-connect}

To access the installer VM and gather logs, you need to create a network connection to the installer VM from a command-line shell, using either of the following alternative methods:

- [Create an SSH session](#installer-vm-connect-ssh)
- [Create an Azure serial console](#installer-vm-connect-azure-serial-console)

{{< tip id="installer-vm-connect-ssh-recom" >}}
Whenever possible, prefer an SSH connection.
While it might be easier to create a serial console than an SSH session, because of some Azure Serial Console limitations it's more difficult to extract information when using a serial console compared to an SSH session.
{{< /tip >}}

<!-- ======================================== -->
#### Using SSH to Connect to the Installer VM {#installer-vm-connect-ssh}

To establish an SSH connection to the installer VM, you first need to get the VM's private IP address:

1.  In the Azure portal, [find and select your installation resource group](#azure-ui-find-resource-group).
2.  Select <gui-label>Overview</gui-label> from the resource-group menu.
    In the displayed resources list, look for a virtual machine whose name ends with "installer-vm" and select it to drill down. 

    {{< igz-figure id="img-setup_troubleshoot_azure_overview" src="/images/setup_troubleshoot_azure_overview.png" alt="Azure portal - resource-group overview" width="600" >}}
3.  Copy the installer VM's private IP address from the IP addresses that are shown in the top-right corner of the VM resources information:

    {{< igz-figure id="img-setup_troubleshoot_azure_ip_addresses" src="/images/setup_troubleshoot_azure_ip_addresses.png" alt="Azure portal - VM IP addresses" width="600" >}}

{{< note id="vm-ssh-security-rule-note" >}}
Depending on your network configuration, you might have to create a security-group rule to allow the SSH connection to the VM.
For more information, see {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/network-security-groups-cfg.md" >}}.
{{< /note >}}

When you have the VM's private IP address, use SSH to connect to this address with the login credentials that you received from {{< company >}}.

<!-- ======================================== -->
#### Using Azure Serial Console to Connect to the Installer VM {#installer-vm-connect-azure-serial-console}

You can use the Serial Console in the Azure portal to connect to the installer VM from a text-based serial console. 
Follow the instructions in the [Azure Serial Console overview](https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/serial-console-overview) to create a serial console.
Select the virtual machine whose name ends with "installer-vm".
When prompted for a storage account, you can use any temporary Azure storage account.

<!-- ---------------------------------------- -->
### Gathering Logs from the Installer VM {#installer-vm-logs-gather}

After you connect to the installer VM, perform the following steps from the VM command-line shell to gather installer logs:

1.  List the Docker containers on the VM:
    ```sh
    sudo docker ps -a
    ```
    The command output should show a "{{< getvar v="product.installer.ui.image.name" >}}" container.

2.  Get the logs of the "{{< getvar v="product.installer.ui.image.name" >}}" container:
    ```sh
    sudo docker logs {{% getvar v="product.installer.ui.image.name" %}}
    ```
    Copy and save the logs from the command output.

3.  Get installer logs, which are stored in a <path>{{< getvar v="product.install_azure.installer_vm_logs.path" >}}</path> file that's created by an installer-VM script:
    ```sh
    cat {{% getvar v="product.install_azure.installer_vm_logs.path" %}}
    ```
    Copy and save the logs from the command output.

When you're done, send the container and installer-VM logs to {{< company >}}'s {{< email id="support" link="1" text="support team" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/azure/installationGuides/azure-installation-guide.md" text="Azure cloud installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/network-security-groups-cfg.md" >}}

