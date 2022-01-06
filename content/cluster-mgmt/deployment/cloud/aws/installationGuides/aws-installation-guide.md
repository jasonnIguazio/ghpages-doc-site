---
title:      "Installing the Platform on an AWS Cloud"
linktitle:  "AWS Installation Guide"
description: "Learn how to install the Iguazio MLOps Platform on an Amazon Web Services (AWS) cloud or AWS Outposts."
keywords: "aws installation, aws cloud installation, aws outposts installation, aws deployment, aws cloud deployment, provazio, platform installer, aws roles, iam roles, aws instance profiles, aws network, aws vpcs, vpcs, aws ebs, ebs, cidrs"
layout: "section-list"
menu:
  main:
    name:       "Installation Guide"
    parent:     "deployment-cloud-aws"
    identifier: "aws-installation-guide"
    weight:     20
---
{{< comment >}}<!-- [ci-no-shcd-in-front-matter] -->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/setup/cloud/aws/installation-guides/aws-installation-guide.md. -->
{{< /comment >}}
{{< comment >}}<!-- [INFRA-TODO] Use data variables example values. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This guide outlines the required steps for installing (deploying) an instance of the {{< product full >}} ("the {{< product lc >}}") to an {{< url v="aws_home" k="text" link="1" >}} cloud (including {{< url v="aws_outposts_home" k="text" link="1" >}}).
When you complete the procedure, you'll have a {{< product lc >}} instance running under your AWS account.
The installation is done by using the {{< product lc >}} installer &mdash; {{< getvar v="product.installer.name.lc" >}} &mdash; with your AWS credentials.

{{< note id="install-notes" >}}
- The deployment procedure requires proficiency in {{< url v="aws_sysops_home" k="text" link="1" >}}, and is typically completed in 1&ndash;2 hours.
- Do not use the AWS root user for any deployment operations.
{{< comment >}}<!-- [c-aws-outposts-cert-req] [IntInfo] (sharonl) (3.11.20)
  These notes were added at the request of Product (Gilad) to facilitate
  passing Amazon's AWS Outposts review. See the "AWS Installation Guide" email
  thread from 3.11.20. -->
{{< /comment >}}
{{< /note >}}

{{< warning id="deployment-warnings" >}}
- {{< text-deploy-cloud-provision-note >}}
- {{< text-deploy-cloud-data-node-shutdown >}}
{{< /warning >}}

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1.  <a id="prereq-install-api-key-n-vault-url"></a>A {{< getvar v="product.installer.name.lc" >}} API key and a {{< getvar v="product.installer.name.lc" >}} vault URL, received from {{< company >}}.
2.  <a id="prereq-aws-account-access"></a>Administrative access to an AWS account.
3.  <a id="prereq-aws-amis-cfg"></a>Confirmation from {{< company >}}'s support team that {{< product lc >}} Amazon Machine Images (AMIs) were configured with proper permissions for your AWS account.
4.  <a id="prereq-docker"></a>A machine running {{< url v="docker_home" k="text" link="1" >}}.
5.  <a id="prereq-connectivity-or-offline-files"></a>Access to the internet, or a preloaded {{< getvar v="product.installer.name.lc" >}} Docker image (<path>{{< getvar v="product.installer.ui.image.path.stable" >}}</path>), received from {{< company >}} as an image archive (<file>{{< getvar v="product.installer.ui.image.archive" >}}</file>).

<!-- //////////////////////////////////////// -->
## Deployment Steps {#deployment-steps}

To deploy an instance of the {{< product lc >}} to an AWS cloud, execute the following steps.

[Step 1: Create an IAM user](#step-create-iam-user) |
[Step 2: Create an AWS instance profile](#step-create-aws-instance-profile) |
[Step 3: Configure the installation environment](#step-cfg-install-env) |
[Step 4: Run the {{< product lc >}} installer](#step-run-install-tool) |
[Step 5: Access the installer dashboard](#step-access-installer-ui) |
[Step 6: Choose the AWS scenario](#step-choose-scenario) |
[Step 7: Configure general parameters](#step-ui-general) |
[Step 8: Configure cluster parameters](#step-ui-cluster) |
[Step 9: Configure cloud parameters](#step-ui-cloud) |
[Step 10: Review the settings](#step-review) |
[Step 11: Wait for completion](#step-wait-ready)


<!-- ---------------------------------------- -->
### Step 1: Create an IAM User {#step-create-iam-user}

Follow the {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/iam-user-create.md" >}} guide to create a restricted AWS IAM user with the required credentials for performing the installation.
Note that the IAM user is required only during the installation, and can be deleted after the installation, as explained in the {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/post-install-steps.md" a="delete-iam-user" text="post-deployment how-to" >}}.
{{< comment >}}<!-- [c-aws-outposts-cert-req] [c-aws-install-delete-iam-user]
  [IntInfo] (sharonl) (4.11.20) See additional information in the referenced
  post-installation-step how-to doc section. -->
{{< /comment >}}


<!-- ---------------------------------------- -->
### Step 2: Create an AWS Instance Profile {#step-create-aws-instance-profile}

Follow the {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/iam-role-n-instance-profile-create.md" >}} guide to create an AWS instance profile with a restricted IAM role that allows the {{< product lc >}}'s Amazon Elastic Compute Cloud (EC2) instances to call the AWS API.

<!-- ---------------------------------------- -->
### Step 3: Configure the Installation Environment {#step-cfg-install-env}

Create a <path>{{< getvar v="product.install_aws.env_file.path" >}}</path> configuration file with the following environment information.

```
dashboard:
  frontend:
    cloud_provider_regions:
      aws:
      - <AWS Region>

client:
  infrastructure:
    ec2:
      access_key_id: <Access Key ID>
      secret_access_key: <Secret Access Key>
      data_cluster_instance_profile: {{% getvar v="product.install_aws.iam_role_default_policy.name" %}}
      app_cluster_instance_profile: {{% getvar v="product.install_aws.iam_role_default_policy.name" %}}

  vault:
    api_key: <{{% getvar v="product.installer.name.tc" %}} API Key>
    url: <{{% getvar v="product.installer.name.tc" %}} vault URL>

provisioning:
  whitelisted_services: ["*"]
```
{{< comment >}}<!-- [InfraInfo] (sharonl) I used the `highlight` shortcode with
  language `none` instead of "yaml" syntax highlighting to prevent incorrect
  highlighting of the <..> placeholders. (Fenced code without any language
  currently produces weird code formatting.) This could also have been avoided
  by using another placeholder syntax, such as [...], but I decide to use <...>
  as it's our standard (including in other locations in this doc) and no
  special YAML formatting is applied to the code block anyway (when using
  another placeholder syntax). -->
{{< /comment >}}

Replace the `<...>` placeholders with the information for your environment:

<dl>
  <!-- AWS Region -->
  {{< param-doc name="AWS Region" id="env-param-aws-region" >}}
  A list of one or more AWS regions that you'd like to choose from (for example, "us-east-2").
  {{< /param-doc >}}

  <!-- Access Key ID -->
  {{< param-doc name="Access Key ID" id="env-param-access-key-id" >}}
  The AWS Access Key ID for the IAM user created in [Step 1](#step-create-iam-user).
  {{< /param-doc >}}

  <!-- Secret Access Key -->
  {{< param-doc name="Secret Access Key" id="env-param-secrent-access-key" >}}
  The AWS Secret Access Key for the IAM user created in [Step 1](#step-create-iam-user).
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

<!-- ---------------------------------------- -->
### Step 4: Run the {{< product tc >}} Installer {#step-run-install-tool}

Run the {{< product lc >}} installer, {{< getvar v="product.installer.name.lc" >}}, by running the following command from a command-line shell:

```sh
docker pull {{% getvar v="product.installer.ui.image.path.stable" %}} && docker run --rm --name {{% getvar v="product.installer.ui.image.name" %}} \
    -v {{% getvar v="product.install_aws.env_file.path" %}}:{{% getvar v="product.install_aws.env_file.path" %}} \
    -e {{% getvar v="product.install_aws.envar.spec_path" %}}={{% getvar v="product.install_aws.env_file.path" %}} \
    -p {{% getvar v="product.installer.ui.port" %}}:{{% getvar v="product.installer.ui.port" %}} \
    {{% getvar v="product.installer.ui.image.path.stable" %}}
```

<!-- ---------------------------------------- -->
### Step 5: Access the Installer Dashboard {#step-access-installer-ui}

In a web browser, browse to `{{< getvar v="product.installer.ui.url" >}}` to view the {{< getvar v="product.installer.ui.name.lc" >}}.
{{< igz-figure img="setup_aws_installer_ui_main.png" alt="Installer-UI home page" width="1024" >}}

Select the plus-sign icon (<gui-label>+</gui-label>) to create a new system.
{{< comment >}}<!-- [InfraInfo] (sharonl) (8.6.20) I didn't use a UI icon font
  (<span class="igz-icon-ui-add"></span>) because the fonts in the installation
  UI are different than in the product UI and it wasn't worth adding the
  installation-UI fonts, at least at this stage. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Step 6: Choose the AWS Scenario {#step-choose-scenario}

On the <gui-title>Installation Scenario</gui-title> page, check <gui-label>AWS</gui-label>, and then select <gui-label>Next</gui-label>.
{{< igz-figure img="setup_aws_installer_ui_installation_scenario.png" alt="Choose scenario" width="1024" >}}

<!-- ---------------------------------------- -->
### Step 7: Configure General Parameters {#step-ui-general}

On the <gui-title>General</gui-title> page, fill in the configuration parameters, and then select <gui-label>Next</gui-label>.
{{< igz-figure img="setup_aws_installer_ui_general.png" alt="General settings" width="1024" >}}

<dl>
  <!-- System Name -->
  {{< param-doc name="System Name" id="ui-gen-param-system-name" >}}
   A {{< product lc >}} name (ID) of your choice (for example, "{{< getvar v="product.install_aws.examples.sys_id" >}}").
    The installer prepends this value to the value of [<paramname>System Domain</paramname>](#ui-gen-param-system-domain) parameter to create the full {{< product lc >}} domain.
  {{< param-values >}}A string of 1&ndash;12 characters; can contain lowercase letters (a&ndash;z) and hyphens (-); must begin with a lowercase letter
  {{< /param-values >}}
  {{< param-default-value >}}A randomly generated lowercase string
  {{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- Description -->
  {{< param-doc name="Description" id="ui-gen-param-description" >}}
  A free-text string that describes the {{< product lc >}} instance.
  {{< /param-doc >}}

  <!-- System Version -->
  {{< param-doc name="System Version" id="ui-gen-param-sytsem-version" >}}
  The {{< product lc >}} version.
    This is auto-populated based on the AMIs that you have access to in the region, so make sure to set the [<paramname>Region</paramname>](#ui-gen-param-region) parameter.
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
  Check this option to allocate public IP addresses to all of the {{< product lc >}} nodes (EC2 instances).
  {{< /param-doc >}}

  <!-- Termination Protection -->
  {{< param-doc name="Termination Protection" id="ui-gen-param-termination-protection" >}}
  The protection level for terminating the {{< product lc >}} installation from the installer dashboard.
  {{< /param-doc >}}
</dl>

<!-- ---------------------------------------- -->
### Step 8: Configure Cluster Parameters {#step-ui-cluster}

On the <gui-title>Clusters</gui-title> page, fill in the configuration parameters, and then select <gui-label>Next</gui-label>.
For additional information and guidelines, see the {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/resources-calculate.md" text="AWS resource-calculation guide" >}} guide.
{{< igz-figure img="setup_aws_installer_ui_clusters.png" alt="Cluster settings" width="1024" >}}

<!-- ======================================== -->
#### Common Parameters (Data and Application Clusters) {#step-ui-cluster-common-params}

The following parameters are set for both the data and application clusters.
Node references in the parameter descriptions apply to the {{< product lc >}}'s data nodes for the data cluster and application nodes for the application cluster.

<dl>
  <!-- # of Nodes -->
  {{< param-doc name="# of Nodes" id="ui-cluster-param-num-nodes" >}}
  The number of nodes (EC2 instances) to allocate for the cluster.
  {{< /param-doc >}}

  <!-- Node Size -->
  {{< param-doc name="Node Size" id="ui-cluster-param-node-size" >}}
  The EC2 instance type, which determines the size of the clusters' nodes.
  {{< /param-doc >}}

  <!-- Root Block Device Type -->
  {{< param-doc name="Root Block Device Type" id="ui-cluster-param-root-block-device-type" >}}
  The [Amazon Elastic Block Store (EBS) type](https://aws.amazon.com/ebs/volume-types/) for the control plane.
    <br/>
    {{< param-default-value >}}EBS General Purpose SSD (gp2), which provides a good balance between performance and cost.
      Note that the data plane uses high-speed NVMe storage.
    {{< /param-default-value >}}
  {{< /param-doc >}}

  <!-- Root Block Device Size -->
  {{< param-doc name="Root Block Device Size" id="ui-cluster-param-root-block-device-size" >}}
  The size of the EBS for the control plane.
  {{< /param-doc >}}

  <!-- Storage Encryption Kind -->
  {{< param-doc name="Storage Encryption Kind" id="ui-cluster-param-storage-encryption-kind" tp="1">}}
  The type of encryption to be applied.
  {{< /param-doc >}}
</dl>

<!-- ======================================== -->
#### Application-Cluster Parameters {#step-ui-cluster-app-cluser-params}

The following parameters are applicable only to the {{< product lc >}}'s application cluster.

{{< note id="eks-app-cluster-note" title="EKS Application-Cluster Note" >}}
The following instructions are specific to deployment of a managed vanilla application cluster.
To deploy an Amazon Elastic Kubernetes Service (Amazon EKS) application cluster, follow the {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/eks-app-cluster-deploy.md" >}} guide instead.
{{< /note >}}

<dl>
  <!-- Kubernetes Kind -->
  {{< param-doc name="Kubernetes Kind" id="ui-cluster-param-kubernetes-kind" >}}
  Leave this set to <opt>New Vanilla Cluster ({{< company >}} Managed)</opt>.
  {{< /param-doc >}}
</dl>

<!-- ---------------------------------------- -->
### Step 9: Configure Cloud Parameters {#step-ui-cloud}

On the <gui-title>Cloud</gui-title> page, fill in the configuration parameters, and then select <gui-label>Next</gui-label>.

<dl>
  <!-- VPC mode -->
  {{< param-doc name="VPC mode" id="ui-cloud-param-vpc-mode" >}}
  The cloud configuration configures the {{< product lc >}}'s virtual private cloud (VPC) networking.
  You can select between two alternative VPC modes:

  - <opt-b>New</opt-b> &mdash; Create a new VPC and install the {{< product lc >}} in this VPC.
  - <opt-b>Existing</opt-b> &mdash; Install the {{< product lc >}} in an existing VPC.
  {{< /param-doc >}}
</dl>

The following optional parameters are applicable to both VPC modes; (see the example UI screen shots for the different VPC-mode configurations later in this step):

<dl>
  <!-- Region Name -->
  {{< param-doc name="Region Name" id="ui-cloud-param-region-name" >}}
  Overrides the value of the [<paramname>Region</paramname>](#ui-gen-param-region)  general-configuration parameter.
  {{< /param-doc >}}

  <!-- Access Key ID -->
  {{< param-doc name="Access Key ID" id="ui-cloud-param-access-key-id" >}}
  Overrides the value of the [<paramname>Access Key ID</paramname>](#env-param-access-key-id) environment-configuration parameter.
  {{< note id="ui-cloud-param-access-key" >}}
  This parameter should typically not be set.
  {{< /note >}}
  {{< /param-doc >}}

  <!-- Secret Access Key -->
  {{< param-doc name="Secret Access Key" id="ui-cloud-param-secret-access-key" >}}
  Overrides the value of the [<paramname>Secret Access Key](#env-param-secrent-access-key) environment-configuration parameter.
  {{< note id="ui-cloud-param-secret-access-key-note" >}}
  This parameter should typically not be set.
  If you find the need to set it, consult {{< company >}} personnel first.
  {{< /note >}}
  {{< /param-doc >}}

  <!-- Verbose Provisioning -->
  {{< param-doc name="Verbose Provisioning" id="ui-cloud-param-version-provisioning" >}}
  Configures very verbose logs.
  {{< note id="ui-cloud-param-version-provisioning-note" >}}
  Leave this parameter unchecked unless instructed otherwise by {{< company >}} personnel.
  {{< /note >}}
  {{< /param-doc >}}

  <!-- Placement Kind -->
  {{< param-doc name="Placement Kind" id="ui-cloud-param-placement-kind" >}}
  An [AWS Placement Group](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html).
  {{< note id="ui-cloud-param-placement-kind" >}}
  Don't change the default value of this parameter unless instructed otherwise by {{< company >}} personnel.
  {{< /note >}}
  {{< /param-doc >}}
</dl>

<!-- *************** -->
{{< small-heading id="ui-cloud-params-security-groups" >}}Security-Group Parameters{{< /small-heading >}}

The following parameters are used for configuring network security groups.
For more information, see the {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/network-security-groups-cfg.md" text="AWS network security-groups configuration" >}} guide.

<dl>
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

In addition to the common parameters, there are parameters that are specific to the selected VPC mode:

- [New-VPC configuration](#step-ui-cloud-new-vpc)
- [Existing-VPC configuration](#step-ui-cloud-existing-vpc)

<!-- ======================================== -->
#### New-VPC Configuration {#step-ui-cloud-new-vpc}


The following parameters are applicable only to the <opt>New</opt> [VPC mode](#ui-cloud-param-vpc-mode):

<dl>
  <!-- CIDR -->
  {{< param-doc name="CIDR" id="param-cidr" >}}
  The CIDR of the VPC.
  {{< /param-doc >}}

  <!-- Subnet CIDRs -->
  {{< param-doc name="Subnet CIDRs" id="param-subnet-cidrs" >}}
  The CIDRs of the VPC's subnets.
    The number of CIDRs translates to the number of subnets.

    {{< note id="num-subnets-n-azs-note" >}}
For a managed vanilla application cluster, you can currently configure only one subnet, which ensures that all {{< product lc >}} nodes use the same availability zone.
A deployment with a single availability zone allows minimal latency and doesn't incur data-transfer costs.
When deploying an [EKS application cluster](#eks-app-cluster-note), you need to configure two subnets (for two availability zones) to fulfill EKS requirements; however, the {{< product lc >}} uses only the first configured subnet.
To use multiple availability zones (via multiple subnets), contact {{< company >}} for a quote.
Note that while deployment with multiple availability zones offers improved availability when an availability zone is down, it has a performance impact and entails high network-utilization costs, and therefore might not fit your requirements.
{{< comment >}}<!-- [c-aws-outposts-cert-req] [c-aws-num-subnets-n-azs-note]
  (sharonl) (4.11.20) I edited the doc here and for the existing-VPC config
  Subnet IDs parameter to indicate the support for a single subnet, and I
  replaced the installer dashboard screen shots at the end of both subsections
  to show a single-subnet configuration, after it was established with Eran D.
  that currently you can only configure a single subnet in the Provazio
  dashboard; (Maor said that previously if you configured multiple subnets we
  only used the first one for all platform nodes). I also edited the doc to
  refer to single and multiple availability deployments, which was requested by
  Product (Gilad) to facilitate passing the AWS Outposts review. The edits were
  done in consultation with Product (Gilad), R&D (Orit & Eran D.), and Support
  (Maor) and approved by Gilad and Orit.
  In consultation with Eran D. and Gilad, it was decide there's no need to edit
  the subnet-public-ips-alloc-cfg.md how-to to refer only to a single subnet.
-->
{{< /comment >}}
    {{< /note >}}
  {{< /param-doc >}}
</dl>

<p/>
{{< igz-figure img="setup_aws_installer_ui_cloud_vpc_new.png" alt="New VPC" width="1024" >}}

<!-- ======================================== -->
#### Existing-VPC Configuration {#step-ui-cloud-existing-vpc}

The following parameters are applicable only to the <opt>Existing</opt> [VPC mode](#ui-cloud-param-vpc-mode):

<dl>
  <!-- VPC ID -->
  {{< param-doc name="VPC ID" id="param-vpc-id" >}}
  The ID of the VPC in which to install the {{< product lc>}}.
  {{< /param-doc >}}

  <!-- CIDR -->
  {{< param-doc name="CIDR" id="param-cidr" >}}
  The IP address of the CIDR of the chosen VPC (as some VPCs have multiple CIDRs).
  {{< /param-doc >}}

  <!-- Subnet IDs -->
  {{< param-doc name="Subnet IDs" id="param-subnet-ids" >}}
  The IDs of the subnets within the VPC or of a subset of these subnets.<br/>
  The installation currently supports two subnets for an EKS application cluster and only a single subnet otherwise.
  For details, see the [note](#num-subnets-n-azs-note) for the <paramname>Subnet CIDRs</paramname> new-VPC configuration parameter.
  {{< comment >}}<!-- [c-aws-num-subnets-n-azs-note] -->
  {{< /comment >}}
  {{< /param-doc >}}

  <!-- Security Group Mode -->
  {{< param-doc name="Security Group Mode" id="param-security-groups-mode" >}}
  Leave this set to <opt>New</opt>.
  {{< /param-doc >}}
</dl>

<p/>
{{< igz-figure img="setup_aws_installer_ui_cloud_vpc_existing.png" alt="Existing VPC" width="1024" >}}

<!-- ---------------------------------------- -->
### Step 10: Review the Settings {#step-review}

On the <gui-title>Review</gui-title> page, review and verify your configuration; go back and make edits, as needed; and then select <gui-label>Create</gui-label> to provision a new instance of the {{< product lc >}}.

{{< igz-figure img="setup_aws_installer_ui_review.png" alt="Review" width="1024" >}}

<!-- ---------------------------------------- -->
### Step 11: Wait for Completion {#step-wait-ready}

Provisioning a new {{< product lc >}} instance typically takes around 30&ndash;40 minutes, regardless of the cluster sizes.
You can download the provisioning logs, at any stage, by selecting <gui-label>Download logs</gui-label> from the instance's action menu.

{{< igz-figure img="setup_aws_installer_ui_download_logs.png" alt="Download logs" width="1024" >}}

You can also follow the installation progress by tracking the {{< getvar v="product.installer.name.lc" >}} Docker container logs.

When the installation completes, you should have a running instance of the {{< product lc >}} in your cloud.
You can use the {{< getvar v="product.installer.ui.name.lc" >}} to view the installed nodes (EC2 instances).
Then, proceed to the post-deployment steps.
{{< comment >}}<!-- [c-aws-outposts-cert-req] [IntInfo] (sharonl) (4.11.20) I
  added this at the request of Product (Gilad) to meet Amazon's requirements
  for AWS Outposts certification. (9.11.20) I removed the reference to seeing
  the nodes' status after Efi said that while you can see the installed nodes
  on the Provazio dashboard, you can't see their status (approved by Gilad). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Post-Deployment Steps {#post-deployment-steps}

When the deployment completes, follow the {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/post-install-steps.md" text="post-deployment steps" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/" >}}
- {{< xref f="cluster-mgmt/deployment/post-deployment-howtos/" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/aws/aws-hw-spec.md" >}}

