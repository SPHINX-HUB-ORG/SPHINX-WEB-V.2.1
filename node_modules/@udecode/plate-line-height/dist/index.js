'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const KEY_LINE_HEIGHT = 'lineHeight';
/**
 * Enables support for text alignment, useful to align your content
 * to left, right and center it.
 */

const createLineHeightPlugin = plateCommon.createPluginFactory({
  key: KEY_LINE_HEIGHT,
  inject: {
    props: {
      nodeKey: KEY_LINE_HEIGHT,
      defaultNodeValue: 1.5
    }
  },
  then: editor => ({
    inject: {
      props: {
        validTypes: [plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT)]
      }
    },
    then: (_, plugin) => plateCommon.mapInjectPropsToPlugin(editor, plugin, {
      deserializeHtml: {
        getNode: (el, node) => {
          if (el.style.lineHeight) {
            node[plugin.key] = el.style.lineHeight;
          }
        }
      }
    })
  })
});

const setLineHeight = (editor, {
  value,
  setNodesOptions
}) => {
  const {
    validTypes,
    defaultNodeValue,
    nodeKey
  } = plateCommon.getPluginInjectProps(editor, KEY_LINE_HEIGHT);

  const match = n => plateCommon.isBlock(editor, n) && !!validTypes && validTypes.includes(n.type);

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

exports.KEY_LINE_HEIGHT = KEY_LINE_HEIGHT;
exports.createLineHeightPlugin = createLineHeightPlugin;
exports.setLineHeight = setLineHeight;
//# sourceMappingURL=index.js.map
