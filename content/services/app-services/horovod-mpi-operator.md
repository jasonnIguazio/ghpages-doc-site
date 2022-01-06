---
title:      "The MPI-Operator Horovod Service"
description: "Learn about the Horovod MPI-Operator service of the Iguazio MLOps Platform services for distributed ."
keywords: "horovod, kubeflow mpi operator, mpi operator, mpi jobs, gpu spport, gpu, cpu, uber, deep learning, machine learning, ml, ml models, model training, performance, open source"
menu:
  main:
    name:       "Horovod / MPI Operator"
    parent:     "app-services"
    identifier: "horovod-service"
    weight:     60
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  intro/ecosystem/app-services.md#horovod. Most of the previous content is in
  the new services/gpu.md page, which the current page now links to. The
  opening text in the current file are also found in services/gpu.md#horovod.
-->
{{< /comment >}}
{{< comment >}}<!-- [c-mpi-operator-horovod-service] [IntInfo] See info in
  data/vars/product.toml. -->
{{< /comment >}}

The {{< product lc >}} has a default (pre-deployed) shared single-instance tenant-wide {{< url v="kubeflow_mpi_operator_home" k="text" link="1" >}} service (`{{< verkey k="horovod.service_display_name" >}}`), which facilitates Uber's {{< url v="horovod_home" k="text" link="1" >}} distributed deep-learning framework.
Horovod, which is already preinstalled as part of the {{< product lc >}}'s Jupyter Notebook service, is widely used for creating machine-learning models that are trained simultaneously over multiple GPUs or CPUs.
For more information about using the Horovod to run applications over GPUs, see {{< xref f="services/app-services/gpu.md" >}}.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/app-services/gpu.md" >}}
- {{< xref f="services/fundamentals.md" >}}
- {{< xref f="services/app-services/jupyter.md" >}}

