---
---
{{< comment >}}<!-- [IntInfo] (sharonl) (16.6.20) At Adi's and Maor's request,
  I duplicated this info for each HW spec and not only in the HW-specs overview,
  because we typically send customers a link to the specific spec page that's
  applicable to them and therefore they're likely not to read the overview, and
  Adi preferred not to refer them to the overview page for the cluster
  configurations doc but rather have all the relevant information for each
  deployment type on one page. I decided to also keep the info in the overview.
  [InfraInfo] I created this include file to support the duplication.
  Currently, this file is always included from a "Hardware Configurations"
  section (id="hw-cfgs") but with different heading levels.
  [SITE-RESTRUCT] (1.2.21) As part of the ghpages-ghpages-doc-site restructure, we no longer
  have a separate HW-specs section with a shared overview. We now have, under
  cluster-mgmt/deployment/, a cfg-options.md page and specific infrastructure
  spec pages under each deployment-method subsection, which all include this
  file. -->
{{< /comment >}}

The {{< product lc >}} is available in two configurations, which differ in a variety of aspects, including the performance capacity, footprint, storage size, and scale capabilities:

<dl>
  <dt id="dev-kit">Development Kit</dt>
  {{< dd >}}
  A single data-node and single application-node cluster implementation.
  This configuration is designed mainly for evaluation trials and doesn't include high availability (HA) or performance testing.
  {{< /dd >}}

  <dt id="operational-cluster">Operational Cluster</dt>
  {{< dd >}}
  A scalable cluster implementation that is composed of multiple data and application nodes.
  This configuration was designed to achieve superior performance that enables real-time execution of analytics, machine-learning (ML), and artificial-intelligence (AI) applications in a production pipeline.
  The minimum requirement for HA support is three data nodes and three application nodes.
  {{< /dd >}}
</dl>

Both configurations also support an additional backup node for backing up the {{< product lc >}} instance. 

