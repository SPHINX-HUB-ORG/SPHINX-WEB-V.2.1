'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

/**
 * Add offset to the indentation of the selected blocks.
 */
const setIndent = (editor, {
  offset = 1,
  getNodesOptions,
  setNodesProps,
  unsetNodesProps = []
}) => {
  const {
    nodeKey
  } = plateCommon.getPluginInjectProps(editor, KEY_INDENT);

  const _nodes = plateCommon.getNodeEntries(editor, {
    block: true,
    mode: 'lowest',
    ...getNodesOptions
  });

  const nodes = Array.from(_nodes);
  plateCommon.withoutNormalizing(editor, () => {
    nodes.forEach(([node, path]) => {
      var _ref, _setNodesProps;

      const blockIndent = (_ref = node[nodeKey]) !== null && _ref !== void 0 ? _ref : 0;
      const newIndent = blockIndent + offset;
      const props = (_setNodesProps = setNodesProps === null || setNodesProps === void 0 ? void 0 : setNodesProps({
        indent: newIndent
      })) !== null && _setNodesProps !== void 0 ? _setNodesProps : {};

      if (newIndent <= 0) {
        plateCommon.unsetNodes(editor, [nodeKey, ...unsetNodesProps], {
          at: path
        });
      } else {
        plateCommon.setElements(editor, {
          [nodeKey]: newIndent,
          ...props
        }, {
          at: path
        });
      }
    });
  });
};

/**
 * Increase the indentation of the selected blocks.
 */

const indent = (editor, options) => {
  setIndent(editor, {
    offset: 1,
    ...options
  });
};

/**
 * Decrease the indentation of the selected blocks.
 */

const outdent = (editor, options) => {
  setIndent(editor, {
    offset: -1,
    ...options
  });
};

const onKeyDownIndent = editor => e => {
  if (e.defaultPrevented) return;

  if (plateCommon.Hotkeys.isTab(editor, e)) {
    e.preventDefault();
    indent(editor);
  }

  if (plateCommon.Hotkeys.isUntab(editor, e)) {
    e.preventDefault();
    outdent(editor);
  }
};

/**
 * - `node.indent` can not exceed `indentMax`
 * - `node.indent` is unset if `node.type` is not in `types`
 */
const withIndent = (editor, {
  inject: {
    props: {
      validTypes
    } = {}
  },
  options: {
    indentMax
  }
}) => {
  const {
    normalizeNode
  } = editor;

  editor.normalizeNode = ([node, path]) => {
    const element = node;
    const {
      type
    } = element;

    if (type) {
      if (validTypes.includes(type)) {
        if (indentMax && element.indent && element.indent > indentMax) {
          plateCommon.setElements(editor, {
            indent: indentMax
          }, {
            at: path
          });
          return;
        }
      } else if (element.indent) {
        plateCommon.unsetNodes(editor, 'indent', {
          at: path
        });
        return;
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

const KEY_INDENT = 'indent';
const createIndentPlugin = plateCommon.createPluginFactory({
  key: KEY_INDENT,
  withOverrides: withIndent,
  handlers: {
    onKeyDown: onKeyDownIndent
  },
  options: {
    offset: 24,
    unit: 'px'
  },
  then: (editor, {
    options: {
      offset,
      unit
    } = {}
  }) => ({
    inject: {
      props: {
        nodeKey: KEY_INDENT,
        styleKey: 'marginLeft',
        validTypes: [plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT)],
        transformNodeValue: ({
          nodeValue
        }) => nodeValue * offset + unit
      }
    }
  })
});

const KEY_TEXT_INDENT = 'textIndent';
const createTextIndentPlugin = plateCommon.createPluginFactory({
  key: KEY_TEXT_INDENT,
  options: {
    offset: 24,
    unit: 'px'
  },
  then: (editor, {
    options: {
      offset,
      unit
    } = {}
  }) => ({
    inject: {
      props: {
        nodeKey: KEY_TEXT_INDENT,
        styleKey: 'textIndent',
        validTypes: [plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT)],

        transformNodeValue({
          nodeValue
        }) {
          return nodeValue * offset + unit;
        }

      }
    }
  })
});

exports.KEY_INDENT = KEY_INDENT;
exports.KEY_TEXT_INDENT = KEY_TEXT_INDENT;
exports.createIndentPlugin = createIndentPlugin;
exports.createTextIndentPlugin = createTextIndentPlugin;
exports.indent = indent;
exports.onKeyDownIndent = onKeyDownIndent;
exports.outdent = outdent;
exports.setIndent = setIndent;
exports.withIndent = withIndent;
//# sourceMappingURL=index.js.map
