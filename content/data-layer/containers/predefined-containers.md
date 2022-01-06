---
title: "The Predefined Containers"
description: "Learn about the Iguazio MLOps Platform's predefined data containers."
keywords: "predefined data containers, predefined containers, data containers, containers, users container, users, projects container, project, bigdata container, bigdata"
menu:
  main:
    parent:     "data-containers"
    identifier: "predefined-containers"
    weight:     10
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces content previously found in
  concepts/containers-collections-objects.md,
  tutorials/getting-started/fundamentals/#data-containers, and
  tutorials/getting-started/containers/#overview. -->
{{< /comment >}}
{{< comment >}}<!-- [c-projects-default-container] [c-bigdata-container-rm]
  [IntInfo] See info in data/vars/product.toml. -->
{{< /comment >}}

The standard {{< product lc >}} installations have several predefined containers &mdash; ["users"](#users-container), ["projects"](#projects-container), and ["bigdata"](#bigdata-container).

<!-- //////////////////////////////////////// -->
## The "{{< getvar v="product.users_container.name" >}}" Container {#users-container}

The "{{< getvar v="product.users_container.name" >}}" container is designed to provide individual user development environments and is used by the {{< product lc >}} to manage application services.
    When creating a new web-based shel or Jupyter Notebook, the {{< product lc >}} automatically creates a <dirname>{{< getvar v="product.running_user.envar_value" >}}</dirname> directory for the service's running user in This container (if it doesn't already exist).
    This directory serves as the home directory of the service environment (`$HOME`) and is used to store different files for managing the service.

{{< note id="users-container-restrictions-note" >}}
See the restrictions for this container in the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="users-container-restrictions" >}}.
{{< comment >}}<!-- See [c-users-container-restrictions] in the specs. -->
{{< /comment >}}
{{< /note >}}

<!-- ---------------------------------------- -->
### Predefined Environment Variables {#users-container-envars}

The {{< product lc >}}'s command-line services (Jupyter Notebook and the web shell) predefine the following environment variables for simplifying access to the running-user directory of the predefined "{{< getvar v="product.users_container.name" >}}" container:

{{% include f="users-container-envars" %}}

<!-- //////////////////////////////////////// -->
## The "{{< getvar v="product.projects_container.name" >}}" Container {#projects-container}

The "{{< getvar v="product.projects_container.name" >}}" container is designed for storing shared project artifacts.
 
{{< note id="projects-container-notes" >}}
- <a id="default-shared-project-artifacts-path-note"></a>When creating a new shared project, the default project artifacts path is <path>{{< getvar v="product.default_shared_project_artifacts_dir.path" >}}</path>; (in the current release, all projects are shared across the parent tenant).
- <a id="projects-container-no-default-data-access-protection"></a>By default, the "{{< getvar v="product.projects_container.name" >}}" container isn't protected by the {{< xref f="users-and-security/security.md" a="mgmt-policy-data" text="Data management policy" >}}, because the data in this container is designed to be shared.
    However, {{< xref f="users-and-security/security.md" a="mgmt-policy-security-admin" text="a security administrator" >}} can select to add such protection.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## The "{{< getvar v="product.bigdata_container.name" >}}" Container {#bigdata-container}

The {{< getvar v="product.bigdata_container.name" >}}" container has no special significance in the current release, and it will no longer be predefined in future releases.
    However, you'll still be able to use your existing "{{< getvar v="product.bigdata_container.name" >}}" container and all its data, or create a custom container by this name if it doesn't already exist.
    {{< comment >}}<!-- [c-bigdata-container-rm] [FUTURE-TODO] Remove when we
      no longer predefine a "bigata" container" (see info in product.toml). -->
    {{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/containers/container-names.md" >}}
- {{< xref f="data-layer/containers/working-with-containers.md" >}}
- {{< xref f="data-layer/objects/" >}}

