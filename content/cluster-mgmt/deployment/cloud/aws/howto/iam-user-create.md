---
title: "Creating an AWS IAM User"
description: "Create a restricted AWS IAM user for an Iguazio MLOps Platform AWS installation."
keywords: "creating an aws iam user, iam users, aws users, iam users, subnet, iam, users, amzon eks, eks, AWS_ACCOUNT_ID"
layout: "section-list"
menu:
  main:
    name:       "Creating an IAM User"
    parent:     "deployment-cloud-aws-howtos"
    identifier: "deployment-cloud-aws-howtos-iam-user-create"
    weight:     20
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

When installing the {{< product lc >}}, the installation needs the credentials of your AWS account to create the required infrastructure.
This guide walks you through the steps for creating a restricted AWS IAM user, which has only the minimal set of permissions that are required for the installation.
You'll need to provide the credentials of this user as part of the {{< product lc >}} installation, as outlined in the {{< product lc >}}'s {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}.

<!-- //////////////////////////////////////// -->
## Step 1: AWS Login {#step-aws-login}

Log into your AWS Management Console and select the IAM service.
{{< igz-figure id="img-setup_aws_iam_role_service" src="/images/setup_aws_iam_role_service.png" alt="Select iAM" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 2: Create a New User {#step-create-new-user}

In the side navigation menu, select <gui-label>Access management | Users</gui-label>, and then select <gui-label>Add user</gui-label>.
{{< igz-figure id="img-setup_aws_iam_user_add_user" src="/images/setup_aws_iam_user_add_user.png" alt="Add user" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 3: Set the User's Access Permissions and Name {#step-set-access-permissions-and-name}

In the <gui-label>Set user details</gui-label> section,

- In the <gui-label>User name</gui-label> field, enter the name of the new user (for example, "{{< getvar v="product.installer.name.lc" >}}" &mdash; recommended).
- In the <gui-label>Access type</gui-label> field, check the <gui-label>Programmatic access</gui-label> option to allow the user only programmatic access.

{{< igz-figure id="img-setup_aws_iam_user_name" src="/images/setup_aws_iam_user_name.png" alt="Set access" width="600" >}}

When you're done, select <gui-label>Next: Permissions</gui-label>.

<!-- //////////////////////////////////////// -->
## Step 4: Create a Policy {#step-create-policy}

Select <gui-label>Attach existing policies directly</gui-label>, and then select <gui-label>Create policy</gui-label>.
{{< igz-figure id="img-setup_aws_iam_user_attach_policy" src="/images/setup_aws_iam_user_attach_policy.png" alt="Attach policy" width="600" >}}

Download the {{< product lc >}} IAM policy file that matches your selected application-cluster configuration:

- <file>{{< download target_var="product.install_assets.aws.install_role_policy.file.path" >}}{{< getvar v="product.install_assets.aws.install_role_policy.file.name" >}}{{< /download >}}</file> for a vanilla cluster.
- <file>{{< download target_var="product.install_assets.aws.install_role_policy.eks_file.path" >}}{{< getvar v="product.install_assets.aws.install_role_policy.eks_file.name" >}}{{< /download >}}</file> for an EKS cluster.
    If you select to use this policy, edit the file to replace all `$AWS_ACCOUNT_ID` instances with your AWS Account ID.

Paste the contents of your selected policy file in the <gui-title>JSON</gui-title> tab of the AWS Management Console and select <gui-label>Review policy</gui-label>.
Give the policy a name (for example, "{{< getvar v="product.install_assets.aws.install_role_policy.sample_name" >}}" &mdash; recommended), optionally add a description, and select <gui-label>Create policy</gui-label>.
{{< igz-figure id="img-setup_aws_iam_user_policy" src="/images/setup_aws_iam_user_policy.png" alt="Set policy" width="600" >}}

<!-- //////////////////////////////////////// -->
## Step 5: Create the User {#step-create-user}

Filter the policies for the  name of the policy that you created and select the policy.

Select <gui-label>Next: Tags</gui-label> and optionally assign user tags.

Select <gui-label>Next: Review</gui-label> and review your role definition.
When you're ready, select <gui-label>Create user</gui-label>.

<!-- //////////////////////////////////////// -->
## Step 6: Save the User Credential {#step-save-credentials}

Download and save the credentials of the new user (<gui-label>Access key iD</gui-label> and <gui-label>Secret access key</gui-label>).
{{< igz-figure id="img-setup_aws_iam_user_download_csv" src="/images/setup_aws_iam_user_download_csv.png" alt="Create user" width="600" >}}

<!-- //////////////////////////////////////// -->
## Additional Resources {#additional-resources}

- [Creating IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) (AWS documentation)

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/iam-role-n-instance-profile-create.md" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/eks-app-cluster-deploy.md" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}

