'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

/**
 * Set a list of element types to select on backspace
 */
const withSelectOnBackspace = (editor, {
  options: {
    query
  }
}) => {
  const {
    deleteBackward
  } = editor;

  editor.deleteBackward = unit => {
    const {
      selection
    } = editor;

    if (unit === 'character' && plateCommon.isCollapsed(selection)) {
      const pointBefore = plateCommon.getPointBefore(editor, selection, {
        unit
      });

      if (pointBefore) {
        const [prevCell] = plateCommon.getNodeEntries(editor, {
          match: node => plateCommon.queryNode([node, pointBefore.path], query),
          at: pointBefore
        });

        if (!!prevCell && pointBefore) {
          // don't delete image, set selection there
          plateCommon.select(editor, pointBefore);
        } else {
          deleteBackward(unit);
        }
      } else {
        deleteBackward(unit);
      }
    } else {
      deleteBackward(unit);
    }
  };

  return editor;
};

const KEY_SELECT_ON_BACKSPACE = 'selectOnBackspace';
/**
 * @see {@link withSelectOnBackspace}
 */

const createSelectOnBackspacePlugin = plateCommon.createPluginFactory({
  key: KEY_SELECT_ON_BACKSPACE,
  withOverrides: withSelectOnBackspace
});

exports.KEY_SELECT_ON_BACKSPACE = KEY_SELECT_ON_BACKSPACE;
exports.createSelectOnBackspacePlugin = createSelectOnBackspacePlugin;
exports.withSelectOnBackspace = withSelectOnBackspace;
//# sourceMappingURL=index.js.map
