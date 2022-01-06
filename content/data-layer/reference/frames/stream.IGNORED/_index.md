---
title:      "Streaming Backend"
linktitle:  "Frames Streaming-Backend API Reference"
techpreviewFeatures: "streaming backend"
keywords: "frames streaming backend, frames stream backend, frames streaming client methods, frames stream client methods, freames streaming methods, frames stream methods, frames streaming api, frames stream api, frames streaming, frames stream, frames streaming reference, frames stream reference, streaming, streams, stream"
layout: "section-list"
menu:
  main:
    name:       "Streaming Backend"
    parent:     "frames-apis"
    identifier: "frames-apis-stream"
    weight:     40
---
{{< comment >}}<!-- [c-ext-ref-frames] [InfInfo] (sharonl) This doc section is
  referenced from the v3io/frames README file. -->
{{< /comment >}}
{{< comment >}}<!-- [FRAMES-STREAMING-NO-SUPPORT] [IntInfo] (sharonl)
  (31.12.19) QA didn't test the Frames streaming backend. Adi confirmed that
  the Frames streaming API should be documented as Tech Preview until it's
  tested.  (5.2.20) At Orit's request, it was decided to entirely
  **** remove the streaming backend API from the Frames v2.5 doc **** and
  indicate in the Frames API reference overview that this backend isn't
  supported (because users will see this backend in the tutorial Jupyter
  notebooks that are pre-deployed with v2.5 and in the tutorials repo for the
  relevant version as well as in the Frames help text and in the GitHub README
  + there were a few weeks where there was public v2.5 streaming API doc). The
  main concern was that because the entire Frames API is TP in v2.5, there's no
  distinction in the docs between tested and untested features such as
  streaming and we don't want customers to use the untested streaming API (even
  though I had successfully tested all the doc examples and the examples in the
  Frames getting-started tutorial NB). =>
  I excluded the Frames streaming API doc but temporarily renaming the "stream"
  reference content directory to "stream.IGNORED" and adding a "frames_stream"
  filter (currently set to "false") and using for conditional refs to this doc.
  (17.5.20) It was decided to also not support the streaming backend in v2.8.0.
  For v2.8.0 we also removed the references to this backend from the tutorials.
  [V3.0.0-TODO-FRAMES] Re-asses the streaming-backend support for v3.0.0.
  Note that the filtered-out streaming backend doc is currently marked as
  Tech Preview (see the `techpreviewFeatures` front-matter field in this file).
  [INFRA-TODO] When we publish v3.0.0 doc, remove the stream.IGNORED Frames API
  reference doc directory and all the commented references to this brakcend
  from the v2.8 branch. -->
{{< /comment >}}

This section provides a reference of the {{< getvar v="product.frames.name.long_lc" >}} streaming backend (`"stream"`) and the <api>Client</api> methods that it supports.

