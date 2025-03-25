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
    #Disposable;
    constructor({pulsar, Disposable}) {
        this.#pulsar = pulsar;
        this.#Disposable = Disposable;
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
        return {
            onToolingSetDetectionEvent: (eventHandler)=>{
                return {}; // return something like new Disposable(eventHandler)
            }
        };
    }

    consumeToolingSetDetectionRequestService(service) {
        console.log(`useService(service) with ${JSON.stringify(service, null, 4)}`);
        return new this.#Disposable(() => console.log('stopUsingService(service)'));
    }

    // === commands ===
    list() {
        console.log('list');
    }
}
