---
title: "Securing Your Web-API Requests"
description:  "Learn how to to set up authentication to secure your Iguazio MLOps Platform web-API requests."
keywords: "web APIs, REST, RESTful, security, http, https, authentication, http authentication, authorization"
menu:
  main:
    parent:     "web-apis"
    identifier: "web-apis-security"
    weight:     20
---
{{< comment >}}<!-- [IntInfo] Beginning with v2.0.0 k8s, Orit asked that
  we also document the alternative authentication method of using a session key
  (I'm not sure about the terminology?) instead of the documented basic-HTTP
  username and password authentication. TODO: Get info from R&D and document.
  When this documentation is added, remember to also edit other HTTP
  authentication references in the doc, such as in the security.md concepts
  page or in the getting-started/containers.md tutorial. -->
{{< /comment >}}

<!-- //////////////////////////////////////// -->
## Overview

You must authenticate your web-API requests to confirm the identity of the sender.
You can do this by using any of the supported [HTTP user-authentication methods](#http-user-authentication).
To further secure your requests, it's recommended that you also use the [HTTPS protocol](#https).

<!-- //////////////////////////////////////// -->
## HTTPS Requests {#https}
{{< comment >}}<!-- [IntInfo] (sharonl) Note that the official HTTPS
  terminology is "HTTP Secure"; "Secure HTTP" refers to S-HTTP (covered by RFC
  2660) - see https://en.wikipedia.org/wiki/HTTPS. The HTTP Specification
  terminology is "HTTP over TLS" - see the RFC 2818 spec by that name -
  https://tools.ietf.org/html/rfc2818. -->
{{< /comment >}}

The web APIs support sending secure requests using the HTTP Secure (HTTPS) protocol (also known as HTTP over TLS), as defined in the [RFC 2818](https://tools.ietf.org/html/rfc2818) specification.
To send an HTTPS request, simply use an `https://` IP address in the request URL.

<!-- //////////////////////////////////////// -->
## HTTP User Authentication {#http-user-authentication}

Only {{< product lc >}} users with relevant permissions can use the {{< xref f="data-layer/reference/web-apis/" text="web APIs" >}}.
The web APIs support several alternative methods for authenticating the identity of the user who sent the request:

- [Access-key authentication](#http-auth-access-key)
    - [<api>X-v3io-session-key</api> authentication](#custom-access-key-header-auth)
    - [S3-like authentications](#s3-like-authentications)
- [Basic HTTP username/password authentication](#basic-http-username-password-auth)

{{< note id="sample-auth-credentials-note" >}}
The examples in the documentation use sample authentication credentials.
To run the examples, you must replace the sample credentials with valid credentials for your environment.
{{< /note >}}

<!-- ---------------------------------------- -->
### Access-Key Authentication {#http-auth-access-key}

The web APIs support several alternative syntax variations for performing access-key authentication:

- [<api>X-v3io-session-key</api> authentication](#custom-access-key-header-auth)
- [S3-like authentications](#s3-like-authentications)

<a id="access-key"></a>All of these methods use a {{< product lc >}} access key to authenticate the identity of the user.
{{< text-access-key-get long="1" >}}

<!-- ======================================== -->
#### X-v3io-session-key Authentication {#custom-access-key-header-auth}

The web APIs support a custom <api>X-v3io-session-key</api> HTTP request header for access-key requests authentication.
The value of the header is a [{{< product lc >}} access key](#access-key).

```
X-v3io-session-key: <access key>
```

For example, a request with the following header will be authenticated with the "{{< productUI access_key_example >}}" access key:

```
X-v3io-session-key: {{% productUI access_key_example %}}
```

<!-- ======================================== -->
#### S3-Like Authentications {#s3-like-authentications}

To simplify porting Amazon Simple Storage Service (S3) code to the {{< product lc >}}, the web APIs support the following AWS signature authentication variations; just replace your S3 access key in the <api>Authorization</api> header with a [{{< product lc >}} access key](#access-key).
For both variations, the {{< product lc >}} extracts the access key from the header value (`<access key>`) and uses it to authenticate the request; any other information in the header, such as an S3 signature, is ignored.

- <a id="aws-signature-v4"></a>**{{< url v="aws4_authentication" k="text_long" link="1" >}}** authentication syntax &mdash;
    ```
    Authorization: AWS4-<...>Credential=<access key>/[...]
    ```

    For example, a request with the following header will be authenticated with the "{{< productUI access_key_example >}}" access key:
    ```
    {{% getvar v="product.doc_examples.aws4_authorization_header_example" %}}
    ```

- <a id="aws-signature-v2"></a>**{{< url v="aws2_authentication" k="text_long" link="1" >}}** authentication syntax &mdash;
    ```
    AWS <access-key>:<signature>
    ```

    For example, a request with the following header will be authenticated with the "{{< productUI access_key_example >}}" access key:
    ```
    {{% getvar v="product.doc_examples.aws2_authorization_header_example" %}}
    ```

<!-- ---------------------------------------- -->
### Basic HTTP Username/Password Authentication {#basic-http-username-password-auth}

To use the username/password "Basic" HTTP authentication scheme, as defined in the [RFC 7617](https://tools.ietf.org/html/rfc7617) and [RFC 7235](https://tools.ietf.org/html/rfc7235) specifications, do the following:
add an <api>Authorization</api> request header with the `Basic` authentication-scheme token followed by a Base64 string that encodes the username and password login credentials:

```
Authorization: Basic <Base64-encoded credentials>
```

For example:
```
Authorization: Basic {{% getvar v="product.running_user.encoded_credentials_example" %}}
```

{{< note id="postman-basic-auth-note" title="Postman Note" >}}
When using {{< url v="postman_home" k="text" link="1" >}}, select the <gui-title>Authorization</gui-title> tab, select the "Basic Auth" authorization type, and enter your username and password in the respective fields.
Postman will encode the login credentials and create the required header.
{{< /note >}}

<!-- //////////////////////////////////////// -->
## See Also

- {{< xref f="users-and-security/security.md" >}}
- {{< xref f="data-layer/reference/web-apis/data-service-web-api-gen-struct.md" >}}

