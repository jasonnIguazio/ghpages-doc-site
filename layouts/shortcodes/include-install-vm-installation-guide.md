<!-- Common on-prem VM installation-guide doc

[InfraInfo] (sharonl)
- [ci-md-shcd-md-fenced-code-w-templates] (sharonl) (4.11.20) I found
  that using ```sh MD fenced code blocks that contain variables and access to
  site params cause opening angle brackets (`<`) to be translated to `&lt'` in
  the HTML output; (but for a simple code block with just "<TEST>", '<`' was
  translated correctly in the output). The variables and site params themselves
  seemed to be translated correctly in the output. `\<`, `<<`, `&lt;`, or a
  variable that translates to `&lt;` with `markdownify` didn't help (and it
  wouldn't be a good solution anyway). I tested with Hugo v0.73. I had also
  encountered other problems in the past when using ```sh MD code blocks with
  site params within shortcodes; see, for example, the delete-object.html
  shortcode (also tested with Hugo v0.73). => Therefore, for now, we use the
  following for relevant code blocks in shortcodes:
  <div class="highlight"><pre class="chroma"><code class="language-sh" data-lang="sh">...</code></pre></div>
  UPDATE: (16.11.20) The problem occurs also for inline Markdown code using
  `...` (not only in code blocks). This is currently resolved by using the
  HTML <code>...</code> tags. See, for example, in the shortcode
  include-install-vm-offline-install.md
- [ci-param-doc-in-shcd] (4.11.20) I was able to use the `param-doc` partial
  from this shortcode, but it required using `printf` for the content (the
  param description) - either via a $content variable or directly by assigning
  to the $content partial param, which makes the source not very user friendly,
  so I decided to forgo the shortcode and use <dt> and <dd> directly instead.
  However, Markdown code within <dd>...</dd> tags is currently not processed in
  Hugo unless applying `markdownify` (as we do in `param-doc`), which also why
  added a `dd` shortcode. But adding a `dd` partial and using from a shortcode
  would still present us with the need to pass the content as the value of a
  partial param. Therefore, where possible (such as internal page links), I use
  HTML instead of Markdown code within <dd> (such as `<a href="...">...</a>`
  for links). Another option is to use printf with `markdownify` where
  relevant. When it's not possible, we can use the `param-doc` shortcode and
  pass the content to the $content parameter as a t string with `printf`, if
  needed - as we do for `param-values` or for the `admon` partial (instead of
  the `note` shortcode).
-->
<!-- Deployment-Specific Variables -->
{{- $vm := .Get "vm" -}}
{{- $content := "" -}}
<!-- vmware (default) -->
{{- $vm_name := "vSphere" -}}
{{- $vm_name_long := "VMware vSphere" -}}
{{- $vm_hypervisor := "ESXi" -}}
{{- $vm_hypervisor_long := "VMware ESXi" -}}
{{- $vm_hypervisor_installer_opt := "VMware" -}}
    <!-- [IntInfo] (sharonl The VMware vSphere hypervisor is VMware ESXi
    (see https://www.vmware.com/products/vsphere-hypervisor.overview.html and
    https://www.vmware.com/products/esxi-and-esx.html), and the app- and
    data-node "Hypervisor" cluster-parameter value for PVE in the installer
    dashboard is "VMware".
    [c-install-ui-vmware-spelling] [IntInfo] (sharonl) (5.11.20) The spelling
    in the installer UI is actually "VMWare" ('W' instead of 'w'). (9.11.20)
    Eran D. fixed this on the development version of Provazio (by merging a fix
    PR that I submitted), but the fix isn't available yet on the production
    version of Provazio. Maor (Support) couldn't tell me when the production
    version will be updated with this change (and other updates from
    development); he promised to let me know when this done so we can update
    the scree shot [PENDING-SUPPORT]. I've changed the docs to use the correct
    product spelling; the UI screen shot still shows the wrong spelling. -->
{{- $virtualization_image_file_types := "OVF and VMDK" -}}
{{- $vm_home_url_link := printf "[%s](%s)" $.Site.Data.vars.urls.vsphere_home.text_long $.Site.Data.vars.urls.vsphere_home.full -}}
<!-- Proxmox -->
{{- if eq $vm "proxmox" -}}
  {{- $vm_name = "PVE" -}}
  {{- $vm_name_long = "Proxmox VE" -}}
  {{- $vm_hypervisor = "PVE" -}}
  {{- $vm_hypervisor_long = "Proxmox VE" -}}
  {{- $vm_hypervisor_installer_opt = "KVM" -}}
    <!-- [IntInfo] (sharonl The PVE hypervisor is a Kernel-based Virtual
    Machine (KVM) hypervisor (see
    https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine and
    https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine), and the app-
    and data-node "Hypervisor" cluster-parameter value for PVE in the installer
    dashboard is "KVM". -->
  {{- $virtualization_image_file_types = "VMA GZ" -}}
  {{- $vm_home_url_link = printf "[%s](%s)" $.Site.Data.vars.urls.pve_home.text_long $.Site.Data.vars.urls.pve_home.full -}}
{{- end -}}
{{- $vm_name_tc := $vm_name -}}

<!-- Easy Access to Site Parameters and Data Variables -->
{{- $company := $.Site.Params.company -}}
{{- $product_lc := $.Site.Data.vars.product.name.lc -}}
{{- $product_sc := $.Site.Data.vars.product.name.sc -}}
{{- $product_tc := $.Site.Data.vars.product.name.tc -}}
{{- $product_full := $.Site.Data.vars.product.name.full -}}
{{- $product_ui_lc := $.Site.Data.vars.product.UI.short_lc -}}
{{- $product_ui_sc := $.Site.Data.vars.product.UI.short_sc -}}
{{- $product_installer_lc := $.Site.Data.vars.product.installer.name.lc -}}
{{- $product_installer_tc := $.Site.Data.vars.product.installer.name.tc -}}
{{- $product_installer_ui_lc := $.Site.Data.vars.product.installer.ui.name.lc -}}
{{- $product_installer_ui_port := $.Site.Data.vars.product.installer.ui.port -}}
{{- $product_installer_ui_url := $.Site.Data.vars.product.installer.ui.url -}}

<!-- START CONTENT -->
<!-- //////////////////////////////////////// -->
## Overview {#overview}

This guide outlines the required steps for installing (deploying) an instance of the {{ $product_full }} ("the {{ $product_lc }}") to virtual machines (VMs) using the {{ $vm_home_url_link }} virtualization platform  ({{ $vm_name }}).
When you complete the procedure, you'll have a {{ $product_lc }} instance running on your {{ $vm_name }} virtual environment.
The installation is done by using the {{ $product_lc }} installer &mdash; {{ $product_installer_lc -}}.

{{- partial "content-styles/admon.html" (dict "class" "warning" "id" "deployment-warnings" "content" (printf "- <a id='provisioning-note'></a>Provisioning (deployment) of the %s's node VMs is done by using a dedicated virtualization package, provided by %s.<br/>**Don't attempt to provision the servers yourself prior to the deployment.**\n- <a id='shutdown-note'></a>%s shutdown should be coordinated with %s's support team.<br/>\n    **Don't shut down the data-node VMs non gracefully, as this might erase the data.**" $product_lc $company $product_sc $company | markdownify)) -}}
<!-- [c-cloud-n-vm-install-servers-provisioning] [c-vm-shutdown]
  [InfraInfo] (sharonl) The second note is identical to the content of the
  `text-deploy-vm-shutdown` shortcode, but we can't use shortcodes from other
  shortcodes. The first note also appears in on-prem-hw-spec.md and is similar
  to the note added via the `text-deploy-cloud-provision-note` shortcode for
  cloud deployments, but there are differences. I preferred the repetition over
  using a partial in addition to the shortcodes to allow reuse from both content
  markdown files and shortcodes. Initially, we had only the provisioning note,
  and I had implemented it in a content/_includes/ file. I was able to include
  the file also from this shortcode, but it produced an extra empty line in the
  output (because of an extra </p> tag in the HTML source) + I needed to use
  different cloud and VM warning text and include files don't support
  conditional logic. -->

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1.  <a id="prereq-install-api-key-n-vault-url"></a>A {{ $product_installer_lc }} API key and a {{ $product_installer_lc }} vault URL, received from {{ $company -}}.
    <!-- [IntInfo] (sharonl) (22.11.20) I removed the following note per Maor's
      request; Maor wrote "the customer shouldn't (/must not)  know about the
      root key - we use it when there's no other choice.":
    "(Note that there are different keys for online and offline installations.)"
    -->

2.  <a id="prereq-admin-access"></a>Administrative access to the {{ $product_lc -}}'s {{ $vm_name }} cluster &mdash; an operational {{ $vm_name }} environment with one or more servers running the {{ $vm_hypervisor_long }} hypervisor version {{ index (index (index $.Site.Data.vars.product.ver $vm) "hypervisor") "versions" }} ("{{- $vm_hypervisor }} hosts").

3.  <a id="prereq-node-ovf-files"></a>A {{ $vm_name }} {{ $product_lc }} virtualization package with {{ $virtualization_image_file_types }} files for each of the {{ $product_lc }} nodes, received from {{ $company -}}.
<!-- [c-vm-virtualization-pkg] [InfInfo] (sharonl) (10.12.20) I replaced the
  "VM-backup" terminology (which was based on the Proxmox VMA doc -
  https://pve.proxmox.com/wiki/VMA - bu I had confirmed with Efi from Support
  that it can also be applied to VMware) with "virtualization package" (and
  "virtualization" files/image files) per Maor's request (also used in other
  doc files). Maor referred also to OVF being a "virtualization" format. -->

4.  <a id="prereq-hypervisor-data-store-for-vm-boot-disks"></a>The {{ $vm_hypervisor }} hosts have data stores with a minimum of 400 GB available storage for each of the {{ $product_lc }} nodes (to be used for running the nodes' VM boot-disk images).

5.  <a id="prereq-hypervisor-resources"></a>Sufficient dedicated physical resources on the {{ $vm_hypervisor }} hosts to allow running the {{ $product_lc -}}'s node VMs without over-provisioning.

6.  <a id="prereq-data-node-data-disks"></a>At least two 1 TB enterprise-grade SSDs for each of the {{ $product_lc -}}'s data-node VM.

7.  <a id="prereq-network-ifcs"></a>The {{ $product_lc -}}'s {{ $vm_hypervisor }} hosts have the following network interfaces:
    <!-- [IntInfo] (sharonl) (11.11.20) Dany K. said this is a SW requirement
      and therefore shouldn't be added to the VM hypervisor HW spec.
    [InfraInfo] (sharonl) (11.11.20) The following list is available via the
      text-vm-hypervisor-network-ifcs.html shortcode, but I can't use a
      shortcode from another shortcode and I didn't want to create a partial
      just for this purpose. I tested using an _includes/ file instead of a
      shortcode (both Markdown and HTML), but I couldn't get the list-items
      indentation to work correctly when the file was included from another
      list item; (I tested include the include file directly from a Markdown
      file to eliminate possible issue with inclusion from a shortcode).
    --> 
    - A single-port 1 Gb (minimum) NIC for the management network
    - For hosting data-node VMs &mdash; a dual-port 10 Gb (minimum) NIC for the data-path (client) and interconnect networks
    - For hosting application-node VMs only &mdash; a single-port 10 Gb (minimum) NIC for the data-path (client) network

    Each network must be on a different subnet, and the management network's subnet must be able to accommodate allocation of IP addresses for each of the {{ $product_lc -}}'s node VMs.

8.  <a id="prereq-mgmt-ips-cfg-user-credentials"></a>User credentials for configuring management IP addresses, received from {{ $company }}.

9.  <a id="prereq-docker"></a>A machine running [{{- $.Site.Data.vars.urls.docker_home.text -}}]({{- $.Site.Data.vars.urls.docker_home.full -}}).

10. <a id="prereq-offline"></a>For installations without internet connectivity (**"offline installation"**) &mdash;
    <!-- [InfInfo] (sharonl) (22.11.20) Maor didn't want to phrase the
      prerequisite as access to the internet for online installation, or the
      following for offline installation. He said the installation is preformed
      offline except for one step that you can either perform offline or
      manually offline, which requires the following files, but he didn't want
      this to include an internet connectivity requirement even as an optional
      alternative. He said that for AWS we can keep the internet connectivity
      to offline files prerequisite. -->

    - <a id="prereq-offline-install-pkg"></a>A {{ $product_lc }} installation package (<file>{{ $.Site.Data.vars.product.install_pkg.archive }}</file>), received from {{ $company }}.
    - <a id="prereq-offline-installer-ui-docker-image"></a>A preloaded {{ $product_installer_ui_lc }} Docker image (<path>{{- $.Site.Data.vars.product.installer.ui.image.path.stable -}}</path>), received from {{ $company }} as an image archive (<file>{{ $.Site.Data.vars.product.installer.ui.image.archive }}</file>).

<!-- //////////////////////////////////////// -->
## Deployment Steps {#deployment-steps}

To deploy an instance of the {{ $product_lc }} to a {{ $vm_name }} cluster, execute the following steps.

[Step 1: Configure virtual networking](#step-cfg-virtual-networking) |
[Step 2: Deploy the {{ $product_lc }} nodes](#step-deploy-nodes) |
[Step 3: Attach data disks to the data nodes](#step-attach-data-disks) |
[Step 4: Configure management IP addresses](#step-cfg-mgmt-ips) |
[Step 5: Run the {{ $product_lc }} installer](#step-run-install-tool) |
[Step 6: Access the installer dashboard](#step-access-installer-ui) |
[Step 7: Choose the VM scenario](#step-choose-scenario) |
[Step 8: Configure general parameters](#step-ui-general) |
[Step 9: Configure cluster parameters](#step-ui-cluster) |
[Step 10: Configure node parameters](#step-ui-nodes) |
[Step 11: Review the settings](#step-review) |
[Step 12: Wait for completion](#step-wait-ready)

<!-- ---------------------------------------- -->
### Step 1: Configure Virtual Networking {#step-cfg-virtual-networking}

Follow the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/network-cfg.md" $vm)) }} guide to configure virtual networking on the {{ $product_lc -}}'s {{ $vm_name }} cluster.

<!-- ---------------------------------------- -->
### Step 2: Deploy the {{ $product_tc }} Nodes {#step-deploy-nodes}

Follow the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/vms-deploy.md" $vm)) }} guide to deploy a set of VMs that will serve as the {{ $product_lc }}'s data and application nodes.

<!-- ---------------------------------------- -->
### Step 3: Attach Data Disks to the Data Nodes {#step-attach-data-disks}

Follow the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/data-disks-attach.md" $vm)) }} guide to attach data disks (storage devices) to the {{ $product_lc }}'s data-node VMs.

<!-- ---------------------------------------- -->
### Step 4: Configure Management IP Addresses {#step-cfg-mgmt-ips}

Follow the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/ips-cfg.md" $vm)) }} guide to configure IP addresses for the management network ("management IP addresses") on the {{ $product_lc }} nodes, to allow the installer to connect to the node VMs.

<!-- ---------------------------------------- -->
### Step 5: Run the {{ $product_tc }} Installer {#step-run-install-tool}

{{- partial "content-styles/admon.html" (dict "class" "note" "id" "step-run-install-tool-offline-deployment-note" "title" "Offline-Installation Note" "content" (printf "To deploy the %s in environments without an internet connection (offline deployment), follow the instructions in the %s instead of the procedure in this step, and then proceed to [the next installation step](#step-access-installer-ui)."  $product_lc (partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/offline-install.md" $vm) "text" "offline-installation guide")) | markdownify)) -}}

To deploy In {{ $product_lc }} in environments with an internet connection (online deployment), run the {{ $product_lc }} installer, {{ $product_installer_lc }}, by running the following command from a command-line shell on a server or a machine that is running Docker and has connectivity to the {{ $product_lc }}'s data and application nodes:

<div class="highlight"><pre class="chroma"><code class="language-sh" data-lang="sh">docker pull {{ $.Site.Data.vars.product.installer.ui.image.path.stable }} && docker run --rm --name {{ $.Site.Data.vars.product.installer.ui.image.name }} \
    -p {{ $product_installer_ui_port -}}:{{- $product_installer_ui_port }} \
    -e {{ $.Site.Data.vars.product.installer.api_key.envar }}=<{{ $product_installer_tc }} API Key> -e {{ $.Site.Data.vars.product.installer.vault_url.envar }}=<{{ $product_installer_tc }} Vault URL> \
   {{ $.Site.Data.vars.product.installer.ui.image.path.stable }}
</code></pre>
</div>
<!-- [ci-md-shcd-md-fenced-code-w-templates] -->

<br/>
<!-- [ci-param-doc-in-shcd] -->
<dl>
  <!-- API Key -->
  <dt id="env-param-installer-api-key">API Key</dt>
  <dd>A {{ $product_installer_lc }} API key, received from {{ $company }} (see the <a href="#prereq-install-api-key-n-vault-url">installation prerequisites</a>).
  </dd>

  <!-- Vault URL -->
  <dt id="env-param-installer-vault-url">Vault URL</dt>
  <dd>A {{ $product_installer_lc }} vault URL, received from {{ $company }} (see the <a href="#prereq-install-api-key-n-vault-url">installation prerequisites</a>).
  {{- partial "content-styles/admon.html" (dict "class" "note" "content" "Don't include a slash (`'/'`) at the end of the vault URL." "title" "Note") -}}
  </dd>
</dl>

<!-- ---------------------------------------- -->
### Step 6: Access the Installer Dashboard {#step-access-installer-ui}

In a web browser, browse to `{{- $product_installer_ui_url -}}` to view the {{ $product_installer_ui_lc -}}.
{{ partial "func/igz-figure.html" (dict "img" "setup_vm_installer_ui_main.png" "alt" "Installer-UI home page" "width" "1024") }}

Select the plus-sign button (<gui-label>+</gui-label>) to create a new system.
<!-- [InfraInfo] (sharonl) (8.6.20) I didn't use a UI icon font
  (<span class="igz-icon-ui-add"></span>) because the fonts in the installation
  UI are different than in the product UI and it wasn't worth adding the
  installation-UI fonts, at least at this stage. -->

<!-- ---------------------------------------- -->
### Step 7: Choose the VM Scenario {#step-choose-scenario}

On the <gui-title>Installation Scenario</gui-title> page, check <gui-label>Bare metal / virtual machines</gui-label>, and then select <gui-label>Next</gui-label>.
{{ partial "func/igz-figure.html" (dict "img" "setup_vm_installer_ui_installation_scenario.png" "alt" "Choose scenario" "width" "1024") }}

<!-- ---------------------------------------- -->
### Step 8: Configure General Parameters {#step-ui-general}

On the <gui-title>General</gui-title> page, fill in the configuration parameters, and then select <gui-label>Next</gui-label>.
{{ partial "func/igz-figure.html" (dict "img" "setup_vm_installer_ui_general.png" "alt" "General settings" "width" "1024") }}

<dl>
  <!-- System Name -->
  <dt id="ui-gen-param-system-name">System Name</dt>
  <dd>A system ID of your choice, which will be part of the URL of your {{ $product_lc }} instance.
  {{- partial "doc/param-values.html" (dict "ctx" . "content" (printf "A string of 1&ndash;12 characters; can contain lowercase letters (a&ndash;z) and hyphens (-); must begin with a lowercase letter" | markdownify)) -}}
  {{- partial "doc/param-default-value.html" (dict "ctx" . "content" "A randomly generated lowercase string") -}}
  </dd>

  <!-- Description -->
  <dt id="ui-gen-param-description">Description</dt>
  <dd>
  A free-text string that describes the {{ $product_lc }} instance.
  </dd>

  <!-- System Version -->
  <dt id="ui-gen-param-sytsem-version">System Version</dt>
  <dd> The {{ $product_lc }} version.
      <ul>
          <li>For online installations &mdash; insert the release build number that you received from {{ $company }} (for example, "{{- $.Site.Data.vars.product.ver.ga_build -}}").
              The installer will implicitly download the appropriate installation package for the specified build version.
          </li>
          <li>For offline installations (in environments without an internet connection) &mdash; set the value of this parameter to "<code>file://{{- $.Site.Data.vars.product.install_vm.mgmt_ips_cfg_credentials.user -}}:{{- $.Site.Data.vars.product.install_vm.mgmt_ips_cfg_credentials.pwd -}}@&lt;IP of the installation-package data node&gt;:{{- $.Site.Data.vars.product.install_vm.data_node_install_dir.path -}}/&lt;{{- $product_lc }} version, as received from {{ $company -}}&gt;</code>"; replace the <code>&lt;...&gt;</code> placeholders with your specific data.
      Note that you first need to create a <path>{{ $.Site.Data.vars.product.install_vm.data_node_install_dir.path }}</path> data-node directory and extract to this directory the {{ $product_lc }} installation-package archive that you received from {{ $company }}, as outlined in the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/offline-install.md" $vm) "text" "offline-installation guide") -}}, which should have been executed in <a href="#step-run-install-tool-offline-deployment-note">Step 5</a>.
          </li>
      </ul>
  </dd>

  <!-- Owner Full Name -->
  <dt id="ui-gen-param-owner-full-name">Owner Full Name</dt>
  <dd>An owner-name string, containing the full name of the {{ $product_lc }} owner, for bookkeeping.
  </dd>

  <!-- Owner Email -->
  <dt id="ui-gen-param-owner-email">Owner Email</dt>
  <dd>An owner-email string, containing the email address of the {{ $product_lc }} owner, for bookkeeping.
  </dd>

  <!-- Username -->
  <dt id="ui-gen-param-username">Username</dt>
  <dd>Username for a {{ $product_lc }} user to be created by the installation.
      This username will be used to log into the {{ $.Site.Data.vars.product.UI.short_lc }}.
      You can add additional users after the {{ $product_lc }} is provisioned.
  </dd>

  <!-- User Password -->
  <dt id="ui-gen-param-user-password">User Password</dt>
  <dd>{{ $product_sc }} password for the user generated by the installation &mdash; to be used with the configured <a href="#ui-gen-param-username"><paramname>username</paramname></a> to log into {{ $product_ui_lc }}; see the {{ partial "func/xref.html" (dict "ctx" . "f" "cluster-mgmt/deployment/sw-specifications.md" "a" "user-passwords" "text" "password restrictions") }}.
      You can change this password after the {{ $product_lc }} is provisioned.
  </dd>

  <!-- System Domain -->
  <dt id="ui-gen-param-system-domain">System Domain</dt>
  <dd>Custom domain (for example, "customer.com").
      The installer prepends the value of the <a href="#ui-gen-param-system-name"><paramname>System Name</paramname></a> parameter to this value to create the full system domain.
  </dd>

  <!-- Termination Protection -->
  <dt id="ui-gen-param-termination-protection">Termination Protection</dt>
  <dd>The protection level for terminating the {{ $product_lc }} installation from the installer dashboard.
  </dd>
</dl>

<!-- ---------------------------------------- -->
### Step 9: Configure Cluster Parameters {#step-ui-cluster}

On the <gui-title>Clusters</gui-title> page, fill in the configuration parameters, and then select <gui-label>Next</gui-label>.

{{ partial "func/igz-figure.html" (dict "img" (printf "setup_%s_installer_ui_clusters.png" $vm ) "alt" "Cluster settings" "width" "1024") }}

<!-- ======================================== -->
#### Common Parameters (Data and Application Clusters) {#step-ui-cluster-common-params}

The following parameters are set for both the data and application clusters.
Node references in the parameter descriptions apply to the {{ $product_lc }}'s data-node VMs for the data cluster and the application-node VMs for the application cluster.

<dl>
  <!-- Hypervisor -->
  <dt id="ui-cluster-param-hypervisor">Hypervisor</dt>
  <dd>
  The hypervisor running on the cluster's hypervisor host machine.
  For {{ $vm_name }}, select <opt>{{- $vm_hypervisor_installer_opt -}}</opt>.
  </dd>

  <!-- # of Cores -->
  <dt id="ui-cluster-param-num-cores"># of Cores</dt>
  <dd>
  The number of CPU cores to allocate for each node.
  {{- partial "doc/param-values.html" (dict "ctx" . "content" "8 or 16") -}}
  </dd>

  <!-- Memory (GB) -->
  <dt id="ui-cluster-param-memory">Memory (GB)</dt>
  <dd>
  The amount of RAM to allocate for each node.
  {{- partial "doc/param-values.html" (dict "ctx" . "content" "122 or 244") -}}
  </dd>
</dl>

<!-- ======================================== -->
#### Data-Cluster Parameters {#step-ui-cluster-data-cluser-params}

The following parameters are applicable only to the {{ $product_lc }}'s data cluster:

<dl>
  <!-- Dashboard Virtual IP Address -->
  <dt id="ui-cluster-param-data-cluster-dashboard-virtual-ip-address">Dashboard Virtual IP Address</dt>
  <dd>
  An IP address that will be used internally to load-balance access to the {{ $product_ui_lc }}.
    Choose an available address from the subnet of the client network.
{{- partial "content-styles/admon.html" (dict "class" "note" "content" "This parameter isn't required for platforms with a single data node." "title" "Note") -}}
  </dd>

  <!-- Storage Devices -->
  <dt id="ui-cluster-param-data-cluster-storage-devices">Storage Devices</dt>
  <dd>
  The names of the block-storage devices (data disks) that are attached to the data nodes, as configured in <a href="#step-attach-data-disks">Step 3</a>.
  </dd>
</dl>

<!-- ======================================== -->
#### Application-Cluster Parameters {#step-ui-cluster-app-cluser-params}

The following parameters are applicable only to the {{ $product_lc }}'s application cluster:

<dl>
  <!-- Kubernetes Kind -->
  <dt id="ui-cluster-param-app-cluster-kubernetes-kind">Kubernetes Kind</dt>
  <dd>
  Leave this set to <opt>New Vanilla Cluster ({{ $company }} Managed)</opt>.
  </dd>

  <!-- API Server Virtual IP Address -->
  <dt id="ui-cluster-param-app-cluster-api-server-virtual-ip-address">API Server Virtual IP Address</dt>
  <dd>
  An IP address that will be used internally to load-balance access to the API server of the Kubernetes cluster.
    Choose an available address from the subnet of the client network.

  {{- partial "content-styles/admon.html" (dict "class" "note" "content" "This parameter isn't required for platforms with a single application node." "title" "Note") -}}
  </dd>

  <!-- GPU Support -->
  <dt id="ui-cluster-param-app-cluster-gpu-support">GPU Support</dt>
  <dd>
  Check this option to configure GPU support for the application cluster.
{{- partial "content-styles/admon.html" (dict "class" "note" "content" "This option is applicable only when there are GPUs attached to the application nodes." "title" "Note") -}}
  </dd>
</dl>

<!-- ---------------------------------------- -->
### Step 10: Configure Node Parameters {#step-ui-nodes}

On the <gui-title>Nodes</gui-title> page, fill in the configuration parameters, and then select <gui-label>Next</gui-label>.

{{ partial "func/igz-figure.html" (dict "img" "setup_vm_installer_ui_nodes.png" "alt" "Node settings" "width" "1024") }}

The configuration includes

- [Adding nodes](#step-ui-nodes-add-nodes)
- [Configuring the nodes' IP addresses](#step-ui-nodes-cfg-ips)

<!-- ======================================== -->
#### Add Nodes {#step-ui-nodes-add-nodes}

Select <gui-label>Add Nodes</gui-label> to display the <gui-title>Add Nodes</gui-title> window.
Configure the new-node parameters in this window, and then select <gui-label>Add</gui-label>.

{{ partial "func/igz-figure.html" (dict "img" "setup_vm_installer_ui_add_nodes.png" "alt" "Add Node") }}

<p/>
<dl>
  <!-- # of Data Nodes -->
  <dt id="ui-cluster-param-number-of-data-nodes"># of Data Nodes</dt>
  <dd>The number of data nodes in the {{ $product_lc }}'s data cluster; must be at least 3 to support high availability (HA).
  {{- partial "doc/param-values.html" (dict "ctx" . "content" "1 or 3") -}}
  </dd>

  <!-- # of App Nodes -->
  <dt id="ui-cluster-param-number-of-app-nodes"># of App Nodes</dt>
  <dd>The number of application nodes in the {{ $product_lc }}'s application cluster; must be at least 3 to support high availability (HA).
  </dd>

  <!-- Client Network Prefix -->
  <dt id="ui-cluster-param-client-network-prefix">Client Network Prefix</dt>
  <dd>The subnet of the data-path (client) network.
    Either use the default value or specify a custom private subnet.
  </dd>

  <!-- Data Management Interface Name -->
  <dt id="ui-cluster-param-data-mangement-interface-name">Data Management Interface Name</dt>
  <dd>Leave this set to <opt>eth0</opt>.
  </dd>

  <!-- App Management Interface Name -->
  <dt id="ui-cluster-param-app-mangement-interface-name">App Management Interface Name</dt>
  <dd>Leave this set to <opt>eth0</opt>.
  </dd>

  <!-- Interconnect Network Prefix -->
  <dt id="ui-cluster-param-interconnect-network-prefix">Interconnect Network Prefix</dt>
  <dd>The subnet of the interconnect network.
      Either use the default value or specify a custom private subnet.
  </dd>

  <!-- Management Network MTU -->
  <dt id="ui-cluster-param-mangement-network-mtu">Management Network MTU</dt>
  <dd>Leave this set to <opt>1500</opt>.
  </dd>

  <!-- Client Network MTU -->
  <dt id="ui-cluster-param-client-network-mtu">Client Network MTU</dt>
  <dd>Leave this set to <opt>1500</opt>.
  </dd>

  <!-- Interconnect Network MTU -->
  <dt id="ui-cluster-param-interconnect-network-mtu">Interconnect Network MTU</dt>
  <dd>Leave this set to <opt>1500</opt>.
  </dd>
</dl>

<!-- ======================================== -->
#### Configure the Nodes' IP Addresses {#step-ui-nodes-cfg-ips}

On the <gui-title>Nodes</gui-title> page, for each node that you added, select the adjacent edit icon (<span class="igz-icon-ic-edit"></span>), enter the node's management IP address, and select <gui-label>Save</gui-label>.

<!-- ---------------------------------------- -->
### Step 11: Review the Settings {#step-review}

On the <gui-title>Review</gui-title> page, review and verify your configuration; go back and make edits, as needed; and then select <gui-label>Create</gui-label> to provision a new instance of the {{ $product_lc }}.

{{ partial "func/igz-figure.html" (dict "img" "setup_vm_installer_ui_review.png" "alt" "Review" "width" "1024") }}

<!-- ---------------------------------------- -->
### Step 12: Wait for Completion {#step-wait-ready}

Provisioning a new {{ $product_lc }} instance typically takes around 30&ndash;40 minutes, regardless of the cluster sizes.
You can download the provisioning logs, at any stage, by selecting <gui-label>Download logs</gui-label> from the instance's action menu.

{{ partial "func/igz-figure.html" (dict "img" "setup_vm_installer_ui_download_logs.png" "alt" "Download logs" "width" "1025") }}

You can also follow the installation progress by tracking the {{ $product_installer_lc }} Docker container logs.

When the installation completes, you should have a running instance of the {{ $product_lc }} on your {{ $vm_name }} cluster.
You can use the {{ $product_installer_ui_lc }} to view the installed nodes (VMs).
Then, proceed to the post-deployment steps.
<!-- [IntInfo] (sharonl) (9.11.20) I added this similar to the recent addition
  to the AWS installation guide at the request of Product (Gilad) following
  input from Amazon as part of an AWS Outposts certification process (see
  [c-aws-outposts-cert-req] in aws-installation-guide.md. I removed the
  reference to seeing the nodes' status after Efi said that while you can see
  the installed nodes on the Provazio dashboard, you can't see their status.
  Gilad approved removing the status reference also from the AWS guide. -->

<!-- //////////////////////////////////////// -->
## Post-Deployment Steps {#post-deployment-steps}

When the deployment completes, follow the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/post-install-steps.md" $vm) "text" "post-deployment steps") }}.

<!-- //////////////////////////////////////// -->
## See Also

- {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/" $vm)) }}
- {{ partial "func/xref.html" (dict "ctx" . "f" "cluster-mgmt/deployment/on-prem/on-prem-hw-spec.md") }}
<!-- END CONTENT -->

