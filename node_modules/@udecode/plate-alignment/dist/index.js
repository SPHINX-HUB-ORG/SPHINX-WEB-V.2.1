'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const KEY_ALIGN = 'align';
/**
 * Creates a plugin that adds alignment functionality to the editor.
 */

const createAlignPlugin = plateCommon.createPluginFactory({
  key: KEY_ALIGN,
  then: editor => ({
    inject: {
      props: {
        nodeKey: KEY_ALIGN,
        defaultNodeValue: 'left',
        styleKey: 'textAlign',
        validNodeValues: ['left', 'center', 'right', 'justify'],
        validTypes: [plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT)]
      }
    },
    then: (_, plugin) => plateCommon.mapInjectPropsToPlugin(editor, plugin, {
      deserializeHtml: {
        getNode: (el, node) => {
          if (el.style.textAlign) {
            node[plugin.key] = el.style.textAlign;
          }
        }
      }
    })
  })
});

const setAlign = (editor, {
  key = KEY_ALIGN,
  value,
  setNodesOptions
}) => {
  const {
    validTypes,
    defaultNodeValue,
    nodeKey
  } = plateCommon.getPluginInjectProps(editor, key);

  const match = n => {
    return plateCommon.isBlock(editor, n) && !!validTypes && validTypes.includes(n.type);
  };

  if (value === defaultNodeValue) {
    plateCommon.unsetNodes(editor, nodeKey, {
      match,
      ...setNodesOptions
    });
  } else {
    plateCommon.setElements(editor, {
      [nodeKey]: value
    }, {
      match: match,
      ...setNodesOptions
    });
  }
};

exports.KEY_ALIGN = KEY_ALIGN;
exports.createAlignPlugin = createAlignPlugin;
exports.setAlign = setAlign;
//# sourceMappingURL=index.js.map
