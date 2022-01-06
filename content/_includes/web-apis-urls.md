---
---
Get this URL by copying the API URL of the web-APIs service (`{{< verkey k="webapi.service_display_name" >}}`) from the <gui-title>Services</gui-title> {{< productUI lc >}} page.
You can select between two types of URLs:

- <gui-label>HTTPS Direct</gui-label> (recommended) &mdash; a URL of the format `https://<tenant IP>:<web-APIs port>`; for example, `{{< verkey k="webapi.url_example" >}}`.
  Requests of this format are assigned to web-APIs servers by the DNS server of the web-APIs service:
  the DNS cache contains a random list of web-APIs servers, and the server attempts to assign each request to the first server on the list; if the first server becomes unavailable, the request is assigned to the next server in the list, and so forth.
  This is the recommended method in most cases, as it's typically more efficient; a possible exception is a single web-APIs client.
- <gui-label>HTTPS</gui-label> &mdash; a URL of the format `https://webapi.<tenant IP>`; for example, `{{< verkey k="webapi.url_example_https" >}}`.
  Requests of this format are redirected to web-APIs servers by the Kubernetes ingress of the web-APIs service, which selects a server per request. 
{{< comment >}}<!-- See [c-web-apis-ui-api-url] and
  [c-https-service-links-only] in data/vars/product.toml. -->
{{< /comment >}}

