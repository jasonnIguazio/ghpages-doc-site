---
title: "Projects Overview"
description: "Learn about data science projects in the Iguazio MLOps Platform and and how to manage the project life cycle."
keywords: "containers, collections, objects, data objects, files, streams, tables, stream shards, stream reocrds, attributes, names, container names, object names, attribute names, primary key, sharding key, sorting key, range scan, restrictions, terminology"
menu:
  main:
    parent:     "intro"
    identifier: "projects-overview"
    weight:     10
publishDate:  2050-01-01
---
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] [IntInfo] (sharonl) (14.1.21) I moved
  this to the intro/ section and I set a future publication date (see
  `publishDate`) because it was decided, for now, to document projects only as
  part of the separate MLRun documentation, which is currently available in the
  restructured doc-site docs within an iframe on ds-and-mlops/_index.md - which
  includes all the MLRun doc sections that we linked to from the previous
  Projects concepts page.
  (9.3.21) As part of the new v3.0.0 restructured-site .htaccess URL redirect
  rules, we now also redirect both this page and the old project-life-cycle/
  concepts/ page to ds-and-mlops/ (see doc-assets PR #30 for DOC IG-17510).
  Therefore, I removed the previous `aliases` front-matter redirection:
aliases:
  - /concepts/project-life-cycle/
  TODO: If and when we add version-specific projects doc for the
  platform, in v3.0.0 we changed the UI "Projects" page to integrate the MLRun
  and Nuclio projects and create a single platform projects concept; and we
  added a predefined projects container and set the default artifacts for new
  projects to projects/<project name>/artifacts - see Requirement IG-15834 /
  DOC IG-17802.
  (3.1.21) The page was moved from concepts/ to ds-and-mlops/ and reclassified
  as "Projects Overview". -->
{{< /comment >}}
{{< comment >}}<!-- [c-projects-url] [IntInfo] (sharonl) (6.9.20) Initially we
  planned to have a project-life-cycle.md page, but when creating the page I
  decided that projects.md is more appropriate. As the v2.10.0 UI Help Center
  page already linked to the URL for the originally planned page -
  https://www.iguazio.com/docs/latest-release/concepts/project-life-cycle - we
  added am alias to redirect the original URL, which is used in the UI. -->
{{< /comment >}}

The {{< product full >}} ("the {{< product lc >}}") allows you to organize your work by using MLRun projects.
<a id="definition-project"></a>A **"project"** serves as a container for all your work on a particular activity ("project"), including all the related code, jobs, and artifacts.
Projects are also a great way to collaborate with others: you can share your projects with other users, as well as create projects based on existing projects.

{{< comment >}}<!-- TODO: ADD CONTENT and either remove the following or move
  it to the end / to the "See Also" section.
  Also add cross references to this page from other doc-site pages. -->
{{< /comment >}}
For more information about MLRun projects and their components and how to manage the project life cycle, see the {{< url v="mlrun_docs" k="text" link="1" >}}, and especially these topics:

- [Projects]({{< url v="mlrun_docs" k="full" >}}/projects.html)
- [Data Management and Versioning]({{< url v="mlrun_docs" k="full" >}}/data-management-and-versioning.html)
- [Job Submission and Tracking]({{< url v="mlrun_docs" k="full" >}}/job-submission-and-tracking.html)

