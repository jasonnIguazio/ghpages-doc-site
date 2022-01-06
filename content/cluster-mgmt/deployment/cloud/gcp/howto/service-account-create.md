---
title: "Creating a GCP Service Account"
description: "Create aservice account for an Iguazio MLOps Platform GCP installation."
keywords: "creating a gcp service account, service account, gcp service account"
layout: "section-list"
menu:
  main:
    name:       "Creating a GCP Service Account"
    parent:     "deployment-cloud-gcp-howtos"
    identifier: "deployment-cloud-gcp-howtos-service-account"
    weight:     20
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

When installing the {{< product lc >}}, a service account with Owner permissions needs to be created.

<!-- //////////////////////////////////////// -->
## Step 1: GCP Login {#step-gcp-login}

Log into your GCP Management Console and select the <gui-label>IAM & Admin</gui-label> section.
{{< igz-figure id="service_account_gcp_1" src="/images/service_account_gcp_1.png" alt="Select AIM & ADMIN " width="1000" >}}

<!-- //////////////////////////////////////// -->

## Step 2: Create a Service Account {#step-create-new-service-account}

In the side navigation menu, select <gui-label>Service Accounts</gui-label>, and then select <gui-label>Create Service Account</gui-label>.
Type a name and description, then click <gui-label>Create</gui-label>. 
{{< igz-figure id="img-service_accout_gcp_create" src="/images/service_accout_gcp_create.png" alt="Create Service Account" width="1100" >}}

<!-- //////////////////////////////////////// -->
## Step 3: Set Owner Permissions {#step-set-owner-permissions}

In the <gui-label>Grant this service account access to project</gui-label> section, choose <gui-label>Owner</gui-label>.
{{< igz-figure id="img-service_accout_gcp_owner" src="/images/service_accout_gcp_owner.png" alt="Set owner" width="1000" >}}

When you're done, click  <gui-label>Done</gui-label>.

<!-- //////////////////////////////////////// -->
## Step 4: Create a JSON Key {#step-create-policy}


Go to the Service Account that you just created, click the <gui-label>Keys</gui-label> tab, and select <gui-label>Create new key</gui-label> from the <gui-label>Add Key</gui-label> menu.
{{< igz-figure id="img-service_accout_gcp_key" src="/images/service_accout_gcp_key.png" alt="Create New key" width="1000" >}}

Select the Key Type <gui-label>JSON</gui-label> and click <gui-label>CREATE</gui-label>.
{{< igz-figure id="img-service_accout_gcp_key_json" src="/images/service_accout_gcp_key_json.png" alt="Set policy" width="500" >}}

The key should be downloaded to your workstation. It will be used in the next step. 

