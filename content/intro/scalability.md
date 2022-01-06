---
title: "Scalability"
keywords: "scalability, scaling, petabyte scale, scale-up, scale-out, architecture, cloud, hybrid cloud, amazon, AWS, S3"
menu:
  main:
    parent:     "intro"
    identifier: "scalability"
    weight:     75
publishDate:  2050-01-01
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces concepts/scalability.md. -->
{{< /comment >}}
{{< comment >}}<!-- [FUTURE-SCALING] (7.11.8) Adi said that scaling isn't
  supported yet in v1.9. He also said it's not related to HA (where we
  previously documented it, based on Yoav's doc draft), so I moved all the
  scaling docs to this future-publication page. TODO: When any of the
  documented scaling types is officially supported, check and edit the doc,
  update the value of the relevant filter or remove it, and check the existing
  filtered-out references to the page + consider the need for more references.

  [FUTURE-PETABYTE-SCALE] (sharonl) (5.2.18) Adi confirmed that petabyte scale
  is not supported in the current product version (v1.5.0) and should be
  removed from the documentation. According to Ori's 4.2.18 presentation, this
  feature is planned to be added only in v2.0.  I decided to keep the page that
  I had already prepared (and was approved by Yoav), and mark it as a
  future-release page with a distant future publication date. (7.11.18) I
  integrated other unsupported scaling topics into this draft page (for v1.9),
  renamed the file from petabyte-scale.md to scalability.md,and changed the
  title to "Scalability". I also updated the filtered-out references to the
  page from other pages to use the new more generic "scalability" filter.
-->
{{< /comment >}}

{{< condition filter="scaling" filterval="true" >}}
<!-- //////////////////////////////////////// -->
### Scale Up and Scale Out {#scale-up-and-scale-out}
{{< comment >}}<!-- [IntInfo] [FUTURE-SCALE-UP] [FUTURE-SCALE-OUT]
  (sharonl) (27.2.18) Based on info from Yoav -
  - [c-num-nodes] Currently we support only 3 data nodes. We plan to support 4
    nodes by the end of 2018 ("offline scale out").
  - [c-scale-up-n-out] Currently we don't support neither online scale up
    (dynamically increasing the number of storage disks) or scale out
    (increasing the number of nodes) nor application-nodes scaling. Online
    scale-up and scale-out are planned to be supported only in v2.0.
  -> In consultation with Yoav, I kept the scale-up and scale-out features
  explanation but phrased the doc so as not to say that we currently support
  these features but that the platform was designed to support this. Similarly,
  I referred to a design to support scaling up to 10 data nodes. I also created
  a variation of Orit's original scale-up and scale-out image that Yoav wanted
  to use here, and which Orit asked not to use for now, which doesn't refer to
  the platform (scale_out_n_scale_up.png). I added filtered out
  future-support text with my edited version of Orit's original image, with the
  platform "square scale-out" support
  (scale_out_n_scale_up_w_platform_square_scale_out.png).
  I also filtered out specific scaling-support data.
  I added a note regarding the limitations of the current version.
  TODO: As features are added in newer versions, edit the doc accordingly.
-->
{{< /comment >}}

The {{< product lc >}} was designed to support **scale up** (adding more capacity) and **scale out** (adding more nodes).
Scale up is done by adding more storage drives to an existing node until the desired capacity is reached.{{< condition filter="scale_up" filterval="true" >}}<!-- [FUTURE-SCALE-UP] --> Each node can scale up to 34 TB.{{< /condition >}}
Scale out is done by adding more nodes to an existing cluster, in a "pay-as-you-grow" model, until the desired performance is reached.{{< condition filter="scale_out" filterval="true" >}}<!-- [FUTURE-SCALE-OUT] --> Each cluster can scale out up to 10 data nodes.{{< /condition >}}
{{< comment >}}<!-- [FUTURE-SCALE-UP] [FUTURE-SCALE-OUT] (sharonl) TODO:
  When the platform supports scale up an scale out we can replace "was designed
  to support" with "supports". -->
{{< /comment >}}

{{< condition filter="scale_out" filterval="false" >}}
{{< igz-figure src="/images/scale_out_n_scale_up.png" alt="Scale-up and scale-out image" width="600" >}}

{{< note >}}
Version {{< productVersion num >}} of the {{< product lc >}} supports three data nodes.
Additional nodes and online scale out and scale up will be supported in future releases.
{{< /note >}}
{{< /condition >}}

{{< condition filter="scale_up" filterval="true" >}}
As opposed to legacy solutions, the {{< product lc >}}'s modern architecture offers a very cost-effective capacity upgrade while guaranteeing that performance doesn't decline as you grow in scale.
By enabling scale up or scale out within the same system, users can balance and scale capacity and performance as needed.

<p align="center">
<img src="/images/scale_out_n_scale_up_w_platform_square_scale_out.png" alt="Scale up and scale out and platform square scale-out image" width="1000"/>
</p>
{{< /condition >}}

{{< /condition >}}

{{< condition filter="petabyte_scale" filterval="true" >}}
<!-- [FUTURE-PETABYTE-SCALE] -->
{{< comment >}}<!-- (sharonl) [IntInfo] I integrated the previous drafts for
  "Petabyte-Scale Data" - standalone page and section in the HA page draft -
  and "Capacity Scaling Using a Tier-2 Object Store" section in the HA draft
  page, but we need to check and rewrite this section before we publish it.
  (We moved this out of the HA page because Adi said it's unrelated.)
  Previously, based on Yoav's HA doc draft, the petabyte scaling and 2nd-tier
  store capacity storage sections were on the same level, but Adi said he
  thinks it's the same thing. In a quick read-through, I think the latter might
  be a subset of the former, that's why I made it a subsection in this draft.
  I think perhaps the main heading should be "Capacity Scaling" or "Capacity
  Storage Scaling", maybe with "Petabyte-Data Scale" added as well, because
  the petabytes reference is just a quantification of the scaling amount.
  (We took the petabyte-scale terminology from Amazon.) -->
{{< /comment >}}
<!-- //////////////////////////////////////// -->
## Petabyte-Scale Data
{{< comment >}}<!-- [IntInfo] (sharonl) (31.1.18) The "petabyte-scale data"
  terminology was taken from Amazon - see, for example,
  https://aws.amazon.com/getting-started/projects/migrate-petabyte-scale-data/.
  I also saw "petabyte scale" used elsewhere, but not "petabyte scaling" or
  "petabyte data scaling", so I didn't use these alternatives.
-->
{{< /comment >}}

The {{< product lc >}} architecture was designed to support rapid data growth by supporting petabyte-scale data: you can scale from terabytes (TBs) to petabytes (PBs) of data in a cost-effective manner by integrating with cloud-storage services or on-premises ("on-prem") appliances.

-	Cloud scale &mdash; supports petabyte (PB) scale data for both traditional and next-gen workloads, with limitless capacity scalability.
-	Flexible deployment &mdash; allows a hybrid solution in which hot data for real-time actionable insights resides at the edge, close to the data sources. 
-	Enterprise grade with a rich feature set, including
    <!-- (sharonl) TODO: Before publication, check what "enterprise grade" here
      refers to. -->
    -	Integration with monitoring and alerting infrastructure
    -	Data retention, movement, and auto-tiering
    -	Multi-tenancy and capacity monitoring
        {{< comment >}}<!-- (sharonl) TODO: Before publication, check whether
          multi tenancy is supported. Support is currently planned for v1.7.0.
        -->
        {{< /comment >}}

{{< igz-figure src="/images/petabyte_scale.png" alt="Petabyte-scale data diagram" width="900" >}}

<!-- ---------------------------------------- -->
### Capacity Scaling Using a Tier-2 Object Store {#capacity-scaling-using-a-tier-2-object-stores}

You can easily scale your data-storage capacity by using an additional object store as a second storage tier for cold data, backup, or archiving.
You can use an on-prem store or use the services of a public-cloud provider, such as Amazon S3 or Azure Blob.
The second tier acts as a storage backend for supporting large-capacity deployments{{< condition filter="petabyte_scale" filterval="true" >}} with petabyte-scale data in a cloud-scale economics{{< /condition >}}.
Each tier is completely abstracted and independently scalable, with high availability and no SPOF.
All tiers are managed under a single pane of glass with respect to the different management services &mdash; such as security, authentication, access policy, and data life cycle.
{{< comment >}}<!-- [FUTURE-DLM] Data life-cycle management (DLM) isn't supported in this version. -->
{{< /comment >}}

For example, you can store your historical data in an object storage that resides in the Amazon S3 cloud, providing you with elasticity in a massive scale for "cold" items that are less frequently accessed.

<p align="center">
<img src="/images/platform_aws_s3_integration_schematic.png" alt="Platform integration with AWS S3 diagram" width="500"/>
</p>
{{< /condition >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/" >}}
- {{< xref s="intro" f="high-availability.md" >}}
- {{< xref f="services/app-services/" >}}

