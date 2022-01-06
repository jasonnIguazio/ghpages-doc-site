<!-- Common on-prem VM IP-addresses configuration how-to doc -->
<!-- Deployment-Specific Variables -->
{{- $vm := .Get "vm" -}}
{{- $content := "" -}}
<!-- vmware (default) -->
{{- $vm_name := "vSphere" -}}
{{- $vm_hypervisor := "ESXi" -}}
{{- $vm_hypervisor_long := "VMware ESXi" -}}
{{- $vm_ui_long := "vSphere Web Client" -}}
<!-- Proxmox -->
{{- if eq $vm "proxmox" -}}
  {{- $vm_name = "PVE" -}}
  {{- $vm_hypervisor = "PVE" -}}
  {{- $vm_hypervisor_long = "Proxmox VE" -}}
  {{- $vm_ui_long = "PVE GUI" -}}
{{- end -}}
{{- $vm_name_tc := $vm_name -}}

<!-- Easy Access to Site Parameters and Data Variables -->
{{- $company := $.Site.Params.company -}}
{{- $product_lc := $.Site.Data.vars.product.name.lc -}}
{{- $product_tc := $.Site.Data.vars.product.name.tc -}}
{{- $product_installer_lc := $.Site.Data.vars.product.installer.name.lc -}}

<!-- START CONTENT -->
<!-- //////////////////////////////////////// -->
## Overview {#overview}

To allow the {{ $product_lc }} installer ({{ $product_installer_lc }}) to connect to the {{ $product_lc }}'s data and application nodes, you need to configure IP addresses for the management network ("management IP addresses") on the {{ $product_lc }}'s node VMs, as outlined in this guides.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1.  <a id="prereq-admin-access-n-prev-instal-steps"></a>Administrative access to a {{ $product_lc }} {{ $vm_name }} cluster with the required networks configuration (see {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/network-cfg.md" $vm)) }}) and deployed VMs for each of the {{ $product_lc }} nodes (see {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/vms-deploy.md" $vm)) }}).
2.  <a id="prereq-mgmt-ips-cfg-user-credentials"></a>User credentials for configuring management IP addresses, received from {{ $company }}.
3.  <a id="preerq-mgmt-network-ip-per-node"></a>The management network's subnet can accommodate allocation of different IP addresses for each of the {{ $product_lc }}'s node VMs.

<!-- //////////////////////////////////////// -->
## Configure the Management IP Addresses {#cfg-mgmt-ips}

To configure the management IP addresses on the {{ $product_lc }}'s node VMs, execute the following procedure from the {{ $vm_ui_long }} for each node VM.
{{- partial "content-styles/admon.html" (dict "class" "note" "id" "mgmt-networks-only-cfg-note" "title" "Note" "content" 
(printf
"Do not disable IPv6 on the Data and App node VMs.<br><br> Don't configure IP addresses for the %s's data-path (client) and interfaces networks (interfaces &quot;eth1&quot; and &quot;eth2&quot;), as this is handled implicitly by the %s installer (%s)." $product_lc $product_lc $product_installer_lc | markdownify)
) -}}

1. Select to access the VMs' console.

2. Log into the VM using the user credentials for configuring management IP addresses, received from {{ $company }} (see the [prerequisites](#prereq-mgmt-ips-cfg-user-credentials)).

3. Run the following command from the console command line to launch the NetworkManager text user interface (<file>nmtui</file>) CLI tool:
    <!-- [IntInfo] (sharonl) It's "NetworkManager" (one word). -->

    ```sh
    sudo nmtui
    ```

4. Configure the IP address, subnet, and gateway address on the management-network interface &mdash; "eth0". (_Don't_ configure interfaces "eth1" and "eth2"; this is handled by the {{ $product_lc }} installer.)
    <!-- [IntInfo] [InfraInfo] (sharonl) (13.11.20) Efi (Support) wanted to
      mention here that they shouldn't configure "eth1" and "eth2", even if
      it's already previously noted, as is currently the case at the start of
      this section.
      [ci-admon-partial-in-md-li-incorrect-indent] Initially, following Efi's
      input, I added a detailed note here and didn't mention it elsewhere, but
      I couldn't get the note admonition, created with the `admon` partial, to
      align properly with the list-item content; the note was aligned with the
      list numbers at the start of the line instead of being indented inwards.
      I could solve this only by using HTML <ol> & <li>...</li> syntax, but
      then Markdown syntax in the list items isn't applied. Therefore, I
      decided to add a note admonition at the start of the instructions, above
      in this section, and note the issue also in this step, shortly, without
      an admonition.
      [InfraInfo] Moving the second sentence in the list item to a new line
      cancels the Markdown syntax highlighting in my editor (gVim) as long as
      the sentence contains the use of a variable - `{{ $product_lc }}` (I'm
      not sure why).
    -->

5.  Ensure that the <gui-label>Automatically connect</gui-label> option is selected.

6. When you're done with the configuration, exit <file>nmtui</file> and run the following command to restart the network and apply your changes.

    ```sh
    sudo systemctl
    ```

<!-- //////////////////////////////////////// -->
## Verifying the Configuration {#verification}

After configuring the management IP addresses for all of the {{ $product_lc }}'s node VMs, ensure that the configured addresses are defined and reachable.
{{ partial "func/igz-figure.html" (dict "img" "setup_vmware_mgmt_ips_cfg_verify.md" "alt" "lsblk" "width" "512") }}

<!-- //////////////////////////////////////// -->
## See Also

- {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/%s-installation-guide.md" $vm $vm)) }}
- {{ partial "func/xref.html" (dict "ctx" . "f" "cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md" "text" "On-prem VM hardware specifications") }}
<!-- END CONTENT -->

