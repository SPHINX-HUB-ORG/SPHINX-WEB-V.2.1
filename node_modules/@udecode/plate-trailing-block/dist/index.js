'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');
var slate = require('slate');

/**
 * Add a trailing block when the last node type is not `type` and when the editor has .
 */
const withTrailingBlock = (editor, {
  options: {
    type = plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT),
    level,
    ...query
  }
}) => {
  const {
    normalizeNode
  } = editor;

  editor.normalizeNode = ([currentNode, currentPath]) => {
    if (!currentPath.length) {
      const lastChild = plateCommon.getLastNodeByLevel(editor, level);
      const lastChildNode = lastChild === null || lastChild === void 0 ? void 0 : lastChild[0];

      if (!lastChildNode || lastChildNode.type !== type && plateCommon.queryNode(lastChild, query)) {
        const at = lastChild ? slate.Path.next(lastChild[1]) : [0];
        plateCommon.insertElements(editor, editor.blockFactory({}, at), {
          at
        });
        return;
      }
    }

    return normalizeNode([currentNode, currentPath]);
  };

  return editor;
};

const KEY_TRAILING_BLOCK = 'trailingBlock';
/**
 * @see {@link withTrailingBlock}
 */

const createTrailingBlockPlugin = plateCommon.createPluginFactory({
  key: KEY_TRAILING_BLOCK,
  withOverrides: withTrailingBlock,
  options: {
    level: 0
  },
  then: editor => ({
    type: plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT)
  })
});

exports.KEY_TRAILING_BLOCK = KEY_TRAILING_BLOCK;
exports.createTrailingBlockPlugin = createTrailingBlockPlugin;
exports.withTrailingBlock = withTrailingBlock;
//# sourceMappingURL=index.js.map
