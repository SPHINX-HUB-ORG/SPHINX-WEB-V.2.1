import { setElements, withoutNormalizing, isDefined, getNode, getPreviousPath, unsetNodes, getPluginOptions, isCollapsed, getBlockAbove, isExpanded, getNodeEntries, isBlockAboveEmpty, createPathRef, createPluginFactory, KEY_DESERIALIZE_HTML, traverseHtmlElements, isHtmlBlockElement, postCleanHtml, getPluginType, ELEMENT_DEFAULT } from '@udecode/plate-common';
import React from 'react';
import { setIndent, KEY_INDENT } from '@udecode/plate-indent';
import { Path } from 'slate';

function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

function clsx () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

let ListStyleType;

(function (ListStyleType) {
  ListStyleType["Armenian"] = "armenian";
  ListStyleType["Circle"] = "circle";
  ListStyleType["CjkIdeographic"] = "cjk-ideographic";
  ListStyleType["Decimal"] = "decimal";
  ListStyleType["DecimalLeadingZero"] = "decimal-leading-zero";
  ListStyleType["Disc"] = "disc";
  ListStyleType["Georgian"] = "georgian";
  ListStyleType["Hebrew"] = "hebrew";
  ListStyleType["Hiragana"] = "hiragana";
  ListStyleType["HiraganaIroha"] = "hiragana-iroha";
  ListStyleType["Katakana"] = "katakana";
  ListStyleType["KatakanaIroha"] = "katakana-iroha";
  ListStyleType["LowerAlpha"] = "lower-alpha";
  ListStyleType["LowerGreek"] = "lower-greek";
  ListStyleType["LowerLatin"] = "lower-latin";
  ListStyleType["LowerRoman"] = "lower-roman";
  ListStyleType["None"] = "none";
  ListStyleType["Square"] = "square";
  ListStyleType["UpperAlpha"] = "upper-alpha";
  ListStyleType["UpperLatin"] = "upper-latin";
  ListStyleType["UpperRoman"] = "upper-roman";
  ListStyleType["Initial"] = "initial";
  ListStyleType["Inherit"] = "inherit";
})(ListStyleType || (ListStyleType = {}));

const injectIndentListComponent = props => {
  const {
    element
  } = props;
  const listStyleType = element[KEY_LIST_STYLE_TYPE];
  const listStart = element[KEY_LIST_START];

  if (listStyleType) {
    let className = clsx(`slate-${KEY_LIST_STYLE_TYPE}-${listStyleType}`);
    const style = {
      padding: 0,
      margin: 0,
      listStyleType
    };

    if ([ListStyleType.Disc, ListStyleType.Circle, ListStyleType.Square].includes(listStyleType)) {
      className = clsx(className, 'slate-list-bullet');
      return ({
        children
      }) => /*#__PURE__*/React.createElement("ul", {
        style: style,
        className: className
      }, /*#__PURE__*/React.createElement("li", null, children));
    }

    className = clsx(className, 'slate-list-number');
    return ({
      children
    }) => /*#__PURE__*/React.createElement("ol", {
      style: style,
      className: className,
      start: listStart
    }, /*#__PURE__*/React.createElement("li", null, children));
  }
};

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
 * Increase the indentation of the selected blocks.
 */
const indentList = (editor, {
  listStyleType = ListStyleType.Disc,
  ...options
} = {}) => {
  setIndent(editor, {
    offset: 1,
    setNodesProps: () => ({
      [KEY_LIST_STYLE_TYPE]: listStyleType
    }),
    ...options
  });
};

/**
 * Decrease the indentation of the selected blocks.
 */
const outdentList = (editor, options = {}) => {
  setIndent(editor, {
    offset: -1,
    unsetNodesProps: [KEY_LIST_STYLE_TYPE],
    ...options
  });
};

const setIndentListNode = (editor, {
  listStyleType = ListStyleType.Disc,
  indent = 0,
  at
}) => {
  const newIndent = indent || indent + 1;
  setElements(editor, {
    [KEY_LIST_STYLE_TYPE]: listStyleType,
    [KEY_INDENT]: newIndent
  }, {
    at
  });
};

/**
 * Set indent list to the given entries.
 * Add indent if listStyleType was not defined.
 */

const setIndentListNodes = (editor, entries, {
  listStyleType = ListStyleType.Disc
}) => {
  withoutNormalizing(editor, () => {
    entries.forEach(entry => {
      var _ref;

      const [node, path] = entry;
      let indent = (_ref = node[KEY_INDENT]) !== null && _ref !== void 0 ? _ref : 0;
      indent = node[KEY_LIST_STYLE_TYPE] ? indent : indent + 1;
      setIndentListNode(editor, {
        listStyleType,
        indent,
        at: path
      });
    });
  });
};

/**
 * Get the next sibling indent list node.
 * Default query: the sibling node should have the same listStyleType.
 */
const getSiblingIndentList = (editor, [node, path], {
  getPreviousEntry,
  getNextEntry,
  query,
  eqIndent = true,
  breakQuery,
  breakOnLowerIndent = true,
  breakOnEqIndentNeqListStyleType = true
}) => {
  if (!getPreviousEntry && !getNextEntry) return;
  const getSiblingEntry = getNextEntry !== null && getNextEntry !== void 0 ? getNextEntry : getPreviousEntry;
  let nextEntry = getSiblingEntry([node, path]);

  while (true) {
    if (!nextEntry) return;
    const [nextNode, nextPath] = nextEntry;
    const indent = node[KEY_INDENT];
    const nextIndent = nextNode[KEY_INDENT];
    if (!isDefined(nextIndent)) return;
    if (breakQuery && breakQuery(nextNode)) return;
    if (breakOnLowerIndent && nextIndent < indent) return;
    if (breakOnEqIndentNeqListStyleType && nextIndent === indent && nextNode[KEY_LIST_STYLE_TYPE] !== node[KEY_LIST_STYLE_TYPE]) return;
    let valid = !query || query(nextNode);

    if (valid) {
      valid = !eqIndent || nextIndent === indent;
      if (valid) return [nextNode, nextPath];
    }

    nextEntry = getSiblingEntry(nextEntry);
  }
};

/**
 * Get the next indent list.
 */

const getNextIndentList = (editor, entry, options) => {
  return getSiblingIndentList(editor, entry, {
    getNextEntry: ([, currPath]) => {
      const nextPath = Path.next(currPath);
      const nextNode = getNode(editor, nextPath);
      if (!nextNode) return;
      return [nextNode, nextPath];
    },
    ...options,
    getPreviousEntry: undefined
  });
};

/**
 * Get the previous indent list node.
 */

const getPreviousIndentList = (editor, entry, options) => {
  return getSiblingIndentList(editor, entry, {
    getPreviousEntry: ([, currPath]) => {
      const prevPath = getPreviousPath(currPath);
      if (!prevPath) return;
      const prevNode = getNode(editor, prevPath);
      if (!prevNode) return;
      return [prevNode, prevPath];
    },
    ...options,
    getNextEntry: undefined
  });
};

const getIndentListSiblings = (editor, entry, {
  previous = true,
  current = true,
  next = true,
  ...options
} = {}) => {
  const siblings = [];
  const [node] = entry;
  if (!node[KEY_LIST_STYLE_TYPE]) return siblings;
  let iterEntry = entry;

  if (previous) {
    while (true) {
      const prevEntry = getPreviousIndentList(editor, iterEntry, options);
      if (!prevEntry) break;
      siblings.push(prevEntry);
      iterEntry = prevEntry;
    }
  }

  if (current) {
    siblings.push(entry);
  }

  if (next) {
    iterEntry = entry;

    while (true) {
      const nextEntry = getNextIndentList(editor, iterEntry, options);
      if (!nextEntry) break;
      siblings.push(nextEntry);
      iterEntry = nextEntry;
    }
  }

  return siblings;
};

/**
 * Set indent list to entry + siblings.
 */

const setIndentListSiblingNodes = (editor, entry, {
  listStyleType = ListStyleType.Disc,
  getSiblingIndentListOptions
}) => {
  withoutNormalizing(editor, () => {
    const siblings = getIndentListSiblings(editor, entry, getSiblingIndentListOptions);
    siblings.forEach(([node, path]) => {
      setIndentListNode(editor, {
        listStyleType,
        indent: node[KEY_INDENT],
        at: path
      });
    });
  });
};

const areEqListStyleType = (editor, entries, {
  listStyleType = ListStyleType.Disc
}) => {
  let eqListStyleType = true;

  for (const entry of entries) {
    const [block] = entry;

    if (!block[KEY_LIST_STYLE_TYPE] || block[KEY_LIST_STYLE_TYPE] !== listStyleType) {
      eqListStyleType = false;
      break;
    }
  }

  return eqListStyleType;
};

/**
 * Set indent list if not set.
 */

const toggleIndentListSet = (editor, [node], {
  listStyleType = ListStyleType.Disc,
  ...options
}) => {
  if (!node[KEY_LIST_STYLE_TYPE]) {
    indentList(editor, {
      listStyleType,
      ...options
    });
    return true;
  }
};

/**
 * Unset list style type if already set.
 */

const toggleIndentListUnset = (editor, [node, path], {
  listStyleType = ListStyleType.Disc
}) => {
  if (listStyleType === node[KEY_LIST_STYLE_TYPE]) {
    unsetNodes(editor, KEY_LIST_STYLE_TYPE, {
      at: path
    });
    outdentList(editor, {
      listStyleType
    });
    return true;
  }
};

/**
 * Increase the indentation of the selected blocks.
 */

const toggleIndentList = (editor, options) => {
  const {
    listStyleType
  } = options;
  const {
    getSiblingIndentListOptions
  } = getPluginOptions(editor, KEY_LIST_STYLE_TYPE);

  if (isCollapsed(editor.selection)) {
    const entry = getBlockAbove(editor);
    if (!entry) return;

    if (toggleIndentListSet(editor, entry, {
      listStyleType
    })) {
      return;
    }

    if (toggleIndentListUnset(editor, entry, {
      listStyleType
    })) {
      return;
    }

    setIndentListSiblingNodes(editor, entry, {
      listStyleType,
      getSiblingIndentListOptions
    });
    return;
  }

  if (isExpanded(editor.selection)) {
    const _entries = getNodeEntries(editor, {
      block: true
    });

    const entries = [..._entries];
    const eqListStyleType = areEqListStyleType(editor, entries, {
      listStyleType
    });

    if (eqListStyleType) {
      withoutNormalizing(editor, () => {
        entries.forEach(entry => {
          const [node, path] = entry;
          const indent = node[KEY_INDENT];
          unsetNodes(editor, KEY_LIST_STYLE_TYPE, {
            at: path
          });

          if (indent > 1) {
            setElements(editor, {
              [KEY_INDENT]: indent - 1
            }, {
              at: path
            });
          } else {
            unsetNodes(editor, KEY_INDENT, {
              at: path
            });
          } // setIndentListNode(editor, {
          //   listStyleType,
          //   indent: node[KEY_INDENT],
          //   at: path,
          // });

        });
      });
      return;
    }

    setIndentListNodes(editor, entries, {
      listStyleType
    });
  }
};

const onKeyDownIndentList = (editor, plugin) => e => {
  if (e.defaultPrevented) return;
  if (!editor.selection) return;
  const entry = getBlockAbove(editor);
  if (!entry) return;
  const node = entry[0];
  const listStyleType = node[KEY_LIST_STYLE_TYPE];
  if (!listStyleType) return;

  if (isHotkey('Enter', e)) {
    if (isBlockAboveEmpty(editor) && node.indent) {
      outdentList(editor);
      e.stopPropagation();
      e.preventDefault();
    }
  }
};

/**
 * If there is no previous list item and node list start is defined, unset list start (1).
 */

const normalizeFirstIndentListStart = (editor, [node, path]) => {
  if (isDefined(node[KEY_LIST_START])) {
    unsetNodes(editor, KEY_LIST_START, {
      at: path
    });
    return true;
  }
};

const normalizeNextIndentListStart = (editor, entry, prevEntry) => {
  var _ref, _ref2;

  const [node, path] = entry;
  const [prevNode] = prevEntry !== null && prevEntry !== void 0 ? prevEntry : [null];
  const prevListStart = (_ref = prevNode === null || prevNode === void 0 ? void 0 : prevNode[KEY_LIST_START]) !== null && _ref !== void 0 ? _ref : 1;
  const currListStart = (_ref2 = node[KEY_LIST_START]) !== null && _ref2 !== void 0 ? _ref2 : 1;
  const restart = node[KEY_LIST_RESTART];
  const listStart = restart == null ? prevListStart + 1 : restart;

  if (currListStart !== listStart) {
    setElements(editor, {
      [KEY_LIST_START]: listStart
    }, {
      at: path
    });
    return true;
  }

  return false;
};
const normalizeIndentListStart = (editor, entry, options) => {
  return withoutNormalizing(editor, () => {
    const [node] = entry;
    const listStyleType = node[KEY_LIST_STYLE_TYPE];
    if (!listStyleType) return;
    let normalized = false;
    let prevEntry = getPreviousIndentList(editor, entry, options);

    if (!prevEntry) {
      normalized = normalizeFirstIndentListStart(editor, entry); // if no prevEntry and not normalized, nothing happened: next should not be normalized

      if (!normalized) return;
    }

    let normalizeNext = true;
    let currEntry = entry; // normalize next until current is not normalized

    while (normalizeNext) {
      normalizeNext = normalizeNextIndentListStart(editor, currEntry, prevEntry) || normalized;
      if (normalizeNext) normalized = true; // get the node again after setNodes

      prevEntry = [getNode(editor, currEntry[1]), currEntry[1]];
      currEntry = getNextIndentList(editor, currEntry, options);
      if (!currEntry) break;
    }

    return normalized;
  });
};

/**
 * Unset KEY_LIST_STYLE_TYPE, KEY_LIST_START if KEY_INDENT is not defined.
 */

const normalizeIndentListNotIndented = (editor, [node, path]) => {
  if (!isDefined(node[KEY_INDENT]) && (node[KEY_LIST_STYLE_TYPE] || node[KEY_LIST_START])) {
    unsetNodes(editor, [KEY_LIST_STYLE_TYPE, KEY_LIST_START], {
      at: path
    });
    return true;
  }
};

const normalizeIndentList = (editor, {
  getSiblingIndentListOptions
} = {}) => {
  const {
    normalizeNode
  } = editor;
  return ([node, path]) => {
    const normalized = withoutNormalizing(editor, () => {
      if (normalizeIndentListNotIndented(editor, [node, path])) return true;
      if (normalizeIndentListStart(editor, [node, path], getSiblingIndentListOptions)) return true;
    });
    if (normalized) return;
    return normalizeNode([node, path]);
  };
};

const withIndentList = (editor, {
  options
}) => {
  const {
    apply
  } = editor;
  const {
    getSiblingIndentListOptions
  } = options;
  editor.normalizeNode = normalizeIndentList(editor, options);

  editor.apply = operation => {
    const {
      path
    } = operation;
    let nodeBefore = null;

    if (operation.type === 'set_node') {
      nodeBefore = getNode(editor, path);
    } // If there is a previous indent list, the inserted indent list style type should be the same.
    // Only for lower-roman and upper-roman as it overlaps with lower-alpha and upper-alpha.


    if (operation.type === 'insert_node') {
      const listStyleType = operation.node[KEY_LIST_STYLE_TYPE];

      if (listStyleType && ['lower-roman', 'upper-roman'].includes(listStyleType)) {
        const prevNodeEntry = getPreviousIndentList(editor, [operation.node, path], {
          eqIndent: false,
          breakOnEqIndentNeqListStyleType: false,
          ...getSiblingIndentListOptions
        });

        if (prevNodeEntry) {
          const prevListStyleType = prevNodeEntry[0][KEY_LIST_STYLE_TYPE];

          if (prevListStyleType === ListStyleType.LowerAlpha && listStyleType === ListStyleType.LowerRoman) {
            operation.node[KEY_LIST_STYLE_TYPE] = ListStyleType.LowerAlpha;
          } else if (prevListStyleType === ListStyleType.UpperAlpha && listStyleType === ListStyleType.UpperRoman) {
            operation.node[KEY_LIST_STYLE_TYPE] = ListStyleType.UpperAlpha;
          }
        }
      }
    } // FIXME: delete first list


    let nextIndentListPathRef = null;

    if (operation.type === 'merge_node' && operation.properties[KEY_LIST_STYLE_TYPE]) {
      const node = getNode(editor, path);

      if (node) {
        const nextNodeEntryBefore = getNextIndentList(editor, [node, path], getSiblingIndentListOptions);

        if (nextNodeEntryBefore) {
          nextIndentListPathRef = createPathRef(editor, nextNodeEntryBefore[1]);
        }
      }
    }

    apply(operation);

    if (operation.type === 'merge_node') {
      const {
        properties
      } = operation;

      if (properties[KEY_LIST_STYLE_TYPE]) {
        const node = getNode(editor, path);
        if (!node) return; // const prevNodeEntry = getPreviousIndentList(
        //   editor,
        //   [node, path],
        //   getSiblingIndentListOptions
        // );
        // if (!prevNodeEntry) {
        // normalizeIndentListStart(
        //   editor,
        //   [node as any, path],
        //   getSiblingIndentListOptions
        // );
        //   return;
        // }
        // normalizeIndentListStart(
        //   editor,
        //   prevNodeEntry,
        //   getSiblingIndentListOptions
        // );

        normalizeIndentListStart(editor, [node, path], getSiblingIndentListOptions);

        if (nextIndentListPathRef) {
          const nextPath = nextIndentListPathRef.unref();

          if (nextPath) {
            const nextNode = getNode(editor, nextPath);

            if (nextNode) {
              normalizeIndentListStart(editor, [nextNode, nextPath], getSiblingIndentListOptions);
            }
          }
        }
      }
    }

    if (nodeBefore) {
      if (operation.type === 'set_node') {
        const prevListStyleType = operation.properties[KEY_LIST_STYLE_TYPE];
        const listStyleType = operation.newProperties[KEY_LIST_STYLE_TYPE]; // Remove list style type

        if (prevListStyleType && !listStyleType) {
          const node = getNode(editor, path);
          if (!node) return;
          const nextNodeEntry = getNextIndentList(editor, [nodeBefore, path], getSiblingIndentListOptions);
          if (!nextNodeEntry) return;
          normalizeIndentListStart(editor, nextNodeEntry, getSiblingIndentListOptions);
        } // Update list style type


        if ((prevListStyleType || listStyleType) && prevListStyleType !== listStyleType) {
          const node = getNode(editor, path);
          if (!node) return;
          /**
           * Case:
           * - 1-<o>-1 <- toggle ol
           * - <1>-1-2 <- normalize
           * - 1-2-3
           */
          // const prevNodeEntry = getPreviousIndentList(
          //   editor,
          //   [node, path],
          //   getSiblingIndentListOptions
          // );
          // if (prevNodeEntry) {
          //   normalizeIndentListStart(
          //     editor,
          //     prevNodeEntry,
          //     getSiblingIndentListOptions
          //   );
          // }

          /**
           * Case:
           * - 1-<2>-3 <- toggle ul
           * - 1-o-<3> <- normalize
           * - 1-o-1
           */

          let nextNodeEntry = getNextIndentList(editor, [nodeBefore, path], getSiblingIndentListOptions);

          if (nextNodeEntry) {
            normalizeIndentListStart(editor, nextNodeEntry, getSiblingIndentListOptions);
          }

          nextNodeEntry = getNextIndentList(editor, [node, path], getSiblingIndentListOptions);

          if (nextNodeEntry) {
            normalizeIndentListStart(editor, nextNodeEntry, getSiblingIndentListOptions);
          }
        }

        const prevIndent = operation.properties[KEY_INDENT];
        const indent = operation.newProperties[KEY_INDENT]; // Update indent

        if (prevIndent !== indent) {
          const node = getNode(editor, path);
          if (!node) return;
          /**
           * Case:
           * - 1-<o>-1 <- indent
           * - <1>-1o-1 <- normalize node before
           * - 1-1o-2
           */

          let prevNodeEntry = getPreviousIndentList(editor, [nodeBefore, path], {
            eqIndent: false,
            breakOnLowerIndent: false,
            breakOnEqIndentNeqListStyleType: false,
            ...getSiblingIndentListOptions
          });

          if (prevNodeEntry) {
            normalizeIndentListStart(editor, prevNodeEntry, getSiblingIndentListOptions);
          }
          /**
           * Case:
           * - 11-<1>-11 <- indent
           * - <11>-11-12 <- normalize prev node after
           * - 11-12-13
           */


          prevNodeEntry = getPreviousIndentList(editor, [node, path], {
            eqIndent: false,
            breakOnLowerIndent: false,
            breakOnEqIndentNeqListStyleType: false,
            ...getSiblingIndentListOptions
          });

          if (prevNodeEntry) {
            normalizeIndentListStart(editor, prevNodeEntry, getSiblingIndentListOptions);
          }
          /**
           * Case:
           * - 11-<12>-13 <- outdent
           * - 11-2-<13> <- normalize next node before
           * - 11-2-11
           */


          let nextNodeEntry = getNextIndentList(editor, [nodeBefore, path], {
            eqIndent: false,
            breakOnLowerIndent: false,
            breakOnEqIndentNeqListStyleType: false
          });

          if (nextNodeEntry) {
            normalizeIndentListStart(editor, nextNodeEntry, getSiblingIndentListOptions);
          }
          /**
           * Case:
           * - 1-<1o>-2 <- outdent
           * - 1-o-<2> <- normalize next node after
           * - 1-o-1
           */


          nextNodeEntry = getNextIndentList(editor, [node, path], {
            eqIndent: false,
            breakOnLowerIndent: false,
            breakOnEqIndentNeqListStyleType: false
          });

          if (nextNodeEntry) {
            normalizeIndentListStart(editor, nextNodeEntry, getSiblingIndentListOptions);
          }
        }
      }
    }
  };

  return editor;
};

const KEY_LIST_STYLE_TYPE = 'listStyleType';
const KEY_LIST_START = 'listStart';
const KEY_LIST_RESTART = 'listRestart';
const createIndentListPlugin = createPluginFactory({
  key: KEY_LIST_STYLE_TYPE,
  inject: {
    belowComponent: injectIndentListComponent
  },
  withOverrides: withIndentList,
  handlers: {
    onKeyDown: onKeyDownIndentList
  },
  options: {
    getListStyleType: element => element.style.listStyleType
  },
  then: (editor, {
    options
  }) => ({
    inject: {
      pluginsByKey: {
        [KEY_DESERIALIZE_HTML]: {
          editor: {
            insertData: {
              transformData: data => {
                const document = new DOMParser().parseFromString(data, 'text/html');
                const {
                  body
                } = document;
                traverseHtmlElements(body, element => {
                  if (element.tagName === 'LI') {
                    const {
                      childNodes
                    } = element; // replace li block children (e.g. p) by their children

                    const liChildren = [];
                    childNodes.forEach(child => {
                      if (isHtmlBlockElement(child)) {
                        liChildren.push(...child.childNodes);
                      } else {
                        liChildren.push(child);
                      }
                    });
                    element.replaceChildren(...liChildren); // TODO: recursive check on ul parents for indent

                    return false;
                  }

                  return true;
                });
                return postCleanHtml(body.innerHTML);
              }
            }
          }
        }
      }
    },
    deserializeHtml: {
      isElement: true,
      getNode: element => {
        var _options$getListStyle;

        return {
          type: getPluginType(editor, ELEMENT_DEFAULT),
          listStyleType: (_options$getListStyle = options.getListStyleType) === null || _options$getListStyle === void 0 ? void 0 : _options$getListStyle.call(options, element),
          // gdoc uses aria-level attribute
          indent: Number(element.getAttribute('aria-level'))
        };
      },
      rules: [{
        validNodeName: 'LI'
      }]
    }
  })
});

/**
 * Get the first sibling list style type at the given indent.
 * If none, return the entry list style type.
 */

const getSiblingListStyleType = (editor, {
  entry,
  indent,
  ...options
}) => {
  const siblingEntry = [{ ...entry[0],
    indent
  }, entry[1]];
  const siblings = getIndentListSiblings(editor, siblingEntry, {
    eqIndent: true,
    current: false,
    breakOnEqIndentNeqListStyleType: false,
    ...options
  });
  return siblings.length ? siblings[0][0][KEY_LIST_STYLE_TYPE] : entry[0][KEY_LIST_STYLE_TYPE];
};

export { KEY_LIST_RESTART, KEY_LIST_START, KEY_LIST_STYLE_TYPE, ListStyleType, areEqListStyleType, createIndentListPlugin, getIndentListSiblings, getNextIndentList, getPreviousIndentList, getSiblingIndentList, getSiblingListStyleType, indentList, injectIndentListComponent, normalizeFirstIndentListStart, normalizeIndentList, normalizeIndentListNotIndented, normalizeIndentListStart, normalizeNextIndentListStart, onKeyDownIndentList, outdentList, setIndentListNode, setIndentListNodes, setIndentListSiblingNodes, toggleIndentList, toggleIndentListSet, toggleIndentListUnset, withIndentList };
//# sourceMappingURL=index.es.js.map
