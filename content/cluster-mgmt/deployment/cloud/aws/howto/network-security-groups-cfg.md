---
title: "Network Security Groups Configuration (AWS)"
description: "Learn how AWS network security groups are configured for Iguazio MLOps Platform cloud installations."
keywords: "security groups configuration, aws network security groups, network security groups, aws security groups, security groups, security group, security, network, network configuration, securtiy configuration"
layout: "section-list"
menu:
  main:
    name:       "Network Security Groups Configuration"
    parent:     "deployment-cloud-aws-howtos"
    identifier: "deployment-cloud-aws-howtos-security-groups-cfg"
    weight:     50
---
{{< comment >}}<!-- [c-cloud-install-security-groups-cfg] [IntInfo] (sharonl)
  I didn't phrase the title "Configure Security Groups" because Eran explained
  that this how-to is intended to explain how we configure network security
  groups as part of the installation, but this isn't something that users are
  expected or allowed to do; users can only configure some of the
  security-group parameters, as mentioned in the how-to and explained in the
  installation guide. -->
{{< /comment >}}

{{% include-install-cloud-network-security-groups cloud="aws" %}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/cloud/aws/installationGuides/aws-installation-guide.md" text="AWS cloud installation guide" >}}
- {{< xref f="cluster-mgmt/deployment/cloud/aws/howto/subnet-public-ips-alloc-cfg.md" >}}

