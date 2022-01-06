---
title: "Creating an AWS IAM Role and Instance Profile"
description: "Create an AWS instance profile with a restricted AWS IAM role for an Iguazio MLOps Platform AWS installation."
keywords: "creating an aws iam role, creating an aws instance profile, iam roles, iam instance profiles, aws roles, aws instance profiles, roles, instance profiles, ec2 instances, ec2, aws network, network"
layout: "section-list"
menu:
  main:
    name:       "Creating an IAM Role and Instance Profile"
    parent:     "deployment-cloud-aws-howtos"
    identifier: "deployment-cloud-aws-howtos-iam-role-n-instance-profile-create"
    weight:     30
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

At times, the {{< product lc >}}'s EC2 instances need to access the AWS API.
For example, to achieve high availability, the instances within a cluster share a single secondary IP address, which is allocated to a specific instance at any given moment.
Migrating this secondary IP to another instance requires an AWS API call to update the internal AWS network.
To perform an AWS API call, the {{< product lc >}} must be authenticated using AWS credentials with the necessary permissions for performing this operation.
To allow this, the {{< product lc >}} installer needs to receive the name of an AWS instance profile that contains an IAM role with the required permissions.

This guide walks you through the steps for creating the required IAM role for the {{< product lc >}} installation, using the AWS Management Console.
When using the console to create a role for Amazon EC2, the console automatically creates an instance profile with the same name as the role.
You'll need to provide this name as part of the {{< product lc >}} installation, as outlined in the {{< product lc >}}'s {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}.

<!-- //////////////////////////////////////// -->
## Step 1: AWS Login {#step-aws-login}

Log into your AWS Management Console and select the IAM service.
{{< igz-figure id="img-setup_aws_iam_role_service" src="/images/setup_aws_iam_role_service.png" alt="Select IAM service" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 2: Create a New Role {#step-create-new-role}

In the side navigation menu, select <gui-label>Access management | Roles</gui-label>, and then select <gui-label>Create role</gui-label>.
{{< igz-figure id="img-setup_aws_iam_role_create_role" src="/images/setup_aws_iam_role_create_role.png" alt="Create role" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 3: Select the AWS EC2 Use Case {#step-select-ec2}

Select the <gui-label>AWS service</gui-label> trusted-entry type and the <gui-label>EC2</gui-label> use case, and then select <gui-label>Next: Permissions</gui-label>.
{{< igz-figure id="img-setup_aws_iam_role_ec2_use_case" src="/images/setup_aws_iam_role_ec2_use_case.png" alt="Select EC2 use case" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 4: Create a Policy {#step-create-policy}

Select <gui-label>Create policy</gui-label>.
{{< igz-figure id="img-setup_aws_iam_role_create_policy" src="/images/setup_aws_iam_role_create_policy.png" alt="Create policy" width="600" >}}

Under the <gui-title>JSON</gui-title> tab, paste the contents of {{< download target_var="product.install_assets.aws.assign_ip_addr_role_policy.path" >}}this policy{{< /download >}} and select <gui-label>Review policy</gui-label>.
Give the policy a name (for example, "AssignPrivateIPAddresses" &mdash; recommended), optionally add a description, and select <gui-label>Create policy</gui-label>.
{{< igz-figure id="img-setup_aws_iam_role_policy_json" src="/images/setup_aws_iam_role_policy_json.png" alt="Set policy" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 5: Create the Role {#step-create-role}

Filter the policies for the  name of the policy that you created and select the policy.
{{< igz-figure id="img-setup_aws_iam_role_attach_permission" src="/images/setup_aws_iam_role_attach_permission.png" alt="Select policy" width="600" >}}
Select <gui-label>Next: Tags</gui-label> and optionally assign role tags.

Enter "{{< getvar v="product.install_aws.iam_role_default_policy.name" >}}" as the role name, optionally add a description, and select <gui-label>Create role</gui-label>.

<!-- //////////////////////////////////////// -->
## Additional Resources {#additional-resources}

- [Creating IAM Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html) (AWS documentation)

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/iam-user-create.md" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}

