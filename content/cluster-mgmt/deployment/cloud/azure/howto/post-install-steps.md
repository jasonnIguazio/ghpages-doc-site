---
title:      "Post-Installation Steps (Azure)"
linktitle:  "Azure Post-Installation Steps"
description: "Post-deployment steps for installing the Iguazio MLOps Platform on an Azure cloud"
keywords: "azure cloud post deployment, azure post deployment, azure post installation, cudsom domain regsitration, domain registration, ip addresses, network, dns, idp, microsoft active directory, active directory, microsoft ad, idp users, http certificates"
layout: "section-list"
menu:
  main:
    name:       "Post-Installation Steps"
    parent:     "deployment-cloud-azure-howtos"
    identifier: "deployment-cloud-azure-howtos-post-install-steps"
    weight:     40
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

After following the {{< product lc >}}'s {{< xref f="cluster-mgmt/deployment/cloud/azure/installationGuides/azure-installation-guide.md" text="Azure cloud installation guide" >}}, you should have a running instance of the {{< product lc >}} in your Azure cloud.
In some cases, additional post-deployment steps are required before you can properly use the {{< product lc >}}, as outlined in this guide.

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-reg-custom-domain.md" %}}

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-https-certif-create.md" %}}

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-idp-import-from-ms-ad.md" %}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/azure/installationGuides/azure-installation-guide.md" text="Azure cloud installation guide" >}}

