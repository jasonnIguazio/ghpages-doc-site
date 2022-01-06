---
title: "Adding Grafana Dashboards"
description:  "Learn how to add Grafana dashbaords for monitoring data in the Iguazio MLOps Platform"
keywords: "grafana, dashboards, visualiation, tsdb, time series, timeseries, nosql, nosql tables, tables, table, key value, KV, kv, graphs, Iguazio, Iguazio data source, data sources, graphs"
menu:
  main:
    parent:     "services"
    identifier: "grafana-dashboards"
    weight:     40
---
{{< comment >}}<!-- [SITE-RESTRUCT] Replaces
  tutorials/getting-started/grafana-dashboards.md.
- [TODO-SITE-RESTRUCT-EXTERNAL-REFS] After the publication of the restructured
  site, replace the v3io/tutorials references to this doc (from
  platform-overview.ipynb). (Until then, we'll have URL redirect rules as part
  of the restructured-site publication.)
-->
{{< /comment >}}
{{< comment >}}<!-- [c-ext-ref] [IntInfo] (sharonl) This doc is referenced from
  v3io/tutorials (from platform-overview.ipynb). -->
{{< /comment >}}
{{< comment >}}<!-- (sharonl) TODO: Update the Grafana screen shots used in
  this tutorial to reflect recent changes (already reflected in the text), such
  as the change in the capitalization of the custom data source or the renaming
  of the "table_name" query parameter to "table", and add screen shots for the
  Prometheus data-source instructions. See DOC IG-11577. -->
<!-- NOTE: We also link to this tutorial from the welcome.ipynb tutorial
  Jupyter notebook. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview {#overview}

The {{< product lc >}} includes a pre-deployed version of the open-source Grafana analytics and monitoring platform.
For detailed information about working with Grafana, see the {{< url v="grafana_docs" k="text" link="1" >}}.
Grafana allows the creation of custom web dashboards that visualize real-time data queries.
This tutorial outlines the steps for creating your own Grafana dashboard for querying data in the your cluster's data containers by using the custom `{{< verkey k="grafana.product_data_source.name" >}}` Grafana data source, or by using a Prometheus data source for running Prometheus queries on {{< product lc >}} TSDB tables.
You can repeat this procedure to create as many dashboards as you wish.

<!-- //////////////////////////////////////// -->
## Prerequisites {#prerequisites}

1.  To use Grafana to visualize data in the {{< product lc >}}, you first need to create a new Grafana service from the {{< productUI lc >}} <gui-title>Services</gui-title> page.
    For general information about creating new services, see {{< xref f="services/fundamentals.md" a="create-new-service" text="creating a new service" >}}.
    {{< note id="grafana-service-notes" >}}
- <a id="grafana-cloud-single-tenant-wide-service-note"></a>In cloud {{< product lc >}} environments, Grafana is currently available as a shared single-instance tenant-wide service.
    {{< comment >}}<!-- [c-grafana-cloud-single-tenant-wide-service] -->
    {{< /comment >}}
- <a id="grafana-username-param-for-product-data-source-def-note"></a>To add the `{{< verkey k="grafana.product_data_source.name" >}}` data source to your Grafana service, you must set the service's <gui-label>Platform data-access user</gui-label> parameter to a {{< product lc >}} user whose credentials will be used for accessing the data in the {{< product lc >}}.
    {{< /note >}}

2.  To use a Prometheus data source, you first need to create a TSDB table and a Prometheus service that's configured to query this table.

    <a id="grafana-prometheus-data-sources"></a>When you create a new Grafana service, it automatically includes data sources for all existing {{< product lc >}} Prometheus services that are accessible to the running user of the Grafana service.
    However, to add a Grafana data source for a new Prometheus service that's create after the creation of the Grafana service, you need to do one of the following:

    - Restart the Grafana service.
        This will update the service's data sources to include all relevant existing Prometheus services.
        However, note that any Grafana UI changes that were previously made for this service might be lost.
        {{< comment >}}<!-- [c-grafana-restart-ui-changes-lose] [IntInfo] See
          the info for the related #grafana-restart-ui-changes-lose
          specs/sw-specifications.md restriction. -->
        {{< /comment >}}

    - Manually add the data source for the Prometheus service:

        1.  Open the {{< productUI lc >}} <gui-title>Services</gui-title> page and copy the HTTPS URL of the target Prometheus service (the service-name link target in the <gui-label>Name</gui-label> column).
        2.  Select the service-name link of your Grafana service to open the Grafana UI.
        3.  From the Grafana side navigation menu, select the configuration gear-wheel icon <nobr>(<img id="img-grafana_icon_settings" src="/images/grafana_icon_settings.gif" width="2%" alt="Settings icon" inline="1"/>)</nobr> to display the <gui-title>Configuration | Data Source</gui-title> tab.
        4.  Select <gui-label>Add Data Source</gui-label>, and then select <gui-label>Prometheus</gui-label> from the data-sources list.
        5.  Optionally edit the default data-source name in the <gui-label>Name</gui-label> field (for example, to use the name of the selected Prometheus service).
        6.  In the <gui-label>URL </gui-label>field, paste the Prometheus service URL that you copied in the first step.
        7.  Optionally set additional configuration parameters, and then select <gui-label>Save & Test</gui-label>.

3.  To successfully submit queries and visualize data with Grafana, you need to have data in you cluster's data containers that matches your queries.
    The instructions in this tutorial demonstrate how to create a dashboard that queries the following tables; to query other tables, you'll need to adjust your dashboard configuration, and especially the [query parameters](#enter-query-params), to match the path and attributes of an existing table in your cluster.

    - A <path>{{< verkey k="zeppelin.predef_notes.getting_started.sample_nosql_table" >}}</path> NoSQL table in the "{{< verkey k="zeppelin.predef_notes.getting_started.container" >}}" container.
        You can create a compatible table by following the instructions in the {{< xref f="data-layer/objects/ingest-n-consume-files.md" a="convert-csv-to-nosql" text="Converting a CSV File to a NoSQL Table" >}} tutorial.
        {{< comment >}}<!-- TODO: [c-convert-csv-to-nosql-example] Edit the
          tutorial to use a different CSV file for the table and either refer
          to different CSV upload & conversion to NoSQL table instructions
          (such as in the v3io/tutorials
          basic-data-ingestion-and-preparation.ipynb NB) or add instructions
          here, and then we can remove or edit the CSV > NoSQL conversion
          instruction in the ingest-n-consume-files.md GS tutorial. -->
        {{< /comment >}}
    - A <path>{{< verkey k="doc_samples.tsdb_table.rel_path" >}}</path> TSDB table in the "{{< verkey k="doc_samples.tsdb_table.container" >}}" container.
        You can create such a table by using the TSDB CLI (<file>{{< tsdb-cli >}}</file>).
        For example, you can run the following command from a web-based shell or a Jupyter terminal to create the table used in the tutorial examples:
        ```sh
        tsdbctl create -c {{% verkey k="doc_samples.tsdb_table.container" %}} -t {{% verkey k="doc_samples.tsdb_table.rel_path" %}} -r 1/s
        ```

        After creating the TSDB table, ingest some sample metrics into the table so that you have data to visualize with Grafana.
        You can do this by running the {{< getvar v="product.tsdb.name.lc" >}} CLI.
        For detailed TSDB CLI usage instructions, see {{< xref f="data-layer/tsdb/tsdb-cli.md" >}}.

<!-- //////////////////////////////////////// -->
## Using the {{< verkey k="grafana.product_data_source.name" >}} Data Source {#product-data-source}

1.  <a id="select-service-n-log-in"></a>Select your Grafana service from the {{< productUI short_lc >}}'s <gui-title>Services</gui-title> page, and log into the service with your {{< product lc >}} credentials.

2.  <a id="select-create-dashboard"></a>From the side navigation menu, select the plus-sign icon <nobr>(<img id="img-grafana_icon_plus" src="/images/grafana_icon_plus.gif" width="1.5%" alt="Side-menu plus icon" inline="1"/>)</nobr> to display the <gui-title>Create</gui-title> menu, and select <gui-label>Dashboard</gui-label> from the menu.
    {{< igz-figure id="img-grafana_create_dashboard_menu_select" src="/images/grafana_create_dashboard_menu_select.png" alt="Create-dashboard menu selection" >}}

3.  <a id="select-visualization-type"></a>In the new-panel <gui-title>Add</gui-title> tab, select the desired visualization type.
    In this step, select <gui-label>Table</gui-label>.
    (A graph example is provided in [Step 11](#tsdb-graph-select-add-panel-n-data-visualization-type).)
    {{< igz-figure id="img-grafana_create_dashboard_add_tab_select_table" src="/images/grafana_create_dashboard_add_tab_select_table.png" alt="Table visualization-type selection" >}}

4.  <a id="edit-panel"></a>Select <gui-label>Panel Title</gui-label>, and select <gui-label>Edit</gui-label> from the menu.
    {{< igz-figure id="img-grafana_create_dashboard_panel_title_edit_select" src="/images/grafana_create_dashboard_panel_title_edit_select.png" alt="Panel-title edit selection" >}}

5. <a id="select-data-source"></a>In the <gui-title>Metrics</gui-title> tab, select the <gui-label>Data Source</gui-label> drop-down arrow, and select <gui-label>{{< verkey k="grafana.product_data_source.name" >}}</gui-label> from the list of data sources.
    {{< igz-figure id="img-grafana_dashboard_panel_edit_metrics_tab_data_source_select" src="/images/grafana_dashboard_panel_edit_metrics_tab_data_source_select.png" alt="Data-source selection" >}}

    <!-- NoSQL Table "table" Query -->
6.  <a id="select-query-type"></a>In the first metrics-query row (<gui-label>A</gui-label>), select the query-type drop-down arrow and select the query type.
    You can select between <opt>timeseries</opt> for querying a time-series database (TSDB), and <opt>table</opt> for querying a standard NoSQL table.
    In this step, select <gui-label>table</gui-label>.
    (A <opt>timeseries</opt> example is provided in [Step 12](#tsdb-graph-edit-panel-set-data-source-n-query-type).)
    {{< igz-figure id="img-grafana_dashboard_panel_edit_metrics_tab_query_type_select.table" src="/images/grafana_dashboard_panel_edit_metrics_tab_query_type_select.table.png" alt="Table query-type selection" >}}

7.  <a id="enter-query-params"></a>Select the drop-down arrow for the query-parameters box (next to the query type) and enter your query parameters.
    The parameters are entered using the syntax `<parameter name>=<parameter value>; [<parameter name>=<parameter value>; ...]`.
    {{< igz-figure id="img-grafana_dashboard_panel_edit_metrics_tab_query_params_example.table" src="/images/grafana_dashboard_panel_edit_metrics_tab_query_params_example.table.png" alt="Table query parameters example" >}}

    {{< note id="enter-table-query-params-note" >}}
To see the query parameters in the UI, select the query fly-out menu icon <nobr>(<img id="img-grafana_icon_flyout_menu" src="/images/grafana_icon_flyout_menu.gif" width="2%" alt="Query menu icon" inline="1"/>)</nobr> and then select the <gui-label>Toggle Edit Mode</gui-label> option from the menu.
To run the defined queries, select the refresh button <nobr>(<img id="img-grafana_icon_refresh" src="/images/grafana_icon_refresh.gif" width="2%" alt="Refresh icon" inline="1"/>)</nobr> from the top menu toolbar.
    {{< /note >}}

    <a id="product-data-source-query-params"></a>The `{{< verkey k="grafana.product_data_source.name" >}}` data source supports the following query parameters:

    - <a id="data-source-param-backend"></a><def>backend</def> [Required] &mdash; the backend type.

        - For <opt>table</opt> queries, you must set this parameter to "`kv`".
        - For <opt>timeseries</opt> queries, you must set this parameter to "`tsdb`".
    - <a id="data-source-param-container"></a><def>container</def> [Required] &mdash; the name of the data container that contains the queried table.
        For example, "{{< getvar v="product.default_container.name" >}}" or "{{< getvar v="product.users_container.name" >}}".

    - <a id="data-source-param-table"></a><def>table</def> [Required] &mdash; a Unix file-system path to a table within the configured container.
        For example, "`mytable`" (for a table in the container's root directory) or "`{{< verkey k="jupyter_notebook.tutorials.data_ingestion_and_preparation.basic_nb.sample_dir" >}}/`" for a nested table.

        - <a id="data-source-param-fields"></a><def>fields</def> &mdash; a comma-separated list of one or more query fields to include in the query.

            - For <opt>table</opt> queries, this parameter should be set to a comma-separated list of item-attribute names &mdash; for example, "`id,first_name,last_name`".
            - For <opt>timeseries</opt> queries, this parameter should be set to a comma-separated list of sample metric names &mdash; for example, "`temperature`" or "`cpu0,cpu1,cpu2`".

            {{< note id="fields-n-filter-data-source-param-requirements-note" >}}
You must set either the <paramname>fields</paramname> or [<paramname>filter</paramname>](#data-source-param-filter) parameter; you can also select to set both parameters.
            {{< /note >}}

        - <a id="data-source-param-filter"></a><def>filter</def> &mdash; a {{< xref f="data-layer/reference/expressions/condition-expression.md" a="filter-expression" text="filter expression" >}} that restricts the query to specific items.
            - For <opt>table</opt> queries, the filter is applied to the names of item attributes (table columns).
                For example, `filter=ID>10`.
            - For <opt>timeseries</opt> queries, the filter is applied to the names of labels and/or metrics.
                To reference a metric name in the filter, use the `__name__` attribute.
                For example, "`starts(__name__,'metric') AND device==1`".

            As indicated, you must set the <paramname>filter</paramname> and/or [<paramname>fields</paramname>](#data-source-param-fields) parameter.

      Enter the following query parameters to query selected attributes in the "{{< verkey k="zeppelin.predef_notes.getting_started.sample_nosql_table" >}}" table in the root directory of the "{{< verkey k="zeppelin.predef_notes.getting_started.container" >}}" container, or edit the parameters to match the data in another NoSQL table in your cluster:
      ```
      backend=kv; container={{% verkey k="zeppelin.predef_notes.getting_started.container" %}}; table={{% verkey k="zeppelin.predef_notes.getting_started.sample_dir" %}}/{{% verkey k="zeppelin.predef_notes.getting_started.sample_nosql_table" %}}; fields=age,job,marital,education,balance,housing,loan,contact,day,month,duration;
      ```

      You can also add additional queries, if you wish.

8.  <a id="edit-panel-title"></a>Select the <gui-title>General</gui-title> tab and edit the panel title.
    For example, set the title to "Bank".
    {{< igz-figure id="img-grafana_dashboard_panel_edit_general_tab_panel_title_edit_example.table..nosql" src="/images/grafana_dashboard_panel_edit_general_tab_panel_title_edit_example.table..nosql.png" alt="Edit bank-table panel title" >}}

9.  <a id="optional-panel-customizations-table"></a>You can optionally make additional configurations for your dashboard panel from the <gui-title>Options</gui-title>, <gui-title>Column Styles</gui-title>, and <gui-title>Time range</gui-title> tabs.
    {{< comment >}}<!-- [IntInfo] (sharonl) (17.1.19) [SIC] inconsistent
      multi-word tab-title capitalization ("Styles" <-> "range") -->
    {{< /comment >}}

10. <a id="select-save-dashboard"></a>From the top-menu toolbar, select the save icon <nobr>(<img id="img-grafana_icon_save" src="/images/grafana_icon_save.gif" width="2%" alt="Save icon" inline="1"/>)</nobr>.
    Enter a new name for your dashboard, optionally change the dashboard folder, and select <gui-label>Save</gui-label>.
    For example, set the name to "{{< company >}} Dashboard" and save the dashboard in the default "General" folder.
    {{< igz-figure id="img-grafana_create_dashboard_save_window_edit_dashboard_name" src="/images/grafana_create_dashboard_save_window_edit_dashboard_name.png" alt="Save dashboard" >}}

    {{< tip id="settings-cfg-tip" >}}
Instead of selecting the save icon from the toolbar, you can select the settings icon <nobr>(<img id="img-grafana_icon_settings" src="/images/grafana_icon_settings.gif" width="2%" alt="Settings icon" inline="1"/>)</nobr> to display the <gui-title>Settings</gui-title> page.
In addition to setting the dashboard name and folder, this page lets you make other configurations; for example, you can define variables to use in your query parameters.
    {{< /tip >}}

    You now have a "Bank" dashboard panel with a table that provides real-time visualization of the data in the "{{< verkey k="zeppelin.predef_notes.getting_started.sample_nosql_table" >}}" table in the "{{< verkey k="zeppelin.predef_notes.getting_started.container" >}}" container.
    {{< igz-figure id="img-grafana_dashboard_table_example.nosql_table" src="/images/grafana_dashboard_table_example.nosql_table.png" alt="Grafana dashboard NoSQL table example" >}}

    In the following steps, you'll add a TSDB graph to your dashboard.

    <!-- TSDB "timeseries" Graph Query -->
11. <a id="tsdb-graph-select-add-panel-n-data-visualization-type"></a>From the top-menu toolbar, select the add-panel icon <nobr>(<img id="img-grafana_icon_add_panel" src="/images/grafana_icon_add_panel.gif" width="3%" alt="Add-panel icon" inline="1"/>) to display the new-panel <gui-title>Add</gui-title> tab that you saw in [Step 3](#select-visualization-type)</nobr>.
    This time, select the <gui-label>Graph</gui-label> visualization type.
    {{< igz-figure id="img-grafana_create_dashboard_add_tab_select_graph" src="/images/grafana_create_dashboard_add_tab_select_graph.png" alt="Graph visualization-type selection" >}}

12. <a id="tsdb-graph-edit-panel-set-data-source-n-query-type"></a>Select the <gui-label>Panel Title | Edit</gui-label> menu option (as you did in [Step 4](#edit-panel)).
    In the <gui-title>Metrics</gui-title> tab, select <gui-label>{{< verkey k="grafana.product_data_source.name" >}}</gui-label> as the data source (as you did in [Step 5](#select-data-source)), but this time select the <opt>timeseries</opt> query type (unlike the <opt>table</opt> selection in [Step 6](#select-query-type)).
    {{< igz-figure id="img-grafana_dashboard_panel_edit_metrics_tab_query_type_select.default.timeseries" src="/images/grafana_dashboard_panel_edit_metrics_tab_query_type_select.default.timeseries.png" alt="Time-series query-type selection" >}}

13. <a id="tsdb-graph-enter-query-params"></a>Select the drop-down arrow for the query-parameters box (next to the query type) and enter your query parameters using the syntax `<parameter name>=<parameter value>; [<parameter name>=<parameter value>; ...]` &mdash; similar to what you did in [Step 7](#enter-query-params), except that you need to enter time-series query parameters for a TSDB table; see the [supported query parameters](#product-data-source-query-params) in Step 7.
    {{< igz-figure id="img-grafana_dashboard_panel_edit_metrics_tab_query_params_example.timeseries" src="/images/grafana_dashboard_panel_edit_metrics_tab_query_params_example.timeseries.png" alt="Time-series query parameters example" >}}

    {{< note id="enter-graph-query-params-note" >}}
As explained for the table query, you can toggle the query edit mode from the query menu <nobr>(<img id="img-grafana_icon_flyout_menu" src="/images/grafana_icon_flyout_menu.gif" width="2%" alt="Query menu icon" inline="1"/>)</nobr> to see the parameters in the UI, and use the refresh button <nobr>(<img id="img-grafana_icon_refresh" src="/images/grafana_icon_refresh.gif" width="2%" alt="Refresh icon" inline="1"/>)</nobr> in the top menu toolbar to run the query.
    {{< /note >}}

    Enter the following query parameters to query "metric0" samples in the "{{< verkey k="doc_samples.tsdb_table.name" >}}" table in the root directory of the "{{< verkey k="doc_samples.tsdb_table.container" >}}" container, or edit the parameters to match the data in another TSDB table in your cluster:
    ```
    backend=tsdb; container={{% verkey k="doc_samples.tsdb_table.container" %}}; table={{% verkey k="doc_samples.tsdb_table.rel_path" %}}; fields=metric0;
    ```

    You can also add additional queries, if you wish.

14. <a id="tsdb-graph-edit-panel-title"></a>Select the <gui-title>General</gui-title> tab and edit the panel title, as you did in [Step 8](#edit-panel-title), but this time enter another title &mdash; for example, "Sample TSDB".
    {{< igz-figure id="img-grafana_dashboard_panel_edit_general_tab_panel_title_edit_example.graph.tsdb" src="/images/grafana_dashboard_panel_edit_general_tab_panel_title_edit_example.graph.tsdb.png" alt="Edit TSDB panel title" >}}

15. <a id="optional-panel-customizations-graph"></a>You can optionally make additional configurations for your dashboard panel from the <gui-title>Axes</gui-title>, <gui-title>Legend Styles</gui-title>, <gui-title>Display</gui-title>, <gui-title>Alert</gui-title>, and <gui-title>Time range</gui-title> tabs.

16. <a id="tsdb-graph-save-dashboard"></a>From the top-menu toolbar, select the save icon <nobr>(<img id="img-grafana_icon_save" src="/images/grafana_icon_save.gif" width="2%" alt="Save icon" inline="1"/>)</nobr> to save your changes.

    You now have a "Sample TSDB" dashboard panel with a graph that provides real-time visualization of the data in the <path>{{< verkey k="doc_samples.tsdb_table.rel_path" >}}</path> TSDB table in the "{{< verkey k="doc_samples.tsdb_table.container" >}}" container.
    {{< igz-figure id="img-grafana_dashboard_graph_example.timeseries" src="/images/grafana_dashboard_graph_example.timeseries.png" alt="Grafana dashboard TSDB graph table" >}}

<!-- ---------------------------------------- -->
### Outcome {#product-data-source-outcome}

Go to the Grafana home page and select your "{{< company >}} Dashboard" dashboard from the list.
You'll see your two panels on the dashboard.
Note that you can change the time range for the visualization from the top-menu toolbar.
You can also customize the dashboard by resizing panels and dragging them to change their arrangement.
The following image demonstrates a dashboard that displays the panels that you defined in this tutorial:

{{< igz-figure id="img-grafana_product_dashboard_example.tsdb_graph_n_nosql_table " src="/images/grafana_product_dashboard_example.tsdb_graph_n_nosql_table .png" alt="Custom Grafana dashboard example" >}}

<!-- //////////////////////////////////////// -->
## Using a Prometheus Data Source {#prometheus-data-source}
{{< comment >}}<!-- TODO:
  - Add information on how to define a Prometheus query.
  - Add screen shots (see DOC IG-11577 and DOC IG-11459).
  - Define a product data variable for an example Prometheus service name, and
    use it in this tutorial.
-->
{{< /comment >}}

1.  <a id="prometheus-grafana-dashboard-select"></a>[Log into your Grafana service](#select-service-n-log-in) and select your Grafana dashboard.
    To edit an existing dashboard, open the dashboard and then, from the top-menu toolbar, select the add-panel icon <nobr>(<img id="img-grafana_icon_add_panel" src="/images/grafana_icon_add_panel.gif" width="3%" alt="Add-panel icon" inline="1"/>)</nobr> to display the new-panel <gui-title>Add</gui-title> tab.
    To create a new dashboard, follow Steps [2](#select-create-dashboard)&ndash;[4](#edit-panel) of the [`{{< verkey k="grafana.product_data_source.name" >}}` data-source instructions](#product-data-source); select the visualization type that suites your need (such as table or graph).

2.  <a id="prometheus-select-data-source"></a>In the <gui-title>Metrics</gui-title> tab, select the <gui-label>Data Source</gui-label> drop-down arrow, and select your desired Prometheus data source.

3.  <a id="prometheus-add-queries"></a>From the <gui-label>Metrics</gui-label> tab, add Prometheus TSDB queries.

4.  <a id="prometheus-edit-panel-title"></a>Select the <gui-title>General</gui-title> tab and edit the panel title, as you did in [Step 8](#edit-panel-title), but use another title &mdash; for example, the name of your Prometheus data source.

5.  <a id="prometheus-save-dashboard"></a>From the top-menu toolbar, select the save icon <nobr>(<img id="img-grafana_icon_save" src="/images/grafana_icon_save.gif" width="2%" alt="Save icon" inline="1"/>)</nobr> to save your changes.

<!-- ---------------------------------------- -->
### Outcome {#prometheus-data-source-outcome}

Go to the Grafana home page and select your dashboard from the list.
You should be able to see your new Prometheus panel on the dashboard.

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="services/app-services/logging-and-monitoring-services.md" >}}
    - {{< xref f="services/app-services/data-monitoring-and-visualization-services.md" a="grafana" text="Grafana" >}}
- {{< xref f="services/monitoring-services.md" a="monitoring-service" text="The Monitoring Application Service and Grafana Dashboards" >}}
- {{< xref f="services/app-services/tsdb.md" >}}
- {{< xref f="data-layer/tsdb/" >}}
- {{< xref f="data-layer/tsdb/tsdb-cli.md" >}}

