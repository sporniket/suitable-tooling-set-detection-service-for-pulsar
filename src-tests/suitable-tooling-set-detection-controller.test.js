'use strict';

import {jest} from '@jest/globals';

import {SuitableToolingSetDetectionController} from '../src/suitable-tooling-set-detection-controller';

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

//=== mocking pulsar stuff ===
const pulsar = {};

class Emitter {
    constructor() {}
    on(eventName, handler) {}
    once(eventName, handler) {}
    preempt(eventName, handler) {}
    emit(eventName, value) {}
    dispose() {}
}

class Disposable {
    constructor() {}
    dispose() {}
    isDisposable() {}
}

const pulsarThings = {
    pulsar,
    Emitter,
    Disposable
};

class DummyPlugin {
    #pulsar;
    #Emitter;
    #Disposable;
    #subscription;
    constructor({pulsarType, EmitterType, DisposableType}) {
        this.#pulsar = pulsarType;
        this.#Emitter = EmitterType;
        this.#Disposable = DisposableType;
        this.#subscription = null;
    }

    // === pulsar extension interface ===
    activate(state) {
        console.log(`activate using ${JSON.stringify(state, null, 4)}`);
    }

    deactivate() {
        console.log('deactivate');
        if (this.#subscription) {
            this.#subscription.dispose();
        }
    }

    serialize() {
        console.log('serialize');
        return {};
    }

    // === services clause implementation ===
    provideToolingSetDetectionRequestService(service) {
        console.log(`useService(service) with ${JSON.stringify(service, null, 4)}`);
        const self = this;
        return {
            defineAndActivateSensorInto: (sensorManager) => {
                sensorManager.registerToolingSetDetectionSensor({
                    tooling: 'cmake',
                    type: 'by-filename-in-top-directory',
                    filename: 'whatever',
                    preempt: ['gnu-make', 'make'],
                    behavior: 'exclude-subfolders-without-filename' || 'exclude-any-subfolders'
                });
                self.#subscription = new Disposable(()=>sensorManager.dropToolingSetDetectionSensor('cmake'));
            }
        };
    }

}


test('SuitableToolingSetDetectionController has methods expected by pulsar', () => {
    const controller = new SuitableToolingSetDetectionController(pulsarThings);

    // expected methods as an extension
    expect(controller.activate).toBeDefined();
    expect(controller.deactivate).toBeDefined();
    expect(controller.serialize).toBeDefined();

    // expected methods as a provider and consumer of services
    expect(controller.provideToolingSetDetectionEventService).toBeDefined();
    expect(controller.consumeToolingSetDetectionRequestService).toBeDefined();

    // expected methods as defined commands
    expect(controller.list).toBeDefined();

    // service implementation of ToolingSetDetectionRequestService
    expect(controller.registerToolingSetDetectionSensor).toBeDefined();
    expect(controller.dropToolingSetDetectionSensor).toBeDefined();
});

// test('SuitableToolingSetDetectionController.consumeToolingSetDetectionRequestService returns a disposable', () => {
//     const controller = new SuitableToolingSetDetectionController(pulsarThings);
//
//     expect(controller.consumeToolingSetDetectionRequestService({}).dispose).toBeDefined();
// });
