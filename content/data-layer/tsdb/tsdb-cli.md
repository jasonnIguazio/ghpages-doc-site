---
title:      "The V3IO TSDB CLI (tsdbctl)"
linktitle:  "The TSDB CLI"
description: "Learn how to use the V3IO TSDB CLI (tsdbctl) to work with time-series data in the Iguazio MLOps Platform."
keywords: "tsdb cli, v3io tsdb cli, tsdb, time series, cli, quereies, metrics, data samples, aggregatrors, aggregator, aggregates, aggregate functions, avg, count, last, min, max, rate, stddev, stdvar"
menu:
  main:
    name:       "The TSDB CLI (tsdbctl)"
    parent:     "data-layer-tsdb"
    identifier: "tsdb-cli"
    weight:     20
---
{{< comment >}}<!-- [InfraInfo] [ci-no-shcd-in-front-matter] The title and
  description should use {{< getvar v="product.tsdb.name.tc" >}} and
  {{< tsdb-cli >}}. -->
{{< /comment >}}
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces tutorials/tsdb/tsdb-cli.md.
  (sharonl) I removed "Working with" from the start of the title. -->
{{< /comment >}}
{{< comment >}}<!-- [V2.0.0-TSDB] Continue editing for v2.0.0 k8s (DOC IG-9810)
  - see info in the parent _index.md page. -->
<!-- [c-tsdb-unsupported-tp-features-cli] [IntInfo] (sharonl) (5.4.20) At Orit
  and Adi's request, I retroactively edited the latest-release v2.5.4 TSDB CLI
  doc and the v2.3.1 doc to indicate explicitly that specific features that we
  previously planned to document as Tech Preview are not supported (and edit
  the related internal comments). See the "Tech Preview Documentation" email
  thread from Apr 2020. [TECH-PREVIEW-TSDB-AGGR-WINDOW]
  [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR] [TECH-PREVIEW-TSDB-INTERPOLATION]
  [TECH-PREVIEW-TSDB-GROUP_BY] [TECH-PREVIEW-TSDB-SQL-QUERIES].
  The changes also include removing all the xxx_all aggregation-function names
  from the front-matter keywords. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< getvar v="product.tsdb.name.lc" >}} includes the {{< getvar v="product.tsdb.name.lc" >}} command-line interface (**"the TSDB CLI"**), which enables users to easily create, update, query, and delete time-series databases (TSDBs), as demonstrated in this tutorial.
Before you get started, read the setup and usage information in this section and review the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb" text="TSDB software specifications and restrictions" >}}.

- [Setup](#setup)
- [Reference](#reference)
- [Mandatory Command Configurations](#mandatory-cmd-cfgs)
- [Using a Configuration File](#cfg-file)

<!-- ---------------------------------------- -->
### Setup {#setup}

The TSDB CLI can be run locally on a {{< product lc >}} application cluster or remotely from any computer with a network connection to the cluster.
The {{< product lc >}}'s web shell and Jupyter Notebook services include a compatible Linux version of the TSDB CLI &mdash; <file>{{< tsdb-cli >}}</file>, which is found in the <path>{{< verkey k="tsdb.bin_dir_path_w_envar" >}}</path> directory; the installation directory is included in the shell path (`$PATH`) to simplify execution from anywhere in the shell.
For remote execution, download the CLI from the [{{< getvar v="product.tsdb.name.lc" >}} GitHub repository]({{< public-gh ghid="tsdb" >}}/releases/{{< url v="public_gh_tsdb" k="tag_prefix" >}}{{< verkey k="tsdb.version" >}}).

<a id="tsdb-cli-alias"></a>In the web shell and Jupyter terminal environments there's also a predefined `{{< tsdb-cli >}}` alias to the native CLI that preconfigures the [<opt>--server</opt>](#tsdb-cli-flag-server) flag to the URL of the web-APIs service and the [<opt>--access-key</opt>](#tsdb-cli-flag-access-key) flag to the authentication access key for the running user of the parent shell or Jupyter Notebook service; you can override the default configurations in your CLI commands.
When running the CLI from an on-cluster Jupyter notebook or remotely, you need to configure the web-APIs service and authentication credentials yourself, either in the CLI command or in a configuration file, as outlined in this tutorial.

{{< note id="tsdb-cli-setup-notes" >}}
- Version {{< productVersion num >}} of the {{< product lc >}} is compatible with version {{< tsdb-cli t="version_short" >}} of the {{< getvar v="product.tsdb.name.lc" >}}.
    Please consult {{< company >}}'s {{< email id="support" link="1" text="support team" >}} before using another version of the CLI.
- When using a downloaded version of the CLI (namely for remote execution), it's recommended that you add the file or a symbolic link to it (such as `{{< tsdb-cli >}}`) to the execution path on your machine (`$PATH`), as done in the {{< product lc >}} command-line environments.
    For the purpose of this tutorial, it's assumed that <cmd>{{< tsdb-cli >}}</cmd> is found in your path and is used to run the relevant version of the CLI.
{{< /note >}}
{{< comment >}}<!-- [IntInfo] (sharonl) (17.10.18) Golan requested that we
  don't mention the option of renaming the CLI binary. (24.4.19) In v1.9, and
  I believe that also in v2.0.0, `tsdbctl` in our command-line environments was
  a symbolic link to a tsdbctl.v<version>-<os>-<arch> binary file in the
  installation directory; however, in v2.1.0, `tsdbctl` seems to be the name of
  the binary in the installation directory, and in addition, in the web shell
  and Jupyter terminal (but not in Jupyter Notebook) we define a `tsdcbtl`
  alias that runs the tsdbctl binary with some preconfigured flags, as
  documented in the tutorial. -->
{{< /comment >}}

<!-- ---------------------------------------- -->
# Reference {#reference}

Use the CLI's embedded help for a detailed reference:

- Run the general <cmd>help</cmd> command to get information about of all available commands:

    ```sh
    {{% tsdb-cli %}} help
    ```
    {{< comment >}}<!-- [IntInfo] (sharonl) I decided not to refer to the
      alternative methods of running `tsdbctl` | `tsdbctl -h` | `tsdbctl -->
      --help<!--`. -->
    {{< /comment >}}
- Run `{{< tsdb-cli >}} help <command>` or `{{< tsdb-cli >}} <command> -h` to view the help reference for a specific command.
    For example, use either of the following variations to get help for the <cmd>query</cmd> command:

    ```sh
    {{% tsdb-cli %}} help query
    {{% tsdb-cli %}} query -h
    ```
    {{< comment >}}<!-- [IntInfo] (sharonl) I decided not to mention the option
      of using the longer help flag -->(--help)<!--. -->
    {{< /comment >}}

<!-- ---------------------------------------- -->
### Mandatory Command Configurations {#mandatory-cmd-cfgs}

All CLI commands demonstrated in this tutorial require that you configure the following flags.
This can be done either in the CLI command itself or in a [configuration file](#cfg-file).
As explained in the [Setup](#tsdb-cli-alias) section, when running the CLI locally from an on-cluster web shell or Jupyter terminal, you can use the `{{< tsdb-cli >}}` alias, which preconfigures the `--server` and `--access-key` flags.

- User-authentication flags &mdash; one of the following alternatives:
    - For access-key authentication &mdash;
        - <a id="tsdb-cli-flag-access-key"></a>**<opt>-k|--access-key</opt>** &mdash; a valid access key for logging into the configured web-APIs service.
            You can {{< text-access-key-get >}}.
            {{< note id="auth-flags-notes" >}}
- The [`{{< tsdb-cli >}}` alias](#tsdb-cli-alias) that's available in the {{< product lc >}}'s web shell and Jupyter terminal environments preconfigures the `--access-key` flag for the running user.
- When running the native {{< getvar v="product.tsdb.name.lc" >}} CLI locally &mdash; for example, from a Jupyter notebook, which doesn't have the `{{< tsdb-cli >}}` alias &mdash; you can set the <opt>-k</opt> or <opt>--access-key</opt> flag to `${{< getvar v="product.running_user.access_key_envar" >}}`.
            {{< /note >}}
    - For username-password authentication &mdash;
        - <a id="tsdb-cli-flag-username"></a>**<opt>-u|--username</opt>** &mdash; a valid username for logging into the configured web-APIs service.
        - <a id="tsdb-cli-flag-password"></a>**<opt>-p|--password</opt>** &mdash; the password of the configured web-APIs service user.

- <a id="tsdb-cli-flag-server"></a>**<opt>-s|--server</opt>** &mdash; the endpoint of your {{< product lc >}}'s web-APIs (web-gateway) service.
    The [`{{< tsdb-cli >}}` alias](#tsdb-cli-alias) that's available in the {{< product lc >}}'s web shell and Jupyter terminal environments preconfigures this flag for the running user.
    If you're not using the alias &mdash; for example, if you're running the native TSDB CLI from a Jupyter notebook or remotely &mdash; set this flag to `<web-APIs IP>:<web-APIs HTTP port>`:
    - `<web-APIs IP>` &mdash; the IP address of the web-APIs service; for example, `{{< verkey k="webapi.ip_example" >}}`.
        The IP address is stored in a `V3IO_WEBAPI_SERVICE_HOST` environment variable in the {{< product lc >}}'s web shells and Jupyter notebooks and terminals
        You can also get this address from the web-APIs HTTPS URL: copy the <gui-label>HTTPS</gui-label> API link of the web-APIs service (`{{< verkey k="webapi.service_display_name" >}}`) from the <gui-title>Services</gui-title> {{< productUI lc >}} page, and then remove `https://` from the start of the URL.
    - `<web-APIs HTTP port>` &mdash; the HTTP port of the web-APIs service.
        The port number is stored in a `V3IO_WEBAPI_SERVICE_PORT` environment variable in the {{< product lc >}}'s web shells and Jupyter notebooks and terminals.

- <a id="tsdb-cli-flag-container"></a>**<opt>-c|--container</opt>** &mdash; the name of the parent data container of the TSDB instance (table).
    For example, `"{{< getvar v="product.tsdb.doc_examples.container" >}}"` or `"mycontainer"`.

- <a id="tsdb-cli-flag-table-path"></a>**<opt>-t|--table-path</opt>** &mdash; the path to the TSDB instance (table) within the configured container.
    For example `"my_metrics_tsdb"` or `"tsdbs/metrics"`.
    {{< comment >}}<!-- [InfInfo] (sharonl) It's also possible to precede to
      start the table path with '/', but it's not necessary. I decided not to
      explicitly refer to this option or use it in the examples. -->
    {{< /comment >}}
    (Any component of the path that doesn't already exist will be created automatically.)
    The TSDB table path should not be set in a CLI configuration file.

Some commands require additional configurations, as detailed in the command-specific documentation.

<!-- ---------------------------------------- -->
### Using a Configuration File {#cfg-file}

Some of the CLI configurations can be defined in a YAML file instead of setting the equivalent flags in the command line.
By default, the CLI checks for a <nobr><file>{{< getvar v="product.tsdb.cli.default_cfg_file" >}}</file></nobr> configuration file in the current directory.
You can use the global CLI <opt>-g|--config</opt> flag to provide a path to a different configuration file.
Command-line configurations override file configurations.

You can use the template [<nobr><path>{{< getvar v="product.tsdb.cli.cfg_template_path" >}}</path></nobr>]({{< public-gh ghid="tsdb" path="/" >}}{{< getvar v="product.tsdb.cli.cfg_template_path" >}}) configuration file in the {{< getvar v="product.tsdb.name.lc" >}} GitHub repository as the basis for your custom configuration file.
The template includes descriptive comments to explain each key.

To simplify the examples in this tutorial and focus on the unique options of each CLI command, the examples assume that you have created a <nobr><file>{{< getvar v="product.tsdb.cli.default_cfg_file" >}}</file></nobr> file in the directory from which you're running the CLI (default path) and that this file configures the following keys; note that the web-APIs service and user-authentication configurations aren't required if you use the on-cluster [`{{< tsdb-cli >}}` alias](#tsdb-cli-alias), which preconfigures these flags for the running user:

- <a id="tsdb-cli-cfg-key-webApiEndpoint"></a><yamlkey-b>webApiEndpoint</yamlkey-b> &mdash; the equivalent of the CLI [<opt>-s|--server</opt>](#tsdb-cli-flag-server) flag.
- <a id="tsdb-cli-cfg-key-container"></a><yamlkey-b>container</yamlkey-b> &mdash; the equivalent of the CLI [<opt>-c|--container</opt>](#tsdb-cli-flag-container) flag.
- <a id="tsdb-cli-cfg-key-accesskey"></a><yamlkey-b>accesskey</yamlkey-b> &mdash;  the equivalent of the CLI [<opt>-k|--access-key</opt>](#tsdb-cli-flag-access-key) flag.

    Alternatively, you can set the following flags for username-password authentication:
    - <a id="tsdb-cli-cfg-key-username"></a><yamlkey-b>username</yamlkey-b> &mdash;  the equivalent of the CLI [<opt>-u|--username</opt>](#tsdb-cli-flag-username) flag.
    - <a id="tsdb-cli-cfg-key-password"></a><yamlkey-b>password</yamlkey-b> &mdash;  the equivalent of the CLI [<opt>-p|--password</opt>](#tsdb-cli-flag-password) flag.

Following is an example configuration file.
Replace the IP address and access key in the values of the <yamlkey>webApiEndpoint</yamlkey> and <yamlkey>accessKey</yamlkey> keys with your specific data; you can also select to replace the <yamlkey>accesskey</yamlkey> key with <yamlkey>username</yamlkey> and <yamlkey>password</yamlkey> keys:

```yaml
# File:         v3io-tsdb-config.yaml
# Description:  V3IO TSDB Configuration File

# Endpoint of an Iguazio MLOps Platform web APIs (web-gateway) service,
# consisting of an IP address or resolvable host domain name
webApiEndpoint: "{{% verkey k="webapi.ip_example" %}}"

# Name of an Iguazio MLOps Platform container for storing the TSDB table
container: "{{% getvar v="product.tsdb.doc_examples.container" %}}"

# Authentication credentials for the web-APIs service
accessKey: "MYACCESSKEY"
# OR
#username: "MYUSER"
#password: "MYPASSWORD"
```

For example, the following CLI command for getting information about a "{{< getvar v="product.tsdb.doc_examples.table" >}}" TSDB in the "{{< getvar v="product.tsdb.doc_examples.container" >}}" container &mdash;
```sh
{{% tsdb-cli %}} info -c {{% getvar v="product.tsdb.doc_examples.container" %}} -t {{% getvar v="product.tsdb.doc_examples.table" %}} -n -m -s {{% verkey k="webapi.ip_example" %}} -k MYACCESSKEY
```
&mdash; is equivalent to the following command when the current directory has the aforementioned example <nobr><file>{{< getvar v="product.tsdb.cli.default_cfg_file" >}}</file></nobr> file:
```sh
{{% tsdb-cli %}} info -t {{% getvar v="product.tsdb.doc_examples.table" %}} -n -m
```
As indicated above, you can override any of the file configurations in the command line.
For example, you can add <nobr>`-c metrics`</nobr> to the previous command to override the default "{{< getvar v="product.tsdb.doc_examples.container" >}}" container configuration and get information for a "{{< getvar v="product.tsdb.doc_examples.table" >}}" table in a custom "metrics" container:
```sh
{{% tsdb-cli %}} info -t {{% getvar v="product.tsdb.doc_examples.table" %}} -n -m -c metrics
```

<!-- //////////////////////////////////////// -->
## Creating a New TSDB {#tsdb-create}

Use the CLI's <cmd>create</cmd> command to create a new TSDB instance (table) &mdash; i.e., create a new TSDB.
The command receives a mandatory <opt id="tsdb-cli-create-flag-ingestion-rate">-r|--ingestion-rate</opt> flag, which defines the TSDB's metric-samples ingestion rate.
The rate is specified as a string of the format `"[0-9]+/[smh]"` (where '`s`' = seconds, '`m`' = minutes, and '`h`' = hours); for example, `"1/s"` (1 sample per second), `"20/m"` (20 samples per minute), or `"50/h"` (50 samples per hour).
It's recommended that you set the rate to the average expected ingestion rate for a unique label set (for example, for a single server in a data center), and that the ingestion rates for a given TSDB table don't vary significantly; when there's a big difference in the ingestion rates (for example, x10), consider using separate TSDB tables.
{{< comment >}}<!-- [IntInfo] (sharonl) (17.10.18) We added a note about using
  separate tables for ingestion rates that vary too much (x10 or more), at
  Golan's request. Golan said that we've found that when the ingestion rates
  for the same TSDB vary too much, we lose data, but he didn't want to
  explicitly mention the data loss. (He said a x20 variance might also be OK,
  but he decided to go with x10 in the doc.) (19.11.19) The separate note was
  replaced with a modified version as part of the flag description above, and
  at Tal's request, the guideline to set the ingestion rate according to the
  slowest expected rate was replaced with a guideline to set it according to
  the expected average ingestion rate. (30.12.19) At Tal's suggestion, I edited
  the note to clarify that the recommendation refers to the ingestion rate for
  a unique label set and to replace the directive to use separate TSDB table
  with a recommendation to consider using separate tables. -->
{{< /comment >}}

{{< note id="create-unsupported-flags-note" >}}
In the current release, the <cmd>create</cmd> command doesn't support the <opt>-l|--cross-label</opt> flag.
{{< /note >}}
{{< comment >}}<!-- [c-tsdb-unsupported-tp-features-cross-series-preaggr-cli]
  [IntInfo] (sharonl) (5.4.20) Added retroactively to the v2.54 & v2.31 docs
  [TECH-PREVIEW-TSDB-CROSS-SERIES-PREAGGR] (Requirement IG-9692 / DOC IG-9811).
  [V2.8.0-TODO] Consider removing the note because the CLI help text in v2.8
  clearly states that this option isn't supported. -->
{{< /comment >}}

{{< comment >}}<!-- [IntInfo] (sharonl) (17.10.18) Golan requested that we
  don't document this option. We agreed that in the next TSDB release (planned
  to be v0.0.14) it will be hidden in the CLI help. (6.4.20) The
  -b|- -sharding-buckets flag is still documented in the CLI help in v2.5 and
  in the CLI for the upcoming v2.8.0 release. I asked Orit about this on the
  "TSDB CLI Help" email thread. [PENDING-DEV] -->
If you expect to have non-uniform data in the TSDB &mdash; namely, if most of the data is expected to be only for a few metrics &mdash; you can use the optional <opt>-b|--sharding-buckets</opt> flag to optimize the data distribution by configuring the number of storage buckets across which to split the data of a single metric; (this applies to all metric items with the same metric names).
The flag accepts integer values and its default value is `{{< getvar v="product.tsdb.cli.default_cfgs.create_sharding_buckets_count" >}}` (i.e., distribute the samples for each unique metric name across eight buckets).
{{< comment >}}<!-- [InfInfo] (sharonl) (14.10.18) I added the "(this applies
  to all metric names)" note because the metric items (which are sometimes
  referred to by R&D as "metrics") are created for all unique combinations of
  metric names and labels, while the sharding-buckets count applies to all
  items for the same metric name (confirmed with Igor). -->
{{< /comment >}}
{{< /comment >}}

<!-- ---------------------------------------- -->
### Examples {#tsdb-create-examples}

The following command creates a new "tsdb_example" TSDB in the [configured](#cfg-file) "{{< getvar v="product.tsdb.doc_examples.container" >}}" container with an ingestion rate of one sample per second:
```sh
{{% tsdb-cli %}} create -t tsdb_example -r 1/s
```

<!-- ---------------------------------------- -->
### Defining TSDB Aggregates {#defining-tsdb-aggregates}

You can optionally use the <opt id="tsdb-cli-create-flag-aggregates">-a|--aggregates</opt> flag of the <cmd>create</cmd> CLI command to configure a list of aggregation functions ("aggregators") that will be executed for each metric item in real time during the ingestion of the metric samples into the TSDB.
The aggregations results are stored in the TSDB as array attributes ("pre-aggregates") and used to handle relevant aggregation queries.
The aggregators are provided as a string containing a comma-separated list of one or more [supported aggregation functions](#supported-aggr-funcs); for example, `"avg"` (average sample values) or `"max,min,last"` (maximum, minimum, and latest sample values).

When configuring the TSDB's pre-aggregates, you should also use the <opt id="tsdb-cli-create-flag--aggregation-granularity">-i|--aggregation-granularity</opt> flag to specify the aggregation granularity &mdash; a time interval for executing the aggregation functions.
The aggregation granularity is provided as a string of the format `"[0-9]+[mhd]"` (where '`m`' = minutes, '`h`' = hours, and '`d`' = days); for example, `"90m"` (90 minutes = 1.5 hours) or `"2h"` (2 hours).
The default aggregation granularity is one hour (`{{< getvar v="product.tsdb.cli.default_cfgs.create_aggr_granularity" >}}`).
{{< comment >}}<!-- [IntInfo] (sharonl) (17.10.18) Golan requested that we
  guide users to provide the granularity explicitly and not rely on the default
  value. => I replaced "you can optionally use ..." with "you should use ..." .
-->
{{< /comment >}}

{{< comment >}}<!-- [IntInfo] (sharonl) (17.10.18) Golan asked that we don't
  document the aggregation attributes. (12.12.19) I mentioned above that the
  aggregation results are stored in the TSDB as "pre-aggregates" array
  attributes. -->
The aggregation results are stored in <attr>\_v\_&lt;aggregate&gt;</attr> metric-item array blob attributes; for example, <attr>\_v\_count</attr>.
You can retrieve the aggregation calculations by using an [aggregation query](#aggregation-queries).
{{< /comment >}}

{{< note id="tsdb-cli-create-aggregates-notes" title="Aggregation Notes" >}}
- You can also perform aggregation queries for TSDB tables without pre-aggregates, but when configured correctly, pre-aggregation queries are more efficient.
    To ensure that pre-aggregation is used to process aggregation queries and improve performance &mdash;
    - When creating the TSDB table, set its aggregation granularity ([<opt>-i|--aggregation-granularity</opt>](#tsdb-cli-create-flag--aggregation-granularity)) to an interval that's significantly larger than the table's metric-samples ingestion rate ([<opt>-r|--ingestion-rate</opt>](#tsdb-cli-create-flag-ingestion-rate)).
    - When [querying the table](#tsdb-query), set the aggregation interval ([<opt>-i|--aggregation-interval</opt>](#tsdb-cli-query-aggregation-interval)) to a sufficient multiplier of the table's aggregation granularity.
        For example, if the table's ingestion rate is 1 sample per second (`"1/s"`) and you want to user hourly queries (i.e., use a query aggregation interval of `"1h"`), you might set the table's pre-aggregation granularity to 20 minutes (`"20m"`).
    {{< comment >}}<!-- [c-tsdb-pre-aggregation-guidelines] [IntInfo] (sharonl)
      See the info for the Frames create() `aggregates` pre-aggregation notes
      in the api-references/frames/tsdb/create.md reference doc.
      [TECH-PREVIEW-TSDB-AGGR-WINDOW] TODO: Check the need to update the doc to
      refer to the aggregation window and not the aggregation interval (similar
      to the Frames doc) once we document the related aggregation-window query
      flag. [c-tsdb-unsupported-tp-features-aggr-window-cli] (5.4.20) UPDATE:
      It was decided not to document the aggregation-window ("sliding window")
      TSDB feature, for now, not even as Tech Preview. -->
    {{< /comment >}}
- When using the aggregates flag, the CLI automatically adds `count` to the TSDB's aggregators.
    However, it's recommended to set this aggregator explicitly if you need it.
- Some aggregates are calculated from other aggregates.
    For example, the `avg` aggregate is calculated from the `count` and `sum` aggregates.
{{< /note >}}

<a id="tsdb-create-example-tsdb_example_aggr"></a>
The following command creates a new "tsdb_example_aggr" TSDB with an ingestion rate of one sample per second in a <dirname>tsdb_tests</dirname> directory in the default configured "{{< getvar v="product.tsdb.doc_examples.container" >}}" container.
The TSDB is created with the `count`, `avg`, `min`, and `max` aggregators and an aggregation interval of 1 hour:
```sh
{{% tsdb-cli %}} create -t tsdb_example_aggr -r 1/s -a "count,avg,min,max" -i 1h
```
{{< comment >}}<!-- [ci-TSDB-51-bug-partition-aggr-gran] [IntInfo] (sharonl)
  (21.10.18) Initially the example used a 2h interval but then we found that
  the info command shows the configured aggregation granularity only for the
  table schema but not for the partition schemas - see Bug
  https://jira.iguazeng.com/browse/TSDB-50 - so Golan requested that we use
  a 1h interval in the doc example. -->
{{< /comment >}}

<!-- ======================================== -->
#### Supported Aggregation Functions {#supported-aggr-funcs}
{{< comment >}}<!-- [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR] [IntInfo] (sharonl)
  The section requires editing to mention the cross-series aggregation
  fucntions (v2.0.0 Tech Preview Requirement IG-10172 / DOC IG-10176).
  [c-tsdb-unsupported-tp-features-cross-series-aggr-cli] (5.4.20) It was
  decided not to support cross-series aggregations at this stage, not even as
  Tech Preview. -->
{{< /comment >}}

Version {{< tsdb-cli t="version_short" >}} of the CLI supports the following aggregation functions, which are all applied to the samples of each metric item according to the TSDB's aggregation granularity (interval):

{{< text-tsdb-aggr-funcs >}}

<!-- //////////////////////////////////////// -->
## Adding Samples to a TSDB {#tsdb-samples-add}

Use the CLI's <cmd>add</cmd> command (or its <cmd>append</cmd> alias) to add (ingest) metric samples to a TSDB.
You must provide the name of the ingested metric and one or more sample values for the metric.
You also need to provide the samples' generation times; when ingesting a single sample, the default sample time is the current time.
In addition, you can optionally specify metric labels.
Each unique metric name and optional labels combination corresponds to a metric item (row) in the TSDB with attributes (columns) for each label.

The ingestion input can be provided in one of two ways:

- Using command-line arguments and flags &mdash;

    - <paramname-b id="tsdb-cli-add-arg-metric">metric</paramname-b> argument [Required] &mdash; a string containing the name of the ingested metric.
      For example, `"cpu"`.
    - <paramname-b id="tsdb-cli-add-arg-labels">labels</paramname-b> argument [Optional] &mdash; a string containing a comma-separated list of `<label name>=<label value>` key-value pairs.
        The label values must be of type string and cannot contain commas.
        For example, <nobr>`"os=mac,host=A"`</nobr>.
        {{< comment >}}<!-- [c-tsdb-label-types-string]
          [c-tsdb-label-values-w-commas] [IntInfo] (sharonl) See also
          #tsdb-labels in the sw-specifications.md spec. -->
        {{< /comment >}}
    - <opt-b id="tsdb-cli-add-flag-values">-d|--values</opt-b> flag [Required] &mdash; a string containing a comma-separated list of sample data values.
        The values can be of type integer or float and cannot contain periods or commas; note that all values for a given metric must be of the same type.
        For example, <nobr>`"67.0,90.2,70.5"`</nobr>.
        {{< comment >}}<!-- [c-tsdb-metric-sample-types]
          [c-tsdb-sample-values-w-periods] [c-tsdb-sample-values-w-commas]
          [IntInfo] (sharonl) See also sw-specifications.md spec restriction
          #tsdb-metric-samples.
          [c-tsdb-metric-sample-types-string] TODO: If and when we return the
          support for string metric-sample values, return this note at the end -
          "Note that the aggregation functions aren't applicable to string values.
"
          - and consider also returning the following string metric-values
          example that we previously used (in addition to the float example):
          <nobr>`"'ERROR: Initialization error', 'Restarting the service ..."`</nobr>
        -->
        {{< /comment >}}
    - <opt-b id="tsdb-cli-add-flag-times">-m|--times</opt-b> flag [Optional for a single metric; Required for multiple samples] &mdash; a string containing a comma-separated list of sample generation times ("sample times") for the provided sample values.
        A sample time can be specified as a Unix timestamp in milliseconds or as a relative time of the format `"now"` or <nobr>`"now-[0-9]+[mhd]"`</nobr> (where '`m`' = minutes, '`h`' = hours, and '`d`' = days).
        For example, <nobr>`"1537971020000,now-2d,now-95m,now"`</nobr>.
        <br/>
        The default sample time when ingesting a single sample is the current time (i.e., the TSDB ingestion time) &mdash; `{{< getvar v="product.tsdb.cli.default_cfgs.add_time" >}}`.

        {{< note id="tsdb-cli-add-sample-times-note" >}}
An ingested sample time cannot be earlier or equal to the latest previously ingested sample time for the same metric item.
This applies also to samples ingested in the same command, so specify the ingestion times in ascending chronological order.
For example, an <cmd>add</cmd> command with <nobr>`-d "1,2" -m "now,now-1m"`</nobr> will ingest only the first sample (`1`) and not the second sample (`2`) because the time of the second sample (`now-2`) is earlier than that of the first sample (`now`).
To ingest both samples, change the order in the command to <nobr>`-d "2,1" "now-1m,now"`</nobr>.
{{< comment >}}<!-- [IntInfo] [PENDING-DEV] (sharonl) (14.10.18)
  [ci-tsdb-cli-sample-times-ingestion-validation-issues] I reported to Igor
  today that the behavior when adding earlier samples for the same metric item
  doesn't seem to be consistent, and in most cases that I tested, when adding a
  single sample there's no warning and the ingestion succeeds. What's more, in
  some cases the sample is added twice, and sometimes there's also duplication
  of an existing sample for the same metric name (not necessarily even the same
  metric item) in the TSDB. When adding two samples with earlier times than the
  latest samples for the same metric item in the TSDB, there were warnings for
  both samples and they weren't added but the latest of two existing samples
  for the same metric item (an item without labels) were duplicated. I had also
  previously reported to Igor and Golan, in a "TSDB CLI ingestion" email,
  issues with ingestion of samples with the same or very close ingestion time
  in the same command or CSV file, which didn't produce warnings and also
  sometimes produced double items + I reported an item duplication that I
  thought was related to the specific time that was used but perhaps it's
  because it was an earlier time (?). I sent Igor all the info from my latest
  tests and asked him to investigate and open JIRA bugs as needed.
  (15.10.18) Golan said that it's possible the limitation is only per partition
  and that the samples with the earlier times were in a different partition,
  although Igor said he thinks this isn't the case because the max time isn't
  per partition. Also, they both agreed there shouldn't be duplicate entries.
  Golan said they'll investigate this. -->
{{< /comment >}}
        {{< /note >}}

    {{< note id="tsdb-scale-ingestion-note" >}}
When ingesting samples at scale, use a CSV file or a Nuclio function rather than providing the ingestion input in the command line.
    {{< /note >}}

- Using the <opt id="tsdb-cli-add-flag-file">-f|--file</opt> flag to provide the path to a CSV metric-samples input file that contains one or more items (rows) of the following format:

    ```csv
    <metric name>,[<labels>],<sample data value>[,<sample time>]
    ```
    The CSV columns (attributes) are the equivalent of the arguments and flags described for the command-line arguments method in the previous bullet and their values are subject to the same guidelines.
    Note that all rows in the CSV file must have the same number of columns.
    For ingestion of multiple metrics, specify the ingestion times.

<!-- ---------------------------------------- -->
### Examples {#tsdb-add-examples}

<a id="tsdb-add-examples"></a>
The following commands ingest three samples and a label for a <attr>temperature</attr> metric and multiple samples with different label combinations and no labels for a <attr>cpu</attr> metric into the tsdb_example TSDB.
The sample times are specified using the <opt id="tsdb-cli-add-flag-times">-m</opt> flag:
```sh
{{% tsdb-cli %}} add temperature -t tsdb_example "degrees=Celsius" -d "32,29.5,25.3" -m "now-2d,now-1d,now"
{{% tsdb-cli %}} add cpu -t tsdb_example -d "90,82.5" -m "now-2d,now-1d"
{{% tsdb-cli %}} add cpu "host=A,os=linux" -t tsdb_example -d "23.87,47.3" -m "now-18h,now-12h"
{{% tsdb-cli %}} add cpu "host=A" -t tsdb_example -d "50.2" -m "now-6h"
{{% tsdb-cli %}} add cpu "os=linux" -t tsdb_example -d "88.8,91" -m "now-1h,now-30m"
{{% tsdb-cli %}} add cpu "host=A,os=linux,arch=amd64" -t tsdb_example -d "70.2,55" -m "now-15m,now"
```
The same ingestion can also be done by providing the samples input in a CSV file, as demonstrated in the following command:
```sh
{{% tsdb-cli %}} add -t tsdb_example -f ~/metric_samples.csv
```
The command uses this example <file>metric_samples.csv</file> file, which you can also download [here]({{< getvar v="product.tsdb.cli.downloads.dnload_dir" >}}/{{< getvar v="product.tsdb.cli.downloads.add_input_example_basic" >}}).
Copy the file to your home directory (<dirname>~/</dirname>) or change the file path in the ingestion command:
```csv
temperature,degrees=Celsius,32,now-2d
temperature,degrees=Celsius,29.5,now-1d
temperature,degrees=Celsius,25.3,now
cpu,,90,now-2d
cpu,,82.5,now-1d
cpu,"host=A,os=linux",23.87,now-18h
cpu,"host=A,os=linux",47.3,now-12h
cpu,host=A,50.2,now-6h
cpu,os=linux,88.8,now-1h
cpu,os=linux,91,now-30m
cpu,"host=A,os=linux,arch=amd64",70.2,now-15m
cpu,"host=A,os=linux,arch=amd64",55,now
```

<a id="tsdb-add-example-tsdb_example_aggr.csv"></a>
The following command demonstrates ingestion of samples for an <attr>m1</attr> label with <attr>host</attr> and <attr>os</attr> labels using a CSV file that is found in the directory from which the CLI is run:
```sh
{{% tsdb-cli %}} add -t tsdb_example_aggr -f tsdb_example_aggr.csv
```
The command uses this example <file>tsdb_example_aggr.csv</file> file, which you can also download [here]({{< getvar v="product.tsdb.cli.downloads.dnload_dir" >}}/{{< getvar v="product.tsdb.cli.downloads.add_input_example_aggr" >}}):
```csv
m1,"os=darwin,host=A",1,1514802220000
m1,"os=darwin,host=A",2,1514812086000
m1,"os=darwin,host=A",3,1514877315000
m1,"os=linux,host=A",1,1514797500000
m1,"os=linux,host=A",2,1514799605000
m1,"os=linux,host=A",3,1514804625000
m1,"os=linux,host=A",4,1514818759000
m1,"os=linux,host=A",5,1514897354000
m1,"os=linux,host=A",6,1514897858000
m1,"os=windows,host=A",1,1514803048000
m1,"os=windows,host=A",2,1514808826000
m1,"os=windows,host=A",3,1514812736000
m1,"os=windows,host=A",4,1514881791000
m1,"os=darwin,host=B",1,1514802842000
m1,"os=darwin,host=B",2,1514818576000
m1,"os=darwin,host=B",3,1514891100000
m1,"os=linux,host=B",1,1514798275000
m1,"os=linux,host=B",2,1514816100000
m1,"os=linux,host=B",3,1514895734000
m1,"os=linux,host=B",4,1514900599000
m1,"os=windows,host=B",1,1514799605000
m1,"os=windows,host=B",2,1514810326000
m1,"os=windows,host=B",3,1514881791000
m1,"os=windows,host=B",4,1514900597000
```

<!-- //////////////////////////////////////// -->
## Getting TSDB Configuration and Metrics Information {#tsdb-info}

Use the CLI's <cmd>info</cmd> command to retrieve basic information about a TSDB.
The command returns the TSDB's configuration (schema) &mdash; which includes the version, storage class, sample retention period, chunk interval, partitioning interval, pre-aggregates, and aggregation granularity for the entire table and for each partition (currently this is the same for all partitions); the partitions' start times (which are also their names); the number of sharding buckets; and the schema of the TSDB's item attributes.

You can optionally use the <opt>-n|--names</opt> flag to also display the names of the metrics contained in the TSDB, and you can use the <opt>-m|--performance</opt> flag to display a count of the number of metric items in the TSDB (i.e., the number of unique metric-name and labels combinations).

The following command returns the full schema and metrics information for the tsdb_example_aggr TSDB:
```sh
{{% tsdb-cli %}} info -t tsdb_example_aggr -m -n
```

<!-- //////////////////////////////////////// -->
## Querying a TSDB {#tsdb-query}

Use the CLI's <cmd>query</cmd> command (or its <cmd>get</cmd> alias) to query a TSDB and retrieve filtered information about the ingested metric samples.
The command requires that you either set the <paramname id="tsdb-cli-query-arg-metric">metric</paramname> string argument to the name of the queried metric (for example, `"noise"`), or set the <opt id="tsdb-cli-query-flag-filter">-f|--filter</opt> flag to a filter-expression string that defines the scope of the query (see {{< xref f="data-layer/reference/expressions/condition-expression.md" a="filter-expression" text="Filter Expression" >}}).
To reference a metric name in the query filter, use the `__name__` attribute (for example, `"(__name__=='cpu1') OR (__name__=='cpu2')"` or `"starts(__name__,'cpu')"`).
To reference labels in the query filter, just use the label name as the attribute name (for example, `"os=='linux' AND arch=='amd64'"`).

{{< note id="tsdb-query-notes" >}}
- <a id="tsdb-string-labels-note"></a>Currently, only labels of type string are supported; see the {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb-labels" >}}.
    Therefore, ensure that you embed label attribute values in your filter expression within quotation marks even when the values represent a number (for example, <nobr>"`node == '1'`"</nobr>), and don't apply arithmetic operators to such attributes (unless you want to perform a lexicographic string comparison).
    {{< comment >}}<!-- [c-tsdb-label-types-string] -->
    {{< /comment >}}
- <a id="tsdb-cli-query-range-scan-note"></a>Queries that set the <paramname>metric</paramname> argument use range scan and are therefore faster.
- <a id="query-unsupported-flags-note"></a>In the current release, the <cmd>query</cmd> command doesn't support cross-series aggregation (<opt>-a|--aggregates</opt> with <func>*_all</func> aggregation functions) or the <opt>-w|--aggregation-window</opt> and <opt>--groupBy</opt> flags.
    {{< comment >}}<!-- [c-tsdb-unsupported-tp-features-cross-series-aggr-cli]
      [c-tsdb-unsupported-tp-features-aggr-window-cli]
      [c-tsdb-unsupported-tp-features-group-by-cli]
      [IntInfo] (sharonl) (5.4.20) Added retroactively to the v2.5 & v2.31 docs
      [TECH-PREVIEW-TSDB-CROSS-SERIES-AGGR] (Requirement IG-10172/ DOC IG10176-)
      [TECH-PREVIEW-TSDB-AGGR-WINDOW] (Requirement IG-11142 / DOC IG-12531)
      [TECH-PREVIEW-TSDB-GROUP_BY] (Requirement IG-10171 / DOC IG-10175).
      [V2.8.0-TODO] Consider removing the note because the CLI help text in
      v2.8 clearly states that this option isn't supported.
      [c-tsdb-unsupported-tp-features-sql-query-cli]
      [c-tsdb-unsupported-tp-features-interpolation-cli] I didn't mention that
      SQL queries and interpolation (supported via SQL queries) aren't
      supported in this release, because these unsupported Tech Preview feature
      aren't mentioned in the CLI help text (unlike the features mentioned in
      the note)
      [TECH-PREVIEW-TSDB-SQL-QUERIES] (Requirement IG-10529 / DOC IG-10816)
      [TECH-PREVIEW-TSDB-INTERPOLATION] (Requirement IG-10522 / DOC IG-10822).
    -->
    {{< /comment >}}
{{< /note >}}

When using the <opt>-f|--filter</opt> flag to define a query filter, you don't necessarily need to include a metric name in the query.
You can select, for example, to filter the query only by labels.
You can also query all metric samples in the query's time range by omitting the <paramname>metric</paramname> argument and using a filter expression that always evaluates to true, such as `"1==1"`; to query the full TSDB content, also set the <opt>-b|--begin</opt> flag to `0`.

You can optionally use the <opt id="tsdb-cli-query-flag-beging">-b|--begin</opt> and <opt id="tsdb-cli-query-flag-end">-e|--end</opt> flags to specify start (minimum) and end (maximum) times that restrict the query to a specific time range.
The start and end times are each specified as a string that contains an [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) time string, a Unix timestamp in milliseconds, or a relative time of the format `"now"` or `"now-[0-9]+[mhd]"` (where '`m`' = minutes, '`h`' = hours, and '`d`' = days); the start time can also be set to zero (`0`) for the earliest sample time in the TSDB.
<br/>
Alternatively, you can use the <opt id="tsdb-cli-query-flag-last">-l|--last</opt> flag to define the time range as the last `<n>` minutes, hours, or days (`"[0-9]+[mdh]"`).
<br/>
The default end time is the current time (`{{< getvar v="product.tsdb.cli.default_cfgs.query_end_time" >}}`) and the default start time is one hour earlier than the end time.
Therefore, the default time range when neither flag is set is the last hour.
Note that the time range applies to the samples' generation times ("the sample times") and not to the times at which they were ingested into the TSDB.

By default, the command returns the query results in plain-text format (`"{{< getvar v="product.tsdb.cli.default_cfgs.query_output" >}}"`), but you can use the <opt id="tsdb-cli-query-flag-output">-o|--output</opt> flag to specify a different format &mdash; `"csv"` (CSV) or `"json"` (JSON).

<!-- ---------------------------------------- -->
### Examples {#tsdb-query-examples}

The following query returns all metric samples contained in the tsdb_example TSDB:
```sh
{{% tsdb-cli %}} query -t tsdb_example -f "1==1" -b 0
```

The following queries both return tsdb_example TSDB <attr>cpu</attr> metric samples that were generated within the last hour and have a <attr>host</attr> label whose value is `'A'` and an <attr>os</attr> label whose value is `"linux"`:
```sh
{{% tsdb-cli %}} query cpu -t tsdb_example -f "host=='A' AND os=='linux'" -b now-1h
{{% tsdb-cli %}} query cpu -t tsdb_example -f "host=='A' AND os=='linux'" -l 1h
```
The following query returns, in CSV format, all tsdb_example TSDB metric samples that have a <attr>degrees</attr> label and were generated in {{< copyright latest_year >}}:
```sh
{{% tsdb-cli %}} query -t tsdb_example -f "exists(degrees)" -b {{% copyright latest_year %}}-01-01T00:00:00Z -e {{% copyright latest_year %}}-12-31T23:59:59Z -o csv
```

<!-- ---------------------------------------- -->
### Aggregation Queries {#aggregation-queries}

You can use the optional <opt id="tsdb-cli-query-flag-aggregates">-a|--aggregates</opt> flag of the <opt>query</opt> command to provide a comma-separated list of aggregation functions ("aggregators") to apply to the raw samples data; for example, `"sum,stddev,stdvar"`.
See [Supported Aggregation Functions](#supported-aggr-funcs) for details.
You can use the <opt id="tsdb-cli-query-aggregation-interval">-i|--aggregation-interval</opt> flag to specify the time interval for applying the specified aggregators.
The interval is specified as a string of the format `"[0-9]+[mhd]"` (where '`m`' = minutes, '`h`' = hours, and '`d`' = days); for example, `"3h"` (3 hours).
The default aggregation interval is the difference between the query's end and start times; for example, for the default query start and end times of `{{< getvar v="product.tsdb.cli.default_cfgs.query_end_time" >}}-1h` and `{{< getvar v="product.tsdb.cli.default_cfgs.query_end_time" >}}`, the default aggregation interval will be one hour (`1h`).

You can submit aggregation queries also for a TSDB without pre-aggregates.
However, when the TSDB has pre-aggregates that match the query aggregators and the query's aggregation interval is a sufficient multiplier of [the TSDB's aggregation granularity](#defining-tsdb-aggregates), the query processing is sped-up by using the TSDB's pre-aggregates (the aggregation data that's stored in the TSDB's aggregation attributes) instead of performing a new calculation.
See also the [Aggregation Notes](#tsdb-cli-create-aggregates-notes) for the <cmd>create</cmd> command.
{{< comment >}}<!-- [c-tsdb-cond-for-applying-pre-aggregates] [IntInfo]
  (sharonl) (12.12.19) I rephrased the doc including to replace "can be divided
  by [the TSDB's aggregation granularity](#...) without a remainder" with a
  reference to a "sufficient multiplier" for the reasons detailed in the info
  for the Frames TSDB `create` method's `attrs` > `aggregates` argument in
  the data-layer/reference/frames/tsdb/create.md reference doc. -->
{{< /comment >}}

<a id="tsdb-aggr-query-example-tsdb_example"></a>
The following query returns for each tsdb_example TSDB metric item whose metric name begins with "cpu", the minimal and maximal sample values and the standard deviation over two-hour aggregation intervals for samples that were generated in the last two days:
```sh
{{% tsdb-cli %}} query -t tsdb_example -f "starts(__name__,'cpu')" -a "min,max,stddev" -i 2h -l 2d
```

<a id="tsdb-query-aggr-example-for-tsdb_example_aggr.csv"></a>
The following queries return for each <attr>m1</attr> metric item in the tsdb_example_aggr TSDB, the daily, hourly, or bi-hourly samples count and data-values average (depending on the aggregation interval) beginning with 1 Jan 2018 at 00:00 until the current time (default).
(Note that results are returned only for interval periods that contain samples.)
See the **Output (-i &lt;interval&gt;)** tabs for example command outputs that match the [<file>tsdb_example_aggr.csv</file> ingestion example](#tsdb-add-example-tsdb_example_aggr.csv) that was used earlier in this tutorial:

{{< code-tabs >}}
  {{< tab "Command" >}}
```sh
{{% tsdb-cli %}} query m1 -t tsdb_example_aggr -a "count,avg" -i 1d -b 2018-01-01T00:00:00Z
```
  {{< /tab >}}

  {{< tab "Output (-i 1d)" >}}
```sh
Name: m1  Labels: host=B,os=windows,Aggregate=count
  2018-01-01T00:00:00Z  v=2.00
  2018-01-02T00:00:00Z  v=2.00

Name: m1  Labels: host=B,os=windows,Aggregate=avg
  2018-01-01T00:00:00Z  v=1.50
  2018-01-02T00:00:00Z  v=3.50

Name: m1  Labels: host=A,os=linux,Aggregate=count
  2018-01-01T00:00:00Z  v=4.00
  2018-01-02T00:00:00Z  v=2.00

Name: m1  Labels: host=A,os=linux,Aggregate=avg
  2018-01-01T00:00:00Z  v=2.50
  2018-01-02T00:00:00Z  v=5.50

Name: m1  Labels: host=A,os=darwin,Aggregate=count
  2018-01-01T00:00:00Z  v=2.00
  2018-01-02T00:00:00Z  v=1.00

Name: m1  Labels: host=A,os=darwin,Aggregate=avg
  2018-01-01T00:00:00Z  v=1.50
  2018-01-02T00:00:00Z  v=3.00

Name: m1  Labels: host=A,os=windows,Aggregate=count
  2018-01-01T00:00:00Z  v=3.00
  2018-01-02T00:00:00Z  v=1.00

Name: m1  Labels: host=A,os=windows,Aggregate=avg
  2018-01-01T00:00:00Z  v=2.00
  2018-01-02T00:00:00Z  v=4.00

Name: m1  Labels: host=B,os=linux,Aggregate=count
  2018-01-01T00:00:00Z  v=2.00
  2018-01-02T00:00:00Z  v=2.00

Name: m1  Labels: host=B,os=linux,Aggregate=avg
  2018-01-01T00:00:00Z  v=1.50
  2018-01-02T00:00:00Z  v=3.50

Name: m1  Labels: host=B,os=darwin,Aggregate=count
  2018-01-01T00:00:00Z  v=2.00
  2018-01-02T00:00:00Z  v=1.00

Name: m1  Labels: host=B,os=darwin,Aggregate=avg
  2018-01-01T00:00:00Z  v=1.50
  2018-01-02T00:00:00Z  v=3.00
```
  {{< /tab >}}

  {{< tab "Output (-i 2h)" >}}
```sh
Name: m1  Labels: host=B,os=windows,Aggregate=count
  2018-01-01T08:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=1.00
  2018-01-02T08:00:00Z  v=1.00
  2018-01-02T12:00:00Z  v=1.00

Name: m1  Labels: host=B,os=windows,Aggregate=avg
  2018-01-01T08:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=2.00
  2018-01-02T08:00:00Z  v=3.00
  2018-01-02T12:00:00Z  v=4.00

Name: m1  Labels: host=A,os=linux,Aggregate=count
  2018-01-01T08:00:00Z  v=2.00
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=1.00
  2018-01-02T12:00:00Z  v=2.00

Name: m1  Labels: host=A,os=linux,Aggregate=avg
  2018-01-01T08:00:00Z  v=1.50
  2018-01-01T10:00:00Z  v=3.00
  2018-01-01T14:00:00Z  v=4.00
  2018-01-02T12:00:00Z  v=5.50

Name: m1  Labels: host=A,os=darwin,Aggregate=count
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=1.00
  2018-01-02T06:00:00Z  v=1.00

Name: m1  Labels: host=A,os=darwin,Aggregate=avg
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=2.00
  2018-01-02T06:00:00Z  v=3.00

Name: m1  Labels: host=A,os=windows,Aggregate=count
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=2.00
  2018-01-02T08:00:00Z  v=1.00

Name: m1  Labels: host=A,os=windows,Aggregate=avg
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=2.50
  2018-01-02T08:00:00Z  v=4.00

Name: m1  Labels: host=B,os=linux,Aggregate=count
  2018-01-01T08:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=1.00
  2018-01-02T12:00:00Z  v=2.00

Name: m1  Labels: host=B,os=linux,Aggregate=avg
  2018-01-01T08:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=2.00
  2018-01-02T12:00:00Z  v=3.50

Name: m1  Labels: host=B,os=darwin,Aggregate=count
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=1.00
  2018-01-02T10:00:00Z  v=1.00

Name: m1  Labels: host=B,os=darwin,Aggregate=avg
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=2.00
  2018-01-02T10:00:00Z  v=3.00
```
  {{< /tab >}}

  {{< tab "Output (-i 1h)" >}}
```sh
Name: m1  Labels: host=B,os=windows,Aggregate=count
  2018-01-01T09:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=1.00
  2018-01-02T08:00:00Z  v=1.00
  2018-01-02T13:00:00Z  v=1.00

Name: m1  Labels: host=B,os=windows,Aggregate=avg
  2018-01-01T09:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=2.00
  2018-01-02T08:00:00Z  v=3.00
  2018-01-02T13:00:00Z  v=4.00

Name: m1  Labels: host=A,os=linux,Aggregate=count
  2018-01-01T09:00:00Z  v=2.00
  2018-01-01T11:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=1.00
  2018-01-02T12:00:00Z  v=2.00

Name: m1  Labels: host=A,os=linux,Aggregate=avg
  2018-01-01T09:00:00Z  v=1.50
  2018-01-01T11:00:00Z  v=3.00
  2018-01-01T14:00:00Z  v=4.00
  2018-01-02T12:00:00Z  v=5.50

Name: m1  Labels: host=A,os=darwin,Aggregate=count
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T13:00:00Z  v=1.00
  2018-01-02T07:00:00Z  v=1.00

Name: m1  Labels: host=A,os=darwin,Aggregate=avg
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T13:00:00Z  v=2.00
  2018-01-02T07:00:00Z  v=3.00

Name: m1  Labels: host=A,os=windows,Aggregate=count
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=1.00
  2018-01-01T13:00:00Z  v=1.00
  2018-01-02T08:00:00Z  v=1.00

Name: m1  Labels: host=A,os=windows,Aggregate=avg
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T12:00:00Z  v=2.00
  2018-01-01T13:00:00Z  v=3.00
  2018-01-02T08:00:00Z  v=4.00

Name: m1  Labels: host=B,os=linux,Aggregate=count
  2018-01-01T09:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=1.00
  2018-01-02T12:00:00Z  v=1.00
  2018-01-02T13:00:00Z  v=1.00

Name: m1  Labels: host=B,os=linux,Aggregate=avg
  2018-01-01T09:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=2.00
  2018-01-02T12:00:00Z  v=3.00
  2018-01-02T13:00:00Z  v=4.00

Name: m1  Labels: host=B,os=darwin,Aggregate=count
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=1.00
  2018-01-02T11:00:00Z  v=1.00

Name: m1  Labels: host=B,os=darwin,Aggregate=avg
  2018-01-01T10:00:00Z  v=1.00
  2018-01-01T14:00:00Z  v=2.00
  2018-01-02T11:00:00Z  v=3.00
```
  {{< /tab >}}
{{< /code-tabs >}}

<a id="tsdb-aggr-query-example-tsdb_example"></a>
As explained above, you can also submit aggregation queries for TSDBs without pre-aggregates.
In such cases, the aggregations are calculated when the query is processed.
For example, the following query returns a three-day average for the tsdb_example TSDB's <attr>temperature</attr> metric samples:
```sh
{{% tsdb-cli %}} query temperature -t tsdb_example -a avg -i 3d -b 0
```

<!-- //////////////////////////////////////// -->
## Deleting a TSDB {#tsdb-delete}

Use the CLI's <cmd>delete</cmd> command (or its <cmd>del</cmd> alias) to delete a TSDB or delete content from a TSDB.

Use <opt>-a|--all</opt> flag to delete the entire TSDB &mdash; i.e., delete the TSDB table, including its schema (which contains the configuration information) and all its content.

{{< comment >}}<!-- [TSDB-DELETE-BY-FILTER] [V2.8.0-TODO] [IntInfo] (sharonl)
  Document also the new filter options that were added in v2.8.0 (see
  Requirement IG-14760 / DOC IG-14819) -
  - -f|- -filter flag - delete by filter expression (can be applied to labels).
  - -m|- -metrics flag - delete by metric names.
  NOTE: I think the different filter types (time/expression/metrics) are
  mutually exclusive. TODO: Verify and document when we document the other
  filters. Also check the CLI help text in the v3io/v3io-tsdb repo.
-->
{{< /comment >}}
You can optionally use the <opt>-b|--begin</opt> and <opt>-e|--end</opt> flag to define a sample-times range for the delete operation.
As with the <cmd>query</cmd> command, the start and end times are each specified as a string that contains an [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) time string, a Unix timestamp in milliseconds, or a relative time of the format `"now"` or `"now-[0-9]+[mhd]"` (where '`m`' = minutes, '`h`' = hours, and '`d`' = days); the start time can also be set to zero (`0`) for the earliest sample time in the TSDB.
The default end (maximum) time is the current time (`{{< getvar v="product.tsdb.cli.default_cfgs.delete_end_time" >}}`) and the default start (minimum) time is one hour earlier than the end time.

To avoid inadvertent deletes, by default the command prompts you to confirm the delete operation.
You can use the <opt>--force</opt> flag to perform a forceful deletion without prompting for confirmation.

You can also use the <opt>-i|--ignore-errors</opt> flag to skip errors that might occur during the delete operation and attempt to proceed to the next step.
{{< note id="delete-unsupported-flags-note" >}}
{{< /note >}}

<!-- ---------------------------------------- -->
### Examples {#tsdb-delete-examples}

The following command completely deletes the tsdb_example_aggr TSDB (subject to user confirmation in the command line):
```sh
{{% tsdb-cli %}} delete -t tsdb_example_aggr -a
```
You can add the <opt>--force</opt> flag to enforce the delete operation and bypass the confirmation prompt:
```sh
{{% tsdb-cli %}} delete -t tsdb_example_aggr -a --force
```

The following command deletes all tsdb_example TSDB partitions (and contained metric items) between the earliest sample time in the TSDB and Unix time 1569887999000 (2019-09-30T23:59:59Z):
```sh
{{% tsdb-cli %}} delete -t tsdb_example -b 0 -e 1569887999000
```

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="data-layer/tsdb/" >}}
- {{< xref f="cluster-mgmt/deployment/sw-specifications.md" a="tsdb" text="TSDB sofware specifications and restrictions" >}}
- {{< xref f="data-layer/reference/frames/tsdb/" >}}

