---
title: "Container Names and IDs"
description: "Learn about data-containers identification in the Iguazio MLOps Platform using container names and IDs."
keywords: "data-container names, container names, data-container ids, container ids, container-name restrictions, naming restrictions"
menu:
  main:
    parent:     "data-containers"
    identifier: "container-namess"
    weight:     20
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces content previously found in
  concepts/containers-collections-objects.md. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Container Names {#container-names}

Every container has a **name**, which is a user-assigned string that uniquely identifies the container within its tenant and in the {{< productUI lc >}}.

<!-- //////////////////////////////////////// -->
## Container-Name Restrictions {#container-name-restrictions}
{{< comment >}}<!--  -->
<!-- [IntInfo] (sharonl) (23.4.18)
- See DOC Task IG-7463 for which we edited this section, and related v1.7.0 DOC
  task IG-7464 for Requirement IG-7308 to make container names
  case-insensitive; (this might not be done in time for v1.7.0).
- The container-name restrictions are also documented in the
  sw-specifications.md specs page (see "#attribute-names").
-->
{{< /comment >}}

Container names are subject to the general {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="file-names" text="file-system naming restrictions" >}} and the following additional restrictions:

- Contain only the following characters:

    - Lowercase letters (a&ndash;z) and numeric digits (0&ndash;9)
    - Hyphens (-)
    - Underscores (_)
- Begin and end with a lowercase letter (a&ndash;z) or a numeric digit (0&ndash;9)
- Contain at least one lowercase letter (a&ndash;z)
- Not contain multiple successive hyphens (-) or underscores (_)
- Length of 1&ndash;{{< verkey k="container_name_max_length" >}} characters

{{< note >}}
Container names cannot contain spaces.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Container IDs {#container-ids}

The {{< product lc >}} assigns every container a unique numeric **ID**.

{{< note title="Container-ID Deprecation" id="note-container-id-deprecation" >}}
Whenever possible, identify a container by its name (or "alias") and not by its ID.
For {{< product lc >}} APIs that support both identification methods, the container-ID option is deprecated and will eventually be removed.
{{< /note >}}
{{< comment >}}<!-- (sharonl) The text-container-name-not-container-id-note
  shortcode is used to refer to this note from other pages. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="container-names" text="Container-name software specifications and restrictions" >}}
- {{< xref f="data-layer/containers/working-with-containers.md" >}}

