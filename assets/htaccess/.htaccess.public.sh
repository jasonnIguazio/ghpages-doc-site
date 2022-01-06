########################################
## URL Redirects - public versioned doc site
# [ci-redirect] [InfraInfo] Currently UNUSED. See info in gulpfile.js.

# [InfraInfo] (sharonl) The source URL starts with "/<latest-release / vX.Y>".
# To avoid editing the redirect rules for each new release, RedirectMatch with
# a starts-with rule should begin with `([^/]+)/` and the redirect URL should
# begin with `https://www.iguazio.com/docs/$1/`.

#///////////////////////////////////////
## Removed and Relocated Pages Redirects

# Architecture intro page (initially filtered out temporarily,)
RedirectMatch 301 ^/([^/]+)/intro/architecture(|/.*)$ https://www.iguazio.com/docs/$1

#---------------------------------------
## Pages Removed for v2.5.4 and v2.3.1 Post Publication

# Trial-QS tutorials GS page (consolidated with the tutorial QS index page)
RedirectMatch 301 ^/([^/]+/tutorials/getting-started/trial-qs/)overview(|/.*)$ https://www.iguazio.com/docs/$1$2

# Additional-resources" tutorials GS page (moved to an introduction section)
RedirectMatch 301 ^/([^/]+)/tutorials/getting-started/(additional-resources)(|/.*)$ https://www.iguazio.com/docs/$1/intro/introduction/#$2

