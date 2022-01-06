---
title:      "Overview of the Spark-Streaming Integration API"
linktitle:  "Spark-Streaming Integration API Overview"
keywords: "spark-streaming integration api, spark, spark streaming, spark streaming api, streaming, streams, stream records, stream consumption, V3IOUtil, createDirectStream, spark input streams, DStream, InputDStream, record metadata, scala, ride-hailing example, taxi_streaming, consume_drivers_stream_data.py"
menu:
  main:
    name:       "Overview"
    parent:     "spark-streaming-integration-api"
    identifier: "spark-streaming-integration-api-overview"
    weight:     5
---

The {{< product lc >}}'s Spark-Streaming Integration API provides a way for consuming stream data using the Apache Spark Streaming API.
The integration API exposes a <api>V3IOUtil</api> object that contains a <func>createDirectStream</func> method for mapping {{< product lc >}} V3IO streams to a Spark input stream.
You can use the Spark input streams that you create with this method to consume record data and metadata from {{< product lc >}} streams via the Spark Streaming API.

This section documents the {{< product lc >}}'s Spark-Streaming Integration Scala API for [Spark v{{< verkey k="spark.version" >}}]({{< getvar v="spark.streaming_prog_guide.full" >}}), which is provided in the <pkg>org.apache.spark.streaming.v3io</pkg> package.

