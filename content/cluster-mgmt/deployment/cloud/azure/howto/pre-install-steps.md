---
title: "Pre-Installation Steps Using the Azure CLI"
description: "Learn how to install the Azure CLI and use it to prepare for installing the Iguazio MLOps Platform on Azure."
keywords: "azure pre-installation, azure cli, azure subscritpion ids, subscription ids"
layout: "section-list"
menu:
  main:
    parent:     "deployment-cloud-azure-howtos"
    identifier: "deployment-cloud-azure-howtos-pre-install-steps"
    weight:     10
---

Before you install an instance of the {{< product lc >}} to an Azure cloud, perform the pre-installation steps outlined in this guide.

<!-- //////////////////////////////////////// -->
## Install the Azure CLI {#install-azure-cli}

Install the Azure CLI (<file>az</file>) by following the instructions in the [Azure documentation](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
When you're done, run the following command from a command-line shell to verify that the CLI is functioning properly:
```sh
az login
```

This command should open an Azure portal login screen.
Log into your Azure account and run the following command to list all the existing resource groups under your account:
```sh
az group list
```

<!-- //////////////////////////////////////// -->
## Get Your Subscription ID {#get-subscription-id}

The {{< product lc >}} installation requires using your Azure subscriptions ID.
Your Azure Tenant can contain multiple subscriptions.
Run the following command to see the IDs of all the tenant subscriptions.
```sh
az account list --output table
```
Locate your subscription in the output, and save the subscription ID.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/azure/installationGuides/azure-installation-guide.md" text="Azure cloud installation guide" >}}

