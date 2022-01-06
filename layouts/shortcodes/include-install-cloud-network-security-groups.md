<!-- Deployment-Specific Variables -->
{{- $cloud := .Get "cloud" -}}
<!-- AWS (default) -->
{{- $cloud_name := "AWS" -}}
{{- $network_obj := "VPC" -}}
{{- $cloud_ui_short := "console" -}}
{{- $cloud_vendor_doc_url := "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/working-with-security-groups.html" -}}
<!-- Azure -->
{{- if eq $cloud "azure" -}}
  {{- $cloud_name = "Azure" -}}
  {{- $network_obj = "VNet" -}}
  {{- $cloud_ui_short = "portal" -}}
  {{- $cloud_vendor_doc_url = "https://docs.microsoft.com/en-us/azure/virtual-network/manage-network-security-group" -}}
{{- end -}}

<!-- Easy Access to Site Parameters and Data Variables -->
{{- $company := $.Site.Params.company -}}
{{- $product_lc := $.Site.Data.vars.product.name.lc -}}
{{- $product_ui_lc := $.Site.Data.vars.product.UI.short_lc -}}
{{- $product_ui_sc := $.Site.Data.vars.product.UI.short_sc -}}

<!-- Security-Group Rules Text-Reuse Variables -->
{{- $ui_http_cidrs_whitelist_ports := "80, 443" -}}
{{- $cidrs_whitelist_cond := printf "[A CIDRs whitelist](#install-param-cidrs-whitelist) is provided." | markdownify -}}

{{- $company_access_service := printf "Access to %s support" $company -}}
{{- $company_access_source_cidrs := printf "%s office" $company -}}
{{- $company_access_cond := printf "[The %s network is allowed access](#install-param-company-access)." $company | markdownify -}}
{{- $company_access_note := printf "There are several ways to allow %s support personnel to access the %s. One way is to allow access to the %s nodes from the %s network (two /32 CIDR addresses)." $company $product_lc $product_lc $company -}}

{{- $installer_cidr_service := "SSH access for the installation" -}}
{{- $installer_cidr_source_cidrs := "22" -}}
{{- $installer_cidr_note := printf "The installer CIDR ([configurable](#install-param-cidr-installer)) is required because during the installation, the installer connects to the %s nodes through SSH. After the installation completes, this rule can be deleted.." $product_lc | markdownify -}}

{{- $public_ips_service := "Inter-cluster communication" -}}
{{- $public_ips_cond := cond (eq $cloud "aws") "Always" (printf "The %s has public IP addresses" $product_lc) -}}
{{- $public_ips_note := "Allows the data and application clusters to occasionally communicate with each other through their public IP addresses." -}}

{{- $network_obj_source_cidrs := $network_obj -}}
{{- $network_obj_note := printf "Allows the %s nodes to freely communicate with each other through their private IP addresses." $product_lc -}}

<!-- START CONTENT -->
<!-- //////////////////////////////////////// -->
## Overview {#overview}

As part of the {{ $product_lc }} installation, a set of security groups are configured to control access at the network level (**"network security groups"**), in addition to the {{ $product_lc -}}'s application-level authentication.
These groups can be reconfigured manually at any time after the installation.
When the {{ $product_lc }} is created with private IPs only, security groups are usually not much of a concern.
However, it's crucial to properly set up the security groups when the {{ $product_lc }} is assigned public IP addresses.

During the installation, you can provide the following, which affects the configuration of the network security groups; for more information, see the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/cloud/%s/installationGuides/%s-installation-guide.md" $cloud $cloud) "text" (printf "%s installation guide" $cloud_name)) -}}:

- <a id="install-param-cidrs-whitelist"></a>A CIDRs whitelist &mdash; a list of classless inter-domain routing (CIDR) addresses to be granted access to the {{ $product_lc -}}'s service ports.
- <a id="install-param-company-access"></a>{{- $company }} access permission &mdash; allow {{ $company -}}'s support team to access the {{ $product_lc }} nodes from the {{ $company }} network.
- <a id="install-param-cidr-installer"></a>An installer CIDR &mdash; the CIDR of the machine on which you're running the {{ $product_lc }} installer.
    (This machine needs to connect to the {{ $product_lc }} during the installation to perform various actions.)
    A security groups' installer-CIDR rule can be deleted after the installation.

<!-- //////////////////////////////////////// -->
## Security-Group Rules {#security-group-rules}

The installation automatically creates two network security groups &mdash; one for the data cluster and one for the application cluster &mdash; and configures appropriate rules based on the installation parameters.

- [Data-cluster security-group rules](#data-cluster-security-group-rules)
- [Application-cluster security-group rules](#app-cluster-security-group-rules)

<!-- ---------------------------------------- -->
### Data-Cluster Security-Group Rules {#data-cluster-security-group-rules}

<table>
<tr text-align="left">
  <th style="vertical-align:'top'; font-weight:bold;">Service</th>
  <th style="vertical-align:'top'; font-weight:bold;">Source CIDRs</th>
  <th style="vertical-align:'top'; font-weight:bold;">Destination Ports</th>
  <th style="vertical-align:'top'; font-weight:bold;">Condition</th>
  <th style="vertical-align:'top'; font-weight:bold;">Notes</th>
</tr>
<tr>
  <td>{{- $product_ui_sc -}}</td>
  <td>Whitelisted CIDRs</td>
  <td>{{- $ui_http_cidrs_whitelist_ports -}}</td>
  <td>{{- $cidrs_whitelist_cond -}}</td>
  <td>Allows direct access to the {{ $product_ui_lc }} from the data nodes.
  </td>
</tr>
<tr>
  <td>{{- $company_access_service -}}</td>
  <td>{{- $company_access_source_cidrs -}}</td>
  <td>All</td>
  <td>{{- $company_access_cond -}}</td>
  <td>{{- $company_access_note -}}</td>
  </td>
</tr>
<tr>
  <td>{{- $installer_cidr_service -}}</td>
  <td>Installer CIDR</td>
  <td>{{- $installer_cidr_source_cidrs -}}</td>
  <td>Always</td>
  <td>{{- $installer_cidr_note -}}</td>
</tr>
<tr>
  <td>{{- $public_ips_service -}}</td>
  <td>Application-cluster public IP addresses</td>
  <td>All</td>
  <td>{{- $public_ips_cond -}}</td>
  <td>{{- $public_ips_note -}}</td>
</tr>
<tr>
  <td>All services</td>
  <td>{{- $network_obj_source_cidrs -}}</td>
  <td>All</td>
  <td>Always</td>
  <td>{{- $network_obj_note -}}</td>
</tr>
</table>

<!-- ---------------------------------------- -->
### Application-Cluster Security-Group Rules {#app-cluster-security-group-rules}

<table>
<tr text-align="left">
  <th style="vertical-align:'top'; font-weight:bold;">Service</th>
  <th style="vertical-align:'top'; font-weight:bold;">Source CIDRs</th>
  <th style="vertical-align:'top'; font-weight:bold;">Destination Ports</th>
  <th style="vertical-align:'top'; font-weight:bold;">Condition</th>
  <th style="vertical-align:'top'; font-weight:bold;">Notes</th>
</tr>
<tr>
  <td>HTTP/S ingress</td>
  <td>Whitelisted CIDRs</td>
  <td>{{- $ui_http_cidrs_whitelist_ports -}}</td>
  <td>{{- $cidrs_whitelist_cond -}}</td>
  <td>Allows access to the {{ $product_ui_lc }} and to various application services (such as Jupyter Notebook and Grafana) from the {{ $product_lc }} application nodes.
  </td>
</tr>
<tr>
  <td>Kubernetes API server</td>
  <td>Whitelisted CIDRs</td>
  <td>6443</td>
  <td>{{- $cidrs_whitelist_cond -}}</td>
  <td>Allows crafting a kubeconfig file and running <file>kubectl</file> CLI commands from outside of the cluster (in addition to programmatic API access).
  </td>
</tr>
<tr>
  <td>Web APIs (HTTP interface to the {{ $product_lc -}}'s data layer)</td>
  <td>Whitelisted CIDRs</td>
  <td>8081, 8443</td>
  <td>{{- $cidrs_whitelist_cond -}}</td>
  <td>Accessing the {{ $product_lc -}}'s data layer through web-APIs service ports is much faster than through the HTTP/S ingress ports ({{- $ui_http_cidrs_whitelist_ports -}}), because the web-APIs ports are mapped directly to the {{ $product_lc -}}'s web-APIs service.
  </td>
</tr>
<tr>
  <td>Kubernetes node ports</td>
  <td>Whitelisted CIDRs</td>
  <td>30000&ndash;32000</td>
  <td>{{- $cidrs_whitelist_cond -}}</td>
  <td>These ports are usually used by Nuclio functions.
    Consuming Nuclio functions through the Kubernetes node ports is faster than through the HTTP/S ingress ports ({{- $ui_http_cidrs_whitelist_ports -}}), because it eliminates the need to go through the ingress.
  </td>
</tr>
<tr>
  <td>{{- $company_access_service -}}</td>
  <td>{{- $company_access_source_cidrs -}}</td>
  <td>All</td>
  <td>{{- $company_access_cond -}}</td>
  <td>{{- $company_access_note -}}</td>
</tr>
<tr>
  <td>{{- $installer_cidr_service -}}</td>
  <td>Installer CIDR</td>
  <td>{{- $installer_cidr_source_cidrs -}}</td>
  <td>Always</td>
  <td>{{- $installer_cidr_note -}}</td>
</tr>
<tr>
  <td>{{- $public_ips_service -}}</td>
  <td>Data-cluster public IP addresses</td>
  <td>All</td>
  <td>{{- $public_ips_cond -}}</td>
  <td>{{- $public_ips_note -}}</td>
</tr>
<tr>
  <td>All services</td>
  <td>{{- $network_obj_source_cidrs -}}</td>
  <td>All</td>
  <td>Always</td>
  <td>{{- $network_obj_note -}}</td>
</tr>
</table>

<!-- //////////////////////////////////////// -->
## Adding and Removing a Security-Group Rule {#changing-security-group-rules}

You can modify the network security-group rules after the {{ $product_lc }} installation, through the {{ $cloud_name }} {{ $cloud_ui_short }} and CLI, to enable or disable access to the {{ $product_lc }}.
You should be able to modify most rules safely without affecting {{ $product_lc }} behavior, but _do not modify_ the {{ $network_obj }} CIDR or the application/data-cluster public IP addresses.
For more information, see the [{{ $cloud_name }} documentation]({{- $cloud_vendor_doc_url -}}).

<!-- ---------------------------------------- -->
### Granting Access to {{ $company -}} Support {#granting-company-support-access}

If you allowed access to the {{ $product_lc }} from {{ $company -}}'s network during the installation, {{ $company -}}'s support personnel should be able to access the {{ $product_lc }} and assist you, provided the {{ $product_lc }} has public IP addresses.
You can disable this access permission by simply removing the applicable rule in the security groups of both clusters (see the "{{ $company_access_service }}" service rules).
If you'd like to provide access to {{ $company }} support regardless of whether the {{ $product_lc }} has public IP addresses), contact {{ $company }}'s [support team](mailto:{{- $.Site.Data.vars.emails.support -}}) for instructions and a list of the latest CIDR addresses that you need to whitelist to allow this.

