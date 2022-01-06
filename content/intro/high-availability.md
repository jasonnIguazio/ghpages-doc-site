---
title:   "High Availability (HA)"
keywords: "HA, high availability, failover, failback, architecture, virtual nodes, container slices"
menu:
  main:
    parent:     "intro"
    identifier: "high-availability"
    weight:     70
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces concepts/high-availability.md. -->
{{< /comment >}}
{{< comment >}}
<!-- (sharonl)
  [FUTURE-HA-FAILOVER] Adi confirmed that v1.5.x has only very limited failover
  support, pertaining to data-service recovery (which isn't even covered in the
  current doc). (7.11.18) I moved the scaling info that was previously in this
  future-publication page to a scalability.md concepts page on the v1.9
  latest-release doc and removed entirely for earlier-release doc (Adi said
  it's not related to HA), and I rewrote the HA doc based on an updated doc
  draft from Adi, which he created in consultation with Orit.
  [DOC-RESTful] (1.1.20) concepts/ pages were moved to intro/. -->
{{< /comment >}}
{{< comment >}}<!-- [FUTURE-FAILBACK] (sharonl) TODO: Add failback doc (the
  option to restore operations/data to the primary VN or device that has been
  restored after a failover disaster recovery) when this feature is supported.
  -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< xref f="cluster-mgmt/deployment/cfg-options.md" a="operational-cluster" text="Operational Cluster" >}} configuration of the {{< product full >}} ("the {{< product lc >}}") is a high-availability (**HA**) cluster.
It was designed from the ground up as a shared-nothing (**SN**) architecture &mdash;  a distributed architecture with no single point of failure (**SPOF**).
Every cluster has at least three data nodes and supports data replication, ensuring high availability.

<!-- //////////////////////////////////////// -->
## Data-Replication and Failover {#data-replication-and-failover}

The {{< product lc >}}'s data-distribution architecture ensures that there are always two copies of each data element.
The system provides strong consistency at the object level: only one consistent state can be observed by all users at any given point in time.
The provided solution uses high-end and enterprise-grade hardware in terms of reliability.
The {{< product lc >}} uses  Non-Volatile Memory Express (NVMe) drives with 2M hours of mean time between failure (MTBF) and 5 drive writes per day (DWPD) endurance.

The data distribution is done by using a variant of the consistent hashing algorithm with a fixed number of partitions.
Each data node in the cluster is divided into virtual nodes (**VNs**).
Each data container is divided into **slices** ("partitions"), which are the basic units for data distribution and recovery.
Each slice is handled by both a primary and a secondary VN.
Each pair of primary and secondary VNs has a very limited set of shared slices.
Consequently, in the event of a software or hardware failure, the service remains available without interruption while maintaining load balancing.
{{< comment >}}<!-- [IntInfo] (sharonl) (26.11.18) Originally, we had the following sentence instead of the above: -->
Consequently, in the event of a failure of a VN or a device in the system, virtually all other VNs in the system that do not reside on the same node participate in rebuilding the affected partitions and the data load is spread among all the available resources.
<!-- We replaced it following Nir's input, and in consultation with Adi and
  Orit. (a) "software and hardware" failure is used to cover both a HW failure,
  that always causes the entire node to be lost, and a SW failure, which could
  potentially be only in a single VN while the other VNs on the node remain
  functioning; (we decided not to get into specifics). (b) Nir explained that
  currently, our online failure recovery covers only the use of the secondary
  VN to keep the data available so the service can continue without
  interruption. But "rebuild" - which is creating new primary and secondary VNs
  that hold copies of the data in the failed VN(s) - is supported only in
  offline mode, so it requires restarting the system. It was decided it's
  better to ignore rebuild in the doc and keep this vague rather than say that
  we provide offline rebuild support. Orit asked to mention load balancing;
  after consultation with Nir, I referred to "maintaining" load balancing and
  not to redistribution of the data load because Nir said this happens only
  during rebuild. -->
{{< /comment >}}

The {{< product lc >}} is designed to support CAP-theorem CP (consistent but not available under network partitions) over AP (available but not consistent under network partitions).
This means that in the possible event of partitioning, data availability is sacrificed to preserve consistency.

The {{< product lc >}}'s data-distribution implementation consists of two planes&mdash; a [control plane](#control-plane) and a [data plane](#data-plane).

<!-- ---------------------------------------- -->
### The Control Plane {#control-plane}

The control plane determines the cluster members and creates a slice-mapping table.
This plane

- Uses the [Raft](https://raft.github.io/) consensus algorithm to define for each container the slice distribution among the VNs.
- Uses a variation of a consistent-hashing algorithm to distribute the container data across the VNs.

<!-- ---------------------------------------- -->
### The Data Plane {#data-plane}

The data plane provides strong consistency.
This plane

- Replicates I/O between the primary VN and its secondary VN.
- Ensures that a minimal number of hops is required to complete an I/O operation by sending the I/O request to the primary VN and handling retries for different failure scenarios.
- Distributes the data among the VNs according to the distribution rules defined by the control plane.

The data plane uses the V3IO library, which serves as the {{< product lc >}}'s I/O interface and controls access to data.
This library uses a mathematical function to identify the parent slice of each data element and map the slice to its primary VN by using the control plane's slice-mapping table.
This mapping is dynamically updated as a result of relevant changes to the cluster, such as in the event of a scale-out scenario or upon a system failure.
The V3IO library is linked to the user application and its implementation is entirely transparent, so users don't need to be aware of the internal distribution mechanism.

<!-- ======================================== -->
#### Slice Distribution {#slice-distribution}

Following are some key principles of the {{< product lc >}}'s slice-distribution algorithm:

- Same number of primary and secondary roles per VN &mdash; to support load balancing.
- Balanced peer to peer pairing &mdash; to minimize rebuild times.
- Per-container slice table &mdash; to ensure that the same object name will fall under different slices for different containers.

The following image demonstrates slice distribution:
{{< igz-figure id="img-igz_ha_slice_distribution" src="/images/igz_ha_slice_distribution.png" alt="Slice-distribution example" >}}

<!-- ---------------------------------------- -->
### Write I/O Flow {#write-io-flow}

The following diagram describes a write I/O flow, demonstrating these concepts:

- Strong consistency guarantees that every acknowledged write can be viewed immediately and upon any failure.
- Atomic updates guarantee that only the old or new data image is visible at any given point in time, enabling multiple parallel uncoordinated application updates.

{{< igz-figure id="img-igz_ha_write_io_flow-" src="/images/igz_ha_write_io_flow.png" alt="Write I/O flow" >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="cluster-mgmt/deployment/" >}}

{{< condition filter="scalability" filterval="true" >}}
- {{< xref filter="scalability" filterval="true" s="conecpts" f="scalability.md" >}}
{{< /condition >}}

