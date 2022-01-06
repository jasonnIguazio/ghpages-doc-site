---
title: "The Tensorboard Service"
description: "Get introduced to the Tensorboard service of the Iguazio MLOps Platform."
keywords: "tensorboard, hdfs, hcfs, file system, command line, jupyter, jupyter notebook, jupyter terminals, web shell, open source"
menu:
  main:
    name:       "Tensorbaord"
    parent:     "app-services"
    identifier: "tensorbaord-service"
    weight:     110
---

The {{< product lc >}} a service for {{< url g="urls" v="tensorboard_home" k="text" link="1" >}}  which is TensorFlow's visualization toolkit.
In machine learning, to improve something you often need to be able to measure it. TensorBoard is a tool for providing the measurements and 
visualizations needed during the machine learning workflow. It enables tracking experiment metrics like loss and accuracy, visualizing the 
model graph, projecting embeddings to a lower dimensional space, and much more.

The {{< product lc >}} writes the outputs of jobs in a TensorBoard log file which allows users to view and compare results and neural 
networks.

Users can create a new Tensorboard service and must configure the following custom parameters:
- Container&mdash;select a container from the dropdown menu
- Path&mdash;the path to the loacation of the Tensorboard log file

## See Also
{{< comment >}}<!-- [TODO-SITE-RESTRUCT] TODO: Add more see-also links. -->
{{< /comment >}}

- {{< xref f="services/fundamentals.md" >}}
