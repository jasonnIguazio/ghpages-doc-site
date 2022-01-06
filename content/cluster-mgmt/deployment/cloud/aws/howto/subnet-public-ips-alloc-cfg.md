---
title: "Configuring VPC Subnet Allocation of Public IP Addresses (AWS)"
description: "Configuring public IP-address allocation on VPC subnets in Iguazio MLOps Platform AWS cloud deployments."
keywords: "aws public ip address, aws network configuration, aws ip addresses, subnets, public ip addresses, public ips, ip addresses, network, ec2 instances, ec2"
layout: "section-list"
menu:
  main:
    name:       "Configuring VPC Subnet Allocation of Public IP Addresses"
    parent:     "deployment-cloud-aws-howtos"
    identifier: "deployment-cloud-aws-howtos-subnet-public-ip"
    weight:     40
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

When installing an instance of the {{< product lc >}} with public IP addresses, you must enable and configure allocation of public IP addresses for one or more subnets of the AWS virtual private cloud (VPC) in which the {{< product lc >}} will be installed, as outlined in this guide.

<!-- //////////////////////////////////////// -->
## Step 1: AWS Login {#step-aws-login}

Log into your AWS Management Console and select the VPC service.
{{< igz-figure id="img-setup_aws_subnet_public_ip_vpc" src="/images/setup_aws_subnet_public_ip_vpc.png" alt="Select VPC" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 2: Subnets Selection {#step-subnets-selection}

Under <gui-title>Subnets</gui-title>, select the subnet (or subnets) in which you plan to install the {{< product lc >}}.
Then, from the <gui-label>Actions</gui-label> menu select <gui-label>Modify auto-assign IP settings</gui-label>.
{{< igz-figure id="img-setup_aws_subnet_public_ip_choose_subnet" src="/images/setup_aws_subnet_public_ip_choose_subnet.png" alt="Select subnet" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 3: Enable Allocation of Public IP Addresses {#step-enable-public-ips-alloc}

Finally, check <gui-label>Enable auto-assign public IPv4 address</gui-label>, and select <gui-label>Save</gui-label>.
{{< igz-figure id="img-setup_aws_subnet_public_ip_check_auto_assign" src="/images/setup_aws_subnet_public_ip_check_auto_assign.png" alt="Enable auto assign" width="600" >}}

Any EC2 instance provisioned in this subnet will now be assigned a public IP address.

<!-- //////////////////////////////////////// -->
## Additional Resources {#additional-resources}

- [VPC IP Addressing](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html) (AWS documentation)

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/network-security-groups-cfg.md" >}}

