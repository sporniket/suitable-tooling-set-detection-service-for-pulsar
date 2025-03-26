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
    constructor({pulsar, Emitter}) {
        this.#pulsar = pulsar;
        this.#Emitter = Emitter;
    }

    // === pulsar extension interface ===
    activate(state) {
        console.log(`activate using ${JSON.stringify(state, null, 4)}`);
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
        //return new this.#Emitter(() => console.log('stopUsingService(service)'));
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
}
