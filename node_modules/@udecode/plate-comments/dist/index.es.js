import { createAtomStore, JotaiProvider, getJotaiProviderInitialValues, getNodeString, nanoid, findNode, unsetNodes, getNodeEntries, toDOMNode, usePlateEditorRef, isExpanded, setNodes, isText, deselectEditor, useHotkeys, withoutNormalizing, createPluginFactory, createComponentAs, createElementAs, useComposedRef, useOnClickOutside } from '@udecode/plate-common';
import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Button } from '@udecode/plate-button';

const MARK_COMMENT = 'comment';

const SCOPE_COMMENTS = Symbol('comments');
const {
  commentsStore,
  useCommentsStore
} = createAtomStore({
  /**
   * Id of the current user.
   */
  myUserId: null,

  /**
   * Users data.
   */
  users: {},

  /**
   * Comments data.
   */
  comments: {},

  /**
   * Id of the active comment. If null, no comment is active.
   */
  activeCommentId: null,
  addingCommentId: null,
  newValue: [{
    type: 'p',
    children: [{
      text: ''
    }]
  }],
  focusTextarea: false,
  onCommentAdd: null,
  onCommentUpdate: null,
  onCommentDelete: null
}, {
  name: 'comments',
  scope: SCOPE_COMMENTS
});
const CommentsProvider = ({
  children,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(JotaiProvider, {
    initialValues: getJotaiProviderInitialValues(commentsStore, props),
    scope: SCOPE_COMMENTS
  }, children);
};
const useCommentsStates = () => useCommentsStore().use;
const useCommentsSelectors = () => useCommentsStore().get;
const useCommentsActions = () => useCommentsStore().set;
const useCommentById = id => {
  const comments = useCommentsSelectors().comments();
  if (!id) return null;
  return comments[id];
};
const useUserById = id => {
  const users = useCommentsSelectors().users();
  if (!id) return null;
  return users[id];
};
const useMyUser = () => {
  const users = useCommentsSelectors().users();
  const myUserId = useCommentsSelectors().myUserId();
  if (!myUserId) return null;
  return users[myUserId];
};
const useNewCommentText = () => {
  const editingValue = useCommentsSelectors().newValue();
  return getNodeString(editingValue === null || editingValue === void 0 ? void 0 : editingValue[0]);
};
const useResetNewCommentValue = () => {
  const setNewValue = useCommentsActions().newValue();
  return () => {
    setNewValue([{
      type: 'p',
      children: [{
        text: ''
      }]
    }]);
  };
};
const useUpdateComment = id => {
  const comment = useCommentById(id);
  const [comments, setComments] = useCommentsStates().comments();
  return value => {
    if (!id) return;
    setComments({ ...comments,
      [id]: { ...comment,
        ...value
      }
    });
  };
};
const useAddRawComment = () => {
  const [comments, setComments] = useCommentsStates().comments();
  const myUserId = useCommentsSelectors().myUserId();
  return id => {
    if (!myUserId) return;
    setComments({ ...comments,
      [id]: {
        id,
        userId: myUserId
      }
    });
  };
};
const useAddComment = () => {
  const [comments, setComments] = useCommentsStates().comments();
  const myUserId = useCommentsSelectors().myUserId();
  return value => {
    var _value$id;

    const id = (_value$id = value.id) !== null && _value$id !== void 0 ? _value$id : nanoid();
    const newComment = {
      id,
      userId: myUserId !== null && myUserId !== void 0 ? myUserId : undefined,
      createdAt: Date.now(),
      ...value
    };

    if (newComment.userId) {
      setComments({ ...comments,
        [id]: newComment
      });
    }

    return newComment;
  };
};
const useRemoveComment = () => {
  const [comments, setComments] = useCommentsStates().comments();
  return id => {
    if (!id) return;
    delete comments[id];
    setComments({ ...comments
    });
  };
};

const SCOPE_COMMENT = Symbol('comment');
const SCOPE_ACTIVE_COMMENT = Symbol('activeComment');
const {
  commentStore,
  useCommentStore
} = createAtomStore({
  id: '',
  isMenuOpen: false,
  editingValue: null
}, {
  name: 'comment',
  scope: SCOPE_COMMENT
});
const useCommentStates = () => useCommentStore().use;
const useCommentSelectors = () => useCommentStore().get;
const useCommentActions = () => useCommentStore().set;
const CommentProvider = ({
  children,
  scope,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(JotaiProvider, {
    initialValues: getJotaiProviderInitialValues(commentStore, props),
    scope: scope !== null && scope !== void 0 ? scope : SCOPE_COMMENT
  }, children);
};
const useCommentUser = scope => {
  const commentId = useCommentSelectors().id(scope);
  const users = useCommentsSelectors().users();
  const comment = useCommentById(commentId);
  if (!comment) return null;
  return users[comment.userId];
};
const useCommentReplies = scope => {
  const commentId = useCommentSelectors().id(scope);
  const comments = useCommentsSelectors().comments();
  const replies = {};
  Object.keys(comments).forEach(id => {
    const comment = comments[id];
    if (!comment) return null;

    if (comment.parentId === commentId) {
      replies[id] = comment;
    }
  });
  return replies;
};
const useComment = scope => {
  const commentId = useCommentSelectors().id(scope);
  return useCommentById(commentId);
};
const useCommentText = scope => {
  var _comment$value;

  const comment = useComment(scope);
  if (!comment) return null;
  return getNodeString((_comment$value = comment.value) === null || _comment$value === void 0 ? void 0 : _comment$value[0]);
};
const useEditingCommentText = () => {
  const editingValue = useCommentSelectors().editingValue();
  if (!editingValue) return null;
  return getNodeString(editingValue === null || editingValue === void 0 ? void 0 : editingValue[0]);
};

const findCommentNode = (editor, options) => {
  return findNode(editor, {
    match: n => n[MARK_COMMENT],
    ...options
  });
};

const getCommentKey = id => `${MARK_COMMENT}_${id}`;

const findCommentNodeById = (editor, id) => {
  return findNode(editor, {
    at: [],
    match: n => n[getCommentKey(id)]
  });
};

const isCommentKey = key => key.startsWith(`${MARK_COMMENT}_`);

const getCommentCount = node => {
  let commentCount = 0;
  Object.keys(node).forEach(key => {
    if (isCommentKey(key)) commentCount++;
  });
  return commentCount;
};

const getCommentKeyId = key => key.replace(`${MARK_COMMENT}_`, '');

const getCommentKeys = node => {
  const keys = [];
  Object.keys(node).forEach(key => {
    if (isCommentKey(key)) keys.push(key);
  });
  return keys;
};

const getCommentUrl = commentId => {
  const url = new URL(window.location.href);
  url.searchParams.set('comment', commentId);
  return url.toString();
};

const getElementAbsolutePosition = element => {
  let left = 0;
  let top = 0;
  let currentElement = element;

  do {
    left += (currentElement.offsetLeft || 0) - currentElement.scrollLeft;
    top += (currentElement.offsetTop || 0) - currentElement.scrollTop;
    currentElement = currentElement.offsetParent;
  } while (currentElement);

  return {
    left,
    top
  };
};

/**
 * Whether the node has a comment id.
 */

const isCommentNodeById = (node, id) => !!node[getCommentKey(id)];

const isCommentText = node => {
  return !!node[MARK_COMMENT];
};

const unsetCommentNodesById = (editor, {
  id
}) => {
  unsetNodes(editor, getCommentKey(id), {
    at: [],
    match: n => isCommentNodeById(n, id)
  });
};

const getCommentNodeEntries = editor => {
  return [...getNodeEntries(editor, {
    at: [],
    match: n => isCommentText(n)
  })];
};

const getCommentNodesById = (editor, id) => {
  return Array.from(getNodeEntries(editor, {
    at: [],
    match: n => isCommentNodeById(n, id)
  }));
};

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

var _baseClamp = baseClamp;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * _.clamp(-10, -5, 5);
 * // => -5
 *
 * _.clamp(10, -5, 5);
 * // => 5
 */
function clamp(number, lower, upper) {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }
  if (upper !== undefined) {
    upper = toNumber_1(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== undefined) {
    lower = toNumber_1(lower);
    lower = lower === lower ? lower : 0;
  }
  return _baseClamp(toNumber_1(number), lower, upper);
}

var clamp_1 = clamp;

const getCommentPosition = (editor, node) => {
  const DOMNode = toDOMNode(editor, node);
  if (!DOMNode) return;
  const DOMNodePosition = getElementAbsolutePosition(DOMNode);
  const editorDOMNode = toDOMNode(editor, editor);
  if (!editorDOMNode) return;
  const {
    x: editorX,
    width: editorWidth
  } = editorDOMNode.getBoundingClientRect();
  const sidebarWidth = 418;
  const padding = 16;
  return {
    left: clamp_1(editorX + editorWidth + 16, window.innerWidth - (sidebarWidth + padding)),
    top: DOMNodePosition.top
  };
};

const useActiveCommentNode = () => {
  const editor = usePlateEditorRef();
  const id = useCommentsSelectors().activeCommentId();
  if (!id) return null;
  return findCommentNodeById(editor, id);
};

const useAddCommentMark = () => {
  const editor = usePlateEditorRef();
  const setActiveCommentId = useCommentsActions().activeCommentId();
  return () => {
    const {
      selection
    } = editor;
    if (!isExpanded(selection)) return;
    const id = nanoid(); // add comment prop to inline elements
    // const entries = getNodes(editor, {
    //   // TODO
    // });
    //
    // Array.from(entries).forEach(([, path]) => {
    //   setNodes(
    //     editor,
    //     {
    //       [key]: comment,
    //     },
    //     { at: path }
    //   );
    // });

    setNodes(editor, {
      [MARK_COMMENT]: true,
      [getCommentKey(id)]: true
    }, {
      match: isText,
      split: true
    });

    try {
      deselectEditor(editor);
    } catch (err) {}

    setTimeout(() => {
      setActiveCommentId(id);
    }, 0);
  };
};

const useCommentsResolved = () => {
  const comments = useCommentsSelectors().comments();
  const res = [];
  Object.keys(comments).forEach(key => {
    const comment = comments[key];

    if (comment !== null && comment !== void 0 && comment.isResolved) {
      res.push(comment);
    }
  });
  return res;
};

const useHooksComments = (editor, {
  options
}) => {
  const {
    hotkey
  } = options;
  const addCommentMark = useAddCommentMark();
  const setFocusTextarea = useCommentsActions().focusTextarea();
  useHotkeys(hotkey, e => {
    if (!editor.selection) return;
    e.preventDefault(); // block comments

    if (!isExpanded(editor.selection)) return;
    addCommentMark();
    setFocusTextarea(true);
  }, {
    enableOnContentEditable: true
  });
};

const removeCommentMark = editor => {
  const nodeEntry = findCommentNode(editor);
  if (!nodeEntry) return;
  const keys = getCommentKeys(nodeEntry[0]);
  withoutNormalizing(editor, () => {
    keys.forEach(key => {
      editor.removeMark(key);
    });
    editor.removeMark(MARK_COMMENT);
  });
};

const withComments = (editor, plugin) => {
  const {
    normalizeNode,
    insertBreak
  } = editor;

  editor.insertBreak = () => {
    removeCommentMark(editor);
    insertBreak();
  };

  editor.normalizeNode = entry => {
    const [node, path] = entry; // Unset MARK_COMMENT prop when there is no comments

    if (node[MARK_COMMENT]) {
      if (getCommentCount(node) < 1) {
        unsetNodes(editor, MARK_COMMENT, {
          at: path
        });
        return;
      }
    }

    normalizeNode(entry);
  };

  return editor;
};

const createCommentsPlugin = createPluginFactory({
  key: MARK_COMMENT,
  isLeaf: true,
  withOverrides: withComments,
  useHooks: useHooksComments,
  options: {
    hotkey: ['meta+shift+m', 'ctrl+shift+m']
  }
});

const useAvatarImage = ({
  userId,
  ...props
}) => {
  const user = useUserById(userId);
  const src = user === null || user === void 0 ? void 0 : user.avatarUrl;
  const alt = `Avatar of ${user === null || user === void 0 ? void 0 : user.name}`;
  return {
    src,
    alt,
    ...props
  };
};
const AvatarImage = createComponentAs(props => {
  const htmlProps = useAvatarImage(props);
  return createElementAs('img', htmlProps);
});

const useCommentDeleteButton = props => {
  const activeCommentId = useCommentsSelectors().activeCommentId();
  const onCommentDelete = useCommentsSelectors().onCommentDelete();
  const id = useCommentSelectors().id();
  const setActiveCommentId = useCommentsActions().activeCommentId();
  const removeComment = useRemoveComment();
  const editor = usePlateEditorRef();
  return {
    onClick: () => {
      if (activeCommentId === id) {
        unsetCommentNodesById(editor, {
          id
        });
        setActiveCommentId(null);
      } else {
        removeComment(id);
      }

      onCommentDelete === null || onCommentDelete === void 0 ? void 0 : onCommentDelete(id);
    },
    ...props
  };
};
const CommentDeleteButton = props => {
  const htmlProps = useCommentDeleteButton(props);
  return /*#__PURE__*/React.createElement(Button, htmlProps);
};

const useCommentEditCancelButton = props => {
  const setEditingValue = useCommentActions().editingValue();
  return {
    onClick: () => {
      setEditingValue(null);
    },
    ...props
  };
};
const CommentEditCancelButton = props => {
  const htmlProps = useCommentEditCancelButton(props);
  return /*#__PURE__*/React.createElement(Button, htmlProps);
};

const useCommentEditSaveButton = ({ ...props
}) => {
  const onCommentUpdate = useCommentsSelectors().onCommentUpdate();
  const editingValue = useCommentSelectors().editingValue();
  const setEditingValue = useCommentActions().editingValue();
  const id = useCommentSelectors().id();
  const updateComment = useUpdateComment(id);
  const value = useCommentText();
  const onClick = useCallback(() => {
    if (!editingValue) return;
    updateComment({
      value: editingValue
    });
    setEditingValue(null);
    onCommentUpdate === null || onCommentUpdate === void 0 ? void 0 : onCommentUpdate({
      id,
      value: editingValue
    });
  }, [editingValue, id, onCommentUpdate, setEditingValue, updateComment]);
  return {
    onClick,
    disabled: (value === null || value === void 0 ? void 0 : value.trim().length) === 0,
    ...props
  };
};
const CommentEditSaveButton = props => {
  const htmlProps = useCommentEditSaveButton(props);
  return /*#__PURE__*/React.createElement(Button, htmlProps);
};

const CommentEditActions = {
  SaveButton: CommentEditSaveButton,
  CancelButton: CommentEditCancelButton
};

const useCommentEditButton = props => {
  const setIsMenuOpen = useCommentActions().isMenuOpen();
  const comment = useComment();
  const editingValue = useCommentActions().editingValue();
  return {
    onClick: () => {
      setIsMenuOpen(false);
      editingValue(comment.value);
    },
    ...props
  };
};
const CommentEditButton = props => {
  const htmlProps = useCommentEditButton(props);
  return /*#__PURE__*/React.createElement(Button, htmlProps);
};

const useCommentEditTextarea = ({
  ref: _ref,
  ...props
}) => {
  const setEditingValue = useCommentActions().editingValue();
  const value = useEditingCommentText();
  const textareaRef = useRef(null);
  const ref = useComposedRef(textareaRef, _ref);
  useEffect(() => {
    setTimeout(() => {
      const textarea = textareaRef.current;

      if (textarea) {
        textarea.focus();
      }
    }, 0);
  }, [textareaRef]);
  return {
    placeholder: 'Add a comment...',
    rows: 1,
    ref,
    value: value !== null && value !== void 0 ? value : undefined,
    onChange: event => {
      setEditingValue([{
        type: 'p',
        children: [{
          text: event.target.value
        }]
      }]);
    },
    ...props
  };
};
const CommentEditTextarea = createComponentAs(props => {
  const htmlProps = useCommentEditTextarea(props);
  return createElementAs('textarea', htmlProps);
});

const useCommentLinkButton = props => {
  return {
    onClick: () => {},
    ...props
  };
};
const CommentLinkButton = createComponentAs(props => {
  const htmlProps = useCommentLinkButton(props);
  return createElementAs('div', htmlProps);
});

const useCommentLinkDialogCloseButton = ({ ...props
}) => {
  return {
    onClick: () => {// onClose?.();
    },
    ...props
  };
};
const CommentLinkDialogCloseButton = createComponentAs(props => {
  const htmlProps = useCommentLinkDialogCloseButton(props);
  return createElementAs('div', htmlProps);
});

const useCommentLinkDialogCopyLink = ({ ...props
}) => {
  const id = useCommentSelectors().id();
  return {
    onClick: () => {
      navigator.clipboard.writeText(getCommentUrl(id));
    },
    ...props
  };
};
const CommentLinkDialogCopyLink = createComponentAs(props => {
  const htmlProps = useCommentLinkDialogCopyLink(props);
  return createElementAs('div', htmlProps);
});

const useCommentLinkDialogInput = ({ ...props
}) => {
  return {
    defaultValue: getCommentUrl(useCommentSelectors().id()),
    readOnly: true,
    ...props
  };
};
const CommentLinkDialogInput = createComponentAs(props => {
  const htmlProps = useCommentLinkDialogInput(props);
  return createElementAs('input', htmlProps);
});

const CommentLinkDialog = {
  CloseButton: CommentLinkDialogCloseButton,
  CopyLink: CommentLinkDialogCopyLink,
  Input: CommentLinkDialogInput
};

const useCommentNewSubmitButton = ({ ...props
}) => {
  const onCommentAdd = useCommentsSelectors().onCommentAdd();
  const activeCommentId = useCommentsSelectors().activeCommentId();
  const comment = useComment(SCOPE_ACTIVE_COMMENT);
  const newValue = useCommentsSelectors().newValue();
  const editingCommentText = useNewCommentText();
  const resetNewCommentValue = useResetNewCommentValue();
  const addComment = useAddComment();
  const isReplyComment = !!comment;
  const submitButtonText = isReplyComment ? 'Reply' : 'Comment';
  return {
    type: 'submit',
    disabled: !(editingCommentText !== null && editingCommentText !== void 0 && editingCommentText.trim().length),
    children: submitButtonText,
    onClick: () => {
      const newComment = addComment(isReplyComment ? {
        id: nanoid(),
        parentId: comment.id,
        value: newValue
      } : {
        id: activeCommentId,
        value: newValue
      });
      onCommentAdd === null || onCommentAdd === void 0 ? void 0 : onCommentAdd(newComment);
      resetNewCommentValue();
    },
    ...props
  };
};
const CommentNewSubmitButton = props => {
  const htmlProps = useCommentNewSubmitButton(props);
  return /*#__PURE__*/React.createElement(Button, htmlProps);
};

const useCommentNewTextarea = ({
  ref: _ref,
  ...props
}) => {
  const setNewValue = useCommentsActions().newValue();
  const activeComment = useCommentById(useCommentsSelectors().activeCommentId());
  const value = useNewCommentText();
  const focusTextarea = useCommentsSelectors().focusTextarea();
  const setFocusTextarea = useCommentsActions().focusTextarea();
  const textareaRef = useRef(null);
  const ref = useComposedRef(textareaRef, _ref);
  useEffect(() => {
    if (focusTextarea) {
      var _textareaRef$current;

      (_textareaRef$current = textareaRef.current) === null || _textareaRef$current === void 0 ? void 0 : _textareaRef$current.focus();
      setFocusTextarea(false);
    }
  }, [focusTextarea, setFocusTextarea, textareaRef]);
  const placeholder = `${activeComment ? 'Reply...' : 'Add a comment...'}`;
  return {
    placeholder,
    rows: 1,
    ref,
    value: value !== null && value !== void 0 ? value : undefined,
    onChange: event => {
      setNewValue([{
        type: 'p',
        children: [{
          text: event.target.value
        }]
      }]);
    },
    ...props
  };
};
const CommentNewTextarea = createComponentAs(props => {
  const htmlProps = useCommentNewTextarea(props);
  return createElementAs('textarea', htmlProps);
});

const useCommentResolveButton = ({ ...props
}) => {
  const onCommentUpdate = useCommentsSelectors().onCommentUpdate();
  const activeCommentId = useCommentsSelectors().activeCommentId();
  const setActiveCommentId = useCommentsActions().activeCommentId();
  const updateComment = useUpdateComment(activeCommentId);
  const comment = useComment();
  return {
    onClick: () => {
      const isResolved = !comment.isResolved;
      const value = {
        isResolved
      };
      updateComment(value);
      onCommentUpdate === null || onCommentUpdate === void 0 ? void 0 : onCommentUpdate({
        id: activeCommentId,
        ...value
      });

      if (isResolved) {
        setActiveCommentId(null);
      }
    },
    ...props
  };
};
const CommentResolveButton = props => {
  const htmlProps = useCommentResolveButton(props);
  return /*#__PURE__*/React.createElement(Button, htmlProps);
};

const useCommentUserName = props => {
  var _user$name;

  const user = useCommentUser();
  return { ...props,
    children: (_user$name = user === null || user === void 0 ? void 0 : user.name) !== null && _user$name !== void 0 ? _user$name : 'Anonymous'
  };
};
const CommentUserName = createComponentAs(props => {
  const htmlProps = useCommentUserName(props);
  return createElementAs('div', htmlProps);
});

const useCommentsPositioner = (props = {}) => {
  var _useActiveCommentNode;

  const editor = usePlateEditorRef();
  const activeCommentId = useCommentsSelectors().activeCommentId();
  const [position, setPosition] = useState({
    left: 0,
    top: 0
  });
  const [node] = (_useActiveCommentNode = useActiveCommentNode()) !== null && _useActiveCommentNode !== void 0 ? _useActiveCommentNode : [];
  useEffect(() => {
    if (!node) return;
    const domNode = toDOMNode(editor, node);
    if (!domNode) return;
    const newPosition = getCommentPosition(editor, node);
    if (!newPosition) return;
    setPosition(newPosition);
  }, [editor, node]);
  return {
    display: !activeCommentId ? 'none' : undefined,
    ...props,
    style: { ...props.style,
      ...position
    }
  };
};
const CommentsPositioner = createComponentAs(props => {
  const htmlProps = useCommentsPositioner(props);
  if (htmlProps.display === 'none') return null;
  return createElementAs('div', htmlProps);
});

const useCommentAddButton = props => {
  const addCommentMark = useAddCommentMark();
  const setFocusTextarea = useCommentsActions().focusTextarea();
  const onClick = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    addCommentMark();
    setFocusTextarea(true);
  }, [addCommentMark, setFocusTextarea]);
  return {
    onClick,
    ...props
  };
};

const useFloatingCommentsContentState = () => {
  const activeCommentId = useCommentsSelectors().activeCommentId();
  const activeComment = useCommentById(activeCommentId);
  const setActiveCommentId = useCommentsActions().activeCommentId();
  const editor = usePlateEditorRef();
  const myUserId = useCommentsSelectors().myUserId();
  const ref = useRef(null);
  const refs = [ref];
  useOnClickOutside(() => {
    if (!activeComment) {
      unsetCommentNodesById(editor, {
        id: activeCommentId
      });
    }

    setActiveCommentId(null);
  }, {
    refs
  });
  return {
    ref,
    activeCommentId,
    myUserId,
    hasNoComment: !activeComment
  };
};

const useFloatingCommentsState = () => {
  const activeCommentId = useCommentsSelectors().activeCommentId();
  const resetNewCommentValue = useResetNewCommentValue();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []); // reset comment editing value when active comment id changes

  useEffect(() => {
    if (activeCommentId) {
      resetNewCommentValue();
    }
  }, [activeCommentId, resetNewCommentValue]);
  return {
    loaded,
    activeCommentId
  };
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

const AccountCircleIcon = props => /*#__PURE__*/React.createElement("svg", _extends({
  "aria-hidden": "true",
  focusable: "false",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /*#__PURE__*/React.createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"
}));

const CheckIcon = props => /*#__PURE__*/React.createElement("svg", _extends({
  "aria-hidden": "true",
  focusable: "false",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /*#__PURE__*/React.createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
}));

const MoreVertIcon = props => /*#__PURE__*/React.createElement("svg", _extends({
  "aria-hidden": "true",
  focusable: "false",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /*#__PURE__*/React.createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}));

const RefreshIcon = props => /*#__PURE__*/React.createElement("svg", _extends({
  "aria-hidden": "true",
  focusable: "false",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /*#__PURE__*/React.createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
}));

export { AccountCircleIcon, AvatarImage, CheckIcon, CommentDeleteButton, CommentEditActions, CommentEditButton, CommentEditCancelButton, CommentEditSaveButton, CommentEditTextarea, CommentLinkButton, CommentLinkDialog, CommentLinkDialogCloseButton, CommentLinkDialogCopyLink, CommentLinkDialogInput, CommentNewSubmitButton, CommentNewTextarea, CommentProvider, CommentResolveButton, CommentUserName, CommentsPositioner, CommentsProvider, MARK_COMMENT, MoreVertIcon, RefreshIcon, SCOPE_ACTIVE_COMMENT, SCOPE_COMMENT, SCOPE_COMMENTS, commentStore, commentsStore, createCommentsPlugin, findCommentNode, findCommentNodeById, getCommentCount, getCommentKey, getCommentKeyId, getCommentKeys, getCommentNodeEntries, getCommentNodesById, getCommentPosition, getCommentUrl, getElementAbsolutePosition, isCommentKey, isCommentNodeById, isCommentText, removeCommentMark, unsetCommentNodesById, useActiveCommentNode, useAddComment, useAddCommentMark, useAddRawComment, useAvatarImage, useComment, useCommentActions, useCommentAddButton, useCommentById, useCommentDeleteButton, useCommentEditButton, useCommentEditCancelButton, useCommentEditSaveButton, useCommentEditTextarea, useCommentLinkButton, useCommentLinkDialogCloseButton, useCommentLinkDialogCopyLink, useCommentLinkDialogInput, useCommentNewSubmitButton, useCommentNewTextarea, useCommentReplies, useCommentResolveButton, useCommentSelectors, useCommentStates, useCommentStore, useCommentText, useCommentUser, useCommentUserName, useCommentsActions, useCommentsPositioner, useCommentsResolved, useCommentsSelectors, useCommentsStates, useCommentsStore, useEditingCommentText, useFloatingCommentsContentState, useFloatingCommentsState, useHooksComments, useMyUser, useNewCommentText, useRemoveComment, useResetNewCommentValue, useUpdateComment, useUserById, withComments };
//# sourceMappingURL=index.es.js.map
