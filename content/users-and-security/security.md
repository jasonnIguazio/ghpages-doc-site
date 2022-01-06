---
title:   "Security"
describe: "Learn how to secure access to resources and restrict user permissions by authenticating user identity and managing authorization using management and data-access policies, project permissions, and rules."
keywords: "security, policies, data-access policies, data policies, authentication, http authentication, authorization, access control, https, tls, users, user management, management, managemnt policies, data categories, web apis, cluster-management apis, management apis, project permissions"

menu:
  main:
    name:       "Security"
    parent:     "users-and-security"
    identifier: "security"
    weight:     20
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces concepts/security.md.
  [TODO-SITE-RESTRUCT-P2] [IntInfo] (sharonl) TODO: Split this page into
  multiple pages. -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) See Orit's internal "iguazio - security
  overview.pptx" presentation and these internal Iguazio Confluence pages -
  http://confluence.iguazeng.com:8090/display/ARC/Security and
  http://wiki.iguazeng.com:8090/display/ARC/User%2C+Tenants+and+Roles
  - and the "Data Containers - Security" section on the
  "Iguazio Training - GUI Overview.pptx" presentation
  (https://www.dropbox.com/home/Proffesional%20Services/training/Course?preview=Iguazio+Training+-+GUI+Overview.pptx), currently starting at Slide 38.
-->

<!-- [FUTURE-SECURITY-ROLES] [IntInfo] (sharonl) (4.3.18) Orit said that
  security roles aren't supported in v1.5.x and won't be supported in v1.7.x
  but are expected to be supported in future versions. She said not to use the
  "role" terminology in relation to the management or data-access policies (as
  done in Yoav's security doc draft).
-->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} implements multiple mechanisms to secure access to resources and keep your data safe. All user and security management is done under a single pane of glass: the configuration is done in one place, in the user-friendly graphical {{< productUI short_lc >}}, and applied across all {{< product lc >}} interfaces.
The result is a significantly simplified, yet robust, data-security solution that helps organizations meet their compliance objectives.

The {{< product lc >}} allows you to define local users and import users from an external identity provider (IdP), authenticate user identities, and control users' access to resources, including the ability to define fine-grained data-access policies.
To ensure proper security, the {{< product lc >}} uses time-limited sessions and supports the HTTP Secure (HTTPS) protocol.
You can view logs for security events and user actions (such as a failed login or deletion of a data container) on the <gui-title>Events | Audit</gui-title> {{< productUI lc >}} tab.
{{< comment >}}<!-- See [c-local-users] in the users.md intro file. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## HTTP Secure Data Transmission {#http-secure-secure-data-transmission}

For enhanced security, the {{< product lc >}}'s RESTful web and cluster-management APIs support the HTTP Secure (HTTPS) protocol (also known as HTTP over TLS), as defined in the [RFC 2818](https://tools.ietf.org/html/rfc2818) specification.
See {{< xref f="data-layer/reference/web-apis/security.md" a="https" text="HTTPS Requests" >}} in the {{< xref f="data-layer/reference/web-apis/security.md" t="title" >}} reference.
{{< comment >}}<!-- [IntInfo] (sharonl) (4.3.18) Initially, I didn't restrict
  this section to RESTful APIs, and I preceded the above with the following: -->
Several security measures are employed to help ensure the authenticity, integrity, and privacy of data in transit:
the data communication is carried over the Transport Layer Security (TLS) protocol, to ensure secure communication.
Before the transmission, the data is encrypted and the endpoints are authenticated.
Upon completion of the data transfer, the data is decrypted and verified.
<!-- However, Orit said that
  (a) TLS = HTTPS and it's relevant only to web (RESTful) APIs.
  (b) The encryption/decryption info is true only for the data transfer stage
      between the user and the nginx (web-gateway) service; it's not true for
      other interfaces or for the data transfer between nginx and the core
      engine.
  In consultation with Orit, I decided to only document the HTTPS support. -->
{{< /comment >}}

{{< comment >}}<!-- [FUTURE-MULTI-TENANTS] TODO (DOC IG-5726): Document tenants
  and related security implications. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
{{< comment >}}
(JN 19-aug-2021 - this was commented out because the feature was pulled from v3.0.3.)
## Disk Encryption {#disk-encryption}

Data disk encryption is the process of protecting information on the storage device by converting it into unreadable code that
cannot be deciphered without a key. The platform uses the `dm-crypt` service and supports the Linux Unified Key Setup (LUKS) transparent disk encryption subsystem.
LUKS stores the needed setup information for `dm-crypt` on the disk itself and abstracts partition and key management to improve 
ease of use and cryptographic security. The entire disk storage system is encrypted by a secure, unique key. 
The encryption key is generated from the system ID and domain ensuring uniqueness of the key.
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Authentication {#authentication}

**Authentication** is the process of validating a user's identity before granting the user access to a specific resource.
Before granting a user access to resources, the {{< product lc >}} verifies (authenticates) the identity of the user and then ensures that the user has the required permissions to perform the requested operation (see [Authorization](#authorization)).
To support authentication, the {{< product lc >}} uses time-limited sessions and access keys.
The time-to-live (TTL) session period is 24 hours.

Authentication of data-access requests is done using data sessions, which are handled transparently by the platform.

Authentication of management requests is done using management sessions, which are created transparently when performing operations from the {{< productUI short_lc >}}, or handled by the user using the {{< product lc >}}'s RESTful {{< xref f="cluster-mgmt/reference/management-apis/" text="cluster-management APIs" >}} ("the management APIs") {{< beta mark="1" >}}.
These APIs use a session-based HTTP scheme to support user authentication and authorization:
access to management API resources requires a time-limited session cookie that is used to authenticate the sender of the request with a username and password, and determine the sender's authorization to perform the requested operation.
See the {{< xref f="cluster-mgmt/reference/management-apis/sessions-api/overview.md" >}} {{< beta mark="1" >}}.
{{< comment >}}<!-- [BETA-MANAGEMENT-APIS] -->
{{< /comment >}}

In addition, the {{< product lc >}}'s {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}} support user authentication by using either the username/password Basic HTTP authentication scheme or custom access-key (session-key) authentication.
With either method, the user provides an authentication header with user credentials that are verified by the {{< product lc >}} as a condition for sending the request.
See {{< xref f="data-layer/reference/web-apis/security.md" a="http-user-authentication" text="HTTP User Authentication" >}} in the {{< xref f="data-layer/reference/web-apis/security.md" t="title" >}} reference.

<a id="access-keys"></a>**Access keys** 

Access keys are not time-bound, and are used mainly for programmatic purposes. 
Access keys are created by authenticated users and can allow only the actions in the scope of the user creating the key: each specific resource access is defined by the management policies of the user.

Access keys are specific to either the data plane, the control plane, or to both. The data plane is relevant to operations on the data itself (put object, write to stream, read kv etc.). The control plane includes create, read, update, and delete, operations on all resources that aren't specifically data in the containers, for example: projects, users, groups, management policies, the containers themselves (not the data inside them), services, etc.

Access keys are not limited to a specific use or environment. They can be delegated and passed on to other entities. The clients running inside Jupyter use the access key from Jupyter and pass it to the resources they create. For example, when MLRun SDK is running inside Jupyter, it passes the access key to the MLRun jobs it creates.

Since access keys be used by anyone who has access to them, they should be closely watched, and their usage should be well monitored.

To create access keys, click the user icon (<img id="user_about_icon" src="/images/user_about_icon.png" alt="User" inline="1" width="2%"/>), then click <gui-label>Access Keys</gui-label>.

When integrated with MLRun 8.0 and higher, in certain wizards, you must add an access key that includes the control plane, for example the create and deploy functions, and the create job and scheduled job. The Auto-generate access key, in the <gui-label>Resources</gui-label> section of the wizard, is selected by default in these wizards. Alternately, you can clear the checkbox and add a custom access key. 

**Identity Provider (IdP)**
The authentication of the user credentials can be done locally, using the {{< product lc >}}'s built-in user management, or using an external Identity Provider (IdP)&mdash;currently Microsoft Active Directory (AD).
{{< comment >}}<!-- [c-security-supported-idps] -->
{{< /comment >}}
When an IdP is configured, it is used to authenticate the identity of all its imported users in the {{< product lc >}}.
This doesn't prevent you from also defining local users and using the {{< product lc >}} to authenticate them.
For more information about using an IdP, see {{< xref f="users-and-security/users.md" a="idp" text="Using an External Identity Provider (IdP)" >}}.
{{< comment >}}<!-- See [c-local-users] in the users.md intro file. -->
{{< /comment >}}

{{< note >}}
In the event of a change in the [management policies](#management-policies) of an authenticated user, the authentication token is revoked and the session expires.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Authorization {#authorization}

**Authorization** is the process of granting a user permission to perform a specific action or access a specific resource based on predefined authorization rules.
To support authorization, the {{< product lc >}} uses policies and permissions that govern the ability to access resources.

- **[Management policies](#management-policies)** are assigned to users and user groups to determine management-related permissions.
    For example, the permission to create a storage pool or restart a cluster is reserved to users who have the IT Admin management policy, and the permission to access the data is reserved to users who have the Data management policy.
- **[Project membership](#project-members)** is assigned to users and user groups to control access to projects and the levels of access. Project membership does not include access to project data.
- **[Data-access policies](#data-access-policies)** define fine-grained rules for determining data-access permissions.
    These policies are used as part of a multi-layered data-access authorization scheme, which also involves the Data management policy and POSIX ACLs.


{{< note id="user-group-permissions-inheritance-note" title="User-Group Permissions Inheritance" >}}
A user inherits the management policies and POSIX permissions of all user groups to which the user belongs.
However, user-group permissions in data-access policy rules are checked only against a user's primary group.
{{< comment >}}<!-- [c-user-group-permissions-inheritance] -->
{{< /comment >}}
{{< /note >}}

{{< comment >}}<!-- [InfraInfo] (sharonl) I decided to use the same heading
  level for the management policies and data-access polices sections as the
  authorization section even though these are types of authorization: I wanted
  to avoid too many nested heading levels and to include links to the two
  authorization-type sections directly from the page mini TOC, which only
  includes h2 headings. TODO: Consider splitting the security doc to pages. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Management Policies {#management-policies}
{{< comment >}}<!-- [IntInfo] (sharonl) (4.3.18) The current version of the
  training GUI overview PPT uses the terminology "User Policy" (Slide 59) but
  Orit told me to use only the terminology "management policies". -->
{{< /comment >}}

Every user and user group (whether locally created or imported) must be assigned one or more of the predefined **management policies**.
These policies define resource-access permissions with management aspects that are applicable globally throughout the {{< product lc >}}.
The management policies are assigned by a security administrator, which is any user with the Security Admin management policy, including the predefined {{< verkey k="predef_users.security_admin_user" >}} user.
For more information about user management in the {{< product lc >}}, see {{< xref f="users-and-security/users.md" >}}.
{{< comment >}}<!-- [IntInfo] (sharonl) (4.3.18) Orit said that in v1.7.x we'll
  support only a closed list of predefined management policies, as documented
  here. In future versions we plan to also allow defining custom policies
  ("RBAC support"). According to our internal Confluence doc, the intention is
  that user-defined management policies could be limited to a specific scope,
  unlike the predefined policies, which apply globally. (28.11.18) This option
  wasn't implemented for v1.7, 1.9, or the future v2.0.0 release, and to my
  recollection it was deferred indefinitely. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
### Predefined Management Policies {#predefined-management-policies}

These are the predefined management policies that a security administrator can assign to users and user groups:

- <a id="mgmt-policy-application-admin"></a>
    **Application Admin**&mdash;full rights to all container operations, such as creating data containers, and defining data-access policies; view and use application services for the current user; view the pipelines dashboard.
    {{< comment >}}<!-- [FUTURE-DLM] (sharonl) TODO: When we add support for
data life-cycle management (DLM), replace "and defining ..." above with this:
"defining data-access policies, and creating data life-cycle rules." -->    {{< /comment >}}
    <br/>
    All locally created and imported users in the {{< product lc >}} (but not the {{< xref f="users-and-security/users.md" a="predefined-users" text="predefined users" >}}) are automatically assigned this policy.

- <a id="mgmt-policy-application-read-only"></a>
    **Application Read Only**&mdash;view all reports without editing; view and use application services for the current user; view the pipelines dashboard.

- <a id="mgmt-policy-data"></a>
    **Data**&mdash;access data and run application services.
    The specific access level is derived from the [data-access policies](#data-access-authorization) and [POSIX ACLs](#posix-acls).
    <br/>
    This policy allows the implicit creation of data sessions, which are used for securing access to data.
    <br/>
    All locally created and imported users in the {{< product lc >}} (but not the {{< xref f="users-and-security/users.md" a="predefined-users" text="predefined users" >}}) are automatically assigned this policy.

- <a id="mgmt-policy-function-admin"></a>
    **Developer**&mdash;the only policy whose users can create projects, and manage and develop Nuclio serverless functions. (Developers can only see the projects that they are members of.)

- <a id="mgmt-policy-it-admin"></a>
    **IT Admin**&mdash;full rights for all IT operations, such as defining storage pools or stopping and starting a cluster.
    This policy includes permissions for viewing event logs and for managing cluster support logs; for more information, see {{< xref f="cluster-mgmt/logging-n-debugging.md" >}}.
    <br/>
    The predefined {{< xref f="users-and-security/users.md" a="user-tenancy_admin" text="tenancy_admin" >}} user is assigned this policy together with the Tenant Admin policy.

- <a id="mgmt-policy-project-admin"></a>
    **Project Admin**&mdash;view all projects, perform all admin tasks on the project, and change a project owner to any user. This policy does not give rights to modify the entities underneath such as features, jobs etc., and does not give rights to delete a project. 
	
- <a id="mgmt-policy-project-read-only"></a>
    **Project Read Only**&mdash;view all projects. A user with the Project Read Only management policy that is not a member of the project cannot drill down to see the project objects such as function, jobs, and so on. 

- <a id="mgmt-policy-security-admin"></a>
    **Security Admin**&mdash;full rights for managing users and user groups.
    This includes creating and deleting users and user groups, assigning management policies, and integrating the {{< product lc >}} with a supported identity provider (see {{< xref f="users-and-security/users.md" a="idp" text="Using an External Identity Provider (IdP)" >}}).
    (All users can view their own user profile and edit some of the properties, including the password.
    For more information, see {{< xref f="users-and-security/users.md" a="user-mgmt-permis-note" >}}.)
    This policy also includes permissions for viewing audit event logs. For more information, see {{< xref f="cluster-mgmt/logging-n-debugging.md" a="event-logs" >}}.
    <br/>
    The predefined {{< xref f="users-and-security/users.md" a="user-security_admin" textvar="product.ver.predef_users.security_admin_user" >}} user is assigned this policy.

- <a id="mgmt-policy-service-admin"></a>
    **Service Admin**&mdash;full rights for managing application services, including creating, configuring, restarting, and deleting user-defined services, configuring and restarting relevant default services, and managing service logs.
    This policy also includes permissions for viewing the pipelines dashboard and for viewing application-service logs from the log-forwarder service. For more information, see {{< xref f="cluster-mgmt/logging-n-debugging.md" a="logging-services" >}}.

- <a id="mgmt-policy-tenant-admin"></a>
    **Tenant Admin**&mdash;full rights for managing tenants, including creating and deleting tenants.
    <br/>
    The predefined {{< xref f="users-and-security/users.md" a="user-tenancy_admin" text="tenancy_admin" >}} user is assigned this policy together with the IT Admin policy.
    {{< comment >}}<!-- [IntInfo] (sharonl) (28.11.18) [FUTURE-MULTI-TENANTS]
    TODO (DOC IG-5726): Consider linking to multi-tenancy documentation when
    added predefined tenancy_admin user has this policy. -->
    {{< /comment >}}

{{< note id="ui-services-page-mgmt-policy-perm-note"
  title="Services Management Policies" >}}
- To view the <gui-title>Services</gui-title> {{< productUI lc >}} page, a user must have the [Service Admin](#mgmt-policy-service-admin), [Application Admin](#mgmt-policy-application-admin), or [Application Read Only](#mgmt-policy-application-read-only) management policy.
    <br/>
    The application policies enable viewing services that are owned by or shared with the logged-in user&mdash;i.e., services for which the user is the running user, shared services, and tenant-wide services without a running user.
    <br/>
    The Service Admin policy enables viewing all services of the parent tenant.
- To run services and be assigned as the running user of a service, a user must have the [Data](#mgmt-policy-data) management policy.
- To manage (administer) services, a user must have the [Service Admin](#mgmt-policy-service-admin) management policy.
    A service administrator can create, delete, disable, enable, or restart services, change service configurations, and view service logs for all users.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Project members {#project-members}

Project membership provide segregation between the various projects and their users. You can specify project members (individual users or user groups) for each project. Each project members has a role that controls access to projects management and the levels of access. It ensures that only users that are members of a given project can view and manage the project. 

To access the <gui-title>Projects</gui-title> page to view and manage projects, users must have one of the following management policies: [Developer](mgmt-policy-function-admin), [Project Admin](mgmt-policy-project-admin), [Project Read Only](mgmt-policy-project-read-only). 

An individual user's permissions (or a user group's permissions) for any one project are the sum of the management policy and the project membership role permissions for that user or group, for that project. Project membership can be managed by users with the Project Admin policy, and by the project's owner.

Project members have one of the following roles:
- Admin&mdash;View, and add and remove members, and change their member role, and all the privileges of the Editor role.
- Editor&mdash;Edit the project. The editor has management and configuration rights for the project, for example changing function code, and creating a job. It cannot modify members or change ownership.
- Viewer&mdash;View all project content, but cannot create, edit, or delete objects in the project.

These roles are control plane roles only. Project data is managed on a different layer. Data permissions for data that resides in Iguazio’s data layer 
are controlled by the data access policies and POSIX ACLs.

The user that creates the project is the owner and is also an admin member of the project. The owner has management and configuration rights for the project, 
for example: changing function code; creating a job; and adding and modifying admin, editor, and viewer members. The owner can change the ownership to another user. 
In this scenario the original owner remains an admin member. 

To help understand the permissions, here are a few examples:
- User x has Project Admin management policy and is a Viewer member of project p. The viewer member gives read permissions and the Project Admin policy gives permission to update the owner of project p.
- User y has Developer management policy and is an Admin member of project p. The Developer policy gives permission to create projects, and the Admin member allows the user to add and remove members, and change their member role for project p.
- User z has Developer management policy and is a Viewer member on a project p. But user z is also part of a group that has an Editor role on that project. User z effectively has the Editor role on project p and can create projects with the Developer policy.

The project owner and the number of members are both displayed in the left pane of the individual project pages. Click <gui-label>Change</gui-label> or <gui-label>Manage</gui-label> to modify the owner, or members and their permissions.
{{< igz-figure id="project_permission" src="/images/project_permission.png" alt="Project permissions summary" >}}

**Upgrading from pre-v3.2.0**

During the upgrade you must designate one user to own all of the migrated projects.

After upgrade to v3.2.0, all pre-existing projects are associated with a (dynamically updated) group of all users, named <code>all users</code>, such that all users have access to all projects. (This is the pre-upgrade behavior.) After the upgrade you can assign members to each project. 
 
<!-- //////////////////////////////////////// -->
## Data-Access Authorization {#data-access-authorization}

The {{< product lc >}} uses a multi-layered data-authorization scheme:
each data-service operation&mdash;read, write, update, delete, etc.&mdash;is processed and examined in three layers, to ensure that the environment is protected and secured.
Each layer can add to the restrictions of the previous layer:

<dl>
  <dt id="data-mgmt-policy">The "Data" Management Policy</dt>
  {{< comment >}}<!-- (sharonl) (21.2.18) I changed "Data Management Policy"
    in the title to 'The "Data" Management Policy", in consultation with Adi
    and Orit. Adi thought "Data Management Policy" can be confusing and
    construed as a policy for data management, and on the other hand, Orit and
    I thought "Data Policy" can be confused with the data-access policies
    (especially when internally people in the company often use "data policy"
    as a shorthand for "data-access policy" and this terminology also appears
    in presentations that are shown to customers.) -->
  {{< /comment >}}
  {{< dd >}}
  As a preliminary step to accessing data in the {{< product lc >}}, a user must have the [Data](#mgmt-policy-data) management policy.
  This policy enables the implicit creation of data sessions, which are used for securing access to data.
  (The {{< verkey k="predef_users.tenancy_admin_user" >}} and {{< verkey k="predef_users.security_admin_user" >}} {{< xref f="users-and-security/users.md" a="predefined-users" text="predefined users" >}} do not have this policy and therefore cannot access data or view the  {{< productUI lc >}}'s <gui-title>Data</gui-title> page.)
  {{< /dd >}}

  <dt>POSIX ACLs</dt>
  {{< dd >}}
  Use the portable operating-system interface access control lists ([POSIX ACLs](#posix-acls)) to define file-system permissions. 
  {{< /dd >}}
  
  <dt>Data-Access Policies</dt>
  <!-- [IntInfo] (sharonl) (12.3.18) Some of our internal and external training
    and marketing documentation uses the terms "data policies" to refer to
    "data-access policies and "security policies" (typically for all policy
    types). However, Orit thinks "data policies" might be confused with the
    Data management policy and asked to always used "data-access policies", and
    she also said not to use the terminology "security policies". In addition,
    she said not to refer to policies, in general, as being assigned to users
    or groups as this is true only for the management policies. -->
  {{< dd >}}
  Use the Data-access policies to define fine-grained policies for restricting access to determine whether to grant or restrict access to a specific data resource and to what extent.
  For example, to create a subnetwork (subnet) whitelist, define interface data-access eligibility, restrict the right to read a payments table that contains sensitive data to members of your organization's finance group (restrict access to a table only to specific user groups), limit the write privileges for updating the online transactions stream to members of the operational team (give some users only read-only permissions for a specific file). 
  See additional information in the [Data-Access Policy Rules](#data-access-policy-rules) section.
  {{< /dd >}}
</dl>

The following diagram illustrates the {{< product lc >}}'s multi-layered data-authorization scheme:
{{< igz-figure id="img-security_platform_multi_layer_protection" src="/images/security_platform_multi_layer_protection_1.png" alt="Multi-layered authorization diagaram" width="600" >}}

In most solutions, too many policy rules that need to inspect every data operation will come at a cost and may cause a performance degradation and low throughput, as the inspection takes time.
However, in the {{< product full >}}, the data-access policy rules are compiled and stored in an optimized binary format on every policy change&mdash;rule addition, removal, or update.
This allows the {{< product lc >}} to process the rules in a fast and effective manner, resulting in high-performance processing for each data request, in line rate, while keeping the environment highly secured.
{{< comment >}}<!-- [IntInfo] (sharonl) (5.3.18) Orit said not to mention our
  specific line rate (100 GbE) in the doc). -->
{{< /comment >}}
{{< igz-figure id="img-security_rules_processing_platform" src="/images/security_rules_processing_platform.png" alt="Platform security-rules procsesing diagram" width="800" >}}

{{< note id="multi-layered-auth-notes" >}}
<a id="symlink-data-access-permiss-note"></a>For symbolic links, the {{< product lc >}} requires that both the data-access permissions of the source and destination locations are met.
{{< comment >}}<!-- [c-symlink-data-access-permiss] [IntInfo] (sharonl)
  (3.11.19) Added at Orit's request. See DOC IG-12001. This is also documented
  in the sw-specifications.md spec (#symlink-data-access-permiss). -->
{{< /comment >}}
{{< /note >}}

<!-- ---------------------------------------- -->
### POSIX ACLs {#posix-acls}
When you create a project, a directory is created in the projects container for that project and it serves as the default path for project files. This directory is created by the user who is the owner of the project, and by default is accessible to users that belong to the same primary POSIX group as the owner. When other users attempt to access the project files, they need to belong to the same group as the project owner. To restrict access to specific users:

1. Add specific users and/or groups to directories and files as relevant.
1. Deny access to all users and groups.

Users must have the [Data](#mgmt-policy-data) management policy, and they must have access to any other locations where related data is stored. 
<!-- ---------------------------------------- -->
### Data-Access Policy Rules {#data-access-policy-rules}
{{< comment >}}<!-- TODO: (sharonl) Move relevant parts of this section, such
  as the step-by-step examples (#data-access-policy-rules-examples), to a
  tutorial or guide. -->
{{< /comment >}}

Users with the [Application Admin](#mgmt-policy-application-admin) management policy (such as the predefined {{< verkey k="predef_users.security_admin_user" >}} user) can define a set of fine-grained data-access policy rules.
These rules are checked for each data operation and are used to determine whether to allow or deny the data request.
Data-access policy rules are defined in the context of a specific data container and apply to all data objects in the container, regardless of their type.

- [Defining Rules](#defining-data-access-policy-rules)
- [Rules Processing](#data-access-policy-rules-processing)
- [Predefined Rules and Layers](#predefined-data-access-policy-rules-n-layers)
- [Examples](#data-access-policy-rules-examples)
- [Data Categories](#data-categories)

<!-- ======================================== -->
#### Defining Rules {#defining-data-access-policy-rules}

Data-access policy rules are managed from the <gui-title>Data | &lt;container&gt; | Data-Access Policy</gui-title> {{< productUI lc >}} tab, which displays the [predefined data-access policy rules and layers](#predefined-data-access-policy-rules-n-layers) and options for adding and editing rules, groups, and layers, as demonstrated for the "{{< getvar v="product.users_container.name" >}}" data container in the following image:

{{< igz-figure id="img-dashboard_data_access_policy_tab_users" src="/images/dashboard_data_access_policy_tab_users_1.png" alt="Dashboard Data-Access Policy tab for the users container" >}}

A rule must belong to a data-access **layer**.
You can either add rules to one of the predefined layers for the parent data container or create your own layer: select the <gui-label>New Layer</gui-label> option from the <gui-label>New Rule</gui-label> drop-down menu in the top action toolbar; in the new-layer dialog window, enter the layer name and select <gui-label>Create</gui-label>.
The following image demonstrates creation of a new layer named "Default layer":
{{< igz-figure id="img-dashboard_data_access_policy_create_new_layer_example_w_menu_select" src="/images/dashboard_data_access_policy_create_new_layer_example_w_menu_select_1.png" alt="Create new 'Default layer' data-access policy layer" >}}

You can add rules directly to a layer or group multiple rules into one or more rule **groups** within a layer.
To add a new group, select the <gui-label>New Group</gui-label> option from the <gui-label>New Rule</gui-label> drop-down menu in the action toolbar; in the new-group dialog window, enter the group name, select a parent layer, and select <gui-label>Create</gui-label>.

The purpose of the layers and groups is to help you manage your rules and easily reorder rules to change the processing logic, as explained in the [Rules Processing](#data-access-policy-rules-processing) section.
You can rename a layer or group by selecting and editing the name in the rules table, and you can delete it by selecting the delete icon (<span class="igz-icon-ui-delete"></span>) for the relevant table entry.

To add a new data-access policy **rule**, select the <gui-label>New Rule</gui-label> option from the action toolbar; in the new-rule dialog window, enter the rule name, select a parent layer and optionally a parent group, and select <gui-label>Create</gui-label>.
The following image demonstrates creation of a new rule named "Rule 1" in a layer named "Default layer":
{{< igz-figure id="img-dashboard_data_access_policy_create_new_rule_example_w_menu_select" src="/images/dashboard_data_access_policy_create_new_rule_example_w_menu_select_1.png" alt="Create new data-access policy rule" >}}

{{< note id="data-access-policy-rules-apply-changes-note" >}}
Remember to select <gui-label>Apply Changes</gui-label> from the pending-changes toolbar to save your changes.
{{< /note >}}

After you create a rule, select it from the rules table to display the rule pane and define the permissions for accessing the data based on one or more of the following characteristics (**match criteria**).

{{< note id="data-access-policy-rules-logic-note" >}}
All match-criteria rule sections, whether defined in the same tab or in different tabs, are accumulative ("AND"), but the values in each section are alternative ("OR"), except where otherwise specified.
For more information, see the [Rules Processing](#data-access-policy-rules-processing) explanation and the [Examples](#data-access-policy-rules-examples).
{{< comment >}}<!-- [c-data-access-policy-rules-processing-exceptions] [IntInfo]
  (sharonl) (29.11.18) I added "except where otherwise specified" to cover
  exceptions such as the known issue for Bug IG-8415. (27.2.19) Bug IG-8415 was
  resolved in v2.0.0 and the related doc notes were removed, but I decided to
  keep the "except where otherwise specified" part in case we have other
  exceptions. -->
{{< /comment >}}
{{< /note >}}

<dl>
  <dt id="data-access-policy-sources">Sources</dt>
  {{< dd >}}
  A rule can be restricted to specific sources.
  {{< igz-figure id="img-dashboard_data_access_policy_rule_sources" src="/images/dashboard_data_access_policy_rule_sources.png" alt="Dashboard data-access policy rule - Sources tab" width="300" inline="1" >}}

  Currently, the {{< product lc >}} support an <gui-label>Interfaces</gui-label> source type, which is an interface for accessing the data:

  - <gui-label>Web APIs</gui-label>&mdash;the {{< product lc >}}'s {{< xref f="data-layer/reference/web-apis/" text="web-APIs" >}}, which are available via the web-APIs service (`{{< verkey k="webapi.service_display_name" >}}`)
    - <gui-label>V3io Daemon<gui-label>&mdash;the {{< product lc >}}'s core daemon service (`{{< verkey k="v3io_daemon.service_display_name" >}}`), which connects application services (such as Spark and Presto) to the {{< product lc >}}'s data layer.
    - <gui-label>File system</gui-label>&mdash;Linux file-system operations.
  {{< /dd >}}

  <dt id="data-access-policy-users">Users</dt>
  {{< dd >}}
  A rule can be restricted to a specific list of predefined users or user groups.
  Note that user-group match criteria in data-access policy rules are applicable only to the primary group of the user who attempts to access the data.
  {{< comment >}}<!-- [c-user-group-permissions-inheritance] -->
  <!-- [c-data-access-policy-users-n-groups-must-exist] [IntInfo] (sharonl)
    (28.11.18) It's not possible to define a data-access policy rule for a user
    that isn't already defined in the parent tenant (confirmed with Eran N.).
  -->
  {{< /comment >}}
  {{< igz-figure id="img-dashboard_data_access_policy_rule_users" src="/images/dashboard_data_access_policy_rule_users.png" alt="Dashboard data-access policy rule - Users tab" width="300" inline="1" >}}
  {{< /dd >}}

  <dt id="data-access-policy-resources">Resources</dt>
  {{< dd >}}
  A rule can be restricted to specific data resources.
  {{< igz-figure id="img-dashboard_data_access_policy_rule_resources" src="/images/dashboard_data_access_policy_rule_resources.png" alt="Dashboard data-access policy rule - Resources tab" width="300" inline="1" >}}

  A resource can be defined as a path within the container, such as the path to a table or stream or to a subdirectory or file.

  <a id="data-access-policy-resource-categories"></a>
  A resource can also be defined as a logical category of data&mdash;such as audio, video, logs, or documents.
  For a list of all resource data categories and the file extensions that they represent, see [Data Categories](#data-categories).
  {{< /dd >}}
</dl>

<a id="data-access-policy-permissions"></a>
After defining the match criteria for the rule, you define the **data-access permissions** to be applied when there's a full match.
You can select whether to allow or deny access to the data and to what extent.
For example, you can grant only read permissions, deny only the create and delete permissions, or allow or deny full access.
The following image demonstrates full data-access permissions:
{{< igz-figure id="img-dashboard_data_access_policy_rule_perms_allow_all" src="/images/dashboard_data_access_policy_rule_perms_allow_all_1.png" alt="Dashboard data-access policy rule - Permissions tab, allow all example, allow all" width="300" >}}

{{< note id="rule-actions" >}}
You can disable or enable, duplicate, or delete a rule, at any time, from the rule action menu (<span class="igz-icon-ui-more"></span>).
{{< /note >}}

<!-- ======================================== -->
#### Rules Processing {#data-access-policy-rules-processing}

The rules are processed for each data operation according to the order in which they appear in the {{< productUI lc >}}.
You can change the processing order, at any time, by changing the order of the data-access policy rules in the {{< productUI lc >}}:
you can change the order of the rules and rule groups within each container data-access layer; change the order of rules within each group; and change the order of the layers.

**When a full match between the operation and a policy rule is found, the processing stops** and the data accessibility is set according to the permissions of the first-matched rule.
A match is identified by checking all components of the rule.
All match-criteria rule sections are accumulative ("AND") but the values in each section are alternative ("OR"), except where otherwise specified.
See the [examples](#data-access-policy-rules-examples) for a better understanding.
{{< comment >}}<!-- [c-data-access-policy-rules-processing-exceptions] -->
{{< /comment >}}

{{< note id="data-access-policy-rules-processing-notes" >}}
<a id="data-access-policy-rules-default-policy-fully-permissive"></a>**The {{< product lc >}}'s default data-access policy is fully permissive**:
users with data-access permissions&mdash;i.e., users with a [Data](#mgmt-policy-data) management policy for the parent container&mdash;aren't restricted in their access, subject to the optional definition of POSIX rules.
It's therefore recommended that you safeguard your data by always defining a deny-all rule as the last data-access policy rule, as demonstrated in the [examples](#data-acess-policy-example-deny-all-rule).
{{< /note >}}

<!-- ======================================== -->
#### Predefined Rules and Layers {#predefined-data-access-policy-rules-n-layers}

The {{< product lc >}} predefines the following data-access policy layers and rules for each data container, except where otherwise specified:

- <a id="predef-data-access-policy-layer-system"></a>**{{< verkey k="predef_data_access_policy_layers.sys" >}}**&mdash;A system-administration layer that has the following predefined rule:

    - <a id="predef-data-access-policy-rule-backup"></a>**{{< verkey k="predef_data_access_policy_rules.bck" >}}**&mdash;This rules grants the [predefined "{{< verkey k="predef_users.bck_user" >}}" backup user]({{< xref f="users-and-security/users.md" a="backup-user" t="url" >}}) full data access, to support data backups.
        It's recommended that you keep this rule as the first rule in your processing order.

        {{< igz-figure id="img-dashboard_data_access_policy_predef_backup_rule_def" src="/images/dashboard_data_access_policy_predef_backup_rule_def_1.png" alt="Predefined system-layer backup data-access policy rule" >}}

- <a id="predef-data-access-policy-layer-monitoring"></a>**{{< verkey k="predef_data_access_policy_layers.monitoring" >}}**&mdash;A monitoring-service layer that has the following predefined rules:

    - <a id="predef-data-access-policy-rule-monitoring"></a>**{{< verkey k="predef_data_access_policy_rules.monitoring" >}}**&mdash;This rule is defined only for the predefined "{{< getvar v="product.users_container.name" >}}" container and grants the [predefined "{{< verkey k="predef_users.monitoring_user" >}}" user]({{< xref f="users-and-security/users.md" a="user-monitoring" t="url" >}}) full data access to the <dirname>{{< verkey k="monitoring.dir.name" >}}</dirname> directory, which is automatically created in the root directory of this container for use by the monitoring service.

        {{< igz-figure id="img-dashboard_data_access_policy_predef_monitoring_rule_def" src="/images/dashboard_data_access_policy_predef_monitoring_rule_def_1.png" alt="Predefined monitoring-layer monitoring data-access policy rule" >}}

    - <a id="predef-data-access-policy-rule-no-access"></a>**{{< verkey k="predef_data_access_policy_rules.no_access" >}}**&mdash;This rule denies the predefined "{{< verkey k="predef_users.monitoring_user" >}}" user all data access.
        Note that on the "{{< getvar v="product.users_container.name" >}}" container, this rule must not precede the "{{< verkey k="predef_data_access_policy_rules.monitoring" >}}" rule, as the first rule takes precedence (see the [rules processing order](#data-access-policy-rules-processing)).
        {{< igz-figure id="img-dashboard_data_access_policy_predef_monitoring_no_access_rule_def" src="/images/dashboard_data_access_policy_predef_monitoring_no_access_rule_def_1.png" alt="Predefined monitoring-layer no-access data-access policy rule" >}}

<!-- ======================================== -->
#### Examples {#data-access-policy-rules-examples}

The [predefined data-access policy rules](#predefined-data-access-policy-rules-n-layers) provide examples of granting and restricting data access for a specific user and/or resource (data directory).
Following is a step-by-step example of adding your own custom data-access policy rules from the {{< productUI lc >}} <gui-title>Data-Access Policy</gui-title> tab.

1. <a id="data-acess-policy-example-new-layer"></a>Create a new **"Default layer"** layer:
    from the top action toolbar, select the drop-down arrow on the <gui-label>New Rule</gui-label> button and select the <gui-label>New Layer</gui-label> option from the menu.
    In the <gui-title>Create new layer</gui-title> dialog window, enter your selected layer name&mdash;"Default layer" for this example:

    {{< igz-figure id="img-dashboard_data_access_policy_create_new_layer_example_w_menu_select" src="/images/dashboard_data_access_policy_create_new_layer_example_w_menu_select_1.png" alt="Create new 'Default layer' data-access policy layer" >}}

    Keep the new layer after the predefined layers in the rules table (default).

2. <a id="data-acess-policy-example-it-logs-rule"></a>Define a custom **"IT Logs"** rule that grants members of the "it-admins" user group full permissions to access any log or document file in either the <path>system/logs</path> or <path>it</path> directories in the parent container:
    {{< note id="data-access-policy-rules-example-users-n-dir-note" >}}
To define and test this rule, you need to create an "it-admins" group from the <gui-title>Identity | Groups</gui-title> {{< productUI lc >}} tab, assign users to this group, and create the directories that are specified in the match criteria.
Alternatively, you can change the match criteria to accommodate your environment and needs.
{{< comment >}}<!-- [c-data-access-policy-users-n-groups-must-exist] -->
{{< /comment >}}
    {{< /note >}}

    1. <a id="data-acess-policy-example-it-logs-rule-new-rule"></a>From the top action toolbar, select the <gui-label>New Rule</gui-label> option.
        In the <gui-title>Create new rule</gui-title> dialog window, enter your selected rule name&mdash;"IT Logs" for this example.

        {{< igz-figure id="img-dashboard_data_access_policy_rules_example_it_logs_create_new_rule_w_menu_select" src="/images/dashboard_data_access_policy_rules_example_it_logs_create_new_rule_w_menu_select_1.png" alt="Create new 'IT Logs' rule" >}}

    2. <a id="data-acess-policy-example-it-logs-rule-users"></a>Select the <gui-label>Users/Groups</gui-label> cell of the "IT Logs" rule in the rules table to display the <gui-label>Users</gui-label> tab in the rule pane on the right.
         In the <gui-label>Users/Groups</gui-label> input box, start typing "it-admins" and select this group from the list.

        {{< igz-figure id="img-dashboard_data_access_policy_rules_example_it_logs_users" src="/images/dashboard_data_access_policy_rules_example_it_logs_users_1.png" alt="'IT Logs' users" >}}

    3. <a id="data-acess-policy-example-it-logs-rule-resources"></a>Select the <gui-title>Resources</gui-title> tab in the "IT Logs" rule pane.
        In the <gui-label>Paths</gui-label> section, select the plus sign (<span class="igz-icon-ui-add"></span>), enter `/system/logs` in the input box, and select <gui-label>Apply</gui-label>.
        Repeat this step but this time enter the path `/it`.

        {{< igz-figure id="img-dashboard_data_access_policy_rules_example_it_logs_resources" src="/images/dashboard_data_access_policy_rules_example_it_logs_resources_1.png" alt="'IT Logs' resources" >}}

    4. <a id="data-acess-policy-example-it-logs-rule-perms"></a>In the <gui-title>Permissions</gui-title> tab, keep the default allow-all permissions.

3. <a id="data-acess-policy-example-deny-all-rule"></a>Define a custom **"Deny All"** rule that denies all data access, as recommended in the [rule-processing](#data-access-policy-rules-processing-notes) section:

    1. <a id="data-access-policy-example-deny-all-rule-new-rule"></a>Create a new rule in the "Default layer" layer and name it "Deny All".

    2. <a id="data-access-policy-example-deny-all-rule-perms"></a>Select the <gui-label>Permissions</gui-label> cell of the "Deny All" rule in the rules table.
        In the <gui-title>Permissions</gui-title> rule tab, select the <gui-label>Deny</gui-label> option from the permissions drop-down box and keep all permission check boxes checked to deny all data-access permissions.

        {{< igz-figure id="img-dashboard_data_access_policy_rules_example_deny_all_perms" src="/images/dashboard_data_access_policy_rules_example_deny_all_perms_1.png" alt="'Deny All' permissions" >}}

        {{< note id="data-access-policy-example-deny-all-notes" >}}
- The deny-all rule must be the last rule in the data-access policy rules table; any rules that appear after it will be ignored.
    You can move the rule to another layer, if you wish.
- You might want to disable this rule during the initial stages of your development and testing, as it blocks all data access that isn't explicitly permitted in other (preceding) data-access policy rules.
        {{< /note >}}

4. <a id="data-acess-policy-example-apply-changes"></a>Select <gui-label>Apply Changes</gui-label> from the pending-changes toolbar to save your changes:
        {{< igz-figure id="img-dashboard_data_access_policy_apply_changes_select" src="/images/dashboard_data_access_policy_apply_changes_select_1.png" alt="Apply changes" >}}

You can now see your new layer and rules in the data-access policy rules table:

{{< igz-figure id="img-dashboard_data_access_policy_rules_example_it_logs_n_deny_all" src="/images/dashboard_data_access_policy_rules_example_it_logs_n_deny_all_1.png" alt="'Default layer' and rules in the data-access policy rules table" >}}

<!-- ======================================== -->
#### Data Categories {#data-categories}
{{< comment >}}<!-- [IntInfo] See
  http://confluence.iguazeng.com:8090/display/PM12345/Categories. -->
{{< /comment >}}

The following table lists the supported data categories, which can be used to define a [resource](#data-access-policy-resource-categories) for a data-access policy rule, and the file extensions that each category represents:

<table>
<tr text-align="left">
  <th style="font-weight:bold;">
    Resource Category
  </th>
  <th style="font-weight:bold; vertical-align:top;">
    File Extensions
  </th>
</tr>
<tr id="data-category-archives">
  {{< td >}}Archives{{< /td >}}
  {{< td >}}7Z, ACE, AR, ARC, ARJ, B1, BAGIT, BZIP2, CABINET, CFS, COMPRESS, CPIO, CPT, DGCA, DMG, EGG, GZIP, ISO, KGB, LBR, LHA, LZIP, LZMA, LZOP, LZX, MPQ, PEA, RAR, RZIP, SHAR, SIT, SQ, SQX, TAR, TAR.GZ, UDA, WAD, XAR, XZ, Z, ZIP, ZIPX, ZOO, ZPAQ
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-audio" >}}Audio{{< /td >}}
  {{< td >}}AIFF, AIFCDA, M4A, M4B, MID, MIDI, MP3, MPA, OGG, WAV, WMA, WPL
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-data" >}}Data{{< /td >}}
  {{< td >}}AVRO, CSV, DAT, DATA, JSON, MDB, ORC, PARQUET, RC, SAV, TSV, XML
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-documents" >}}Documents{{< /td >}}
  {{< td >}}DOC, DOCX, KEY, ODT, ODP, PDF, PPS, PPT, PPTX, RTF, TEX, TXT, WKS, WPS, WPD, XLS, XLSX
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-logs" >}}Logs{{< /td >}}
  {{< td >}}LOG{{< /td >}}
</tr>
<tr>
  {{< td id="data-category-pictures" >}}Pictures{{< /td >}}
  {{< td >}}ANI, ANIM, APNG, ART, BMP, BPG, BSAVE, CAL, CIN, CPC, CPT, CUR, DDS, DPX, ECW, EXR, FITS, FLIC, FLIF, FPX, GIF, HDRI, HEVC, ICER, ICNS, ICO, ICS, ILBM, J2K, JBIG, JBIG2, JLS, JNG, JP2, JPEG, JPF, JPG, JPM, JPX, JXR, KRA, LOGLUV, MJ2, MNG, MIFF, NRRD, ORA, PAM, PBM, PCX, PGF, PGM, PICTOR, PPM, PNM, PNG, PSB, PSD, PSP, QTVR, RAS, RBE, SGI, TGA, TIF, TIFF, UFO, UFP, WBMP, WEBP, XBM, XCF, XPM, XR, XWD
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-programs-binaries" >}}Programs/Binaries{{< /td >}}
  {{< td >}}BIN, CER, CFM, CGI, CLASS, COM, CPP, CSS, DLL, EXE, H, HTM, HTML, JAVA, JS, JSP, PART, PHP, PL, PY, RSS, SH, SWIFT, VB, XHTML
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-sw-packaging" >}}Software Packaging{{< /td >}}
  {{< td >}}APK, DEB, EAR, JAR, JAVA, MSI, RAR, RPM, VCD, WAR
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-system-files" >}}System Files{{< /td >}}
  {{< td >}}BAK, CAB, CFG, CPL, CUR, DMP, DRV, ICN, INI, LNK, SYS, TMP
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-video" >}}Video{{< /td >}}
  {{< td >}}3G2, 3GP, AVI, FLV, H264M4V, MKV, MOV, MP4, MPG, RM, SWF, VOB, WMV
  {{< /td >}}
</tr>
<tr>
  {{< td id="data-category-vm-images" >}}Virtual-Machine (VM) Images{{< /td >}}
  {{< td >}}NVRAM, VMDK, VMSD, VMSN, VMSS, VMTM, VMX, VMXF
  {{< /td >}}
</tr>
</table>

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="users-and-security/users.md" >}}
- {{< xref f="data-layer/reference/web-apis/security.md" >}}
- {{< xref f="cluster-mgmt/reference/management-apis/sessions-api/" text="Sessions Management API" >}} {{< beta mark="1" >}}
    {{< comment >}}<!-- [BETA-MANAGEMENT-APIS] -->
    {{< /comment >}}
- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="security" text="Security software specifications and restrictions" >}}

