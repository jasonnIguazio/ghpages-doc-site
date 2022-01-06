---
title:      "Installing the Platform on a Microsoft Azure Cloud"
linktitle:  "Azure Installation Guide"
description: "Learn how to install the Iguazio MLOps Platform on a Microsoft Azure cloud."
keywords: "azure installation, azure cloud installation, azure deployment, azure cloud deployment, provazio, platform installer"
layout: "section-list"
menu:
  main:
    name:       "Installation Guide"
    parent:     "deployment-cloud-azure-installationGuides"
    identifier: "azure-installation-guide"
    weight:     20
---
{{< comment >}}<!-- [ci-no-shcd-in-front-matter] -->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/setup/cloud/azure/installation-guides/. -->
{{< /comment >}}
{{< comment >}}<!-- [INFRA-TODO] Use data variables example values. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This guide outlines the required steps for installing (deploying) an instance of the {{< product full >}} ("the {{< product lc >}}") to a {{< url v="azure_home" k="text" link="1" >}} cloud.
When you complete the procedure, you'll have a {{< product lc >}} instance running under your Azure account.

{{< note id="troubleshooting" title="Troubleshooting" >}}
If you run into issues during the installation, check out the {{< product lc >}}'s {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/troubleshoot-install.md" text="Azure-installation troubleshooting guide" >}}.
For further assistance, contact {{< company >}}'s {{< email id="support" link="1" text="support team" >}}.
{{< /note >}}

{{< warning id="deployment-warnings" >}}
- {{< text-deploy-cloud-provision-note >}}
- {{< text-deploy-cloud-data-node-shutdown >}}
{{< /warning >}}

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1.  <a id="prereq-install-api-key-n-vault-url"></a>A {{< getvar v="product.installer.name.lc" >}} API key and a {{< getvar v="product.installer.name.lc" >}} vault URL, received from {{< company >}}.
2.  <a id="prereq-azure-subscription-id"></a>An Azure subscription ID.
3.  <a id="preq-res-template-file"></a>An Azure Resource Manager template file for deploying the {{< product lc >}} {{< download target_var="product.install_assets.azure.res_mgr_template.path" >}}<file>{{< getvar v="product.install_assets.azure.res_mgr_template.name" >}}</file>{{< /download >}}.
4.  <a id="prereq-azure-location"></a>An Azure location (for example, "eastus2") that's capable of provisioning the number and overall size of the Azure instance types (VM sizes) that you plan to use from among those supported by the {{< product lc >}}&mdash;see the {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/resources-calculate.md" text="Azure resource-calculation guide" >}}.
    The default data-node size is Standard_L16s_v2, and the default application-node size is Standard_D16s_v3.
    You can configure the application-node size in [Step 4](#step-deploy) (see the [<paramname>appVmSize</paramname>](#param-appVmSize) parameter).
4.  <a id="prereq-azure-cli"></a>A working Azure CLI.

<!-- //////////////////////////////////////// -->
## Preparing to Install {#install-reparation}

Start out by performing the preliminary steps outlined in the {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/pre-install-steps.md" >}} guide.

<!-- //////////////////////////////////////// -->
## Deployment Steps {#deployment-steps}

To deploy an instance of the {{< product lc >}} in the Azure cloud, execute the following steps from a command-line shell that has the Azure CLI (installed as part of the [pre-installation steps](#install-reparation)).

[Step 1: Accept the {{< product lc >}} terms](#step-accept-product-terms) |
[Step 2: Create an Azure resource group](#step-create-resource-group) |
[Step 3 (Optional): Create an Azure service principal](#step-create-service-principal) |
[Step 4: Deploy the {{< product lc >}}](#step-deploy)

<!-- ---------------------------------------- -->
### Step 1: Accept the {{< product tc >}} Terms {#step-accept-product-terms}

Run the following Azure CLI command to accept the {{< product lc >}} terms and conditions.
Replace `<Azure subscription ID>` with your Azure subscription ID.

```sh
az vm image terms accept \
    --offer {{% getvar v="product.install_azure.terms.plan" %}} \
    --plan {{% getvar v="product.install_azure.terms.plan" %}} \
    --publisher {{% getvar v="product.install_azure.terms.publisher" %}} \
    --subscription <Azure subscription ID>
```

<!-- ---------------------------------------- -->
### Step 2: Create an Azure Resource Group {#step-create-resource-group}

Run the following Azure CLI command to create a new Azure resource group.
Replace `<location>` with the name of your Azure location, and `<resource-group name>`  with the name of the resource group that you want to create.
```sh
az group create --location <location> --name <resource-group name>
```

For example, the following command creates a resource group named "{{< getvar v="product.install_azure.examples.resource_group" >}}" for location "eastus2":
```sh
az group create --location eastus2 --name {{% getvar v="product.install_azure.examples.resource_group" %}}
```

<!-- ---------------------------------------- -->
### Step 3 (Optional): Create an Azure Service Principal {#step-create-service-principal}

By default, the installer grants itself Contributor access to the resource group of the VNet in which the {{< product lc >}} is provisioned, and you can safely skip this step.
However, if you want to install the {{< product lc >}} in an existing VNet that resides in a different resource group than that used for the {{< product lc >}} deployment (created in [Step 2](#step-create-resource-group)), you must create an [Azure service principal](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals); save its tenant ID, subscription ID, client ID, and client secret; and provide this information to the {{< product lc >}} installer as part of the deployment (see [Step 4](#deploy-security-principal-params)).

{{< note id="service-principal-roles-note" >}}
The service principal must have `Contributor` roles in both the resource group containing the VNet and the resource group in which the {{< product lc >}} is provisioned.
{{< /note >}}

<!-- ---------------------------------------- -->
### Step 4: Deploy the {{< product tc >}} {#step-deploy}

Run the following Azure CLI command to the start deploying a new {{< product lc >}} instance.

```sh
az deployment group create \
    --resource-group <Azure Resource Group> \
    --template-file <Resource Template> \
    --name <Deployment Name>\
    --parameters <Deployment Parameters>
```

Replace the `<...>` placeholders with the information for your environment:

<dl>
  <!-- Azure Resource Group -->
  {{< param-doc name="Azure Resource Group" id="deploy-param-resource-group" >}}
  The name of the Azure resource group that you created in [Step 2](#step-create-resource-group).
  {{< /param-doc >}}

  <!-- Resource Template -->
  {{< param-doc name="Resource Template" id="deploy-param-ressource-template" >}}
  Path to your <file>{{< getvar v="product.install_assets.azure.res_mgr_template.name" >}}</file> Azure Resource Manager template file (see the [installation prerequisites](#preq-res-template-file)).
  {{< /param-doc >}}

  <!-- Deployment Name -->
  {{< param-doc name="Deployment Name" id="deploy-param-deployment-namte" >}}
  A unique Azure deployment name (for example, "{{< getvar v="product.install_azure.examples.deployment_name" >}}"), which is required by the Azure CLI.
  Note that {{< product lc >}} identifies deployment instances by their custom platform name (ID) &mdash; see the [`systemId`](#param-systemId) deployment parameter.
  {{< /param-doc >}}

  <!-- Deployment Parameters -->
  {{< param-doc name="Deployment Parameters" id="deploy-param-parameters" >}}
  Additional deployment parameters, as outlined in the following subsection.
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
#### Deployment Parameters {#step-deploy-params}

The <opt>--parameters</opt> deployment flag allows you to set additional deployment parameters for configuring various installation settings.
The parameters are passed as a string containing space-separated `<parameter name>=<parameter value>` key-value pairs.

- [Required Deployment Parameters](#deploy-required-params)
- [Optional Deployment Parameters](#deploy-optional-params)

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
##### Required Deployment Parameters {#deploy-required-params}

The following deployment parameters are required

<dl>
  <!-- apiKey -->
  {{< param-doc name="apiKey" id="deploy-param-apiKey" >}}
  A {{< getvar v="product.installer.name.lc" >}} API key, received from {{< company >}} (see the [installation prerequisites](#prereq-install-api-key-n-vault-url)).
  {{< /param-doc >}}

  <!-- vaultUrl -->
  {{< param-doc name="vaultUrl" id="deploy-param-vaultUrl" >}}
  A {{< getvar v="product.installer.name.lc" >}} vault URL, received from {{< company >}} (see the [installation prerequisites](#prereq-install-api-key-n-vault-url)).
  {{< /param-doc >}}

  <!-- adminUsername -->
  {{< param-doc name="adminUsername" id="deploy-param-adminUsername" >}}
  A username for logging into the {{< productUI short_lc >}}.
    More users can be added later.
  {{< /param-doc >}}

  <!-- adminPassword -->
  {{< param-doc name="adminPassword" id="deploy-param-adminPassword" >}}
  A user password for logging into {{< product lc >}} dashboard; see the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="user-passwords" text="password restrictions" >}}.
    This can be changed later.
  {{< /param-doc >}}
</dl>

<!-- ++++++++++++++++++++++++++++++++++++++++ -->
##### Optional Deployment Parameters {#deploy-optional-params}

<dl>
  <!-- ownerName -->
  {{< param-doc name="ownerName" id="param-ownerName" >}}
  A free-text {{< product lc >}}-owner string that contains your name or email address, for bookkeeping.
  {{< /param-doc >}}

  <!-- systemId -->
  {{< param-doc name="systemId" id="param-systemId" >}}
  A {{< product lc >}} name (ID) of your choice (for example, "{{< getvar v="product.install_azure.examples.sys_id" >}}").
    The installer prepends this value to the value of [<paramname>systemDomain</paramname>](#param-systemDomain) parameter to create the full {{< product lc >}} domain.
  {{< param-values >}}A string of 1&ndash;12 characters; can contain lowercase letters (a&ndash;z) and hyphens (-); must begin with a lowercase letter
  {{< /param-values >}}
  {{< param-default-value >}}A randomly generated lowercase string
  {{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- systemDomain -->
  {{< param-doc name="systemDomain" id="param-systemDomain" >}}
  A custom {{< product lc >}} domain (for example, "{{< getvar v="product.install_azure.examples.sys_domain" >}}").
    The installer prepends the value of the [<paramname>systemId</paramname>](#param-systemId) parameter to this value to create the full {{< product lc >}} domain.
    <br/>
    {{< param-default-value >}}`"{{< getvar v="product.install_azure.default_sys_domain" >}}"`
    {{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- vnetName -->
  {{< param-doc name="vnetName" id="param-vnetName" >}}
  The name of an existing VNet in which to provision the {{< product lc >}}.
    <br/>
    {{< param-default-value str="Behavior" >}}If this parameter isn't set, a new VNet named "&lt;system ID&gt;-vnet" is created.
    {{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- vnetSubnetName -->
  {{< param-doc name="vnetSubnetName" id="param-vnetSubnetName" >}}
  The name of the subnet in which to provision the {{< product lc >}}.
    <br/>
    {{< param-default-value str="Behavior" >}}If this parameter isn't set, a new subnet named "&lt;system ID&gt;-subnet" is created.
    {{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- vnetResourceGroup -->
  {{< param-doc name="vnetResourceGroup" id="param-vnetResourceGroup" >}}
  The resource group of the configured {{< product lc >}} VNet (see the [<paramname>vnetName</paramname>](#param-vnetName) parameter).
    To set this parameter, you must first create an Azure service principal, as outlined in [Step 3](#step-create-service-principal).
    {{< param-default-value >}}The resource group that's used for the {{< product lc >}} deployment (<nobr><opt>--resource-group</opt></nobr> [<paramname>Azure Resource Group</paramname>](#deploy-param-resource-group))
    {{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- vnetAddressPrefix -->
  {{< param-doc name="vnetAddressPrefix" id="param-vnetAddressPrefix" >}}
  The CIDR of the newly created VNet; applicable only when the [<paramname>vnetName</paramname>](#param-vnetName) parameter isn't set (resulting in the creation of a new VNet).
    <br/>
    {{< param-default-value >}}`"{{< getvar v="product.install_azure.default_installer_cidr" >}}"`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- numDataNodes -->
  {{< param-doc name="numDataNodes" id="param-numDataNodes" >}}
  The number of {{< product lc >}} data nodes (VMs).
    <br/>
    {{< param-values >}}`1` or `3`{{< /param-values >}}
  {{< /param-doc >}}

  <!-- numAppNodes -->
  {{< param-doc name="numAppNodes" id="param-numAppNodes" >}}
  The number of {{< product lc >}} application nodes (VMs).
    <br/>
    {{< param-values >}}`1`&ndash;`N`{{< /param-values >}}
  {{< /param-doc >}}

  <!-- appVmSize -->
  {{< param-doc name="appVmSize" id="param-appVmSize" >}}
  Application-node size, as an Azure general-purpose VM size.
   For the supported sizes, see the {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/resources-calculate.md" text="Azure resource-calculation guide" >}}.
    <br/>
    {{< param-default-value >}}`Standard_D16s_v3`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- whitelistedCidrs -->
  {{< param-doc name="whitelistedCidrs" id="param-whitelistedCidrs" >}}
  A list of classless inter-domain routing (CIDR) addresses to be granted access to the {{< product lc >}}'s service port (for example, "{{< getvar v="product.install_azure.examples.cidrs_whitelist" >}}").
    This parameter is typically relevant when the {{< product lc >}} has public IP addresses (when [<paramname>allocatePublicIpAddresses</paramname>](#param-allocatePublicIpAddresses) is set to `true`).
    <br/>
    {{< param-default-value >}}An empty list (`""`){{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- allocatePublicIpAddresses -->
  {{< param-doc name="allocatePublicIpAddresses" id="param-allocatePublicIpAddresses" >}}
  Set to `true` to allocate public IP addresses for all {{< product lc >}} nodes (VMs).
    <br/>
    {{< param-default-value >}}`false`{{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- whitelistIguazioNetwork -->
  {{< param-doc name="whitelistIguazioNetwork" id="param-whitelistIguazioNetwork" >}}
  Set to `true` to allow {{< company >}}'s support team to access the {{< product lc >}} nodes from the {{< company >}} network.
    This parameter is applicable only when the {{< product lc >}} has public IP addresses (see the [<paramname>allocatePublicIpAddresses</paramname>](#param-allocatePublicIpAddresses) parameter).
    {{< param-default-value >}}`false`{{< /param-default-value >}}
  {{< /param-doc >}}

 <!-- appClusterKubernetesKind -->
  {{< param-doc name="appClusterKubernetesKind" id="param-appClusterKubernetesKind" >}}
  This parameter determines the type of Kubernetes cluster. There are two values that can be used:
    
  - **vanilla**&mdash;a standard AKS deployment
  - **aks**&mdash;a versioned deployment of AKS
  
  {{< note id="note" title="Note" >}}
  - Do not include this parameter if you are using a **vanilla** installation.
  - If you selected **AKS**, you must use the **appClusterKubernetesVersion** parameter.
  {{< /note >}}
  {{< /param-doc >}}

  <!-- appClusterKubernetesVersion -->
  {{< param-doc name="appClusterKubernetesVersion" id="param-appClusterKubernetesVersion" >}}
  The version currently supported by AKS.  
  {{< /param-doc >}}

</dl>

<!-- *************** -->
{{< small-heading id="deploy-security-principal-params" >}}Security-Principal Parameters{{< /small-heading >}}

If you created a service principal (see [Step 3](#step-create-service-principal)), you must also set the following parameters:

<dl>
  <!-- spTenantId -->
  {{< param-doc name="spTenantId" id="param-spTenantId" >}}
  The tenant ID of the service principal.
  {{< /param-doc >}}

  <!-- spSubscriptionId -->
  {{< param-doc name="spSubscriptionId" id="param-spSubscriptionId" >}}
  The subscription ID of the service principal (your Azure subscription ID).
  {{< comment >}}<!-- [IntInfo] (sharonl) 23.11.20) I added the reference to
    the Azure subscription Adi, in consultation with Eran D. (R&D) and Efi
    (Support), because Efi said the wasn't sure what to insert here (even
    though this step is explicitly dependent on the optional creation of a
    service principle, in Step 3, and we say in that step to save the ID of the
    service principle); Eran confirmed that the ID of the service principle
    will always the user's Azure service ID (which we mention elsewhere in this
    document). -->
  {{< /comment >}}
  {{< /param-doc >}}

  <!-- spClientId -->
  {{< param-doc name="spClientId" id="param-spClientId" >}}
  The client iD of the service principal.
  {{< /param-doc >}}

  <!-- spClientSecret -->
  {{< param-doc name="spClientSecret" id="param-spClientSecret" >}}
  The client secret of the service principal.
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
#### Example {#deploy-example}

```sh
az deployment group create \
    --resource-group {{% getvar v="product.install_azure.examples.resource_group" %}} \
    --template-file /home/installer/{{% getvar v="product.install_assets.azure.res_mgr_template.name" %}}  \
    --name {{% getvar v="product.install_azure.examples.deployment_name" %}} \
    --parameters apiKey='{{% getvar v="product.installer.examples.api_key" %}}' vaultUrl='{{% getvar v="product.installer.examples.vault_url_trial" %}}' adminUsername=admin adminPassword=mypassword ownerName='John Doe' systemId={{% getvar v="product.install_azure.examples.sys_id" %}} systemDomain={{% getvar v="product.install_azure.examples.sys_domain" %}} allocatePublicIpAddresses=true whitelistIguazioNetwork=true
```

<!-- ======================================== -->
#### Deployment Note {#deployment-note}

The deployment requires the command-line shell to remain open only until a "Running" message is displayed (typically, approximately 10 minutes after running the deployment command).
The deployment takes approximately two hours.
The Azure CLI has a fixed timeout period of 1.5 hours, so the command line shows a timeout indication during the deployment process, even though the deployment is still running.
This is the expected behavior and no action is needed on your part.
After {{< company >}}'s support engineers confirm that the deployment completed successfully, they will guide you on how to log into the {{< product lc >}}, and {{< company >}}'s customer-success team will initiate a getting-started session to help you with your first steps.

<!-- //////////////////////////////////////// -->
## Post-Deployment Steps {#post-deployment-steps}

When the deployment completes, follow the {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/post-install-steps.md" text="post-deployment steps" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/azure/howto/" >}}
- {{< xref f="cluster-mgmt/deployment/post-deployment-howtos/" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/azure/azure-hw-spec.md" >}}

