---
title: "Deploying an Amazon EKS Application Cluster"
description: "Deploy an Iguazio MLOps Platform application cluster to Amazon Elastic Kubernetes Service (Amazon EKS)."
keywords: "deploying an amazon eks application cluster, amazon elastic kubernetes service, amazon eks, eks, aws eks, eks application cluster, eks app cluster, application cluster, app cluster, application nodes, app nodes, provazio"
layout: "section-list"
menu:
  main:
    parent:     "deployment-cloud-aws-howtos"
    identifier: "deploy-eks-cluster"
    identifier: "deployment-cloud-aws-howtos-eks"
    weight:     45
---
{{< comment >}}<!-- [InfraInfo] (sharonl) (24.3.21) I initially wanted to use
  the title "Deploying an Application Cluster to Amazon Elastic Kubernetes
  Service (EKS)" and use the current title as the linktitle (= xref title), but
  the Spotibo SEO checks marked the longer title as too long. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

This guide describes how to install (deploy) {{< product full >}} application nodes to Amazon Elastic Kubernetes Service (Amazon EKS) in an AWS cloud &mdash; i.e., deploy an AWS EKS {{< product lc >}} application cluster.

<!-- //////////////////////////////////////// -->
## Configuring an EKS Application Cluster {#eks-app-cluster-cfg}

On the <gui-title>Clusters</gui-title> page of the {{< product lc >}} installer ({{< getvar v="product.installer.name.lc" >}}), fill in the EKS related configuration parameters, and then select <gui-label>Next</gui-label>.

{{< igz-figure img="setup_aws_installer_ui_clusters_app_new_eks.png" alt="New EKS app cluster" width="600" >}}

<dl>
  <!-- Kubernetes Kind -->
  {{< param-doc name="Kubernetes Kind" id="ui-cluster-param-app-eks-kubernetes-kind" >}}
  Set this to <opt> New EKS Cluster</opt>.
  {{< /param-doc >}}

  <!-- Root Block Device Type -->
  {{< param-doc name="Root Block Device Type" id="ui-cluster-param-app-eks-root-block-device-type" >}}
  Leave this set to <opt> General Purpose SSD</opt>.
  {{< /param-doc >}}

  <!-- Root Block Device Size -->
  {{< param-doc name="Root Block Device Size" id="ui-cluster-param-app-eks-root-block-device-size" >}}
  The size of the EBS for the control plane.
  {{< /param-doc >}}

  <!-- SSH Key Pair Kind -->
  {{< param-doc name="SSH Key Pair Kind" id="ui-cluster-param-app-eks-ssh-key-pair-kind" >}}
  The type of key pairing to use for SSH connections to the EKS application cluster:

  - <opt-b>New</opt-b> &mdash; Create a new SSH key.
  - <opt-b>Existing</opt-b> &mdash; Use an existing SSH key.
  - <opt-b>None</opt-b> &mdash; Don't use any SSH key.
    <br/>
    Note that when this option is set, you cannot use SSH to connect to the EKS application nodes.
  {{< /param-doc >}}

  <!-- SSH Whitelist CIDRs -->
  {{< param-doc name="SSH Whitelist CIDRs" id="ui-cluster-param-app-eks-ssh-whitelist-cidrs" >}}
  Leave this empty.
  {{< /param-doc >}}

  <!-- Node Groups -->
  {{< param-doc name="Node Groups" id="ui-cluster-param-app-eks-node-groups" >}}
  You can group application nodes in the EKS application cluster into groups.

  The installer predefines a default node group named "{{< getvar v="product.install_aws.eks.default_node_group" >}}".
  You can select the edit icon for this group to edit its configuration, but you cannot delete this group or change its minimal number of instances (1).
  The minimum number of instances (<gui-label>Min # of instances</gui-label>) for the default node group is currently not configurable.
  {{< igz-figure img="setup_aws_installer_ui_clusters_app_eks_node_group_default.png" alt="EKS app cluster: default node group" width="400" >}}

  You can select the plus-sign icon (<gui-label>+</gui-label>) to define one or more additional custom node groups. You must select a lifecycle type for the node group. The default is **On Demand**.
  {{< igz-figure img="setup_aws_installer_ui_clusters_app_eks_node_group_lifecycle_new.png" alt="EKS app cluster: new node group" width="400" >}}
  
  Configure the following parameters for either **On Demand** or **Spot** node groups.
  <dl>
  <!-- Name -->
  {{< param-doc name="Name" id="ui-cluster-param-app-eks-node-group-name" >}}
  The name of the node group.
  {{< /param-doc >}}
  <!-- Lifecycle -->
  {{< param-doc name="Lifecycle" id="ui-cluster-param-app-eks-node-group-lifecycle" >}}
  The EC2 instance lifecycle type. Choose **On Demand** or **Spot**
  
  **On Demand**&mdash;recommended for applications with workloads that cannot be interrupted

  **Spot**&mdash;cost-effective instances which are flexible about when applications are run and if they can be interrupted
  {{< /param-doc >}}
  <!-- # of Instances -->
  {{< param-doc name="# of Instances" id="ui-cluster-param-app-eks-node-group-num-of-instances" >}}
  The number of instances (nodes) to deploy for this group.
  {{< /param-doc >}}
  <!-- Min # of Instances -->
  {{< param-doc name="Min # of Instances" id="ui-cluster-param-app-eks-node-group-min-num-of-instances" >}}
  The minimum number of nodes in the group.
  <br/>
  For the default node group, the value of this parameter is currently not configurable.
  For additional groups, you can set this parameter to any positive number or to zero.
  For high availability, it's recommended to have a minimum of two application nodes in each group.
  {{< /param-doc >}}
  <!-- Max # of Instances -->
  {{< param-doc name="Max # of Instances" id="ui-cluster-param-app-eks-node-group-max-num-of-instances" >}}
  The maximum number of nodes in the group.
  {{< /param-doc >}}
  <br/>
  <br/>
  If you selected <b>On Demand</b> as your lifecycle type you will need to configure the size of the node group.
  <br/>
  <!-- Size -->
  {{< param-doc name="Size" id="ui-cluster-param-app-eks-node-group-size" >}}
  The EC2 instance size for the nodes in the group.
  {{< /param-doc >}}
  <br/>
  <br/>
  If you selected <b>Spot</b> as your lifecycle type, you will need to configure the parameters for each node in the group.
  <!-- Min # of CPUs -->
  {{< param-doc name="Min # of CPUs" id="ui-cluster-param-app-eks-node-group-min-num-of-CPUs" >}}
  The minimum number of CPUs in each node.
  {{< /param-doc >}}
  <!-- Max # of CPUs -->
  {{< param-doc name="Max # of CPUs" id="ui-cluster-param-app-eks-node-group-max-num-of-CPUs" >}}
  The maximum number of CPUs in each node.
  {{< /param-doc >}}
  <!-- Min # of GPUs -->
  {{< param-doc name="Min # of GPUs" id="ui-cluster-param-app-eks-node-group-min-num-of-GPUs" >}}
  The minimum number of GPUs in each node.
  {{< /param-doc >}}
  <!-- Max # of GPUs -->
  {{< param-doc name="Max # of GPUs" id="ui-cluster-param-app-eks-node-group-max-num-of-GPUs" >}}
  The maximum number of GPUs in each node.
  {{< /param-doc >}}
  <!-- Min amount of Memory (GB) -->
  {{< param-doc name="Min amount of memory (GB)" id="ui-cluster-param-app-eks-node-group-min-amt-of-GB" >}}
  The minimum amount of memory (GB) in each node.
  {{< /param-doc >}}
  <!-- Max amount of Memory (GB) -->
  {{< param-doc name="Max amount of memory (GB)" id="ui-cluster-param-app-eks-node-group-max-amt-of-GB" >}}
  The maximum amount of memory (GB) in each node.
  {{< /param-doc >}}
  </dl>
</dl>


When you're done, proceed to {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" a="step-ui-cloud" text="Step 9" >}} of the {{< product lc >}}'s AWS installation guide.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/iam-user-create.md" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" >}}

