---
---
- <api-b>{{< getvar v="product.running_user.envar" >}}</api-b> &mdash; set to the username of the running user of the Jupyter Notebook service.
- <api-b>{{< getvar v="product.users_container.user_dir.dir_envar" >}}</api-b> &mdash; set to the running-user directory in the "{{< getvar v="product.users_container.name" >}}" container &mdash; **{{< getvar v="product.users_container.name" >}}/&lt;running user&gt;**.
- <api-b>{{< getvar v="product.users_container.user_dir.dir_url_envar" >}}</api-b> &mdash; set to the fully qualified `{{< verkey k="fs_k8s.data_mount.name" >}}` path to the running-user directory &mdash; `{{< verkey k="fs_k8s.data_mount.name" >}}://{{< getvar v="product.users_container.name" >}}/<running user>`.

