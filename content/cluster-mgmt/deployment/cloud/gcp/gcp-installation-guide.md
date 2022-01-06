---
title:      "Installing the Platform on Google Cloud Platform (GCP)"
linktitle:  "GCP Installation Guide"
description: "Learn how to install the Iguazio MLOps Platform on an Google Cloud Platform (GCP)."
keywords: "gcp installation, gcp cloud installation, gcp outposts installation, gcp deployment, gcp cloud deployment, provazio, platform installer, gcp roles, iam roles, gcp instance profiles, gcp network, gcp vpcs, vpcs, gcp ebs, ebs, cidrs"
layout: "section-list"
menu:
  main:
    name:       "Installation Guide"
    parent:     "deployment-cloud-gcp"
    identifier: "gcp-installation-guide"
    weight:     20
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This guide outlines the required steps for installing (deploying) an instance of the {{< product full >}} ("the {{< product lc >}}") to Google Cloud Platform (GCP).
When you complete the procedure, you'll have a {{< product lc >}} instance running under your GCP account.
Install the {{< product lc >}} with the {{< getvar v="product.installer.name.lc" >}} installer, with your GCP credentials.

{{< warning id="deployment-warnings" >}}
- {{< text-deploy-cloud-provision-note >}}
- {{< text-deploy-cloud-data-node-shutdown >}}
{{< /warning >}}

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1. <a id="prereq-install-api-key-n-vault-url"></a>A {{< getvar v="product.installer.name.lc" >}} API key and a {{< getvar v="product.installer.name.lc" >}} vault URL, received from {{< company >}}.
2. Iguazio Platform version provided by Iguazio Support (for example, **{{< getvar v="product.ver.ga_build" >}}**).
3. <a id="prereq-aws-account-access"></a>Administrative access to a GCP account.
4. <a id="prereq-docker"></a>A machine running {{< url v="docker_home" k="text" link="1" >}}.
5. <a id="prereq-connectivity-or-offline-files"></a>Access to the internet, or a preloaded {{< getvar v="product.installer.name.lc" >}} Docker image (<path>{{< getvar v="product.installer.ui.image.path.stable" >}}</path>), received from {{< company >}} as an image archive (<file>{{< getvar v="product.installer.ui.image.archive" >}}</file>).
6. The Kubernetes Engine in your GCP account is enabled. 

<!-- //////////////////////////////////////// -->
## Deployment Steps {#deployment-steps}

To deploy an instance of the {{< product lc >}} to an AWS cloud, execute the following steps.

[Step 1: Create a Service Account](#step-create-service-account) | 
[Step 2: Configure the installation environment](#step-cfg-install-env) |
[Step 3: Run the {{< product lc >}} installer](#step-run-install-tool) |
[Step 4: Access the installer dashboard](#step-access-installer-ui) |
[Step 5: Choose the AWS scenario](#step-choose-scenario) |
[Step 6: Configure general parameters](#step-ui-general) |
[Step 7: Configure cluster parameters](#step-ui-cluster) |
[Step 8: Configure cloud parameters](#step-ui-cloud) |
[Step 9: Review the settings](#step-review) |
[Step 10: Wait for completion](#step-wait-ready)

<!-- ---------------------------------------- -->
### Step 1: Create a Service Account {#step-create-service-account}

Follow the {{< xref f="cluster-mgmt/deployment/cloud/gcp/howto/service-account-create.md" >}} guide to create a service account with the required credentials for performing the installation.

### Step 2: Configure the Installation Environment {#step-cfg-install-env}

Create a <path>{{< getvar v="product.install_aws.env_file.path" >}}</path> configuration file with the following environment information. Replace the `<...>` placeholders with the information for your environment:

```
dashboard:
  frontend:
    cloud_provider_regions:
      gcp:
        - <GCP Region>
client:
  infrastructure:
    gcp:
      project_name: <Full Project Name>
      zone: <Zone>
      application_credentials: |
      
      
        <JSON Key File Content>
        
        
  vault:
    api_key: <Provazio API Key>
    url: <Provazio vault URL>
provisioning:
  whitelisted_services: ["*"]
```

<dl>
  <!-- GCP Region -->
  {{< param-doc name="GCP Region" id="env-param-gcp-region" >}}
  The GCP region, for example, "us-east1".
  {{< /param-doc >}}

  <!-- Full Project Name -->
  {{< param-doc name="Full Project Name" id="env-param-full-project-name" >}}
  The full project name that the platform will be deployed in.
  {{< /param-doc >}}

  <!-- Zone -->
  {{< param-doc name="Zone" id="env-param-zone" >}}
  GCP zone , for example, "us-east1-b".
  {{< /param-doc >}}

 <!-- JSON Key File Content -->
  {{< param-doc name="JSON Key File Content" id="env-param-json" >}}
  The JSON key that was saved in {{< xref f="cluster-mgmt/deployment/cloud/gcp/howto/service-account-create.md" >}}.
  {{< /param-doc >}}

  <!-- {{< getvar v="product.installer.name.tc" >}} API Key -->
  {{< param-doc name="Provazio API Key" id="env-param-installer-api-key" >}}
  A {{< getvar v="product.installer.name.lc" >}} API key, received from {{< company >}} (see the [installation prerequisites](#prereq-install-api-key-n-vault-url)).
  {{< /param-doc >}}

  <!-- {{< getvar v="product.installer.name.tc" >}} Vault URL -->
  {{< param-doc name="Provazio Vault URL" id="env-param-installer-vault-url" >}}
  A {{< getvar v="product.installer.name.lc" >}} vault URL, received from {{< company >}} (see the [installation prerequisites](#prereq-install-api-key-n-vault-url)).
  {{< /param-doc >}}
</dl>

### Step 3: Run the {{< product tc >}} Installer {#step-run-install-tool}

Run the {{< product lc >}} installer, {{< getvar v="product.installer.name.lc" >}}, by entering the following command from a command-line shell:

```sh
docker pull {{% getvar v="product.installer.ui.image.path.stable" %}} && docker run --rm --name {{% getvar v="product.installer.ui.image.name" %}} \
    -v {{% getvar v="product.install_aws.env_file.path" %}}:{{% getvar v="product.install_aws.env_file.path" %}} \
    -e {{% getvar v="product.install_aws.envar.spec_path" %}}={{% getvar v="product.install_aws.env_file.path" %}} \
    -p {{% getvar v="product.installer.ui.port" %}}:{{% getvar v="product.installer.ui.port" %}} \
    {{% getvar v="product.installer.ui.image.path.stable" %}}
```
### Step 4: Access the Installer Dashboard {#step-access-installer-ui}

In a web browser, browse to `{{< getvar v="product.installer.ui.url" >}}` to view the {{< getvar v="product.installer.ui.name.lc" >}}.
{{< igz-figure img="gcp_provazio_1.png" alt="Installer-UI home page" width="1024" >}}

Select the plus-sign icon (<gui-label>+</gui-label>) to create a new system.

### Step 5: Choose the GCP Scenario {#step-choose-scenario}

In the <gui-title>Installation Scenario</gui-title> page, check <gui-label>GCP</gui-label>, and then click <gui-label>Next</gui-label>.

{{< igz-figure img="gcp_provazio_2.png" alt="Choose scenario" width="1024">}}

### Step 6: Configure General Parameters {#step-ui-general}

On the <gui-title>General</gui-title> page, fill in the configuration parameters, and then click <gui-label>Next</gui-label>.
{{< igz-figure img="gcp_provazio_3.png" alt="General settings" width="1024" >}}

<dl>
  <!-- System Name -->
  {{< param-doc name="System Name" id="ui-gen-param-system-name" >}}
   A {{< product lc >}} name (ID) of your choice (for example, "{{< getvar v="product.install_aws.examples.sys_id" >}}").
    The installer prepends this value to the value of the [<paramname>System Domain</paramname>](#ui-gen-param-system-domain) parameter to create the full {{< product lc >}} domain.
  {{< param-values >}}A string of 1&ndash;12 characters; can contain lowercase letters (a&ndash;z) and hyphens (-); must begin with a lowercase letter.
  {{< /param-values >}}
  {{< param-default-value >}}A randomly generated lowercase string.
  {{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- Description -->
  {{< param-doc name="Description" id="ui-gen-param-description" >}}
  A free-text string that describes the {{< product lc >}} instance.
  {{< /param-doc >}}

  <!-- System Version -->
  {{< param-doc name="System Version" id="ui-gen-param-sytsem-version" >}}
  The {{< product lc >}} version.
     Insert the release build number that you received from Iguazio (for example, "3.0_b51_20210308021033").
  {{< /param-doc >}}

  <!-- Owner Full Name -->
  {{< param-doc name="Owner Full Name" id="ui-gen-param-owner-full-name" >}}
  An owner-name string, containing the full name of the {{< product lc >}} owner, for bookkeeping.
  {{< /param-doc >}}

  <!-- Owner Email -->
  {{< param-doc name="Owner Email" id="ui-gen-param-owner-email" >}}
  An owner-email string, containing the email address of the {{< product lc >}} owner, for bookkeeping.
  {{< /param-doc >}}

  <!-- Username -->
  {{< param-doc name="Username" id="ui-gen-param-username" >}}
  The username of a {{< product lc >}} user to be created by the installation.
      This username will be used together with the configured [<paramname>password</paramname>](#ui-gen-param-user-password) to log into {{< productUI short_lc >}}.
      You can add additional users after the {{< product lc >}} is provisioned.
  {{< /param-doc >}}

  <!-- password -->
  {{< param-doc name="User Password" id="ui-gen-param-user-password" >}}
  A {{< product lc >}} password for the user generated by the installation &mdash; to be used with the configured [<paramname>username</paramname>](#ui-gen-param-username) to log into {{< product lc >}} dashboard; see the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="user-passwords" text="password restrictions" >}}.
    You can change this password after the {{< product lc >}} is provisioned.
  {{< /param-doc >}}

  <!-- Region -->
  {{< param-doc name="Region" id="ui-gen-param-region" >}}
  The region in which to install the {{< product lc >}}.
  {{< /param-doc >}}

  <!-- System Domain -->
  {{< param-doc name="System Domain" id="ui-gen-param-system-domain" >}}
  A custom {{< product lc >}} domain (for example, "customer.com").
    The installer prepends the value of the [<paramname>System Name</paramname>](#ui-gen-param-system-name) parameter to this value to create the full {{< product lc >}} domain.
  {{< /param-doc >}}

  <!-- Allocate Public IP Addresses -->
  {{< param-doc name="Allocate Public IP Addresses" id="ui-gen-param-allocate-public-ip" >}}
  Check this option to allocate public IP addresses to all of the {{< product lc >}} nodes.
  {{< /param-doc >}}

### Step 7: Configure Cluster Parameters {#step-ui-cluster}

On the <gui-title>Clusters</gui-title> page, fill in the configuration parameters, and then select <gui-label>Next</gui-label>.
For additional information and guidelines, see the {{< xref f="cluster-mgmt/deployment/cloud/gcp/howto/resources-calculate.md" text="GCP resource-calculation guide" >}} guide.
{{< igz-figure img="gcp_provazio_4.png" alt="Cluster settings" width="1024" >}}

#### Common Parameters (Data and Application Clusters) {#step-ui-cluster-common-params}

The following parameters are set for both the data and application clusters.
Node references in the parameter descriptions apply to the {{< product lc >}}'s data nodes for the data cluster and application nodes for the application cluster (GKE).

#### Data-Cluster Parameters {#step-ui-cluster-data-cluser-params}

<dl>
  <!-- # of Nodes -->
  {{< param-doc name="# of Nodes" id="ui-cluster-param-num-nodes" >}}
  The number of nodes to allocate for the cluster.
  {{< /param-doc >}}

  <!-- Node Size -->
  {{< param-doc name="Node Size" id="ui-cluster-param-node-size" >}}
  The instance type, which determines the size of the clusters' nodes.
  {{< /param-doc >}}

  <!-- Root Block Device Size -->
  {{< param-doc name="Root Block Device Size" id="ui-cluster-param-root-block-device-size" >}}
  The size of the OS disk.
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
#### Application-Cluster Parameters {#step-ui-cluster-app-cluser-params}

The following parameters are applicable only to the {{< product lc >}}'s application cluster.

<dl>
  <!-- Kubernetes Kind -->
  {{< param-doc name="Kubernetes Kind" id="ui-cluster-param-kubernetes-kind" >}}
  Leave this set to <opt>New GKE Cluster</opt>.
  {{< /param-doc >}}

<!-- Root Block Device Size -->
  {{< param-doc name="Root Block Device Size" id="ui-cluster-param-root-block-device-size_app" >}}
  The size of the OS disk.
  {{< /param-doc >}}


<!-- GKE Master Version -->
  {{< param-doc name="GKE Master Version" id="ui-gke-version" >}}
  The Kubernetes version that GCP is currently using by default to provision a GKE cluster. For instruction on how to get the current version, see the [GKE page that describes checking versions](https://cloud.google.com/kubernetes-engine/versioning#available_versions).
  {{< /param-doc >}}


  <!-- Node Groups -->
  {{< param-doc name="Node Groups" id="ui-cluster-param-app-gke-node-groups" >}}

  The installer predefines a default node group named "{{< getvar v="product.install_aws.eks.default_node_group" >}}".
  You can configure the following parameters:

  {{< igz-figure img="gcp-node-groups.png" alt="gcp_provazio_5" width="400" >}}

  - **Name**&mdash;the name of the node group
  - **Lifecycle**&mdash;the lifecycle of the node group (spot or on-demand)
  - **# of instances**&mdash;the number of instances of the node
  - **# of instances**&mdash;the minimum number of instances of the node when 
  - **# of instances**&mdash;the maximum number of instances of the node when
  - **# of GPUs**&mdash;the number of GPUs to be used in the node
  - **Custom Labels**&mdash;user defined labels for the resources in the node
  - **Custom Tags**&mdash;user defined tags for the resources in the node
  - **Size**&mdash;the desired size of the node
</dl>
  

<!--------------------------------------------> 
### Step 8: Configure Cloud Parameters {#step-ui-cloud}

 On the <gui-title>Cloud</gui-title> page, fill in the configuration parameters, and then click <gui-label>Next</gui-label>.

<dl>
  <!-- Project Name -->
  {{< param-doc name="Project Name" id="ui-cluster-param-project-name" >}}
  The full name of your GCP Project.
  {{< /param-doc >}}

<!-- Region Name -->
  {{< param-doc name="Region Name" id="ui-cluster-param-region-name" >}}
  The GCP region, for example, "us-east1".
  {{< /param-doc >}}


<!-- Zone Name -->
  {{< param-doc name="Zone Name" id="ui-cluster-param-zone-name" >}}
  GCP zone, for example, "us-east1-b".
  {{< /param-doc >}}
</dl>

<!-- VPC Network mode -->
  {{< param-doc name="VPC mode" id="ui-cloud-param-vpc-mode" >}}
  The cloud configuration configures the {{< product lc >}}'s virtual private cloud (VPC) networking.
  You can select between two alternative VPC modes:

  - <opt-b>New</opt-b> &mdash; Create a new VPC and install the {{< product lc >}} in this VPC.
  - <opt-b>Existing</opt-b> &mdash; Install the {{< product lc >}} in an existing VPC.
  {{< /param-doc >}}
    

  <!-- Whitelisted CIDRs -->
  {{< param-doc name="Whitelisted CIDRs" id="ui-cloud-param-whitelisted-cidrs" >}}
  A list of classless inter-domain routing (CIDR) addresses to be granted access to the {{< product lc >}}'s service port (for example, "{{< getvar v="product.install_aws.examples.cidrs_whitelist" >}}").
    This parameter is typically relevant when the {{< product lc >}} has public IP addresses.
    For a {{< product lc >}} without public IP addresses, you can leave this parameter empty, assuming you have access to the VPC from your network.
  {{< /param-doc >}}

  <!-- Installer CIDR -->
  {{< param-doc name="Installer CIDR" id="ui-cloud-param-installer-cidr" >}}
  The CIDR of the machine on which you're running the {{< product lc >}} installer (for example, "{{< getvar v="product.install_aws.examples.installer_cidr" >}}").
  {{< /param-doc >}}

  <!-- Allow Access from {{< company >}} Support -->
  {{< param-doc name="Allow Access from Iguazio Support" id="ui-cloud-param-allow-access-company-support" >}}
  Check this option to allow {{< company >}}'s support team to access the {{< product lc >}} nodes from the {{< company >}} network
    This parameter is applicable only when the {{< product lc >}} has public IP addresses (see the [<paramname>Allocate Public IP Addresses</paramname>](#ui-gen-param-allocate-public-ip) general-configuration parameter).
  {{< /param-doc >}}
</dl>


#### New-VPC Configuration {#step-ui-cloud-new-vpc}

 The following parameters are applicable only to the <opt>New VPC mode:</opt>

 {{< igz-figure img="gcp_provazio_6.png" alt="New VPC" width="1024" >}} 

 <dl>
  <!-- CIDR -->
  {{< param-doc name="CIDR" id="param-cidr" >}}
   The CIDR of the VPC.
 {{< /param-doc >}}

  <!-- Subnet CIDRs -->
  {{< param-doc name="Subnet CIDRs" id="param-subnet-cidrs" >}}
   The CIDRs of the VPC's subnets.
    The number of CIDRs translates to the number of subnets.
 {{< /param-doc >}}
 </dl>


#### Existing-VPC Configuration {#step-ui-cloud-existing-vpc}

The following parameters are applicable only to the <opt>Existing VPC mode:</opt>
{{< igz-figure img="gcp_provazio_7.png" alt="New VPC" width="1024" >}} 

<dl>
  <!-- VPC ID -->
  {{< param-doc name="VPC ID" id="param-vpc-id" >}}
  The ID of the VPC in which to install the {{< product lc>}}.
  {{< /param-doc >}}

  <!-- Subnet IDs -->
  {{< param-doc name="Subnet IDs" id="param-subnet-ids" >}}
  The IDs of the subnets within the VPC or of a subset of these subnets.<br/>
  {{< /param-doc >}}
</dl>

### Step 9: Review the Settings {#step-review}

On the <gui-title>Review</gui-title> page, review and verify your configuration; go back and make edits, as needed; and then select <gui-label>Create</gui-label> to provision a new instance of the {{< product lc >}}.

{{< igz-figure img="gcp_provazio_8.png" alt="Review" width="1024" >}}

### Step 10: Wait for Completion {#step-wait-ready}

It typically takes around 30&ndash;40 minutes to provision a new {{< product lc >}} instance, regardless of the cluster sizes.
You can download the provisioning logs, at any stage, by selecting <gui-label>Download logs</gui-label> from the instance's action menu.

{{< igz-figure img="gcp_provazio_9.png" alt="Download logs" width="1024" >}}

You can also follow the installation progress by tracking the {{< getvar v="product.installer.name.lc" >}} Docker container logs.

When the installation completes, you should have a running instance of the {{< product lc >}} in your cloud.
You can use the {{< getvar v="product.installer.ui.name.lc" >}} to view the installed nodes.
Then, proceed to the post-deployment steps.
{{< comment >}}<!-- [c-aws-outposts-cert-req] [IntInfo] (sharonl) (4.11.20) I
  added this at the request of Product (Gilad) to meet Amazon's requirements
  for AWS Outposts certification. (9.11.20) I removed the reference to seeing
  the nodes' status after Efi said that while you can see the installed nodes
  on the Provazio dashboard, you can't see their status (approved by Gilad). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Post-Deployment Steps {#post-deployment-steps}

When the deployment completes, follow the {{< xref f="cluster-mgmt/deployment/cloud/gcp/howto/post-install-steps.md" text="post-deployment steps" >}}.

<!-- //////////////////////////////////////// -->
## See Also
- {{< xref f="cluster-mgmt/deployment/cloud/gcp/howto/" >}}
- {{< xref f="cluster-mgmt/deployment/post-deployment-howtos/" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/gcp/gcp-hw-spec.md" >}}