---
title: "Configuring Environmental Variables"
description: "Learn how to configure environmental variables in the Iguazio MLOps Platform."
keywords: "environmental variables"
menu:
  main:
    parent:     "post-deployment-howtos"
    identifier: "cfg-env-vars"
    weight:     220
---
{{< comment >}}<!-- IG-18876 -->{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

You can configure environmental variables, as key-value pairs, for Jupyter and Web Shell services. The values are applied to every instance of these services. You can define any variable that is supported by these services. 

After you configure global environmental variables, you can override the global value for an individual Jupyter service in the <gui-title>Services</gui-title> page. The environmental variables for other services cannot be overridden. 

<!-- //////////////////////////////////////// -->
## Configuring environmental variables in the {{< productUI tc >}} {#pip-cfg-ui}

Follow these steps to configure environmental variables for your cluster:

1.  Open the {{< productUI short_lc >}} and select the settings gear-wheel icon (<span class="igz-icon-ui-settings"></span>) from the top-right toolbar of any page to open the <gui-title>Settings</gui-title> dialog.

2.  Click <gui-label>Environment variables</gui-label>, then click <gui-label>Create a new environment variable</gui-label> and fill in one or more key-value pairs. 

3.  Click <gui-label>Apply</gui-label>. A loading spinner displays until the values are propagated to the services.

1.  To delete a key-value pair, click the <gui-label>Delete</gui-label> icon next to the row of the key-value pair.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="users-and-security/users.md" >}}
- {{< xref f="users-and-security/security.md" >}}

