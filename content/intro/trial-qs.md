---
title: "Iguazio Trial Quick-Start"
keywords: "Iguazio trial, cloud trial, trial, free trial, evaluation, product evaulation, getting started, quick-start, introduction, v3io tutorials, platform tutorials, tutorials, api examples, code examples, code walkthroughs, jupyter, jupypter notebooks, dashboard, UI, demos, v3io"
menu:
  main:
    parent:     "intro"
    identifier: "trial-qs"
    Post:       "Quick-start tutorial for users of the Iguazio Trial"
    weight:     900
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title should
  use {{< cloud-trial "name.full_tc" >}}. -->
{{< /comment >}}
{{< comment >}}<!-- [TODO-SITE-RESTRUCT-P2] Edit the content + check links. -->
{{< /comment >}}

Get ready to start your free evaluation of the {{< product full >}} ... .

<!-- //////////////////////////////////////// -->
## Overview {#overview}

{{< cloud-trial "name.full_sc" >}} is a free evaluation of the {{< product full >}} ("the {{< product lc >}}") from within a cloud environment that doesn't require any user installations or configurations.
When you register to the {{< cloud-trial "name.lc" >}}, you receive your own cluster &mdash; a dedicated cloud instance of the {{< product lc >}}.
To register for a free evaluation, click [here]({{< url g="product" v="cloud_trial" k="url" k2="full" >}}) or select the <gui-label>{{< cloud-trial "try_button.caption" >}}</gui-label> button on the {{< url v="product_home" k="text" link="1" >}}.

The {{< cloud-trial "name.lc" >}} allows you to test most of the functions and features of the {{< product lc >}}, including full access to its APIs and graphical and command-line interfaces.
However, note that

- <a id="trial-restriction-num-nodes"></a>The {{< cloud-trial "name.lc" >}} environment currently uses only a single node and isn't provisioned for performance, and its capacity is restricted to 900 GB.
- <a id="trial-restriction-eval-duration"></a> The free evaluation it typically restricted to {{< cloud-trial "duration.days" >}} days.
- <a id="trial-restriction-sys-pwd-dont-change"></a>You should not change the password of your cluster's predefined system user (typically named "{{< cloud-trial "sys_user.name" >}}").
    This is a trial-only restriction for the purpose of simplifying the evaluation process.

For general information about the {{< cloud-trial "name.short_lc" >}} offering and the registration process, contact {{< email id="cloud_trial" link="1" >}}.
<br/>
For technical questions and assistance, contact {{< company >}}'s {{< email id="prof_services" link="1" text="customer-success engineers" >}}, who are available to assist and guide you throughout your evaluation.

{{< note id="cloud-doc-pref-note" >}}
The {{< cloud-trial "name.lc" >}} runs in the cloud.
For the rare instances in which the documentation differentiates among the different deployment types, follow the cloud guidelines.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## Getting Started {#getting-started}

It's recommended that you start your evaluation by following these steps:

1.  <a id="intro-video"></a>**Watch the introductory video** (available also on [YouTube]({{< url v="intro_video" k="full" >}})).
    Note that there might be some differences between your environment and what you see in the video, depending on the version that you are using:
    {{< youtube 8OmAN4wd7To >}}

2.  <a id="intro-doc"></a>**Read the {{< product lc >}} introduction** &mdash; {{< xref f="intro/introduction.md" >}}.
    The introduction also contains useful links for continuing your evaluation.

3.  <a id="juoyter-tutorials"></a>Log into your cluster's {{< productUI lc >}} using the URL and login credentials that you received, and then log into the predefined Jupyter Notebook service or create a new service (see the instructions on the welcome pop-up page or in the {{< xref f="services/fundamentals.md" a="create-new-service" >}} tutorial.)
    <br/>
    The tutorials include a [<file>{{< verkey k="jupyter_notebook.tutorials.welcome_nb.file" >}}</file>]({{< public-gh ghid="tutorials" path="/" >}}{{< verkey k="jupyter_notebook.tutorials.welcome_nb.file" >}}) notebook (available also as a [<file>README.md</file>]({{< public-gh ghid="tutorials" path="/README.md" >}}) Markdown file) &mdash; which is similar to the {{< product lc >}} introduction that you read in the previous step &mdash; and many other useful tutorials.

<!-- //////////////////////////////////////// -->
## What's Next?

- Follow the [**getting-started tutorial**]({{< public-gh ghid="mlrun_demos" path="/" >}}{{< verkey k="mlrun.demos.gs_tutorial.dir_name" >}}/README.md) Jupyter tutorial, which demonstrates key features and benefits of the {{< product lc >}}.
- Read the product {{< xref f="intro/introduction.md" text="introduction" >}} and {{< xref f="intro/product-overview.md" text="in-depth overview" >}}, and browse the introductory content in the sections that best fits your development needs (see the table-of-contents menu).
    You can also find useful links on the {{< xref f="/" text="documentation home page" >}}.
- Review and run other Jupyter tutorial notebooks.
    You can find full end-to-end use-case application and how-to demos in the <dirname>{{< verkey k="jupyter_notebook.tutorials.demos.dir_name" >}}</dirname> tutorials directory.
    For more information, see {{< xref f="intro/introduction.md" a="demos" >}}.

