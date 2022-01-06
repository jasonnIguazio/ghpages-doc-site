---
title:      "Post-Installation Steps (vSphere)"
linktitle:  "vSphere Post-Installation Steps"
description: "Post-deployment steps for installing the Iguazio MLOps Platform on VMware vSphere VMs"
keywords: "vmware vsphere post deployment, vsphere post deployment vmware post deployment, vsphere post installation, vmware post installation, custom domain registration, domain registration, ip addresses, network, dns, idp, microsoft active directory, active directory, microsoft ad, idp users, http certificates"
layout: "section-list"
menu:
  main:
    name:       "Post-Installation Steps"
    parent:     "deployment-vm-vmware-howtos"
    identifier: "deployment-vm-vmware-howtos-post-install-steps"
    weight:     90
---

<!-- //////////////////////////////////////// -->
## Overview {#overview}

After following the {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/vmware-installation-guide.md" text="VMware vSphere installation guide" >}}, you should have a running instance of the {{< product lc >}} on your vSphere cluster.
In some cases, additional post-deployment steps are required before you can properly use the {{< product lc >}}, as outlined in this guide.

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-reg-custom-domain.md" %}}

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-https-certif-create.md" %}}

<!-- //////////////////////////////////////// -->
{{% include f="section-post-install-idp-import-from-ms-ad.md" %}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/on-prem/vm/vmware/vmware-installation-guide.md" text="VMware vSphere installation guide" >}}

