import { getLastNodeByLevel, queryNode, insertElements, getPluginType, ELEMENT_DEFAULT, createPluginFactory } from '@udecode/plate-common';
import { Path } from 'slate';

/**
 * Add a trailing block when the last node type is not `type` and when the editor has .
 */
const withTrailingBlock = (editor, {
  options: {
    type = getPluginType(editor, ELEMENT_DEFAULT),
    level,
    ...query
  }
}) => {
  const {
    normalizeNode
  } = editor;

  editor.normalizeNode = ([currentNode, currentPath]) => {
    if (!currentPath.length) {
      const lastChild = getLastNodeByLevel(editor, level);
      const lastChildNode = lastChild === null || lastChild === void 0 ? void 0 : lastChild[0];

      if (!lastChildNode || lastChildNode.type !== type && queryNode(lastChild, query)) {
        const at = lastChild ? Path.next(lastChild[1]) : [0];
        insertElements(editor, editor.blockFactory({}, at), {
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

const createTrailingBlockPlugin = createPluginFactory({
  key: KEY_TRAILING_BLOCK,
  withOverrides: withTrailingBlock,
  options: {
    level: 0
  },
  then: editor => ({
    type: getPluginType(editor, ELEMENT_DEFAULT)
  })
});

export { KEY_TRAILING_BLOCK, createTrailingBlockPlugin, withTrailingBlock };
//# sourceMappingURL=index.es.js.map
