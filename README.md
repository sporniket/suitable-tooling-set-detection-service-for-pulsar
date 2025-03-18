# A suitable tooling set detection service, for Pulsar

An extension for Pulsar, a Community-led Hyper-Hackable Text Editor, that is able to watch the projects for hints about a set of tooling that would be suitable to operate on them.

This extension MUST receive a sensor specification to know what to watch for, for a given tooling set.

Then, it is watching the project, and notify other extensions when the sensor has been triggered.

```mermaid
---
title: Collaboration flow
---
flowchart

    suitable-tooling-set-detection-service-for-pulsar
    --register to watch for changes on files-->
    workspace@{ shape: docs, label: "Workspace files" }
    --notify changes on files-->
    suitable-tooling-set-detection-service-for-pulsar

    tooling-set-expert-extension[
        The extension knowing how to assess that the project can be operated with a tooling set
    ] 
    --«event» tooling-set-detection-request--> 
    suitable-tooling-set-detection-service-for-pulsar((
        This extension
    )) 
    --«event» tooling-set-detection--> 
    tooling-set-integration-extensions@{shape : processes, label : "All the extensions that are interested and provide features using the matching tooling set"}
    
```
