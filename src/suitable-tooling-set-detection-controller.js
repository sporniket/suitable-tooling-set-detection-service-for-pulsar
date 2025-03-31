'use strict';

/* SPDX-License-Identifier: GPL-3.0-or-later */
/****************************************

---
Copyright (C) 2025 David SPORN
---
This is part of **suitable-tooling-set-detection-service-for-pulsar-by-sporniket**.
An extension for Pulsar, a Community-led Hyper-Hackable Text Editor, that is able
to watch the projects for hints about a set of tooling that would be suitable to
operate on them.
****************************************/

export class SuitableToolingSetDetectionController {
    #pulsar;
    #Emitter;
    #sensors;
    constructor({pulsar, Emitter}) {
        this.#pulsar = pulsar;
        this.#Emitter = Emitter;
        this.#sensors = new Map();
    }

    // === pulsar extension interface ===
    activate(state) {
        console.log(`activate using ${JSON.stringify(state, null, 4)}`);
        this.#pulsar.project.onDidChangeFiles((event)=>{console.log(`onDidChangFiles with event ${JSON.stringify(event, null, 4)}`);});
    }

    deactivate() {
        console.log('deactivate');
    }

    serialize() {
        console.log('serialize');
        return {};
    }

    // === services clause implementation ===

    provideToolingSetDetectionEventService() {
        console.log('provideToolingSetDetectionEventService -> return dummy');
        const self = this;
        return {
            registerToolingSetDetectionSensor: ({
                tooling,
                type,
                filename,
                preempt,
                behavior
            }) => {
                self.registerToolingSetDetectionSensor({
                    tooling,
                    type,
                    filename,
                    preempt,
                    behavior
                });
            },
            dropToolingSetDetectionSensor: (tooling) => {
                self.dropToolingSetDetectionSensor(tooling);
            }
        };
    }

    consumeToolingSetDetectionDefinitionService(service) {
        console.log(`useService(service) with ${JSON.stringify(service, null, 4)}`);
        const defs = service.getSensorDefinitions();
        defs.forEach((def, i) => {
            console.log(JSON.stringify(def));
            console.log(def.type.toString());
            console.log(def.behavior.toString());
            this.#sensors.set(def.tooling, def);
            console.log(this.#sensors.size);
        });

        console.log(`service.getSensorDefinitions() returned ${JSON.stringify(defs, null, 4)}`);
    }

    // === commands ===
    list() {
        console.log('list');
    }

    // === services to be returned by provideToolingSetDetectionEventService() ===
    registerToolingSetDetectionSensor({
        tooling,
        type,
        filename,
        preempt,
        behavior
    }) {
        //do something about it
    }

    dropToolingSetDetectionSensor(tooling) {
        //do something about it
    }

    // === update given view ===
    acceptView({
        addNode,
        addDependencyGraph
    }) {
        console.log(this.#sensors);
        console.log(this.#sensors.size);
        console.log(this.#sensors.keys());
        console.log(this.#sensors.values());
        this.#sensors.forEach(({
            tooling,
            type,
            filename,
            preempt,
            behavior
        }, key, map)=>{
            console.log('this.#sensors.forEach -- item');
            console.log(key);
            addNode({
                tooling,
                type: type.toString(),
                filename,
                preempt,
                behavior: behavior.toString()
            });
        });

    }
}
