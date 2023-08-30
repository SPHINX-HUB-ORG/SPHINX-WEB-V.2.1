'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');
var slate = require('slate');
var plateResetNode = require('@udecode/plate-reset-node');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_1(value) ? value : [value];
}

var castArray_1 = castArray;

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

/**
 * Is the list nested, i.e. its parent is a list item.
 */

const isListNested = (editor, listPath) => {
  var _getParentNode;

  const listParentNode = (_getParentNode = plateCommon.getParentNode(editor, listPath)) === null || _getParentNode === void 0 ? void 0 : _getParentNode[0];
  return (listParentNode === null || listParentNode === void 0 ? void 0 : listParentNode.type) === plateCommon.getPluginType(editor, ELEMENT_LI);
};

const getUnorderedListType = editor => {
  return plateCommon.getPluginType(editor, ELEMENT_UL);
};
const getOrderedListType = editor => {
  return plateCommon.getPluginType(editor, ELEMENT_OL);
};
const getListTypes = editor => {
  return [getOrderedListType(editor), getUnorderedListType(editor)];
};
const getListItemType = editor => {
  return plateCommon.getPluginType(editor, ELEMENT_LI);
};
const getListItemContentType = editor => {
  return plateCommon.getPluginType(editor, ELEMENT_LIC);
};

/**
 * Find the highest end list that can be deleted.
 * Its path should be different to diffListPath.
 * If the highest end list 2+ items, return liPath.
 * Get the parent list until:
 * - the list has less than 2 items.
 * - its path is not equals to diffListPath.
 */

const getHighestEmptyList = (editor, {
  diffListPath,
  liPath
}) => {
  const list = plateCommon.getAboveNode(editor, {
    at: liPath,
    match: {
      type: getListTypes(editor)
    }
  });
  if (!list) return;
  const [listNode, listPath] = list;

  if (!diffListPath || !slate.Path.equals(listPath, diffListPath)) {
    if (listNode.children.length < 2) {
      const liParent = plateCommon.getAboveNode(editor, {
        at: listPath,
        match: {
          type: plateCommon.getPluginType(editor, ELEMENT_LI)
        }
      });

      if (liParent) {
        return getHighestEmptyList(editor, {
          liPath: liParent[1],
          diffListPath
        }) || listPath;
      }
    }

    return liPath;
  }
};

/**
 * Returns the nearest li and ul / ol wrapping node entries for a given path (default = selection)
 */

const getListItemEntry = (editor, {
  at = editor.selection
} = {}) => {
  const liType = plateCommon.getPluginType(editor, ELEMENT_LI);

  let _at;

  if (slate.Range.isRange(at) && !plateCommon.isCollapsed(at)) {
    _at = at.focus.path;
  } else if (slate.Range.isRange(at)) {
    _at = at.anchor.path;
  } else {
    _at = at;
  }

  if (_at) {
    const node = plateCommon.getNode(editor, _at);

    if (node) {
      const listItem = plateCommon.getAboveNode(editor, {
        at: _at,
        match: {
          type: liType
        }
      });

      if (listItem) {
        const list = plateCommon.getParentNode(editor, listItem[1]);
        return {
          list,
          listItem
        };
      }
    }
  }
};

/**
 * Searches upward for the root list element
 */

const getListRoot = (editor, at = editor.selection) => {
  if (!at) return;
  const parentList = plateCommon.getAboveNode(editor, {
    at,
    match: {
      type: [plateCommon.getPluginType(editor, ELEMENT_UL), plateCommon.getPluginType(editor, ELEMENT_OL)]
    }
  });

  if (parentList) {
    var _getListRoot;

    const [, parentListPath] = parentList;
    return (_getListRoot = getListRoot(editor, parentListPath)) !== null && _getListRoot !== void 0 ? _getListRoot : parentList;
  }
};

/**
 * Insert todo list item if selection in li>p.
 * TODO: test
 */
const insertTodoListItem = (editor, {
  inheritCheckStateOnLineStartBreak = false,
  inheritCheckStateOnLineEndBreak = false
}) => {
  const todoType = plateCommon.getPluginType(editor, ELEMENT_TODO_LI);

  if (!editor.selection) {
    return false;
  }

  const todoEntry = plateCommon.getAboveNode(editor, {
    match: {
      type: todoType
    }
  });
  if (!todoEntry) return false;
  const [todo, paragraphPath] = todoEntry;
  let success = false;
  plateCommon.withoutNormalizing(editor, () => {
    if (!slate.Range.isCollapsed(editor.selection)) {
      plateCommon.deleteText(editor);
    }

    const isStart = plateCommon.isStartPoint(editor, editor.selection.focus, paragraphPath);
    const isEnd = plateCommon.isBlockTextEmptyAfterSelection(editor);
    const nextParagraphPath = slate.Path.next(paragraphPath);
    /**
     * If start, insert a list item before
     */

    if (isStart) {
      plateCommon.insertElements(editor, {
        type: todoType,
        checked: inheritCheckStateOnLineStartBreak ? todo.checked : false,
        children: [{
          text: ''
        }]
      }, {
        at: paragraphPath
      });
      success = true;
      return;
    }
    /**
     * If not end, split the nodes
     */


    if (!isEnd) {
      plateCommon.withoutNormalizing(editor, () => {
        plateCommon.splitNodes(editor);
      });
    } else {
      /**
       * If end, insert a list item after and select it
       */
      const marks = plateCommon.getMarks(editor) || {};
      plateCommon.insertElements(editor, {
        type: todoType,
        checked: inheritCheckStateOnLineEndBreak ? todo.checked : false,
        children: [{
          text: '',
          ...marks
        }]
      }, {
        at: nextParagraphPath
      });
      plateCommon.select(editor, nextParagraphPath);
    }

    success = true;
  });
  return success;
};

const insertBreakTodoList = (editor, options) => {
  if (!editor.selection) return;
  const res = getTodoListItemEntry(editor); // If selection is in a todo li

  if (res) {
    const inserted = insertTodoListItem(editor, options);
    if (inserted) return true;
  }
};

const withTodoList = (editor, {
  options
}) => {
  const {
    insertBreak
  } = editor;

  editor.insertBreak = () => {
    if (insertBreakTodoList(editor, options)) return;
    insertBreak();
  };

  return editor;
};

const ELEMENT_TODO_LI = 'action_item';
const createTodoListPlugin = plateCommon.createPluginFactory({
  key: ELEMENT_TODO_LI,
  isElement: true,
  withOverrides: withTodoList,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleElement
  },
  options: {
    hotkey: ['mod+opt+4', 'mod+shift+4']
  }
});

/**
 * Returns the nearest li and ul / ol wrapping node entries for a given path (default = selection)
 */

const getTodoListItemEntry = (editor, {
  at = editor.selection
} = {}) => {
  const todoType = plateCommon.getPluginType(editor, ELEMENT_TODO_LI);

  let _at;

  if (slate.Range.isRange(at) && !plateCommon.isCollapsed(at)) {
    _at = at.focus.path;
  } else if (slate.Range.isRange(at)) {
    _at = at.anchor.path;
  } else {
    _at = at;
  }

  if (_at) {
    const node = plateCommon.getNode(editor, _at);

    if (node) {
      const listItem = plateCommon.getAboveNode(editor, {
        at: _at,
        match: {
          type: todoType
        }
      });

      if (listItem) {
        const list = plateCommon.getParentNode(editor, listItem[1]);
        return {
          list,
          listItem
        };
      }
    }
  }
};

/**
 * Is there a list child in the node.
 */

const hasListChild = (editor, node) => node.children.some(n => plateCommon.match(n, [], {
  type: getListTypes(editor)
}));

/**
 * Is selection across blocks with list items
 */

const isAcrossListItems = editor => {
  const {
    selection
  } = editor;

  if (!selection || plateCommon.isCollapsed(selection)) {
    return false;
  }

  const isAcrossBlocks = plateCommon.isRangeAcrossBlocks(editor);
  if (!isAcrossBlocks) return false;
  return plateCommon.someNode(editor, {
    match: {
      type: plateCommon.getPluginType(editor, ELEMENT_LI)
    }
  });
};

const isListRoot = (editor, node) => plateCommon.isElement(node) && getListTypes(editor).includes(node.type);

const moveListItemDown = (editor, {
  list,
  listItem
}) => {
  let moved = false;
  const [listNode] = list;
  const [, listItemPath] = listItem;
  let previousListItemPath;

  try {
    previousListItemPath = slate.Path.previous(listItemPath);
  } catch (e) {
    return;
  } // Previous sibling is the new parent


  const previousSiblingItem = plateCommon.getNodeEntry(editor, previousListItemPath);

  if (previousSiblingItem) {
    const [previousNode, previousPath] = previousSiblingItem;
    const sublist = previousNode.children.find(n => plateCommon.match(n, [], {
      type: getListTypes(editor)
    }));
    const newPath = previousPath.concat(sublist ? [1, sublist.children.length] : [1]);
    plateCommon.withoutNormalizing(editor, () => {
      if (!sublist) {
        // Create new sublist
        plateCommon.wrapNodes(editor, {
          type: listNode.type,
          children: []
        }, {
          at: listItemPath
        });
      } // Move the current item to the sublist


      plateCommon.moveNodes(editor, {
        at: listItemPath,
        to: newPath
      });
      moved = true;
    });
  }

  return moved;
};

/**
 * Move the list items of the sublist of `fromListItem` to `toList` (if `fromListItem` is defined).
 * Move the list items of `fromList` to `toList` (if `fromList` is defined).
 */
const moveListItemsToList = (editor, {
  fromList,
  fromListItem,
  fromStartIndex,
  to: _to,
  toList,
  toListIndex = null,
  deleteFromList = true
}) => {
  let fromListPath;
  let moved;
  plateCommon.withoutNormalizing(editor, () => {
    if (fromListItem) {
      const fromListItemSublist = plateCommon.findDescendant(editor, {
        at: fromListItem[1],
        match: {
          type: getListTypes(editor)
        }
      });
      if (!fromListItemSublist) return;
      fromListPath = fromListItemSublist === null || fromListItemSublist === void 0 ? void 0 : fromListItemSublist[1];
    } else if (fromList) {
      // eslint-disable-next-line prefer-destructuring
      fromListPath = fromList[1];
    } else {
      return;
    }

    let to = null;
    if (_to) to = _to;

    if (toList) {
      if (toListIndex !== null) to = toList[1].concat([toListIndex]);else {
        const lastChildPath = plateCommon.getLastChildPath(toList);
        to = slate.Path.next(lastChildPath);
      }
    }

    if (!to) return;
    moved = plateCommon.moveChildren(editor, {
      at: fromListPath,
      to,
      fromStartIndex
    }); // Remove the empty list

    if (deleteFromList) {
      plateCommon.deleteText(editor, {
        at: fromListPath
      });
    }
  });
  return moved;
};

const unwrapList = (editor, {
  at
} = {}) => {
  const ancestorListTypeCheck = () => {
    if (plateCommon.getAboveNode(editor, {
      match: {
        type: getListTypes(editor),
        at
      }
    })) {
      return true;
    } // The selection's common node might be a list type


    if (!at && editor.selection) {
      const commonNode = plateCommon.getCommonNode(editor, editor.selection.anchor.path, editor.selection.focus.path);

      if (plateCommon.isElement(commonNode[0]) && getListTypes(editor).includes(commonNode[0].type)) {
        return true;
      }
    }

    return false;
  };

  plateCommon.withoutNormalizing(editor, () => {
    do {
      const licEntry = plateCommon.getBlockAbove(editor, {
        at,
        match: {
          type: plateCommon.getPluginType(editor, ELEMENT_LIC)
        }
      });

      if (licEntry) {
        plateCommon.setElements(editor, {
          at,
          type: plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT)
        });
      }

      plateCommon.unwrapNodes(editor, {
        at,
        match: {
          type: plateCommon.getPluginType(editor, ELEMENT_LI)
        },
        split: true
      });
      plateCommon.unwrapNodes(editor, {
        at,
        match: {
          type: [plateCommon.getPluginType(editor, ELEMENT_UL), plateCommon.getPluginType(editor, ELEMENT_OL)]
        },
        split: true
      });
    } while (ancestorListTypeCheck());
  });
};

/**
 * Move a list item up.
 */
const moveListItemUp = (editor, {
  list,
  listItem
}) => {
  const move = () => {
    const [listNode, listPath] = list;
    const [liNode, liPath] = listItem;
    const liParent = plateCommon.getAboveNode(editor, {
      at: listPath,
      match: {
        type: plateCommon.getPluginType(editor, ELEMENT_LI)
      }
    });

    if (!liParent) {
      let toListPath;

      try {
        toListPath = slate.Path.next(listPath);
      } catch (err) {
        return;
      }

      const condA = hasListChild(editor, liNode);
      const condB = !plateCommon.isLastChild(list, liPath);

      if (condA || condB) {
        // Insert a new list next to `list`
        plateCommon.insertElements(editor, {
          type: listNode.type,
          children: []
        }, {
          at: toListPath
        });
      }

      if (condA) {
        const toListNode = plateCommon.getNode(editor, toListPath);
        if (!toListNode) return; // Move li sub-lis to the new list

        moveListItemsToList(editor, {
          fromListItem: listItem,
          toList: [toListNode, toListPath]
        });
      } // If there is siblings li, move them to the new list


      if (condB) {
        const toListNode = plateCommon.getNode(editor, toListPath);
        if (!toListNode) return; // Move next lis to the new list

        moveListItemsToList(editor, {
          fromList: list,
          fromStartIndex: liPath[liPath.length - 1] + 1,
          toList: [toListNode, toListPath],
          deleteFromList: false
        });
      } // Finally, unwrap the list


      unwrapList(editor, {
        at: liPath.concat(0)
      });
      return true;
    }

    const [, liParentPath] = liParent;
    const toListPath = liPath.concat([1]); // If li has next siblings, we need to move them.

    if (!plateCommon.isLastChild(list, liPath)) {
      // If li has no sublist, insert one.
      if (!hasListChild(editor, liNode)) {
        plateCommon.insertElements(editor, {
          type: listNode.type,
          children: []
        }, {
          at: toListPath
        });
      }

      const toListNode = plateCommon.getNode(editor, toListPath);
      if (!toListNode) return; // Move next siblings to li sublist.

      moveListItemsToList(editor, {
        fromListItem: liParent,
        toList: [toListNode, toListPath],
        fromStartIndex: liPath[liPath.length - 1] + 1,
        deleteFromList: false
      });
    }

    const movedUpLiPath = slate.Path.next(liParentPath); // Move li one level up: next to the li parent.

    plateCommon.moveNodes(editor, {
      at: liPath,
      to: movedUpLiPath
    });
    return true;
  };

  let moved = false;
  plateCommon.withoutNormalizing(editor, () => {
    moved = move();
  });
  return moved;
};

/**
 * If list is not nested and if li is not the first child, move li up.
 */

const removeFirstListItem = (editor, {
  list,
  listItem
}) => {
  const [, listPath] = list;

  if (!isListNested(editor, listPath)) {
    moveListItemUp(editor, {
      list,
      listItem
    });
    return true;
  }

  return false;
};

const moveListItems = (editor, {
  increase = true,
  at = (() => {
    var _editor$selection;

    return (_editor$selection = editor.selection) !== null && _editor$selection !== void 0 ? _editor$selection : undefined;
  })(),
  enableResetOnShiftTab
} = {}) => {
  const _nodes = plateCommon.getNodeEntries(editor, {
    at,
    match: {
      type: plateCommon.getPluginType(editor, ELEMENT_LIC)
    }
  }); // Get the selected lic


  const lics = Array.from(_nodes);
  if (!lics.length) return;
  const highestLicPaths = [];
  const highestLicPathRefs = []; // Filter out the nested lic, we just need to move the highest ones

  lics.forEach(lic => {
    const licPath = lic[1];
    const liPath = slate.Path.parent(licPath);
    const isAncestor = highestLicPaths.some(path => {
      const highestLiPath = slate.Path.parent(path);
      return slate.Path.isAncestor(highestLiPath, liPath);
    });

    if (!isAncestor) {
      highestLicPaths.push(licPath);
      highestLicPathRefs.push(plateCommon.createPathRef(editor, licPath));
    }
  });
  const licPathRefsToMove = increase ? highestLicPathRefs : highestLicPathRefs.reverse();
  return plateCommon.withoutNormalizing(editor, () => {
    let moved = false;
    licPathRefsToMove.forEach(licPathRef => {
      const licPath = licPathRef.unref();
      if (!licPath) return;
      const listItem = plateCommon.getParentNode(editor, licPath);
      if (!listItem) return;
      const parentList = plateCommon.getParentNode(editor, listItem[1]);
      if (!parentList) return;

      let _moved;

      if (increase) {
        _moved = moveListItemDown(editor, {
          list: parentList,
          listItem: listItem
        });
      } else if (isListNested(editor, parentList[1])) {
        // un-indent a sub-list item
        _moved = moveListItemUp(editor, {
          list: parentList,
          listItem: listItem
        });
      } else if (enableResetOnShiftTab) {
        // unindenting a top level list item, effectively breaking apart the list.
        _moved = removeFirstListItem(editor, {
          list: parentList,
          listItem: listItem
        });
      }

      moved = _moved || moved;
    });
    return moved;
  });
};

const indentListItems = editor => {
  moveListItems(editor, {
    increase: true
  });
};

/**
 * Insert list item if selection in li>p.
 * TODO: test
 */

const insertListItem = editor => {
  const liType = plateCommon.getPluginType(editor, ELEMENT_LI);
  const licType = plateCommon.getPluginType(editor, ELEMENT_LIC);

  if (!editor.selection) {
    return false;
  }

  const licEntry = plateCommon.getAboveNode(editor, {
    match: {
      type: licType
    }
  });
  if (!licEntry) return false;
  const [, paragraphPath] = licEntry;
  const listItemEntry = plateCommon.getParentNode(editor, paragraphPath);
  if (!listItemEntry) return false;
  const [listItemNode, listItemPath] = listItemEntry;
  if (listItemNode.type !== liType) return false;
  let success = false;
  plateCommon.withoutNormalizing(editor, () => {
    if (!slate.Range.isCollapsed(editor.selection)) {
      plateCommon.deleteText(editor);
    }

    const isStart = plateCommon.isStartPoint(editor, editor.selection.focus, paragraphPath);
    const isEnd = plateCommon.isBlockTextEmptyAfterSelection(editor);
    const nextParagraphPath = slate.Path.next(paragraphPath);
    const nextListItemPath = slate.Path.next(listItemPath);
    /**
     * If start, insert a list item before
     */

    if (isStart) {
      plateCommon.insertElements(editor, {
        type: liType,
        children: [{
          type: licType,
          children: [{
            text: ''
          }]
        }]
      }, {
        at: listItemPath
      });
      success = true;
      return;
    }
    /**
     * If not end, split nodes, wrap a list item on the new paragraph and move it to the next list item
     */


    if (!isEnd) {
      plateCommon.withoutNormalizing(editor, () => {
        plateCommon.splitNodes(editor);
        plateCommon.wrapNodes(editor, {
          type: liType,
          children: []
        }, {
          at: nextParagraphPath
        });
        plateCommon.moveNodes(editor, {
          at: nextParagraphPath,
          to: nextListItemPath
        });
        plateCommon.select(editor, nextListItemPath);
        plateCommon.collapseSelection(editor, {
          edge: 'start'
        });
      });
    } else {
      /**
       * If end, insert a list item after and select it
       */
      const marks = plateCommon.getMarks(editor) || {};
      plateCommon.insertElements(editor, {
        type: liType,
        children: [{
          type: licType,
          children: [{
            text: '',
            ...marks
          }]
        }]
      }, {
        at: nextListItemPath
      });
      plateCommon.select(editor, nextListItemPath);
    }
    /**
     * If there is a list in the list item, move it to the next list item
     */


    if (listItemNode.children.length > 1) {
      plateCommon.moveNodes(editor, {
        at: nextParagraphPath,
        to: nextListItemPath.concat(1)
      });
    }

    success = true;
  });
  return success;
};

/**
 * Move fromListItem sublist list items to the end of `toListItem` sublist.
 * If there is no `toListItem` sublist, insert one.
 */
const moveListItemSublistItemsToListItemSublist = (editor, {
  fromListItem,
  toListItem,
  start
}) => {
  const [, fromListItemPath] = fromListItem;
  const [, toListItemPath] = toListItem;
  let moved = 0;
  plateCommon.withoutNormalizing(editor, () => {
    const fromListItemSublist = plateCommon.findDescendant(editor, {
      at: fromListItemPath,
      match: {
        type: getListTypes(editor)
      }
    });
    if (!fromListItemSublist) return;
    const [, fromListItemSublistPath] = fromListItemSublist;
    const toListItemSublist = plateCommon.findDescendant(editor, {
      at: toListItemPath,
      match: {
        type: getListTypes(editor)
      }
    });
    let to;

    if (!toListItemSublist) {
      const fromList = plateCommon.getParentNode(editor, fromListItemPath);
      if (!fromList) return;
      const [fromListNode] = fromList;
      const fromListType = fromListNode.type;
      const toListItemSublistPath = toListItemPath.concat([1]);
      plateCommon.insertElements(editor, {
        type: fromListType,
        children: []
      }, {
        at: toListItemSublistPath
      });
      to = toListItemSublistPath.concat([0]);
    } else if (start) {
      const [, toListItemSublistPath] = toListItemSublist;
      to = toListItemSublistPath.concat([0]);
    } else {
      to = slate.Path.next(plateCommon.getLastChildPath(toListItemSublist));
    }

    moved = plateCommon.moveChildren(editor, {
      at: fromListItemSublistPath,
      to
    }); // Remove the empty list

    plateCommon.deleteText(editor, {
      at: fromListItemSublistPath
    });
  });
  return moved;
};

const moveListSiblingsAfterCursor = (editor, {
  at,
  to
}) => {
  const offset = at[at.length - 1];
  at = slate.Path.parent(at);
  const listNode = plateCommon.getNode(editor, at);
  const listEntry = [listNode, at];

  if (!plateCommon.match(listNode, [], {
    type: getListTypes(editor)
  }) || slate.Path.isParent(at, to) // avoid moving nodes within its own list
  ) {
    return 0;
  }

  return plateCommon.moveChildren(editor, {
    at: listEntry,
    to,
    fromStartIndex: offset + 1
  });
};

/**
 * Remove list item and move its sublist to list if any.
 */
const removeListItem = (editor, {
  list,
  listItem,
  reverse = true
}) => {
  const [liNode, liPath] = listItem; // Stop if the list item has no sublist

  if (plateCommon.isExpanded(editor.selection) || !hasListChild(editor, liNode)) {
    return false;
  }

  const previousLiPath = plateCommon.getPreviousPath(liPath);
  let success = false;
  plateCommon.withoutNormalizing(editor, () => {
    /**
     * If there is a previous li, we need to move sub-lis to the previous li.
     * As we need to delete first, we will:
     * 1. insert a temporary li: tempLi
     * 2. move sub-lis to tempLi
     * 3. delete
     * 4. move sub-lis from tempLi to the previous li.
     * 5. remove tempLi
     */
    if (previousLiPath) {
      const previousLi = plateCommon.getNodeEntry(editor, previousLiPath);
      if (!previousLi) return; // 1

      let tempLiPath = slate.Path.next(liPath);
      plateCommon.insertElements(editor, {
        type: plateCommon.getPluginType(editor, ELEMENT_LI),
        children: [{
          type: plateCommon.getPluginType(editor, ELEMENT_LIC),
          children: [{
            text: ''
          }]
        }]
      }, {
        at: tempLiPath
      });
      const tempLi = plateCommon.getNodeEntry(editor, tempLiPath);
      if (!tempLi) return;
      const tempLiPathRef = plateCommon.createPathRef(editor, tempLi[1]); // 2

      moveListItemSublistItemsToListItemSublist(editor, {
        fromListItem: listItem,
        toListItem: tempLi
      }); // 3

      plateCommon.deleteMerge(editor, {
        reverse
      });
      tempLiPath = tempLiPathRef.unref(); // 4

      moveListItemSublistItemsToListItemSublist(editor, {
        fromListItem: [tempLi[0], tempLiPath],
        toListItem: previousLi
      }); // 5

      plateCommon.removeNodes(editor, {
        at: tempLiPath
      });
      success = true;
      return;
    } // If it's the first li, move the sublist to the parent list


    moveListItemsToList(editor, {
      fromListItem: listItem,
      toList: list,
      toListIndex: 1
    });
  });
  return success;
};

const toggleList = (editor, {
  type,
  pluginKey = type
}) => plateCommon.withoutNormalizing(editor, () => {
  if (!editor.selection) {
    return;
  }

  const {
    validLiChildrenTypes
  } = plateCommon.getPluginOptions(editor, pluginKey);

  if (plateCommon.isCollapsed(editor.selection) || !plateCommon.isRangeAcrossBlocks(editor)) {
    // selection is collapsed
    const res = getListItemEntry(editor);

    if (res) {
      const {
        list
      } = res;

      if (list[0].type !== type) {
        plateCommon.setElements(editor, {
          type
        }, {
          at: editor.selection,
          match: n => plateCommon.isElement(n) && getListTypes(editor).includes(n.type),
          mode: 'lowest'
        });
      } else {
        unwrapList(editor);
      }
    } else {
      const list = {
        type,
        children: []
      };
      plateCommon.wrapNodes(editor, list);

      const _nodes = plateCommon.getNodeEntries(editor, {
        match: {
          type: plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT)
        }
      });

      const nodes = Array.from(_nodes);
      const blockAbove = plateCommon.getBlockAbove(editor, {
        match: {
          type: validLiChildrenTypes
        }
      });

      if (!blockAbove) {
        plateCommon.setElements(editor, {
          type: plateCommon.getPluginType(editor, ELEMENT_LIC)
        });
      }

      const listItem = {
        type: plateCommon.getPluginType(editor, ELEMENT_LI),
        children: []
      };

      for (const [, path] of nodes) {
        plateCommon.wrapNodes(editor, listItem, {
          at: path
        });
      }
    }
  } else {
    // selection is a range
    const [startPoint, endPoint] = slate.Range.edges(editor.selection);
    const commonEntry = plateCommon.getCommonNode(editor, startPoint.path, endPoint.path);

    if (getListTypes(editor).includes(commonEntry[0].type) || commonEntry[0].type === plateCommon.getPluginType(editor, ELEMENT_LI)) {
      if (commonEntry[0].type !== type) {
        const startList = plateCommon.findNode(editor, {
          at: slate.Range.start(editor.selection),
          match: {
            type: getListTypes(editor)
          },
          mode: 'lowest'
        });
        const endList = plateCommon.findNode(editor, {
          at: slate.Range.end(editor.selection),
          match: {
            type: getListTypes(editor)
          },
          mode: 'lowest'
        });
        const rangeLength = Math.min(startList[1].length, endList[1].length);
        plateCommon.setElements(editor, {
          type
        }, {
          at: editor.selection,
          match: (n, path) => plateCommon.isElement(n) && getListTypes(editor).includes(n.type) && path.length >= rangeLength,
          mode: 'all'
        });
      } else {
        unwrapList(editor);
      }
    } else {
      const rootPathLength = commonEntry[1].length;

      const _nodes = plateCommon.getNodeEntries(editor, {
        mode: 'all'
      });

      const nodes = Array.from(_nodes).filter(([, path]) => path.length === rootPathLength + 1);
      nodes.forEach(n => {
        if (getListTypes(editor).includes(n[0].type)) {
          plateCommon.setElements(editor, {
            type
          }, {
            at: n[1],
            match: _n => plateCommon.isElement(_n) && getListTypes(editor).includes(_n.type),
            mode: 'all'
          });
        } else {
          if (!(validLiChildrenTypes !== null && validLiChildrenTypes !== void 0 && validLiChildrenTypes.includes(n[0].type))) {
            plateCommon.setElements(editor, {
              type: plateCommon.getPluginType(editor, ELEMENT_LIC)
            }, {
              at: n[1]
            });
          }

          const listItem = {
            type: plateCommon.getPluginType(editor, ELEMENT_LI),
            children: []
          };
          plateCommon.wrapNodes(editor, listItem, {
            at: n[1]
          });
          const list = {
            type,
            children: []
          };
          plateCommon.wrapNodes(editor, list, {
            at: n[1]
          });
        }
      });
    }
  }
});

const unindentListItems = (editor, options = {}) => moveListItems(editor, { ...options,
  increase: false
});

const onKeyDownList = (editor, {
  type,
  options: {
    hotkey,
    enableResetOnShiftTab
  }
}) => e => {
  if (e.defaultPrevented) return;
  const isTab = plateCommon.Hotkeys.isTab(editor, e);
  const isUntab = plateCommon.Hotkeys.isUntab(editor, e);
  let workRange = editor.selection;

  if (editor.selection && (isTab || isUntab)) {
    const {
      selection
    } = editor; // Unhang the expanded selection

    if (!plateCommon.isCollapsed(editor.selection)) {
      const {
        anchor,
        focus
      } = slate.Range.isBackward(selection) ? {
        anchor: { ...selection.focus
        },
        focus: { ...selection.anchor
        }
      } : {
        anchor: { ...selection.anchor
        },
        focus: { ...selection.focus
        }
      }; // This is a workaround for a Slate bug
      // See: https://github.com/ianstormtaylor/slate/pull/5039

      const unHungRange = plateCommon.unhangRange(editor, {
        anchor,
        focus
      });

      if (unHungRange) {
        workRange = unHungRange;
        plateCommon.select(editor, unHungRange);
      }
    } // check if we're in a list context.


    const listSelected = plateCommon.someNode(editor, {
      match: {
        type: plateCommon.getPluginType(editor, ELEMENT_LI)
      }
    });

    if (workRange && listSelected) {
      e.preventDefault();
      moveListItems(editor, {
        at: workRange,
        increase: isTab,
        enableResetOnShiftTab
      });
      return true;
    }
  }

  if (!hotkey) return;

  const hotkeys = castArray_1(hotkey);

  for (const _hotkey of hotkeys) {
    if (isHotkey(_hotkey)(e)) {
      toggleList(editor, {
        type: type
      });
    }
  }
};

const deleteBackwardList = (editor, unit) => {
  const res = getListItemEntry(editor, {});
  let moved = false;

  if (res) {
    const {
      list,
      listItem
    } = res;

    if (plateCommon.isSelectionAtBlockStart(editor, {
      match: node => node.type === plateCommon.getPluginType(editor, ELEMENT_LI)
    })) {
      plateCommon.withoutNormalizing(editor, () => {
        moved = removeFirstListItem(editor, {
          list,
          listItem
        });
        if (moved) return true;
        moved = removeListItem(editor, {
          list,
          listItem
        });
        if (moved) return true;

        if (plateCommon.isFirstChild(listItem[1]) && !isListNested(editor, list[1])) {
          plateResetNode.onKeyDownResetNode(editor, plateCommon.mockPlugin({
            options: {
              rules: [{
                types: [plateCommon.getPluginType(editor, ELEMENT_LI)],
                defaultType: plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT),
                hotkey: 'backspace',
                predicate: () => plateCommon.isSelectionAtBlockStart(editor),
                onReset: e => unwrapList(e)
              }]
            }
          }))(plateResetNode.SIMULATE_BACKSPACE);
          moved = true;
          return;
        }

        plateCommon.deleteMerge(editor, {
          unit,
          reverse: true
        });
        moved = true;
      });
    }
  }

  return moved;
};

const selectionIsNotInAListHandler = editor => {
  const pointAfterSelection = plateCommon.getPointAfter(editor, editor.selection.focus.path);

  if (pointAfterSelection) {
    // there is a block after it
    const nextSiblingListRes = getListItemEntry(editor, {
      at: pointAfterSelection
    });

    if (nextSiblingListRes) {
      // the next block is a list
      const {
        listItem
      } = nextSiblingListRes;
      const parentBlockEntity = plateCommon.getBlockAbove(editor, {
        at: editor.selection.anchor
      });

      if (!plateCommon.getEditorString(editor, parentBlockEntity[1])) {
        // the selected block is empty
        plateCommon.removeNodes(editor);
        return true;
      }

      if (hasListChild(editor, listItem[0])) {
        // the next block has children, so we have to move the first item up
        const sublistRes = getListItemEntry(editor, {
          at: [...listItem[1], 1, 0, 0]
        });
        moveListItemUp(editor, sublistRes);
      }
    }
  }

  return false;
};

const selectionIsInAListHandler = (editor, res) => {
  const {
    listItem
  } = res; // if it has no children

  if (!hasListChild(editor, listItem[0])) {
    const liType = plateCommon.getPluginType(editor, ELEMENT_LI);

    const _nodes = plateCommon.getNodeEntries(editor, {
      at: listItem[1],
      mode: 'lowest',
      match: (node, path) => {
        var _getNode;

        if (path.length === 0) {
          return false;
        }

        const isNodeLi = node.type === liType;
        const isSiblingOfNodeLi = ((_getNode = plateCommon.getNode(editor, slate.Path.next(path))) === null || _getNode === void 0 ? void 0 : _getNode.type) === liType;
        return isNodeLi && isSiblingOfNodeLi;
      }
    });

    const liWithSiblings = Array.from(_nodes, entry => entry[1])[0];

    if (!liWithSiblings) {
      // there are no more list item in the list
      const pointAfterListItem = plateCommon.getPointAfter(editor, listItem[1]);

      if (pointAfterListItem) {
        // there is a block after it
        const nextSiblingListRes = getListItemEntry(editor, {
          at: pointAfterListItem
        });

        if (nextSiblingListRes) {
          // it is a list so we merge the lists
          const listRoot = getListRoot(editor, listItem[1]);
          moveListItemsToList(editor, {
            fromList: nextSiblingListRes.list,
            toList: listRoot,
            deleteFromList: true
          });
          return true;
        }
      }

      return false;
    }

    const siblingListItem = plateCommon.getNodeEntry(editor, slate.Path.next(liWithSiblings));
    if (!siblingListItem) return false;
    const siblingList = plateCommon.getParentNode(editor, siblingListItem[1]);

    if (siblingList && removeListItem(editor, {
      list: siblingList,
      listItem: siblingListItem,
      reverse: false
    })) {
      return true;
    } // if (skipDefaultDelete) return skipDefaultDelete;


    return false;
  } // if it has children


  const nestedList = plateCommon.getNodeEntry(editor, slate.Path.next([...listItem[1], 0]));
  if (!nestedList) return false;
  const nestedListItem = plateCommon.getChildren(nestedList)[0];

  if (removeFirstListItem(editor, {
    list: nestedList,
    listItem: nestedListItem
  })) {
    return true;
  }

  if (removeListItem(editor, {
    list: nestedList,
    listItem: nestedListItem
  })) {
    return true;
  }

  return false;
};

const deleteForwardList = editor => {
  let skipDefaultDelete = false;

  if (!(editor !== null && editor !== void 0 && editor.selection)) {
    return skipDefaultDelete;
  }

  if (!plateCommon.isSelectionAtBlockEnd(editor)) {
    return skipDefaultDelete;
  }

  plateCommon.withoutNormalizing(editor, () => {
    const res = getListItemEntry(editor, {});

    if (!res) {
      skipDefaultDelete = selectionIsNotInAListHandler(editor);
      return;
    }

    skipDefaultDelete = selectionIsInAListHandler(editor, res);
  });
  return skipDefaultDelete;
};

const deleteFragmentList = editor => {
  let deleted = false;
  plateCommon.withoutNormalizing(editor, () => {
    // Selection should be across list items
    if (!isAcrossListItems(editor)) return;
    /**
     * Check if the end li can be deleted (if it has no sublist).
     * Store the path ref to delete it after deleteMerge.
     */

    const end = plateCommon.getEndPoint(editor, editor.selection);
    const liEnd = plateCommon.getAboveNode(editor, {
      at: end,
      match: {
        type: plateCommon.getPluginType(editor, ELEMENT_LI)
      }
    });
    const liEndCanBeDeleted = liEnd && !hasListChild(editor, liEnd[0]);
    const liEndPathRef = liEndCanBeDeleted ? plateCommon.createPathRef(editor, liEnd[1]) : undefined;
    /**
     * Delete fragment and move end block children to start block
     */

    plateCommon.deleteMerge(editor);
    const start = plateCommon.getStartPoint(editor, editor.selection);
    const liStart = plateCommon.getAboveNode(editor, {
      at: start,
      match: {
        type: plateCommon.getPluginType(editor, ELEMENT_LI)
      }
    });

    if (liEndPathRef) {
      const liEndPath = liEndPathRef.unref();
      const listStart = liStart && plateCommon.getParentNode(editor, liStart[1]);
      const deletePath = getHighestEmptyList(editor, {
        liPath: liEndPath,
        diffListPath: listStart === null || listStart === void 0 ? void 0 : listStart[1]
      });

      if (deletePath) {
        plateCommon.removeNodes(editor, {
          at: deletePath
        });
      }

      deleted = true;
    }
  });
  return deleted;
};

const insertBreakList = editor => {
  if (!editor.selection) return;
  const res = getListItemEntry(editor, {});
  let moved; // If selection is in a li

  if (res) {
    const {
      list,
      listItem
    } = res; // If selected li is empty, move it up.

    if (plateCommon.isBlockAboveEmpty(editor)) {
      moved = moveListItemUp(editor, {
        list,
        listItem
      });
      if (moved) return true;
    }
  }

  const didReset = plateResetNode.onKeyDownResetNode(editor, plateCommon.mockPlugin({
    options: {
      rules: [{
        types: [plateCommon.getPluginType(editor, ELEMENT_LI)],
        defaultType: plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT),
        predicate: () => !moved && plateCommon.isBlockAboveEmpty(editor),
        onReset: _editor => unwrapList(_editor)
      }]
    }
  }))(plateResetNode.SIMULATE_BACKSPACE);
  if (didReset) return true;
  /**
   * If selection is in li > p, insert li.
   */

  if (!moved) {
    const inserted = insertListItem(editor);
    if (inserted) return true;
  }
};

const insertFragmentList = editor => {
  const {
    insertFragment
  } = editor;
  const listItemPlugin = plateCommon.getPlugin(editor, ELEMENT_LI);
  const listItemType = getListItemType(editor);
  const listItemContentType = getListItemContentType(editor);

  const getFirstAncestorOfType = (root, entry, {
    type
  }) => {
    let ancestor = slate.Path.parent(entry[1]);

    while (plateCommon.getNode(root, ancestor).type !== type) {
      ancestor = slate.Path.parent(ancestor);
    }

    return [plateCommon.getNode(root, ancestor), ancestor];
  };

  const findListItemsWithContent = first => {
    let prev = null;
    let node = first;

    while (isListRoot(editor, node) || node.type === listItemType && node.children[0].type !== listItemContentType) {
      prev = node;
      [node] = node.children;
    }

    return prev ? prev.children : [node];
  };
  /**
   * Removes the "empty" leading lis. Empty in this context means lis only with other lis as children.
   *
   * @returns If argument is not a list root, returns it, otherwise returns ul[] or li[].
   */


  const trimList = listRoot => {
    if (!isListRoot(editor, listRoot)) {
      return [listRoot];
    }

    const _texts = plateCommon.getNodeTexts(listRoot);

    const textEntries = Array.from(_texts);
    const commonAncestorEntry = textEntries.reduce((commonAncestor, textEntry) => slate.Path.isAncestor(commonAncestor[1], textEntry[1]) ? commonAncestor : plateCommon.getCommonNode(listRoot, textEntry[1], commonAncestor[1]), // any list item would do, we grab the first one
    getFirstAncestorOfType(listRoot, textEntries[0], listItemPlugin));
    const [first, ...rest] = isListRoot(editor, commonAncestorEntry[0]) ? commonAncestorEntry[0].children : [commonAncestorEntry[0]];
    return [...findListItemsWithContent(first), ...rest];
  };

  const wrapNodeIntoListItem = node => {
    return node.type === listItemType ? node : {
      type: listItemType,
      children: [node]
    };
  };
  /**
   * Checks if the fragment only consists of a single LIC in which case it is considered the user's intention was to copy a text, not a list
   */


  const isSingleLic = fragment => {
    const isFragmentOnlyListRoot = fragment.length === 1 && isListRoot(editor, fragment[0]);
    return isFragmentOnlyListRoot && [...plateCommon.getNodes({
      children: fragment
    })].filter(entry => plateCommon.isElement(entry[0])).filter(([node]) => node.type === listItemContentType).length === 1;
  };

  const getTextAndListItemNodes = (fragment, liEntry, licEntry) => {
    const [, liPath] = liEntry;
    const [licNode, licPath] = licEntry;
    const isEmptyNode = !plateCommon.getNodeString(licNode);
    const [first, ...rest] = fragment.flatMap(trimList).map(wrapNodeIntoListItem);
    let textNode;
    let listItemNodes;

    if (isListRoot(editor, fragment[0])) {
      if (isSingleLic(fragment)) {
        textNode = first;
        listItemNodes = rest;
      } else if (isEmptyNode) {
        // FIXME: is there a more direct way to set this?
        const li = plateCommon.getNode(editor, liPath);
        const [, ...currentSublists] = li.children;
        const [newLic, ...newSublists] = first.children;
        plateCommon.insertElements(editor, newLic, {
          at: slate.Path.next(licPath),
          select: true
        });
        plateCommon.removeNodes(editor, {
          at: licPath
        });

        if (newSublists !== null && newSublists !== void 0 && newSublists.length) {
          if (currentSublists !== null && currentSublists !== void 0 && currentSublists.length) {
            // TODO: any better way to compile the path where the LIs of the newly inserted element will be inserted?
            const path = [...liPath, 1, 0];
            plateCommon.insertElements(editor, newSublists[0].children, {
              at: path,
              select: true
            });
          } else {
            plateCommon.insertElements(editor, newSublists, {
              at: slate.Path.next(licPath),
              select: true
            });
          }
        }

        textNode = {
          text: ''
        };
        listItemNodes = rest;
      } else {
        textNode = {
          text: ''
        };
        listItemNodes = [first, ...rest];
      }
    } else {
      textNode = first;
      listItemNodes = rest;
    }

    return {
      textNode,
      listItemNodes
    };
  };

  return fragment => {
    let liEntry = plateCommon.findNode(editor, {
      match: {
        type: listItemType
      },
      mode: 'lowest'
    }); // not inserting into a list item, delegate to other plugins

    if (!liEntry) {
      return insertFragment(isListRoot(editor, fragment[0]) ? [{
        text: ''
      }, ...fragment] : fragment);
    } // delete selection (if necessary) so that it can check if needs to insert into an empty block


    insertFragment([{
      text: ''
    }]); // refetch to find the currently selected LI after the deletion above is performed

    liEntry = plateCommon.findNode(editor, {
      match: {
        type: listItemType
      },
      mode: 'lowest'
    });
    const licEntry = plateCommon.findNode(editor, {
      match: {
        type: listItemContentType
      },
      mode: 'lowest'
    });

    if (!licEntry) {
      return insertFragment(isListRoot(editor, fragment[0]) ? [{
        text: ''
      }, ...fragment] : fragment);
    }

    const {
      textNode,
      listItemNodes
    } = getTextAndListItemNodes(fragment, liEntry, licEntry);
    insertFragment([textNode]); // insert text if needed

    const [, liPath] = liEntry;
    return plateCommon.insertElements(editor, listItemNodes, {
      at: slate.Path.next(liPath),
      select: true
    });
  };
};

/**
 * Recursively get all the:
 * - block children
 * - inline children except those at excludeDepth
 */
const getDeepInlineChildren = (editor, {
  children
}) => {
  const inlineChildren = [];

  for (const child of children) {
    if (plateCommon.isBlock(editor, child[0])) {
      inlineChildren.push(...getDeepInlineChildren(editor, {
        children: plateCommon.getChildren(child)
      }));
    } else {
      inlineChildren.push(child);
    }
  }

  return inlineChildren;
};
/**
 * If the list item has no child: insert an empty list item container.
 * Else: move the children that are not valid to the list item container.
 */

const normalizeListItem = (editor, {
  listItem,
  validLiChildrenTypes = []
}) => {
  let changed = false;
  const allValidLiChildrenTypes = [plateCommon.getPluginType(editor, ELEMENT_UL), plateCommon.getPluginType(editor, ELEMENT_OL), plateCommon.getPluginType(editor, ELEMENT_LIC), ...validLiChildrenTypes];
  const [, liPath] = listItem;
  const liChildren = plateCommon.getChildren(listItem); // Get invalid (type) li children path refs to be moved

  const invalidLiChildrenPathRefs = liChildren.filter(([child]) => !allValidLiChildrenTypes.includes(child.type)).map(([, childPath]) => plateCommon.createPathRef(editor, childPath));
  const firstLiChild = liChildren[0];
  const [firstLiChildNode, firstLiChildPath] = firstLiChild !== null && firstLiChild !== void 0 ? firstLiChild : []; // If li has no child or inline child, insert lic

  if (!firstLiChild || !plateCommon.isBlock(editor, firstLiChildNode)) {
    plateCommon.insertEmptyElement(editor, plateCommon.getPluginType(editor, ELEMENT_LIC), {
      at: liPath.concat([0])
    });
    return true;
  } // If first li child is a block but not lic, set it to lic


  if (plateCommon.isBlock(editor, firstLiChildNode) && !plateCommon.match(firstLiChildNode, [], {
    type: plateCommon.getPluginType(editor, ELEMENT_LIC)
  })) {
    if (plateCommon.match(firstLiChildNode, [], {
      type: getListTypes(editor)
    })) {
      // the listItem has no lic so we move the children up a level
      const parent = plateCommon.getParentNode(editor, listItem[1]);
      const sublist = firstLiChild;
      const children = plateCommon.getChildren(firstLiChild).reverse();
      children.forEach(c => {
        moveListItemUp(editor, {
          list: sublist,
          listItem: c
        });
      });
      plateCommon.removeNodes(editor, {
        at: [...parent[1], 0]
      });
      return true;
    } // Allow block elements listed as valid li children types to be a first child instead of LIC


    if (validLiChildrenTypes.includes(firstLiChildNode.type)) {
      return true;
    }

    plateCommon.setElements(editor, {
      type: plateCommon.getPluginType(editor, ELEMENT_LIC)
    }, {
      at: firstLiChildPath
    });
    changed = true;
  }

  const licChildren = plateCommon.getChildren(firstLiChild);

  if (licChildren.length) {
    var _licChildren;

    const blockPathRefs = [];
    const inlineChildren = []; // Check that lic has no block children

    for (const licChild of licChildren) {
      if (!plateCommon.isBlock(editor, licChild[0])) {
        break;
      }

      blockPathRefs.push(plateCommon.createPathRef(editor, licChild[1]));
      inlineChildren.push(...getDeepInlineChildren(editor, {
        children: plateCommon.getChildren(licChild)
      }));
    }

    const to = slate.Path.next((_licChildren = licChildren[licChildren.length - 1]) === null || _licChildren === void 0 ? void 0 : _licChildren[1]); // Move lic nested inline children to its children

    inlineChildren.reverse().forEach(([, path]) => {
      plateCommon.moveNodes(editor, {
        at: path,
        to
      });
    }); // Remove lic block children

    blockPathRefs.forEach(pathRef => {
      const path = pathRef.unref();
      path && plateCommon.removeNodes(editor, {
        at: path
      });
    });

    if (blockPathRefs.length) {
      changed = true;
    }
  }

  if (changed) return true; // Ensure that any text nodes under the list are inside the list item container

  invalidLiChildrenPathRefs.reverse().forEach(ref => {
    const path = ref.unref();
    path && plateCommon.moveNodes(editor, {
      at: path,
      to: firstLiChildPath.concat([0])
    });
  });
  return !!invalidLiChildrenPathRefs.length;
};

// should be normalized to "ul -> li -> lic + ul".
// In other words, a nested list as a direct children of a list should be moved into a previous list item sibling

const normalizeNestedList = (editor, {
  nestedListItem
}) => {
  const [, path] = nestedListItem;
  const parentNode = plateCommon.getParentNode(editor, path);
  const hasParentList = parentNode && plateCommon.match(parentNode[0], [], {
    type: getListTypes(editor)
  });

  if (!hasParentList) {
    return false;
  }

  let previousListItemPath;

  try {
    previousListItemPath = slate.Path.previous(path);
  } catch (e) {
    return false;
  } // Previous sibling is the new parent


  const previousSiblingItem = plateCommon.getNodeEntry(editor, previousListItemPath);

  if (previousSiblingItem) {
    const [, previousPath] = previousSiblingItem;
    const newPath = previousPath.concat([1]); // Move the current item to the sublist

    plateCommon.moveNodes(editor, {
      at: path,
      to: newPath
    });
    return true;
  }
};

/**
 * Normalize list node to force the ul>li>p+ul structure.
 */

const normalizeList = (editor, {
  validLiChildrenTypes
}) => {
  const {
    normalizeNode
  } = editor;
  const liType = plateCommon.getPluginType(editor, ELEMENT_LI);
  const licType = plateCommon.getPluginType(editor, ELEMENT_LIC);
  const defaultType = plateCommon.getPluginType(editor, plateCommon.ELEMENT_DEFAULT);
  return ([node, path]) => {
    if (!plateCommon.isElement(node)) {
      return normalizeNode([node, path]);
    }

    if (isListRoot(editor, node)) {
      const nonLiChild = plateCommon.getChildren([node, path]).find(([child]) => child.type !== liType);

      if (nonLiChild) {
        return plateCommon.wrapNodes(editor, {
          type: liType,
          children: []
        }, {
          at: nonLiChild[1]
        });
      }
    } // remove empty list


    if (plateCommon.match(node, [], {
      type: getListTypes(editor)
    })) {
      if (!node.children.length || !node.children.find(item => item.type === liType)) {
        return plateCommon.removeNodes(editor, {
          at: path
        });
      }

      const nextPath = slate.Path.next(path);
      const nextNode = plateCommon.getNode(editor, nextPath); // Has a list afterwards with the same type

      if ((nextNode === null || nextNode === void 0 ? void 0 : nextNode.type) === node.type) {
        moveListItemsToList(editor, {
          fromList: [nextNode, nextPath],
          toList: [node, path],
          deleteFromList: true
        });
      }

      const prevPath = plateCommon.getPreviousPath(path);
      const prevNode = plateCommon.getNode(editor, prevPath); // Has a list before with the same type

      if ((prevNode === null || prevNode === void 0 ? void 0 : prevNode.type) === node.type) {
        editor.normalizeNode([prevNode, prevPath]); // early return since this node will no longer exists

        return;
      }

      if (normalizeNestedList(editor, {
        nestedListItem: [node, path]
      })) {
        return;
      }
    }

    if (node.type === plateCommon.getPluginType(editor, ELEMENT_LI)) {
      if (normalizeListItem(editor, {
        listItem: [node, path],
        validLiChildrenTypes
      })) {
        return;
      }
    } // LIC should have LI parent. If not, set LIC to DEFAULT type.


    if (node.type === licType && licType !== defaultType) {
      var _getParentNode;

      if (((_getParentNode = plateCommon.getParentNode(editor, path)) === null || _getParentNode === void 0 ? void 0 : _getParentNode[0].type) !== liType) {
        plateCommon.setElements(editor, {
          type: defaultType
        }, {
          at: path
        });
        return;
      }
    }

    normalizeNode([node, path]);
  };
};

const withList = (editor, {
  options: {
    validLiChildrenTypes
  }
}) => {
  const {
    insertBreak,
    deleteBackward,
    deleteForward,
    deleteFragment
  } = editor;

  editor.insertBreak = () => {
    if (insertBreakList(editor)) return;
    insertBreak();
  };

  editor.deleteBackward = unit => {
    if (deleteBackwardList(editor, unit)) return;
    deleteBackward(unit);
  };

  editor.deleteForward = unit => {
    if (deleteForwardList(editor)) return;
    deleteForward(unit);
  };

  editor.deleteFragment = direction => {
    if (deleteFragmentList(editor)) return;
    deleteFragment(direction);
  };

  editor.insertFragment = insertFragmentList(editor);
  editor.normalizeNode = normalizeList(editor, {
    validLiChildrenTypes
  });
  return editor;
};

const ELEMENT_UL = 'ul';
const ELEMENT_OL = 'ol';
const ELEMENT_LI = 'li';
const ELEMENT_LIC = 'lic';
/**
 * Enables support for bulleted, numbered and to-do lists.
 */

const createListPlugin = plateCommon.createPluginFactory({
  key: 'list',
  plugins: [{
    key: ELEMENT_UL,
    isElement: true,
    handlers: {
      onKeyDown: onKeyDownList
    },
    withOverrides: withList,
    deserializeHtml: {
      rules: [{
        validNodeName: 'UL'
      }]
    }
  }, {
    key: ELEMENT_OL,
    isElement: true,
    handlers: {
      onKeyDown: onKeyDownList
    },
    deserializeHtml: {
      rules: [{
        validNodeName: 'OL'
      }]
    }
  }, {
    key: ELEMENT_LI,
    isElement: true,
    deserializeHtml: {
      rules: [{
        validNodeName: 'LI'
      }]
    },
    then: (editor, {
      type
    }) => ({
      inject: {
        pluginsByKey: {
          [plateCommon.KEY_DESERIALIZE_HTML]: {
            editor: {
              insertData: {
                preInsert: () => {
                  return plateCommon.someNode(editor, {
                    match: {
                      type
                    }
                  });
                }
              }
            }
          }
        }
      }
    })
  }, {
    key: ELEMENT_LIC,
    isElement: true
  }]
});

exports.ELEMENT_LI = ELEMENT_LI;
exports.ELEMENT_LIC = ELEMENT_LIC;
exports.ELEMENT_OL = ELEMENT_OL;
exports.ELEMENT_TODO_LI = ELEMENT_TODO_LI;
exports.ELEMENT_UL = ELEMENT_UL;
exports.createListPlugin = createListPlugin;
exports.createTodoListPlugin = createTodoListPlugin;
exports.deleteBackwardList = deleteBackwardList;
exports.deleteForwardList = deleteForwardList;
exports.deleteFragmentList = deleteFragmentList;
exports.getDeepInlineChildren = getDeepInlineChildren;
exports.getHighestEmptyList = getHighestEmptyList;
exports.getListItemContentType = getListItemContentType;
exports.getListItemEntry = getListItemEntry;
exports.getListItemType = getListItemType;
exports.getListRoot = getListRoot;
exports.getListTypes = getListTypes;
exports.getOrderedListType = getOrderedListType;
exports.getTodoListItemEntry = getTodoListItemEntry;
exports.getUnorderedListType = getUnorderedListType;
exports.hasListChild = hasListChild;
exports.indentListItems = indentListItems;
exports.insertBreakList = insertBreakList;
exports.insertBreakTodoList = insertBreakTodoList;
exports.insertFragmentList = insertFragmentList;
exports.insertListItem = insertListItem;
exports.insertTodoListItem = insertTodoListItem;
exports.isAcrossListItems = isAcrossListItems;
exports.isListNested = isListNested;
exports.isListRoot = isListRoot;
exports.moveListItemDown = moveListItemDown;
exports.moveListItemSublistItemsToListItemSublist = moveListItemSublistItemsToListItemSublist;
exports.moveListItemUp = moveListItemUp;
exports.moveListItems = moveListItems;
exports.moveListItemsToList = moveListItemsToList;
exports.moveListSiblingsAfterCursor = moveListSiblingsAfterCursor;
exports.normalizeList = normalizeList;
exports.normalizeListItem = normalizeListItem;
exports.normalizeNestedList = normalizeNestedList;
exports.onKeyDownList = onKeyDownList;
exports.removeFirstListItem = removeFirstListItem;
exports.removeListItem = removeListItem;
exports.toggleList = toggleList;
exports.unindentListItems = unindentListItems;
exports.unwrapList = unwrapList;
exports.withList = withList;
exports.withTodoList = withTodoList;
//# sourceMappingURL=index.js.map
