'use strict';

import {jest} from '@jest/globals';

import {SuitableToolingSetDetectionController} from '../src/suitable-tooling-set-detection-controller';
import {MockedGetSensorDefinitions, MockPluginProvidingToolingSetDetectionDefinitionService} from './mock-plugin-providing-tooling-set-detection-definition.js';

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
const pulsar = {
    project: {
        onDidChangeFiles: jest.fn()
    }
};

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

test('SuitableToolingSetDetectionController has methods expected by pulsar', () => {
    const controller = new SuitableToolingSetDetectionController(pulsarThings);

    // expected methods as an extension
    expect(controller.activate).toBeDefined();
    expect(controller.deactivate).toBeDefined();
    expect(controller.serialize).toBeDefined();

    // expected methods as a provider and consumer of services
    expect(controller.provideToolingSetDetectionEventService).toBeDefined();
    expect(controller.consumeToolingSetDetectionDefinitionService).toBeDefined();

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
describe('SuitableToolingSetDetectionController.activate(...)', () => {
    test('calls pulsar.project.onDidChangeFiles', () => {
        const controller = new SuitableToolingSetDetectionController(pulsarThings);
        controller.activate({});

        expect(pulsarThings.pulsar.project.onDidChangeFiles).toHaveBeenCalledTimes(1);
    });

});

describe('SuitableToolingSetDetectionController.consumeToolingSetDetectionDefinitionService(...)', () => {
    test('calls `getSensorDefinitions()` of the given service', ()=>{
        const controller = new SuitableToolingSetDetectionController(pulsarThings);
        const mockPlugin = new MockPluginProvidingToolingSetDetectionDefinitionService(pulsarThings);

        controller.consumeToolingSetDetectionDefinitionService(mockPlugin.provideToolingSetDetectionDefinitionService());

        expect(MockedGetSensorDefinitions).toHaveBeenCalledTimes(1);

        const addNode = jest.fn();
        const addDependencyGraph = jest.fn();
        controller.acceptView({
            addNode,
            addDependencyGraph
        });
        expect(addNode).toHaveBeenCalledWith({
            tooling: 'foo',
            type: 'DetectionStrategy.BY_FILENAME_IN_FOLDER',
            filename: 'CFOO.bar',
            preempt: ['bar', 'baz'],
            behavior: 'SubfoldersPolicy.PRESENT_ANY_UNDETECTED_SUBFOLDER_TO_PREEMPTED_TOOLING_SETS'
        });

    });
});
