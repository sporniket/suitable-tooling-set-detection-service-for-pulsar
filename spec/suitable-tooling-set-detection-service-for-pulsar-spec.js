'use babel';

import SuitableToolingSetDetectionServiceForPulsar from '../lib/suitable-tooling-set-detection-service-for-pulsar';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('SuitableToolingSetDetectionServiceForPulsar', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('suitable-tooling-set-detection-service-for-pulsar');
  });

  describe('when the suitable-tooling-set-detection-service-for-pulsar:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.suitable-tooling-set-detection-service-for-pulsar')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'suitable-tooling-set-detection-service-for-pulsar:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.suitable-tooling-set-detection-service-for-pulsar')).toExist();

        let suitableToolingSetDetectionServiceForPulsarElement = workspaceElement.querySelector('.suitable-tooling-set-detection-service-for-pulsar');
        expect(suitableToolingSetDetectionServiceForPulsarElement).toExist();

        let suitableToolingSetDetectionServiceForPulsarPanel = atom.workspace.panelForItem(suitableToolingSetDetectionServiceForPulsarElement);
        expect(suitableToolingSetDetectionServiceForPulsarPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'suitable-tooling-set-detection-service-for-pulsar:toggle');
        expect(suitableToolingSetDetectionServiceForPulsarPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.suitable-tooling-set-detection-service-for-pulsar')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'suitable-tooling-set-detection-service-for-pulsar:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let suitableToolingSetDetectionServiceForPulsarElement = workspaceElement.querySelector('.suitable-tooling-set-detection-service-for-pulsar');
        expect(suitableToolingSetDetectionServiceForPulsarElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'suitable-tooling-set-detection-service-for-pulsar:toggle');
        expect(suitableToolingSetDetectionServiceForPulsarElement).not.toBeVisible();
      });
    });
  });
});
