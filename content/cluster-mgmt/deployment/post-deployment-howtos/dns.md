---
title: "Configuring the DNS Server"
description: "Learn how to configure the DNS server in the Iguazio MLOps Platform."
keywords: "dns server, dns, dns server configuration, dns configuration, dns forwarding, conditional forwarding, configurations, prerequisites, setup, installation, security"
menu:
  main:
    parent:     "post-deployment-howtos"
    identifier: "cfg-dns-server"
    weight:     100
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The metaTitle
  should use {{< product tc >}}. -->
{{< /comment >}}
{{< comment >}}<!-- [IntInfo] (sharonl) This documentation is based on internal
  knowledge-base article that was written by Itay K. from the support team -
  http://confluence.iguazeng.com:8090/pages/viewpage.action?spaceKey=SR&title=KB%3A+DNS+Conditional+Forwarding.
  See DOC IG-11548. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

Application services in the {{< product full >}} ("the {{< product lc >}}") clusters run on top of Kubernetes (see {{< xref f="services/app-services/" >}}).
The services are accessed via Kubernetes ingresses, which act as gateways that allow access to cluster applications and internal services through service URLs.
The {{< product lc >}} uses the {{< url v="coredns_home" k="text" link="1" >}} DNS server to resolve cluster service URLs and map them to internal service IP addresses.
The cluster's DNS server should be configured to use conditional forwarding, so that DNS queries that contain the domain name of the cluster, and only such queries, are forwarded to the {{< product lc >}} for resolution.
This document provides step-by-step instructions for configuring conditional DNS forwarding on [Linux](#dns-cfg-linux) or [Windows](#dns-cfg-windows).

<!-- //////////////////////////////////////// -->
## Terminology {#terminology}
{{< comment >}}<!-- [IntInfo] (sharon) (21.4.19) The information is based on
  http://confluence.iguazeng.com:8090/display/SR/KB%3A+DNS+Conditional+Forwarding,
  which is based on
  https://medium.com/tech-jobs-academy/dns-forwarding-and-conditional-forwarding-f3118bc93984.
  I also made some edits based on Microsoft doc mentioned in the Medium doc -
  https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc782142(v=ws.10)#conditional-forwarders
  and
  https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc773379%28v%3dws.10%29
  - and from http://social.dnsmadeeasy.com/blog/understanding-dns-forwarding/,
  and I took the DNS definition from https://www.webopedia.com/TERM/D/DNS.html.
-->
{{< /comment >}}

<dl>
  <dt id="term-dns">DNS</dt>
  {{< dd >}}Domain Name System &mdash; an internet service that translates domain names into IP addresses.
  {{< /dd >}}

  <dt id="term-dns-fowarding">DNS forwarding</dt>
  {{< dd >}}DNS forwarding is the process by which particular sets of DNS queries are forwarded to a designated server for resolution according to the DNS domain name in the query rather than being handled by the initial server that was contacted by the client. 
 This process improves the network's performance and resilience.
  It provides a way to resolve name queries both inside and outside of the network by passing on namespaces or resource records that aren't contained in the zone of a local DNS server to a remote DNS server for resolution.
  When a DNS server is configured to use a forwarder, if it can't resolve a name query by using its local primary zone, secondary zone, or cache, it forwards the request to the designated forwarder instead of attempting to resolve it by using root hints (as done when no forwarder is configured).
  {{< /dd >}}

  <dt id="term-cond-forwarders">Conditional forwarders</dt>
  {{< dd >}}Conditional forwarders are DNS servers that only forward queries for specific domain names.
  Instead of forwarding all queries it cannot resolve locally to a forwarder, a conditional forwarder is configured to forward name queries to specific forwarders based on the domain name contained in the query.
  Forwarding according to domain names improves conventional forwarding by adding a name-based condition to the forwarding process.
  It enables improving name resolution between internal (private) DNS namespaces that aren't part of the DNS namespace of the internet, such as results from a company merger.
  {{< /dd >}}

  <dt>FQDN</dt>
  {{< dd >}}Fully qualified domain name
  {{< /dd >}}
</dl>

<!-- ---------------------------------------- -->
## Linux DNS Configuration {#dns-cfg-linux}
{{< comment >}}<!-- [IntInfo] (sharon) (21.4.19) The information is based on
  http://confluence.iguazeng.com:8090/display/SR/KB%3A+DNS+Conditional+Forwarding,
  which is based on
  http://www.firewall.cx/linux-knowledgebase-tutorials/system-and-network-services/829-linux-bind-introduction.html
  and https://opensource.com/article/17/4/build-your-own-name-server.
-->
{{< /comment >}}

Perform the following steps to configure conditional DNS forwarding on Linux by using {{< url v="bind_gitlab" k="text" link="1" >}} &mdash; a popular open-source DNS server from the Internet Systems Consortium (ISC), which is found in most Linux distributions; for more information about BIND, see the [Additional Resources](#additional-resources) section of this document.

{{< note id="dns-cfg-linux-notes" >}}
The following procedure assumes that you have a configured BIND server.
{{< /note >}}

1.  Open the BIND name-server configuration file (<file>named.conf</file>) in a text editor, and add the following lines; replace the `<domain>` placeholder with FQDN of the {{< product lc >}} cluster to which you want to forward queries, and replace the <nobr>`<datanode IP>`</nobr> placeholders with the IP addresses of the cluster's master data nodes:

    ```sh
    zone "<domain name>" {
        type forward;
        forward only;
        forwarders { <datanode IP>; [<datanode IP>; ...] };
    };
    ```

2.  Check and reload the configuration by running the following commands from a Linux command-line shell:

    ```sh
    named-checkconf
    rndc reload
    ```

<!-- ---------------------------------------- -->
## Windows DNS Configuration {#dns-cfg-windows}
{{< comment >}}<!-- [IntInfo] (sharon) (21.4.19) The information is based on
  http://confluence.iguazeng.com:8090/display/SR/KB%3A+DNS+Conditional+Forwarding,
  which is based on
  https://medium.com/tech-jobs-academy/dns-forwarding-and-conditional-forwarding-f3118bc93984.
-->
{{< /comment >}}

Perform the following steps to configure conditional DNS forwarding on Windows.

{{< note id="dns-cfg-windows-os-ver-note" >}}
The following instructions are compatible with Windows Server 2012 R2.
The specific steps and menu options may differ on other versions of Windows.
{{< /note >}}

1.  Open the Windows Server Manager (for example, by entering `ServerManager` in the Windows command prompt).
    In the <gui-title>Server Manager</gui-title> window, select the <gui-title>Tools</gui-title> tab.
    Then, select <gui-label>DNS</gui-label> from the tools list.
    {{< comment >}}<!-- [IntInfo] (sharonl) (21.4.19) I added the example of
      how to open the Server Manager based on the first method in the following
      article ("5 Ways to Launch Server Manager in Windows Server 2012"):
      https://www.top-password.com/blog/5-ways-to-launch-server-manager-in-windows-server-2012/
    -->
    {{< /comment >}}

    {{< igz-figure id="img-dns_cfg_win_server_manager_dns_select" src="/images/dns_cfg_win_server_manager_dns_select.png" alt="DNS Server Manager - select DNS" >}}

2.  In the <gui-title>DNS Manager</gui-title> window, select your DNS server.
    Then, select <gui-label>Conditional Forwarders</gui-label> from the server browse tree.

    {{< igz-figure id="img-dns_cfg_win_cond_fwds_select" src="/images/dns_cfg_win_cond_fwds_select.png" alt="DNS Server Manager - select DNS" >}}

3.  Select <gui-label>Action</gui-label> from the top menu toolbar, and then select the <gui-label>New Conditional Forwarder</gui-label> menu option.

    {{< igz-figure id="img-dns_cfg_win_new_cond_fwd_select" src="/images/dns_cfg_win_new_cond_fwd_select.png" alt="DNS Server Manager - select DNS" >}}

4.  In the <gui-title>New Conditional Forwarder</gui-title> window &mdash;

    - In the <gui-label>DNS Domain</gui-label> field, enter the FQDN of the {{< product lc >}} cluster for which you want to forward queries. 
    - In the <gui-label>IP addresses of the master servers</gui-label> field, add the IP addresses of your cluster's master data nodes.
    - Check the <gui-label>Store this conditional forwarder in Active Directory ...</gui-label> check box, if applicable.
        {{< comment >}}<!-- [IntInfo] (sharonl) (21.4.19) I added the ellipsis
          at the end of the check-box text because the full text is "Store this
          conditional forwarder in Active Directory, and replicate it as
          follows:", and it's followed by a drop-down list box of replication
          option; in the following screen shot, this check box isn't checked
          and there's a grayed replica option of "All DNS servers in this
          Forest". -->
        {{< /comment >}}

      {{< igz-figure id="img-dns_cfg_win_cond_fwd_cfg" src="/images/dns_cfg_win_cond_fwd_cfg.png" alt="DNS Server Manager - select DNS" >}}

<!-- //////////////////////////////////////// -->
## Additional Resources {#additional-resources}

The information in this document is based, in part, on the following resources:

- [DNS Forwarding and Conditional Forwarding](https://medium.com/tech-jobs-academy/dns-forwarding-and-conditional-forwarding-f3118bc93984) (Medium Tech Jobs Academy) 
- {{< url v="bind_gitlab" k="text" link="1" >}} (ISC GitLab)
- [Linux BIND DNS - Introduction To The DNS Database (BIND)](http://www.firewall.cx/linux-knowledgebase-tutorials/system-and-network-services/829-linux-bind-introduction.html) (Firewall.cx)
- [Build your own DNS server on Linux](https://opensource.com/article/17/4/build-your-own-name-server) (opensource.com)


<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/" >}}

