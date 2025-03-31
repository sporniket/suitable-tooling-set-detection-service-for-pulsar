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

const makeEnumValue = (name) => Object.freeze({toString: () => name});

export const SubfoldersPolicy = Object.freeze({
    HIDE_ALL_SUBFOLDERS_TO_PREEMPTED_TOOLING_SETS: makeEnumValue('SubfoldersPolicy.HIDE_ALL_SUBFOLDERS_TO_PREEMPTED_TOOLING_SETS'),
    PRESENT_ANY_UNDETECTED_SUBFOLDER_TO_PREEMPTED_TOOLING_SETS: makeEnumValue('SubfoldersPolicy.PRESENT_ANY_UNDETECTED_SUBFOLDER_TO_PREEMPTED_TOOLING_SETS')
});

export const DetectionStrategy = Object.freeze({
    BY_FILENAME_IN_FOLDER: makeEnumValue('DetectionStrategy.BY_FILENAME_IN_FOLDER')
});

export class ToolingSetDetectionSensor {
    constructor({
        detectionStrategy = DetectionStrategy.BY_FILENAME_IN_FOLDER,
        subfolderPolicy = SubfoldersPolicy.PRESENT_ANY_UNDETECTED_SUBFOLDER_TO_PREEMPTED_TOOLING_SETS,
        toolingSetName,
        preemptedToolingSetNames = [],
        filename
    }, {
        pulsarInstance,
        pulsarApiEmitter
    }) {

    }
}
