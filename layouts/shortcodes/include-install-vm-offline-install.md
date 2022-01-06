<!-- Common on-prem VM offline-installation how-to doc -->
<!-- Deployment-Specific Variables -->
{{- $vm := .Get "vm" -}}
{{- $content := "" -}}
<!-- vmware (default) -->
{{- $vm_name := "vSphere" -}}
{{- $vm_hypervisor := "ESXi" -}}
{{- $vm_hypervisor_long := "VMware ESXi" -}}
<!-- Proxmox -->
{{- if eq $vm "proxmox" -}}
  {{- $vm_name = "PVE" -}}
  {{- $vm_hypervisor = "PVE" -}}
  {{- $vm_hypervisor_long = "Proxmox VE" -}}
{{- end -}}
{{- $vm_name_tc := $vm_name -}}

<!-- Easy Access to Site Parameters and Data Variables -->
{{- $company := $.Site.Params.company -}}
{{- $product_lc := $.Site.Data.vars.product.name.lc -}}
{{- $product_tc := $.Site.Data.vars.product.name.tc -}}
{{- $product_installer_lc := $.Site.Data.vars.product.installer.name.lc -}}
{{- $product_installer_tc := $.Site.Data.vars.product.installer.name.tc -}}
{{- $product_installer_ui_lc := $.Site.Data.vars.product.installer.ui.name.lc -}}

<!-- START CONTENT -->
<!-- //////////////////////////////////////// -->
## Overview {#overview}

Installing (deploying) the {{ $product_lc }} on virtual machines (VMs) in environments without an internet connection (a.k.a. "dark sites") requires a variation on the online procedure that's described in the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/%s-installation-guide.md" $vm $vm)) }}, as outlined in this guide.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

Before you begin, ensure that you have the following:

1. <a id="prereq-offline-install-pkg"></a>A {{ $product_lc }} installation package (<file>{{ $.Site.Data.vars.product.install_pkg.archive }}</file>), received from {{ $company }}.
2. <a id="prereq-offline-installer-ui-docker-image"></a>A preloaded {{ $product_installer_ui_lc }} Docker image (<path>{{- $.Site.Data.vars.product.installer.ui.image.path.stable -}}</path>), received from {{ $company }} as an image archive (<file>{{ $.Site.Data.vars.product.installer.ui.image.archive }}</file>).
3.  <a id="prereq-install-api-key"></a>A {{ $product_installer_ui_lc }} API key, received from {{ $company }}.
4.  <a id="prereq-admin-access-n-prev-instal-steps"></a>Administrative access to a {{ $product_lc }} {{ $vm_name }} cluster with the required networks configuration (see {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/network-cfg.md" $vm)) }} and {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/ips-cfg.md" $vm)) }}) and deployed VMs for each of the {{ $product_lc }} nodes (see {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/howto/vms-deploy.md" $vm)) }}).

<!-- //////////////////////////////////////// -->
## Run The {{ $product_tc }} Installer Offline {#run-product-installer-offline}

Execute the following steps to run the {{ $product_lc }} installer ({{- $product_installer_lc -}}) without internet connectivity (offline installation):

1.  <a id="step-install-pkg-cp-n-extract"></a>Copy and extract the installation package:

    1.  Establish an SSH connection to one of the {{ $product_lc }}'s data-node VMs.
    2.  Create an <dirname>{{ $.Site.Data.vars.product.install_vm.data_node_install_dir.name }}</dirname> directory under <path>{{ $.Site.Data.vars.product.install_vm.data_node_install_dir.parent }}</path> (`$HOME`):
    3.  Copy the <file>{{ $.Site.Data.vars.product.install_pkg.archive }}</file> installation-package archive (see the <a href="#prereq-offline-install-pkg">prerequisites</a>) to the new <path>{{ $.Site.Data.vars.product.install_vm.data_node_install_dir.path }}</path> directory.
    4.  Extract the package archive to the <dirname>{{ $.Site.Data.vars.product.install_vm.data_node_install_dir.name }}</dirname> directory.

2. <a id="step-installer-ui-docker-image-cp-n-extract"></a>Copy and extract the {{ $product_installer_ui_lc }} Docker image:

    1.  Copy the <file>{{ $.Site.Data.vars.product.installer.ui.image.archive }}</file></a> preloaded {{ $product_installer_ui_lc }} Docker-image archive (see the <a href="#prereq-offline-installer-ui-docker-image">prerequisites</a>) to the installation machine that is running Docker.

    2.  Extract the <file>{{ $.Site.Data.vars.product.installer.ui.image.archive }}</file> Docker-image archive by running the following command on the machine that is running Docker:
        ```sh
        docker load -i {{ $.Site.Data.vars.product.installer.docker_image.archive }}
        ```
        The output for a successful execution should look like this:
        ```sh
        Loaded image: {{ $.Site.Data.vars.product.installer.ui.image.path.stable }}
        ```

3. <a id="step-run-installer"></a>Run the {{ $product_lc }} installer, {{ $product_installer_lc }}, by running the following command from a command-line shell; replace the <code>&lt;{{ $product_installer_tc }} API Key&gt;</code> placeholder with the {{ $product_installer_lc }} API key that you received from {{ $company }}:
    <div class="highlight"><pre class="chroma"><code class="language-sh" data-lang="sh">docker run --rm --name {{ $.Site.Data.vars.product.installer.ui.image.name }} \
        -p 8060:8060 \
        -e {{ $.Site.Data.vars.product.installer.api_key.envar }}=<{{- $product_installer_tc }} API Key> \
        &#8201;{{- $.Site.Data.vars.product.installer.ui.image.path.stable -}}</code></pre>
    </div>
    <!-- [ci-md-shcd-md-fenced-code-w-templates] [InfraInfo[ (16.11.20) See
      info in the include-install-vm-installation-guide.md shortcode regarding
      problems with angle brackets in MD fenced code (`<...>`) and code blocks
      when the content contains variables or access to site params, currently
      bypassed by using code HTML tags - see in the paragraph and code-block
      above. -->

<!-- //////////////////////////////////////// -->
## What's Next?

After successfully running the {{ $product_lc }} installer, proceed to the {{ partial "func/xref.html" (dict "ctx" . "f" (printf "cluster-mgmt/deployment/on-prem/vm/%s/%s-installation-guide.md" $vm $vm) "a" "step-access-installer-ui" "text" "installer dashboard-access step") }} in the {{ $vm_name }} installation guide to configure installation parameters from the installer dashboard.
<!-- START END -->

