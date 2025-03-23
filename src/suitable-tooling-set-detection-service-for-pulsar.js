import SuitableToolingSetDetectionServiceForPulsarView from './suitable-tooling-set-detection-service-for-pulsar-view';
import { CompositeDisposable } from 'atom';

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

export default {

    suitableToolingSetDetectionServiceForPulsarView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.suitableToolingSetDetectionServiceForPulsarView = new SuitableToolingSetDetectionServiceForPulsarView(state.suitableToolingSetDetectionServiceForPulsarViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.suitableToolingSetDetectionServiceForPulsarView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'suitable-tooling-set-detection-service-for-pulsar:list': () => this.list()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.suitableToolingSetDetectionServiceForPulsarView.destroy();
    },

    serialize() {
        return {
            suitableToolingSetDetectionServiceForPulsarViewState: this.suitableToolingSetDetectionServiceForPulsarView.serialize()
        };
    },

    list() {
        console.log('SuitableToolingSetDetectionServiceForPulsar->list was called!');
        return (
            this.modalPanel.isVisible() ?
                this.modalPanel.hide() :
                this.modalPanel.show()
        );
    }

};
