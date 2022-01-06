---
title: "Network Security Groups Configuration (Azure)"
description: "Learn how Azure network security groups are configured for Iguazio MLOps Platform cloud installations."
keywords: "security groups configuration, azure network security groups, network security groups, azure security groups, security groups, security group, security, network, network configuration, securtiy configuration"
layout: "section-list"
menu:
  main:
    name:       "Network Security Groups Configuration"
    parent:     "deployment-cloud-azure-howtos"
    identifier: "deployment-cloud-azure-howtos-security-groups-cfg"
    weight:     30
---
{{< comment >}}<!-- [c-cloud-install-security-groups-cfg] [IntInfo] (sharonl)
  I didn't phrase the title "Configure Security Groups" because Eran explained
  that this how-to is intended to explain how we configure network security
  groups as part of the installation, but this isn't something that users are
  expected or allowed to do; users can only configure some of the
  security-group parameters, as mentioned in the how-to and explained in the
  installation guide. -->
{{< /comment >}}

{{% include-install-cloud-network-security-groups cloud="azure" %}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/azure/installationGuides/azure-installation-guide.md" text="Azure cloud installation guide" >}}

