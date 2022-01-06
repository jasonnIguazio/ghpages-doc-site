---
title: "Platform Users"
description: "Learn how to manage users and user groups in the Iguazio MLOps Platform."
keywords: "user management, users, user groups, predefined users, security_admin, tenancy_admin, create users, remove users, impor users, synchronize users, idp, identity provider, security, authentication, authentication, authorization, configuration, dashboard"
menu:
  main:
    parent:     "users-and-security"
    identifier: "users"
    Post:       "Learn about the predefined platform users and how to create, remove, import, and synchronize users and user groups and mange their permissions"
    weight:     10
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title should
  use {{< product tc >}}.
-->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces concepts/users.md. -->
{{< /comment >}}
{{< comment >}}
<!-- [FUTURE-MULTI-TENANTS] (sharonl) TODO (DOC IG-5726): Edit this doc, as
  needed, to refer also to tenants. (28.11.18) I made some edits related to the
  multi-tenancy support (available from v1.7.0) but we need to check for
  additional info that needs to be provided about tenants (here and/or
  elsewhere). -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

To use the {{< product lc >}}, you must be logged in as a **user** with relevant permissions.
A user can optionally be a member of one or more user **groups**.
{{< comment >}}<!-- [IntInfo] (sharonl) (5.4.18) Orit confirmed that a user
  doesn't necessarily need to be a member of a group. -->
{{< /comment >}}
When a user is a member of multiple groups, one of the groups is defined as the user's **primary group**.

The {{< product lc >}} has several [predefined users](#predefined-users).
A **security administrator** &mdash; which is any user with the Security Admin management policy, including the predefined [{{< verkey k="predef_users.security_admin_user" >}}](#user-security_admin) user &mdash; can manage {{< product lc >}} users and user groups.
A security administrator can create new local users and groups, import users and groups from a supported [identity provider (IdP)](#idp), and delete local or imported users and groups.
{{< comment >}}<!-- [c-local-users] (sharonl) (21.3.18) Adi preferred to use
  the terminology "local users" rather than referring to locally defined users
  to distinguish from imported IdP users, even though the imported users also
  become "local users". We still use "locally created users" when referring to
  management policies that are automatically assigned to such users and to
  imported users because we want to distinguish from the predefined users,
  which are also local users but aren't assigned these policies. -->
{{< /comment >}}
{{< note id="user-mgmt-permis-note" >}}
All users can view information for their own user profile and edit relevant properties, such as the password, email address, or first and last names.
But only a security administrator can view full user information for all users and edit secure properties such as the username, management policies, or groups.
{{< comment >}}<!-- [IntInfo] (sharonl) (18.5.20) The option for every user to
  access the Identity dashboard page, view their user information, and edit
  some of the properties, was added in v2.8.0 - see Requirement 11572 /
  DOC IG-13810. -->
{{< /comment >}}
{{< /note >}}
The user management is done from the <gui-title>Identity</gui-title> page of the {{< productUI lc >}}, as demonstrated in the following image:

{{< igz-figure id="img-dashboard_identity_users" src="/images/dashboard_identity_users_1.png" alt="Dashboard Identity Users tab" >}}
{{< comment >}}<!-- TODO-v1.7+ DOC IG-7542 update the screenshot. -->
{{< /comment >}}

Every user has a username and a password, which can be used to authenticate the user's identity.
In addition, every user and user group must be assigned one or more **management policies** that determine user permissions to access resources and perform different operations.
Users with the {{< xref f="users-and-security/security.md" a="mgmt-policy-data" text="Application Admin" >}} management policy &mdash; including the predefined {{< verkey k="predef_users.security_admin_user" >}} user &mdash; can define fine-grained data-access policies to restrict or allow user access to specific data resources.
For more information, see the {{< xref f="users-and-security/security.md" >}} documentation, and specifically the {{< xref f="users-and-security/security.md" a="authentication" text="Authentication" >}} and {{< xref f="users-and-security/security.md" a="authorization" text="Authorization" >}} sections.

{{< note id="user-names-note" >}}
For username restrictions, refer to the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="usernames" >}}.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Predefined Users {#predefined-users}

{{< internal >}}
  (sharonl) the predefined "iguazio" user was intentionally not mentioned.
{{< /internal >}}

{{< small-heading id="predefined-users-all-tenants" >}}All Tenants{{< /small-heading >}}

The following users are predefined for the default tenant and for any new tenant that you create:

<dl>
  <!-- Pipelines user predefined -->
  <dt id="user-pipelines">{{< verkey k="predef_users.pipelines_user" >}}</dt>
  {{< comment >}}<!-- [IntInfo] (sharonl) full name = "Iguazio Pipelines";
    email = pipelines_user@default_tenant.iguazio.com. Users don't need to know
    the user's password. See v2.5.0 DOC IG-11986. -->
  {{< /comment >}}
  {{< dd >}}
  The predefined {{< verkey k="predef_users.pipelines_user" >}} user has the default {{< xref f="users-and-security/security.md" a="mgmt-policy-data" text="Data" >}} management policy and is used by the {{< product lc >}}'s pipelines service to access ML pipeline data.
  Note that editing this user's profile might cause the monitoring service to stop working.
  {{< /dd >}}

  <!-- Monitoring user predefined -->
  <dt id="user-monitoring">{{< verkey k="predef_users.monitoring_user" >}}</dt>
  {{< comment >}}<!-- full name = "Iguazio Monitoring"  -->
  {{< /comment >}}
  {{< dd >}}
  The predefined {{< verkey k="predef_users.monitoring_user" >}} user has the default {{< xref f="users-and-security/security.md" a="mgmt-policy-application-admin" text="Application Admin" >}} and {{< xref f="users-and-security/security.md" a="mgmt-policy-data" text="Data" >}} management policies and is used by the {{< product lc >}}'s monitoring service to access performance logs.
  Note that editing this user's profile might cause the monitoring service to stop working.
  {{< comment >}}<!-- [IntInfo] (sharonl) See DOC IG-12315. (25.7.19) Oded
    confirmed that users don't need to know the password of this user. Orit and
    Eran N.  confirmed that users can technically change the password of this
    user (even without knowing the default password), and Orit didn't think the
    UI should prevent this, but we agreed to add a warning regarding this. -->
  {{< /comment >}}
  {{< /dd >}}

  <!-- Tenancy-admin predefined user -->
  <dt id="user-tenancy_admin">{{< verkey k="predef_users.tenancy_admin_user" >}}</dt>
  {{< comment >}}<!-- full name = "Tenancy Administrator"  -->
  {{< /comment >}}
  {{< dd >}}
  The predefined tenancy-administrator user has the {{< xref f="users-and-security/security.md" a="mgmt-policy-it-admin" text="IT Admin" >}} and {{< xref f="users-and-security/security.md" a="mgmt-policy-tenant-admin" text="Tenant Admin" >}} management policies, which enable performing cluster administration &mdash; including shutting down the cluster, monitoring events and alerts, triggering log gathering, and managing tenants.
  <br/>
  The default password of the {{< verkey k="predef_users.tenancy_admin_user" >}} user is "{{< verkey k="predef_users.tenancy_admin_pwd" >}}".
  You must change this password after the first login.
  {{< /dd >}}
</dl>

{{< small-heading id="predefined-users-default-tenant" >}}Default-Tenant Only{{< /small-heading >}}

The following users are predefined only for the default tenant:

<dl>
  <!-- Security-admin predefined user -->
  <dt id="user-security_admin">{{< verkey k="predef_users.security_admin_user" >}}</dt>
  {{< comment >}}<!-- full name = "Security Administrator"  -->
  {{< /comment >}}
  {{< dd >}}
  The predefined security-administrator user has the {{< xref f="users-and-security/security.md" a="mgmt-policy-security-admin" text="Security Admin" >}} management policy, which enables managing users and user groups &mdash; including creating and deleting users and user groups, integrating the {{< product lc >}} with a supported [IdP](#idp), and assigning management policies.
  <br/>
  The default password of the {{< verkey k="predef_users.security_admin_user" >}} user is "{{< verkey k="predef_users.security_admin_pwd" >}}".
  You must change this password after the first login.
  {{< /dd >}}

  <!-- System predefined user (backup user) -->
  <dt id="user-sys"><a id="backup-user"></a>{{< verkey k="predef_users.sys_user" >}}</dt>
  {{< dd >}}
  The predefined system user &mdash; known as **"the backup user"** &mdash; has the {{< xref f="users-and-security/security.md" a="mgmt-policy-application-admin" text="Application Admin" >}} and {{< xref f="users-and-security/security.md" a="mgmt-policy-data" text="Data" >}} management policies and is used for performing backups.
  {{< comment >}}<!-- [InfInfo] (sharonl) (27.5.19) I replaced the previous
    separate "Backup User" section in the v2.1-v2.3 (latest-release) docs with
    this predefined user. The content is the same, just slightly rephrased
    because of the move. Orit said to describe this as a backup user and not as
    a general system administrator. -->
  {{< /comment >}}

  {{< note title="Backup Notes" id="backup-user-notes" >}}
  - Data backups aren't activated automatically on all systems.
      Contact {{< company >}}'s {{< email id="support" link="1" text="support team" >}} to check the backup status for your cluster.
  - <a id="backup-user-data-access-permissions-note"></a>To allow backups when using data-access policy rules, ensure that as part of these rules, preferably at the start, you also grant the "{{< verkey k="predef_users.bck_user" >}}" backup user access to the data.
      For more information, see {{< xref f="users-and-security/security.md" a="data-access-policy-rules" text="Data-Access Policy Rules" >}} in the {{< xref f="users-and-security/security.md" t="title" >}} documentation.
  {{< /note >}}
  {{< comment >}}<!-- [IntInfo] (sharonl) (23.6.19) See DOC IG-9739.
  - The backup user has UID 3 and the Data management policy, but as it's
    predefined for all tenants beginning with v2.0.0, there's no need to
    mention this in the doc. Users also don't need to know this user's password.
  - [FUTURE-MULTI-TENANTS] I decided to say "A {{< product lc >}} tenant"
    because this is essentially correct both for the current release, which
    doesn't support multi-tenancy for k8s, and for future releases that will
    support it (currently planned for v2.5.0). TODO: When we add the k8s
    multi-tenancy support, consider rephrasing to refer to "Each" or "Every"
    tenant or to explicitly saying that this user is automatically created when
    creating a new tenant.
  -->
  {{< /comment >}}
  {{< /dd >}}
</dl>

<!-- //////////////////////////////////////// -->
## Using an External Identity Provider (IdP) {#idp}

A user with a {{< xref f="users-and-security/security.md" a="mgmt-policy-security-admin" text="Security Admin" >}} management policy, such as the predefined [{{< verkey k="predef_users.security_admin_user" >}}](#user-security_admin) user, can select to import users and user groups from an external identity provider (IdP) into the {{< product lc >}}.
When an IdP is configured, it is used to authenticate the identity of all its imported users in the {{< product lc >}}.
This doesn't prevent you from also defining local users and using the {{< product lc >}} to authenticate them.
For more information, see {{< xref f="users-and-security/security.md" a="authentication" text="Authentication" >}} in the security documentation.

IdP configuration is done from the <gui-title>IdP</gui-title> tab on the {{< productUI lc >}}'s <gui-title>Identity</gui-title> page.
Start by selecting an IdP from the drop-down list next to the <gui-label>Remote host settings</gui-label> label.
(In v{{< productVersion num >}}, only Microsoft Active Directory is supported.)
{{< igz-figure id="img-dashboard_idp_host_selection_active_none_select_ad_w_nav_bar_n_titles" src="/images/dashboard_idp_host_selection_active_none_select_ad_w_nav_bar_n_titles.png" alt="Dashboard IdP remote-host Active Directory selection" width="70%" >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (28.11.18)[c-security-supported-idps]
  Currently we only support MS AD as an IdP. -->
{{< /comment >}}

{{< note id="idp-cfp-apply-changes-note" >}}
When you complete the IdP configuration (as detailed in the following sections), remember to select <gui-label>Apply Changes</gui-label> to save your configuration.
{{< /note >}}

- [Configuring the Remote IdP Host](#idp-cfg-remote-host)
- [Configuring IdP Synchronization](#idp-cfg-sync)
- [Configuring Default Management Policies](#idp-cfg-default-mgmt-policies)

<!-- ---------------------------------------- -->
### Configuring the Remote IdP Host {#idp-cfg-remote-host}

In the <gui-label>Remote host settings</gui-label> configuration section, enter the required information for working with your selected IdP &mdash; the username and password of an IdP user with the necessary permissions, the address of the remote IdP host, and the root IdP user directory.

{{< igz-figure id="img-dashboard_idp_cfg_remote_host" src="/images/dashboard_idp_cfg_remote_host_1.png" alt="Dashboard IdP Remote Host Settings" >}}

<a id="idp-person-filter"></a>{{< techpreview mark="1" >}} You can optionally use the <gui-label>Person filter</gui-label> field to add a Microsoft AD LDAP syntax filter for synchronizing only with specific user groups from the external IdP &mdash;
```
(&(objectClass=Person)(memberOf=<full LDAP group path>)
```
For example, to synchronize with a user group named `AppA` whose full group path is "`IguazioDevUsers,OU=ApplicationAccess,OU=Groups,OU=GlobalProd,DC=GLOBAL,DC=ECOLAB,DC=CORP`", use this filter criteria:
```
(&(objectClass=Person)(memberOf=CN=AppA-IguazioDevUsers,OU=ApplicationAccess,OU=Groups,OU=GlobalProd,DC=GLOBAL,DC=ECOLAB,DC=CORP))
```
You can add multiple group search criteria to the filter.
{{< comment >}}<!-- [InfInfo] (sharonl) See Requirement IG-14983 / DOC IG-15112.
-->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Configuring IdP Synchronization {#idp-cfg-sync}

In the <gui-label>Sync mode</gui-label> configuration section, select the mode for synchronizing the imported IdP users in the {{< product lc >}} with the IdP after the initial import.
You can also optionally set an interval for performing periodic synchronizations  in the <gui-label>Periodic sync</gui-label> section.
{{< igz-figure id="img-dashboard_idp_cfg_sync_mode_partial_periodic_sync_off" src="/images/dashboard_idp_cfg_sync_mode_partial_periodic_sync_off.png" alt="Dashboard IdP synchronization confifguration" >}}

You can select between two alternative modes of synchronization &mdash; Partial or Full:

{{< note id="idp-one-way-sync-note" >}}
In either mode, the synchronization is always done in one direction:
changes done in the IdP are applied locally in the {{< product lc >}}, but the IdP is never modified to apply local {{< product lc >}} changes.
{{< /note >}}

<dl>
  <dt id="idp-partial-sync">Partial synchronization</dt>
  {{< dd >}}
  Synchronize addition and removal of users in the IdP after the initial import, but do not synchronize field changes for previously imported users and user groups.
  During partial synchronization, the currently configured IdP [default management policies](#idp-cfg-default-mgmt-policies) are applied to all new imported users and user groups, but the management policies of local previously imported IdP users and groups remain unaffected.
  For example:

  - The following local changes to imported users or user groups in the {{< product lc >}} are not overwritten during partial synchronization:
      - A user record field (such as an email address or job title) was added or removed, or a value of an existing field has changed.
          For example, you can disable an imported IdP user locally in the {{< product lc >}} by changing the value of relevant user field without affecting the user's status in the external IdP.
      - A user was added to or removed from an imported user group.
      - A user's or user group's management policies were modified.
  - The following IdP changes since the previous synchronization are not applied locally in the {{< product lc >}} during partial synchronization:
      - A user record field was added or removed, or the value of an existing field has changed.
      - A user was added to or removed from an existing group.
  - The following IdP changes since the previous synchronization are also applied locally in the {{< product lc >}} during partial synchronization:
      - A new user or user group was added.
          (The newly imported IdP users and groups will be assigned the default IdP management policies that are configured in the {{< product lc >}} at the time of the synchronization.)
      - An existing user or user group was deleted or renamed.
          {{< comment >}}<!-- [IntInfo] (sharonl) (22.3.18) Felix said that we
            handle username or group name changes as the deletion of the
            existing user/group and the addition of a new user/group, and this
            is therefore included in the partial synchronization. -->
          {{< /comment >}}
      {{< comment >}}<!-- [IntInfo] (sharonl) (22.3.18) I also wanted to add
        the following as the 3rd bullet above, but R&D (Felix) is currently
        unsure about the platform's behavior in such cases. [InfraInfo] I moved
        this comment from within the list above because it causes extra space
        between the list items that are visible in the output (even if the
        closing HTML comment tag is moved after the commented-out list item).
      -->
      - An imported user was added to a local user group.
      {{< /comment >}}
  {{< /dd >}}

  <dt>Full synchronization</dt>
  {{< dd >}}
  Synchronize all IdP user and user group additions, removals, and record updates by overwriting the current imported IdP user and user-group information with the updated IdP information.

  {{< note id="idp-full-sync-notes" >}}
  - Empty IdP user groups are not imported to the {{< product lc >}}.
      When users are added to a group, the group is imported as part of the next full or partial IdP synchronization and the related user information is updated accordingly.
  {{< internal >}}
This behavior is by design; Orit said there's no significance to importing an empty IdP group.
See Bug {{< jira ig="7646" >}}, which was closed as "_Not a bug_", and related DOC Task {{< jira ig="7737" >}} to document this behavior.
  {{< /internal >}}
  {{< comment >}}<!-- [ci-internal-shcd-in-list-item-alignment] (sharonl)
    (5.7.20) With Hugo v0.73.0, I couldn't indent the internal note to align it
    with the content of the first list item without distorting the output, and
    I had to add an empty line before the 2nd list item, below, to avoid output
    distortion. In Hugo v0.57.2 we didn't have a similar issue. This might be
    related to our current 2-char <dd>/<dt> indentation and no indentation
    within <dt></dd>. -->
  {{< /comment >}}

  - As part of the full-sync import, the currently configured IdP [default management policies](#idp-cfg-default-mgmt-policies) will be applied to all imported users and user groups.
  {{< /note >}}
  {{< /dd >}}
</dl>

Modifying the IdP configuration (including an initial configuration) triggers an automatic synchronization cycle.
Periodic synchronizations are triggered according to the configured periodic-sync interval (if configured), and you can also always trigger a manual synchronization by selecting the <gui-label>Sync</gui-label> option in the <gui-label>IdP</gui-label> tab.
All synchronizations are done according to the configured IdP synchronization mode.
However, note that modifying the IdP's remote host address or root user directory essentially changes the configured IdP, so except for any common users or groups that might exist in both IdPs, any previous changes to the imported IdP users or groups will be overwritten as part of the synchronization even in the case of a partial synchronization.
{{< comment >}}<!-- [IntInfo] (sharonl) (29.11.18) PENDING-ADI The UI currently
  displays the following warning message whenever the user changes the remote
  host address or root user directory of the IdP (including for the initial
  configuration, but Eran N. said he'll change this for v2.0.0 so as to display
  the warning only in case of an actual change):
  "The next synchronization after changing the IdP address or root user
  directory will overwrite all previously imported IdP users and groups with
  those of the newly configured IdP."
  This suggests a full sync is preformed for such changes, regardless of the
  sync mode. However, Felix told me that all IdP configuration changes trigger
  a configured sync-mode synchronization. So, if the user configured a partial
  IdP sync; modified the records of a local imported IdP user; and then changed
  the IdP host address or root user directory to configure a new IdP that also
  has the same user, the auto partial sync (and further partial syncs) won't
  overwrite the local changes to this user, despite the UI warning message.
  (Felix said that it's unlikely that the new IdP user will contain the same
  users as the old one, but I think it's still possible, and certainly for
  groups.) I consulted Orit and she asked that I suggest an alternative UI
  warning text. Regarding whether we want to keep the current behavior in
  future releases or do a Full sync for such changes, Orit said it's up to Adi.
-->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Configuring Default Management Policies {#idp-cfg-default-mgmt-policies}

In the <gui-label>Default management policies</gui-label> configuration section, select one or more management policies that will be applied to every imported IdP user and user group.
For more information about management policies, see {{< xref f="users-and-security/security.md" a="management-policies" text="Management Policies" >}}.

{{< igz-figure id="img-dashboard_idp_cfg_default_mgmt_policies" src="/images/dashboard_idp_cfg_default_mgmt_policies_1.png" alt="Dashboard IdP default management polcies configuration" >}}

{{< note id="idp-cfg-default-mgmt-policies-note" >}}
You must select at least one default management policy.
You can always change the management policies of an imported user or group after the import.

{{< /note >}}

<!-- //////////////////////////////////////// -->
## Deleting Users {#deleting-users}

Before deleting a {{< product lc >}} user, check the need to reallocate their resources and responsibilities.
If the user is the running user of managed application services (such as Spark or Presto), a {{< xref f="users-and-security/security.md" a="mgmt-policy-service-admin" text="service administrator" >}} should either delete these services or reassign them to a different running user.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="users-and-security/security.md" >}}

