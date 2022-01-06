---
title:      "Post-Installation Steps (AWS)"
linktitle:  "AWS Post-Installation Steps"
description: "Post-deployment steps for installing the Iguazio MLOps Platform on an AWS cloud"
keywords: "aws cloud post deployment, aws post deployment, aws post installation, cudsom domain regsitration, domain registration, ip addresses, network, dns, idp, microsoft active directory, active directory, microsoft ad, idp users, http certificates"
layout: "section-list"
menu:
  main:
    name:       "Post-Installation Steps"
    parent:     "deployment-cloud-aws-howtos"
    identifier: "deployment-cloud-aws-howtos-post-install-steps"
    weight:     60
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

After following the {{< product lc >}}'s {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}, you should have a running instance of the {{< product lc >}} in your AWS cloud.
In some cases, additional post-deployment steps are required before you can properly use the {{< product lc >}}, as outlined in this guide.

<!-- //////////////////////////////////////// -->

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-reg-custom-domain.md" %}}

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-https-certif-create.md" %}}

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-idp-import-from-ms-ad.md" %}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}

