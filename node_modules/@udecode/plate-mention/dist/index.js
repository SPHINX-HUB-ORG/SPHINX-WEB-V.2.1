'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');
var slate = require('slate');
var plateCombobox = require('@udecode/plate-combobox');

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Constants.
 */

// We make this a function so it can be tested in describe block mocks with Jest.
var IS_MAC = () => typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

var MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

// We make this a function so it can be tested in describe block mocks with Jest.
var ALIASES = () => ({
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC() ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta'
});

var CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222
};

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f;
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options;
    options = null;
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey];
  }

  var array = hotkey.map(function (string) {
    return parseHotkey(string, options);
  });
  var check = function check(e) {
    return array.some(function (object) {
      return compareHotkey(object, e);
    });
  };
  var ret = event == null ? check : check(event);
  return ret;
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  var byKey = options && options.byKey;
  var ret = {};

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add');
  var values = hotkey.split('+');
  var length = values.length;

  // Ensure that all the modifiers are set to false unless the hotkey has them.

  for (var k in MODIFIERS) {
    ret[MODIFIERS[k]] = false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var optional = value.endsWith('?') && value.length > 1;

      if (optional) {
        value = value.slice(0, -1);
      }

      var name = toKeyName(value);
      var modifier = MODIFIERS[name];

      if (length === 1 || !modifier) {
        if (byKey) {
          ret.key = name;
        } else {
          ret.which = toKeyCode(value);
        }
      }

      if (modifier) {
        ret[modifier] = optional ? null : true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (var key in object) {
    var expected = object[key];
    var actual = void 0;

    if (expected == null) {
      continue;
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase();
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which;
    } else {
      actual = event[key];
    }

    if (actual == null && expected === false) {
      continue;
    }

    if (actual !== expected) {
      return false;
    }
  }

  return true;
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name);
  var code = CODES[name] || name.toUpperCase().charCodeAt(0);
  return code;
}

function toKeyName(name) {
  name = name.toLowerCase();
  name = ALIASES()[name] || name;
  return name;
}

/**
 * Export.
 */

exports.default = isHotkey;
exports.isHotkey = isHotkey;
exports.isCodeHotkey = isCodeHotkey;
exports.isKeyHotkey = isKeyHotkey;
exports.parseHotkey = parseHotkey;
exports.compareHotkey = compareHotkey;
exports.toKeyCode = toKeyCode;
exports.toKeyName = toKeyName;
});

var isHotkey = unwrapExports(lib);
lib.isHotkey;
lib.isCodeHotkey;
lib.isKeyHotkey;
lib.parseHotkey;
lib.compareHotkey;
lib.toKeyCode;
lib.toKeyName;

const findMentionInput = (editor, options) => plateCommon.findNode(editor, { ...options,
  match: {
    type: plateCommon.getPluginType(editor, ELEMENT_MENTION_INPUT)
  }
});

const isNodeMentionInput = (editor, node) => {
  return node.type === plateCommon.getPluginType(editor, ELEMENT_MENTION_INPUT);
};

const isSelectionInMentionInput = editor => findMentionInput(editor) !== undefined;

const removeMentionInput = (editor, path) => plateCommon.withoutNormalizing(editor, () => {
  const node = plateCommon.getNode(editor, path);
  if (!node) return;
  const {
    trigger
  } = node;
  plateCommon.insertText(editor, trigger, {
    at: {
      path: [...path, 0],
      offset: 0
    }
  });
  plateCommon.unwrapNodes(editor, {
    at: path
  });
});

// TODO: move to core
const moveSelectionByOffset = (editor, {
  query = () => true
} = {}) => event => {
  const {
    selection
  } = editor;

  if (!selection || slate.Range.isExpanded(selection) || !query(editor)) {
    return false;
  }

  if (isHotkey('left', event)) {
    event.preventDefault();
    plateCommon.moveSelection(editor, {
      unit: 'offset',
      reverse: true
    });
    return true;
  }

  if (isHotkey('right', event)) {
    event.preventDefault();
    plateCommon.moveSelection(editor, {
      unit: 'offset'
    });
    return true;
  }
};

const mentionOnKeyDownHandler = options => editor => event => {
  if (isHotkey('escape', event)) {
    const currentMentionInput = findMentionInput(editor);

    if (currentMentionInput) {
      event.preventDefault();
      removeMentionInput(editor, currentMentionInput[1]);
      return true;
    }

    return false;
  }

  return moveSelectionByOffset(editor, options)(event);
};

const withMention = (editor, {
  options: {
    id,
    trigger,
    query,
    inputCreation
  }
}) => {
  const {
    type
  } = plateCommon.getPlugin(editor, ELEMENT_MENTION_INPUT);
  const {
    apply,
    insertBreak,
    insertText,
    deleteBackward,
    insertFragment,
    insertTextData,
    insertNode
  } = editor;

  const stripNewLineAndTrim = text => {
    return text.split(/\r\n|\r|\n/).map(line => line.trim()).join('');
  };

  editor.insertFragment = fragment => {
    const inMentionInput = findMentionInput(editor) !== undefined;

    if (!inMentionInput) {
      return insertFragment(fragment);
    }

    return insertText(fragment.map(node => stripNewLineAndTrim(plateCommon.getNodeString(node))).join(''));
  };

  editor.insertTextData = data => {
    const inMentionInput = findMentionInput(editor) !== undefined;

    if (!inMentionInput) {
      return insertTextData(data);
    }

    const text = data.getData('text/plain');

    if (!text) {
      return false;
    }

    editor.insertText(stripNewLineAndTrim(text));
    return true;
  };

  editor.deleteBackward = unit => {
    const currentMentionInput = findMentionInput(editor);

    if (currentMentionInput && plateCommon.getNodeString(currentMentionInput[0]) === '') {
      return removeMentionInput(editor, currentMentionInput[1]);
    }

    deleteBackward(unit);
  };

  editor.insertBreak = () => {
    if (isSelectionInMentionInput(editor)) {
      return;
    }

    insertBreak();
  };

  editor.insertText = text => {
    if (!editor.selection || text !== trigger || query && !query(editor) || isSelectionInMentionInput(editor)) {
      return insertText(text);
    } // Make sure a mention input is created at the beginning of line or after a whitespace


    const previousChar = plateCommon.getEditorString(editor, plateCommon.getRange(editor, editor.selection, plateCommon.getPointBefore(editor, editor.selection)));
    const beginningOfLine = previousChar === '';
    const precededByWhitespace = previousChar === ' ';

    if ((beginningOfLine || precededByWhitespace) && text === trigger) {
      const data = {
        type,
        children: [{
          text: ''
        }],
        trigger
      };

      if (inputCreation) {
        data[inputCreation.key] = inputCreation.value;
      }

      return insertNode(data);
    }

    return insertText(text);
  };

  editor.apply = operation => {
    apply(operation);

    if (operation.type === 'insert_text' || operation.type === 'remove_text') {
      const currentMentionInput = findMentionInput(editor);

      if (currentMentionInput) {
        plateCombobox.comboboxActions.text(plateCommon.getNodeString(currentMentionInput[0]));
      }
    } else if (operation.type === 'set_selection') {
      var _findMentionInput, _findMentionInput2;

      const previousMentionInputPath = slate.Range.isRange(operation.properties) ? (_findMentionInput = findMentionInput(editor, {
        at: operation.properties
      })) === null || _findMentionInput === void 0 ? void 0 : _findMentionInput[1] : undefined;
      const currentMentionInputPath = slate.Range.isRange(operation.newProperties) ? (_findMentionInput2 = findMentionInput(editor, {
        at: operation.newProperties
      })) === null || _findMentionInput2 === void 0 ? void 0 : _findMentionInput2[1] : undefined;

      if (previousMentionInputPath && !currentMentionInputPath) {
        removeMentionInput(editor, previousMentionInputPath);
      }

      if (currentMentionInputPath) {
        plateCombobox.comboboxActions.targetRange(editor.selection);
      }
    } else if (operation.type === 'insert_node' && isNodeMentionInput(editor, operation.node)) {
      var _$text, _;

      if (operation.node.trigger !== trigger) {
        return;
      }

      const text = (_$text = (_ = operation.node.children[0]) === null || _ === void 0 ? void 0 : _.text) !== null && _$text !== void 0 ? _$text : '';

      if (inputCreation === undefined || operation.node[inputCreation.key] === inputCreation.value) {
        // Needed for undo - after an undo a mention insert we only receive
        // an insert_node with the mention input, i.e. nothing indicating that it
        // was an undo.
        plateCommon.setSelection(editor, {
          anchor: {
            path: operation.path.concat([0]),
            offset: text.length
          },
          focus: {
            path: operation.path.concat([0]),
            offset: text.length
          }
        });
        plateCombobox.comboboxActions.open({
          activeId: id,
          text,
          targetRange: editor.selection
        });
      }
    } else if (operation.type === 'remove_node' && isNodeMentionInput(editor, operation.node)) {
      if (operation.node.trigger !== trigger) {
        return;
      }

      plateCombobox.comboboxActions.reset();
    }
  };

  return editor;
};

const ELEMENT_MENTION = 'mention';
const ELEMENT_MENTION_INPUT = 'mention_input';
/**
 * Enables support for autocompleting @mentions.
 */

const createMentionPlugin = plateCommon.createPluginFactory({
  key: ELEMENT_MENTION,
  isElement: true,
  isInline: true,
  isVoid: true,
  handlers: {
    onKeyDown: mentionOnKeyDownHandler({
      query: isSelectionInMentionInput
    })
  },
  withOverrides: withMention,
  options: {
    trigger: '@',
    createMentionNode: item => ({
      value: item.text
    })
  },
  plugins: [{
    key: ELEMENT_MENTION_INPUT,
    isElement: true,
    isInline: true
  }],
  then: (editor, {
    key
  }) => ({
    options: {
      id: key
    }
  })
});

const getMentionOnSelectItem = ({
  key = ELEMENT_MENTION
} = {}) => (editor, item) => {
  var _getBlockAbove;

  const targetRange = plateCombobox.comboboxSelectors.targetRange();
  if (!targetRange) return;
  const {
    type,
    options: {
      insertSpaceAfterMention,
      createMentionNode
    }
  } = plateCommon.getPlugin(editor, key);
  const pathAbove = (_getBlockAbove = plateCommon.getBlockAbove(editor)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];

  const isBlockEnd = () => editor.selection && pathAbove && plateCommon.isEndPoint(editor, editor.selection.anchor, pathAbove);

  plateCommon.withoutNormalizing(editor, () => {
    var _comboboxSelectors$te;

    // Selectors are sensitive to operations, it's better to create everything
    // before the editor state is changed. For example, asking for text after
    // removeNodes below will return null.
    const props = createMentionNode(item, {
      search: (_comboboxSelectors$te = plateCombobox.comboboxSelectors.text()) !== null && _comboboxSelectors$te !== void 0 ? _comboboxSelectors$te : ''
    });
    plateCommon.select(editor, targetRange);
    plateCommon.withoutMergingHistory(editor, () => plateCommon.removeNodes(editor, {
      match: node => isNodeMentionInput(editor, node)
    }));
    plateCommon.insertNodes(editor, {
      type,
      children: [{
        text: ''
      }],
      ...props
    }); // move the selection after the element

    plateCommon.moveSelection(editor, {
      unit: 'offset'
    });

    if (isBlockEnd() && insertSpaceAfterMention) {
      plateCommon.insertText(editor, ' ');
    }
  });
  return plateCombobox.comboboxActions.reset();
};

exports.ELEMENT_MENTION = ELEMENT_MENTION;
exports.ELEMENT_MENTION_INPUT = ELEMENT_MENTION_INPUT;
exports.createMentionPlugin = createMentionPlugin;
exports.findMentionInput = findMentionInput;
exports.getMentionOnSelectItem = getMentionOnSelectItem;
exports.isNodeMentionInput = isNodeMentionInput;
exports.isSelectionInMentionInput = isSelectionInMentionInput;
exports.mentionOnKeyDownHandler = mentionOnKeyDownHandler;
exports.moveSelectionByOffset = moveSelectionByOffset;
exports.removeMentionInput = removeMentionInput;
exports.withMention = withMention;
//# sourceMappingURL=index.js.map
