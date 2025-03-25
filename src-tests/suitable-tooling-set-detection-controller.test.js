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

class Disposable {
    constructor(handler) {}
    dispose() {}
}

const pulsarThings = {
    pulsar,
    Disposable
};


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
});

test('SuitableToolingSetDetectionController.consumeToolingSetDetectionRequestService returns a disposable', () => {
    const controller = new SuitableToolingSetDetectionController(pulsarThings);

    expect(controller.consumeToolingSetDetectionRequestService({}).dispose).toBeDefined();
});
