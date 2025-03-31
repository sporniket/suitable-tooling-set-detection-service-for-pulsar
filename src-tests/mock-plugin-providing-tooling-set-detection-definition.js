'use strict';

import {jest} from '@jest/globals';
import {DetectionStrategy, SubfoldersPolicy} from '../src/tooling-set-detection-sensor.js';

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

export const MockedGetSensorDefinitions = jest.fn(() => {

    const result = [
        {
            tooling: 'foo',
            type: DetectionStrategy.BY_FILENAME_IN_FOLDER,
            filename: 'CFOO.bar',
            preempt: ['bar', 'baz'],
            behavior: SubfoldersPolicy.PRESENT_ANY_UNDETECTED_SUBFOLDER_TO_PREEMPTED_TOOLING_SETS
        }
    ];

    console.log(result[0].type.toString());
    console.log(result[0].behavior.toString());

    return result;
});

export class MockPluginProvidingToolingSetDetectionDefinitionService {
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
    provideToolingSetDetectionDefinitionService() {
        console.log('provideToolingSetDetectionDefinitionService()');
        const self = this;
        return {
            getSensorDefinitions: MockedGetSensorDefinitions
        };
    }

}
