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

test('SubfoldersPolicy has two enum values', () => {
    expect(String(SubfoldersPolicy.HIDE_ALL_SUBFOLDERS_TO_PREEMPTED_TOOLING_SETS)).toBe('Symbol(0)');
    expect(String(SubfoldersPolicy.PRESENT_ANY_UNDETECTED_SUBFOLDER_TO_PREEMPTED_TOOLING_SETS)).toBe('Symbol(1)');
});

test('DetectionStrategy has one enum value', () => {
    expect(String(DetectionStrategy.BY_FILENAME_IN_FOLDER)).toBe('Symbol(0)');
});
