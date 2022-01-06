---
title: "Configuring the SMTP Server"
description: "Learn how to configure the SMTP server in the Iguazio MLOps Platform."
keywords: "smtp server, smtp, smtp server configuration, smtp configuration, smtp email, configurations, prerequisites, setup, installation, security, support, call home, user management, passwords"
menu:
  main:
    parent:     "post-deployment-howtos"
    identifier: "cfg-smtp-server"
    weight:     200
---
{{< comment >}}<!-- [IntInfo] (sharonl) (23.6.19) Added based on info from the
  support team (Maor). See DOC IG-11546. -->
<!-- [FUTURE-MULTI-TENANTS] TODO: When we add support for multi-tenancy in k8s
  installations, mention in the tenant-creation doc that creating a new tenant
  requires configuring and enabling an SMTP server; the backend enforcement of
  a configured SMTP server for creating a new tenant was implemented for v2.3.0
  (see Requirement IG-10295), but this version won't support multi-tenancy for
  k8s. When multi-tenancy is supported, we can also add tenant creation to the
  email-message examples on the current page, although this isn't required, and
  if done, shouldn't be merged to the doc for earlier releases. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} sends email messages for different purposes, such as password generation and call home functionality.
To support this, the {{< product lc >}} clusters needs to be configured to work with a Simple Mail Transfer Protocol (SMTP) server that will be used for sending the email messages.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

The following prerequisites must be filled to successfully configure an SMTP server for your cluster:

- There must be an SMTP server with connectivity to the cluster.
    When the cluster is connected to the internet, you can use a public server.
    Otherwise, use a local SMTP server.
- The call home functionality requires that the SMTP server be able to send emails to the {{< company >}} domain.
- The user who configures the SMTP server must have the {{< xref f="users-and-security/security.md" a="mgmt-policy-it-admin" text="IT Admin" >}} management policy.

<!-- //////////////////////////////////////// -->
## Configuring an SMTP Server from the {{< productUI tc >}} {#smtp-cfg-ui}

Follow these steps to configure an SMTP server for your cluster:

1.  Open the {{< productUI short_lc >}} and select the settings gear-wheel icon (<span class="igz-icon-ui-settings"></span>) from the top-right toolbar of any page to open the <gui-title>Settings</gui-title> window.

2.  In the <gui-label>SMTP</gui-label> section, ensure that the <gui-label>Enabled</gui-label> option is turned on and fill in the configuration parameters &mdash; a valid SMTP email address; the username and password of an SMTP user to be used for sending the email messages; the host IP address and port of the SMTP server; and optionally a list of users with the IT Admin management policy for receiving cluster-alert email notifications &mdash; as demonstrated in the following image:

    {{< igz-figure id="img-ui-smtp-cfg-example" src="/images/ui-smtp-cfg-example.png" alt="DNS Server Manager - select DNS" >}}

3.  Select <gui-label>Apply</gui-label> to apply your changes.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="users-and-security/users.md" >}}
- {{< xref f="users-and-security/security.md" >}}

