---
title: "Configuring the Python Repositories"
description: "Learn how to configure Python environmental variables in the Iguazio MLOps Platform."
keywords: "python repositories"
menu:
  main:
    parent:     "post-deployment-howtos"
    identifier: "cfg-python-pckgs"
    weight:     210
---
{{< comment >}}<!-- IG-18876 -->

{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

You can define pip and Conda key-value pairs as: 

 - Environmental variables for shell and Jupyter
 - Default build arguments for Nuclio and MLRun

The values are applied to every instance of these services. You can define any variable that is supported by pip or Conda. Changing the Pypi server URL causes a restart of Jupyter, MLRun, Nuclio, and Shell, services.

<!-- //////////////////////////////////////// -->
## Configuring pip and Conda environmental variables in the {{< productUI tc >}} {#pip-cfg-ui}

To configure pip and Conda environmental variables for your cluster:

1.  Open the {{< productUI short_lc >}} and select the settings gear-wheel icon (<span class="igz-icon-ui-settings"></span>) from the top-right toolbar of any page to open the <gui-title>Settings</gui-title> dialog.

2.  Click <gui-label>Python packages</gui-label>, then under PIP Options, click <gui-label>Create a new option</gui-label> and fill in one or more key-value pairs. 

3.  Under Conda options, click <gui-label>Create a new option</gui-label> and fill in one or more key-value pairs. 

4.  Click <gui-label>Apply</gui-label>.  A loading spinner displays until the values are propagated to the services.

1.  To delete a key-value pair, click the <gui-label>Delete</gui-label> icon next to the row of the key-value pair.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="users-and-security/users.md" >}}
- {{< xref f="users-and-security/security.md" >}}
